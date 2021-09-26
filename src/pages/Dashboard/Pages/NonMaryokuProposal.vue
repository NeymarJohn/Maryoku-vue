<template>
  <div class="non-maryoku-proposal">
    <loader :active="loading" :isFullScreen="true"></loader>
    <div class="proposal-header d-flex align-center justify-content-between">
      <div class="font-size-30" v-if="proposal">
        <img :src="`${$iconURL}Budget+Elements/${proposal.vendor.eventCategory.icon}`" />
        <b>{{ proposal.vendor.eventCategory.fullTitle }}</b>
        {{ proposal.vendor.companyName }}
      </div>
      <div>
        <header-actions
          page="proposal"
          @toggleCommentMode="toggleCommentMode"
          @share="shareWithAuth"
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
        @ask="handleAsk"
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
    <comment-editor-panel
      v-if="showCommentEditorPanel"
      :commentComponents="commentComponents"
      @saveComment="saveCommentWithAuth"
      @updateComment="updateCommentWithAuth"
      @deleteComment="deleteCommentWithAuth"
      @updateCommentComponent="updateCommentComponentWithAuth"
    >
    </comment-editor-panel>
    <modal :containerClass="`modal-container xl change-event-detail`" v-if="showDetailModal">
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
        <event-detail :event="proposal.eventData" @change="handleEventChange"></event-detail>
      </template>
      <template slot="footer">
        <div class="condition-tooltip">
          <img class="mr-10" :src="`${$iconURL}NewLandingPage/Group 1175 (10).svg`" width="27px" />
          Any change might cause pricing changes
        </div>
        <md-button class="md-simple md-black ml-auto">Cancel</md-button>
        <md-button class="md-red" @click="handleAsk('event')">Update Vendor</md-button>
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
      :onlyAuth="onlyAuth"
      @signIn="signIn"
      @signUp="signUp"
      @save="saveGuestComment"
      @authenticate="auth"
      @cancel="showGuestSignupModal = false"
    >
    </guest-sign-up-modal>
    <reminding-time-modal
      v-if="showRemindingTimeModal"
      @close="showRemindingTimeModal = false"
      @save="saveRemindingTime"
    ></reminding-time-modal>
    <negotiation-request-modal
      v-if="showNegotiationRequestModal"
      @close="showNegotiationRequestModal = false"
      @save="sendNegotiationRequest"
    ></negotiation-request-modal>
  </div>
</template>
<script>
import Proposal from "@/models/Proposal";
import Reminder from "@/models/Reminder";
import ProposalNegotiationRequest from "@/models/ProposalNegotiationRequest";

