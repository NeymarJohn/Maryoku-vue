<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>

    <!-- Publish Event Button -->
    <div class="md-layout-item text-right">
      <md-button class="md-info publish-event">
        Publish Event
      </md-button>
    </div>

    <!-- ./Publish Event Button -->

    <div class="md-layout-item md-size-100">
      <md-card class="event-details">
            <md-card-content class="md-layout" v-if="calendarEvent.id">

              <!-- Event Banner -->
              <event-banner :event="calendarEvent"></event-banner>
              <!-- ./Event Banner -->

              <!-- Event Info -->
              <div class="md-layout-item md-size-50">

                <div class="event-title-date">
                  <md-field>
                    <md-input v-model="calendarEvent.occasion" />
                  </md-field>

                  <md-datepicker v-model="date" :value="new Date(calendarEvent.eventStartMillis)">
                    <label></label>
                  </md-datepicker>
                  <md-button class="md-info md-sm" @click="editTitleDate">
                    Edit
                  </md-button>
                </div>

                <event-tabs :event="calendarEvent" ></event-tabs>

                <event-images :event="calendarEvent"></event-images>

                <event-questions-answers :event="calendarEvent"></event-questions-answers>

              </div>
              <!-- ./Event Info -->

              <!-- Event TimeLine -->
              <div class="md-layout-item md-size-50">
                <event-time-line-items :event="calendarEvent"></event-time-line-items>
              </div>
              <!-- ./Event Timeline -->

            </md-card-content>
      </md-card>
    </div>

  </div>
</template>

<script>
//MAIN MODULES
import ChartComponent from "@/components/Cards/ChartComponent";
import auth from "@/auth";
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import Calendar from '@/models/Calendar';
import CalendarEvent from '@/models/CalendarEvent';
import EventPlannerVuexModule from "./EventPlanner.vuex";
import {mapState, mapMutations,mapGetters, mapActions} from 'vuex';

//COMPONENTS
import { AnimatedNumber } from "@/components";
import Icon from "@/components/Icon/Icon.vue";
import { Collapse } from "@/components";

// EVENT COMPONENTs
import EventBanner from "./components/EventBlocks/EventBanner.vue"
import EventTabs from "./components/EventBlocks/EventTabs.vue"
import EventImages from "./components/EventBlocks/EventImages.vue"
import EventQuestionsAnswers from "./components/EventBlocks/EventQuestionsAnswers.vue"
import EventTimeLineItems from "./components/EventBlocks/EventTimelineItems.vue"

export default {
  components: {
      VueElementLoading,
    ChartComponent,
    AnimatedNumber,
    Icon,
      Collapse,
      EventBanner,
      EventTabs,
      EventImages,
      EventQuestionsAnswers,
      EventTimeLineItems
  },

  data() {
    return {
      auth: auth,
      calendarEvent: {},
      percentage: 0,
      totalRemainingBudget: 0,
      seriesData: [],
      isLoading: false,
      footerLink: [
        { title: "HOME" },
        { title: "COMPANY" },
        { title: "PORTFOLIO" },
        { title: "BLOG" }
      ],
      questionsAndAnswersList : [
          {
              title : 'Question 1 : what if'
          },
          {
              title : 'Question 2'
          },
          {
              title : 'Question 3'
          }
      ],
      timelineItems : [
          {
              id : 1,
              type : 'setup',
              icon : 'place',
              color : '#f44336',
              from : '8:00 AM',
              to : '4:00 PM',
              title : 'title 1',
              description : 'description here'
          },
          {
              id : 2,
              type : 'activity',
              icon : 'notifications_active',
              color : '#4caf50',
              from : '8:00 AM',
              to : '4:00 PM',
              title : 'title 2',
              description : 'description here'
          },
          {
              id: 3,
              type : 'meal',
              icon : 'restaurant',
              color : '#00bcd4',
              from : '8:00 AM',
              to : '4:00 PM',
              title : 'title 3',
              description : 'description here'
          }
      ],
        newEventStartTime : null
    };
  },
    created(){
        this.$store.registerModule("EventPlannerVuex", EventPlannerVuexModule);

    },
  mounted() {
    this.getEvent();

  },
  methods: {
    ...mapMutations("EventPlannerVuex", [
        "setEventPageData",
        "setEventPageProperty"
    ]),
    getEvent() {
        this.auth.currentUser(this, true, function() {
            let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});

            _calendar.calendarEvents().find(this.$route.params.id).then(event => {
                this.calendarEvent = event.for(_calendar);
                this.totalRemainingBudget = event.totalBudget - event.allocatedBudget;
                this.percentage = 100 - ((event.allocatedBudget / event.totalBudget) * 100).toFixed(2);
                this.seriesData = [(100 - this.percentage), this.percentage];

                if ( event.eventPage == null ) {
                    this.setEventPageData();
                }

            });

        }.bind(this));
    },
      getEventDate(eventStartMillis) {

        let x = new Date(eventStartMillis);

        return x.getDate() + '-' + x.getMonth() + '-' + x.getFullYear();

      },
      setEventPageData() {

          let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});
          let editedEvent = new CalendarEvent({id: this.calendarEvent.id});

          editedEvent = this.calendarEvent;
          editedEvent.eventPage = this.eventPage;

          editedEvent.save().then(response => {
              console.log(response);

          })
              .catch((error) => {
                  console.log(error);

              });

      },
      editTitleDate() {

          let editedEvent = new CalendarEvent({id: this.calendarEvent.id});

          editedEvent = this.calendarEvent;
          editedEvent.occasion = this.calendarEvent.occasion;
          editedEvent.eventStartMillis = this.newEventStartTime !== null ? this.newEventStartTime : this.calendarEvent.eventStartMillis

          editedEvent.save().then(response => {

              console.log('Event Saved');

          })
              .catch((error) => {
                  console.log(error);

              });


      }
  },
  computed: {
      ...mapState('EventPlannerVuex', [
          'eventPage',
      ]),
    pieChart() {
      return {
        data: {
          labels: [" ", " "], // should be empty to remove text from chart
          series: this.seriesData
        },
        options: {
          padding: 0,
          height: 120,
          donut: true,
          donutWidth: 12
        }
      };
    },
      date: {
          get() {
              return this.calendarEvent.eventStartMillis ? new Date(this.calendarEvent.eventStartMillis) :  null
          },
          set(value) {
              let eventStartTime = new Date(value).getTime();
              this.$set(this,'newEventStartTime',eventStartTime)
          }
      },
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('Do, MMM');
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
