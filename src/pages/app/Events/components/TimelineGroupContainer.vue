<template>
  <div v-if="isGroup > 0" class="timeline-container">
    <div class="timeline-container">
      <timeline-template-item
        v-for="(item, index) in timelines"
        :key="index"
      ></timeline-template-item>
    </div>
  </div>
  <div v-else>
    <timeline-item
      v-for="(item, index) in timelines"
      :key="index"
    ></timeline-item>
  </div>
</template>
<script>
import TimelineItem from "./TimelineItem";
import TimelineTemplateItem from "./TimelineTemplateItem";
export default {
  components: {
    TimelineItem,
    TimelineTemplateItem,
  },
  props: {
    timelines: {
      type: Array,
      default: () => [],
    },
    groupName: {
      type: String,
      default: "",
    },
  },
  computed: {
    isGroup() {
      return this.groupName.indexOf("timeline") < 0;
    },
  },
};
</script>
<style scoped>
</style>