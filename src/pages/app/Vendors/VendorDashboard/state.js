import Vue from "vue";
import { postReq, getReq } from "@/utils/token";
import Vendors from "@/models/Vendors";
import ProposalRequest from "@/models/ProposalRequest";
import { VendorPolicy, VendorPricingPolicy } from "@/constants/vendor";

import S3Service from "@/services/s3.service";
import { makeid } from "@/utils/helperFunction";
import { getBase64 } from "@/utils/file.util";
import UserEvent from "@/models/UserEvent";
import moment from "moment";

const state = {
  calendarEvents: {},
  proposalRequests: null
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

          // events.forEach(event => {
          //   if (!calendarEvents[month]) {
          //     calendarEvents[month] = []
          //   }
          //   calendarEvents[month].push(event)
          // })
          commit("setCalendarEvents", { month, events })
          resolve(calendarEvents)
        });
    })

  },
  getProposalRequests({ commit, state }, vendorId) {
    new ProposalRequest().for(new Vendors({ id: vendorId })).get().then(proposalRequests => {
      commit("setProposalRequests", proposalRequests)
    })
  }
};

const mutations = {
  setCalendarEvents(state, { month, events }) {
    Vue.set(state.calendarEvents, month, [...events])
  },
  setProposalRequests(state, proposalRequests) {
    Vue.set(state, "proposalRequests", proposalRequests)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
