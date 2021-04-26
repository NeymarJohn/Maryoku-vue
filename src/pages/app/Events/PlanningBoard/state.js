import Vue from "vue";
import { postReq, getReq } from "@/utils/token";
import { VendorPolicy, VendorPricingPolicy } from "@/constants/vendor";
const state = {
  step: 1,
}
const getters = {

}
const actions = {

}
const mutations = {
  setStep(state, step) {
    state.step = step;
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
