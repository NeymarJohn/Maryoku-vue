import Vue from "vue";
import ProposalVersion from "@/models/ProposalVersion";
import Proposal from "@/models/Proposal";

const state = {
  proposal: null,
  selectedVersion: null,
  original: null,
  currentVersion: -1,
  showCommentPanel: false,
};

const setStateFromData = (proposal, data) => {
  Object.keys(data).map((key) => {
    Vue.set(proposal, key, JSON.parse(JSON.stringify(data[key])));
  });
};

const mutations = {
  selectVersion: (state, index) => {
    state.currentVersion = index;

    if (index === -1) {
      setStateFromData(state.proposal, JSON.parse(JSON.stringify(state.original)));
    } else {
      setStateFromData(state.proposal, JSON.parse(JSON.stringify(state.proposal.versions[index].data)));
    }
  },
  setVersions: (state, versions) => {
      state.proposal.versions = versions;
  },
  setProposal: (state, proposal) => {
      console.log('set.version', proposal);
      state.proposal = proposal;
      Vue.set(state, "original", proposal);
  },
  updateCommentComponents: (state, commentComponents) => {
      state.proposal.commentComponent = commentComponents;
  },
  toggleCommentMode: (state, mode) => {
    // console.trace("toggleCommentMode", showCommentPanel,state.showCommentPanel)
    state.showCommentPanel = mode !== null ? mode : !state.showCommentPanel;
  },
};

const actions = {
  setProposal: ({ commit, state }, proposal) => {
    commit("setProposal", proposal);
  },
  saveVersion({ commit, state }, data) {
    return new Promise(async (resolve, reject) => {
      const query = new ProposalVersion({ ...data, proposal: new Proposal({ id: state.proposal.id }) }).for(
        new Proposal({ id: state.proposal.id })
      );
      let res = await query.save();
      console.log("res", res);

      let idx = state.proposal.versions.findIndex((v) => v.id === res.id);
      if (idx === -1) {
        commit("setVersions", [...state.proposal.versions, res]);
      } else {
        Vue.set(state.proposal.versions, idx, res);
        commit("setVersions", state.proposal.versions);
      }
    });
  },
  removeVersion: ({ commit, state }, idx) => {
    return new Promise(async (resolve, reject) => {
      let version = await ProposalVersion.find(state.proposal.versions[idx].id);
      await version.delete();

      let versions = state.proposal.versions.filter((v, index) => index !== idx);

      commit("setVersions", versions);
      resolve();
    });
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
