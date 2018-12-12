import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    param1: "test param",
    eventData: {
      id: null,
      calendar: {id: null},
      title: null,
      eventStartMillis: null,
      eventEndMillis: null,
      eventType: null,
      numberOfParticipants: null,
      totalBudget: null,
      status: null,
      components: null,
    },
    componentsList: null,
    vendorsList: null,
  },
  mutations: {
    updateEventData(state, params) {
      state.eventData.components[params.index] = params.data;
    },
    removeSubComponent(state, params) {
      state.eventData.components[params.component][params.type].splice(params.item, 1);
    }
  }
});
