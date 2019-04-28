<template>
  <div class="md-layout edit-event-details">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>

    <!-- Event Components Routes -->
    <event-page-routes  v-if="event" :event="event"></event-page-routes>
    <!-- ./Event Components Routes -->

    <template v-if="routeName === 'EditEvent'">
      <div class="md-layout-item md-xlarge-size-20 md-large-size-25 md-small-size-40" >
        <md-card class="md-card-profile">
          <div class="logo-block">
            <div class="event-planer-logo">
              <md-icon class="company-logo">date_range</md-icon>
            </div>
            <div class="event-title">Event Details</div>
            <md-button name="event-planner-event-details-edit" class="md-button md-simple md-just-icon md-sm"  @click="openEventModal()" style="margin-top : 1em;">
              <md-icon class="company-logo">create</md-icon>
            </md-button>
          </div>
          <md-card-content v-if="event">
            <div>
              <div class="md-layout event-info-section">
                <div class="md-layout-item md-size-100">
                  <div class="md-layout-item  title-text">Date</div>
                  <div class="md-layout-item md-size-100 md-caption ">{{calendarEvent.eventStartMillis | formatDate}}, {{calendarEvent.eventStartMillis | formatTime}} ({{calendarEvent.eventStartMillis | formatDuration(calendarEvent.eventEndMillis)}} hrs) </div>
                </div>

                <div class="md-layout-item md-size-50">
                  <div class="md-layout-item  title-text">Participants</div>
                  <div class="md-layout-item md-size-100 md-caption ">{{calendarEvent.numberOfParticipants}} + spouses </div>
                </div>

                <div class="md-layout-item md-size-50">
                  <div class="md-layout-item  title-text">Geography</div>
                  <div class="md-layout-item md-size-100 md-caption ">{{calendarEvent.location}} </div>
                </div>

                <div class="md-layout-item md-size-100">
                  <md-button class="md-sm md-simple md-rose">
                    <md-icon>cached</md-icon> Recurring weekly
                  </md-button>
                </div>

              </div>


              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <div class="fc-divider" style="color: #eeeeee; margin: 15px 0;"></div>
                </div>
              </div>
              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <h5 class="title-budget-main">Total remaining budget</h5>
                  <h4
                          class="title"
                          style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(33, 201, 152);">
                    <div class="title-budget-prise title">
                      <animated-number ref="totalRemainingBudgetNumber" :value="totalRemainingBudget" prefix="$"></animated-number>
                    </div>
                  </h4>

                  <div class="budget-pie-container" style="display: grid;margin: 18px;">
                    <chart-component
                            :chart-data="pieChart.data"
                            :chart-options="pieChart.options"
                            chart-type="Pie"
                            style="grid-column: 1; grid-row: 1; color:red"/>
                    <animated-number class="percentage" ref="percentageNumber" :value="percentage" suffix="%"></animated-number>
                  </div>
                </div>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <div>
                  <div class="md-caption title-text">Remaining budget per employee</div>
                  <!-- TODO Need calculate with components -->
                  <div class="md-caption title-text title-budget-prise">$0</div>
                </div>
                <div>
                  <div class="md-caption title-text">Budget per employee</div>
                  <div class="md-caption title-text title-budget-prise">
                    <animated-number ref="budgetPerPersonNumber" :value="calendarEvent.budgetPerPerson" prefix="$"></animated-number>
                  </div>
                </div>
                <div>
                  <div class="md-caption title-text">Total budget for the event</div>
                  <div class="md-caption title-text title-budget-prise">
                    <animated-number ref="totalBudgetNumber" :value="calendarEvent.totalBudget" prefix="$"></animated-number>
                  </div>
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item md-xlarge-size-80 md-large-size-75 md-small-size-60">
        <md-card class="manage-vendors">
          <md-card-content class="md-layout">
            <div class="md-layout-item md-size-60">
              <h4>Manage Vendor Proposals</h4>

              <p>
                Save planning time by sending quote requests and easily compare them to get the best deals.
              </p>

              <ol>
                <li>Select desired services for the event</li>
                <li>Create and send inquiries to your vendors</li>
                <li>Get proposals and choose the best offers</li>
              </ol>

              <md-button name="event-planner-tab-event-details-banner-manage-proposals" class="md-info">
                Manage inquiries &amp; proposals
              </md-button>
            </div>
            <div class="md-layout-item md-size-40">
              <iframe width="560" height="415" src="https://www.youtube.com/embed/ygte40FNSpU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </md-card-content>
        </md-card>

        <div class="edit-event-boxes md-layout">
          <md-card class="md-layout-item md-size-30">
              <md-card-content>
                <h4>Event Timeline</h4>
                <p>
                  Organize the event in a beautiful timeline.
                </p>
                <md-button name="event-planner-tab-event-details-banner-timeline" class="md-rose md-simple got-to-component-btn" @click="goToComponent('/edit/timeline')">
                  Edit Event Timeline <md-icon>arrow_forward</md-icon>
                </md-button>
              </md-card-content>
          </md-card>

          <md-card class="md-layout-item md-size-30">
            <md-card-content>
              <h4>Invitees Management</h4>

              <p>
                Select invitees, send scheduled RSVP and messages.
              </p>

              <md-button name="event-planner-tab-event-details-banner-invitees" class="md-rose md-simple got-to-component-btn" @click="goToComponent('/edit/invitees-management')">
                Manage Invitees <md-icon>arrow_forward</md-icon>
              </md-button>
            </md-card-content>
          </md-card>

          <md-card class="md-layout-item md-size-30">
            <md-card-content>
              <h4>Publish Event Details</h4>
              <p>
                Create a beautiful event page
                and send to invitees.
              </p>

              <md-button name="event-planner-tab-event-details-banner-event-page" class="md-rose md-simple got-to-component-btn" @click="goToComponent('')">
                Edit Event page <md-icon>arrow_forward</md-icon>
              </md-button>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </template>

    <div v-else-if="event && routeName === 'EditBuildingBlocks'" class="md-layout-item block-flex" >
      <event-building-blocks   :event="event" :event-components="selectedComponents" @go-to-building-blocks="resetTab"></event-building-blocks>
    </div>

    <div v-else-if="event &&  routeName === 'EditTimeLine' " class="md-layout-item block-flex">
      <event-time-line :event="event" :event-components="selectedComponents"></event-time-line>
    </div>

    <div v-else-if="event &&  routeName === 'InviteesManagement' " class="md-layout-item block-flex">
      <invitees-management :event="event" :event-components="selectedComponents"></invitees-management>
    </div>

    <!-- New Event Modal -->
    <event-modal @refresh-events="refreshEvents" :currentEvent="calendarEvent" ref="eventModal"></event-modal>
    <!-- ./New Event Modal -->

    <sticky-budget :event="event" v-if="routeName !== 'EditEvent'"></sticky-budget>

  </div>

