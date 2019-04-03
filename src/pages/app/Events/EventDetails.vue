<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen/>
    <div class="md-layout-item md-size-100">
      <md-card class="event-details">
            <md-card-content>
              <div class="md-layout-item md-size-100 event-details_banner" :style="`background-image : url(https://bit.ly/2TWGILO)`">

              </div>

              <div class="md-layout-item md-size-50">
                <h1 class="event-title">{{calendarEvent.title}}</h1>
                <div class="event-date">March 17 2019</div>


              </div>
            </md-card-content>
      </md-card>
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

//COMPONENTS
import { AnimatedNumber } from "@/components";
import Icon from "@/components/Icon/Icon.vue";
import MdListItem from "../../../../node_modules/vue-material/src/components/MdList/MdListItem/MdListItem.vue";
import MdListItemButton from "../../../../node_modules/vue-material/src/components/MdList/MdListItem/MdListItemButton.vue";

export default {
  components: {
      MdListItemButton,
      MdListItem,
      VueElementLoading,
    ChartComponent,
    AnimatedNumber,
    Icon
  },

  data() {
    return {
      auth: auth,
      calendarEvent: {},
      percentage: 0,
      totalRemainingBudget: 0,
      seriesData: [],
      isLoading: false,
      footerLink: [
        { title: "HOME" },
        { title: "COMPANY" },
        { title: "PORTFOLIO" },
        { title: "BLOG" }
      ]
    };
  },
  mounted() {
    this.getEvent();
  },
  methods: {
    getEvent() {
        this.auth.currentUser(this, true, function() {
            let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});

            _calendar.calendarEvents().find(this.$route.params.id).then(event => {
                this.calendarEvent = event;              
                this.totalRemainingBudget = event.totalBudget - event.allocatedBudget;
                this.percentage = 100 - ((event.allocatedBudget / event.totalBudget) * 100).toFixed(2);
                this.seriesData = [(100 - this.percentage), this.percentage];
            });
        }.bind(this));
    }, 
  },
  computed: {
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

<style lang="scss">
// .md-layout-item.md-layout.md-gutter {
//   margin-right: -20px;
//   margin-left: -20px;
// }
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
