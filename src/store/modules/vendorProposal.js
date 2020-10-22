import { postReq, getReq } from '@/utils/token'
import { cat } from 'shelljs'
import Vendors from "@/models/Vendors";
import ProposalRequest from "@/models/ProposalRequest";
import { reject, resolve } from 'promise-polyfill';

const state = {
  vendor: null,
  proposalRequest: null,
}
const getters = {}
const mutations = {
  setVendor: (state, vendor) => {
    state.vendor = vendor
  },
  setPropsalRequest: (state, propsoalRequest) => {
    state.proposalRequest = propsoalRequest
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
