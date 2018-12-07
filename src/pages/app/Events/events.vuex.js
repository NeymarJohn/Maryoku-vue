import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {

      todo: {
        id: null,
        title: null,
        dueDateMillis: null,
        assignee: null,
        status: null,
      },
      value: {
        id: null,
        value: null,
        title: null,
        comment: null,
      },
      vendor: {
        id: null,
        vendorDisplayName: null,
        vendorMainEmail: null,
        vendorMainPhoneNumber: null,
      }
    },
});

