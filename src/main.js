import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Model } from 'vue-api-query'
import DashboardPlugin from "./material-dashboard";
import auth from './auth';

// Plugins
import App from "./App.vue";
import Chartist from "chartist";

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

Vue.use(VueAxios, axios);

Model.$http = axios;

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