</template>

<script>

  import EventModal from "./EventModal/";
  import EventPlannerVuexModule from "./EventPlanner.vuex";


  //MAIN MODULES
  import ChartComponent from "@/components/Cards/ChartComponent";
  import auth from "@/auth";
  import moment from "moment";
  import VueElementLoading from "vue-element-loading";
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';
  import {mapState, mapMutations,mapGetters, mapActions} from 'vuex';

  //COMPONENTS
  import { AnimatedNumber, NavTabs } from "@/components";
  import Icon from "@/components/Icon/Icon.vue";
  import EventElements from './EventElements.vue'
  import EventBlocks from "./components/NewEventBlocks";
  import EventBuildingBlocks from "./components/EventBuildingBlocks";
  import EventTimeLine from "./components/EventTimeLine.vue";
  import InviteesManagement from "./components/EventBlocks/InviteesManagement.vue";
  import StickyBudget from "./components/StickyBudget.vue";
  import EventPageRoutes from "./components/EventPageRoutes.vue";
  import MdCardContent from "../../../../node_modules/vue-material/src/components/MdCard/MdCardContent/MdCardContent.vue";

  export default {
    components: {
        MdCardContent,
        NavTabs,
      EventBuildingBlocks,
      VueElementLoading,
      ChartComponent,
      AnimatedNumber,
      Icon,
      EventElements,
      EventBlocks,
      EventModal,
      EventTimeLine,
      InviteesManagement,
      StickyBudget,
        EventPageRoutes
    },

    data() {
      return {
        auth: auth,
        calendarEvent: {},
        selectedComponents: [],
        currentTab: 'blocks',
        eventId: null,
        percentage: 0,
        totalRemainingBudget: 0,
        seriesData: [],
        isLoading: false,
        event : null,
        routeName : null
      };
    },
    created(){
      this.$store.registerModule("EventPlannerVuex", EventPlannerVuexModule);

      this.routeName = this.$route.name;

    },
    mounted() {
      this.getEvent();
      if (this.components.length === 0) {
        this.$store.dispatch("event/getComponents");
      }
    },
    methods: {
      ...mapMutations("EventPlannerVuex", [
        "setEventModal",
        "setEditMode",
        "setModalSubmitTitle",
        "setEventModalAndEventData",
        "setNumberOfParticipants",
        "setEventData"
      ]),
      getEvent() {
        this.auth.currentUser(this, true, function() {
          let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});

          _calendar.calendarEvents().find(this.$route.params.id).then(event => {
            this.event = event;
            this.eventId = event.id;
            this.calendarEvent = event;
            this.selectedComponents = event.components;
            this.totalRemainingBudget = event.totalBudget - event.allocatedBudget;
            this.percentage = 100 - ((event.allocatedBudget / event.totalBudget) * 100).toFixed(2);
            this.seriesData = [(100 - this.percentage), this.percentage];
          });
        }.bind(this));
      },
      selectTab(tab) {
        this.currentTab = tab
      },
      selectedTab(tab) {
        return this.currentTab === tab;
      },
      resetTab () {
        this.currentTab = null;
      },
      openEventModal() {
        this.setEventData(this.event);
        this.setEventModal({ showModal: true });
        this.setModalSubmitTitle("Edit");
        this.setEditMode({ editMode: true });
      },
      refreshEvents() {
        this.getCalendarEvents();
      },
      goToComponent (route) {
        this.$router.push({ path: `/events/`+ this.event.id + route });
        location.reload();
      }
    },
    computed: {
      ...mapGetters({
        components: "event/getComponentsList"
      }),
      pieChart() {
        return {
          data: {
            labels: [" ", " "], // should be empty to remove text from chart
            series: this.seriesData
          },
          options: {
            padding: 0,
            height: 156,
            donut: true,
            donutWidth: 15,
          }
        };
      }
    },
    filters: {
      formatDate: function (date) {
        return moment(date).format('MMM Do YYYY ');
      },
      formatTime: function(date) {
        return moment(date).format('h:00 A')
      },
      formatDuration: function(startDate, endDate) {
        return moment(endDate).diff(startDate, 'hours')
      }
    },
    watch: {
    },
  };
