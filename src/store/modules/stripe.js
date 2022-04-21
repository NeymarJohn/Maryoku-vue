import {postReq, getReq} from "@/utils/token";

const state = {
  bankToken: "",
  account:{},
};
const getters = {
  getBankToken: (state) => {
    return state.bankToken;
  },
  setStripeAccount: (state) => {
    return state.account = account;

  },
};

const actions = {
  createDestinationAccount: ({commit, state}, data) => {
    return postReq("/1/billing-information", data).then((res) => {
      commit("setBankToken", res.data.token);
      return res.data.token;
    });
  },
  createStripeAccount: ({commit, state}, data) => {
    return postReq("/stripe/v1/account", data).then((res) => {
      commit("setStripeAccount", res.data);
      return res.data;
    });
  },
};

const mutations = {
  setBankToken(state, bankToken) {
    state.bankToken = bankToken;
  },
  setStripeAccount(state, account) {
    state.account = account;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
