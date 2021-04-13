<template>
  <collapse-panel
    class="cost-service-table"
    @toggle="
      (value) => {
        isExpanded = value;
      }
    "
  >
    <template slot="header">
      <div class="header-content">
        <div>
          <img :src="`${$iconURL}Vendor Signup/Asset 526.svg`" style="width: 20px" class="mr-10" />
          With Extra Pay
        </div>
        <template v-if="isExpanded">
          <div class="font-size-16 font-regular text-transform-capitalize text-center">QTY</div>
          <div class="font-size-16 font-regular text-transform-capitalize text-center">Price</div>
        </template>
      </div>
    </template>
    <template slot="content">
      <div class="pr-50 pl-50 pb-50 cost-service-content">
        <hr />
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
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    changeServiceItem(item) {
      _.each(items, (s) => {
        if (s.label === item.label) {
          items[s] = item;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.cost-service-table {
  .header-content {
    display: grid;
    grid-template-columns: 40% 20% 20% 20%;
    max-width: 900px;
    align-items: flex-end;
    max-width: 80%;
    padding-right: 50px;
  }
  .cost-service-content {
    max-width: 900px;
  }
}
</style>