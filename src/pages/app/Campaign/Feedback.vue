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
            Change Cover
          </md-button>
        </div>
        <div class="view-event-photos" >
          <div class="wrapper-icon-play" >
            <img class="icon-play" src="https://cdn.zeplin.io/5e24629a581f9329a242e986/assets/9b892cf0-5507-4cdb-9828-1d10baa61381.svg" />
          </div>
          <div class="wrapper-btn-switch" >
            <hide-switch class="btn-switch" label="View A Presentation From The Event Photos" />
          </div>
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
            <hide-switch label="Hide Logo" />
          </div>
          <span class="hello-microsoft-special-employee">
            Hello Microsoft special employee!
          </span>
        </div>
      </div>
      <div class="mt-70 mb-40">
        <img class="icon-thanks-for-participating mr-20" :src="`${$iconURL}Campaign/group-9380.svg`" />
        <div class="mt-10">
          <div class="font-size-40 font-bold line-height-1 mb-20">THANKS FOR PARTICIPATING!</div>
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
            <span class="font-size-30 font-bold line-height-1">WE WOULD LOVE TO HEAR YOUR FEEDBACK</span>
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
            :disabled="true"
          ></feedback-question>
        </div>
      </div>
      <div class="mt-60 d-flex align-center" v-if="isEditingNewQuestion">
        <input v-model="newQuestion" style="width: 40%" />
        <md-button class="md-simple md-red maryoku-btn" @click="addNewQuestion">Add</md-button>
        <md-button class="md-simple md-red maryoku-btn md-outlined" @click="isEditingNewQuestion = false">
          Cancel
        </md-button>
      </div>
      <div class="mt-60 d-flex justify-content-between" v-else>
        <md-button class="md-simple edit-btn md-red" @click="editNewQuestion">
          <img :src="`${$iconURL}Campaign/Group 9327.svg`" class="mr-20" />Add Another Qestion
        </md-button>
        <div class="wrapper-icon-edit-dark pt-50" >
          <img class="icon-edit-dark" :src="`${$iconURL}common/edit-dark.svg`" />
        </div>
      </div>
    </div>
    <div class="feedback-campaign-carousel p-50">
      <div class="d-flex align-center pt-50 pb-50" >
        <!--        <img class="icon-pictures-of-all-the-fun-we-experienced" :src="`${$iconURL}Campaign/group-7321.svg`" />-->
        <img :src="`${$iconURL}FeedbackForm/Group%2028057.svg`" />
        <div class="ml-20 d-flex flex-wrap flex-column" >
          <div class="d-flex" >
            <span class="font-size-30 font-bold line-height-1">PICTURES OF ALL THE FUN WE EXPERIENCED</span>
            <img class="icon-edit-dark" :src="`${$iconURL}common/edit-dark.svg`" />
          </div>
          <span class="Include-photos-details-of-the-event">
            (Include photos & details of the event)
          </span>
        </div>
      </div>
      <feedback-image-carousel
        class="p-10"
        :items="2.5"
        :margin-items="10"
        :images="campaignData.images"
        @addImage="addNewImage"
      />
    </div>
    <div class="green-block-wrapper">
      <div class="p-50 d-flex">
        <div class="mr-80">
          <div class="icon-and-text">
            <img class="left-icon" src="/static/icons/green-block-icon-1.svg">
            <div class="right-text-style">share with us photos you took from the event</div>
          </div>
          <div class="d-flex align-center font-bold">
            Allow guests to upload photos form the event
            <md-switch class="feedback-btn-switch section below-label large-switch md-switch-rose switch-button-style" v-model="campaignData.visibleSettings.allowUploadPhoto" >
              <span v-if="campaignData.visibleSettings.allowUploadPhoto">Hide</span>
              <span v-if="!campaignData.visibleSettings.allowUploadPhoto">Show</span>
            </md-switch>
          </div>
        </div>
        <div>
          <div class="icon-and-text">
            <img class="left-icon" src="/static/icons/green-block-icon-2.svg">
            <div class="right-text-style">Material from the event</div>
          </div>
          <div class="d-flex align-center font-bold">
            Download files related to the event
            <img class="lightbulb" src="https://static-maryoku.s3.amazonaws.com/storage/icons/common/light.svg" >
            <md-switch class="feedback-btn-switch section below-label large-switch md-switch-rose switch-button-style" v-model="campaignData.visibleSettings.downloadFiles" >
              <span v-if="campaignData.visibleSettings.downloadFiles">Hide</span>
              <span v-if="!campaignData.visibleSettings.downloadFiles">Show</span>
            </md-switch>
          </div>
          <div class="mb-20">Like presentation</div>
          <div v-if="campaignData.files && campaignData.files.length > 1">
            <span class="font-bold">{{ campaignData.files[0].name }}</span>
          </div>
          <md-button class="md-simple edit-btn md-red" @click="uploadFile">
            <img :src="`${$iconURL}Campaign/Group 9241.svg`" class="mr-10" />Upload File
          </md-button>
          <input type="file" id="file-uploader" @change="changeUploadFile" class="d-none" />
        </div>
      </div>
    </div>
    <div class="p-50 mt-10">
      <div class="share-panel">
        <div class="d-flex mb-10 align-center">
          <img :src="`${$iconURL}Campaign/group-9386.svg`" class="mr-20" />
          <div class="ml-30 mr-40">
            <div class="font-size-30 font-bold line-height-2">SHARE EVENT PARTICIPATION</div>
            <div>(Include photos & details of the event)</div>
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

export default {
  components: {
    MaryokuTextarea,
    FeedbackImageCarousel,
    SharingButtonGroup,
    FeedbackQuestion,
    TitleEditor,
    HideSwitch,
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
    };
  },
  created() {
    this.placeHolder = `Thank you so much for attending! We are so glad you could join us.
    Please take a moment to help us improve future events by taking a brief survey.
    Your feedback is extremely valuable to our ongoing effort to offer great ${
      this.event.guestType || "employee"
    } experience.

    If you have photos, documents or other event materials that you want to share, you can upload them here.
    All materials is also available for download from this page.

    We look forward to seeing you again soon!
    `;
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
      console.log(image);
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
        label: this.newQuestion,
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

  .icon-thanks-for-participating {
    width: 92px;
    height: 95px;
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
.icon-and-text{
  display: flex;
  align-items: start;
}
.left-icon{
  margin-right: 20px;
}
.lightbulb{
  width: 27px;
  margin: 0 65px 0 15px;
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

  .icon-edit-dark {
    width: 24px;
    height: 24px;
    align-self: flex-end;
    margin-left: 15px;
  }
}


</style>
