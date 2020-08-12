<template>
  <div>
    <div class="white-card rsvp-campaign">
      <div class="p-50">
        <div class="font-size-30 font-bold-extra">Get everyone to RSVP</div>
        <div class="cover-preview">
          <md-button class="md-red maryoku-btn md-theme-default change-cover-btn">
            <img :src="`${$iconURL}Campaign/Group 2344.svg`"/>Change Cover
          </md-button>
        </div>
        <div class="preview-logo p-40 d-flex align-center">
          <img :src="logoImage">
          <md-switch v-model="showLogo"></md-switch>
        </div>
        <div class="font-size-30 font-bold mt-20">Hello Microsoft special employee!</div>
        <div class="font-size-20 mt-50">YOU ARE INVITED TO A</div>
        <div class="font-size-60 font-bold-extra mt-50">80’s Disco Party</div>
        <maryoku-textarea v-model="content"></maryoku-textarea>
        <div class="event-info">
          <div class="event-info-item">
            <div class="event-info-item-icon">
              <img :src="`${$iconURL}RSVP/Path+251.svg`" />
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
              class="event-info-item-icon">
              <img :src="`${$iconURL}Event%20Page/location-dark.svg`" />
            </div>
            <div class="event-info-item-title font-size-22 font-bold-extra">WHERE?</div>
            <div class="event-info-item-content font-size-20">{{event.location}}</div>
          </div>
          <div class="event-info-item">
            <div
              class="event-info-item-icon">
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
              <img :src="`${$iconURL}RSVP/Group+1279.svg`" />
            </div>
            <div class="event-info-item-title font-size-22 font-bold-extra">Arrival?</div>
            <div class="event-info-item-content font-size-20">December 25, 2019 8:00 AM</div>
          </div>
        </div>
        
      </div>
      <div class="p-40" style="background-color:#57f2c3">
        <div class="rsvp-event-guid md-layout">
          <div class="md-layout-item md-size-50 md-small-size-50">
            <div class="font-size-30 font-bold-extra mb-30 d-flex">
              <img :src="`${$iconURL}RSVP/Path 3728.svg`" style="height:43px"/>
              <span style="padding-top: 10px; margin-left:20px;">WHAT SHOULD I WEAR?</span>
            </div>
            <maryoku-textarea placeholder="Give your guests details about the expected dress code"></maryoku-textarea>
          </div>
          <div class="md-layout-item md-size-50 md-small-size-50">
            <div class="font-size-30 font-bold-extra mb-30 d-flex">
              <img :src="`${$iconURL}RSVP/Path 2369.svg`"  style="height:43px"/>
              <span style="padding-top: 10px; margin-left:20px;">What should I Know?</span>
            </div>
            <maryoku-textarea placeholder="Give your guests any information you find relevant"></maryoku-textarea>
          </div>
        </div>
      </div>
      <div class="rsvp-event-timeline md-layout p-50">
        <div
          class="md-layout-item md-size-100 md-small-size-100 text-transform-uppercase font-size-30 font-bold-extra mb-50"
        >sneaky peak to the agenda</div>
        <div
          v-for="(schedule, index) in scheduledDays"
          :key="index"
          class="md-layout-item md-size-50 md-small-size-100 text-transform-uppercase font-size-30 font-bold-extra"
        >
          <div class="rsvp-event-timeline-day">
            <span class="font-size-22 font-bold-extra">Day 0{{index + 1}}</span>
            <span class="font-size-16">{{$dateUtil.formatScheduleDay(schedule.itemDay)}}</span>
          </div>
          <div>
            <rsvp-timeline-item
              v-for="(timeline, index) in schedule.items"
              :key="index"
              :timeline="timeline"
            ></rsvp-timeline-item>
          </div>
        </div>
      </div>
    </div>
    <div class="white-card p-50">
      <div> Online participants </div>
      <md-checkbox v-model="allowOnline">Allow online participation</md-checkbox>
      <div>Paste link to video communication</div>
      <maryoku-input v-model="zoomlink"></maryoku-input>
    </div>
  </div>
</template>
<script>
import MaryokuTextarea from '@/components/inputs/MaryokuTextarea'
import { MaryokuInput } from "@/components";

export default {
  components: {
    MaryokuTextarea,
    MaryokuInput
  },
  data() {
    return {
      logoImage: "",
      showLogo: true,
      content: "",
      zoomlink: ""
    }
  },
  computed: {
    event() {
      return this.$store.state.event.eventData 
    },
    scheduledDays() {
      var timelines = {};
        // define timelines
        if (this.event.timelineItems) {
          this.event.timelineItems.forEach((item) => {
            item.isItemLoading = false;
            if (!timelines[item.plannedDate]) timelines[item.plannedDate] = [];
            item.isItemLoading = false;
            timelines[item.plannedDate].push(item);
          });
          console.log(timelines);
          if (Object.keys(timelines).length > 0) {
            let scheduledDays = [];
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
    }
  }
}
</script>
<style lang="scss" scoped>
.rsvp-campaign {
  .cover-preview {
    width: 100%;
    height: 350px;
    position: relative;
    .change-cover-btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .event-info {
    .event-info-item {
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      &-icon {
        width: 42px;
        height: 42px;
        background-color: #d9fcf2;
        border-radius: 21px;
        padding: 8px;
      }
      &-title {
        width: 150px;
        padding: 10px 24px;
      }
    }
  }
}
</style>
