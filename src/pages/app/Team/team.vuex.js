export default {
    namespaced: true,

    state() {
        return {
          teamMemberData: {
            id: null,
            firstName: null,
            lastName: null,
            emailAddress: null,
            role: null,
            permissions: null,
            design: false,
            code: true,
            develop: false
          }
        };
    },

    mutations: {
        setMemberProperty(state, {key, actualValue}) {
            state.teamMemberData[key] = actualValue;
        },

    },

    actions: {}
};
