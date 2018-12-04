export default {
    namespaced: true,

    state() {
        return {
          teamMemberData: {
            id: null,
            firstName: null,
            username: null,
            password: '123456789',
            lastName: null,
            emailAddress: null,
            pictureUrl: '',
            role: null,
            permissions: null,
            street: null,
            streetNo: null,
            country: null,
            city: null
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
