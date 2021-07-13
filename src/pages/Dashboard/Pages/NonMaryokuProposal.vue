<template>
  <div class="non-maryoku-proposal">
    <planner-header></planner-header>
    <div class="proposal-content mt-40">
      <event-proposal-details :vendorProposal="proposal" :landingPage="true" v-if="proposal"></event-proposal-details>
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
  .proposal-content {
    max-width: 1280px;
    margin: auto;
  }
}
</style>