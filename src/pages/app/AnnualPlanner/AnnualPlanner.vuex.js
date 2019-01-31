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
          eventData: {
            id: null,
            eventName: "",
            date: null,
            time: "",
            duration: "",
            participants: "",
            status: "draft",
            budget: "",
            location: "",
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
      resetForm(state){
          state.eventData.eventName = "";
          state.eventData.date = null;
          state.eventData.time = "";
          state.eventData.duration = "";
          state.eventData.participants = "";
          state.eventData.budget = "";
          state.eventData.location = "";
      },
      setEditMode(state, data) {
        state.editMode = data.editMode
      },
    },
};
