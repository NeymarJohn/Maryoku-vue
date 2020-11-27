<template>
  <div class="rsvp-container">
    <div class="rsvp-event">
      <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
      <div class="rsvp-event-header" :style="`background-image: url('${campaign.coverImage}');`"></div>
      <div class="rsvp-event-overview" :style="`background-image:${campaign.coverImage}`">
        <div class="rsvp-event-overview-content">
          <div class="md-layout">
            <div class="rsvp-event-overview-content-customer md-layout-item md-size-100">
              <img v-if="campaign.logoUrl" :src="`${campaign.logoUrl}`" class="mb-40 logo-image" />
              <div class="font-size-40" style="margin-bottom: 100px">
                Hello {{ campaign.companyName }} {{ event.guestType || "Employee" }}!
              </div>
            </div>

            <div class="md-layout-item md-size-50 md-small-size-50">
              <div class="mb-20">You Are Invited To A</div>
              <div class="font-size-60 font-bold-extra mb-30">{{ campaign.title }}</div>
              <div class="word-break">
                {{ campaign.description }}
              </div>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-50">
              <rsvp-event-info-panel :event="event" :editable="false"></rsvp-event-info-panel>
            </div>
          </div>
          <!-- <div class="mb-50">
            <img :src="`${$iconURL}RSVP/Group+8056.svg`" />
          </div> -->
          <div>
            <div class="font-size-22 font-bold mb-10">Check out the venue</div>
            <rsvp-venue-carousel
              :editable="false"
              :event="event"
              :defaultImages="campaign.images"
            ></rsvp-venue-carousel>
          </div>
        </div>
      </div>
      <div class="rsvp-event-guid md-layout">
        <!-- <div class="md-layout-item md-size-10 md-small-size-10">
          <img :src="`${$iconURL}RSVP/Group+8056.svg`" style="margin-top: 40px" />
        </div> -->
        <div
          class="md-layout-item md-size-45 md-small-size-45"
          v-if="campaign.visibleSettings && campaign.visibleSettings.showWearingGuide"
        >
          <div class="font-size-30 font-bold-extra mb-30 d-flex">
            <img :src="`${$iconURL}RSVP/Path 3728.svg`" />
            <span style="padding-top: 10px; margin-left: 20px">WHAT SHOULD I WEAR?</span>
          </div>
          <div>
            {{ campaign.additionalData.wearingGuide }}
          </div>
        </div>
        <div
          class="md-layout-item md-size-45 md-small-size-45"
          v-if="campaign.visibleSettings && campaign.visibleSettings.showKnowledge"
        >
          <div class="font-size-30 font-bold-extra mb-30 d-flex">
            <img :src="`${$iconURL}RSVP/Path 2369.svg`" />
            <span style="padding-top: 10px; margin-left: 20px">WHAT SHOULD I KNOW?</span>
          </div>
          <div>
            {{ campaign.additionalData.knowledge }}
          </div>
        </div>
      </div>
      <div
        class="rsvp-event-timeline md-layout"
        v-if="campaign.visibleSettings && campaign.visibleSettings.showTimeline"
      >
        <div
          class="md-layout-item md-size-100 md-small-size-100 text-transform-uppercase font-size-30 font-bold-extra mb-50"
        >
          sneaky peak to the agenda
        </div>
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
      </div>
    </div>
    <div class="text-center mb-50">
      Provided by
      <img :src="`${$iconURL}RSVP/maryoku - logo dark@2x.png`" />
    </div>
    <div class="rsvp-footer">
      <div class="rsvp-footer-content">
        <div>
          <md-button @click="scrollToTop" class="md-button md-simple md-just-icon md-theme-default scroll-top-button">
            <img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17" />
          </md-button>
          <md-button
            class="md-button md-red md-just-icon md-theme-default scroll-top-button"
            @click="showSharingModal = true"
          >
            <img :src="`${$iconURL}RSVP/sharing-white.svg`" width="17" />
          </md-button>
        </div>
        <div>
          <md-button class="md-simple md-button md-black maryoku-btn" @click="reject">
            <span class="font-size-20">I Can't make it</span>
          </md-button>
          <span class="seperator"></span>
          <md-button class="md-simple md-button md-black maryoku-btn">
            <span class="font-size-20">I Need To Think About It</span>
          </md-button>
          <md-button
            v-if="campaign.additionalData.zoomlink"
            @click="showZoomModal = true"
            class="md-simple md-button md-black maryoku-btn virtual-btn"
          >
            <span class="font-size-20">Virtual Participation</span>
          </md-button>
          <md-button @click="showRsvpModal = true" class="md-button md-red maryoku-btn rsvp-btn">
            <span class="font-size-20">RSVP Now</span>
          </md-button>
        </div>
      </div>
    </div>
    <rsvp-information-modal
      v-if="showRsvpModal"
      :event="event"
      @close="showRsvpModal = false"
      @setRsvp="setRsvp"
    ></rsvp-information-modal>
    <setting-reminder-modal
      v-if="showReminderModal"
      @close="showReminderModal = false"
      :campaign="campaign"
    ></setting-reminder-modal>
    <join-zoom-modal
      v-if="showZoomModal"
      @close="showZoomModal = false"
      @setRsvp="setZoomRsvp"
      :campaign="campaign"
    ></join-zoom-modal>
    <sync-calendar-modal
      v-if="showSyncCalendarForZoom"
      @close="showSyncCalendarForZoom = false"
      :campaign="campaign"
    ></sync-calendar-modal>
    <social-sharing-modal v-if="showSharingModal" @cancel="showSharingModal = false"></social-sharing-modal>
  </div>
