<template>
  <div v-if="campaignData" class="campaign-save-date">
    <div
      v-if="campaignData.campaignStatus != 'STARTED'"
      class="font-size-30 font-bold-extra text-transform-capitalize p-50"
    >
      let's start with a "save the date"
    </div>
    <div class="concept-image-block-wrapper">
      <change-cover-button v-show="showChangeCover" @click="handleChangeCoverImage" />
      <img v-if="coverImage" :src="coverImage" class="cover-image">
      <div v-else class="d-flex justify-content-center align-center">
        <concept-image-block
          class="change-cover-concept"
          :images="concept.images"
          :colors="concept.colors"
          border="no-border"
        />
      </div>
    </div>

    <div class="concept p-50">
      <span class="font-size-30 font-bold">Save The Date</span>
      <span class="font-size-22 ml-10">{{
        $dateUtil.formatScheduleDay(event.eventStartMillis, "MMMM D, YYYY")
      }}</span>
      <title-editor
        :key="campaignTitle"
        class="mt-40 font-size-60"
        :default-value="campaignTitle"
        @change="handleChangeCampaignTitle"
      />
    </div>
    <div class="p-50 comment">
      <maryoku-textarea
        :value="campaignDescription"
        :placeholder="placeHolder"
        @input="handleChangeCampaignDescription"
      />
    </div>
    <div class="p-50 text-center">
      <div class="font-size-22 mb-50">
        MORE DETAILS COMING SOON
      </div>
      <div class="d-flex align-center justify-content-center">
        <campaign-logo
          class="d-flex justify-content-center"
          :logo-url="campaignLogoUrl"
          :show-logo="campaignVisibleSettings.showLogo"
          @change-logo="handleChangeCampaignLogo"
          @change-show-logo="handleChangeCampaignVisibleSettings('showLogo', $event)"
        />
      </div>
    </div>
  </div>
  <loader v-else :active="!campaignData" />
</template>
<script>
// core
import Swal from "sweetalert2";

// components
import { Loader }        from "@/components";
import ConceptImageBlock from "@/components/ConceptImageBlock";
import MaryokuTextarea   from "@/components/Inputs/MaryokuTextarea";
import ChangeCoverButton from "@/components/Button/ChangeCover";
import TitleEditor       from "./components/TitleEditor";

// dependencies
import { getBase64 } from "@/utils/file.util";
import CalendarEvent from "@/models/CalendarEvent";
import CampaignLogo  from "@/pages/app/Campaign/components/CampaignLogo";

import "vue2-dropzone/dist/vue2Dropzone.min.css";

const placeHolder =
  "Clear your schedule and get ready to mingle! the greatest event of the year is coming up! more details are yet to come, but we can already promise you it's going to be an event to remember. be sure to mark the date on your calendar. you can do it using this link: (google calendar link). see ya soon";
export default {
  components: {
    CampaignLogo,
    ConceptImageBlock,
    MaryokuTextarea,
    TitleEditor,
    Loader,
    ChangeCoverButton,
  },
  props: {
    info: {
      type    : Object,
      default : () => ({}),
    },
    showChangeCover: {
      type    : Boolean,
      default : () => false
    },
    defaultData: {
      type    : Object,
      default : () => ({}),
    },
  },
  data: () => ({
    logo          : null,
    logoImageData : "",
    placeHolder   : placeHolder,
  }),
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    concept() {
      return this.event.concept || {};
    },
    campaignData() {
      return this.$store.state.campaign.SAVING_DATE || {};
    },
    coverImage() {
      return this.campaignData.coverImage || "";
    },
    campaignTitle() {
      return this.campaignData.title || this.event.title;
    },
    campaignLogoUrl() {
      return this.campaignData.logoUrl || "";
    },
    campaignDescription() {
      return this.campaignData.description || "";
    },
    campaignVisibleSettings() {
      const visibleSettings = this.campaignData.visibleSettings;
      return {
        showLogo: true,
        ...visibleSettings,
      };
    },
  },
  created () {
    console.log("save.data.created", this.campaignData);
  },
  methods: {
    handleChangeCoverImage(event) {
      return this.$emit("change-cover-image", event);
    },
    handleChangeCampaignLogo(file) {
      return this.$emit("change-logo", file);
    },
    campaignSetAttribute(atribute) {
      return this.$store.commit("campaign/setAttribute", atribute);
    },
    async setDefault() {
      await Swal.fire({
        title              : "Are you sure?",
        text               : "You won't be able to revert this!",
        showCancelButton   : true,
        confirmButtonClass : "md-button md-success btn-fill",
        cancelButtonClass  : "md-button md-danger btn-fill",
        confirmButtonText  : "Yes, revert it!",
        buttonsStyling     : false,
      });
      this.$store.dispatch("campaign/revertCampaign", "SAVING_DATE");
    },
    async handleChangeCampaignTitle(newTitle) {
      const setAttributeByName = name => this.campaignSetAttribute({ key: "title", value: newTitle, name });
      ["SAVING_DATE", "RSVP", "COMING_SOON", "FEEDBACK"].forEach(setAttributeByName);
      const calendarEvent = new CalendarEvent({ id : this.event.id, title : newTitle });
      await this.$store.dispatch("event/saveEventAction", calendarEvent);
    },
    handleChangeCampaignDescription(newDescription) {
      this.campaignSetAttribute({ name: "SAVING_DATE", key: "description", value: newDescription });
    },
    handleChangeCampaignVisibleSettings(key, value) {
      this.campaignSetAttribute({
        name  : "RSVP",
        key   : "visibleSettings",
        value : { ...this.campaignVisibleSettings, [key]: value },
      });
    },
    chooseFiles() {
      document.getElementById("coverImage").click();
    },
    async onFileChange(event) {
      this.coverImage = await getBase64(event.target.files[0]);
    },
  },
};
</script>
<style lang="scss" scoped>
.concept-image-block-wrapper{
  width    : 1170px;
  height   : 420px;
  position : relative;
  overflow : auto;
  margin   : 0 auto;

  .cover-image {
    width      : 1170px;
    height     : 420px;
    object-fit : cover;
  }

  .change-cover-concept {
    width: 1000px;
    height: 350px;
  }
}
.change-cover-feedback{
  position: absolute;
  width   : fit-content;
  left    : 40%;
  top     : 50%;
  z-index : 15;
}
.campaign-save-date {
  .cover-preview {
    position: relative;
    height: 500px;
    overflow: hidden;

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
  .comment {
    background-color: #d4fbf0;
    textarea {
      resize: none;
      min-height: 150px;
      padding-right: 100px;
      line-height: 1.5em;
      font-size: 16px;
    }
  }
  .image-logo {
    margin-left: 200px;
    width: 200px;
    position: relative;
    .logo-action {
      align-content: center;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      width: 100%;
      height: 100%;
      display: none;
      .button {
        cursor: pointer;
      }
    }
    &:hover {
      .logo-action {
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
      }
    }
  }
  .display-logo {
    width: 150px;
    .showlogo-switch {
      width: max-content;
      margin: auto;
    }
  }
}
</style>
