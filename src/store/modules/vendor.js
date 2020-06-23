import { postReq, getReq } from '@/utils/token'

const state = {
  vendors: [],
  allProperties:[],
}

const getters = {
  getAllProperties: (state)=>{
    return state.allProperties
  },
  getPropertiesByCategory: (state) => (category) => {

  }

}

const actions = {
  fetchAllProperties: ({ commit, state }, categoryName) => {
    return new Promise((resolve, reject)=>{
      // getting from store
      if (state.allProperties.length > 0) {
        if (!categoryName) {
          resolve(state.allProperties);
          return
        }
        const vendersByCategory = state.allProperties.filter(item=>{
          return item.vendorCategories.indexOf(categoryName) >= 0
        })
        resolve(vendersByCategory)
        return
      }
      // getting from API
      getReq(`/1/vendorProperties`).then(res=>{
        commit('setAllProperties', res.data)
        if (!categoryName) {
          resolve(res.data);
          return
        }
        const vendersByCategory = res.data.filter(item=>{
          return item.vendorCategories.indexOf(categoryName) >= 0
        })
        resolve(vendersByCategory?vendersByCategory:[])
        return
      })
    })
  }
}

const mutations = {
  setAllProperties (state, data) {
    state.allProperties = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}