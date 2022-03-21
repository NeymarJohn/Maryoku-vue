import Vue from "vue";

const state = {
  showCommentPanel: false,
  proposal: null
};

const mutations = {
  toggleCommentMode: (state, mode) => {
    // console.trace("toggleCommentMode", showCommentPanel,state.showCommentPanel)
    state.showCommentPanel = mode !== null ? mode : !state.showCommentPanel;
  },
  setProposal: (state, proposal) => {
    console.log("setProposal");
    state.proposal = proposal;
  },
  updateCommentComponents: (state, commentComponents) => {
    console.log("updateCommentComponents");
    state.proposal.commentComponent = commentComponents;
  }
};

const actions = {
  setProposal: ({ commit, state }, proposal) => {
    commit("setProposal", proposal);
  },
  toggleCommentMode: ({ commit, state }, mode = null) => {
    commit("toggleCommentMode", mode);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
