<template>
  <div class="vendor-discount-item-wrapper">
    <div class="collapsed" @click="expand()">
      <template v-if="tab === 'coupon'">
        <div v-if="!isEditable" class="col label">
          {{ editingData.code }}
        </div>
        <input v-else v-model="editingData.code" class="col">

        <div v-if="!isEditable" class="col">
          <span v-if="editingData.validDate">{{ editingData.validDate }}</span>
        </div>
        <div v-else class="col">
          <maryoku-input
            v-model="editingData.validDate"
            :value="editingData.validDate"
            class="form-input width-90"
            placeholder="Choose date…"
            input-style="date"
            @input="changeDate"
          />
        </div>
      </template>
      <template v-if="tab === 'number_of_guests'">
        <div v-if="!isEditable" class="col text-left">
          <span>{{ getRuleLabel(editingData.rule) }}</span>
        </div>
        <div v-else class="col">
          <Multiselect
            :key="rules.length"
            v-model="editingData.rule"
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

        <div v-if="!isEditable" class="col">
          <span v-if="editingData.qty">{{ editingData.qty | withComma(Number) }} Guests</span>
        </div>
        <div v-else class="col">
          <input v-model="editingData.qty">
        </div>
      </template>

      <template v-if="tab === 'customer_type'">
        <div v-if="!isEditable" class="col text-left">
          <span>{{ getCustomerTypeLabel(editingData.type) }} Customer</span>
        </div>
        <div v-else class="col">
          <Multiselect
            :key="rules.length"
            v-model="editingData.type"
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
        <div class="col" />
      </template>
      <template v-if="tab === 'seasonal'">
        <div v-if="!isEditable" class="col text-left">
          {{ editingData.name }}
        </div>
        <input v-else v-model="editingData.code" class="col">

        <div class="col" />
      </template>
      <div v-if="!isEditable" class="col text-right">
        {{ `${editingData.value}${editingData.rate}` }}
      </div>
      <div v-else class="col">
        <money v-model="editingData.value" class="text-center number-field" v-bind="rateFormat" />
      </div>
      <div v-if="!isEditable" class="col action">
        <img class="mr-20 ml-auto" :src="`${$iconURL}Requirements/edit-dark.svg`" @click="edit">
        <img :src="`${$iconURL}Requirements/delete-dark.svg`" @click="remove">
      </div>
      <div v-else class="col">
        <md-button class="md-simple md-black maryoku-btn" @click="cancel">
          Cancel
        </md-button>
        <md-button
          class="md-vendor maryoku-btn"
          @click="save"
        >
          Save
        </md-button>
      </div>
    </div>
    <div v-if="expanded" class="expanded">
      <span v-if="!isEditable">{{ editingData.desc }}</span>
      <textarea v-else v-model="editingData.desc" />
    </div>
  </div>
</template>

<script>
import { DiscountCustomerTypes, CouponRules } from "@/constants/options";

const components = {
    MaryokuInput: () => import("@/components/inputs/MaryokuInput.vue"),
    Multiselect: () => import("vue-multiselect"),
    Money: () => import("v-money"),
};
export default {
    components,
    filters: {},
    props: {
        item: Object,
        tab: {
            type: String,
        }
    },
    data() {
        return {
            expanded: false,
            isEditable: false,
            editingData: {},
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
        };
    },
    mounted() {
        console.log("discount.item", this.item, this.tab);
        this.editingData = Object.assign({}, this.item);
    },
    methods: {
        getRuleLabel(value) {
            if (!value) return "";
            return this.rules.find(r => r.value === value).label;
        },
        getCustomerTypeLabel(value){
            if (!value) return "";
            return this.customerTypes.find(c => c.value === value).label;
        },
        expand() {
            if (this.item.desc) {
                this.expanded = !this.expanded;
            }
        },
        getQty() {
            return this.item.sub;
        },
        getPrice() {
            if (this.item.value) {
                return this.item.value;
            } else {
                return null;
            }
        },
        changePrice(value) {
            console.log(value);
        },
        changeDate() {

        },
        changeItem() {
            this.$emit("change", this.editingData);
        },
        edit() {
            this.isEditable = true;
        },
        remove() {
            this.item.checked = false;
            console.log("remvoe", this.item);
            this.$emit("change", this.item);
        },
        cancel() {
            this.editingItem = Object.assign({}, this.item);
            this.isEditable = false;
        },
        save() {
            this.isEditable = false;
            this.changeItem();
        },
    },
};
</script>
<style lang="scss" scoped>
.vendor-discount-item-wrapper {
    font-family: Manrope-Regular, sans-serif;
    color: #050505;
    border-bottom: 1px solid #dddddd;

    .collapsed {
        display: grid;
        grid-template-columns: 35% 35% 10% 10% 10%;
        padding: 1rem 0;
        grid-gap: 5px;
        .col {
            flex: 1;
            display: flex;
            align-items: center;
            padding: 10px 0;
            img {
                width: 20px;
            }
            &:first-child {
                flex: 2;
                font: bold 16px Manrope-Regular, sans-serif;
            }
            &:last-child {
                text-align: right;
            }

            input {
                text-align: center;
                border-radius: 3px;
                border: 1px solid #818080;
                max-width: 160px;
                font: normal 16px Manrope-Regular, sans-serif;
                color: #050505;
            }

            .field {
                display: inline-block;
            }

            .field:before {
                content: "$";
                position: absolute;
                margin-top: 15px;
                margin-left: 3rem;
            }
        }

        .action {
            opacity: 0;
            display: flex;
            flex-flow: nowrap;
            cursor: pointer;
        }

        &:hover {
            .action {
                opacity: 1;
            }
        }
    }
    .expanded {
        max-width: 40%;
        font: normal 14px Manrope-Regular, sans-serif;
        padding-bottom: 1rem;

        textarea {
            min-width: 300px;
        }
    }
}
</style>
