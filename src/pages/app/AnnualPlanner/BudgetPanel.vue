<template>
  <div style="overflow: hidden; height: 100%; margin: 0; padding: 0;">

    <md-card style="background-color: #41535E; color: rgb(225, 234,239); height: 100%; margin: 0; padding: 0;">
      <md-card-content style="text-align: center; height: 100%;background-color: #003434;">

        <div style="padding: 8px;"></div>

        <form class="budget-form">
          <div>
            <div style="text-align: left;">
              <h5 style="font-size: 1.05em; font-weight: 600; padding: 0; margin: 0;">Annual budget per employee</h5>
              <div class="d-flex  justify-beetwen items-center-v">
                <md-field v-show="this.editAnnualBudgetPerEmployee" :class="[{'md-error': errors.has('annualBudgetPerEmployee')}]">
                  <md-input v-model="annualBudgetPerEmployee"
                            data-vv-name="annualBudgetPerEmployee"
                            v-validate= "modelValidations.annualBudgetPerEmployee"
                      />
                      <span class="md-error" v-if="errors.has('annualBudgetPerEmployee')">The field is required</span>
                  </md-field> 
                <h4 v-show="!this.editAnnualBudgetPerEmployee" style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
                  <animated-number ref="annualBudgetPerEmployeeNumber" :value="this.annualBudgetPerEmployee" prefix="$"></animated-number>
                </h4>
                <div class="d-flex">
                  <md-button v-show="!this.editAnnualBudgetPerEmployee" class="md-simple md-just-icon md-round fa fa-edit" @click="toogleEditAnnualBudgetPerEmployee">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button v-show="this.editAnnualBudgetPerEmployee" class="md-simple md-just-icon md-round fas fa-times" @click="toogleEditAnnualBudgetPerEmployee">
                  <md-icon class="text-red">clear</md-icon>
                </md-button>
                <md-button v-show="this.editAnnualBudgetPerEmployee" class="md-simple md-just-icon md-round fa fa-check" @click="saveAnnualBudgetPerEmployee">
                  <md-icon class="text-success">check</md-icon>
                </md-button>
                </div>
              </div>
              <hr v-show="!this.editAnnualBudgetPerEmployee" style="border-top: 1px solid rgb(84, 102, 115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84, 102, 115);">
            </div>
          </div>

          <div style="padding: 8px;"></div>       

          <div>
            <div style="text-align: left;">
              <h5 style="font-size: 1.05em; font-weight: 600; padding: 0; margin: 0;">Total annual budget</h5>
              
              <div class="d-flex flex-wrap justify-beetwen items-center-v">
                <md-field v-show="this.editTotalAnnualBudget" :class="[{'md-error': errors.has('totalAnnualBudget')}]">
                     <md-input v-model="totalAnnualBudget"
                               data-vv-name="totalAnnualBudget"
                               v-validate= "modelValidations.totalAnnualBudget"
                      />
                      <span class="md-error" v-if="errors.has('annualBudgetPerEmployee')">The field is required</span>
                </md-field> 
                <h4 v-show="!this.editTotalAnnualBudget" style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
                  <animated-number ref="totalAnnualBudgetNumber" :value="this.totalAnnualBudget" prefix="$"></animated-number>
                </h4>
                <md-button v-show="!this.editTotalAnnualBudget" class="md-simple md-just-icon md-round fa fa-edit" @click="toogleEditTotalAnnualBudget">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button v-show="this.editTotalAnnualBudget" class="md-simple md-just-icon md-round fas fa-times" @click="toogleEditTotalAnnualBudget">
                  <md-icon class="text-red">clear</md-icon>
                </md-button>
                <md-button v-show="this.editTotalAnnualBudget" class="md-simple md-just-icon md-round fa fa-check" @click="saveAnualBudget">
                  <md-icon class="text-success">check</md-icon>
                </md-button>
              </div>
              <hr v-show="!this.editTotalAnnualBudget" style="border-top: 1px solid rgb(84, 102, 115); border-left: none; border-right: none; border-bottom: 1px solid rgb(84, 102, 115);">
            </div>
          </div>

          <div style="padding: 8px;"></div>  
        </form>      

        <h5 style="font-size: 1.05em; font-weight: 600; padding: 0; margin: 0;">Total remaining budget</h5>
        <h4 class="title" style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
          <animated-number ref="totalRemainingBudgetNumber" :value="totalRemainingBudget" prefix="$"></animated-number>
        </h4>

        <div style="padding: 16px;"></div>
        <chart-component
                class=""
                :chart-data="pieChart.data"
                :chart-options="pieChart.options"
                chart-type="Pie"/>
                 <animated-number class="percentage" ref="percentageNumber" :value="percentage" suffix="%"></animated-number>
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
            <h5 style="font-size: 0.95em; font-weight: 500; padding: 0; margin: 0; color: rgb(225, 234,239);">Total events</h5>
            <h4 style="font-size: 1.5em; font-weight: 500; padding: 0; margin: 0; color: rgb(125,192,217);">
              <animated-number ref="totalEventsNumber" :value="countEvents"></animated-number>
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
      }
    },
    data() {
      return {
        ready: false,
        auth: auth,
        isLoading: true,
        statisticData: {},
        editAnnualBudgetPerEmployee: false,
        editTotalAnnualBudget: false,
        annualBudgetPerEmployee: 0,
        totalAnnualBudget: 0,
        countEvents:0,  
        totalRemainingBudget:0,
        percentage:0,
        remainingBudgetPerEmployee:0,
        seriesData:[],
        modelValidations: {
          annualBudgetPerEmployee: {
            required: true,
            min_value: 1,
            max_value: 1000000,
          },
          totalAnnualBudget: {
            required: true,
            min_value: 1,
            max_value: 1000000,
          },          
        },
      }
    },
    created() {
      
    },
    mounted(){
      this.ready = true;
      this.isLoading = true;
      this.queryBudgetInfo();
    },
    methods: {
      async saveAnualBudget(){
          let calendarId = this.auth.user.defaultCalendarId;
          let calendar = await Calendar.first();

          calendar.annualBudget = this.totalAnnualBudget;

          calendar.save().then(response => {
            this.toogleEditTotalAnnualBudget();
            this.queryBudgetInfo();
          }).catch(error => {
            console.log(error);
          });
      },
      async saveAnnualBudgetPerEmployee(){
          let calendarId = this.auth.user.defaultCalendarId;
          let calendar = await Calendar.find(calendarId);

          calendar.annualBudgetPerEmployee = this.annualBudgetPerEmployee;

          calendar.save().then(response => {
            this.toogleEditAnnualBudgetPerEmployee();
            this.queryBudgetInfo();
          }).catch(error => {
            console.log(error);
          });
      },
      async queryBudgetInfo(){
        let calendarId = this.auth.user.defaultCalendarId;
        let calendar = await Calendar.first()
          .then(response => {
            this.totalAnnualBudget = response.annualBudget;
            this.annualBudgetPerEmployee = response.annualBudgetPerEmployee;
            this.countEvents = response.events;
            this.totalRemainingBudget = this.totalAnnualBudget;
            this.percentage = parseFloat((100 * this.totalAnnualBudget / this.totalAnnualBudget).toFixed(0));
            this.seriesData = [this.totalAnnualBudget];
          })
          .catch(error => {
            console.log(error);
          })
          this.isLoading = false; 
      },
      toogleEditAnnualBudgetPerEmployee(){
        this.editAnnualBudgetPerEmployee = !this.editAnnualBudgetPerEmployee;
      },
      toogleEditTotalAnnualBudget(){
        this.editTotalAnnualBudget = !this.editTotalAnnualBudget;
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
    }
  };
</script>
<style lang="scss">
.ct-series-b .ct-point,
.ct-series-b .ct-line,
.ct-series-b .ct-bar,
.ct-series-b .ct-slice-donut {
  stroke: #253B3D;
}
.ct-series-a .ct-point,
.ct-series-a .ct-line,
.ct-series-a .ct-bar,
.ct-series-a .ct-slice-donut {
  stroke: #00AEED;
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
