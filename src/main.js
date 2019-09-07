import Vue from "vue";
import VueRouter from "vue-router";
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Model } from 'vue-api-query';
import DashboardPlugin from "./material-dashboard";
import auth from './auth';
import VueLazyLoad from 'vue-lazyload'

// Plugins
import App from "./App.vue";
import VueElementLoading from 'vue-element-loading';
import Chartist from "chartist";
import ChartistTooltipPlugin from "chartist-plugin-tooltip";
import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';
import vSelectMenu from 'v-selectmenu';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import VuePhoneNumberInput from 'vue-phone-number-input';
import VueGmaps from 'vue-gmaps'
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import VTooltip from 'v-tooltip';
import VueGtm from 'vue-gtm';
import VueSlideoutPanel from 'src/components/SlidePanel';
import Tawk from 'vue-tawk';
import VueCookies from 'vue-cookies';
import { VueStars } from "vue-stars"
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import lsWatcher from 'vue-storage-watcher';
import VueTour from 'vue-tour'

// router setup
import routes from "./router/routes";

// store setup
import store from "./store";

require('vue-tour/dist/vue-tour.css')

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);
Vue.use(VueTour)

Vue.use(VueGmaps, {
    key: process.env.GOOGLE_API_KEY|| 'AIzaSyAelc-zmvKBlcW78yPFeW9xrbnrJaT-MfA',
    libraries: ['places']
});


// configure router
const router = new VueRouter({
    routes, // short for routes: routes
    linkExactActiveClass: "nav-item active",
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {
    if (window.currentPanel){
        window.currentPanel.hide();
        window.currentPanel = null;
    }

    /*let tenantId = document.location.hostname.replace(".262days.com","");
    router.app.$http.defaults.headers.common.gorm_tenantid = tenantId;
    Model.$http.defaults.headers.common.gorm_tenantid = tenantId;

    if ((tenantId.startsWith("dev") || tenantId.startsWith("app") || tenantId.startsWith("localhost")) && to.name !== "CreateWorkspace"){
      next('create-workspace');
    } else {
      if (to.meta.auth == null && !auth.user.authenticated) {
        next('signin');
      } else {
        next();
      }
    }*/

    let tenantId = document.location.hostname.replace(".262days.com","");
    let isPrimeTenant = tenantId === 'dev' || tenantId === 'app';
    if ((isPrimeTenant && to.path !== '/signout' && to.path !== '/signin' && to.path !== '/signedin' && to.path !== '/create-workspace' && to.path !== '/choose-workspace') || (to.meta.auth && !auth.user.authenticated)) {
        next('signin');
    } else {

        if (to.name !== 'ShowEvent' && to.path !== '/signout' && auth.user.role === 'guest' && to.path !== '/my-events'){
            next('my-events');
            return;
        }

        next();
    }
    //router.app.$root.$emit("set-title",null);
    router.app.$root.$emit("set-title",null, false, false);
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

/*axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401 && router.currentRoute.path != "/signin") {
    return router.push({ path: '/signin' })
  }
  return Promise.reject(error);
});*/

Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));
Vue.use(Tooltip, {
    delay: 200,
    placement: 'auto',
    class: 'tooltip-custom', // ex: 'tooltip-custom tooltip-other-custom'
    triggers: ['hover', 'focus'],
    offset: 5
});
Vue.use(VTooltip)
Vue.use(vSelectMenu, { language: "en"});
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });

Vue.use(lsWatcher, { prefix: 'two62_' });

Vue.component('vue-phone-number-input', VuePhoneNumberInput);
Vue.component("vue-stars", VueStars);
Vue.component("vue-element-loading", VueElementLoading);
Vue.component('multiselect', Multiselect);

Vue.use(VueGtm, {
    id: 'GTM-5FH68TF', // Your GTM ID
    enabled: process.env.NODE_ENV === 'production', // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: process.env.NODE_ENV !== 'production', // Whether or not display console logs debugs (optional)
    vueRouter: router, // Pass the router instance to automatically sync with router (optional)
    ignoredViews: [] // If router, you can exclude some routes name (case insensitive) (optional)
});

Vue.use(VueSlideoutPanel);

if (process.env.NODE_ENV === 'production') {
    Vue.use(Tawk, {
        tawkSrc: 'https://embed.tawk.to/5cd93e082846b90c57ae3644/default',
        enabled: true
    });
}

Vue.use(VueCookies);

Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
});

Vue.directive('select-all', {
    inserted: function (el) {
        el.setSelectionRange(el.value.length, el.value.length);
    }
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

Object.defineProperty(Vue.prototype, '$auth', {
    get () { return auth; }
});

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
