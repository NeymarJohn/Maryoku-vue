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
      <div class="fields-cont font-bold mb-20">
        <span>Description</span>
        <span>QTY</span>
        <span v-if="serviceType !== 'included'">Price per unit</span>
        <span v-if="serviceType !== 'included'">Subtotal</span>
      </div>
      <hr style="background-color: #b2b2b2; height: 2px" />
      <div class="fields-cont mt-20">
        <div class="field description-field">
          <input
            v-if="filteredSuggestItems[selectedSuggestItemIndex] && serviceItem"
            class="suggested-place-holder"
            :value="filteredSuggestItems[selectedSuggestItemIndex].description"
          />
          <input
            v-model="serviceItem"
            class="input-value description-input"
            :class="{ isFilled: !!serviceItem }"
            type="text"
            placeholder="Type name of element here"
            @keypress="startSearch"
            @blur="stopSearch"
          />
          <div class="auto-complete-panel" v-if="showAutoCompletePanel && filteredSuggestItems.length > 0">
            <div
              class="suggest-item font-bold"
              v-for="(item, index) in filteredSuggestItems"
              :key="item.description"
              @mouseenter="hoverSuggestItem(index)"
              @click="selectSuggestItem(index)"
            >
              <div>{{ item.description }}</div>
              <div>{{ item.qty ? item.qty : "" }}</div>
              <div class="text-right">${{ item.price | withComma }}</div>
            </div>
          </div>
        </div>
        <div class="field">
          <money v-model="qty" v-bind="qtyFormat" :class="{ isFilled: !!qty, isSuggeted: isAutoCompletedValue }" />
        </div>
        <div class="field">
          <money
            v-model="unit"
            v-bind="currencyFormat"
            :class="{ isFilled: !!unit, isSuggeted: isAutoCompletedValue }"
            v-if="serviceType !== 'included'"
          />
        </div>
        <div class="field">
          <md-button
            class="md-red maryoku-btn width-100"
            :disabled="isDisabledAdd"
            @click="saveItem(serviceItem, serviceItemSize, qty, unit)"
          >
            Add Line
          </md-button>
        </div>
      </div>

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
    </div>
  </div>
</template>

<script>
import SelectProposalSubItem from "../components/SelectProposalSubItem.vue";

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
    vendorServices: {
      type: Array,
      default: () => [],
    },
    profileServices: {
      type: Object,
      default: () => {},
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
        precision: 2,
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
      // suggestedItems: [
      //   { description: "Test1", qty: "12", price: "1231" },
      //   { description: "Test2", qty: "12", price: "1231" },
      //   { description: "Test4", qty: "12", price: "1231" },
      // ],
      selectedSuggestItemIndex: -1,
      showAutoCompletePanel: false,
    };
  },
  created() {
    this.$root.$on("clear-slide-pos", (item) => {
      this.serviceSlidePos = 0;
    });
  },
  methods: {
    hoverSuggestItem(index) {
      this.selectedSuggestItemIndex = index;
      this.qty = this.filteredSuggestItems[index].qty;
      this.unit = this.filteredSuggestItems[index].price;
    },
    selectSuggestItem(index) {
      this.qty = this.filteredSuggestItems[index].qty;
      this.unit = this.filteredSuggestItems[index].price;
      this.serviceItem = this.filteredSuggestItems[index].description;
      this.selectedSuggestItemIndex = -1;
      this.showAutoCompletePanel = false;
    },
    startSearch() {
      this.showAutoCompletePanel = true;
    },
    stopSearch() {
      setTimeout(() => {
        this.showAutoCompletePanel = false;
        this.selectedSuggestItemIndex = -1;
      }, 500);
    },
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
        isComplimentary: false,
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
    camelize(str) {
      let temp = str.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
      });
      return temp.charAt(0).toLowerCase() + temp.slice(1);
    },
  },
  computed: {
    isDisabledAdd() {
      if (this.serviceType === "cost") {
        return !this.qty || !this.unit || !this.serviceItem;
      }
      return !this.qty || !this.serviceItem;
    },
    subTotal() {
      return this.qty * this.unit;
    },
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
    filteredSuggestItems() {
      if (!this.serviceItem) return [];
      return this.suggestedItems.filter((item) => item.description.startsWith(this.serviceItem));
    },
    isAutoCompletedValue() {
      return this.selectedSuggestItemIndex >= 0;
    },
    suggestedItems() {
      const items = [];
      this.vendorServices.forEach((category) => {
        category.subCategories.forEach((subCat) => {
          subCat.items.forEach((item) => {
            const capitalized = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            const profileService = this.profileServices[this.camelize(capitalized)];
            items.push({
              description: capitalized,
              qty: item.value ? item.value : 1,
              price: profileService ? Number(profileService.value) : "",
            });
          });
        });
      });
      return items;
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
      border: 1px solid #b7b7b7;
    }
    &:disabled {
      color: #828282;
    }
    position: absolute;
    width: 100%;
  }
  .suggested-place-holder,
  .isSuggeted {
    color: #e8ae03;
  }
  .description-input {
    background-color: transparent;
  }
  .description-field {
    position: relative;
    .auto-complete-panel {
      z-index: 10;
      padding: 30px 0;
      border-radius: 3px;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      background-color: #ffffff;
      position: absolute;
      width: 100%;
      margin-top: 53px;
      .suggest-item {
        display: grid;
        grid-template-columns: 60% 15% 25%;
        padding: 10px 30px;
        cursor: pointer;
        &:hover {
          background-color: #ffedb7;
        }
      }
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
  }

  .add-item-cont {
    margin-top: 1rem;
    .fields-cont {
      display: grid;
      grid-template-columns: 50% 10% 30% 10%;
      .field {
        margin-right: 1em;
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