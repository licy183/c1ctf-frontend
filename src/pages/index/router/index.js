import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/pages/index/views/Login";
import Register from "@/pages/index/views/Register";
import ResetPwd from "@/pages/index/views/ResetPwd";
import EditPwd from "@/pages/index/views/EditPwd";
import Challenge from "@/pages/index/views/Challenge";
import Ranking from "@/pages/index/views/Ranking";
import Index from "@/pages/index/views/Index";
import Submit from "@/pages/index/views/Submit";
import Bulletin from "@/pages/index/views/Bulletin"

import registerOpenChecker from "@/checker/registerOpenChecker"
import loginChecker from "@/checker/loginChecker"
import matchOpenChecker from "@/checker/matchOpenChecker"
import matchStartedChecker from "@/checker/matchStartedChecker"
import MyInfo from "@/pages/index/views/MyInfo";


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        checker: [registerOpenChecker],
      }
    },{
      path: '/reset_pwd',
      name: 'ResetPwd',
      component: ResetPwd
    }, {
      path: '/edit_pwd',
      name: 'EditPwd',
      component: EditPwd,
      meta: {
        checker: [loginChecker],
      }
    }, {
      path: '/challenge',
      name: 'Challenge',
      component: Challenge,
      meta: {
        checker: [loginChecker, matchStartedChecker],
      },
      children: [
        { path: ':challenge_id', name: 'ChallengeDetail', component: Challenge,
          meta: {
            checker: [loginChecker, matchStartedChecker],
          },
        }
      ]
    }, {
      path: '/submit_flag',
      name: 'Submit',
      component: Submit,
      meta: {
        checker: [loginChecker, matchOpenChecker],
      }
    }, {
      path: '/bulletin',
      name: 'Bulletin',
      component: Bulletin
    }, {
      path: '/my_info',
      name: 'MyInfo',
      component: MyInfo,
    }, {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking
    },
  ]
});

export default router;
