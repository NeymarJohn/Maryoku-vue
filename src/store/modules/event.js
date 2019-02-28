const state = {
    currentUser: {

    },
    param1: "test param",
    eventData: {
      id: null,
      calendar: {id: null},
      title: null,
      eventStartMillis: null,
      eventEndMillis: null,
      eventType: null,
      numberOfParticipants: null,
      totalBudget: null,
      status: null,
      components: null,
    },
    componentsList: null,
    vendorsList: null,
    currenciesArray: null,
    caregoriesArray: null,
    eventTypes: null,
    calendarId: null,
}

const getters = {
    // getEventData() {
    //     return state.eventData;
    // },
    // getComponentsList() {
    //   return state.componentsList;
    // },
    // getVendorsList() {
    //   return state.vendorsList;
    // },
    // getCurrenciesArray() {
    //   return state.currenciesArray;
    // },
    // getCalendarId() {
    //   return state.calendarId;
    // },
    // getCalendarId() {
    //   return state.param1;
    // },
    // getCurrentUser() {
    //   return state.currentUser;
    // }
}

const actions = {

}

const mutations = {
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
      }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}