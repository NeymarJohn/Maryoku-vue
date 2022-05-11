<template>
  <div>
    <div class="rsvp-campaign white-card">
      <div class="p-50">
        <div v-if="campaignData.campaignStatus != 'STARTED'" class="font-size-30 font-bold-extra mb-50">
          Get everyone to RSVP
        </div>
        <div class="cover-preview">
          <img v-if="campaignData.coverImage" :src="campaignData.coverImage" class="mr-10">
          <concept-image-block
            v-else-if="concept && concept.images && concept.images.length"
            class="hidden"
            :images="concept.images"
            :colors="concept.colors"
            border="no-border"
          />
          <img v-else :src="campaignData.defaultCoverImage || defaultCoverImage" alt="default cover image">
          <change-cover-button @click="handleChangeCoverImage">
            Change Cover(Size 1200 * 400)
          </change-cover-button>
        </div>
        <campaign-logo
          :logo-url="campaignLogoUrl"
          :show-logo="campaignVisibleSettings.showLogo"
          @change-logo="handleChangeCampaignLogo"
          @change-show-logo="handleChangeCampaignVisibleSettings('showLogo', $event)"
        />
        <div class="font-size-30 font-bold d-flex align-center">
          <title-editor
            :key="campaignData.additionalData.greetingWords"
            :default-value="campaignData.additionalData.greetingWords"
            class="mt-20 mb-10 font-bold-extra"
            @change="handleChangeAdditionalData('greetingWords', ...arguments)"
          />
        </div>
        <div class="font-size-20 mt-20">
          <title-editor
            :default-value="campaignData.additionalData.prefixEvent"
            @change="handleChangeAdditionalData('prefixEvent', ...arguments)"
          />
        </div>
        <title-editor
          :key="campaignTitle"
          :default-value="campaignTitle"
          class="mt-30 mb-30 font-size-60 font-bold-extra"
          @change="handleChangeCampaignTitle"
        />

        <maryoku-textarea
          :value="campaignData.description"
          :font-size="18"
          :placeholder="`Hey, you've been invited to ${event.title} on ${$dateUtil.formatScheduleDay(
            event.eventStartMillis,
            'dddd, MMMM D, YYYY',
          )} at ${event.location}. I can hardly wait to see you, please RSVP  by ${$dateUtil.formatScheduleDay(
            event.eventStartMillis,
            'dddd, MMMM D, YYYY',
          )}, so I'll know you feel the same way :)`"
          @input="handleChangeCampaignDescription"
        />
        <rsvp-event-info-panel class="mt-60" :event="event" :start-time="eventStartTime" />
        <div>
          <title-editor
            :default-value="campaignData.additionalData.carouselTitle"
            class="font-size-20 mb-20"
            @change="handleChangeAdditionalData('carouselTitle', ...arguments)"
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
                  campaignVisibleSettings && campaignVisibleSettings.showWearingGuide
                    ? `${$iconURL}RSVP/wear.svg`
                    : `${$iconURL}RSVP/wear-gray.svg`
                "
                style="height: 43px; z-index: 1"
              >
              <span
                class="text-transform-uppercase font-size-26 p-10 text-ellipse"
                :class="{
                  'color-gray': !campaignVisibleSettings || !campaignVisibleSettings.showWearingGuide,
                }"
                style="z-index: 1"
              >
                {{ campaignData.additionalData.wearingGuideTitle }}
              </span>
              <div>
                <md-button
                  class="edit-btn md-red md-simple"
                  :disabled="!campaignVisibleSettings.showWearingGuide"
                  @click="isEditingWearing = true"
                >
                  Edit
                </md-button>
              </div>
              <hide-switch
                label=" "
                class="ml-10"
                :value="campaignVisibleSettings.showWearingGuide"
                @input="handleChangeCampaignVisibleSettings('showWearingGuide', $event)"
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
              :value="campaignData.additionalData.wearingGuide"
              placeholder="Give your guests details about the expected dress code"
              :disabled="!campaignVisibleSettings.showWearingGuide"
              @input="handleChangeAdditionalData('wearingGuide', ...arguments)"
            />
          </div>
          <div class="md-size-50 md-small-size-50">
            <div v-if="!isEditingKnowledge" class="font-size-30 font-bold-extra mb-30 d-flex" style="height: 52px">
              <img
                :src="
                  campaignVisibleSettings.showKnowledge
                    ? `${$iconURL}RSVP/lamp.svg`
                    : `${$iconURL}RSVP/lamp-gray.svg`
                "
                style="height: 43px; z-index: 1"
              >
              <span
                class="text-transform-uppercase font-size-26 p-10 text-ellipse"
                :class="{
                  'color-gray': !campaignVisibleSettings.showKnowledge,
                }"
                style="z-index: 1"
              >
                {{ campaignData.additionalData.knowledgeTitle }}
              </span>
              <div>
                <md-button
                  class="edit-btn md-red md-simple"
                  :disabled="!campaignVisibleSettings.showKnowledge"
                  @click="isEditingKnowledge = true"
                >
                  Edit
                </md-button>
              </div>
              <hide-switch
                label=" "
                class="ml-10"
                :value="campaignVisibleSettings.showKnowledge"
                @input="handleChangeCampaignVisibleSettings('showKnowledge', $event)"
              />
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
              :value="campaignData.additionalData.knowledge"
              placeholder="Give your guests any information you find relevant"
              :disabled="!campaignVisibleSettings.showKnowledge"
              @input="handleChangeAdditionalData('knowledge', ...arguments)"
            />
          </div>
        </div>
      </div>
      <rsvp-timeline-panel
        class="p-50"
        :can-hide="true"
        :visible="campaignVisibleSettings.showTimeline &&
          (campaignData.campaignStatus === 'SCHEDULED' || campaignData.campaignStatus === 'ISSUED' || campaignData.campaignStatus === 'STARTED')"
        @changeVisibility="setVisibleTimeline"
      />
    </div>
    <div class="p-50 pt-0 mt-40 white-card">
      <div class="font-size-30 font-bold-extra mb-30">
        <img :src="`${$iconURL}Campaign/Group+9235.svg`" class="mr-10">
        Digital Participation
      </div>
      <md-checkbox :value="campaignData.allowOnline" @input="handleChangeCampaignAllowOnline">
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
            field-name="link"
            placeholder="Paste Zoom link here..."
            :value="campaignData.additionalData.zoomlink"
            @input="handleChangeAdditionalData('zoomlink', ...arguments)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// core
