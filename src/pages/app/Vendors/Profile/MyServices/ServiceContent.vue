<template>
  <div class="service-content">
    <div class="p-50">
      <div>About Our Venue</div>
      <div>{{ vendorData.about.category }}</div>
    </div>
    <div class="pr-50 pl-50">
      <label>Attachments</label>
    </div>
    <cost-service-table></cost-service-table>
    <extra-pay-table></extra-pay-table>
    <policy></policy>
    <price-policy></price-policy>
  </div>
</template>
<script>
import CostServiceTable from "./CostServiceTable.vue";
import ExtraPayTable from "./ExtraPayTable.vue";
import Policy from "./Policy.vue";
import PricePolicy from "./PricePolicy.vue";
export default {
  components: {
    CostServiceTable,
    ExtraPayTable,
    Policy,
    PricePolicy,
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>