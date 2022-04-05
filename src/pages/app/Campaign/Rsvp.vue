<template>
  <div>
    <div class="rsvp-campaign white-card">
      <div class="p-50">
        <div v-if="campaignData.campaignStatus != 'STARTED'" class="font-size-30 font-bold-extra mb-50">
          Get everyone to RSVP
        </div>
        <div class="cover-preview">
          <img :src="campaignData.coverImage || campaignData.defaultCoverImage" class="mr-10">
          <label for="cover">
            <md-button class="md-button md-red maryoku-btn md-theme-default change-cover-btn" @click="chooseFiles">
              <img :src="`${$iconURL}Campaign/Group 2344.svg`" class="mr-10" style="width: 20px">
              Change Cover(Size 1200 * 400)
            </md-button>
          </label>
          <input
            id="coverImage"
            style="display: none"
            name="attachment"
            type="file"
            multiple="multiple"
            @change="onFileChange"
          >
        </div>
        <div class="wrapper-change-logo">
          <div class="change-logo">
            <div class="over-logo-campaign">
              <input
                id="replace-logo"
                style="display: none"
                name="attachment"
                type="file"
                multiple="multiple"
                @change="onFileChangeLogo"
              >
              <div class="color-white font-bold font-size-16 button cursor-pointer" @click="replaceLogo">
                <img :src="`${$iconURL}RSVP/Group 2344.svg`" class="mr-10"> Replace
              </div>
            </div>
            <img class="logo" :src="logoUrl">
          </div>
          <md-switch v-model="showLogo" class="large-switch below-label">
            Hide logo
          </md-switch>
        </div>
        <div class="font-size-30 font-bold d-flex align-center">
          <title-editor
            :key="campaignData.additionalData.greetingWords"
            :default-value="campaignData.additionalData.greetingWords"
            class="mt-20 mb-10 font-bold-extra"
            @change="handleChangeAddtionalData('greetingWords', ...arguments)"
          />
        </div>
        <div class="font-size-20 mt-20">
          <title-editor
            :default-value="campaignData.additionalData.prefixEvent"
            @change="handleChangeAddtionalData('prefixEvent', ...arguments)"
          />
        </div>
        <title-editor
          :key="campaignTitle"
          :default-value="campaignTitle"
          class="mt-30 mb-30 font-size-60 font-bold-extra"
          @change="changeTitle"
        />

        <maryoku-textarea
          v-model="campaignData.description"
          :font-size="18"
          :placeholder="`Hey, you've been invited to ${event.title} on ${$dateUtil.formatScheduleDay(
            event.eventStartMillis,
            'dddd, MMMM D, YYYY',
          )} at ${event.location}. I can hardly wait to see you, please RSVP  by ${$dateUtil.formatScheduleDay(
            event.eventStartMillis,
            'dddd, MMMM D, YYYY',
          )}, so I'll know you feel the same way :)`"
        />
        <rsvp-event-info-panel class="mt-60" :event="event" :start-time="eventStartTime" />
        <div>
          <title-editor
            :default-value="campaignData.additionalData.carouselTitle"
            class="font-size-20 mb-20"
            @change="handleChangeAddtionalData('carouselTitle', ...arguments)"
          />
          <div>
            <rsvp-venue-carousel :default-images="images" :event="event" @change="changeImage" />
          </div>
        </div>
      </div>
      <div class="p-40 position-relative">
        <div
          v-if="event.concept && event.concept.colors[0]"
          class="rsvp-event-guid-background"
          :style="`background-color:${event.concept.colors[0].color}`"
        />
        <div v-else class="rsvp-event-guid-background" :style="`background-color:#D5FCF3;opacity:1;`" />
        <div class="rsvp-event-guid raw-rsvp">
          <div class="md-size-50 md-small-size-50">
            <div v-if="!isEditingWearing" class="font-size-30 font-bold-extra mb-30 d-flex" style="height: 52px">
              <img
                :src="
                  campaignData.visibleSettings && campaignData.visibleSettings.showWearingGuide
                    ? `${$iconURL}RSVP/wear.svg`
                    : `${$iconURL}RSVP/wear-gray.svg`
                "
                style="height: 43px; z-index: 1"
              >
              <span
                class="text-transform-uppercase font-size-26 p-10 text-ellipse"
                :class="{
                  'color-gray': !campaignData.visibleSettings || !campaignData.visibleSettings.showWearingGuide,
                }"
                style="z-index: 1"
              >
                {{ campaignData.additionalData.wearingGuideTitle }}
              </span>
              <div>
                <md-button
                  class="edit-btn md-red md-simple"
                  :disabled="!campaignData.visibleSettings.showWearingGuide"
                  @click="isEditingWearing = true"
                >
                  Edit
                </md-button>
              </div>
              <hide-switch
                v-model="campaignData.visibleSettings.showWearingGuide"
                class="ml-10"
                label=" "
              />
            </div>
            <div v-else class="mb-30 d-flex" style="height: 52px">
              <maryoku-input v-model="wearingTitleContent" class="flex-1" />
              <md-button class="md-simple md-red maryoku-btn" @click="isEditingWearing = false">
                Cancel
              </md-button>
              <md-button class="md-red maryoku-btn" @click="saveTitle('wearing')">
                Save
              </md-button>
            </div>
            <maryoku-textarea
              v-model="campaignData.additionalData.wearingGuide"
              placeholder="Give your guests details about the expected dress code"
              :disabled="!campaignData.visibleSettings.showWearingGuide"
            />
          </div>
          <div class="md-size-50 md-small-size-50">
            <div v-if="!isEditingKnowledge" class="font-size-30 font-bold-extra mb-30 d-flex" style="height: 52px">
              <img
                :src="
                  campaignData.visibleSettings.showKnowledge
                    ? `${$iconURL}RSVP/lamp.svg`
                    : `${$iconURL}RSVP/lamp-gray.svg`
                "
                style="height: 43px; z-index: 1"
              >
              <span
                class="text-transform-uppercase font-size-26 p-10 text-ellipse"
                :class="{
                  'color-gray': !campaignData.visibleSettings.showKnowledge,
                }"
                style="z-index: 1"
              >
                {{ campaignData.additionalData.knowledgeTitle }}
              </span>
              <div>
                <md-button
                  class="edit-btn md-red md-simple"
                  :disabled="!campaignData.visibleSettings.showKnowledge"
                  @click="isEditingKnowledge = true"
                >
                  Edit
                </md-button>
              </div>
              <hide-switch v-model="campaignData.visibleSettings.showKnowledge" class="ml-10" label=" " />
            </div>
            <div v-else class="mb-30 d-flex" style="height: 52px">
              <maryoku-input v-model="knowledgeTitleContent" class="flex-1" />
              <md-button class="md-simple md-red maryoku-btn" @click="isEditingKnowledge = false">
                Cancel
              </md-button>
              <md-button class="md-red maryoku-btn" @click="saveTitle('knowledge')">
                Save
              </md-button>
            </div>
            <maryoku-textarea
              v-model="campaignData.additionalData.knowledge"
              placeholder="Give your guests any information you find relevant"
              :disabled="!campaignData.visibleSettings.showKnowledge"
            />
          </div>
        </div>
      </div>
      <rsvp-timeline-panel
        class="p-50"
        :can-hide="true"
        :visible="campaignData.visibleSettings.showTimeline"
        @changeVisibility="setVisibleTimeline"
      />
    </div>
    <div class="p-50 pt-0 mt-40 white-card">
      <div class="font-size-30 font-bold-extra mb-30">
        <img :src="`${$iconURL}Campaign/Group+9235.svg`" class="mr-10">
        Digital Participation
      </div>
      <md-checkbox v-model="campaignData.allowOnline">
        <span class="font-bold">Allow digital participation</span>
      </md-checkbox>
      <br>
      <div v-if="campaignData.allowOnline" class="d-flex align-start">
        <img class="ml-10 mr-20" style="margin-top: -10px" :src="`${$iconURL}Campaign/enter-gray.svg`">
        <div class="width-50">
          <div class="font-bold">
            Paste link to video communication
          </div>
          <maryoku-input
            v-model="campaignData.additionalData.zoomlink"
            placeholder="Paste Zoom link here..."
            field-name="link"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions }     from "vuex";
