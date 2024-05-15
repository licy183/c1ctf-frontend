// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/pages/index/App'
import BootstrapVue from 'bootstrap-vue'
import router from '@/pages/index/router'
import store from "@/store";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faCloud} from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faAngleRight, faCheckCircle, faCloud);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.config.silent = true;
// banner
// eslint-disable-next-line no-console
console.log(atob('ICAgX19fX19fICAgX19fICAgX19fX19fICAgX19fX19fICAgX19fX19fCiAgLyBfX19fLyAgPCAgLyAgLyBfX19fLyAgL18gIF9fLyAgLyBfX19fLwogLyAvICAgICAgIC8gLyAgLyAvICAgICAgICAvIC8gICAgLyAvXyAgICAKLyAvX19fICAgIC8gLyAgLyAvX19fICAgICAvIC8gICAgLyBfXy8gICAgClxfX19fLyAgIC9fLyAgIFxfX19fLyAgICAvXy8gICAgL18vICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAK')
    + '\nC1CTF Copyright © 2015 - 2024 C1Sec. contact[at]c1sec.club');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
