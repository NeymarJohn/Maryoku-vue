import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventNote from '@/models/EventNote'
import Currency from '@/models/Currency'
import EventTheme from '@/models/EventTheme'
import EventComponent from '@/models/EventComponent'
import EventComment from  '@/models/EventComment'
import EventCommentComponent from  '@/models/EventCommentComponent'

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
  },

  /****Event comments  */
  getCommentsAction({ commit, state }, commentComponentId) {
    console.log(commentComponentId)
    const eventComponent = new EventCommentComponent({ id: commentComponentId })
    return new Promise((resolve, reject) => { 
      new EventComment()
        .for(eventComponent)
        .get()
        .then(comments => {
          commit('setComments', { commentComponentId, comments})
          resolve(comments)
        });
    })
  },

  addComment({ commit, state }, comment) {
    console.log(comment)
    const commentComponent = new EventCommentComponent({ id: comment.commentComponent.id })
    new EventComment(comment)
      .for(commentComponent)
      .save()
      .then(comment=>{
        commit('addComment', { commentComponentId: comment.commentComponent.id, comment });
      })
  },

  /*** commentComponentActions */
  async getCommentComponents({ commit, state }, componentId) {
    const calendarId = state.eventData.calendar.id;
    const eventId = state.eventData.id;
    const calendar = new Calendar({ id: calendarId })
    const event = new CalendarEvent({ id: eventId })
    const eventComponent = new EventComponent({ id: componentId})
    new EventCommentComponent()
      .for(calendar, event, eventComponent)
      .get()
      .then(res => {
        commit('setCommentComponents', res )
      });
  },
  async addCommentComponent({ commit, state }, commentComponent) {
    const calendarId = state.eventData.calendar.id;
    const eventId = state.eventData.id;
    const calendar = new Calendar({ id: calendarId })
    const event = new CalendarEvent({ id: eventId })
    const eventComponent = new EventComponent({ id: commentComponent.componentId})
    new EventCommentComponent(commentComponent)
      .for(calendar, event, eventComponent)
      .save()
      .then(commentComponent => {
        commit('addCommentComponent', commentComponent.item)
      });
  },
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

  setComments(state, { commentComponentId, comments }) {
    const index = state.commentComponents.findIndex(item => item.id == commentComponentId)
    console.log(commentComponentId)
    state.commentComponents[index].comments = comments
  },

  addComment(state, {commentComponentId, comment}) {
    const index = state.commentComponents.findIndex(item => item.id == commentComponentId)
    if (!state.commentComponents[index].comments)
      state.commentComponents[index].comments = []
    state.commentComponents[index].comments.push(comment) 
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
  },
  setCommentComponents(state, commentComponents) {
    state.commentComponents = commentComponents
  },
  addCommentComponent(state, commentComponent) {
    state.commentComponents.push(commentComponent);
  },
  removeCommentComponent(state, commentComponent) {
    const index = state.commentComponents.findIndex(item=> item.id === commentComponent.id);
    state.commentComponents.splice(index, 1);
  },

  setCommentsToComponent(state, { commentComponent, comments }) {
    const index = state.commentComponents.findIndex(item=> item.id === commentComponent.id);
    state.commentComponents[index].comments = comments;
  },
  addChlidComment(state, { commentComponent, comment }) {
    const index = state.commentComponents.findIndex(item=> item.id === commentComponent.id);
    state.commentComponents[index].comments = comments;
    state.commentComponent.push(commentComponent);
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
