<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
    <div class="md-layout-item md-size-20">
      <md-card class="md-card-profile">
        <div class="logo-block">
          <div class="event-planer-logo">
            <md-icon class="company-logo">date_range</md-icon>
          </div>
          <div class="event-title">Event Information</div>
          <div></div>
        </div>
        <md-card-content>
          <div class="control-main-block">
              <div class="company-control-logo">
                  <md-button class="md-button md-just-icon md-simple md-round md-theme-default" :class="{selected: selectedTab('blocks')}" @click="selectTab('blocks')">
                    <md-icon>create</md-icon>
                  </md-button>
              </div>
              <div class="company-control-logo">
                  <md-button class="md-button md-just-icon md-simple md-round md-theme-default" :class="{selected: selectedTab('proposals')}" @click="selectTab('proposals')">
                    <md-icon class="company-logo">sms</md-icon>
                  </md-button>
              </div>
              <div class="company-control-logo">
                  <md-button class="md-button md-just-icon md-simple md-round md-theme-default" :class="{selected: selectedTab('settigns')}" @click="selectTab('settigns')">
                    <md-icon class="company-logo">person</md-icon>
                  </md-button>
              </div>
            </div>
          <div>

              <div class="md-layout-item md-size-100">
                <div class="fc-divider" style="color: #eeeeee; margin: 15px 0;"></div>
              </div>

              <div class="md-layout">
                  <div class="md-layout-item md-caption title-text">Event Occasion</div>
                  <div class="md-layout-item md-size-40 md-caption title-text">{{calendarEvent.occasion}}</div>
              </div>
              <div class="md-layout">                    
                  <div class="md-layout-item md-caption title-text">Start Time</div>                 
                  <div class="md-layout-item md-size-40 md-caption title-text">{{calendarEvent.eventStartMillis | formatTime}}</div>
              </div>
              
              <div class="md-layout">   
                  <div class="md-layout-item md-caption title-text">Duration</div>                 
                  <div class="md-layout-item md-size-40 md-caption title-text">
                      {{calendarEvent.eventStartMillis | formatDuration(calendarEvent.eventEndMillis)}} Hours
                  </div>
              </div>
              <div class="md-layout">                     
                  <div class="md-layout-item md-caption title-text">Geography</div>                 
                  <div class="md-layout-item md-size-40 md-caption title-text">{{calendarEvent.location}}</div>
              </div>
              <div class="md-layout">                     
                  <div class="md-layout-item md-caption title-text">Participants</div>                 
                  <div class="md-layout-item md-size-40 md-caption title-text">{{calendarEvent.numberOfParticipants}}</div>
              </div>
              <div class="md-layout">   
                  <div class="md-layout-item md-caption title-text">Participant Type</div>                 
                  <div class="md-layout-item md-size-40 md-caption title-text">{{calendarEvent.participantsType}}</div>
              </div>


              <div class="md-layout-item md-size-100">
                <div class="fc-divider" style="color: #eeeeee; margin: 15px 0;"></div>
              </div>
              <div class="md-layout-item">
                <h5 class="title-budget-main">Total remaining budget</h5>
                <h4
                  class="title"
                  style="font-size: 2.3em; font-weight: 500; padding: 0; margin: 0; color: rgb(33, 201, 152, 0.8);">
                  <div class="title-budget-prise">
                     <animated-number ref="totalRemainingBudgetNumber" :value="totalRemainingBudget" prefix="$"></animated-number>
                  </div>
                </h4>

                <div style="display: grid;margin-top: 18px; ">
                  <chart-component
                    :chart-data="pieChart.data"
                    :chart-options="pieChart.options"
                    chart-type="Pie"
                    style="grid-column: 1; grid-row: 1; color:red"/>
                  <animated-number class="percentage" ref="percentageNumber" :value="percentage" suffix="%"></animated-number>
                </div>
              </div>
            </div>
          <div class="md-layout-item">
            <div>
              <div class="md-caption title-text">Remaining budget per employee</div>
            <!-- TODO Need calculate with components -->
              <div class="md-caption title-text title-budget-prise">$0</div>
            </div>
            <div>
              <div class="md-caption title-text">Budget per employee</div>
              <div class="md-caption title-text title-budget-prise">
                  <animated-number ref="budgetPerPersonNumber" :value="calendarEvent.budgetPerPerson" prefix="$"></animated-number>
              </div>
            </div>
            <div>
              <div class="md-caption title-text">Total budget for the event</div>
              <div class="md-caption title-text title-budget-prise">
                  <animated-number ref="totalBudgetNumber" :value="calendarEvent.totalBudget" prefix="$"></animated-number>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div> 
   <div v-if="selectedTab('blocks')" class="md-layout-item md-size-70 block-flex">
      <event-blocks :event-id="eventId" :event-components="selectedComponents"></event-blocks>
    </div>
    <div v-if="selectedTab('blocks')" class="md-layout-item md-size-70 block-flex">
     
    </div>

    <div class="md-layout-item md-size-100 block-flex copyright-block">
      <div></div>
      <div>
        <p>
          {{`&copy; ${new Date().getFullYear()}`}}
          <span class="copyright">Creative Tim</span>
          {{`, made with love for a better web`}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>



//MAIN MODULES
import ChartComponent from "@/components/Cards/ChartComponent";
import auth from "@/auth";
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import Calendar from '@/models/Calendar';
import CalendarEvent from '@/models/CalendarEvent';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

//COMPONENTS
import { AnimatedNumber } from "@/components";
import Icon from "@/components/Icon/Icon.vue";
import EventElements from './EventElements.vue'
import EventBlocks from "./components/EventBlocks";


export default {
  components: {
    VueElementLoading,
    ChartComponent,
    AnimatedNumber,
    Icon,
    EventElements,
    EventBlocks,
  },

  data() {
    return {
      auth: auth,
      calendarEvent: {},
      selectedComponents: [],
      currentTab: null,
      eventId: null,
      percentage: 0,
      totalRemainingBudget: 0,
      seriesData: [],
      isLoading: false      
    };
  },
  mounted() {
    this.getEvent();
    if (this.components.length === 0) {
      this.$store.dispatch("event/getComponents");
    }
  },
  methods: {
    getEvent() {
        this.auth.currentUser(this, true, function() {
            let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});

            _calendar.calendarEvents().find(this.$route.params.id).then(event => {
                this.eventId = event.id;
                this.calendarEvent = event;
                this.selectedComponents = event.components;
                this.totalRemainingBudget = event.totalBudget - event.allocatedBudget;
                this.percentage = 100 - ((event.allocatedBudget / event.totalBudget) * 100).toFixed(2);
                this.seriesData = [(100 - this.percentage), this.percentage];
            });
        }.bind(this));
    }, 
    selectTab(tab) {
      this.currentTab = tab;
    },
    selectedTab(tab) {
      return this.currentTab === tab;
    }
  },
  computed: {
    ...mapGetters({
      components: "event/getComponentsList"
    }),
    pieChart() {
      return {
        data: {
          labels: [" ", " "], // should be empty to remove text from chart
          series: this.seriesData
        },
        options: {
          padding: 0,
          height: 120,
          donut: true,
          donutWidth: 12
        }
      };
    }
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('Do, MMM');
    },
    formatTime: function(date) {
      return moment(date).format('h:00 A')
    },
    formatDuration: function(startDate, endDate) {
      return moment(endDate).diff(startDate, 'hours')
    }
  },
  watch: {
  },  
};
</script>

<style lang="scss" >
// .md-layout-item.md-layout.md-gutter {
//   margin-right: -20px;
//   margin-left: -20px;
// }
.control-main-block {
  .md-button.selected {
    background-color: #eb3e79!important;
    border-color:#eb3e79!important;;
    i {
      color: #fff!important;
    }
  }
}
.company-control-logo .md-button{
      border: 2px solid #959595;
}
.percentage {
  padding-bottom: 8px;
  padding-left: 5px;
  grid-column: 1;
  grid-row: 1;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5rem;
  font-weight: 700;
}
.logo-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 15px;
  margin: -20px 0px 20px 0px;
  .event-planer-logo {
    background: #eb3e79;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    .company-logo {
      color: white !important;
    }
  }
  .event-title {
    font-family: "Roboto";
    font-size: 18px;
    font-weight: 300;
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
.title-text {
  font-family: "Roboto";
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: left;
  color: #959595;
}
.title-budget-main {
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
}
.title-budget-prise {
  color: rgba(33, 200, 152, 0.8) !important;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
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
</style>
