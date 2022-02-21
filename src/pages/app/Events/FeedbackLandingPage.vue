<template>
  <div class="main-layout">
    <div class="paper-layout">
      <div class="position-relative" >
        <div v-if="showFeedbackMessageSuccessful" class="feedback-message-successful" >
          <div class="feedback-message-successful-logo" >
            <img
              width="75"
              height="78"
              :src="`${$iconURL}FeedbackForm/Group 28058.svg`"
            />
            <h3>
              The feedback was
              sent successfully!
            </h3>
          </div>
          <div class="feedback-message-successful-text" >
            <h2>
              Thank you for your cooperation!
            </h2>
            <div>
              <span class="font-size-18" >
                You make us better, for you and for future customers.
              </span>
              <span class="font-size-18 font-bold" >
                See you at the next event :)
              </span>
            </div>
          </div>
          <button class="feedback-message-successful-btn-close bg-white" @click="closeFeedbackMessageSuccessful" >
            <img width="34" height="34" src="static/icons/vendor/proposalBoard/filter-inactive.svg" />
          </button>
        </div>
      </div>
      <div class="header-cover-image" >
        <img src="https://cdn.zeplin.io/5e24629a581f9329a242e986/assets/b7f79f04-be35-428e-be75-e59ffa4dc187.png" />
      </div>
      <div class="content" >
        <div class="decoration-line" >
          <div class="decoration-item-line item-line-1" />
          <div class="decoration-item-line item-line-2" />
          <div class="decoration-item-line item-line-3" />
          <div class="decoration-item-line item-line-4" />
        </div>
        <div class="content-article" >
          <div class="content-article-header" >
            <div class="d-flex mb-70" >
              <feedback-logo v-if="campaign && campaign.visibleSettings.showLogo" class="mt-30" />
              <div v-if="campaign && campaign.visibleSettings.showImages" class="wrapper-view-presentation" >
                <div class="view-presentation" >
                  <view-presentation
                    cover-image="https://cdn.zeplin.io/5e24629a581f9329a242e986/assets/fde9a712-f55d-4a96-b0ce-7df0ac9c1661.png"
                  />
                </div>
              </div>
            </div>
            <div class="wrapper-thanks-for-participating">
              <img class="icon-thanks-for-participating mr-20" :src="`${$iconURL}Campaign/group-9380.svg`" />
              <div class="mt-10">
                <div class="font-size-40 font-bold line-height-1">THANKS FOR PARTICIPATING!</div>
                <div class="subtitle">80’s Disco Party</div>
              </div>
              <div class="message" >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua.
                At vero eos et accusam et justo duo dolores et ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam. Clita kasd gubergren,
                no sea takimata sanctus est Lorem ipsum dolor sit amet.
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam
              </div>
              <img
                width="27"
                height="37"
                src="static/icons/double-arrow-down-gray.svg"
              />
            </div>
          </div>
          <div v-if="!showFeedbackMessageSuccessful" class="content-article-main-content" >
            <div class="feedback-question-list">
              <div>
                <div class="d-flex justify-content-between" >
                  <div class="d-flex align-center justify-content-between" >
                    <img :src="`${$iconURL}Campaign/group-7321.svg`" class="icon-feedback mr-20" />
                    <span class="font-size-30 font-bold line-height-1">YOUR FEEDBACK MATTERS TO US</span>
                  </div>
                </div>
                <div v-if="campaign && campaign.visibleSettings.showFeedback">
                  <feedback-question
                    v-for="(question, index) in feedbackQuestions"
                    v-if="question.showQuestion"
                    :key="index"
                    :feedbackData="question"
                    :disabled="false"
                    :show-switch="false"
                  ></feedback-question>
                </div>
                <md-button class="yellow-button-send-feedback" @click="sendFeedback" >Send feedback</md-button>
              </div>
            </div>
          </div>
          <div class="content-article-footer" >
            <div class="d-flex align-center pt-50 pb-50" >
              <img :src="`${$iconURL}FeedbackForm/Group%2028057.svg`" />
              <div class="ml-20 d-flex flex-wrap flex-column" >
                <div class="d-flex" >
                  <span class="font-size-30 font-bold line-height-1">EVENT PHOTOS – RELIVE THE BEST MOMENTS</span>
                </div>
              </div>
            </div>
            <div class="wrapper-carousel" >
              <feedback-image-carousel
                class="p-10"
                :items="2.5"
                :margin-items="10"
                :images="images"
                @addImage="addNewImage"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="campaign && campaign.visibleSettings.allowUploadPhoto" class="green-block-wrapper">
        <div class="p-50 d-flex">
          <div class="margin-left-style-first-block position-relative">
            <div  class="icon-and-text">
              <img class="left-icon" src="/static/icons/green-block-icon-1.svg">
              <div class="right-text-style">share with us photos you took from the event</div>
            </div>
            <drop @drop="handleDrop">
              <div class="white-cube drop" >
                <div class="border-cube">
                  <div class="title-text-drag-and-drop">Drag & Drop</div>
                  <div class="or-section">\\ Or \\</div>
                  <div class="upload-text-area">
                    <img src="/static/icons/arrow-up-red.svg" class="mr-10" />
                    Upload Files
                  </div>
                </div>
              </div>
            </drop>
          </div>
        </div>
      </div>
      <div v-if="campaign && campaign.visibleSettings.showSharingOption" class="lets_share_block" >
        <div class="lets_share_text">Let's share all this fun :)</div>
        <sharing-button-group
          class="sharing-button-group-wrapper"
          :copyLink="true"
        ></sharing-button-group>
      </div>
      <div style="color:#fff" class="ml-50" >last block</div>
    </div>
    <div class="text-center logo maryoku_provided_by" @click="gotoWeb">
      <span class="mr-10">Provided by   </span>
      <img  :src="`${$iconURL}RSVP/maryoku - logo dark@2x.png`" />
      <span class="mb-10">&#169</span>
    </div>
    <div class="landing-footer">
      <div class="landing-footer-item">
        <md-button
          @click="scrollToTop()"
          class="md-button md-button md-simple md-just-icon md-theme-default scroll-top-button md-theme-default mt-40">
          <span>
            <img src="https://static-maryoku.s3.amazonaws.com/storage/icons/Budget+Requirements/Asset+49.svg" class="upward-button" />
          </span>
        </md-button>
      </div>
    </div>
  </div>
