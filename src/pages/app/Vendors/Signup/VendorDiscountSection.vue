<template>
  <div>
    <div class="tabs-container md-layout mt-20 py-30 border-top">
      <md-button v-for="option in tabOptions"
                 :key="option.value"
                 class="md-simple md-outlined md-round md-vendor filter-button mr-10"
                 @click="changeTab(option.value)"
      >
        {{ option.label }}
      </md-button>
    </div>
    <div class="fields-cont font-bold mb-10">
      <span>Name</span>
      <span class="text-left">Rules</span>
      <span class="text-left">QTY</span>
      <span class="font-size-14 text-left">Discount value / Percentage</span>
    </div>
    <hr style="background-color: #dddddd; height: 1px">
    <div class="fields-cont mt-20">
      <div class="field font-size-14">
        If Number of Participants
      </div>
      <div class="field">
        <money v-model="rule" class="text-center number-field" v-bind="rateFormat" />
      </div>
      <div class="field">
        <input v-model="qty" type="number" class="text-center number-field" placeholder="100"/>
      </div>
      <div class="field">
        <money v-model="unit" class="text-center number-field" v-bind="rateFormat" />

        <md-button
          class="md-vendor maryoku-btn ml-20"
          :disabled="isDisabledAdd"
        >
          Add Line
        </md-button>
      </div>
    </div>
    <div v-for="option in tabOptions" :key="option.value" class="citems">
      <div class="citem font-size-18 font-bold-extra mt-50 pb-10">
        {{ option.label }}
      </div>
      <div class="citem cursor-pointer">
        <vendor-discount-policy-item
          v-for="(cs, csIndex) in getDiscountItems()"
          :key="csIndex"
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
};
export default {
  components,
  props: {

  },
  data() {
      return {
          rateFormat: {
              decimal: ".",
              thousands: ",",
              prefix: "",
              suffix: " %",
              precision: 2,
              masked: false,
          },
        tab: "coupon",
        rule: 0,
        qty: 0,
        unit: 0,
        tabOptions: DiscountTabOptions,
        discountData: {
            coupon: [
                {name: "Happyholiday22", sub : "Holidays 2022", value: "15%"},
                {name: "Nice-to-meet", sub : "new customer", value: "7%"},
            ],
            number_of_guests: [
                  {name: "Happyholiday22", sub : "100-9,999 Guests", value: "15%"},
                  {name: "Nice-to-meet", sub : "1000 Guests Up", value: "7%"},
            ],
            customer_type: [
                {name: "VIP customer", value: "7%"},
                {name: "Regular customer", sub : "22 September - 21 December", value: "4%"},
            ],
            seasonal: [
                {name: "Winter", sub : "21 December -20 March 2022", value: "7%"},
                {name: "Above $4000", sub : "22 September - 21 December", value: "4%"},
            ],
        }
      };
  },
  computed: {
    isDisabledAdd() {
        return !this.qty || !this.unit;
    },
  },
  methods: {
      changeTab(value) {
          this.tab = value;
      },
      getDiscountItems() {
        return this.discountData[this.tab];
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
.fields-cont {
    display: grid;
    align-items: center;
    grid-template-columns: 20% 20% 20% 40%; //
    gap: 1%;
    .field {
        position: relative;
        span {
            margin-bottom: 0.5rem;
            display: inline-block;
            font: 800 16px "Manrope-Regular", sans-serif;
        }

        &:last-child {
            margin-right: 0;
        }
    }
}
.citems {
    .citem {
        width: calc(100% - 5rem - 50px);
        border-bottom: 1px solid #dddddd;
    }
}
input {
    text-align: center;
    font-size: 16px;
    padding: 12px 20px;
    border: 1px solid #dddddd;
    border-radius: 0;
}
.number-field {
    text-align: center;
    font-size: 16px;
    padding: 12px 20px;
    width: 12rem;
    border: 1px solid #dddddd;
    border-radius: 0;
}

</style>
