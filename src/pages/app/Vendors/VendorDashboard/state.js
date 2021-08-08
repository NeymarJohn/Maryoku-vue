import Vue from "vue";
import Vendors from "@/models/Vendors";
import ProposalRequest from "@/models/ProposalRequest";
import Proposal from "@/models/Proposal";
import Vendor from "@/models/Vendors";
import UserEvent from "@/models/UserEvent";
import moment from "moment";

const state = {
  calendarEvents: {},
  proposalRequests: [],
  proposals: [],
};

const getters = {

};

const actions = {
  getCalendarEvents({ commit, state }, month) {
    const monthDate = moment(month)
    const startOfMonth = monthDate.clone().startOf('month').toDate();
    const endOfMonth = monthDate.clone().endOf('month').toDate();
    const calendarEvents = state.calendarEvents;

    return new Promise((resolve, reject) => {

      UserEvent.params({
        startTime: startOfMonth,
        endTime: endOfMonth
      })
        .get()
        .then((events) => {
          commit("setCalendarEvents", { month, events })
          resolve(calendarEvents)
        });
    })

  },
  getProposalRequests({ commit, state }, vendorId) {
      return new Promise((resolve, reject) => {
          new ProposalRequest().for(new Vendors({ id: vendorId })).get().then(proposalRequests => {
              commit("setProposalRequests", proposalRequests)
              resolve(proposalRequests);
          }).catch(err => {
              reject(err);
          })
      })

  },
  getProposals({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
        new Proposal()
            .for(new Vendor({ id: payload.vendorId }))
            .page(payload.pagination.page)
            .limit(payload.pagination.limit)
            .params(payload.params)
            .get().then(res => {
            console.log('getProposals', res);
            commit('setProposals', res[0].items);
            resolve(res[0])
        }).catch(err => {
            reject(err);
        });
    })
  },
  updateProposalRequest({ commit, state }, pr) {
    return new Promise((resolve, reject) => {
        new ProposalRequest(pr).save().then(result => {
            commit("setProposalRequest", result)
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
  },
  updateProposal({ commit, state }, vendorId) {
    return new Promise((resolve, reject) => {
        new ProposalRequest().for(new Vendors({ id: vendorId })).get().then(proposalRequests => {
            commit("setProposalRequests", proposalRequests)
            resolve(proposalRequests);
        }).catch(err => {
            reject(err);
        })
    })
  },
};

const mutations = {
  setCalendarEvents(state, { month, events }) {
    Vue.set(state.calendarEvents, month, [...events])
  },
  setProposalRequests(state, proposalRequests) {
    Vue.set(state, "proposalRequests", proposalRequests)
  },
  setProposals(state, proposals) {
    Vue.set(state, "proposals", proposals)
  },
  setProposalRequest(state, proposalRequest) {
    let idx = state.proposalRequests.findIndex(it => it.id === proposalRequest.id);
    Vue.set(state.proposalRequests, idx, proposalRequest)
  },
  setProposal(state, proposal) {
    let idx = state.proposals.findIndex(it => it.id === proposal.id);
    Vue.set(state.proposals, idx, proposal)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
