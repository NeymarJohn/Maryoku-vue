<template>
  <modal class="proposal-graph-modal">
    <loader :active="loading" />
    <template slot="header">
      <div class="graph-close-button">
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
          <md-icon>clear</md-icon>
        </md-button>
      </div>
      <div class="two-columns">
        <div>
          <div class="title-header-modal">
            Overview Hot Activity
          </div>
          <div class="info_proposal">
            <span v-if="proposal.nonMaryoku && proposal.eventData && proposal.eventData.customer">
              {{ proposal.eventData.customer.companyName }}
            </span>
            <span v-else-if="proposal.proposalRequest && proposal.proposalRequest.eventData.title">
              {{ proposal.proposalRequest.eventData.title }}
            </span>
            <span v-else>
              New Event
            </span>
            <span class="info-proposal-divider"><span class="info-proposal-divider-item" /></span>
            <span>{{ proposal.dateCreated | date("DD/MM/YYYY") }}</span>
            <span class="info-proposal-divider"><span class="info-proposal-divider-item" /></span>
            <span>{{ proposal.cost | withComma }}</span>
          </div>
        </div>
        <div class="right_text">
          <div class="proposal-pointer-wrapper">
            <img src="/static/icons/vendor/proposalBoard/proposal-pointer.svg" class="proposal-pointer">
          </div>
          <ProposalPieChart
            :completed="86.2"
            class="proposal-pie-chart"
          />
          <div>
            <div>Closing Ratio</div>
            <div class="right_text_percents">
              86.2%
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="graph-block">
        <div />
        <ProposalChart :chart-data="engageChartData" class="" />
      </div>
      <div class="send-message-block">
        <img :src="`${$iconURL}common/hint.svg`" class="mr-10 send-message-img">
        <span>Increased interest of the planner in your proposal, a higher trend in the last week </span>
        <md-button class="md-button md-vendor md-maryoku  md-theme-default graph-button">
          Send Message
        </md-button>
      </div>
    </template>
  </modal>
</template>

<script>
import ProposalChart    from "@/pages/app/Vendors/Proposal/Chart/index.vue";
import ProposalPieChart from "@/components/Chart/ProposalPieChart.vue";
import { getReq }       from "@/utils/token";

// helpers
import arraySort    from "@/helpers/array/sort";
import arrayMap     from "@/helpers/array/map";
import arraySize    from "@/helpers/array/size";
import arrayMaximum from "@/helpers/array/maximum";
import pipe         from "@/helpers/function/pipe";
import maximum      from "@/helpers/number/maximum";

// import mock      from "./mock.data.js";

const maxLengthFromProperties = pipe(
  Object.values,
  arrayMap(arraySize),
  arrayMaximum.of,
  maximum(0),
);

export default {
  name: "ProposalGraphModal",
  components: {
    Modal  : () => import("@/components/Modal.vue"),
    Loader : () => import("@/components/loader/Loader.vue"),
    ProposalChart,
    ProposalPieChart
  },
  props: {
    proposal: {
      type    : Object,
      default : () => ({})
    },
    required: {
      type    : Boolean,
      default : true
    },
  },
  data: () => ({
    loading         : true,
    engageChartData : [],
  }),
  created () {
    this.updateEngagementData();
  },
  methods: {
    async updateEngagementData () {
      try {
        this.loading = true;
        const { data = {} } = await this.getEngagement();

        const rawData =
          data.data;
          // mock;

        const fomatedData = Array.from({ length: maxLengthFromProperties(rawData) }, (_, index) => ({
          date     : rawData.dates    [index],
          proposal : rawData.proposal [index] || 0,
          vendor   : rawData.vendor   [index] || 0,
          system   : rawData.system   [index] || 0,
        }));

        const sortFormatedData           = arraySort((x1, x2) => new Date(x1.date) - new Date(x2.date));
        const sortedFormatedData         = sortFormatedData(fomatedData);
        this.engageChartData             = sortedFormatedData;
      } finally {
        this.loading = false;
      }
    },
    getEngagementById (proposalId) {
      return getReq(`/1/proposals/${proposalId}/engagement/summary`);
    },
    getEngagement () {
      return this.getEngagementById(this.proposal.id);
    },
    close() {
      return this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>

.proposal-pointer {
  &-wrapper {
    position : relative;
    width    : 40px;
    height   : 40px;
    left     : 97px;
    top      : 50px;
  }
  width            : 30px;
  height           : 30px;
  position         : absolute;
  transform-origin : 15% 85%;
  transform        : rotate(23deg);
}
</style>
