<template>
  <modal class="add-budget-modal">
    <template slot="header">
      <div class="add-category-model__header">
        <h2 class="font-size-30 font-bold-extra mt-20 mr-40">
          <img :src="`${$iconURL}Services /${serviceCategory.icon}`" width="30px" class="mr-1">
          Add Budget To {{ serviceCategory.fullTitle }}
        </h2>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="md-layout">
        <div class="md-layout-item md-size-50 form-group maryoku-field text-left">
          <label class="font-size-20 font-bold-extra color-black"> Budget </label>
          <div class="font-size-16 my-20">
            You have ${{ availableBudget | withComma }} to use
          </div>
          <maryoku-input v-model="budget" input-style="budget" />
        </div>
        <div v-if="availableBudget < budget" class="md-error d-flex align-center mt-20">
          <img :src="`${$iconURL}Event Page/warning-circle-gray.svg`" style="width: 20px">
          <span style="padding: 0 15px">Oops! Seems like you don’t have enough cash in your “Unexpected” category</span>
          <md-button
            class="md-button md-rose md-sm md-simple edit-btn md-theme-default md-bold-extra"
          >
            Add More Money
          </md-button>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-default md-simple cancel-btn md-bold" @click="close">
        Cancel
      </md-button>
      <md-button :disabled="!isAvailable" class="md-red add-category-btn md-bold" @click="addNewBudget">
        Add Budget
      </md-button>
    </template>
  </modal>
</template>
<script>
import { Modal } from "@/components";
import MaryokuInput from "@/components/Inputs/MaryokuInput.vue";
import EventComponent from "@/models/EventComponent";
import CalendarEvent from "@/models/CalendarEvent";
import { mapActions } from "vuex";

export default {
  components: {
    Modal,
    MaryokuInput,
  },
  props: {
    serviceCategory: {
      type: Object,
      default: () => ({}),
    },
  },
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
  computed: {
    availableBudget() {
      return this.event.unexpectedBudget;
    },
    isAvailable() {
      return Number(this.budget) > 0 && this.budget < this.availableBudget;
    },
    event() {
      return this.$store.state.event.eventData;
    },

  },
  methods: {
    close() {
      this.$emit("cancel");
    },
    async addNewBudget() {
      let newBlock = {
        componentId: this.serviceCategory.key,
        componentCategoryId: this.serviceCategory.key,
        calendarEvent: { id: this.event.id },
        allocatedBudget: this.budget,
        order: this.event.components ? this.event.components.length : 0,
        icon: this.serviceCategory.icon,
        category: this.serviceCategory,
      };

      let event = new CalendarEvent({
        id: this.event.id,
      });

      new EventComponent(newBlock)
        .for(event)
        .save()
        .then(async(res) => {
          await this.$store.dispatch(
            "event/saveEventAction",
            new CalendarEvent({
              id: this.event.id,
              unexpectedBudget: this.event.unexpectedBudget - Number(this.budget),
            }),
          );

          const category = this.event.components.find(c => c.componentId === this.serviceCategory.key)

          this.$emit("save", category);
        })
        .catch((error) => {
          console.log("Error while saving ", error);
        });
    },
    addMoreMoney() {}
  },
};
</script>
<style lang="scss" scoped>
.add-budget-modal {
  text-align: left;
}
</style>
