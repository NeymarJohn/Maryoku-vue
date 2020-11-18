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
                @change="changeEvent"
        ></event-overview-section>
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
import CommentEditorPanel from "./CommentEditorPanel";
import Multiselect from "vue-multiselect";
import EventOverviewSection from "./EventOverviewSection";

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
    changeEvent(e) {
      if ( e.hasOwnProperty('created_at') ){
        this.event.eventPage.dateCreated = e.created_at;
      } else if ( e.hasOwnProperty('location') ) {
        this.event.location = e.location;
      } else if ( e.hasOwnProperty('inOutDoor') ) {
        this.event.inOutDoor = e.inOutDoor;
      } else if ( e.hasOwnProperty('numberOfParticipants') ) {
        this.event.numberOfParticipants = e.numberOfParticipants;
      } else if ( e.hasOwnProperty('guestType') ) {
        this.event.guestType = e.guestType;
      } else if ( e.hasOwnProperty('eventType') ) {
        this.event.eventPage.name = e.eventType;
      } else if ( e.hasOwnProperty('occasion') ) {
        this.event.occasion = e.occasion;
      } else if ( e.hasOwnProperty('holiday') ) {
        this.event.holiday = e.holiday;
      }

      this.init();
    },
    init(){

      this.event = this.$store.state.event.eventData; // Fetch event from store

      this.sections = [
        {
          title: "Date",
          key: 'date',
          img_src : `${this.$iconURL}Onboarding/balloon-calendar.svg`,
          warning: 'Changing the time on your status might cause price changes',
          created_at: this.event.eventPage.dateCreated,
          more_one_day: null,
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
          guestType: this.event.guestType ? this.event.guestType : '',
        },
        {
          title: "Event type",
          key: 'event_type',
          img_src : `${this.$iconURL}Onboarding/reception.svg`,
          warning: null,
          eventType: this.event.eventType.name,
          occasion: this.event.occasion ? this.event.occasion : '',
          holiday: this.event.holiday ? this.event.holiday : '',
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
      eventTypeList: "event/getEventTypesList",
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
<style lang="scss">
@import "../../../styles/EventDetailsOverview";
</style>
