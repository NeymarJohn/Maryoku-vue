<template>
  <div class="rsvp-event-info">
    <div class="event-info-item">
      <div class="event-info-item-icon" >
        <div class="event-info-item-icon-background" :style="`background-color:${concept.colors[0].color}`"></div>
        <img :src="`${$iconURL}RSVP/Path+251.svg`"  />
      </div>
      <div class="event-info-item-title font-size-22 font-bold-extra">WHEN?</div>
      <div class="event-info-item-content font-size-20">
        {{$dateUtil.formatScheduleDay(event.eventStartMillis, "MMM Do YYYY")}}
        <span
          style="line-height:2em;border-left:solid 1px #B7B7B7; padding-left:10px; margin-left:10px;display: inline-block;"
        >{{$dateUtil.formatScheduleTime(event.eventStartMillis)}}</span>
      </div>
    </div>
    <div class="event-info-item">
      <div
        class="event-info-item-icon"  >
        <div class="event-info-item-icon-background" :style="`background-color:${concept.colors[0].color}`"></div>
        <img :src="`${$iconURL}Event%20Page/location-dark.svg`" />
      </div>
      <div class="event-info-item-title font-size-22 font-bold-extra">WHERE?</div>
      <div class="event-info-item-content font-size-20">{{event.location}}</div>
    </div>
    <div class="event-info-item">
      <div
        class="event-info-item-icon">
        <div class="event-info-item-icon-background" :style="`background-color:${concept.colors[0].color}`"></div>
        <img :src="`${$iconURL}RSVP/Path+1383.svg`" />
      </div>
      <div class="event-info-item-title font-size-22 font-bold-extra">SOLO OR PLUS 1?</div>
      <div
        class="event-info-item-content font-size-20"
      >{{event.numberOfParticipants > 1 ? "Yes!" : "No!"}}</div>
    </div>
    <div class="event-info-item">
      <div
        class="event-info-item-icon">
        <div class="event-info-item-icon-background" :style="`background-color:${concept.colors[0].color}`"></div>
        <img :src="`${$iconURL}RSVP/Group+1279.svg`" />
      </div>
      <div class="event-info-item-title font-size-22 font-bold-extra">Arrival?</div>
      <div class="event-info-item-content font-size-20">December 25, 2019 8:00 AM</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      default: {} 
    },
  },
  computed: {
    concept() {
      return this.event.concept?this.event.concept:{}
    }
  },
}
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
      &-background{
        width: 42px;
        height: 42px;
        position: absolute;
        left: 0px;
        top: 0px;
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