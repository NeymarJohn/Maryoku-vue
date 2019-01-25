<template>
  <div class="md-layout" style="display: flex; overflow: hidden; height: 100%;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>

    <div class="md-layout-item md-size-15" style="padding: 0; margin: 0;">
      <budget-panel :month="Number(currentMonth)" :year="Number(currentYear)"></budget-panel>
    </div>

    <div class="md-layout-item md-size-85">
      <calendar-panel :month="Number(currentMonth)" :year="Number(currentYear)"></calendar-panel>
    </div>

    <div class="md-layout-item md-size-65 " style="display: none; height: 100%;">
      <md-card style="margin-top: 0; height: 15%; ">
        <md-card-content>
123
        </md-card-content>
      </md-card>

      <div class="md-layout" style="height: 85%;">
        <div class="md-layout-item md-size-20 side-padding left right top bottom">
          <md-card  style="margin: 0; height: 95%; overflow: auto;">
            <md-card-content style="width: 100%; padding: 0; margin: 0;text-align: center; vertical-align: middle;">

              <md-button class="md-simple md-sm md-just-icon md-round" style="height: 55px;"><i class="fa fa-chevron-left fa-2x"></i></md-button>
              <md-button class="md-simple md-round year-button" style="font-size: 21px !important; height: 55px; font-weight: 500; padding: 0;">{{currentYear}}</md-button>
              <md-button class="md-simple md-sm md-just-icon md-round" style="height: 55px; font-weight: 100;"><i class="fa fa-chevron-right"></i></md-button>

              <hr style="margin-top: 0; margin-left: 18px; margin-right: 18px; border-color: lightgray; border-top: none; border-left: none; border-right: none;" class="divider"/>

              <md-list style="width: 100%; padding: 0; margin: 0;">
                <md-list-item v-for="(month, idx) in months" :key="month" :ref="`month_${idx}`" :class="{'selected-month' : currentMonth === idx+1, 'month' : currentMonth !== idx+1}">
                  <router-link :to="{name: 'AnnualPlanner', params: {year: currentYear, month: idx+1}}" style="width: 100%;">
                    <div :class="{'selected-month-item' : currentMonth === idx+1, 'item' : currentMonth !== idx+1}">{{month}} <div class="pull-right" :ref="`month_${idx}_count`">0</div></div>
                  </router-link>
                </md-list-item>

              </md-list>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-size-80 side-padding right">


          <div class="md-layout" style="height: 100%;">
            <div class="md-layout-item md-size-100 side-padding right" style="height: 80%;">
              <md-card style="margin: 0; height: 100%; overflow: auto;">
                <md-card-content style="height: 100%; text-align: center;">
                  <h3 class="text-gray">{{currentMonthName}}</h3>
                  <table style="width: 100%; height: 90%; text-align: center;">
                    <tr>
                      <th class="text-gray">Sun</th>
                      <th class="text-gray">Mon</th>
                      <th class="text-gray">Tue</th>
                      <th class="text-gray">Wed</th>
                      <th class="text-gray">Thu</th>
                      <th class="text-gray">Fri</th>
                      <th class="text-gray">Sat</th>
                    </tr>
                    <tr v-for="monthRow in monthRows">
                      <td v-for="monthDay in monthRow" style="width: 14.2%; min-width: 14.2%; max-width: 14.2%;">
                        <template v-if="monthDay !== 0">
                          <template v-if="monthDay.hasEvents">
                            <md-button class="md-success md-just-icon md-round md-md">{{monthDay.dayInMonth}}</md-button>
                          </template>
                          <template v-else>
                            <md-button class="md-simple md-round  md-just-icon md-md">{{monthDay.dayInMonth}}</md-button>
                          </template>
                        </template>
                        <template v-else>
                          <md-button class="md-simple md-round  md-just-icon md-md" disabled="disabled"></md-button>
                        </template>
                      </td>
                    </tr>
                  </table>
                </md-card-content>
              </md-card>
            </div>
            <div class="md-layout-item md-size-100 side-padding right" style="height: 15%;">
              <md-card style="margin: 0; height: 85%;">
                <md-card-content>legend</md-card-content>
              </md-card>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="md-layout-item md-size-20 " style="display: none; height: 100%;">
      <div class="md-layout" style="height: 100%;">
        <div class="md-layout-item md-size-100" style="height: 15%;">
          <md-card style="height: 100%; margin: 0; padding: 0; background-color: transparent; box-shadow: none; overflow: auto;">
            <md-card-content>
              <md-button class="md-success" style="height: 100%;">Create New Event</md-button>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-size-100" style="height: 65%;">
          <md-card style="height: 100%; margin: 0; padding: 0; overflow: auto;">
            <md-card-content style="width: 100%; padding: 0; margin: 0;text-align: center; vertical-align: middle;">
              <md-button class="md-simple md-round" style="font-size: 21px; height: 60px; font-weight: 500;">Events</md-button>
              <hr style="margin-top: 0; margin-left: 18px; margin-right: 18px; border-color: lightgray; border-top: none; border-left: none; border-right: none;" class="divider"/>
              <md-list style="width: 100%; padding: 0; margin: 0;">

              </md-list>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-size-100" style="height: 15%;">
          <md-card style="height: 100%; margin: 0; padding: 0; background-color: transparent; box-shadow: none; overflow: auto;">
            <md-card-content>
              <md-button class="md-success" style="height: 100%;">Import Events</md-button>
              <md-button class="md-success" style="height: 100%;">Export to Excel</md-button>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '@/auth';
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';
  import CalendarMetadata from '@/models/CalendarMetadata';
  import VueElementLoading from 'vue-element-loading';
  import ChartComponent from '@/components/Cards/ChartComponent';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import AnnualPlannerVuexModule from './AnnualPlanner.vuex';
  import moment from 'moment';
  import {
    AnimatedNumber
  } from "@/components";
  import BudgetPanel from './BudgetPanel';
  import CalendarPanel from './CalendarPanel';

  export default {
    components: {
      CalendarPanel,
      BudgetPanel,
      VueElementLoading,
      ChartComponent,
      AnimatedNumber,
    },
    data() {

      return {
        ready: false,
        auth: auth,
        isLoading: true,
        totalRemainingBudget: 0,
        monthRows: [],
        currentMonthName: '',
        currentMonth: 0,
        currentYear: 0,
        months: this.$moment.months(),
      }
    },
    created() {
      this.$store.registerModule('AnnualPlannerVuex', AnnualPlannerVuexModule);
    },
    mounted(){
      console.log("mounted !");
      this.ready = false;
      this.isLoading = true;
      this.auth.currentUser(this, true, function() {

        this.checkSelectedYearMonth();

        this.totalRemainingBudget = 26350;

        this.ready = true;
        this.isLoading = false;
      }.bind(this))
    },
    methods: {
      checkSelectedYearMonth(){
        let yearParam = this.$route.params.year;
        let monthParam = this.$route.params.month;
        let redirect = false;

        if (yearParam === undefined || isNaN(yearParam)){
          yearParam = moment().format('YYYY');
          redirect = true;
        }

        if (monthParam === undefined || isNaN(yearParam)){
          monthParam = moment().format('M');
          redirect = true;
        }

        if (redirect) {
          this.$router.push({
            path: `/annual-planner/${yearParam}/${monthParam}`
          });
        } else {
          this.selectYearMonth(yearParam, monthParam);
        }
      },
      selectYearMonth(year, month){
        let selectedMoment = moment().date(1).month(month-1).year(year);
        let daysInMonth = selectedMoment.daysInMonth();
        let currentMonth = selectedMoment.month();
        let currentYear = selectedMoment.year();
        this.currentMonthName = selectedMoment.format('MMMM');
        this.currentMonth = currentMonth+1;
        this.currentYear = year;
      }
    },
    computed: {
      ...mapState('AnnualPlannerVuex', ['filtersData']),
    },
    watch: {
      '$route' (to, from) {
        // react to route changes...
        this.checkSelectedYearMonth();
      }
    }
  };
</script>
<style lang="scss">
  .side-padding {
    &.left {
      padding-left: 0;
    }

    &.right {
      padding-right: 0;
    }

    &.top {
      padding-top: 0;
    }

    &.bottom {
      padding-bottom: 0;
    }
  }

  .content {
    height: 90% !important;
  }

  .selected-month {
    background-color: #FF547C;
    margin-left: 0;

    &.item {
      font-weight: 500; width: 100%; padding: 0 15px;
      color: white;
    }
  }

  .selected-month-item {
    color: white;
    font-weight: 500; width: 100%; padding: 0 15px;
  }

  .month {
    margin-left: 0;
  }

  .item {
    font-weight: 500; width: 100%; padding: 0 15px;
  }

  .md-list-item-content {
    min-height: 46px;
  }

  .year-button .md-ripple {
    padding: 0 !important;
  }
</style>
