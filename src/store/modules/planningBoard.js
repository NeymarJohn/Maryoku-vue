import Vue from "vue";
import Cart from "@/models/Cart";
import CalendarEvent from "@/models/CalendarEvent";
import ProposalRequestRequirement from "@/models/ProposalRequestRequirement";

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
    currentVersion: -1
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
  setProposal: ({ commit, state }, proposal) => {
    commit("setProposal", proposal);
  }
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
    console.log('state.setReq', category, requirement)
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
  setProposal: (state, proposal) => {
    state.proposal = proposal;
    state.proposal.versions = proposal.versions || [];
    state.currentVersion = -1;
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
