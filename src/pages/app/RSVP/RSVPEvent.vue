<template>
  <div class="rsvp-container">
    <div class="rsvp-event">
      <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
      <div class="rsvp-event-header" :style="`background-image: url('${headerImage}');`"></div>
      <div class="rsvp-event-overview" :style="`background-image:${backgroundImage}`">
        <div class="rsvp-event-overview-content">
          <div class="md-layout">
            <div class="rsvp-event-overview-content-customer md-layout-item md-size-100">
              <img :src="`${$iconURL}RSVP/ms-icon.png`" class="mb-40" />
              <div
                class="font-size-40"
                style="margin-bottom:100px"
              >Hello Microsoft special employee!</div>
            </div>

            <div class="md-layout-item md-size-50 md-small-size-50">
              <div class="mb-20">You Are Invited To A</div>
              <div class="font-size-60 font-bold-extra mb-30">{{event.title}}</div>
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
                  <div
                    class="event-info-item-icon"
                    :style="`background-color:${event.concept.colors[0].value}`"
                  >
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
                    class="event-info-item-icon"
                    :style="`background-color:${event.concept.colors[1].value}`"
                  >
                    <img :src="`${$iconURL}Event%20Page/location-dark.svg`" />
                  </div>
                  <div class="event-info-item-title font-size-22 font-bold-extra">WHERE?</div>
                  <div class="event-info-item-content font-size-20">{{event.location}}</div>
                </div>
                <div class="event-info-item">
                  <div
                    class="event-info-item-icon"
                    :style="`background-color:${event.concept.colors[2].value}`"
                  >
                    <img :src="`${$iconURL}RSVP/Path+1383.svg`" />
                  </div>
                  <div class="event-info-item-title font-size-22 font-bold-extra">WITH +1?</div>
                  <div
                    class="event-info-item-content font-size-20"
                  >{{event.numberOfParticipants > 1 ? "Yes!" : "No!"}}</div>
                </div>
                <div class="event-info-item">
                  <div
                    class="event-info-item-icon"
                    :style="`background-color:${event.concept.colors[3].value}`"
                  >
                    <img :src="`${$iconURL}RSVP/Group+1279.svg`" />
                  </div>
                  <div class="event-info-item-title font-size-22 font-bold-extra">Arrival?</div>
                  <div class="event-info-item-content font-size-20">December 25, 2019 8:00 AM</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-50">
            <img :src="`${$iconURL}RSVP/Group+8056.svg`" />
          </div>
          <div>
            <div class="font-size-22 font-bold mb-10">Check out the venue</div>
            <div>
              <carousel
                :items="3"
                :margin="25"
                :dots="false"
                :nav="true"
                class="proposal-images"
                :number="2"
              >
                <img v-for="(item,index) in images" :key="index" :src="item.src" />
              </carousel>
            </div>
          </div>
        </div>
      </div>
      <div class="rsvp-event-guid md-layout">
        <div class="md-layout-item md-size-10 md-small-size-10">
          <img :src="`${$iconURL}RSVP/Group+8056.svg`" style="margin-top: 40px;" />
        </div>
        <div class="md-layout-item md-size-45 md-small-size-45">
          <div class="font-size-30 font-bold-extra mb-30 d-flex">
            <img :src="`${$iconURL}RSVP/Path 3728.svg`" />
            <span style="padding-top: 10px; margin-left:20px;">WHAT SHOULD I WEAR?</span>
          </div>
          <div>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et
          </div>
        </div>
        <div class="md-layout-item md-size-45 md-small-size-45">
          <div class="font-size-30 font-bold-extra mb-30 d-flex">
            <img :src="`${$iconURL}RSVP/Path 2369.svg`" />
            <span style="padding-top: 10px; margin-left:20px;">What should I Know?</span>
          </div>
          <div>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero
          </div>
        </div>
      </div>
      <div class="rsvp-event-timeline md-layout">
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
        </div>-->
      </div>
    </div>
    <div class="text-center mb-50">
      Provided by
      <img :src="`${$iconURL}RSVP/maryoku - logo dark@2x.png`" />
    </div>
    <div class="rsvp-footer">
      <div class="rsvp-footer-content">
        <div>
          <md-button
            @click="scrollToTop"
            class="md-button md-simple md-just-icon md-theme-default scroll-top-button"
          >
            <img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17" />
          </md-button>
          <md-button
            class="md-button md-red md-just-icon md-theme-default scroll-top-button"
          >
            <img :src="`${$iconURL}RSVP/sharing-white.svg`" width="17" />
          </md-button>
        </div>
        <div>
          <md-button class="md-simple md-button md-black mayroku-btn"><span class="font-size-20">I Can't make it</span></md-button>
          <span class="seperator"></span>
          <md-button class="md-simple md-button md-black mayroku-btn"><span class="font-size-20">I Need To Think About It</span></md-button>
          <md-button @click="showZoomModal=true" class="md-simple md-button md-black mayroku-btn virtual-btn" ><span class="font-size-20">Virtual Participation</span></md-button>
          <md-button @click="showRsvpModal=true" class="md-button md-red mayroku-btn rsvp-btn"><span class="font-size-20">RSVP Now</span></md-button>
        </div>
      </div>
    </div>
    <rsvp-information-modal v-if="showRsvpModal" @close="showRsvpModal=false" @setRsvp="setRsvp"></rsvp-information-modal>
    <setting-reminder-modal v-if="showReminderModal" @close="showReminderModal=false"></setting-reminder-modal>
    <join-zoom-modal v-if="showZoomModal"  @close="showZoomModal=false"  @setRsvp="setZoomRsvp"></join-zoom-modal>
    <sync-calendar-modal v-if="showSyncCalendarForZoom" @close="showSyncCalendarForZoom=false"></sync-calendar-modal>
  </div>
