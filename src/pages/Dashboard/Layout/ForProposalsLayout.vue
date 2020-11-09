<template>
  <div class="for-proposals-layout-wrapper">
    <section class="header-wrapper">
      <div
        class="proposal-banner"
        :style="
          getHeaderImage
            ? `background-image: url('${getHeaderImage}');`
            : `background-image: url('https://static-maryoku.s3.amazonaws.com/storage/img/lock.jpg');`
        "
      >
        <h2 v-if="event && event.concept">{{ event.concept.name }}</h2>
        <h2 v-else>Meeting Event / Formal meeting</h2>
        <h5>{{ event.title }}</h5>
      </div>
      <div class="summary-cont">
        <ul>
          <li :class="[{ 'with-help': dateTooltip }]" @mouseover="dateTooltip = true" @mouseleave="dateTooltip = false">
            <img :src="`${proposalIconsUrl}Path 251 (2).svg`" />
            {{ eventDate }}
            <img v-if="dateTooltip" class="question" :src="`${proposalIconsUrl}Asset 582.svg`" />
            <div class="date-tooltip" v-if="dateTooltip">
              <h3>Your Time Suggestion</h3>
              <p>
                Client will get this proposal with
                <br />your new suggested date
              </p>
            </div>
          </li>
          <li>
            <img :src="`${proposalIconsUrl}Group 6085 (2).svg`" />
            {{ eventTime }}
          </li>
          <li>
            <img :src="`${proposalIconsUrl}Asset 573.svg`" />
            {{ getLocation }}
          </li>
          <li>
            <img :src="`${proposalIconsUrl}Asset 572.svg`" />
            {{ proposalRequest ? event.numberOfParticipants : "-" | withComma }}
          </li>
        </ul>
        <p v-if="event.concept">
          {{ event.concept.description }}
        </p>
        <div class="a-right">
          <a class="see-full" @click="fullDetailsModal = true">
            See Full Details
            <md-icon>keyboard_arrow_right</md-icon>
          </a>
        </div>
        <div class="pull-bottom-right">
          <vendor-bid-time-counter
            :key="getRemainingTime.seconds"
            :days="getRemainingTime.days"
            :hours="getRemainingTime.hours"
            :minutes="getRemainingTime.mins"
            :seconds="getRemainingTime.seconds"
            :content="'To send your bid'"
          />
        </div>
      </div>
    </section>
    <div class="main-cont">
      <router-view></router-view>
    </div>
    <section class="footer-wrapper">
      <div calss>
        <md-button class="prev-cont md-simple maryoku-btn md-black" @click="back()"
          ><img :src="`${proposalIconsUrl}Group 4770 (2).svg`" /> Back</md-button
        >
        <md-button @click="scrollToTop" class="md-button md-simple md-just-icon md-theme-default scroll-top-button">
          <img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17" />
        </md-button>
      </div>

      <div class="next-cont">
        <span>You can return to it till the deadline!</span>
        <a class="save" @click="saveProposal()"> <img :src="`${proposalIconsUrl}Asset 610.svg`" /> Save for later </a>
        <a
          class="next active"
          @click="step = step + 1"
          :class="[{ active: selectedServices.length > 0 }]"
          v-if="step < 3"
          >Next</a
        >
        <a class="next active" @click="saveProposal()" v-else>Submit Proposal</a>
      </div>
    </section>
    <modal v-if="fullDetailsModal" class="full-details-modal" container-class="modal-container lg">
      <template slot="header">
        <div class="full-details-modal__header">
          <div class="header-description" v-if="event.concept">
            {{ event.concept.description }}
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <img :src="`${proposalIconsUrl}Group 3671 (2).svg`" />
        </button>
      </template>
      <template slot="body">
        <div class="full-details-modal__body">
          <ul>
            <li>
              <img :src="`${landingIconsUrl}Path 251.svg`" />
              <span>
                <strong>Date:</strong>
                {{ eventDate }}
              </span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Group 6085.svg`" />
              <span>
                <strong>Time:</strong>
                {{ eventTime }}
              </span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Asset 506.svg`" />
              <span>
                <strong>Address:</strong>
                {{ getLocation }}
              </span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Asset 505.svg`" />
              <span>
                <strong>Guests:</strong>
                {{ proposalRequest ? event.numberOfParticipants : "-" | withComma }}
              </span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Path 1942.svg`" />
              <span>
                <strong>Type:</strong>
                {{ proposalRequest ? event.occasion : "-" }}
              </span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Path 1383.svg`" />
              <span>
                <strong>Invited:</strong>
                {{ proposalRequest ? event.participantsType : "-" }}
              </span>
            </li>
          </ul>
        </div>
      </template>
      <template slot="footer">
        <div class="full-details-modal__footer">
          <a class="see-full" @click="hideModal()">
            Hide Full Details
            <md-icon>keyboard_arrow_up</md-icon>
          </a>
        </div>
      </template>
    </modal>
    <modal v-if="savedItModal" class="saved-it-modal" container-class="modal-container sl">
      <template slot="header">
        <div class="saved-it-modal__header">
          <h3><img :src="`${proposalIconsUrl}Asset 588.svg`" />Saved It!</h3>
          <div class="header-description text-center">You can return to it till the deadline!</div>
        </div>
        <button class="close" @click="hideModal()">
          <img :src="`${proposalIconsUrl}Group 3671 (2).svg`" />
        </button>
      </template>
      <template slot="body">
        <div class="saved-it-modal__body">
          <div class="time-cont">
            <vendor-bid-time-counter :days="4" :hours="0" :minutes="0" :seconds="0" />
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="saved-it-modal__footer">
          <button class="cool" @click="hideModal()">Cool, Thanks</button>
        </div>
      </template>
    </modal>
    <modal v-if="openedModal == 'timeIsUp'" class="saved-it-modal" container-class="modal-container sl">
      <template slot="header">
        <div class="saved-it-modal__header">
          <h3><img :src="`${proposalIconsUrl}Asset 587.svg`" /> Time Is Up!</h3>
          <div class="header-description">
            The deadline for submitting this prposal has passed. But no worries! We will be with you soon with the next
            one.
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <img :src="`${proposalIconsUrl}Group 3671 (2).svg`" />
        </button>
      </template>
      <template slot="body">
        <div class="saved-it-modal__body">
          <div class="time-cont">
            <vendor-bid-time-counter :days="0" :hours="0" :minutes="0" :seconds="0" />
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="saved-it-modal__footer">
          <md-button class="md-red maryoku-btn" @click="hideModal()">Ok, Thanks</md-button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import moment from "moment";
import Vendors from "@/models/Vendors";
import ProposalRequest from "@/models/ProposalRequest";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import { Modal } from "@/components";

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import UserMenu from "./Extra/UserMenu.vue";
import ForVendors from "@/pages/app/Vendors/ForVendors.vue";
import VendorBidTimeCounter from "@/components/VendorBidTimeCounter/VendorBidTimeCounter";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    MobileMenu,
    VendorBidTimeCounter,
    UserMenu,
    Modal,
  },
  props: {
    newProposalRequest: Object,
  },
  data() {
    return {
      fullDetailsModal: false,
      proposalIconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
      landingIconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewLandingPage/",
      dateTooltip: false,
      selectedServices: [],
      savedItModal: false,
      isTimeUp: false,
      proposalRequestRequirements: [],
      proposals: [],
      proposalRequest: null,
      vendorCategory: null,
      event: "",
      openedModal: "",
    };
  },
  created() {
    this.$root.$on("send-event-data", (evtData) => {
      this.evtData = evtData;
    });

    if (this.$route.params.eventId) {
      this.getEvent();
    }

    this.fullDetailsModal = false;
    this.savedItModal = false;
    this.isTimeUp = false;

    this.getVendor(this.$route.params.vendorId).then((vendor) => {
      this.vendor = vendor;
    });
    this.getProposalRequest(this.$route.params.id).then((proposalRequest) => {
      this.$set(this, "proposalRequest", proposalRequest);
      this.event = proposalRequest.eventData;
      if (proposalRequest.eventData.concept) {
        this.$store.commit("vendorProposal/setWizardStep", 0);
        this.$store.commit("vendorProposal/setInitStep", 0);
      } else {
        this.$store.commit("vendorProposal/setWizardStep", 1);
        this.$store.commit("vendorProposal/setInitStep", 1);
      }
      this.proposalRequestRequirements = _.chain(proposalRequest.requirements)
        .groupBy("requirementPriority")
        .map(function (value, key) {
          return {
            title: key,
            requirements: value,
          };
        })
        .value();
    });
  },
  methods: {
    ...mapActions("vendorProposal", ["getVendor", "getProposalRequest"]),

    getProposal(id) {
      ProposalRequest.find(id)
        .then((resp) => {})
        .catch((error) => {
          console.log(" error ", error);
        });

      if (!this.proposalRequest) {
        this.proposalRequest = new ProposalRequest({
          id: this.$route.params.id,
        });
        this.proposalRequest.bidRange = { low: 0, high: 0 };
        this.proposalRequest.requirements = [];
        this.proposalRequest.bidderRank = 1;
        this.proposalRequest.eventData = {
          allocatedBudget: 0,
        };
        this.proposalRequest.isAgreed = true;
      }
    },
    getVendorCategory() {
      this.$auth.currentUser(
        this,
        true,
        function () {
          Vendors.find(this.$route.params.vendorId).then((vendor) => {
            this.vendorCategory = vendor.vendorCategory;
          });
        }.bind(this),
      );
    },
    getProposals(id) {
      new Vendors({ id })
        .proposalRequests()
        .first()
        .then((proposals) => {
          this.proposals = proposals.vendorProposals;
          this.firstTime = proposals.firstTime;
        });
    },
    // getProposal(id) {
    //   ProposalRequest.find(id)
    //     .then((resp) => {
    //       this.$set(this, "proposalRequest", resp);
    //       // this.$set(this, "newProposalRequest", resp);

    //       this.proposalRequestRequirements = _.chain(resp.requirements)
    //         .groupBy("requirementPriority")
    //         .map(function (value, key) {
    //           return {
    //             title: key,
    //             requirements: value,
    //           };
    //         })
    //         .value();
    //     })
    //     .catch((error) => {});
    // },
    hideModal() {
      this.fullDetailsModal = false;
      this.savedItModal = false;
      this.openedModal = "";
    },
    saveProposal() {
      this.$root.$emit("next-step-vendor-proposal");
      this.$root.$emit("clear-slide-pos");

      if (this.step == 3) {
        this.savedItModal = true;
      }

      if (this.step == -1) {
        this.step = 0;
      } else if (this.step == 0) {
        this.step = 2;
      } else if (this.step > 1 && this.step < 3) {
        this.step = this.step + 1;
      }

      this.scrollToTop();
    },
    back() {
      const initStep = this.$store.state.vendorProposal.initStep;
      if (this.step > initStep) {
        this.step = this.step - 1;
      } else {
        const vendorId = this.$route.params.vendorId;
        const requestId = this.$route.params.id;
        this.$router.push(`/vendors/${vendorId}/proposal-request/${requestId}`);
      }
      // this.$root.$emit("prev-step-vendor-proposal");
      // this.$root.$emit("clear-slide-pos");

      // if (this.step == 2) {
      //   this.step = 0;
      // } else if (this.step > 0 && this.step != 2) {
      //   this.step = this.step - 1;
      // } else {
      // }

      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    getEvent() {
      this.$store.dispatch("event/getEventById", this.$route.params.eventId);
    },
  },

  filters: {
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  computed: {
    eventDate() {
      const suggestionDate = this.$store.state.vendorProposal.suggestionDate;
      if (!this.event) return "-";

      let startDate = new Date(this.event.eventStartMillis);
      let endDate = new Date(this.event.eventEndMillis);
      if (suggestionDate && suggestionDate.length > 0) {
        startDate = new Date(suggestionDate[0].date);
        endDate = new Date(suggestionDate[suggestionDate.length - 1].date);
        return `${moment(suggestionDate[0].date, "DD/MM/YYYY").format("MMM D, YYYY")} - ${moment(
          suggestionDate[suggestionDate.length - 1].date,
          "DD/MM/YYYY",
        ).format("MMM D, YYYY")}`;
      }
      return `${moment(startDate).format("MMM D, YYYY")} - ${moment(endDate).format("MMM D, YYYY")}`;
    },
    eventTime() {
      if (!this.event) return "-";

      let startDate = new Date(this.event.eventStartMillis);
      let endDate = new Date(this.event.eventEndMillis);
      return `${moment(startDate).format("hh:mmA")} - ${moment(endDate).format("hh:mmA")}`;
    },
    getEventDuration() {
      return moment.duration(this.event.eventEndMillis - this.event.eventStartMillis).humanize();
    },
    getLocation() {
      if (this.proposalRequest) {
        return this.event.location || "-";
      } else {
        return "-";
      }
    },
    getServiceCategory() {
      if (this.proposalRequest.requirementsCategory) {
        return this.proposalRequest.requirementsCategory;
      } else {
        return this.vendorCategory;
      }
    },
    getHeaderImage() {
      if (this.event && this.event.concept) {
        return this.event.concept.images[new Date().getTime() % 4].url;
      }
      return "";
    },
    getRemainingTime() {
      if (!this.proposalRequest) return { days: 0, hours: 0, mins: 0, seconds: 0 };
      let remainingMs = this.proposalRequest.expiredTime - new Date().getTime();
      if (remainingMs <= 0) {
        this.isTimeUp = true;
        this.openedModal = "timeIsUp";
        return { days: 0, hours: 0, mins: 0, seconds: 0 };
      }
      const days = Math.floor(remainingMs / 24 / 3600 / 1000);
      remainingMs = remainingMs - days * 24 * 3600 * 1000;
      const hours = Math.floor(remainingMs / 3600 / 1000);
      remainingMs = remainingMs - hours * 3600 * 1000;
      const mins = Math.floor(remainingMs / 60 / 1000);
      remainingMs = remainingMs - mins * 60 * 1000;
      const seconds = Math.floor(remainingMs / 1000);
      return { days, hours, mins, seconds };
    },
    step: {
      get: function () {
        return this.$store.state.vendorProposal.wizardStep;
      },
      set: function (newValue) {
        this.$store.commit("vendorProposal/setWizardStep", newValue);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.for-proposals-layout-wrapper {
  font-family: "Manrope-Regular", sans-serif;
  overflow: hidden;
  background: #f5f5f5;

  section.header-wrapper {
    background-color: #ffffff;
    position: absolute;
    width: 100%;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

    .proposal-banner {
      background-image: url("https://static-maryoku.s3.amazonaws.com/storage/img/lock.jpg");
      clip-path: circle(111% at 0% 50%);
      shape-outside: circle(111% at 0% 50%) border-box;
      background-size: cover;
      background-repeat: no-repeat;
      display: block;
      float: left;
      padding: 90px 96px;
      color: #ffffff;
      width: 495px;
      height: 273px;

      h2 {
        font-size: 50px;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.77);
        font-family: "Cooperative-Regular", sans-serif;
        font-size: 50px;
        text-transform: uppercase;
        margin: 0;
      }
      h5 {
        margin-top: 8px;
        margin-bottom: 0;
        font-family: "Manrope-Regular", sans-serif;
        font-size: 20px;
        font-weight: bold;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.77);
      }
    }
    .summary-cont {
      font-family: "Manrope-Regular", sans-serif;
      width: calc(100% - 454px);
      display: inline-block;
      padding-top: 47px;
      padding-left: 41px;

      ul {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0;
        margin: 0;
        color: #050505;

        li {
          font-size: 16px;
          font-weight: bold;
          padding: 9px 25px;
          display: flex;
          margin-right: 40px;

          img {
            width: 20px;
            margin-right: 10px;
          }

          i {
            color: #818080;
            padding-right: 8px;
          }

          &.with-help {
            background: #ffedb7;
            cursor: pointer;
            position: relative;

            img {
              &.question {
                margin-left: 12px;
                margin-right: 0;
              }
            }

            .date-tooltip {
              position: absolute;
              display: inline-block;
              width: 300px;
              background-color: #ffedb7;
              padding: 24px 32px;
              color: #050505;
              font-size: 14px;
              left: 2rem;
              top: 3.5rem;
              text-align: center;

              h3 {
                font-size: 20px;
                font-weight: 800;
                margin-top: 0;
                margin-bottom: 17px;
              }
              p {
                font-size: 16px;
                max-width: 100% !important;
                margin: 0;
              }

              &::after {
                content: "";
                position: absolute;
                width: 0;
                height: 0;
                top: 4px;
                left: 70px;
                box-sizing: border-box;

                border: 12px solid black;
                border-color: transparent transparent #ffedb7 #ffedb7;

                transform-origin: 0 0;
                transform: rotate(135deg);
              }
            }
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
      p {
        font-size: 16px;
        font-weight: normal;
        color: #050505;
        max-width: 60%;
        margin: 2rem 0;
      }
      .a-right {
        text-align: right;
        max-width: 60%;

        i {
          position: relative;
          top: -1px;
        }
      }
      .pull-bottom-right {
        position: absolute;
        right: 64px;
        bottom: 0;
      }
    }
  }
  .main-cont {
    margin-top: 263px;
    margin-bottom: 90px;
    width: 100%;

    .back-to-top {
      margin: 0 auto;
      margin-top: 36px;
      text-align: center;

      span {
        display: inline-block;
        color: #818080;
        font-size: 20px;
        font-weight: 800;
        margin-bottom: 22px;
      }
      .row {
        display: inline-block;
        cursor: pointer;
        font-size: 20px;
        font-weight: 800;
        color: #f51355;
        i {
          color: #f51355;
        }
      }
    }
  }
  section.footer-wrapper {
    padding: 33px 63px 34px 64px;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;
    z-index: 9999;
    overflow: hidden;

    .prev-cont {
      font-size: 16px;
      font-weight: 800;
      cursor: pointer;

      img {
        width: 20px;
        transform: rotate(180deg);
      }
    }
    .next-cont {
      span {
        font-size: 14px;
        font-weight: normal;
        margin-right: 41px;
      }
      a {
        padding: 18px 49px;
        cursor: pointer;
        border-radius: 3px;
        font-size: 20px;
        font-weight: 800;
        display: inline-block;
        min-width: 268px;
        text-align: center;

        &.save {
          border: 1px solid #f51355;
          color: #f51355;
          margin-right: 41px;

          img {
            width: 25px;
            margin-right: 12px;
          }
        }
        &.next {
          background: #d5d5d5;
          color: #ffffff;

          &:hover {
            color: #ffffff !important;
          }
        }
      }
    }
  }
  .full-details-modal {
    &__header {
      width: 100%;
      padding: 55px 295px 24px 31px;
      .header-description {
        font-size: 16px;
        line-height: 1.69;
        max-width: 750px;
      }
      & + .close {
        background: transparent;
        border: none;
        position: absolute;
        top: 61px;
        right: 60px;
        color: #050505;
        cursor: pointer;

        img {
          width: 20px;
        }
      }
    }
    &__body {
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        padding-bottom: 26px;

        li {
          padding-left: 31px;
          text-align: left;
          margin-bottom: 50px;

          strong {
            min-width: 86px;
            margin-right: 20px;
            display: inline-block;
          }

          img {
            width: 18px;
            margin-right: 26px;
          }

          span {
            font-size: 20px;
            strong {
              font-weight: bold;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    &__footer {
      padding: 1rem;
      margin-top: -2rem;
    }
  }
  .saved-it-modal {
    &__header {
      width: 100%;
      padding: 1rem;
      text-align: center;
      h3 {
        font-size: 30px;
        font-weight: bold;
        color: #f51355;

        img {
          width: 55px;
          height: 55px;
          margin-right: 15px;
        }
      }
      .header-description {
        max-width: 550px;
        margin: 0 auto;
        text-align: left;
        font-size: 20px;
        color: #050505;

        &.text-center {
          text-align: center;
        }
      }
      & + .close {
        background: transparent;
        border: none;
        position: absolute;
        top: 61px;
        right: 60px;
        color: #050505;
        cursor: pointer;
        img {
          width: 20px;
        }
      }
    }
    &__body {
      .time-cont {
        max-width: 320px;
        margin: 0 auto;
      }
    }
    &__footer {
      padding: 1rem;
      margin-top: -2rem;
    }
  }
  .see-full {
    font-size: 16px;
    font-weight: 800;
    color: #f51355 !important;
    cursor: pointer;

    i {
      color: #f51355 !important;
    }
    &:visited {
      color: #f51355 !important;
    }
  }
  .active {
    background-color: #f51355 !important;

    i {
      color: #ffffff !important;
    }
  }
  .cool {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-color: #f51355;
    border-radius: 3px;
    padding: 8px 36px;
    cursor: pointer;
    border: none;
  }
  .hide-full {
    font-size: 16px;
    font-weight: 800;
    color: #f51355;
    cursor: pointer;

    i {
      color: #f51355;
    }
  }
}
</style>
