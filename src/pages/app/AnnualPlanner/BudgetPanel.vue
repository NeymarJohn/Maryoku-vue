<template>
  <div style="height: 100%; margin: 0; padding: 0;">
    <md-card class="budget-panel" style="height: 100%; margin: 0; padding: 0;">
      <md-card-header class="md-card-header-icon md-card-header-blue">
        <div class="card-icon" style="margin-right: 0;">
          <div style="position:relative;">
            <div style="display: grid;margin-top: 18px;">
              <chart-component
                :chart-data="pieChart.data"
                :chart-options="pieChart.options"
                chart-type="Pie"
                style="grid-column: 1; grid-row: 1;"/>
              <animated-number class="percentage" ref="percentageNumber" :value="percentage" suffix="%"></animated-number>
            </div>
          </div>
        </div>
      </md-card-header>

      <md-card-content style="text-align: center; height: 100%;">
        <md-switch class="md-switch-info multiple text-left margin-bottom_30" style="padding-bottom: 20px;" v-model="budgetType">
          <span style="font-weight: 600; font-size: 16px;">{{!budgetType ? 'Budget per Employee' : 'Total Budget'}}</span>
        </md-switch>

        <div v-show="!budgetType">
          <div>
            <div style="text-align: left;">
              <h5 style="font-size: 0.95rem !important; font-weight: 500; padding: 0; margin: 0;">Remaining budget per employee</h5>
              <h4 style="font-size: 0.95rem; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
                <animated-number ref="remainingBudgetPerEmployeeNumber" :value="remainingBudgetPerEmployee" prefix="$"></animated-number>
              </h4>
            </div>
            <hr style="border-top: 1px solid rgba(94, 95, 95, 0.1); border-left: none; border-right: none; border-bottom: 1px solid rgb(84, 102, 115);">
          </div>

          <div style="padding: 16px;"></div>

          <div class="text-left">
            <h5 style="font-size: 0.95rem !important; padding: 0; margin: 0; color: #959595;">Annual budget per employee</h5>
            <div class="d-flex flex-wrap justify-beetwen items-center-v">
              <md-field v-show="this.editAnnualBudgetPerEmployee" :class="[{'md-error': errors.has('annualBudgetPerEmployee')}]">
                <md-input v-model="annualBudgetPerEmployee"
                          data-vv-name="annualBudgetPerEmployee"
                          v-validate= "modelValidations.annualBudgetPerEmployee" style="width: 10px;"/>
                <span class="md-error" v-if="errors.has('annualBudgetPerEmployee')">The field is required</span>
              </md-field>
              <h4 v-show="!this.editAnnualBudgetPerEmployee" style="font-size: 0.95rem !important; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
                <animated-number ref="annualBudgetPerEmployeeNumber" :value="this.annualBudgetPerEmployee" prefix="$"></animated-number>
              </h4>

              <div v-show="!this.editAnnualBudgetPerEmployee">
                <md-button class="md-icon-button md-simple" @click="openEditAnnualBudgetPerEmployee()">
                  <md-icon>edit</md-icon>
                </md-button>
              </div>

              <div v-show="this.editAnnualBudgetPerEmployee" class="d-flex ml-auto mr-0">
                <md-button class="md-icon-button md-simple" @click="resetField()">
                  <md-icon class="text-red">clear</md-icon>
                </md-button>

                <md-button class="md-icon-button md-simple" @click="saveBudgeData()">
                  <md-icon class="text-success">check</md-icon>
                </md-button>
              </div>
            </div>
            <hr v-show="!this.editAnnualBudgetPerEmployee" style="border-top: 1px solid rgba(94, 95, 95, 0.1); border-left: none; border-right: none; border-bottom: 1px solid rgb(84, 102, 115);">
          </div>

          <div style="padding: 16px;"></div>

          <div class="text-left">
            <h5 style="font-size: 0.95rem !important; padding: 0; margin: 0; color: #959595;">Number of employees</h5>
            <div class="d-flex flex-wrap justify-beetwen items-center-v">
              <md-field v-show="editNumberOfEmployees" :class="[{'md-error': errors.has('numberOfEmployees')}]">
                <md-input v-model="numberOfEmployees"
                          data-vv-name="numberOfEmployees"
                          v-validate= "modelValidations.numberOfEmployees" style="width: 10px;"/>
                <span class="md-error" v-if="errors.has('numberOfEmployees')">The field is required</span>
              </md-field>

              <h4 style="font-size: 0.95rem; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
                <animated-number ref="numberOfEmployees" :value="numberOfEmployees"></animated-number>
              </h4>

              <div v-show="!editNumberOfEmployees">
                <md-button class="md-icon-button md-simple" @click="openEditNumberOfEmployees()">
                  <md-icon>edit</md-icon>
                </md-button>
              </div>

              <div v-show="editNumberOfEmployees" class="d-flex ml-auto mr-0">
                <md-button class="md-icon-button md-simple" @click="resetField()">
                  <md-icon class="text-red">clear</md-icon>
                </md-button>

                <md-button class="md-icon-button md-simple" @click="saveBudgeData()">
                  <md-icon class="text-success">check</md-icon>
                </md-button>
              </div>

            </div>
            <hr v-show="!editNumberOfEmployees" style="border-top: 1px solid rgba(94, 95, 95, 0.1); border-left: none; border-right: none; border-bottom: 1px solid rgb(84, 102, 115);">
          </div>
          <div style="padding: 16px;"></div>
        </div>
        <div v-show="budgetType">
          <div>
            <h5 style="font-size: 0.95rem !important; font-weight: 600; padding: 0; margin: 0;" class="text-left">Total remaining budget</h5>
            <h4 class="title text-left" style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
              <animated-number ref="totalRemainingBudgetNumber" :value="totalRemainingBudget" prefix="$"></animated-number>
            </h4>
          </div>

          <div style="padding: 16px;"></div>

          <div style="text-align: left;">
            <h5 style="font-size: 0.95rem !important; padding: 0; margin: 0; color: #959595;">Total annual budget</h5>

            <div class="d-flex flex-wrap justify-beetwen items-center-v">
              <!--<md-field v-show="this.editAnnualBudget" :class="[{'md-error': errors.has('annualBudget')}]">-->
                <!--<md-input v-model="annualBudget"-->
                          <!--data-vv-name="annualBudget"-->
                          <!--v-validate= "modelValidations.annualBudget" style="width: 10px;"/>-->
                <!--<span class="md-error" v-if="errors.has('annualBudgetPerEmployee')">The field is required</span>-->
              <!--</md-field>-->
              <h4 style="font-size: 0.95rem !important; font-weight: 500; padding: 0; margin: 0; rgb(125,192,217);">
                <animated-number ref="annualBudgetNumber" :value="this.annualBudget" prefix="$"></animated-number>
              </h4>
              <!--<div v-show="!this.editAnnualBudget">-->
                <!--<md-button class="md-icon-button md-simple" @click="openEditAnnualBudget()">-->
                  <!--<md-icon>edit</md-icon>-->
                <!--</md-button>-->
              <!--</div>-->
              <!--<div v-show="this.editAnnualBudget" class="d-flex ml-auto mr-0">-->
                <!--<md-button class="md-icon-button md-simple" @click="resetField()">-->
                  <!--<md-icon class="text-red">clear</md-icon>-->
                <!--</md-button>-->
                <!--<md-button class="md-icon-button md-simple" @click="saveBudgeData()">-->
                  <!--<md-icon class="text-success">check</md-icon>-->
                <!--</md-button>-->
              <!--</div>-->
            </div>

            <hr style="border-top: 1px solid rgba(94, 95, 95, 0.1); border-left: none; border-right: none; border-bottom: 1px solid rgb(84, 102, 115);">
          </div>
          <div style="padding: 16px;"></div>
          <div>
            <div style="text-align: left;">
              <h5 style="font-size: 0.95rem !important; padding: 0; margin: 0; color: #959595;">Total events</h5>
              <h4 style="font-size: 0.95rem; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
                <animated-number ref="totalEventsNumber" :value="countEvents"></animated-number>
              </h4>
            </div>
            <hr style="border-top: 1px solid rgba(94, 95, 95, 0.1); border-left: none; border-right: none; border-bottom: 1px solid rgb(84, 102, 115);">
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
  import numeral from 'numeral';

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
        budgetType: false,
        statisticData: {},
        editAnnualBudgetPerEmployee: false,
        editNumberOfEmployees: false,
        // editAnnualBudget: false,
        annualBudgetPerEmployee: {
          type: Number,
          default: 0
        },
        numberOfEmployees: {
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
          numberOfEmployees: {
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
        let calendar = await Calendar.params({year: this.$route.params.year}).find(calendarId);
        calendar.annualBudget = Number(this.annualBudget);
        calendar.customer.numberOfEmployees = Number(this.numberOfEmployees);
        this.auth.user.customer.numberOfEmployees = Number(this.numberOfEmployees);
        calendar.annualBudgetPerEmployee = Number(this.annualBudgetPerEmployee);


        calendar.save().then(response => {
          this.$emit("month-count");
          this.queryBudgetInfo();
          this.resetField();
        }).catch(error => {
          console.error(error);
        });
      },
      queryBudgetInfo(){
        if (this.statistics) {
          this.numberOfEmployees = this.auth.user.customer.numberOfEmployees | numeral('0,0');
          this.annualBudget = this.statistics.annualBudget | numeral('0,0');
          this.annualBudgetPerEmployee = this.statistics.annualBudgetPerEmployee | numeral('0,0');
          this.totalRemainingBudget = this.statistics.annualBudget - this.statistics.annualBudgetAllocated;
          this.remainingBudgetPerEmployee = this.statistics.annualBudgetPerEmployee - this.statistics.annualBudgetPerEmployeeAllocated;
          this.countEvents = this.statistics.numberOfEvents;
          this.percentage = 100 - ((this.statistics.annualBudgetAllocated / this.statistics.annualBudget) * 100).toFixed(2);
          this.seriesData = [(100 - this.percentage), this.percentage];
          this.annualBudgetCache = this.annualBudget;
          this.annualBudgetPerEmployeeCache = this.annualBudgetPerEmployee;
        }

        this.isLoading = false;
      },
      resetField() {
        this.annualBudget = this.annualBudgetCache;
        this.annualBudgetPerEmployee = this.annualBudgetPerEmployeeCache;
        this.editAnnualBudgetPerEmployee = false;
        this.editNumberOfEmployees = false;
        // this.editAnnualBudget = false;
      },
      openEditAnnualBudgetPerEmployee(){
        this.editAnnualBudgetPerEmployee = true;
      },
      openEditNumberOfEmployees(){
        this.editNumberOfEmployees = true;
      },
      // openEditAnnualBudget(){
      //   this.editAnnualBudget = true;
      // },
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

<style scoped lang="scss">
  .md-card-content h4.title span {
    color: #6cd6ee;
  }
  .md-card-content h4 span {
    color: rgb(125,192,217);
  }
  .md-card-content h5{
    font-size: 1.2rem!important;
    font-weight: 400;
  }
  .percentage {
    display: flex;
    justify-content: center;
    padding-bottom: 8px;
    padding-left: 5px;
    grid-column: 1;
    grid-row: 1;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
  }
  .budget-form .md-field {
    max-width: 133px;
  }
  .budget-panel .md-field {
    margin-top: 0;
  }
  .budget-panel .md-field .md-input{
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
<style lang="scss">
  .md-switch-info {
    &.multiple {
      .md-switch-container {
        background-color: #64b5f6 !important;
      }
      .md-switch-thumb {
        border: 1px solid #64b5f6 !important;
      }
    }
  }
  .budget-panel {
    .ct-series-b .ct-point,
    .ct-series-b .ct-line,
    .ct-series-b .ct-bar,
    .ct-series-b .ct-slice-donut {
      stroke: #fff;
    }
    .ct-series-a .ct-point,
    .ct-series-a .ct-line,
    .ct-series-a .ct-bar,
    .ct-series-a .ct-slice-donut {
      opacity: 0.27;
    }
  }
</style>
