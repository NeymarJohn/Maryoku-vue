import Vue from "vue";
import { postReq, getReq } from '@/utils/token'
import { cat } from 'shelljs'
import Vendors from "@/models/Vendors";
import ProposalRequest from "@/models/ProposalRequest";
import { reject, resolve } from 'promise-polyfill';

const state = {
  vendor: null,
  proposalRequest: null,
  proposalServices: {},
  discounts: {},
  taxes: {},
  legalDocs: {},
  wizardStep: 0,
  initStep: 0

}
const getters = {}
const mutations = {
  setVendor: (state, vendor) => {
    state.vendor = vendor
  },
  setPropsalRequest: (state, propsoalRequest) => {
    state.proposalRequest = propsoalRequest
  },
  setWizardStep: (state, step) => {
    state.wizardStep = step;
  },
  setInitStep: (state, step) => {
    state.initStep = step
  },
  setServices: (state, { category, services }) => {
    Vue.set(state.proposalServices, category, services);
  },
  setLegalDocs: (state, { category, files }) => {
    state.legalDocs[category] = files
  },
  setDiscount: (state, { category, discount }) => {
    Vue.set(state.discounts, category, discount);
  },
  setTax: (state, { category, tax }) => {
    Vue.set(state.taxes, category, tax);
  }
}
const actions = {
  getVendor: ({ commit, state }, vendorId) => {
    return new Promise((resolve, reject) => {
      Vendors.find(vendorId)
        .then((resp) => {
          commit("setVendor", resp);
          resolve(resp)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getProposalRequest: ({ commit, state }, requestId) => {
    return new Promise((resolve, reject) => {
      ProposalRequest.find(requestId)
        .then((resp) => {
          commit("setPropsalRequest", resp);
          resolve(resp)
        })
    })
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
