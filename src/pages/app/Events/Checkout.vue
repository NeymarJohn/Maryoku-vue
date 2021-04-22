<template>
  <div class="event-vendor-checkout md-layout">
    <div class="md-layout-item md-size-45">
      <div>Book</div>
      <div class="white-card">What Do We Include In this Proposal?</div>
    </div>
    <div class="md-layout-item md-size-55">
      <div></div>
    </div>
  </div>
</template>
<script>
import Vendor from "@/models/Vendors";
export default {
  created() {
    const proposalId = this.$route.params.proposalId;
    const vendorId = this.$route.params.vendorId;
    Vendor.find(vendorId).then((vendor) => {
      console.log(vendor);
    });
  },
};
</script>
<style lang="scss" scoped>
</style>