<template>
  <div class="event-plan">
    <progress-sidebar :elements="barItems" page="plan"></progress-sidebar>
    <EventDetailsOverview v-if="pageId == 'overview'"></EventDetailsOverview>
    <event-details-timeline v-else-if="pageId == 'timeline'"></event-details-timeline>
    <event-concept-choose v-else-if="pageId == 'concept'"></event-concept-choose>
    <event-budget-requirement v-else-if="pageId == 'budget'"></event-budget-requirement>
    <event-campaign v-else-if="pageId == 'campaign'"></event-campaign>
    <booking-event v-else></booking-event>
  </div>
</template>
<script>
import EventDetailsTimeline from "./EventDetailsTimeline";
import EventConceptChoose from "./components/EventConceptChoose";
import BookingEvent from "./components/BookingEvent";
import BookingEventRequirement from "./components/BookingEventRequirement.vue";
import EventBudgetRequirement from "./components/EventBudgetRequirement.vue";
import EventDetailsOverview from "./components/EventDetailsOverview";
import EventCampaign from "@/pages/app/Campaign/CampaignMainLayout.vue";
import ProgressSidebar from "./components/progressSidebarForEvent";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";

export default {
  components: {
    EventDetailsTimeline,
    EventConceptChoose,
    BookingEvent,
    BookingEventRequirement,
    ProgressSidebar,
    EventDetailsOverview,
    EventBudgetRequirement,
    EventCampaign,
  },
  computed: {
    ...mapState("event", {
      eventData: (state) => state.eventData,
    }),
    event() {
      return this.$store.state.event.eventData;
    },
    barItems() {
      if (this.event) {
        const overview = {
          title: "Create Event",
          status: "completed",
          route: "overview",
          // icon: `${this.$iconURL}Timeline-New/timeline-title.svg`,
          progress: 100,
          componentId: "overview",
          id: "overview-item",
        };
        const concept = {
          title: "Choose Concept",
          status: this.event.concept && this.event.conceptProgress === 100 ? "completed" : "not-complete",
          route: "booking/concept",
          icon: `${this.$iconURL}Timeline-New/timeline-title.svg`,
          progress: this.event.concept ? this.event.conceptProgress : 0,
          componentId: "concept",
          id: "concept-item",
        };
        const budget = {
          title: this.event.budgetProgress <= 50 ? "Create Budget" : "Approve Budget",
          status: "not-complete",
          route: this.event.budgetProgress == 100 ? "edit/budget" : "booking/budget",
          icon: `${this.$iconURL}budget+screen/SVG/Asset%2010.svg`,
          progress: this.event.budgetProgress,
          componentId: "budget",
          id: "budget-item",
        };
        const timeline = {
          title: "Generate timeline",
          status: this.event.timelineProgress === 100 ? "completed" : "not-complete",
          route: "booking/timeline",
          icon: `${this.$iconURL}Timeline-New/timeline-title.svg`,
          progress: this.event.timelineProgress,
          componentId: "timeline",
          id: "timeline-item",
        };
        const campaign = {
          title: "Create Campaigns",
          status: "current",
          route: "booking/campaign",
          icon: `${this.$iconURL}Campaign/Group 8857.svg`,
          progress: 0,
          componentId: "campaign",
          id: "campaign-item",
        };
        const elements = [];
        elements.push(overview);
        if (this.event.eventType.hasConcept) {
          elements.push(concept);
        }
        elements.push(budget);
        elements.push(timeline);
        elements.push(campaign);

        // show when you approve budget
        if (this.event.budgetProgress == 100) {
          this.event.components.sort((a, b) => a.order - b.order);
          this.event.components.forEach((item) => {
            if (item.componentId !== "unexpected") {
              elements.push({
                title: item.bookTitle,
                status: "not-complete",
                route: "booking/" + item.id,
                icon: `${this.$iconURL}Budget+Elements/${item.componentId}.svg`,
                progress: item.progress ? item.progress : 0,
                id: item.id,
              });
            }
          });
        }
        return elements;
      } else {
        return [];
      }
    },
  },
  data() {
    return {
      eventElements: [],
      pageId: "",
      resevedPages: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    setConstantStates(event) {
      const overviewIndex = this.eventElements.findIndex((item) => item.componentId === "overview");
      const conceptIndex = this.eventElements.findIndex((item) => item.componentId === "concept");
      const budgetIndex = this.eventElements.findIndex((item) => item.componentId === "budget");
      const timelineIndex = this.eventElements.findIndex((item) => item.componentId === "timeline");
      const campaignIndex = this.eventElements.findIndex((item) => item.componentId === "campaign");

      if (overviewIndex >= 0) {
        // this.eventElements[conceptIndex].progress = event.conceptProgress;
        // this.eventElements[conceptIndex].status =
        //         event.conceptProgress == 100 ? "completed" : "not-complete";
      }
      if (conceptIndex >= 0) {
        this.eventElements[conceptIndex].progress = event.conceptProgress;
        this.eventElements[conceptIndex].status = event.conceptProgress == 100 ? "completed" : "not-complete";
      }
      if (budgetIndex >= 0) {
        this.eventElements[budgetIndex].progress = event.budgetProgress;
        this.eventElements[budgetIndex].status = event.budgetProgress == 100 ? "completed" : "not-complete";
      }
      if (timelineIndex >= 0) {
        this.eventElements[timelineIndex].progress = event.timelineProgress;
        this.eventElements[timelineIndex].status = event.timelineProgress == 100 ? "completed" : "not-complete";
      }
      if (campaignIndex >= 0) {
        this.eventElements[campaignIndex].progress = event.timelineProgress;
        this.eventElements[campaignIndex].status = event.timelineProgress == 100 ? "completed" : "not-complete";
      }
    },
    fetchData() {
      this.pageId = this.$route.params.blockId ? this.$route.params.blockId : "timeline";
      console.log("pageid", this.pageId);
    },
  },
  created() {},
  watch: {
    $route: "fetchData",
    event(newValue) {
      console.log("event");
      this.setConstantStates(newValue);
    },
    eventData(newValue) {
      console.log("eventData");
      this.setConstantStates(newValue);
    },
  },
};
</script>
<style lang="scss">
@import "../../styles/EventPlan.scss";
</style>
