<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-25">
      <company-dashboard-info></company-dashboard-info>
    </div>
    <div class="md-layout-item md-size-75">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-100 md-large-size-50">
          <company-dashboard-events-chart></company-dashboard-events-chart>
          <company-dashboard-participants-chart></company-dashboard-participants-chart>
          <company-dashboard-costs-chart></company-dashboard-costs-chart>
        </div>
        <div class="md-layout-item md-medium-size-100 md-large-size-50">
          <company-dashboard-satisfaction-chart></company-dashboard-satisfaction-chart>
          <company-dashboard-event-types-chart></company-dashboard-event-types-chart>
        </div>
        <!--<div class="md-layout-item md-medium-size-50 md-large-size-25">
          <company-dashboard-info></company-dashboard-info>
          <company-dashboard-info></company-dashboard-info>
          <company-dashboard-info></company-dashboard-info>
        </div>-->
      </div>
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
        auth: auth
      };
    }
  };
</script>
<style lang="scss" scoped>

</style>
