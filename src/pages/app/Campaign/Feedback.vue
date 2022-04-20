<template>
  <div class="feedback-campaign">
    <div class="p-50">
      <div class="font-size-30 font-bold-extra mb-50 text-transform-capitalize">
        Create Feedback Campaign
      </div>
      <div class="wrapper-change-cover">
        <img v-if="campaignCoverImage" :src="campaignCoverImage" class="change-cover mr-10">
        <div v-else-if="concept && concept.images && concept.images.length" class="d-flex justify-content-center align-center">
          <concept-image-block
            class="change-cover-concept"
            :images="concept.images"
            :colors="concept.colors"
            border="no-border"
          />
        </div>
        <img v-else src="static/img/b7f79f04-be35-428e-be75-e59ffa4dc187.png" class="change-cover mr-10">
        <div class="change-cover-feedback">
          <md-button
            id="ChangeCoverImage"
            class="md-button md-red maryoku-btn md-theme-default change-cover-btn"
            @click="handleChangeCoverImage"
          >
            <img :src="`${$iconURL}Campaign/Group 2344.svg`" class="mr-10" style="width: 20px">
            Change Cover
          </md-button>
        </div>
        <div class="view-event-photos">
          <div class="wrapper-icon-play">
            <img class="icon-play" src="static/icons/play-black.svg">
          </div>
          <div class="wrapper-btn-switch">
            <hide-switch
              class="btn-switch"
              label="View event photo presentation"
              :value="campaignVisibleSettings.showImages"
              @input="handleChangeCampaignVisibleSettings('showImages', $event)"
            />
          </div>
          <div v-if="isUploadedFiles" class="view-presentation-footer">
            <img class="mr-10" src="static/icons/red-arrow-down.svg">
            <span class="text-description">Download all the attachments (3) </span>
          </div>
          <div v-else class="view-presentation-footer">
            <img src="static/icons/red-arrow-down.svg">
            <div class="text-description-upload-files" @click="openModalWindow">
              Upload Files
            </div>
            <div class="add-attachments-text">
              Add attachments to the event
            </div>
          </div>
        </div>
        <div class="footer-change-cover">
          <campaign-logo
            :logo-url="campaignLogoUrl"
            :logo-title="campaignTitle"
            :show-logo="campaignVisibleSettings.showLogo"
            @change-logo="handleChangeCampaignLogo"
            @change-logo-title="handleChangeCampaignTitle"
            @change-show-logo="handleChangeCampaignVisibleSettings('showLogo', $event)"
          />
        </div>
      </div>
      <div class="mt-70 mb-40">
        <img class="icon-thanks-for-participating-feedback" :src="`${$iconURL}Campaign/group-9380.svg`">
        <div class="mt-10">
          <custom-title-editor
            :default-value="additionalData.sectionReview.title"
            class="font-size-60 font-bold line-height-1 mb-20"
            @change="handleChangeAdditionalData('sectionReview', 'title', ...arguments)"
          />
          <custom-title-editor
            :default-value="additionalData.sectionReview.description"
            class="disco-party"
            @change="handleChangeAdditionalData('sectionReview', 'description', ...arguments)"
          />
        </div>
      </div>
      <maryoku-textarea
        :placeholder="placeHolder"
        :value="campaignDescription"
        @input="handleChangeCampaignDescription"
      />
    </div>
    <div class="feedback-campaign-list p-50">
      <div>
        <div class="d-flex justify-content-between">
          <div class="d-flex align-center justify-content-between">
            <img :src="`${$iconURL}Campaign/group-7321.svg`" class="icon-feedback mr-20">
            <span class="font-size-30 font-bold line-height-1">YOUR FEEDBACK MATTERS TO US</span>
          </div>
          <div>
            <hide-switch
              label="feedback section"
              :value="campaignVisibleSettings.showFeedback"
              @input="handleChangeCampaignVisibleSettings('showFeedback', $event)"
            />
          </div>
        </div>
        <div v-if="campaignVisibleSettings.showFeedback">
          <feedback-question
            v-for="(question, index) in feedbackQuestions"
            :key="index"
            :feedback-data="question"
            :disabled="false"
            placeholder="Enter your feedback here"
          />
        </div>
      </div>
      <div v-if="isEditingNewQuestion" class="mt-60 d-flex align-center add-new-question-block">
        <div>
          <div class="add-new-question-title">
            Rank The...Vendor
          </div>
          <input v-model="newQuestionLabel" class="add-new-question-input-1" placeholder="Rank The Catering Vendor |">
        </div>
        <div>
          <div class="add-new-question-title">
            Write Your Question Here
          </div>
          <input v-model="newQuestion" class="add-new-question-input-2" placeholder="How was the activity?">
        </div>
        <div class="add-new-question-button-block">
          <md-button class="md-button md-red maryoku-btn md-theme-default maryoku-btn add-button-style" @click="addNewQuestion">
            Add
          </md-button>
          <img :src="`${$iconURL}Campaign/Group+3602.svg`" @click="isEditingNewQuestion = false">
        </div>
      </div>
      <div v-else class="mt-60 d-flex justify-content-between">
        <md-button class="md-simple edit-btn md-red" @click="editNewQuestion">
          <img :src="`${$iconURL}Campaign/Group 9327.svg`" class="mr-20">Add Another Question
        </md-button>
      </div>
    </div>
    <div class="feedback-campaign-carousel p-50">
      <div class="d-flex align-center pt-50 pb-50">
        <img :src="`${$iconURL}FeedbackForm/Group%2028057.svg`">
        <div class="ml-20 d-flex flex-wrap flex-column">
          <custom-title-editor
            :default-value="additionalData.sectionEventPhotos.title"
            class="font-size-30 font-bold line-height-1 pt-20"
            @change="handleChangeAdditionalData('sectionEventPhotos', 'title', ...arguments)"
          />
          <span class="Include-photos-details-of-the-event mt-10">
            (See photos and details about the event)
          </span>
        </div>
      </div>
      <feedback-image-carousel
        v-if="campaignImages.length"
        class="p-10"
        :items="2.5"
        :margin-items="10"
        :images="campaignImages"
        :show-upload-file="true"
        :show-images-details="true"
        @addImage="addNewImage"
      />
      <div v-else class="feedback-campaign-drop-zone-upload-images">
        <div class="wrapper-drop-zone">
          <vue-dropzone
            id="dropzone"
            ref="myVueDropzone"
            :options="dropzoneOptions"
            :use-custom-slot="true"
            class="file-drop-zone upload-section text-center drop feedback-drop-zone"
            @vdropzone-file-added="uploadFileDropZone"
          >
            <md-button class="choose-file-button">
              <img src="/static/icons/red-clip.svg">
              <div class="ml-10">
                Choose File
              </div>
            </md-button>
            <div class="font-size-14">
              Or
            </div>
            <div class="drag-your-file-text">
              Drag your file here
            </div>
          </vue-dropzone>
        </div>
      </div>
    </div>
    <div class="green-block-wrapper">
      <div class="p-50 d-flex">
        <div>
          <div class="icon-and-text">
            <img class="left-icon" src="/static/icons/green-block-icon-1.svg">
            <div class="right-text-style">
              share with us photos you took from the event
            </div>
          </div>
          <div class="d-flex align-center font-bold ml-60">
            Allow guests to upload photos from the event
            <md-switch
              :value="campaignVisibleSettings.allowUploadPhoto"
              class="feedback-btn-switch section below-label large-switch md-switch-rose switch-button-style"
              @input="handleChangeCampaignVisibleSettings('allowUploadPhoto', $event)"
            >
              <span>{{ campaignVisibleSettings.allowUploadPhoto ? "Hide" : "Show" }}</span>
            </md-switch>
          </div>
        </div>
      </div>
    </div>
    <div class="p-50 mt-10">
      <div class="share-panel">
        <div class="d-flex mb-10 align-center">
          <img :src="`${$iconURL}Campaign/group-9386.svg`" class="mr-20">
          <div class="ml-30 mr-40">
            <div class="font-size-30 font-bold line-height-2">
              SHARE EVENT PARTICIPATION
            </div>
            <div>(Share photos and details about the event)</div>
          </div>
          <hide-switch
            label="sharing option"
            :value="campaignVisibleSettings.showSharingOption"
            @input="handleChangeCampaignVisibleSettings('showSharingOption', $event)"
          />
        </div>
        <sharing-button-group
          v-if="campaignVisibleSettings.showSharingOption"
        />
      </div>
    </div>
    <feedback-upload-files-modal
      v-if="showModalWindowOpen"
      :attachments="campaignAttachments"
      :folder-name-for-upload="`events/${event.id}`"
      @close="closeModalWindow"
      @upload-files="uploadFiles"
    />
  </div>
