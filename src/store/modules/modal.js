import Proposal from "@/models/Proposal";

const state = {
      name: null,
      proposal: null,
}

const actions = {
    saveProposal({commit, state}, proposal){
        return new Promise(async (resolve, reject) => {
            let query = new Proposal(proposal);
            let res = await query.save();

            resolve(res);
        })
    },
}

const mutations = {
    setOpen(state, val){
        state.name = val
    },
    setProposal(state, proposal){
        state.proposal = proposal;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
