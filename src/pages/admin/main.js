// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from "@/store";
import router from '@/pages/admin/router'
import App from '@/pages/admin/App'

import {
  Button,
  Select,
  Card,
  TimePicker,
  Table,
  TableColumn,
  Input,
  InputNumber,
  Submenu,
  Menu,
  MenuItem,
  MenuItemGroup,
  Dialog,
  Container,
  Switch,
  Aside,
  Header,
  Pagination,
  Row,
  Col,
  Form,
  FormItem,
  Option,
  Tooltip,
  Main,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Scrollbar,
  DatePicker,
  Link,
  Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button);
Vue.use(Select);
Vue.use(Card);
Vue.use(TimePicker);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Submenu);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dialog);
Vue.use(Container);
Vue.use(Switch);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Pagination);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(Tooltip);
Vue.use(Main);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Scrollbar);
Vue.use(DatePicker);
Vue.use(Link);

Vue.prototype.$message = Message;

import { library } from '@fortawesome/fontawesome-svg-core'
import {faListUl} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faListUl);
Vue.component('font-awesome-icon', FontAwesomeIcon);


// Vue.config.productionTip = false;

import login from '@/util/login';
// 不是管理员就不载入页面了
login.autoLogin().then((r) => {
  // eslint-disable-next-line no-empty
  if (r.is_admin) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    });
  }
// eslint-disable-next-line no-unused-vars
}).catch(e => {
  // eslint-disable-next-line no-console
});

