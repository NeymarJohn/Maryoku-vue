import moment from 'moment'
import Proposal from '@/models/Proposal'
import Cart from "@/models/Cart";
import ProposalRequestRequirement from "@/models/ProposalRequestRequirement";
import CalendarEvent from "@/models/CalendarEvent";
import Vue from "vue";

export default {
  namespaced: true,
  state () {
    return {
      eventData: {},
      requirements: {},
      specialRequirements: {},
      cart:{},
      proposals:{},
      favorite:{},
    }
  },

  mutations: {
    setEventProperty (state, {key, actualValue}) {
      state.eventData[key] = actualValue
    },
    setEventData (state, data) {
      state.eventData = data;
    },
      resetRequirements(state){
          Vue.set(state, 'requirements', {})
      },
      resetCartItems(state){
          Vue.set(state, 'cart', {})
      },
      setStep(state, step) {
          state.step = step;
      },
      setData(state, { key, value }) {
          Vue.set(state, key, value)
      },
      setCategoryRequirements(state, { category, requirements }) {
          Vue.set(state.requirements, category, requirements)
      },
      setMainRequirements(state, { category, data }) {
          Vue.set(state.mainRequirements, category, data)
      },
      setCategoryTypes(state, { category, types }) {
          Vue.set(state.types, category, types)
      },
      setTypes(state, { category, type, data }) {
          if (!state.types[category])
              Vue.set(state.types, category, {})
          Vue.set(state.types[category], type, data)
      },
      setSpecialRequirements(state, data) {
          Vue.set(state, 'specialRequirements', data)
      },
      setCategoryCartItem(state, { category, item }) {
          Vue.set(state.cart, category, item)
      },
      removeCategoryCartItem(state, {category}){
          Vue.delete(state.cart, category);
      },
      setProposalsByCategory(state, {category, proposals}){
          Vue.set(state.proposals, category, proposals);
      }
  },
  actions: {
    resetCartItems({commit}){
          commit('resetCartItems')
    },
    getUserEvent ({dispatch, commit}, payload) {

        return new Promise(async (resolve) => {
            CalendarEvent.find(payload.id)
                .then(res => {
                    console.log('res', res);
                    commit("setEventData", res);
                    resolve(res)
            });
        })

    },
    getProposals({commit, state}, payload) {
      return new Promise((resolve, reject) => {
          new Proposal()
              .params(payload)
              .get()
              .then((result) => {
                  console.log('getProposals.result', result);
                  if (result.length) {
                      Object.keys(state.requirements).map(r => {
                          let proposals = result.filter(it => it.requirementId == state.requirements[r].id) || [];
                          commit("setProposalsByCategory", {category: r, proposals});
                      })
                  }
                  resolve(result)
              })
      })
    },
      getRequirements({ commit, state }, eventId) {
          return new Promise((resolve, reject) => {
              new ProposalRequestRequirement()
                  .for(new CalendarEvent({ id: eventId }))
                  .get()
                  .then((res) => {
                      if(res && res.length) {
                          res.forEach(requirements => {
                              commit("setCategoryRequirements", { category: requirements.category, requirements })
                          })
                      }
                      resolve(res)
                  })
                  .catch(err => {
                      reject(err)
                  });
          });
      },
      getCartItems({ commit, state }, eventId) {
          return new Promise((resolve, reject) => {
              new Cart()
                  .for(new CalendarEvent({ id: eventId }))
                  .get()
                  .then((res) => {
                      if(res && res.length) {
                          res.forEach(item => {
                              commit("setCategoryCartItem", { category: item.category, item })
                          })
                      }
                      resolve(res)
                  })
                  .catch(err => {
                      reject(err)
                  });
          });
      },
      saveTypes({ commit, state }, { event, category, types }) {
          let requirements = state.requirements[category];
          if (!requirements) requirements = { event: { id: event.id }, category };
          requirements.types = { ...requirements.types, ...types };
          return new Promise((resolve, reject) => {
              new ProposalRequestRequirement(requirements)
                  .for(new CalendarEvent({ id: event.id }))
                  .save()
                  .then((res) => {
                      commit("setCategoryRequirements", { category, requirements: res })
                      resolve(res)
                  })
                  .catch(err => {
                      reject(err)
                  });
          });
      },
      saveMainRequirements({ commit, state }, { event, category, requirements }) {
          let originalRequirements = state.requirements[category];
          if (!originalRequirements) originalRequirements = { event: { id: event.id }, category };
          originalRequirements = { ...originalRequirements, ...requirements }
          return new Promise((resolve, reject) => {
              new ProposalRequestRequirement(originalRequirements)
                  .for(new CalendarEvent({ id: event.id }))
                  .save()
                  .then((res) => {
                      commit("setCategoryRequirements", { category, requirements: res })
                      resolve(res)
                  })
                  .catch(err => {
                      reject(err)
                  });
          });
      },
      updateRequirements({ commit, state }, requirements) {
          return new Promise((resolve, reject) => {
              new ProposalRequestRequirement(requirements)
                  .for(new CalendarEvent({ id: requirements.event.id }))
                  .save()
                  .then((res) => {
                      commit("setCategoryRequirements", { category: res.category, requirements: res })
                      resolve(res)
                  })
                  .catch(err => {
                      reject(err)
                  });
          });
      },
      updateCartItem({commit, state}, item) {
          return new Promise((resolve, reject) => {
              new Cart(item)
                  .for(new CalendarEvent({ id: item.event.id }))
                  .save()
                  .then((res) => {
                      commit("setCategoryCartItem", { category: res.category, item: res })
                      resolve(res)
                  })
                  .catch(err => {
                      reject(err)
                  });
          });
      },
      removeCartItem({commit, state}, item) {
          return new Promise((resolve, reject) => {
              new Cart(item)
                  .for(new CalendarEvent({id: item.event.id}))
                  .delete()
                  .then((res) => {
                      commit("removeCategoryCartItem", { category: item.category })
                      resolve(res)
                  })
                  .catch(err => {
                      reject(err)
                  });
          });
      }
  }
}
