<template>
  <div>
    <div class="fields-cont font-bold mb-10" :class="tab">
      <template v-if="tab === 'number_of_guests'">
        <span>Name</span>
        <span class="text-left font-size-14">Rules</span>
        <span class="text-left font-size-14">QTY</span>
        <span class="font-size-14 text-left">Discount value / Percentage</span>
      </template>
      <template v-if="tab === 'coupon'">
        <span class="text-left font-size-14">Coupon Code</span>
        <span class="text-left font-size-14">Benefit Valid</span>
        <span class="font-size-14 text-left">Discount value / Percentage</span>
      </template>
    </div>
    <hr style="background-color: #dddddd; height: 1px">
    <div class="fields-cont mt-20" :class="tab">
      <template v-if="tab === 'coupon'">
        <div class="field">
          <input v-model="coupon.code" type="text" class="text-center number-field" placeholder="Coupon code">
        </div>
        <div class="field">
          <maryoku-input
            v-model="coupon.validDate"
            :value="coupon.validDate"
            class="form-input width-90"
            placeholder="Choose date…"
            input-style="date"
            @input="changeDate"
          />
        </div>
        <div class="field">
          <money v-model="coupon.value" class="text-center number-field" v-bind="rateFormat" />
        </div>
      </template>
      <template v-if="tab === 'number_of_guests'">
        <div class="field font-size-14">
          If Number of Participants
        </div>
        <div class="field">
          <Multiselect
            :key="rules.length"
            v-model="number_of_guests.rule"
            class="width-90 mt-5 form-input md-purple"
            :options="rules"
            :close-on-select="true"
            :clear-on-select="true"
            tag-placeholder="Add this as new tag"
            placeholder="Type to search category"
            label="label"
            track-by="value"
          />
        </div>
        <div class="field">
          <input v-model="number_of_guests.gty" type="number" class="text-center number-field" placeholder="100">
        </div>
        <div class="field">
          <money v-model="number_of_guests.value" class="text-center number-field" v-bind="rateFormat" />
        </div>
      </template>
      <template v-if="tab === 'customer_type'">
        <div class="field">
          <Multiselect
            :key="rules.length"
            v-model="customer_type.type"
            class="width-90 mt-5 form-input md-purple"
            :options="rules"
            :close-on-select="true"
            :clear-on-select="true"
            tag-placeholder="Add this as new tag"
            placeholder="Type to search category"
            label="label"
            track-by="value"
          />
        </div>
        <div class="field">
          <money v-model="customer_type.value" class="text-center number-field" v-bind="rateFormat" />
        </div>
      </template>
      <template v-if="tab === 'seasonal'">
        <div class="field">
          <input v-model="seasonal.name" type="text" class="text-center number-field" placeholder="Coupon code">
        </div>
        <div class="field" />
        <div class="field">
          <money v-model="seasonal.value" class="text-center number-field" v-bind="rateFormat" />
        </div>
      </template>
      <md-button
        class="md-vendor maryoku-btn"
        :disabled="isDisabledAdd"
      >
        Add Line
      </md-button>
    </div>
  </div>
</template>

<script>
import { DiscountCustomerTypes, CouponRules } from "@/constants/options";

const components = {
    MaryokuInput: () => import("@/components/Inputs/MaryokuInput.vue"),
    Multiselect: () => import("vue-multiselect"),
};
export default {
    components,
    props: {
        tab: {
            type: String,
        }
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
            rules: CouponRules,
            customerTypes: DiscountCustomerTypes,
            coupon: {
              code: "",
              validDate: new Date(),
              value: "0",
              rate: "%"
            },
            number_of_guests: {
                rule: 0,
                qty: 0,
                value: "0",
                rate: "%"
            },
            customer_type: {
                type: 0,
                value: "0",
                rate: "%",
            },
            seasonal: {
                name: null,
                season: null,
                months: [],
                dates: [],
            }
        };
    },
    computed: {
        isDisabledAdd() {
            return !this.qty || !this.unit;
        },
    },
    methods: {
        changeDate(value) {

        }
    }
};
</script>

<style lang="scss" scoped>
.fields-cont {
    display: grid;
    align-items: center;
    gap: 1%;

    &.coupon{
        grid-template-columns: 30% 30% 30% 10%;
    }
    &.number_of_guests{
        grid-template-columns: 20% 20% 20% 25% 10%;
    }
    &.customer_types{
        grid-template-columns: 20% 20% 20% 40%;
    }
    &.seasonal{
        grid-template-columns: 20% 20% 20% 40%;
    }

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
    min-height: 55px;
}

.number-field {
    text-align: center;
    font-size: 16px;
    padding: 12px 20px;
    border: 1px solid #dddddd;
    border-radius: 0;
    width: 90%;
}
</style>
