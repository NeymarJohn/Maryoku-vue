import { http } from '@/axios';

export default {

    state () {
        return {
            steps:{
              step1:{
                  id: null,
                  firstName: null,
                  lastName: null,
                  emailAddress: null,
                  role: null,
                  permissions: null,
              }
            }
        };
    },

    mutations: {
        setMemberId (state, value) {
            state.step.step1.id = value;
        },
        setFirstName (state, value) {
            state.step.step1.firstName = value;
        },
        setLastName (state, value) {
            state.step.step1.lastName = value;
        },
        setEmailAddress (state, value) {
            state.step.step1.emailAddress = value;
        },
        setRole (state, value) {
            state.step.step1.role = value;
        },
        setPermissions (state, value) {
            state.step.step1.permissions = value;
        }
    },

    actions: {
        async fetchInviteProfilePerson ({ commit }) {
            try {
                const { data } = await http.post(' /1/teams/1/members');
                commit('setTrunkList', data.payload.items);
            } catch (e) {
            }
        }
    }
};
