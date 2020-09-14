const state = {
    savedate: null,
    rsvp: null,
    countdown: null,
    feedback: null,
};
const mutations = {
    setCampaign(state, campaignData) {
        state[campaignData.name] = campaignData.data;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
};
