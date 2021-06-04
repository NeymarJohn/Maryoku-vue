<template>
  <radial-progress-bar
    innerStrokeColor="#A0A0A0"
    startColor="#f51355"
    stopColor="#f51355"
    :strokeWidth="8"
    :completed-steps="value"
    :diameter="80"
    :total-steps="total"
    :animateSpeed="100"
    :isClockwise="false"
  >
    <div class="loading-budget-image">
      <img :src="`${$iconURL}common/heart-red.svg`" />
    </div>
  </radial-progress-bar>
</template>
<script>
import RadialProgressBar from "vue-radial-progress";
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 100,
    },
  },
  components: {
    RadialProgressBar,
  },
};
</script>
<style>
.loading-budget-image {
  width: 40px;
}
</style>