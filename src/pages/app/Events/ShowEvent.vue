<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>

    <div class="md-layout-item md-size-100">
      <md-card class="event-details">
        <md-card-content class="md-layout" v-if="calendarEvent.id">

          <!-- Event Banner -->
          <event-banner :event="calendarEvent" :readonly="readonly"></event-banner>
          <!-- ./Event Banner -->

          <!-- Event Info -->
          <div class="md-layout-item md-size-50">

            <div class="event-title-date">
              <h4>{{calendarEvent.occasion}}</h4>

              <div class="event-date">{{getEventDate(calendarEvent.eventStartMillis)}}</div>
            </div>

            <event-confirmation :event="calendarEvent"></event-confirmation>

            <event-tabs :event="calendarEvent" :readonly="readonly"></event-tabs>

            <event-images :event="calendarEvent" :readonly="readonly"></event-images>

            <event-questions-answers :event="calendarEvent" :readonly="readonly"></event-questions-answers>

          </div>
          <!-- ./Event Info -->

          <!-- Event TimeLine -->
          <div class="md-layout-item md-size-50">
            <event-time-line-items :event="calendarEvent" :readonly="readonly"></event-time-line-items>
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
    import EventConfirmation from "./components/EventBlocks/EventConfirmation.vue"


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
            EventTimeLineItems,
            EventConfirmation
        },

        data() {
            return {
                auth: auth,
                calendarEvent: {},
                isLoading: false,
                readonly : true
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
                "setEventPageProperty",
                "setPublishEventModal",
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

            }
        },
        computed: {
            ...mapState('EventPlannerVuex', [
                'eventPage'
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