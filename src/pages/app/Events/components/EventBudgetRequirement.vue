<template>
    <div v-if="loadingBudget" class="md-layout event-budget-section booking-section">
      <div class="text-center  md-layout-item md-size-100" style="margin-top:30vh">
        <div class="loading-budget-image">
          <img :src="`${$iconURL}Budget+Requirements/group-8494.svg`">
        </div>
        <div class="text-transform-uppercase font-size-30 font-bold mt-4rem">
          Loading your budget breakdown
        </div>
        <div class="font-size-16 mt-2">
          Soon our smart algorithm will organize a budget breakdown based on hundreds of previous events we did
        </div>
      </div>
    </div>
    <div v-else class="md-layout event-budget-section booking-section">
      <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
      <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
      <div class="event-book-requirement-header md-layout-item md-size-100" v-if="currentStep<=2">
        <div class="header-title" >
          <img :src="`${$iconURL}Budget+Requirements/Image+186.png`"/>
        </div>
        <header-actions @toggleCommentMode="toggleCommentMode" hideDownload></header-actions>
      </div>
      <div class="event-page-header" v-else>
        <div class="md-layout-item md-size-100 event-header d-flex justify-content-between">
          <div class="header-name" style="width:max-content">
              <h3 class="text-transform-uppercase">
                <img :src="`${this.$iconURL}budget+screen/SVG/Asset%2010.svg`" width="15">
                APPROVE Budget breakdown</h3>
              <div class="text-transform-capitalize">
                We Created a budget division based on smart bla bla...
              </div>
          </div>
          <header-actions @toggleCommentMode="toggleCommentMode" hideDownload></header-actions>
        </div>
       
      </div>
      <div class="booking-header md-layout-item md-size-100" v-if="currentStep===3">
        <event-budget-approve></event-budget-approve>
      </div>
      <div class="booking-header md-layout-item md-size-100" v-else>
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
          <md-button @click="scrollToTop" class="md-button md-simple md-just-icon md-theme-default scroll-top-button">
            <img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17"/>
          </md-button>
        </div>
        <div class="status-bar" v-if="currentStep<3" >
          <div class="status-step">
            {{this.currentStep}} Step of 2
          </div>
          <md-progress-bar  class="md-red progress-bar" md-mode="determinate" :md-value="this.currentStep / 2 * 100"></md-progress-bar>
        </div>
        <div class="footer-actions" v-if="currentStep<3">
          <md-button @click="skip" class="md-black md-maryoku md-simple" @mouseover="skipToolTip=true" @mouseleave="skipToolTip=false">
            Skip
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
          <md-button @click="next" class="md-default md-red md-maryoku next-btn">Next</md-button>
        </div>
        <div class="footer-actions" v-else>
          <span style="line-height: 56px; padding-right: 30px">                
            <img :src="`${$iconURL}Event%20Page/light.svg`" width="27" >
            You can edit this anytime
          </span>
          <md-button @click="next" class="md-default md-red md-maryoku">Approve Budget Breakdown</md-button>
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
import EventBudgetApprove from './EventBudgetApprove.vue'
export default {
  components: {
    CommentEditorPanel,
    VueElementLoading,
    HeaderActions,
    EventBudgetRequirementStep1,
    EventBudgetRequirementStep2,
    EventBudgetApprove
  },
  data() {
    return {
      isLoading: false,
      showCommentEditorPanel: false,
      currentStep: 1,
      loadingBudget: false,
      approveBudget: false
    }
  },
  methods: {
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
    back() {
      if (this.currentStep !==1) {
        this.currentStep -= 1;
      }
    },
    next() {
      if (this.currentStep === 2) {
        this.loadingBudget = true
        setTimeout(() => {
          this.loadingBudget = false
          this.currentStep += 1;  
        }, 2000);
      } else {
        this.currentStep += 1;
      }
    },
    skip() {

    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
}
</script>
<style lang="scss" scoped>
.event-budget-section{
  .event-book-requirement-header{
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .wizard-footer {
    padding: 10px 40px;
    .scroll-top-button {
      border-radius: 50%;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.18);
    }
  }
}
    .loading-budget-image{
      width: 200px;
      height: 200px;
      margin: auto;
      border-radius: 50%;
      border: solid 3px #f51355;
      background-color: #ffffff;
      img {
        margin-top: 50%;
        transform: translate(10px, -50%);
      }
    }
  
</style>