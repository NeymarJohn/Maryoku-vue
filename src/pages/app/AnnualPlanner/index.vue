<template>
  <div style="height: 100%;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>

    <table style="width: 100%; height: 100%; ">
      <tr>
        <td style="width: 15%; height: 100%;" >
          <budget-panel @month-count="monthCount" :statistics="statisticsData" :month="Number(currentMonth)" :year="Number(currentYear)"></budget-panel>
        </td>
        <td style="width: 85%; height: 100%;">
          <calendar-panel @month-count="monthCount" :month="Number(currentMonth)" :year="Number(currentYear)" :firstDayOfTheWeek="firstDayOfTheWeek" :month-counts="monthCounts"></calendar-panel>
        </td>
      </tr>
    </table>

    <!--<div style="border: 1px solid blue; display: flex; flex-direction: column; height: 100%;">
      <div style="flex: 1; border: 1px solid green; display: flex;justify-content: center;flex-direction: column;">2</div>
    </div>-->

    <!--<div class="md-layout-item md-size-15" style="padding: 0; margin: 0;">
      <budget-panel :month="Number(currentMonth)" :year="Number(currentYear)"></budget-panel>
    </div>

    <div class="md-layout-item md-size-85">
      <calendar-panel :month="Number(currentMonth)" :year="Number(currentYear)"></calendar-panel>
    </div>-->
  </div>
</template>

<script>
  import auth from '@/auth';
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
  import Calendar from '@/models/Calendar';

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
        monthRows: [],
        currentMonthName: '',
        currentMonth: 0,
        currentYear: 0,
        statisticsData: null,
        months: this.$moment.months(),
        firstDayOfTheWeek: 'monday',
        monthCounts: {},
      }
    },
    created() {
      this.$store.registerModule('AnnualPlannerVuex', AnnualPlannerVuexModule);
    },
    mounted(){
      this.ready = false;
      this.isLoading = true;

      if (this.categories.length == 0 || this.eventTypes.length == 0 || this.currencies.length == 0) {
        this.auth.currentUser(this, true, function() {
          this.$store.dispatch("event/getCategories", this.auth.user.defaultCalendarId);
          this.$store.dispatch("event/getEventTypes", this.auth.user.defaultCalendarId);
          this.$store.dispatch("event/getCurrencies");
          this.$store.dispatch("event/getEventThemes")
        }.bind(this))
      }
    },
    methods: {
      monthCount() {
        this.auth.currentUser(this, true, function() {
          Calendar.params({year: this.$route.params.year}).find(this.auth.user.defaultCalendarId).then(function(calendar){
            this.firstDayOfTheWeek = calendar.firstDayOfWeek;
            this.monthCounts = calendar.monthCounts;

            let statistics = calendar.statistics;
            let statisticMap = {};

            statistics.forEach(function(data){
              statisticMap[data.item] = data.value
            });

            this.statisticsData = statisticMap;

            this.checkSelectedYearMonth();

            this.ready = true;
            this.isLoading = false;
          }.bind(this));
        }.bind(this))
      },
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
            path: `/planner/${yearParam}/${monthParam}`
          });
        } else {
          this.selectYearMonth(yearParam, monthParam);
        }
      },
      selectYearMonth(year, month){
        let selectedMoment = moment().date(1).month(month-1).year(year);
        let currentMonth = selectedMoment.month();
        this.currentMonthName = selectedMoment.format('MMMM');
        this.currentMonth = currentMonth+1;
        this.currentYear = year;
      },
    },
    computed: {
      ...mapState('AnnualPlannerVuex', ['filtersData']),
      ...mapGetters({
        categories: 'event/getCategoriesList',
        currencies: 'event/getCurrenciesList',
        eventTypes: 'event/getEventTypesList'
      }),
    },
    watch: {
      '$route' (to, from) {
        // react to route changes...
        this.checkSelectedYearMonth();
        this.monthCount();
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

  .match-card {
    height: calc(100% - 18px);
  }
</style>
