<template>
  <div class="rsvp-event">
    <div class="rsvp-event-header" :style="`background-image: url('${headerImage}');`"></div>
    <div class="rsvp-event-overview" :style="`background-image:${backgroundImage}`">
      <div class="rsvp-event-overview-content">
        <div class="md-layout">
          <div class="rsvp-event-overview-content-customer md-layout-item md-size-100">
            <img :src="`${$iconURL}RSVP/ms-icon.png`" class="mb-40">
            <div class="font-size-40" style="margin-bottom:100px">
              Hello Microsoft special employee!
            </div>
          </div>
        
          <div class="md-layout-item md-size-50 md-small-size-50">
            <div class="mb-20">
              You Are Invited To A
            </div>
            <div class="font-size-60 font-bold-extra mb-30">
              {{event.title}}
            </div>
            <div>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet 
              clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit 
              amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            </div>
          </div>
          <div class="md-layout-item md-size-50 md-small-size-50">
            <div class="event-info">
              <div class="event-info-item">
                <div class="event-info-item-icon" :style="`background-color:${event.concept.colors[0].value}`">
                  <img :src="`${$iconURL}RSVP/Path+251.svg`">
                </div>
                <div class="event-info-item-title font-size-22 font-bold-extra">WHEN?</div>
                <div class="event-info-item-content font-size-20">
                  {{$dateUtil.formatScheduleDay(event.eventStartMillis, "MMM Do YYYY")}} 
                  <span style="line-height:2em;border-left:solid 1px #B7B7B7; padding-left:10px; margin-left:10px;display: inline-block;"> {{$dateUtil.formatScheduleTime(event.eventStartMillis)}}</span> 
                </div>
              </div>
              <div class="event-info-item">
                <div class="event-info-item-icon" :style="`background-color:${event.concept.colors[1].value}`">
                  <img :src="`${$iconURL}Event%20Page/location-dark.svg`">
                </div>
                <div class="event-info-item-title font-size-22 font-bold-extra">WHERE?</div>
                <div class="event-info-item-content  font-size-20">{{event.location}}</div>
              </div>
              <div class="event-info-item">
                <div class="event-info-item-icon" :style="`background-color:${event.concept.colors[2].value}`">
                  <img :src="`${$iconURL}RSVP/Path+1383.svg`">
                </div>
                <div class="event-info-item-title font-size-22 font-bold-extra">WITH +1?</div>
                <div class="event-info-item-content font-size-20">{{event.numberOfParticipants > 1 ? "Yes!" : "No!"}}</div>
              </div>
              <div class="event-info-item">
                <div class="event-info-item-icon" :style="`background-color:${event.concept.colors[3].value}`">
                  <img :src="`${$iconURL}RSVP/Group+1279.svg`">
                </div>
                <div class="event-info-item-title font-size-22 font-bold-extra">Arrival? </div>
                <div class="event-info-item-content font-size-20">December 25, 2019       8:00 AM</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="font-size-22 font-bold"> Check out the venue</div>
          <div>
            <carousel :items="3" :margin="25" :dots="false" :nav="true" class="proposal-images" :number="2">
              <img v-for="(item,index) in images" :key="index" :src="item.src" />
            </carousel>
          </div>
        </div>
      </div>
    </div>
    <div class="rsvp-event-guid md-layout">
      <div class="md-layout-item md-size-50 md-small-size-50">
        <div class="font-size-30 font-bold-extra mb-30 d-flex ">
          <img :src="`${$iconURL}RSVP/Path 3728.svg`">
          <span style="padding-top: 10px; margin-left:20px;"> WHAT SHOULD I WEAR?</span>
        </div>
        <div>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
          sed diam nonumy eirmod tempor invidunt ut labore et
        </div>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-50">
        <div class="font-size-30 font-bold-extra mb-30 d-flex ">
          <img :src="`${$iconURL}RSVP/Path 2369.svg`">
          <span style="padding-top: 10px; margin-left:20px;"> What should I Know?</span>
        </div>
        <div>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
          sed diam nonumy eirmod tempor invidunt ut labore et 
          dolore magna aliquyam erat, sed diam voluptua. At vero
        </div>
      </div>
    </div>
    <div class="rsvp-event-timeline md-layout">
      <div class="md-layout-item md-size-100 md-small-size-100 text-transform-uppercase font-size-30 font-bold-extra mb-50">
        sneaky peak to the agenda
      </div>
      <div v-for="(schedule, index) in scheduledDays" 
        :key="index" 
        class="md-layout-item md-size-50 md-small-size-100 text-transform-uppercase font-size-30 font-bold-extra ">
        <div class="rsvp-event-timeline-day">
          <span class="font-size-22 font-bold-extra">Day 0{{index + 1}}</span>
          <span class="font-size-16">{{$dateUtil.formatScheduleDay(schedule.itemDay)}}</span>
        </div>
        <div>
          <rsvp-timeline-item v-for="(timeline, index) in schedule.items" :key="index" :timeline="timeline"></rsvp-timeline-item>
        </div>
      </div>
      <!-- <div class="md-layout-item md-size-50 md-small-size-100 text-transform-uppercase font-size-30 font-bold-extra">
        <div class="rsvp-event-timeline-day">
          <span class="font-size-22 font-bold-extra">Day 01</span>
          <span class="font-size-16">20/04/20</span>
        </div>
        <div>
          <rsvp-timeline-item></rsvp-timeline-item>
          <rsvp-timeline-item></rsvp-timeline-item>
          <rsvp-timeline-item></rsvp-timeline-item>
          <rsvp-timeline-item></rsvp-timeline-item>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import RsvpTimelineItem from './RSVPTimelineItem';
