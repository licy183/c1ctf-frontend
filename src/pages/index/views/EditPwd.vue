<template>
  <login-card title="修改密码">
      <b-form @submit.prevent="onSubmit" >
        <b-form-group label="旧密码" label-for="old-password">
          <b-form-input id="old-password" v-model="pwdOld" type="password" :state="pwdOldState" required autocomplete="on" placeholder="旧密码"></b-form-input>
          <b-form-invalid-feedback :state="pwdOldState">
            {{pwdOldMsg}}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="新密码" label-for="new-password">
          <b-form-input id="new-password" v-model="pwdNew" type="password" :state="pwdNewState" required autocomplete="on" placeholder="新密码"></b-form-input>
          <b-form-invalid-feedback :state="pwdNewState">
            {{pwdNewMsg}}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="确认密码" label-for="password-confirm">
          <b-form-input id="password-confirm" v-model="pwdConfirm" type="password" :state="pwdConfirmState" required autocomplete="on" placeholder="确认密码"></b-form-input>
          <b-form-invalid-feedback :state="pwdConfirmState">
            {{pwdConfirmMsg}}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" variant="primary" class="text-center">确定</b-button>
      </b-form>
  </login-card>
</template>

<script>
  import login from "@/util/login";
  import api from "@/util/api"
  import LoginCard from "@/pages/index/components/LoginCard";
  export default {
    name: 'EditPwd',
    components: {LoginCard},
    data () {
      return {
        pwdOld: '',
        pwdNew: '',
        pwdConfirm: '',
        pwdOldState: null,
        pwdOldMsg: '',
        pwdNewState: null,
        pwdNewMsg: '',
        pwdConfirmState: null,
        pwdConfirmMsg: ''
      }
    },
    methods: {
      formValidation: function () {
        // 新密码
        if (this.pwdNew.length === 0) {
          this.pwdNewState = false
          this.pwdNewMsg = '请设置新密码'
        } else if (this.pwdNew.length < 8) {
          this.pwdNewState = false
          this.pwdNewMsg = '请设置8位以上的密码'
        } else if (this.pwdNew === this.pwdOld) {
          this.pwdNewState = false
          this.pwdNewMsg = '新密码与旧密码相同'
        } else {
          this.pwdNewState = null
        }
        // 旧密码
        if (this.pwdOld.length === 0) {
          this.pwdOldState = false
          this.pwdOldMsg = '请输入旧密码'
        } else {
          this.pwdOldState = null
        }
        // pwdConfirm
        if (this.pwdConfirm !== this.pwdNew) {
          this.pwdConfirmState = false
          this.pwdConfirmMsg = '密码不匹配'
        } else {
          this.pwdConfirmState = null
        }
        return this.pwdConfirmState === null && this.pwdOldState === null && this.pwdNewState === null
      },
      onSubmit: function () {
        // pass
        if (!this.formValidation()) {
          return
        }
        api.post('/user/change_password', {old_password: this.pwdOld, new_password: this.pwdNew}).then(() => {
          login.logout();
          this.$root.$bvModal.msgBoxOk('修改密码成功，请重新登录', {title: '提示', centered: true})
        }).catch(() => {
          this.pwdOldState = false
          this.pwdOldMsg = '旧密码不正确或尝试次数过多'
        })
      }
    }

  }
</script>

<style scoped>

</style>
