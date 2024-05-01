<template>
    <login-card title="找回密码">
        <b-alert v-bind:show="message != null" class="text-center" variant="danger" :dismissible="true">{{message}}</b-alert>

        <b-form @submit.prevent="onSubmit">
            <b-form-group id="input-group-1" label="用户名" label-for="input-1">
                <b-form-input id="input-1" v-model="form['username']" :state="formState['username']" required autocomplete="on" placeholder="用户名"></b-form-input>
            </b-form-group>

            <b-form-group label="邮箱验证" label-for="email">
                <b-form-input class="email-input" id="email"  v-model="form['email']" type="text" required autocomplete="on" placeholder="邮箱"></b-form-input>
                <b-input-group>
                    <b-form-input class="code-input"  id="emailCodeInput" v-model="form['code']" type="text" required autocomplete="off" placeholder="验证码" ></b-form-input>
                    <b-input-group-append>
                        <email-code-btn :value="form['email']" type="forget_password" @success="clearMsg" @failure="errorMsg"></email-code-btn>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>

            <b-form-group id="input-group-2" label="新密码" label-for="input-2">
                <b-form-input id="input-2" v-model="form.password" type="password" required autocomplete="on" placeholder="密码"></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" class="btn-block">修改</b-button>
        </b-form>

    </login-card>

</template>

<script>
    import router from "@/pages/index/router";
    import LoginCard from "@/pages/index/components/LoginCard";
    import EmailCodeBtn from "@/pages/index/components/EmailCodeBtn";
    import api from "@/util/api"
    export default {
        name: "ResetPwd",
        components: {LoginCard,EmailCodeBtn},
        data() {
            return {
                form: {username: ''},
                formState: {},
                message: null
            }
        },
        methods: {
            errorMsg: function(msg) {
                this.message = msg;
            },
            clearMsg() {
                this.message = null;
            },
            onSubmit() {

                api.post('/user/forget_password',{
                    email: this.form['email'],
                    username: this.form['username'],
                    verify_code: this.form['code'],
                    new_password: this.form['password']
                }).then(
                    (response) => {
                        this.$root.$bvToast.toast(response, {
                            title: '成功',
                            variant: 'success',
                            solid: false,
                            autoHideDelay: 1500
                        })
                        router.push({name: 'Login'})
                    }).catch(e =>{
                        this.errorMsg(e);
                })
            }
        },
    }
</script>

<style scoped>

/* 处于焦点时至于最顶层 */
input:focus {
    z-index: 2;
}

.code-input {
    position: relative;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
}

.email-input {
    position: relative;
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

</style>
