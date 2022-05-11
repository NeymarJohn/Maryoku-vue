<template>
  <div class="rsvp-event-info">
    <div class="event-info-item">
      <BlockTitle
        v-model="iconColors.timeColor"
        :icon="`${$iconURL}RSVP/Path+251.svg`"
        :editable="editable"
        @closed="updateEvent"
      >
        WHEN
      </BlockTitle>
      <div class="event-info-item-content">
        <span>
          {{ $dateUtil.formatScheduleDay(startTime || event.eventStartMillis, "MMM DD, YYYY hh:mm A ") }}
        </span>
        <div v-if="editingTimezone" class="timezone-wrapper">
          <v-select v-model="timezone" class="timezone-selector" :options="timezoneList" />
          <SaveControls @save="updateEvent" @cancel="editingTimezone = false" />
        </div>
        <div v-else class="timezone-wrapper">
          <span>({{ timezone }})</span>
          <EditBtn v-if="editable" v-model="editingTimezone" />
        </div>
      </div>
    </div>

    <div class="event-info-item">
      <BlockTitle
        v-model="iconColors.locationColor"
        :icon="`${$iconURL}Event%20Page/location-dark.svg`"
        :editable="editable"
        @closed="updateEvent"
      >
        WHERE
      </BlockTitle>
      <div class="event-info-item-content">
        <span>{{ isVirtualEvent ? "Zoom" : event.location }}</span>
      </div>
    </div>

    <div v-if="!isVirtualEvent" class="event-info-item">
      <BlockTitle
        v-model="iconColors.soloColor"
        :icon="`${$iconURL}RSVP/Path+1383.svg`"
        :editable="editable"
        @closed="updateEvent"
      >
        SOLO OR PLUS 1
      </BlockTitle>
      <div v-if="editingPlusOne" class="event-info-item-content d-flex align-center">
        <md-checkbox v-model="isPluseOne" :value="false">
          Solo
        </md-checkbox>
        <md-checkbox v-model="isPluseOne" :value="true">
          +1
        </md-checkbox>
        <SaveControls @save="updateEvent" @cancel="editingPlusOne = false" />
      </div>
      <div v-else class="event-info-item-content d-flex align-center">
        <span>{{ isPluseOne ? "+1" : "Solo" }} &emsp;</span>
        <EditBtn v-if="editable" v-model="editingPlusOne" />
      </div>
    </div>

    <div class="event-info-item">
      <BlockTitle
        v-model="iconColors.arrivalColor"
        :icon="`${$iconURL}RSVP/Group+1279.svg`"
        :editable="editable"
        @closed="updateEvent"
      >
        ARRIVAL
      </BlockTitle>
      <div v-if="editingArrival" class="event-info-item-content d-flex align-center font-size-20">
        <input v-model="eventArrival" type="text">
        <SaveControls @save="updateEvent" @cancel="editingArrival = false" />
      </div>
      <div v-else class="event-info-item-content">
        <span>
          {{ event.arrival || "-" }}&emsp;
        </span>
        <EditBtn v-if="editable" v-model="editingArrival" />
      </div>
    </div>
  </div>
</template>
<script>
import vSelect       from "vue-select";
import "vue-select/dist/vue-select.css";

import CalendarEvent from "@/models/CalendarEvent";
import Calendar      from "@/models/Calendar";
import BlockTitle    from "./BlockTitle/index.vue";

export default {
  components: {
    vSelect,
    BlockTitle,
    EditBtn      : () => import("@/components/Button/Edit.vue"),
    SaveControls : () => import("@/components/Controls/Save.vue"),
  },
  props: {
    event: {
      type: Object,
      default: () => ({}),
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
      isPluseOne      : this.isPlusOne,
      eventArrival    : this.event.arrival || "-",
      timezone        : "",
      editingPlusOne  : false,
      editingArrival  : false,
      editingTimezone : false,
      timezoneList    : ["EST", "PST", "CST", "MST", "EDT", "HST"],
      iconColors      : {},
    };
  },
  computed: {
    concept() {
      return this.event.concept ? this.event.concept : {};
    },
    backgroundColor() {
      return this.concept.colors ? this.event.concept.colors[0].color : "#d9fcf2";
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
  watch: {
    async event(newValue, oldValue) {
      if (!newValue.timezone) {
        console.log(newValue);
        await this.updateTimeZone(newValue.locationId);
      }
    },
  },
  async created() {
    if (this.event.locationId && !this.event.timezone) {
      await this.updateTimeZone(this.event.locationId);
    } else {
      this.timezone = this.event.timezone;
    }
    if (this.event.additionalData && this.event.additionalData.iconColors) {
      this.iconColors = this.event.additionalData.iconColors;
    } else {
      const color = this.event.concept ? this.event.concept.colors[0] : {};
      this.$set(this.iconColors, "timeColor",     color);
      this.$set(this.iconColors, "locationColor", color);
      this.$set(this.iconColors, "soloColor",     color);
      this.$set(this.iconColors, "arrivalColor",  color);
    }
    console.log("iconColors", this.iconColors);
  },
  methods: {
    async updateTimeZone (locationId) {
      const timezone = await this.$dateUtil.getTimeZoneNameFromPlaceId(locationId);
      const phrases  = timezone.timeZoneName.split(" ");
      const result   = phrases.reduce((s, phrase) => {
        return `${s}${phrase.substr(0, 1).toUpperCase()}`;
      }, "");
      this.timezone = result;
    },
    updateEvent() {
      const { additionalData = {} } = this.event;
      additionalData.iconColors = this.iconColors;
      this.$store.dispatch(
        "event/saveEventAction",
        new CalendarEvent({
          id         : this.event.id,
          calendar   : new Calendar({ id: this.event.calendar.id }),
          isPluseOne : this.isPluseOne,
          arrival    : this.eventArrival,
          timezone   : this.timezone,
          additionalData,
        }),
      );
      this.editingPlusOne  = false;
      this.editingArrival  = false;
      this.editingTimezone = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.rsvp-event-info {
  .event-info-item {
    margin-bottom : 50px;
    display       : flex;
    align-items   : stretch;
    // flex-flow: wrap;
    .timezone-selector {
      min-width: 120px;
    }
    &-icon {
      position: relative;
      display: inline-block;
      margin-right: 20px;
      &-background {
        width: 42px;
        height: 42px;
        position: absolute;
        left: 0px;
        top: 0px;
        cursor: pointer;
        // opacity: 0.32;÷
      }
      img {
        width: 42px;
        height: 42px;
        position: absolute;
        left: 0px;
        top: 0px;
        padding: 8px;
        cursor: pointer;
        background-color: #ff7600;
      }
    }
    &-title {
      min-width   : 250px;
      display     : flex;
      align-items : center;
      min-width   : 260px;
      // padding: 10px 24px;
    }
    &-content {
      font-size    : 20px;
      padding-left : 10px;
      word-break   : break-all;
      display      : flex;
      align-items  : center;
      max-height   : 80px;
      width        : 100%;
      .maryoku-btn {
        margin: 0;
      }
      & > span {
        display    : inline-flex;
        align-items: center;
        overflow-y : auto;
        min-height : 40px;
        max-height : 80px;
        max-width  : calc(100% - 60px);
      }
    }
  }
  .timezone-wrapper {
    margin-left: 20px;
    display: flex;
  }
}
@media only screen and (max-width: 959px) {
  .rsvp-event-info {
    .event-info-item {
      margin-bottom: 20px;
      &-content {
        font-size: 14px;
      }
    }
  }
}
</style>
