<template>
  <div class="rsvp-event-info">
    <div class="event-info-item">
      <div class="event-info-item-icon">
        <div class="event-info-item-icon-background" :style="`background-color:${backgroundColor}`"></div>
        <img :src="`${$iconURL}RSVP/Path+251.svg`" />
      </div>
      <div class="event-info-item-title font-size-22 font-bold-extra">WHEN?</div>
      <div class="event-info-item-content font-size-20">
        {{ $dateUtil.formatScheduleDay(event.eventStartMillis, "MMM Do YYYY") }}
        <span
          style="
            line-height: 2em;
            border-left: solid 1px #b7b7b7;
            padding-left: 10px;
            margin-left: 10px;
            display: inline-block;
          "
          >{{ $dateUtil.formatScheduleTime(event.eventStartMillis) }}</span
        >
      </div>
    </div>
    <div class="event-info-item">
      <div class="event-info-item-icon">
        <div class="event-info-item-icon-background" :style="`background-color:${backgroundColor}`"></div>
        <img :src="`${$iconURL}Event%20Page/location-dark.svg`" />
      </div>
      <div class="event-info-item-title font-size-22 font-bold-extra">WHERE?</div>
      <div class="event-info-item-content font-size-20">{{ event.location }}</div>
    </div>
    <div class="event-info-item">
      <div class="event-info-item-icon">
        <div class="event-info-item-icon-background" :style="`background-color:${backgroundColor}`"></div>
        <img :src="`${$iconURL}RSVP/Path+1383.svg`" />
      </div>
      <div class="event-info-item-title font-size-22 font-bold-extra">SOLO OR PLUS 1?</div>
      <div class="event-info-item-content d-flex align-center font-size-20" v-if="!editingPlusOne">
        <span>{{ isPluseOne ? "+1" : "Solo" }} &emsp;</span>
        <md-button class="md-simple edit-btn md-red" v-if="editable" @click="editingPlusOne = !editingPlusOne"
          >Edit</md-button
        >
      </div>
      <div class="event-info-item-content d-flex align-center font-size-20" v-else>
        <!-- <input type="text" v-model="isPluseOne" /> -->
        <select v-model="isPluseOne">
          <option :value="false">Solo</option>
          <option :value="true">+1</option>
        </select>
        <md-button class="md-simple md-red maryoku-btn" @click="updateEvent">Save</md-button>
        <md-button class="md-simple md-black md-outlined maryoku-btn" @click="editingPlusOne = !editingPlusOne"
          >Cancel</md-button
        >
      </div>
    </div>
    <div class="event-info-item">
      <div class="event-info-item-icon">
        <div class="event-info-item-icon-background" :style="`background-color:${backgroundColor}`"></div>
        <img :src="`${$iconURL}RSVP/Group+1279.svg`" />
      </div>
      <div class="event-info-item-title font-size-22 font-bold-extra">Arrival?</div>
      <div class="event-info-item-content font-size-20" v-if="!editingArrival">
        {{ eventArrival }}&emsp;
        <md-button class="md-simple edit-btn md-red" v-if="editable" @click="editingArrival = !editingArrival"
          >Edit</md-button
        >
      </div>
      <div class="event-info-item-content d-flex align-center font-size-20" v-else>
        <input type="text" v-model="eventArrival" />
        <md-button class="md-simple md-red maryoku-btn" @click="updateEvent">Save</md-button>
        <md-button class="md-simple md-black md-outlined maryoku-btn" @click="editingArrival = !editingArrival"
          >Cancel</md-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import CalendarEvent from "@/models/CalendarEvent";
import Calendar from "@/models/Calendar";
export default {
  props: {
    event: {
      type: Object,
      default: {},
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isPluseOne: this.isPlusOne,
      eventArrival: this.event.arrival,
      editingPlusOne: false,
      editingArrival: false,
    };
  },
  methods: {
    updateEvent() {
      this.$store.dispatch(
        "event/saveEventAction",
        new CalendarEvent({
          id: this.event.id,
          calendar: new Calendar({ id: this.event.calendar.id }),
          isPluseOne: this.isPluseOne,
          arrival: this.eventArrival,
        }),
      );
      this.editingPlusOne = false;
      this.editingArrival = false;
    },
  },
  computed: {
    concept() {
      return this.event.concept ? this.event.concept : {};
    },
    backgroundColor() {
      return this.event.concept ? this.event.concept.colors[0].color : "#d9fcf2";
    },
    isPlusOne() {
      if ("isPlusOne" in this.event) {
        return this.event.isPlusOne;
      }
      return this.event.guestType === "employees-spouses" || this.event.guestType === "families";
    },
  },
};
</script>
<style lang="scss" scoped>
.rsvp-event-info {
  .event-info-item {
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    &-icon {
      width: 42px;
      height: 42px;
      border-radius: 21px;
      padding: 8px;
      position: relative;
      overflow: hidden;
      &-background {
        width: 42px;
        height: 42px;
        position: absolute;
        left: 0px;
        top: 0px;
        // opacity: 0.32;÷
      }
      img {
        width: 26px;
        height: 42px;
        position: absolute;
        left: 8px;
        top: 0px;
      }
    }
    &-title {
      width: 250px;
      padding: 10px 24px;
    }
    &-content {
      .maryoku-btn {
        margin: 0;
      }
    }
  }
}
</style>