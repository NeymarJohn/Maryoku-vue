import Vue from "vue";
import { postReq, getReq } from "@/utils/token";
import Vendors from "@/models/Vendors";
import ProposalRequest from "@/models/ProposalRequest";
import Proposal from "@/models/Proposal";
import { reject, resolve } from "promise-polyfill";
import EventTimelineDate from "@/models/EventTimelineDate";
import CalendarEvent from "@/models/CalendarEvent";
import moment from "moment";

const state = {
  includedServices: {},
  costServices: {},
  extraServices: {},
  custom: {},
  event: {},
  vision: "",
  images: [],
  vendor: null,
  wizardStep: 0,
  additionalServices: [],
  bundleDiscount: {},
  discounts: {},
  taxes: {},
  coverImage: [],
  proposalServices: {},
  inspirationalPhotos: new Array(15),
};
const getters = {
  originalPriceOfMainCategory(state) {
    const mainService = state.vendor.eventCategory.key;
    if (!state.costServices[mainService]) return 0;
    const sumPrice = state.costServices[mainService].reduce((s, item) => {
      if (item.isComplimentary) return s;
      return s + item.requirementValue * item.price;
    }, 0);
    return sumPrice;
  },
  totalPriceByCategory(state, getters) {
    const prices = {};
    state.additionalServices.forEach(service => {
      if (!state.costServices[service]) {
        prices[service] = 0;
      }
      if (state.costServices[service]) {
        const sumPrice = state.costServices[service].reduce((s, item) => {
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
    if (!state.costServices[mainService]) return 0;
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
      if (!state.costServices[service]) {
        prices[service] = 0;
      }
      if (state.costServices[service]) {
        const sumPrice = state.costServices[service].reduce((s, item) => {
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
    state.costServices = proposal.costServices;
    state.includedServices = proposal.includedServices;
    state.extraServices = proposal.extraServices;
    state.images = proposal.images;
    state.personalMessage = proposal.personalMessage;
    state.taxs = proposal.taxs;
    state.discounts = proposal.discounts;
    state.suggestedNewSeatings = proposal.suggestedNewSeatings;
    state.event = proposal.eventData;
    state.coverImage = proposal.coverImage || [],
      // state.inspirationalPhotos = proposal.inspirationalPhotos
      state.initialized = true;
    // state.wizardStep = proposal.step
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
    // Add this category for the secondary servicesList
    if (category !== state.vendor.eventCategory.key && !state.additionalServices.includes(category)) {
      Vue.set(state, "additionalServices", [...state.additionalServices, category]);
    }
    Vue.set(state.costServices, category, services);
  },
  setIncludedServices: (state, { category, services }) => {
    Vue.set(state.includedServices, category, services);
  },
  setExtraServices: (state, { category, services }) => {
    Vue.set(state.extraServices, category, services);
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
  setEventProperty: (state, { key, value }) => {
    Vue.set(state.event, key, value)
  },
  setInspirationalPhoto: (state, { index, photo }) => {
    Vue.set(state.inspirationalPhotos, index, photo);
  },
  initState(state) {
    Vue.set(state, "costServices", {});
    Vue.set(state, "includedServices", {});
    Vue.set(state, "extraServices", {});
    Vue.set(state, "discounts", {});
    Vue.set(state, "taxes", {});
    Vue.set(state, "totalTax", { percentage: 0, price: 0 });
    Vue.set(state, "legalDocs", {});
    Vue.set(state, "wizardStep", 0);
    Vue.set(state, "initStep", 0);
    Vue.set(state, "initialized", false);
    Vue.set(state, "attachments", {});
    Vue.set(state, "event", {});
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
    const includedServices = state.includedServices[category];
    const includedIndex = includedServices.findIndex(item => item.requirementTitle == selectedItem.requirementTitle)
    includedServices.splice(includedIndex, 1)
    commit("setIncludedServices", { category, services: [...includedServices] })
    const costServices = state.costServices[category];
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
  getProposal: ({ commit, state }, proposalId) => {
    return new Promise((resolve, reject) => {
      Proposal.find(proposalId)
        .then(resp => {
          commit("setProposal", resp);
          resolve(resp);
        })
        .catch(e => {
          reject(e);
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
      const additionalServices = state.additionalServices || [];
      const availableAdditionalSerivces = additionalServices.filter(category => getters.pricesByCategory[category] > 0);
      const proposal = new Proposal({
        id: status == 'duplicate' ? undefined : state.id,
        eventData: state.event,
        personalMessage: state.personalMessage,
        additionalServices: availableAdditionalSerivces,
        images: state.images,
        coverImage: state.coverImage,
        eventVision: state.eventVision,
        vendorId: state.vendor.id,
        costServices: state.costServices,
        includedServices: state.includedServices,
        inspirationalPhotos: state.inspirationalPhotos,
        extraServices: state.extraServices,
        discounts: state.discounts,
        taxes: state.taxes,
        cost: getters.totalPriceOfProposal,
        pricesByCategory: getters.pricesByCategory,
        bundleDiscount: state.bundleDiscount,
        attachments: state.attachments,
        status,
        step: state.wizardStep,
        tenantId: state.tenantId,
        customerId: state.event.customer.id,
        suggestionDate: state.suggestionDate,
        expiredDate: moment(new Date(), "YYYY-MM-DD").add(7, 'days').toDate(),
        nonMaryoku: true,
        bookedServices: Object.keys(state.costServices) // Set all secondary services as booked services
      });
      proposal
        .save()
        .then(res => {
          commit("setProposal", res);
          resolve(res);
        })
        .catch(e => {
          console.error(e)
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
