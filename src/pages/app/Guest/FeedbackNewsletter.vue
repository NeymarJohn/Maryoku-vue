<template>
  <div class="feedback-wrapper" style="background-image: url('/static/img/feedbackBackground.png')">
    <div class="smaller-wrapper">
      <img class="squares" src="static/img/Group%2029554.svg"/>
      <img class="mask-group" src="static/img/Mask%20Group%2029248.svg"/>
      <div class="content-wrapper" style="position: relative">
        <div class="left-content">
          <div style="margin-top: 30px">
            <img src="static/img/Group%2029333.svg" />
          </div>
          <h1 class="congrats">
            Congratulations!
          </h1>
          <span class="booked">The Catering Vendor is booked.</span>
          <br/>
          <span>Need more vendors? We can find the
            right service provider for any need!</span>
          <br/>
          <div style="margin-top: 50px; position: relative; overflow: visible; width: fit-content">
            <md-button class="md-vendor" >
              Show Me More Vendors
            </md-button>
            <img class="curved-arrow" src="static/img/Group%2029335.svg" />

          </div>

        </div>

        <div v-if="rated" class="right-content">
          <img src="static/img/Group%2029645.svg" style="margin-top: 160px"/>
          <span class="thanks-message">
            Your rating has been submitted.
            <br/>
            Thanks for your feedback!
          </span>
          <span class="ratings-message">Ratings help vendors to evaluate and improve their service standard, ensuring the
            optimal experience every time. We hope to see you at the next event!</span>
          <button class="md-button md-simple md-vendor rate-button" @click="rateAgain">
            <img src="static/img/Path%2015101.svg" style="margin-right: 10px"/>
            Rate Again
          </button>
        </div>

        <div v-else class="right-content">
          <span class="thanks-message" style="color: black; margin-top: 60px">
            Please Rate Your
            <br/>
            Experience?
          </span>
          <div style="height: 200px;margin-top: 160px">
            <img :src="'static/img/rate/'+rateImgLink[rateValue]" style=""/>
          </div>
          <div style="width: 200px" id="rateFeedbackSlider">
            <slider :value="rateValue" :range="{min:1, max:5}" :options="{step:1}" @input="setScore"/>
          </div>

          <div class="ratings-message footer-message" :class="{commentIsShown}">
            <div @click="toggelShowComment">
              <img src="static/img/Path%2015072.svg" style="margin-right: 10px" />
              Add comment
            </div>
            <textarea v-if="commentIsShown" v-model="commentText" style="margin-top: 10px; height: 150px"/>

            <button class="md-button md-simple md-vendor rate-button" @click="saveRate">
              Rate
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="shmoozz" style="position: absolute">
      <img src="static/img/Group%2029327.svg" />
    </div>
  </div>

</template>

<script>
import {Slider} from "../../../components";
export default {
  name: "FeedbackNewsletter",
  components: {
    Slider,
  },
  data(){
    return {
      rated: false,
      rateValue: "5.00",
      rateImgLink:{
        "1.00":"Group 29631.svg",
        "2.00":"Group 29636.svg",
        "3.00":"Group 29635.svg",
        "4.00":"Group 29634.svg",
        "5.00":"Group 29597.svg",
      },
      commentIsShown: false,
      commentText:"",
    };
  },
  methods:{
    saveRate(){
      localStorage.setItem("rate", JSON.stringify({commentText: this.commentText, rate: this.rateValue}));
      this.rated = true;
    },
    rateAgain(){
      this.rated = false;
    },
    setScore(e){
      this.rateValue = e;
    },
    toggelShowComment(){
      this.commentIsShown = !this.commentIsShown;
    }
  },
};
</script>

<style lang="scss" scoped>
html{
  background-color: #FFFFFF;
}
.feedback-wrapper {
  position: relative;
  width: 100vw;
  margin-top: -150px;
  .smaller-wrapper {
    position: relative;
    top: 100px;
    background-color: #FFFFFF;
    margin: 150px 60px;
    padding-bottom: 100px;
    height: 800px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    .squares {
      position: absolute;
      top: -130px;
      left: -180px;
    }
    .mask-group{
      position: absolute;
      bottom: 0;
      right: 200px;
    }
    .content-wrapper {
      display: flex;
      justify-content: space-between;
      margin-left: 250px;
      line-height: 1.33;
      height: inherit;
      .left-content{
        font-size: 42px;
        max-width: 850px;
        .congrats {
          padding-top: 0;
          margin-top: 20px;
          font-family: 'Manrope-Bold';
          color:  #f51355;
        }
        .booked{
          color:  #f51355;
        }
        .curved-arrow{
          position: absolute;
          right: -210px;
          top: -75px;
        }
      }
      .right-content {
        display: flex;
        flex-direction: column;
        width: 420px;
        padding: 0 40px;
        background-color: #ffefff;
        height: inherit;
        text-align: center;
        align-items: center;
        position: relative;
        .thanks-message{
          font-size: 20px;
          font-weight: 800;
          font-family: 'Manrope-Bold';
          line-height: 1.4;
          color: #641856;
          margin-top: 20px;
        }
        .ratings-message{
          font-size: 16px;
          line-height: 1.75;
          color: #050505;
          margin-top: 20px;
        }
        .rate-button{
          position: absolute;
          bottom: 20px;
          border: 1px solid;
          width: 300px;
          height: 50px;
          border-radius: 3px;
          font-size: 14px;
          font-family: 'Manrope-Bold';
        }
        .footer-message {
          position: absolute;
          bottom: 60px;
          width: 300px;
          height: 50px;
          border-radius: 3px;
          font-size: 14px;
          font-family: 'Manrope-Bold';
          &.commentIsShown{
            bottom: 229px;
          }
          div{
            margin-bottom: 10px;
            text-align: left;
            font-size: 16px;
            cursor: pointer;
          }
          .rate-button {
            position: unset;
          }
        }
      }
    }
  }
  .shmoozz {
    position: absolute;
    top: 30px;
    right: 60px;

  }

}
</style>