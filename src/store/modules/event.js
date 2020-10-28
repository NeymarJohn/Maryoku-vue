import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventNote from '@/models/EventNote'
import Currency from '@/models/Currency'
import EventTheme from '@/models/EventTheme'
import EventComponent from '@/models/EventComponent'
import { postReq, getReq } from '@/utils/token'

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
    componentComponents: [],
  },
  bookingRequirements: {},
  components: [],
  notes: [],
  commentComponents: [],
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
  },
  getBookingRequirements: (state) => {
    return state.bookingRequirements
  }
}
const actions = {
  saveEventAction({ commit, state }, event) {
    return new Promise((resolve, reject) => {
      event.for(event.calendar).save()
        .then(res => {
          commit('setEventData', res)
          resolve(event);
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getEventAction({ commit, state }, { eventId, calendar }) {
    return new Promise((resolve, reject) => {
      calendar
        .calendarEvents()
        .find(eventId)
        .then(event => {
          commit("setEventData", event)
          resolve(event)
          // if (event.concept) {
          //   if (event.concept.images && event.concept.images.length > 0) {
          //     this.logger = "https://static-maryoku.s3.amazonaws.com/" + this.event.concept.images[0].url
          //   }
          //   if (event.concept.name) {
          //     this.conceptName = event.concept.name
          //   }
          // }
          // this.getCalendarEventStatistics(event);
          // this.getTimelineItems();
          // new EventComponent()
          //   .for(_calendar, event)
          //   .get()
          //   .then(components => {
          //     this.event.components = components;
          //     this.selectedComponents = components;
          //   });
        });
    })

  },
  getEventById({ commit, state }, eventId) {
    return new Promise((resolve, reject) => {
      CalendarEvent.find(eventId).then(event => {
        commit("setEventData", event);
        resolve(event)
      })
    })
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

    return new Promise((resolve, reject) => {
      let _calendar = new Calendar({ id: data })
      if (state.eventTypes && state.eventTypes.length > 0) {
        resolve(state.eventTypes)
      }
      getReq('/1/eventTypes')
        .then(res => {
          commit('setEventTypes', res.data)
          resolve(res.data)
        })
        .catch(e => {
          commit('setEventTypes', [])
        })
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
  async getEventNotes({ commit, state }, data) {
    const calendarId = state.eventData.calendar.id;
    const eventId = state.eventData.id;
    const calendar = new Calendar({ id: calendarId })
    const event = new CalendarEvent({ id: eventId })
    const filters = data.filters || []
    console.log(filters)
    const res = await postReq(`/1/calendars/${calendarId}/events/${eventId}/notes/search`, { "filters": filters })
    console.log(res.data)
    commit('setEventNotes', res.data)

    // new EventNote()
    //   .where("test","test")
    //   .for(calendar, event)
    //   .get()
    //   .then(notes => {
    //     commit('setEventNotes', notes)
    //   });
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
  setBookingRequirements(state, requirements) {
    state.bookingRequirements = requirements;
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
