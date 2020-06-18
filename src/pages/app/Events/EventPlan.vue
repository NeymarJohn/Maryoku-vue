<template>
  <div>
    <progress-sidebar></progress-sidebar>
    <event-details-timeline v-if="pageId=='timeline'"></event-details-timeline>
    <event-concept-choose v-if="pageId=='concept'"></event-concept-choose>
    <booking-event-requirement v-if="pageId!='timeline' && pageId!='concept'"></booking-event-requirement>
  </div>
</template>
<script>
import EventDetailsTimeline from './EventDetailsTimeline'
import EventConceptChoose from './components/EventConceptChoose'
import BookingEvent from './components/BookingEvent'
import BookingEventRequirement from './components/BookingEventRequirement.vue'

import ProgressSidebar from "./components/progressSidebar";

export default {
  components: {
    EventDetailsTimeline,
    EventConceptChoose,
    BookingEvent,
    BookingEventRequirement,
    ProgressSidebar
  },
  data() {
    return {
      pageId: ""
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.pageId = this.$route.params.blockId?this.$route.params.blockId:"timeline"
    }
  },
  watch: {
    '$route':'fetchData'
  },
}
</script>
<style lang="scss" scoped>

</style>