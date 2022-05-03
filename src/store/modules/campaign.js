// core
import Vue           from "vue";

// models
import Campaign      from "@/models/Campaign";
import CalendarEvent from "@/models/CalendarEvent";

// Create constants
const DATE               = new Date();
const TIME               = DATE.getTime();
const STATIC_URL         = "https://static-maryoku.s3.amazonaws.com/";
const STORAGE_PATH       = "storage/";
const STORAGE_URL        = STATIC_URL + STORAGE_PATH;
const CAMPAIGN_TYPES     = ["SAVING_DATE", "RSVP", "COMING_SOON", "FEEDBACK"];
const DEFAULT_EVENT_NAME = "Event Name";

const defaultSettingPart = {
  selected      : false,
  excelFileName : "",
  excelFilePath : "",
  sentTime      : TIME
};

const defaultSettings = {
  phone: {
    ...defaultSettingPart,
    numberString  : "",
    smsOrWhatsapp : "sms",
    numberArray   : [],
  },
  email: {
    ...defaultSettingPart,
    subject       : "",
    from          : "",
    addressString : "",
    addressArray  : [],
  }
};

const coverImgPrefix = (TIME % 2) + 1;
const defaultCampaignDataPartType = {
  title          : DEFAULT_EVENT_NAME,
  logoUrl        : "",
  campaignStatus : "EDITING",
};

const defaultCampaignData = {
  initialized : false,
  SAVING_DATE : {
    ...defaultCampaignDataPartType,
    description :
      "Clear your schedule and get ready to mingle! the greatest event of the year is coming up! more details are yet to come, but we can already promise you it's going to be an event to remember. be sure to mark the date on your calendar. you can do it using this link: (google calendar link). see ya soon",
    coverImage : `${STORAGE_URL}Campaign+Headers/save-the-date${coverImgPrefix}.png`,
    visibleSettings: {
      showLogo : true
    }
  },
  RSVP: {
    ...defaultCampaignDataPartType,
    description       : "",
    coverImage        : "",
    defaultCoverImage : `${STORAGE_URL}Campaign+Headers/rsvp${coverImgPrefix}.png`,
    allowOnline       : false,
    visibleSettings   : {
      showWearingGuide : true,
      showKnowledge    : true,
      showTimeline     : true
    },
    additionalData : {
      greetingWords     : "",
      wearingGuide      : "",
      wearingGuideTitle : "WHAT SHOULD I WEAR?",
      knowledge         : "",
      knowledgeTitle    : "WHAT SHOULD I KNOW?",
      zoomlink          : "",
      prefixEvent       : "YOU ARE INVITED TO",
      carouselTitle     : "ADD YOUR TITLE HERE"
    },
    images: [
      {
        src: `${STORAGE_URL}icons/RSVP/Image+81.jpg`,
        default: true
      },
      {
        src: `${STORAGE_URL}icons/RSVP/shutterstock_444402799_thumb.jpg`,
        default: true
      },
      {
        src: `${STORAGE_URL}icons/RSVP/Image+83.jpg`,
        default: true
      },
      {
        src: `${STORAGE_URL}icons/RSVP/Image+84.jpg`,
        default: true
      }
    ]
  },
  COMING_SOON: {
    ...defaultCampaignDataPartType,
    description    : "",
    coverImage     : `${STORAGE_URL}Campaign+Headers/coming-soon${(TIME % 4) + 1}.png`,
    showLogo       : true,
    showComing     : true,
    showCountdown  : true,
    visibleSettings: {
      showLogo      : true,
      showComing    : true,
      showCountdown : true
    }
  },
  FEEDBACK: {
    ...defaultCampaignDataPartType,
    description    : "Thanks for attending this recent event – we hope you had a wonderful, productive experience! Your feedback is important to help us understand what worked especially well, on top of anything you feel could be improved in the future.",
    coverImage     : `${STORAGE_URL}Campaign+Headers/feedback${coverImgPrefix}.png`,
    visibleSettings: {
      showImages        : true,
      showSharingOption : true,
      showFeedback      : true,
      allowUploadPhoto  : true,
      downloadFiles     : true
    },
    images : [],
    files  : [],
    feedbackQuestions: [
      {
        question: "What did you like or dislike about this event?",
        showQuestion: true,
        rank: 0,
        icon: ""
      },
      {
        question: "What did you think of the venue?",
        showQuestion: true,
        rank: 0,
        icon: "venuerental"
      },
      {
        question: "How did you like the catering service?",
        showQuestion: true,
        rank: 0,
        icon: "foodandbeverage"
      },
      {
        question: "Did you enjoy the activity?",
        showQuestion: true,
        rank: 0,
        icon: "decor"
      }
    ]
  }
};

