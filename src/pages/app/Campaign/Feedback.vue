<template>
  <div class="white-card feedback-campaign">
    <div class="p-50">
      <div class="font-size-30 font-bold-extra mb-50">Create ‘Save The Date’ Campaign</div>
      <hr />
      <div class="d-flex mt-70 mb-40">
        <img :src="`${$iconURL}Campaign/group-9380.svg`" class="mr-20" />
        <div class="ml-20">
          <div class="font-size-40 font-bold line-height-1 mb-20">It was great seeing you!</div>
          <div class="font-size-22 line-height-1">{{info.conceptName}}</div>
          <!-- <title-editor :value="info.conceptName" @change="changeTitle" class="mt-40"></title-editor> -->
        </div>
      </div>
      <maryoku-textarea :placeholder="placeHolder" v-model="comment"></maryoku-textarea>
    </div>
    <feedback-image-carousel class="p-50" :images="images" @addImage="addNewImage"></feedback-image-carousel>
    <div class="p-50">
      <div class="d-flex align-center font-bold">
        Allow guests to upload photos form the event
        <md-switch class="large-switch" v-model="allowUploadPhoto"></md-switch>
      </div>
      <div class="font-size-22 font-bold line-height-2">Download files related to the event</div>
      <div class="mb-20">Like presentation</div>
      <md-button class="md-simple edit-btn md-red">
        <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10" />Upload File
      </md-button>
      <hr class="mt-50 mb-70" />
      <div class="share-panel">
        <div class="d-flex mb-60 align-center">
          <img :src="`${$iconURL}Campaign/group-9386.svg`" class="mr-20" />
          <div>
            <div class="font-size-30 font-bold line-height-2">share event participation</div>
            <div>(Include photos & details of the event)</div>
          </div>
          <hide-switch v-model="showSharingOption" label="sharing option"></hide-switch>
        </div>
        <sharing-button-group class="mb-50"></sharing-button-group>
      </div>
      <hr />
      <div>
        <div class="font-size-30 font-bold line-height-1 d-flex align-center">
          <img :src="`${$iconURL}Campaign/group-7321.svg`" class="mr-20" />
          We'd love to get your feedback
          <hide-switch v-model="showFeedback" label="feedback section"></hide-switch>
        </div>
        <div>
          <feedback-question
            v-for="(question, index) in feedBack"
            :key="index"
            :feedbackData="question"
          ></feedback-question>
        </div>
      </div>
      <div class="mt-60">
        <md-button class="md-simple edit-btn md-red">
          <img :src="`${$iconURL}Campaign/Group 9327.svg`" class="mr-20" />Feel free to add more questions
        </md-button>
      </div>
    </div>
    <hr />
  </div>
</template>
<script>
import MaryokuTextarea from "@/components/Inputs/MaryokuTextarea";
import FeedbackImageCarousel from "./components/FeedbackImageCarousel";
import SharingButtonGroup from "./components/SharingButtonGroup";
import FeedbackQuestion from "./components/FeedbackQuestion";
import TitleEditor from "./components/TitleEditor";
import HideSwitch from "@/components/HideSwitch";
export default {
  components: {
    MaryokuTextarea,
    FeedbackImageCarousel,
    SharingButtonGroup,
    FeedbackQuestion,
    TitleEditor,
    HideSwitch,
  },
  props: {
    info: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      allowUploadPhoto: true,
      placeHolder: "",
      showFeedback: true,
      showSharingOption: true,
      comment: "",
      feedBack: [
        {
          question: "What did you like or dislike about this event?",
          showQuestion: true,
          rank: 0,
          icon: "",
        },
        {
          question: "What did you think of the venue?",
          showQuestion: true,
          rank: 0,
          icon: "venuerental",
        },
        {
          question: "How did you like the catering service?",
          showQuestion: true,
          rank: 0,
          icon: "foodandbeverage",
        },
        {
          question: "Did you enjoy the activity?",
          showQuestion: true,
          rank: 0,
          icon: "decor",
        },
      ],
      images: [
        {
          src: `${this.$iconURL}RSVP/Image+81.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/shutterstock_444402799_thumb.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/Image+83.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/Image+84.jpg`,
        },
      ],
    };
  },
  created() {
    this.placeHolder = `Thank you so much for attending! We are so glad you could join us.
    Please take a moment to help us improve future events by taking a brief survey. 
    Your feedback is extremely valuable to our ongoing effort to offer great ${
      this.event.guestType || "employee"
    } experience.

    If you have photos, documents or other event materials that you want to share, you can upload them here.
    All materials is also available for download from this page.

    We look forward to seeing you again soon!
    `;
    this.placeHolder = this.placeHolder.trim();
    // this.comment = this.placeHolder.trim().replace(/  /g, '');
    this.placeHolder = this.placeHolder.trim().replace(/  /g, "");
  },
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
  },
  methods: {
    addNewImage(image) {
      this.images.unshift({ src: image });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
