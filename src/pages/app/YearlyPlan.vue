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
                          required/>
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-15">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Annual Budget Per Employee</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                          required/>
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-15">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Events</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                          required/>
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-15">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Remaining Budget Per Employee</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                          required/>
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-20">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Total Remaining Budget</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                          required/>
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-15">
              <md-field :class="[{'md-error': errors.has('eventName')}]">
                <label>Total Remaining Budget</label>
                <md-input v-model="form.eventName"
                          data-vv-name="eventName"
                          v-validate= "modelValidations.eventName"
                          required/>
                <span class="md-error" v-if="errors.has('eventName')">The event title is required</span>
              </md-field>
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
        <md-card-content>Filters</md-card-content>
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
              <th class="month-column" v-for="(month,idx) in $moment.monthsShort()" >{{month}}</th>
            </tr>
            <tr v-for="(dayObj,idx) in yearlyCalendarDays" :class="{'weekend-row' : weekendDays[dayObj.weekday]}" style="height: 1px;">
              <td class="weekday-column cell-weekday">{{$moment.weekdaysShort(dayObj.weekday)}}</td>
              <td v-for="(month,idx) in $moment.monthsShort()" class="month-column" style="padding:0;height: inherit;" :class="{'event-cell' : dayObj.weekdayObj[idx].exists && dayObj.weekdayObj[idx].calendarEvents}">

                <div v-if="dayObj.weekdayObj[idx].exists && dayObj.weekdayObj[idx].calendarEvents" class="cell cell-active event-cell" :ref="`ref${dayObj.year}${(idx+1).padStart(2,'0')}${dayObj.weekdayObj[idx].exists ? dayObj.weekdayObj[idx].dayOnMonth.padStart(2,'0') : '_'}`">
                  <span class="cell-date-number event-cell" :class="[{'cell-date-number-hidden' : !dayObj.weekdayObj[idx].exists}]">{{dayObj.weekdayObj[idx].dayOnMonth}}</span>
                  <span class="event-cell" :ref="`ref${dayObj.year}${(idx+1).padStart(2,'0')}${dayObj.weekdayObj[idx].exists ? dayObj.weekdayObj[idx].dayOnMonth.padStart(2,'0') : '_'}_text`" :class="[{'cell-date-number-hidden' : !dayObj.weekdayObj[idx].exists}]">
                    <router-link :to="{path: `/events/${dayObj.weekdayObj[idx].calendarEvents[0].id}/edit`}">{{dayObj.weekdayObj[idx].calendarEvents[0].title}}</router-link>
                    <md-tooltip direction="left">{{dayObj.weekdayObj[idx].calendarEvents[0].title}}</md-tooltip>
                  </span>
                </div>

                <div v-else class="cell cell-active" :ref="`ref${dayObj.year}${(idx+1).padStart(2,'0')}${dayObj.weekdayObj[idx].exists ? dayObj.weekdayObj[idx].dayOnMonth.padStart(2,'0') : '_'}`">
                  <span class="cell-date-number" :class="[{'cell-date-number-hidden' : !dayObj.weekdayObj[idx].exists}]">{{dayObj.weekdayObj[idx].dayOnMonth}}</span>
                </div>
              </td>
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
  import VueElementLoading from 'vue-element-loading';
  export default {
    components: {
      VueElementLoading,

    },
    data() {
      return {
        auth: auth,
        isLoading: true,
        selectedYear: new Date().getFullYear(),
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
    mounted(){
      //this.$store.state.calendarId = this.auth.user.defaultCalendarId;
      this.auth.currentUser(this, true, function() {
        let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});

        _calendar.calendarEvents().get().then(events => {
          let eventsMap = {};
          events.forEach(function(event){
            let eventStartMillis = event.eventStartMillis;
            let eventStartDate = new Date(eventStartMillis);
            let eventDateStamp = `${eventStartDate.getFullYear()}${eventStartDate.getMonth().padStart(2,'0')}${eventStartDate.getDate().padStart(2,'0')}`;
            if (eventsMap[eventDateStamp] === undefined){
              eventsMap[eventDateStamp] = [];
            }
            eventsMap[eventDateStamp].push(event);
          });

          this.yearlyCalendarDays = this.calcCalendarDays(this.selectedYear, eventsMap);
          this.isLoading = false;
        }).catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
      }.bind(this))
    },
    methods: {
      routeToNewEvent() {
        this.$store.state.eventData = {
          id: null,
          calendar: {id: null},
          title: null,
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

    &.event-cell {
      background-color: blue;
      color: white;

      &:hover {
        background-color: blue;
      }
    }
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
    background-color: rgba(255, 223, 233, 0.5);
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
    background-color: blue;
    color: white;
    font-weight: 500;
  }

  .calendar-grid td:hover {
    background-color: #e3f2fd;
  }

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
