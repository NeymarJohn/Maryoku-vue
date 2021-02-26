<template>
  <div class="for-proposals-layout-wrapper">
    <section class="header-wrapper">
      <div class="background-image">
        <div class="d-flex concept-image-wrapper" v-if="event.concept">
          <div
            v-for="(color, index) in event.concept.colors"
            :key="`header-image-${index}-1`"
            class="concept-color"
            :style="`background: ${color.color || '#EDEDED'}`"
          >
            <img class="concept-image" :src="`${event.concept.images[index].thumb_url}`" />
          </div>
          <div
            v-for="(color, index) in event.concept.colors"
            :key="`header-image-${index}-2`"
            class="concept-color"
            :style="`background: ${color.color || '#EDEDED'}`"
          >
            <img class="concept-image" :src="`${event.concept.images[index].thumb_url}`" />
          </div>
        </div>
      </div>
      <div class="proposal-banner">
        <div class="header-content">
          <ul>
            <li class="font-size-30">
              {{ event.concept ? event.concept.name : event.title }}
            </li>
            <li>
              <img class="company-logo" alt="" v-if="event.owner.companyLogo" :src="`${event.owner.companyLogo}`" />
              {{ event.owner.company }}
            </li>
          </ul>
        </div>
        <div class="summary-cont">
          <ul>
            <li>
              <img :src="`${$iconURL}common/users-white.svg`" />
              {{ proposalRequest ? event.numberOfParticipants : "-" | withComma }}
            </li>
            <li>
              <img :src="`${$iconURL}common/clock-white.svg`" />
              {{ eventTime }}
            </li>
            <li
              :class="[{ 'with-help': dateTooltip && suggestionDate }]"
              @mouseover="dateTooltip = true"
              @mouseleave="dateTooltip = false"
            >
              <img :src="`${$iconURL}common/calendar-white.svg`" />
              {{ eventDate }}
              <img v-if="dateTooltip && suggestionDate" class="question" :src="`${proposalIconsUrl}Asset 582.svg`" />
              <div class="date-tooltip" v-if="dateTooltip && suggestionDate">
                <h3>Your Time Suggestion</h3>
                <p>
                  Client will get this proposal with
                  <br />your new suggested date
                </p>
              </div>
            </li>

            <li>
              <img :src="`${$iconURL}common/location-white.svg`" />
              {{ getLocation }}
            </li>

            <li>
              <a class="see-full" @click="fullDetailsModal = true">
                <u>Full Details</u>
                <md-icon>keyboard_arrow_right</md-icon>
              </a>
            </li>
          </ul>
        </div>
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
        <a class="save" @click="saveProposal('save')">
          <img :src="`${proposalIconsUrl}Asset 610.svg`" /> Save for later
        </a>
        <a
          class="next active"
          @click="step = step + 1"
          :class="[{ active: selectedServices.length > 0 }]"
          v-if="step < 3"
          >Next</a
        >
        <a class="next active" @click="saveProposal('submit')" v-else>Submit Proposal</a>
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
                {{ proposalRequest ? event.eventType.name : "-" }}
              </span>
            </li>
            <li>
              <img :src="`${landingIconsUrl}Path 1383.svg`" />
              <span>
                <strong>Invited:</strong>
                {{ proposalRequest && event.guestType ? event.guestType : "-" }}
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
    <modal v-if="submittedModal" class="saved-it-modal" container-class="modal-container sl">
      <template slot="header">
        <div class="saved-it-modal__header">
          <img :src="`${proposalIconsUrl}thanks-proposal.png`" />
          <div class="font-size-30 font-bold color-red mt-30">Thank you for submitting a proposal!</div>
          <div class="text-center font-size-22 mt-40 mb-40">You will get a reply in 4 days</div>
        </div>
        <button class="close" @click="hideModal()">
          <img :src="`${proposalIconsUrl}Group 3671 (2).svg`" />
        </button>
      </template>
      <template slot="body">
        <div class="saved-it-modal__body">
          <div>
            <md-button class="md-simple maryoku-btn md-red" @click="goToProcessingGuid"
              >How does our bidding process work?</md-button
            >
            <md-button class="md-simple maryoku-btn md-red md-outlined">Go to my Dashboard</md-button>
          </div>
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
    <modal v-if="showCloseProposalModal" class="saved-it-modal" container-class="modal-container sl">
      <template slot="header">
        <div class="saved-it-modal__header d-flex">
          <img :src="`${$iconURL}NewSubmitPorposal/closeproposal.png`" />
          <div class="ml-20">
            <h3 class="text-left color-black">
              We are sorry, but someone else got there <br />before you and already won this bid.
            </h3>
            <div class="text-left">But no worries! We will be with you soon with the next one</div>
          </div>
        </div>
        <button class="close" @click="showCloseProposalModal = false">
          <img :src="`${$iconURL}NewSubmitPorposal/Group 3671 (2).svg`" />
        </button>
      </template>
      <template slot="body">
        <div class="saved-it-modal__body"></div>
      </template>
      <template slot="footer">
        <div class="saved-it-modal__footer">
          <md-button class="md-red maryoku-btn" @click="showCloseProposalModal = false">Ok, Thanks</md-button>
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
import Proposal from "@/models/Proposal";
import Vendor from "@/models/Vendors";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import { Modal } from "@/components";
import swal from "sweetalert2";
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import UserMenu from "./Extra/UserMenu.vue";
import ForVendors from "@/pages/app/Vendors/ForVendors.vue";
import VendorBidTimeCounter from "@/components/VendorBidTimeCounter/VendorBidTimeCounter";
import EventComponentVendorItemVue from "../../app/Events/components/EventComponentVendorItem.vue";
import S3Service from "@/services/s3.service";

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
      submittedModal: false,
      isTimeUp: false,
      proposalRequestRequirements: [],
      proposals: [],
      proposalRequest: null,
      vendorCategory: null,
      event: "",
      openedModal: "",
      showCloseProposalModal: false,
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
    this.submittedModal = false;
    this.isTimeUp = false;

    this.getVendor(this.$route.params.vendorId).then((vendor) => {
      this.vendor = vendor;
    });
    this.getProposalRequest(this.$route.params.id).then((proposalRequest) => {
      if (proposalRequest.componentInstance.proposalAccepted) {
        this.showCloseProposalModal = true;
      }
      this.$set(this, "proposalRequest", proposalRequest);
      this.event = proposalRequest.eventData;
      this.$store.commit("vendorProposal/setWizardStep", 0);
      this.$store.commit("vendorProposal/setInitStep", 0);
    });
  },
  methods: {
    ...mapActions("vendorProposal", ["getVendor", "getProposalRequest"]),
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
    hideModal() {
      this.fullDetailsModal = false;
      this.submittedModal = false;
      this.openedModal = "";
    },
    saveProposal(type) {
      this.$root.$emit("clear-slide-pos");
      this.scrollToTop();
      const vendorProposal = this.$store.state.vendorProposal;

      let coverImageUrl = "";
      if (vendorProposal.coverImage && vendorProposal.coverImage.indexOf("base64") >= 0) {
        const fileObject = S3Service.dataURLtoFile(
          vendorProposal.coverImage,
          `${this.event.id}-${vendorProposal.vendor.id}`,
        );
        const extenstion = fileObject.type.split("/")[1];
        S3Service.fileUpload(fileObject, `${this.event.id}-${vendorProposal.vendor.id}`, "proposals/cover-images");
        coverImageUrl = `https://maryoku.s3.amazonaws.com/campaigns/cover-images/${this.event.id}-${vendorProposal.vendor.id}.${extenstion}`;
      }

      const proposal = new Proposal({
        id: vendorProposal.id,
        personalMessage: vendorProposal.personalMessage,
        inspirationalPhotos: vendorProposal.inspirationalPhotos,
        proposalRequest: new ProposalRequest({ id: vendorProposal.proposalRequest.id }),
        eventVision: vendorProposal.vision,
        eventComponentInstance: vendorProposal.proposalRequest.eventComponentInstance,
        vendor: new Vendor({ id: vendorProposal.vendor.id }),
        costServices: vendorProposal.proposalCostServices,
        includedServices: vendorProposal.proposalIncludedServices,
        extraServices: vendorProposal.proposalExtraServices,
        coverImage: coverImageUrl,
      });
      if (type === "save") {
        proposal.status = "save";
      } else {
        proposal.status = "submit";
      }
      proposal.save().then((res) => {
        if (type === "submit") this.submittedModal = true;
        else {
          swal({
            title: `You saved the current proposal. You can edit anytime later!`,
            buttonsStyling: false,
            type: "success",
            confirmButtonClass: "md-button md-success",
          });
        }
      });
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

      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    getEvent() {
      this.$store.dispatch("event/getEventById", this.$route.params.eventId);
    },
    goToProcessingGuid() {
      this.$router.push({ path: `/completed-bidding` });
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
    suggestionDate() {
      return this.$store.state.vendorProposal.suggestionDate;
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
    position: relative;
    width: 100%;
    border-radius: 3px;
    -webkit-box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    height: 200px;
    .background-image {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
      &::after {
        position: absolute;
        width: 100%;
        height: 100%;
        content: "";
        top: 0;
        left: 0;
        background-color: #000;
        opacity: 0.6;
      }
      .concept-color {
        width: 250px;
        height: 200px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .concept-image {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
          transition: 0.2s;
        }
      }
    }
    .proposal-banner {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
      padding: 40px 60px;
      .header-content {
        color: white;
        margin: 20px 0;
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
          li {
            padding: 5px 20px;
            &:first-child {
              padding-left: 0px;
            }
            &:not(:last-child) {
              border-right: solid 1px white;
            }
            .company-logo {
              max-height: 30px;
              max-width: 30px;
            }
          }
        }
      }
      .summary-cont {
        font-family: "Manrope-Regular", sans-serif;
        width: calc(100% - 454px);
        margin: 10px 0;
        ul {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
          margin: 0;
          color: white;
          li {
            font-size: 16px;
            font-weight: bold;
            padding: 0px 25px;
            display: flex;
            margin-right: 0px;
            border-right: solid 1px white;
            &:first-child {
              padding-left: 0px;
            }
            &:last-child {
              border-right: none;
            }
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
      }
    }

    .pull-bottom-right {
      position: absolute;
      right: 64px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .main-cont {
    // margin-top: 263px;
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
    z-index: 9000;
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
    /deep/ .modal-header {
      background-color: #f3f7fd;
    }
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
      .maryoku-btn {
        width: 40%;
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
    color: white !important;
    cursor: pointer;

    i {
      color: white !important;
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
