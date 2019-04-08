<template>
  <chart-card
    header-animation="false"
    :chart-data="colouredLineChart.data"
    :chart-options="colouredLineChart.options"
    chart-type="Line"
    header-icon
    chart-inside-content
    no-footer
    background-color="rose">
    <template slot="chartInsideHeader">
      <div class="card-icon">
        <md-icon>timeline</md-icon>
      </div>
      <h5 class="title" style="padding-top: 6px;">
        Average Event Cost per Employee
      </h5>
    </template>
  </chart-card>
</template>
<script>
  import auth from "@/auth";
  import Chartist from "chartist";
  import {
    ChartCard
  } from "@/components";

  export default {
    name: "company-dashboard-costs-chart",
    components: {
      ChartCard
    },
    data() {
      return {
        auth: auth,
        colouredLineChart: {
          data: {
            labels: [
              "'15",
              "'16",
              "'17",
              "'18",
              "'19"
            ],
            series: [[3, 11, 14, 12, 16]]
          },
          options: {
            lineSmooth: this.$Chartist.Interpolation.cardinal({
              tension: 1
            }),
            axisY: {
              showGrid: true,
              offset: 40
            },
            axisX: {
              showGrid: false
            },
            low: 0,
            /*high: 50,*/
            showPoint: true,
            height: "100%",
            plugins: [
              //this.$Chartist.plugins.tooltip()
            ]
          }
        },
      };
    }
  };
</script>
<style lang="scss" scoped>

</style>
