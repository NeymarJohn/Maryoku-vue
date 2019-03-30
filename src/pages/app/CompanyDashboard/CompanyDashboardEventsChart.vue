<template>
  <chart-card
    header-animation="false"
    :chart-data="colouredLineChart.data"
    :chart-options="colouredLineChart.options"
    chart-type="Line"
    header-icon
    chart-inside-content
    background-color="green">
    <template slot="chartInsideHeader">
      <div class="card-icon">
        <md-icon>timeline</md-icon>
      </div>
      <h3 class="title" >
        16 <small style="font-size: 0.95rem; color: #7c7c7c;">Events on 2019</small>
      </h3>
    </template>
    <template slot="footer">
      <md-switch class="md-switch-info" v-model="displayByYearOrMonth" v-tooltip="'Click to view Events Distribution by Year or Month'">
        Events by {{displayByYearOrMonth ? 'Month' : 'Year'}}
      </md-switch>
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
    name: "company-dashboard-events-chart",
    components: {
      ChartCard
    },
    data() {
      return {
        auth: auth,
        displayByYearOrMonth: false,
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

  .tooltip {
    display: block !important;
    z-index: 10000;

    .tooltip-inner {
      background: #fff;
      color: black;
      border-radius: 16px;
      padding: 5px 10px 4px;
      border: 1px solid #64b5f6;
    }

    .tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      margin: 5px;
      //border-color: black;
      z-index: 1;
      border-color: #64b5f6;
    }

  }
</style>
