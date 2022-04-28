<template>
  <div class="main-layout">
    <div class="paper-layout">
      <div class="position-relative">
        <Message :show="showFeedbackMessageSuccessful" @onClose="closeFeedbackMessageSuccessful" />
      </div>
      <div class="header-cover-image">
        <img :src="coverImage">
      </div>
      <div class="content">
        <div class="content-article">
          <div class="content-article-header">
            <div v-if="showLogo || showImages" class="sub-cover">
              <campaign-logo
                v-if="showLogo && logoUrl"
                :logo-url="logoUrl"
                class="mt-30"
                review
              />
              <div v-if="showImages" class="wrapper-view-presentation">
                <div class="view-presentation">
                  <view-presentation
                    :cover-image="attachmentsImages[0].src"
                    @on-play="onPlay"
                    @download-files="downloadFiles"
                    @selected-download-files="selectedDownloadFiles"
                  />
                </div>
              </div>
            </div>
            <div class="wrapper-thanks-for-participating">
              <img class="icon-thanks-for-participating mr-20" :src="`${$iconURL}Campaign/group-9380.svg`">
              <div class="mt-10">
                <div class="font-size-40 font-bold line-height-1">
                  {{ additionalData.sectionReview.title }}
                </div>
                <div class="subtitle">
                  {{ additionalData.sectionReview.description }}
                </div>
              </div>
              <div class="message">
                {{ description }}
              </div>
              <img width="27" height="37" src="static/icons/double-arrow-down-gray.svg">
            </div>
          </div>
          <div
            v-if="!showFeedbackMessageSuccessful && visibleSettings.showFeedback"
            class="content-article-main-content"
          >
            <div class="feedback-question-list">
              <div>
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-center justify-content-between">
                    <img :src="`${$iconURL}Campaign/group-7321.svg`" class="icon-feedback mr-20">
                    <span class="font-size-30 font-bold line-height-1">YOUR FEEDBACK MATTERS TO US</span>
                  </div>
                </div>
                <div v-if="visibleSettings.showFeedback">
                  <feedback-question
                    v-for="(question, index) in feedbackQuestions"
                    :key="index"
                    :feedback-data="question"
                    :disabled="false"
                    :show-switch="false"
                  />
                </div>
                <md-button class="yellow-button-send-feedback" @click="sendFeedback">
                  Send feedback
                </md-button>
              </div>
            </div>
          </div>
          <div class="content-article-footer">
            <div class="d-flex align-center pt-50 pb-50">
              <img :src="`${$iconURL}FeedbackForm/Group%2028057.svg`">
              <div class="ml-20 d-flex flex-wrap flex-column">
                <div class="d-flex">
                  <span class="font-size-30 font-bold line-height-1">{{ additionalData.sectionEventPhotos.title }}</span>
                </div>
              </div>
            </div>
            <div class="wrapper-carousel">
              <feedback-image-carousel
                class="p-10"
                :items="2.5"
                :margin-items="10"
                :images="images"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="visibleSettings.allowUploadPhoto" class="green-block-wrapper">
        <div class="p-50 d-flex">
          <div class="margin-left-style-first-block position-relative">
            <title-share-photo-event />
            <vue-dropzone
              id="dropzone"
              ref="myVueDropzone"
              :options="dropzoneOptions"
              :use-custom-slot="true"
              @vdropzone-file-added="fileAdded"
            >
              <div class="white-cube drop">
                <div class="border-cube">
                  <div class="title-text-drag-and-drop">
                    Drag & Drop
                  </div>
                  <div class="or-section">
                    \\ Or \\
                  </div>
                  <div class="upload-text-area cursor-pointer">
                    <img src="/static/icons/arrow-up-red.svg" class="mr-10">
                    Upload Files
                  </div>
                </div>
              </div>
            </vue-dropzone>
          </div>
        </div>
      </div>
      <div v-if="visibleSettings.showSharingOption" class="lets_share_block">
        <div class="lets_share_text">
          Let's share all this fun :)
        </div>
        <sharing-button-group class="sharing-button-group-wrapper" :link="campaign.referenceUrl" :copy-link="true" />
      </div>
      <div style="color: #fff" class="ml-50">
        last block
      </div>
    </div>
    <div class="text-center logo maryoku_provided_by" @click="gotoWeb">
      <span class="mr-10">Provided by </span>
      <img :src="`${$iconURL}RSVP/maryoku - logo dark@2x.png`">
      <!-- <span class="mb-10">&#169</span> -->
    </div>
    <Footer />
    <fullscreen v-model="fullScreen">
      <div v-if="fullScreen" class="wrapper-full-screen-carousel">
        <md-button
          class="md-icon-button md-dense md-black md-button-close"
          @click="closeFullScreen"
        >
          <md-icon>close</md-icon>
        </md-button>
        <feedback-upload-images-carousel
          class-image="carousel-upload-image"
          class="carousel-upload-images"
          :images="attachmentsImages"
          :auto-play-timeout="3500"
          :smart-speed="1500"
          :auto-play="true"
          :loop="true"
        />
      </div>
    </fullscreen>
  </div>
