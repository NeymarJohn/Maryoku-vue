<template>
  <radial-progress-bar
    innerStrokeColor="#A0A0A0"
    startColor="#f51355"
    stopColor="#f51355"
    :strokeWidth="8"
    :completed-steps="30"
    :diameter="80"
    :total-steps="100"
    :animateSpeed="5000"
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