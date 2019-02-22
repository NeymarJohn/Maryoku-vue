export default {
    namespaced: true,

    state() {
        return {
          teamMemberData: {
            id: null,
            firstName: '',
            username: null,
            password: 'none',
            lastName: '',
            emailAddress: null,
            pictureUrl: 'none',
            role: null,
            permissions: [],
            street: 'none',
            streetNo: 'none',
            country: 'none',
            city: 'none'
          },
          inviteModalOpen: false,
          modalTitle: 'Invite your Team',
          modalSubmitTitle: 'Send Invitation',
          editMode: false
        };
    },

    mutations: {
        setMemberProperty(state, {key, actualValue}) {
            state.teamMemberData[key] = actualValue;
        },

      setInviteModal(state, data) {
          state.inviteModalOpen = data.showModal;

      },
      setModalTitle(state, data) {
        state.modalTitle = data;

      },
      setModalSubmitTitle(state, data) {
        state.modalSubmitTitle = data;

      },
      setTeamMemberData(state, data) {
        console.log(data);
        state.teamMemberData['emailAddress'] = data.teamMember['emailAddress']
        state.teamMemberData['role'] = data.teamMember['role']
        state.teamMemberData['permissions'] = data.teamMember['permissions'].split(',')

      },
      setEditMode(state, data) {
       state.editMode = data.editMode

      },
      resetForm(state){
          state.teamMemberData.firstName = null;
          state.teamMemberData.lastName = null;
          state.teamMemberData.emailAddress = null;
          state.teamMemberData.permissions = [];
          state.teamMemberData.role = null;
      }

    },

    actions: {
      setInviteModalAndTeamMember({ dispatch, commit }, payload) {
        commit('setInviteModal', payload)

        if (typeof payload.teamMember !== 'undefined') {
          commit('setTeamMemberData', payload)
          commit('setModalTitle', 'Edit Team Member')
          commit('setModalSubmitTitle', 'Save')
          commit('setEditMode', {editMode: payload.teamMember.id})
        }
      }
    }
};
