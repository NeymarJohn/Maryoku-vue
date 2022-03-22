<template>
  <div class="main-layout">
    <div class="paper-layout">
      <div class="header-cover-image">
        <img src="https://cdn.zeplin.io/5e24629a581f9329a242e986/assets/b7f79f04-be35-428e-be75-e59ffa4dc187.png">
      </div>
      <div class="content">
        <div class="decoration-line">
          <div class="decoration-item-line item-line-1" />
          <div class="decoration-item-line item-line-2" />
          <div class="decoration-item-line item-line-3" />
          <div class="decoration-item-line item-line-4" />
        </div>
        <div class="content-article">
          <div class="content-article-header">
            <div class="d-flex mb-70">
              <feedback-logo class="mt-30" />
              <div class="wrapper-view-presentation">
                <div class="view-presentation">
                  <view-presentation
                    cover-image="https://cdn.zeplin.io/5e24629a581f9329a242e986/assets/fde9a712-f55d-4a96-b0ce-7df0ac9c1661.png"
                  />
                </div>
              </div>
            </div>
            <div class="wrapper-thanks-for-participating">
              <img class="icon-thanks-for-participating mr-20" :src="`${$iconURL}Campaign/group-9380.svg`">
              <div class="mt-10">
                <div class="font-size-40 font-bold line-height-1">
                  THANKS FOR PARTICIPATING!
                </div>
                <div class="subtitle">
                  80’s Disco Party
                </div>
              </div>
              <div class="message">
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
              >
            </div>
          </div>
          <div class="content-article-main-content">
            <div class="feedback-question-list">
              <div>
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-center justify-content-between">
                    <img :src="`${$iconURL}Campaign/group-7321.svg`" class="icon-feedback mr-20">
                    <span class="font-size-30 font-bold line-height-1">WE WOULD LOVE TO HEAR YOUR FEEDBACK</span>
                  </div>
                </div>
                <div v-if="campaignData.visibleSettings.showFeedback">
                  <feedback-question
                    v-for="(question, index) in feedbackQuestions"
                    :key="index"
                    :feedback-data="question"
                    :disabled="false"
                    :show-switch="false"
                  />
                </div>
                <md-button class="yellow-button-send-feedback">
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
                  <span class="font-size-30 font-bold line-height-1">PICTURES OF ALL THE FUN WE EXPERIENCED</span>
                </div>
              </div>
            </div>
            <div class="wrapper-carousel">
              <feedback-image-carousel
                class="p-10"
                :items="2.5"
                :margin-items="10"
                :images="campaignData.images"
                @addImage="addNewImage"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="green-block-wrapper">
        <div class="p-50 d-flex">
          <div class="margin-left-style-first-block position-relative">
            <div class="icon-and-text">
              <img class="left-icon" src="/static/icons/green-block-icon-1.svg">
              <div class="right-text-style">
                share with us photos you took from the event
              </div>
            </div>
            <div class="white-cube">
              <div class="border-cube">
                <div class="title-text-drag-and-drop">
                  Drag and drop your photos from event
                </div>
                <div class="or-section">
                  \\ Or \\
                </div>
                <md-button class="md-red border-cube-button">
                  <img src="/static/icons/white-arrow-up.svg" class="mr-10">
                  Upload photos from your computer
                </md-button>
              </div>
            </div>
          </div>
          <div class="margin-left-style-second-block position-relative">
            <div class="icon-and-text">
              <img class="left-icon" src="/static/icons/green-block-icon-2.svg">
              <div class="right-text-style">
                Material from the event
              </div>
            </div>
            <div class="white-cube">
              <div class="mt-60">
                <div class="right-white-cube-item">
                  <img src="/static/icons/black-arrow-down.svg" class="mr-10">
                  <span>The name of the presentation at the event.ppx</span>
                </div>
                <div class="right-white-cube-item">
                  <img src="/static/icons/black-arrow-down.svg" class="mr-10">
                  <span>The name of the presentation at the event.doc</span>
                </div>
                <div class="right-white-cube-item">
                  <img src="/static/icons/black-arrow-down.svg" class="mr-10">
                  <span>The name of the presentation at the event.exe</span>
                </div>
              </div>
              <div class="red-text-margin">
                <img src="/static/icons/red-arrow-down.svg" class="mr-10">
                <span class="underline-red-text">Download all the Files from event</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lets_share_block">
        <div class="lets_share_text">
          Let's share all this fun :)
        </div>
        <sharing-button-group
          class="sharing-button-group-wrapper"
          :copy-link="true"
        />
      </div>
      <div style="color:#fff" class="ml-50">
        last block
      </div>
    </div>
    <div class="text-center logo maryoku_provided_by" @click="gotoWeb">
      <span>Provided by  &nbsp;</span>
      <img :src="`${$iconURL}RSVP/maryoku - logo dark@2x.png`">
    </div>
    <div class="landing-footer">
      <div class="landing-footer-item">
        <md-button
          class="md-button md-button md-simple md-just-icon md-theme-default scroll-top-button md-theme-default mt-40"
          @click="scrollToTop()"
        >
          <span>
            <img src="https://static-maryoku.s3.amazonaws.com/storage/icons/Budget+Requirements/Asset+49.svg" class="upward-button">
          </span>
        </md-button>
      </div>
    </div>
  </div>
