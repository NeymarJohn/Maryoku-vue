<template>
  <modal class="proposal-graph-modal">
    <template slot="header">
      <div class="graph-close-button">
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
          <md-icon>clear</md-icon>
        </md-button>
      </div>
      <div class="two-columns">
        <div>
          <div class="title-header-modal">Overview Hot Activity</div>
          <div class="info_proposal">
            <span>{{ proposal.eventData.customer.companyName }}</span>
            <span class="info-proposal-divider"><span class="info-proposal-divider-item"></span></span>
            <span>{{ proposal.dateCreated | date("DD/MM/YYYY") }}</span>
            <span class="info-proposal-divider"><span class="info-proposal-divider-item"></span></span>
            <span>{{ proposal.cost | withComma }}</span>
          </div>
        </div>
        <div class="right_text">
          <img src="/static/icons/vendor/proposalBoard/proposal-pointer.svg" class="proposal-pointer">
            <proposal-pie-chart
              :chartData="chartData"
              :columns="1"
              :options="{
              width: 130,
              height: 135,
              strokWidth: 25,
              direction: 'row'
              }"
              class="proposal-pie-chart"
            ></proposal-pie-chart>
          <div>
            <div>Closing Ratio</div>
            <div class="right_text_percents">86.2%</div>
          </div>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="graph-block">
        <proposal-chart :chartData="incomeChartData" class=""></proposal-chart>
      </div>
      <div class="send-message-block">
        <img :src="`${$iconURL}common/hint.svg`" class="mr-10 send-message-img" />
        <span>Increased interest of the planner in your proposal, a higher trend in the last week </span>
        <md-button class="md-button md-vendor md-maryoku  md-theme-default graph-button">Send Message</md-button>
      </div>
    </template>
  </modal>
</template>

<script>
import { Modal } from "@/components";
import ProposalChart from "@/pages/app/Vendors/Proposal/ProposalChart";
import ProposalPieChart from "@/components/Chart/ProposalPieChart";

export default {
  name: "ProposalGraphModal",
  components: {
    Modal,
    ProposalChart,
    ProposalPieChart,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  props: {
    proposal: Object,
    required: true,
  },
  data() {
    return {
      incomeChartData: [
        { label: "28 Jan", value: 60, future: true },
        { label: "29 Jan", value: 30, future: true },
        { label: "30 Jan", value: 40, future: true },
        { label: "31 Jan", value: 0, future: true },
        { label: "1 Feb", value: 0, future: true },
        { label: "2 Feb", value: 0, future: true },
        { label: "3 Feb", value: 10, future: true },
        { label: "4 Feb", value: 20, future: true },
        { label: "5 Feb", value: 100, future: true },
        { label: "6 Feb", value: 60, future: true },
        { label: "7 Feb", value: 90, future: true },
        { label: "8 Feb", value: 0, future: true },
      ],
      chartData: [
        { title: "Application", value: 6, color: "#2cde6b" },
        { title: "Winning", value: 1, color: "#9a9898" },
      ],
    };
  },

};
</script>

<style scoped>

</style>
