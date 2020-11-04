import { postReq, getReq } from '@/utils/token'

const state = {
  serviceCategories: []
}
const mutations = {
  setCategories: (state, categories) => {
    state.serviceCategories = categories
  },
}
const actions = {
  fetchAllCategories: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      // getting from API
      getReq(`/1/components`).then(res => {
        commit('setCategories', res.data)
        resolve(res.data);
      }).catch(err => {
        reject(err)
      })
    })
  },
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}