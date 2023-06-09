<template>
  <div class="vendor-proposal-board p-40">
    <loader :active="loading" :is-full-screen="true" page="vendor" />
    <Header @onCreate="createNewProposal" />
    <div class="font-bold text-uppercase mt-30 mb-15">
      Opportunities
    </div>
    <carousel v-if="!loading" :items="4" :margin="25" :dots="false" :number="2" :nav="false" class="proposal-requests">
      <template slot="prev">
        <button class="nav-left nav-btn">
          <span><md-icon class="color-vendor">arrow_back</md-icon></span>
        </button>
      </template>
      <ProposalRequestCard
        v-for="(proposalRequest, idx) in proposalRequests"
        :key="proposalRequest.id"
        class="carousel-item"
        :proposal-request="proposalRequest"
        :has-negotiation="!!getNegotiations(proposalRequest.proposal).length"
        @handle="handleRequestCard(idx)"
        @dismiss="dismiss"
      />
      <EmptyRequestCard v-if="proposalRequests.length < 1" />

      <template slot="next">
        <button class="nav-right nav-btn">
          <md-icon class="color-vendor">
            arrow_forward
          </md-icon>
        </button>
      </template>
    </carousel>
    <hr class="my-40 color-vendor">
    <div class="proposals-table">
      <div class="font-bold">
        All proposals:
      </div>
      <div class="filter-bar mt-30">
        <md-button
          v-for="proposalTab in proposalTabs"
          :key="proposalTab.key"
          class="md-round md-white-shadow md-white maryoku-btn filter-button mr-20"
          @click="selectTab(proposalTab.value)"
        >
          <div class="d-flex align-center px-20 py-10 font-size-16" :class="proposalTab.class">
            <img
              class="mr-10"
              :src="`/static/icons/vendor/proposalBoard/${proposalTab.icon}`"
              alt=""
              style="width: 20px; height: 20px"
            >
            {{ proposalTab.title }}
            <span v-if="proposalTab.key === 'all'" class="ml-5" :class="proposalTab.class">({{ pagination.total }})</span>
            <span v-else class="ml-5" :class="proposalTab.class">({{ pagination[proposalTab.key] }})</span>
          </div>
        </md-button>
      </div>
      <div class="mt-30">
        <span class="font-size-16 font-bold" :class="!proposals.length ? 'color-minus' : 'color-won'">
          {{ pagination.total }} Proposals:</span>
      </div>
      <div class="md-layout mt-10">
        <div class="md-layout-item md-size-75 p-0 d-flex flex-column" style="background: rgba(255, 255, 255, 0.46)">
          <div class="sort-bar px-40" style="background: #f3f7fd">
            <span
              v-for="it in proposalHeaders"
              :key="it.title"
              class="sort-item"
              :class="{ selected: it.key && sortFields['sort'] === it.key, 'text-center': it.key === 'update' }"
              @click="selectSort(it.key)"
            >
              {{ it.title }}
              <md-icon v-if="it.key && it.key !== 'update' && sortFields['sort'] === it.key" class="color-black">
                {{ sortFields["order"] === "asc" ? "keyboard_arrow_up" : "keyboard_arrow_down" }}</md-icon>
              <md-icon v-if="it.key && it.key !== 'update' && sortFields['sort'] !== it.key" class="color-black-middle">
                keyboard_arrow_down
              </md-icon>
            </span>
          </div>
          <div v-if="!loading" class="propsoals-list">
            <div class="white-card md-20 proposal-list">
              <ProposalListItem
                v-for="(proposal, idx) in proposals"
                :key="proposal.id"
                :proposal="proposal"
                :has-negotiation="
                  !!(
                    !proposal.accepted &&
                    proposal.negotiations &&
                    proposal.negotiations.filter(it => it.status === 0).length
                  )
                "
                class="row"
                :color="colors[idx]"
                @action="handleProposal"
              />
            </div>
          </div>
          <div v-if="proposals.length < 4" class="my-auto d-flex flex-column align-center">
            <img class="mb-0" :src="`${iconUrl}vendordashboard/group-17116.png`" alt="">
            <p class="text-transform-uppercase font-size-14">
              No More Proposal To Show
            </p>
            <md-button class="md-vendor" @click="createNewProposal">
              Create New Proposal
            </md-button>
          </div>
        </div>
        <div class="md-layout-item md-size-25 mt-50">
          <insight v-if="!loading" :total="pagination.total" :won="pagination.won" @insight="count()" />
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-size-75">
          <div class="text-center">
            <TablePagination
              v-if="pagination.pageCount"
              class="mt-30"
              :page-count="pagination.pageCount"
              :click-handler="gotoPage"
            />
          </div>
        </div>
        <div class="md-layout-item md-size-25" />
      </div>
    </div>
    <modal v-if="showProposalDetail" container-class="modal-container-wizard lg">
      <template slot="body">
        <ProposalContent :vendor-proposal="selectedProposal" @close="showProposalDetail = false" />
      </template>
    </modal>
    <modal v-if="showRequestNegotiationModal" container-class="modal-container negotiation bg-white">
      <template slot="header">
        <div class="border-right font-size-20 font-bold-extra text-center pr-10 mr-10">
          <div
            v-if="
              selectedProposalRequest && selectedProposalRequest.eventData && selectedProposalRequest.eventData.concept
            "
          >
            {{ selectedProposalRequest.eventData.concept.name }}
          </div>
          <div
            v-else-if="
              selectedProposalRequest && selectedProposalRequest.eventData && selectedProposalRequest.eventData.title
            "
          >
            {{ selectedProposalRequest.eventData.title }}
          </div>
          <div v-else>
            New Event
          </div>
        </div>

        <div v-if="selectedProposal.nonMaryoku" class="border-right font-size-20 font-bold-extra text-center pr-10 mr-10">
          {{ $dateUtil.formatScheduleDay(selectedProposal.eventData.startTime * 1000, "MM/DD/YY") }}
        </div>
        <div v-else class="border-right font-size-20 font-bold-extra text-center pr-10 mr-10">
          {{ $dateUtil.formatScheduleDay(selectedProposalRequest.eventData.eventStartMillis, "MM/DD/YY") }}
        </div>
        <div class="text-center font-size-20 font-bold-extra">
          $
          {{ selectedProposal.cost | withComma(Number) }}
        </div>
        <md-button
          class="position-absolute md-simple ml-auto text-decoration-none cursor-pointer"
          @click="showRequestNegotiationModal = false"
        >
          <md-icon>close</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <negotiation-request
          :type="negotiationType"
          :negotiation="negotiation"
          :processed="negotiationProcessed"
          @close="showRequestNegotiationModal = false"
        />
      </template>
      <template slot="footer">
        <template v-if="negotiationType === negotiationTypes.ADD_MORE_TIME">
          <md-button
            v-if="negotiationProcessed === 0"
            class="md-simple md-vendor-text md-black p-0"
            @click="handleNegotiation(negotiationRequestStatus.decline)"
          >
            Decline
          </md-button>
          <md-button
            class="md-simple md-outlined md-vendor ml-auto"
            @click="handleNegotiation(negotiationRequestStatus.review)"
          >
            Review proposal
          </md-button>
          <md-button
            v-if="negotiationProcessed === 0"
            class="md-vendor ml-10"
            @click="handleNegotiation(negotiationRequestStatus.approve)"
          >
            Approve
          </md-button>
          <md-button v-else class="md-vendor ml-10" @click="handleNegotiation(negotiationRequestStatus.done)">
            Done
          </md-button>
        </template>
        <template v-else-if="negotiationType === negotiationTypes.EVENT_CHANGE">
          <md-button
            class="md-simple md-vendor-text md-black p-0"
            @click="handleNegotiation(negotiationRequestStatus.cancel_proposal)"
          >
            Cancel proposal
          </md-button>
          <md-button
            class="md-simple md-outlined md-vendor ml-auto"
            @click="handleNegotiation(negotiationRequestStatus.update_proposal)"
          >
            Update proposal
          </md-button>
          <md-button class="md-vendor ml-10" @click="handleNegotiation(negotiationRequestStatus.acknowledge)">
            Acknowledge
          </md-button>
        </template>
        <template v-else-if="negotiationType === negotiationTypes.PRICE_NEGOTIATION">
          <md-button
            class="md-simple md-vendor-text md-black p-0"
            @click="handleNegotiation(negotiationRequestStatus.decline)"
          >
            Decline
          </md-button>
          <md-button
            class="md-simple md-vendor-text md-black p-0 ml-auto"
            @click="handleNegotiation(negotiationRequestStatus.review)"
          >
            Review proposal
          </md-button>
          <md-button class="md-vendor ml-10" @click="handleNegotiation(negotiationRequestStatus.approve)">
            Approve
          </md-button>
        </template>
      </template>
    </modal>

    <centred-modal v-if="showLessInsightModal" container-class=" bg-white px-60">
      <template slot="header">
        <div>
          <span
            class="winning-rate"
          >Winning Rate</span>
        </div>
      </template>
      <template slot="body">
        <NoInsight />
      </template>
      <template slot="footer">
        <md-button class="md-vendor px-50" @click="showLessInsightModal = false">
          Close
        </md-button>
      </template>
    </centred-modal>
    <modal v-if="showInsightModal" container-class="modal-container bg-white">
      <template slot="header">
        <md-button
          class="position-absolute md-simple ml-auto text-decoration-none cursor-pointer"
          @click="showInsightModal = false"
        >
          <md-icon>close</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <InsightDetail />
      </template>
      <template slot="footer">
        <md-button class="md-simple ml-auto md-outlined md-vendor p-0">
          Update Your Prices
        </md-button>
        <md-button class="md-vendor ml-20" @click="showInsightModal = false">
          Close
        </md-button>
      </template>
    </modal>
    <ShareProposal
      v-if="showShareProposalModal"
      :link="proposalLink"
      @close="showShareProposalModal = false"
    />
    <ResendProposalResult
      v-if="showResendProposalModal"
      :to="
        selectedProposal.nonMaryoku
          ? selectedProposal.eventData.customer.email
          : selectedProposal.proposalRequest.eventData.owner.email
      "
      @close="showResendProposalModal = false"
      @submit="showResendProposalModal = false"
    />
    <ProposalGraphModal
      v-if="showProposalGraph"
      :proposal="selectedProposal"
      @close="showProposalGraph = false"
    />
  </div>
