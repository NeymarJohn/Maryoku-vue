<template>
  <div class="vendor-pricing-policy-item">
    <div class="left">
      {{ editingItem.name }}
      <div v-if="editingItem.yesOption && editingItem.value" class="mt-10 ml-10">
        <label>How many hours are included?</label><br>
        <input v-model="editingItem.yesOption.value" type="number" class="text-center number-field" placeholder="">
      </div>
      <div v-if="editingItem.noOption && !editingItem.value" class="mt-10 ml-10">
        <label>How much is hourly rate?</label><br>
        <input
          v-model="editingItem.noOption.value"
          type="number"
          class="text-center number-field"
          placeholder="00.00"
        >
      </div>
    </div>
    <div class="right d-flex">
      <div class="align-center">
        <div class="top">
          <template v-if="editingItem.type == 'Boolean'">
            <div class="item" @click="setPricePolicy(null, 'option', editingItem.name, true)">
              <img
                v-if="editingItem.value"
                :src="theme === 'red' ? `${iconUrl}Group 5479 (2).svg` : `${$iconURL}common/checked-circle-purple.svg`"
              >
              <span v-else class="unchecked" />
              Yes
            </div>
            <div class="item" @click="setPricePolicy(null, 'option', editingItem.name, false)">
              <img
                v-if="!editingItem.value"
                :src="theme === 'red' ? `${iconUrl}Group 5489 (3).svg` : `${$iconURL}common/close-circle-purple.svg`"
              >
              <span v-else class="unchecked" />
              No
            </div>
          </template>
          <template v-if="editingItem.type == String">
            <div v-if="!noteRules.includes(p)" class="item" @click="noteRule(p)">
              <a class="note" :class="{ 'color-red': theme === 'red', 'color-purple': theme === 'purple' }">
                + Add Note
              </a>
            </div>
            <div v-else class="item noflex">
              <textarea placeholder="Except from the parking area" rows="3" />
              <br>
              <a class="cancel" @click="noteRule(p)">Cancel</a>
            </div>
          </template>
          <template v-if="editingItem.type == 'Including'">
            <div class="item" @click="setPricePolicy(null, 'Including', editingItem.name, true)">
              <img v-if="editingItem.value" :src="`${iconUrl}Group 5479 (2).svg`">
              <span v-else class="unchecked" />
              Include
            </div>
            <div class="item" @click="setPricePolicy(null, 'Including', editingItem.name, false)">
              <img v-if="!editingItem.value" :src="`${iconUrl}Group 5489 (3).svg`">
              <span v-else class="unchecked" />
              Not Include
            </div>
          </template>
          <template v-if="editingItem.type == 'Selection'">
            <select v-model="editingItem.value" class="unit-select">
              <option v-for="(option, index) in editingItem.options" :key="index" :value="option">
                {{ option }}
              </option>
            </select>
          </template>
          <template v-if="editingItem.type == 'MultiSelection'">
            <category-selector
              :value="editingItem.value"
              :categories="editingItem.options"
              :multiple="true"
              @change="changeCategorySelector(...arguments)"
            />
          </template>
          <template v-if="editingItem.type == 'DiscountForLarge'">
            <div class="item" @click="editingItem.isSelected = true">
              <img
                v-if="editingItem.isSelected"
                :src="theme === 'red' ? `${iconUrl}Group 5479 (2).svg` : `${$iconURL}common/checked-circle-purple.svg`"
              >
              <span v-else class="unchecked" />
              Yes
            </div>
            <div class="item" @click="editingItem.isSelected = false">
              <img
                v-if="!editingItem.isSelected"
                :src="theme === 'red' ? `${iconUrl}Group 5489 (3).svg` : `${$iconURL}common/close-circle-purple.svg`"
              >
              <span v-else class="unchecked" />
              No
            </div>
          </template>
        </div>
        <div v-if="editingItem.type == 'Number'" class="bottom no-margin">
          <template v-if="editingItem.noSuffix">
            <span v-if="editingItem.labelForValue">{{ editingItem.labelForValue }}</span>
            <div>
              <input v-model="editingItem.value" type="number" class="text-center number-field" placeholder="">
            </div>
          </template>
          <template v-else>
            <span v-if="editingItem.isPercentage">Rate (%)</span>
            <span v-else>{{ editingItem.labelForValue || "" }}</span>
            <br>
            <div v-if="editingItem.isPercentage" class="percentage">
              <!-- <input type="number" class placeholder="00.00" v-model="editingItem.value" @input="setPricePolicy" /> -->
              <money v-model="editingItem.value" class="text-center number-field" v-bind="rateFormat" />
            </div>
            <div v-else class="">
              <!-- <input type="number" class placeholder="00.00" v-model="editingItem.value" @input="setPricePolicy" /> -->
              <money v-model="editingItem.value" class="text-center number-field" v-bind="currencyFormat" />
              <div v-if="editingItem.units">
                <multiselect
                  v-model="editingItem.unit"
                  class="mt-20 unit-select"
                  :class="{ ' md-red': theme === 'red', 'md-purple': theme === 'purple' }"
                  :options="editingItem.units"
                  :searchable="false"
                />
              </div>
            </div>
          </template>
        </div>
        <div v-if="editingItem.type == 'Including' && !editingItem.value" class="bottom mt-30">
          <span>Extra Payment</span>
          <br>
          <div class="suffix">
            <input v-model="editingItem.cost" type="number" class="text-center number-field" placeholder="00.00">
          </div>
        </div>
        <div v-if="editingItem.type == 'Cost'" class="bottom mt-0 no-margin">
          <span>Cost</span>
          <br>
          <div class="">
            <!-- <input
              type="number"
              class="text-center number-field"
              placeholder="00.00"
              v-model="editingItem.value"
              @input="setPricePolicy"
            /> -->
            <money v-model="editingItem.value" class="text-center number-field" v-bind="currencyFormat" />
            <span v-if="editingItem.qtyUnit" class="ml-10">per {{ editingItem.qtyUnit }}</span>
          </div>
        </div>
        <div v-if="editingItem.type == 'Discount'" class="bottom mt-0 no-margin">
          <span>Discount</span>
          <br>
          <div class="d-flex">
            <!-- <input
              type="number"
              class="text-center number-field"
              placeholder="00.00"
              v-model="editingItem.value"
              @change="setPricePolicy"
            /> -->
            <money v-model="editingItem.value" class="text-center number-field" v-bind="rateFormat" />
            <div v-if="editingItem.units">
              <multiselect
                v-model="editingItem.unit"
                class="mt-20 unit-select"
                :class="{ ' md-red': theme === 'red', 'md-purple': theme === 'purple' }"
                :options="editingItem.units"
                :searchable="false"
              />
            </div>
          </div>
        </div>
        <div v-if="editingItem.type == 'DiscountForLarge' && editingItem.isSelected" class="bottom mt-10 no-margin">
          <div>
            <span class="d-block">
              {{ editingItem.labelForAttendees || "How many" }}
            </span>
            <input
              v-model="editingItem.attendees"
              type="number"
              class="text-center number-field"
              placeholder="Attendees"
            >
          </div>
          <br>
          <div>
            <span class="d-block">
              {{ editingItem.labelForValue || "How many" }}
            </span>
            <money v-model="editingItem.value" class="text-center number-field" v-bind="rateFormat" />
          </div>
        </div>
        <div v-if="editingItem.type == 'GroupDiscount'" class="bottom mt-10 no-margin">
          <div>
            <span class="d-block">
              {{ editingItem.labelForValue || "How many" }}
            </span>
            <money v-model="editingItem.value" class="text-center number-field" v-bind="rateFormat" />
          </div>
          <br>
          <div>
            <span class="d-block">
              {{ editingItem.labelForGroupSize || "How many" }}
            </span>
            <input
              v-model="editingItem.groupSize"
              type="number"
              class="text-center number-field"
              placeholder="Group Size"
            >
          </div>
        </div>
        <div
          v-if="
            editingItem.hasOwnProperty('attendees') &&
              ((editingItem.type == 'Boolean' && editingItem.value) || editingItem.type == 'Number')
          "
          class="bottom mt-30"
        >
          <span :class="{ 'd-block': editingItem.type != 'Boolean', 'mr-10': editingItem.type == 'Boolean' }">
            {{ editingItem.labelForValue || "How many" }}
          </span>

          <input
            v-model="editingItem.attendees"
            type="number"
            class="text-center number-field"
            placeholder="Attendees"
            @input="setPricePolicy()"
          >
        </div>
        <div
          v-if="editingItem.hasOwnProperty('discount') && editingItem.type == 'Boolean' && editingItem.value"
          class="bottom mt-30"
        >
          <span class="d-block">{{
            editingItem.hasOwnProperty("labelForValue") ? editingItem.labelForValue : "How many"
          }}</span>
          <div class="d-flex align-center">
            <input
              v-model="editingItem.discount"
              type="number"
              class="text-center number-field w-max-120"
              placeholder=""
              @input="setPricePolicy()"
            >
            <div v-if="editingItem.hasUnit" class="ml-10">
              <multiselect
                v-model="editingItem.unit"
                class="unit-select"
                :class="{ ' md-red': theme === 'red', 'md-purple': theme === 'purple' }"
                :options="editingItem.units"
                :searchable="false"
              />
            </div>
          </div>
        </div>
        <div v-if="editingItem.type == 'CostAndQty'" class="bottom no-margin">
          <span v-if="editingItem.labelForDefaultQty">{{ editingItem.labelForDefaultQty }}</span>
          <div>
            <input v-model="editingItem.defaultQty" type="number" class="text-center number-field" placeholder="">
          </div>
          <br>
          <span v-if="editingItem.labelForValue">{{ editingItem.labelForValue }}</span>
          <div>
            <money v-model="editingItem.value" class="text-center number-field" v-bind="currencyFormat" />
          </div>
        </div>
      </div>
      <div v-if="editingItem.hasComment" class="bottom mt-0 ml-40 flex-1 add-not-section">
        <div class="item">
          <div
            class="cursor-pointer align-center"
            :class="{ 'color-red': theme === 'red', 'color-purple': theme === 'purple' }"
            @click="notable = !notable"
          >
            <template v-if="notable">
              <md-icon :class="{ 'color-red': theme === 'red', 'color-purple': theme === 'purple' }">
                remove
              </md-icon>
              Cancel Note
            </template>
            <template v-else>
              <md-icon :class="{ 'color-red': theme === 'red', 'color-purple': theme === 'purple' }">
                add
              </md-icon>
              Add Note
            </template>
          </div>
          <textarea
            v-if="editingItem.hasComment && notable"
            v-model="editingItem.desc"
            class="desc width-100"
            rows="3"
            :placeholder="editingItem.placeholder ? editingItem.placeholder : `Except from the parking area`"
            @input="setNote"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CategorySelector from "@/components/Inputs/CategorySelector";

