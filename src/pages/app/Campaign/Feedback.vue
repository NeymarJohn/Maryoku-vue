<template>
  <div class="feedback-campaign">
    <div class="p-50">
      <!--      <div class="font-size-30 font-bold-extra mb-50 text-transform-capitalize">Say thank you and ask for feedback</div>-->
      <div class="font-size-30 font-bold-extra mb-50 text-transform-capitalize">Create Feedback Campaign</div>
      <!--      <hr />-->
      <div class="wrapper-change-cover" >
        <img src="https://cdn.zeplin.io/5e24629a581f9329a242e986/assets/b7f79f04-be35-428e-be75-e59ffa4dc187.png" class="change-cover mr-10" />
        <div class="change-cover-feedback">
          <md-button class="md-button md-red maryoku-btn md-theme-default change-cover-btn" >
            <img :src="`${$iconURL}Campaign/Group 2344.svg`" class="mr-10" style="width: 20px" />
            Change Campaign Cover
          </md-button>
        </div>
        <div class="view-event-photos" >
          <div class="wrapper-icon-play" >
            <img class="icon-play" src="https://cdn.zeplin.io/5e24629a581f9329a242e986/assets/9b892cf0-5507-4cdb-9828-1d10baa61381.svg" />
          </div>
          <div class="wrapper-btn-switch" >
            <hide-switch v-model="campaignData.visibleSettings.showImages" class="btn-switch" label="View event photo presentation" />

          </div>
            <div v-if="isUploadedFiles" class="view-presentation-description" >
                <img class="mr-10" src="static/icons/red-arrow-down.svg" />
                <span class="text-description" >Download all the attachments (3) </span>
            </div>
            <div v-else class="view-presentation-description" >
                <img  src="static/icons/red-arrow-down.svg" />
                <div class="text-description-upload-files" @click="openModalWindow" >Upload Files </div>
                <div class="add-attachments-text">Add attachments to the event</div>
            </div>
            <FeedbackUploadFilesModal v-if="showModalWindowOpen" @close="closeModalWindow"/>
        </div>
        <div class="footer-change-cover" >
          <div class="wrapper-logo-microsoft" >
            <div class="logo-microsoft" >
              <div class="icon-microsoft" >
                <div class="block block1" />
                <div class="block block2" />
                <div class="block block3" />
                <div class="block block4" />
              </div>
              <h2>
                Microsoft
              </h2>
            </div>
            <hide-switch v-model="campaignData.visibleSettings.showLogo" label=" Logo" />
          </div>
          <span class="hello-microsoft-special-employee">
            Hello Microsoft special employee!
          </span>
        </div>
      </div>
      <div class="mt-70 mb-40">
        <img class="icon-thanks-for-participating-feedback" :src="`${$iconURL}Campaign/group-9380.svg`" />
        <div class="mt-10">
            <custom-title-editor
                :defaultValue="feedbackTitle"
                @change="handleChangeData('feedbackTitle', ...arguments)"
                class="font-size-60 font-bold line-height-1 mb-20"
            ></custom-title-editor>
            <custom-title-editor
                :defaultValue="feedbackSubTitle"
                @change="handleChangeData('feedbackSubTitle', ...arguments)"
                class="disco-party"
            ></custom-title-editor>
          <div class="font-size-22 line-height-1">{{ campaignData.name }}</div>
          <!-- <title-editor :value="info.conceptName" @change="changeTitle" class="mt-40"></title-editor> -->
        </div>
      </div>
      <maryoku-textarea :placeholder="placeHolder" v-model="campaignData.description"></maryoku-textarea>
    </div>
    <div class="feedback-campaign-list p-50">
      <div>
        <div class="d-flex justify-content-between" >
          <div class="d-flex align-center justify-content-between" >
            <img :src="`${$iconURL}Campaign/group-7321.svg`" class="icon-feedback mr-20" />
            <span class="font-size-30 font-bold line-height-1">YOUR FEEDBACK MATTERS TO US</span>
          </div>
          <div>
            <hide-switch v-model="campaignData.visibleSettings.showFeedback" label="feedback section"></hide-switch>
          </div>
        </div>
        <div v-if="campaignData.visibleSettings.showFeedback">
          <feedback-question
            v-for="(question, index) in feedbackQuestions"
            :key="index"
            :feedbackData="question"
            :disabled="false"
            placeholder="Enter your feedback here"
          ></feedback-question>
        </div>
      </div>
      <div class="mt-60 d-flex align-center add-new-question-block" v-if="isEditingNewQuestion">
        <div>
            <div class="add-new-question-title">Rank The...Vendor</div>
            <input v-model="newQuestionLabel" class="add-new-question-input-1" placeholder="Rank The Catering Vendor |" />
        </div>
        <div>
            <div class="add-new-question-title">Write Your Question Here</div>
            <input v-model="newQuestion" class="add-new-question-input-2" placeholder="How was the activity?" />
        </div>
        <div class="add-new-question-button-block">
            <md-button class="md-button md-red maryoku-btn md-theme-default maryoku-btn add-button-style" @click="addNewQuestion">Add</md-button>
            <img :src="`${$iconURL}Campaign/Group+3602.svg`" @click="isEditingNewQuestion = false" />
        </div>
      </div>
      <div class="mt-60 d-flex justify-content-between" v-else>
        <md-button class="md-simple edit-btn md-red" @click="editNewQuestion">
          <img :src="`${$iconURL}Campaign/Group 9327.svg`" class="mr-20" />Add Another Question
        </md-button>
      </div>
    </div>
    <div class="feedback-campaign-carousel p-50">
      <div class="d-flex align-center pt-50 pb-50" >
        <img :src="`${$iconURL}FeedbackForm/Group%2028057.svg`" />
        <div class="ml-20 d-flex flex-wrap flex-column" >
            <custom-title-editor
                :defaultValue="feedbackSliderTitle"
                @change="handleChangeData('feedbackSliderTitle', ...arguments)"
                class="font-size-30 font-bold line-height-1 pt-20"
            ></custom-title-editor>
          <span class="Include-photos-details-of-the-event">
            (See photos and details about the event)
          </span>
        </div>
      </div>
      <feedback-image-carousel
        class="p-10"
        :items="2.5"
        :margin-items="10"
        :images="campaignData.images"
        :show-upload-file="true"
        @addImage="addNewImage"
      />
    </div>
    <div class="green-block-wrapper">
      <div class="p-50 d-flex">
        <div>
          <div class="icon-and-text">
            <img class="left-icon" src="/static/icons/green-block-icon-1.svg">
            <div class="right-text-style">share with us photos you took from the event</div>
          </div>
          <div class="d-flex align-center font-bold ml-60">
            Allow guests to upload photos from the event
            <md-switch class="feedback-btn-switch section below-label large-switch md-switch-rose switch-button-style" v-model="campaignData.visibleSettings.allowUploadPhoto" >
              <span v-if="campaignData.visibleSettings.allowUploadPhoto">Hide</span>
              <span v-if="!campaignData.visibleSettings.allowUploadPhoto">Show</span>
            </md-switch>
          </div>
        </div>
      </div>
    </div>
    <div class="p-50 mt-10">
      <div class="share-panel">
        <div class="d-flex mb-10 align-center">
          <img :src="`${$iconURL}Campaign/group-9386.svg`" class="mr-20" />
          <div class="ml-30 mr-40">
            <div class="font-size-30 font-bold line-height-2">SHARE EVENT PARTICIPATION</div>
            <div>(Share photos and details about the event)</div>
          </div>
          <hide-switch v-model="campaignData.visibleSettings.showSharingOption" label="sharing option"></hide-switch>
        </div>
        <sharing-button-group
          v-if="campaignData.visibleSettings.showSharingOption"
        ></sharing-button-group>
      </div>
    </div>
  </div>
