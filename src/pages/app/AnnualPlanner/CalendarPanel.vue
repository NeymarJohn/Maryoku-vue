<template>
  <div class="md-layout" style="height: 100%; overflow: hidden; padding: 0; margin: 0;">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <div class="md-layout-item md-size-100" style="padding: 0; margin: 0;">

      <div class="md-layout" style="height: 100%; overflow: hidden;">

        <div class="md-layout-item md-size-80" style="height: 15%; padding: 0; padding-right: 7.5px; padding-bottom: 7.5px;">
          <md-card style="padding: 0; margin: 0; height: 100%;">
            <md-card-content>

            <md-field>
              <md-select


                data-vv-name="eventType"
                id="eventType"
                name="eventType" multiple>
                <md-option>Holidays</md-option>
                <md-option>Civil Days</md-option>
                <md-option>Company Events</md-option>
                <md-option>Personal Days</md-option>
              </md-select>
            </md-field>

          </md-card-content>
          </md-card>
        </div>

        <div class="md-layout-item md-size-20" style="height: 15%; padding-left: 7.5px; padding-bottom: 7.5px; padding-right: 0;">
          <md-button class="md-success" style="width: 99%; height: 100%; margin-top: 0; font-size: 21px; font-weight: 500; white-space: normal;">Create New Event</md-button>
        </div>

        <div class="md-layout-item md-size-80" style="height: 85%;  padding: 0; margin: 0;">

          <div class="md-layout" style="height: 100%; overflow: hidden;">

            <div class="md-layout-item md-size-20" style="height: 100%;  padding: 0; padding-right: 7.5px; padding-top: 7.5px;">
              <md-card  style="overflow: auto; padding: 0; margin: 0; height: 100%;">
                <md-card-content style="width: 100%; padding: 0; margin: 0;text-align: center; vertical-align: middle;">

                  <md-button class="md-simple md-sm md-just-icon md-round" style="height: 55px;"><i class="fa fa-chevron-left fa-2x"></i></md-button>
                  <md-button class="md-simple md-round year-button" style="font-size: 21px !important; height: 55px; font-weight: 500; padding: 0;">{{currentYear}}</md-button>
                  <md-button class="md-simple md-sm md-just-icon md-round" style="height: 55px; font-weight: 100;"><i class="fa fa-chevron-right"></i></md-button>

                  <hr style="margin-top: 0; margin-left: 18px; margin-right: 18px; border-color: lightgray; border-top: none; border-left: none; border-right: none;" class="divider"/>

                  <md-list style="width: 100%; padding: 0; margin: 0;">
                    <md-list-item v-for="(month, idx) in $moment.months()" :ref="`month_${idx}`" :class="{'selected-month' : currentMonth === idx+1, 'month' : currentMonth !== idx+1}">
                      <router-link :to="{name: 'AnnualPlanner', params: {year: currentYear, month: idx+1}}" style="width: 100%;">
                        <div :class="{'selected-month-item' : currentMonth === idx+1, 'item' : currentMonth !== idx+1}">{{month}} <div class="pull-right" :ref="`month_${idx}_count`">0</div></div>
                      </router-link>
                    </md-list-item>

                  </md-list>
                </md-card-content>
              </md-card>
            </div>

            <div class="md-layout-item md-size-80" style="height: 100%; padding: 0; margin: 0;">

              <div class="md-layout" style="height: 100%; overflow: hidden;">

                <div class="md-layout-item md-size-100" style="height: 90%; padding: 7.5px;">
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
                </div>

                <div class="md-layout-item md-size-100" style="height: 10%; padding: 0; padding-left: 7.5px; padding-right: 7.5px; padding-top: 7.5px;">
                  <md-card style="padding: 0; margin: 0; height: 100%;">
                    <md-card-content style="text-align: center;">
                      <md-button class="md-simple md-sm md-warning"><i class="fa fa-square" style="margin-right: 5px;"></i> Holidays</md-button>
                      <md-button class="md-simple md-sm md-info"><i class="fa fa-square" style="margin-right: 5px;"></i> Civil Days</md-button>
                      <md-button class="md-simple md-sm md-success"><i class="fa fa-square" style="margin-right: 5px;"></i> Company Events</md-button>
                      <md-button class="md-simple md-sm md-primary"><i class="fa fa-square" style="margin-right: 5px;"></i> Personal Schedule</md-button>
                    </md-card-content>
                  </md-card>
                </div>
              </div>

            </div>

          </div>

        </div>

        <div class="md-layout-item md-size-20" style="height: 85%; padding: 0; margin: 0;">

          <div class="md-layout" style="height: 100%; overflow: hidden;">
            <div class="md-layout-item md-size-100" style="height: 90%; padding: 7.5px; padding-right: 0;">
              <md-card style="padding: 0; margin: 0; height: 100%;">
                <md-card-content style="text-align: center; padding: 0; margin: 0; height: 100%; overflow: hidden;">

                  <md-button class="md-simple md-round year-button disabled" style="font-size: 18px !important; font-weight: 500; padding: 8px; margin-top: 8px;">Events</md-button>

                  <hr style="margin-top: 0; margin-left: 18px; margin-right: 18px; border-color: lightgray; border-top: none; border-left: none; border-right: none;" class="divider"/>

                  <md-list class="md-triple-line md-dense" style="overflow: auto; height: 88%;">

                    <md-list-item style="cursor: pointer;">
                      <md-button class="md-just-icon md-md md-round md-success" style="margin-right: 8px;">1</md-button>

                      <div class="md-list-item-text">
                        <span style="font-weight: 500;">Thanks Giving</span>
                        <span class="small text-gray">August 18, 2019</span>
                      </div>
                    </md-list-item>

                    <md-list-item>
                      <md-button class="md-just-icon md-md md-round md-danger" style="margin-right: 8px;">13</md-button>

                      <div class="md-list-item-text">
                        <span style="font-weight: 500;">Company Training</span>
                        <span class="small text-gray">August 13, 2019 - 5am</span>
                      </div>
                    </md-list-item>

                    <md-list-item>
                      <md-button class="md-just-icon md-md md-round md-warning" style="margin-right: 8px;">15</md-button>

                      <div class="md-list-item-text">
                        <span style="font-weight: 500;">The Assumption of Mary</span>
                        <span class="small text-gray">August 15, 2019</span>
                      </div>
                    </md-list-item>

                    <md-list-item>
                      <md-button class="md-just-icon md-md md-round md-info" style="margin-right: 8px;">24</md-button>

                      <div class="md-list-item-text">
                        <span style="font-weight: 500;">Mid Year Holiday</span>
                        <span class="small text-gray">August 24, 2019</span>
                      </div>
                    </md-list-item>

                    <md-list-item>
                      <md-button class="md-just-icon md-md md-round md-primary" style="margin-right: 8px;">26</md-button>

                      <div class="md-list-item-text">
                        <span style="font-weight: 500;">Football Finals</span>
                        <span class="small text-gray">August 26, 2019</span>
                      </div>
                    </md-list-item>

                    <md-list-item>
                      <md-button class="md-just-icon md-md md-round md-success" style="margin-right: 8px;">18</md-button>

                      <div class="md-list-item-text">
                        <span style="font-weight: 500;">Thanks Giving</span>
                        <span class="small text-gray">August 18, 2019</span>
                      </div>
                    </md-list-item>

                    <md-list-item>
                      <md-button class="md-just-icon md-md md-round md-danger" style="margin-right: 8px;">13</md-button>

                      <div class="md-list-item-text">
                        <span style="font-weight: 500;">Company Training</span>
                        <span class="small text-gray">August 13, 2019 - 5am</span>
                      </div>
                    </md-list-item>

                    <md-list-item>
                      <md-button class="md-just-icon md-md md-round md-warning" style="margin-right: 8px;">15</md-button>

                      <div class="md-list-item-text">
                        <span style="font-weight: 500;">The Assumption of Mary</span>
                        <span class="small text-gray">August 15, 2019</span>
                      </div>
                    </md-list-item>

                    <md-list-item>
                      <md-button class="md-just-icon md-md md-round md-info" style="margin-right: 8px;">24</md-button>

                      <div class="md-list-item-text">
                        <span style="font-weight: 500;">Mid Year Holiday</span>
                        <span class="small text-gray">August 24, 2019</span>
                      </div>
                    </md-list-item>

                    <md-list-item>
                      <md-button class="md-just-icon md-md md-round md-primary" style="margin-right: 8px;">26</md-button>

                      <div class="md-list-item-text">
                        <span style="font-weight: 500;">Football Finals</span>
                        <span class="small text-gray">August 26, 2019</span>
                      </div>
                    </md-list-item>

                  </md-list>

                </md-card-content>
              </md-card>
            </div>

            <div class="md-layout-item md-size-100" style="height: 10%; padding: 7.5px; padding-right: 0; padding-bottom: 0;">
              <md-button class="md-success md-sm" style="width: 99%; margin-top: 0; font-weight: 500;">Import Events</md-button>
              <md-button class="md-success md-sm" style="width: 99%; margin-top: 0; font-weight: 500;">Export To Excel</md-button>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import auth from '@/auth';
  import VueElementLoading from 'vue-element-loading';
  import ChartComponent from '@/components/Cards/ChartComponent';
  import CalendarFiltersPanel from './CalendarFiltersPanel';
  import moment from 'moment';
  import {
    AnimatedNumber
  } from "@/components";

  export default {
    name: 'calendar-panel',
    components: {
      VueElementLoading,
      ChartComponent,
      AnimatedNumber,
      CalendarFiltersPanel,
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
        currentYear: 0
      }
    },
    created() {

    },
    mounted(){
      this.ready = true;
      this.isLoading = false;
      this.selectYearMonth(this.year, this.month);
    },
    methods: {
      selectYearMonth(year, month){
        let selectedMoment = moment().date(1).month(month-1).year(year);
        let daysInMonth = selectedMoment.daysInMonth();
        let currentMonth = selectedMoment.month();
        let currentYear = selectedMoment.year();
        this.currentMonthName = selectedMoment.format('MMMM');
        this.currentMonth = currentMonth+1;
        this.currentYear = year;

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
          console.log("adding row: " + JSON.stringify(row));
          this.monthRows.push(row);
        }

        console.log(`working with ${year} as year and ${month} as month, days in month: ${daysInMonth} , first date week day is: ${selectedMoment.weekday()}. `);
      }
    },
    computed: {

    },
    watch: {
      year(newVal, oldVal){
        this.selectYearMonth(this.year, this.month);
      },
      month(newVal, oldVal){
        this.selectYearMonth(this.year, this.month);
      },
    }
  };
</script>
<style lang="scss">

</style>
