<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100 md-medium-size-40 md-large-size-25">
      <company-dashboard-info></company-dashboard-info>
    </div>
    <div class="md-layout-item md-small-size-100 md-medium-size-60 md-large-size-75">
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

  import Calendar from "@/models/Calendar";
  import CalendarEvent from "@/models/CalendarEvent";
  import EventPageHeaderImage from '@/models/EventPageHeaderImage';

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
    },
    mounted() {
      console.log("*** Test 123");

      this.auth.currentUser(this, true, () => {
        let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: '5c77b318518e7eb3779b1c3e'});

        /*new EventTimelineItem({
          event: { id: event.id},
          title: "abc",
          buildingBlockType: "setup",
          description: "abc",
          startTimeMillis: 0,
          endTimeMillis: 0,
          order: 1
        }).for(calendar, event).save().then(res => {
          console.log(JSON.stringify(res));
        })*/
        /*calendar.calendarEvents().find(event.id).then(event => {
          console.log("event: ");
          console.log(JSON.stringify(event));
          new CalendarEvent(event).timelineItems().get().then(items => {
            console.log("event timeline items");
            console.log(JSON.stringify(items));
          });
        });*/

      /*new EventTimelineItem().for(calendar, event).find('5ca8fabca2950a149f6439c7').then(res => {
          console.log(JSON.stringify(res));
        })*/

        /*new EventPageHeaderImage().get().then(headerImages => {
          console.log(JSON.stringify(headerImages));
        });*/
      });
    }
  };
</script>
<style lang="scss" scoped>

</style>
