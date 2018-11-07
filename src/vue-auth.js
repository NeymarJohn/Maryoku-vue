import Vue from 'vue'
import VueAuth from '@websanova/vue-auth'
import HttpDriver from '@websanova/vue-auth/drivers/http/axios.1.x'
import VueRouterDriver from '@websanova/vue-auth/drivers/router/vue-router.2.x'
import querystring from 'querystring'

export default function () {

  Vue.use(VueAuth, {
    rolesVar: 'role',
    parseUserData (data) {
      return data;
    },
    auth: {
      request (req, token) {
        this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token});
      },

      response (res) {
        const {access_token, refresh_token, expires_in} = res.data;
        if (res.data && access_token && refresh_token && expires_in) { /*get tokens if none present then*/
          let expires_inDate = new Date();
          /*get exact time of expiration token*/
          expires_inDate.setSeconds(expires_inDate.getSeconds() + expires_in)
          localStorage.setItem('expires_in', expires_inDate)
          localStorage.setItem('refresh_token', refresh_token)
          return access_token;
        }
      }
    },
    http: HttpDriver,
    router: VueRouterDriver,
    loginData: {
      headers: {
        'Content-Type': 'application/json',
      },
      url: 'auth/token',
    },
    /*Default refresh request data and redirect.*/
    refreshData: {
      /*send refresh token before expiring to renew tokens*/
      url: 'auth/refresh',
      method: 'POST',
      enabled: true,
      interval: 0, /*0=no auto refresh*/
      /*Problem: requests new refresh token without checking the expiration date*/
      fetchUser: false,
    },
    tokenExpired() {
      const expires_in = localStorage.getItem('expires_in')
      const now = new Date();
      const isExpired = expires_in && new Date(expires_in) < now
      if(isExpired){
        Vue.auth.options.refreshData.data = querystring.stringify({
          refresh_token: getRefreshToken()
        });
      }
      return isExpired
    },
    tokenDefaultName: 'access_token',
  });
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}
