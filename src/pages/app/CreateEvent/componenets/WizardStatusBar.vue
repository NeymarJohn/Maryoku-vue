<template>
  <div class="wizard-footer">
    <template v-if="windowWidth > 800">
      <div>
        <md-button class="md-black md-maryoku md-simple" @click="back">
          <md-icon>keyboard_backspace</md-icon>
          Back
        </md-button>
      </div>
      <div class="status-bar">
        <div class="status-step">
          {{ currentStep }} Step of 5
        </div>
        <md-progress-bar
          class="md-red progress-bar"
          md-mode="determinate"
          :md-value="(currentStep / 5) * 100"
        />
        <div v-if="currentStep == 1" class="status-description">
          <img :src="`${$iconURL}Onboarding/clover.svg`">
          Only 5 simple steps to your perfect event
        </div>
        <div v-if="currentStep == 2" class="status-description">
          <img :src="`${$iconURL}Onboarding/strength.svg`">
          You are fantastic! !
        </div>
        <div v-if="currentStep == 3" class="status-description">
          <img :src="`${$iconURL}Onboarding/promise.svg`">
          We promise it will pay off in the end!
        </div>
        <div v-if="currentStep == 4" class="status-description">
          <img :src="`${$iconURL}Onboarding/heart.svg`">
          Sharing is caring!
        </div>
        <div v-if="currentStep == 5" class="status-description">
          <img :src="`${$iconURL}Onboarding/quality.svg`">
          Last one!
        </div>
      </div>
      <div class="footer-actions">
        <md-button
          class="md-black md-maryoku md-simple"
          @click="skip"
          @mouseover="skipToolTip = true"
          @mouseleave="skipToolTip = false"
        >
          Skip
          <md-icon>keyboard_arrow_right</md-icon>
        </md-button>
        <md-button class="md-default md-red md-maryoku next-btn" :disabled="!canNext" @click="next">
          Next
        </md-button>
      </div>
      <transition name="fade">
        <div v-if="skipToolTip" class="tool-tip">
          <div class="flex-1">
            <img :src="`${$iconURL}Onboarding/tip-gray.svg`">
          </div>
          <div>
            We encourage you to answer this question!
            <br>
            This will help us create the perfect event for you!
          </div>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="status-bar" style="width: 100%">
        <div class="status-step">
          {{ currentStep }} Step of 5
        </div>
        <md-progress-bar
          class="md-red progress-bar"
          md-mode="determinate"
          :md-value="(currentStep / 5) * 100"
        />
        <div v-if="currentStep == 1" class="status-description">
          <img :src="`${$iconURL}Onboarding/clover.svg`">
          Only 5 simple steps & you're signed!
        </div>
        <div v-if="currentStep == 2" class="status-description">
          <img :src="`${$iconURL}Onboarding/strength.svg`">
          You are fantastic! !
        </div>
        <div v-if="currentStep == 3" class="status-description">
          <img :src="`${$iconURL}Onboarding/promise.svg`">
          We promise it will pay off in the end!
        </div>
        <div v-if="currentStep == 4" class="status-description">
          <img :src="`${$iconURL}Onboarding/heart.svg`">
          Sharing is caring!
        </div>
        <div v-if="currentStep == 5" class="status-description">
          <img :src="`${$iconURL}Onboarding/quality.svg`">
          Last one!
        </div>
      </div>

      <div class="d-flex justify-content-between mt-1">
        <div>
          <md-button class="md-black md-maryoku md-simple" @click="back">
            <md-icon>keyboard_backspace</md-icon>
            Back
          </md-button>
        </div>
        <div class="footer-actions">
          <md-button
            class="md-black md-maryoku md-simple"
            @click="skip"
            @mouseover="skipToolTip = true"
            @mouseleave="skipToolTip = false"
          >
            Skip
            <md-icon>keyboard_arrow_right</md-icon>
            <md-tooltip v-if="skipToolTip" class="tool-tip">
              <div class="flex-1">
                <img :src="`${$iconURL}Onboarding/tip-gray.svg`">
              </div>
              <div>
                We encourage you to answer this question!
                <br>
                This will help us create the perfect event for you!
              </div>
            </md-tooltip>
          </md-button>
          <md-button class="md-default md-red md-maryoku next-btn" @click="next">
            Next
          </md-button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "WizardFooter",
  props: {
    nextLink: {
      type: String,
      default: "",
    },
    currentStep: {
      type: Number,
      default: 0,
    },
    canNext: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      skipToolTip: false,
      windowWidth: 0,
      windowHeight: 0,
    };
  },
  created() {},
  methods: {
    back() {
      this.$emit("back");
    },
    next() {
      this.$emit("next");
    },
    skip() {
      this.$emit("skip");
    },
  },
};
</script>
<style lang="scss" scoped>
.wizard-footer {
  position: relative;
}
</style>
