<template>
  <div class="md-layout">
    <!--<div class="md-layout-item md-size-100 text-right">
      <md-button class="button-event-creatig" @click="openEventModal()">Create New Event</md-button>
    </div>-->
      <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen>
          <img src="/static/img/maryoku-loader.gif"/>
      </vue-element-loading>
    <div class="md-layout-item md-size-100">
      <md-card v-if="upcomingEvents.length">
        <md-card-header class="md-card-header-icon md-card-header-rose">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Upcoming Events</h4>
        </md-card-header>
        <md-card-content>
          <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>
          <md-table
            v-model="upcomingEvents"
            table-header-color="rose"
            @click="forceRerender()"
            class="table-striped table-hover right-align-actions"
          >
            <md-table-row
              slot="md-table-row"
              slot-scope="{ item }"
              class="hover-row"
              @click="routeToEvent(item.id, $event)"
            >
              <md-table-cell md-label="Event Name">{{ item.title }}</md-table-cell>
              <!--<md-table-cell md-label="Occasion">{{ item.occasion }}</md-table-cell>-->
              <md-table-cell md-label="Event Type">{{ item.eventType }}</md-table-cell>
              <md-table-cell md-label="Date">{{ item.eventStartMillis | moment }}</md-table-cell>
              <md-table-cell md-label="Customer Name">{{ item.owner.department }}</md-table-cell>
              <md-table-cell
                md-label="Created By"
                style="text-transform: capitalize;"
                v-if="item.owner.id !== $auth.user.id"
              >{{ item.owner.displayName }} <span class="small text-primary" style="display: block;">{{ item.owner.emailAddress }}</span></md-table-cell>
              <md-table-cell md-label="Created By" v-else>You <span class="small text-primary" style="display: block;">{{ item.owner.emailAddress }}</span> </md-table-cell>
              <md-table-cell md-label="# Participants">{{item.numberOfParticipants}}</md-table-cell>
                <md-table-cell md-label="Budget Per Participant">$ {{item.budgetPerPerson}}</md-table-cell>
                <md-table-cell md-label="Location">{{item.location}}</md-table-cell>
              <md-table-cell md-label="Actions" style="white-space: nowrap;">
                <!--<md-button @click="viewEvent(item)" class="md-raised md-info md-icon-button">
                  <md-icon>visibility</md-icon>
                </md-button>-->
                <md-button  @click="editEvent($event, item)" class="md-info md-just-icon md-round">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button
                  @click="showDeleteAlert($event, item)"
                  class="md-danger md-just-icon md-round">
                  <md-icon>delete</md-icon>
                </md-button>

                <!-- <div class="float-right"><md-icon>share</md-icon></div>-->
              </md-table-cell>
            </md-table-row>
          </md-table>
          <!--<div class="empty-table text-danger text-center" v-else>
            No events yet,
            <span class="text-link" @click="routeToNewEvent()">
              create one now
            </span>
          </div>-->
        </md-card-content>
      </md-card>
      <md-card class="md-card-plain" v-if="!upcomingEvents.length && !isLoading">
        <md-card-content>
          <div class="text-center">
            <img src="http://static.maryoku.com/storage/img/calendar.png" style="width: 120px;">
            <h4>You do not have any events planned yet</h4>
            <md-button class="md-info" @click="routeToNewEvent">
              <md-icon>event</md-icon>Create New Event
            </md-button>
            <md-button class="md-rose" @click="routeToPlanner">
              Browse Year Planner
              <md-icon>arrow_right</md-icon>
            </md-button>
          </div>
        </md-card-content>
      </md-card>
    </div>

    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      v-if="recentEvents.length"
    >
      <div class="header text-center">
        <h4 class="title">Recent Events</h4>
      </div>
    </div>

    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33 card-link"
      v-for="event in recentEvents"
      :key="event.id"
      @click="routeToEvent(event.id)"
    >
      <product-card header-animation="true">
        <img class="img" slot="imageHeader" :src="imageHref(event.coverImage)">

        <h4 slot="title" class="title">
          <a @click="routeToEvent(event.id)">{{ event.title }}</a>
        </h4>
        <div slot="description" class="card-description">{{ event.eventStartMillis | moment }}</div>
        <template slot="footer">
          <div class="price">
            <h4>{{event.numberOfParticipants}} Guests &middot; {{duration(event)}} hours</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              {{ event.location }}
            </p>
          </div>
        </template>
      </product-card>
    </div>
  </div>
