<template>
  <div class="md-layout event-details-overview edit-event-details" v-if="event">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="event-page-header md-layout-item md-size-100">
      <div class="header-title">
        <div class="d-flex align-center">
          Created on {{ getFormattedDate }}
          <md-button class="md-simple md-red" style="color: white">
            See event history <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
        </div>
        <h3>
          <md-icon class="color-black font-size-30 mr-10">outlined_flag</md-icon>
          YOUR EVENT
        </h3>
      </div>
      <header-actions @toggleCommentMode="toggleCommentMode"></header-actions>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <event-overview-section
                v-for="(section, index) in sections"
                :key="index"
                :section="section"
        ></event-overview-section>

        <div v-if="1 == 2" class="card-section align-center">
          <div class="left">
            <img class="mr-30" src="https://static-maryoku.s3.amazonaws.com/storage/icons/Onboarding/balloon-calendar.svg">
            <div style="width: 40%">
              <h3 class="title">EventType</h3>
              <p v-if="!isEdit" class="content">{{ event.eventType.name }}</p>

              <multiselect
                           v-if="isEdit"
                           v-model="eventType"
                           class="multiple-selection my-15"
                           track-by="name"
                           label="name"
                           placeholder="Select one"
                           :options="eventTypes" :searchable="false"
                           :allow-empty="false">
                <template slot="singleLabel" slot-scope="{ option }">
                  <span>{{ option.name }}</span>
                </template>
              </multiselect>

              <div v-if="isEdit" class="warning">
                <img class="mr-10" :src="`${iconsUrl}Group 1175 (9).svg`" width="20" />
                Changing the time on your status might cause price changes
              </div>
            </div>
            <div v-if="!isEdit" class="value align-self-center">{{event.occasion}}</div>
            <div v-if="isEdit" class="value">
              <h3>Who's invited</h3>
              <multiselect v-model="occasion"
                           class="multiple-selection"
                           track-by="name"
                           label="name"
                           placeholder="Select one"
                           :options="occasions" :searchable="false"
                           :allow-empty="false">
                <template slot="singleLabel" slot-scope="{ option }">
                  <span>{{ option.name }}</span>
                </template>
              </multiselect>
            </div>
          </div>
          <div class="right">
            <md-button class="md-simple" @click="isEdit = !isEdit">
              <md-icon style="font-size: 40px!important;"> {{ isEdit ? 'keyboard_arrow_down' : 'keyboard_arrow_right' }} </md-icon>
            </md-button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <md-button class="md-bold add-category-btn md-black md-simple" > <md-icon>arrow_back</md-icon>Back </md-button>
      <md-button class="md-bold add-category-btn md-black md-simple ml-auto  mr-20">
        <img class="mr-10" src="https://s3.amazonaws.com/static.maryoku.com/storage/3Proposals/Group 10912.svg">I need those proposals urgent</md-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import CalendarEvent from "@/models/CalendarEvent";

import moment from "moment";
import swal from "sweetalert2";
import { MaryokuInput} from '@/components'
import VueElementLoading from "vue-element-loading";
import { FunctionalCalendar } from "vue-functional-calendar";
import { LabelEdit, AnimatedNumber, StatsCard, ChartCard, Modal, LocationInput } from "@/components";
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "./components/CommentEditorPanel";
import Multiselect from "vue-multiselect";
import EventOverviewSection from "./components/EventOverviewSection";

