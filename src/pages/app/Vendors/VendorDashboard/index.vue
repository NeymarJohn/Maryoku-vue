<template>
  <div class="vendor-dashboard p-30">
    <div class="d-flex justify-content-between align-center">
      <div class="font-size-22 font-bold color-purple">
        <img src="/static/icons/vendor/dashboard-active.svg" class="mr-10" /> WELCOME ON BOARD SAM!
      </div>
      <div><md-button class="md-vendor maryoku-btn" @click="gotoProposalWizard">Create New Proposal</md-button></div>
    </div>
    <div class="md-layout pt-30">
      <div class="md-layout-item md-size-45 chart-section pt-30 pl-40 pr-40">
        <div>
          <label>Yearly Revenue By Segment</label>
          <div class="md-layout my-20">
            <div class="md-layout-item md-size-40 pl-0">
              <div class="font-size-50 total-revenue">$0</div>
            </div>
            <div class="md-layout-item md-size-60">
              <div>
                <pie-chart
                  :chartData="serviceChart"
                  :columns="1"
                  :options="{
                    width: 150,
                    height: 180,
                    strokWidth: 30,
                    direction: 'row',
                  }"
                  theme="white"
                ></pie-chart>
              </div>
              <div class="d-flex">
                <md-button class="md-simple ml-auto md-outlined md-white maryoku-btn" @click="addNewService">
                  Add A New Service
                </md-button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="pt-30">
          <label>Income From Past And Future Events</label>
          <p class="d-flex align-center text-gray font-size-14">
            <span
              class="d-inline-block mr-10"
              style="width: 14px; height: 14px; border-radius: 50%; background: rgb(159 107 144)"
            ></span>
            No event incomes
          </p>
          <div>
            <income-bar-chart :chartData="incomeChartData"></income-bar-chart>
            <!--              <income-chart :chartData="data" :options="options" :width="300" :height="400"></income-chart>-->
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-55 schedule-section">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 pl-0 pr-10">
            <proposal-request-section></proposal-request-section>
          </div>
          <div class="md-layout-item md-size-50 pr-0 pl-10">
            <proposal-request-section field="negotiation"></proposal-request-section>
          </div>
        </div>
        <div class="md-layout mt-20">
          <div class="white-card md-layout p-30">
            <div class="md-layout-item md-size-50">
              <event-calendar @clickDate="createEventFromCalendar"></event-calendar>
            </div>
            <div class="md-layout-item md-size-50">
              <div class="p-5 font-bold text-center">UPCOMING EVENTS:</div>
              <div class="d-flex flex-column align-center justify-content-center p-50 upcoming-events">
                <upcoming-event
                  v-if="upcomingEvents && upcomingEvents.length > 0"
                  :events="upcomingEvents"
                  @showEvent="showEvent"
                ></upcoming-event>
                <template v-else>
                  <img class="mt-50 mb-20" :src="`${iconUrl}vendordashboard/group-16600.png`" />
                  <div class="mb-20 color-vendor font-bold font-size-14">NO UPCOMING EVENTS</div>
                </template>
                <md-button class="md-simple md-outlined md-vendor maryoku-btn" @click="createNewEvent">
                  Create New Event
                </md-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vendor-create-event-modal
      v-if="showVendorCreateModal"
      :defaultData="defaultEventData"
      @cancel="showVendorCreateModal = false"
      @save="handleSaveEvent"
    ></vendor-create-event-modal>
  </div>
