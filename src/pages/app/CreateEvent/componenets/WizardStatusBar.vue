<template>
  <div class="wizard-footer">
    <div>
      <md-button @click="back" class="md-black md-maryoku md-simple">
        <md-icon>keyboard_backspace</md-icon>
        Back
      </md-button>
    </div>
    <div class="status-bar">
      <div>
        {{this.currentStep}} Step of 5
      </div>
      <md-progress-bar  class="md-red progress-bar" md-mode="determinate" :md-value="this.currentStep / 5 * 100"></md-progress-bar>
      <div v-if="this.currentStep == 1" class="status-description">
        <img :src="`${$iconURL}Onboarding/clover.svg`">
        Only 5 simple steps & you're signed!
      </div>
      <div v-if="this.currentStep == 2" class="status-description">
        <img :src="`${$iconURL}Onboarding/strength.svg`">
        You are fantastic! !
      </div>
      <div v-if="this.currentStep == 3" class="status-description">
        <img :src="`${$iconURL}Onboarding/promise.svg`">
        We promise it will pay off in the end!
      </div>
      <div v-if="this.currentStep == 4" class="status-description">
        <img :src="`${$iconURL}Onboarding/heart.svg`">
        Sharing is caring!      
      </div>
      <div v-if="this.currentStep == 5" class="status-description">
        <img :src="`${$iconURL}Onboarding/quality.svg`">
        Last one!     
      </div>
    </div>
    <div>
      <md-button @click="skip" class="md-black md-maryoku md-simple" @mouseover="skipToolTip=true" @mouseleave="skipToolTip=false">
        Skip
        <md-icon>keyboard_arrow_right</md-icon>
      </md-button>
      <md-button @click="next" class="md-default md-red md-maryoku">Next</md-button>
    </div>
    <transition name="fade">
      <div class="tool-tip" v-if="skipToolTip">
        <div class="flex-1">
          <img :src="`${$iconURL}Onboarding/tip-gray.svg`">
        </div>
        <div>
          We encourage you to answer this question!
          <br/>
          This will help us create the perfect event for you!
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name:"WizardFooter",
  props: {
    nextLink: {
      type: String,
      default: ""
    },
    currentStep: {
      type: Number,
      default: ""
    }
  },
  created () {
  },
  methods: {
    back() {
      this.$emit("back")
    },
    next() {
      this.$emit("next")
    },
    skip() {
      this.$emit("skip")
    }
  },
  data() {
   return {
     skipToolTip: false
   }
 },
}
</script>
<style lang="scss" scoped>
  .wizard-footer {
    display: flex;
    height: 128px;
    background: white;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    // position: absolute;
    bottom: 0;
    width: 100%;
  }
  .progress-bar {
    min-width: 400px;
    margin: 0px 20px;
  }
  .status-bar {
    display: flex;
    align-items: center;
  }
  .status-description {
    font-family: "Manrope-Bold";
  }
  .tool-tip {
    position: absolute;
    right: 150px;
    width: 410px;
    background: #ffedb7;
    top: -50px;
    padding: 15px 20px;
    display: flex;
    box-shadow: 0 2px 21px 0 rgba(0, 0, 0, 0.21);
    border-radius: 5px;
  }
</style>