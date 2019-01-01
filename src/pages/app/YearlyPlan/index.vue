<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
    <div class="md-layout-item md-size-100 text-right">
      <md-button class="md-success text-success" @click="routeToNewEvent()">
        <md-icon>add_circle</md-icon>
        Create New Event
      </md-button>
    </div>
    <div class="md-layout-item md-size-100">
      <md-card style="margin-bottom: 0;">
        <md-card-header class="md-card-header-text md-card-header-rose">
          <div class="card-text">
            <h6 class="title2">Budget Control</h6>
          </div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-20">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Total Annual Budget</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                />
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-25">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Annual Budget Per Employee</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                />
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>

            <!--<div class="md-layout-item md-size-15">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Events</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                          required/>
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>-->

            <div class="md-layout-item md-size-25">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Remaining Budget Per Employee</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                />
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-20">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Total Remaining Budget</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                />
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>

            <!--<div class="md-layout-item md-size-20">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Total Remaining Budget</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                          required/>
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>-->
            <div class="md-layout-item md-size-10" style="max-height: 160px;">
              <chart-component
                class=""
                :chart-data="pieChart.data"
                :chart-options="pieChart.options"
                chart-type="Pie"/>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>

    <div class="md-layout-item md-size-100 ">
      <md-card style="margin-bottom: 0;">
        <md-card-header class="md-card-header-text md-card-header-rose">
          <div class="card-text">
            <h6 class="title2">Filters</h6>
          </div>
        </md-card-header>
        <md-card-content>

          <div class="md-layout">
            <div class="md-layout-item md-size-10">
              <md-field>
                <label for="year">Year</label>
                <md-select

                  v-model="selectedYear"
                  data-vv-name="year"
                  id="year"
                  name="year"
                  @md-selected="filtersChanged = true">
                  <md-option v-for="year in years" :key="year.item" :value="parseInt(year.item)" >{{year.item}}</md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item md-size-25">
              <md-field>
                <label for="eventType">Event Types</label>
                <md-select

                  v-model="selectedEventTypes"
                  data-vv-name="eventType"
                  id="eventType"
                  name="eventType"
                  @md-selected="filtersChanged = true" multiple>
                  <md-option v-for="eventType in eventTypes" :key="eventType.item" :value="eventType.item" >{{eventType.item}}</md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item md-size-30">
              <md-field>
                <label for="countries">Countries</label>
                <md-select

                  v-model="selectedCountries"
                  data-vv-name="countries"
                  id="countries"
                  name="countries"
                  @md-selected="filtersChanged = true" multiple >
                  <md-option v-for="country in countries" :key="country.item" :value="country.item" >{{country.item}}</md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item md-size-30">
              <md-field v-if="holidaysSelectDisplayed">
                <label for="holidays" disabled>Holidays</label>
                <md-select
                  v-model="selectedHolidays"
                  data-vv-name="holidays"
                  id="holidays"
                  name="holidays"
                  @md-selected="filtersChanged = true" multiple>
                  <md-option v-for="holiday in holidays" :key="holiday.item" :value="holiday.item" >{{holiday.item}}</md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item md-size-5">
              <md-button class="md-info md-just-icon md-round" :disabled="!filtersChanged" @click="selectYear"><md-icon >refresh</md-icon></md-button>
            </div>
          </div>

        </md-card-content>
      </md-card>
    </div>

    <div class="md-layout-item md-size-100 ">
      <md-card >
        <md-card-header class="md-card-header-text md-card-header-rose">
          <div class="card-text">
            <h6 class="title2">Year Calendar</h6>
          </div>
        </md-card-header>
        <md-card-content>

          <md-table class="calendar-grid" style="">
            <tr>
              <th class="weekday-column" style="border-top: none; border-left: none; border-radius: 6px; color: #ddd;">{{selectedYear}}</th>
              <th class="month-column" v-for="(month,idx) in $moment.monthsShort()" :key="idx">{{month}}</th>
            </tr>
            <tr v-for="(dayObj,idx) in yearlyCalendarDays" :key="idx" :class="{'weekend-row' : weekendDays[dayObj.weekday]}" style="height: 1px;">
              <td class="weekday-column cell-weekday">{{$moment.weekdaysShort(true,dayObj.weekday)}}</td>
              <!--<template v-for="(month,idx) in $moment.monthsShort()">
                <td v-if="dayObj.weekdayObj[idx].exists && dayObj.weekdayObj[idx].calendarEvents" v-tooltip="dayObj.weekdayObj[idx].calendarEvents[0].title" class="month-column" style="padding:0;height: inherit;" :class="{'event-cell' : dayObj.weekdayObj[idx].exists && dayObj.weekdayObj[idx].calendarEvents}">
                  <div  class="cell cell-active event-cell" :ref="`ref${dayObj.year}${(idx+1).padStart(2,'0')}${dayObj.weekdayObj[idx].exists ? dayObj.weekdayObj[idx].dayOnMonth.padStart(2,'0') : '_'}`">
                    <span class="cell-date-number event-cell" :class="[{'cell-date-number-hidden' : !dayObj.weekdayObj[idx].exists}]">{{dayObj.weekdayObj[idx].dayOnMonth}}</span>
                    <span class="event-cell" :ref="`ref${dayObj.year}${(idx+1).padStart(2,'0')}${dayObj.weekdayObj[idx].exists ? dayObj.weekdayObj[idx].dayOnMonth.padStart(2,'0') : '_'}_text`" :class="[{'cell-date-number-hidden' : !dayObj.weekdayObj[idx].exists}]">
                    <router-link :to="{path: `/events/${dayObj.weekdayObj[idx].calendarEvents[0].id}/edit`}">{{dayObj.weekdayObj[idx].calendarEvents[0].title}}</router-link>
                      &lt;!&ndash;<md-tooltip direction="left">{{dayObj.weekdayObj[idx].calendarEvents[0].title}}</md-tooltip>&ndash;&gt;
                  </span>
                  </div>
                </td>
                <td v-else class="month-column" style="padding:0;height: inherit;">
                  <div class="cell cell-active" :ref="`ref${dayObj.year}${(idx+1).padStart(2,'0')}${dayObj.weekdayObj[idx].exists ? dayObj.weekdayObj[idx].dayOnMonth.padStart(2,'0') : '_'}`">
                    <span class="cell-date-number" :class="[{'cell-date-number-hidden' : !dayObj.weekdayObj[idx].exists}]">{{dayObj.weekdayObj[idx].dayOnMonth}}</span>
                  </div>
                </td>
              </template>-->
              <template v-for="(month,idx) in $moment.monthsShort()">
                <template v-if="dayObj.weekdayObj[idx].exists">
                  <template v-if="dayObj.weekdayObj[idx].calendarEvents">
                  <non-editable-event :calendarEvents="dayObj.weekdayObj[idx].calendarEvents"
                                    :the-date="`${selectedYear}-${idx.padStart(2,'0')}-${dayObj.weekdayObj[idx].dayOnMonth.padStart(2,'0')}`"
                                    :day-on-month="dayObj.weekdayObj[idx].dayOnMonth"/>
                  </template>
                  <template v-else>
                    <td class="month-column" style="padding:0;height: inherit;">
                      <div class="cell cell-active" >
                        <span class="cell-date-number">{{dayObj.weekdayObj[idx].dayOnMonth}}</span>
                      </div>
                    </td>
                  </template>
                </template>
                <template v-else>
                  <empty-cell/>
                </template>
              </template>
            </tr>
          </md-table>

        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-100 ">

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
  import NonEditableEvent from './CalendarCellNonEditableEvent';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import yearlyPlanVuexModule from './yearlyPlan.vuex'
  import EmptyCell from './CalendarCellEmpty';
  import EditableEvent from './CalendarCellEditableEvent';

  export default {
    components: {
      EditableEvent,
      EmptyCell,
      NonEditableEvent,
      VueElementLoading,
      ChartComponent,
    },
    data() {
      return {
        ready: false,
        auth: auth,
        isLoading: true,
        filtersChanged: false,
        selectedYear: this.$route.params.year || new Date().getFullYear(),
        years: [],
        eventTypes: [],
        selectedEventTypes: [],
        countries: [],
        selectedCountries: [],
        holidays: [],
        selectedHolidays: [],
        holidaysSelectDisplayed: true,
        yearlyCalendarDays: null,
        weekendDays : [false, false, false, false, false, true, true],
        form: {
          eventName: ""
        },
        modelValidations: {
          eventName: {
            required: true,
          }
        },
        months : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekDays : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    created() {
      this.$store.registerModule('yearlyPlanVuex', yearlyPlanVuexModule);
    },
    mounted(){
      console.log("mounted !");
      this.ready = false;
      this.filtersChanged = false;
      //this.$store.state.calendarId = this.auth.user.defaultCalendarId;
      this.auth.currentUser(this, true, function() {

        let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});

        _calendar.metadata().get().then(metadatas => {

          let metadata = metadatas[0];

          console.log(metadata);
          console.log(metadata.eventTypes);

          this.years = metadata.years;
          this.selectedYear = new Date().getFullYear();

          this.eventTypes = metadata.eventTypes;
          this.selectedEventTypes = this.eventTypes.map(function(entry){ return entry.item;});
          this.holidaysSelectDisplayed = true;

          this.countries = metadata.countries;
          this.selectedCountries = this.countries.map(function(entry){ return entry.item;});

          this.holidays = metadata.holidays;
          this.selectedHolidays = this.holidays.map(function(entry){ return entry.item;});

          this.ready = true;
          this.selectYear();
        });

      }.bind(this))
    },
    methods: {
      selectYear($e) {
        if (!this.ready) return;
        this.filtersChanged = false;
        this.isLoading = true;
        let filters = { filters: {
            year: parseInt(this.selectedYear),
            holidays: this.holidaysSelectDisplayed ? this.selectedHolidays : [],
            countries: this.selectedCountries,
            eventTypes: this.selectedEventTypes
          }};
        console.log("filters: " + filters);
        let calendarId = this.auth.user.defaultCalendarId;
        this.$http.post(`${process.env.SERVER_URL}/1/calendars/${calendarId}/events?q=`, filters, { headers: this.auth.getAuthHeader() })
          .then(response => response.data)
          .then((json) => {
            console.log(json);
            let eventsMap = {};
            if (json.events) {
              json.events.forEach(function(event){
                let eventStartMillis = event.eventStartMillis;
                let eventStartDate = new Date(eventStartMillis);
                let eventDateStamp = `${eventStartDate.getFullYear()}${eventStartDate.getMonth().padStart(2,'0')}${eventStartDate.getDate().padStart(2,'0')}`;
                if (eventsMap[eventDateStamp] === undefined){
                  eventsMap[eventDateStamp] = [];
                }
                eventsMap[eventDateStamp].push(new CalendarEvent(event));
              });
            }

            this.yearlyCalendarDays = this.calcCalendarDays(this.selectedYear, eventsMap);
            this.isLoading = false;
          });
      },
      selectEventTypes($e) {
        this.holidaysSelectDisplayed = this.selectedEventTypes.indexOf("Holiday") > -1;
        this.selectYear(null);
      },
      selectCountries($e) {
        this.selectYear(null);
      },
      selectHolidays($e) {
        this.selectYear(null);
      },
      routeToNewEvent() {
        this.$store.state.eventData = {
          id: null,
          calendar: {id: null},
          title: "Jamil",
          eventStartMillis: null,
          eventEndMillis: null,
          eventType: null,
          numberOfParticipants: null,
          totalBudget: null,
          status: null,
          components: null,
        },
          this.$router.push({ path: `/events/new` });
      },
      calcCalendarDays(year, eventsMap) {

        let calDays = [];
        let hasMoreDays = {};
        let monthCounters = [];

        for (let monthCounter=0; monthCounter < 12; monthCounter++) {
          let theDate = new Date(year, monthCounter+1,0,0,0,0,0);
          monthCounters[monthCounter] = { counter: 1, lastMonthDay: theDate.getDate()};
        }

        let preventLoop = 0;

        while (Object.keys(hasMoreDays).length < 12 && preventLoop < 3650) {

          preventLoop++;

          for (let weekday=0; weekday < 7; weekday++){
            let weekdayObj = {};
            for (let month=0; month < 12; month++){
              if (monthCounters[month].counter <= monthCounters[month].lastMonthDay) {
                let theDate = new Date(year, month, monthCounters[month].counter, 0, 0, 0, 0);

                if (theDate.getDay() === weekday) {
                  weekdayObj[month] = { exists: true, dayOnMonth: `${theDate.getDate()}`};
                  monthCounters[month].counter++;

                  let theDateStamp = `${theDate.getFullYear()}${theDate.getMonth().padStart(2,'0')}${theDate.getDate().padStart(2,'0')}`;
                  weekdayObj[month].calendarEvents = eventsMap[theDateStamp];

                } else {
                  weekdayObj[month] = {exists: false};
                }
              } else {
                weekdayObj[month] = {exists: false};
                hasMoreDays[month] = '';
              }

              if (Object.keys(hasMoreDays).length === 12){
                break;
              }
            }

            if (Object.keys(hasMoreDays).length === 12){
              break;
            }
            calDays.push({year: year, weekday: weekday, weekdayObj: weekdayObj});
          }

        }

        return calDays;
      }
    },
    computed: {
      ...mapState('yearlyPlanVuex', ['filtersData']),
      pieChart() {
        return {
          data: {
            labels: [" ", " "], // should be empty to remove text from chart
            series: [8900, 780]
          },
          options: {
            padding: 0,
            height: 80,
            donut: true,
            donutWidth: 10
          }
        }
      },
    }
  };
