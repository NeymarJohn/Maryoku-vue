<template>
  <md-card>
    <md-card-header class="md-card-header-icon md-card-header-white">
      <div class="card-icon" style="max-width: 96px; max-height: 96px; padding: 0;">
        <img src="/static/img/placeholder.jpg">
      </div>
      <h4 class="title" style="padding-top: 24px;">
        Company Name
      </h4>
    </md-card-header>
    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item md-size-33"><span class="text-gray">Main Office</span></div>
        <div class="md-layout-item md-size-66 text-right"><h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">San Diego, CA</h6></div>
        <div class="md-layout-item md-size-60"><span class="text-gray">Number of Employees</span></div>
        <div class="md-layout-item md-size-40 text-right"><h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">500+ Employees</h6></div>
        <div class="md-layout-item md-size-33"><span class="text-gray">Industry</span></div>
        <div class="md-layout-item md-size-66 text-right"><h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">Logistics</h6></div>
      </div>
      <hr class="divider"/>
      <h6 style="margin: 16px 0;" class="">Contact Information</h6>
      <div class="md-layout">
        <div class="md-layout-item md-size-10"><i class="fa fa-map-marker-alt text-gray"></i></div>
        <div class="md-layout-item md-size-90"><h6 class="text-gray" style="padding: 0;margin: 4px 0; text-transform: none !important;">5th Ave. corner Pine st. San Diego, CA</h6></div>
        <div class="md-layout-item md-size-10"><i class="fa fa-phone-volume text-gray"></i></div>
        <div class="md-layout-item md-size-90"><h6 class="text-gray" style="padding: 0;margin: 4px 0; text-transform: none !important;">+12 345 7890</h6></div>
        <div class="md-layout-item md-size-10"><i class="fa fa-envelope text-gray"></i></div>
        <div class="md-layout-item md-size-90"><h6 class="text-gray" style="padding: 0;margin: 4px 0; text-transform: none !important;">office@industry-leader.com</h6></div>
        <div class="md-layout-item md-size-10"><i class="fa fa-globe text-gray"></i></div>
        <div class="md-layout-item md-size-90"><h6 class="text-gray" style="padding: 0;margin: 4px 0; text-transform: none !important;">www.industry-leader.com</h6></div>
      </div>
      <hr class="divider"/>
      <h6 style="margin: 16px 0;">Branches</h6>
      <div class="md-layout">
        <div class="md-layout-item md-size-33"><span class="text-gray">Branch 1</span></div>
        <div class="md-layout-item md-size-66 text-right"><h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">San Diego, CA</h6></div>
        <div class="md-layout-item md-size-50"><span class="text-gray">Branch 2</span></div>
        <div class="md-layout-item md-size-50 text-right"><h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">Seatle, WA</h6></div>
        <div class="md-layout-item md-size-33"><span class="text-gray">Branch 3</span></div>
        <div class="md-layout-item md-size-66 text-right"><h6 style="padding: 0;margin: 4px 0; text-transform: none !important;">New York, NY</h6></div>
      </div>
      <hr class="divider"/>
      <h6 style="margin: 4px 0;">Custom Information</h6>
      <div style="min-height: 140px"></div>
    </md-card-content>
  </md-card>
</template>
<script>
  import auth from "@/auth";

  //import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
  /*import {

  } from "@/components";*/
  export default {
    name: "company-dashboard-info",
    components: {

    },
    data() {
      return {
        auth: auth
      };
    }
  };
</script>
<style lang="scss" scoped>
  .divider {
    margin-top: 12px; margin-bottom: 12px; border-color: #ccc; border-top: none; border-left: none; border-right: none;
  }
</style>