</template>
<script>
import MaryokuTextarea from "@/components/Inputs/MaryokuTextarea";
import FeedbackImageCarousel from "./components/FeedbackImageCarousel";
import SharingButtonGroup from "./components/SharingButtonGroup";
import FeedbackQuestion from "./components/FeedbackQuestion";
import TitleEditor from "./components/TitleEditor";
import HideSwitch from "@/components/HideSwitch";
import Swal from "sweetalert2";
import FeedbackUploadFilesModal from "@/pages/app/Campaign/FeedbackUploadFilesModal";
import CustomTitleEditor from "@/pages/app/Campaign/components/CustomTitleEditor";

export default {
  components: {
    MaryokuTextarea,
    FeedbackImageCarousel,
    SharingButtonGroup,
    FeedbackQuestion,
    TitleEditor,
    HideSwitch,
    FeedbackUploadFilesModal,
    CustomTitleEditor,
  },
  props: {
    info: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      placeHolder: "",
      originalContent: {},
      feedbackQuestions: [],
      isEditingNewQuestion: false,
      newQuestion: "",
      newQuestionLabel : "",
      editingContent: [],
      isUploadedFiles: false,
      showModalWindowOpen : false,
      feedbackTitle : "THANKS FOR PARTICIPATING!",
      feedbackSubTitle : "80’s Disco Party ",
      feedbackSliderTitle : "EVENT PHOTOS – RELIVE THE BEST MOMENTS"
    };
  },
  created() {
    this.placeHolder = `
      Thanks for attending this recent event – we hope you had a wonderful, productive experience!
      Your feedback is important to help us understand what worked especially well, on top of
      anything you feel could be improved in the future.
    `;
    this.placeHolder = this.placeHolder.trim();
    // this.comment = this.placeHolder.trim().replace(/  /g, '');
    this.placeHolder = this.placeHolder.trim().replace(/  /g, "");
    this.feedbackQuestions = [
      {
        label: "Rate your overall experience",
        question: "How was the event?",
        showQuestion: true,
        rank: 0,
        icon: "",
      },
    ];
    this.event.components
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
  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    campaignData() {
        console.log('this.$store.state.campaign.FEEDBACK', this.$store.state.campaign.FEEDBACK)
      return this.$store.state.campaign.FEEDBACK;
    },
    campaignTitle() {
      return this.$store.state.campaign.FEEDBACK ? this.$store.state.campaign.FEEDBACK.title : "Event Name";
    },
  },
  methods: {
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
    addNewImage(image) {
      const images = this.campaignData.images;
      images.unshift({ src: image.imageString });
      this.$store.commit("campaign/setAttribute", { name: "FEEDBACK", key: "images", value: images });
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
    editNewQuestion() {
      this.isEditingNewQuestion = true;
    },
    addNewQuestion() {
      const newQuestion = {
        icon: "",
        label: this.newQuestionLabel,
        question: this.newQuestion,
        rank: 0,
        showQuestion: true,
      };
      this.feedbackQuestions.push(newQuestion);
      this.newQuestion = "";
      // const feedbackQuestions = [...this.campaignData.feedbackQuestions, newQuestion];
      // console.log(feedbackQuestions);
      // this.$store.commit("campaign/setAttribute", {
      //   name: "FEEDBACK",
      //   key: "feedbackQuestions",
      //   value: feedbackQuestions,
      // });
      this.isEditingNewQuestion = false;
    },
    openModalWindow(){
        this.showModalWindowOpen = true;
    },
      closeModalWindow(){
          this.showModalWindowOpen = false;
      },
      handleChangeData(key, value) {
          this.key = value
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
    filter: brightness(50%);
    object-fit: none;
    border-radius: 20px;
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
    width: 438px;
    height: 51px;
    margin-right: 46px;
}
.add-new-question-input-2{
    width: 476px;
    height: 51px;
    margin-right: 33px;
}
.add-new-question-title{
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 16px;
}
.add-new-question-button-block{
    display: flex;
    margin-top: 38px;
}
.view-presentation-description {
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
