<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
 <div style="padding: 16px;"></div>

        <div style="position:relative;">
          <h5 style="font-size: 1.05em; font-weight: 600; padding: 0; margin: 0;">Total remaining budget</h5>
          <h4 class="title" style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
            <animated-number ref="totalRemainingBudgetNumber" value="1232" prefix="$"></animated-number>
          </h4>

          <div style="display: grid;margin-top: 18px;">
            <chart-component
              :chart-data="pieChart.data"
              :chart-options="pieChart.options"
              chart-type="Pie"
            style="grid-column: 1; grid-row: 1;"/>
            <animated-number class="percentage" ref="percentageNumber" value="234" suffix="%"></animated-number>
          </div>
        </div>


  </div>
</template>

<script>
  import ChartComponent from '@/components/Cards/ChartComponent';
  import auth from '@/auth';

  import {
    AnimatedNumber
  } from "@/components";

  import moment from 'moment';
  import VueElementLoading from 'vue-element-loading';


  export default {
    components: {
      VueElementLoading,
      ChartComponent,
      AnimatedNumber,
    },

    data() {
      return {
        auth: auth,
        product3: "static/img/shutterstock_289440710.png",
        recentEvents: [],
        upcomingEvents: [],
        isLoading: true,
      };
    },
    computed: {
      pieChart() {
        return {
          data: {
            labels: [" ", " "], // should be empty to remove text from chart
            series: this.seriesData
          },
          options: {
            padding: 0,
            height: 120,
            donut: true,
            donutWidth: 12
          }
        }
      },
    },
  }


</script>

<style lang="scss">
 .percentage {
  padding-bottom: 8px;
  padding-left: 5px;
  grid-column: 1;
  grid-row: 1;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5rem;
  font-weight: 700;
  color: #7DC0D9;
}
</style>