export default {
  name: "VendorPricingPolicyItem",
  components: [CategorySelector],
  props: {
    item: {
      type: Object,
      required: true,
    },
    theme: {
      type: String,
      default: "purple",
    },
  },
  data() {
    return {
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
      notable: false,
      currencyFormat: {
        decimal: ".",
        thousands: ",",
        prefix: "$  ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      rateFormat: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: " %",
        precision: 2,
        masked: false,
      },
      editingItem: null,
    };
  },
  watch: {
    editingItem: {
      handler(newValue, oldValue) {
        this.$emit("update", newValue);
      },
      deep: true,
    },
  },
  created() {
    this.editingItem = Object.assign({}, this.item);
  },
  methods: {
    setPricePolicy(e, type, name, value) {
      if ((type === "option" || type === "Including") && name) {
        this.editingItem.value = value;
      } else {
        if (e.target) {
          this.editingItem.value = e.target.value;
        } else {
          console.log("test", e);
          this.editingItem.value = e;
        }
      }
      // this.$emit("update", this.item);
    },
    setPricePolicyWithValue(value) {
      if (editingItem.value != value) {
      }
      // this.$emit("update", this.item);
    },
    setNote() {
      this.$emit("update", this.item);
    },
    changeCategorySelector(value) {
      // console.log(type, item, value);
      this.editingItem.value = value;
      this.$emit("update", this.item);
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-pricing-policy-item {
  padding: 2rem 0;
  border-bottom: 1px solid #dddddd;
  font: 600 16px Manrope-Regular, sans-serif;

  &:first-child {
    padding-top: 0;
  }
  display: flex;
  justify-content: flex-start;
  .left {
    flex: 1;
  }
  .v-grid-with-desc {
    display: grid;
    grid-template-rows: 20% 80%;
  }
  .right {
    flex: 1;
    justify-content: space-between;
    .top {
      display: flex;
      align-items: start;

      .item {
        display: flex;
        justify-content: flex-start;
        margin-right: 2rem;
        text-align: right;
        cursor: pointer;

        span {
          &.unchecked {
            display: inline-block;
            width: 30px;
            height: 30px;
            border: 1px solid #707070;
            border-radius: 50%;
            background: #ffffff;
            margin-right: 14px;
            position: relative;
            top: -4px;
          }
        }
        img {
          width: 30px;
          height: 30px;
          margin-right: 1rem;
          position: relative;
          top: -4px;
        }
        a {
          font: 800 16px Manrope-Regular, sans-serif;
          cursor: pointer;
          &.cancel {
            color: #050505;
          }
        }
        &:last-child {
          margin-right: 0;
        }
        textarea {
          width: 100% !important;
        }
        &.noflex {
          flex: 1;
          display: inline-block;
          cursor: none;
        }
      }
    }
    .bottom {
      margin-top: 2rem;
      span {
        font: normal 16px Manrope-Regular, sans-serif;
        margin-bottom: 1rem;
        display: inline-block;
      }
      .suffix {
        &:before {
          content: "$";
          position: absolute;
          font-size: 16px;
          color: #818080;
          margin-top: 13px;
          margin-left: 2rem;
        }
        &.percentage {
          &:before {
            content: "%";
          }
        }
        input {
          text-align: center;
          font-size: 16px;
          padding: 12px 20px;
          /*width: 40%;*/
          width: 12rem;
          border: 1px solid #dddddd;
          border-radius: 0;
        }
      }
      .number-field {
        text-align: center;
        font-size: 16px;
        padding: 12px 20px;
        /*width: 40%;*/
        width: 12rem;
        border: 1px solid #dddddd;
        border-radius: 0;
      }
    }
    .add-not-section {
      max-width: 50%;
    }
  }
  select {
    line-height: 1.5em;
    border: 1px solid #dddddd;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    color: #050505;
  }
  /deep/ .multiselect {
    font-weight: normal;
    .multiselect__tags {
      min-height: 1em;
      padding: 12px 50px 12px 12px;
    }
    .multiselect__placeholder {
      font-size: 16px;
      padding: 0px 0;
      margin: 0;
      line-height: 1em;
    }

    .multiselect__select {
      top: 50%;
      width: 20px;
      height: 20px;
      right: 20px;
      padding: 4px 4px;
      transform: translateY(-50%);
    }
    &--active {
      .multiselect__select {
        transform: translateY(-50%) rotate(180deg);
      }
      .multiselect__placeholder {
        display: inline-block;
      }
    }
    .multiselect__input {
      margin: 0;
    }
    .multiselect__single {
      line-height: 1em;
      min-height: 1em;
      margin: 0;
      vertical-align: middle;
    }
    .multiselect__option--selected {
      background: transparent;
      color: #050505;
    }
  }
}
textarea {
  resize: none;
  width: 75%;
  padding: 1.5rem 2rem;
  font-size: 16px;

  &.desc {
    display: block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
  }
}
.flex-1 {
  flex: 1;
}
.no-margin {
  margin: 0 !important;
}
</style>
