export default {
  namespaced: true,

  state() {
    return {
      askCommunityData: {
        id: null,
        recommendation: null,
        interest: null,
        occasion: null,
        event: null,
        location: null,
      }
    };
  },

  mutations: {
    setMemberProperty(state, {key, actualValue}) {
      state.askCommunityData[key] = actualValue;
    },

  },

  actions: {}
};