const state = {
  baseInfo: {
    title: "",
    logoUrl: ""
  },
  SAVING_DATE        : null,
  RSVP               : null,
  COMING_SOON        : null,
  FEEDBACK           : null,
  SAVING_DATE_BACKUP : null,
  RSVP_BACKUP        : null,
  COMING_SOON_BACKUP : null,
  FEEDBACK_BACKUP    : null
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
    CAMPAIGN_TYPES.forEach((campaignType) => Vue.set(state, campaignType, null));
  },
  setInitialized(state, value) {
    Vue.set(state, "initialized", value);
  },
  setAddtionalData(state, { name, key, value }) {
    const root = state[name];
    if (!root.additionalData) Vue.set(root, "additionalData", {});
    Vue.set(root.additionalData, key, value);
  }
};

const getters = {
  campaignIssued(state) {
    const checkStartedByKey = key => state[key] && state[key].campaignStatus === "STARTED";
    return {
      SAVING_DATE : checkStartedByKey("SAVING_DATE"),
      RSVP        : checkStartedByKey("RSVP"),
      COMING_SOON : checkStartedByKey("COMING_SOON"),
      FEEDBACK    : checkStartedByKey("FEEDBACK"),
    };
  },
  defaultSettings(state) {
    const campaignFound = CAMPAIGN_TYPES.find((campaignType) => state[campaignType] && state[campaignType].settings);
    return campaignFound ? campaignFound.settings : defaultSettings;
  }
};
const actions = {
  async getCampaigns({ commit, state }, { event }) {
    if (state.initialized) return state;
    const result = await new Campaign().for(new CalendarEvent({ id: event.id })).get();
    const campaigns = {};
    let logoUrl = "";
    if (result.length > 0) result.forEach((campaign) => {
      const name = campaign.campaignType;
      commit("setCampaign", { name, data: campaign });
      if (campaign.logoUrl) logoUrl = campaign.logoUrl;
      campaigns[name] = campaign;
    });
    const eventName = event.concept ? event.concept.name : DEFAULT_EVENT_NAME;
    const defaultData = {
      title: eventName,
      // description: "",
      logoUrl
    };

    const commitCampaign = (name, data) => {
      commit("setCampaign",       { name, data });
      commit("setBackupCampaign", { name, data });
    };

    const setDefault = (name) => commitCampaign(name, createDefaultData(name));

    const createDefaultData = (key) => ({ ...defaultCampaignData[key], ...defaultData });
    if (!campaigns["SAVING_DATE"]) setDefault("SAVING_DATE");
    else defaultData.title = campaigns["SAVING_DATE"].title;

    if (!campaigns["RSVP"]) {
      const rsvpData = createDefaultData("RSVP");
      if (event.places && event.places.includes("VIRTUAL")) rsvpData.allowOnline = true;
      commitCampaign("RSVP", rsvpData);
    }
    if (!campaigns["COMING_SOON"]) setDefault("COMING_SOON");
    if (!campaigns["FEEDBACK"])    setDefault("FEEDBACK");
    commit("setInitialized", true);
    return campaigns;
  },
  async saveCampaign({ commit }, data) {
    const campaign           = new Campaign(data);
    const saveCampaignResult = await campaign.save();
    const { item }           = saveCampaignResult;
    commit("setCampaign", {
      name: item.campaignType,
      data: item
    });
    return saveCampaignResult;
  },
  revertCampaign({ commit, state }, name) {
    const backupData = state[`${name}_BACKUP`];
    commit("setCampaign", {
      name: name,
      data: { ...backupData },
    });
  },
  setLogo({ commit }, { logoUrl, campaign }) {
    const commitLogoByName = name => commit("setAttribute", { key: "logoUrl", value: logoUrl, name });
    CAMPAIGN_TYPES.forEach(commitLogoByName);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
