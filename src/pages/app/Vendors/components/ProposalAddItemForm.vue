<template>
  <div class="title-cont default add-item-form">
    <div class="sub-items-cont" v-if="serviceType === 'cost'">
      <span class="prev" @click="prev()" v-if="serviceSlidePos < 0">
        <md-icon>keyboard_arrow_left</md-icon>
      </span>
      <div class="sub-items" :style="{ left: `${serviceSlidePos}px` }" ref="servicesCont">
        <select-proposal-sub-item
          :selected="isSelectedQuickButton('')"
          :item="requirement"
          v-for="(requirement, sIndex) in optionalRequirements"
          :key="sIndex"
          @click="fillFormWithSelected"
        />
      </div>
      <span class="next" @click="next()">
        <md-icon>keyboard_arrow_right</md-icon>
      </span>
    </div>
    <div class="add-item-cont">
      <div class="fields-cont">
        <div class="field">
          <span>Description</span>
          <input
            v-model="serviceItem"
            class="input-value"
            :class="{ isFilled: !!serviceItem }"
            type="text"
            placeholder="Type name of element here"
          />
        </div>
        <!-- <div class="field">
          <span>Size</span>
          <input v-model="serviceItemSize" :class="{ isFilled: !!serviceItemSize }" />
        </div> -->
        <div class="field">
          <span>QTY</span>
          <money v-model="qty" v-bind="qtyFormat" :class="{ isFilled: !!qty }" />
        </div>
        <div class="field">
          <span>Price per unit</span>
          <money v-model="unit" v-bind="currencyFormat" :class="{ isFilled: !!unit }" />
        </div>
        <div class="field">
          <span>Total</span>
          <money :value="subTotal" v-bind="currencyFormat" v-if="isNumberVisible" class="total" />
          <money v-model="unit" v-bind="currencyFormat" v-else class="total" :class="{ isFilled: !!unit }" />
        </div>
      </div>
      <!-- <div class="planer-choice-cont" v-if="serviceType === 'cost'">
        <md-checkbox v-model="isRequiredPlannerChoice">
          <span class="mr-10">
            <md-icon class="color-black" style="font-size: 30px !important; margin-right: 10px; font-weight: normal">
              add_circle_outline
            </md-icon>
            Add alternative
          </span>
          <md-icon class="color-black">keyboard_arrow_downz </md-icon>
          <md-icon class="color-gray" style="font-size: 35px !important; font-weight: normal">help_outline</md-icon>
        </md-checkbox>
      </div> -->
      <!-- <div class="planer-choice-cont" v-if="serviceType === 'included'">
        <md-checkbox v-model="isComplementary">
          <span class="mr-10"><img :src="`${$iconURL}common/gift-dark.svg`" class="mr-10" />Mark as complementary</span>
          <md-icon class="color-red">help_outline</md-icon>
        </md-checkbox>
      </div> -->
      <div v-if="isRequiredPlannerChoice" class="d-flex align-start mt-20">
        <img :src="`${$iconURL}Onboarding/enter-gray.svg`" style="margin-right: 10px" />
        <div>
          <div class="d-flex mb-20" v-for="(option, index) in plannerChoices" :key="`planer-option-${index}`">
            <div class="mr-10">
              <span class="font-bold">Option {{ ("0" + (index + 1)).slice(-2) }}</span>
              <div>
                <input
                  v-model="option.description"
                  style="width: 500px"
                  class="input-value"
                  type="text"
                  :placeholder="`Type option here`"
                  :class="{ isFilled: !!option.description }"
                />
              </div>
            </div>
            <div style="width: 150px">
              <span class="font-bold">Price</span>
              <div>
                <money
                  v-model="option.price"
                  class="input-value"
                  placeholder="0.00"
                  v-bind="currencyFormat"
                  :class="{ isFilled: !!option.price }"
                  style="width: 160px"
                />
              </div>
            </div>
          </div>
          <div>
            <md-button class="md-simple md-red edit-btn" @click="addNewChoice">
              <md-icon>add_circle_outline</md-icon>
              Add option {{ ("0" + (plannerChoices.length + 1)).slice(-2) }}</md-button
            >
          </div>
        </div>
      </div>
      <div v-if="isEditingComment" class="mt-30">
        <div class="pb-10"><img :src="`${$iconURL}common/comment-dark.svg`" class="mr-10" /> <u>Add comment</u></div>
        <textarea v-model="comment" class="textbox-comment" placeholder="Type your comment here"></textarea>
        <md-button
          class="maryoku-btn md-simple md-black"
          style="vertical-align: bottom"
          @click="isEditingComment = false"
        >
          Cancel
        </md-button>
      </div>
      <div class="action-cont">
        <md-button class="md-simple md-black maryoku-btn" @click="cancel()"><u>Clear</u></md-button>
        <!-- <md-button
          class="md-simple md-black maryoku-btn"
          @click="
            isEditingComment = true;
            comment = '';
          "
          :disabled="isEditingComment"
        >
          <img :src="`${$iconURL}common/comment-dark.svg`" class="mr-10" />
          Add comment
        </md-button> -->
        <md-button
          class="md-red maryoku-btn"
          :disabled="isDisabledAdd"
          @click="saveItem(serviceItem, serviceItemSize, qty, unit)"
          >Add item
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectProposalSubItem from "./SelectProposalSubItem.vue";

