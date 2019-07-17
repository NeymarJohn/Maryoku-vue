<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{vendor.vendorDisplayName}}</div>
        <div class="md-subhead">{{vendor.vendorCategory}}</div>
      </md-card-header>

      <md-card-content>{{vendor.vendorMainEmail}}</md-card-content>

      <md-card-actions>
        <md-button>Show Details</md-button>
        <md-button>Remove</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
export default {
  props: {
    vendor: Object,
  },
  name: "vendor-card"
};
</script>
