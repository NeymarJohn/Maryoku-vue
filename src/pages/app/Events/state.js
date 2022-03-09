import Vue from "vue";

const state = {
    showCommentPanel: false,
    proposal: null,
}


const mutations = {

    toggleCommentMode: (state, showCommentPanel) => {
        console.log("toggleCommentMode", showCommentPanel)
        state.showCommentPanel = showCommentPanel;
    },
    setProposal: (state, proposal) => {
        console.log("setProposal");
        state.proposal = proposal;
    },
}

const actions = {
    setProposal: ({ commit, state }, proposal) => {
        commit("setProposal", proposal);
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
