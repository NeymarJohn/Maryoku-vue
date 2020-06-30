<template>
  <div class="wizard-footer">
    <div>
      <md-button @click="back" class="md-black md-maryoku md-simple">
        <md-icon>keyboard_backspace</md-icon>
        Back
      </md-button>
    </div>
    <div>
      <md-button @click="skip" class="md-black md-maryoku md-simple">
        Skip
        <md-icon>keyboard_arrow_right</md-icon>
     </md-button>
      <md-button @click="next" class="md-default md-red md-maryoku">Next</md-button>
    </div>
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

    },
    next() {

    },
    skip() {
      
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
    position: absolute;
    bottom: 0;
    width: 100%;
  }
</style>