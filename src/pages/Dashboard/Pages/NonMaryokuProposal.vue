<template>
  <div class="non-maryoku-proposal">
    <!-- <planner-header></planner-header> -->
    <loader :active="loading" :isFullScreen="true"></loader>
    <div class="proposal-header d-flex align-center justify-content-between">
      <div class="font-size-30" v-if="proposal">
        <img :src="`${$iconURL}Budget+Elements/${proposal.vendor.eventCategory.icon}`" />
        <b>{{ proposal.vendor.eventCategory.fullTitle }}</b>
        {{ proposal.vendor.companyName }}
      </div>
      <div>
        <header-actions
            @toggleCommentMode="toggleCommentMode"
            @export="downProposal"
        ></header-actions>
      </div>
    </div>
    <div class="proposal-content mt-40">
      <event-proposal-details
        :vendorProposal="proposal"
        :landingPage="true"
        :nonMaryoku="true"
        v-if="proposal"
        @updateProposal="updateProposal"
      ></event-proposal-details>
    </div>
    <div class="text-center logo-area">Provided By <img :src="`${$iconURL}RSVP/maryoku - logo dark@2x.png`" /></div>
    <div class="proposal-footer d-flex justify-content-between align-center">
      <md-menu md-size="medium" md-align-trigger md-direction="top-end" class="schedule-menu">
        <md-button md-menu-trigger class="md-simple md-black maryoku-btn">
          More Actions
          <md-icon>expand_less</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item class="text-center" @click="negotiateRate">
            <span class="font-size-16 font-bold-extra pl-20">
              <img
                :src="`${$iconURL}budget+screen/SVG/Asset%2010.svg`"
                class="mr-10"
                style="width: 20px; height: 28px"
              />
              Negotiate Rate
            </span>
          </md-menu-item>
          <md-menu-item class="text-center" @click="remindMeLater">
            <span class="font-size-16 font-bold-extra pl-20">
              <img :src="`${$iconURL}Vendor Signup/Asset 522.svg`" class="mr-10" style="width: 20px; height: 20px" />
              Remind me later
            </span>
          </md-menu-item>
          <md-menu-item class="text-center" @click="changeEvent">
            <span class="font-size-16 font-bold-extra pl-20">
              <img :src="`${$iconURL}common/calendar-dark.svg`" class="mr-10" style="width: 20px; height: 20px" />
              Change event details
            </span>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
      <div>
        <md-button class="md-simple md-red md-outlined maryoku-btn">Decline Proposal</md-button>
        <md-button class="md-red maryoku-btn" @click="bookProposal">Book Now</md-button>
      </div>
    </div>
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <modal :containerClass="`modal-container xl`" v-if="showDetailModal">
      <template slot="header">
        <div class="add-category-model__header">
          <h2 class="font-size-30 font-bold-extra">Change event details</h2>
          <div>
            You can change or add event details and information. <br />
            Vendor will send you a updated proposal in a short time
          </div>
        </div>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="showDetailModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <!-- <div>{{ proposal.eventData }}</div> -->
        <event-detail :event="proposal.eventData"></event-detail>
      </template>
      <template slot="footer">
        <md-button class="md-simple md-black">Cancel</md-button>
        <md-button class="md-red" @click="updateEvent">Update Vendor</md-button>
      </template>
    </modal>
    <modal :containerClass="`modal-container xs`" v-if="showUpdateSuccessModal">
      <template slot="body">
        <h2>Changes set successfully</h2>
        <div>Changes have been sent to the vendor and he will send you an updated offer as soon as possible</div>
        <div class="text-center">
          <md-button class="md-red" @click="showUpdateSuccessModal = false">Done</md-button>
        </div>
      </template>
    </modal>
    <guest-sign-up-modal
        v-if="showGuestSignupModal"
        @cancel="showGuestSignupModal = false"
    >
    </guest-sign-up-modal>
  </div>
</template>
<script>
import Proposal from "@/models/Proposal";
import {Loader} from "@/components";
import GuestSignUpModal from "@/components/Modals/VendorProposal/GuestSignUpModal.vue";
import CommentEditorPanel from "@/pages/app/Events/components/CommentEditorPanel";
import EventProposalDetails from "../../app/Events/Proposal/EventProposalDetails.vue";
import PlannerHeader from "@/pages/Dashboard/Layout/PlannerHeader";
import HeaderActions from "../../../components/HeaderActions.vue";
import Modal from "../../../components/Modal.vue";
import EventDetail from "./components/EventDetail.vue";

export default {
  components: {
    EventProposalDetails,
    CommentEditorPanel,
    GuestSignUpModal,
    PlannerHeader,
    HeaderActions,
    Loader,
    Modal,
    EventDetail,
  },
  data() {
    return {
      loading: true,
      proposal: null,
      showDetailModal: false,
      showUpdateSuccessModal: false,
      showCommentEditorPanel: false,
      showGuestSignupModal: true,
    };
  },
  async created() {

    const proposalId = this.$route.params.proposalId;
    let proposal = await Proposal.find(proposalId);
    console.log('non-maryoku-proposal.created', proposal);

    if (!proposal.inspirationalPhotos) proposal.inspirationalPhotos = [];
    if (!proposal.bundleDiscount.services) proposal.bundleDiscount.services = [];
    this.proposal = proposal;
    await this.$store.dispatch("common/getEventTypes");
    this.loading = false;
  },
  methods: {
    bookProposal() {
      new Proposal({
        id: this.proposal.id,
        costServices: this.proposal.costServices,
        extraServices: this.proposal.extraServices,
      })
        .save()
        .then((res) => {
          window.open(`/#/checkout/proposal/${this.proposal.id}`, "_blank");
        });
    },
    updateProposal(proposal) {
      console.log(proposal);
      this.proposal = { ...proposal };
    },
    saveProposal(proposal) {
      new Proposal();
    },
    downProposal(){
        this.openNewTab(`https://api-dev.maryoku.com/1/proposal/${this.proposal.id}/download`);
    },
    toggleCommentMode(mode){
      console.log('toggleCommentMode', mode)
      this.showCommentEditorPanel = mode;
    },
    remindMeLater() {},
    negotiateRate() {},
    askQuestion() {},
    changeEvent() {
      this.showDetailModal = true;
    },
    updateEvent() {
      this.showDetailModal = false;
      this.showUpdateSuccessModal = true;
    },
    openNewTab(link) {
      window.open(link, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.non-maryoku-proposal {
  background-color: white;
  .proposal-header {
    padding: 0 80px;
    background-color: #f5f5f5;
    img {
      width: 30px;
    }
    height: 110px;
  }
  .proposal-content {
    max-width: 1280px;
    margin: auto;
  }
  .logo-area {
    padding: 40px;
    margin-top: 40px;
    background-color: #f5f5f5;
  }
  .proposal-footer {
    height: 80px;
    width: 100%;
    background: white;
    padding: 0 30px;
  }
}
</style>
