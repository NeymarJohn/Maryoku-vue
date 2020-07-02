import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import event from './modules/event'
import comment from './modules/comment'
import PublicEventPlanner from './modules/PublicEventPlanner'
import vendor from './modules/vendor'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    comment,
    vendor,
    PublicEventPlanner
  }
})
