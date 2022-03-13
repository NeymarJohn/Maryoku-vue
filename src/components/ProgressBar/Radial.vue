<template>
  <div class="maryoku-radial-progress">
    <radial-progress-bar
      :start-color="color"
      :stop-color="color"
      inner-stroke-color="#C4C1C1"
      :stroke-width="30"
      :diameter="212"
      is-clockwise="true"
      :completed-steps="percentage"
      :total-steps="100"
    >
      <animated-number
        ref="totalRemainingBudgetNumber"
        :value="Number(percentage)"
        class="percentage font-size-22 font-bold-extra"
        suffix="%"
        :custom-style="true"
        :custom-style-contents="`color: ${color}`"
      />
    </radial-progress-bar>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import RadialProgressBar from "vue-radial-progress";

import { AnimatedNumber } from "@/components";
export default {
  components: {
    RadialProgressBar,
    AnimatedNumber,
  },
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "#00B4CE",
    },
  },
};
</script>
