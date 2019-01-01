import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Model } from 'vue-api-query';
import DashboardPlugin from "./material-dashboard";
import auth from './auth';

// Plugins
import App from "./App.vue";
import Chartist from "chartist";
import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';

// router setup
import routes from "./router/routes";

// store setup
import store from "./store";

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
  scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth == null && !auth.user.authenticated){
    next('signin');
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  window.document.title = `${to.meta.title ? to.meta.title : to.name} @ 262 Days`;
});

// global library setup
Object.defineProperty(Vue.prototype, "$Chartist", {
  get() {
    return this.$root.Chartist;
  }
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401 && router.currentRoute.path != "/signin") {
    return router.push({ path: '/signin' })
  }
  return Promise.reject(error);
});

Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));
Vue.use(Tooltip, {
  delay: 200,
  placement: 'auto',
  class: 'tooltip-custom', // ex: 'tooltip-custom tooltip-other-custom'
  triggers: ['hover', 'focus'],
  offset: 5
});

Model.$http = axios;

Number.prototype.padStart = function(size, theChar)  {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
};

String.prototype.padStart = function(size, theChar) {
  var s = String(this);
  while (s.length < (size || 2)) {s = theChar + s;}
  return s;
};

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  }
});