</template>
<script>
import RsvpTimelineItem from "./RSVPTimelineItem";
import carousel from "vue-owl-carousel";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import _ from "underscore";
import RsvpInformationModal from "@/components/Modals/RSVP/InformationModal"
import SettingReminderModal from "@/components/Modals/RSVP/SettingReminderModal"
import JoinZoomModal from "@/components/Modals/RSVP/JoinZoomModal"
import SyncCalendarModal from "@/components/Modals/RSVP/SyncCalendarModal"
export default {
  components: {
    RsvpTimelineItem,
    carousel,
    RsvpInformationModal,
    SettingReminderModal,
    JoinZoomModal,
    SyncCalendarModal
  },
  data() {
    return {
      images: [
        {
          src: `${this.$iconURL}RSVP/Image+81.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/Image+82.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/Image+83.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/Image+84.jpg`,
        },
      ],
      event: {},
      scheduledDays: [],
      isLoading: true,
      showRsvpModal: false,
      showReminderModal: false,
      showZoomModal: false,
      showSyncCalendarForZoom: false
    };
  },
  created() {
    const eventId = this.$route.params.eventId;
    const eventCalendar = new CalendarEvent({ id: eventId });

    new Calendar({ id: this.$store.state.auth.user.profile.defaultCalendarId })
      .calendarEvents()
      .find(eventId)
      .then((res) => {
        this.event = res;

        var timelines = {};
        // define timelines
        if (res.timelineItems) {
          res.timelineItems.forEach((item) => {
            item.isItemLoading = false;
            if (!timelines[item.plannedDate]) timelines[item.plannedDate] = [];
            item.isItemLoading = false;
            timelines[item.plannedDate].push(item);
          });
          console.log(timelines);
          if (Object.keys(timelines).length > 0) {
            this.scheduledDays = [];
            Object.keys(timelines).forEach((itemDay, index) => {
              this.scheduledDays.push({
                itemDay: parseInt(itemDay),
                isEditable: false,
                items: timelines[itemDay],
              });
            });
            this.scheduledDays = _.sortBy(this.scheduledDays, function (item) {
              return item.itemDay;
            });
            console.log(this.scheduledDays);
          }
        }
        this.isLoading = false;
        console.log(res);
      });
  },
  computed: {
    backgroundImage() {
      if (this.event.concept) {
        const color1 = this.event.concept.colors[0].value;
        const color2 = this.event.concept.colors[1].value;
        const color3 = this.event.concept.colors[2].value;
        const color4 = this.event.concept.colors[3].value;
        console.log(
          `linear-gradient(${color1} 25%, ${color2} 25%, ${color2} 50%, ${color3} 50%, ${color3} 75%, ${color4} 75%, ${color4} 100%);`
        );
        return `linear-gradient(${color1} 25%, ${color2} 25%, ${color2} 50%, ${color3} 50%, ${color3} 75%, ${color4} 75%, ${color4} 100%);`;
      } else {
        return "";
      }
    },
    headerImage() {
      if (this.event.concept) {
        return this.event.concept.images[0].url;
      }
      return "";
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    setRsvp() {
      this.showRsvpModal=false;
      this.showReminderModal = true
    },
    setZoomRsvp() {
      this.showZoomModal = false;
      this.showSyncCalendarForZoom = true
    }
  },
};
</script>
<style lang="scss" scoped>
.rsvp-container {
  .rsvp-event {
    background-color: #fff;
    max-width: 1520px;
    margin: 80px auto 80px;
    border-radius: 20px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    overflow: hidden;
    background-color: #fff;
    .rsvp-event-header {
      height: 430px;

      background-repeat: no-repeat;
      background-size: cover;
      background-position: center 60%;
    }
    &-overview {
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
            padding: 8px;
          }
          &-title {
            width: 150px;
            padding: 10px 24px;
          }
        }
      }
    }
    &-guid {
      background-color: rgba(#57f2c3, 0.23);
      padding: 60px 135px;
    }
    &-timeline {
      padding: 60px 135px;
      &-day {
        line-height: 1.5em;
        width: 100%;
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
  .rsvp-footer {
    height: 128px;
    background-color: white;
    &-content {
      max-width: 1520px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
    .seperator {
      display: inline-block;
      border-left: solid 1px #050505;
      height: 2rem;
      margin-top: 1rem;
    }
    .rsvp-btn {
      min-width: 280px;
      margin-left: 30px;
    }

    .virtual-btn {
      border: solid 1px #f51355;
      margin-left: 30px;
    }
  }
}


</style>