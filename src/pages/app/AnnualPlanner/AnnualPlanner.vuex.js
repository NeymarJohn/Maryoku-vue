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
            eventName: "New Event",
            date: null,
            time: "",
            duration: "",
            participants: "",
            status: "draft",
            budget: "",
            currency: "",
            eventType: null,
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
        state.eventData['eventType'] = data.eventData.eventType;
      },
    },
    actions: {
      setEventModalAndEventData({ dispatch, commit }, payload) {
        commit('setEventModal', payload)

        if (typeof payload.eventData !== 'undefined') {
          commit('setEventData', payload)
          commit('setModalSubmitTitle', 'Edit Details')
          commit('setEditMode', {editMode: payload.eventData.calendar})
        }
      }
    }
};
