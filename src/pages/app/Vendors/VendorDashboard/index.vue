<template>
  <div class="vendor-dashboard p-60">
    <div class="d-flex justify-content-between align-center">
      <div class="font-size-22 font-bold color-purple">
        <img src="/static/icons/vendor/dashboard-active.svg" class="mr-10" /> WELCOME BACK SAM!
      </div>
      <div><md-button class="md-vendor maryoku-btn">Create New Proposal</md-button></div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-size-45 chart-section">
        <div>
          <label>Yearly Revenue By Segment</label>
          <div class="d-flex align-center">
            <div>
              <div class="font-size-50 total-revenue">$110,004</div>
              <div class="mt-20">
                <md-button class="md-simple md-outlined md-white maryoku-btn">To Full Payment</md-button>
              </div>
            </div>
            <div>
              <pie-chart
                :chartData="chartData"
                :columns="1"
                :options="{
                  width: 150,
                  height: 200,
                  strokWidth: 30,
                  direction: 'row',
                }"
              ></pie-chart>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <label>Income From Past And Future Events</label>
          <div>
            <income-bar-chart :chartData="incomeChartData"></income-bar-chart>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-55 schedule-section"></div>
    </div>
  </div>
</template>
<script>
import PieChart from "@/components/Chart/PieChart.vue";
import IncomeBarChart from "./IncomeBarChart.vue";
export default {
  data() {
    return {
      chartData: [
        { title: "50% $50,000", value: 12, color: "white" },
        { title: "30% $45,000", value: 3, color: "#2cde6b" },
        { title: "20% $15,000", value: 3, color: "#21cfe0" },
      ],
      incomeChartData: [
        { label: "Jan", value: 1200, future: false },
        { label: "Feb", value: 1200, future: false },
        { label: "Mar", value: 1200, future: false },
        { label: "Apr", value: 1200, future: false },
        { label: "May", value: 1200, future: true },
        { label: "Jun", value: 1200, future: true },
        { label: "Jul", value: 1200, future: true },
        { label: "Aug", value: 1200, future: true },
        { label: "Sep", value: 1200, future: true },
        { label: "Oct", value: 1200, future: true },
        { label: "Nov", value: 1200, future: true },
        { label: "Dec", value: 1200, future: true },
      ],
    };
  },
  components: {
    PieChart,
    IncomeBarChart,
  },
};
</script>
<style lang="scss" scoped>
.vendor-dashboard {
  .chart-section {
    background-color: #641856;
    color: white;
    .total-revenue {
      line-height: 1em;
    }
  }
  .schedule-section {
  }
}
</style>