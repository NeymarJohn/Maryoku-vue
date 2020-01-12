export default {
  namespaced: true,

  state() {
    return {

    };
  },

  mutations: {
    setMemberProperty(state, {key, actualValue}) {
      state.askCommunityData[key] = actualValue;
    },

  },

  actions: {}
};