import { mapActions } from "vuex";
import Swal from "sweetalert2";

// components
// global
import MaryokuTextarea   from "@/components/Inputs/MaryokuTextarea";
import { MaryokuInput }  from "@/components";
import HideSwitch        from "@/components/HideSwitch";
import ConceptImageBlock from "@/components/ConceptImageBlock";
import ChangeCoverButton from "@/components/Button/ChangeCover";

// local
import TitleEditor       from "./components/TitleEditor";

// pages
import RsvpVenueCarousel  from "@/pages/app/RSVP/RSVPVenueCarousel.vue";
import RsvpEventInfoPanel from "@/pages/app/RSVP/RSVPEventInfoPanel";
import RsvpTimelinePanel  from "@/pages/app/RSVP/RSVPTimelinePanel.vue";
import CampaignLogo       from "@/pages/app/Campaign/components/CampaignLogo/index.vue";

// dependencies
import { getBase64 } from "@/utils/file.util";
import CalendarEvent from "@/models/CalendarEvent";

export default {
  components: {
    // pages
    RsvpVenueCarousel,
    RsvpEventInfoPanel,
    RsvpTimelinePanel,
    CampaignLogo,

    // components
    MaryokuTextarea,
    MaryokuInput,
    TitleEditor,
    HideSwitch,
    ConceptImageBlock,
    ChangeCoverButton,
  },
  props: {
    info: {
      type    : Object,
      default : () => ({}),
    },
    defaultData: {
      type    : Object,
      default : () => ({}),
    },
  },
  data() {
    return {
      defaultCoverImage  : "https://static-maryoku.s3.amazonaws.com/storage/Campaign+Headers/rsvp2.png",
      coverImage         : "",
      logoImage          : "https://static-maryoku.s3.amazonaws.com/storage/icons/RSVP/ms-icon.png",
      content            : "",
      originContent      : {},
      isEditingKnowledge : false,
      isEditingWearing   : false,
      wearingTitleContent   : "WHAT SHOULD I WEAR?",
      knowledgeTitleContent : "WHAT SHOULD I KNOW?",
      editingContent: {
        title          : "",
        description    : "",
        coverImage     : "",
        campaignStatus : "EDITING",
        allowOnline    : false,
        visibleSettings: {
          showLogo         : true,
          showWearingGuide : true,
          showKnowledge    : true,
          showTimeline     : true,
        },
        additionalData: {
          greetingWords     : "",
          wearingGuide      : "",
          wearingGuideTitle : "WHAT SHOULD I WEAR?",
          knowledge         : "",
          knowledgeTitle    : "WHAT SHOULD I KNOW?",
          zoomlink          : "",
        },
      },
    };
  },
  computed: {
    event() {
      return this.$store.state.event.eventData || {};
    },
    concept() {
      return this.event.concept || {};
    },
    user() {
      return this.$store.state.auth.user;
    },
    campaign() {
      return this.$store.state.campaign;
    },
    campaignData() {
      return this.$store.state.campaign.RSVP || {};
    },
    campaignTitle() {
      return this.campaignData.title || this.event.title;
    },
    campaignLogoUrl() {
      return this.campaignData.logoUrl || "";
    },
    campaignVisibleSettings() {
      return this.campaignData.visibleSettings || {};
    },
    campaignDescription: {
      get() {
        return this.campaignData.description || "";
      },
      set(newValue) {
        this.$store.commit("campaign/setAttribute", { name: "RSVP", key: "description", value: newValue });
      },
    },
    images: {
      get() {
        return this.campaignData.images;
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
  },
  created() {
    if (this.campaignData) {
      this.editingContent = this.campaignData;
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
    setCampaignAttribute(attribute) {
      return this.$store.commit("campaign/setAttribute", attribute);
    },
    saveTitle(type) {
      switch (type) {
        case "knowledge": {
          this.campaignData.additionalData.knowledgeTitle = this.knowledgeTitleContent;
          this.isEditingKnowledge = false;
          break;
        }
        case "wearing": {
          this.campaignData.additionalData.wearingGuideTitle = this.wearingTitleContent;
          this.isEditingWearing = false;
          break;
        }
      }
    },
    saveData(data = this.editingContent) {
      return this.setCampaignAttribute({ name: "RSVP", data });
    },
    setDefault() {
      Swal.fire({
        title              : "Are you sure?",
        text               : "You won't be able to revert this!",
        confirmButtonClass : "md-button md-success btn-fill",
        cancelButtonClass  : "md-button md-danger btn-fill",
        confirmButtonText  : "Yes, revert it!",
        showCancelButton   : true,
        buttonsStyling     : false,
      }).then((result) => {
        this.$store.dispatch("campaign/revertCampaign", "RSVP");
      });
    },
    handleChangeCoverImage(event) {
      this.$emit("change-cover-image", event);
    },
    async onFileChange(event) {
      const coverImageData = await getBase64(event.target.files[0]);
      return this.handleChangeAddtionalData("coverImage", coverImageData);
    },
    handleChangeCampaignAllowOnline(value) {
      this.$store.commit("campaign/setAttribute", { name: "RSVP", key: "allowOnline", value });
    },
    handleChangeCampaignLogo(file) {
      this.$emit("change-logo", file);
    },
    handleChangeCampaignTitle(newTitle) {
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
        .then((result) => {
        });
    },
    handleChangeCampaignDescription(newDescription) {
      this.$store.commit("campaign/setAttribute", { name: "SAVING_DATE", key: "description", value: newDescription });
    },
    handleChangeCampaignVisibleSettings(key, value) {
      this.$store.commit("campaign/setAttribute", {
        name: "RSVP",
        key: "visibleSettings",
        value: { ...this.campaignVisibleSettings, [key]: value },
      });
    },
    handleChangeAdditionalData(key, value) {
      this.$store.commit("campaign/setAddtionalData", {
        name: "RSVP",
        key,
        value,
      });
    },
    setVisibleTimeline(visibility) {
      this.handleChangeCampaignVisibleSettings("showTimeline", visibility);
    },
    changeImage(images) {
      return this.handleChangeAddtionalData("images", images);
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
    display: flex;
    flex-direction: row;
    font-weight: normal;
    flex-wrap: wrap;
    margin-right: -25px;
    margin-left: -25px;

    & > div {
      width: calc(50% - 50px);
      margin-right: 25px;
      margin-left: 25px;
      @media(max-width: 992px) {
        width: 100%;
      }
    }
  }
}
</style>
