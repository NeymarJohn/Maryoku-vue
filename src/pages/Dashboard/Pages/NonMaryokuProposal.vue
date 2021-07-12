<template>
  <div class="non-maryoku-proposal">
    <planner-header></planner-header>
    <h3 class="proposal-header">
      <img :src="`${$iconURL}Budget+Elements/${proposal.vendor.eventCategory.icon}`" />
      <b>{{ proposal.vendor.eventCategory.fullTitle }}</b>
      PROPOSAL
    </h3>
    <div class="proposal-content mt-40">
      <event-proposal-details :vendorProposal="proposal" :landingPage="true" v-if="proposal"></event-proposal-details>
    </div>
    <div class="text-center logo-area">Provided By <img :src="`${$iconURL}RSVP/maryoku - logo dark@2x.png`" /></div>
    <div class="proposal-footer d-flex justify-content-between align-center">
      <md-button class="md-simple md-black maryoku-btn">Decline Proposal</md-button>
      <div>
        <md-button class="md-simple md-black maryoku-btn">Remind Me Later</md-button>
        <md-button class="md-simple md-red md-outlined maryoku-btn">Change Requirements</md-button>
        <md-button class="md-red maryoku-btn">Book Now</md-button>
      </div>
    </div>
  </div>
</template>
<script>
import Proposal from "@/models/Proposal";
import EventProposalDetails from "../../app/Events/Proposal/EventProposalDetails.vue";
import PlannerHeader from "@/pages/Dashboard/Layout/PlannerHeader";
export default {
  components: {
    EventProposalDetails,
    PlannerHeader,
  },
  data() {
    return {
      proposal: null,
    };
  },
  created() {
    const proposalId = this.$route.params.proposalId;
    Proposal.find(proposalId).then((proposal) => {
      if (!proposal.inspirationalPhotos) proposal.inspirationalPhotos = [];
      if (!proposal.bundleDiscount.services) proposal.bundleDiscount.services = [];
      this.proposal = proposal;
    });
  },
};
</script>
<style lang="scss" scoped>
.non-maryoku-proposal {
  background-color: white;
  .proposal-header {
    padding: 0 80px;
    img {
      width: 30px;
    }
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