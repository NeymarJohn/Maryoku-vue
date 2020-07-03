
import axios from 'axios';
import store from '../store'

const { HOSTNAME } = { HOSTNAME: process.env.SERVER_URL }

const API_URL = `${HOSTNAME}`
const REGISTRATION_URL = `${API_URL}/1/register`
const REGISTRATION_RSVP_URL = `${API_URL}/1/register-rsvp`
const LOGIN_URL = `${API_URL}/api/login`
const FORGOT_PASSWORD_URL = `${API_URL}/1/forgot-password`
const CURRENT_USER_URL = `${API_URL}/1/me`
const CURRENT_TENANT_USER = `${API_URL}/1/userInfo`
const LOGOUT_USER_URL = `${API_URL}/1/logout`
import Vue from 'vue'
import authHeader from './auth-header';
import { Model } from 'vue-api-query'

class AuthService {
  login(user) {
    return axios
      .post(LOGIN_URL, {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('manage_id_token', response.data.access_token)
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();