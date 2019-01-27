<template>
  <div class="md-layout" style="overflow: hidden; height: 100%;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <table style="width: 100%; height: 100%; padding-left: 15px;" >
      <tr style="height: 10%;">
        <td>
          <table style="width: 100%; height: 100%;">
            <tr>
              <td style="width: 80%;min-width: 60%;max-width: 60%;padding-right: 15px;" colspan="2">
                <filters-panel @filters-changed-event="refreshEvents"></filters-panel>
              </td>
              <td style="width: 20%;min-width: 40%;max-width: 40%; padding-left: 15px;">
                <md-button class="md-success" style="width: 100%; height: 100%; margin-top: 5px; font-size: 21px; font-weight: 500; white-space: normal;">Create New Event</md-button>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr style="height: 90%;">
        <td>
          <table style="width: 100%; height: 100%;">
            <tr>
              <td style="width: 20%; padding-right: 15px;">
                <month-select-panel :current-year="currentYear" :current-month="currentMonth"></month-select-panel>
              </td>
              <td style="width: 60%;">
                <table style="width: 100%; height: 100%;">
                  <tr style="height: 85%;">
                    <td style="padding-top: 15px; padding-right: 15px;">
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
                                    <md-button class="md-simple md-round  md-just-icon md-md">
                                      {{monthDay.dayInMonth}}
                                    </md-button>
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
                    </td>
                  </tr>
                  <tr style="height: 15%;">
                    <td style="padding-top: 15px; padding-right: 15px;">
                      <md-card style="padding: 0; margin: 0; height: 100%; ">
                        <md-card-content style="text-align: center;">
                          <md-button class="md-simple md-sm md-warning"><i class="fa fa-square" style="margin-right: 5px;"></i> Holidays</md-button>
                          <md-button class="md-simple md-sm md-info"><i class="fa fa-square" style="margin-right: 5px;"></i> Civil Days</md-button>
                          <md-button class="md-simple md-sm md-success"><i class="fa fa-square" style="margin-right: 5px;"></i> Company Events</md-button>
                          <md-button class="md-simple md-sm md-primary"><i class="fa fa-square" style="margin-right: 5px;"></i> Personal Schedule</md-button>
                        </md-card-content>
                      </md-card>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="width: 20%;">
                <table style="width: 100%; height: 100%;">
                  <tr style="height: 85%;">
                    <td>
                      <month-events-panel :calendar-events="calendarEvents"></month-events-panel>
                    </td>
                  </tr>
                  <tr style="height: 15%;">
                    <td style="padding-top: 15px;">
                      <md-button class="md-success md-sm disabled" disabled="disabled" style="width: 99%; height: 45%; margin-top: 0; font-weight: 500;">Import Events</md-button>
                      <md-button class="md-success md-sm" style="width: 99%; height: 45%; margin-top: 0; font-weight: 500;">Export To Excel</md-button>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!--<tr style="height: 10%;">

      </tr>
      <tr style="height: 75%;">
        <td  style="width: 20%; min-width: 20%; max-width: 20%;">
          <month-select-panel></month-select-panel>
        </td>
        <td style="width: 40%; min-width: 40%; max-width: 40%; padding-left: 15px;padding-top: 15px;" >

        </td>
        <td style="width: 40%;min-width: 40%;max-width: 40%; padding-left: 15px;">
          <month-events-panel :calendar-events="calendarEvents"></month-events-panel>
        </td>
      </tr>
      <tr style="height: 5%;">
        <td style="width: 60%;min-width: 60%;max-width: 60%; padding-left: 15px;padding-top: 15px;" >
          <md-card style="padding: 0; margin: 0; height: 100%; ">
            <md-card-content style="text-align: center;">
              <md-button class="md-simple md-sm md-warning"><i class="fa fa-square" style="margin-right: 5px;"></i> Holidays</md-button>
              <md-button class="md-simple md-sm md-info"><i class="fa fa-square" style="margin-right: 5px;"></i> Civil Days</md-button>
              <md-button class="md-simple md-sm md-success"><i class="fa fa-square" style="margin-right: 5px;"></i> Company Events</md-button>
              <md-button class="md-simple md-sm md-primary"><i class="fa fa-square" style="margin-right: 5px;"></i> Personal Schedule</md-button>
            </md-card-content>
          </md-card>
        </td>
        <td style="width: 40%;min-width: 40%;max-width: 40%; padding-left: 15px;padding-top: 15px;">
          <md-button class="md-success md-sm disabled" disabled="disabled" style="width: 99%; height: 45%; margin-top: 0; font-weight: 500;">Import Events</md-button>
          <md-button class="md-success md-sm" style="width: 99%; height: 45%; margin-top: 0; font-weight: 500;">Export To Excel</md-button>
        </td>
      </tr>-->
    </table>

  </div>
</template>

