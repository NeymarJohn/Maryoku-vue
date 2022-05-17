<template>
  <div
    class="
      md-layout
      event-campaign-section
      booking-section
      event-campaign-width
    "
  >
    <budget-notifications />
    <div class="inner-container">
      <comment-editor-panel
        v-if="showCommentEditorPanel"
        :comment-components="commentComponents"
        @saveComment="saveComment"
        @updateComment="updateComment"
        @deleteComment="deleteComment"
        @updateCommentComponent="updateCommentComponent"
      />
      <div class="event-page-header md-layout-item md-size-100">
        <div class="header-name">
          <div class="font-size-30 font-bold text-transform-capitalize mb-20">
            <img
              class="mr-10"
              :src="`${$iconURL}Campaign/Group 8857.svg`"
            >
            your event's brilliant campaign
          </div>
          <p class="font-size-16">
            Get your guests super exited by giving them a taste of what's
            waiting for them
          </p>
        </div>
        <header-actions
          :custom-styles="{ showCommentsText: { paddingLeft: '2px' } }"
          @toggleCommentMode="toggleCommentMode"
          @export="exportToPdf"
        />
      </div>
      <div class="campaign-content md-layout-item md-size-100 mt-30">
        <loader :active="isLoading" />
        <div class="campaign-content-tab d-flex">
          <div
            class="
              campaign-content-tab-item
              flex-1
              font-size-22 font-bold-extra
              text-center
            "
            :class="{ selected: selectedTab === 1 }"
            @click="selectTab(1)"
          >
            <img
              v-if="campaignIssued['SAVING_DATE']"
              :src="`${$iconURL}Campaign/Group 9222.svg`"
            >
            <span
              :class="{ completedCampaign: campaignIssued['SAVING_DATE'] }"
            >Save The Date</span>
            <span>
              <img
                class="ml-20"
                :src="`${$iconURL}Campaign/Group 9087.svg`"
              >
              <md-tooltip class="w-max-350">
                <div class="font-size-14 tab-tooltip">
                  <p>{{ campaignTabs[1].tooltip }}</p>
                </div>
              </md-tooltip>
            </span>
          </div>
          <div
            class="
              campaign-content-tab-item
              flex-1
              font-size-22 font-bold-extra
              text-center
            "
            :class="{ selected: selectedTab === 2 }"
            @click="selectTab(2)"
          >
            <img
              v-if="campaignIssued['RSVP']"
              :src="`${$iconURL}Campaign/Group 9222.svg`"
            >
            <span
              :class="{ completedCampaign: campaignIssued['RSVP'] }"
            >RSVP</span>
            <span>
              <img
                class="ml-20"
                :src="`${$iconURL}Campaign/Group 9087.svg`"
              >
              <md-tooltip class="w-max-350">
                <div class="font-size-14 tab-tooltip">
                  <p>{{ campaignTabs[2].tooltip }}</p>
                </div>
              </md-tooltip>
            </span>
          </div>
          <div
            class="
              campaign-content-tab-item
              flex-1
              font-size-22 font-bold-extra
              text-center
            "
            :class="{ selected: selectedTab === 3 }"
            @click="selectTab(3)"
          >
            <img
              v-if="campaignIssued['COMING_SOON']"
              :src="`${$iconURL}Campaign/Group 9222.svg`"
            >
            <span
              :class="{ completedCampaign: campaignIssued['COMING_SOON'] }"
            >Coming Soon</span>
            <span>
              <img
                class="ml-20"
                :src="`${$iconURL}Campaign/Group 9087.svg`"
              >
              <md-tooltip class="w-max-350">
                <div class="font-size-14 tab-tooltip">
                  <p>{{ campaignTabs[3].tooltip }}</p>
                </div>
              </md-tooltip>
            </span>
          </div>
          <div
            class="
              campaign-content-tab-item
              flex-1
              font-size-22 font-bold-extra
              text-center
            "
            :class="{ selected: selectedTab === 4 }"
            @click="selectTab(4)"
          >
            <img
              v-if="campaignIssued['FEEDBACK']"
              :src="`${$iconURL}Campaign/Group 9222.svg`"
            >
            <span
              :class="{ completedCampaign: campaignIssued['FEEDBACK'] }"
            >Feedback</span>
            <span>
              <img
                class="ml-20"
                :src="`${$iconURL}Campaign/Group 9087.svg`"
              >
              <md-tooltip class="w-max-350">
                <div class="font-size-14 tab-tooltip">
                  <p>{{ campaignTabs[4].tooltip }}</p>
                </div>
              </md-tooltip>
            </span>
          </div>
        </div>
        <savedate-analytics
          v-if="selectedTab == 1 && campaignIssued['SAVING_DATE']"
        />
        <rsvp-analytics
          v-if="selectedTab == 2 && campaignIssued['RSVP']"
        />
        <comingsoon-analytics
          v-if="selectedTab == 3 && campaignIssued['COMING_SOON']"
        />
        <feedback-analytics
          v-if="selectedTab == 4 && campaignIssued['FEEDBACK']"
        />

        <!-- Save the date -->
        <vue-html2pdf
          ref="html2Pdf"
          :show-layout="false"
          :float-layout="false"
          :enable-download="false"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          :filename="`budget-${event.id}`"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="100%"
        >
          <section slot="pdf-content">
            <template v-if="selectedTab == 1">
              <collapse-panel
                v-if="campaignIssued['SAVING_DATE']"
                class="white-card"
                :default-status="false"
              >
                <template slot="header">
                  <div class="d-flex align-center p-50 font-size-30 font-bold">
                    Open ‘Save The Date’ Campaign
                  </div>
                </template>
                <template slot="content">
                  <save-date
                    :info="getCompaingInfo(1)"
                    :show-change-cover="true"
                    @changeInfo="changeInfo"
                    @change-logo="changeCampaignLogo"
                    @change-cover-image="showChangeCoverImageModal"
                  />
                </template>
              </collapse-panel>
              <save-date
                v-else
                ref="savedateCampaign"
                class="white-card"
                :info="getCompaingInfo(1)"
                :show-change-cover="true"
                @changeInfo="changeInfo"
                @change-logo="changeCampaignLogo"
                @change-cover-image="showChangeCoverImageModal"
              />
            </template>

            <template v-if="selectedTab == 2">
              <collapse-panel
                v-if="campaignIssued['RSVP']"
                class="white-card"
                :default-status="false"
              >
                <template slot="header">
                  <div class="d-flex align-center p-50 font-size-30 font-bold">
                    Open ‘RSVP’ Campaign
                  </div>
                </template>
                <template slot="content">
                  <rsvp
                    ref="rsvp"
                    :info="getCompaingInfo(2)"
                    @change-logo="changeCampaignLogo"
                    @change-cover-image="showChangeCoverImageModal"
                  />
                </template>
              </collapse-panel>
              <rsvp
                v-else
                ref="rsvp"
                :info="getCompaingInfo(2)"
                @change-logo="changeCampaignLogo"
                @change-cover-image="showChangeCoverImageModal"
              />
            </template>

            <template v-if="selectedTab == 3">
              <collapse-panel
                v-if="campaignIssued['COMING_SOON']"
                class="white-card"
                :default-status="false"
              >
                <template slot="header">
                  <div class="d-flex align-center p-50 font-size-30 font-bold">
                    Open ‘Cooming Soon’ Campaign
                  </div>
                </template>
                <template slot="content">
                  <countdown
                    ref="countdown"
                    :info="getCompaingInfo(3)"
                    @change-logo="changeCampaignLogo"
                    @change-cover-image="showChangeCoverImageModal"
                  />
                </template>
              </collapse-panel>
              <countdown
                v-else
                ref="countdown"
                :info="getCompaingInfo(3)"
                class="white-card"
                @change-logo="changeCampaignLogo"
                @change-cover-image="showChangeCoverImageModal"
              />
            </template>

            <template v-if="selectedTab == 4">
              <collapse-panel
                v-if="campaignIssued['FEEDBACK']"
                class="white-card"
                :default-status="false"
              >
                <template slot="header">
                  <div class="d-flex align-center p-50 font-size-30 font-bold">
                    Open ‘Feedback’ Campaign
                  </div>
                </template>
                <template slot="content">
                  <feedback
                    ref="feedback"
                    :info="getCompaingInfo(4)"
                    @change-logo="changeCampaignLogo"
                    @change-cover-image="showChangeCoverImageModal"
                  />
                </template>
              </collapse-panel>
              <feedback
                v-else
                ref="feedback"
                :info="getCompaingInfo(4)"
                class="white-card"
                @change-logo="changeCampaignLogo"
                @change-cover-image="showChangeCoverImageModal"
              />
            </template>
          </section>
        </vue-html2pdf>
        <delivery-settings
          :default-settings="deliverySettings"
          :campaign="campaignTabs[selectedTab]"
          @change="changeSettings"
        />
      </div>
      <campaign-schedule-modal
        v-if="showScheduleModal"
        :campaigns="campaignTabs"
        :current-campaign="campaignTabs[selectedTab]"
        :current-campaign-index="selectedTab"
        @changeTime="saveScheduleTime"
        @cancel="showScheduleModal = false"
      />
    </div>

    <div class="campaign-footer white-card">
      <div class="campaign-footer-content d-flex">
        <scroll-to-top-btn />
        <div
          v-if="!campaignIssued[campaignTabs[selectedTab].name]"
          class="d-flex align-center"
        >
          <template v-if="isScheduled">
            <template v-if="canSchedule">
              <span class="seperator" />
              <Schedule :time="selectedCampaign.scheduleSettings.scheduleTime" />
              <md-button
                class="maryoku-btn md-simple md-red"
                @click="cancelSchedule"
              >
                Cancel
              </md-button>
            </template>
            <template v-else>
              <Scheduled :label="`Scheduled To ${$dateUtil.formatScheduleDay(event.eventStartMillis, 'MMM DD, YYYY')}`" />
              <SendAgainBtn v-if="selectedTab !== 3" @click="startCampaign" />
              <SendAgainBtn v-else @click="showScheduleModal = true">
                Change Schedule
              </SendAgainBtn>
            </template>
          </template>
          <template v-else>
            <md-button
              class="md-simple md-button md-black maryoku-btn"
              @click="sendPreviewEmail"
            >
              <Icon src="Campaign/Group 1855.svg">
                Send Me A Preview
              </Icon>
            </md-button>
            <span class="seperator" />
            <md-button
              class="md-simple md-button md-black maryoku-btn"
              @click="revertSetting"
            >
              <Icon src="Campaign/Group 8871.svg">
                Revert to original
              </Icon>
            </md-button>
            <div
              class="schedule-btn d-flex"
            >
              <md-button
                class="md-button md-red maryoku-btn schedule-campaign-btn"
                @click="showScheduleModal = true"
              >
                <Icon src="Campaign/Path 4377.svg">
                  Schedule Campaign
                </Icon>
              </md-button>
              <ContextMenu @start="startCampaign" @save="saveDraftCampaign" />
            </div>
          </template>
        </div>
        <div
          v-else
          class="d-flex align-center"
        >
          <template v-if="!canSchedule">
            <Scheduled :label="`${selectedCampaign.campaignStatus === 'STARTED' ? 'Sent on' : 'Scheduled To'}
            ${$dateUtil.formatScheduleDay(selectedCampaign.scheduleTime, 'MMM DD, YYYY')}`" />
            <SendAgainBtn v-if="selectedTab !== 3" @click="startCampaign" />
            <SendAgainBtn v-else @click="showScheduleModal = true">
              Change Schedule
            </SendAgainBtn>
          </template>
          <div
            v-else
            class="schedule-btn d-flex"
          >
            <md-button
              class="md-button md-red maryoku-btn schedule-campaign-btn"
              @click="showScheduleModal = true"
            >
              <Icon src="Campaign/Path 4377.svg">
                Schedule Campaign
              </Icon>
            </md-button>
            <ContextMenu @start="startCampaign" @save="saveDraftCampaign" />
          </div>
        </div>
      </div>
    </div>
    <change-cover-image-modal
      v-if="showChangeCoverModal"
      :cover-image="selectedCampaign.coverImage"
      :default-cover-image="campaignTabs[selectedTab].defaultCoverImage"
      @close="close"
      @choose-image="chooseImage"
    />
  </div>
</template>

<script>
// core
import { mapActions, mapGetters, mapMutations } from "vuex";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

// components
// global
import { Loader }            from "@/components";
import HeaderActions         from "@/components/HeaderActions";
import CampaignScheduleModal from "@/components/Modals/Campaign/ScheduleModal/index.vue";

// local
import DeliverySettings    from "../DeliverySettings/index";
import CollapsePanel       from "../CollapsePanel";
import RsvpAnalytics       from "../components/RSVPAnalytics";
import SavedateAnalytics   from "../components/SavedateAnalytics";
import ComingsoonAnalytics from "../components/ComingSoonAnalytics";
import FeedbackAnalytics   from "../components/FeedbackAnalytics";
import ScrollToTopBtn      from "./Footer/ScrollToTopBtn";
import Icon                from "./Footer/Icon";
import Schedule            from "./Footer/Schedule";
import Scheduled           from "./Footer/Scheduled";
import SendAgainBtn        from "./Footer/SendAgainBtn";
import ContextMenu         from "./Footer/Menu";
import SaveDate            from "../SaveDate";

// pages
import CommentEditorPanel    from "@/pages/app/Events/components/CommentEditorPanel";

// models
import Campaign      from "@/models/Campaign";
import CalendarEvent from "@/models/CalendarEvent";

// dependencies
import { CommentMixins, ShareMixins } from "@/mixins";
import S3Service                      from "@/services/s3.service";
import defaultSettings                from "./defaultSettings";
import objectIsNoEmpty                from "@/helpers/object/is/noEmpty";

export default {
  components: {
    ChangeCoverImageModal: () => import("@/pages/app/Campaign/components/ChangeCoverImageModal"),
    SaveDate,
    Rsvp        : () => import("../Rsvp"),
    Countdown   : () => import("../Countdown"),
    Feedback    : () => import("../Feedback"),
    VueHtml2pdf : () => import("vue-html2pdf"),
    Loader,
    HeaderActions,
    CommentEditorPanel,
    DeliverySettings,
    CampaignScheduleModal,
    SavedateAnalytics,
    RsvpAnalytics,
    CollapsePanel,
    ComingsoonAnalytics,
    FeedbackAnalytics,
    ScrollToTopBtn,
    Icon,
    Schedule,
    Scheduled,
    SendAgainBtn,
    ContextMenu,
  },
  mixins: [CommentMixins, ShareMixins],
  data() {
    return {
      isLoading: false,
      campaignInfo: {
        conceptName : "",
        logo        : "",
      },
      deliverySettings       : defaultSettings,
      showCommentEditorPanel : false,
      selectedTab            : 1,
      showChangeCoverModal   : false,
      showScheduleModal      : false,
      campaignTabs: {
        1: {
          completed: false,
          name: "SAVING_DATE",
          defaultCoverImage: `https://static-maryoku.s3.amazonaws.com/storage/Campaign+Headers/save-the-date${(new Date().getDate() % 2) + 1}.png`,
          tooltip:
            "Give guests enough time to clear their schedules, make travel arrangements and generally increase the chances of them atteding",
        },
        2: {
          completed: false,
          name: "RSVP",
          defaultCoverImage: "static/img/b7f79f04-be35-428e-be75-e59ffa4dc187.png",
          tooltip:
            "Try sending your RSVP's a month in advance,  so you'll get the most accurate results",
        },
        3: {
          completed: false,
          name: "COMING_SOON",
          defaultCoverImage: `https://static-maryoku.s3.amazonaws.com/storage/Campaign+Headers/coming-soon${(new Date().getDate() % 4) + 1}.png`,
          tooltip:
            "A friendly reminder helps prepare attendees for your upcoming event. Aside from reminding them of the date and time, we also use this email to answer last-minute questions",
        },
        4: {
          completed: false,
          name: "FEEDBACK",
          defaultCoverImage: "static/img/b7f79f04-be35-428e-be75-e59ffa4dc187.png",
          tooltip:
            "This touchpoint provides a valuable opportunity to promote other upcoming events, collect attendee feedback, and guide attendees towards the next step you want them to take.",
        },
      },
      campaigns: {},
    };
  },
  computed: {
    ...mapGetters("campaign", ["campaignIssued"]),
    event() {
      return this.$store.state.event.eventData || {};
    },
    user() {
      return this.$store.state.auth.user;
    },
    selectedCampaign() {
      if (this.selectedCampaignType) {
        const campaign = this.$store.state.campaign[this.selectedCampaignType];
        if (campaign) return campaign || {};
      }
      return {};
    },
    selectedCampaignType () {
      const tab = this.campaignTabs[this.selectedTab];
      if (tab) return tab.name || "";
      return "";
    },
    canSchedule() {
      const { email = {}, phone = {}} = this.selectedCampaign.settings;
      return (email.selected && email.status !== "sent") || (phone.selected && phone.status !== "sent");
    },
    isScheduled() {
      if (!this.selectedCampaign) return false;

      const { scheduleTime = 0 } = (this.selectedCampaign.scheduleSettings || { scheduleTime: 0});
      return false
          || this.selectedCampaign.campaignStatus === "SCHEDULED"
          || (scheduleTime < Date.now() && scheduleTime > 0);
    },
    tabName () {
      switch (this.selectedTab) {
        case 1  : return "Save The Date";
        case 2  : return "RSVP";
        case 3  : return "Coming Soon";
        case 4  : return "Feedback";
        default : return "";
      }
    },
  },
  watch: {
    selectedCampaign(newValue, oldValue) {
      this.setDefaultSettings();
    },
    event(newValue, oldValue) {
      this.setConceptName();
    },
  },
  async created() {
    this.setConceptName();
    this.campaigns = await this.getCampaigns({ event: this.event });
    this.setDefaultSettings();
  },
  methods: {
    ...mapActions  ("campaign", ["getCampaigns", "saveCampaign"]),
    ...mapMutations("campaign", ["setAttribute"]),
    getCompaingInfo (tabIndex) {
      return { ...this.campaignTabs[tabIndex], ...this.campaignInfo };
    },
    setCampaignAttribute (name, key, value) {
      return this.$store.commit("campaign/setAttribute", { name, key, value });
    },
    setCurrentAttribute (key, value) {
      return this.setCampaignAttribute(this.selectedCampaignType, key, value);
    },
    setConceptName () {
      return this.campaignInfo.conceptName = this.event.concept ? this.event.concept.name : "Event Name";
    },
    showChangeCoverImageModal() {
      return this.showChangeCoverModal = !this.showChangeCoverModal;
    },
    close() {
      return this.showChangeCoverModal = false;
    },
    toggleCommentMode(mode) {
      return this.showCommentEditorPanel = mode;
    },
    selectTab(tabIndex = 1) {
      this.selectedTab = tabIndex;
      this.setDefaultSettings();
    },
    setDefaultSettings() {
      if (this.selectedCampaign && objectIsNoEmpty(this.selectedCampaign.settings)) {
        const { phone = defaultSettings.phone, email = defaultSettings.email} = this.selectedCampaign.settings;
        this.deliverySettings = {
          phone: {
            ...defaultSettings.phone,
            ...phone,
          },
          email: {
            ...defaultSettings.email,
            ...email,
          },
        };
      } else this.deliverySettings = defaultSettings;
    },
    exportToPdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    chooseImage(url) {
      this.setAttribute({
        name  : this.selectedCampaignType,
        key   : "coverImage",
        value : url
      });
      this.close();
      this.saveDraftCampaign();
    },
    async changeCampaignLogo(file) {

      let logoUrl = null;
      if (file) {
        const extension = file.type.split("/")[1];
        const fileName  = uuidv4();
        logoUrl = await S3Service.fileUpload(file, `${fileName}.${extension}`, `campaigns/RSVP/${this.event.id}`);

      } else {
        // await S3Service.deleteFile(this.selectedCampaign.logoUrl);
      }
      Object.keys(this.campaignTabs).forEach(key => {
        this.setAttribute({name: this.campaignTabs[key].name, key: "logoUrl", value: logoUrl});
        this.callSaveCampaign(
          this.campaignTabs[key].name,
          this.campaigns[this.campaignTabs[key].name].campaignStatus);
      });
    },
    cancelSchedule() {
      this.setCurrentAttribute("scheduleSettings", null);
      this.saveDraftCampaign("SAVED");
    },
    scheduleCampaign() {
      this.saveDraftCampaign("SCHEDULED");
    },
    changeInfo(data) {
      this.campaignInfo[data.field] = data.value;
    },
    changeSettings(data) {
      if (data && objectIsNoEmpty(data)) this.deliverySettings = data;
      else this.deliverySettings = defaultSettings;
    },
    async callSaveCampaign(campaignType, campaignStatus, isPreview = false) {
      this.isLoading = true;
      const campaignData = this.$store.state.campaign[campaignType];

      let referenceUrl = "";
      const makeUrl = path => `${document.location.origin}/#/${path}/${this.event.id}`;

      if      (campaignType === "RSVP")     referenceUrl = makeUrl("rsvp");
      else if (campaignType === "FEEDBACK") referenceUrl = makeUrl("feedback");

      if (this.deliverySettings.email.selected) {
        this.deliverySettings = {
          ...this.deliverySettings,
          email: {
            ...(this.deliverySettings.email || {}),
            status: "ready",
          }
        };
      }
      if (this.deliverySettings.phone.selected) {
        this.deliverySettings = {
          ...this.deliverySettings,
          phone: {
            ...(this.deliverySettings.phone || {}),
            status: "ready",
          }
        };
      };

      const newCampaign = new Campaign({
        campaignType,
        ...campaignData,
        campaignStatus,
        referenceUrl,
        isPreview,
        event        : new CalendarEvent({ id: this.event.id }),
        scheduleTime : Date.now(),
        settings     : this.deliverySettings,
      });

      try {
        const result = await this.saveCampaign(newCampaign);
        this.$store.commit("event/setEventData", result.item.event);
        return result;
      } finally {
        this.isLoading = false;
      }
    },
    saveScheduleTime(data) {
      const {
        selectedCampaignIndex,
        scheduleTime,
        scheduleSettings,
        selectedOption,
      } = data;

      const scheduleSettingsData = {
        timeZone            : "EST",
        scheduleTime        : scheduleTime,
        scheduleOption      : selectedOption,
        scheduleOptionValue : scheduleSettings[selectedOption].value,
      };
      this.setCampaignAttribute(this.selectedCampaignType, "scheduleSettings", scheduleSettingsData);
      this.scheduleCampaign();
    },
    startCampaign() {
      const swapTitle = (title = "") => Swal.fire({
        buttonsStyling     : false,
        icon               : "warning",
        confirmButtonClass : "md-button md-success",
        title,
      });

      if (this.deliverySettings) {
        const { email = {}, phone = {} } = this.deliverySettings;
        if (!this.selectedCampaign || (!email.selected && !phone.selected))
          return swapTitle("Please select email or phone or both.");
      }

      // this.saveDraftCampaign("STARTED");
      this.$notify({
        message: {
          title: "3...2...1… Liftoff! Your campaign has officially launched!",
          content: `That’s right, your campaign has been sent successfully to your guests.
           So give yourself a pat on the back and get ready for the next stage!`,
        },
        icon            : `${this.$iconURL}messages/info.svg`,
        horizontalAlign : "right",
        verticalAlign   : "top",
        type            : "info",
        cancelBtn       : false,
        sendBtn         : false,
        closeBtn        : true,
        timeout         : 5000,
      });
    },
    saveDraftCampaign(campaignStatus = "SAVED") {
      return this.callSaveCampaign(this.selectedCampaignType, campaignStatus);
    },
    revertSetting() {
      this.deliverySettings = defaultSettings;
      switch (this.selectedTab) {
        case 1: return this.$refs.savedateCampaign.setDefault();
        case 2: return this.$refs.rsvp.setDefault();
        case 3: return this.$refs.countdown.setDefault();
        case 4: return this.$refs.feedback.setDefault();
      }
    },

    sendPreviewEmail() {
      this.callSaveCampaign(this.selectedCampaignType, this.selectedCampaign.campaignStatus || "TESTING", true).then((res) => {});
      this.$notify({
        message: {
          title: "Your preview email is on the way!",
          content: `The preview email for ${ this.tabName }
            has been sent to ${ this.event.owner ? this.event.owner.name : ""}.You should receive it shortly.`,
        },
        icon            : `${this.$iconURL}messages/info.svg`,
        horizontalAlign : "right",
        verticalAlign   : "top",
        type            : "info",
        cancelBtn       : false,
        sendBtn         : false,
        closeBtn        : true,
        timeout         : 5000,
      });
    },

  },
};
</script>