</template>
<script>
// core
import { mapActions }   from "vuex";
import vue2Dropzone     from "vue2-dropzone";
import { v4 as uuidv4 } from "uuid";

// componets
// global
import MaryokuTextarea       from "@/components/Inputs/MaryokuTextarea";
import HideSwitch            from "@/components/HideSwitch";
import ConceptImageBlock     from "@/components/ConceptImageBlock";
// local
import FeedbackImageCarousel from "./components/FeedbackImageCarousel";
import SharingButtonGroup    from "./components/SharingButtonGroup";
import FeedbackQuestion      from "./components/FeedbackQuestion";
import CustomTitleEditor     from "./components/CustomTitleEditor";

// pages
import CampaignLogo             from "@/pages/app/Campaign/components/CampaignLogo";
import FeedbackUploadFilesModal from "@/pages/app/Campaign/FeedbackUploadFilesModal";

// dependencies
import S3Service from "@/services/s3.service";

export default {
  components: {
    CampaignLogo,
    MaryokuTextarea,
    FeedbackImageCarousel,
    SharingButtonGroup,
    FeedbackQuestion,
    HideSwitch,
    FeedbackUploadFilesModal,
    CustomTitleEditor,
    vueDropzone: vue2Dropzone,
    ConceptImageBlock,
  },
  props: {
    info: {
      type    : Object,
      default : () => ({}),
    },
  },
  data: () => ({
    concept              : {},
    feedbackQuestions    : [],
    placeHolder          : "",
    newQuestion          : "",
    newQuestionLabel     : "",
    isEditingNewQuestion : false,
    isUploadedFiles      : false,
    showModalWindowOpen  : false,
    dropzoneOptions: {
      url: "https://httpbin.org/post",
      maxFilesize: 25,
      createImageThumbnails: false,
      uploadMultiple: true,
      acceptedFiles: "image/*",
      headers: { "My-Awesome-Header": "header value" },
    },
  }),
  computed: {
    event() {
      return this.$store.state.event.eventData || {};
    },
    campaignData() {
      return this.$store.state.campaign.FEEDBACK || {};
    },
    campaignImages() {
      return this.campaignData.images || [];
    },
    campaignCoverImage() {
      return this.campaignData.coverImage || "";
    },
    campaignLogoUrl() {
      return this.campaignData.logoUrl || "";
    },
    campaignTitle() {
      return this.campaignData.title || (this.event.title || "");
    },
    campaignVisibleSettings() {
      return {
        showImages        : true,
        showLogo          : true,
        showFeedback      : true,
        allowUploadPhoto  : true,
        showSharingOption : true,
        ...(this.campaignData.visibleSettings || {}),
      };
    },
    campaignDescription() {
      return this.campaignData.description || "Just a short note to thank you for participating in our recent event. " +
        "We appreciate your attendance and hope you had an enjoyable, productive time. " +
        "Your feedback will be very helpful and we look forward to welcoming you to more events in the future.";
    },
    campaignAttachments() {
      return this.campaignData.attachments || [];
    },
    additionalData() {
      const campaignAdditionalData = this.campaignData.additionalData || {};
      return {
        sectionReview: {
          title: "THANKS FOR PARTICIPATING!",
          description: "80’s Disco Party",
        },
        sectionEventPhotos: {
          title: "EVENT PHOTOS – RELIVE THE BEST MOMENTS",
          description: "",
        },
        ...campaignAdditionalData,
      };
    },
  },
  created() {
    this.placeHolder = (`
      Thanks for attending this recent event – we hope you had a wonderful, productive experience!
      Your feedback is important to help us understand what worked especially well, on top of
      anything you feel could be improved in the future.
    `).trim().replace(/  /g, "");

    console.log({ event: this.event });
    this.concept = this.event.concept;
    this.feedbackQuestions = [
      {
        label        : "Rate your overall experience",
        question     : "How was the event?",
        showQuestion : true,
        rank         : 0,
        icon         : "",
      },
    ];
    this.event.components
      .sort((a, b) => a.order - b.order)
      .forEach((service) => {
        if (service.eventCategory.type == "service") {
          const { fullTitle, icon } = service.eventCategory;
          this.feedbackQuestions.push({
            question: `How Was The ${fullTitle}?`,
            showQuestion: true,
            rank: 0,
            icon,
            label,
          });
        }
      });

    this.setFeedbackAttribute("feedbackQuestions", this.feedbackQuestions);
    if (!this.campaignData.additionalData) this.setFeedbackAttribute("additionalData", this.additionalData);
  },
  methods: {
    ...mapActions("campaign", ["saveCampaign"]),
    setFeedbackAttribute (key, value) {
      return this.$store.commit("campaign/setAttribute", { name: "FEEDBACK", key, value });
    },
    addNewImage(image) {
      const images = this.campaignData.images;
      images.unshift({ src: image.imageString });
      return this.setFeedbackAttribute("images", images);
    },
    uploadFile() {
      document.getElementById("file-uploader").click();
    },
    editNewQuestion() {
      this.isEditingNewQuestion = true;
    },
    addNewQuestion() {
      const newQuestion = {
        icon         : "",
        label        : this.newQuestionLabel,
        question     : this.newQuestion,
        rank         : 0,
        showQuestion : true,
      };
      this.feedbackQuestions.push(newQuestion);
      this.newQuestion = "";
      this.isEditingNewQuestion = false;
    },
    openModalWindow(){
      this.showModalWindowOpen = true;
    },
    closeModalWindow(){
      this.showModalWindowOpen = false;
    },
    handleChangeAdditionalData(sectionName, key, value) {
      this.additionalData[sectionName][key] = value;
      this.$store.commit("campaign/setAttribute", {
        name  : "FEEDBACK",
        key   : "additionalData",
        value : this.additionalData
      });
    },
    log (...values) {
      console.dir({ values });
    },
    handleChangeCoverImage(event) {
      this.$emit("change-cover-image", event);
    },
    handleChangeCampaignTitle(value) {
      return this.setFeedbackAttribute("title", value);
    },
    handleChangeCampaignDescription(value) {
      return this.setFeedbackAttribute("description", value);
    },
    handleChangeCampaignVisibleSettings(key, value) {
      return this.setFeedbackAttribute("visibleSettings", { ...this.campaignVisibleSettings, [key]: value });
    },
    handleChangeCampaignLogo(file) {
      console.dir({ file });
      this.$emit("change-logo", file);
    },
    async uploadFiles(files) {
      const attachments = files.map(({ status, ...file }) => file);
      await this.saveCampaign({ id: this.campaignData.id, attachments });
      return this.setFeedbackAttribute("attachments", files);
    },

    makeFileSrc (file) {
      const extension = file.type.split("/")[1];
      const fileName  = uuidv4();
      return `${fileName}.${extension}`;
    },
    fileUpload (file) {
      return S3Service.fileUpload(file, this.makeFileSrc(file), `event/${this.event.id}`);
    },
    async uploadFileDropZone(file) {
      const src       = await this.fileUpload(file);
      const images    = this.campaignImages;
      images.unshift({ src });
      return this.setFeedbackAttribute("images", images);
    },
    async onFileChangeCoverImage(event) {
      const coverImage = await this.fileUpload(event.target.files[0]);
      this.setFeedbackAttribute("coverImage", coverImage);
      return this.saveCampaign({ id: this.campaignData.id, coverImage });
    },
  },
};
</script>
<style lang="scss" scoped>
.feedback-campaign {
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
}
.wrapper-change-cover {
  display: flex;
  flex-direction: column;
  height: 540px;
  position: relative;

  .change-cover {
    width: 1133px;
    height: 350px;
    object-fit: cover;
    border-radius: 20px;
  }

  .change-cover-concept {
    width: 1000px;
    height: 350px;
  }

  .view-event-photos {
    width: 477px;
    height: 267px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 250px;
    right: 65px;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    z-index: 13;

    .wrapper-icon-play {
      width: 40%;
      display: flex;
      justify-content: flex-end;

      img.icon-play {
        width: 77px;
        height: 77px;
      }
    }

    .wrapper-btn-switch {
      width: 50%;
    }
  }

  .footer-change-cover {

    .wrapper-logo-microsoft {
      height: 150px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-grow: 1;

      .logo-microsoft {
        width: 250px;
        height: 75px;
        display: flex;
        align-items: center;

        .icon-microsoft {
          width: 45px;
          height: 45px;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;

          .block {
            width: 20px;
            height: 20px;
          }

          .block1 {
            background: #f25022;
          }

          .block2 {
            background: #7fba00;
          }

          .block3 {
            background: #00a4ef;
          }

          .block4 {
            background: #ffb600;
          }
        }

        h2 {
          font-size: 30px;
          color: #737373;
          font-weight: 900;
          margin-left: 10px;
          flex-grow: 1;
        }
      }
    }

    .hello-microsoft-special-employee {
      font-size: 30px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #050505;
    }
  }

  .icon-feedback {
    width: 65px;
    height: 57px;
  }
}
.change-cover-feedback{
  position: absolute;
  top: 25%;
  left: 40%;
  z-index: 12;
}
.green-block-wrapper{
  background-color: rgba(87, 242, 195, 0.23);
}
.right-text-style{
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 800;
  height: 82px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
}
.icon-and-text{
  display: flex;
  align-items: start;
}
.left-icon{
  margin-right: 20px;
}
.switch-button-style{
  margin-top: 25px;
  margin-left: 15px;
}
.feedback-campaign-list {
  background: #f5f5f5;

  .icon-feedback {
    width: 65px;
    height: 57px;
  }

  .wrapper-icon-edit-dark {
    display: flex;
    justify-content: flex-end;

    .icon-edit-dark {
      width: 24px;
      height: 24px;
      align-self: flex-end;
      margin-left: 15px;
    }
  }
}
.icon-thanks-for-participating-feedback {
    width: 92px !important;
}
.feedback-campaign-carousel {

  .icon-pictures {
    width: 57px;
    height: 57px;
    position: relative;
    border-radius: 50%;
    background: #ffc001;

    .icon-book {
      width: 43px;
      height: 48px;
      background: #fff;
      position: absolute;
      top: 13px;
      left: -13px;
    }

    .icon-picture {
      position: absolute;
      top: 25px;
      left: -8px;
      z-index: 1;
    }
  }
}
.feedback-campaign-drop-zone-upload-images {
  width: auto;
  height: 320px;
  margin: 0 auto;
  background-color: #f3f7fd;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper-drop-zone {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px dashed #818080;

    .feedback-drop-zone {
      border: none;
      height: 100%;
      background-color: #fff;

      .choose-file-button{
        background-color: #fff!important;
        width: 148px;
        height: 32px;
        border: solid 2px #f51355;
        color: #f51355!important;
        font-size: 14px;
        font-weight: 800;
      }

      .drag-your-file-text{
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #818080;
      }
    }
  }
}
.add-new-question-block{
    height: 172px;
    border-top: dashed 1px #818080;
    border-bottom: dashed 2px #818080;

}
.add-button-style{
    width: 87.6px;
    height: 50px;
    margin-right: 14px;
}
.add-new-question-input-1{
    width: 400px;
    height: 51px;
    margin-right: 46px;
}
.add-new-question-input-2{
    width: 400px;
    height: 51px;
    margin-right: 33px;
}
.add-new-question-title {
  width: 400px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 16px;
}
.add-new-question-button-block{
    display: flex;
    margin-top: 38px;
}
.view-presentation-footer {
    display: flex;
    position: absolute;
    bottom: -50px;
    .text-description {
        margin-left: 10px;
        font-size: 16px;
        font-weight: 800;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.34px;
        text-align: left;
        color: #f51355;
    }
}
.view-presentation-description-edit-icon{
    width: 18px;
    margin-left: 10px;
}
.icon-edit-dark {
    width: 24px;
    height: 24px;
    align-self: flex-end;
    margin-left: 20px;
    &:hover{
        cursor: pointer;
    }

}
.wrapper-thanks-for-participating{
    display: flex;
    .icon-edit-dark {
        width: 24px;
        height: 24px;
        align-self: center;
        margin-left: 20px;
    }
}
.disco-party{
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 3.18;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
}
.text-description-upload-files{
    margin-left: 10px;
    font-size: 16px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.34px;
    text-align: left;
    text-decoration: underline;
    color: #f51355;
    text-decoration: underline;
    cursor: pointer;
}
.add-attachments-text{
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
    position: relative;
    bottom: -34px;
    right: 95px;
}
</style>
