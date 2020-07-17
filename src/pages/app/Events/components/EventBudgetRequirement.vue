<template>
    <div class="md-layout event-budget-section booking-section">
      <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
      <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
      <div class="event-book-requirement-header md-layout-item md-size-100">
        <div class="header-title">
          <img src="http://static.maryoku.com/storage/icons/Requirements/image-130.png"/>
          <img src="http://static.maryoku.com/storage/icons/Requirements/image-132.png"/>
          <img src="http://static.maryoku.com/storage/icons/Requirements/image-133.png"/>
          <img src="http://static.maryoku.com/storage/icons/Requirements/image-134.png"/>
        </div>
        <header-actions @toggleCommentMode="toggleCommentMode" hideDownload></header-actions>
      </div>
      <div class="booking-header md-layout-item md-size-100">
        <h3 class="font-size-30 font-bold">
          <img :src="`${$iconURL}Concept/Asset 491.svg`" style="width:30px; margin-right:0.5em"/>
          PLAN YOUR BUDGET
        </h3>
        <event-budget-requirement-step1 v-if="currentStep===1"></event-budget-requirement-step1>
        <event-budget-requirement-step2 v-if="currentStep===2"></event-budget-requirement-step2>
      </div>
      <div class="wizard-footer d-flex">
        <div>
          <md-button @click="back" class="md-black md-maryoku md-simple">
            <md-icon>keyboard_backspace</md-icon>
            Back
          </md-button>
        </div>
        <div class="status-bar" >
          <div class="status-step">
            {{this.currentStep}} Step of 5
          </div>
          <md-progress-bar  class="md-red progress-bar" md-mode="determinate" :md-value="this.currentStep / 2 * 100"></md-progress-bar>
        </div>
        <div class="footer-actions">
          <md-button @click="skip" class="md-black md-maryoku md-simple" @mouseover="skipToolTip=true" @mouseleave="skipToolTip=false">
            Skip
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
          <md-button @click="next" class="md-default md-red md-maryoku next-btn">Next</md-button>
        </div>
      </div>
    </div>
</template>
<script>
import CommentEditorPanel from "./CommentEditorPanel";
import VueElementLoading from 'vue-element-loading'
import HeaderActions from "@/components/HeaderActions";
import EventBudgetRequirementStep1 from './EventBudgetRequirementStep1'
import EventBudgetRequirementStep2 from './EventBudgetRequirementStep2'

export default {
  components: {
    CommentEditorPanel,
    VueElementLoading,
    HeaderActions,
    EventBudgetRequirementStep1,
    EventBudgetRequirementStep2
  },
  data() {
    return {
      isLoading: false,
      showCommentEditorPanel: false,
      currentStep:1
    }
  },
  methods: {
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
    back() {
      this.currentStep -= 1;
    },
    next() {
      this.currentStep += 1;
    },
    skip() {

    }
  },
}
</script>
<style lang="sass" scoped>

</style>