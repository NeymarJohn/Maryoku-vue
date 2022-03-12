<template>
  <div class="vendor-dashboard p-30">
    <div class="d-flex justify-content-between align-center">
      <div class="font-size-22 font-bold color-purple">
        <img src="/static/icons/vendor/dashboard-active.svg" class="mr-10" /> WELCOME ON BOARD SAM!
      </div>
      <div>
        <md-button class="md-vendor maryoku-btn" @click="gotoProposalWizard">Create New Proposal</md-button>
      </div>
    </div>
    <div class="md-layout pt-30">
      <div class="md-layout-item md-size-45 chart-section pt-30 pl-40 pr-40">
        <div>
          <div style="display: flex; justify-content: space-between;">
            <label>Yearly Revenue By Segment</label>
            <year-select :data="yearsList" :initialValue="selectedYear" @valueChanged="handleYearChange"/>
          </div>
          <div class="md-layout my-20">
            <div class="md-layout-item md-size-35 px-0">
              <div class="font-size-50 total-revenue" v-if="yearlyRevenue">
                ${{ Math.round(yearlyRevenue) | formatQty }}
              </div>
              <div class="font-size-50 total-revenue" v-else>$0</div>
            </div>
            <div class="md-layout-item md-size-65 pr-0">
              <div>
                <pie-chart
                  :chartData="serviceChart"
                  :columns="1"
                  :options="{
                    width: 170,
                    height: 180,
                    minWidth: 180,
                    strokWidth: 30,
                    direction: 'row',
                  }"
                  theme="white"
                  :showTooltip="false"
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
                  @show="show($event)"
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

    <select-icons
      v-if="iconsModal"
      :events="upcomingEvents"
      @iconSelected="applySelectedIcon"
      @cancel="cancelIcon()"
      :eventId="selectedEvent"
    >
    </select-icons>
    <vendor-create-event-modal
      v-if="showVendorCreateModal"
      :defaultData="defaultEventData"
      @cancel="showVendorCreateModal = false"
      @save="handleSaveEvent"
    ></vendor-create-event-modal>

  </div>
</template>
<script>
import selectIcons from "./Modals/SelectIcon.vue";
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
import ProposalRequestSection from "./Components/ProposalRequestSection.vue";
import Modal from "@/components/Modal.vue";
import YearSelect from "../../../../components/Select/YearSelect.vue";
import {eventIcons} from "@/constants/event";

