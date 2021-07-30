<template>
  <div class="white-card vendor-dashboard-requests" :class="field === 'negotiation' && requests.length ? 'negotiation' : ''">
    <div style="border-bottom: 2px solid #c8c8c8">
      <div class="pt-10 d-flex align-center justify-content-center font-bold">
        <md-button class="md-button md-theme-default md-simple md-just-icon md-black" @click="prev"
          ><md-icon class="font-size-30">chevron_left</md-icon></md-button
        >
        <span class="font-size-30 mr-10 font-bold" v-if="requests.length">
          {{ currentIndex + 1 }}/{{ requests.length }}
        </span>
        <span class="font-size-30 mr-10 font-bold" v-else>0 / 0</span>
        REQUEST FOR PROPOSAL
        <md-button class="md-button md-theme-default md-simple md-just-icon md-black" @click="next">
          <md-icon class="font-size-30">chevron_right</md-icon>
        </md-button>
      </div>
    </div>

    <template v-if="!requests.length">
        <div v-if="field == 'new'" class="d-flex flex-column align-center p-60"
             :style="{minHeight: this.proposalNegotiationRequest.length > 1 ? '298px' : '260px'} ">
            <img class="mb-20" :src="`${$iconURL}vendordashboard/group-17116.png`" />
            <div class="color-vendor font-bold font-size-14">NO REQUEST FOR PROPOSAL</div>
        </div>
        <div v-if="field == 'negotiation'" class="d-flex flex-column align-center p-60"
             :style="{minHeight: this.proposalRequest.length > 1 ? '298px' : '260px'}" >
            <img class="mb-15" :src="`${$iconURL}vendordashboard/group-16558.svg`"/>
            <div class="color-vendor font-bold font-size-14">NO REQUEST FOR CHANGES</div>
        </div>
    </template>

    <div class="d-flex flex-column align-center" v-else>
      <carousel :items="1" :margin="0" :nav="false" :loop="true" class="header-carousel" @changed="changeSlide">
        <template slot="prev">
          <span class="prev handle-btn d-none" ref="prevButton">
            <md-icon>keyboard_arrow_left</md-icon>
          </span>
        </template>
        <div v-for="(p, index) in requests" :key="p.id" class="carousel-item">
          <proposal-request-card
            type="dashboard"
            :proposalRequest="p"
            :size="2"
            :hasNegotiation="field !== 'new'"
            :field="field"
            class="pl-30 pr-30 vendor-dashboard"
            @handle="approveBudget(index)"
          ></proposal-request-card>
        </div>
        <template slot="next">
          <span class="next handle-btn d-none" ref="nextButton">
            <md-icon>keyboard_arrow_right</md-icon>
          </span>
        </template>
      </carousel>
    </div>
    <modal v-if="selectedProposal" container-class="modal-container-wizard lg">
          <template slot="body">
              <proposal-content :vendorProposal="selectedProposal" @close="selectedProposal = null" />
          </template>
    </modal>
    <modal v-if="showRequestNegotiationModal" container-class="modal-container negotiation bg-white">
      <template slot="header" class="bg-pale-grey">
          <div class="border-right font-bold-extra text-center pr-10 mr-10">
              <template v-if="selectedProposalRequest.eventData.concept">{{selectedProposalRequest.eventData.concept.name}}</template>
              <template v-else-if="selectedProposalRequest.eventData.title">{{selectedProposalRequest.eventData.title}}</template>
              <template v-else >New Event</template>
          </div>

          <div class="border-right font-bold-extra text-center pr-10 mr-10">{{ $dateUtil.formatScheduleDay(selectedProposalRequest.eventData.eventStartMillis, "MM/DD/YY") }}</div>
          <div class="text-center font-bold-extra">
              $ {{ (selectedProposalRequest.proposal ? selectedProposalRequest.proposal.cost :
              selectedProposalRequest.componentInstance.allocatedBudget) | withComma }}
          </div>
          <a class="font-bold-extra font-size-18 ml-auto" @click="showRequestNegotiationModal=false"><md-icon>close</md-icon></a>
      </template>
      <template slot="body">
          <negotiation-request
              :expiredTime="selectedProposalRequest.expiredTime"
              :processed="negotiationProcessed"
              @close="showRequestNegotiationModal = false" />
      </template>
      <template slot="footer">
          <md-button v-if="negotiationProcessed === 0" class="md-simple md-vendor-text color-black-middle p-0"
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
<style lang="scss" scoped>
.vendor-dashboard-requests {
  .header-carousel {
    width: 100%;
  }
  /deep/ .owl-stage-outer {
    border-bottom: solid 1px #ffa9a9;
  }
  .proposal-request-card {
    min-height: 260px !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &.negotiation{
    background-color: #ffefff !important;
  }
}
</style>
<script>
import carousel from "vue-owl-carousel";
import ProposalRequestCard from "../../components/ProposalRequestCard.vue";
import ProposalNegotiationRequest from "@/models/ProposalNegotiationRequest";
import Proposal from "@/models/Proposal";
import { Modal } from "@/components";
const NegotiationRequest = () => import("../../components/NegotiationRequest");
const ProposalContent = () => import("../../components/ProposalDetail");

// result of processed on negotiation request
const NONE = 0;
const APPROVED = 1;
const DECLINED = 2;

export default {
  components: {
    carousel,
    ProposalRequestCard,
    NegotiationRequest,
    ProposalContent,
    Modal
  },
  props:{
    field: {
      type: String,
      default: 'new',
    }
  },
  data() {
    return {
        currentIndex: 0,
        selectedProposalRequest: null,
        negotiationProcessed: NONE,
        showRequestNegotiationModal: false,
        selectedProposal: null,
        negotiationRequestStatus:{
            review: 0,
            approve: 1,
            decline: 2,
            done: 3
        },
    };
  },
  computed: {
    requests() {
      return this.field === 'new' ? this.proposalRequest : this.proposalNegotiationRequest;
    },
    proposalRequest(){
      if (!this.$store.state.vendorDashboard.proposalRequests) return [];

      return this.$store.state.vendorDashboard.proposalRequests.filter(p => {
        return p.proposal ? p.remainingTime > 0 && p.declineMessage !== "decline" && p.proposal.status !== "submit"
            : p.remainingTime > 0 && p.declineMessage !== "decline";
      });
    },
    proposalNegotiationRequest(){
      if (!this.$store.state.vendorDashboard.proposalRequests) return [];
      return this.$store.state.vendorDashboard.proposalRequests.filter(p => {
            return p.proposal && p.proposal.status === 'submit' && p.proposal.negotiations &&
                p.proposal.negotiations.filter(it => it.status === 0).length
        });
    },
    vendorData() {
      return this.$store.state.vendor.profile;
    },
  },
  methods: {
    prev() {
      this.$refs.prevButton.click();
    },
    next() {
      this.$refs.nextButton.click();
    },
    changeSlide(event) {
      this.currentIndex = event.page.index;
    },
    openNewTab(link) {
      window.open(link, "_blank");
    },
    approveBudget(index) {
      console.log('approveBudget');
      if (this.field !== 'new') {
          this.showRequestNegotiationModal = true;
          this.selectedProposalRequest = this.requests[index];
      } else {
          let params = this.requests[index].proposal ? {id: this.requests[index].id, type: 'edit'} : {rfpId: this.requests[index].id}
          let routeData = this.$router.resolve({
              name: this.requests[index].proposal ? 'proposalEdit' : 'VendorProposal',
              params: {...params, vendorId: this.vendorData.id},
          });
          window.open(routeData.href, '_blank');
      }
    },
    async handleNegotiation(status){
      if(status === this.negotiationRequestStatus.review) {
          this.selectedProposal = {...this.selectedProposalRequest.proposal, proposalRequest: this.selectedProposalRequest};
          this.showRequestNegotiationModal = false;
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
                  this.selectedProposalRequest.proposal.negotiations[0] = res;
                  if(status === this.negotiationRequestStatus.decline) this.selectedProposalRequest.expiredTime = expiredTime;

                  this.$store.commit("vendorDashboard/setProposalRequest", this.selectedProposalRequest);
                  if(status === this.negotiationRequestStatus.decline){
                      this.negotiationProcessed = DECLINED
                  } else {
                      this.negotiationProcessed = APPROVED;
                  }
              })
      } else if(status === this.negotiationRequestStatus.done) {
          this.showRequestNegotiationModal = false;
          this.negotiationProcessed = NONE;
          this.currentIndex = 0;
      }
    },
  },
  updated() {
    // remove empty item in proposal-request carousel
    $(".owl-item").each(function (el) {
        if ($(this).text().length === 0) $(this).remove();
    });
  },
};
</script>