</template>
<script>
// core
import { v4 as uuidv4 } from "uuid";
import video_extension  from "video-extensions";
import vue2Dropzone     from "vue2-dropzone";
import Swal             from "sweetalert2";
import { mapActions }   from "vuex";

// models
import CalendarEvent from "@/models/CalendarEvent";
import Feedback      from "@/models/Feedback";
import Campaign      from "@/models/Campaign";

// components
import TitleSharePhotoEvent         from "@/components/Title/SharePhotoEvent";
import FeedbackUploadImagesCarousel from "../FeedbackUploadImagesCarousel";
import Footer                       from "./Footer";
import Message                      from "./Message";

// pages
import ViewPresentation      from "@/pages/app/Campaign/components/ViewPresentation";
import CampaignLogo          from "@/pages/app/Campaign/components/CampaignLogo";
import FeedbackImageCarousel from "@/pages/app/Campaign/components/FeedbackImageCarousel";
import SharingButtonGroup    from "@/pages/app/Campaign/components/SharingButtonGroup";
import FeedbackQuestion      from "@/pages/app/Campaign/components/FeedbackQuestion";

// dependencies
import S3Service   from "@/services/s3.service";
import lastElement from "@/helpers/array/last/element";
import map         from "@/helpers/array/map";
import blankOpen   from "@/helpers/window/blankOpen";

/**
* @param {Extension} extension
* @template {string} Extension
* @return {`.${Extension}`}
*/
const toExtention  = (extension) => "." + extension;
const toExtentions = map(toExtention);

