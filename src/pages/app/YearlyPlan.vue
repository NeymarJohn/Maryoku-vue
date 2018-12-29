<template>
  <div class="md-layout">
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
              <td v-for="(month,idx) in $moment.monthsShort()" class="month-column" style="padding:0;height: inherit;">
                <!--<span class="cell-date-number" :class="[{'cell-date-number-hidden' : dayObj.weekdayObj[idx] === '0'}]">{{dayObj.weekdayObj[idx]}}</span>
                <div class="cell cell-active" v-if="dayObj.weekdayObj[idx] !== '0'" :ref="`ref${dayObj.year}${(idx+1).padStart(2,'0')}${dayObj.weekdayObj[idx].padStart(2,'0')}`">
                </div>
                <div class="cell" v-else></div>-->
                <div class="cell cell-active">
                  <span class="cell-date-number" :class="[{'cell-date-number-hidden' : dayObj.weekdayObj[idx] === '0'}]">{{dayObj.weekdayObj[idx]}}</span>
                  <span :class="[{'cell-date-number-hidden' : dayObj.weekdayObj[idx] === '0'}]"></span>
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

  export default {
    components: {
    },
    data() {
      return {
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
      this.yearlyCalendarDays = this.calcCalendarDays(this.selectedYear);
      let that = this;
      setTimeout(function(){
        console.log(that.$refs['ref20180101']);
        that.$refs['ref20180101'][0].innerHTML = "Abc very long very long";
      },1000);
    },
    methods: {
      calcCalendarDays(year) {

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
                  weekdayObj[month] = `${theDate.getDate()}`;
                  monthCounters[month].counter++;
                } else {
                  weekdayObj[month] = '0';
                }
              } else {
                weekdayObj[month] = '0';
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
<style >

  .calendar-grid table {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .calendar-grid td {
    text-align: center;
    border: 1px dotted #ccc;
  }

  .calendar-grid th {
    text-align: center;
    border: 1px dotted #ccc;
  }

  .calendar-grid .weekday-column {
    width: 2.5%;
    min-width: 2.5%;
    max-width: 2.5%;
    overflow: hidden;
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

  .calendar-grid td:hover {
    border: 1px solid lightblue;
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