import carousel from 'vue-owl-carousel'
import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import _ from "underscore";

export default {
  components: {
    RsvpTimelineItem,
    carousel
  },
  data() {
    return {
      images: [
        {
          src: `${this.$iconURL}RSVP/Image+81.jpg`
        },
        {
          src: `${this.$iconURL}RSVP/Image+82.jpg`
        },
        {
          src: `${this.$iconURL}RSVP/Image+83.jpg`
        },
        {
          src: `${this.$iconURL}RSVP/Image+84.jpg`
        }
      ],
      event: {},
      scheduledDays: []
    }
  },
  created () {
    const eventId = this.$route.params.eventId;
    const eventCalendar = new CalendarEvent({id: eventId})

    new Calendar({id: this.$store.state.auth.user.profile.defaultCalendarId})
      .calendarEvents()
      .find(eventId)
      .then(res => {
        this.event = res;
        
        var timelines = {};
          // define timelines
        if (res.timelineItems) {
          res.timelineItems.forEach(item => {
            item.isItemLoading = false;
            if (!timelines[item.plannedDate]) timelines[item.plannedDate] = [];
            item.isItemLoading = false;
            timelines[item.plannedDate].push(item);
          });
          console.log(timelines)
          if (Object.keys(timelines).length > 0) {
            this.scheduledDays = [];
            Object.keys(timelines).forEach((itemDay, index) => {
              this.scheduledDays.push({
                itemDay: parseInt(itemDay),
                isEditable: false,
                items: timelines[itemDay]
              });
            });
            this.scheduledDays = _.sortBy(this.scheduledDays, function(item) {
              return item.itemDay;
            });
            console.log(this.scheduledDays)
          }
        }
        console.log(res)
      })
  },
  computed: {
    backgroundImage() {
      if (this.event.concept) {
        const color1 = this.event.concept.colors[0].value;
        const color2 = this.event.concept.colors[1].value;
        const color3 = this.event.concept.colors[2].value;
        const color4 = this.event.concept.colors[3].value;
        console.log(`linear-gradient(${color1} 25%, ${color2} 25%, ${color2} 50%, ${color3} 50%, ${color3} 75%, ${color4} 75%, ${color4} 100%);`)
        return `linear-gradient(${color1} 25%, ${color2} 25%, ${color2} 50%, ${color3} 50%, ${color3} 75%, ${color4} 75%, ${color4} 100%);`
      } else {
        return "";
      }
    },
    headerImage() {
      if (this.event.concept) {
        return this.event.concept.images[0].url
      } 
      return "";
    }
  },
}
</script>
<style lang="scss" scoped>
  .rsvp-event {
    background-color: #fff;
    .rsvp-event-header {
      height: 430px;
     
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center 60%;
    }
    &-overview{
      // background-color: #fff;
      // @include gradientBackgroundRSVP(#ff48b2, #71ecf8, #fff500, #57f2c3);
      &-content {
        background-color: white;
        margin-left: 27px;
        padding: 60px 120px;
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
            padding:8px;
          }
          &-title {
            width: 150px;
            padding: 10px 24px;
          }
        }
      }
    }
    &-guid {
      background-color:rgba(#57f2c3, 0.23);
      padding: 60px 135px;
    }
    &-timeline{
      padding: 60px 135px;
      &-day {
        line-height: 1.5em;
        width:100%;
        background-color: #3a3838;
        text-align: center;
        color: white;
        border-radius: 2px;
      }
    }
    .owl-carousel {
      .owl-item {
        .item {
          width: 340px;
          height: 200px;
        }
      }
    }
  }
</style>