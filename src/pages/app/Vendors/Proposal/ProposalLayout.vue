<template>
  <div>
    <Loader :active="isLoading" :is-full-screen="true" page="vendor" />
    <div class="for-proposals-layout-wrapper">
      <ProposalHeader v-if="event" :event="event" :proposal-request="proposalRequest" />
      <ProposalVersionsBar
        v-if="proposalRequest && proposalRequest.proposal"
        :versions="versions"
        :selected="selectedVersion"
        @select="selectVersion"
        @save="saveVersion"
        @change="changeVersion"
        @remove="removeVersion"
      />
      <div class="main-cont">
        <router-view />
      </div>
      <section class="footer-wrapper">
        <div>
          <md-button class="prev-cont md-simple maryoku-btn md-black" @click="back()">
            <img :src="`${proposalIconsUrl}Group 4770 (2).svg`"> Back
          </md-button>
          <md-button class="md-button md-simple md-just-icon md-theme-default scroll-top-button" @click="scrollToTop">
            <img :src="`${$iconURL}common/arrow-right-purple.svg`" width="17">
          </md-button>
        </div>

        <div class="next-cont">
          <a class="discard" @click="discard"> <img :src="`${$iconURL}common/trash-dark.svg`"> Discard </a>
          <a v-tooltip="{
               html: true,
               content: '<p>You can return to it till the deadline!</p>',
               delay: { show: 200, hide: 100 },
               trigger: 'hover',
               placement: 'top',
               classes: 'vendor-tooltip-theme'}"
             class="save"
             @click="calculateStage(proposalStatus.DRAFT)"
          >
            <img :src="`${$iconURL}Submit%20Proposal/group-3688.svg`"> Save for later
          </a>
          <a v-if="step < 3" class="next active" :class="[{ active: selectedServices.length > 0 }]" @click="gotoNext">
            Next
          </a>
          <a v-else class="next active" :disabled="isUpdating" @click="calculateStage(option)">Submit Proposal</a>
        </div>
      </section>

      <modal v-if="submittedModal" class="saved-it-modal proposal-submitting-modal" container-class="modal-container sl">
        <template slot="header">
          <div class="saved-it-modal__header">
            <img :src="`${proposalIconsUrl}thanks-proposal.png`">
            <div class="font-size-30 font-bold color-vendor mt-30">
              Thank you for submitting a proposal!
            </div>
            <div class="text-center font-size-22 mt-40 mb-40">
              You will get a reply in 4 days
            </div>
          </div>
          <button class="close" @click="hideModal()">
            <img :src="`${proposalIconsUrl}Group 3671 (2).svg`">
          </button>
        </template>
        <template slot="body">
          <div class="saved-it-modal__body">
            <div class="pt-30">
              <md-button class="md-simple maryoku-btn md-vendor" @click="goToProcessingGuid">
                How does our bidding process work?
              </md-button>
              <md-button class="md-simple maryoku-btn md-vendor md-outlined" @click="goToVendorProfile">
                Go to my Dashboard
              </md-button>
            </div>
          </div>
        </template>
      </modal>
      <modal v-if="showMissingModal" container-class="modal-container w-max-700 no-header no-footer">
        <template slot="body">
          <MissingDetail
            :data="missingDetail"
            @send="uploadProposal(proposalStatus.PENDING)"
            @close="showMissingModal = false"
          />
        </template>
      </modal>
      <modal v-if="openedModal == 'timeIsUp'" class="saved-it-modal" container-class="modal-container sl">
        <template slot="header">
          <div class="saved-it-modal__header">
            <h3><img :src="`${$iconURL}Submit%20Proposal/group-6223%20(non-optimized).png`"> Time Is Up!</h3>
            <div class="header-description">
              The deadline for submitting this prposal has passed. But no worries! We will be with you soon with the
              next one.
            </div>
          </div>
          <button class="close" @click="hideModal()">
            <img :src="`${proposalIconsUrl}Group 3671 (2).svg`">
          </button>
        </template>
        <template slot="body">
          <div class="saved-it-modal__body">
            <div class="time-cont">
              <VendorBidTimeCounter :days="0" :hours="0" :minutes="0" :seconds="0" class="bg-purple" />
            </div>
          </div>
        </template>
        <template slot="footer">
          <div class="saved-it-modal__footer">
            <md-button class="md-red maryoku-btn" @click="hideModal()">
              Ok, Thanks
            </md-button>
          </div>
        </template>
      </modal>
      <modal v-if="showCloseProposalModal" class="saved-it-modal" container-class="modal-container sl">
        <template slot="header">
          <div class="saved-it-modal__header d-flex">
            <img :src="`${$iconURL}NewSubmitPorposal/closeproposal.png`">
            <div class="ml-20">
              <h3 class="text-left color-black">
                We are sorry, but someone else got there <br>before you and already won this bid.
              </h3>
              <div class="text-left">
                But no worries! We will be with you soon with the next one
              </div>
            </div>
          </div>
          <button class="close" @click="showCloseProposalModal = false">
            <img :src="`${$iconURL}NewSubmitPorposal/Group 3671 (2).svg`">
          </button>
        </template>
        <template slot="body">
          <div class="saved-it-modal__body" />
        </template>
        <template slot="footer">
          <div class="saved-it-modal__footer">
            <md-button class="md-red maryoku-btn" @click="showCloseProposalModal = false">
              Ok, Thanks
            </md-button>
          </div>
        </template>
      </modal>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Vendors from "@/models/Vendors";
