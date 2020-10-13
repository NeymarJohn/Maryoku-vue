<template>
  <div class="vendor-signup-step5-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${$iconURL}Vendor+Signup/recommendation.png`" />
        <h2>
          GET <br />
          RECOMMENDATIONS
        </h2>
        <p>
          We strongly recommend getting a recommendation from a customer so that potential customers can be impressed
          with your profile and choose you over other providers
        </p>
        <h2>5/5</h2>
      </div>
      <div class="right-side">
        <div class="mb-50 card">
          <div class="title-cont mb-50">
            <div class="top">
              <div class="font-size-22 font-bold">
                <img :src="`${$iconURL}common/user-dark.svg`" class="page-icon" /> Customer details
              </div>
            </div>
            <div class="bottom">
              <p>From which you would like to request a recommendation</p>
            </div>
          </div>
          <div>
            <div class="mb-50">
              <label class="font-bold">Company Name</label>
              <maryoku-input
                class="form-input mt-10"
                inputStyle="company"
                v-model="companyName"
                placeholder="Type name of company here..."
              ></maryoku-input>
            </div>
            <div class="mb-50">
              <label class="font-bold">Contact Person's Name</label>
              <maryoku-input
                class="form-input mt-10"
                inputStyle="username"
                v-model="contactPersonName"
                placeholder="Type your name here..."
              ></maryoku-input>
            </div>
            <div class="mb-50">
              <label class="font-bold">Email</label>
              <maryoku-input
                class="form-input mt-10"
                data-vv-name="email"
                v-model="email"
                inputStyle="email"
                placeholder="Type email address here..."
              ></maryoku-input>
            </div>
            <div class="mb-50">
              <label class="font-bold">Date Of The Event</label>
              <md-datepicker v-model="eventDate" />
            </div>
          </div>
          <div>
            <md-button class="edit-btn md-simple md-red">
              <md-icon class="color-red font-size-24">add_circle_outline</md-icon>
              Add Another Recommendation</md-button
            >
          </div>
        </div>
        <div class="card">
          <div class="d-flex align-center">
            <img :src="`${$iconURL}Vendor+Signup/priview-recommedation.png`" class="mr-20" />
            <div class="flex-1">
              <div class="color-red font-size-22 font-bold">PREVIEW TO WHAT WE'LL SEND TO YOUR CUSTOMER</div>
              <div class="color-red font-size-16 mt-10">This is what your recommender will get in our email</div>
            </div>
            <div>
              <md-icon class="color-red font-size-30">keyboard_arrow_right</md-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.vendor-signup-step5-wrapper {
  font-family: Manrope-Regular, sans-serif;

  .inside-container {
    display: flex;
    color: #050505;

    .left-side {
      flex: 1;
      margin-right: 122px;

      img {
        width: 92.5px;
      }
      h4 {
        margin: 36px 0 11px 0;
        font: 800 20px Manrope-Regular, sans-serif;
      }
      p {
        margin: 0;
        padding: 0;
        font: normal 16px Manrope-Regular, sans-serif;
      }
      h2 {
        margin: 30px 0;
        font: 800 40px Manrope-Regular, sans-serif;
      }
      h3 {
        margin: 0;
        color: #f51355;
        font: bold 20px Manrope-Regular, sans-serif;
      }
    }
    .right-side {
      flex: 3;

      .card {
        padding: 40px 60px 40px 60px;
        background-color: #ffffff;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      }
    }
  }
}
</style>
<script>
import { SignupCard, MaryokuInput } from "@/components";

export default {
  components: {
    MaryokuInput,
  },
  data() {
    return {
      companyName: "",
      contactPersonName: "",
      email: "",
      eventDate: "",
    };
  },
};
</script>