</script>
<style lang="scss">

  .calendar-grid table {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .calendar-grid td {
    border: 1px dotted #aaa;
    text-align: left;

    /*&.event-cell {
      background-color: transparent;
      color: #bdbdbd;

      &:hover {
        background-color: transparent;
      }
    }*/
  }

  .calendar-grid th {
    text-align: center;
    border: 1px dotted #aaa;
  }

  .calendar-grid .weekday-column {
    width: 2.5%;
    min-width: 2.5%;
    max-width: 2.5%;
    overflow: hidden;
    text-align: center;
  }

  .calendar-grid .month-column {
    width: 1px;
    min-width: 1px;
    max-width: 1px;

  }

  .calendar-grid td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .calendar-grid .weekend-row {
    background-color: rgba(239, 239, 239, 0.7);
  }

  .calendar-grid .cell {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    height: 100%;
    position: relative;
    padding: 0;
    margin: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline;
  }

  .calendar-grid .cell-active {
    cursor: pointer;
  }

  .calendar-grid .event-cell {
    cursor: pointer;
    color: #ccc !important;
    font-weight: 500;
    top: 3px;
  }

  .calendar-grid a {
    color: #bdbdbd !important;
  }

  /*.calendar-grid td:hover {
    background-color: #e1f5fe;
  }*/

  .calendar-grid .cell-date-number {
    float: left;
    font-size: 12px;
    font-weight: 500;
    color: #999;
    padding: 3px 6px;
  }

  .calendar-grid .cell-date-number-hidden {
    visibility: hidden;
    display: none;
  }

  .calendar-grid .cell-weekday {
    font-size: 12px;
    font-weight: 500;
  }
</style>
