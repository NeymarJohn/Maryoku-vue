<template>
  <div class="event-plan" :class="{ 'x-mouse': xCursor }" @mousemove="handleMouseMove">
    <budget-notifications />
    <!-- todo show event checklist temp-->
    <progress-sidebar :elements="barItems" page="plan" @change="changeCheckList" />
    <div class="edit-event-details event-details-budget position-relative">
      <comment-editor-panel
        v-if="showCommentEditorPanel"
        :comment-components="commentComponents"
        @saveComment="saveComment"
        @updateComment="updateComment"
        @deleteComment="deleteComment"
        @updateCommentComponent="updateCommentComponent"
      />
      <comment-sidebar v-if="showCommentEditorPanel" />

      <div class="mx-30 mt-40">
        <!-- Event Header -->
        <div class="event-header d-flex justify-content-between">
          <div class="header-title">
            <h3>
              <img :src="`${this.$iconURL}budget+screen/SVG/Asset%2010.svg`" width="15">
              Budget
            </h3>
          </div>
          <header-actions
            :custom-styles="{ marginForCircle: { marginLeft: '20px' } }"
            :positioning="'stretch'"
            @toggleCommentMode="toggleCommentMode"
            @share="share"
            @export="exportToPdf"
          />
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-size-40">
            <div class="card-section card-overview">
              <div class="section-header">
                Overview
              </div>
              <div class="budget-list d-flex justify-content-center">
                <div class="budget-list__item width-66 d-flex align-center" style="border-bottom: 1px solid #b7b7b7">
                  <div class="label-title mb-0">
                    Budget
                  </div>
                  <div class="budget-value">
                    ${{ budgetStatistics.total | withComma }}
                  </div>
                  <md-button v-if="canEdit" class="md-rose md-simple md-sm edit-budget" @click="setModalStep('next')">
                    Edit
                  </md-button>
                </div>
              </div>
              <div class="budget-list d-flex justify-content-between">
                <div class="budget-list__item width-50">
                  <div class="label-title">
                    Allocated
                  </div>
                  <div class="budget-value">
                    ${{ budgetStatistics.allocated | withComma }}
                  </div>
                  <div class="percent">
                    {{ budgetStatistics.allocatedPercentage }} %
                  </div>
                </div>
                <div class="budget-list__item width-50">
                  <div class="label-title">
                    Booked
                  </div>
                  <div class="budget-value">
                    ${{ budgetStatistics.booked | withComma }}
                  </div>
                  <div class="percent">
                    {{ budgetStatistics.bookedPercentage }}%
                  </div>
                </div>
              </div>
            </div>
            <div class="card-section card-overview-saved text-center d-flex justify-center align-center">
              <span>So far you saved :</span>
              <md-icon v-if="budgetStatistics.saved >= 0" class="card-overview-saved-icon" style="color: #167c3a">
                add_circle_outline
              </md-icon>
              <md-icon v-else class="card-overview-saved-icon color-red">
                remove_circle_outline
              </md-icon>
              <span class="card-overview-saved-amount">$ {{ budgetStatistics.saved | withComma }}</span>
            </div>
            <div class="card-section card-expense">
              <div class="section-header">
                Expenses
              </div>
              <div>
                <pie-chart-round :event.sync="$store.state.event.eventData" :items="pieChartData" />
              </div>
            </div>
          </div>

          <div class="md-layout-item md-size-60">
            <div class="event-blocks-table">
              <tabs
                :tab-name="[
                `<img src='${$iconURL}budget+screen/png/Asset+26.png'> Total`,
                `<img src='${$iconURL}budget+screen/png/Asset+28.png'> Per Guest(${event.numberOfParticipants})`,
              ]"
              >
                <!-- here you can add your content for tab-content -->
                <template slot="tab-pane-1">
                  <event-budget-vendors
                    :event.sync="event"
                    :event-components="selectedComponents"
                    type="total"
                    @change="onChangeComponent"
                    @add="onAddMoreBudget"
                  />
                </template>
                <template slot="tab-pane-2">
                  <event-budget-vendors
                    :event.sync="event"
                    :event-components="selectedComponents"
                    type="perGuest"
                    @change="onChangeComponent"
                    @add="onAddMoreBudget"
                  />
                </template>
              </tabs>
            </div>
          </div>
        </div>
        <vue-html2pdf
          ref="html2Pdf"
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          :filename="`budget-${event.id}`"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="800px"
        >
          <section slot="pdf-content">
            <div class="p-20 pdf-content">
              <h3 class="font-bold-extra font-size-30">
                <img :src="`/static/icons/budget/budget.png`" width="15">
                Budget
              </h3>
              <div class="card-section card-overview" style="border: solid 2px #dbdbdb !important">
                <div class="section-header" style="border-bottom: solid 2px #dbdbdb !important">
                  Overview
                </div>
                <div class="budget-list d-flex justify-content-between">
                  <div class="budget-list__item">
                    <div class="label-title">
                      Budget
                    </div>
                    <div class="budget-value">
                      ${{ budgetStatistics.total | withComma(Number) }}
                    </div>
                    <md-button v-if="canEdit" class="md-rose md-simple md-sm edit-budget" @click="setModalStep('next')">
                      Edit
                    </md-button>
                  </div>
                  <div class="budget-list__item">
                    <div class="label-title">
                      Allocated
                    </div>
                    <div class="budget-value">
                      ${{ budgetStatistics.allocated | withComma(Number) }}
                    </div>
                    <div class="percent">
                      {{ budgetStatistics.allocatedPercentage }} %
                    </div>
                  </div>
                  <div class="budget-list__item">
                    <div class="label-title">
                      Booked
                    </div>
                    <div class="budget-value">
                      ${{ budgetStatistics.booked | withComma(Number) }}
                    </div>
                    <div class="percent">
                      {{ budgetStatistics.bookedPercentage }}%
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-section card-overview-saved text-center">
                <span>So far you saved :</span>
                <md-icon v-if="budgetStatistics.saved >= 0" class="card-overview-saved-icon" style="color: #167c3a">
                  add_circle_outline
                </md-icon>
                <md-icon v-else class="card-overview-saved-icon color-red">
                  remove_circle_outline
                </md-icon>
                <span class="card-overview-saved-amount">$ {{ budgetStatistics.saved | withComma(Number) }}</span>
              </div>
              <div class="card-section card-expense" style="border: solid 2px #dbdbdb !important">
                <div class="section-header" style="border-bottom: solid 2px #dbdbdb !important">
                  Expenses
                </div>
                <div>
                  <pie-chart-round :event.sync="event" :items="pieChartData" :show-image="true" />
                </div>
              </div>
            </div>
            <div class="html2pdf__page-break" />
            <div class="p-20 event-blocks-table">
              <label class="font-size-26 font-bold">Total</label>
              <event-budget-vendors
                :event.sync="event"
                :event-components="selectedComponents"
                :editing-mode="false"
                type="total"
                @change="onChangeComponent"
                @add="onAddMoreBudget"
              />
            </div>
            <div class="html2pdf__page-break" />
            <div class="p-20 event-blocks-table">
              <label class="font-size-26 font-bold">Per Guest</label>
              <event-budget-vendors
                :event.sync="event"
                :event-components="selectedComponents"
                :editing-mode="false"
                type="perGuest"
                @change="onChangeComponent"
                @add="onAddMoreBudget"
              />
            </div>
          </section>
        </vue-html2pdf>
      </div>
      <upload-vendors-modal ref="uploadModal" />
      <budget-edit-modal
        v-if="editBudgetModalStep === 1"
        :event="event"
        @cancel="closeEditBudgetModal"
        @save="onBudgetChangeModal"
      />
      <modal v-if="editBudgetModalStep === 2" class="add-category-model">
        <template slot="header">
          <div class="add-budget-modal-header">
            <button @click="setModalStep('previous')">
              <md-icon :class="'material-icons-two-tone'">
                west
              </md-icon>
            </button>
            <button @click="closeEditBudgetModal">
              <md-icon>clear</md-icon>
            </button>
          </div>
        </template>
        <template slot="body">
          <div class="add-category-model__header">
            <h2>
              <span :style="{ color: extra < 0 ? 'red' : 'green', display: 'inline-block' }">${{ extra | withComma(Number) }}</span>
            </h2>
            <h2 v-if="extra < 0" class="text-lowercase">
              Oops, these changes have put you in the red!
            </h2>
            <span class="black">What would you like to do? </span>
            <br>
            <md-checkbox
              v-show="extra > 0"
              v-model="extraBudgetMethod"
              class="md-checkbox-circle md-red"
              value="betweenCategories"
            >
              Add new category
            </md-checkbox>
            <br>
            <md-checkbox v-model="extraBudgetMethod" class="md-checkbox-circle md-red" value="onUnexpected">
              {{ extra > 0 ? "Store that money to ‘Unexpected’ category" : "Recalculate according to the new budget " }}
            </md-checkbox>
            <br>
            <md-checkbox
              v-show="extra < 0"
              v-model="extraBudgetMethod"
              class="md-checkbox-circle md-red"
              value="goBack"
            >
              Add more money to my budget
            </md-checkbox>
          </div>
        </template>
        <template slot="footer">
          <md-button class="add-category-btn" @click="handleBudgetMethod()">
            Select
          </md-button>
        </template>
      </modal>
      <add-new-category-modal
        v-if="editBudgetModalStep === 3"
        :event="event"
        :components="categoryList"
        @cancel="closeEditBudgetModal"
        @save="addNewCategory"
      />
      <BudgetHandleMinusModal v-if="showHandleMinus" value="50" />
      <div class="wizard-footer d-flex">
        <div>
          <md-button class="md-black md-maryoku md-simple" @click="back">
            <md-icon>keyboard_backspace</md-icon>
            Back
          </md-button>
          <md-button class="md-button md-simple md-just-icon md-theme-default scroll-top-button" @click="scrollToTop">
            <img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17">
          </md-button>
        </div>
        <div class="footer-actions">
          <span style="line-height: 56px; padding-right: 30px">
            <img
              v-if="event.budgetProgress === 100"
              :src="`${$iconURL}budget+screen/SVG/Asset%2032.svg`"
              width="25"
              style="margin-right: 10px"
            >
            {{ event.budgetProgress === 100 ? "Budget Allocated and Approved" : "You can edit this anytime" }}
          </span>
          <md-button v-if="event.budgetProgress !== 100" class="md-default md-red md-maryoku" @click="next">
            Approve Budget Breakdown
          </md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// MAIN MODULES
