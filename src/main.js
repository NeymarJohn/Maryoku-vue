import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import './pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App.vue'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
import initProgress from './progressbar';
import auth from './auth';

// router setup
import routes from './routes/routes'

// library imports

import './assets/sass/paper-dashboard.scss'
import './assets/sass/element_variables.scss'
import './assets/sass/demo.scss'

import sidebarLinks from './sidebarLinks'
// plugin setup
Vue.use(VueAxios, axios);
Vue.use(VueRouter)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar, {sidebarLinks: sidebarLinks})
Vue.use(VeeValidate)
locale.use(lang)
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  linkActiveClass: 'active'
})

initProgress(router);

Vue.directive('focus', {
  inserted(el) {
    el.focus();
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
});
