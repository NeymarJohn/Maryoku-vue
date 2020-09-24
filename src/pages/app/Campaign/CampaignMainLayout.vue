<template>
  <div class="md-layout event-campaign-section booking-section">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="event-page-header md-layout-item md-size-100">
      <div class="header-name">
        <div class="font-size-30 font-bold text-transform-capitalize mb-20">
          <img class="mr-10" :src="`${$iconURL}Campaign/Group 8857.svg`" />
          your event's brilliant campaign
        </div>
        <p
          class="font-size-16"
        >Get your guests super exited by giving them a taste of what's waiting for them</p>
      </div>
      <header-actions @toggleCommentMode="toggleCommentMode"></header-actions>
    </div>
    <div class="campaign-content md-layout-item md-size-100 mt-30">
      <div class="campaign-content-tab d-flex mb-40">
        <div
          class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center"
          :class="{selected: selectedTab === 1}"
          @click="selectTab(1)"
        >
          <img :src="`${$iconURL}Campaign/Group 9222.svg`" v-if="campaignIssued['SAVING_DATE']" />
          <span :class="{completedCampaign: campaignIssued['SAVING_DATE']}">Save The Date</span>
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`" />
            <md-tooltip>
              <div class="font-size-14 tab-tooltip">{{campaignTabs[1].tooltip}}</div>
            </md-tooltip>
          </span>
        </div>
        <div
          class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center"
          :class="{selected: selectedTab === 2}"
          @click="selectTab(2)"
        >
          <img :src="`${$iconURL}Campaign/Group 9222.svg`" v-if="campaignIssued['RSVP']" />
          <span :class="{completedCampaign: campaignIssued['RSVP']}">RSVP</span>
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`" />
            <md-tooltip>
              <div class="font-size-14 tab-tooltip">{{campaignTabs[2].tooltip}}</div>
            </md-tooltip>
          </span>
        </div>
        <div
          class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center"
          :class="{selected: selectedTab === 3}"
          @click="selectTab(3)"
        >
          <img :src="`${$iconURL}Campaign/Group 9222.svg`" v-if="campaignIssued['COMING_SOON']" />
          <span :class="{completedCampaign: campaignIssued['COMING_SOON']}">Coming Soon</span>
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`" />
            <md-tooltip>
              <div class="font-size-14 tab-tooltip">{{campaignTabs[3].tooltip}}</div>
            </md-tooltip>
          </span>
        </div>
        <div
          class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center"
          :class="{selected: selectedTab === 4}"
          @click="selectTab(4)"
        >
          <img :src="`${$iconURL}Campaign/Group 9222.svg`" v-if="campaignIssued['FEEDBACK']" />
          <span :class="{completedCampaign: campaignIssued['FEEDBACK']}">Feedback</span>
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`" />
            <md-tooltip>
              <div class="font-size-14 tab-tooltip">{{campaignTabs[4].tooltip}}</div>
            </md-tooltip>
          </span>
        </div>
      </div>
      <save-date
        v-if="selectedTab == 1"
        :info="{...campaignTabs[1], ...campaignInfo}"
        @changeInfo="changeInfo"
        ref="savedateCampaign"
      ></save-date>
      <rsvp v-if="selectedTab == 2" :info="{...campaignTabs[2], ...campaignInfo}" ref="rsvp"></rsvp>
      <countdown
        v-if="selectedTab == 3"
        :info="{...campaignTabs[3], ...campaignInfo}"
        ref="countdown"
      ></countdown>
      <feedback
        v-if="selectedTab == 4"
        :info="{...campaignTabs[4], ...campaignInfo}"
        ref="feedback"
      ></feedback>
      <delivery-settings
        :defaultSettings="deliverySettings"
        @change="changeSettings"
        :campaign="campaignTabs[selectedTab]"
      ></delivery-settings>
    </div>
    <div class="campaign-footer">
      <div class="campaign-footer-content d-flex">
        <div>
          <md-button
            @click="scrollToTop"
            class="md-button md-simple md-just-icon md-theme-default scroll-top-button"
          >
            <img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17" />
          </md-button>
        </div>
        <div class="d-flex align-center" v-if="!campaignIssued[campaignTabs[selectedTab].name]">
          <md-button class="md-simple md-button md-black maryoku-btn" @click="sendPreviewEmail">
            <span class="font-size-16 text-transform-capitalize">
              <img class="mr-20" :src="`${$iconURL}Campaign/Group 1855.svg`" />
              Send Me A Preview
            </span>
          </md-button>
          <span class="seperator"></span>
          <md-button class="md-simple md-button md-black maryoku-btn" @click="reverseSetting">
            <span class="font-size-16 text-transform-capitalize">
              <img class="mr-20" :src="`${$iconURL}Campaign/Group 8871.svg`" />Revert to original
            </span>
          </md-button>
          <div class="schedule-btn d-flex">
            <md-button
              class="md-button md-red maryoku-btn schedule-campaign-btn"
              @click="showScheduleModal=true"
            >
              <span class="font-size-16 text-transform-capitalize">
                <img class="mr-20" :src="`${$iconURL}Campaign/Path 4377.svg`" />
                Schedule Campaign
              </span>
            </md-button>
            <md-menu md-size="medium" md-align-trigger md-direction="top-end" class="schedule-menu">
              <md-button md-menu-trigger class="md-icon-button schedule-menu-btn">
                <md-icon class="schedule-menu-btn-icon">keyboard_arrow_down</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item class="text-center" @click="saveDraftCampaign">
                  <span class="font-size-16 font-bold-extra">
                    <img
                      :src="`${$iconURL}Campaign/Group 1908.svg`"
                      class="mr-10"
                      style="width:20px; height:20px;"
                    />Save Draft
                  </span>
                </md-menu-item>
                <md-menu-item class="text-center" @click="startCampaign">
                  <span class="font-size-16 font-bold-extra">
                    <img
                      :src="`${$iconURL}Campaign/group-2428.svg`"
                      class="mr-10"
                      style="width:20px; height:20px;"
                    />Send Now
                  </span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
        <div class="d-flex align-center" v-else>
          <md-button
            class="md-simple md-button md-black maryoku-btn"
            @click="sendToAddtionalGuests"
          >
            <span class="font-size-16 text-transform-capitalize">
              <img class="mr-20" :src="`${$iconURL}Campaign/Group 8871.svg`" />Send To Additional Guests
            </span>
          </md-button>
          <span class="seperator" style="margin-top: 0"></span>
          <md-button class="md-simple md-button md-black maryoku-btn">
            <span class="font-size-16 text-transform-capitalize">
              <img class="mr-20" :src="`${$iconURL}Campaign/Group 1855.svg`" />
              Send Me A Preview
            </span>
          </md-button>
          <span class="seperator" style="margin-top: 0; margin-right:30px"></span>
          <div class="ml-40">
            <img :src="`${$iconURL}Campaign/Group 9222.svg`" />
            Campaign Sent
          </div>
        </div>
      </div>
    </div>
    <campaign-schedule-modal
      v-if="showScheduleModal"
      :campaigns="campaignTabs"
      :currentCampaign="campaignTabs[selectedTab]"
      :currentCampaignIndex="selectedTab"
      @changeTime="saveScheduleTime"
      @cancel="showScheduleModal=false"
    ></campaign-schedule-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Tabs, Modal } from "@/components";
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "@/pages/app/Events/components/CommentEditorPanel";
import SaveDate from "./SaveDate";
import Rsvp from "./Rsvp";
import Countdown from "./Countdown";
import Feedback from "./Feedback";
import DeliverySettings from "./DeliverySettings";
import CampaignScheduleModal from "@/components/Modals/Campaign/ScheduleModal";
import Campaign from "@/models/Campaign";
import CalendarEvent from "@/models/CalendarEvent";
import swal from "sweetalert2";
import S3Service from "@/services/s3.service";

