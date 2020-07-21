
import axios from 'axios';
import store from '../store'

const { SERVER_URL, HOST_URL } = { SERVER_URL: process.env.SERVER_URL, HOST_URL: process.env.HOST_URL}

const API_URL = `${SERVER_URL}`
const HOSTNAME = `${HOST_URL}`
const REGISTRATION_URL = `${API_URL}/1/register`
const REGISTRATION_RSVP_URL = `${API_URL}/1/register-rsvp`
const LOGIN_URL = `${API_URL}/api/login`
const VALIDATE_URL = `${API_URL}/api/validate`
const FORGOT_PASSWORD_URL = `${API_URL}/1/forgot-password`
const CURRENT_USER_URL = `${API_URL}/1/me`
const CURRENT_TENANT_USER = `${API_URL}/1/userInfo`
const LOGOUT_USER_URL = `${API_URL}/1/logout`
import Vue from 'vue'
import authHeader from './auth-header';
import { Model } from 'vue-api-query'

class AuthService {
  login(user) {
    localStorage.removeItem('user');
    localStorage.removeItem('manage_id_token');
    return axios
      .post(LOGIN_URL, {
        email: user.email.toLowerCase(),
        password: user.password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('manage_id_token', response.data.access_token)
          localStorage.setItem('user', JSON.stringify(response.data));
          axios.defaults.headers.common.Authorization = authHeader().Authorization
          this.setTenant(response.data.currentTenant)
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('manage_id_token')
    axios.defaults.headers.common.Authorization = null
  }

  register(user) {
    return axios.post(REGISTRATION_URL, {
      username: user.email.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
      company: user.company,
      name: user.name,
      role: user.role
    });
  }

  setTenant(tenantId) {
    axios.defaults.headers.common['gorm-tenantid'] = tenantId
    axios.defaults.headers.common.gorm_tenantid = tenantId
  }

  resolveTenantId () {
    let tenantId = document.location.hostname.replace('.dev.maryoku.com', '')
    tenantId = tenantId.replace('.local.maryoku.com', '')
    tenantId = tenantId.replace('.maryoku.com', '')
    if (document.location.hostname.startsWith('app') || document.location.hostname.startsWith('dev') || document.location.hostname.startsWith('local')) {
      tenantId = 'DEFAULT'
    }
    return tenantId
  }

  resolveStaging() {
    if (document.location.hostname.indexOf('dev.maryoku.com') >= 0) {
      return 'dev'
    } else if (document.location.hostname.indexOf('local.maryoku.com') >= 0) {
      return 'local'
    } else 
      return ''
  }

  checkToken(token) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    return axios.post(VALIDATE_URL).then(response=>{
      if (response.data.access_token) {
        localStorage.setItem('manage_id_token', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(response.data));
        axios.defaults.headers.common.Authorization = authHeader().Authorization
      }
      return response.data;
    });
  }
  getAppUrl(tenantId) {
    let hostname = HOSTNAME
    if (hostname.startsWith('app.maryoku.com')) {
      hostname = 'maryoku.com'
    }
    return `${document.location.protocol}//${document.location.hostname}:${document.location.port}`
  }
  setInvitationEvent(tenantId, event) {
    window.localStorage.setItem("invitaion", { tenantId, event });
  }
}

export default new AuthService();