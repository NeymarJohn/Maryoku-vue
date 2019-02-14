import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import event from './modules/event'

Vue.use(Vuex);

export default new Vuex.Store({
  // namespaced: true,
  // state: {
  //   currentUser: {

  //   },
  //   param1: "test param",
  //   eventData: {
  //     id: null,
  //     calendar: {id: null},
  //     title: null,
  //     eventStartMillis: null,
  //     eventEndMillis: null,
  //     eventType: null,
  //     numberOfParticipants: null,
  //     totalBudget: null,
  //     status: null,
  //     components: null,
  //   },
  //   componentsList: null,
  //   vendorsList: null,
  //   occasionsArray: null,
  //   currenciesArray: null,
  //   calendarId: null,
  // },
  // mutations: {
  //   updateEventData(state, params) {
  //     state.eventData.components[params.index] = params.data;
  //   },
  //   removeSubComponent(state, params) {
  //     state.eventData.components[params.component][params.type].splice(params.item, 1);
  //   },
  //   updateComponent(state, params) {
  //     state.eventData.components.push(params);
  //   },
  //   removeComponent(state, params) {
  //     state.eventData.components.splice(params.index, 1);
  //   },
  //   setCurrentUserData(state, data){
  //     state.currentUser = data;
  //   }
  // }
  modules:{
    user,
    event,
  }
});
