<template>
  <modal class="budget-resize-modal">
    <template slot="header">
      <div class="model__header">
        <div class="minus-value color-red d-flex align-center justify-content-start">
          <span>${{ value | withComma }}</span> <span>&nbsp;<md-icon class="color-red">east</md-icon>&nbsp;</span>
          <span>${{ newValue | withComma }}</span>
        </div>
        <h2 class="font-bold font-size-30">
          You have {{ newValue > value ? "increased" : "reduced" }} the budget of
          <span class="category-name">"{{ categoryName }}"</span>
        </h2>
        <div class="header-description">
          What would you like to do?
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="md-layout">
        <div v-if="newValue > value" class="md-layout-item md-size-100">
          <md-radio v-model="selectedOption" class="md-layout-item md-size-100" value="unexpected">
            <span calss="option-label" /> Take that money from ‘Unexpected’ category
          </md-radio>
          <md-radio v-model="selectedOption" class="md-layout-item md-size-100" value="total">
            <span calss="option-label" /> Increase total budget
          </md-radio>
        </div>
        <div v-else class="md-layout-item md-size-100">
          <md-radio v-model="selectedOption" class="md-layout-item md-size-100" value="unexpected">
            <span calss="option-label" /> Add that money to ‘Unexpected’ category
          </md-radio>
          <md-radio v-model="selectedOption" class="md-layout-item md-size-100" value="total">
            <span calss="option-label" /> Reduce total budget
          </md-radio>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-simple md-black add-category-btn" @click="cancel">
        Cancel
      </md-button>
      <md-button class="md-red add-category-btn" @click="selectOption">
        Select
      </md-button>
    </template>
  </modal>
</template>

<script>
import { Modal } from "@/components";
export default {
  name: "BudgetHandleMinusModal",
  components: {
    Modal,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    newValue: {
      type: Number,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
      selectedOption: "unexpected",
    };
  },
  methods: {
    selectOption() {
      this.$emit("select", { selectedOption: this.selectedOption, offset: this.newValue - this.value });
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>
<style lang="scss" scoped>
.budget-resize-modal {
  .category-name {
    white-space: nowrap;
  }
}
.modal-container {
  max-width: 900px !important;
}
.model__header {
  padding: 0px 20px;
  text-align: left !important;
  .arrow {
    margin: 10px 0px 20px;
    font-size: 40px;
    i {
      color: #050505 !important;
    }
  }
  .minus-value {
    font-size: 40px;
  }
}
.md-layout {
  text-align: left !important;
  padding-left: 15px;
  padding-bottom: 40px;
  .md-layout-item {
    padding-left: 0px;
    .option-label {
      color: #050505 !important;
    }
  }
}
</style>