<style lang="scss" scoped>
.campaign-content {
  padding: 0 3em;
  margin-bottom: 83px;
  &-tab {
    height: 140px;
    line-height: 140px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    &-item {
      cursor: pointer;
      width: 25%;
      &:not(:last-child) {
        border-right: solid 1px #aeaeae;
      }
      &.selected {
        color: #f52355;
        border-bottom: solid 3px #f51355;
      }
    }
    .completedCampaign {
      text-decoration: line-through;
      font-family: "Manrope-Regular";
    }
  }
}

.event-campaign-section {
  .campaign-footer {
    height: 90px;
    background-color: white;
    padding: 0px 50px;
    min-width: calc(100%);
    bottom: 0;
    z-index: 100;
    &-content {
      max-width: 1300px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
    .seperator {
      display: inline-block;
      border-left: solid 1px #050505;
      height: 2rem;
      // margin-top: 1rem;
      &.small{
        height: 25px;
      }
    }
    .schedule-campaign-btn {
      &::after {
        content: "";
        height: 50px;
        width: 54px;
        background: #ff4f7e;
      }
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin: 0;
    }
    .schedule-menu-btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      background-color: #f74374 !important;
      border-left: solid #f97d9f 1px;
      &-icon {
        height: 49px;
        font-size: 2em;
      }
    }

    .virtual-btn {
      border: solid 1px #f51355;
      margin-left: 30px;
    }
  }
  .expanding-icon {
    width: 6px;
    height: 6px;
    border: solid 2px #818080;
    &.expanded {
      transform: rotate(-45deg);
    }
  }
  .schedule-btn {
    height: 50px;
  }
}
.event-campaign-width {
  width: 100%;
}
.inner-container {
  width: 1300px;
  margin: 0 auto;
}
</style>
