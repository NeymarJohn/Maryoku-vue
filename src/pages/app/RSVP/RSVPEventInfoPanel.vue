<template>
  <div class="rsvp-event-info">
    <div class="event-info-item">
      <div class="event-info-item-title font-size-22 font-bold-extra">
        <div class="event-info-item-icon">
          <div class="event-info-item-icon-background" :style="`background-color:${backgroundColor}`"></div>
          <img :src="`${$iconURL}RSVP/Path+251.svg`" />
        </div>
        <span :class="{ underline: !editable }">WHEN?</span>
      </div>
      <div class="event-info-item-content">
        <span>{{ $dateUtil.formatScheduleDay(startTime || event.eventStartMillis, "MMM DD, YYYY hh:mm A ") }}</span>
      </div>
    </div>
    <div class="event-info-item" v-if="!isVirtualEvent">
      <div class="event-info-item-title font-size-22 font-bold-extra">
        <div class="event-info-item-icon">
          <div class="event-info-item-icon-background" :style="`background-color:${backgroundColor}`"></div>
          <img :src="`${$iconURL}Event%20Page/location-dark.svg`" />
        </div>
        <span :class="{ underline: !editable }">WHERE?</span>
      </div>
      <div class="event-info-item-content">
        <span>{{ event.location }}</span>
      </div>
    </div>
    <div class="event-info-item" v-else>
      <div class="event-info-item-title font-size-22 font-bold-extra">
        <div class="event-info-item-icon">
          <div class="event-info-item-icon-background" :style="`background-color:${backgroundColor}`"></div>
          <img :src="`${$iconURL}Event%20Page/location-dark.svg`" />
        </div>
        <span :class="{ underline: !editable }">WHERE?</span>
      </div>
      <div class="event-info-item-content"><span>Zoom</span></div>
    </div>
    <div class="event-info-item" v-if="!isVirtualEvent">
      <div class="event-info-item-title font-size-22 font-bold-extra">
        <div class="event-info-item-icon">
          <div class="event-info-item-icon-background" :style="`background-color:${backgroundColor}`"></div>
          <img :src="`${$iconURL}RSVP/Path+1383.svg`" />
        </div>
        <span :class="{ underline: !editable }">SOLO OR PLUS 1?</span>
      </div>
      <div class="event-info-item-content d-flex align-center" v-if="!editingPlusOne">
        <span>{{ isPluseOne ? "+1" : "Solo" }} &emsp;</span>
        <md-button class="md-simple edit-btn md-red" v-if="editable" @click="editingPlusOne = !editingPlusOne">
          Edit
        </md-button>
      </div>
      <div class="event-info-item-content d-flex align-center" v-else>
        <!-- <input type="text" v-model="isPluseOne" /> -->
        <!-- <select v-model="isPluseOne">
          <option :value="false">Solo</option>
          <option :value="true">+1</option>
        </select> -->
        <md-checkbox v-model="isPluseOne" :value="false">Solo</md-checkbox>
        <md-checkbox v-model="isPluseOne" :value="true">+1</md-checkbox>
        <md-button class="md-simple md-black maryoku-btn" @click="editingPlusOne = !editingPlusOne">Cancel</md-button>
        <md-button class="md-red maryoku-btn" @click="updateEvent">Save</md-button>
      </div>
    </div>
    <div class="event-info-item">
      <div class="event-info-item-title font-size-22 font-bold-extra">
        <div class="event-info-item-icon">
          <div class="event-info-item-icon-background" :style="`background-color:${backgroundColor}`"></div>
          <img :src="`${$iconURL}RSVP/Group+1279.svg`" />
        </div>
        <span :class="{ underline: !editable }">ARRIVAL?</span>
      </div>

      <div class="event-info-item-content" v-if="!editingArrival">
        <span>
          {{ event.arrival || "-" }}&emsp;
          <md-button class="md-simple edit-btn md-red" v-if="editable" @click="editingArrival = !editingArrival">
            Edit</md-button
          >
        </span>
      </div>
      <div class="event-info-item-content d-flex align-center font-size-20" v-else>
        <input type="text" v-model="eventArrival" />
        <md-button class="md-simple md-black maryoku-btn" @click="editingArrival = !editingArrival">Cancel</md-button>
        <md-button class="md-red maryoku-btn" @click="updateEvent">Save</md-button>
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
    zoomLink: {
      type: String,
      default: "",
    },
    startTime: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isPluseOne: this.isPlusOne,
      eventArrival: this.event.arrival || "-",
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
    isVirtualEvent() {
      return this.event.places && this.event.places.length === 1 && this.event.places[0] === "VIRTUAL";
    },
  },
};
</script>
<style lang="scss" scoped>
.rsvp-event-info {
  .event-info-item {
    margin-bottom: 50px;
    display: flex;
    align-items: stretch;
    // flex-flow: wrap;
    &-icon {
      width: 42px;
      height: 42px;
      border-radius: 21px;
      padding: 8px;
      position: relative;
      overflow: hidden;
      vertical-align: middle;
      display: inline-block;
      margin-right: 20px;
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
      min-width: 250px;
      // padding: 10px 24px;
      span.underline {
        border-bottom: solid 2px #ff7600;
        vertical-align: middle;
      }
    }
    &-content {
      font-size: 20px;
      padding-left: 10px;
      word-break: break-all;
      display: flex;
      align-items: center;
      .maryoku-btn {
        margin: 0;
      }
    }
  }
}
@media only screen and (max-width: 959px) {
  .rsvp-event-info {
    .event-info-item {
      margin-bottom: 20px;
      &-icon {
        width: 25px;
        height: 25px;
        border-radius: 21px;
        padding: 8px;
        margin-right: 5px;
        &-background {
          width: 25px;
          height: 25px;
          left: 0px;
          top: 0px;
        }
        img {
          width: 60%;
          height: 25px;
          left: 5px;
          top: 0px;
        }
      }
      &-title {
        min-width: 110px;
        span.underline {
          border-bottom: solid 2px #ff7600;
          vertical-align: middle;
          font-size: 16px;
        }
      }
      &-content {
        font-size: 14px;
      }
    }
  }
}
</style>