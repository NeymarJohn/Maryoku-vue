import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventComponent from '@/models/EventComponent'
import EventComment from '@/models/EventComment'
import EventCommentComponent from  '@/models/EventCommentComponent'

const state = {
  index:0,
  componentComponents:[],
  comments: []
}

const getters = {
  getComponentComponents: (state) => {
    return state.componentComponents
  },
}

const mutations = {
  setCommentComponents(state, commentComponents) {
    state.commentComponents = commentComponents
  },
  addCommentComponent(state, commentComponent) {
    state.commentComponent.push(commentComponent);
  },
  removeCommentComponent(state, commentComponent) {
    const index = state.commentComponents.findIndex(item=> item.id === commentComponent.id);
    state.commentComponent.splice(index, 1);
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

const actions = {
  addCommentComponent(state, commentComponent) {
    state.commentComponent.push(commentComponent);
  },
  getCommentComponents(state) {
    
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
