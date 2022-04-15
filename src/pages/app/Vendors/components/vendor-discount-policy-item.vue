<template>
  <div class="vendor-discount-item-wrapper">
    <div class="collapsed" @click="expand()">
      <template v-if="tab === 'coupon'">
        <div v-if="!isEditable" class="col label">
          {{ editingData.code }}
        </div>
        <div v-else class="col">
          <input v-model="editingData.code" class="text-left number-field">
        </div>

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

        <div class="col text-capitalize">
          <div>
            <div class="d-flex align-center mr-10">
              <span v-if="editingData.from" class="mr-5">{{ editingData.from.year }}</span>
              <span v-if="editingData.from"> {{ editingData.from.season }}</span>
              <template v-if="editingData.from && editingData.from.months">
                <span v-for="(month, idx) in editingData.from.months" :key="idx" class="ml-10">
                  {{ getMonthLabel(month) }}{{ idx < editingData.from.months.length - 1 ? ',' : '' }}
                </span>
              </template>
            </div>
            <div class="d-flex align-center">
              <span v-if="editingData.to" class="mr-5">{{ editingData.to.year }}</span>
              <span v-if="editingData.to"> {{ editingData.to.season }}</span>
              <template v-if="editingData.to && editingData.to.months">
                <span v-for="(month, idx) in editingData.to.months" :key="idx" class="ml-10">
                  {{ getMonthLabel(month) }}{{ idx < editingData.to.months.length - 1 ? ',' : '' }}</span>
              </template>
            </div>
          </div>
        </div>
      </template>
      <div v-if="!isEditable" class="col text-right">
        {{ editingData.value | withComma }} {{ editingData.rate }}
      </div>
      <div v-else class="col">
        <div class="position-relative">
          <money v-model="editingData.value" class="text-center number-field" v-bind="rateFormat" />
          <button class="suffix" @click="changeRate('seasonal')">
            {{ editingData.rate }}
          </button>
        </div>
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
import { DiscountCustomerTypes, CouponRules, MonthOptions } from "@/constants/options";

const components = {
	MaryokuInput: () => import("@/components/Inputs/MaryokuInput.vue"),
	Multiselect: () => import("vue-multiselect"),
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
                precision: 2,
                masked: false,
            },
            monthOptions: MonthOptions,
            rules: CouponRules,
            customerTypes: DiscountCustomerTypes,
        };
    },
    mounted() {
        console.log("discount.item", this.item, this.tab);
        this.editingData = Object.assign({}, this.item);
    },
    methods: {
        changeRate(tab){
            this.editingData.rate = this.editingData.rate === "%" ? "$" : "%";
        },
        getMonthLabel(value) {
            if (!value) return "";
            return this.monthOptions.find(r => r.value == value).label;
        },
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
        },
        changeDate() {

        },
        changeItem() {
            this.$emit("change", {type: "update", value: this.editingData} );
        },
        edit() {
            this.isEditable = true;
        },
        remove() {
            this.$emit("change", {type: "remove"});
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
		position: relative;
		display: grid;
		grid-template-columns: 30% 30% 30% 20%;
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
				font-size: 16px;
				padding: 12px 20px;
				border: 1px solid #dddddd;
				border-radius: 0;
				min-height: 55px;
			}

			.field {
				display: inline-block;
			}

			.number-field {
				text-align: left;
				font-size: 16px;
				padding: 12px 20px;
				border: 1px solid #dddddd;
				border-radius: 0;
				width: 90%;
			}

			button.suffix {
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

		.action {
			position: absolute;
			right: -100px;
			top: 0;
			height: 100%;
			opacity: 0;
			display: flex;
			align-items: center;
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
