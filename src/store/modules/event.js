import Calendar from '@/models/Calendar';
import Currency from '@/models/Currency';
import EventTheme from '@/models/EventTheme'

const state = {
    currentUser: {

    },
    param1: "test param",
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
      components: null,
    },
    componentsList: null,
    vendorsList: null,
    currencies: [],
    categories: [],
    eventTypes: [],
    eventThemes: [],
    calendarId: null,
}

const getters = {
  getCurrenciesList:(state)=>{
    return state.currencies;
  },
  getCategoriesList:(state)=>{
    return state.categories;
  },
  getEventTypesList:(state)=>{
    return state.eventTypes
  },
  getEventThemesList:(state)=>{
    return state.eventThemes;
  }
}

const actions = {
  getEventThemes({commit,state}){
    EventTheme
      .get()
      .then(res=>{
          commit("setEventThemes" , res)
      })
      .catch(e=>{
          commit("setEventThemes" , [])
      })
  },
  getCurrencies({commit,state}){
    Currency
      .get()
      .then(res=>{
          commit("setCurrencies" , res)
      })
      .catch(e=>{
          commit("setCurrencies" , [])
      })
  },
  getCategories({commit,state}, data){
    let _calendar = new Calendar({id: data});
    _calendar.categories().get().then(res => {
        commit("setCategories" , res)
    })
    .catch(e=>{
      commit("setCategories" , [])
    });
  },
  getEventTypes({commit,state}, data){
    let _calendar = new Calendar({id: data});
    _calendar.eventTypes().get().then(res => {
        commit("setEventTypes" , res)
    })
    .catch(e=>{
      commit("setEventTypes" , [])
    });
  },
}

const mutations = {
      setCurrencies(state,currencies){
        state.currencies = currencies
      },
      setCategories(state,categories){
        state.categories = categories
      },
      setEventTypes(state,eventTypes){
        state.eventTypes = eventTypes
      },
      setEventThemes(state,eventThemes){
        state.eventThemes = eventThemes
      },
      updateEventData(state, params) {
        state.eventData.components[params.index] = params.data;
      },
      removeSubComponent(state, params) {
        state.eventData.components[params.component][params.type].splice(params.item, 1);
      },
      updateComponent(state, params) {
        state.eventData.components.push(params);
      },
      removeComponent(state, params) {
        state.eventData.components.splice(params.index, 1);
      },
      setCurrentUserData(state, data){
        state.currentUser = data;
      },
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}