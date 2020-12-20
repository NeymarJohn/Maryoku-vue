<template>
  <div>
    <div class="rsvp-campaign white-card">
      <div class="p-50">
        <div class="font-size-30 font-bold-extra mb-50" v-if="campaignData.campaignStatus != 'STARTED'">
          Get everyone to RSVP
        </div>
        <div class="cover-preview">
          <img :src="campaignData.coverImage" class="mr-10" />
          <label for="cover">
            <md-button class="md-button md-red maryoku-btn md-theme-default change-cover-btn" @click="chooseFiles">
              <img :src="`${$iconURL}Campaign/Group 2344.svg`" class="mr-10" style="width: 20px" />Change Cover(Size
              1200 * 400)
            </md-button>
          </label>
          <input
            style="display: none"
            id="coverImage"
            name="attachment"
            type="file"
            multiple="multiple"
            @change="onFileChange"
          />
        </div>
        <div class="preview-logo p-40 d-flex align-center" v-if="campaignData.logoUrl">
          <img :src="campaignData.logoUrl" style="max-width: 200px" />
          <md-switch class="large-switch below-label" v-model="showLogo">Hide logo</md-switch>
        </div>
        <div class="font-size-30 font-bold mt-20">
          Hello
          <span class="text-transform-capitalize">{{ user.companyName ? user.companyName : user.currentTenant }}</span>
          <span class="text-transform-capitalize">{{ event.guestType || "Employee" }}</span
          >!
        </div>
        <div class="font-size-20 mt-50">YOU ARE INVITED TO A</div>
        <title-editor
          :defaultValue="campaignTitle"
          :key="campaignTitle"
          @change="changeTitle"
          class="mt-40 mb-30"
        ></title-editor>

        <maryoku-textarea
          v-model="campaignData.description"
          :placeholder="`Hey, you've been invited to ${event.title} on ${$dateUtil.formatScheduleDay(
            event.eventStartMillis,
            'dddd, MMMM D, YYYY',
          )} at ${event.location}. I can hardly wait to see you, please RSVP  by ${$dateUtil.formatScheduleDay(
            event.eventStartMillis,
            'dddd, MMMM D, YYYY',
          )}, so I'll know you feel the same way :)`"
        ></maryoku-textarea>
        <rsvp-event-info-panel class="mt-60" :event="event"></rsvp-event-info-panel>
        <div>
          <div>
            <rsvp-venue-carousel :defaultImages="images" :event="event" @change="changeImage"></rsvp-venue-carousel>
          </div>
        </div>
      </div>
      <div class="p-40 position-relative">
        <div
          class="rsvp-event-guid-background"
          v-if="event.concept && event.concept.colors[0]"
          :style="`background-color:${event.concept.colors[0].color}`"
        ></div>
        <div class="rsvp-event-guid-background" v-else :style="`background-color:#D5FCF3;opacity:1;`"></div>
        <div class="rsvp-event-guid md-layout">
          <div class="md-layout-item md-size-50 md-small-size-50">
            <div class="font-size-30 font-bold-extra mb-30 d-flex">
              <img
                :src="
                  campaignData.visibleSettings && campaignData.visibleSettings.showWearingGuide
                    ? `${$iconURL}RSVP/wear.svg`
                    : `${$iconURL}RSVP/wear-gray.svg`
                "
                style="height: 43px; z-index: 1"
              />
              <span
                class="text-transform-uppercase font-size-26 p-10 text-ellipse"
                :class="{
                  'color-gray': !campaignData.visibleSettings || !campaignData.visibleSettings.showWearingGuide,
                }"
                style="z-index: 1"
                >WHAT SHOULD I WEAR?</span
              >
              <md-switch
                v-model="campaignData.visibleSettings.showWearingGuide"
                class="ml-10 md-switch below-label large-switch"
              >
                <span class="color-black font-regular">Hide</span>
              </md-switch>
            </div>
            <maryoku-textarea
              placeholder="Give your guests details about the expected dress code"
              v-model="campaignData.additionalData.wearingGuide"
              :disabled="!campaignData.visibleSettings.showWearingGuide"
            ></maryoku-textarea>
          </div>
          <div class="md-layout-item md-size-50 md-small-size-50">
            <div class="font-size-30 font-bold-extra mb-30 d-flex">
              <img
                :src="
                  campaignData.visibleSettings.showKnowledge
                    ? `${$iconURL}RSVP/lamp.svg`
                    : `${$iconURL}RSVP/lamp-gray.svg`
                "
                style="height: 43px; z-index: 1"
              />
              <span
                class="text-transform-uppercase font-size-26 p-10 text-ellipse"
                :class="{
                  'color-gray': !campaignData.visibleSettings.showKnowledge,
                }"
                style="z-index: 1"
                >What should I Know?</span
              >

              <md-switch
                v-model="campaignData.visibleSettings.showKnowledge"
                class="ml-10 md-switch below-label large-switch"
              >
                <span class="color-black font-regular">Hide</span>
              </md-switch>
            </div>
            <maryoku-textarea
              placeholder="Give your guests any information you find relevant"
              v-model="campaignData.additionalData.knowledge"
              :disabled="!campaignData.visibleSettings.showKnowledge"
            ></maryoku-textarea>
          </div>
        </div>
      </div>
      <rsvp-timeline-panel
        class="p-50"
        :canHide="true"
        :visible="campaignData.visibleSettings.showTimeline"
        @changeVisibility="setVisibleTimeline"
      ></rsvp-timeline-panel>
    </div>
    <div class="p-50 pt-0 mt-40 white-card">
      <div class="font-size-30 font-bold-extra mb-30">
        <img :src="`${$iconURL}Campaign/Group+9235.svg`" class="mr-10" />
        Digital Participation
      </div>
      <md-checkbox v-model="campaignData.allowOnline">
        <span class="font-bold">Allow digital participation</span>
      </md-checkbox>
      <br />
      <div class="d-flex align-start" v-if="campaignData.allowOnline">
        <img class="ml-10 mr-20" style="margin-top: -10px" :src="`${$iconURL}Campaign/enter-gray.svg`" />
        <div class="width-50">
          <div class="font-bold">Paste link to video communication</div>
          <maryoku-input
            v-model="campaignData.additionalData.zoomlink"
            placeholder="Paste Zoom link here..."
            fieldName="link"
          ></maryoku-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MaryokuTextarea from "@/components/Inputs/MaryokuTextarea";