</script>

<style scoped>
  .md-layout, .md-layout-item {
    width: initial;
  }
</style>
<style lang="scss" scoped>
  .control-main-block {
    .company-control-logo {
      margin-right:8px;
      &:last-child {
        margin-right: 0;
      }
      i{
        font-size: 24px!important;
      }
    }
    .md-button.selected {
      background-color: #eb3e79!important;
      border-color:#eb3e79!important;;
      i {
        color: #fff!important;
      }
    }
  }
  .company-control-logo .md-button{
    border: 2px solid #959595;
  }
  .percentage {
    padding-bottom: 8px;
    padding-left: 5px;
    grid-column: 1;
    grid-row: 1;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 2.5rem;
    font-weight: 700;
    color: #515151;
  }
  .logo-block {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0px 15px;
    margin: -20px 0px 20px 0px;
    .event-planer-logo {
      background: #eb3e79;
      width:100%;
      max-width: 64px;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      margin-right: 10px;
      .company-logo {
        color: white !important;
      }
    }
    .event-title {
      white-space: nowrap;
      font-family: "Roboto";
      font-size: 1.125rem;
      font-weight: 400;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.33;
      letter-spacing: normal;
      text-align: left;
      color: #000000;
    }
  }
  .control-main-block {
    display: flex;
    justify-content: center;
    .company-logo-block {
      border: 2px solid #8b8b8b;
      padding: 7px;
      border-radius: 50%;
      margin: 0px 5px;
    }
  }
  .title-text {
    font-family: "Roboto";
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.2;
    letter-spacing: normal;
    text-align: left;
    color: #959595;
  }
  .title-budget-main {
    margin-top: 5px;
    margin-bottom: 0;
    font-family: "Roboto";
    font-size: 18px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: #000000;
  }
  .title-budget-prise {
    color: rgba(33, 200, 152, 0.8) !important;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 5px;
  }
  .title-budget-prise.title{
    font-size: 1.9375rem;
    margin-bottom: 0;
  }
  .block-flex {
    display: flex;
  }
  .button-event-creatig .md-ripple {
    background-color: #00bcd4;
  }
  .footer-link-button .md-ripple {
    color: #89229b;
    background-color: rgba(240, 240, 240, 1);
  }
  .copyright {
    color: #9c27b0;
  }
  .copyright-block {
    justify-content: space-between;
  }

</style>
