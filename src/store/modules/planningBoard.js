import Vue from "vue";
import Cart from "@/models/Cart";
import CalendarEvent from "@/models/CalendarEvent";
import ProposalRequestRequirement from "@/models/ProposalRequestRequirement";
import Proposal from "@/models/Proposal";

const getDefaultState = () => {
  return {
    step: 1,
    requirements: {},
    specialRequirements: {},
    cart: {},
    favorite: {},
    types: {},
    proposal: null,
    original: null,
    currentVersion: -1,
    proposals: {}
  };
};
const state = getDefaultState();

const setStateFromData = (proposal, data) => {
  Object.keys(data).map((key) => {
    Vue.set(proposal, key, JSON.parse(JSON.stringify(data[key])));
  });
};

const getters = {};
const actions = {
  resetRequirements({ commit }) {
    commit("resetRequirements");
  },
  resetCartItems({ commit }) {
    commit("resetCartItems");
  },
  getRequirements({ commit, state }, eventId) {
    return new Promise((resolve, reject) => {
      new ProposalRequestRequirement()
        .for(new CalendarEvent({ id: eventId }))
        .get()
        .then((res) => {
          if (res && res.length) {
            res.forEach((requirement) => {
              commit("setCategoryRequirements", { category: requirement.category, requirement });
            });
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getCartItems({ commit, state }, eventId) {
    return new Promise((resolve, reject) => {
      new Cart()
        .for(new CalendarEvent({ id: eventId }))
        .get()
        .then((res) => {
          if (res && res.length) {
            res.forEach((item) => {
              commit("setCategoryCartItem", { category: item.category, item });
            });
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  saveTypes({ commit, state }, { event, category, types }) {
    let requirements = state.requirements[category];
    if (!requirements) requirements = { event: { id: event.id }, category };
    requirements.types = { ...requirements.types, ...types };
    return new Promise((resolve, reject) => {
      new ProposalRequestRequirement(requirements)
        .for(new CalendarEvent({ id: event.id }))
        .save()
        .then((res) => {
          commit("setCategoryRequirements", { category, requirement: res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  saveRequiementSheet({ commit, state }, { event, category, requirements }) {
    let originalRequirements = state.requirements[category];
    if (!originalRequirements) originalRequirements = { event: { id: event.id }, category };
    originalRequirements = { ...originalRequirements, ...requirements };
    return new Promise((resolve, reject) => {
      new ProposalRequestRequirement(originalRequirements)
        .for(new CalendarEvent({ id: event.id }))
        .save()
        .then((res) => {
          commit("setCategoryRequirements", { category, requirement: res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  saveMainRequirements({ commit, state }, { event, category, requirements }) {
    return new Promise((resolve, reject) => {
      let originalRequirements = state.requirements[category];
      if (!originalRequirements) originalRequirements = { event: { id: event.id }, category };
      originalRequirements = { ...originalRequirements, ...requirements };

      new ProposalRequestRequirement(originalRequirements)
        .for(new CalendarEvent({ id: event.id }))
        .save()
        .then((res) => {
          commit("setCategoryRequirements", { category, requirement: res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateRequirements({ commit, state }, requirements) {
    return new Promise((resolve, reject) => {
      new ProposalRequestRequirement(requirements)
        .for(new CalendarEvent({ id: requirements.event.id }))
        .save()
        .then((res) => {
          commit("setCategoryRequirements", { category: res.category, requirement: res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateCartItem({ commit, state }, item) {
    return new Promise((resolve, reject) => {
      new Cart(item)
        .for(new CalendarEvent({ id: item.event.id }))
        .save()
        .then((res) => {
          commit("setCategoryCartItem", { category: res.category, item: res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  removeCartItem({ commit, state }, item) {
    return new Promise((resolve, reject) => {
      new Cart(item)
        .for(new CalendarEvent({ id: item.event.id }))
        .delete()
        .then((res) => {
          commit("removeCategoryCartItem", { category: item.category });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getProposals({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      new Proposal()
        .params({eventId: payload.event.id})
        .get()
        .then((result) => {
          payload.event.components.map((c) => {
            let proposals = result.filter((it) => it.eventComponentId == c.id) || [];
            commit("setProposalsByCategory", { category: c.componentId, proposals });
          });
          resolve(result);
        });
    });
  },
  updateProposal({ commit, state }, payload) {

    const proposals = state.proposals[payload.category];

    return new Promise((resolve, reject) => {

      new Proposal({ ...payload.proposal }).save().then((result) => {
        if (proposals) {
          let index = proposals.findIndex((p) => p.id == payload.proposal.id);

          Vue.set(proposals, index, result);
          commit("setProposalsByCategory", { category: payload.category, proposals });
        }
        resolve(result);
      });
    });
  },
};
const mutations = {
  resetRequirements(state) {
    Vue.set(state, "requirements", {});
  },
  resetCartItems(state) {
    Vue.set(state, "cart", {});
  },
  setStep(state, step) {
    state.step = step;
  },
  setData(state, { key, value }) {
    Vue.set(state, key, value);
  },
  setCategoryRequirements(state, { category, requirement }) {
    Vue.set(state.requirements, category, requirement);
  },
  setMainRequirements(state, { category, data }) {
    Vue.set(state.mainRequirements, category, data);
  },
  setCategoryTypes(state, { category, types }) {
    Vue.set(state.types, category, types);
  },
  setTypes(state, { category, type, data }) {
    if (!state.types[category]) Vue.set(state.types, category, {});
    Vue.set(state.types[category], type, data);
  },
  setSpecialRequirements(state, data) {
    Vue.set(state, "specialRequirements", data);
  },
  setCategoryCartItem(state, { category, item }) {
    Vue.set(state.cart, category, item);
  },
  removeCategoryCartItem(state, { category }) {
    Vue.delete(state.cart, category);
  },
  selectVersion: (state, index) => {
    state.currentVersion = index;
    if (index === -1) {
      setStateFromData(state.proposal, JSON.parse(JSON.stringify(state.original)));
    }
    if (index > -1) {
      setStateFromData(state.proposal, JSON.parse(JSON.stringify(state.proposal.versions[index].data)));
    }
  },
  setVersions: (state, versions) => {
    state.proposal.versions = versions;
  },
  setProposalsByCategory(state, { category, proposals }) {
    Vue.set(state.proposals, category, proposals);
  },

  setProposal: (state, proposal) => {
    state.proposal = proposal;
    Vue.set(state, "original", proposal);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
