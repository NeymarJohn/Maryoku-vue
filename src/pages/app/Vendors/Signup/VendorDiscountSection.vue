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
      @add="addDiscountItem"
    />
    <template v-for="option in tabOptions">
      <div v-if="discountData[option.value].length" :key="option.value" class="citems">
        <div class="citem font-size-18 font-bold-extra mt-50 pb-10">
          {{ option.label }}
        </div>
        <div class="citem cursor-pointer">
          <vendor-discount-policy-item
            v-for="(cs, csIndex) in discountData[option.value]"
            :key="csIndex"
            :tab="option.value"
            :item="cs"
            @change="changeDiscountItem(csIndex, $event)"
          />
        </div>
      </div>
    </template>
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
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
      return {
        tab: "coupon",
        tabOptions: DiscountTabOptions,
        discountData: {
            coupon: [],
            number_of_guests: [],
            customer_type: [],
            seasonal: [],
        },

      };
  },
  methods: {
      init() {
        Object.keys(this.discountData).forEach(key => {
           if(this.data[key] && this.data[key].length)  this.discountData[key] = this.data[key];
        });
      },
      changeTab(value) {
          this.tab = value;
      },
      addDiscountItem(value){
          this.discountData[this.tab].push(value);
          this.$emit("save", this.discountData);
      },
      changeDiscountItem(index, {type, value}) {
        if (type === "update") {
            this.discountData[this.tab][index] = value;
        } else if (type === "remove") {
            this.discountData[this.tab].splice(index, 1);
        }
        this.$emit("save", this.discountData);
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
.citem {
    border-bottom: .5px solid #dddddd;
}
</style>
