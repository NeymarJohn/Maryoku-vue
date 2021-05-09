import Vue from "vue";
import { postReq, getReq } from "@/utils/token";
import { VendorPolicy, VendorPricingPolicy } from "@/constants/vendor";
import CalendarEvent from "@/models/CalendarEvent";
import ProposalRequestRequirement from "@/models/ProposalRequestRequirement";

const state = {
  id: null,
  step: 1,
  types: {},
  mainRequirements: {},
  specialRequirements: {}
}
const getters = {

}
const actions = {
  getRequirements({ commit, state }, eventId) {
    return new Promise((resolve, reject) => {
      new ProposalRequestRequirement()
        .for(new CalendarEvent({ id: eventId }))
        .get()
        .then((res) => {
          const currentRequirement = res[0]
          commit("setData", { key: "id", value: currentRequirement.id })
          commit("setData", { key: "types", value: currentRequirement.types })
          commit("setData", { key: "mainRequirements", value: currentRequirement.mainRequirements })
          commit("setData", { key: "specialRequirements", value: currentRequirement.specialRequirements })
          resolve(currentRequirement)
        })
        .catch(err => {
          reject(err)
        });
    });
  }

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
