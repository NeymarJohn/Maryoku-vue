<template>
  <div>
    <div class="fields-cont font-bold mb-10" :class="tab">
      <span v-for="column in tabsHeader[tab]" :key="column" class="text-left font-size-14">{{column}}</span>
    </div>
    <hr style="background-color: #dddddd; height: 1px">
    <div class="fields-cont mt-20 mb-30" :class="tab">
      <template v-if="tab === 'coupon'">
        <div class="field">
          <input v-model="form[tab].code" type="text" class="text-left number-field" placeholder="Coupon code">
        </div>
        <div class="field">
          <maryoku-input
            v-model="form[tab].validDate"
            :value="form[tab].validDate"
            class="form-input width-90"
            placeholder="Choose date…"
            input-style="date"
            @input="changeDate"
          />
        </div>
      </template>
      <template v-if="tab === 'number_of_guests'">
        <div class="field font-size-14">
          If Number of Participants
        </div>
        <div class="field">
          <Multiselect
            :key="rules.length"
            v-model="form[tab].rule"
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
          <input v-model="form[tab].qty" type="number" class="text-left number-field" placeholder="100">
        </div>
      </template>
      <template v-if="tab === 'customer_type'">
        <div class="field">
          <Multiselect
            :key="customerTypes.length"
            v-model="form[tab].type"
            class="width-90 mt-5 form-input md-purple"
            :options="customerTypes"
            :close-on-select="true"
            :clear-on-select="true"
            tag-placeholder="Add this as new tag"
            placeholder="Type to search category"
            label="label"
            track-by="value"
          />
        </div>
      </template>
      <template v-if="tab === 'seasonal'">
        <div class="field">
          <input v-model="form[tab].name" type="text" class="text-left number-field" placeholder="Season Name">
        </div>
        <div class="field">
          <SeasonalCalendarInput  :season="form[tab].season" :months="form[tab].months" size="width-90" @change="handleSeasonalChange"></SeasonalCalendarInput>
        </div>
      </template>
        <div class="field">
            <money v-model="form.value" class="text-left number-field" v-bind="rateFormat" />
            <button class="suffix" @click="changeRate">{{form.rate}}</button>
        </div>
      <md-button
        class="md-vendor maryoku-btn"
        :disabled="isDisabledAdd"
        @click="save"
      >
        Add Line
      </md-button>
    </div>
    <hr style="background-color: #dddddd; height: 1px">
  </div>
</template>

<script>
import moment from "moment";
import { DiscountCustomerTypes, CouponRules } from "@/constants/options";

const components = {
    MaryokuInput: () => import("@/components/inputs/MaryokuInput.vue"),
    SeasonalCalendarInput: () => import("@/components/inputs/SeasonalCalendarInput.vue"),
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
                precision: 2,
                masked: false,
            },
            tabsHeader: {
                number_of_guests: [
                    "Name", "Rules", "QTY", "Discount value / Percentage",
                ],
                coupon: [
                    "Coupon Code", "Benefit Valid", "Discount value / Percentage",
                ],
                customer_type: [
                    "Customer Types", "Discount value / Percentage",
                ],
                seasonal: [
                    "Period Name", "Benefit Valid", "Discount value / Percentage",
                ],
            },
            rules: CouponRules,
            customerTypes: DiscountCustomerTypes,
            form: {
                coupon: {
                    code: "",
                    validDate: moment().format("DD.MM.YYYY"),
                },
                number_of_guests: {
                    rule: 0,
                    qty: 0,
                },
                customer_type: {
                    type: 0,
                },
                seasonal: {
                    name: null,
                    season: null,
                    months: [],
                },
                value: 0,
                rate: "%"
            }
        };
    },
    computed: {
        isDisabledAdd() {
            return !Object.values(this.form[this.tab]).every(value => !!value);
        },
    },
    methods: {
        changeRate(){
            this.rate = this.rate === "%" ? "$" : "%";
        },
        reset(){
            Object.keys(this.form[this.tab]).forEach(key => {
                if (key === 'validDate') {
                    this.form[this.tab][key] = moment().format("DD.MM.YYYY");
                } else if (key === 'rule' || key === 'type') {
                    this.form[this.tab][key] = 0;
                } else {
                    this.form[this.tab][key] = null;
                }

            });
            this.form.value = 0;
        },
        changeDate(e) {
            this.coupon.validDate = e;
        },
        handleSeasonalChange({season, months}) {
            this.seasonal.season = season;
            this.seasonal.months = months;
        },
        save(){
            let value = {...this.form[this.tab], value: this.form.value, rate: this.form.rate};
            if (this.tab === 'number_of_guests') value.rule = this.form[this.tab].rule.value;
            if (this.tab === 'customer_type') value.type = this.form[this.tab].type.value;

            this.$emit('add', value);
            this.reset();
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
    &.customer_type{
        grid-template-columns: 40% 40% 20%;
    }
    &.seasonal{
        grid-template-columns: 30% 30% 30% 10%;
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

        button.suffix{
            position: absolute;
            transform: translateX(-100%);
            height: 100%;
            width: 60px;
            background: white;
            border: 0.5px solid #dddddd;
            font-size: 16px;
            cursor: pointer;
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
    text-align: left;
    font-size: 16px;
    padding: 12px 20px;
    border: 1px solid #dddddd;
    border-radius: 0;
    width: 90%;
}
</style>
