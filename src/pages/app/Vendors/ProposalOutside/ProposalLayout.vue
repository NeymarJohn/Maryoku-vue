<template>
  <div class="for-proposals-layout-wrapper">
     <vue-element-loading :active="isLoading" color="#FF547C"></vue-element-loading>

    <proposal-header v-if="vendor" :vendor="vendor"></proposal-header>
    <div class="main-cont">
      <router-view></router-view>
    </div>
    <section class="footer-wrapper">
      <div>
        <md-button v-if="step > 0" class="prev-cont md-simple maryoku-btn md-black" @click="back()">
          <img :src="`${proposalIconsUrl}Group 4770 (2).svg`" /> Back
        </md-button>

        <md-button @click="scrollToTop" class="md-button md-simple md-just-icon md-theme-default scroll-top-button">
          <img :src="`${$iconURL}common/arrow-right-purple.svg`" width="17" />
        </md-button>
      </div>

      <div class="next-cont">
        <a class="discard" @click="discard"> <img :src="`${$iconURL}common/trash-dark.svg`" /> Discard </a>
        <a class="save" @click="uploadProposal('draft')">
          <img :src="`${$iconURL}common/save-purple.svg`" /> Save for later
        </a>
        <a class="next active" @click="gotoNext" :class="[{ active: selectedServices.length > 0 }]" v-if="step < 3">
          Next
        </a>
        <a class="next active" @click="setProposalLink" v-else :disabled="isUpdating">Submit Proposal</a>
      </div>
    </section>
    <modal v-if="openedModal == 'timeIsUp'" class="saved-it-modal" container-class="modal-container sl">
      <template slot="header">
        <div class="saved-it-modal__header">
          <h3><img :src="`${$iconURL}Submit%20Proposal/group-6223%20(non-optimized).png`" /> Time Is Up!</h3>
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
            <vendor-bid-time-counter :days="0" :hours="0" :minutes="0" :seconds="0" class="bg-purple" />
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
    <send-proposal-modal
      v-if="showSendProposalModal"
      @close="showSendProposalModal = false"
      @submit="submitProposal"
      :event="event"
      :link="proposalLink"
    ></send-proposal-modal>
    <proposal-submitted
      v-if="showSubmittedProposalModal"
      @close="showSubmittedProposalModal = false"
    ></proposal-submitted>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Vendors from "@/models/Vendors";
import { Modal } from "@/components";
import Swal from "sweetalert2";
import VendorBidTimeCounter from "@/components/VendorBidTimeCounter/VendorBidTimeCounter";
import S3Service from "@/services/s3.service";
import ProposalHeader from "./ProposalHeader";
import VueElementLoading from "vue-element-loading";
import state from "./state";
import SendProposalModal from "./Modals/SendProposal";
import ProposalSubmitted from "../Proposal/Modals/ProposalSubmitted";

