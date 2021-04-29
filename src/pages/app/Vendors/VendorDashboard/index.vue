<template>
  <div class="vendor-dashboard p-30">
    <div class="d-flex justify-content-between align-center">
      <div class="font-size-22 font-bold color-purple">
        <img src="/static/icons/vendor/dashboard-active.svg" class="mr-10" /> WELCOME ON BOARD SAM!
      </div>
      <div><md-button class="md-vendor maryoku-btn">Create New Proposal</md-button></div>
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
                    ></pie-chart>
                </div>
                <div class="d-flex">
                    <md-button class="md-simple ml-auto md-outlined md-white maryoku-btn" @click="addNewService">Add A New Service</md-button>
                </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="pt-30">
          <label>Income From Past And Future Events</label>
          <p class="d-flex align-center text-gray font-size-14">
              <span class="d-inline-block mr-10" style="width: 14px;height: 14px;border-radius: 50%;background: white"></span>
              No event incomes</p>
          <div>
            <income-bar-chart :chartData="incomeChartData"></income-bar-chart>
<!--              <income-chart :chartData="data" :options="options" :width="300" :height="400"></income-chart>-->
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-55 schedule-section">
          <div class="md-layout">
              <div class="md-layout-item md-size-50 pl-0 pr-10">
                  <div class="white-card">
                      <div style="border-bottom: 2px solid #c8c8c8">
                          <div class="pt-10 d-flex align-center justify-content-center font-bold">
                            <md-button class="md-button md-theme-default md-simple md-just-icon"><md-icon>chevron_left</md-icon></md-button>
                            <span class="font-size-20 mr-10">0/0</span> REQUEST FOR PROPOSAL
                            <md-button class="md-button md-theme-default md-simple md-just-icon"><md-icon>chevron_right</md-icon></md-button>
                          </div>
                      </div>

                      <div class="d-flex flex-column align-center p-70">
                          <img class="mb-20" :src="`${iconUrl}vendordashboard/group-17116.png`">
                          <div class="color-vendor font-bold font-size-14">NO REQUEST FOR PROPOSAL</div>
                      </div>
                  </div>
              </div>
              <div class="md-layout-item md-size-50 pr-0 pl-10">
                  <div class="white-card">
                      <div style="border-bottom:  2px solid #c8c8c8">
                          <div class="pt-10 d-flex align-center justify-content-center font-bold">
                              <md-button class="md-button md-theme-default md-simple md-just-icon"><md-icon>chevron_left</md-icon></md-button>
<!--                              <span class="font-size-20 mr-10"> 0/0 </span>-->
<!--                              PROPOSALS FOR REQUEST-->
                                  THE PLANNER DIDN"T WANT ANY CHANGES
                              <md-button class="md-button md-theme-default md-simple md-just-icon"><md-icon>chevron_right</md-icon></md-button>
                          </div>
                      </div>

                      <div class="d-flex flex-column align-center p-70">
<!--                          <img class="mb-20" :src="`${iconUrl}vendordashboard/group-17115.png`">-->
                          <img class="mb-15" :src="`${iconUrl}vendordashboard/group-16558.svg`">
                          <div class="color-vendor font-bold font-size-14">NO REQUEST FOR CHANGES</div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="md-layout mt-20">
            <div class="white-card md-layout p-30">
                <div class="md-layout-item md-size-50">
                    <template>
                        <FunctionalCalendar
                            class="vendor-dashboard-calendar"
                            :is-multiple-date-picker="true"
                            :sundayStart="true"
                            :minSelDays="1"
                            :marked-dates="markedDates"
                            :date-format="'yyyy-mm-dd'"
                            v-model="date"
                            @changedMonth="changeMonth"
                            @changedYear="changeYear"
                        ></FunctionalCalendar>
                        <!-- todo update page when month change -->
                        <div style="display: none">{{ this.month }}</div>
                    </template>
                    <div class="d-flex align-center">
                        <md-switch class="md-switch-vendor" v-model="backOutDays" style="margin-left: 20px">Backout Days</md-switch>
                        <md-button class="md-simple ml-auto md-vendor">
                            Sync With Calendar</md-button>
                    </div>
                </div>
                <div class="md-layout-item md-size-50">
                    <div class="p-5 font-bold text-center">UPCOMING EVENTS:</div>
                    <div class="d-flex flex-column align-center justify-content-center p-50">
                        <img class="mt-50 mb-20" :src="`${iconUrl}vendordashboard/group-16600.png`">
                        <div class="mb-20 color-vendor font-bold font-size-14">NO UPCOMING EVENTS</div>
                        <md-button class="md-simple md-outlined md-vendor maryoku-btn" @click="showVendorCreateModal = true">Create New Event</md-button>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </div>
    <vendor-create-event-modal v-if="showVendorCreateModal" @cancel="showVendorCreateModal = false"></vendor-create-event-modal>
  </div>
</template>
<script>
import PieChart from "@/components/Chart/PieChart.vue";
import IncomeBarChart from "./IncomeBarChart.vue";
import { FunctionalCalendar } from "vue-functional-calendar";
import IncomeChart from "./IncomeChart";
import moment from "moment";
import _ from "underscore";
import VendorCreateEventModal from "@/components/Modals/VendorCreateEvent";

