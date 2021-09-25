import Vue from "vue";
import { postReq, getReq } from "@/utils/token";
import Vendors from "@/models/Vendors";
import ProposalRequest from "@/models/ProposalRequest";
import Proposal from "@/models/Proposal";
import { reject, resolve } from "promise-polyfill";
import EventTimelineDate from "@/models/EventTimelineDate";
import CalendarEvent from "@/models/CalendarEvent";
import authService from "@/services/auth.service";
import moment from "moment";
import Customer from "@/models/Customer";
import ProposalVersion from "../../models/ProposalVersion";

const state = {
  vendor: null,
  initialized: false,
  proposalRequest: {},
  proposalServices: {},
  costServices: {},
  includedServices: {},
  extraServices: {},
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
  progress: 0,
  initStep: 0,
  additionalServices: [],
  attachments: [],
  inspirationalPhotos: new Array(15),
  coverImage: [],
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
  bookedServices: [],
  customer: null,
  versions: [],
  original: null,
  selectedVersion: -1,
  tenantId: authService.resolveTenantId()
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
  selectVersion: (state, index) => {
    state.selectedVersion = index;

    // update proposal data if vendor click version
    Object.keys(state.original).map(key => {
      Vue.set(state, key, state.original[key]);
    })
    if(index > -1) {
        let version = state.versions[index];
        Object.keys(version.data).map(key => {
            Vue.set(state, key, version.data[key]);
        })
    }
  },
  setVersions: (state, versions) => {
    state.versions = versions;
  },
  setProposal: (state, proposal) => {
    state.id = proposal.id;
    state.additionalServices = proposal.additionalServices;
    state.eventVision = proposal.eventVision;
    state.costServices = proposal.costServices;
    state.includedServices = proposal.includedServices;
    state.extraServices = proposal.extraServices;
    state.inspirationalPhotos = proposal.inspirationalPhotos;
    state.personalMessage = proposal.personalMessage;
    state.taxs = proposal.taxs;
    state.discounts = proposal.discounts;
    state.bundleDiscount = proposal.bundleDiscount;
    state.suggestedNewSeatings = proposal.suggestedNewSeatings;
    state.initialized = true;
    state.wizardStep = proposal.step
    state.coverImage = proposal.coverImage || []
    state.versions = proposal.versions || []
    state.bookedServices = []
    state.original = proposal;
  },
  setPropsalRequest: (state, propsoalRequest) => {
    state.proposalRequest = propsoalRequest;
  },
  setWizardStep: (state, step) => {
    state.wizardStep = step;
  },
  setProgress: (state, progress) => {
    state.progress = progress;
  },
  setInitStep: (state, step) => {
    state.initStep = step;
  },
  setServices: (state, { category, services }) => {
    Vue.set(state.proposalServices, category, services);
  },
  setCostServices: (state, { category, services }) => {
    Vue.set(state.costServices, category, services);

      if (state.selectedVersion === -1) {
          Vue.set(state.original.costServices, category, value);
      } else {
          Vue.set(state.versions[state.selectedVersion].data.costServices, category, value);
      }
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
    console.log('setValue', state.selectedVersion);
    if (state.selectedVersion === -1) {
        Vue.set(state.original, key, value);
    } else {
        Vue.set(state.versions[state.selectedVersion].data, key, value);
    }
    Vue.set(state, key, value);
  },
  setCustomer: (state, customer) => {
    state.customer = customer;
  },
  setInspirationalPhoto: (state, { index, photo }) => {
    Vue.set(state.inspirationalPhotos, index, photo);
  },
  initState(state) {
    Vue.set(state, "costServices", {});
    Vue.set(state, "includedServices", {});
    Vue.set(state, "extraServices", {});
    Vue.set(state, "bookedServices", {});
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
  getCustomer: ({commit, state}, email) => {
      return new Promise(async (resolve, reject) => {
          new Customer().params({email}).get().then(customer => {
              console.log('customer', customer);
              if(customer) {
                  commit("setCustomer", customer[0]);
                  resolve(customer[0]);
              }
          });

      });
  },
  getCustomers: ({commit}, vendorId) => {
      return new Promise(async (resolve, reject) => {
          new Customer().for(new Vendors({id: vendorId}))
              .params({customerType: 1})
              .get().then(customer => {

              if(customer) {
                  commit("setCustomer", customer[0]);
                  resolve(customer[0]);
              }
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
  saveCustomer:({commit, state, dispatch}, customer) => {
    return new Promise(async (resolve, reject) => {
        new Customer(customer).save().then(customer => {

            commit('setCustomer', customer);
            resolve(customer);
        });
    });
  },
  saveProposal: ({ commit, state, getters }, status) => {
    return new Promise((resolve, reject) => {

      const proposal = new Proposal({
        id: status == 'duplicate' ? undefined : state.id,
        personalMessage: state.personalMessage,
        additionalServices: state.additionalServices,
        inspirationalPhotos: state.inspirationalPhotos,
        proposalRequestId: state.proposalRequest.id,
        eventVision: state.eventVision,
        eventComponentId: state.proposalRequest.componentInstance ? state.proposalRequest.componentInstance.id : null,
        requirementId: state.proposalRequest.plannerRequirement ? state.proposalRequest.plannerRequirement.id : null,
        vendorId: state.vendor.id,
        costServices: state.costServices,
        includedServices: state.includedServices,
        extraServices: state.extraServices,
        discounts: state.discounts,
        taxes: state.taxes,
        cost: getters.totalPriceOfProposal,
        pricesByCategory: getters.pricesByCategory,
        bundleDiscount: state.bundleDiscount,
        attachments: state.attachments,
        coverImage: state.coverImage,
        status,
        step: state.wizardStep,
        progress: state.progress,
        tenantId: state.tenantId,
        suggestionDate: state.suggestionDate,
        expiredDate: moment(new Date(), "YYYY-MM-DD").add(7, 'days').toDate(),
        bookedServices: state.bookedServices || [],
        seatingData: state.seatingData,
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
  saveVersion: ({ commit, state}, data) => {
    return new Promise(async (resolve, reject) => {
      const query = new ProposalVersion({...data, proposal: new Proposal({ id: state.id })})
          .for(new Proposal({ id: state.id }));
      let res = await query.save();
      console.log('res', res);
      let idx = state.versions.findIndex(v => v.id === res.id);
      if(idx === -1) {
          commit("setVersions", [...state.versions, res]);
      } else {
          Vue.set(state.versions, idx, res);
          commit("setVersions", state.versions)
      }
    })
  },
  saveVersionName: ({commit, state}, version) => {
    return new Promise(async (resolve, reject) => {
        let versions = state.versions;
        let idx = state.versions.findIndex(v => v.id === version);
        Vue.set(versions, idx, version);
        commit("setVersions", versions)
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