export default {
  components: {
    FeedbackUploadImagesCarousel,
    FeedbackImageCarousel,
    SharingButtonGroup,
    FeedbackQuestion,
    CampaignLogo,
    ViewPresentation,
    vueDropzone: vue2Dropzone,
    TitleSharePhotoEvent,
    Footer,
    Message,
  },
  data: () => ({
    isLoading           : true,
    fullScreen          : false,
    campaign            : null,
    event               : null,
    coverImage          : null,
    logoUrl             : null,
    description         : "",
    originalContent     : Object.create(null),
    images              : [],
    attachmentsImages   : [],
    attachments         : [],
    feedbackQuestions   : [],
    selectedAttachments : [],
    additionalData: {
      sectionReview: {
        title       : "",
        description : "",
      },
      sectionEventPhotos: {
        title       : "",
        description : "",
      }
    },
    visibleSettings: {
      showImages        : false,
      showSharingOption : false,
      allowUploadPhoto  : false,
      downloadFiles     : false,
      showFeedback      : false
    },
    extensionsFiles: {
      image    : [".jpeg", ".jpg", ".gif", ".png"],
      document : [".xlsx", ".xls", ".doc", ".docx", ".ppt", ".pptx", ".txt", ".pdf"],
      video    : toExtentions(video_extension),
    },
    dropzoneOptions: {
      url                   : "https://httpbin.org/post",
      createImageThumbnails : false,
      uploadMultiple        : true,
      acceptedFiles         : "image/*, video/*",
    },
    selectedAttachmentsTypes      : false,
    invalidSelectedFilesTypes     : false,
    showFeedbackMessageSuccessful : false,
  }),
  computed: {
    showLogo() {
      return this.campaign && this.campaign.logoUrl && this.visibleSettings.showLogo;
    },
    showImages() {
      return this.campaign && this.campaign.visibleSettings.showImages && this.attachmentsImages.length;
    }
  },
  async created() {
    try {
      const eventId        = this.$route.params.eventId;
      const calendarEvent  = new CalendarEvent({ id: eventId });
      const campaigns      = await this.getCampaigns({ event: calendarEvent });
      this.campaign        = campaigns["FEEDBACK"];
      this.event           = this.campaign.event;
      this.description     = this.campaign.description;
      this.images          = this.campaign.images;
      this.coverImage      = this.campaign.coverImage;
      this.logoUrl         = this.campaign.logoUrl;
      this.visibleSettings = this.campaign.visibleSettings;
      if (this.campaign.additionalData) this.additionalData = this.campaign.additionalData;
      if (this.campaign.attachments) {
        this.attachments       = this.campaign.attachments;
        this.attachmentsImages = this.filterFilesByType(["image"], this.attachments)
          .map(({ url }) => ({ src: url }));
      }
      this.feedbackQuestions = this.campaign.feedbackQuestions
        .filter(({ showQuestion }) => showQuestion)
        .map((question) => ({ ...question, errors: { rank: null, comment: null }}));
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("campaign", ["getCampaigns", "saveCampaign"]),
    gotoWeb() {
      return window.open("https://www.maryoku.com", "_blank");
    },
    async setDefault() {
      const classBtn = "md-button btn-fill";
      const result = await Swal.fire({
        title              : "Are you sure?",
        text               : "You won't be able to revert this feedback!",
        confirmButtonText  : "Yes, revert it!",
        confirmButtonClass : `${classBtn} md-success`,
        cancelButtonClass  : `${classBtn} md-danger`,
        showCancelButton   : true,
        buttonsStyling     : false,
      });

      if (result.value) this.editingContent = Object.create(this.originalContent);
    },
    uploadFile() {
      const fileUploader = document.getElementById("file-uploader");
      if (fileUploader) fileUploader.click();
    },
    changeUploadFile({ target }) {
      if (target.files && target.files.length > 0) {
        const { name } = target.files[0];
        this.editingContent.push({ name });
      } else console.error("Files not found");
    },
    async sendFeedback() {
      let email = this.$route.query.email || "test@gmail.com";
      const feedbackQuestions = [];
      this.feedbackQuestions.forEach((item) => {
        if (!item.showQuestion) return;
        feedbackQuestions.push({
          question : item.question,
          comment  : item.comment,
          rate     : item.rank,
          label    : item.label || "General",
          event    : new CalendarEvent({ id: this.event.id }),
        });
      });
      // validate questions
      this.feedbackQuestions.forEach((item, index) => {
        if (!item.rank) {
          this.feedbackQuestions[index].errors.rank = `Please selected rank for the ${item.label}`;
        } else if (item.errors.rank) {
          this.feedbackQuestions[index].errors.rank = null;
        }

        if (!item.comment) {
          this.feedbackQuestions[index].errors.comment = `Please write comment for the question ${item.question}`;
        } else if (item.errors.comment) {
          this.feedbackQuestions[index].errors.comment = null;
        }
      });
      const isHasErrorQuestion   = (question) => question.errors.rank || question.errors.comment;
      const someQuestionHasError = this.feedbackQuestions.some(isHasErrorQuestion);
      if (someQuestionHasError) return;
      const confirmButtonClass = "md-button md-red maryoku-btn";
      try {
        await new Feedback({
          guestName         : email,
          guestEmail        : email,
          guestComment      : "",
          feedbackCampaign  : new Campaign({ id: this.campaign.id }),
          feedbackQuestions : feedbackQuestions,
          images            : this.images,
        }).save();

        Swal.fire({
          title              : "",
          text               : "Thank you for your feedback!",
          type               : "success",
          buttonsStyling     : false,
          confirmButtonClass,
        });

        this.openFeedbackMessageSuccessful();
      } catch (error) {
        Swal.fire({
          title              : "Invalid information",
          text               : "Could you please check if you input all information on given form?",
          type               : "error",
          buttonsStyling     : false,
          confirmButtonClass,
        });
      }
    },
    closeFeedbackMessageSuccessful() {
      this.showFeedbackMessageSuccessful = false;
    },
    openFeedbackMessageSuccessful() {
      this.showFeedbackMessageSuccessful = true;
    },
    async downloadFiles() {
      if (this.invalidSelectedFilesTypes) return;
      if (!this.selectedAttachmentsTypes) {
        const typeFiles = Object.keys(this.extensionsFiles);
        this.selectedAttachments = this.filterFilesByType(typeFiles, this.attachments);
      }
      const attachments = this.selectedAttachments.map(({ url }) => url);
      const result = await S3Service.downloadFiles(attachments);
      blankOpen(`data:application/zip,${result.data}`);
    },
    filterFilesByType(selectedTypeFiles, files) {
      const extensions = [];
      for (const type of selectedTypeFiles) {
        const extensionsOfType = this.extensionsFiles[type];
        extensions.push(...extensionsOfType);
      }
      return files.filter((file) => extensions.includes(toExtention(lastElement(file.url.split(".")))));
    },
    selectedDownloadFiles(selectedTypeFiles) {
      this.selectedAttachmentsTypes = true;
      if (!selectedTypeFiles.length) {
        this.invalidSelectedFilesTypes = true;
        return Swal.fire({
          title              : "Invalid selected files types",
          text               : "Please select type files for download",
          type               : "error",
          confirmButtonClass : "md-button md-red maryoku-btn",
          buttonsStyling     : false,
        });
      }
      this.invalidSelectedFilesTypes = false;
      this.selectedAttachments = this.filterFilesByType(selectedTypeFiles, this.attachments);
    },
    onPlay() {
      return this.fullScreen = true;
    },
    closeFullScreen() {
      return this.fullScreen = false;
    },
    async fileAdded(file) {
      const extension = file.type.split("/")[1];
      const fileName  = uuidv4();
      const { data }  = await S3Service.fileUpload(file, `${fileName}.${extension}`, `event/${this.event.id}`, true);
      this.images.unshift({ src: data.upload.url });
      await this.callSaveCampaign();
    },

    async callSaveCampaign () {
      const campaignType = "FEEDBACK";
      const campaignData = this.$store.state.campaign[campaignType];
      const newCampaign = new Campaign({
        campaignType,
        ...campaignData,
      });
      const result = await this.saveCampaign(newCampaign);
      console.dir({ result });
    },
  }
};
</script>

<style lang="scss" scoped>
.paper-layout {
  width: 1520px;
  height: auto;
  margin: 80px auto;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
}

.maryoku_provided_by {
  margin: 102px 0 92px 0;
}
.lets_share_block {
  width: 520px;
  height: 120px;
  margin: 100px auto;
}
.lets_share_text {
  font-size: 30px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #050505;
}
.green-block-wrapper {
  background-color: rgba(87, 242, 195, 0.23);
  height: 312px;
  margin-bottom: 273px;
}
.white-cube {
  width: 1200px;
  height: 303px;
  background-color: #fff;
  position: absolute;
  top: 80px;
  border-radius: 3px;
  box-shadow: 0 0 41px 0 rgba(0, 0, 0, 0.08);
}
.margin-left-style-first-block {
  margin-left: 113px;
}
.title-text-drag-and-drop {
  font-size: 22px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.56;
  letter-spacing: normal;
  text-align: center;
  margin-top: 50px;
  color: #707070;
}
.or-section {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.38px;
  text-align: center;
  color: #707070;
}
.upload-text-area {
  width: 136px;
  font-size: 16px;
  font-weight: 800;
  color: #f51355 !important;
  text-transform: none;
  text-decoration: underline;
  margin: 20px auto;
}
.right-white-cube-item {
  margin: 23px 0 0 67px;
  font-size: 16px;
  font-weight: 600;
  color: #050505;
}
.underline-red-text {
  font-size: 16px;
  font-weight: 600;
  color: #f51355;
  text-decoration: underline;
}
.red-text-margin {
  margin: 34px 0 0 67px;
}
.header-cover-image {
  img {
    width: 1520px;
    height: 437px;
    border-top-left-radius  : 30px;
    border-top-right-radius : 30px;
    object-fit: cover;
  }
}

.content {
  width    : 100%;
  display  : flex;
  position : relative;
  &::before {
    content    : '';
    width      : 27px;
    position   : absolute;
    top        : 0;
    height     : 1112px;
    background : linear-gradient(
      rgba(255,72,178,1)  0,
      rgba(255,72,178,1)  278px,
      rgba(113,236,248,1) 278px,
      rgba(113,236,248,1) 556px,
      rgba(255,245,0,1)   556px,
      rgba(255,245,0,1)   834px,
      rgba(87,242,195,1)  834px,
      rgba(87,242,195,1)  1112px
    );
  }

  .content-article {
    width: 100%;

    .content-article-header {
      padding-left: 167px;
      margin-bottom: 45px;

      .sub-cover {
        height: 130px;
        display: flex;

        .wrapper-view-presentation {
          margin-bottom: 70px;
          position: relative;
          flex-grow: 1;

          .view-presentation {
            width: 635px;
            height: 357px;
            position: absolute;
            top: -110px;
            right: 85px;
            z-index: 1;
          }
        }
      }

      .wrapper-thanks-for-participating {
        max-width: 900px;
        margin-top: 70px;
        flex: 1 1 300px;

        .icon-thanks-for-participating {
          width: 92px;
          height: 95px;
        }

        .subtitle {
          font-size: 22px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 3.18;
          letter-spacing: normal;
          text-align: left;
          color: #050505;
        }

        .message {
          width: 100%;
          margin-bottom: 50px;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.88;
          letter-spacing: normal;
          text-align: justify;
          color: #050505;
        }
      }
    }

    .content-article-main-content {
      padding: 0 160px 100px 160px;
      background: #f5f5f5;

      .feedback-question-list {
        padding-top: 100px;
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
    }

    .content-article-footer {
      padding-left: 160px;
      padding-right: 160px;

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

      .icon-edit-dark {
        width: 24px;
        height: 24px;
        align-self: flex-end;
        margin-left: 15px;
      }

      .wrapper-carousel {
        position: static;
      }
    }
  }
}
.yellow-button-send-feedback {
  margin-top: 63px;
  width: 281px;
  height: 61px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 31px;
  border: solid 1px #fec02d;
  background-color: #fec02d !important;
  margin-left: 920px;
  text-transform: none;
}
.wrapper-full-screen-carousel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .md-button-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 25px 35px;
  }

  .carousel-upload-images {
    max-width: 942px;
    max-height: 530px;

    .carousel-upload-image {
      width: 942px;
      height: 530px;
    }
  }
}
</style>
