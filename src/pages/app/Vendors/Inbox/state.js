import Vue from "vue";
import ProposalVersion from "@/models/ProposalVersion";
import Proposal from "@/models/Proposal";

const state = {
  proposal: null,
  selectedVersion: null,
  original: null,
  currentVersion: -1
};

const setStateFromData = (proposal, data) => {
  Object.keys(data).map((key) => {
    Vue.set(proposal, key, JSON.parse(JSON.stringify(data[key])));
  });
};

const mutations = {
  selectVersion: (state, index) => {
    state.currentVersion = index;

    console.log("state.proposal", state.proposal);
    if (index === -1) {
      setStateFromData(state.proposal, JSON.parse(JSON.stringify(state.original)));
    }

    if (index > -1) {
      setStateFromData(state.proposal, JSON.parse(JSON.stringify(state.proposal.versions[index].data)));
    }

    if (index > -1) {
        setStateFromData(state.proposal, JSON.parse(JSON.stringify(state.proposal.versions[index].data)));
    }

    console.log(state.currentVersion, state.proposal);
    },
    setVersions: (state, versions) => {
        state.proposal.versions = versions;
    },
    setProposal: (state, proposal) => {
        state.proposal = proposal;
        state.proposal.versions = proposal.versions || [];
        state.currentVersion = -1;
        Vue.set(state, "original", proposal);
    },
    updateCommentComponents: (state, commentComponents) => {
        console.log("updateCommentComponents");
        state.proposal.commentComponent = commentComponents;
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
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
