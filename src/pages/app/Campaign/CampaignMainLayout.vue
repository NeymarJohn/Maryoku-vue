<template>
  <div class="md-layout event-campaign-section booking-section">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="event-page-header md-layout-item md-size-100">
      <div class="header-name">
        <div class="font-size-30 font-bold text-transform-capitalize mb-20 mt-60">
          <img class="mr-10" :src="`${$iconURL}Campaign/Group 8857.svg`"> 
          your event's brilliant campaign
        </div>
        <p class="font-size-16">Get your guests super exited by giving them a taste of what's waiting for them</p>
      </div>
      <header-actions @toggleCommentMode="toggleCommentMode"></header-actions>
    </div>
    <div class="campaign-content md-layout-item md-size-100 mt-30">
      <div class="campaign-content-tab d-flex mb-40">
        <div class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center" :class="{selected: selectedTab === 1}" @click="selectTab(1)">
          <img :src="`${$iconURL}Campaign/Group 9222.svg`" v-if="campaigns[1].completed"/>
          <span :class="{completedCampaign: campaigns[1].completed}">Save The Date</span>
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
            <md-tooltip><div class="font-size-14 tab-tooltip ">{{campaigns[1].tooltip}}</div></md-tooltip>
          </span>
        </div>
        <div class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center" :class="{selected: selectedTab === 2}" @click="selectTab(2)">
          <img :src="`${$iconURL}Campaign/Group 9222.svg`" v-if="campaigns[2].completed"/>
          <span :class="{completedCampaign: campaigns[2].completed}">RSVP</span>
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
            <md-tooltip >
              <div class="font-size-14 tab-tooltip ">{{campaigns[2].tooltip}}</div>
            </md-tooltip>
          </span>
          </div>
        <div class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center" :class="{selected: selectedTab === 3}" @click="selectTab(3)">
          <img :src="`${$iconURL}Campaign/Group 9222.svg`" v-if="campaigns[3].completed"/>
          <span :class="{completedCampaign: campaigns[3].completed}">Coming Soon</span>
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
            <md-tooltip ><div class="font-size-14 tab-tooltip ">{{campaigns[3].tooltip}}</div></md-tooltip>
          </span>
        </div>
        <div class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center" :class="{selected: selectedTab === 4}" @click="selectTab(4)">
          <img :src="`${$iconURL}Campaign/Group 9222.svg`" v-if="campaigns[4].completed"/>
          <span :class="{completedCampaign: campaigns[4].completed}">Feedback</span>
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
            <md-tooltip ><div class="font-size-14 tab-tooltip ">{{campaigns[4].tooltip}}</div></md-tooltip>
          </span>
          
        </div>
      </div>
      <save-date v-if="selectedTab == 1" :info="{...campaigns[1], ...campaignInfo}" @changeInfo="changeInfo"></save-date>
      <rsvp v-if="selectedTab == 2" :info="{...campaigns[2], ...campaignInfo}"></rsvp>
      <countdown v-if="selectedTab == 3" :info="{...campaigns[3], ...campaignInfo}"></countdown>
      <feedback v-if="selectedTab == 4" :info="{...campaigns[4], ...campaignInfo}"></feedback>
      <delivery-settings></delivery-settings>
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
        <div class="d-flex align-center"  v-if="!campaigns[selectedTab].completed">
          <md-button class="md-simple md-button md-black maryoku-btn">
            <span class="font-size-16 text-transform-capitalize">
              <img class="mr-20" :src="`${$iconURL}Campaign/Group 1855.svg`"/>
              Send Me A Preview</span>
          </md-button>
          <span class="seperator"></span>
          <md-button class="md-simple md-button md-black maryoku-btn">
            <span class="font-size-16 text-transform-capitalize">
              <img class="mr-20" :src="`${$iconURL}Campaign/Group 8871.svg`"/>Revert to original</span></md-button>
          <div class="schedule-btn d-flex">
            <md-button class="md-button md-red maryoku-btn schedule-campaign-btn" @click="showScheduleModal=true">
              <span class="font-size-16 text-transform-capitalize">
                <img class="mr-20" :src="`${$iconURL}Campaign/Path 4377.svg`"/>
                Schedule Campaign</span>
                
            </md-button>
            <md-menu md-size="medium" md-align-trigger md-direction="top-end" class="schedule-menu">
              <md-button md-menu-trigger class="md-icon-button schedule-menu-btn">
                <md-icon class="schedule-menu-btn-icon">keyboard_arrow_down</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item class="text-center" @click="startCampaign"><span class="font-size-16 font-bold-extra"><img :src="`${$iconURL}Campaign/Group 1908.svg`" class="mr-10" style="width:20px; height:20px;"/>Save Draft</span></md-menu-item>
                <md-menu-item class="text-center" @click="startCampaign"><span class="font-size-16 font-bold-extra"><img :src="`${$iconURL}Campaign/group-2428.svg`" class="mr-10" style="width:20px; height:20px;"/>Send Now</span></md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
        <div class="d-flex align-center"  v-else>
          <md-button class="md-simple md-button md-black maryoku-btn">
            <span class="font-size-16 text-transform-capitalize">
              <img class="mr-20" :src="`${$iconURL}Campaign/Group 8871.svg`"/>Send  To  Additional Guests</span></md-button>
          <span class="seperator" style="margin-top: 0"></span>
          <md-button class="md-simple md-button md-black maryoku-btn">
            <span class="font-size-16 text-transform-capitalize">
              <img class="mr-20" :src="`${$iconURL}Campaign/Group 1855.svg`"/>
              Send Me A Preview</span>
          </md-button>
          <span class="seperator" style="margin-top: 0; margin-right:30px"></span>
          <div class="ml-40">
            <img :src="`${$iconURL}Campaign/Group 9222.svg`"/>
            Campaign Sent
          </div>
        </div>
      </div>
    </div>
    <campaign-schedule-modal v-if="showScheduleModal" @cancel="showScheduleModal=false"></campaign-schedule-modal>
  </div>
