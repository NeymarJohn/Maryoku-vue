/* const { SCHEME, HOSTNAME } =
  process.env.NODE_ENV === 'production'
    ? {SCHEME: 'https', HOSTNAME: 'api.262days.com'}
    : {SCHEME: 'http', HOSTNAME: process.env.SERVER_URL} */

const { HOSTNAME } = { HOSTNAME: 'https://api-dev.262days.com'};

const API_URL = `${HOSTNAME}`;
const REGISTRATION_URL = `${API_URL}/1/register`;
const SESSION_URL = `${API_URL}/api/login`;
const CURRENT_USER_URL = `${API_URL}/1/me`;

const TOKEN_KEY = "manage_id_token";

export default {
  user: {
    authenticated: !!window.localStorage.getItem(TOKEN_KEY),
  },

  login(context, creds, redirect) {
    context.$http.post(SESSION_URL, creds)
      .then((resp) => {
        this.setToken(resp.data.access_token);

        this.setHeaders(context);

        if (redirect) {
          context.$router.push({ path: redirect });
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
  },

  unsetToken() {
    window.localStorage.removeItem(TOKEN_KEY);
    this.user.authenticated = false;
  },

  currentUser(context, required) {
    context.$http.get(CURRENT_USER_URL, { headers: this.getAuthHeader() })
      .then((resp) => {
        context.user = { username: resp.data.username };
        if (required){
          context.$router.push({
            path: '/'
          });
        }
      }, (_) => {
        this.unsetToken();
        if (required) {
          context.$router.push({
            path: '/signin'/*,
            query: { redirect: context.$route.fullPath },*/
          });
        }
      });
  },

  signup(context, creds, redirect) {
    context.$http.post(REGISTRATION_URL, creds)
      .then((resp) => {
        window.localStorage.setItem(TOKEN_KEY, resp.access_token);
        this.user.authenticated = true;

        if (redirect) {
          context.$router.push({ path: redirect });
        }
      }, (resp) => {
        context.errors = resp.body.errors;
      });
  },

  logout(context, options) {
    /* context.$http.delete(SESSION_URL, options)
      .then(data => {
        window.localStorage.removeItem(TOKEN_KEY)
        this.user.authenticated = false
        context.$router.push({path: '/signin'})
      }, error => {

      }) */
    window.localStorage.removeItem(TOKEN_KEY);
    this.user.authenticated = false;
    context.$http.defaults.headers.Authorization = null;
    context.$router.push({ path: '/signin' });
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
};
