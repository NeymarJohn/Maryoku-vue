<template>
  <md-card>
    <md-card-header class="md-card-header-icon md-card-header-blue">
      <div class="card-icon">
        <md-icon>timeline</md-icon>
      </div>
      <h5 class="title" style="padding-top: 6px;">
        Participants per Event
        <md-field class="pull-right md-xs" style="max-width: 120px; margin: 0; border: none;" md-inline>
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
        <h5 style="margin-bottom: 0; margin-top: 0; font-weight: 500; font-size: 14px;" >Company Training</h5>
        <div class="text-gray small" style="padding-bottom: 6px;">August 19, 2018 <span class="pull-right"><span class="black-color">198</span> / 231</span></div>
        <md-progress-bar class="md-info" style="min-height: 18px;" :md-value="(198/231)*100"></md-progress-bar>
      </div>
      <div class="bar-item">
        <h5 style="margin-bottom: 0; margin-top: 0; font-weight: 500;font-size: 14px;" >Outreach Program </h5>
        <div class="text-gray small" style="padding-bottom: 6px;">August 25, 2018 <span class="pull-right"><span class="black-color">422</span> / 500</span></div>
        <md-progress-bar class="md-info" style="min-height: 18px;" :md-value="(422/500)*100"></md-progress-bar>
      </div>
      <div class="bar-item">
        <h5 style="margin-bottom: 0; margin-top: 0; font-weight: 500;font-size: 14px;" >Development Workshop</h5>
        <div class="text-gray small" style="padding-bottom: 6px;">August 19, 2019 <span class="pull-right"><span class="black-color">59</span> / 60</span></div>
        <md-progress-bar class="md-info" style="min-height: 18px;" :md-value="(59/60)*100"></md-progress-bar>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
  import auth from "@/auth";
  import {

  } from "@/components";
  export default {
    name: "company-dashboard-participants-chart",
    components: {

    },
    data() {
      return {
        auth: auth,
        amount2: 20,
        filterMonth: "March",
      };
    }
  };
</script>
<style lang="scss" scoped>
  .md-menu.md-select {
    &i{
      background-color: #00b0ff !important;
    }
  }
  .md-select-value {
    font-size: 14px;
  }

  .md-select i {
    width: 13px !important;
    height: 13px;
    line-height: 13px;
  }
</style>
