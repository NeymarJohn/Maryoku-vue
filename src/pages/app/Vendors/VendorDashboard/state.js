import Vue from "vue";
import { postReq, getReq } from "@/utils/token";
import Vendors from "@/models/Vendors";
import { VendorPolicy, VendorPricingPolicy } from "@/constants/vendor";

import S3Service from "@/services/s3.service";
import { makeid } from "@/utils/helperFunction";
import { getBase64 } from "@/utils/file.util";
import UserEvent from "@/models/UserEvent";
import moment from "moment";

const state = {
  calendarEvents: {},
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
      if (calendarEvents[month]) {
        resolve(calendarEvents)
        return
      }
      UserEvent.params({
        startTime: startOfMonth,
        endTime: endOfMonth
      })
        .get()
        .then((events) => {

          events.forEach(event => {
            if (!calendarEvents[month]) {
              calendarEvents[month] = []
            }
            calendarEvents[month].push(event)
          })
          commit("setCalendarEvents", calendarEvents)
          resolve(calendarEvents)
        });
    })

  }
};

const mutations = {
  setCalendarEvents(state, data) {
    Vue.set(state, "calendarEvents", data)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
