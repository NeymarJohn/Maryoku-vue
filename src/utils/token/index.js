import axios from 'axios'

const TOKEN = 'user_token'

export const setToken = (token) => localStorage.setItem(TOKEN, token)

export const getToken = () => localStorage.getItem(TOKEN)

export const deleteToken = () => localStorage.removeItem(TOKEN)

export const getReq = (endpoint) => {
  const getRequest = {
    method: 'get',
    url: `${process.env.SERVER_URL}${endpoint}`
  };
  if (window.localStorage.getItem('manage_id_token') && window.localStorage.getItem('manage_id_token') !== "undefined") {
    getRequest["headers"] = { 'Authorization': `Bearer ${window.localStorage.getItem('manage_id_token')}` }
  }
  return axios(getRequest)
}
export const postReq = (endpoint, data) => {
  console.log(`${process.env.SERVER_URL}${endpoint}`)
  return axios({
    method: 'post',
    url: `${process.env.SERVER_URL}${endpoint}`,
    headers: { 'Authorization': `Bearer ${window.localStorage.getItem('manage_id_token')}` },
    data
  })
}