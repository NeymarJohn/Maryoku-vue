<template>
  <div class="rsvp-event-timeline md-layout">
    <div class="md-layout-item md-size-100 md-small-size-100 mb-50 d-flex align-center">
      <span class="text-transform-uppercase font-size-30 font-bold-extra" :class="{ 'color-gray': !isDisplayed }"
        >sneaky peak to the agenda</span
      >
      <md-switch v-if="canHide" v-model="isDisplayed" class="ml-10 md-switch below-label large-switch">
        <span class="color-black font-regular">Hide Agenda</span>
      </md-switch>
    </div>
    <template v-if="isDisplayed">
      <div
        v-for="(schedule, index) in scheduledDays"
        :key="index"
        class="md-layout-item md-size-50 md-small-size-100 text-transform-uppercase font-size-30 font-bold-extra"
      >
        <div class="rsvp-event-timeline-day">
          <span class="font-size-22 font-bold-extra">Day 0{{ index + 1 }}</span>
          <span class="font-size-16">{{ $dateUtil.formatScheduleDay(schedule.itemDay) }}</span>
        </div>
        <div>
          <rsvp-timeline-item
            v-for="(timeline, index) in schedule.items"
            :key="index"
            :timeline="timeline"
          ></rsvp-timeline-item>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import RsvpTimelineItem from "./RSVPTimelineItem";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import _ from "underscore";
import RsvpInformationModal from "@/components/Modals/RSVP/InformationModal";
import SettingReminderModal from "@/components/Modals/RSVP/SettingReminderModal";
import JoinZoomModal from "@/components/Modals/RSVP/JoinZoomModal";
import SyncCalendarModal from "@/components/Modals/RSVP/SyncCalendarModal";
import RsvpVenueCarousel from "./RSVPVenueCarousel";
import RsvpEventInfoPanel from "@/pages/app/RSVP/RSVPEventInfoPanel";

export default {
  components: {
    RsvpTimelineItem,
  },
  props: {
    hide: {
      type: Boolean,
      default: false,
    },
    canHide: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDisplayed: true,
    };
  },
  created() {},
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    scheduledDays() {
      var timelines = {};
      let scheduledDays = [];

      // define timelines
      console.log(this.event.timelineItems);
      if (this.event.timelineItems) {
        this.event.timelineItems.forEach((item) => {
          item.isItemLoading = false;
          if (!timelines[item.plannedDate]) timelines[item.plannedDate] = [];
          item.isItemLoading = false;
          timelines[item.plannedDate].push(item);
        });
        console.log(timelines);
        if (Object.keys(timelines).length > 0) {
          Object.keys(timelines).forEach((itemDay, index) => {
            scheduledDays.push({
              itemDay: parseInt(itemDay),
              isEditable: false,
              items: timelines[itemDay],
            });
          });
          scheduledDays = _.sortBy(scheduledDays, function (item) {
            return item.itemDay;
          });
        }
      }
      return scheduledDays;
    },
  },
  watch: {
    isDisplayed(newValue, oldValue) {
      this.$emit("changeVisibility", newValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.rsvp-event-timeline {
  &-day {
    line-height: 1.5em;
    width: 100%;
    background-color: #3a3838;
    text-align: center;
    color: white;
    border-radius: 2px;
  }
}
</style>