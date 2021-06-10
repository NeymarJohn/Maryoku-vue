<template>
  <modal class="add-budget-confirm-modal">
    <template slot="header">
      <div class="add-category-model__header">
        <div class="d-flex align-center">
          <img :src="`${$iconURL}${serviceCategory.icon}`" class="mr-10" />
          <div>Would you like to add the {{ serviceCategory.name }} category to your budget?</div>
        </div>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="text-left">
        <div class="font-size-16 mt-20">
          Looks like you didn’t allocate money for this service, it’s not a problem at all! You could do it whenever you
          want, just add it to your budget
        </div>
        <div class="mt-20">Adding categories to budget is mandatory in order to get proposals</div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-simple md-black maryoku-btn" @click="cancel">
        Don't Add {{ serviceCategory.name }} To Budget
      </md-button>
      <md-button class="md-red maryoku-btn" @click="addBudget"> Add {{ serviceCategory.name }} To Budget </md-button>
    </template>
  </modal>
</template>
<script>
import { Modal } from "@/components";
import MaryokuInput from "@/components/Inputs/MaryokuInput.vue";
import EventComponent from "@/models/EventComponent";
import CalendarEvent from "@/models/CalendarEvent";

export default {
  components: {
    Modal,
    MaryokuInput,
  },
  props: {
    serviceCategory: {
      type: Object,
      default: {},
    },
  },
  created: async function () {},
  data() {
    return {
      filteredEventBlocks: null,
      budget: 0,
      newBuildingBlock: {
        category: "",
        name: "",
        budget: "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("cancel");
    },
    addBudget() {
      this.$emit("addNewBudget");
    },
  },
  computed: {
    availableBudget() {
      return this.event.unexpectedBudget;
    },
    isAvailable() {
      return Number(this.budget) > 0;
    },
    event() {
      return this.$store.state.event.eventData;
    },
    selectedCategory() {
      return this.$store.state.common.serviceCategories.find(
        (item) => item.key === this.serviceCategory.serviceCategory,
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.add-budget-modal {
  text-align: left;
}
</style>
