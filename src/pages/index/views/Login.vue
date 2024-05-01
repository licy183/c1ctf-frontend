
<template>
<login-card title="登录">
      <b-alert v-bind:show="message != null" class="text-center" variant="danger" :dismissible="true">{{message}}</b-alert>
      <b-form @submit.prevent="onSubmit">
        <b-link :to="{ name: 'Register' }" class="float-right mr-auto">立即注册</b-link>

        <b-form-group id="input-group-1" label="用户名" label-for="input-1">
          <b-form-input id="input-1" v-model="form.username" required autocomplete="on" placeholder="用户名"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="密码" label-for="input-2">
          <b-form-input id="input-2" v-model="form.password" type="password" required autocomplete="on" placeholder="密码"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3">
          <b-link :to="{ name: 'ResetPwd'}" class="float-right mr-auto">找回密码</b-link>
          <b-form-checkbox class="login-remember-check mr-auto" v-model="form.remember" >记住登录</b-form-checkbox>
        </b-form-group>
        <b-button type="submit" variant="primary" class="btn-block">登录</b-button>
      </b-form>
</login-card>
</template>

<script>
import LoginCard from "../components/LoginCard";
import api from "@/util/api"
import router from "@/pages/index/router";
import { mapState } from 'vuex'
import { SET_LOGIN } from '@/util/store-types'

export default {

  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        remember: false,
        password: ''
      },
      message: null,
    }
  },
  computed: mapState([
    'user'
  ]),
  methods: {
    async onSubmit() {
      this.message = null;
      try{
        let payload = await api.post('/user/login', {
          username: this.form.username,
          password: this.form.password,
          remember: this.form.remember});
        await this.$store.commit(SET_LOGIN, payload);
        if (this.form.remember) {
            localStorage.setItem('token', this.user.token);
        } else {
            sessionStorage.setItem('token', this.user.token);
        }
          this.$root.$bvToast.toast('登录成功', {
              title: '成功',
              variant: 'success',
              autoHideDelay: 1500
          });
          await router.push({name: 'Index'})
      } catch (e) {
        this.message = e;
      }
      // eslint-disable-next-line no-console

    },
  },
  mounted () {

  },
  components: {
    LoginCard,
    // Verify
  }
}
</script>

<style scoped>
  .login-card {
    min-width: 350px;
  }
  .login-remember-check {
    max-width: 75%;
  }
</style>
