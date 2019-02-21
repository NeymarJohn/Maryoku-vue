import Vue from "vue";
import VueRouter from "vue-router";
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
import vSelectMenu from 'v-selectmenu';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import VueFractionGrid from 'vue-fraction-grid';
import VuePhoneNumberInput from 'vue-phone-number-input';
import VueGmaps from 'vue-gmaps'
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

// router setup
import routes from "./router/routes";

// store setup
import store from "./store";

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);

Vue.use(VueGmaps, {
  key: process.env.GOOGLE_API_KEY|| 'AIzaSyA2vZszC43EeV_86cOpsODl0jqs7Eaj3fI',
  libraries: ['places']
})


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
Vue.use(vSelectMenu, { language: "en"});
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });
Vue.use(VueFractionGrid);
Vue.component('vue-phone-number-input', VuePhoneNumberInput);

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
