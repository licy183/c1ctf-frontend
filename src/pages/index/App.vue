
<template>
  <div id="app">
    <b-navbar toggleable="sm" variant="light" fixed="top" sticky>
      <b-navbar-brand to="/">{{CTF_NAME}}</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name: 'Index'}" active-class="active" exact>首页</b-nav-item>
          <template v-if="user.is_authenticated">
            <b-nav-item :to="{name: 'Challenge'}" active-class="active">题目</b-nav-item>
            <b-nav-item :to="{name: 'Submit'}" active-class="active">提交答案</b-nav-item>
          </template>
          <b-nav-item :to="{name: 'Bulletin'}" active-class="active" exact>公告</b-nav-item>
          <b-nav-item :to="{name: 'Ranking'}" active-class="active" exact>排行榜</b-nav-item>

        </b-navbar-nav>
        <!-- 靠右对齐 -->
        <b-navbar-nav class="ml-auto">
          <template v-if="user.is_authenticated">
            <b-nav-item-dropdown right :text="user.username">
              <template v-if="user.is_admin">
                <b-dropdown-item href="admin.html" active-class="active" exact>管理后台</b-dropdown-item>
              </template>
              <b-dropdown-item :to="{ name: 'MyInfo'}" active-class="active" exact>个人信息</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'EditPwd'}" active-class="active" exact>修改密码</b-dropdown-item>
              <b-dropdown-item v-on:click="logout">退出</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <b-nav-item :to="{ name: 'Login'}" active-class="active" exact>登录</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    </b-navbar>
    <router-view/>
    <div class="my-2 text-center">
      <small class="text-muted">C1CTF Copyright &copy; 2015 - 2024 C1Sec. contact[at]c1sec.club</small>
    </div>
  </div>
</template>

<script>
  import login from "@/util/login";
  import api from "@/util/api";
  import { mapState } from 'vuex'
  import { SET_IS_REGISTER_OPEN, SET_END_TIME, SET_BEGIN_TIME } from "@/util/store-types";
  import router from "@/pages/index/router";

  export default {
    name: 'App',
    data () {
      return {
        CTF_NAME: process.env.VUE_APP_CTF_NAME
      }
    },
    computed: mapState([
      'user'
    ]),
    created () {

    },
    mounted () {
      // 初始化比赛配置
      api.get('/config/get_match_info').then( (match_config) => {
          this.$store.commit(SET_IS_REGISTER_OPEN, match_config['register_open']);
          this.$store.commit(SET_BEGIN_TIME, match_config['match_open_time']);
          this.$store.commit(SET_END_TIME, match_config['match_end_time']);
        }
      );
      login.autoLogin().catch(() => {}).finally(() => {

        router.beforeEach((to, from, next) => {
          if (to.meta.checker != null) {
            for (let checker of to.meta.checker) {
              let result = checker.check();
              if (!result.status) {
                router.app.$root.$bvToast.toast(result.msg, {
                  title: '错误',
                  variant: 'danger',
                  autoHideDelay: 1500
                });
                return;
              }
            }
          }
          next();
        });
    });





    },
    methods: {
      logout: function () {

        login.logout();

      }
    }
  }

</script>

<style>
  /*#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }*/
</style>
