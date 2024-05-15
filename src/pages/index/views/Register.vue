<template>
    <b-container fluid>
    <div class="mt-5 mb-2 d-flex justify-content-center">
        <b-col sm="11" xs="11" md="8" lg="6">
            <b-card>
                <b-card-title class="text-dark text-center">注册</b-card-title>
                <b-container>

                <b-link :to="{ name: 'Login'}" class="float-right mr-auto">已有帐号？立即登录</b-link>

                <b-form @submit.prevent="onSubmit" >
                        <b-form-group label="用户名" label-for="username">
                            <b-form-input id="username" v-model="regForm['username']" type="text" :state="formState['username']" @blur="checkUsername" required autocomplete="on" placeholder="战队名"></b-form-input>
                            <b-form-invalid-feedback :state="formState['username']">
                                {{formMsg['username']}}
                            </b-form-invalid-feedback>
                        </b-form-group>
                    <b-form-row>
                        <b-col md>
                        <b-form-group label="登录邮箱" label-for="email">
                            <b-form-input id="email" v-model="regForm['email']" type="text" :state="formState['email']" required autocomplete="on" placeholder="邮箱"></b-form-input>
                            <b-form-invalid-feedback :state="formState['email']">
                                {{formMsg['email']}}
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="formState['email']">
                                {{formMsg['email']}}
                            </b-form-valid-feedback>
                        </b-form-group>
                        </b-col>
                        <b-col md>
                        <b-form-group label="验证码" label-for="emailCodeInput">
                            <b-input-group>
                                <b-form-input id="emailCodeInput" v-model="regForm['code']" type="text" :state="formState['code']" required autocomplete="off" placeholder="验证码" ></b-form-input>
                                <b-input-group-append>
                                    <email-code-btn :value="regForm['email']" type="register" @success="emailSuccess" @failure="emailFailure"></email-code-btn>
                                </b-input-group-append>
                            </b-input-group>
                            <b-form-invalid-feedback :state="formState['code']">
                                {{formMsg['code']}}
                            </b-form-invalid-feedback>

                        </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-group label="登录密码" label-for="password" class="mr-2">
                        <b-form-input id="password" v-model="regForm['password']" type="password" :state="formState['password']" required autocomplete="on" placeholder="登录密码"></b-form-input>
                        <b-form-invalid-feedback :state="formState['password']">
                            {{formMsg['password']}}
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-row>
                        <b-col md>
                        <b-form-group label="用户类型" description="此项内容注册后不可修改，请慎重填写" >
                            <b-form-radio-group v-model="regForm['user_type']" name="user_type" required>
                                <b-form-radio value="0">校外用户</b-form-radio> <!--off_campus -->
                                <b-form-radio value="1">校内用户</b-form-radio> <!--on_campus -->
                            </b-form-radio-group>
                        </b-form-group>
                        </b-col>
                        <b-col md v-if="regForm['user_type'] == 1"> <!--on_campus -->
                            <b-form-group label="学生信息" label-for="student_id">
                                <b-input-group>
                                    <b-form-input id="student_id" v-model="regForm['student_id']" type="text" :state="formState['student_id']" required autocomplete="on" placeholder="学号" :disabled="studentIdVerifyDisable"></b-form-input>
                                    <b-form-input id="student_name" v-model="regForm['student_name']" type="text" :state="formState['student_name']" required autocomplete="on" placeholder="姓名" :disabled="studentIdVerifyDisable"></b-form-input>
                                </b-input-group>
                                <b-form-invalid-feedback :state="formState['student_id']">
                                    {{formMsg['student_id']}}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-button type="submit" variant="primary" class="text-center" block>注册</b-button>
                </b-form>
                </b-container>

            </b-card>
        </b-col>
    </div>
    </b-container>
</template>

<script>
import email from "../../../util/email"
import EmailCodeBtn from "@/pages/index/components/EmailCodeBtn"
import router from '@/pages/index/router'
import api from '@/util/api'
import { mapState } from 'vuex'

export default {
    data() {
            return {
                selected: '1',
                regForm: {},
                formState: {},
                formMsg: {},
                studentIdVerifyDisable: false,
            }
        },
        methods: {
            emailSuccess(r) {
                this.editFormMsg('email', r, true);
            },
            emailFailure(e) {
                this.editFormMsg('email', e, false);
            },
            editFormMsg: function(component, msg, state) {
                // 用Vue的Set方法，否则不会触发更新
                this.$set(this.formMsg, component, msg);
                this.$set(this.formState, component, state);
            },
            checkStudent: function () {
                if (this.regForm['student_id'].length < 5) {
                    this.editFormMsg('student_id', null, false);
                    return
                }
                this.editFormMsg('student_id', null, true);
            },
            checkUsername: function() {
                if(this.regForm['username'].length < 4) {
                    this.editFormMsg('username', '用户名太短了', false);
                    return;
                }
                if(this.regForm['username'].length > 32) {
                    this.editFormMsg('username', '用户名太长了', false);
                    return;
                }

                api.post('/user/check_username',{username: this.regForm['username']}).then(() => {
                        this.editFormMsg('username', '看起来不错', true);
                    }).catch((e) => {
                        this.editFormMsg('username', e, false);
                })
            },
            // 提交事件
            onSubmit: function () {
                let error = false;

                if (this.regForm['code'].length === 0){
                    error = true;
                    this.editFormMsg('code', '请输入验证码', false)
                }else
                    this.editFormMsg('code', null, null);
                if (!email.checkEmail(this.regForm['email'])) {
                    this.editFormMsg('email', "邮箱地址无效", false);
                    error = true
                }
                if (this.regForm['password'].length < 6) {
                    this.editFormMsg('password', '密码太短, 请换一个更强的密码', false)
                    error = true
                }

                if (error)
                    return;

                this.editFormMsg('code', null, null);
                this.editFormMsg('email', null, null);
                this.editFormMsg('student_id', null, null);
                this.editFormMsg('username', null, null);

                api.post('/user/register',{
                    email: this.regForm['email'],
                    verify_code: this.regForm['code'],
                    is_student: this.regForm['user_type'] == 1,
                    student_id: this.regForm['student_id'],
                    student_name: this.regForm['student_name'],
                    username: this.regForm['username'],
                    password: this.regForm['password']
                }).then(
                    () => {
                        this.$root.$bvToast.toast('注册成功', {
                            title: '成功',
                            variant: 'success',
                            autoHideDelay: 1500
                        });
                        router.push({name:'Login'})
                    }
                ).catch((e) => {
                    try {
                        switch (e) {
                            case "mail_code_error":
                                this.editFormMsg('code', '验证码错误或已失效', false);
                                break;
                            case "email_error":
                                this.editFormMsg('email', '邮箱地址无效或已被占用', false);
                                break;
                            case "student_id_error":
                                this.editFormMsg('student_id', '学号无效或已被注册', false);
                                break;
                            case "username_error":
                                this.editFormMsg('username', '用户无效或已存在', false);
                                break;
                            default:
                                this.$bvToast.toast(e, { title: '错误', variant: 'danger', solid: true });
                                break;
                        }
                    } catch (x) {
                        this.$bvToast.toast(e, {
                            title: '错误',
                            variant: 'danger',
                        })
                    }
                })
            }
        },
    mounted () {

    },
    computed: {
        ...mapState(['config'])
    },
        components: {
            EmailCodeBtn
        },
        name: "Register"
}

// eslint-disable-next-line no-undef
</script>

<style scoped>

</style>
