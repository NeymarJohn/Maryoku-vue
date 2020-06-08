import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventNote from '@/models/EventNote'
import Currency from '@/models/Currency'
import EventTheme from '@/models/EventTheme'
import EventComponent from '@/models/EventComponent'


const state = {
  currentUser: {

  },
  param1: 'test param',
  eventData: {
    id: null,
    occasion: '',
    occasionCache: '',
    title: 'New Event',
    date: null,
    time: '',
    duration: '',
    numberOfParticipants: '',
    status: 'draft',
    totalBudget: '',
    currency: '',
    location: '',
    eventType: null,
    category: null,
    components: null,
    componentComponents:[],
  },
  components: [],
  notes: [],
  commentComponents:[],
  comments: {},  // The object for comments { componentId: commentslist<EventComment> }
  vendorsList: null,
  currencies: [],
  categories: [],
  eventTypes: [],
  eventThemes: [],
  calendarId: null
}

const getters = {
  getCurrenciesList: (state) => {
    return state.currencies
  },
  getCategoriesList: (state) => {
    return state.categories
  },
  getEventTypesList: (state) => {
    return state.eventTypes
  },
  getEventThemesList: (state) => {
    return state.eventThemes
  },
  getComponentsList: (state) => {
    return state.components
  }

}

const actions = {
  setEventData( {commit, state}, calendar) {

  },
  getEventThemes({ commit, state }, ctx) {
    new EventTheme()
      .fetch(ctx, false)
      .then(res => {
        commit('setEventThemes', res)
      })
      .catch(e => {
        commit('setEventThemes', [])
      })
  },
  async getCurrencies({ commit, state }, ctx) {
    new Currency()
      .fetch(ctx, false)
      .then(res => {
        commit('setCurrencies', res)
      })
      .catch(e => {
        commit('setCurrencies', [])
      })
  },
  async getCategories({ commit, state }, { data, ctx }) {
    let _calendar = new Calendar({ id: data })
    _calendar.categories().fetch(ctx, false).then(res => {
      commit('setCategories', res)
    })
      .catch(e => {
        commit('setCategories', [])
      })
  },
  async getEventTypes({ commit, state }, { data, ctx }) {
    let _calendar = new Calendar({ id: data })
    _calendar.eventTypes().fetch(ctx, false).then(res => {
      commit('setEventTypes', res)
    })
      .catch(e => {
        commit('setEventTypes', [])
      })
  },
  async getComponents({ commit, state }, ctx) {
    new EventComponent()
      .fetch(ctx, false)
      .then(res => {
        commit('setComponents', res)
      })
      .catch(e => {
        commit('setComponents', [])
      })
  },

  /** Notes */
  async getEventNotes({ commit, state }) {
    const calendarId = state.eventData.calendar.id;
    const eventId = state.eventData.id;
    const calendar = new Calendar({ id: calendarId })
    const event = new CalendarEvent({ id: eventId })
    new EventNote()
      .for(calendar, event)
      .get()
      .then(notes => {
        commit('setEventNotes', notes)
      });
  },
  async addEventNote({ commit, state }, note) {
    const calendarId = state.eventData.calendar.id;
    const eventId = state.eventData.id;
    const calendar = new Calendar({ id: calendarId })
    const event = new CalendarEvent({ id: eventId })
    new EventNote(note)
      .for(calendar, event)
      .save()
      .then(res => {
        if (!note.id) {
          const notes = [...state.notes, res]
          commit('setEventNotes', notes)
        } else {
          const index = state.notes.findIndex(item => item.id === note.id)
          commit('updateEventNote', { index, note })
        }
      });
  },
  async removeNote({ commit, state }, note) {
    const index = state.notes.findIndex(item => item.id === note.id)
    commit('removeEventNote', { index, note })
  },

  async updateEventNote({ commit, state }, note) {
    const calendarId = state.eventData.calendar.id;
    const eventId = state.eventData.id;
    const calendar = new Calendar({ id: calendarId })
    const event = new CalendarEvent({ id: eventId })
    new EventNote(note)
      .for(calendar, event)
      .save()
      .then(res => {
        const index = state.notes.findIndex(item => item.id === note.id)
        commit('updateEventNote', { index, note })
      });
  }
}

const mutations = {
  setEventData(state, eventData) {
    state.eventData = eventData
  },
  setCurrencies(state, currencies) {
    state.currencies = currencies
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setEventTypes(state, eventTypes) {
    state.eventTypes = eventTypes
  },
  setEventThemes(state, eventThemes) {
    state.eventThemes = eventThemes
  },
  setComponents(state, components) {
    state.components = components
  },

  setEventNotes(state, notes) {
    state.notes = notes
  },

  updateEventNote(state, { index, note }) {
    state.notes[index] = note;
  },
  removeEventNote(state, { index, note }) {
    state.notes.splice(index, 1)
  },

  updateEventData(state, params) {
    state.eventData.components[params.index] = params.data
  },
  removeSubComponent(state, params) {
    state.eventData.components[params.component][params.type].splice(params.item, 1)
  },
  updateComponent(state, params) {
    state.eventData.components.push(params)
  },
  removeComponent(state, params) {
    state.eventData.components.splice(params.index, 1)
  },
  setCurrentUserData(state, data) {
    state.currentUser = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
