<template>
  <chart-card
    header-animation="false"
    :chart-data="colouredLineChart.data"
    :chart-options="colouredLineChart.options"
    chart-type="Line"
    header-icon
    :no-footer="!displayByYearOrMonth"
    chart-inside-content
    background-color="green">
    <template slot="chartInsideHeader">
      <div class="card-icon">
        <md-icon>timeline</md-icon>
      </div>
      <h3 class="title" >
        {{currentYearEventsCount}} <small style="font-size: 0.95rem; color: #7c7c7c;">Events on {{currentYear}}</small>
        <md-switch class="md-switch-info pull-right text-right" style="padding: 0; margin: 12px;" v-model="displayByYearOrMonth" v-tooltip.bottom="'Click to view Events Distribution by Year or Month'">
          Events by {{displayByYearOrMonth ? 'Month' : 'Year'}}
        </md-switch>
      </h3>
    </template>
    <template slot="footer" style="justify-content: center !important;" >
      <div class="md-layout">
        <div class="md-layout-item md-size-50">
          <md-field class="">
            <label for="year">Start from year</label>
            <md-select v-model="filterYear" name="filterYear" id="filterYear">
              <md-option value="2019">2019</md-option>
              <md-option value="2018">2018</md-option>
              <md-option value="2017">2017</md-option>
              <md-option value="2016">2016</md-option>
              <md-option value="2015">2015</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label for="month">Start from month</label>
            <md-select v-model="filterMonth" name="filterMonth" id="filterMonth">
              <md-option value="January">January</md-option>
              <md-option value="February">February</md-option>
              <md-option value="March">March</md-option>
              <md-option value="April">April</md-option>
              <md-option value="May">May</md-option>
              <md-option value="June">June</md-option>
              <md-option value="July">July</md-option>
              <md-option value="August">August</md-option>
              <md-option value="September">September</md-option>
              <md-option value="October">October</md-option>
              <md-option value="November">November</md-option>
              <md-option value="December">December</md-option>
            </md-select>
          </md-field>
        </div>
      </div>
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
    props: {
      currentYear: {
        type: String,
        default: 0
      },
      currentYearEventsCount : {
        type: Number,
        default: 0
      },
      numberOfEventsPerYear: {
        type: Object,
        default: {}
      }
    },
    watch: {
      numberOfEventsPerYear(newVal, oldVal){
        label = []
        this.colouredLineChart.data = {
          labels: labels,
          series : [series]
        }
      }
    },
    data() {
      return {
        auth: auth,
        displayByYearOrMonth: false,
        filterYear: 2017,
        filterMonth: "March",
        colouredLineChart: {
          data: {
            labels: [
              "'15",
              "'16",
              "'17",
              "'18",
              "'19"
            ],
            series: [[0,0,0,0,0]]
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
