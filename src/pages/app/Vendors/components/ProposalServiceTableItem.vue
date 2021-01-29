<template>
  <div
    class="proposal-service-item-wrapper"
    v-if="serviceType == 'cost'"
    :class="{ containPlannerOptions: item.plannerOptions && item.plannerOptions.length > 0 }"
  >
    <template v-if="item.plannerOptions.length == 0">
      <div class="item-cont">
        {{ item.requirementTitle }}
        <span class="madatory-badge" v-if="item.isMandatory">Mandatory</span>
        <div class="mt-20 comment-area" v-if="!isEdit">{{ item.comment }}</div>
        <textarea class="mt-20" v-else v-model="item.comment"></textarea>
      </div>
      <div class="size-cont editor-wrapper">
        <template v-if="!isEdit">{{ item.requirementSize }}</template>
        <template v-else>
          <input class="input-value" type="text" v-model="item.requirementSize" />
        </template>
      </div>
      <div class="qty-cont editor-wrapper">
        <template v-if="!isEdit">{{ item.priceUnit === "total" ? 1 : item.requirementValue }}</template>
        <template v-else>
          <input class="input-value" type="number" v-model="item.requirementValue" />
        </template>
      </div>
      <div class="price-cont editor-wrapper">
        <template v-if="!isEdit">
          $
          {{
            item.priceUnit == "total"
              ? parseFloat(String(item.price).replace(/,/g, "")) / item.requirementValue
              : item.price | withComma
          }}
        </template>
        <template v-else>
          <money
            v-model="item.price"
            v-bind="{
              decimal: '.',
              thousands: ',',
              prefix: '$ ',
              suffix: '',
              precision: 2,
              masked: false,
            }"
            class="input-value"
          />
        </template>
      </div>
      <div class="total-cont editor-wrapper">
        <template v-if="!isEdit"
          >$ {{ item.priceUnit == "total" ? item.price : (item.price * item.requirementValue) | withComma }}</template
        >
        <template v-else>
          <!-- <input class="input-value" v-model="item.price" type="number" /> -->
          <money
            v-if="item.priceUnit == 'total'"
            v-model="item.price"
            v-bind="{
              decimal: '.',
              thousands: ',',
              prefix: '$ ',
              suffix: '',
              precision: 2,
              masked: false,
            }"
            class="input-value"
          />
          <div>$ {{ subTotal }}</div>
        </template>
      </div>
      <div class="action-cont editor-wrapper">
        <template v-if="isEdit">
          <a class="cancel" @click="cancel()">Cancel</a>
          <a class="save" @click="save(item)">Save</a>
        </template>
        <md-menu md-size="medium" :md-offset-x="240" :md-offset-y="-36" class="action-menu">
          <md-button md-menu-trigger class="edit-btn md-simple" style="height: 40px">
            <md-icon style="font-size: 40px !important">more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item @click="isEdit = true">
              <span> <img :src="`${$iconURL}common/edit-dark.svg`" class="label-icon mr-10" />Edit</span>
            </md-menu-item>
            <md-menu-item @click="removeRequirement(item)">
              <span> <img :src="`${$iconURL}common/trash-dark.svg`" class="label-icon mr-10" />Delete</span>
            </md-menu-item>
            <md-menu-item @click="isEdit = true">
              <span> <img :src="`${$iconURL}common/comment-dark.svg`" class="label-icon mr-10" />Add comment</span>
            </md-menu-item>
            <md-menu-item @click="isEdit = true">
              <span>
                <md-icon class="color-black mr-10">add_circle_outline</md-icon>
                Add an alternative</span
              >
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </template>
    <template v-else>
      <div>
        <div class="description-wrapper">
          <div class="item-cont">
            {{ item.requirementTitle }}
            <span class="madatory-badge" v-if="item.isMandatory">Mandatory</span>
          </div>
          <div class="size-cont editor-wrapper">
            <template v-if="!isEdit">{{ item.requirementSize }}</template>
            <template v-else>
              <input class="input-value" type="text" v-model="item.requirementSize" />
            </template>
          </div>
        </div>
        <div class="planner-options">
          <img
            :src="`${$iconURL}Onboarding/enter-gray.svg`"
            style="margin-right: 10px; position: absolute; margin-top: 30px"
          />
          <div
            v-for="(plannerOption, index) in item.plannerOptions"
            :key="`planner-${index}`"
            class="planner-options-item"
          >
            <div>
              <div class="font-size-14 font-normal color-gray">Option {{ ("0" + (index + 1)).slice(-2) }}</div>
              <div class="font-size-16 font-normal color-gray">{{ plannerOption.description }}</div>
            </div>
            <money
              v-model="plannerOption.price"
              v-bind="{
                decimal: '.',
                thousands: ',',
                prefix: '$ ',
                suffix: '',
                precision: 2,
                masked: false,
              }"
              class="input-value"
            />
            <div class="font-size-16 font-normal color-gray text-center">$ {{ subTotal }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div v-else-if="serviceType == 'included'">
    <div class="proposal-service-item-wrapper included-services">
      <div class="item-cont">
        <img :src="`${$iconURL}Vendor Signup/Group 5479 (2).svg`" style="width: 25px; height: 25px" />
        {{ item.requirementTitle }}
        <span class="madatory-badge" v-if="item.isMandatory">Mandatory</span>
        <span class="complementary-badge" v-if="item.isComplementary">
          Complementary
          <md-button class="md-simple md-black remove-button edit-btn" @click="setValue('isComplementary', false)">
            <md-icon>close</md-icon>
          </md-button>
        </span>
        <br />
        <div class="mt-20 comment-area" v-if="!isEdit">{{ item.comment }}</div>
        <textarea class="mt-20" v-else v-model="item.comment"></textarea>
      </div>
      <div class="size-cont editor-wrapper">
        <template v-if="!isEdit">{{ item.requirementSize }}</template>
        <template v-else>
          <input class="input-value" type="text" v-model="item.requirementSize" />
        </template>
      </div>
      <div class="qty-cont editor-wrapper">
        <template v-if="!isEdit">{{ item.priceUnit === "total" ? 1 : item.requirementValue }}</template>
        <template v-else>
          <input class="input-value" type="number" v-model="item.requirementValue" />
        </template>
      </div>
      <div class="price-cont editor-wrapper">
        <template v-if="isEdit">
          <money
            v-model="item.price"
            v-bind="{
              decimal: '.',
              thousands: ',',
              prefix: '$ ',
              suffix: '',
              precision: 2,
              masked: false,
            }"
            class="input-value"
          />
        </template>
      </div>
      <div class="total-cont editor-wrapper"></div>
      <div class="action-cont editor-wrapper">
        <template v-if="isEdit">
          <a class="cancel" @click="cancel()">Cancel</a>
          <a class="save" @click="save(item)">Save</a>
        </template>
        <md-button class="md-simple edit-btn md-dark" @click="isExpanded = !isExpanded">
          <md-icon class="color-dark" v-if="isExpanded">keyboard_arrow_down</md-icon>
          <md-icon class="color-dark" v-else>keyboard_arrow_right</md-icon>
        </md-button>
        <md-menu md-size="medium" :md-offset-x="240" :md-offset-y="-36" class="action-menu">
          <md-button md-menu-trigger class="edit-btn md-simple" style="height: 40px">
            <md-icon style="font-size: 40px !important">more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item @click="isEdit = true">
              <span>
                <img
                  :src="`${$iconURL}budget+screen/SVG/Asset%2010.svg`"
                  class="label-icon mr-10"
                  style="height: 30px"
                />
                Add price
                <span>
                  <md-icon class="color-gray" style="font-size: 40px; margin-left: 10px">help_outline</md-icon>
                  <md-tooltip md-direction="top" class="bg-gray" :md-active="true">
                    Clicking ‘Add price’ will move this item to <br />the “Paid elements” table above
                  </md-tooltip>
                </span>
              </span>
            </md-menu-item>
            <md-menu-item @click="isEdit = true">
              <span> <img :src="`${$iconURL}common/comment-dark.svg`" class="label-icon mr-10" />Add comment</span>
            </md-menu-item>
            <md-menu-item @click="setValue('isComplementary', true)" v-if="!item.isComplementary">
              <span>
                <img :src="`${$iconURL}common/gift-dark.svg`" class="label-icon mr-10" />Mark as complementary</span
              >
            </md-menu-item>
            <md-menu-item @click="isEdit = true" v-else>
              <span>
                <img :src="`${$iconURL}common/replace-dark.svg`" class="label-icon mr-10" />Suggest something
              </span>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
  </div>

  <div v-else-if="serviceType == 'extra'">
    <div class="proposal-service-item-wrapper included-services">
      <div class="item-cont">
        {{ item.requirementTitle }}
        <br />
        <div v-if="isExpanded"></div>
      </div>
      <div class="size-cont editor-wrapper">
        <template v-if="!isEdit">{{ item.requirementSize }}</template>
        <template v-else>
          <input class="input-value" type="text" v-model="item.requirementSize" />
        </template>
      </div>
      <div class="qty-cont editor-wrapper">
        <template v-if="!isEdit">{{ item.priceUnit === "total" ? 1 : item.requirementValue }}</template>
        <template v-else>
          <input class="input-value" type="number" v-model="item.requirementValue" />
        </template>
      </div>
      <div class="price-cont editor-wrapper">
        <template v-if="!isEdit">+${{ item.price }} </template>
        <template v-else>
          <money
            v-model="item.price"
            v-bind="{
              decimal: '.',
              thousands: ',',
              prefix: '$ ',
              suffix: '',
              precision: 2,
              masked: false,
            }"
            class="input-value"
          />
        </template>
      </div>
      <div class="total-cont editor-wrapper"></div>
      <div class="action-cont editor-wrapper">
        <template v-if="isEdit">
          <a class="cancel" @click="cancel()">Cancel</a>
          <a class="save" @click="save(item)">Save</a>
        </template>
        <md-button class="md-simple edit-btn md-dark" @click="isExpanded = !isExpanded">
          <md-icon class="color-dark" v-if="isExpanded">keyboard_arrow_down</md-icon>
          <md-icon class="color-dark" v-else>keyboard_arrow_right</md-icon>
        </md-button>
        <md-menu md-size="medium" :md-offset-x="240" :md-offset-y="-36" class="action-menu">
          <md-button md-menu-trigger class="edit-btn md-simple" style="height: 40px">
            <md-icon style="font-size: 40px !important">more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item @click="isEdit = true">
              <span> <img :src="`${$iconURL}common/edit-dark.svg`" class="label-icon mr-10" />Edit</span>
            </md-menu-item>
            <md-menu-item @click="removeRequirement(item)">
              <span> <img :src="`${$iconURL}common/trash-dark.svg`" class="label-icon mr-10" />Delete</span>
            </md-menu-item>
            <md-menu-item @click="isEdit = true">
              <span> <img :src="`${$iconURL}common/comment-dark.svg`" class="label-icon mr-10" />Add comment</span>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
  </div>
