<template>
  <div class="proposal-time-counter">
    <div class="font-bold">This offer will expire in</div>
    <hr />
    <timer size="big" :target="target"></timer>
    <div class="button-wrapper">
      <md-button class="maryoku-btn md-simple md-red">Ask for more time</md-button>
    </div>
  </div>
</template>
<script>
import Timer from "../../../../components/Timer.vue";
import TimeCounter from "../components/TimeCounter.vue";

export default {
  components: { TimeCounter, Timer },
  props: {
    target: {
      type: [Date, Number],
      default: new Date(),
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-time-counter {
  width: 300px;
  background-color: #f51355;
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 3px;
  .button-wrapper {
    background-color: white !important;
    margin: auto;
    width: max-content;
    .md-button {
      background-color: white !important;
      &:hover {
        background-color: white !important;
      }
    }
  }
  hr {
    background-color: white;
    opacity: 0.5;
  }
}
</style>