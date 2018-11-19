import Vue from "vue";
import VueRouter from "vue-router";
import axios from 'axios';
import VueAxios from 'vue-axios';
import DashboardPlugin from "./material-dashboard";
import auth from './auth';

// Plugins
import App from "./App.vue";
import Chartist from "chartist";

// router setup
import routes from "./router/routes";

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

// global library setup
Object.defineProperty(Vue.prototype, "$Chartist", {
  get() {
    return this.$root.Chartist;
  }
});

Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});