export default {
  components: {
    VendorBidTimeCounter,
    Modal,
    ProposalHeader,
    VueElementLoading,
    SendProposalModal,
    ProposalSubmitted,
  },
  props: {
    newProposalRequest: Object,
  },
  data() {
    return {
      vendor: null,
      isLoading: false,
      fullDetailsModal: false,
      proposalIconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
      landingIconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewLandingPage/",
      selectedServices: [],
      submittedModal: false,
      isTimeUp: false,
      proposalRequestRequirements: [],
      proposals: [],
      proposalRequest: null,
      openedModal: "",
      showCloseProposalModal: false,
      isUpdating: false,
      option: "submit", // 'submit', 'duplicate'
      showSendProposalModal: false,
      showSubmittedProposalModal: false,
      proposalLink: "",
    };
  },
  async created() {
    this.$root.$on("send-event-data", (evtData) => {
      this.evtData = evtData;
    });
    console.log('created');
    this.loading = true;
    if (this.$route.params.type && this.$route.params.type == "duplicate") {
      this.option = "duplicate";
    }

    this.fullDetailsModal = false;
    this.submittedModal = false;
    this.isTimeUp = false;

    this.vendor = await this.getVendor(this.$route.params.vendorId)
    if(this.$route.params.id) await this.getProposal(this.$route.params.id);
    this.loading = false;

  },

  beforeCreate() {
    if (!this.$store.state.proposalForNonMaryoku) {
      this.$store.registerModule("proposalForNonMaryoku", state);
    } else {
      this.$store.commit("proposalForNonMaryoku/initState");
    }
  },
  methods: {
    ...mapActions("proposalForNonMaryoku", ["getVendor", "getProposal", "saveProposal"]),
    gotoNext() {
      this.step = this.step + 1;
      this.scrollToTop();
    },
    hideModal() {
      this.fullDetailsModal = false;
      this.submittedModal = false;
      this.openedModal = "";
    },
    uploadProposal(type) {
      return new Promise((resolve, reject) => {
        this.$root.$emit("clear-slide-pos");
        this.scrollToTop();
        const proposalForNonMaryoku = this.$store.state.proposalForNonMaryoku;

        let coverImageUrl = "";
        this.isUpdating = true;
        if (proposalForNonMaryoku.coverImage && proposalForNonMaryoku.coverImage.indexOf("base64") >= 0) {
          const fileObject = S3Service.dataURLtoFile(
            proposalForNonMaryoku.coverImage,
            `${this.event.id}-${proposalForNonMaryoku.vendor.id}`,
          );
          const extenstion = fileObject.type.split("/")[1];
          S3Service.fileUpload(
            fileObject,
            `${this.event.id}-${proposalForNonMaryoku.vendor.id}`,
            "proposals/cover-images",
          );
          coverImageUrl = `https://maryoku.s3.amazonaws.com/campaigns/cover-images/${this.event.id}-${proposalForNonMaryoku.vendor.id}.${extenstion}`;
        }

        if (!this.isLoading) {
          this.isLoading = true;
          this.saveProposal(type)
            .then((proposal) => {
              this.isUpdating = false;
              this.isLoading = false;
              if (type === "submit") this.submittedModal = true;
              else {
                Swal.fire({
                  title: `You saved the current proposal. You can edit anytime later!`,
                  buttonsStyling: false,
                  type: "success",
                  confirmButtonClass: "md-button md-vendor",
                });
              }
              resolve(proposal);
              this.isLoading = false;
            })
            .catch(() => {
              this.isLoading = false;
            });
        }
      });
    },

    back() {
      this.step = this.step - 1;
      this.scrollToTop();
    },
    scrollToTop() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    },
    goToProcessingGuid() {
      this.$router.push({ path: `/completed-bidding` });
    },
    goToVendorProfile() {
      this.$router.push({ path: `/vendor/signin` });
    },
    discard() {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        showCancelButton: true,
        confirmButtonClass: "md-button md-success md-vendor btn-fill",
        cancelButtonClass: "md-button maryoku-btn md-danger btn-fill",
        confirmButtonText: "Yes, discard it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$store.commit("proposalForNonMaryoku/initState");
          this.$router.push(`/vendor/dashboard`);
        }
      });
    },
    setProposalLink() {
      this.uploadProposal("submit").then((proposal) => {
        console.log(proposal);
        this.proposalLink = `${location.protocol}//${location.host}/#/unregistered/proposals/${proposal.id}`;
        this.showSendProposalModal = true;
      });
    },
    submitProposal() {
      this.showSendProposalModal = false;
      this.uploadProposal("submit");
      const proposalForNonMaryoku = this.$store.state.proposalForNonMaryoku;
      this.$http
        .post(
          `${process.env.SERVER_URL}/1/proposals/${proposalForNonMaryoku.id}/sendEmail`,
          {},
          { headers: this.$auth.getAuthHeader() },
        )
        .then((res) => {
          this.showSubmittedProposalModal = true;
        });
    },
  },

  filters: {
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  computed: {
    getHeaderImage() {
      if (this.event && this.event.concept) {
        return this.event.concept.images[new Date().getTime() % 4].url;
      }
      return "";
    },

    event() {
      return this.$store.state.proposalForNonMaryoku.event;
    },

    step: {
      get: function () {
        return this.$store.state.proposalForNonMaryoku.wizardStep;
      },
      set: function (newValue) {
        this.$store.commit("proposalForNonMaryoku/setWizardStep", newValue);
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
        color: #641856;
        i {
          color: #641856;
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
    z-index: 5;
    overflow: hidden;
    position: fixed;
    bottom: 0;
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
        min-width: 250px;
        text-align: center;
        &.discard {
          color: #050505;
          margin-right: 41px;
          min-width: 100px;
          padding: 18px 0px;
          img {
            width: 25px;
            margin-right: 12px;
          }
        }
        &.save {
          border: 1px solid #641856;
          color: #641856;
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
        color: #641856;

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

  .active {
    background-color: #641856 !important;

    i {
      color: #ffffff !important;
    }
  }
  .cool {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-color: #641856;
    border-radius: 3px;
    padding: 8px 36px;
    cursor: pointer;
    border: none;
  }
  .hide-full {
    font-size: 16px;
    font-weight: 800;
    color: #641856;
    cursor: pointer;

    i {
      color: #641856;
    }
  }
  .scroll-top-button {
    img {
      height: 20px;
      transform: rotate(-90deg);
    }
  }
}
</style>
