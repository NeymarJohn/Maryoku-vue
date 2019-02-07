<template>
  <div style="overflow: hidden; height: 100%; margin: 0; padding: 0;">

    <md-card style="background-color: #41535E; color: rgb(225, 234,239); height: 100%; margin: 0; padding: 0;">
      <md-card-content style="text-align: center; height: 100%;">
        <h5 style="font-size: 1.05em; font-weight: 600; padding: 0; margin: 0;">Total remaining budget</h5>
        <h4 style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
          <animated-number ref="totalRemainingBudgetNumber" :value="totalRemainingBudget" prefix="$"></animated-number>
        </h4>
        <div style="padding: 16px;"></div>
        <chart-component
                class=""
                :chart-data="pieChart.data"
                :chart-options="pieChart.options"
                chart-type="Pie"/>
        <div style="padding: 16px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Remaining budget per employee</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
              <animated-number ref="remainingBudgetPerEmployeeNumber" :value="remainingBudgetPerEmployee" prefix="$"></animated-number>
            </h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>

        <div style="padding: 8px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Annual budget per employee</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
              <animated-number ref="annualBudgetPerEmployeeNumber" :value="annualBudgetPerEmployee" prefix="$"></animated-number>
            </h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>

        <div style="padding: 8px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Total annual budget</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
              <animated-number ref="totalAnnualBudgetNumber" :value="totalAnnualBudget" prefix="$"></animated-number>
            </h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>

        <div style="padding: 8px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Total events</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
              <animated-number ref="totalEventsNumber" :value="totalEvents"></animated-number>
            </h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  import auth from '@/auth';
  import VueElementLoading from 'vue-element-loading';
  import ChartComponent from '@/components/Cards/ChartComponent';

  import {
    AnimatedNumber
  } from "@/components";

  export default {
    name: 'budget-panel',
    components: {
      VueElementLoading,
      ChartComponent,
      AnimatedNumber,
    },
    props: {
      month : {
        type: Number
      },
      year: {
        type: Number
      }
    },
    data() {

      return {
        ready: false,
        auth: auth,
        isLoading: true,
        statisticData: {}
      }
    },
    created() {

    },
    mounted(){
      this.ready = true;
      this.isLoading = false;
      this.calendarStatistic()
    },
    methods: {
      calendarStatistic() {
        let calendarId = this.auth.user.defaultCalendarId;

        this.$http.get(`${process.env.SERVER_URL}/1/calendars/${calendarId}/statistics/`, { headers: this.auth.getAuthHeader() })
                .then(response => response.data)
                .then((json) => {
                  let statisticMap = {};
                  json.forEach(function(data){
                    statisticMap[data.item] = data.value
                  })

                  this.statisticData = statisticMap;
                });
      },
    },
    computed: {
      calculateRemain() {
        return this.statisticData['annual_budget_allocated'];
      },
      calculateSpent() {
        return this.statisticData['annual_budget'];
      },
      totalAnnualBudget() {
        return this.statisticData['annual_budget'];
      },
      annualBudgetPerEmployee() {
        return this.statisticData['annual_budget_per_employee'];
      },
      totalRemainingBudget() {
        return this.statisticData['annual_budget'] - this.statisticData['annual_budget_allocated'];
      },
      remainingBudgetPerEmployee() {
        return this.statisticData['annual_budget_per_employee'] - this.statisticData['annual_budget_per_employee_allocated'];
      },
      totalEvents() {
        return this.statisticData['number_of_events'];
      },
      pieChart() {
        return {
          data: {
            labels: [" ", " "], // should be empty to remove text from chart
            series: [this.calculateRemain, this.calculateSpent]
          },
          options: {
            padding: 0,
            height: 180,
            donut: true,
            donutWidth: 30
          }
        }
      },
    },
    watch: {

    }
  };
</script>
<style lang="scss">

</style>
