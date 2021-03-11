<template>
  <collapse-panel class="cost-service-table">
    <template slot="header">
      <div class="d-flex align-center">
        <img :src="`${$iconURL}Vendor Signup/Asset 560.svg`" style="width: 25px" class="mr-10" />
        OUR POLICY
      </div>
    </template>
    <template slot="content">
      <policy-section class="pr-50 pl-50 pb-40" :vendor="vendorData"></policy-section>
    </template>
  </collapse-panel>
</template>
<style></style>
<script>
import PolicySection from "../../components/PolicySection.vue";
import CollapsePanel from "./CollapsePanel.vue";
export default {
  components: { CollapsePanel, PolicySection },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
  },
};
</script>
<style lang="scss" scoped>
.cost-service-table {
}
</style>