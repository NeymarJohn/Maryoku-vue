<template>
  <div class="for-vendors-layout-wrapper">
    <section class="header-wrapper">
      <div class="vendors-header">
        <ul>
          <li class="logo">
            <a href="https://www.maryoku.com">
              <img src="https://www.maryoku.com/img/maryoku-logo.png" />
            </a>
          </li>
          <li>
            <a href="https://www.maryoku.com">ABOUT US</a>
          </li>
        </ul>
      </div>
      <p>
        <a href="https://www.maryoku.com/for-vendors" target="_blank">Get your the best jobs</a>
      </p>
      <div class="pull-top-right">
        <vendor-bid-time-counter
          :key="getRemainingTime.seconds"
          :days="getRemainingTime.days"
          :hours="getRemainingTime.hours"
          :minutes="getRemainingTime.mins"
          :seconds="getRemainingTime.seconds"
        />
      </div>
    </section>
    <div
      class="banner"
      :style="
        backgroundImage
          ? `background-image: url('${backgroundImage}');`
          : `background-image: url('https://static-maryoku.s3.amazonaws.com/storage/img/lock.jpg');`
      "
    >
      <div class="banner-content">
        <h3>Congratulations!</h3>
        <p>
          We found you could fit perfectly for our event with your
          <strong v-if="vendor">{{ vendor.eventCategory.fullTitle }}</strong> services.
        </p>
        <button type="submit" class="submit" @click="goToForm()">Submit Now</button>
      </div>
    </div>
    <router-view></router-view>
    <section class="footer-wrapper">
      <div class="vendors-footer">
        <ul>
          <li class="logo">
            <a href="https://www.maryoku.com">
              <img src="https://www.maryoku.com/img/maryoku-logo.png" />
            </a>
          </li>
          <li>
            <p>Who are we and why are we great?</p>
          </li>
          <li>
            <a href="https://www.maryoku.com" target="_blank">
              <img :src="`${iconsUrl}Asset 273.svg`" />
            </a>
          </li>
        </ul>
      </div>
    </section>
    <signup-request-modal v-if="showSignup"></signup-request-modal>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import UserMenu from "./Extra/UserMenu.vue";
import ForVendors from "@/pages/app/Vendors/ForVendors.vue";
import VendorBidTimeCounter from "@/pages/app/Vendors/components/VendorBidTimeCounter.vue";
import SignupRequestModal from "@/components/Modals/VendorProposal/SignupRequestModal.vue";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    MobileMenu,
    VendorBidTimeCounter,
    UserMenu,
    SignupRequestModal,
  },
  data() {
    return {
      iconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor%20Landing%20Page/",
      vendor: null,
      event: null,
      proposalRequest: null,
      showSignup: false,
    };
  },
  mounted() {
    this.getVendor(this.$route.params.vendorId)
      .then((vendor) => {
        this.vendor = vendor;
      })
      .catch((e) => {
        this.showSignup = true;
      });
    this.getProposalRequest(this.$route.params.rfpId).then((proposalRequest) => {
      this.proposalRequest = proposalRequest;
      this.event = this.proposalRequest.eventData;
    });
  },
  methods: {
    ...mapActions("vendorProposal", ["getVendor", "getProposalRequest"]),
    goToForm() {
      this.$root.$emit("go-to-proposal-form");
    },
  },

  computed: {
    backgroundImage() {
      if (this.event && this.event.concept) {
        return this.event.concept.images[new Date().getTime() % 4].url;
      }
      return "";
    },
    getRemainingTime() {
      if (!this.proposalRequest) return { days: 0, hours: 0, mins: 0, seconds: 0 };
      console.log(this.proposalRequest.expiredTime);
      console.log(new Date().getTime());
      let remainingMs = this.proposalRequest.expiredTime - new Date().getTime();
      const days = Math.floor(remainingMs / 24 / 3600 / 1000);
      remainingMs = remainingMs - days * 24 * 3600 * 1000;
      const hours = Math.floor(remainingMs / 3600 / 1000);
      remainingMs = remainingMs - hours * 3600 * 1000;
      const mins = Math.floor(remainingMs / 60 / 1000);
      remainingMs = remainingMs - mins * 60 * 1000;
      const seconds = Math.floor(remainingMs / 1000);
      return { days, hours, mins, seconds };
    },
  },
};
</script>
<style lang="scss" scoped>
.for-vendors-layout-wrapper {
  margin-top: -20px;
  font-family: "Manrope-Regular", sans-serif;
  background-color: #f5f5f5;
  overflow: hidden;

  section.header-wrapper {
    color: #ffffff;
    position: absolute;
    padding: 54.5px 64px;
    width: 100%;
    z-index: 1;
    ul {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0;

      li {
        font-size: 22px;
        font-weight: 800;
        padding-left: 2rem;

        &.logo {
          padding-left: 0;
          padding-right: 2rem;
          border-right: 3px solid #ffffff;
        }
        a {
          color: #ffffff;
          &:hover {
            color: #707070;
          }
        }
      }
    }
    p {
      font-size: 20px;
      a {
        color: #ffffff;
        &:hover {
          color: #707070;
        }
      }
    }
    .pull-top-right {
      position: absolute;
      right: 117.6px;
      top: 1em;
    }
  }
  section.footer-wrapper {
    z-index: 9999;
    position: absolute;
    width: 100%;
    overflow: hidden;
    background-color: #404040;
    min-height: 110px;

    .vendors-footer {
      ul {
        list-style: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        padding: 0;
        margin: 0;
        top: 30px;
        left: 2.5rem;

        li {
          padding-right: 20px;
          p {
            font-size: 16px;
            color: #ffffff;
          }
          span.lt {
            padding: 8px 12px;
            color: #f51355;
            width: 37px;
            height: 37px;
            font-weight: 900;
            background-color: #ffffff;
            border-radius: 50%;
          }
          &:last-child {
            img {
              width: 37px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .banner {
    background-image: url("https://static-maryoku.s3.amazonaws.com/storage/img/lock.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    min-height: 600px;
    color: #ffffff;
    position: relative;
    &-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: black;
      opacity: 0.2;
    }
    h3 {
      font-family: "Manrope-Regular", sans-serif;
      font-size: 60px;
      font-weight: bold;
    }
    p {
      font-family: "Manrope-Regular", sans-serif;
      font-size: 22px;
      font-weight: 500;
      line-height: 1.95;
      max-width: 566px;
      margin: 0 auto;

      strong {
        text-transform: capitalize;
        font-size: 26px;
        font-weight: 800;
      }
    }
    .submit {
      font-family: "Manrope-Regular", sans-serif;
      margin-top: 1rem;
      background-color: #f51355;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      border: none;
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      min-width: 382px;
      padding: 20px 0;
      cursor: pointer;
      border-radius: 3px;
    }
  }
}
</style>