import { Loader } from "@/components";
import GuestSignUpModal from "@/components/Modals/VendorProposal/GuestSignUpModal.vue";
import CommentEditorPanel from "@/pages/app/Events/components/CommentEditorPanel";
import EventProposalDetails from "../../app/Events/Proposal/EventProposalDetails.vue";
import { CommentMixins, ShareMixins } from "@/mixins";
import PlannerHeader from "@/pages/Dashboard/Layout/PlannerHeader";
import { SignInContent } from "@/components";
import HeaderActions from "../../../components/HeaderActions.vue";
import Modal from "../../../components/Modal.vue";
import EventDetail from "./components/EventDetail.vue";
import { mapActions, mapMutations } from "vuex";
import moment from "moment";
import RemindingTimeModal from "../../../components/Modals/VendorProposal/RemindingTimeModal.vue";
import NegotiationRequestModal from "../../../components/Modals/VendorProposal/NegotiationRequestModal.vue";
import Swal from "sweetalert2";

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
    SignInContent,
    RemindingTimeModal,
    NegotiationRequestModal,
  },
  mixins: [CommentMixins, ShareMixins],
  data() {
    return {
      page: "signin",
      loading: true,
      proposal: null,
      onlyAuth: false,
      showDetailModal: false,
      showUpdateSuccessModal: false,
      showCommentEditorPanel: false,
      showGuestSignupModal: false,
      showRemindingTimeModal: false,
      showNegotiationRequestModal: false,
    };
  },
  async created() {
    console.log("non-maryokuProposal.created", this.loggedInUser);
    let tenantUser = null;
    if (this.loggedInUser) {
      tenantUser = await this.$store.dispatch("auth/checkToken");
    }
    const givenToken = this.$route.query.token;
    const proposalId = this.$route.params.proposalId;
    await this.$store.dispatch("common/getEventTypes");
    this.proposal = await Proposal.find(proposalId);
    if (!this.proposal.inspirationalPhotos) this.proposal.inspirationalPhotos = [];
    if (!this.proposal.bundleDiscount.services) this.proposal.bundleDiscount.services = [];
    if (givenToken) {
      tenantUser = await this.$store.dispatch("auth/checkToken", givenToken);
      this.loading = false;
      this.handleAction();
    } else {
      this.loading = false;
    }

    // await this.$store.dispatch("common/getEventTypes");
  },
  methods: {
    ...mapMutations("comment", ["setGuestName"]),
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
    async handleAsk(ask) {
      let expiredTime = moment().add(2, "days").unix() * 1000;
      if (ask === "expiredDate") {
        if (this.loggedInUser) {
          await this.saveNegotiation({ expiredTime });
        } else {
          localStorage.setItem(
            "nonMaryokuAction",
            JSON.stringify({
              action: "saveNegotiation",
              params: { expiredTime },
            }),
          );
          this.onlyAuth = true;
          this.showGuestSignupModal = true;
        }
      } else if (ask === "event") {
        this.showDetailModal = false;
        let event = {
          startTime: this.proposal.eventData.startTime,
          endTime: this.proposal.eventData.endTime,
          location: this.proposal.eventData.location,
          numberOfParticipants: this.proposal.eventData.numberOfParticipants,
        };
        if (this.loggedInUser) {
          await this.saveNegotiation({ event, expiredTime });
        } else {
          localStorage.setItem(
            "nonMaryokuAction",
            JSON.stringify({
              action: "saveNegotiation",
              params: { event, expiredTime },
            }),
          );
          this.onlyAuth = true;
          this.showGuestSignupModal = true;
        }
      }
    },
    handleEventChange(e) {
      console.log("handleEventChange", e);
      this.proposal.eventData = e;
    },
    async saveNegotiation(params) {
      let query = new ProposalNegotiationRequest({
        proposalId: this.proposal.id,
        proposal: new Proposal({ id: this.proposal.id }),
        url: `${location.protocol}//${location.host}/#/unregistered/proposals/${this.proposal.id}`,
        ...params,
      });
      let res = await query.for(new Proposal({ id: this.proposal.id })).save();
      this.proposal.negotiations.push(res);
    },
    async shareWithAuth(args) {
      if (this.loggedInUser) {
        await this.share(args);
      } else {
        localStorage.setItem(
          "nonMaryokuAction",
          JSON.stringify({
            action: "saveShare",
            ...args,
          }),
        );
        this.onlyAuth = true;
        this.showGuestSignupModal = true;
      }
    },
    updateProposal(proposal) {
      console.log(proposal);
      this.proposal = { ...proposal };
    },
    saveProposal(proposal) {
      new Proposal();
    },
    downProposal() {
      this.openNewTab(`https://api-dev.maryoku.com/1/proposal/${this.proposal.id}/download`);
    },
    toggleCommentMode(mode) {
      console.log("toggleCommentMode", mode);
      this.showCommentEditorPanel = mode;
    },
    remindMeLater() {
      this.showRemindingTimeModal = true;
    },
    negotiateRate() {
      this.showNegotiationRequestModal = true;
    },
    changeEvent() {
      this.showDetailModal = true;
    },
    openNewTab(link) {
      window.open(link, "_blank");
    },
    saveGuestComment(name) {
      console.log("saveGuestComment", name);
      this.showGuestSignupModal = false;
      this.setGuestName(name);
      let data = JSON.parse(localStorage.getItem("nonMaryokuAction"));

      if (data.action === "saveComment")
        this.saveComment({ index: data.index, comment: data.comment, component: data.component });
      if (data.action === "updateComment") this.updateComment({ comment: data.comment, component: data.component });
      if (data.action === "deleteComment") this.deleteComment({ index: data.index, comment: data.comment });
      if (data.action === "updateCommentComponent") this.saveComment({ component: data.component });
      this.showCommentEditorPanel = true;
    },
    async signIn({ email, password }) {
      await this.$store.dispatch("auth/login", {
        email,
        password,
      });
      this.showGuestSignupModal = false;
      this.handleAction();
    },
    async signUp({ email, password, name, company }) {
      await this.$store.dispatch("auth/register", {
        email,
        password,
        name,
        company,
        role: "administrator",
      });
      this.showGuestSignupModal = false;
      await this.$store.dispatch("auth/login", { email, password });
      this.handleAction();
    },
    auth(provider) {
      console.log("auth", provider);
      let tenantId = this.$authService.resolveTenantId();

      let callback = btoa(`${document.location.href}?token=`);
      document.location.href = `${process.env.SERVER_URL}/oauth/authenticate/${provider}?tenantId=${tenantId}&callback=${callback}`;
    },
    handleAction() {
      let data = JSON.parse(localStorage.getItem("nonMaryokuAction"));
      if (data) {
        if (data.action === "saveComment") this.saveComment(data);
        if (data.action === "updateComment") this.updateComment(data);
        if (data.action === "deleteComment") this.deleteComment(data);
        if (data.action === "updateCommentComponent") this.saveComment(data);
        if (data.action === "saveNegotiation") this.saveNegotiation(data.params);
        if (data.action === "saveShare") this.share(data);

        localStorage.removeItem("nonMaryokuAction");
      }
    },
    saveCommentWithAuth(params) {
      console.log("saveComment");
      if (this.loggedInUser || this.guestName) {
        this.saveComment(params);
      } else {
        localStorage.setItem(
          "nonMaryokuAction",
          JSON.stringify({
            action: "saveComment",
            ...params,
          }),
        );
        this.showCommentEditorPanel = false;
        this.showGuestSignupModal = true;
      }
    },
    updateCommentWithAuth(params) {
      console.log("updateCommentWithAuth", params);
      if (this.loggedInUser || this.guestName) {
        this.updateComment(params);
      } else {
        localStorage.setItem(
          "nonMaryokuAction",
          JSON.stringify({
            action: "updateComment",
            ...params,
          }),
        );
        this.showCommentEditorPanel = false;
        this.showGuestSignupModal = true;
      }
    },
    deleteCommentWithAuth(params) {
      console.log("deleteComment");
      if (this.loggedInUser || this.guestName) {
        this.deleteComment(params);
      } else {
        localStorage.setItem(
          "nonMaryokuAction",
          JSON.stringify({
            action: "deleteComment",
            ...params,
          }),
        );
        this.showCommentEditorPanel = false;
        this.showGuestSignupModal = true;
      }
    },
    updateCommentComponentWithAuth(component) {
      console.log("updateCommentComponent");
      if (this.loggedInUser || this.guestName) {
        this.updateCommentComponent(component);
      } else {
        localStorage.setItem(
          "nonMaryokuAction",
          JSON.stringify({
            action: "updateCommentComponent",
            component: component,
          }),
        );
        this.showCommentEditorPanel = false;
        this.showGuestSignupModal = true;
      }
    },
    sendNegotiationRequest() {
      this.showNegotiationRequestModal = false;

      Swal.fire({
        title: "Negotiation Sent successfully",
        text: `Negotiation request has been successfully sent to the vendor and he will respond as soon as possible`,
        showCancelButton: false,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Done",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
        }
      });
    },
    saveRemindingTime(remindingTime) {
      const remindingData = {
        reminder: "email",
        phoneNumber: "",
        email: this.proposal.eventData.customer.email,
        remindingTime: remindingTime,
        type: "proposal",
        emailParams: {
          leftTime: "1day",
          proposalLink: window.location.href,
          date: "22th Sep, 2021",
          time: "12:00pm",
        },
        emailTransactionId: "",
        phoneTransactionId: "",
      };
      new Reminder(remindingData).save().then((res) => {
        Swal.fire({
          title: "Reminder set successfully",
          text: `You will receive the reminder in your email`,
          showCancelButton: false,
          confirmButtonClass: "md-button md-success btn-fill",
          cancelButtonClass: "md-button md-danger btn-fill",
          confirmButtonText: "Done",
          buttonsStyling: false,
        }).then((result) => {});
      });

      this.showRemindingTimeModal = false;
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.state.auth.user;
    },
    customer() {
      return this.$store.state.comment.customer;
    },
    guestName() {
      return this.$store.state.comment.guestName;
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
.condition-tooltip {
  background-color: #ffe5ec;
  padding: 18px 15px 18px 15px;
  color: #050505;
  font-size: 14px;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 4px;
    left: 70px;
    box-sizing: border-box;

    border: 12px solid black;
    border-color: transparent transparent #ffe5ec #ffe5ec;

    transform-origin: 0 0;
    transform: rotate(135deg);
  }
}
</style>
