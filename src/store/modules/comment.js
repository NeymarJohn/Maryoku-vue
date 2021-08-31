import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventComponent from '@/models/EventComponent'
import EventComment from '@/models/EventComment'
import EventCommentComponent from '@/models/EventCommentComponent'
import Model from '@/models/Model'
import { postReq, getReq } from '@/utils/token'
import { reject } from 'promise-polyfill'
const state = {
  index: 0,
  action: null,
  comment: null,
  component: null,
  commentComponents: [],
  guestName: null,
}

const getters = {
  getComponentComponents: (state) => {
    return state.commentComponents
  },
}

const mutations = {
  setIndex(state, index){
    state.index = index;
  },
  setAction(state, action){
    state.action = action;
  },
  setComment(state, comment){
    state.comment = comment;
  },
  setComponent(state, component){
    state.component = component;
  },
  setGuestName(state, name){
        state.guestName = name;
  },
  setCommentComponents(state, commentComponents) {
    state.commentComponents = commentComponents
  },
  addCommentComponent(state, commentComponent) {
    state.commentComponents.push(commentComponent);
  },
  setCommentsToComponent(state, { commentComponent, comments }) {
    const index = state.commentComponents.findIndex(item => item.id === commentComponent.id);
    state.commentComponents[index].comments = comments;
  },

  removeCommentComponent(state, commentComponent) {
    const index = state.commentComponents.findIndex(item => item.id === commentComponent.id)
    state.commentComponents.splice(index, 1)
  },

  updateCommentComponent(state, commentComponent) {
    const index = state.commentComponents.findIndex(item => item.id === commentComponent.id)
    state.commentComponents.splice(index, 1, commentComponent)
  },

  addChlidComment(state, { commentComponent, comment }) {
    const index = state.commentComponents.findIndex(item => item.id === commentComponent.id);
    state.commentComponents[index].comments = comments;
    state.commentComponent.push(commentComponent);
  },
  setComments(state, { commentComponentId, comments }) {
    const index = state.commentComponents.findIndex(item => item.id == commentComponentId)
    console.log(commentComponentId)
    state.commentComponents[index].comments = comments
  },

  addComment(state, { commentComponentId, comment }) {
    const index = state.commentComponents.findIndex(item => item.id == commentComponentId)
    if (!state.commentComponents[index].comments)
      state.commentComponents[index].comments = []
    state.commentComponents[index].comments.push(comment)
  },
  updateComment(state, comment) {
  },
}

const actions = {
  addCommentComponent({ commit, state }, commentComponent) {
    return new Promise((resolve, reject)=> {
      if (state.guestName) commentComponent = {...commentComponent, name: state.guestName};
      new EventCommentComponent(commentComponent)
        .save()
        .then(res => {
          commit('addCommentComponent', res.item)
          console.log(res)
          resolve(res.item)
        });
    })
  },
  getCommentComponents({ commit, state }, url) {
    return new Promise( async (resolve, reject) => {
      const commentComponents = await postReq(`/1/commentComponents/get`, { url })
      commit('setCommentComponents', commentComponents.data)
      resolve(commentComponents.data)
    });
  },

  /****Event comments  */
  getCommentsAction({ commit, state }, commentComponentId) {
    const eventComponent = new EventCommentComponent({ id: commentComponentId })
    return new Promise((resolve, reject) => {
      new EventComment()
        .for(eventComponent)
        .get()
        .then(comments => {
          commit('setComments', { commentComponentId, comments })
          resolve(comments)
        });
    })
  },

  addComment({ commit, state }, comment) {
    const commentComponent = new EventCommentComponent({ id: comment.commentComponent.id })
    if (state.guestName) comment = {...comment, name: state.guestName};
    return new Promise((resolve, reject) => {
      new EventComment(comment)
        .for(commentComponent)
        .save()
        .then(res => {
          // commit('addComment', { commentComponentId: comment.commentComponent.id, res });
          resolve(res.item)
        })
    })

  },

  deleteCommentComponent({ commit, state }, commentComponent) {
    console.log(commentComponent)
    return new Promise((resolve, reject) => {
      new EventCommentComponent(commentComponent)
        .delete()
        .then(res => {
          commit('removeCommentComponent', commentComponent);
          resolve(res)
        })
    })
  },

  updateCommentComponent({ commit, state }, commentComponent) {
    return new Promise((resolve, reject) => {
      new EventCommentComponent(commentComponent)
        .save()
        .then(res => {
          commit('updateCommentComponent', res.item)
          resolve(res)
        })
    })
  },

  updateCommentAction({commit, state}, comment) {
    return new Promise((resolve, reject) => {
      const commentComponent = new EventCommentComponent({id: comment.eventCommentComponent.id})
      new EventComment(comment)
        .for(commentComponent)
        .save()
        .then(res => {
          console.log(res)
          // commit('updateCommentComponent', res.item)
          resolve(res)
        })
    })
  },
  deleteCommentAction({commit, state}, comment) {
    console.log(comment)
    return new Promise((resolve, reject) => {
      const eventCommentComponent = new EventCommentComponent({id: comment.id})
      new EventComment(comment)
        .for(eventCommentComponent)
        .delete()
        .then(res => {
          resolve(res)
        })
    })
  }

}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
