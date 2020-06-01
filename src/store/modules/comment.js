import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventComponent from '@/models/EventComponent'
import EventComment from '@/models/EventComment'
import EventCommentComponent from  '@/models/EventCommentComponent'
import Model from '@/models/Model'
import { postReq, getReq } from '@/utils/token'
const state = {
  index:0,
  commentComponents:[]
}

const getters = {
  getComponentComponents: (state) => {
    return state.commentComponents
  },
}

const mutations = {
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
  }
}

const actions = {
  async addCommentComponent({ commit, state }, commentComponent) {
    new EventCommentComponent(commentComponent)
      .save()
      .then(commentComponent => {
        commit('addCommentComponent', commentComponent.item)
      });
  },
  async getCommentComponents({ commit, state }, url) {
    console.log("getCommentComponents")
    const commentComponents = await postReq(`/1/commentComponents/get`, { url })
    commit('setCommentComponents', commentComponents.data)
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
    return new Promise((resolve, reject) => { 
      new EventComment(comment)
        .for(commentComponent)
        .save()
        .then(res=>{
          commit('addComment', { commentComponentId: comment.commentComponent.id, res });
          resolve(res)
        })
    })
    
  },
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
