<template>
    <b-button variant="outline-primary" v-on:click="sendCode" :disabled="sendCodeDisable">
        {{sendCodeDisable ? (emailWaitTime > 0 ? emailWaitTime : '请等待' ) : '发送'}}
    </b-button>
</template>

<script>
    import email from "@/util/email"
    import api from "@/util/api"

    /**
     * 事件：
     * sendcode
     */
    export default {
        name: "EmailCodeBtn",
        props: {
            value: {
                required: true
            },
            type: {
                default: ''
            }
        },
        data() {
            return {
                sendCodeDisable: false,
                emailWaitTime: 0,
                email_type: {
                    register: 0,
                    forget_password: 1,
                }

            }
        },
        methods: {
            emailTimerBegin(time) {
                if (time == null)
                    time = 30;
                this.emailWaitTime = time;
                this.sendCodeDisable = true;
                this.emailTimer = setInterval(this.emailTimerLoop, 1000)
            },
            emailTimerLoop() {
                if (this.emailWaitTime > 1){
                    this.emailWaitTime -= 1;
                } else {
                    clearInterval(this.emailTimer);
                    this.emailWaitTime = 30;
                    this.sendCodeDisable = false;
                }
            },
            sendCode() {
                if (!email.checkEmail(this.value)) {
                    this.$emit('failure', '邮箱地址不合法');
                    return
                }
                this.sendCodeDisable = true;
                    api.post('/user/send_verify_mail', {email: this.value, type: this.email_type[this.type]}).then(
                        (response) => {
                            this.$emit('success', response);
                            //this.editFormMsg('email', response, true);
                            // 倒数计时开始
                            this.emailTimerBegin();
                        }
                    ).catch((e) => {
                        // this.editFormMsg('email', e, false);
                        this.$emit('failure', e);
                        this.sendCodeDisable = false;
                    })
            }
        }
    }
</script>

<style scoped>

</style>