import Swal from "sweetalert2";
import S3Service from "@/services/s3.service";
import { PROPOSAL_STATUS } from "@/constants/status";
import { MISSING_DETAILS } from "@/constants/proposal";
import moment from "moment";

const components = {
    Loader: () => import("@/components/loader/Loader.vue"),
    Modal: () => import("@/components/Modal.vue"),
    MissingDetail: () => import("./Modals/MissingDetail.vue"),
    ProposalVersionsBar: () => import("../components/ProposalVersionsBar.vue"),
    ProposalSubmitted: () => import("../Proposal/Modals/ProposalSubmitted.vue"),
    ProposalHeader: () => import("./ProposalHeader.vue"),
    VendorBidTimeCounter: () => import("@/components/VendorBidTimeCounter/VendorBidTimeCounter.vue"),
};

export default {
  components,
  filters: {
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  props: {
    newProposalRequest: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      isLoading: true,
      fullDetailsModal: false,
      proposalIconsUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
      selectedServices: [],
      proposals: [],
      proposalRequest: null,
      vendorCategory: null,
      event: null,
      requirements: [],
      missingDetail: [],
      openedModal: "",
      submittedModal: false,
      isTimeUp: false,
      showCloseProposalModal: false,
      showMissingModal: false,
      isUpdating: false,
      proposalStatus: PROPOSAL_STATUS,
      option: PROPOSAL_STATUS.PENDING, // 'submit', 'duplicate'
    };
  },
  computed: {
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
    vendor() {
      return this.$store.state.vendorProposal.vendor;
    },
    selectedVersion(){
      return this.$store.state.vendorProposal.currentVersion;
    },
    versions(){
      return this.$store.state.vendorProposal.versions;
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
  async created() {
    console.log("proposal.layout", this.$route.query.version);
    this.$root.$on("send-event-data", (evtData) => {
      this.evtData = evtData;
    });

    if (this.$route.params.eventId) {
      this.getEvent();
    }

    if (this.$route.params.type && this.$route.params.type == "duplicate") {
      this.option = "duplicate";
    }

    this.fullDetailsModal = false;
    this.submittedModal = false;
    this.isTimeUp = false;

    await this.getVendor(this.$route.params.vendorId);

    this.proposalRequest = await this.getProposalRequest(this.$route.params.id);
    if (this.proposalRequest.componentInstance && this.proposalRequest.componentInstance.proposalAccepted) {
      this.showCloseProposalModal = true;
    }

    this.event = this.proposalRequest.eventData;

    this.$store.commit("vendorProposal/setWizardStep", 0);
    this.$store.commit("vendorProposal/setInitStep", 0);
    if (this.proposalRequest.proposal) {
      this.$store.commit("vendorProposal/setValue", {
          key: "suggestionDate",
          value: this.proposalRequest.proposal.suggestionDate,
      });
    }
    if (!this.$store.state.vendorProposal.coverImage.length){
      this.$store.commit("vendorProposal/setValue", {
        key: "coverImage",
        value: this.vendor.images,
      });
    }

    if (this.$route.query.version) {
      let index = this.$store.state.vendorProposal.versions.findIndex(v => v.id ===  this.$route.query.version);
      console.log("proposal.layout", index);
      this.$store.commit("vendorProposal/selectVersion", index);
    }
    this.isLoading = false;
  },

  methods: {
    ...mapActions("vendorProposal", ["getVendor", "getProposalRequest", "getRequirements", "saveProposal", "saveVendor", "setWizardStep"]),
    gotoNext() {
      console.log("step", this.step, this.event.components.length);
      this.step = this.step + 1;

      // skip additional page if event doesn't have components
      if ( this.step === 2 && this.event.components.length < 2 ) this.step ++;
      this.scrollToTop();
    },
    back() {
      const initStep = this.$store.state.vendorProposal.initStep;
      if (this.step > initStep) {
          this.step = this.step - 1;

          // skip additional page if event doesn't have components
          if (this.step === 2 && this.event.components.length < 2) this.step --;
      } else {
          const vendorId = this.$route.params.vendorId;
          const requestId = this.$route.params.id;
          this.$router.push(`/vendors/${vendorId}/proposal-request/${requestId}`);
      }

      this.scrollToTop();
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
    hideModal() {
      this.fullDetailsModal = false;
      this.submittedModal = false;
      this.openedModal = "";
    },

      getMissingDetail(field) {
          return MISSING_DETAILS.find(it => it.key === field);
      },

      async calculateStage(type) {
          this.missingDetail = [];
          const vendorProposal = this.$store.state.vendorProposal;

          let progress = 0;
          if (vendorProposal.hasOwnProperty("eventVision") && vendorProposal.eventVision) {
              progress += 10;
          } else {
              this.missingDetail.push(this.getMissingDetail("vision"));
          }
          if (vendorProposal.costServices[this.vendor.vendorCategory] && vendorProposal.costServices[this.vendor.vendorCategory].length) {
              progress += 30;
          } else {
              this.missingDetail.push(this.getMissingDetail("cost"));
          }

          if (vendorProposal.includedServices[this.vendor.vendorCategory] && vendorProposal.includedServices[this.vendor.vendorCategory].length) {
              progress += 20;
          } else {
              this.missingDetail.push(this.getMissingDetail("include"));
          }
          if (vendorProposal.extraServices[this.vendor.vendorCategory] && vendorProposal.extraServices[this.vendor.vendorCategory].length) {
              progress += 20;
          } else {
              this.missingDetail.push(this.getMissingDetail("extra"));
          }

          if (vendorProposal.inspirationalPhotos.some(p => !!p)) {
              progress += 20;
          } else {
              this.missingDetail.push(this.getMissingDetail("image"));
          }

          // check missing when submit the proposal
          if (progress !== 100 && type === PROPOSAL_STATUS.PENDING) {
              this.showMissingModal = true;
              return;
          }

          this.$store.commit("vendorProposal/setProgress", progress);
          await this.uploadProposal(type);
    },

    async showComeBack () {
      return Swal.fire({
              title: "You’ve saved this current proposal. Come back and edit it at any time!",
              buttonsStyling: false,
              showCancelButton: true,
              type: "success",
              confirmButtonClass: "md-button md-vendor text-capitalize",
              confirmButtonText: "Back to Dashboard continue",
              cancelButtonClass: "md-button md-black md-simple text-capitalize text-black",
              cancelButtonText: "Continue",
          }).then(res => {
              if(res.isConfirmed) {
                  this.$router.push({path: "/vendor/dashboard"});
              }
        });
    },

    async uploadProposal(type) {
      this.$root.$emit("clear-slide-pos");
      this.scrollToTop();

      this.showMissingModal = false;

      const vendorProposal = this.$store.state.vendorProposal;

      let coverImageUrl = "";
      this.isUpdating = true;
      if (vendorProposal.coverImage && vendorProposal.coverImage.indexOf("base64") >= 0) {
        const fileObject = S3Service.dataURLtoFile(
          vendorProposal.coverImage,
          `${this.event.id}-${vendorProposal.vendor.id}`,
        );
        coverImageUrl = await S3Service.fileUpload(fileObject, `${this.event.id}-${vendorProposal.vendor.id}`, "proposals/cover-images");
      }

      moment(new Date(), "YYYY-MM-DD").add(7, "days").toDate();

      if (!this.isLoading) {
        this.isLoading = true;

        let proposal = await this.saveProposal(type);
        let vendor = await this.saveVendor(this.$store.state.vendorProposal.vendor);
        this.isUpdating = false;
        this.isLoading = false;
        if (type === PROPOSAL_STATUS.PENDING) this.submittedModal = true;
        else this.showComeBack();
      }
    },

    scrollToTop() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    },
    getEvent() {
      this.$store.dispatch("event/getEventById", this.$route.params.eventId);
    },
    goToProcessingGuid() {
      this.$router.push({ path: "/completed-bidding" });
    },
    goToVendorProfile() {
        this.$router.push({path: "/vendor/dashboard"});
    },
    discard() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Yes, discard it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$store.commit("vendorProposal/initState");
          this.$router.push(`/vendors/${this.vendor.id}/proposal-request/${this.proposalRequest.id}`);
        }
      });
    },
    selectVersion(index){
      this.$store.commit("vendorProposal/selectVersion", index);
    },
    saveVersion(version){
        this.$store.dispatch("vendorProposal/saveVersion", version);
    },
    changeVersion(versions){
        this.$store.commit("vendorProposal/setVersions", versions);
    },
    removeVersion(id){
        this.$store.dispatch("vendorProposal/removeVersion", id);
    }
  },


};
</script>
<style lang="scss" scoped>
.capitalize {
  text-transform: capitalize;
}
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
    z-index: 10;
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
