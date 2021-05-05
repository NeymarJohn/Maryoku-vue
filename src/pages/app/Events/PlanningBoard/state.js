import Vue from "vue";
import { postReq, getReq } from "@/utils/token";
import { VendorPolicy, VendorPricingPolicy } from "@/constants/vendor";
const state = {
  step: 1,
  types: {},
  mainRequirements: {},
  specialRequirements: {}
}
const getters = {

}
const actions = {

}
const mutations = {
  setStep(state, step) {
    state.step = step;
  },
  setData(state, { key, value }) {
    Vue.set(state, key, value)
  },
  setMainRequirements(state, { category, data }) {
    Vue.set(state.mainRequirements, category, data)
  },
  setTypes(state, { category, type, data }) {
    if (!state.types[category])
      Vue.set(state.types, category, {})
    Vue.set(state.types[category], type, data)
  },
  setSpecialRequirements(state, data) {
    Vue.set(state, 'specialRequirements', data)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
