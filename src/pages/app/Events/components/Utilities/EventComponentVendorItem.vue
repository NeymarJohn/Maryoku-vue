<template>
  <div class="event-component-vedor-item">
    <div class="vendor-title">{{vendor.vendor.vendorDisplayName}}</div>
    <div class="vendor-actions">
      <md-button class="md-button md-red  md-simple md-theme-default edit-btn-1">View Contract</md-button>
      <div style="position:relative">
        <md-button class="md-button md-black  md-simple md-theme-default edit-btn-1">Request Changes</md-button>
        <span class="divider"></span>
        <md-button class="md-button md-black  md-simple md-theme-default edit-btn-1">Cancel Vendor</md-button>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  name:"event-component-vendor-item",
  props: {
    vendor :Object
  }
}
</script>
<style lang="scss" scoped>
  .event-component-vedor-item{
    padding: 0 10px;
    .vendor-title {
      font-family: "Manrope-Regular" !important;
      font-size: 20px  !important;
      color:#818080  !important;
    }
    .vendor-actions{
      padding: 10px 0px;
      display: flex;
      justify-content: space-between;
    }
  }
  .divider {
    display: inline-block;
    padding: 0 5px;
    &:after {
      border-left: solid 2px #DBDBDB;
      height: 1em;
      content: " ";
      position: absolute;
      top: 0.5em;
      padding: 14px;
    }
  }
</style>