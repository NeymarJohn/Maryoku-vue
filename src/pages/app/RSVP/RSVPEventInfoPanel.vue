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
      <div class="event-info-item-content font-size-20" v-if="isPlusOne">+ 1</div>
      <div class="event-info-item-content font-size-20" v-else>
        <input v-if="editable" type="text" v-model="eventSolo" />
        <span v-else>{{ eventSolo }}</span>
      </div>
    </div>
    <div class="event-info-item">
      <div class="event-info-item-icon">
        <div class="event-info-item-icon-background" :style="`background-color:${backgroundColor}`"></div>
        <img :src="`${$iconURL}RSVP/Group+1279.svg`" />
      </div>
      <div class="event-info-item-title font-size-22 font-bold-extra">Arrival?</div>
      <div class="event-info-item-content font-size-20">
        <div v-if="event.arrival">{{ event.arrival }}</div>
        <input v-if="editable" type="text" v-model="eventArrival" />
        <span v-else>{{ eventArrival }}</span>
      </div>
    </div>
  </div>
</template>
<script>
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
      eventSolo: "-",
      eventArrival: "-",
    };
  },
  computed: {
    concept() {
      return this.event.concept ? this.event.concept : {};
    },
    backgroundColor() {
      return this.event.concept ? this.event.concept.colors[0].color : "#d9fcf2";
    },
    isPlusOne() {
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
  }
}
</style>