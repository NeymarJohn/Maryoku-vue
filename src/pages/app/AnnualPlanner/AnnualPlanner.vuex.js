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
            occasion: "",
            eventName: "",
            date: null,
            time: "",
            duration: "",
            participants: "",
            status: "draft",
            budget: "",
            currency: "",
            location: "",
            eventType: null,
          },
          eventModalOpen: false,
          modalTitle: '',
          modalSubmitTitle: '',
          editMode: false,
          showOccasion: false,
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
      setShowOccasion(state, data) {
        state.showOccasion = data.showOccasion;
      },
      setEventData(state, data) {
        state.eventData['id'] = data.eventData.id;
        state.eventData['occasion'] = data.eventData.occasion;
        state.eventData['eventName'] = data.eventData.title;
        state.eventData['date'] = data.eventData.eventStartMillis;
        state.eventData['time'] = moment(data.eventData.eventStartMillis).format('HH:00');
        state.eventData['duration'] = moment(data.eventData.eventEndMillis).diff(data.eventData.eventStartMillis, 'hours');
        state.eventData['participants'] = data.eventData.numberOfParticipants;
        state.eventData['budget'] = data.eventData.totalBudget;
        state.eventData['currency'] = data.eventData.currency;
        state.eventData['location'] = data.eventData.location;
        state.eventData['eventType'] = data.eventData.eventType;
      },
    },
    actions: {
      setEventModalAndEventData({ dispatch, commit }, payload) {
        commit('setEventModal', payload)

        if (typeof payload.eventData !== 'undefined') {
          commit('setEventData', payload)
          commit('setModalTitle', false)
          commit('setModalSubmitTitle', 'Edit Details')
          commit('setShowOccasion', {showOccasion: false})
          commit('setEditMode', {editMode: payload.eventData.calendar})
        }
      }
    }
};
