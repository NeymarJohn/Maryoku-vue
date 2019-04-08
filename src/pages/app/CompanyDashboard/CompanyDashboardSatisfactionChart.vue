<template>
  <md-card>
    <md-card-header class="md-card-header-icon md-card-header-warning">
      <div class="card-icon">
        <md-icon>timeline</md-icon>
      </div>
      <h5 class="title" style="padding-top: 6px;">
        Attendants Satisfaction Rate

        <md-field class="pull-right" style="max-width: 120px; margin: 0; border: none;" md-inline>
          <md-select v-model="filterMonth" name="filterMonth" id="filterMonth">
            <md-option value="January">January</md-option>
            <md-option value="February">February</md-option>
            <md-option value="March">March</md-option>
            <md-option value="April">April</md-option>
            <md-option value="May">May</md-option>
            <md-option value="June">June</md-option>
            <md-option value="July">July</md-option>
            <md-option value="August">August</md-option>
            <md-option value="September">September</md-option>
            <md-option value="October">October</md-option>
            <md-option value="November">November</md-option>
            <md-option value="December">December</md-option>
          </md-select>
        </md-field>
      </h5>
    </md-card-header>
    <md-card-content>
      <div class="filter"></div>
      <div class="bar-item">
        <h5 style="margin-top: 0; font-weight: 500;font-size: 14px;" class="text-gray" >Space / Location <small class="pull-right black-color">82%</small></h5>
        <md-progress-bar class="md-warning" style="min-height: 18px;" :md-value="82"></md-progress-bar>
      </div>
      <div class="bar-item">
        <h5 style="margin-top: 0; font-weight: 500;font-size: 14px;" class="text-gray" >Catering <small class="pull-right black-color">87%</small></h5>
        <md-progress-bar class="md-warning" style="min-height: 18px;" :md-value="87"></md-progress-bar>
      </div>
      <div class="bar-item">
        <h5 style="margin-top: 0; font-weight: 500;font-size: 14px;" class="text-gray" >Content <small class="pull-right black-color">79%</small></h5>
        <md-progress-bar class="md-warning" style="min-height: 18px;" :md-value="79"></md-progress-bar>
      </div>
      <div class="bar-item">
        <h5 style="margin-top: 0; font-weight: 500;font-size: 14px;" class="text-gray" >Gift / Giveaway <small class="pull-right black-color">95%</small></h5>
        <md-progress-bar class="md-warning" style="min-height: 18px;" :md-value="95"></md-progress-bar>
      </div>
    </md-card-content>
    <md-card-actions style="justify-content: center;">
      <h4 class="title" style="font-weight: 500; text-align: center;">
        84% <small style="font-size: 0.95rem; color: #7c7c7c;">average attendance satisfaction this year</small>
      </h4>

    </md-card-actions>
  </md-card>
</template>
<script>
  import auth from "@/auth";
  import {

  } from "@/components";
  export default {
    name: "company-dashboard-satisfaction-chart",
    components: {

    },
    data() {
      return {
        auth: auth,
        amount2: 20,
        filterMonth: "March"
      };
    }
  };
</script>
<style lang="scss" scoped>

</style>
