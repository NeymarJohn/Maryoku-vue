<template>
  <md-card class="md-card-profile">
    <md-card-header class="md-card-header-icon md-card-header-rose">
      <!-- <div class="card-icon" style="padding: 12px;">
          <md-icon>date_range</md-icon>
      </div> -->
      <h4 class="title profile-title title-summary">
        Event Summary
        <md-button class="md-sm md-simple md-just-icon pull-right clear-margins"  @click="openEventModal()"><md-icon class="company-logo">create</md-icon></md-button>
      </h4>
    </md-card-header>
    <md-card-content v-if="event">
      <div>
        <div class="md-layout event-info-section">
          <div class="md-layout-item summary-item">
            <div class="md-layout-item title-text">
              <i class="fa fa-calendar"></i>
            </div>
            <div class="md-layout-item">
              {{calendarEvent.eventStartMillis | formatDate}},
              {{calendarEvent.eventStartMillis | formatTime}}
              ({{calendarEvent.eventStartMillis |
              formatDuration(calendarEvent.eventEndMillis)}}h)
            </div>
          </div>

          <div class="md-layout-item summary-item">
            <div class="md-layout-item title-text">
              <i class="fa fa-map-marker-alt"></i> 
            </div>
            <div class="md-layout-item">
              {{calendarEvent.location}}
            </div>
          </div>

          <div class="md-layout-item summary-item">
            <div class="md-layout-item  title-text">
              <i class="fa fa-user"></i> 
            </div>
            <div class="md-layout-item">
              {{calendarEvent.numberOfParticipants}} {{inviteeType(calendarEvent)}}
            </div>
          </div>
          <!-- NOTE: just hiding it -->
          <!-- <div class="md-layout-item md-size-100">
            <md-button class="md-sm md-simple md-rose">
              <md-icon>cached</md-icon>
              Recurring weekly
            </md-button>
          </div> -->
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <div class="fc-divider" style="color: #eeeeee; margin: 15px 0;"></div>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <h5 class="title-budget-main">Remaining budget</h5>
            <h4 class="title budget">
              <div class="title" 
                :class="[{'title-budget-prise': percentage > 0, 'title-budget-prise-negative':percentage <= 0}]"
                v-if="calendarEvent.budgetPerPerson * calendarEvent.numberOfParticipants">
                <animated-number ref="totalRemainingBudgetNumber"
                                  :value="totalRemainingBudget"
                                  prefix="$"></animated-number>
                <small class="total-event-budget">/
                  ${{
                    calendarEvent.budgetPerPerson *
                    calendarEvent.numberOfParticipants | 
                    numeral('0,0')
                  }}
                </small>
              </div>
            </h4>

            <h5 class="title-budget-main">Per guest</h5>
            <h4
              class="title"
              style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(33, 201, 152);">
              <div class="title" 
                :class="[{'title-budget-prise': percentage > 0, 'title-budget-prise-negative':percentage <= 0}]"
                v-if="calendarEvent.budgetPerPerson * calendarEvent.numberOfParticipants">
                <animated-number ref="totalRemainingBudgetNumber"
                                  :value="remainingBudgetPerEmployee"
                                  prefix="$"></animated-number>
                <small class="total-event-budget">/
                  ${{calendarEvent.budgetPerPerson}}
                </small>
              </div>
            </h4>


            <div class="budget-pie-container"
                  style="display: grid;margin: 3em 18px;">
              <chart-component
                  :chart-data="pieChart.data"
                  :chart-options="pieChart.options"
                  chart-type="Pie"
                  style="grid-column: 1; grid-row: 1; color:red"/>
              <animated-number class="percentage" ref="percentageNumber"
                :value="percentage" suffix="%"></animated-number>
            </div>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <div class="fc-divider" style="color: #eeeeee; margin: 15px 0;"></div>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <event-paid-total-amounts :paid="event.totalBudget" :total="totalRemainingBudget"></event-paid-total-amounts>
          </div>
        </div>
      </div>
      <div class="md-layout md-gutter" style="display: none;">
        <div class="md-layout-item">
          <div>
            <div class="md-caption title-text">
              Remaining budget per participant
            </div>
            <!-- TODO Need calculate with components -->
            <div class="md-caption title-text " 
              :class="[{'title-budget-prise': percentage > 0, 'title-budget-prise-negative':percentage <= 0}]">
              <animated-number ref="budgetPerPersonNumber"
                                :value="remainingBudgetPerEmployee"
                                prefix="$"></animated-number>
            </div>
          </div>
          <div>
            <div class="md-caption title-text">Budget per participant</div>
            <div class="md-caption title-text " 
              :class="[{'title-budget-prise': percentage > 0, 'title-budget-prise-negative':percentage <= 0}]">
              <animated-number ref="budgetPerPersonNumber"
                                :value="calendarEvent.budgetPerPerson"
                                prefix="$"></animated-number>
            </div>
          </div>
          <div>
            <div class="md-caption title-text">Total budget for the event</div>
            <div class="md-caption title-text title-budget-prise">
              <animated-number ref="totalBudgetNumber"
                              :value="calendarEvent.budgetPerPerson * calendarEvent.numberOfParticipants"
                              prefix="$"></animated-number>
            </div>
          </div>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
  import EventModal from '../EventModal/';
  import EventPlannerVuexModule from '../EventPlanner.vuex';
  import moment from 'moment'

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import swal from 'sweetalert2'
  import Calendar from '@/models/Calendar'
  import CalendarEvent from '@/models/CalendarEvent'
  import EventComponent from '@/models/EventComponent'
  import ChartComponent from '@/components/Cards/ChartComponent'
  import CalendarEventStatistics from '@/models/CalendarEventStatistics'

  // import auth from '@/auth';
  import _ from 'underscore'
  import {LabelEdit, AnimatedNumber, StatsCard, ChartCard} from '@/components'
  import EventSidePanel from '../EventSidePanel.vue'
  import EventPaidTotalAmounts from '../components/EventPaidTotalAmounts.vue'

  export default {
    name: 'event-details-sidebar',
    components: {
      LabelEdit,
      AnimatedNumber,
      StatsCard,
      ChartCard,
      ChartComponent,
      CalendarEventStatistics,
      EventPaidTotalAmounts
    },
    props: {
      event: {
        type: Object,
        default: () => {
          return {statistics: {}}
        }
      },
    },
    data: () => ({
      calendarEvent: {},
      selectedComponents: [],
      eventId: null,
      percentage: 0,
      totalRemainingBudget: 0,
      remainingBudgetPerEmployee: 0,
      seriesData: [],
      isLoading: false,
      routeName: null,
      budgetPerEmployee: 0

    }),
    methods: {
      ...mapMutations('EventPlannerVuex', [
        'setEventModal',
        'setEditMode',
        'setModalSubmitTitle',
        'setEventModalAndEventData',
        'setNumberOfParticipants',
        'setEventData'
      ]),
      inviteeType(calendarEvent){
        //"Employees Only","Employees and spouse","Employees and families", "Employees children"
        let typeText = '';
        let participantsType = calendarEvent.participantsType;
        if (participantsType === 'Guests and spouse'){
          typeText = '+ spouses';
        } else if (participantsType === 'Guests and families'){
          typeText = '+ families';
        } else if (participantsType === 'Guests siblings'){
          typeText = '+ siblings';
        }

        return typeText;
      },
      getEvent () {
        this.$auth.currentUser(this, true, ()=> {
          if (!this.event) {
            let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId})

            _calendar.calendarEvents().find(this.$route.params.id).then(event => {

                //this.event = event
                this.eventId = event.id
                this.calendarEvent = event
                this.selectedComponents = event.components;

                this.getCalendarEventStatistics(event)

                this.$root.$emit('set-title', this.event, this.routeName === 'EditBuildingBlocks', this.routeName === 'InviteesManagement' || this.routeName === 'EventInvitees')
            })
          } else {
            this.eventId = this.event.id
            this.calendarEvent = this.event
            this.selectedComponents = this.event.components;

            if (this.eventId) {
              this.getCalendarEventStatistics(this.event)
            }

            this.$root.$emit('set-title', this.event, this.routeName === 'EditBuildingBlocks', this.routeName === 'InviteesManagement' || this.routeName === 'EventInvitees')
          }
        });
      },
      getCalendarEventStatistics (evt) {

        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: evt.id});

        if (!evt.id) { return; }

        new CalendarEventStatistics().for(calendar, event).get()
          .then(resp => {
            this.totalRemainingBudget = (evt.budgetPerPerson * evt.numberOfParticipants) - resp[0].totalAllocatedBudget//evt.totalBudget - resp[0].totalAllocatedBudget;
            this.remainingBudgetPerEmployee = this.totalRemainingBudget / evt.numberOfParticipants//evt.totalBudget - resp[0].totalAllocatedBudget;
            this.percentage = 100 - ((resp[0].totalAllocatedBudget / (evt.budgetPerPerson * evt.numberOfParticipants)) * 100).toFixed(2)

            if (this.percentage > 0) {
              this.seriesData = [{value: (100-this.percentage), className:"budget-chart-slice-a-positive"}, {value: this.percentage, className:"budget-chart-slice-b-positive"}];
            } else {
              this.seriesData =  [{value: 0.01, className: "budget-chart-slice-a-negative"},{value: 99.99, className: "budget-chart-slice-b-negative"}];
            }

            this.budgetPerEmployee = evt.budgetPerPerson;//this.totalRemainingBudget / evt.numberOfParticipants;
            this.allocatedBudget = resp.totalAllocatedBudget;
            this.event.statistics['allocatedBudget'] = this.allocatedBudget
          })
          .catch(error => {
            console.log(error)
          })
      },
      openEventModal () {
        window.currentPanel = this.$showPanel({
          component: EventSidePanel,
          cssClass: 'md-layout-item md-size-40 transition36 ',
          openOn: 'right',
          disableBgClick: false,
          props: {
            modalSubmitTitle: 'Save',
            editMode: true,
            sourceEventData: this.event,
            openInPlannerOption: false
          }
        })

        this.setEventData(this.event)
        this.setEventModal({showModal: true})
        this.setModalSubmitTitle('Save')
        this.setEditMode({editMode: true})
      }
    },
    created() {
      this.$store.registerModule('EventPlannerVuex', EventPlannerVuexModule)

      this.routeName = this.$route.name
    },
    mounted() {
      let _self = this;
      if (!this.event){
        this.getEvent();
      }
      this.$root.$on('RefreshStatistics', function () {
        _self.getCalendarEventStatistics(_self.event)
      })

      this.$root.$on('calendar-refresh-events', () => {
        this.getEvent()
      })

      this.getEvent();
    },
    computed: {
      ...mapGetters({
        components: 'event/getComponentsList'
      }),
      pieChart () {
        return {
          data: {
            labels: [' ', ' '], // should be empty to remove text from chart
            series: this.seriesData
          },
          options: {
            padding: 0,
            height: 156,
            donut: true,
            donutWidth: 15,
          }
        }
      }
    },
    filters: {
      formatDate: function (date) {
        return moment(date).format('MMM Do YYYY ')
      },
      formatTime: function (date) {
        return moment(date).format('h:00 A')
      },
      formatDuration: function (startDate, endDate) {
        return moment(endDate).diff(startDate, 'hours')
      }
    },
    watch: {
      event(newVal, oldVal){
        this.getEvent();
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/md/_colors.scss';

    .md-layout, .md-layout-item {
      width: initial;
      padding: 0;
    }
    .control-main-block {
        .company-control-logo {
            margin-right: 8px;

            &:last-child {
                margin-right: 0;
            }

            i {
                font-size: 24px !important;
            }
        }

        .md-button.selected {
            background-color: #eb3e79 !important;
            border-color: #eb3e79 !important;;

            i {
                color: #fff !important;
            }
        }
    }

    .company-control-logo .md-button {
        border: 2px solid #959595;
    }

    .percentage {
        padding-bottom: 8px;
        padding-left: 5px;
        grid-column: 1;
        grid-row: 1;
        margin-top: auto;
        margin-bottom: auto;
        font-size: 25px;
        font-weight: normal;
        color: #000000;
    }

    .logo-block {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0px 15px;
        margin: -20px 0px 20px 0px;

        .event-planer-logo {
            background: #eb3e79;
            width: 100%;
            max-width: 64px;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            margin-right: 10px;

            .company-logo {
                color: white !important;
            }
        }

        .event-title {
            white-space: nowrap;
            font-family: "Roboto";
            font-size: 1.125rem;
            font-weight: 400;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.33;
            letter-spacing: normal;
            text-align: left;
            color: #000000;
        }
    }

    .control-main-block {
        display: flex;
        justify-content: center;

        .company-logo-block {
            border: 2px solid #8b8b8b;
            padding: 7px;
            border-radius: 50%;
            margin: 0px 5px;
        }
    }

    .event-info-section {
      flex-direction: column;
    }

    .summary-item {
      display: flex;
    }

    .title-text {
      font-family: "Roboto";
      font-size: 12px;
      font-weight: 400;
      font-style: normal;
      font-stretch: normal;
      line-height: 2.2;
      letter-spacing: normal;
      text-align: left;
      color: #959595;
      flex: 0;

      i {
        color: $purple-500!important;
        font-size: 12px!important;
        padding-right: 1em;
      }
    }

    .title-budget-main {
        margin-top: 1.7em;
        //margin-bottom: 1em;
        font-family: "Roboto";
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: normal;
        text-align: center;
        color: #7a7a7a;
    }

    .title.budget {
      h4 {
        color: $purple-500;
      }
    }

    .title-budget-prise {
        color: $green !important;
        font-size: 1.25rem;
        font-weight: bold;
        line-height: 1.2;
        margin-bottom: 5px;
    }

    .title-budget-prise-negative {
        color: $pink-262 !important;
        font-size: 1.25rem;
        font-weight: bold;
        line-height: 1.2;
        margin-bottom: 5px;
    }

    .title-budget-prise.title {
        font-size: 1.45rem;
        margin-bottom: 0;
    }

    .block-flex {
        display: flex;
    }

    .button-event-creatig .md-ripple {
        background-color: #00bcd4;
    }

    .footer-link-button .md-ripple {
        color: #89229b;
        background-color: rgba(240, 240, 240, 1);
    }

    .copyright {
        color: #9c27b0;
    }

    .copyright-block {
        justify-content: space-between;
    }

    .total-event-budget {
        color: #000;
        font-weight: normal;
        font-size: 18px;
    }

    .md-card-header-icon .card-icon .md-icon {
        color: white !important;
    }
    .md-card-header-rose {
      margin-top: 1.5em;
    }
</style>
