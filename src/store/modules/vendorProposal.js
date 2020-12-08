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
  proposalCostServices: {},
  proposalIncludedServices: {},
  proposalExtraServices: {},
  discounts: {},
  taxes: {},
  legalDocs: {},
  wizardStep: 0,
  initStep: 0,
  additionalServices: [],
  attachments: {},
  bundleDiscount: {
    isApplied: false,
    services: [],
    discountPercentage: 0,
    discountAmount: 0
  },
  suggestionDate: null,
}
const getters = {
  mainTotalPrice(state) {
    const mainService = state.vendor.eventCategory.key
    if (!state.proposalServices[mainService]) return 0
    const sumPrice = state.proposalServices[mainService].reduce((s, item) => {
      return s + item.requirementValue * item.price;
    }, 0);
    let taxRate = state.taxes[mainService];
    let discount = state.discounts[mainService] || 0
    if (!taxRate) taxRate = 0;
    let total = sumPrice - (sumPrice * discount) / 100;
    const tax = (total * taxRate) / 100;
    const result = total - tax
    return result;
  },
  pricesByCategory(state, getters) {
    const prices = {}
    state.additionalServices.forEach(service => {
      if (!state.proposalServices[service]) {
        prices[service] = 0
      }
      if (state.proposalServices[service]) {
        const sumPrice = state.proposalServices[service].reduce((s, item) => {
          return s + item.requirementValue * item.price;
        }, 0);
        let taxRate = state.taxes[service];
        let discount = state.discounts[service] || 0
        if (!taxRate) taxRate = 0;
        let total = sumPrice - (sumPrice * discount) / 100;
        const tax = (total * taxRate) / 100;
        prices[service] = total - tax;
      }

    })
    prices[state.vendor.eventCategory.key] = getters.mainTotalPrice
    return prices
  }
}
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
  setCostServices: (state, { category, services }) => {
    Vue.set(state.proposalCostServices, category, services);
  },
  setIncludedServices: (state, { category, services }) => {
    Vue.set(state.proposalIncludedServices, category, services);
  },
  setExtraServices: (state, { category, services }) => {
    Vue.set(state.proposalExtraServices, category, services);
  },
  setLegalDocs: (state, { category, files }) => {
    Vue.set(state.legalDocs, category, files)
  },
  addLegalDoc: (state, { category, docTag, obj }) => {
    Vue.set(state.legalDocs[category], docTag, obj)
  },
  setDiscount: (state, { category, discount }) => {
    Vue.set(state.discounts, category, discount);
  },
  setTax: (state, { category, tax }) => {
    Vue.set(state.taxes, category, tax);
  },
  setAdditionalServices: (state, services) => {
    Vue.set(state.additionalServices, services)
  },
  removeCategoryFromAdditional: (state, category) => {
    const index = state.additionalServices.findIndex((item) => item == category);
    state.additionalServices.splice(index, 1);
  },
  setBundleDiscount: (state, bundleDiscount) => {
    state.bundleDiscount = bundleDiscount
  },
  setValue: (state, { key, value }) => {
    Vue.set(state, key, value)
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
