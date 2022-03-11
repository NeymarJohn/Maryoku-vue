<template>
  <radial-progress-bar
    inner-stroke-color="#A0A0A0"
    start-color="#f51355"
    stop-color="#f51355"
    :stroke-width="8"
    :completed-steps="value"
    :diameter="80"
    :total-steps="total"
    :animate-speed="100"
    :is-clockwise="false"
  >
    <div class="loading-budget-image" @click="handleClick">
      <img :src="`${$iconURL}${icon}`">
    </div>
  </radial-progress-bar>
</template>
<script>
import RadialProgressBar from "vue-radial-progress";
export default {
  components: {
    RadialProgressBar,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 100,
    },
    icon: {
      type: String,
      default: "common/heart-red.svg",
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>
<style>
.loading-budget-image {
  width: 40px;
  cursor: pointer;
}
</style>
