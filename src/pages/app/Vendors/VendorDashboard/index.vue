<template>
  <div class="vendor-dashboard p-30">
    <div class="d-flex justify-content-between align-center">
      <div class="font-size-22 font-bold color-purple">
        <img src="/static/icons/vendor/dashboard-active.svg" class="mr-10" /> WELCOME ON BOARD SAM!
      </div>
      <div><md-button class="md-vendor maryoku-btn">Create New Proposal</md-button></div>
    </div>
    <div class="md-layout pt-30">
      <div class="md-layout-item md-size-45 chart-section pt-30 pl-40 pr-40">
        <div>
          <label>Yearly Revenue By Segment</label>
          <div class="md-layout my-20">
            <div class="md-layout-item md-size-40 pl-0">
              <div class="font-size-50 total-revenue">$0</div>
            </div>
            <div class="md-layout-item md-size-60">
                <div>
                    <pie-chart
                        :chartData="chartData"
                        :columns="1"
                        :options="{
                  width: 120,
                  height: 160,
                  strokWidth: 30,
                  direction: 'row',
                }"
                    ></pie-chart>
                </div>
                <div class="d-flex">
                    <md-button class="md-simple ml-auto md-outlined md-white maryoku-btn">Add A New Service</md-button>
                </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="pt-30">
          <label>Income From Past And Future Events</label>
          <p class="d-flex align-center text-gray font-size-14">
              <span class="d-inline-block mr-10" style="width: 14px;height: 14px;border-radius: 50%;background: white"></span>
              No event incomes</p>
          <div>
<!--            <income-bar-chart :chartData="incomeChartData"></income-bar-chart>-->
              <income-chart :chartData="data" :options="options" :width="300" :height="400"></income-chart>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-55 schedule-section">
          <div class="md-layout">
              <div class="md-layout-item md-size-50 pl-0 pr-10">
                  <div class="white-card">
                      <div class="p-15" style="border-bottom: 2px solid #c8c8c8">
                          <div class="pt-10 d-flex align-center justify-content-center font-bold"> <span class="font-size-20 mr-10">0/0</span> REQUEST FOR PROPOSAL</div>
                      </div>

                      <div class="d-flex flex-column align-center p-70">
                          <img class="mb-20" src="https://s3.amazonaws.com/static.maryoku.com/storage/icons/Event Page/Group 8708.svg">
                          <div class="color-vendor font-bold font-size-14">NO REQUEST FOR PROPOSAL</div>
                      </div>
                  </div>
              </div>
              <div class="md-layout-item md-size-50 pr-0 pl-10">
                  <div class="white-card">
                      <div class="p-15" style="border-bottom:  2px solid #c8c8c8">
                          <div class="pt-10 d-flex align-center justify-content-center font-bold"><span class="font-size-20 mr-10"> 0/0 </span>PROPOSALS FOR REQUEST </div>
                      </div>

                      <div class="d-flex flex-column align-center p-70">
                          <img class="mb-20" src="https://s3.amazonaws.com/static.maryoku.com/storage/icons/Event Page/Group 8708.svg">
                          <div class="color-vendor font-bold font-size-14">NO REQUEST FOR CHANGES</div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="md-layout mt-20">
                <div class="white-card md-layout p-30" >
                    <div class="md-layout-item md-size-50">
                        <FunctionalCalendar class="vendor-dashboard-calendar"></FunctionalCalendar>
                        <div class="d-flex align-center">
                            <md-switch class="md-switch-vendor">Backout Days</md-switch>
                            <md-button class="md-simple ml-auto md-outlined md-vendor maryoku-btn" style="border-color: #641856">Sync With Calendar</md-button>
                        </div>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <div class="font-bold text-center p-10">UPCOMING EVENTS:</div>
                        <div class="d-flex flex-column align-center justify-content-center p-50">
                            <img class="mt-50 mb-20" src="https://s3.amazonaws.com/static.maryoku.com/storage/icons/Event Page/Group 8708.svg">
                            <div class="mb-20 color-vendor font-bold font-size-14">NO UPCOMING EVENTS</div>
                            <md-button class="md-simple md-outlined md-vendor maryoku-btn" style="border-color: #641856">Create New Event</md-button>
                        </div>
                    </div>
                </div>

          </div>
      </div>
    </div>
  </div>
</template>
<script>
import PieChart from "@/components/Chart/PieChart.vue";
import IncomeBarChart from "./IncomeBarChart.vue";
import { FunctionalCalendar } from "vue-functional-calendar";
import IncomeChart from "./IncomeChart";
export default {
  data() {
    return {
      chartData: [
        { title: "Venue", value: 6, color: "#a3809d" },
        { title: "Category", value: 6, color: "#a0a0a0" },
      ],
      incomeChartData: [
        { label: "Jan", value: 1200, future: false },
        { label: "Feb", value: 120, future: false },
        { label: "Mar", value: 700, future: false },
        { label: "Apr", value: 900, future: false },
        { label: "May", value: 1200, future: true },
        { label: "Jun", value: 200, future: true },
        { label: "Jul", value: 1200, future: true },
        { label: "Aug", value: 300, future: true },
        { label: "Sep", value: 1200, future: true },
        { label: "Oct", value: 500, future: true },
        { label: "Nov", value: 1000, future: true },
        { label: "Dec", value: 700, future: true },
      ],
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Income',
                    backgroundColor: '#a3809d',
                    data: [100, 200, 700, 39, 600, 400, 1200, 900, ]
                }
            ]
        },
        options: {responsive: true, maintainAspectRatio: false},
    };
  },
  components: {
      IncomeChart,
      FunctionalCalendar,
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
.chartjs-size-monitor {
    canvas {
        height: 400px;
    }
}
</style>
