<template>
  <div class="event-plan">
    <progress-sidebar></progress-sidebar>
    <event-details-timeline v-if="pageId=='timeline'"></event-details-timeline>
    <event-concept-choose v-else-if="pageId=='concept'"></event-concept-choose>
    <event-budget-requirement v-else-if="pageId=='budget'"></event-budget-requirement>
    <booking-event v-else></booking-event>
  </div>
</template>
<script>
import EventDetailsTimeline from './EventDetailsTimeline'
import EventConceptChoose from './components/EventConceptChoose'
import BookingEvent from './components/BookingEvent'
import BookingEventRequirement from './components/BookingEventRequirement.vue'
import EventBudgetRequirement from './components/EventBudgetRequirement.vue'
import ProgressSidebar from "./components/progressSidebar";

export default {
  components: {
    EventDetailsTimeline,
    EventConceptChoose, 
    BookingEvent,
    BookingEventRequirement,
    ProgressSidebar,
    EventBudgetRequirement
  },
  data() {
    return {
      pageId: "",
      resevedPages: []
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
<style lang="scss">
   @import "../../styles/EventPlan.scss";
</style>