<template>
  <div class="white-card vendor-dashboard-requests">
    <div style="border-bottom: 2px solid #c8c8c8">
      <div class="pt-10 d-flex align-center justify-content-center font-bold">
        <md-button class="md-button md-theme-default md-simple md-just-icon md-black" @click="prev"
          ><md-icon class="font-size-30">chevron_left</md-icon></md-button
        >
        <span class="font-size-30 mr-10 font-bold" v-if="proposalRequests">
          {{ currentIndex + 1 }}/{{ proposalRequests.length }}
        </span>
        <span class="font-size-30 mr-10 font-bold" v-else>0 / 0</span>
        REQUEST FOR PROPOSAL
        <md-button class="md-button md-theme-default md-simple md-just-icon md-black" @click="next">
          <md-icon class="font-size-30">chevron_right</md-icon>
        </md-button>
      </div>
    </div>

    <div class="d-flex flcoluex-mn align-center p-70" v-if="!proposalRequests">
      <img class="mb-20" :src="`${$iconURL}vendordashboard/group-17116.png`" />
      <div class="color-vendor font-bold font-size-14">NO REQUEST FOR PROPOSAL</div>
    </div>
    <div class="d-flex flex-column align-center" v-else>
      <carousel :items="1" :margin="0" :nav="false" :loop="true" class="header-carousel" @changed="changeSlide">
        <template slot="prev">
          <span class="prev handle-btn d-none" ref="prevButton">
            <md-icon>keyboard_arrow_left</md-icon>
          </span>
        </template>
        <div v-for="(p, index) in proposalRequests" :key="p.id" class="carousel-item">
          <!-- <div class="d-flex justify-content-between">
            <span>{{ p.eventData.concept ? p.eventData.concept.name : "Test" }}</span>
            <span class="">6 Days Left</span>
          </div>
          <div>
            <span>23/12/21 | $ 2200</span>
          </div>
          <div class="d-flex">
            <div>60% completed</div>
            <md-button class="md-outlined md-vendor md-simple">Finish</md-button>
          </div> -->
          <proposal-request-card
            :proposalRequest="p"
            :size="2"
            type="dashboard"
            class="pl-30 pr-30"
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
    border-bottom: solid 1px #707070;
  }
}
</style>
<script>
import carousel from "vue-owl-carousel";
import ProposalRequestCard from "../../components/ProposalRequestCard.vue";

export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  components: {
    carousel,
    ProposalRequestCard,
  },
  computed: {
    proposalRequests() {
      return this.$store.state.vendorDashboard.proposalRequests;
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