</template>

<script>
// import auth from '@/auth';
import Vue from 'vue';
import { Tabs, ProductCard } from "@/components";

import EventSidePanel from "@/pages/app/Events/EventSidePanel";

import EventModal from "./EventModal/";
import { mapMutations, mapGetters } from "vuex";
import EventPlannerVuexModule from "./EventPlanner.vuex";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import swal from "sweetalert2";
import TeamMember from '@/models/TeamMember';
import _ from "underscore";

export default {
  components: {
    Tabs,
    ProductCard,
    VueElementLoading,
    EventModal
  },
  created() {
    this.$store.registerModule("EventPlannerVuex", EventPlannerVuexModule);
  },
  computed: {
  },
  mounted() {
    this.$auth.currentUser(
      this,
      true,
      () => {
        this.$store.dispatch("user/getUserFromApi");
        let that = this;
        setTimeout(()=>{
          that.$store.dispatch(
            "event/getCategories",
            this.$auth.user.defaultCalendarId,
            that
          );
          that.$store.dispatch(
            "event/getEventTypes",
            this.$auth.user.defaultCalendarId,
            that
          );
          that.$store.dispatch("event/getCurrencies",that);
          that.$store.dispatch("event/getEventThemes",that);
        }, 100);

        let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId});

        let m = new CalendarEvent().for(_calendar).fetch(this, true);
        m.then(allEvents=>{
          this.upcomingEvents = this.getExtraFields(allEvents).reverse();

          //this.upcomingEvents = _.sortBy(this.upcomingEvents, function(num){  return new Date(num.eventStartMillis); });

          this.isLoading = false;
        });
      }
    );

    if (this.$route.params.mode && this.$route.params.mode == "create-event") {
      this.openEventModal();
    }
  },
  updated() {},
  data() {
    return {
      // auth: auth,
      product3: "http://static.maryoku.com/storage/img/shutterstock_289440710.png",
      recentEvents: [],
      upcomingEvents: [],
      isLoading: true
    };
  },

  methods: {
    ...mapMutations("EventPlannerVuex", [
      "setEventModal",
      "setEditMode",
      "setModalSubmitTitle",
      "setEventModalAndEventData",
      "setNumberOfParticipants"
    ]),
    openEventModal() {
      this.setModalSubmitTitle("Save");
      this.setEditMode({ editMode: false });

      window.currentPanel = this.$showPanel({
        component: EventModal,
        cssClass: "md-layout-item md-size-45 transition36 bg-grey",
        openOn: "right",
        props: {}
      });
    },
    // getCalendarEvents() {
    //   console.log(this.$store.state.user.defaultCalendarId)
    //   let _calendar = new Calendar({id: this.$store.state.user.defaultCalendarId});

    //   _calendar.calendarEvents().get().then(events => {
    //     console.log(events,'eto event')
    //     this.upcomingEvents = events.reduce(function (result, element) {
    //       if (element.status.toLowerCase() !== 'done') {
    //         result.push(element);
    //       }
    //       return result;
    //     }, []);
    //     this.recentEvents = events.reduce(function (result, element) {
    //       if (element.status.toLowerCase() === 'done') {
    //         result.push(element);
    //       }
    //       return result;
    //     }, []);

    //     this.isLoading = false;
    //   })
    //     .catch((error) => {
    //       console.log(error);
    //       this.isLoading = false;
    //     });
    // },
    showDeleteAlert(e, ev) {
      const _this = this;
      e.stopPropagation();
      swal({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        showCancelButton: true,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success confirm-btn-bg ",
        cancelButtonClass: "md-button md-danger cancel-btn-bg",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          _this.isLoading = true;
          let event = _this.upcomingEvents.find(e => {
            return e.id === ev.id;
          });
          ev.delete()
            .then(result => {
              _this.upcomingEvents.splice(
                this.upcomingEvents.indexOf(event),
                1
              );
              _this.isLoading = false;
            })
            .catch(() => {
              _this.isLoading = false;
            });
        }
      });
    },
    editEvent(ev, event) {
      if (ev.target.tagName === "I") {
        ev.stopPropagation();
        this.$router.push({name: 'EditEvent', params: {id: event.id}});
      }
    },
    viewEvent(event) {
      this.$router.push(`/events/${event.id}`);
    },
    imageHref(image) {
      return image && image.href
        ? `${process.env.SERVER_URL}${image.href}`
        : this.product3;
    },
    duration(event) {
      return (event.eventEndMillis - event.eventStartMillis) / 3600000;
    },
    routeToEvent(eventId) {
      this.$router.push({ name: "EditEventNew", params: { id: eventId } });
    },
    routeToPlanner() {
      this.$router.push({ name: "AnnualPlanner" });
    },
    refreshEvents() {
      this.getCalendarEvents();
    },
    openEventSidePanel(options) {
      window.currentPanel = this.$showPanel({
        component: EventSidePanel,
        cssClass: "md-layout-item md-size-40 transition36 ",
        openOn: "right",
        disableBgClick: false,
        props: {
          modalSubmitTitle: options.modalSubmitTitle,
          editMode: options.editMode,
          sourceEventData: options.eventData,
          refreshEvents: this.refreshEvents,
          year: this.year,
          month: this.month,
          occasionsOptions: this.occasionsArray,
          openInPlannerOption: options.editMode
        }
      });
    },
    openEditEventModal: function(item) {
      if (!item.editable) {
        item.occasion = item.title;
      }
      debugger;
      this.setEventModalAndEventData({ eventData: item });
      this.setModalSubmitTitle("Save");
      this.openEventSidePanel({
        modalSubmitTitle: "Save",
        editMode: true,
        eventData: item
      });

    },
    routeToNewEvent() {
      window.currentPanel = this.$showPanel({
        component: EventSidePanel,
        cssClass: "md-layout-item md-size-40 transition36 ",
        openOn: "right",
        disableBgClick: false,
        props: {
          modalSubmitTitle: "Save",
          editMode: false,
          sourceEventData: {
            eventStartMillis: new Date().getTime(),
            numberOfParticipants: this.$auth.user.customer.numberOfEmployees
          },
          refreshEvents: null,
          occasionsOptions: null,
          openInPlannerOption: false
        }
      });
    },
    getExtraFields(allEvents) {
      allEvents.forEach((item) => {
        TeamMember.find(item.owner.id).then(owner => {
          Vue.set(item, 'customerName', owner.customer.name)
          Vue.set(item, 'plannerEmail', owner.emailAddress)
        })
      })
      return allEvents
    }
  },

  filters: {
    moment: function(date) {
      return moment(date).format("MMMM Do, GGGG");
    }
  },
  watch: {
    upcomingEvents(newVal, oldVal) {
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss">
.button-event-creatig .md-ripple {
  background-color: #00bcd4;
}
.card-link .md-card {
  cursor: pointer;
}

.float-right {
  float: right;
}

.hover-row:hover {
  cursor: pointer;
}
.right-align-actions {
  .md-table-cell:last-child,
  .md-table-head:last-child {
    text-align: right;
  }
}


.text-link {
  text-decoration: underline;
  cursor: pointer;
}
</style>
