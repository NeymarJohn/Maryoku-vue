export default {
    namespaced: true,

    state() {
        return {
          teamMemberData: {
            id: null,
            firstName: null,
            username: null,
            password: 'none',
            lastName: null,
            emailAddress: null,
            pictureUrl: 'none',
            role: null,
            permissions: [],
            street: 'none',
            streetNo: 'none',
            country: 'none',
            city: 'none'
          }
        };
    },

    mutations: {
        setMemberProperty(state, {key, actualValue}) {
            state.teamMemberData[key] = actualValue;
        },
      resetForm(state){
          state.teamMemberData.firstName = null;
          state.teamMemberData.lastName = null;
          state.teamMemberData.emailAddress = null;
          state.teamMemberData.permissions = [];
          state.teamMemberData.role = null;
      }

    },

    actions: {}
};
