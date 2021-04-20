import Vue from "vue";
import { postReq, getReq } from "@/utils/token";
import Vendors from "@/models/Vendors";
import ProposalRequest from "@/models/ProposalRequest";
import Proposal from "@/models/Proposal";
import { reject, resolve } from "promise-polyfill";
import EventTimelineDate from "@/models/EventTimelineDate";
import CalendarEvent from "@/models/CalendarEvent";
import authService from "@/services/auth.service";

const state = {
  vendor: null,
  initialized: false,
  proposalRequest: null,
  proposalServices: {},
  proposalCostServices: {},
  proposalIncludedServices: {},
  proposalExtraServices: {},
  discounts: {},
  taxes: {},
  totalTax: {
    percentage: 0,
    price: 0,
  },
  totalDiscount: {
    percentage: 0,
    price: 0,
  },
  legalDocs: {},
  wizardStep: 0,
  initStep: 0,
  additionalServices: [],
  attachments: {},
  inspirationalPhotos: new Array(15),
  coverImage: "",
  bundleDiscount: {
    isApplied: false,
    services: [],
    percentage: 0,
    price: 0,
  },
  suggestionDate: null,
  timelineDates: [],
  personalMessage: "",
  suggestedNewSeatings: null,
  tenantId: authService.resolveTenantId()
};
const getters = {
  originalPriceOfMainCategory(state) {
    const mainService = state.vendor.eventCategory.key;
    if (!state.proposalCostServices[mainService]) return 0;
    const sumPrice = state.proposalCostServices[mainService].reduce((s, item) => {
      if (item.isComplimentary) return s;
      return s + item.requirementValue * item.price;
    }, 0);
    return sumPrice;
  },
  totalPriceByCategory(state, getters) {
    const prices = {};
    state.additionalServices.forEach(service => {
      if (!state.proposalCostServices[service]) {
        prices[service] = 0;
      }
      if (state.proposalCostServices[service]) {
        const sumPrice = state.proposalCostServices[service].reduce((s, item) => {
          if (item.isComplimentary) return s;
          return s + item.requirementValue * item.price;
        }, 0);
        prices[service] = sumPrice;
      }
    });
    prices[state.vendor.eventCategory.key] = getters.originalPriceOfMainCategory;
    return prices;
  },

  finalPriceOfMainCategory(state, getters) {
    const mainService = state.vendor.eventCategory.key;
    if (!state.proposalCostServices[mainService]) return 0;
    const sumPrice = getters.originalPriceOfMainCategory;
    let tax = state.taxes[mainService] || { price: 0, percentage: 0 };
    let discount = state.discounts[mainService] || { price: 0, percentage: 0 };

    if (!discount.price && discount.percentage > 0) {
      discount.price = Math.round((sumPrice * discount.percentage) / 100);
    }
    let total = sumPrice - discount.price;
    const taxPrice = Math.round((total * tax.percentage) / 100);
    const result = total + taxPrice;
    return result;
  },
  pricesByCategory(state, getters) {
    const prices = {};
    state.additionalServices.forEach(service => {
      if (!state.proposalCostServices[service]) {
        prices[service] = 0;
      }
      if (state.proposalCostServices[service]) {
        const sumPrice = state.proposalCostServices[service].reduce((s, item) => {
          if (item.isComplimentary) return s;
          return s + item.requirementValue * item.price;
        }, 0);
        let taxRate = state.taxes[service];
        if (!taxRate) taxRate = 0;
        let discount = state.discounts[service] || { price: 0, percentage: 0 };
        let total = sumPrice - discount.price;
        const tax = Math.round((total * taxRate) / 100);
        prices[service] = total + tax;
      }
    });
    prices[state.vendor.eventCategory.key] = getters.finalPriceOfMainCategory;
    console.log("prices", prices);
    return prices;
  },
  sumOfPrices(state, getters) {
    let s = 0;
    Object.keys(getters.totalPriceByCategory).forEach((category) => {
      s += getters.totalPriceByCategory[category];
    });
    return s;
  },
  totalBeforeDiscount(state, getter) {
    let sum = 0;
    Object.keys(getter.totalPriceByCategory).forEach(category => {
      sum += Number(getter.totalPriceByCategory[category])
    })
    // check tax
    let tax = state.taxes['total'] || { price: 0, percentage: 0 };
    sum = sum + sum * tax.percentage / 100;
    return sum.toFixed(2);
  },
  totalBeforeBundle(state, getter) {
    let sum = 0;
    Object.keys(getter.totalPriceByCategory).forEach(category => {
      sum += Number(getter.totalPriceByCategory[category])
    })

    // check discount
    let discount = state.discounts['total'] || { price: 0, percentage: 0 };
    sum = sum - sum * discount.percentage / 100;

    // check tax
    let tax = state.taxes['total'] || { price: 0, percentage: 0 };
    sum = sum + sum * tax.percentage / 100;

    return sum.toFixed(2)

  },
  totalPriceOfProposal(state, getter) {
    let sum = 0;
    Object.keys(getter.totalPriceByCategory).forEach(category => {
      sum += Number(getter.totalPriceByCategory[category])
    })

    // check discount
    let discount = state.discounts['total'] || { price: 0, percentage: 0 };
    sum = sum - sum * discount.percentage / 100;

    // check tax
    let tax = state.taxes['total'] || { price: 0, percentage: 0 };
    sum = sum + sum * tax.percentage / 100;
    // check bundle discount 

    if (state.bundleDiscount && state.bundleDiscount.isApplied) {
      sum -= state.bundleDiscount.price
    }

    return sum
  }
};
const mutations = {
  setVendor: (state, vendor) => {
    state.vendor = vendor;
    state.personalMessage = vendor.personalMessage;
  },
  setProposal: (state, proposal) => {
    state.id = proposal.id;
    state.additionalServices = proposal.additionalServices;
    state.eventVision = proposal.eventVision;
    state.proposalCostServices = proposal.costServices;
    state.proposalIncludedServices = proposal.includedServices;
    state.proposalExtraServices = proposal.extraServices;
    state.inspirationalPhotos = proposal.inspirationalPhotos;
    state.personalMessage = proposal.personalMessage;
    state.tax = proposal.tax;
    state.suggestedNewSeatings = proposal.suggestedNewSeatings;
    state.initialized = true;
  },
  setPropsalRequest: (state, propsoalRequest) => {
    state.proposalRequest = propsoalRequest;
  },
  setWizardStep: (state, step) => {
    state.wizardStep = step;
  },
  setInitStep: (state, step) => {
    state.initStep = step;
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
    Vue.set(state.legalDocs, category, files);
  },
  addLegalDoc: (state, { category, docTag, obj }) => {
    Vue.set(state.legalDocs[category], docTag, obj);
  },
  setDiscount: (state, { category, discount }) => {
    Vue.set(state.discounts, category, discount);
  },
  setTax: (state, { category, tax }) => {
    Vue.set(state.taxes, category, tax);
  },
  setAdditionalServices: (state, services) => {
    Vue.set(state.additionalServices, services);
  },
  removeCategoryFromAdditional: (state, category) => {
    const index = state.additionalServices.findIndex(item => item == category);
    state.additionalServices.splice(index, 1);
  },
  setBundleDiscount: (state, bundleDiscount) => {
    state.bundleDiscount = bundleDiscount;
  },
  setValue: (state, { key, value }) => {
    Vue.set(state, key, value);
  },
  setInspirationalPhoto: (state, { index, photo }) => {
    Vue.set(state.inspirationalPhotos, index, photo);
  },
  initState(state) {
    Vue.set(state, "proposalCostServices", {});
    Vue.set(state, "proposalIncludedServices", {});
    Vue.set(state, "proposalExtraServices", {});
    Vue.set(state, "discounts", {});
    Vue.set(state, "taxes", {});
    Vue.set(state, "totalTax", { percentage: 0, price: 0 });
    Vue.set(state, "legalDocs", {});
    Vue.set(state, "wizardStep", 0);
    Vue.set(state, "initStep", 0);
    Vue.set(state, "initialized", false);
    Vue.set(state, "attachments", {});
    Vue.set(state, "bundleDiscount", {
      isApplied: false,
      services: [],
      discountPercentage: 0,
      discountAmount: 0,
    });
  },
};
const actions = {
  addPrice({ commit, state, dispatch }, { category, selectedItem }) {
    const proposalIncludedServices = state.proposalIncludedServices[category];
    const includedIndex = proposalIncludedServices.findIndex(item => item.requirementTitle == selectedItem.requirementTitle)
    proposalIncludedServices.splice(includedIndex, 1)
    commit("setIncludedServices", { category, services: [...proposalIncludedServices] })
    const costServices = state.proposalCostServices[category];
    costServices.push(selectedItem);
    commit("setCostServices", { category, services: costServices })
  },
  getProposalByRequestId: ({ commit, state }, proposalRequestId) => {
    return new Promise((resolve, reject) => {
      new Proposal()
        .for(new ProposalRequest({ id: proposalRequestId }))
        .get()
        .then(res => {
          const proposal = res[0];
          commit("setProposal", proposal);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getVendor: ({ commit, state }, vendorId) => {
    return new Promise((resolve, reject) => {
      Vendors.find(vendorId)
        .then(resp => {
          commit("setVendor", resp);
          resolve(resp);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getProposalRequest: ({ commit, state, dispatch }, requestId) => {
    return new Promise((resolve, reject) => {
      ProposalRequest.find(requestId).then(resp => {
        commit("setPropsalRequest", resp);
        dispatch("getTimelineDates", resp.eventData.id);
        if (resp.proposal) {
          commit("setProposal", resp.proposal);
        }
        resolve(resp);
      });
    });
  },
  getTimelineDates({ commit, state }, eventId) {
    return new Promise((resolve, reject) => {
      new EventTimelineDate()
        .for(new CalendarEvent({ id: eventId }))
        .get()
        .then(res => {
          commit("setValue", "timelineDates", res);
        });
    });
  },
  saveProposal: ({ commit, state, getters }, status) => {
    return new Promise((resolve, reject) => {
      const proposal = new Proposal({
        id: state.id,
        personalMessage: state.personalMessage,
        additionalServices: state.additionalServices,
        inspirationalPhotos: state.inspirationalPhotos,
        proposalRequestId: state.proposalRequest.id,
        eventVision: state.eventVision,
        // eventComponentInstance: state.proposalRequest.eventComponentInstance,
        eventComponentId: state.proposalRequest.eventComponentInstance.id,
        // vendor: new Vendor({ id: state.vendor.id }),
        vendorId: state.vendor.id,
        costServices: state.proposalCostServices,
        includedServices: state.proposalIncludedServices,
        extraServices: state.proposalExtraServices,
        // coverImage: coverImageUrl,
        discounts: state.discounts,
        taxes: state.taxes,
        cost: getters.totalPriceOfProposal,
        pricesByCategory: getters.pricesByCategory,
        bundleDiscount: state.bundleDiscount,
        attachments: state.attachments,
        status,
        tenantId: state.tenantId,
        suggestionDate: state.suggestionDate
      });
      proposal
        .save()
        .then(res => {
          commit("setProposal", res);
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
