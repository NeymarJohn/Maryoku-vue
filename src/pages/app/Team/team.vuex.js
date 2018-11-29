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
            }
        };
    },

    mutations: {
        setMemberId(state, value) {
            state.teamMemberData.id = value;
        },
        setFirstName(state, value) {
            state.teamMemberData.firstName = value;
        },
        setLastName(state, value) {
            state.teamMemberData.lastName = value;
        },
        setEmailAddress(state, value) {
            state.teamMemberData.emailAddress = value;
        },
        setRole(state, value) {
            state.teamMemberData.role = value;
        },
        setPermissions(state, value) {
            state.teamMemberData.permissions = value;
        }
    },

    actions: {}
};
