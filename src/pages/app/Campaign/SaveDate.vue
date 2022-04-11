<template>
  <div class="campaign-save-date">
    <loader :active="!campaignData" />
    <div v-if="campaignData" class>
      <div
        v-if="campaignData.campaignStatus != 'STARTED'"
        class="font-size-30 font-bold-extra text-transform-capitalize p-50"
      >
        let's start with a "save the date"
      </div>
      <div class="concept-image-block-wrapper">
        <div v-show="showChangeCover" class="change-cover-feedback" @click="handleChangeCoverImage">
          <md-button class="md-button md-red maryoku-btn md-theme-default change-cover-btn">
            <img :src="`${$iconURL}Campaign/Group 2344.svg`" class="mr-10" style="width: 20px">
            Change Cover
          </md-button>
        </div>
        <img v-if="coverImage" :src="coverImage" class="cover-image">
        <concept-image-block
          v-else
          class="hidden"
          :images="concept.images"
          :colors="concept.colors"
          border="no-border"
        />
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
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import ConceptImageBlock from "@/components/ConceptImageBlock";
import MaryokuTextarea from "@/components/Inputs/MaryokuTextarea";
import { getBase64 } from "@/utils/file.util";
import TitleEditor from "./components/TitleEditor";
import Swal from "sweetalert2";
import CalendarEvent from "@/models/CalendarEvent";
import { Loader } from "@/components";
import HideSwitch from "@/components/HideSwitch";
import CampaignLogo from "@/pages/app/Campaign/components/CampaignLogo";

const placeHolder =
  "Clear your schedule and get ready to mingle! the greatest event of the year is coming up! more details are yet to come, but we can already promise you it's going to be an event to remember. be sure to mark the date on your calendar. you can do it using this link: (google calendar link). see ya soon";
export default {
  components: {
    CampaignLogo,
    HideSwitch,
    vueDropzone: vue2Dropzone,
    ConceptImageBlock,
    MaryokuTextarea,
    TitleEditor,
    Loader,
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    showChangeCover: Boolean,
    defaultData: {
      type: Object,
      default: () => {},
    },
  },
  data: function () {
    return {
      // dropzoneOptions: {
      //   url: "https://httpbin.org/post",
      //   thumbnailWidth: 150,
      //   maxFilesize: 0.5,
      //   headers: { "My-Awesome-Header": "header value" },
      // },
      logo: null,
      logoImageData: "",
      placeHolder: placeHolder,
      originContent: {
        title: "",
        description: "",
        coverImage: `${this.$storageURL}Campaign+Images/SAVE+THE+DATE.jpg`,
        logoUrl: "",
        campaignStatus: "EDITING",
        visibleSettings: {
          showLogo: true,
        },
      },
    };
  },
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
      return this.campaignData.visibleSettings || {};
    },
  },
  methods: {
    handleChangeCoverImage(event) {
      this.$emit("change-cover-image", event);
    },
    handleChangeCampaignLogo(file) {
      this.$emit("change-logo", file);
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
        this.$store.dispatch("campaign/revertCampaign", "SAVING_DATE");
      });
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
        .then((result) => {});
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
  width: 1170px;
  height: 420px;
  position: relative;
  overflow: auto;
  margin: 0 auto;

  .cover-image {
    width: 1170px;
    height: 420px;
    object-fit: cover;
  }
}
.change-cover-feedback{
  position: absolute;
  width: fit-content;
  left: 40%;
  top: 50%;
  z-index: 15;
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
