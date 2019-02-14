<template>
  <div class="md-layout" style="overflow: hidden; height: 100%;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>
    <table style="width: 100%; height: 100%; padding-left: 15px;" >
      <tr style="height: 10%;">
        <td>
          <table style="width: 100%; height: 100%;">
            <tr>
              <td style="width: 80%;min-width: 80%;max-width: 80%;padding-right: 15px;" colspan="2">
                <filters-panel @filters-changed-event="refreshEvents"></filters-panel>
              </td>
              <td style="width: 20%;min-width: 20%;max-width: 20%; padding-left: 15px;">
                <md-button class="md-success" @click="openEventModal" style="width: 100%; height: 100%; margin-left: -6px; margin-top: 5px; font-size: 21px; font-weight: 500; white-space: normal;">Create New Event</md-button>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr style="height: 90%;">
        <td>
          <table style="width: 100%; height: 100%;">
            <tr>
              <td style="width: 20%; max-width: 20%; padding-right: 15px;">
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
                                    <md-button v-if="monthDay.dayInMonth === 1" :ref="`month-day-${monthDay.dayInMonth}`" class="md-grey md-just-icon md-round md-md">
                                      {{monthDay.dayInMonth}}
                                      </md-button>
                                    <md-button v-else-if="monthDay.events.editables.length" @click="openEditEventModal(true, monthDay.events.editables[0])" v-bind:class="{ 'multiple-events': multipleEvents(monthDay.events.editables.length) }" :ref="`month-day-${monthDay.dayInMonth}`" class="md-success md-just-icon md-round md-md">
                                      {{monthDay.dayInMonth}}
                                    </md-button>
                                    <md-button v-else-if="monthDay.events.nonEditables.length" @click="openEditEventModal(true, monthDay.events.nonEditables[0])" v-bind:class="{ 'multiple-events': multipleEvents(monthDay.events.nonEditables.length) }" :ref="`month-day-${monthDay.dayInMonth}`" class="md-grey md-just-icon md-round md-md">
                                      {{monthDay.dayInMonth}}
                                    </md-button>
                                  </template>
                                  <template v-else>
                                    <md-button :ref="`month-day-${monthDay.dayInMonth}`" class="md-simple md-round  md-just-icon md-md">
                                      {{monthDay.dayInMonth}}
                                    </md-button>
                                  </template>
                                </template>
                                <template v-else>
                                  <md-button :ref="`month-day-${monthDay.dayInMonth}`" class="md-simple md-round  md-just-icon md-md" disabled="disabled"></md-button>
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
              <td style="width: 20%;max-width: 20%;">
                <table style="width: 100%; height: 100%;">
                  <tr style="height: 85%;">
                    <td>
                      <month-events-panel :calendar-events="calendarEvents"></month-events-panel>
                    </td>
                  </tr>
                  <tr style="height: 15%;">
                    <td style="padding-top: 15px;">
                      <md-button class="md-success md-sm disabled" disabled="disabled" style="width: 99%; height: 45%; margin-top: 0; font-weight: 500;">Import Events</md-button>
                      <md-button class="md-success md-sm" style="width: 99%; height: 45%; margin-top: 0; font-weight: 500;" @click="exportToExcel">Export To Excel</md-button>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
      <event-modal
              @refresh-events="refreshEvents"
              :occasionOptions="occasionsArray"
              :currenciesOptions="currenciesArray"
              ref="eventModal">
      </event-modal>
  </div>
</template>

