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
          Save The Date
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
            <md-tooltip >Save the Date</md-tooltip>
          </span>
          
        </div>
        <div class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center" :class="{selected: selectedTab === 2}" @click="selectTab(2)">
          RSVP
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
            <md-tooltip >
              <span class="font-size-14">Try sending your RSVP's a month in advance,<br/> so you'll get the most accurate results</span>
            </md-tooltip>
          </span>
          </div>
        <div class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center" :class="{selected: selectedTab === 3}" @click="selectTab(3)">
          Countdown
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
            <md-tooltip >CountDown</md-tooltip>
          </span>
        </div>
        <div class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center" :class="{selected: selectedTab === 4}" @click="selectTab(4)">
          Feedback
          <span>
            <img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`">
            <md-tooltip >Save the Date</md-tooltip>
          </span>
          
        </div>
      </div>
      <save-date v-if="selectedTab == 1"></save-date>
      <rsvp v-if="selectedTab == 2"></rsvp>
      <countdown v-if="selectedTab == 3"></countdown>
      <feedback v-if="selectedTab == 4"></feedback>
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
        <div class="d-flex align-center">
          <md-button class="md-simple md-button md-black maryoku-btn">
            <span class="font-size-16 text-transform-capitalize">
              <img class="mr-20" :src="`${$iconURL}Campaign/Group 1855.svg`"/>
              Send Me A Preview</span>
          </md-button>
          <span class="seperator"></span>
          <md-button class="md-simple md-button md-black maryoku-btn">
            <span class="font-size-16 text-transform-capitalize">
              <img class="mr-20" :src="`${$iconURL}Campaign/Group 8871.svg`"/>Revert to original</span></md-button>
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
                  <md-menu-item class="text-center font-size-16 font-bold-extra"><img :src="`${$iconURL}Campaign/Group 1908.svg`">Save Draft</md-menu-item>
                  <md-menu-item class="text-center font-size-16 font-bold-extra"><img :src="`${$iconURL}Campaign/Group 1908.svg`">Send Now</md-menu-item>
                </md-menu-content>
              </md-menu>
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
        showCommentEditorPanel: false,
        selectedTab: 1,
        showScheduleModal: false
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
}
  
</style>