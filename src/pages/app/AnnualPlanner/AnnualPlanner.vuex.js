import moment from 'moment';

export default {
    namespaced: true,

    state() {
        return {
          filtersData: {
            year: null,
            month: null,
            categories: [],
            countries: [],
            holidays: []
          },
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
      setEventData(state, data) {
        state.eventData['id'] = data.eventData.id;
        state.eventData['occasion'] = data.eventData.occasion ? data.eventData.occasion : state.eventData['occasion'];
        state.eventData['occasionCache'] = state.eventData['occasion'];
        state.eventData['title'] = data.eventData.title;;
        state.eventData['numberOfParticipants'] = data.eventData.numberOfParticipants;
        state.eventData['totalBudget'] = data.eventData.totalBudget;
        state.eventData['currency'] = data.eventData.currency;
        state.eventData['eventType'] = data.eventData.eventType;
        state.eventData['date'] = data.eventData.eventStartMillis;
        state.eventData['category'] = data.eventData.category;
        state.eventData['time'] = moment(data.eventData.eventStartMillis).format('HH:00');
        state.eventData['duration'] = moment(data.eventData.eventEndMillis).diff(data.eventData.eventStartMillis, 'hours')
      },
      setEventDate(state, data) {
        state.eventData['date'] = data.date;
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
