export default {
    namespaced: true,

    state() {
        return {
          filtersData: {
            year: null,
            eventTypes: [],
            countries: [],
            holidays: []
          }
        };
    },

    mutations: {
        /*setMemberProperty(state, {key, actualValue}) {
            state.teamMemberData[key] = actualValue;
        },*/
      resetForm(state){
          /*state.teamMemberData.firstName = null;
          state.teamMemberData.lastName = null;
          state.teamMemberData.emailAddress = null;
          state.teamMemberData.permissions = [];
          state.teamMemberData.role = null;*/
      }

    },

    actions: {}
};
