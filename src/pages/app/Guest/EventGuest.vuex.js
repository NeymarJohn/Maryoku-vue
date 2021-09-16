import moment from 'moment'
import UserEvent from '@/models/UserEvent'

export default {
  namespaced: true,
  state () {
    return {
      eventData: {},
    }
  },

  mutations: {
    setEventProperty (state, {key, actualValue}) {
      state.eventData[key] = actualValue
    },
    setEventData (state, data) {
      state.eventData['id'] = data.id
      state.eventData['numberOfParticipants'] = data.numberOfParticipants
      state.eventData['eventType'] = data.eventType
      state.eventData['startTime'] = data.startTime
      state.eventData['endTime'] = data.endTime
      state.eventData['location'] = data.location
    },
  },
  actions: {
    getUserEvent ({dispatch, commit}, payload) {
        return new Promise(async (resolve) => {
            let query = new UserEvent({id: payload.id});
            let res = await query.get();
            console.log('getUserEvent', res);
            commit('setEventData', res.data);
            resolve(res.data)
        })

    }
  }
}
