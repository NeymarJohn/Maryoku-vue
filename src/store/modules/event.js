import Calendar from '@/models/Calendar';
import Currency from '@/models/Currency';

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
    caregoriesArray: null,
    eventTypes: null,
    calendarId: null,
}

const getters = {
  getCurrenciesList:(state)=>{
    return state.currencies;
  },
}

const actions = {
  async getCurrencies({commit,state}){
    Currency
      .get()
      .then(res=>{
          commit("setCurrencies" , res)
      })
      .catch(e=>{
          commit("setCurrencies" , [])
      })
  },
}

const mutations = {
      setCurrencies(state,currencies){
        state.currencies = currencies
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