<script>
  import auth from '@/auth';
  import EventModal from './EventModal/';
  import VueElementLoading from 'vue-element-loading';
  import ChartComponent from '@/components/Cards/ChartComponent';
  import CalendarFiltersPanel from './CalendarFiltersPanel';
  import moment from 'moment';
  import CalendarEvent from '@/models/CalendarEvent';
  import Occasion from '@/models/Occasion';
  import Currency from "@/models/Currency";

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
      EventModal
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
      },
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
        occasionsArray: null,
        currenciesArray: null,
        holidaysSelectDisplayed: true,
        selectedCountries: true,
        selectedEventTypes: true,
      }
    },
    created() {
      this.$store.registerModule('AnnualPlannerVuex', AnnualPlannerVuexModule);

      let occasions = '';

      if (this.$store.state.occasionsArray === null) {
        occasions = Occasion.get().then((occasions) => {
          this.$store.state.occasionsArray = occasions;
          this.occasionsArray = occasions;
        });
      } else {
        this.occasionsArray = this.$store.state.occasionsArray;
      }

      let currencies = '';

      if (this.$store.state.currenciesArray === null) {
        currencies = Currency.get().then((currencies) => {
          this.$store.state.currenciesArray = currencies;
          this.currenciesArray = currencies;
        });
      } else {
        this.currenciesArray = this.$store.state.currenciesArray;
      }
    },
    mounted(){
      this.ready = true;
      this.isLoading = true;
      this.selectYearMonth(this.year, this.month);
    },
    methods: {
      ...mapMutations('AnnualPlannerVuex', ['setEventModal', 'setEditMode', 'setModalSubmitTitle', 'setEventModalAndEventData']),
      ...mapActions('AnnualPlannerVuex', ['setEventModalAndEventData']),
      exportToExcel() {
        let calendarId = this.auth.user.defaultCalendarId;

        window.open(
          `${process.env.SERVER_URL}/1/calendars/${calendarId}/export/2019`
        );
      },
      refreshEvents(){
        this.selectYearMonth(this.year, this.month);
        this.queryEvents();
      },
      selectYearMonth(year, month){
        let selectedMoment = moment().date(1).month(month-1).year(year);
        let currentMonth = selectedMoment.month();
        this.currentMonthName = selectedMoment.format('MMMM');
        this.currentMonth = currentMonth+1;
        this.currentYear = year;

        const filtersData = this.$store.state.AnnualPlannerVuex.filtersData;

        filtersData.year = parseInt(year);
        filtersData.month = parseInt(month);
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
        let calendarId = this.auth.user.defaultCalendarId;
        this.$http.post(`${process.env.SERVER_URL}/1/calendars/${calendarId}/events?q=`, filters, { headers: this.auth.getAuthHeader() })
          .then((response) => {
            let eventsMap = {};
            if (response.data.events) {
              response.data.events.forEach(function(event){
                let eventStartMillis = event.eventStartMillis;
                let eventStartDate = new Date(eventStartMillis);
                let eventDateStamp = moment(eventStartDate).format('YYYYMMDD');
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

            this.calendarEvents = eventsMap;

            this.generateRows(this.year, this.month);
            this.isLoading = false;
            this.ready = true;
          }).catch((error) => {
            console.log(error);
          });
      },
      generateRows(year, month) {
        let selectedMoment = moment().date(1).month(month-1).year(year);

        let daysInMonth = selectedMoment.daysInMonth();
        let currentMonth = selectedMoment.month();
        let currentYear = selectedMoment.year();

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
            } else if (this.selectedDay(currentMoment).hasEvents) {
              row.push({dayInMonth: currentMoment.date(), hasEvents: true, events: this.selectedDay(currentMoment).events});
              currentMoment = currentMoment.add(1, 'day');
            } else if (currentMoment.date() <= daysInMonth && currentMoment.month() === currentMonth && currentMoment.year() === currentYear){
              row.push({dayInMonth: currentMoment.date(), hasEvents: false});
              currentMoment = currentMoment.add(1, 'day');
            } else {
              row.push(0);
            }
          }
          
          this.monthRows.push(row);
        }
      },
      selectedDay(currentMoment) {
        let currentDay = moment(currentMoment).format('YYYYMMDD');
        let eventsMap = Object.keys(this.calendarEvents);
        let calendarEventsMap = {}

        if (eventsMap.includes(currentDay)) {
          calendarEventsMap = {'hasEvents': true, 'events': this.calendarEvents[currentDay]}
        }

        return calendarEventsMap;
      },
      openEventModal() {
        this.setEventModal({ showModal: true })
        this.setModalSubmitTitle('Save')
        this.setEditMode({ editMode: false })
      },
      openEditEventModal: function (show, item) {
        this.setEventModalAndEventData({showModal: show, eventData: item});
      },
      openEditEventModal: function (show, item) {
        this.setEventModalAndEventData({showModal: show, eventData: item});
      },
      multipleEvents(length) {
        return length > 1;
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
  .md-grey {
    background-color: #e0e0e0;
  }
  .vue-tooltip.tooltip-custom-non-editable {
    background-color: #fff;
    border: 1px solid #aaa;
    color: black;
    font-size: 14px;
    font-weight: 400;
  }

  .vue-tooltip.tooltip-custom-non-editable .tooltip-arrow {
    border-color: #aaa;
  }

  .vue-tooltip.tooltip-custom-editable {
    background-color: #fefefe;
    border: 1px solid #03a9f4;
    color: black;
    font-size: 14px;
    font-weight: 500;
  }

  .vue-tooltip.tooltip-custom-editable .tooltip-arrow {
    border-color: #03a9f4;
  }
  .multiple-events {
    border:2px solid red;
  }
</style>
