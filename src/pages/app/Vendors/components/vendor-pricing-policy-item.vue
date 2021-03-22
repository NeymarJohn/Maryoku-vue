<template>
  <div class="rule">
    <div class="left">
      {{ item.name }}
      <div v-if="item.yesOption && item.value" class="mt-10 ml-10">
        <label>How many hours are included?</label><br />
        <input type="number" class="text-center number-field" placeholder="" v-model="item.yesOption.value" />
      </div>
      <div v-if="item.noOption && !item.value" class="mt-10 ml-10">
        <label>How much is hourly rate?</label><br />
        <input type="number" class="text-center number-field" placeholder="00.00" v-model="item.noOption.value" />
      </div>
    </div>
    <div class="right d-flex">
      <div class="align-center">
        <div class="top">
          <template v-if="item.type == Boolean">
            <div class="item" @click="setPricePolicy(null, 'option', item.name, true)">
              <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="item.value" />
              <span class="unchecked" v-else></span>
              Yes
            </div>
            <div class="item" @click="setPricePolicy(null, 'option', item.name, false)">
              <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!item.value" />
              <span class="unchecked" v-else></span>
              No
            </div>
          </template>
          <template v-if="item.type == String">
            <div class="item" v-if="!noteRules.includes(p)" @click="noteRule(p)">
              <a class="note">+ Add Note</a>
            </div>
            <div class="item noflex" v-else>
              <textarea placeholder="Except from the parking area" rows="3" />
              <br />
              <a class="cancel" @click="noteRule(p)">Cancel</a>
            </div>
          </template>
          <template v-if="item.type == 'Including'">
            <div class="item" @click="setPricePolicy(null, 'Including', item.name, true)">
              <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="item.value" />
              <span class="unchecked" v-else></span>
              Include
            </div>
            <div class="item" @click="setPricePolicy(null, 'Including', item.name, false)">
              <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!item.value" />
              <span class="unchecked" v-else></span>
              Not Include
            </div>
          </template>
          <template v-if="item.type == 'Selection'">
            <select class="unit-select" v-model="item.value" @change="setPricePolicy">
              <option v-for="(option, index) in item.options" :key="index" :value="option">
                {{ option }}
              </option>
            </select>
          </template>
          <template v-if="item.type == 'MultiSelection'">
            <category-selector
              :value="item.value"
              :categories="item.options"
              :multiple="true"
              @change="changeCategorySelector(...arguments)"
            ></category-selector>
          </template>
        </div>
        <div class="bottom no-margin" v-if="item.type == Number">
          <template v-if="item.noSuffix">
            <span v-if="item.label">{{ item.label }}</span>
            <div>
              <input
                type="number"
                class="text-center number-field"
                placeholder=""
                v-model="item.value"
                @input="setPricePolicy"
              />
            </div>
          </template>
          <template v-else>
            <span v-if="item.isPercentage">Rate (%)</span>
            <span v-else>How much extra</span>
            <br />
            <div class="suffix percentage" v-if="item.isPercentage">
              <input type="number" class placeholder="00.00" v-model="item.value" @input="setPricePolicy" />
            </div>
            <div class="suffix" v-else>
              <input type="number" class placeholder="00.00" v-model="item.value" @input="setPricePolicy" />
              <div v-if="item.units">
                <select class="unit-select mt-20" v-model="item.unit">
                  <option v-for="(unit, index) in item.units" :key="index" :value="unit">{{ unit }}</option>
                </select>
              </div>
            </div>
          </template>
        </div>
        <div class="bottom mt-30" v-if="item.type == 'Including' && !item.value">
          <span>Extra Payment</span>
          <br />
          <div class="suffix">
            <input
              type="number"
              class="text-center number-field"
              placeholder="00.00"
              v-model="item.cost"
              @change="setPricePolicy"
            />
          </div>
        </div>
        <div class="bottom mt-0 no-margin" v-if="item.type == 'Cost'">
          <span>Cost</span>
          <br />
          <div class="suffix">
            <input
              type="number"
              class="text-center number-field"
              placeholder="00.00"
              v-model="item.value"
              @input="setPricePolicy"
            />
            <span class="ml-10" v-if="item.unit">per {{ item.unit }}</span>
          </div>
        </div>
        <div class="bottom mt-0 no-margin" v-if="item.type == 'Discount'">
          <span>Discount</span>
          <br />
          <div class="suffix d-flex">
            <input
              type="number"
              class="text-center number-field"
              placeholder="00.00"
              v-model="item.value"
              @change="setPricePolicy"
            />
            <div v-if="item.units">
              <select class="unit-select ml-10" v-model="item.unit">
                <option v-for="(unit, index) in item.units" :key="index" :value="unit">{{ unit }}</option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="bottom mt-30"
          v-if="item.hasOwnProperty('attendees') && ((item.type == Boolean && item.value) || item.type == Number)"
        >
          <span :class="{ 'd-block': item.type != Boolean, 'mr-10': item.type == Boolean }">
            {{ item.labelForValue || "How many" }}
          </span>

          <input
            type="number"
            class="text-center number-field"
            placeholder="Attendees"
            v-model="item.attendees"
            @input="setPricePolicy()"
          />
        </div>
        <div class="bottom mt-30" v-if="item.hasOwnProperty('discount') && item.type == Boolean && item.value">
          <span class="d-block">{{ item.hasOwnProperty("label") ? item.label : "How many" }}</span>
          <input
            type="number"
            class="text-center number-field w-max-120"
            placeholder=""
            v-model="item.discount"
            @input="setPricePolicy()"
          />
          <br />
          <div class="ml-10" v-if="item.hasUnit">
            <select class="unit-select ml-10" v-model="item.unit">
              <option v-for="(unit, index) in item.units" :key="index" :value="unit">{{ unit }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="bottom mt-0 ml-40 flex-1" v-if="item.hasComment">
        <div class="item">
          <div class="color-red cursor-pointer align-center" @click="notable = !notable">
            <template v-if="notable">
              <md-icon class="color-red">remove</md-icon>
              Cancel Note
            </template>
            <template v-else>
              <md-icon class="color-red">add</md-icon>
              Add Note
            </template>
          </div>
          <textarea
            v-if="item.hasComment && notable"
            class="desc width-100"
            rows="3"
            v-model="item.desc"
            :placeholder="item.placeholder ? item.placeholder : `Except from the parking area`"
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
  name: "vendor-pricing-policy-item",
  components: [CategorySelector],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
      notable: false,
    };
  },
  methods: {
    setPricePolicy(e, type, name, value) {
      if ((type === "option" || type === "Including") && name) {
        this.item.value = value;
      } else {
        this.item.value = e.target.value;
      }

      this.$emit("update", this.item);
    },
    setNote() {
      this.$emit("update", this.item);
    },
    changeCategorySelector(value) {
      // console.log(type, item, value);
      this.item.value = value;
      this.$emit("update", this.item);
    },
  },
  watch: {
    item: {
      handler() {},
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.rule {
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
          &.note {
            color: #f51355;
          }
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
          padding: 22px 30px;
          /*width: 40%;*/
          width: 12rem;
          border: 1px solid #dddddd;
          border-radius: 0;
        }
      }
      .number-field {
        text-align: center;
        font-size: 16px;
        padding: 22px 30px;
        /*width: 40%;*/
        width: 12rem;
        border: 1px solid #dddddd;
        border-radius: 0;
      }
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
