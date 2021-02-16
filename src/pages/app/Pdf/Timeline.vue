<template></template>
<script>
import TimelineTemplateItem from "./components/TimelineTemplateItem";
import TimelineItem from "./components/TimelineItem";
import TimelineEmpty from "./components/TimelineEmpty";
export default {
  created() {
    const eventId = this.$route.params.eventId;
    this.$store.dispatch("event/getTimelineDates", this.event.id);
  },
};
</script>