<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100 md-medium-size-50 md-large-size-33">
      <company-dashboard-events-chart :current-year="currentYear" :current-year-events-count="statistics.numberOfEventsPerYear[currentYear]"></company-dashboard-events-chart>
      <company-dashboard-participants-chart></company-dashboard-participants-chart>
    </div>
    <div class="md-layout-item md-small-size-100 md-medium-size-50 md-large-size-33">
      <company-dashboard-event-types-chart></company-dashboard-event-types-chart>
      <company-dashboard-satisfaction-chart></company-dashboard-satisfaction-chart>
    </div>
    <div class="md-layout-item md-small-size-100 md-medium-size-50 md-large-size-33">
      <company-dashboard-costs-chart></company-dashboard-costs-chart>
    </div>
  </div>
</template>
<script>
  import auth from "@/auth";
  import CompanyDashboardInfo from "./CompanyDashboardInfo";
  import CompanyDashboardEventsChart from "./CompanyDashboardEventsChart";
  import CompanyDashboardEventTypesChart from "./CompanyDashboardEventTypesChart";
  import CompanyDashboardParticipantsChart from "./CompanyDashboardParticipantsChart";
  import CompanyDashboardSatisfactionChart from "./CompanyDashboardSatisfactionChart";
  import CompanyDashboardCostsChart from "./CompanyDashboardCostsChart";

  import Customer from "@/models/Customer";

  import moment from 'moment';

  export default {
    components: {
      CompanyDashboardInfo,
      CompanyDashboardEventsChart,
      CompanyDashboardEventTypesChart,
      CompanyDashboardParticipantsChart,
      CompanyDashboardSatisfactionChart,
      CompanyDashboardCostsChart
    },
    data() {
      return {
        auth: auth,
        statistics: {numberOfEventsPerYear : {}},
        currentYear: moment().year().toString()
      };
    },
    mounted() {
      console.log("*** Test 123");

      this.auth.currentUser(this, true, () => {
        new Customer({id: this.auth.user.customer.id})
          .statistics()
          .get()
          .then(res=>{
            console.log(JSON.stringify(res[0], null, 4));
            this.statistics = res[0];
          })
          .catch(e=>console.log(e,'chart api errors'))
      });
    }
  };
</script>
<style lang="scss" scoped>

</style>
