<template>
  <div class="vendor-proposal-board p-40">
    <loader :active="loading" :isFullScreen="true" />
    <div class="font-size-22 font-bold d-flex align-center">
      <img src="/static/icons/vendor/proposal-active.svg" class="mr-10" /> Proposals Board
      <md-button class="ml-auto md-vendor md-maryoku mr-15" @click="createNewProposal">Create New Proposal</md-button>
    </div>
    <div class="font-bold text-uppercase mt-30 mb-15">Opportunities</div>
    <carousel
      :items="4"
      :margin="25"
      :dots="false"
      :number="2"
      :nav="false"
      class="proposal-requests"
      v-if="renderRender"
    >
      <template slot="prev">
        <button class="nav-left nav-btn">
          <span><md-icon class="color-vendor">arrow_back</md-icon></span>
        </button>
      </template>
      <proposal-request-card
        class="carousel-item"
        v-for="(proposalRequest, idx) in proposalRequests"
        :key="proposalRequest.id"
        :proposalRequest="proposalRequest"
        :hasNegotiation="!!(proposalRequest.proposal && proposalRequest.proposal.negotiations && proposalRequest.proposal.negotiations.filter(it => it.status == 0).length)"
        @handle="handleRequestCard(idx)"
        @dismiss="dismiss"
      >
      </proposal-request-card>
      <div v-if="proposalRequests.length < 1" class="white-card p-20 d-flex">
        <img class="mb-0" :src="`${iconUrl}vendordashboard/group-17116.png`" style="width: 55px; height: 55px" />
        <div class="ml-15">
          <div class="font-size-18 font-bold text-uppercase color-vendor">No Open opportunities</div>
          <p class="my-10 font-size-14">
            We couldn't find any more opportunities for you at this point. Increase your exposure by improving your
            profile
          </p>
          <div class="d-flex">
            <md-button class="md-simple ml-auto md-vendor md-outlined" style="height: 30px">Optimize Profile</md-button>
          </div>
        </div>
      </div>
      <template slot="next">
        <button class="nav-right nav-btn">
          <md-icon class="color-vendor">arrow_forward</md-icon>
        </button>
      </template>
    </carousel>
    <hr class="my-40 color-vendor" />
    <div class="proposals-table">
      <div class="font-bold">All proposals:</div>
      <div class="filter-bar mt-30">
        <md-button
          v-for="tab in proposalTabs"
          :key="tab.key"
          class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20"
          @click="selectTab(tab.key)"
        >
          <div class="d-flex align-center px-20 py-10 font-size-16" :class="tab.class">
            <img
              class="mr-10"
              :src="`/static/icons/vendor/proposalBoard/${tab.icon}`"
              style="width: 20px; height: 20px"
            />
            {{ tab.title }}
            <span v-if="tab.key == 'all'" class="ml-5" :class="tab.class">({{ pagination.total }})</span>
            <span v-else class="ml-5" :class="tab.class">({{ pagination[tab.key] }})</span>
          </div>
        </md-button>
      </div>
      <div class="mt-30">
        <span class="font-size-16 font-bold" :class="!proposals.length ? 'color-minus' : 'color-won'">
          {{ pagination.total }} Proposals:</span
        >
      </div>
      <div class="md-layout mt-10">
        <div class="md-layout-item md-size-75 p-0 d-flex flex-column" style="background: rgba(255, 255, 255, 0.46)">
          <div class="sort-bar px-40" style="background: #f3f7fd">
            <span
              v-for="it in proposalHeaders"
              class="sort-item"
              :class="{ selected: it.key && sortFields['sort'] == it.key, 'text-center': it.key == 'update' }"
              @click="selectSort(it.key)"
            >
              {{ it.title }}
              <md-icon v-if="it.key && it.key != 'update' && sortFields['sort'] == it.key" class="color-black">
                {{ sortFields["order"] == "asc" ? "keyboard_arrow_up" : "keyboard_arrow_down" }}</md-icon
              >
              <md-icon v-if="it.key && it.key != 'update' && sortFields['sort'] != it.key" class="color-black-middle">
                keyboard_arrow_down
              </md-icon>
            </span>
          </div>
          <div v-if="!loading" class="propsoals-list">
            <div class="white-card md-20 proposal-list">
              <proposal-list-item
                v-for="proposal in proposals"
                :proposal="proposal"
                :hasNegotiation="!!(proposal.negotiations && proposal.negotiations.filter(it => it.status == 0).length)"
                :key="proposal.id"
                class="row"
                @action="handleProposal"
              ></proposal-list-item>
            </div>
          </div>
          <div v-if="this.proposals.length < 4" class="my-auto d-flex flex-column align-center">
            <img class="mb-0" :src="`${iconUrl}vendordashboard/group-17116.png`" />
            <p class="text-transform-uppercase font-size-14">No More Proposal To Show</p>
            <md-button class="md-vendor" @click="createNewProposal">Create New Proposal</md-button>
          </div>
        </div>
        <div class="md-layout-item md-size-25 mt-50">
          <insight
            :total="pagination.total"
            :won="pagination.won"
          ></insight>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-size-75">
          <div class="text-center">
            <table-pagination
              v-if="pagination.pageCount"
              class="mt-30"
              :pageCount="pagination.pageCount"
              :clickHandler="gotoPage"
            ></table-pagination>
          </div>
        </div>
        <div class="md-layout-item md-size-25"></div>
      </div>
    </div>
    <modal v-if="showProposalDetail" container-class="modal-container-wizard lg">
      <template slot="body">
        <proposal-content
            :vendorProposal="selectedProposal" @close="showProposalDetail = false" />
      </template>
    </modal>
    <modal v-if="showRequestNegotiationModal" container-class="modal-container negotiation bg-white">
      <template slot="header">
        <div class="border-right font-bold-extra text-center pr-10 mr-10">
          <div v-if="selectedProposalRequest.eventData.concept">{{selectedProposalRequest.eventData.concept.name}}</div>
          <div v-else-if="selectedProposalRequest.eventData.title">{{selectedProposalRequest.eventData.title}}</div>
          <div v-else >New Event</div>
        </div>

        <div class="border-right font-bold-extra text-center pr-10 mr-10">{{ $dateUtil.formatScheduleDay(selectedProposalRequest.eventData.eventStartMillis, "MM/DD/YY") }}</div>
        <div class="text-center font-bold-extra">
            $ {{ (selectedProposalRequest.proposal ? selectedProposalRequest.proposal.cost :
            selectedProposalRequest.componentInstance.allocatedBudget) | withComma }}
        </div>
        <md-button class="position-absolute md-simple ml-auto text-decoration-none cursor-pointer"
           @click="showRequestNegotiationModal=false"><md-icon>close</md-icon></md-button>
      </template>
      <template slot="body">
          <negotiation-request
              :expiredTime="expiredTime"
              :processed="negotiationProcessed"
              @close="showRequestNegotiationModal = false" />
      </template>
      <template slot="footer">
          <md-button v-if="negotiationProcessed === 0" class="md-simple md-vendor-text md-black p-0"
                     @click="handleNegotiation(negotiationRequestStatus.decline)">Decline</md-button>
          <md-button class="md-simple md-outlined md-vendor ml-auto"
                     @click="handleNegotiation(negotiationRequestStatus.review)">Review proposal</md-button>
          <md-button v-if="negotiationProcessed === 0" class="md-vendor ml-10"
                     @click="handleNegotiation(negotiationRequestStatus.approve)">Approve</md-button>
          <md-button v-else class="md-vendor ml-10"
                     @click="handleNegotiation(negotiationRequestStatus.done)">Done</md-button>
      </template>
    </modal>
  </div>