</template>
<script>
import PieChart from "@/components/Chart/PieChart.vue";
import IncomeBarChart from "./IncomeBarChart.vue";
import { FunctionalCalendar } from "vue-functional-calendar";
import IncomeChart from "./IncomeChart";
import moment from "moment";
import _ from "underscore";
import VendorCreateEventModal from "./Modals/VendorCreateEvent";
import SyncCalendarModal from "./Modals/SyncCalendar";
import UserEvent from "@/models/UserEvent";
import UpcomingEvent from "./UpcomingEvent.vue";
import EventCalendar from "./EventCalendar.vue";
import state from "./state";
import ProposalRequestSection from "./Components/ProposalRequestSection.vue";
export default {
  components: {
    IncomeChart,
    FunctionalCalendar,
    PieChart,
    IncomeBarChart,
    VendorCreateEventModal,
    UpcomingEvent,
    EventCalendar,
    SyncCalendarModal,
    ProposalRequestSection,
  },
  data() {
    return {
      iconUrl: `${this.$resourceURL}storage/icons/`,
      showVendorCreateModal: false,
      backOutDays: false,
      incomeChartData: [
        { label: "Jan", value: 200, future: true },
        { label: "Feb", value: 120, future: true },
        { label: "Mar", value: 70, future: true },
        { label: "Apr", value: 90, future: true },
        { label: "May", value: 120, future: true },
        { label: "Jun", value: 200, future: true },
        { label: "Jul", value: 120, future: true },
        { label: "Aug", value: 30, future: true },
        { label: "Sep", value: 120, future: true },
        { label: "Oct", value: 50, future: true },
        { label: "Nov", value: 100, future: true },
        { label: "Dec", value: 70, future: true },
      ],
      categoryColors: ["rgb(159 107 144)", "#4e0841", "#641856"],
      month: null,
      date: {
        selectedDates: [],
      },
      markedDates: [],
      upcomingEvents: [],
      defaultEventData: {},
    };
  },
  beforeCreate() {
    if (!this.$store.state.vendorDashboard) {
      this.$store.registerModule("vendorDashboard", state);
    }
  },
  mounted() {
    this.getMarkedDates();
    this.getComingEvents();
    this.$store.dispatch("common/fetchAllCategories");
  },
  methods: {
    gotoProposalWizard() {
      this.$router.push(`/vendor/${this.vendorData.id}/proposal/non-registered`);
    },
    handleSaveEvent(savedEvent) {
      this.upcomingEvents.push(savedEvent);
      this.upcomingEvents.sort((a, b) => {
        return a.startTime > b.startTime ? 1 : -1;
      });
      this.upcomingEvents = [...this.upcomingEvents.slice(0, 5)];
      this.showVendorCreateModal = false;
      this.$root.$emit("addNewEvent", savedEvent);
    },
    getMarkedDates() {
      let markedDates = [];
      if (this.backOutDays) {
        if (this.vendorData.dontWorkDays && this.vendorData.dontWorkDays.length) {
          _.each(this.vendorData.dontWorkDays, (sd) => {
            markedDates.push(sd.date);
          });
        }
        if (this.vendorData.exDonts && this.vendorData.exDonts.length) {
          this.vendorData.exDonts.map((h) => {
            markedDates.push(moment(h.date).format("YYYY-M-D"));
          });
        }
      }
      this.markedDates = markedDates;
      this.$forceUpdate();
    },
    changeMonth(e) {
      this.month = moment(e).month();
    },
    changeYear(e) {
      this.month = moment(e).month();
    },
    addNewService() {
      return this.$router.push(`/vendor/${this.vendorData.id}/service/add`);
    },
    createNewEvent() {
      // return this.$router.push(`/create-event-wizard`);
      this.defaultEventData = {};
      this.showVendorCreateModal = true;
    },

    selectDay(e) {
      let day = moment(e.date).date();
      let date = moment(e.date).format("YYYY-M-D");
      let selectedDates = this.date.selectedDates;
      if (this.date.selectedDates.find((m) => m.date === date)) {
        selectedDates = this.date.selectedDates.filter((s) => s.date !== e.date);
        this.markedDates = this.markedDates.filter((m) => m !== date);
        $("span.vfc-span-day:contains(" + day + ")").removeClass("vfc-marked vfc-start-marked vfc-end-marked");
        $("span.vfc-span-day:contains(" + day + ")").css("background-color", "");
      }
      this.$forceUpdate();
    },
    getComingEvents() {
      UserEvent.params({
        startTime: new Date(),
      })
        .get()
        .then((events) => {
          this.upcomingEvents = events.slice(0, 5);
        });
    },
    showEvent(event) {
      this.showVendorCreateModal = true;
      this.defaultEventData = { ...event };
    },
    createEventFromCalendar(dateObject) {
      const date = moment(`${dateObject.years}-${dateObject.month}-${dateObject.date}`, "yyyy-M-D").toDate();
      this.defaultEventData = { date };
      this.showVendorCreateModal = true;
    },
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
    serviceCategories() {
      return this.$store.state.common.serviceCategories;
    },
    serviceChart() {
      if (!this.vendorData || !this.serviceCategories.length) return [];
      let services = [this.vendorData.vendorCategories[0]];
      this.vendorData.secondaryServices.map((s) => {
        services.push(s.vendorCategory);
      });
      return services.map((vc, idx) => {
        let cat = this.serviceCategories.find((c) => c.key == vc);
        if (cat)
          return {
            title: cat.title,
            value: 12 / this.vendorData.vendorCategories.length,
            color: this.categoryColors[idx],
            image: `${this.$iconURL}Budget+Elements/${cat.key}-white.svg`,
          };
        return null;
      });
    },
    proposalRequests() {
      return this.$store.state.vendorDashboard.proposalRequests;
    },
  },
  watch: {
    backOutDays(newVal) {
      // this.getMarkedDates();
    },
    vendorData(newVal) {
      console.log('vendorData', newVal);
      this.$store.dispatch("vendorDashboard/getProposalRequests", newVal.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-dashboard {
  .chart-section {
    background-color: #641856;
    color: white;
    .total-revenue {
      line-height: 1em;
    }
  }
  .schedule-section {
  }
  .upcoming-events {
    height: 100%;
  }
}
/deep/ .md-button-content {
  text-transform: capitalize;
  font-size: 14px;
  font-family: "Manrope-Bold";
}
/deep/ .md-switch-label {
  color: #999999;
}
</style>
