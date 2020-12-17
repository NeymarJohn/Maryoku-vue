<template>
  <div class="event-plan">
    <progress-sidebar :elements="eventElements" page="plan"></progress-sidebar>
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
    generatedItems(event) {
      const overview = {
        title: "Create Event",
        status: "completed",
        route: "overview",
        // icon: `${this.$iconURL}Timeline-New/timeline-title.svg`,
        progress: 100,
        componentId: "overview",
      };
      const concept = {
        title: "Choose Concept",
        status: event.concept && event.conceptProgress === 100 ? "completed" : "not-complete",
        route: "booking/concept",
        icon: `${this.$iconURL}Timeline-New/timeline-title.svg`,
        progress: event.concept ? event.conceptProgress : 0,
        componentId: "concept",
      };
      const budget = {
        title: this.event.budgetProgress <= 50 ? "Create Budget" : "Approve Budget",
        status: "not-complete",
        route: this.event.budgetProgress == 100 ? "edit/budget" : "booking/budget",
        icon: `${this.$iconURL}budget+screen/SVG/Asset%2010.svg`,
        progress: this.event.budgetProgress,
        componentId: "budget",
      };
      const timeline = {
        title: "Generate timeline",
        status: event.timelineProgress === 100 ? "completed" : "not-complete",
        route: "booking/timeline",
        icon: `${this.$iconURL}Timeline-New/timeline-title.svg`,
        progress: event.timelineProgress,
        componentId: "timeline",
      };
      const campaign = {
        title: "Create Campaigns",
        status: "current",
        route: "booking/campaign",
        icon: `${this.$iconURL}Campaign/Group 8857.svg`,
        progress: 0,
        componentId: "campaign",
      };
      const elements = [];
      elements.push(overview);
      if (this.event.eventType.hasConcept) {
        elements.push(concept);
      }
      elements.push(budget);
      elements.push(timeline);
      elements.push(campaign);

      const vm = this;
      new EventComponent()
        .for(this.calendar, event)
        .get()
        .then((resp) => {
          // resp.sort((a, b) => a.order - b.order);
          resp.forEach((item) => {
            if (item.componentId !== "unexpected") {
              elements.push({
                title: item.bookTitle,
                status: "not-complete",
                route: "booking/" + item.id,
                icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget+Elements/${item.componentId}.svg`,
              });
            }
          });
          vm.eventElements = elements;
        });
    },
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
  created() {
    const currentUser = this.$store.state.auth.user;
    this.calendar = new Calendar({ id: currentUser.profile.defaultCalendarId });
    this.event = this.$store.state.event.eventData;
    this.generatedItems(this.event);
  },
  watch: {
    $route: "fetchData",
    event(newValue) {
      this.setConstantStates(newValue);
    },
    eventData(newValue) {
      this.setConstantStates(newValue);
    },
  },
};
</script>
<style lang="scss">
@import "../../styles/EventPlan.scss";
</style>
