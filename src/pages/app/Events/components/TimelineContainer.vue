<template>
  <div class="timeline-container">
    <template v-if="timelines.length > 0">
      <timeline-item
        v-for="(item, index) in timelines"
        :key="index"
      ></timeline-item>
    </template>
    <template v-else> </template>
  </div>
</template>
<script>
import TimelineItem from "./TimelineItem";
export default {
  components: {
    TimelineItem,
  },
  props: {
    timelines: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style scoped>
</style>