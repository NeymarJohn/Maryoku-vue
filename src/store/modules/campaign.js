import Vue from "vue";
import Campaign from "@/models/Campaign";
import CalendarEvent from "@/models/CalendarEvent";
const defaultCampaignData = {
    SAVING_DATE: {
        title: "Event Name",
        description: "",
        coverImage: `https://static-maryoku.s3.amazonaws.com/storage/Campaign+Images/SAVE+THE+DATE.jpg`,
        logoUrl: "",
        campaignStatus: "EDITING",
        visibleSettings: {
            showLogo: true,
        },
    },
    RSVP: {
        title: "Event Name",
        description: "",
        coverImage: `https://static-maryoku.s3.amazonaws.com/storage/Campaign+Images/RSVP2.png`,
        campaignStatus: "EDITING",
        allowOnline: false,
        visibleSettings: {
            showWearingGuide: true,
            showKnowledge: true,
            showTimeline: true,
        },
        additionalData: {
            wearingGuide: "",
            knowledge: "",
            zoomlink: "",
        },
    },
    COMING_SOON: {
        title: "Event Name",
        description: "",
        coverImage: `https://static-maryoku.s3.amazonaws.com/storage/Campaign+Images/ComingSoon${(new Date().getDate() %
            10) +
            1}.png`,
        campaignStatus: "EDITING",
        visibleSettings: {
            showLogo: true,
            showComing: true,
            showCountdown: true,
        },
    },
    FEEDBACK: {
        name: "Event Name",
        description: "",
        campaignStatus: "EDITING",
        visibleSettings: {
            showImages: true,
            showSharingOption: true,
            showFeedback: true,
            allowUploadPhoto: true,
        },
        images: [
            {
                src: `https://static-maryoku.s3.amazonaws.com/storage/icons/RSVP/Image+81.jpg`,
            },
            {
                src: `https://static-maryoku.s3.amazonaws.com/storage/icons/RSVP/shutterstock_444402799_thumb.jpg`,
            },
            {
                src: `https://static-maryoku.s3.amazonaws.com/storage/icons/RSVP/Image+83.jpg`,
            },
            {
                src: `https://static-maryoku.s3.amazonaws.com/storage/icons/RSVP/Image+84.jpg`,
            },
        ],
        files: [],
        feedBack: [
            {
                question: "What did you like or dislike about this event?",
                showQuestion: true,
                rank: 0,
                icon: "",
            },
            {
                question: "What did you think of the venue?",
                showQuestion: true,
                rank: 0,
                icon: "venuerental",
            },
            {
                question: "How did you like the catering service?",
                showQuestion: true,
                rank: 0,
                icon: "foodandbeverage",
            },
            {
                question: "Did you enjoy the activity?",
                showQuestion: true,
                rank: 0,
                icon: "decor",
            },
        ],
    },
};
const state = {
    baseInfo: {
        title: "",
        logoUrl: "",
    },
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
                    let logoUrl = "";
                    if (res.length > 0) {
                        res.forEach(campaign => {
                            commit("setCampaign", {
                                name: campaign.campaignType,
                                data: campaign,
                            });
                            if (campaign.logoUrl) logoUrl = campaign.logoUrl;
                            campaigns[campaign.campaignType] = campaign;
                        });
                    }
                    const eventName = event.concept ? event.concept.name : "Event Name";
                    const defaultData = {
                        title: eventName,
                        description: "",
                        logoUrl,
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
                            data: { ...defaultCampaignData["RSVP"], ...defaultData },
                        });
                        commit("setBackupCampaign", {
                            name: "RSVP",
                            data: { ...defaultCampaignData["RSVP"], ...defaultData },
                        });
                    }
                    if (!campaigns["COMING_SOON"]) {
                        commit("setCampaign", {
                            name: "COMING_SOON",
                            data: { ...defaultCampaignData["COMING_SOON"], ...defaultData },
                        });
                        commit("setBackupCampaign", {
                            name: "COMING_SOON",
                            data: { ...defaultCampaignData["COMING_SOON"], ...defaultData },
                        });
                    }
                    if (!campaigns["FEEDBACK"]) {
                        commit("setCampaign", {
                            name: "FEEDBACK",
                            data: { ...defaultCampaignData["FEEDBACK"], ...defaultData },
                        });
                        commit("setBackupCampaign", {
                            name: "FEEDBACK",
                            data: { ...defaultCampaignData["FEEDBACK"], ...defaultData },
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
    setLogo({ commit, state }, { logoUrl, campaign }) {
        commit("setAttribute", {
            name: "SAVING_DATE",
            key: "logoUrl",
            value: logoUrl,
        });
        commit("setAttribute", {
            name: "RSVP",
            key: "logoUrl",
            value: logoUrl,
        });
        commit("setAttribute", {
            name: "COMING_SOON",
            key: "logoUrl",
            value: logoUrl,
        });
        commit("setAttribute", {
            name: "FEEDBACK",
            key: "logoUrl",
            value: logoUrl,
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