export default {
  components: {
    IncomeChart,
    selectIcons,
    FunctionalCalendar,
    PieChart,
    IncomeBarChart,
    VendorCreateEventModal,
    UpcomingEvent,
    EventCalendar,
    Modal,
    SyncCalendarModal,
    ProposalRequestSection,
    YearSelect
  },
  data() {
    const date = new Date().getFullYear()
    return {
      yearlyRevenue :0,
      hola: null,
      iconUrl: `${this.$resourceURL}storage/icons/`,
      storageIcon: `${this.$IconURL}storage/icons/`,
      showVendorCreateModal: false,
      backOutDays: false,
      selectedEvent: null,
      iconsModal: false,
      monthlyReport: [],
      incomeChartData: [
        { label: "Jan", value: 0, future: true },
        { label: "Feb", value: 0, future: true },
        { label: "Mar", value: 0, future: true },
        { label: "Apr", value: 0, future: true },
        { label: "May", value: 0, future: true },
        { label: "Jun", value: 0, future: true },
        { label: "Jul", value: 0, future: true },
        { label: "Aug", value: 0, future: true },
        { label: "Sep", value: 0, future: true },
        { label: "Oct", value: 0, future: true },
        { label: "Nov", value: 0, future: true },
        { label: "Dec", value: 0, future: true },
      ],
      categoryColors: ["rgb(159 107 144)", "#4e0841", "#641856"],
      activeCategoryColors: ["#ffffff", "#21cfe0", "#ffc001", "#2cde6b"],
      month: null,
      date: {
        selectedDates: [],
      },
      markedDates: [],
      upcomingEvents: [],
      eventLimit: 3,
      defaultEventData: {},
      serviceReportData: null,
      yearsList: [
        date - 1,
        date,
        date + 1
      ],
      selectedYear: new Date().getFullYear(),
    };
  },
  async mounted() {
    //get data
    this.getIncomingData()
    this.getComingEvents();
    this.getServiceReport();
    this.getMarkedDates();
    await this.$store.dispatch("vendorDashboard/getProposals", { vendorId: this.vendorData.id });
    this.$store.dispatch("common/fetchAllCategories");
  },
  methods: {
    getIncomingData() {
      if (this.customer) {
        customerQuery = `&customerId=${this.customer.id}`;
      }
      if (this.customerStatus) {
        customerQuery += `&customerStatus=${this.customerStatus}`;
      }
      for (let i in this.incomeChartData) {
        this.incomeChartData[i].value = 0;
      }
      this.$http
        .get(
          `${process.env.SERVER_URL}/1/userEvent/monthlyIncome/${this.vendorData.id}?start=${new Date(
            this.selectedYear + "-01-01",
          ).toISOString()}&end=${new Date(this.selectedYear + "-12-31").toISOString()}`,
        )
        .then(res => {
          if (res.data.length) {
            this.monthlyReport = res.data;
            res.data.forEach(item => {
              this.incomeChartData[Number(item._id) - 1].value = item.amount;
              this.incomeChartData[Number(item._id) - 1].future = false;
            });
            this.incomeChartData = [...this.incomeChartData];
          } else {
            // TODO: fake data, mb delete it
            this.incomeChartData.forEach((item, index) => {
              this.incomeChartData[index].value = 1000 * Math.random() + 200;
              this.incomeChartData[index].future = true;
            });
            this.incomeChartData = [...this.incomeChartData];
          }
        });
    },
    handleYearChange(year) {
      this.selectedYear = year;
      this.getIncomingData();
      this.getServiceReport();
    },
    cancelIcon() {
      this.iconsModal = false;
    },
    applySelectedIcon({iconId, eventId}) {
      this.upcomingEvents = this.upcomingEvents.map(event => {
        if (event.id === eventId) {
          const updated = {...event, icon: eventIcons[iconId]};
          this.updateEventIcon(updated);
          return updated;
        }
        return event;
      })
    },
    updateEventIcon(event) {
      new UserEvent(event).save().then((res) => {
        console.log('res', res);
      }).catch((error) => {console.log('error', error);});
    },
    show(ev) {
      this.iconsModal = true;
      this.selectedEvent = ev;
    },

    getServiceReport() {
      this.$http.get(`${process.env.SERVER_URL}/1/transaction/report/yearly/${this.vendorData.id}?start=${new Date(
        this.selectedYear + "-01-01",
      ).toISOString()}&end=${new Date(this.selectedYear + "-12-31").toISOString()}`).then(res => {
        if (res.data.services && res.data.services.length) {
          this.serviceReportData = res.data.services;
          this.yearlyRevenue = res.data.total
        }
      });
    },
    gotoProposalWizard() {
      let routeData = this.$router.resolve({
        name: "outsideProposalCreate",
        params: {
          vendorId: this.vendorData.id,
        },
      });
      window.open(routeData.href, "_blank");
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
          _.each(this.vendorData.dontWorkDays, sd => {
            markedDates.push(sd.date);
          });
        }
        if (this.vendorData.exDonts && this.vendorData.exDonts.length) {
          this.vendorData.exDonts.map(h => {
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
      if (this.date.selectedDates.find(m => m.date === date)) {
        selectedDates = this.date.selectedDates.filter(s => s.date !== e.date);
        this.markedDates = this.markedDates.filter(m => m !== date);
        $("span.vfc-span-day:contains(" + day + ")").removeClass("vfc-marked vfc-start-marked vfc-end-marked");
        $("span.vfc-span-day:contains(" + day + ")").css("background-color", "");
      }
      this.$forceUpdate();
    },
    getComingEvents() {
      UserEvent.params({
        startTime: new Date(),
        limit: this.eventLimit,
      })
        .get()
        .then(events => {
          this.upcomingEvents = events.map((event, index) => {
            const randomId = Math.floor(Math.random() * 28) + 1;
            const randomIconId = Math.ceil(Math.random() * 10 * randomId) % 28;
            return { ...event, icon: event.icon || eventIcons[randomIconId] }
          });
        });
    },
    showEvent(event) {
      console.log("showEvent", event);
      this.showVendorCreateModal = true;
      this.defaultEventData = { ...event };
    },

    ShowModal(event) {
      console.log("showModal", event);
      this.iconsModal = true;
      this.defaultEventData = { ...event };
    },
    createEventFromCalendar(data) {
      console.log("createEventFromCalendar", data);
      if (data.hasOwnProperty("event")) {
        this.defaultEventData = { ...data.event };
      } else {
        this.defaultEventData = {
          date: moment(`${data.date.years}-${data.date.month}-${data.date.date}`, "yyyy-M-D").toDate(),
        };
      }

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
      const services = this.vendorData.vendorCategories.concat(this.vendorData.secondaryServices.map((s) => s.vendorCategory));
      return services.map((vc, idx) => {
        const item = {
          title: this.$store.state.common.serviceCategoriesMap[vc].fullTitle,
          value: 1,
          color: this.activeCategoryColors[idx],
          image: `${this.$iconURL}Budget+Elements/${vc}-white.svg`,
        };
        if (this.serviceReportData) {
          const cat = this.serviceReportData.find(c => c._id == vc);

          if (cat) {
            item.value = cat.amount;
            item.color = this.activeCategoryColors[idx];
          }
        }
        return item;
      });
    },
    proposalRequests() {
      return this.$store.state.vendorDashboard.proposalRequests;
    },
    // yearlyRevenue() {
    //   if (!this.serviceReportData || this.serviceReportData.length === 0) return 0;
    //   return this.serviceReportData.reduce((s, item) => {
    //     return s + item.amount / 100;
    //   }, 0);
    // },
    proposals() {
      return this.$store.state.vendorDashboard.proposals;
    },
  },
  watch: {
    backOutDays(newVal) {
      // this.getMarkedDates();
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
