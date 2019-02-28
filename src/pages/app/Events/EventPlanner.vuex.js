export default {
    namespaced: true,
    state() {
        return {
          eventData: {
            id: null,
            occasion: "",
            occasionCache: "",
            title: "New Event",
            date: null,
            time: "",
            duration: "",
            numberOfParticipants: "",
            status: "draft",
            totalBudget: "",
            currency: "",
            eventType: null,
            category: null,
          },
          eventModalOpen: false,
          modalTitle: '',
          modalSubmitTitle: '',
          editMode: false,
        };
    },

    mutations: {
      setEventProperty(state, {key, actualValue}) {
          state.eventData[key] = actualValue;
      },
      setEventModal(state, data) {
        state.eventModalOpen = data.showModal;
      },
      setEditMode(state, data) {
        state.editMode = data.editMode
      },
      setModalSubmitTitle(state, data) {
        state.modalSubmitTitle = data;
      },
    },
    actions: {
      setEventModalAndEventData({ dispatch, commit }, payload) {
        commit('setEventModal', payload)

        if (typeof payload.eventData !== 'undefined') {
          commit('setEventData', payload)
          commit('setModalSubmitTitle', 'Save')
          commit('setEditMode', {editMode: payload.eventData.calendar})
        }
      }
    }
};
