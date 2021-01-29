<template>
  <div class="title-cont default add-item-form">
    <div class="sub-items-cont">
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
          <input v-model="serviceItem" class="description" placeholder="Type name of element here" />
        </div>
        <div class="field">
          <span>Size</span>
          <input v-model="serviceItemSize" />
        </div>
        <div class="field">
          <span>QTY</span>
          <money v-model="qty" v-bind="qtyFormat" />
        </div>
        <div class="field">
          <span>Price per unit</span>
          <money v-model="unit" v-bind="currencyFormat" />
        </div>
        <div class="field">
          <span>Total</span>
          <money :value="subTotal" v-bind="currencyFormat" v-if="isNumberVisible" class="total" />
          <money v-model="unit" v-bind="currencyFormat" v-else class="total" />
        </div>
      </div>
      <div class="planer-choice-cont" v-if="serviceType === 'cost'">
        <md-checkbox v-model="isRequiredPlannerChoice"
          ><span class="mr-10">This item requires planners choice</span>
          <md-icon class="color-black">keyboard_arrow_downz</md-icon
          ><md-icon class="color-red">help_outline</md-icon></md-checkbox
        >
      </div>
      <div class="planer-choice-cont" v-if="serviceType === 'included'">
        <md-checkbox v-model="isComplementary"
          ><span class="mr-10">Mark as complementary</span>
          <md-icon class="color-red">help_outline</md-icon></md-checkbox
        >
      </div>
      <div v-if="isRequiredPlannerChoice" class="d-flex align-start">
        <img :src="`${$iconURL}Onboarding/enter-gray.svg`" style="margin-right: 10px" />
        <div>
          <div class="d-flex mb-20" v-for="(option, index) in plannerChoices" :key="`planer-option-${index}`">
            <div class="mr-10">
              <span class="font-bold">Option {{ ("0" + (index + 1)).slice(-2) }}</span>
              <div>
                <input
                  v-model="option.description"
                  style="width: 500px"
                  class="description"
                  placeholder="Type name of element here"
                />
              </div>
            </div>
            <div style="width: 150px">
              <span class="font-bold">Price</span>
              <div>
                <input
                  v-model="option.price"
                  class="description"
                  placeholder="Type name of element here"
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
      <div class="action-cont">
        <md-button class="md-simple md-black maryoku-btn" @click="cancel()">Clear</md-button>
        <md-button class="md-simple md-black maryoku-btn" @click="cancel()">
          <md-icon>add_circle_outline</md-icon>
          Add comment</md-button
        >
        <md-button
          class="md-red maryoku-btn"
          :disabled="isDisabledAdd"
          @click="saveItem(serviceItem, serviceItemSize, qty, unit)"
          >Add This</md-button
        >
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
      this.serviceItem = item.item;
      this.size = item.size;
      this.qty = 1;
      this.plannerChoices = [
        { description: "", price: 0 },
        { description: "", price: 0 },
      ];
    },
    saveItem(serviceItem, size, qty, price) {
      const editingService = {
        comments: [],
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
    },
  },
  computed: {
    isDisabledAdd() {
      return !this.qty || !this.unit || !this.subTotal || this.subTotal == 0 || !this.serviceItem;
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
      grid-template-columns: 40% 15% 15% 15% 15%;
      .field {
        margin-right: 1em;
        span {
          margin-bottom: 0.5rem;
          display: inline-block;
          font: 800 16px "Manrope-Regular", sans-serif;
        }
        input {
          // text-transform: capitalize;
          width: 100%;
          padding: 1.5rem 1rem;
          border: 1px solid #d5d5d5;
          font: normal 16px "Manrope-Regular", sans-serif;
          color: #050505;
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
}
</style>