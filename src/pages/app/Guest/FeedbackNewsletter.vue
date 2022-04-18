<template>
  <div class="feedback-wrapper" style="background-image: url('/static/img/feedbackBackground.png')">
    <div class="smaller-wrapper">
      <img class="squares" src="static/img/Group%2029554.svg"/>
      <img class="mask-group" src="static/img/Mask%20Group%2029248.svg"/>
      <div class="content-wrapper" style="position: relative">
        <div class="left-content">
          <div style="margin-top: 30px">
            <img src="static/img/Group%2029333.svg" height="33"/>
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
            <img class="curved-arrow" src="static/img/Group%2029335.svg" height="33"/>

          </div>

        </div>

        <div class="right-content">
          <img src="static/img/Group%2029645.svg" height="170" style="margin-top: 160px"/>

          <span class="thanks-message">Your rating has been submitted.
            <br/>
            Thanks for your feedback!</span>
          <span class="ratings-message">Ratings help vendors to evaluate and improve their service standard, ensuring the
          optimal experience every time. We hope to see you at the next event!</span>
          <button class="md-button md-simple md-vendor rate-button" >Rate Again</button>
        </div>
      </div>


    </div>
    <div class="shmoozz" style="position: absolute">
      <img src="static/img/Group%2029327.svg" height="33"/>
    </div>
  </div>

</template>

<script>
export default {
  name: "FeedbackNewsletter"
}
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
        background-color: #ffefff;
        height: inherit;
        text-align: center;
        align-items: center;
        .thanks-message{
          font-size: 20px;
          font-weight: 800;
          font-family: 'Manrope-Bold';
          line-height: 1.4;
          color: #641856;
        }
        .ratings-message{
          font-size: 16px;
          line-height: 1.75;
          color: #050505;
        }
        .rate-button{
          border: 1px solid;
          width: 300px;
          height: 50px;
          border-radius: 3px;
          font-size: 14px;
          font-family: 'Manrope-Bold';
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