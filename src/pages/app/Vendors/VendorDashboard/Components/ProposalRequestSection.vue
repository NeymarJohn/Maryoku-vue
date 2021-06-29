<template>
  <div class="white-card vendor-dashboard-requests">
    <div style="border-bottom: 2px solid #c8c8c8">
      <div class="pt-10 d-flex align-center justify-content-center font-bold">
        <md-button class="md-button md-theme-default md-simple md-just-icon md-black" @click="prev"
          ><md-icon class="font-size-30">chevron_left</md-icon></md-button
        >
        <span class="font-size-30 mr-10 font-bold" v-if="proposalRequests.length">
          {{ currentIndex + 1 }}/{{ proposalRequests.length }}
        </span>
        <span class="font-size-30 mr-10 font-bold" v-else>0 / 0</span>
        REQUEST FOR PROPOSAL
        <md-button class="md-button md-theme-default md-simple md-just-icon md-black" @click="next">
          <md-icon class="font-size-30">chevron_right</md-icon>
        </md-button>
      </div>
    </div>

    <template v-if="!proposalRequests.length">
        <div v-if="field == 'new'" class="d-flex flex-column align-center p-60">
            <img class="mb-20" :src="`${$iconURL}vendordashboard/group-17116.png`" />
            <div class="color-vendor font-bold font-size-14">NO REQUEST FOR PROPOSAL</div>
        </div>
        <div v-if="field == 'negotiation'" class="d-flex flex-column align-center p-60">
            <img class="mb-15" :src="`${$iconURL}vendordashboard/group-16558.svg`" />
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
        <div v-for="(p, index) in proposalRequests" :key="p.id" class="carousel-item">
          <proposal-request-card
            :proposalRequest="p"
            :size="2"
            type="dashboard"
            class="pl-30 pr-30 vendor-dashboard"
          ></proposal-request-card>
        </div>
        <template slot="next">
          <span class="next handle-btn d-none" ref="nextButton">
            <md-icon>keyboard_arrow_right</md-icon>
          </span>
        </template>
      </carousel>
    </div>
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
}
</style>
<script>
import carousel from "vue-owl-carousel";
import ProposalRequestCard from "../../components/ProposalRequestCard.vue";

export default {
  components: {
    carousel,
    ProposalRequestCard,
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
    };
  },
  computed: {
    proposalRequests() {
      let proposalRequests = [];
      if (!this.$store.state.vendorDashboard.proposalRequests) return proposalRequests;
      if (this.field === 'new') {
        proposalRequests = this.$store.state.vendorDashboard.proposalRequests.filter(p => {
          return p.proposal ? p.declineMessage !== "decline" && p.proposal.status !== "submit"
              : p.remainingTime > 0 && p.declineMessage !== "decline";
        });
      } else if (this.field === 'negotiation') {
        proposalRequests = this.$store.state.vendorDashboard.proposalRequests.filter(p => {
          return p.proposal && p.proposal.negotiations && p.proposal.negotiations.length
        });
      }
      return proposalRequests;
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
  },
};
</script>
