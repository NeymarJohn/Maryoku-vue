<template>
  <modal>
    <template slot="header">
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div>
        <img :src="`${$iconURL}RSVP/Group+7946.svg`" class="mb-30" />
        <div class="font-size-30 font-bold mb-30">SEE YOU THERE SAM!</div>
        <div>
          <md-button
            class="md-simple maryoku-btn"
            :class="{ 'md-red': !showZoomLink, 'md-black': showZoomLink }"
            @click="showZoomLink = !showZoomLink"
          >
            Get Link To Zoom Event
            <md-icon v-if="!showZoomLink">keyboard_arrow_right</md-icon>
            <md-icon v-if="showZoomLink">keyboard_arrow_down</md-icon>
          </md-button>
          <div v-if="showZoomLink">
            <maryoku-input
              inputStyle="sharing"
              readonly
              class="sharelink"
              v-model="campaign.additionalData.zoomlink"
            ></maryoku-input>
          </div>
        </div>
        <div>
          <md-button
            class="md-simple maryoku-btn"
            :class="{ 'md-red': !showCalendar, 'md-black': showCalendar }"
            @click="showCalendar = !showCalendar"
          >
            Sync Your Calendar
            <md-icon v-if="!showCalendar">keyboard_arrow_right</md-icon>
            <md-icon v-if="showCalendar">keyboard_arrow_down</md-icon>
          </md-button>
          <div v-if="showCalendar">
            <div>Choose your email account:</div>
            <div class="mt-30">
              <md-radio v-model="emailAccount" class="mr-60" value="gmail"
                ><img :src="`${$iconURL}RSVP/Image+200.png`" style="margin-top: -10px"
              /></md-radio>
              <md-radio v-model="emailAccount" value="outlook"
                ><img :src="`${$iconURL}RSVP/Image+201.png`" style="margin-top: -15px"
              /></md-radio>
            </div>
            <md-button class="md-outlined md-simple md-red mt-20 sync_button">Sync</md-button>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer"> </template>
  </modal>
</template>
<script>
import { Modal, MaryokuInput } from "@/components";
export default {
  components: {
    Modal,
    MaryokuInput,
  },
  props: {
    screen: {
      type: Number,
      default: 1,
    },
    campaign: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log(this.campaign);
  },
  data() {
    return {
      showZoomLink: false,
      showCalendar: false,
      emailAccount: "outlook",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    setRsvpToZoom() {
      this.$emit("setRSVP");
    },
  },
};
</script>
<style lang="scss" scoped>
.sync_button {
  width: 250px;
  height: 50px;
  border: solid 1px #f51355;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}
</style>