<template>
  <collapse-panel class="cost-service-table">
    <template slot="header">
      <div class="d-flex align-center">
        <img :src="`${$iconURL}Vendor Signup/Asset 526.svg`" style="width: 20px" class="mr-10" />
        Elements With Extra Pay
      </div>
    </template>
    <template slot="content">
      <div class="pr-50 pl-50 pb-50">
        <vendor-extra-pay-item v-for="(cs, csIndex) in items" :key="csIndex" :item="cs" @change="changeServiceItem" />
      </div>
    </template>
  </collapse-panel>
</template>
<style></style>
<script>
import CollapsePanel from "./CollapsePanel.vue";
import VendorExtraPayItem from "../../components/VendorExtraPayItem.vue";

export default {
  components: { CollapsePanel, VendorExtraPayItem },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
.cost-service-table {
}
</style>