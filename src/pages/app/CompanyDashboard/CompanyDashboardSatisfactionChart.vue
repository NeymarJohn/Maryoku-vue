<template>
  <md-card>
    <md-card-header class="md-card-header-icon md-card-header-warning">
      <div class="card-icon">
        <md-icon>timeline</md-icon>
      </div>
      <h4 class="title" style="padding-top: 6px;">
        Attendants Satisfaction Rate
      </h4>
    </md-card-header>
    <md-card-content>
      <div class="filter"></div>
      <div class="bar-item">
        <h5 style="margin-bottom: 0; margin-top: 0; font-weight: 500;" >Company Training <small class="pull-right">198 <span class="text-gray">/ 231</span></small></h5>
        <div class="text-gray" style="padding-bottom: 6px;">August 19, 2018</div>
        <md-progress-bar class="md-warning" style="min-height: 18px;" :md-value="amount2"></md-progress-bar>
      </div>
      <div class="bar-item">
        <h5 style="margin-bottom: 0; margin-top: 0; font-weight: 500;" >Outreach Program <small class="pull-right">22 <span class="text-gray">/ 500</span></small></h5>
        <div class="text-gray" style="padding-bottom: 6px;">August 25, 2018</div>
        <md-progress-bar class="md-warning" style="min-height: 18px;" :md-value="amount2"></md-progress-bar>
      </div>
      <div class="bar-item">
        <h5 style="margin-bottom: 0; margin-top: 0; font-weight: 500;" >Development Workshop <small class="pull-right">59 <span class="text-gray">/ 60</span></small></h5>
        <div class="text-gray" style="padding-bottom: 6px;">August 19, 2019</div>
        <md-progress-bar class="md-warning" style="min-height: 18px;" :md-value="amount2"></md-progress-bar>
      </div>
    </md-card-content>
    <md-card-actions style="justify-content: center;">
      <h3 class="title" style="font-weight: 500; text-align: center;">
        84% <small style="font-size: 0.95rem; color: #7c7c7c;">average attendance satisfaction this year</small>
      </h3>
    </md-card-actions>
  </md-card>
</template>
<script>
  import auth from "@/auth";
  import {
    ProgrssBar
  } from "@/components";
  export default {
    name: "company-dashboard-satisfaction-chart",
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