</template>
<script>
import { Money } from "v-money";

export default {
  name: "proposal-service-item",
  components: {
    Money,
  },
  props: {
    item: Object,
    active: Boolean,
    step: Number,
    index: Number,
    serviceType: {
      type: String,
      default: "cost",
    },
  },
  data() {
    return {
      isHover: false,
      isEdit: false,
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
      isExpanded: false,
    };
  },
  computed: {
    subTotal() {
      console.log("subtotal");
      return this.item.price * this.item.requirementValue;
    },
  },
  methods: {
    removeRequirement(item) {
      this.$root.$emit("remove-proposal-requirement", item);
      this.$emit("remove", this.index);
    },
    save(item) {
      this.isEdit = false;
      this.$root.$emit("save-proposal-requirement", { index: this.index, item });
      this.$emit("save", { index: this.index, item });
    },
    setValue(key, value) {
      const item = this.item;
      item[key] = value;
      console.log(item);
      this.$emit("save", { index: this.index, item });
    },
    cancel() {
      this.isEdit = false;
    },
  },
  created() {},
  mounted() {
    console.log(this.item);
  },
  filters: {
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.proposal-service-item-wrapper {
  padding: 46px 40px;
  border: 2px solid #d5d5d5;
  border-bottom: none;
  font-family: "Manrope-Regular", sans-serif;
  font-size: 16px;
  font-weight: 600;
  display: grid;
  grid-template-columns: 30% 10% 10% 12% 15% 23%;
  align-items: center;
  .action-menu {
    visibility: hidden;
  }
  &:hover {
    .action-menu {
      visibility: unset;
    }
  }
  &.containPlannerOptions {
    display: grid;
    grid-template-columns: 80%;
    .description-wrapper {
      display: grid;
      grid-template-columns: 30% 10% 60%;
    }
  }
  &.included-services {
    padding: 20px 0px;
    border-top: 1px solid #d5d5d5;
    border-left: none;
    border-right: none;
  }
  .planner-options-item {
    border-bottom: solid 2px #dadada;
    display: grid;
    grid-template-columns: 62% 15% 23%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 0 20px 0 50px;
    padding: 20px 0;
    &:last-child {
      border-bottom: none;
    }
  }
  .madatory-badge {
    color: #f51355;
    font-weight: normal;
    font-size: 0.75em;
    display: inline-block;
    border: solid 1px #f51355;
    padding: 4px 8px;
    border-radius: 30px;
    margin-left: 0.5em;
    line-height: 1em;
  }
  .complementary-badge {
    color: #ba8d05;
    font-weight: normal;
    font-size: 0.75em;
    display: inline-block;
    border: solid 1px #ba8d05;
    padding: 4px 8px;
    border-radius: 30px;
    margin-left: 0.5em;
    line-height: 1em;
    position: relative;
    .remove-button {
      visibility: hidden;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.29);
      position: absolute;
      background-color: white !important;
      top: -5px;
      /deep/ .md-button-content {
        width: 100%;
      }
      &:hover {
        visibility: unset;
      }
    }
    &:hover {
      .remove-button {
        visibility: unset;
      }
    }
  }
  .comment-area {
    word-break: break-word;
  }
  div {
    &.item-cont {
      text-transform: capitalize;
    }
    &.action-cont {
      text-align: right;
      display: flex;
      justify-content: flex-end;
      .edit {
        width: 21px;
        margin-right: 31px;
        cursor: pointer;
      }
      .trash {
        width: 21px;
        cursor: pointer;
      }
    }
  }
  &.step-3 {
    border: none;
    border-top: 1px solid #818080;
    margin: 0 38px;
    padding: 50px 0;
    grid-template-columns: 40% 15% 15% 15% 15%;

    .whole-cont {
      span {
        font-weight: normal;
      }
    }
  }
  .editor-wrapper {
    margin: 0 5px;
    text-align: center;
    .input-value {
      border: 1px solid #dddddd;
      text-align: center;
      width: 100%;
    }
  }

  a {
    cursor: pointer;
    padding: 8px 26px;

    &.cancel {
      font: 800 16px "Manrope-Regular", sans-serif;
      color: #050505;
      background: transparent;
    }
    &.save {
      font: 800 16px "Manrope-Regular", sans-serif;
      color: white;
      background: #f51355;
      border-radius: 3px;
    }
    &:hover {
      color: #dddddd !important;
    }
  }
  span {
    &.grid-cell {
      font-size: 16px;
      font-weight: normal;

      &:first-child {
        text-transform: capitalize;
      }
    }
  }
}
</style>