export default {
  name: "event-overview",
  components: {
    VueElementLoading,
    FunctionalCalendar,
    HeaderActions,
    CommentEditorPanel,
    LocationInput,
    MaryokuInput,
    Multiselect,
    EventOverviewSection,
  },
  props: {
    // event: Object,
    // eventComponents: [Array, Function]
  },
  data() {
    return {
      // auth: auth,
      calendar: null,
      event: null,
      editEvent: null,
      eventId: null,
      percentage: 0,
      isLoading: true,
      iconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewLandingPage/",
      timlineIconsURL: `${this.$iconURL}Timeline-New/`,
      menuIconsURL: `${this.$iconURL}menu%20_%20checklist/SVG/`,
      isEdit: false,
      showEditDetailModal: false,
      showCommentEditorPanel: false,
      dateData: {
        currentDate: new Date(),
        dateRange: {
          start: { date: false, dateTime: false, hour: "00", mintue: "00" },
          end: { date: false, dateTime: false, hour: "00", mintue: "00" },
        },
        selectedDate: new Date(),
        selectedDatesItem: "",
        selectedHour: "00",
        selectedMinute: "00",
        selectedDates: [],
      },
      location: null,
      inOutdoors: null,
      guestsTypes: [
        {
          value: "employees", name: "Employees"
        },
        {
          value: "employees-spouses", name: "Employees & Spouses"
        },
        {
          value: "families", name: "Familes"
        },
        {
          value: "business-associates", name: "Business Associates"
        },
        {
          value: "customers", name: "Customers"
        },
        {
          value: "board-members", name: "Board Members"
        },
      ],
      guestType: null,
      eventType: null,
      occasions: [
        {
          value: "National Day", name: "National Day", icon: "ballons-dark.svg"
        },
        {
          value: "Holiday", name: "Holiday", icon: "gift-dark.svg"
        },
        {
          value: "Milestone", name: "Milestone", icon: "flag-dark.svg"
        },
        {
          value: "Company Day", name: "Company Day", icon: "champaign-dark.svg"
        },
        {
          value: "Season", name: "Season", icon: "beach.svg"
        }],
      occasion: null,
      sections: [],
    };
  },
  methods: {
    updateEvent() {
      let updateEvent = new CalendarEvent({ id: this.event.id }).for(this.calendar);
      updateEvent.eventDayPart = this.editEvent.eventDayPart;
      updateEvent.eventStartMillis = this.editEvent.eventStartMillis;
      updateEvent.numberOfParticipants = this.editEvent.numberOfParticipants;
      updateEvent.location = this.editEvent.location;

      const eventType = this.eventTypes.find((it) => it.name === this.editEvent.eventType.name);
      updateEvent.eventType = eventType;
      if (updateEvent.eventDayPart === "evening") {
        updateEvent.eventStartMillis.setHours(19);
      } else {
        updateEvent.eventStartMillis.setHours(8);
      }
      updateEvent.eventStartMillis = updateEvent.eventStartMillis.getTime();
      updateEvent.eventEndMillis = updateEvent.eventStartMillis + 3600 * 1000;

      if (
        this.event.noBudget &&
        (this.editEvent.eventData !== this.event.eventData ||
          this.editEvent.location != this.event.location ||
          this.editEvent.eventStartMillis != this.event.eventStartMillis)
      ) {
        swal({
          title: "Do you want to update the budget accordingly?",
          text: ``,
          showCancelButton: true,
          confirmButtonClass: "md-button md-success",
          cancelButtonClass: "md-button md-danger",
          confirmButtonText: "Yes, Recalcuate it!",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            updateEvent.reCalculate = true;
          }
          updateEvent
            .save()
            .then((res) => {
              this.event = res;
            })
            .catch((err) => {
              console.log(err);
            });
          this.showEditDetailModal = false;
        });
      } else {
        updateEvent
          .save()
          .then((res) => {
            this.event = res;
          })
          .catch((err) => {
            console.log(err);
          });
        this.showEditDetailModal = false;
      }
    },
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = !this.showCommentEditorPanel;
    },
    changeLocation(loc) {
      console.log("change.location", loc);
    },
    init(){
      this.$store.dispatch("event/getEventTypes", {
        data: this.$store.state.auth.user.profile.defaultCalendarId,
        ctx: this,
      });

      this.event = this.$store.state.event.eventData; // Fetch event from store
      if (this.event) {
        this.guestType = this.guestsTypes.find(it => it.value === this.event.guestType);
        this.eventType = this.eventTypes.find(it => it.key === this.event.eventType.key);
        this.occasion = this.occasions.find(it => it.value === this.event.occasion);
      }

      this.sections = [
        {
          title: "Date",
          key: 'date',
          img_src : `${this.$iconURL}Onboarding/balloon-calendar.svg`,
          warning: 'Changing the time on your status might cause price changes',
          created_at: this.event.eventPage.dateCreated,
        },
        {
          title: "Location",
          key: 'location',
          img_src : `${this.$iconURL}Onboarding/balloon-calendar.svg`,
          warning: 'Changing the address on your status might cause price changes',
          location: this.event.location,
          inOutDoor: this.event.inOutDoor,
        },
        {
          title: "Number OF Guests",
          key: 'number_of_guest',
          img_src : `${this.$iconURL}Onboarding/balloon-calendar.svg`,
          warning: 'Changing the number of guests on your status might cause price changes',
          numberOfParticipants: this.event.numberOfParticipants,
          guestType: this.event.guestType,
        },
        {
          title: "Event type",
          key: 'event_type',
          img_src : `${this.$iconURL}Onboarding/balloon-calendar.svg`,
          warning: null,
          eventType: this.event.eventType.name,
          occasion: this.event.occasion,
          singer: this.event.singer,
        }
      ];
    }
  },
  mounted() {
    this.isLoading = true;
    this.init()
  },
  watch: {
    event(newVal, oldVal) {
      this.$root.$emit("set-title", this.event, this.routeName === "EditBuildingBlocks", true);
    },
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format("MMM Do YYYY");
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
  },
  computed: {
    ...mapGetters({
      eventTypes: "event/getEventTypesList",
    }),
    getFormattedDate() {
      if (!this.event) return "";
      return moment(new Date(this.event.eventPage.dateCreated)).format("DD MMM YYYY");
    },

    // check permission
    permission() {
      try {
        return this.$store.state.event.eventData.permit;
      } catch (e) {
        return "edit";
      }
    },
    canComment() {
      return this.permission === "edit" || this.permission === "comment";
    },
    canEdit() {
      return this.permission === "edit";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../styles/EventDetailsOverview.scss";
</style>