</template>
<script>
import RsvpTimelineItem from "./RSVPTimelineItem";
import Calendar from "@/models/Calendar";
import Rsvp from "@/models/Rsvp";
import RsvpRequest from "@/models/RsvpRequest";
import Campaign from "@/models/Campaign";
import CalendarEvent from "@/models/CalendarEvent";
import _ from "underscore";
import RsvpInformationModal from "@/components/Modals/RSVP/InformationModal";
import SettingReminderModal from "@/components/Modals/RSVP/SettingReminderModal";
import JoinZoomModal from "@/components/Modals/RSVP/JoinZoomModal";
import SyncCalendarModal from "@/components/Modals/RSVP/SyncCalendarModal";
import RsvpVenueCarousel from "./RSVPVenueCarousel";
import RsvpEventInfoPanel from "@/pages/app/RSVP/RSVPEventInfoPanel.vue";
import SocialSharingModal from "@/components/Modals/SocialSharingModal";
import { mapActions, mapGetters } from "vuex";
import swal from "sweetalert2";

export default {
  components: {
    RsvpTimelineItem,
    RsvpInformationModal,
    SettingReminderModal,
    JoinZoomModal,
    SyncCalendarModal,
    RsvpVenueCarousel,
    RsvpEventInfoPanel,
    SocialSharingModal,
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
      showSyncCalendarForZoom: false,
      campaign: {},
      rsvpRequest: null,
      showSharingModal: false,
    };
  },
  created() {
    const rsvpRequestId = this.$route.params.rsvpRequestId;
    const rsvpRequest = new RsvpRequest({ id: rsvpRequest });

    RsvpRequest.find(rsvpRequestId).then((rsvpRequest) => {
      console.log(rsvpRequest);
      this.rsvpRequest = rsvpRequest;
      this.event = rsvpRequest.event;
      this.campaign = rsvpRequest.campaign;
      this.isLoading = false;
      if (!this.rsvpRequest.isOpened) {
        new RsvpRequest({ id: rsvpRequest.id, isOpened: true }).save();
      }
    });
    this.$root.$on("setRsvp", (rsvpData) => {
      rsvpData.attendingOption = "PERSON";
      rsvpData.rsvpStatus = "AGREED";
      rsvpData.invitedEmail = this.rsvpRequest.email;
      rsvpData.rsvpRequest = new RsvpRequest({ id: this.rsvpRequest.id });
      rsvpData.event = new CalendarEvent({ id: this.event.id });
      new Rsvp(rsvpData).save().then((requestedRSVP) => {
        console.log(requestedRSVP);
        swal({
          title: `Successed!`,
          buttonsStyling: false,
          confirmButtonClass: "md-button md-success",
        });
        this.showRsvpModal = false;
      });
    });
  },
  computed: {
    backgroundImage() {
      if (this.event.concept) {
        const color1 = this.event.concept.colors[0].color;
        const color2 = this.event.concept.colors[1].color;
        const color3 = this.event.concept.colors[2].color;
        const color4 = this.event.concept.colors[3].color;
        console.log(
          `linear-gradient(${color1} 25%, ${color2} 25%, ${color2} 50%, ${color3} 50%, ${color3} 75%, ${color4} 75%, ${color4} 100%);`,
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
    ...mapActions("campaign", ["getCampaigns"]),
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    setRsvp() {
      this.showRsvpModal = false;
      this.showReminderModal = true;
    },
    setZoomRsvp() {
      this.showZoomModal = false;
      this.showSyncCalendarForZoom = true;
    },
    reject() {
      new Rsvp({
        name: "test",
        email: "email@gmail.com",
        invitedEmail: "email@gmail.com",
        campaign: new Campaign({ id: this.campaign.id }),
        rsvpStatus: "REJECTED",
      })
        .save()
        .then((res) => {
          console.log(res);
        });
    },
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
    .logo-image {
      max-width: 150px;
      max-height: 150px;
    }
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
