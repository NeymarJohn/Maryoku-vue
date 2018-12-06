export default {
  namespaced: true,

  state() {
    return {
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
      }
    };
  },

  mutations: {
    setEventProperty(state, {key, actualValue}) {
      state.eventData[key] = actualValue;
    },

  },

  actions: {}
};
