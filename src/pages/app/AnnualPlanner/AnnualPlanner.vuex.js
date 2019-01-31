export default {
    namespaced: true,

    state() {
        return {
          filtersData: {
            year: null,
            month: null,
            eventTypes: [],
            countries: [],
            holidays: []
          },
          eventModalOpen: false,
          modalTitle: 'Create New Event',
          modalSubmitTitle: 'Save',
          editMode: false
        };
    },

    mutations: {
        /*setMemberProperty(state, {key, actualValue}) {
            state.teamMemberData[key] = actualValue;
        },*/
      setEventModal(state, data) {
        state.eventModalOpen = data.showModal;
      },
      setModalTitle(state, data) {
        state.modalTitle = data;
      },
      setEditMode(state, data) {
        state.editMode = data.editMode
      },
    },
};
