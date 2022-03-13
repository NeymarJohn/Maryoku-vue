import Vue from "vue";

const state = {
  showCommentPanel: false,
  proposal: null
};

const mutations = {
  toggleCommentMode: (state, showCommentPanel) => {
    // console.trace("toggleCommentMode", showCommentPanel,state.showCommentPanel)
    state.showCommentPanel = !state.showCommentPanel;
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
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
