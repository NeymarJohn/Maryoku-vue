import Campaign from "@/models/Campaign";
import CalendarEvent from "@/models/CalendarEvent";
import { resolve } from "promise-polyfill";
const state = {
    SAVING_DATE: null,
    RSVP: null,
    COMING_SOON: null,
    FEEDBACK: null,
};

const mutations = {
    setCampaign(state, { name, data }) {
        state[name] = data;
    },
};
const getters = {
    campaignIssued(state) {
        return {
            SAVING_DATE:
                state["SAVING_DATE"] &&
                state["SAVING_DATE"].campaignStatus === "STARTED",
            RSVP: state["RSVP"] && state["RSVP"].campaignStatus === "STARTED",
            COMING_SOON:
                state["COMING_SOON"] &&
                state["COMING_SOON"].campaignStatus === "STARTED",
            FEEDBACK:
                state["FEEDBACK"] &&
                state["FEEDBACK"].campaignStatus === "STARTED",
        };
    },
};
const actions = {
    getCampaigns({ commit, state }, { event }) {
        return new Promise((resolve, reject) => {
            new Campaign()
                .for(new CalendarEvent({ id: event.id }))
                .get()
                .then(res => {
                    console.log(res);
                    const campaigns = {};
                    if (res.length > 0) {
                        res.forEach(campaign => {
                            commit("setCampaign", {
                                name: campaign.campaignType,
                                data: campaign,
                            });
                            campaigns[campaign.campaignType] = campaign;
                        });
                    }
                    resolve(campaigns);
                });
        });
    },
    saveCampaign({ commit, state }, campaign) {
        return new Promise((resolve, reject) => {
            new Campaign(campaign).save().then(res => {
                commit("setCampaign", {
                    name: res.campaignType,
                    data: res,
                });
                resolve(res);
            });
        });
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
