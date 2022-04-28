<template>
  <div class="event-plan" :class="{ 'x-mouse': xCursor }" @mousemove="handleMouseMove">
    <progress-sidebar v-if="!showCommentPanel" :elements="barItems" page="plan" @change="changeCheckList" />
    <comment-sidebar v-if="showCommentPanel" :elements="barItems" page="plan" @change="changeCheckList" />
    <router-view />
  </div>
</template>
<script>
import ProgressSidebar from "./components/progressSidebarForEvent";
import CommentSidebar from "./components/CommentSidebar.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import state from "./state";

export default {
	components: {
		ProgressSidebar,
		CommentSidebar,
	},
	data() {
		return {
			eventElements: [],
			pageId: "",
			resevedPages: [],
			xCursor: false,
      sections: [
          {title: "Create an event to remember", status: "completed", route: "overview", icon: null, progress: 100, componentId: "overview", id: "overview-item"},
          {title: "Get Inspired", status: "not-complete", route: "booking/concept", icon: `${this.$iconURL}Timeline-New/timeline-title.svg`, progress: 0, componentId: "concept", id: "concept-item"},
          {title: "Craft Event Budget", status: "not-complete", route: "booking/budget", icon: `${this.$iconURL}budget+screen/SVG/Asset%2010.svg`, progress: 0, componentId: "budget", id: "budget-item"},
          {title: "Booking Vendors", status: "not-complete", route: "booking/planningboard", icon: `${this.$iconURL}Campaign/Group 8857.svg`, progress: 0, componentId: "planningboard", id: "planningboard-item"},
          {title: "Set The Schedule", status: "not-complete", route: "booking/timeline", icon: `${this.$iconURL}Timeline-New/timeline-title.svg`, progress: 0, componentId: "timeline", id: "timeline-item"},
          {title: "Communicate With Guests", status: "not-complete", route: "booking/campaign", icon: `${this.$iconURL}Campaign/Group 8857.svg`, progress: 0, componentId: "campaign", id: "campaign-item"},
      ]
		};
	},
	computed: {
		...mapState("event", {
			eventData: (state) => state.eventData,
		}),
		event() {
			return this.$store.state.event.eventData;
		},
		user() {
			return this.$store.state.auth.user;
		},
		showCommentPanel() {
			return this.$store.state.eventPlan.showCommentPanel;
		},
		barItems() {
      const sections = this.updateSection();

      console.log('bar.items', sections);
      let elements = [];

      if (this.user.currentUserType === "planner" || this.user.currentUserType === "vendor") {

        const bookingIndex = sections.findIndex(it => it.componentId === "planningboard");
        if(this.event.budgetProgress !== 100) sections.splice(bookingIndex, 1);

        if (this.event.checkList && this.event.checkList.length) {
          this.event.checkList.forEach(it => {

            const section = sections.find(s => s.componentId === it.componentId);
            if (section) elements.push(section);
          });

        } else {
          elements = sections;
        }
      } else if (this.user.currentUserType === "guest") {
          this.sections.forEach(it => {
              if (it.componentId === "overview" || it.componentId === "planningboard") {
                  elements.push(it);
              }
          });
      }

      return elements;
		},
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
	beforeCreate() {
		this.$store.registerModule("eventPlan", state);
	},

	mounted() {
		this.fetchData();
	},
	created() {
  },
	methods: {
		...mapActions("eventPlan", ["toggleCommentMode"]),
        updateSection() {
            let elements = [];
            this.sections.forEach(it => {
                if(it.componentId === "concept") {
                    it.status = this.event.concept && this.event.conceptProgress === 100 ? "completed" : "not-complete";
                    it.progress = this.event.concept ? this.event.conceptProgress : 0;

                } else if (it.componentId === "budget") {
                    it.route = this.event.budgetProgress === 100 ? "edit/budget" : "booking/budget";
                    it.progress = this.event.budgetProgress;


                } else if (it.componentId === "planningboard") {
                    it.status = this.event.requirementProgresss === 100 ? "completed" : "not-complete";
                    it.progress = this.event.requirementProgress;

                } else if (it.componentId === "timeline") {
                    it.status = this.event.timelineProgress === 100 ? "completed" : "not-complete";
                    it.progress = this.event.timelineProgress;

                } else if (it.componentId === "campaign") {
                    it.status = this.event.campaignProgress === 100 ? "completed" : "not-complete";
                    it.progress = this.event.campaignProgress;
                }

                if (it.componentId === "planningboard" ) {
                    if (this.event.budgetProgress > 0) elements.push(it);
                } else {
                    elements.push(it);
                }

            });
            return elements;
        },
		handleMouseMove(event) {
			if (!this.showCommentPanel) return;
			this.xCursor = event.target.className === "click-capture";
		},
		setConstantStates(event) {
			const overviewIndex = this.eventElements.findIndex((item) => item.componentId === "overview");
			const conceptIndex = this.eventElements.findIndex((item) => item.componentId === "concept");
			const budgetIndex = this.eventElements.findIndex((item) => item.componentId === "budget");
			const timelineIndex = this.eventElements.findIndex((item) => item.componentId === "timeline");
			const campaignIndex = this.eventElements.findIndex((item) => item.componentId === "campaign");

			// show when you approve budget
			// if (this.event.budgetProgress == 100) {
			//   this.event.components.sort((a, b) => a.order - b.order);
			//   this.event.components.forEach((item) => {
			//     if (item.componentId !== "unexpected") {
			//       elements.push({
			//         title: item.bookTitle,
			//         status: "not-complete",
			//         route: "booking/" + item.id,
			//         icon: `${this.$iconURL}Budget+Elements/${item.icon}`,
			//         progress: item.progress ? item.progress : 0,
			//         id: item.id,
			//       });
			//     }
			//   });
			// }

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
		},
		changeCheckList(e) {
			const updatedEvent = new CalendarEvent({
				id: this.event.id,
				calendar: new Calendar({
					id: this.event.calendar.id,
				}),
				checkList: e,
				reSchedule: false,
				reCalculate: false,
			});
			this.$store.dispatch("event/saveEventAction", updatedEvent).then((res) => {
				this.toggleCommentMode(false);
			});
		},
	},
};
</script>
<style lang="scss">
@import "../../styles/EventPlan.scss";
</style>