<script>
  import auth from '@/auth';
  import VueElementLoading from 'vue-element-loading';
  import ChartComponent from '@/components/Cards/ChartComponent';
  import CalendarFiltersPanel from './CalendarFiltersPanel';
  import moment from 'moment';
  import CalendarEvent from '@/models/CalendarEvent';

  import {
    AnimatedNumber
  } from "@/components";
  import AdvancedSelect from '@myena/advanced-select';
  import FiltersPanel from './FiltersPanel';
  import MonthSelectPanel from './MonthSelectPanel';
  import MonthEventsPanel from './MonthEventsPanel';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import AnnualPlannerVuexModule from './AnnualPlanner.vuex';

  export default {
    name: 'calendar-panel',
    components: {
      MonthEventsPanel,
      MonthSelectPanel,
      FiltersPanel,
      VueElementLoading,
      ChartComponent,
      AnimatedNumber,
      CalendarFiltersPanel,
      AdvancedSelect,
    },
    props: {
      month : {
        type: Number
      },
      year: {
        type: Number
      },
      dayInMonth: {
        type: String
      }
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

        value: [1],
        multiple: true,
        calendarEvents: {},
      }
    },
    created() {
      this.$store.registerModule('AnnualPlannerVuex', AnnualPlannerVuexModule);
    },
    mounted(){
      this.ready = true;
      this.isLoading = true;
      this.selectYearMonth(this.year, this.month);

    },
    methods: {
      refreshEvents(){

      },
      selectYearMonth(year, month){
        let selectedMoment = moment().date(1).month(month-1).year(year);
        let daysInMonth = selectedMoment.daysInMonth();
        let currentMonth = selectedMoment.month();
        let currentYear = selectedMoment.year();
        this.currentMonthName = selectedMoment.format('MMMM');
        this.currentMonth = currentMonth+1;
        this.currentYear = year;

        const filtersData = this.$store.state.AnnualPlannerVuex.filtersData;

        filtersData.year = parseInt(year);
        filtersData.month = parseInt(month);

        this.monthRows = [];
        let currentMoment = moment(selectedMoment);
        for (var rowIdx = 0; rowIdx < 6; rowIdx++){ // 5 rows
          let row = [];
          for (var dayIdx = 0; dayIdx < 7; dayIdx++) { // 7 days
            if (currentMoment.date() === 1 && currentMoment.month() === currentMonth && currentMoment.year() === currentYear) {
              if (currentMoment.weekday() === dayIdx){
                row.push({dayInMonth: currentMoment.date(), hasEvents: true});
                currentMoment = currentMoment.add(1, 'day');
              } else {
                row.push(0);
              }
            } else if (currentMoment.date() <= daysInMonth && currentMoment.month() === currentMonth && currentMoment.year() === currentYear){
              row.push({dayInMonth: currentMoment.date(), hasEvents: false});
              currentMoment = currentMoment.add(1, 'day');
            } else {
              row.push(0);
            }
          }
          //console.log("adding row: " + JSON.stringify(row));
          this.monthRows.push(row);
        }
        //console.log(`working with ${year} as year and ${month} as month, days in month: ${daysInMonth} , first date week day is: ${selectedMoment.weekday()}. `);
      },
      async queryEvents() {
        this.isLoading = true;
        const storage = this.$store.state.AnnualPlannerVuex.filtersData;
        let filters = { filters: {
            year: storage.year,
            month: storage.month,
            holidays: this.holidaysSelectDisplayed ? storage.holidays : [],
            countries: this.selectedCountries ? storage.countries : [],
            eventTypes: this.selectedEventTypes ? storage.eventTypes : []
          }};
        //console.log("filters: " + filters);
        let calendarId = this.auth.user.defaultCalendarId;
        this.$http.post(`${process.env.SERVER_URL}/1/calendars/${calendarId}/events?q=`, filters, { headers: this.auth.getAuthHeader() })
          .then(response => response.data)
          .then((json) => {

            let eventsMap = {};
            if (json.events) {
              json.events.forEach(function(event){
                let eventStartMillis = event.eventStartMillis;
                let eventStartDate = new Date(eventStartMillis);
                let eventDateStamp = `${eventStartDate.getFullYear()}${eventStartDate.getMonth().padStart(2,'0')}${eventStartDate.getDate().padStart(2,'0')}`;
                if (eventsMap[eventDateStamp] === undefined){
                  eventsMap[eventDateStamp] = {
                    editables: [],
                    nonEditables: []
                  };
                }

                if (event.editable) {
                  eventsMap[eventDateStamp].editables.push(new CalendarEvent(event));
                } else {
                  eventsMap[eventDateStamp].nonEditables.push(new CalendarEvent(event));
                }
              });
            }

            //this.yearlyCalendarDays = this.calcCalendarDays(this.selectedYear, eventsMap);
            this.calendarEvents = eventsMap;
            console.log(eventsMap);
            this.isLoading = false;
            this.ready = true;
          });
      }
    },
    computed: {
      ...mapState('AnnualPlannerVuex', ['filtersData']),
    },
    watch: {
      year(newVal, oldVal){
        this.selectYearMonth(this.year, this.month);
        this.queryEvents();
      },
      month(newVal, oldVal){
        this.selectYearMonth(this.year, this.month);
        this.queryEvents();
      },
    }
  };
</script>
<style lang="scss">

</style>
