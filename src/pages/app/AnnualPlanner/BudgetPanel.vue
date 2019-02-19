<template>
  <div style="overflow: hidden; height: 100%; margin: 0; padding: 0;">

    <md-card style="background-color: #41535E; color: rgb(225, 234,239); height: 100%; margin: 0; padding: 0;">
      <md-card-content style="text-align: center; height: 100%;background-color: #003434;">


        <div style="text-align: left;">
          <h5 style="font-size: 0.95rem !important; font-weight: 600; padding: 0; margin: 0;">Annual budget per employee</h5>
          <div class="d-flex justify-beetwen items-center-v">
            <md-field v-show="this.editAnnualBudgetPerEmployee" :class="[{'md-error': errors.has('annualBudgetPerEmployee')}]">
              <md-input v-model="annualBudgetPerEmployee"
                        data-vv-name="annualBudgetPerEmployee"
                        v-validate= "modelValidations.annualBudgetPerEmployee"
              />
              <span class="md-error" v-if="errors.has('annualBudgetPerEmployee')">The field is required</span>
            </md-field>
            <h4 v-show="!this.editAnnualBudgetPerEmployee" style="font-size: 0.95rem !important; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
              <animated-number ref="annualBudgetPerEmployeeNumber" :value="this.annualBudgetPerEmployee" prefix="$"></animated-number>
            </h4>

            <div v-show="!this.editAnnualBudgetPerEmployee">
              <md-button class="md-simple md-just-icon md-round fa fa-edit" @click="openEditAnnualBudgetPerEmployee()">
                <md-icon>edit</md-icon>
              </md-button>
            </div>

            <div v-show="this.editAnnualBudgetPerEmployee" class="d-flex">
              <md-button class="md-simple md-just-icon md-round fas fa-times" @click="resetField()">
                <md-icon class="text-red">clear</md-icon>
              </md-button>

              <md-button class="md-simple md-just-icon md-round fa fa-check" @click="saveBudgeData()">
                <md-icon class="text-success">check</md-icon>
              </md-button>
            </div>
          </div>

          <hr v-show="!this.editAnnualBudgetPerEmployee" style="border-top: 1px solid rgb(84, 102, 115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84, 102, 115);">
        </div>

          <div>
            <div style="text-align: left;">
              <h5 style="font-size: 0.95rem !important; font-weight: 600; padding: 0; margin: 0;">Total annual budget</h5>

              <div class="d-flex justify-beetwen items-center-v">
                <md-field v-show="this.editAnnualBudget" :class="[{'md-error': errors.has('annualBudget')}]">
                     <md-input v-model="annualBudget"
                               data-vv-name="annualBudget"
                               v-validate= "modelValidations.annualBudget"
                      />
                      <span class="md-error" v-if="errors.has('annualBudgetPerEmployee')">The field is required</span>
                </md-field>
                <h4 v-show="!this.editAnnualBudget" style="font-size: 0.95rem !important; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
                  <animated-number ref="annualBudgetNumber" :value="this.annualBudget" prefix="$"></animated-number>
                </h4>
                <div v-show="!this.editAnnualBudget">
                  <md-button class="md-simple md-just-icon md-round fa fa-edit" @click="openEditAnnualBudget()">
                    <md-icon>edit</md-icon>
                  </md-button>
                </div>
                <div v-show="this.editAnnualBudget" class="d-flex">
                  <md-button class="md-simple md-just-icon md-round fas fa-times" @click="resetField()">
                    <md-icon class="text-red">clear</md-icon>
                  </md-button>
                  <md-button class="md-simple md-just-icon md-round fa fa-check" @click="saveBudgeData()">
                    <md-icon class="text-success">check</md-icon>
                  </md-button>
                </div>
              </div>

              <hr v-show="!this.editAnnualBudget" style="border-top: 1px solid rgb(84, 102, 115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84, 102, 115);">
            </div>
          </div>


        <h5 style="font-size: 1.05em; font-weight: 600; padding: 0; margin: 0;">Total remaining budget</h5>
        <h4 class="title" style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
          <animated-number ref="totalRemainingBudgetNumber" :value="totalRemainingBudget" prefix="$"></animated-number>
        </h4>

        <chart-component
                class=""
                :chart-data="pieChart.data"
                :chart-options="pieChart.options"
                chart-type="Pie"/>
        <animated-number class="percentage" ref="percentageNumber" :value="percentage" suffix="%"></animated-number>
        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95rem !important; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Remaining budget per employee</h5>
            <h4 style="font-size: 0.95rem; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
              <animated-number ref="remainingBudgetPerEmployeeNumber" :value="remainingBudgetPerEmployee" prefix="$"></animated-number>
            </h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95rem !important; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Total events</h5>
            <h4 style="font-size: 0.95rem; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
              <animated-number ref="totalEventsNumber" :value="countEvents"></animated-number>
            </h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>
      </md-card-content>
    </md-card>

    <md-card style="display: none; background-color: #41535E; color: rgb(225, 234,239); height: 100%; margin: 0; padding: 0;">
      <md-card-content style="text-align: center; height: 100%;">
        <h5 style="font-size: 1.05em; font-weight: 600; padding: 0; margin: 0;">Total remaining budget</h5>
        <h4 style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
          <animated-number ref="totalRemainingBudgetNumber" :value="totalRemainingBudget" prefix="$"></animated-number>
        </h4>
        <div style="padding: 16px;"></div>
        <img src="https://cdn1.iconfinder.com/data/icons/charts-and-diagrams-1-1/512/donutchart-512.png"/>
        <div style="padding: 16px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Remaining budget per employee</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">$285.5</h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>

        <div style="padding: 8px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Annual budget per employee</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">$285.5</h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>

        <div style="padding: 8px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Total annual budget</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">$285.5</h4>
            <hr style="border-top: 1px solid rgb(84,102,115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84,102,115);"/>
          </div>
        </div>

        <div style="padding: 8px;"></div>

        <div>
          <div style="text-align: left;">
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Total events</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">20</h4>
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
  import Calendar from '@/models/Calendar';

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
      },
      statistics: {
        type: Object
      }
    },
    data() {
      return {
        ready: false,
        auth: auth,
        isLoading: true,
        statisticData: {},
        editAnnualBudgetPerEmployee: false,
        editAnnualBudget: false,
        annualBudgetPerEmployee: {
            type: Number,
            default: 0
        },
        annualBudget: {
            type: Number,
            default: 0
        },
        countEvents: {
            type: Number,
            default: 0
        },
        totalRemainingBudget: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
        remainingBudgetPerEmployee: {
            type: Number,
            default: 0
        },
        seriesData: [],
        annualBudgetCache: null,
        annualBudgetPerEmployeeCache: null,
        modelValidations: {
          annualBudgetPerEmployee: {
            required: true,
            min_value: 1,
            max_value: 1000000,
          },
          annualBudget: {
            required: true,
            min_value: 1,
            max_value: 1000000,
          },
        },
      }
    },
    created() {
      this.queryBudgetInfo();
    },
    mounted(){
      this.ready = true;
      this.isLoading = true;
    },
    methods: {
      async saveBudgeData(){
          let calendarId = this.auth.user.defaultCalendarId;
          let calendar = await Calendar.find(calendarId);

          calendar.annualBudget = this.annualBudget;
          calendar.annualBudgetPerEmployee = this.annualBudgetPerEmployee;

          calendar.save().then(response => {
            this.$emit("month-count");
            this.queryBudgetInfo();
            this.resetField();
          }).catch(error => {
            console.error(error);
          });
      },
      async queryBudgetInfo(){
        try {
          let calendarId = this.auth.user.defaultCalendarId;

          let calendar = await Calendar.find(calendarId).then(response => {
            let statistics = response.statistics;
            let statisticMap = {};

            statistics.forEach(function(data){
              statisticMap[data.item] = data.value
            });

            this.annualBudget = statisticMap.annualBudget;
            this.annualBudgetPerEmployee = statisticMap.annualBudgetPerEmployee;
            // this.countEvents = response.events;
            this.totalRemainingBudget = statisticMap.annualBudget - statisticMap.annualBudgetAllocated;

            this.remainingBudgetPerEmployee = statisticMap.annualBudgetPerEmployee - statisticMap.annualBudgetPerEmployeeAllocated;
            this.seriesData = [statisticMap.annualBudget, statisticMap.annualBudgetPerEmployeeAllocated];
            this.countEvents = statisticMap.numberOfEvents;

            this.annualBudgetCache = this.annualBudget;
            this.annualBudgetPerEmployeeCache = this.annualBudgetPerEmployee;
          })
            .catch(error => {
              console.error(error);
            });
          this.isLoading = false;
        } catch(e){
          console.error(e);
          this.isLoading = false;
        }
      },
      resetField() {
        this.annualBudget = this.annualBudgetCache;
        this.annualBudgetPerEmployee = this.annualBudgetPerEmployeeCache;
        this.editAnnualBudgetPerEmployee = false;
        this.editAnnualBudget = false;
      },
      openEditAnnualBudgetPerEmployee(){
        this.editAnnualBudgetPerEmployee = true;
      },
      openEditAnnualBudget(){
        this.editAnnualBudget = true;
      },
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
            height: 180,
            donut: true,
            donutWidth: 20
          }
        }
      },
    },
    watch: {
      year(newVal, oldVal){
        this.queryBudgetInfo();
      },
      month(newVal, oldVal){
        this.queryBudgetInfo();
      },
      statistics(newVal, oldVal){
        this.queryBudgetInfo();
      }
    }
  };
</script>
<style lang="scss">
.ct-series-b .ct-point,
.ct-series-b .ct-line,
.ct-series-b .ct-bar,
.ct-series-b .ct-slice-donut {
  stroke: #00AEED;
}
.ct-series-a .ct-point,
.ct-series-a .ct-line,
.ct-series-a .ct-bar,
.ct-series-a .ct-slice-donut {
  stroke: #447b7d;
}
.md-card-content h4.title span {
  color: #6cd6ee;
}
.md-card-content h4 span {
  color: #006690;
}
.md-card-content h5{
  font-size: 1.2rem!important;
  font-weight: 400;
}
.percentage {
  position: relative;
  top: -108px;
  font-size: 2.5rem;
  font-weight: 700;
  color: #AEAAA8;
}
.budget-form .md-field {
  max-width: 133px;
}
.budget-form .md-field .md-input,
.budget-form .md-field .md-textarea{
  -webkit-text-fill-color: #fff !important;
  color: #fff !important;
}
.flex-wrap {
  flex-wrap: wrap;
}
.md-button.md-simple .text-success{
  color: #00c782 !important;
}
.md-button.md-simple .text-red{
  color: #FF547C !important;
}
</style>