</template>
<script>
// core
import moment from "moment";
import NoInsight from "./NoInsight.vue";
import _ from "underscore";

import ProposalRequest from "@/models/ProposalRequest";

// pages
import ProposalRequestCard from "@/pages/app/Vendors/components/ProposalRequestCard.vue";
import EmptyRequestCard    from "@/pages/app/Vendors/components/EmptyRequestCard.vue";

// components
import Header from "./Header";

// utils
import { avatarColors }                               from "@/constants/color";
import { socialMediaBlocks }                          from "@/constants/vendor";
import { PROPOSAL_PAGE_TABS, PROPOSAL_TABLE_HEADERS } from "@/constants/list";
import { PROPOSAL_VERSION_FIELDS }                    from "@/constants/proposal";
import { PROPOSAL_PAGE_PAGINATION }                   from "@/constants/pagination";
import {
  NEGOTIATION_REQUEST_STATUS,
  NEGOTIATION_REQUEST_TYPE,
  PROPOSAL_STATUS
} from "@/constants/status";

export default {
  components: {
    carousel             : () => import("vue-owl-carousel"),
    Loader               : () => import("@/components/loader/Loader.vue"),
    Modal                : () => import("@/components/Modal.vue"),
    CentredModal         : () => import("@/components/CentredModal.vue"),
    NegotiationRequest   : () => import("@/pages/app/Vendors/components/NegotiationRequest.vue"),
    ProposalContent      : () => import("@/pages/app/Vendors/components/ProposalDetail.vue"),
    ProposalListItem     : () => import("@/pages/app/Vendors/components/ProposalListItem"),
    InsightDetail        : () => import("@/pages/app/Vendors/components/InsightDetail.vue"),
    TablePagination      : () => import("@/components/TablePagination.vue"),
    Insight              : () => import("@/pages/app/Vendors/ProposalBoard/insight.vue"),
    ShareProposal        : () => import("@/pages/app/Vendors/ProposalBoard/ShareProposal.vue"),
    ResendProposalResult : () => import("@/pages/app/Vendors/ProposalBoard/ResendProposalResult.vue"),
    ProposalGraphModal   : () => import("@/pages/app/Vendors/ProposalBoard/GraphModal/index.vue"),
    ProposalRequestCard,
    EmptyRequestCard,
    NoInsight,
    Header,
  },
  data() {
    return {
      showLessInsightModal        : false,
      loading                     : true,
      iconUrl                     : `${this.$iconURL}`,
      proposalTabs                : PROPOSAL_PAGE_TABS,
      proposalHeaders             : PROPOSAL_TABLE_HEADERS,
      tab                         : "all",
      showProposalDetail          : false,
      showShareProposalModal      : false,
      showProposalGraph           : false,
      selectedProposal            : null,
      selectedEventData           : null,
      selectedProposalRequest     : null,
      selectedProposalForGraph    : null,
      showRequestNegotiationModal : false,
      showResendProposalModal     : false,
      showInsightModal            : false,
      negotiationRequestStatus: {
        review          : 0,
        approve         : 1,
        decline         : 2,
        done            : 3,
        cancel_proposal : 4,
        update_proposal : 5,
        acknowledge     : 6,
      },
      proposalStatus: {
        show        : 0,
        edit        : 1,
        download    : 2,
        delete      : 3,
        share       : 4,
        negotiation : 5,
        resend      : 7,
        cancel      : 8,
        engagement  : 9,
      },
      negotiationProcessed : NEGOTIATION_REQUEST_STATUS.NONE,
      negotiationType      : NEGOTIATION_REQUEST_TYPE.ADD_MORE_TIME,
      negotiationTypes     : NEGOTIATION_REQUEST_TYPE,
      pagination           : PROPOSAL_PAGE_PAGINATION,
      versionFields        : PROPOSAL_VERSION_FIELDS,
      sortFields           : { sort: "cost", order: "desc" },
      colors               : avatarColors,
      socialMediaBlocks,
    };
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
    proposalLink() {
      if (!this.selectedProposal) return null;
      return this.selectedProposal.nonMaryoku
        ? `${location.origin}/#/unregistered/proposals/${this.selectedProposal.id}`
        : `${location.origin}/#/vendors/${this.selectedProposal.vendor.id}/proposal-request/${
            this.selectedProposal.proposalRequestId
          }/form/edit`;
    },
    proposalRequests() {
      let proposalRequests = this.$store.state.vendorDashboard.proposalRequests;
      return proposalRequests.filter(p => {
        return p.proposal
          ? (p.declineMessage !== "decline" && p.proposal.status === PROPOSAL_STATUS.DRAFT && p.remainingTime > 0) ||
              (!p.proposal.accepted &&
                p.proposal.negotiations &&
                p.proposal.negotiations.filter(
                  it => it.status === NEGOTIATION_REQUEST_STATUS.NONE && it.remainingTime > 0,
                ).length)
          : p.remainingTime > 0 && p.declineMessage !== "decline";
      });
    },
    proposals() {
      return this.$store.state.vendorDashboard.proposals.filter(p => p.status !== PROPOSAL_STATUS.INACTIVE);
    },
    negotiation() {
      const negotiations = this.getNegotiations(this.selectedProposal);
      if ( !negotiations.length ) return null;

      if (negotiations[0].type === NEGOTIATION_REQUEST_TYPE.ADD_MORE_TIME) {
        return new Date(negotiations[0].expiredTime).getTime();
      } else if (negotiations[0].type === NEGOTIATION_REQUEST_TYPE.EVENT_CHANGE) {
        const { nonMaryoku } = this.selectedProposal;
        const eventData = this.selectedProposal.nonMaryoku
          ? this.selectedProposal.eventData
          : this.selectedProposalRequest.eventData;

        const { event } = negotiations[0];
        const timeFormat = (date) => moment(date).format("hh:mm a");
        return {
          originalDate      : moment( nonMaryoku ? eventData.startTime * 1000 : eventData.eventStartMillis).format("DD-MM-YY"),
          date              : moment(event.startTime * 1000).format("DD-MM-YY"),
          originalStartTime : timeFormat(nonMaryoku ? eventData.startTime * 1000 : eventData.eventStartMillis),
          originalEndTime   : timeFormat(nonMaryoku ? eventData.endTime   * 1000 : eventData.eventEndMillis),
          startTime         : timeFormat(event.startTime * 1000),
          endTime           : timeFormat(event.endTime * 1000),
          originalNumberOfParticipants : eventData.numberOfParticipants,
          numberOfParticipants         : event.numberOfParticipants,
          originalLocation             : eventData.location,
          location                     : event.location,
          originalEventType            : eventData.eventType,
          eventType                    : event.eventType,
        };
      } else if (negotiations[0].type === NEGOTIATION_REQUEST_TYPE.PRICE_NEGOTIATION) {
        let { numberOfParticipants } = this.selectedProposal.nonMaryoku ? this.selectedProposal.eventData : this.selectedProposalRequest.eventData;
        let data = negotiations[0].price;
        let budget = data.rate === "%" ? this.selectedProposal.cost * (1 - data.value / 100) : this.selectedProposal.cost - data.value;
        const calcBudget = (budget, numberOfParticipants) => (budget / numberOfParticipants).toFixed(2);
        return {
          budget,
          originalBudget         : this.selectedProposal.cost,
          originalBudgetPerGuest : calcBudget(this.selectedProposal.cost, numberOfParticipants),
          budgetPerGuest         : calcBudget(budget, numberOfParticipants),
        };
      }
      return null;
    },
  },
  async mounted() {
    this.$root.$emit("proposalTab");

    await this.init();
  },
  updated() {
    // remove empty item in proposal-request carousel
    $(".owl-item").each(function() {
      if ($(this).text().length === 0) $(this).remove();
    });
  },
  methods: {
    async getProposal() {
      const { pagination } = this;
      const params = { status: this.tab, ...this.sortFields };
      const data = await this.$store.dispatch("vendorDashboard/getProposals", {
        vendorId: this.vendorData.id,
        pagination,
        params,
      });

      this.pagination.total = data.total;
      this.proposalTabs.map(t => {
        if (data.hasOwnProperty(t.key)) this.pagination[t.key] = data[t.key];
      });
      this.pagination.pageCount = Math.ceil(data.total / this.pagination.limit);
    },
    gotoPage(selectedPage) {
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
      if (!sortField || sortField === "update") return;
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
      this.loading = true;
      await new ProposalRequest({
        id,
        declineMessage: "decline",
      }).save();
      let proposalRequests = this.proposalRequests.filter(p => {
        return p.id !== id;
      });
      await this.$store.commit("vendorDashboard/setProposalRequests", proposalRequests);
      this.loading = false;
    },
    async handleProposal(action, id) {
      this.selectedProposal = this.proposals.find(it => it.id === id);
      const negotiations = this.getNegotiations(this.selectedProposal);
      switch (action) {
        case this.proposalStatus.show        : return this.showProposalDetail = true;
        case this.proposalStatus.edit        : return this.editProposal();
        case this.proposalStatus.download    : return this.openNewTab(`${process.env.SERVER_URL}/1/proposal/${this.selectedProposal.id}/download`);
        case this.proposalStatus.share       : return this.showShareProposalModal = true;
        case this.proposalStatus.engagement  : return this.showProposalGraph = true;
        case this.proposalStatus.delete      : {
          this.loading = true;
          await this.$store.dispatch("vendorDashboard/removeProposal", id);
          await this.getProposal();
          this.loading = false;
          break;
        }
        case this.proposalStatus.negotiation : {
          this.showRequestNegotiationModal = true;
          this.selectedProposalRequest = this.selectedProposal.proposalRequest;
          this.negotiationProcessed = NEGOTIATION_REQUEST_STATUS.NONE;
          this.negotiationType = negotiations[0].type;
          break;
        }
        case this.proposalStatus.resend: {
          const origin = `${location.protocol}//${location.host}`;
          const url = this.selectedProposal.nonMaryoku
            ? `${origin}/#/unregistered/proposals/${this.selectedProposal.id}`
            : `${origin}/#/signin`;

          const eventName = this.selectedProposal.nonMaryoku
            ? this.selectedProposal.eventData.customer.company
            : this.selectedProposal.proposalRequest.eventData.title || "New event";

          await this.sendEmail({ type: "again", proposalId: this.selectedProposal.id, url, eventName });
          this.showResendProposalModal = true;
          break;
        }
        case this.proposalStatus.cancel: {
          this.loading = true;
          await this.$store.dispatch("vendorDashboard/updateProposal", {
            data: { ...this.selectedProposal, status: PROPOSAL_STATUS.CANCEL },
            vendorId: this.selectedProposal.vendor.id,
          });
          const url = `${location.protocol}//${location.host}/#/signin`;
          await this.sendEmail({ type: "inactive", url, proposalId: this.selectedProposal.id });
          this.loading = false;
          break;
        }
      }
    },

    count() {
      if (this.proposalRequests < 10) return this.showLessInsightModal = true;
      return this.showInsightModal = true;
    },
    handleRequestCard(idx) {
      let proposalRequest = this.proposalRequests[idx];
      const negotiations = this.getNegotiations(proposalRequest.proposal);

      if ( negotiations.length ) {

        this.selectedProposalRequest = proposalRequest;
        this.selectedProposal = this.proposals.find(p => p.id === proposalRequest.proposal.id);
        this.showRequestNegotiationModal = true;
        this.negotiationProcessed = NEGOTIATION_REQUEST_STATUS.NONE;
        this.negotiationType = negotiations[0].type;

      } else {
        let params = proposalRequest.proposal
          ? { id: proposalRequest.id, type: "edit" }
          : { rfpId: proposalRequest.id };
        let routeData = this.$router.resolve({
          name: proposalRequest.proposal ? "proposalEdit" : "VendorProposal",
          params: { ...params, vendorId: this.vendorData.id },
        });
        this.openNewTab(routeData.href);
      }
    },
    async handleNegotiation(status) {
      if (status === this.negotiationRequestStatus.review) {
        this.showRequestNegotiationModal = false;
        this.showProposalDetail = true;
      } else if (status === this.negotiationRequestStatus.approve || status === this.negotiationRequestStatus.decline) {
        this.loading = true;
        let expiredTime = new Date(this.selectedProposal.expiredDate).getTime() + 2 * 3600 * 24 * 1000;
        let signupUrl = `${location.protocol}//${location.host}/#/guest/signup`;

        let url = this.selectedProposal.nonMaryoku
          ? `${location.protocol}//${location.host}/#/unregistered/proposals/${this.selectedProposal.id}`
          : `${location.protocol}//${location.host}/#/signin`;

        let data = {
          id: this.selectedProposal.negotiations[0].id,
          status,
          url,
        };
        console.log('proposal', this.selectedProposal)
        if (
          status === this.negotiationRequestStatus.approve &&
          this.selectedProposal.negotiations[0].type === NEGOTIATION_REQUEST_TYPE.ADD_MORE_TIME
        )
          data = { ...data, expiredTime };
        if (
          status === this.negotiationRequestStatus.decline &&
          this.selectedProposal.negotiations[0].type === NEGOTIATION_REQUEST_TYPE.PRICE_NEGOTIATION
        )
          data = { ...data, signupUrl };

        let negotiation = await this.$store.dispatch("vendorDashboard/saveNegotiation", {
          data,
          proposal: this.selectedProposal,
        });
        if (this.selectedProposal.negotiations[0].type === NEGOTIATION_REQUEST_TYPE.PRICE_NEGOTIATION) {
            this.showRequestNegotiationModal = false;

            if (status === this.negotiationRequestStatus.approve) {

                const version = await this.saveVersion(this.selectedProposal);
                this.selectedProposal.versions.push(version);

                const params = {
                  vendorId: this.selectedProposal.vendor.id,
                  type: "edit",
                  id: this.selectedProposal.nonMaryoku ? this.selectedProposal.id : this.selectedProposalRequest.id
                };
                const name = this.selectedProposal.nonMaryoku ? "outsideProposalEdit" : "proposalEdit";

                const routeData = this.$router.resolve({
                    name,
                    params,
                    query: {
                        version: version.id,
                        step: 3,
                        negotiation: true,
                    },
                });
                this.openNewTab(routeData.href);
            }
        }

        this.selectedProposal.negotiations[0] = negotiation;

        if (
          status === this.negotiationRequestStatus.approve &&
          this.selectedProposal.negotiations[0].type === NEGOTIATION_REQUEST_TYPE.ADD_MORE_TIME
        )
          this.selectedProposal.expiredDate = new Date(expiredTime);

        await this.$store.commit("vendorDashboard/setProposal", this.selectedProposal);

        let proposalRequest = this.selectedProposalRequest
          ? this.selectedProposalRequest
          : this.proposalRequests.find(p => p.proposal && p.proposal.id === this.selectedProposal.id);
        this.$set(proposalRequest, "proposal", this.selectedProposal);
        await this.$store.commit("vendorDashboard/setProposalRequest", proposalRequest);

        this.loading = false;
        this.negotiationProcessed = status;
      } else if (
        status === this.negotiationRequestStatus.acknowledge ||
        status === this.negotiationRequestStatus.cancel_proposal ||
        status === this.negotiationRequestStatus.update_proposal
      ) {
        this.loading = true;
        let version = {};
        if (status === this.negotiationRequestStatus.update_proposal) {
          // get proposal to update event info
          version = await this.saveVersion(this.selectedProposal);
          this.selectedProposal.versions.push(version);
        }
        const negotiation = await this.$store.dispatch("vendorDashboard/saveNegotiation", {
          data: {
            id: this.selectedProposal.negotiations[0].id,
            status,
            loginUrl: `${location.protocol}//${location.host}/#/signin`,
          },
          proposal: this.selectedProposal,
        });

        this.selectedProposal.negotiations[0] = negotiation;
        this.$store.commit("vendorDashboard/setProposal", this.selectedProposal);

        let proposalRequest = this.selectedProposalRequest
          ? this.selectedProposalRequest
          : this.proposalRequests.find(p => p.proposal.id === this.selectedProposal.id);
        this.$set(proposalRequest, "proposal", this.selectedProposal);
        await this.$store.commit("vendorDashboard/setProposalRequest", proposalRequest);

        if (status === this.negotiationRequestStatus.cancel_proposal) {
          let proposals = this.proposals.filter(it => it.id !== this.selectedProposal.id);
          this.$store.commit("vendorDashboard/setProposals", proposals);
        }

        if (status === this.negotiationRequestStatus.update_proposal) {
          let query = { version: version.id };
          this.editProposal(null, query);
        }
        this.loading = false;
        this.showRequestNegotiationModal = false;
        this.negotiationProcessed = NEGOTIATION_REQUEST_STATUS.NONE;
      } else if (status === this.negotiationRequestStatus.done) {
        this.showRequestNegotiationModal = false;
        this.negotiationProcessed = NEGOTIATION_REQUEST_STATUS.NONE;
      }
    },
    async saveVersion(proposal) {
      let data = {};

      console.log('version', proposal);
      this.versionFields.map(key => {
        if (key === "eventData") {
          data[key] = { ...proposal.eventData, ...proposal.negotiations[0].event };
        }else if ( key === "negotiationDiscount" && proposal.negotiations[0].type === NEGOTIATION_REQUEST_TYPE.PRICE_NEGOTIATION) {
            data.negotiationDiscount = {
                isApplied: true,
                percentage: proposal.negotiations[0].price.rate === "%" ? proposal.negotiations[0].price.value :
                    (proposal.negotiations[0].price.value / proposal.cost * 100).toFixed(2),
                price: proposal.negotiations[0].price.rate === "$" ? proposal.negotiations[0].price.value :
                    (proposal.negotiations[0].price.value / 100 * proposal.cost).toFixed(2),
            };
        }
        else if (key === "bookedServices") {
          data[key] = [];
        } else {
          data[key] = proposal[key];
        }
      });

      let versionData = {
        name: `Ver${proposal.versions.length + 1}-${moment().format("DD/MM/YYYY")}`,
        data,
      };
      const version = await this.$store.dispatch("vendorDashboard/saveVersion", { version: versionData, proposal });
      return version;
    },
    editProposal(params = null, query = null) {
      let routeData = this.$router.resolve({
        name: this.selectedProposal.nonMaryoku ? "outsideProposalEdit" : "proposalEdit",
        params: params
          ? params
          : {
              vendorId: this.selectedProposal.vendor.id,
              id: this.selectedProposal.nonMaryoku
                ? this.selectedProposal.id
                : this.selectedProposal.proposalRequest.id,
              type: "edit",
            },
        query: query ? query : null,
      });
      this.openNewTab(routeData.href);
    },
    async sendEmail(params) {
      await this.$http.post(
        `${process.env.SERVER_URL}/1/proposals/${this.selectedProposal.id}/sendEmail`,
        { ...params },
        { headers: this.$auth.getAuthHeader() },
      );
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
      _.each(this.selectedProposal.vendor.social, s => {
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
      await this.$store.dispatch("vendorDashboard/getProposalRequests", this.vendorData.id);
      await this.getProposal();
      this.loading = false;
    },
    getNegotiations(proposal) {
      if (!proposal || !proposal.negotiations) return [];
      return proposal.negotiations.filter(it => it.status === 0 && it.remainingTime > 0);
    }
  },
};
</script>
<style lang="scss" scoped>
.winning-rate {

  font-size: 25px;
  font-weight: bold;

  line-height: 1.53;
  letter-spacing: normal;
  text-align: center;
  color: #050505;
}
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
  .border-right {
    border-right: 1px solid #050505;
  }
}
</style>
