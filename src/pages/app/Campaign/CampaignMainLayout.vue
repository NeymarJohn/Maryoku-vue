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
          Save The Date<img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`"></div>
        <div class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center" :class="{selected: selectedTab === 2}" @click="selectTab(2)">
          RSVP<img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`"></div>
        <div class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center" :class="{selected: selectedTab === 3}" @click="selectTab(3)">
          Coming Soon<img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`"></div>
        <div class="campaign-content-tab-item flex-1 font-size-22 font-bold-extra text-center" :class="{selected: selectedTab === 4}" @click="selectTab(4)">
          Feedback<img class="ml-20" :src="`${$iconURL}Campaign/Group 9087.svg`"></div>
      </div>
      <save-date v-if="selectedTab == 1"></save-date>
      <rsvp v-if="selectedTab == 2"></rsvp>
      <coming-soon v-if="selectedTab == 3"></coming-soon>
      <feedback v-if="selectedTab == 4"></feedback>
      <delivery-settings></delivery-settings>
    </div>
  </div>
</template>

<script>
  import { Tabs, Modal } from '@/components'
  import HeaderActions from "@/components/HeaderActions";
  import CommentEditorPanel from "@/pages/app/Events/components/CommentEditorPanel";
  import SaveDate from "./SaveDate";
  import Rsvp from "./Rsvp";
  import ComingSoon from "./ComingSoon";
  import Feedback from "./Feedback";
  import DeliverySettings from "./DeliverySettings";
  export default {
    components: {
      Tabs,
      HeaderActions,
      CommentEditorPanel,
      SaveDate,
      Rsvp,
      ComingSoon,
      Feedback,
      DeliverySettings
    },
    data() {
      return {
        showCommentEditorPanel: false,
        selectedTab: 1
      }
    },
    methods: {
      toggleCommentMode(mode) {
        this.showCommentEditorPanel = mode;
      },
      selectTab(tabIndex) {
        this.selectedTab = tabIndex
      }
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
</style>