</template>

<script>
  import { Tabs, Modal } from '@/components'
  import HeaderActions from "@/components/HeaderActions";
  import CommentEditorPanel from "@/pages/app/Events/components/CommentEditorPanel";
  import SaveDate from "./SaveDate";
  import Rsvp from "./Rsvp";
  import Countdown from "./Countdown";
  import Feedback from "./Feedback";
  import DeliverySettings from "./DeliverySettings";
  import CampaignScheduleModal from "@/components/Modals/Campaign/ScheduleModal"
  import Campaign from '@/models/Campaign'
  import CalendarEvent from '@/models/CalendarEvent'
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
      CampaignScheduleModal
    },
    data() {
      return {
        campaignInfo: {
          conceptName: '',
          logo: ''
        },
        showCommentEditorPanel: false,
        selectedTab: 1,
        showScheduleModal: false,
        campaigns: {
          1: { 
            completed: false, 
            name: "SAVING_DATE",
            tooltip: "Give guests enough time to clear theire schedules, make travel arrangements and generally increase the changes of them atteding"},
          2: { completed: false, name: "RSVP",
            tooltip: "Try sending your RSVP's a month in advance,  so you'll get the most accurate results" },
          3: { completed: false, name: "COMING_SOON",
            tooltip: "Try sending your RSVP's a month in advance, so you'll get the most accurate results" },
          4: { completed: false, name: "FEEDBACK",
            tooltip: "Try sending your RSVP's a month in advance, so you'll get the most accurate results"}
        }
      }
    },
    methods: {
      toggleCommentMode(mode) {
        this.showCommentEditorPanel = mode;
      },
      selectTab(tabIndex) {
        this.selectedTab = tabIndex
      },
      scrollToTop() {
        window.scrollTo(0, 0);
      },
      startCampaign() {
        this.campaigns[this.selectedTab].completed = true;
        this.saveCampaign(this.campaigns[this.selectedTab].name)
      },
      changeInfo(data) {
        console.log(data)
        this.campaignInfo[data.field] = data.value
      },
      saveCampaign(campaignType){
        new Campaign({
          campaignType,
          campaignStatus: 'ISSUED',
          event: new CalendarEvent({id: this.event.id}),
          emails: ['mikelim12292@gmail.com'],
          byEmail: true,
          bySms: false,
          byWhatsApp: false,
          phoneNumbers: [],
          coverImage: "",
          scheduleTime: new Date().getTime(), 
          settings: {
            hideLogo: true,
            hideWearingGuide: true,
            hideKnowledge: true
          }
        }).save().then(res=>{
          console.log(res)
        })
      }
    },
    computed: {
      event() {
        return this.$store.state.event.eventData 
      },
    },
    created () {
      this.campaignInfo.conceptName = this.event.concept.name;
    },
  }
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
        border-right: solid 1px #AEAEAE;
      }
      &.selected {
        color: #f52355;
        border-bottom: solid 3px #f51355;
      }
    }
    .completedCampaign {
      text-decoration: line-through;
      font-family: 'Manrope-Regular';
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
        content: '';
        height: 50px;
        width: 54px;
        background: #FF4F7E;
      }
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin: 0;
    }
    .schedule-menu-btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      background-color: #F74374 !important;
      border-left:solid #F97D9F 1px;
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
      transform: rotate(-45deg)
    }
  }
  .schedule-btn {
    height: 50px;
    button, .schedule-menu {
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