</template>
<script>
import ProposalListItem from "../components/ProposalListItem.vue";
import ProposalRequestCard from "../components/ProposalRequestCard";
import ProposalRequest from "@/models/ProposalRequest";
import Proposal from "@/models/Proposal";
import ProposalNegotiationRequest from "@/models/ProposalNegotiationRequest";
import { socialMediaBlocks } from "@/constants/vendor";
import carousel from "vue-owl-carousel";
import { Loader, TablePagination, Modal } from "@/components";
import _ from "underscore";
const ProposalContent = () => import("../components/ProposalDetail");
const NegotiationRequest = () => import("../components/NegotiationRequest");
const Insight = () => import("./insight");

// result of processed on negotiation request
const NONE = 0;
const APPROVED = 1;
const DECLINED = 2;

export default {
  components: {
    ProposalRequestCard,
    ProposalListItem,
    TablePagination,
    ProposalContent,
    NegotiationRequest,
    carousel,
    Loader,
    Modal,
    Insight,
  },
  data() {
    return {
      loading: true,
      iconUrl: `${this.$iconURL}`,
      proposalTabs: [
        { key: "all", title: "All Proposal", icon: "proposal-active.svg", class: "color-vendor" },
        { key: "won", title: "I won", icon: "filter-won.svg", class: "color-won" },
        { key: "draft", title: "Drafts", icon: "filter-draft.svg" },
        { key: "submit", title: "Pending", icon: "filter-pending.svg" },
        { key: "top", title: "Made Top3", icon: "filter-top3.svg" },
        { key: "lost", title: "Lost Bids", icon: "filter-reject.svg" },
      ],
      proposalHeaders: [
        { key: "", title: "" },
        { key: "name", title: "Name" },
        { key: "date", title: "Date" },
        { key: "cost", title: "Proposal Value" },
        { key: "modified", title: "Modified" },
        { key: "status", title: "Status" },
        { key: "owner", title: "Owner" },
        { key: "update", title: "Update", class: "text-center" },
        { key: "", title: "" },
      ],
      tab: "all",
      showProposalDetail: false,
      selectedProposal: null,
      selectedEventData: null,
      selectedProposalRequest: null,

      showRequestNegotiationModal: false,
      negotiationRequestStatus:{
        review: 0,
        approve: 1,
        decline: 2,
        done: 3
      },
      proposalStatus:{
        show: 0,
        edit: 1,
        download: 2,
        delete: 3,
        negotiation: 4,
      },
      negotiationProcessed: NONE,
      socialMediaBlocks,
      pagination: {
        total: 0,
        won: 0,
        draft: 0,
        submit: 0,
        top: 0,
        lost: 0,
        pageCount: 0,
        page: 0,
        limit: 6,
      },
      sortFields: { sort: "", order: "" },
      renderRender: true,
    };
  },
  async mounted() {
    // console.log('mounted', this.vendorData.id);
    this.$root.$emit("proposalTab");

    await this.init();
  },
  methods: {
    async getProposal() {
      const { pagination } = this;
      const params = { status: this.tab, ...this.sortFields };
        const data = await this.$store.dispatch("vendorDashboard/getProposals", {
            vendorId: this.vendorData.id,
            pagination,
            params
       });

      this.pagination.total = data.total;
      this.proposalTabs.map((t) => {
        if (data.hasOwnProperty(t.key)) this.pagination[t.key] = data[t.key];
      });
      this.pagination.pageCount = Math.ceil(data.total / this.pagination.limit);
    },
    gotoPage(selectedPage) {
      console.log(selectedPage);
      this.pagination.page = selectedPage;
      this.getProposal();
    },
    async selectTab(tab) {
      this.loading = true;
      this.tab = tab;
      await this.getProposal();
      this.loading = false;
    },
    async selectSort(sortField) {
      console.log(sortField);
      if (!sortField || sortField == "update") return;
      this.loading = true;
      if (this.sortFields.sort !== sortField) {
        this.$set(this.sortFields, "sort", sortField);
        this.$set(this.sortFields, "order", "asc");
      } else {
        this.sortFields["order"] = this.sortFields["order"] === "desc" ? "asc" : "desc";
      }
      await this.getProposal();
      this.loading = false;
    },
    async dismiss(id) {
      const res = await new ProposalRequest({
        id,
        declineMessage: "decline",
      }).save();
      this.proposalRequests = this.proposalRequests.filter((p) => {
        return p.id !== id;
      });
    },
    async handleProposal(action, id) {
      this.selectedProposal = this.proposals.find((it) => it.id == id);

      if (action === this.proposalStatus.show) {
        this.showProposalDetail = true;

      } else if (action === this.proposalStatus.edit) {

        let routeData = this.$router.resolve({
          name: this.selectedProposal.nonMaryoku ? 'outsideProposalEdit' : 'proposalEdit',
          params: {
            vendorId: this.selectedProposal.vendor.id,
            id: this.selectedProposal.nonMaryoku ? this.selectedProposal.id : this.selectedProposal.proposalRequest.id,
            type: "edit",
          },
        });
        this.openNewTab(routeData.href);
      } else if (action === this.proposalStatus.delete) {

        this.loading = true;
        const proposal = await Proposal.find(id);
        await proposal.delete();

        await this.getProposal();

        this.loading = false;
      } else if (action === this.proposalStatus.download) {

        this.openNewTab(`https://api-dev.maryoku.com/1/proposal/${this.selectedProposal.id}/download`);
      } else if(action === this.proposalStatus.negotiation) {
        this.selectedProposalRequest = this.proposalRequests.find(it => it.proposal && it.proposal.id === id);
        this.showRequestNegotiationModal = true;
        this.negotiationProcessed = NONE;
      }
    },
    handleRequestCard(idx){
      console.log('handleRequestCard', idx);
      let proposalRequest = this.proposalRequests[idx];
      if(proposalRequest.proposal && proposalRequest.proposal.negotiations && proposalRequest.proposal.negotiations.length){
          this.selectedProposalRequest = proposalRequest;
          this.showRequestNegotiationModal = true;
          this.negotiationProcessed = NONE;
      } else {
          let params = proposalRequest.proposal ? {id: proposalRequest.id, type: 'edit'} : {rfpId: proposalRequest.id}
          let routeData = this.$router.resolve({
              name: proposalRequest.proposal ? 'proposalEdit' : 'VendorProposal',
              params: {...params, vendorId: this.vendorData.id},
          });
          this.openNewTab(routeData.href);
      }
    },
    async handleNegotiation(status){
      if(status === this.negotiationRequestStatus.review) {
        this.showRequestNegotiationModal = false;
        this.selectedProposal = this.proposals.find(p => p.id === this.selectedProposalRequest.proposal.id);
        this.showProposalDetail = true;

      } else if(status === this.negotiationRequestStatus.approve || status === this.negotiationRequestStatus.decline){
        let expiredTime = this.selectedProposalRequest.expiredTime -
            (status === this.negotiationRequestStatus.decline ? 2 * 3600 * 24 * 1000 : 0);

        new ProposalNegotiationRequest({
          id: this.selectedProposalRequest.proposal.negotiations[0].id,
          expiredTime,
          status
        })
        .for(new Proposal({id: this.selectedProposalRequest.proposal.id}))
        .save()
        .then(async res => {
            let proposal = this.proposals.find(it => it.id === this.selectedProposalRequest.proposal.id);
            proposal.negotiations[0] = res;
            this.selectedProposalRequest.proposal.negotiations[0] = res;

            if(status === this.negotiationRequestStatus.decline) this.selectedProposalRequest.expiredTime = expiredTime;
            if(status === this.negotiationRequestStatus.approve) proposal.expiredDate = new Date(expiredTime);

            this.$store.commit("vendorDashboard/setProposalRequest", this.selectedProposalRequest);
            this.$store.commit("vendorDashboard/setProposal", proposal);
            if(status === this.negotiationRequestStatus.decline){
                this.negotiationProcessed = DECLINED
            } else {
                this.negotiationProcessed = APPROVED;
            }
        })
      } else if(status === this.negotiationRequestStatus.done) {
        this.showRequestNegotiationModal = false;
        this.negotiationProcessed = NONE;
      }
    },
    createNewProposal() {
      let routeData = this.$router.resolve({
        name: "outsideProposalCreate",
        params: {
          vendorId: this.vendorData.id,
        },
      });
      this.openNewTab(routeData.href);
    },
    openNewTab(link) {
      window.open(link, "_blank");
    },
    eventDate() {
      let suggestionDate = this.selectedProposal.suggestionDate || [];
      if (!this.selectedEventData) return "-";

      let startDate = new Date(this.selectedEventData.eventStartMillis);
      let endDate = new Date(this.selectedEventData.eventEndMillis);
      if (suggestionDate && suggestionDate.length > 0) {
        return `${moment(suggestionDate[0].date, "DD/MM/YYYY").format("MMM D, YYYY")} - ${moment(
          suggestionDate[suggestionDate.length - 1].date,
          "DD/MM/YYYY",
        ).format("MMM D, YYYY")}`;
      }
      return `${moment(startDate).format("MMM D, YYYY")} - ${moment(endDate).format("MMM D, YYYY")}`;
    },
    isSocial() {
      let isBlank = true;
      _.each(this.selectedProposal.vendor.social, (s) => {
        isBlank &= s === null;
      });

      return !isBlank;
    },
    headerBackgroundImage() {
      if (!this.selectedProposal) return "";
      if (this.selectedProposal.inspirationalPhotos && this.selectedProposal.inspirationalPhotos[0])
        return this.selectedProposal.inspirationalPhotos[0].url;
      if (this.selectedProposal.vendor.images && this.selectedProposal.vendor.images[0])
        return this.selectedProposal.vendor.images[0];
      if (this.selectedProposal.vendor.vendorImages && this.selectedProposal.vendor.vendorImages[0])
        return this.selectedProposal.vendor.vendorImages[0];

      return "";
    },
    async init() {
      await this.getProposal();
      this.loading = false;
    },
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
    proposalRequests(){
      let proposalRequests = this.$store.state.vendorDashboard.proposalRequests;
      return proposalRequests.filter((p) => {
          return p.proposal
              ? p.declineMessage !== "decline" && p.proposal.status !== 'submit' && p.remainingTime > 0 ||
              p.proposal.status === 'submit' && p.proposal.negotiations && p.proposal.negotiations.filter(it => it.status == 0 && it.remainingTime > 0).length
              : p.remainingTime > 0 && p.declineMessage !== "decline";
      });
    },
    proposals(){
      return this.$store.state.vendorDashboard.proposals;
    },
    expiredTime(){
      if(!this.selectedProposalRequest) return null;
      if(this.negotiationProcessed === NONE || this.negotiationProcessed === DECLINED){
          return new Date(this.selectedProposalRequest.proposal.expiredDate).getTime()
      } else if(this.negotiationProcessed === APPROVED) {
          return this.selectedProposalRequest.expiredTime;
      }
    },
  },
  watch: {
    proposalRequests(newVal){
      console.log('proposalRequests.watch', newVal);
    }
  },
  updated() {
    // remove empty item in proposal-request carousel
    $(".owl-item").each(function (el) {
      if ($(this).text().length === 0) $(this).remove();
    });
  },
};
</script>
<style lang="scss" scoped>
.vendor-proposal-board {
  .proposal-requests {
    display: flex;
    position: relative;
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 10;
      width: 33px;
      height: 33px;
      background-color: white;
      border: none;
      border-radius: 50%;
      box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);
      cursor: pointer;
      &.nav-left {
        left: 10px;
      }
      &.nav-right {
        right: 10px;
      }
    }
  }
  .proposal-list {
    .proposal-list-item:not(:last-child) {
      border-bottom: solid 1px #dbdbdb;
    }
  }
  .sort-bar {
    height: 50px;
    display: grid;
    align-items: center;
    grid-template-columns: 5% 20% 10% 15% 10% 10% 10% 15% 5%;
    .sort-item {
      cursor: pointer;
      color: #707070;
      font-size: 14px;
      &.selected {
        color: #050505;
        font-weight: bold;
      }
    }
  }
  .tips {
    img {
      height: 20px;
    }
  }
  .border-right{
   border-right: 1px solid #050505;
  }
}
</style>
