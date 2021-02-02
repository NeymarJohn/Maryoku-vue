import { postReq, getReq } from '@/utils/token'
import { cat } from 'shelljs'


const state = {
  isEditing: false,
  step: 0,
  status: null,
  vendor: {
    vendorImages: []
  },
  vendor_categories: [],
  vendors: [],
  allProperties: [],
  properties: {}
}

const getters = {
  getAllProperties: (state) => {
    return state.allProperties
  },
  getPropertiesByCategory: (state) => (category) => {

  },
  getStatus: state => state.status,

  getRoading: state => state.loading,

  getVendorCategories: state => state.vendor_categories,

  getVendors: state => state.vendors,

  getVendor: state => state.vendor,

  getStep: state => state.step,
}

const actions = {
  fetchAllProperties: ({ commit, state }, categoryName) => {
    return new Promise((resolve, reject) => {
      // getting from store
      if (state.allProperties.length > 0) {
        if (!categoryName) {
          resolve(state.allProperties);
          return
        }
        const vendersByCategory = state.allProperties.filter(item => {
          return item.vendorCategories.indexOf(categoryName) >= 0
        })
        resolve(vendersByCategory)
        return
      }
      // getting from API
      getReq(`/1/vendorProperties`).then(res => {
        commit('setAllProperties', res.data)
        if (!categoryName) {
          resolve(res.data);
          return
        }
        const vendersByCategory = res.data.filter(item => {
          return item.vendorCategories.indexOf(categoryName) >= 0
        })
        resolve(vendersByCategory ? vendersByCategory : [])
        return
      })
    })
  },
  getProperties: ({ commit, state }, categoryName) => {
    if (!state[categoryName]) {

    }
  }
}

const mutations = {
  setAllProperties(state, data) {
    state.allProperties = data
  },
  SET_LOADING(state) {
    state.loading = true;
  },
  GET_VENDORS(state, data) {
    state.loading = false;
    state.vendors = data.vendors;
    state.vendor_categories = data.vendor_categories
  },
  setStep(state, step) {
    state.step = step;
  },
  setEditing(state, editing) {
    state.isEditing = editing;
  },
  setVendor(state, vendor) {
    state.vendor = vendor;
  },
  SET_DATA(state, data) {
    state.vendor = data;
    state.status = { code: 200, title: 'Success to save!', message: "Your vendor is saved successfully." }
  },
  FAILED(state, message) {
    state.status = { code: 500, title: "Failed to save!", message: "Sorry, we can't save your vendor." };
  },
  RESET(state) {
    state.status = null;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