export default {
  components: { SelectProposalSubItem },

  props: {
    optionalRequirements: {
      type: Array,
      default: () => [],
    },
    serviceType: {
      type: String,
      default: "cost",
    },
  },
  data() {
    return {
      serviceSlidePos: 0,
      serviceItem: "",
      serviceItemSize: "",
      qty: "",
      unit: "",
      isRequiredPlannerChoice: false,
      isComplementary: false,
      ttpCommunicationException: "",
      plannerChoices: [
        { description: "", price: 0 },
        { description: "", price: 0 },
      ],
      isNumberVisible: true,
      currencyFormat: {
        decimal: ".",
        thousands: ",",
        prefix: "$",
        suffix: "",
        precision: 0,
        masked: false,
      },
      qtyFormat: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false,
      },
      percentageFormat: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "  %",
        precision: 0,
        masked: false,
      },
      isEditingComment: false,
    };
  },
  created() {
    this.$root.$on("clear-slide-pos", (item) => {
      this.serviceSlidePos = 0;
    });
  },
  methods: {
    addNewChoice() {
      this.plannerChoices.push({ description: "", price: 0 });
    },
    prev() {
      if (this.$refs.servicesCont) {
        this.servicesWidth = this.$refs.servicesCont.clientWidth;
        if (this.servicesWidth - this.serviceSlidePos > 0) {
          this.serviceSlidePos += 200;
        }
      }
    },
    next() {
      if (this.$refs.servicesCont) {
        this.servicesWidth = this.$refs.servicesCont.clientWidth;
        if (this.servicesWidth + this.serviceSlidePos - 200 > 0) {
          this.serviceSlidePos -= 200;
        }
      }
    },
    isSelectedQuickButton(item) {
      return false;
    },
    fillFormWithSelected(item) {
      console.log(item);
      this.serviceItem = item.name;
      this.size = "";
      this.qty = 1;
      this.plannerChoices = [
        { description: "", price: 0 },
        { description: "", price: 0 },
      ];
    },
    saveItem(serviceItem, size, qty, price) {
      const editingService = {
        comment: this.comment,
        dateCreated: "",
        includedInPrice: true,
        itemNotAvailable: false,
        price: price,
        priceUnit: "qty",
        proposalRequest: { id: this.proposalRequest.id },
        requirementComment: null,
        requirementId: "",
        requirementMandatory: false,
        requirementPriority: null,
        requirementTitle: serviceItem,
        requirementSize: size,
        requirementValue: `${qty}`,
        isComplementary: this.isComplementary,
        plannerOptions: this.plannerChoices.filter((item) => item.description && item.price),
      };
      this.$emit("addItem", editingService);
      this.cancel();
    },
    cancel() {
      this.serviceItemSize = "";
      this.qty = 0;
      this.unit = 0;
      this.serviceItem = "";
      this.isRequiredPlannerChoice = false;
      this.isComplementary = false;
      this.comment = "";
      this.isEditingComment = false;
      this.plannerChoices = [
        { description: "", price: 0 },
        { description: "", price: 0 },
      ];
    },
  },
  computed: {
    isDisabledAdd() {
      if (this.serviceType === "cost") {
        return !this.qty || !this.unit || !this.subTotal || this.subTotal == 0 || !this.serviceItem;
      }
      return !this.qty || !this.serviceItem;
    },
    subTotal() {
      return this.qty * this.unit;
    },
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
  },
};
</script>
<style lang="scss" scoped>
.add-item-form {
  input {
    font-size: 16px;
    width: 100%;
    padding: 1.5rem 1rem;
    border: 1px solid #b7b7b7;
    box-shadow: none;
    font: normal 16px "Manrope-Regular", sans-serif;
    color: #050505;
    &.isFilled {
      border: 1px solid #828282;
    }
  }

  input {
    font-size: 16px;
    width: 100%;
    padding: 1.5rem 1rem;
    border: 1px solid #b7b7b7;
    box-shadow: none;
    font: normal 16px "Manrope-Regular", sans-serif;
    color: #050505;
    &.isFilled {
      border: 1px solid #828282;
    }
  }
  .sub-items-cont {
    padding: 1rem 0;
    overflow: hidden;
    position: relative;

    h3 {
      font-size: 30px;
      font-weight: 800;
      padding-bottom: 2rem;
      margin: 0;
    }
    .sub-items {
      // display: flex;
      display: block;
      position: relative;
      white-space: nowrap;
      width: calc(100% - 2rem);
      // overflow-x: auto;
    }
    .prev {
      position: absolute;
      cursor: pointer;
      z-index: 99;
      left: 0;
      background: #fff;
      padding: 1.5rem 0;
      top: 0;
      i {
        color: #f51355 !important;
      }
    }
    .next {
      z-index: 99;
      position: absolute;
      cursor: pointer;
      right: 0;
      background: #fff;
      padding: 1.5rem 0;
      top: 0;
      i {
        color: #f51355 !important;
      }
    }
  }
  &.title-cont {
    .with-subtitle {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .text-cont {
        display: flex;
        align-items: center;
        h3.title {
          font-weight: 800;
          font-size: 30px;
          margin: 0;
          margin-right: 20px;
          img {
            width: 28px;
            margin-right: 19px;
            position: relative;
            top: -3px;
          }
        }
        h5 {
          font-size: 20px;
          margin: 0;
        }
      }
      .action {
        cursor: pointer;
        img {
          width: 20px;
        }
      }
    }
    p {
      font-size: 16px;
      margin: 0;
      margin-top: 23px;

      strong {
        font-weight: 800;
      }
    }

    &.dropdown {
      padding: 8px 8px 42px 0px;
      display: grid;
      grid-template-columns: 50% 50%;
      align-items: center;
      cursor: pointer;

      .left-side {
        width: 100%;
        display: grid;
        grid-template-columns: 10% 90%;
        align-items: center;

        .check-cont {
          img {
            width: 33px;
          }
        }
        h3 {
          display: grid;
          align-items: center;
          grid-template-columns: 10% 90%;
          margin: 0;
          font-size: 30px;
          font-weight: 800;

          img {
            width: 34px;
            height: 34px;
          }
        }
      }
      .right-side {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        .budget-cont {
          margin-left: 4em;
          span {
            color: #818080;
            &:first-child {
              font-size: 14px;
              margin-right: 1rem;
            }
            &:nth-child(2) {
              font-size: 20px;
              font-weight: 800;
            }
          }
        }
        .proposal-range-cont {
          text-align: right;
          margin-left: 65px;
          p {
            margin-top: 0;
            font-size: 14px;
          }
          span {
            font-size: 14px;
            &.grey {
              color: #818080;
            }
            &:last-child {
              color: #050505;
              font-weight: 800;
            }
          }
        }
        img {
          width: 12px;
          margin-left: 50px;
        }
      }
    }
  }

  .add-item-cont {
    margin-top: 1rem;
    .fields-cont {
      display: grid;
      grid-template-columns: 40% 20% 20% 20%;
      .field {
        margin-right: 1em;
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
  }
  .action-cont {
    text-align: right;
    margin-top: 35px;
  }
  .textbox-comment {
    max-width: 380px;
  }
}
</style>