import Swal               from "sweetalert2";
import MaryokuTextarea    from "@/components/Inputs/MaryokuTextarea";
import { MaryokuInput }   from "@/components";
import RsvpVenueCarousel  from "@/pages/app/RSVP/RSVPVenueCarousel.vue";
import RsvpEventInfoPanel from "@/pages/app/RSVP/RSVPEventInfoPanel.vue";
import TitleEditor        from "./components/TitleEditor";
import RsvpTimelinePanel  from "@/pages/app/RSVP/RSVPTimelinePanel.vue";
import HideSwitch         from "@/components/HideSwitch";
import { getBase64 }      from "@/utils/file.util";
import CalendarEvent      from "@/models/CalendarEvent";
import S3Service          from "@/services/s3.service";

export default {
  components: {
    MaryokuTextarea,
    MaryokuInput,
    RsvpVenueCarousel,
    RsvpEventInfoPanel,
    TitleEditor,
    RsvpTimelinePanel,
    HideSwitch,
  },
  props: {
    info: {
      type: Object,
      default: () => ({}),
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
      isEditingKnowledge: false,
      isEditingWearing: false,
      wearingTitleContent: "WHAT SHOULD I WEAR?",
      knowledgeTitleContent: "WHAT SHOULD I KNOW?",
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
          greetingWords: "",
          wearingGuide: "",
          wearingGuideTitle: "WHAT SHOULD I WEAR?",
          knowledge: "",
          knowledgeTitle: "WHAT SHOULD I KNOW?",
          zoomlink: "",
        },
      },
    };
  },
  computed: {
    event() {
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
    timelineDates() {
      var timelines = {};
      return this.event.timelineDates;
    },
    eventStartTime() {
      if (this.timelineDates[0]) {
        return Number(this.timelineDates[0].timelineItems[0] ? this.timelineDates[0].timelineItems[0].startTime : 0);
      }
      return 0;
    },
    logoUrl() {
      return this.campaignData.logoUrl || "static/img/Image%20199.png";
    },
  },
  created() {
    if (this.$store.state.campaign.RSVP) {
      this.editingContent = this.$store.state.campaign.RSVP;
      if (!this.editingContent.additionalData.greetingWords) {
        const greetingWords = `Hello ${this.user.companyName ? this.user.companyName : this.user.currentTenant} ${
          this.event.guestType || "Employee"
        }`;
        this.$store.commit("campaign/setAttribute", {
          name: "RSVP",
          key: "additionalData",
          value: { ...this.editingContent.additionalData, greetingWords },
        });
      }
      if (!this.editingContent.additionalData.prefixEvent) {
        const prefixEvent = "YOU ARE INVITED TO";
        this.$store.commit("campaign/setAttribute", {
          name: "RSVP",
          key: "additionalData",
          value: { ...this.editingContent.additionalData, prefixEvent },
        });
      }
      if (!this.editingContent.additionalData.carouselTitle) {
        const carouselTitle = "ADD YOUR TITLE HERE";
        this.$store.commit("campaign/setAttribute", {
          name: "RSVP",
          key: "additionalData",
          value: { ...this.editingContent.additionalData, carouselTitle },
        });
      }
      let coverImage = this.editingContent.coverImage;
      if (!coverImage && this.event.concept) {
        coverImage = this.event.concept.images[0].url;
        this.$store.commit("campaign/setAttribute", {
          name: "RSVP",
          key: "coverImage",
          value: coverImage,
        });
      }
    } else {
      this.editingContent.title = this.info.conceptName;
      this.editingContent.coverImage = this.event.concept
        ? this.event.concept.images[0].url
        : `${this.$storageURL}Campaign Images/RSVP2-middle.png`;
      this.editingContent.additionalData.greetingWords = `Hello ${
        user.companyName ? user.companyName : user.currentTenant
      }} ${event.guestType || "Employee"}`;
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
  methods: {
    ...mapActions("campaign", ["saveCampaign"]),
    saveTitle(type) {
      if (type === "knowledge") {
        this.campaignData.additionalData.knowledgeTitle = this.knowledgeTitleContent;
        this.isEditingKnowledge = false;
      } else if (type === "wearing") {
        this.campaignData.additionalData.wearingGuideTitle = this.wearingTitleContent;
        this.isEditingWearing = false;
      }
    },
    saveData() {
      this.$store.commit("campaign/setCampaign", {
        name: "RSVP",
        data: this.editingContent,
      });
    },
    setDefault() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
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
      const coverImageData = await getBase64(event.target.files[0]);
      this.$store.commit("campaign/setAttribute", { name: "RSVP", key: "coverImage", value: coverImageData });
    },
    async onFileChangeLogo(event) {
      const file = event.target.files[0];
      await S3Service.fileUpload(file, file.name, `campaigns/RSVP/${this.event.id}`).then((logoUrl) => {
        this.saveCampaign({ id: this.campaignData.id, logoUrl }).then(() => {
          this.$store.commit("campaign/setAttribute", { name: "SAVING_DATE", key: "logoUrl", value: logoUrl });
          this.$store.commit("campaign/setAttribute", { name: "RSVP", key: "logoUrl", value: logoUrl });
          this.$store.commit("campaign/setAttribute", { name: "COMING_SOON", key: "logoUrl", value: logoUrl });
          this.$store.commit("campaign/setAttribute", { name: "FEEDBACK", key: "logoUrl", value: logoUrl });
        });
      });
    },
    changeTitle(newTitle) {
      this.$store.commit("campaign/setAttribute", { name: "SAVING_DATE", key: "title", value: newTitle });
      this.$store.commit("campaign/setAttribute", { name: "RSVP", key: "title", value: newTitle });
      this.$store.commit("campaign/setAttribute", { name: "COMING_SOON", key: "title", value: newTitle });
      this.$store.commit("campaign/setAttribute", { name: "FEEDBACK", key: "title", value: newTitle });
      this.$store
        .dispatch(
          "event/saveEventAction",
          new CalendarEvent({
            id: this.event.id,
            title: newTitle,
          }),
        )
        .then((result) => {});
    },
    handleChangeAddtionalData(key, value) {
      this.$store.commit("campaign/setAddtionalData", {
        name: "RSVP",
        key,
        value,
      });
    },
    setVisibleTimeline(visibility) {
      this.editingContent.visibleSettings.showTimeline = visibility;
    },
    changeImage(images) {
      this.$store.commit("campaign/setAttribute", { name: "RSVP", key: "images", value: images });
    },
    replaceLogo() {
      document.getElementById("replace-logo").click();
    }
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
  .wrapper-change-logo {
    display: flex;
    align-items: center;
    margin-top: 27px;

    .change-logo {
      width: 259px;
      height: 134px;
      margin-right: 27px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-radius: 3px;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

      .over-logo-campaign {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(5, 5, 5, 0.55);
        z-index: 900;
      }

      & img.logo {
        width: 178px;
        height: 99px;
        object-fit: contain;
      }
    }
  }
  .md-switch {
    .md-switch-label {
      display: block;
      padding: 0;
    }
  }
  .edit-btn {
    margin-top: 1em !important;
  }
  .rsvp-event-guid-background {
    position: absolute;
    opacity: 0.2;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .raw-rsvp {
    display        : flex;
    flex-direction : row;
    font-weight    : normal;
    flex-wrap      : wrap;
    margin-right: -25px;
    margin-left: -25px;
    & > div {
      width: calc(50% - 50px);
      margin-right: 25px;
      margin-left: 25px;
      @media(max-width: 992px){
        width: 100%;
      }
    }
  }
}
</style>
