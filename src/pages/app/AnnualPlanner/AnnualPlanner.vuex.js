import moment from 'moment';

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
      setEventProperty(state, {key, actualValue}) {
          state.eventData[key] = actualValue;
      },
      setEventModal(state, data) {
        state.eventModalOpen = data.showModal;
      },
      setModalTitle(state, data) {
        state.modalTitle = data;
      },
      setEditMode(state, data) {
        state.editMode = data.editMode
      },
      setModalSubmitTitle(state, data) {
        state.modalSubmitTitle = data;
      },
      setEventData(state, data) {
        state.eventData['id'] = data.eventData.id;
        state.eventData['eventName'] = data.eventData.title;
        state.eventData['date'] = data.eventData.eventStartMillis;
        state.eventData['time'] = data.eventData.eventStartMillis;
        state.eventData['duration'] = moment(data.eventData.eventEndMillis).diff(data.eventData.eventStartMillis, 'hours');
        state.eventData['participants'] = data.eventData.numberOfParticipants;
        state.eventData['budget'] = data.eventData.totalBudget;
        state.eventData['location'] = data.eventData.location;
      },
    },
    actions: {
      setEventModalAndEventData({ dispatch, commit }, payload) {
        commit('setEventModal', payload)

        if (typeof payload.eventData !== 'undefined') {
          commit('setEventData', payload)
          commit('setModalTitle', 'Edit Event')
          commit('setModalSubmitTitle', 'Save')
          commit('setEditMode', {editMode: payload.eventData.id})
        }
      }
    }
};
