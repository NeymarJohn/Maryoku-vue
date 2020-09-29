import Vue from "vue";
import Campaign from "@/models/Campaign";
import CalendarEvent from "@/models/CalendarEvent";
const defaultCampaignData = {
    SAVING_DATE: {
        title: "",
        description: "",
        coverImage: `Campaign+Images/SAVE+THE+DATE.jpg`,
        logoUrl: "",
        campaignStatus: "EDITING",
        visibleSettings: {
            showLogo: true,
        },
    },
};
const state = {
    SAVING_DATE: null,
    RSVP: null,
    COMING_SOON: null,
    FEEDBACK: null,
    SAVING_DATE_BACKUP: null,
    RSVP_BACKUP: null,
    COMING_SOON_BACKUP: null,
    FEEDBACK_BACKUP: null,
};

const mutations = {
    setCampaign(state, { name, data }) {
        Vue.set(state, name, data);
    },
    setBackupCampaign(state, { name, data }) {
        Vue.set(state, `${name}_BACKUP`, data);
    },
    setAttribute(state, { name, key, value }) {
        console.log(name);
        console.log(key);
        Vue.set(state[name], key, value);
    },
    initCampaign(state) {
        Vue.set(state, "SAVING_DATE", null);
        Vue.set(state, "RSVP", null);
        Vue.set(state, "COMING_SOON", null);
        Vue.set(state, "FEEDBACK", null);
    },
};
const getters = {
    campaignIssued(state) {
        return {
            SAVING_DATE: state["SAVING_DATE"] && state["SAVING_DATE"].campaignStatus === "STARTED",
            RSVP: state["RSVP"] && state["RSVP"].campaignStatus === "STARTED",
            COMING_SOON: state["COMING_SOON"] && state["COMING_SOON"].campaignStatus === "STARTED",
            FEEDBACK: state["FEEDBACK"] && state["FEEDBACK"].campaignStatus === "STARTED",
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
                    const eventName = event.concept ? event.concept.name : "Event Name";
                    const defaultData = {
                        title: eventName,
                        descriptoin: "",
                    };
                    if (!campaigns["SAVING_DATE"]) {
                        commit("setCampaign", {
                            name: "SAVING_DATE",
                            data: { ...defaultCampaignData["SAVING_DATE"], ...defaultData },
                        });
                        commit("setBackupCampaign", {
                            name: "SAVING_DATE",
                            data: { ...defaultCampaignData["SAVING_DATE"], ...defaultData },
                        });
                    }
                    if (!campaigns["RSVP"]) {
                        commit("setCampaign", {
                            name: "RSVP",
                            data: defaultData,
                        });
                        commit("setBackupCampaign", {
                            name: "RSVP",
                            data: Object.assign({}, defaultData),
                        });
                    }
                    if (!campaigns["COMING_SOON"]) {
                        commit("setCampaign", {
                            name: "COMING_SOON",
                            data: defaultData,
                        });
                        commit("setBackupCampaign", {
                            name: "COMING_SOON",
                            data: Object.assign({}, defaultData),
                        });
                    }
                    if (!campaigns["FEEDBACK"]) {
                        commit("setCampaign", {
                            name: "FEEDBACK",
                            data: defaultData,
                        });
                        commit("setBackupCampaign", {
                            name: "FEEDBACK",
                            data: Object.assign({}, defaultData),
                        });
                    }
                    resolve(campaigns);
                });
        });
    },
    saveCampaign({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            const campaign = new Campaign(data);
            campaign.save().then(res => {
                console.log("camppaignData", res.item);
                commit("setCampaign", {
                    name: res.item.campaignType,
                    data: res.item,
                });
                resolve(res);
            });
        });
    },
    revertCampaign({ commit, state }, name) {
        const backupdata = state[`${name}_BACKUP`];
        commit("setCampaign", {
            name: name,
            data: Object.assign({}, backupdata),
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