</template>
<script>
import ViewPresentation from "@/pages/app/Campaign/components/ViewPresentation";
import FeedbackLogo from "@/pages/app/Campaign/components/FeedbackLogo";
import HideSwitch from "@/components/HideSwitch";
import FeedbackQuestion from "@/pages/app/Campaign/components/FeedbackQuestion";
import FeedbackImageCarousel from "@/pages/app/Campaign/components/FeedbackImageCarousel";
import { mapActions } from "vuex";
import SharingButtonGroup from "@/pages/app/Campaign/components/SharingButtonGroup.vue";
export default {
  name: "LandingVue",
  components:{
    SharingButtonGroup,
    FeedbackLogo,
    ViewPresentation,
    HideSwitch,
    FeedbackQuestion,
    FeedbackImageCarousel,
  },
  data() {
    return {
      feedbackQuestions: [],
      isEditingNewQuestion: false,
      newQuestion: "",
    };
  },
  created() {
    console.log("this.$store.state", this.$store.state);
    this.getCampaigns({ event: this.event });
    this.placeHolder = `Thank you so much for attending! We are so glad you could join us.
      Please take a moment to help us improve future events by taking a brief survey.
      Your feedback is extremely valuable to our ongoing effort to offer great ${
      this.event.guestType || "employee"
    } experience.

      If you have photos, documents or other event materials that you want to share, you can upload them here.
      All materials is also available for download from this page.

      We look forward to seeing you again soon!`;
    this.placeHolder = this.placeHolder.trim();
    // this.comment = this.placeHolder.trim().replace(/  /g, '');
    this.placeHolder = this.placeHolder.trim().replace(/  /g, "");
    this.feedbackQuestions = [
      {
        question: "What did you like or dislike about this event?",
        showQuestion: true,
        rank: 0,
        icon: "",
      },
    ];
    (this.event.components || [])
      .sort((a, b) => {
        return a.order - b.order;
      })
      .forEach((service) => {
        if (service.eventCategory.type == "service") {
          this.feedbackQuestions.push({
            question: `How Was The ${service.eventCategory.fullTitle}?`,
            showQuestion: true,
            rank: 0,
            icon: service.eventCategory.icon,
            label: service.eventCategory.fullTitle,
          });
        }
      });
    this.$store.commit("campaign/setAttribute", {
      name: "FEEDBACK",
      key: "feedbackQuestions",
      value: this.feedbackQuestions,
    });
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    gotoWeb() {
      window.open("https://www.maryoku.com", "_blank");
    },
    ...mapActions("campaign", ["getCampaigns"]),
    setDefaultSettings() {
      const currentCampaignType = this.campaignTabs[this.selectedTab].name;
      const currentCampaign = this.$store.state.campaign[currentCampaignType];
      if (currentCampaign && currentCampaign.settings) {
        this.deliverySettings = {
          ...currentCampaign.settings,
        };
      } else {
        this.deliverySettings = { ...this.defaultSettings };
      }
    },
    addNewQuestion() {
      const newQuestion = {
        icon: "",
        label: this.newQuestion,
        question: this.newQuestion,
        rank: 0,
        showQuestion: true,
      };
      this.feedbackQuestions.push(newQuestion);
      this.newQuestion = "";
      this.isEditingNewQuestion = false;
    },
    editNewQuestion() {
      this.isEditingNewQuestion = true;
    },
    addNewImage(image) {
      console.log(image);
      const images = this.campaignData.images;
      images.unshift({ src: image.imageString });
      this.$store.commit("campaign/setAttribute", { name: "FEEDBACK", key: "images", value: images });
    }
  },
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    campaignData () {
      return this.$store.state.campaign.FEEDBACK;
    }
  },
};
</script>

<style lang="scss" scoped>
.paper-layout{
  background-color: #f5f5f5;
}
.paper-layout{
  width: 1520px;
  margin: 80px auto;
  background-color: #ffffff;
  //height: 100vh;
  height: auto;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  border-radius: 30px;
}
.landing-footer{
  width: 100%;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
  height: 126.3px;
}
.landing-footer-item{
  width: 1520px;
  margin: 40px auto 0;
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
  font-family: Manrope;
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
}
.right-text-style{
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 800;
  width: 431px;
  height: 82px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
}
.white-cube{
  width: 575px;
  height: 303px;
  background-color: #fff;
  position: absolute;
  top: 150px;
  border-radius: 3px;
  box-shadow: 0 0 41px 0 rgba(0, 0, 0, 0.08);
}
.border-cube{
  width: 551px;
  height: 279px;
  margin: 12px;
  border: 2px dashed #808080;
}
.margin-left-style-first-block{
  margin-left: 113px;
}
.margin-left-style-second-block{
  margin-left: 160px;
}
.title-text-drag-and-drop{
  font-family: Manrope;
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.56;
  letter-spacing: normal;
  text-align: center;
  color: black;
  margin-top: 50px;
}
.or-section{
  font-family: Manrope;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.38px;
  text-align: center;
  color: #171717;
  margin-top: 20px;
}
.border-cube-button{
  margin: 30px 0 0 30px;
  font-family: Manrope;
  font-size: 18px;
  font-weight: 800;
  color: #fff;
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
  display: flex;

  .decoration-line {
    width: 27px;
    display: flex;
    flex-direction: column;

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
