/* const { SCHEME, HOSTNAME } =
  process.env.NODE_ENV === 'production'
    ? {SCHEME: 'https', HOSTNAME: 'api.262days.com'}
    : {SCHEME: 'http', HOSTNAME: process.env.SERVER_URL} */
import { Model } from 'vue-api-query';
import ME from '@/models/Me';
import store from '../store';

const { HOSTNAME } = { HOSTNAME: process.env.SERVER_URL};

const API_URL = `${HOSTNAME}`;
const REGISTRATION_URL = `${API_URL}/1/register`;
const SESSION_URL = `${API_URL}/api/login`;
const CURRENT_USER_URL = `${API_URL}/1/me`;
const LOGOUT_USER_URL = `${API_URL}/1/logout`;

const TOKEN_KEY = "manage_id_token";

export default {
  user: {
    authenticated: !!window.localStorage.getItem(TOKEN_KEY),
    me: {}
  },

  login(context, creds, successCallback, errorCallback) {
    context.$http.post(SESSION_URL, creds)
      .then((resp) => {
        this.setToken(resp.data.access_token);

        this.setHeaders(context);

        if (successCallback) {
          successCallback(resp.data);
        }
      }, (resp) => {
        if (errorCallback){
          errorCallback(resp);
        }
      });
  },

  signupOrSignin(context, email, password, callback) {
    context.$http.post(`${REGISTRATION_URL}`, {username: email, password: password}, {'ContentType' : 'application/json'})
      .then((resp) => {
        if (callback){
          callback(resp.data);
        }
      }, (resp) => {
        context.error = resp.body;
      });
  },

  setToken(token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  },

  setHeaders(context){
    this.user.authenticated = true;
    context.$http.defaults.headers.common.Authorization = this.getAuthHeader().Authorization;
    Model.$http.defaults.headers.common.Authorization = this.getAuthHeader().Authorization;
  },

  setTenantHeaders(context) {
    context.$http.defaults.headers.common['gorm-tenantid'] = this.resolveTenantId();
    context.$http.defaults.headers.common.gorm_tenantid = this.resolveTenantId();
    Model.$http.defaults.headers.common['gorm-tenantid'] = this.resolveTenantId();
    Model.$http.defaults.headers.common.gorm_tenantid = this.resolveTenantId();
  },

  unsetToken() {
    window.localStorage.removeItem(TOKEN_KEY);
    this.user = {
      authenticated: false
    }
  },

  currentUser(context, required, cb) {

    this.setTenantHeaders(context);
    let user = context.$ls.get("user");
    if (user){
      this.user = user;
    }
    if (!this.user.authenticated || this.user.id === undefined){
      context.$http.get(CURRENT_USER_URL, { headers: this.getAuthHeader() })
        .then((resp) => {
          // context.user = { username: resp.data.username };
          store.dispatch("user/getUserFromApi" , resp.data);

          this.user.id = resp.data.id;
          this.user.username = resp.data.username;
          this.user.email = resp.data.emailAddress;
          this.user.avatar =  resp.data.pictureUrl;
          this.user.displayName = resp.data.displayName;


          this.user.defaultGroupId = resp.data.defaultGroupId;
          this.user.defaultCalendarId = resp.data.defaultCalendarId;
          this.user.customer = resp.data.customer;
          this.user.me = resp.data;

          this.setHeaders(context);

          context.$ls.set("user", this.user, 1000 * 60 * 10);
          /*if(!resp.data.onboarded){

            if(resp.data.onboardingPath==="OM"){

              context.$router.push('/company-form')
            }else{
              context.$router.push('/employee-form')
            }
          }else{
            context.$router.push('/company')
          }*/

          if (cb !== undefined){
            cb();
          }
        })
        .catch(
          (e) => {
            console.error(e);
            this.unsetToken();
            if (required) {
              context.$router.push({path:'/signin'});
            }
          })
    } else {
      this.setHeaders(context);

      if (cb !== undefined){
        cb();
      }
    }

  },

  logout(context, options) {
    context.$http.get(LOGOUT_USER_URL, options)
      .then(data => {
        window.localStorage.removeItem(TOKEN_KEY);
        this.user = {
          authenticated: false
        };
        context.$http.defaults.headers.Authorization = null;
        context.$router.push({ path: '/signin' });
      }, error => {
        window.localStorage.removeItem(TOKEN_KEY);
        this.user = {
          authenticated: false
        }
        context.$http.defaults.headers.Authorization = null;
        context.$router.push({ path: '/signin' });
      });
  },

  checkAuth() {
    const jwt = window.localStorage.getItem(TOKEN_KEY);
    this.user.authenticated = !!jwt;
  },

  getAuthHeader() {
    this.checkAuth();
    if (this.user.authenticated) {
      return {
        Authorization: `Bearer ${window.localStorage.getItem(TOKEN_KEY)}`,
      };
    }
    return {};
  },
  getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  },
  resolveTenantId(){
    let tenantId = document.location.hostname.replace(".dev.262days.com","");
    tenantId = tenantId.replace(".262days.com","");

    if (tenantId === "cheerz" && document.location.hostname.endsWith("dev.262days.com")){
      tenantId = "cheerz_dev";
    }

    if (document.location.hostname.startsWith("app") || document.location.hostname.startsWith("dev")){
      tenantId = "DEFAULT";
    }

    return tenantId;
  }

};