import { MaryokuInput } from "@/components";
import RsvpVenueCarousel from "@/pages/app/RSVP/RSVPVenueCarousel.vue";
import RsvpEventInfoPanel from "@/pages/app/RSVP/RSVPEventInfoPanel.vue";
import TitleEditor from "./components/TitleEditor";
import RsvpTimelinePanel from "@/pages/app/RSVP/RSVPTimelinePanel.vue";

import { getBase64 } from "@/utils/file.util";
import swal from "sweetalert2";

export default {
  components: {
    MaryokuTextarea,
    MaryokuInput,
    RsvpVenueCarousel,
    RsvpEventInfoPanel,
    TitleEditor,
    RsvpTimelinePanel,
  },
  props: {
    info: {
      type: Object,
      default: {},
    },
    defaultData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      coverImage: "",
      logoImage: "https://static-maryoku.s3.amazonaws.com/storage/icons/RSVP/ms-icon.png",
      showLogo: true,
      content: "",
      originContent: {},
      editingContent: {
        title: "",
        description: "",
        coverImage: "",
        campaignStatus: "EDITING",
        allowOnline: false,
        visibleSettings: {
          showWearingGuide: true,
          showKnowledge: true,
          showTimeline: true,
        },
        additionalData: {
          wearingGuide: "",
          knowledge: "",
          zoomlink: "",
        },
      },
    };
  },
  created() {
    if (this.$store.state.campaign.RSVP) {
      this.editingContent = this.$store.state.campaign.RSVP;
      this.editingContent.coverImage = this.event.concept
        ? this.event.concept.images[0].url
        : `${this.$storageURL}Campaign Images/RSVP2-middle.png`;
    } else {
      this.editingContent.title = this.info.conceptName;
      this.editingContent.coverImage = this.event.concept
        ? this.event.concept.images[0].url
        : `${this.$storageURL}Campaign Images/RSVP2-middle.png`;
      this.$store.commit("campaign/setCampaign", {
        name: "RSVP",
        data: this.editingContent,
      });
    }
    this.$store.commit("campaign/setAttribute", {
      name: "RSVP",
      key: "companyName",
      value: this.user.companyName ? this.user.companyName : this.user.currentTenant,
    });
    this.originContent = Object.assign({}, this.editingContent);
  },
  computed: {
    event() {
      console.log(this.$store.state.event.eventData);
      return this.$store.state.event.eventData;
    },
    user() {
      return this.$store.state.auth.user;
    },
    campaignData() {
      return this.$store.state.campaign.RSVP;
    },
    campaignTitle() {
      return this.$store.state.campaign.RSVP ? this.$store.state.campaign.RSVP.title : "Event Name";
    },
    campaignDescription: {
      get() {
        return this.$store.state.campaign.RSVP ? this.$store.state.campaign.RSVP.description : "";
      },
      set(newValue) {
        this.$store.commit("campaign/setAttribute", { name: "RSVP", key: "description", value: newValue });
      },
    },
    images: {
      get() {
        return this.$store.state.campaign.RSVP.images;
      },
    },
  },
  methods: {
    saveData() {
      this.$store.commit("campaign/setCampaign", {
        name: "RSVP",
        data: this.editingContent,
      });
    },
    setDefault() {
      swal({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        showCancelButton: true,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Yes, revert it!",
        buttonsStyling: false,
      }).then((result) => {
        this.$store.dispatch("campaign/revertCampaign", "RSVP");
      });
    },
    chooseFiles() {
      document.getElementById("coverImage").click();
    },
    async onFileChange(event) {
      this.editingContent.coverImage = await getBase64(event.target.files[0]);
    },
    changeTitle(newTitle) {
      this.$store.commit("campaign/setAttribute", { name: "RSVP", key: "title", value: newTitle });
    },
    setVisibleTimeline(visibility) {
      this.editingContent.visibleSettings.showTimeline = visibility;
    },
    changeImage(images) {
      this.$store.commit("campaign/setAttribute", { name: "RSVP", key: "title", value: newTitle });
    },
  },
};
</script>
<style lang="scss" scoped>
.rsvp-campaign {
  .cover-preview {
    width: 100%;
    height: 350px;
    position: relative;
    overflow: hidden;
    border-radius: 30px;
    &:hover {
      .cover-preview::before {
        content: "";
        width: 100%;
        height: 100%;
        opacity: 0.52;
        background: #050505;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .change-cover-btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .md-switch {
    .md-switch-label {
      display: block;
      padding: 0;
    }
  }
  .rsvp-event-guid-background {
    position: absolute;
    opacity: 0.2;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
</style>