const defaultSettings = {
  phone: {
    selected: false,
    numberString: "",
    numberArray: [],
    excelFileName: "",
    excelFilePath: "",
    smsOrWhatsapp: "",
  },
  email: {
    selected: false,
    subject: "",
    from: "",
    addressString: "",
    addressArray: [],
    excelFileName: "",
    excelFilePath: "",
  },
};
export default {
  components: {
    Tabs,
    HeaderActions,
    CommentEditorPanel,
    SaveDate,
    Rsvp,
    Countdown,
    Feedback,
    DeliverySettings,
    CampaignScheduleModal,
  },
  data() {
    return {
      campaignInfo: {
        conceptName: "",
        logo: "",
      },
      deliverySettings: { ...defaultSettings },
      showCommentEditorPanel: false,
      selectedTab: 1,
      showScheduleModal: false,
      campaignTabs: {
        1: {
          completed: false,
          name: "SAVING_DATE",
          tooltip:
            "Give guests enough time to clear their schedules, make travel arrangements and generally increase the chances of them atteding",
        },
        2: {
          completed: false,
          name: "RSVP",
          tooltip:
            "Try sending your RSVP's a month in advance,  so you'll get the most accurate results",
        },
        3: {
          completed: false,
          name: "COMING_SOON",
          tooltip:
            "A friendly reminder helps prepare attendees for your upcoming event. Aside from reminding them of the date and time, we also use this email to answer last-minute questions",
        },
        4: {
          completed: false,
          name: "FEEDBACK",
          tooltip:
            "This touchpoint provides a valuable opportunity to promote other upcoming events, collect attendee feedback, and guide attendees towards the next step you want them to take.",
        },
      },
      campaigns: {},
    };
  },
  methods: {
    ...mapActions("campaign", ["getCampaigns", "saveCampaign"]),
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
    selectTab(tabIndex) {
      if (this.selectedTab == 1) {
        this.$refs.savedateCampaign.saveData();
      } else if (this.selectedTab == 2) {
        this.$refs.rsvp.saveData();
      } else if (this.selectedTab == 3) {
        this.$refs.countdown.saveData();
      } else if (this.selectedTab == 4) {
        this.$refs.feedback.saveData();
      }
      this.selectedTab = tabIndex;
      this.setDefaultSettings();
    },
    setDefaultSettings() {
      console.log(
        this.$store.state.campaign[this.campaignTabs[this.selectedTab].name],
      );
      if (
        this.$store.state.campaign[this.campaignTabs[this.selectedTab].name]
      ) {
        this.deliverySettings = {
          ...this.$store.state.campaign[
            this.campaignTabs[this.selectedTab].name
          ].settings,
        };
      } else {
        this.deliverySettings = { ...defaultSettings };
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    startCampaign() {
      this.callSaveCampaign(
        this.campaignTabs[this.selectedTab].name,
        "STARTED",
      );
    },
    saveDraftCampaign() {
      this.callSaveCampaign(this.campaignTabs[this.selectedTab].name, "SAVED");
    },
    scheduleCampaign() {
      this.callSaveCampaign(
        this.campaignTabs[this.selectedTab].name,
        "SCHEDULED",
      );
    },
    changeInfo(data) {
      this.campaignInfo[data.field] = data.value;
    },
    changeSettings(data) {
      this.deliverySettings = data;
    },
    callSaveCampaign(campaignType, campaignStatus) {
      console.log("campaignType", campaignType);

      const campaignData = this.$store.state.campaign[campaignType];
      if (campaignData.coverImage.indexOf("http") < 0) {
        const fileObject = S3Service.dataURLtoFile(
          campaignData.coverImage,
          `${this.event.id}-${campaignType}`,
        );
        console.log(fileObject);
        const extenstion = fileObject.type.split("/")[1];
        S3Service.fileUpload(
          fileObject,
          `${this.event.id}-${campaignType}`,
          "campaigns/cover-images",
        ).then((res) => {});
        campaignData.coverImage = `https://maryoku.s3.amazonaws.com/campaigns/cover-images/${this.event.id}-${campaignType}.${extenstion}`;
      }
      let referenceUrl = "";
      if (campaignType === "RSVP") {
        referenceUrl = `${document.location.origin}/#/rsvp/${this.event.id}`;
      }
      const newCampaign = new Campaign({
        campaignType,
        ...campaignData,
        campaignStatus,
        referenceUrl,
        event: new CalendarEvent({ id: this.event.id }),
        scheduleTime: new Date().getTime(),
        settings: this.deliverySettings,
      });
      this.saveCampaign(newCampaign).then(() => {
        console.log("New Campaign");
      });
    },
    saveScheduleTime(data) {
      const {
        currentCampaignIndex,
        scheduleTime,
        scheduleSettings,
        selectedOption,
      } = data;
      this.campaigns[currentCampaignIndex].scheduleTime = scheduleTime;
      this.campaigns[currentCampaignIndex].scheduleSettings = scheduleSettings;
      this.campaigns[currentCampaignIndex].selectedOption = selectedOption;
      console.log(
        "this.campaigns[currentCampaignIndex]",
        this.campaigns[currentCampaignIndex],
      );
      this.scheduleCampaign();
    },
    reverseSetting() {
      console.log(defaultSettings);
      this.deliverySettings = Object.assign({}, defaultSettings);
      this.campaignInfo = {
        conceptName: this.event.concept.name,
        logo: "",
      };
      if (this.selectedTab == 1) {
        this.$refs.savedateCampaign.setDefault();
      } else if (this.selectedTab == 2) {
        this.$refs.rsvp.setDefault();
      } else if (this.selectedTab == 3) {
        this.$refs.countdown.setDefault();
      } else if (this.selectedTab == 4) {
        this.$refs.feedback.setDefault();
      }
    },
    sendPreviewEmail() {
      this.$http
        .post(`${process.env.SERVER_URL}/1/campaigns/preview`, {
          toEmail: this.user.email,
          toUserName: this.user.name,
          fromUserName: this.user.name,
          eventName: this.event.title,
          plannerName: this.user.name,
          companyName: "maryoku",
          eventUrl: `http://jeff-test2.local.maryoku.com:3000/#/rsvp/${this.event.id}`,
        })
        .then(() => {
          swal({
            title: `You will receive a preview campaign email soon!`,
            buttonsStyling: false,
            type: "success",
            confirmButtonClass: "md-button md-success",
          });
        });
    },
    sendToAddtionalGuests() {},
  },
  computed: {
    ...mapGetters("campaign", ["campaignIssued"]),
    event() {
      return this.$store.state.event.eventData;
    },
    user() {
      return this.$store.state.auth.user;
    },
    // campaignIssued() {
    //   return {
    //     SAVING_DATE:
    //       this.campaigns["SAVING_DATE"] &&
    //       this.campaigns["SAVING_DATE"].campaignStatus === "STARTED",
    //     RSVP:
    //       this.campaigns["RSVP"] &&
    //       this.campaigns["RSVP"].campaignStatus === "STARTED",
    //     COMING_SOON:
    //       this.campaigns["COMING_SOON"] &&
    //       this.campaigns["COMING_SOON"].campaignStatus === "STARTED",
    //     FEEDBACK:
    //       this.campaigns["FEEDBACK"] &&
    //       this.campaigns["FEEDBACK"].campaignStatus === "STARTED",
    //   };
    // },
  },
  created() {
    this.campaignInfo.conceptName = this.event.concept
      ? this.event.concept.name
      : "Event Name";
    this.getCampaigns({ event: this.event }).then((campaigns) => {
      this.campaigns = campaigns;
      this.setDefaultSettings();
      console.log("campaigns");
      console.log(this.campaigns);
    });
  },
};
</script>

<style lang="scss" scoped>
.campaign-content {
  padding: 0 3em;
  &-tab {
    height: 140px;
    line-height: 140px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    &-item {
      cursor: pointer;
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
    height: 128px;
    background-color: white;
    width: 100%;
    margin-top: 100px;
    padding: 10px 50px;
    &-content {
      max-width: 1520px;
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
      margin-top: 1rem;
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
    button,
    .schedule-menu {
      height: 100%;
    }
  }
}
.tab-tooltip {
  max-width: 300px !important;
  white-space: break-spaces;
  text-align: left;
}
</style>