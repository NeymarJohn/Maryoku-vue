<template>
  <md-card>
    <md-card-header class="md-card-header-icon md-card-header-blue">
      <div class="card-icon">
        <md-icon>timeline</md-icon>
      </div>
      <h4 class="title" style="padding-top: 6px;">
        Average Number of Participants per Event
      </h4>
    </md-card-header>
    <md-card-content>
      <div class="filter"></div>
      <div class="bar-item">
        <h5 style="margin-bottom: 0; margin-top: 0; font-weight: 500;" >Company Training</h5>
        <div class="text-gray" style="padding-bottom: 6px;">August 19, 2018 <small class="pull-right"><span class="black-color">198</span> / 231</small></div>
        <md-progress-bar class="md-info" style="min-height: 18px;" :md-value="(198/231)*100"></md-progress-bar>
      </div>
      <div class="bar-item">
        <h5 style="margin-bottom: 0; margin-top: 0; font-weight: 500;" >Outreach Program </h5>
        <div class="text-gray" style="padding-bottom: 6px;">August 25, 2018 <small class="pull-right"><span class="black-color">422</span> / 500</small></div>
        <md-progress-bar class="md-info" style="min-height: 18px;" :md-value="(422/500)*100"></md-progress-bar>
      </div>
      <div class="bar-item">
        <h5 style="margin-bottom: 0; margin-top: 0; font-weight: 500;" >Development Workshop</h5>
        <div class="text-gray" style="padding-bottom: 6px;">August 19, 2019 <small class="pull-right"><span class="black-color">59</span> / 60</small></div>
        <md-progress-bar class="md-info" style="min-height: 18px;" :md-value="(59/60)*100"></md-progress-bar>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
  import auth from "@/auth";
  import {
    ProgrssBar
  } from "@/components";
  export default {
    name: "company-dashboard-participants-chart",
    components: {
      ProgrssBar
    },
    data() {
      return {
        auth: auth,
        amount2: 20
      };
    }
  };
</script>
<style lang="scss" scoped>

</style>