</template>
<script>
import CalendarEvent from "@/models/CalendarEvent";
import Feedback from "@/models/Feedback";
import Campaign from "@/models/Campaign";
import ViewPresentation from '@/pages/app/Campaign/components/ViewPresentation';
import FeedbackLogo from "@/pages/app/Campaign/components/FeedbackLogo";
import MaryokuTextarea from "@/components/Inputs/MaryokuTextarea";
import FeedbackImageCarousel from "@/pages/app/Campaign/components/FeedbackImageCarousel";
import SharingButtonGroup from "@/pages/app/Campaign/components/SharingButtonGroup";
import FeedbackQuestion from "@/pages/app/Campaign/components/FeedbackQuestion";
import TitleEditor from "@/pages/app/Campaign/components/TitleEditor";
import HideSwitch from "@/components/HideSwitch";
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";
import S3Service from "@/services/s3.service";
import { Drag, Drop } from 'vue-drag-drop';

export default {
  components: {
    MaryokuTextarea,
    FeedbackImageCarousel,
    SharingButtonGroup,
    FeedbackQuestion,
    TitleEditor,
    HideSwitch,
    FeedbackLogo,
    ViewPresentation,
    Drag,
    Drop,
},

  data() {
    return {
      isLoading: true,
      campaign: null,
      event: null,
      placeHolder: "",
      originalContent: {},
      info: {},
      images: [],
      showFeedbackMessageSuccessful : false,
    };
  },
  created() {
    this.placeHolder = `Thank you so much for attending! We are so glad you could join us.
      Please take a moment to help us improve future events by taking a brief survey.
      Your feedback is extremely valuable to our ongoing effort to offer great experience.

      If you have photos, documents or other event materials that you want to share, you can upload them here.
      All materials is also available for download from this page.

      We look forward to seeing you again soon!
    `;

    const eventId = this.$route.params.eventId;
    const calendarEvent = new CalendarEvent({ id: eventId });

    this.getCampaigns({ event: calendarEvent }).then((campaigns) => {
      this.isLoading = false;
      this.campaign = campaigns["FEEDBACK"];
      this.event = this.campaign.event;
      this.images = this.campaign.images;
      this.feedbackQuestions = this.campaign.feedbackQuestions;
    });
  },
  methods: {
    ...mapActions("campaign", ["getCampaigns"]),
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    gotoWeb() {
      window.open("https://www.maryoku.com", "_blank");
    },
    setDefault() {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this feedback!`,
        showCancelButton: true,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Yes, revert it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.editingContent = Object.assign({}, this.originalContent);
        }
      });
    },
    addNewImage({ imageString, file }) {
      const fileName = `${this.campaign.id}-${new Date().getTime()}`;
      const extension = file.type.split("/")[1];
      this.images.unshift({
        src: `${process.env.S3_URL}feedback/${this.campaign.id}/${fileName}.${extension}`,
        imageData: imageString,
      });
      S3Service.fileUpload(file, `fileName`, `feedback/${this.campaign.id}`).then((res) => {});
    },
    uploadFile() {
      document.getElementById("file-uploader").click();
    },
    changeUploadFile(event) {
      const fileName = event.target.files[0].name;
      this.editingContent.push({
        name: fileName,
      });
    },
    sendFeedback() {
      let email = this.$route.query.email;
      if(email === undefined){
        email = "test@gmail.com"
      }
      const feedbackQuestions = [];
      this.campaign.feedbackQuestions.forEach((item) => {
        if (!item.showQuestion) return;
        feedbackQuestions.push({
          question: item.question,
          comment: item.comment,
          rate: item.rank,
          label: item.label || "General",
          event: new CalendarEvent({ id: this.event.id }),
        });
      });
      new Feedback({
        guestName: email,
        guestEmail: email,
        guestComment: "",
        feedbackCampaign: new Campaign({ id: this.campaign.id }),
        feedbackQuestions: feedbackQuestions,
        images: this.images,
      })
        .save()
        .then((res) => {
          Swal.fire({
            title: "",
            text: "Thank you for your feedback!",
            type: "success",
            confirmButtonClass: "md-button md-red maryoku-btn",
            buttonsStyling: false,
          });
          this.openFeedbackMessageSuccessful();
        })
        .catch((e) => {
          Swal.fire({
            title: "Invalid information",
            text: "Could you please check if you input all information on given form?",
            type: "error",
            confirmButtonClass: "md-button md-red maryoku-btn",
            buttonsStyling: false,
          });
        });
    },
    changeFeedback(index, value) {
      this.campaign.feedbackQuestions[index] = value;
    },
    closeFeedbackMessageSuccessful() {
      this.showFeedbackMessageSuccessful = false;
    },
    openFeedbackMessageSuccessful() {
      this.showFeedbackMessageSuccessful = true;
    },
    handleDrop(data, event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      const filenames = [];
      for (let i = 0; i < files.length; i++) {
        filenames.push(files.item(i).name);
      }
      alert(`You dropped files: ${JSON.stringify(filenames)}`);
    },
  },
  computed: {
    availableQuestions() {
      return this.campaign.feedbackQuestions.filter((item) => item.showQuestion);
    },
  },
};
</script>

<style lang="scss" scoped>
.paper-layout{
  width: 1520px;
  height: auto;
  margin: 80px auto;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

  .feedback-message-successful {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    padding: 50px;
    border-radius: 30px 30px 0 0;
    background: #fff;

    .feedback-message-successful-logo {
      display: flex;
      align-items: center;
      margin-left: 100px;

      h3 {
        width: 200px;
        margin-left: 40px;
        line-height: 1.55;
        font-size: 22px;
        font-weight: bold;
        color: #f51355;
      }
    }

    .feedback-message-successful-text {
      h2 {
        font-size: 30px;
        font-weight: 800;
        text-transform: uppercase;
        margin: 0;
      }
    }

    .feedback-message-successful-btn-close {
      padding: 20px;
      border: none;
      outline: none;
      background: #ffffff !important;
      box-shadow: none;
    }
  }

}


.landing-footer{
  width: 100%;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
  height: 126.3px;
}
.landing-footer-item{
  width: 1520px;
  margin: 40px auto;
}
.upward-button {
  width: 20px;
  height: 15px;
  margin-bottom: 5px;
}
.maryoku_provided_by{
  margin: 102px 0 92px 0;
}
.lets_share_block{
  width: 520px;
  height: 120px;
  margin: 100px auto;
}
.lets_share_text{
  font-size: 30px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #050505;
}
.green-block-wrapper{
  background-color: rgba(87, 242, 195, 0.23);
  height: 312px;
  margin-bottom: 273px;
}
.icon-and-text{
  display: flex;
  align-items: start;
}
.left-icon{
  margin-right: 20px;
  width: 36px;
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
.white-cube{
  width: 1200px;
  height: 303px;
  background-color: #fff;
  position: absolute;
  top: 80px;
  border-radius: 3px;
  box-shadow: 0 0 41px 0 rgba(0, 0, 0, 0.08);
}
.margin-left-style-first-block{
  margin-left: 113px;
}
.title-text-drag-and-drop{
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
.or-section{
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.38px;
  text-align: center;
  color: #707070;
}
.upload-text-area{
  width: 136px;
  font-size: 16px;
  font-weight: 800;
  color: #f51355 !important;
  text-transform: none;
  text-decoration: underline;
  margin: 20px auto;
}
.right-white-cube-item{
  margin: 23px 0 0 67px;
  font-size: 16px;
  font-weight: 600;
  color: #050505;
}
.underline-red-text{
  font-size: 16px;
  font-weight: 600;
  color: #f51355;
  text-decoration: underline;
}
.red-text-margin{
  margin: 34px 0 0 67px;
}
.header-cover-image {
  img {
    width: 1520px;
    height: 437px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    object-fit: cover;
  }
}

.content {
  width: 100%;
  display: flex;
  position: relative;

  .decoration-line {
    width: 27px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;

    .decoration-item-line {
      width: 100%;
      height: 283px;
    }

    .item-line-1 {
      background: #ff48b2;
    }

    .item-line-2 {
      background: #71ecf8;
    }

    .item-line-3 {
      background: #fff500;
    }

    .item-line-4 {
      background: #57f2c3;
    }
  }

  .content-article {
    width: 100%;

    .content-article-header {
      padding-left: 167px;
      margin-bottom: 45px;

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

      .wrapper-thanks-for-participating {
        max-width: 900px;
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
  }}
.yellow-button-send-feedback{
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
</style>