import { Tabs, Modal } from "@/components";
import state from "./state";

// import auth from '@/auth';
import moment from "moment";
import Swal from "sweetalert2";

import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";
import { BUDGET_MESSAGES } from "@/constants/messages";
import { mapState, mapMutations, mapGetters } from "vuex";

import EventBudgetVendors from "./components/EventBudgetVendors";
import ProgressSidebar from "./components/progressSidebarForEvent";

// COMPONENTS
import UploadVendorsModal from "../Vendors/ImportVendors";
import PieChartRound from "./components/PieChartRound.vue";
import BudgetHandleMinusModal from "../../../components/Modals/BudgetHandleMinusModal";
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "./components/CommentEditorPanel";
import { CommentMixins, ShareMixins } from "@/mixins";

import BudgetEditModal from "@/components/Modals/BudgetEditModal";
import AddNewCategoryModal from "@/components/Modals/AddNewCategoryModal";
import CommentSidebar from "./components/CommentSidebar.vue";
import axios from "axios";
const VueHtml2pdf = () => import("vue-html2pdf");

export default {
	components: {
		ProgressSidebar,
		Tabs,
		EventBudgetVendors,
		UploadVendorsModal,
		PieChartRound,
		Modal,
		BudgetHandleMinusModal,
		HeaderActions,
		CommentEditorPanel,
		BudgetEditModal,
		AddNewCategoryModal,
		VueHtml2pdf,
		CommentSidebar,
	},
	mixins: [CommentMixins, ShareMixins],
	data() {
		return {
			// auth: auth,
			event: {},
			calendarEvent: {},
			selectedComponents: [],
			statistics: {
				total: 0,
				allocated: 0,
				booked: 0,
			},
			currentTab: "blocks",
			percentage: 0,
			totalRemainingBudget: 0,
			usedBudget: 0,
			remainingBudgetPerEmployee: 0,
			isLoading: false,
			routeName: null,
			budgetPerEmployee: 0,
			activeTab: 0,
			totalBudget: 0,
			menuIconsURL: `${this.$iconURL}menu%20_%20checklist/SVG/`,
			iconsURL: `${this.$iconURL}Event%20Page/`,
			editBudgetModalStep: 0,
			budgetConfirmationModal: false,
			newBudget: null,
			budgetState: null,
			editBudgetElementsModal: false,
			showHandleMinus: false,
			showCommentEditorPanel: false,
			showMessage: false,
			extra: "0",
			extraBudgetMethod: "betweenCategories",
			addNewCategoryLoading: false,
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
	beforeCreate() {
		this.$store.registerModule("eventPlan", state);
	},
	created() {
		this.routeName = this.$route.name;
	},
	mounted() {
		this.loadEventData("init", this.event);
		const tab = this.$route.query.t || 0;
		if (this.$refs.eventPlannerTabs) {
			this.$refs.eventPlannerTabs.$emit("event-planner-nav-switch-panel", tab);
		}

		if (this.components.length === 0) {
			this.$store.dispatch("event/getComponents", this);
			this.$store.dispatch("event/getCategories", {
				data: this.currentUser.profile.defaultCalendarId,
				ctx: this,
			});
			this.$store.dispatch("event/getEventTypes", {
				data: this.currentUser.profile.defaultCalendarId,
				ctx: this,
			});
			this.$store.dispatch("event/getCurrencies", this);
			this.$store.dispatch("event/getEventThemes", this);
		}

		this.$root.$on("calendar-refresh-events", () => {
			this.loadEventData("update");
		});
	},
	methods: {
		...mapMutations("EventPlannerVuex", [
			"setEventModal",
			"setEditMode",
			"setModalSubmitTitle",
			"setEventModalAndEventData",
			"setNumberOfParticipants",
      "setEventData",
    ]),
    ...mapMutations("event", ["setBudgetNotification"]),
    updateSection() {
      let elements = [];
      this.sections.forEach(it => {
        if (it.componentId === "concept") {
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
        if (it.componentId === "planningboard") {
          if (this.event.budgetProgress > 0) elements.push(it);
        } else {
          elements.push(it);
        }
      });
      return elements;
    },
    next() {
        const event = new CalendarEvent({
          id: this.event.id,
          budgetProgress: 100,
          approvedBudget: this.event.totalBudget,
        });
        this.$store.dispatch("event/saveEventAction", event).then((res) => {
          this.$router.push({path: `/events/${this.event.id}/edit/budget`});
        });
    },
    handleMouseMove(event) {
      if (!this.showCommentEditorPanel) return;
      this.xCursor = event.target.className === "click-capture";
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
				this.event = res;
			});
		},
		getCalendar() {
			return new Calendar();
		},
		getEvent: async function (_calendar) {
			console.log("getEvent", this.$route.params.id);
			let event = await _calendar.calendarEvents().find(this.$route.params.id);
			this.event = event;
		},
		getEventComponents: async function (_calendar) {
			let event = new CalendarEvent({ id: this.event.id });
			let eventComponent = new EventComponent().for(event);
			let components = await eventComponent.get();
			components.sort((a, b) => a.order - b.order);
			this.event.components = components;
			this.selectedComponents = components;
		},
		loadEventData: async function (type = "init") {
			this.isLoading = true;

			axios.defaults.headers.common.Authorization = `Bearer ${this.currentUser.access_token}`;
			let calendar = this.getCalendar();
			await this.getEvent(calendar);
			await this.getEventComponents(calendar);

			// notify budget states
			if (this.showBudgetNotification.indexOf(this.event.id) === -1) {
				// this.notifyStates();
				this.setBudgetNotification(this.event.id);
			}
			this.calendarEvent = this.event;
			if (this.event.totalBudget)
				this.newBudget = (this.event.totalBudget + "").replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

			if (type === "update") {
				this.$root.$emit(
					"set-title",
					this.event,
					this.routeName === "EditBuildingBlocks",
					this.routeName === "InviteesManagement" || this.routeName === "EventInvitees",
				);
			}
		},
		notifyStates() {
			this.budgetStates = [];
			let now = moment();
			let created_at = moment(this.event.dateCreated);
			if (this.event.budgetProgress < 100 && now.diff(created_at, "days") < 15) {
				this.budgetStates.push({ key: "not_approved" });
			} else {
				if (this.event.standardBudget !== 0) {
					if (this.event.standardBudget < this.event.totalBudget) {
						this.budgetStates.push({
							key: "higher_than_average",
							percent: ((this.event.totalBudget - this.event.standardBudget) / this.event.totalBudget).toFixed(2) * 100,
						});
					} else if (this.event.standardBudget > this.event.totalBudget) {
						this.budgetStates.push({ key: "lower_than_average" });
					}
				}

				if (now.diff(created_at, "days") < 15) {
					this.budgetStates.push({ key: "approved_budget_in_two_weeks" });
				}

				if (this.event.unexpected < this.event.totalBudget * 0.1) {
					this.budgetStates.push({ key: "unexpected_budget_less_10" });
				}
			}

			if (this.budgetStates.length) {
				this.budgetStates.map((it) => {
					let message_item = BUDGET_MESSAGES.find((m) => m.key == it.key);
					this.$notify({
						message: {
							title: message_item.title,
							content: message_item.message,
							action: message_item.action,
						},
						icon: `${this.$iconURL}messages/${message_item.icon}`,
						horizontalAlign: "right",
						verticalAlign: "top",
						type: message_item.type,
						timeout: 5000,
					});
				});
			}
		},
		selectServices() {
			this.$refs.eventPlannerTabs.$emit("event-planner-nav-switch-panel", 1);
		},
		selectTimeline() {
			this.$root.$emit("event-planner-nav-switch-panel", 2);
		},
		selectInviteesManagement() {
			this.$root.$emit("event-planner-nav-switch-panel", 3);
		},
		selectEventPage() {
			this.$root.$emit("event-planner-nav-switch-panel", 4);
		},
		selectTab(tab) {
			this.currentTab = tab;
		},
		selectedTab(tab) {
			return this.currentTab === tab;
		},
		resetTab() {
			this.currentTab = null;
		},
		openEventModal() {
			this.setEventData(this.event);
			this.setEventModal({
				showModal: true,
			});
			this.setModalSubmitTitle("Save");
			this.setEditMode({
				editMode: true,
			});
		},
		refreshEvents() {
			this.getCalendarEvents();
		},
		goToComponent(route) {
			this.$router.push({
				path: "/events/" + this.event.id + route,
			});
			location.reload();
		},
		openUploadModal() {
			this.$refs.uploadModal.toggleModal(true);
		},
		handleUpdateBudget() {
			const editEventBlocksBudget = this.$refs.editEventBlocksBudget;
			editEventBlocksBudget.checkLeftovers().then((res) => {
				if (res) {
					this.editBudgetModalStep = 0;
				}
			});
		},
		async addNewCategory(newCategory) {
			this.addNewCategoryLoading = true;
			const event = new CalendarEvent({
				id: this.event.id,
				unexpectedBudget: this.event.unexpectedBudget - newCategory.allocatedBudget,
				calendar: new Calendar({ id: this.event.calendar.id }),
			});
			this.closeEditBudgetModal();
			this.$store.dispatch("event/saveEventAction", event).then((res) => {
				this.addNewCategoryLoading = false;
			});
		},
    editBudget(){

    },
    back() {
      this.$router.push(`/events/${this.event.id}/booking/budget`);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
		updateBudget(eventBudget) {
			let editedEvent = new CalendarEvent({ id: this.event.id });
			const newBudget = eventBudget.totalBudget; //Number(eventBudget.totalBudget.replace(/,/g, ""))
			if (newBudget < this.calendarEvent.totalBudget) {
				const arrow =
					"<i data-v-a76b6a56=\"\" style=\"color:#050505\" class=\"md-icon md-icon-font md-theme-default\">arrow_back</i>";
				const budgetString = `<div class="font-size-40 font-regular color-red" style="margin:20px 0">$ ${this.newBudget}</div>`;
				const description =
					"<div class=\"description\">Your edits changed the total budget, do you want to change it?</div>";
				Swal.fire({
					title: `<div class="text-left">${arrow}${budgetString}<div>Are Your Sure?</div>${description}</div>`,
					showCancelButton: true,
					confirmButtonClass: "md-button md-success",
					cancelButtonClass: "md-button md-danger",
					confirmButtonText: "Yes I'm sure",
					cancelButtonText: "No, take me back",
					buttonsStyling: false,
				}).then((result) => {
					if (result.dismiss != "cancel") {
						editedEvent.totalBudget = newBudget;
						editedEvent.reCalculate = true;

						editedEvent
							.save()
							.then((response) => {
								this.loadEventData("update");
							})
							.catch((error) => {
								console.log(error);
							});
					}
				});
			} else if (newBudget > this.calendarEvent.totalBudget) {
				editedEvent.totalBudget = newBudget;
				editedEvent.reCalculate = false;
				editedEvent
					.save()
					.then((response) => {
						this.loadEventData("update");
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
			}
			this.editBudgetElementsModal = false;
		},
		onBudgetChangeModal(newBudget) {
			this.extra = newBudget.totalBudget - this.event.totalBudget;
			if (this.extra === 0) {
				return this.closeEditBudgetModal();
			}
			this.newBudget = newBudget.totalBudget;
			this.setModalStep("next");
		},
		handleBudgetMethod() {
			if (this.extraBudgetMethod === "onUnexpected") {
				const event = new CalendarEvent({
					id: this.event.id,
					totalBudget: this.newBudget,
					unexpectedBudget: this.event.unexpectedBudget + (this.newBudget - this.event.totalBudget),
				});
				this.$store.dispatch("event/saveEventAction", event).then((res) => {
					this.event = res;
				});
				this.closeEditBudgetModal();
			} else {
				this.setModalStep(this.extraBudgetMethod === "goBack" ? "previous" : "next");
			}
		},
		onChangeComponent(event) {
			this.loadEventData("update");
		},
		onAddMoreBudget(value) {
			this.newBudget = `${this.event.totalBudget + value}`.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			this.updateBudget();
		},
		toggleCommentMode(mode) {
			this.showCommentEditorPanel = mode;
		},
		exportToPdf() {
			this.$refs.html2Pdf.generatePdf();
		},
		closeEditBudgetModal() {
			this.editBudgetModalStep = 0;
		},
		setModalStep(stepAction) {
			if (stepAction === "next") {
				this.editBudgetModalStep++;
			} else if (stepAction === "previous") {
				this.editBudgetModalStep--;
			} else {
				console.log("##-751, EventDetailsBudget.vue", "error wrong step action");
			}
		},
	},
	computed: {
		...mapState("EventPlannerVuex", ["eventData", "eventModalOpen", "modalTitle", "modalSubmitTitle", "editMode"]),
		...mapGetters({
			budgetStatistics: "event/budgetStatistics",
			components: "event/getComponentsList",
			showBudgetNotification: "event/showBudgetNotification",
			currentUser: "auth/currentUser",
		}),
		barItems() {
            const sections = this.updateSection();

            let elements = [];

            if (this.event.checkList && this.event.checkList.length) {

                const bookingIndex = this.event.checkList.findIndex(it => it.componentId === "planningboard");

                this.event.checkList.forEach(it => {
                    const section = sections.find(s => s.componentId === it.componentId);
                    elements.push(section);

                    if (it.componentId === "budget" && this.event.budgetProgress === 100 && bookingIndex === -1) {
                        elements.push(sections[3]);
                    }
                });

            } else {
                elements = sections;
            }

            return elements;
		},
		pieChartData() {
			return this.$store.state.event.eventData.components.filter((item) => item.bookTitle !== "Book Equipment");
		},
		// check permission
		permission() {
			try {
				return this.$store.state.event.eventData.permit;
			} catch (e) {
				return "edit";
			}
		},
		categoryList() {
			return this.$store.state.event.eventData.components.sort((a, b) => a.eventCategory.order - b.eventCategory.order);
		},
		canComment() {
			return this.permission === "edit" || this.permission === "comment";
		},
		canEdit() {
			return !this.permission || this.permission === "edit";
		},
		allocatedTotalBudget() {
			return (
				this.calendarEvent.totalBudget -
				this.calendarEvent.unexpectedBudget -
				this.calendarEvent.allocatedTips -
				this.calendarEvent.allocatedFees
			);
		},
	},
	filters: {
		formatDate: function (date) {
			return moment(date).format("MMM Do YYYY ");
		},
		formatTime: function (date) {
			return moment(date).format("h:00 A");
		},
		formatDuration: function (startDate, endDate) {
			return moment(endDate).diff(startDate, "hours");
		},
		withComma(amount) {
			return amount ? amount.toLocaleString() : 0;
		},
		roundNumber(amount) {
			return Math.round(amount / 10) * 10;
		},
	},
};
</script>

<style scoped lang="scss">
@import "../../styles/EventDetailsBudget.scss";
</style>