export default {
  components: {
     IncomeChart,
     FunctionalCalendar,
     PieChart,
     IncomeBarChart,
     VendorCreateEventModal,
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
      month: null,
      date: {
        selectedDates: [],
      },
      markedDates: [],
    };
  },
  mounted() {
      this.getMarkedDates();
  },
  methods:{
      getMarkedDates(){
          console.log('getMarkedDates', this.backOutDays);
          // this.markedDates = [];
          if (this.backOutDays) {
              if (this.vendorData.dontWorkDays && this.vendorData.dontWorkDays.length) {
                  _.each(this.vendorData.dontWorkDays, (sd) => {
                      this.markedDates.push(sd.date);
                  });
              }
              if (this.vendorData.exDonts && this.vendorData.exDonts.length) {
                  this.vendorData.exDonts.map((h) => {
                      this.markedDates.push(moment(h.date).format("YYYY-M-D"));
                  });
              }
          }
          console.log('markedDates', this.markedDates);
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
      createNewEvent(){
          return this.$router.push(`/create-event-wizard`);
      },
      renderCalendar(){
          $(".vfc-span-day.vfc-today").each(function () {
              $(this).attr("style", "background-color: white !important;z-index:10")
          })
          $(".vfc-span-day.vfc-marked").each(function () {
              $(this).attr("style", "background-color: #641856 !important;z-index:10")
          })
          $(".vfc-day").each(function (index, day) {
              if (
                  $(day).find("span.vfc-span-day").hasClass("vfc-marked") ||
                  $(day).find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed")
              ) {
                  if (
                      ($(day).next().find("span.vfc-span-day").hasClass("vfc-marked") &&
                          $(day).prev().find("span.vfc-span-day").hasClass("vfc-marked")) ||
                      ($(day).next().find("span.vfc-span-day").hasClass("vfc-marked") &&
                          $(day).prev().find("span.vfc-cursor-not-allowed").hasClass("vfc-cursor-not-allowed")) ||
                      ($(day).next().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed") &&
                          $(day).prev().find("span.vfc-span-day").hasClass("vfc-marked")) ||
                      ($(day).next().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed") &&
                          $(day).prev().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed"))
                  ) {
                      $(day).find("span.vfc-span-day").removeClass("vfc-end-marked");
                      $(day).find("span.vfc-span-day").removeClass("vfc-start-marked");
                      $(day).find("div.vfc-base-start").remove();
                      $(day).find("div.vfc-base-end").remove();
                      $(day).find("span.vfc-span-day").addClass("selected");
                  }

                  if (
                      ($(day).next().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed") ||
                          $(day).next().find("span.vfc-span-day").hasClass("vfc-marked")) &&
                      !$(day).prev().find("span.vfc-span-day").hasClass("vfc-marked") &&
                      !$(day).prev().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed")
                  ) {
                      $(day).find("span.vfc-span-day").addClass("vfc-start-marked");
                      if (!$(day).find("div.vfc-base-start").length) $(day).prepend("<div class='vfc-base-start'></div>");
                  }

                  if (
                      !$(day).next().find("span.vfc-span-day").hasClass("vfc-marked") &&
                      !$(day).next().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed") &&
                      ($(day).prev().find("span.vfc-span-day").hasClass("vfc-marked") ||
                          $(day).prev().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed"))
                  ) {
                      $(day).find("span.vfc-span-day").addClass("vfc-end-marked");
                      if (!$(day).find("div.vfc-base-end").length) $(day).prepend("<div class='vfc-base-end'></div>");
                  }

                  if (
                      !$(day).next().find("span.vfc-span-day").hasClass("vfc-marked") &&
                      !$(day).prev().find("span.vfc-span-day").hasClass("vfc-marked") &&
                      !$(day).next().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed") &&
                      !$(day).prev().find("span.vfc-span-day").hasClass("vfc-cursor-not-allowed")
                  ) {
                      $(day).find("span.vfc-span-day").addClass("vfc-end-marked");
                      $(day).find("div.vfc-base-start").remove();
                      $(day).find("div.vfc-base-end").remove();
                  }
              } else {
                  $(day).find("div.vfc-base-start").remove();
                  $(day).find("div.vfc-base-end").remove();
              }
          });
      },
  },
  updated() {
      this.renderCalendar();
      console.log('updated');
  },
  computed:{
      vendorData() {
          return this.$store.state.vendor.profile;
      },
      serviceCategories() {
          return this.$store.state.common.serviceCategories;
      },
      serviceChart(){
          if (!this.vendorData || !this.serviceCategories.length) return null;
          let services = [this.vendorData.vendorCategories[0]];
          this.vendorData.secondaryServices.map(s => {
              services.push(s.vendorCategory);
          });
          return  services.map(vc => {
              let cat = this.serviceCategories.find(c => c.key == vc);
              return  {
                  title: cat.title,
                  value: 12 / this.vendorData.vendorCategories.length,
                  color: cat.color,
                  image: `/static/icons/vendor/vendor_categories/${cat.icon}`};
          })
      },
  },
  watch:{
      backOutDays(newVal){
        this.getMarkedDates();
      }
  }
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
}
/deep/ .md-button-content{
  text-transform:capitalize;
  font-size: 14px;
  font-family: "Manrope-Bold";
}
/deep/ .md-switch-label{
  color: #999999;
}
</style>
