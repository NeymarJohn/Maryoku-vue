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
          res.forEach(requirements => {
            commit("setCategoryRequirements", { category: requirements.category, requirements })
          })
          resolve(res)
        })
        .catch(err => {
          reject(err)
        });
    });
  },
  saveTypes({ commit, state }, { event, category, types }) {
    let requirements = state[category];
    if (!requirements) requirements = { event: { id: event.id }, category };
    requirements.types = { ...requirements.types, ...types };
    return new Promise((resolve, reject) => {
      new ProposalRequestRequirement(requirements)
        .for(new CalendarEvent({ id: event.id }))
        .save()
        .then((res) => {
          commit("setCategoryRequirements", { category, requirements: res })
          resolve(res)
        })
        .catch(err => {
          reject(err)
        });
    });
  },
  saveRequiementSheet({ commit, state }, { event, category, requirements }) {
    let originalRequirements = state[category];
    if (!originalRequirements) originalRequirements = { event: { id: event.id }, category };
    originalRequirements = { ...originalRequirements, ...requirements }
    return new Promise((resolve, reject) => {
      new ProposalRequestRequirement(originalRequirements)
        .for(new CalendarEvent({ id: event.id }))
        .save()
        .then((res) => {
          commit("setCategoryRequirements", { category, requirements: res })
          resolve(res)
        })
        .catch(err => {
          reject(err)
        });
    });
  },
  saveMainRequirements({ commit, state }, { event, category, requirements }) {
    let originalRequirements = state[category];
    if (!originalRequirements) originalRequirements = { event: { id: event.id }, category };
    // originalRequirements.mainRequirements = requirements
    originalRequirements = { ...originalRequirements, ...requirements }
    return new Promise((resolve, reject) => {
      new ProposalRequestRequirement(originalRequirements)
        .for(new CalendarEvent({ id: event.id }))
        .save()
        .then((res) => {
          commit("setCategoryRequirements", { category, requirements: res })
          resolve(res)
        })
        .catch(err => {
          reject(err)
        });
    });
  },
  updateRequirements({ commit, state }, requirements) {
    return new Promise((resolve, reject) => {
      new ProposalRequestRequirement(requirements)
        .for(new CalendarEvent({ id: requirements.event.id }))
        .save()
        .then((res) => {
          commit("setCategoryRequirements", { category: res.category, requirements: res })
          resolve(res)
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
  setCategoryRequirements(state, { category, requirements }) {
    Vue.set(state, category, requirements)
  },
  setMainRequirements(state, { category, data }) {
    Vue.set(state.mainRequirements, category, data)
  },
  setCategoryTypes(state, { category, types }) {
    Vue.set(state.types, category, types)
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
