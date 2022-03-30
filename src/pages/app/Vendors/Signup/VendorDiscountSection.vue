<template>
  <div>
    <div class="tabs-container md-layout pb-30 border-top">
      <md-button v-for="option in tabOptions"
                 :key="option.value"
                 class="md-round md-vendor filter-button mr-10"
                 :class="tab === option.value ? '' : 'md-simple md-outlined'"
                 @click="changeTab(option.value)"
      >
        {{ option.label }}
      </md-button>
    </div>
    <VendorDiscountAddForm
        :tab="tab"
    ></VendorDiscountAddForm>
    <div v-for="option in tabOptions" :key="option.value" class="citems">
      <div class="citem font-size-18 font-bold-extra mt-50 pb-10">
        {{ option.label }}
      </div>
      <div class="citem cursor-pointer">
        <vendor-discount-policy-item
          v-for="(cs, csIndex) in discountData[option.value]"
          :key="csIndex"
          :tab="option.value"
          :item="cs"
          @change="changeDiscountItem"
        />
      </div>
    </div>
  </div>
</template>
<script>

import { DiscountTabOptions } from "@/constants/options";

const components = {
    VendorDiscountPolicyItem: () => import("../components/vendor-discount-policy-item"),
    VendorDiscountAddForm: () => import("../components/VendorDiscountAddForm"),
};
export default {
  components,
  props: {

  },
  data() {
      return {
        tab: "coupon",
        tabOptions: DiscountTabOptions,
        discountData: {
            coupon: [
                {code: "Happyholiday22", validDate : "Holidays 2022", value: "15", rate: "%"},
                {code: "Nice-to-meet", validDate : "new customer", value: "7", rate: "%"},
            ],
            number_of_guests: [
                  {rule: 2, qty : 9999, value: "15", rate: "%"},
                  {rule: 1, qty : 1000, value: "7", rate: "%"},
            ],
            customer_type: [
                {type: 1, value: "7" , rate: "%"},
                {type: 2, value: "4", rate: "%"},
            ],
            seasonal: [
                {name: "Winter", period : "21 December -20 March 2022", value: "7", rate: "%"},
                {name: "Above $4000", period : "22 September - 21 December", value: "4", rate: "%"},
            ],
        }
      };
  },
  methods: {
      changeTab(value) {
          this.tab = value;
      },
      changeDiscountItem() {

      }
  },
};
</script>
<style lang="scss" scoped>
.tab {
  padding: 20px 15px;
  border: 1px solid #641856;
  border-radius: 20px;
}

.citems {
    width: calc(100% - 7rem);
    display: grid;
    grid-column-gap: 3rem;
    align-items: center;
}
</style>
