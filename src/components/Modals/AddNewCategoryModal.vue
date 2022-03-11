<template>
  <modal class="add-category-model">
    <template slot="header">
      <div class="add-category-model__header">
        <h2 class="font-size-30 font-bold-extra">
          <img :src="`${$iconURL}budget+screen/SVG/Asset%2019.svg`"> Add new category
        </h2>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="md-layout">
        <div class="md-layout-item md-size-70">
          <div v-if="filteredEventBlocks" class="form-group maryoku-field">
            <label class="font-size-16 font-bold-extra color-black">Category</label>
            <multiselect
              v-model="newBuildingBlock.category"
              :options="filteredEventBlocks"
              :close-on-select="true"
              :clear-on-select="true"
              tag-placeholder="Add this as new tag"
              placeholder="Type to search category"
              label="title"
              track-by="id"
              :show-labels="false"
            >
              <template slot="singleLabel" slot-scope="props">
                <img style="width: 20px" :src="`${$iconURL}Budget Elements/${props.option.icon}`">
                <span>{{ props.option.title }}</span>
              </template>
              <template slot="option" slot-scope="props">
                <img style="width: 20px" :src=" `${$iconURL}Budget Elements/${props.option.icon}`">
                <span>{{ props.option.title }}</span>
              </template>
            </multiselect>
          </div>
        </div>

        <div v-if="newBuildingBlock.category.id === 'other'" class="md-layout-item md-size-70 d-flex">
          <md-icon class="font-size-20">
            subdirectory_arrow_right
          </md-icon>
          <div class="form-group" style="flex-grow: 1; margin-left: 10px">
            <label class="font-size-16 font-bold-extra color-black">Name</label>
            <small class="font-size-14">(2 words top)</small>
            <input v-model="newBuildingBlock.name" type="text" class="form-control">
          </div>
        </div>
        <div class="md-layout-item md-size-50 form-group maryoku-field">
          <label class="font-size-16 font-bold-extra color-black">
            Budget
            <br>
          </label>
          <div class="mb-10">
            <small class="font-size-14">You have ${{ availableBudget | withComma }} to use</small>
          </div>
          <maryoku-input v-model="newBuildingBlock.budget" input-style="budget" />
        </div>
        <div v-if="availableBudget < newBuildingBlock.budget && !addMoreBudget" class="md-error d-flex align-center">
          <img :src="`${$iconURL}Event Page/warning-circle-gray.svg`" style="width: 20px">
          <span style="padding: 0 15px">Oops! Seems like you don’t have enough cash in your “Unexpected” category</span>
          <md-button
            class="md-button md-rose md-sm md-simple edit-btn md-theme-default md-bold-extra"
            @click="addMoreMoney"
          >
            Add More Money
          </md-button>
        </div>
      </div>
      <div v-if="addMoreBudget" class="md-layout mt-10">
        <div v-if="addMoreMoney" class="md-layout-item md-size-50 form-group maryoku-field">
          <label class="font-size-16 font-bold-extra color-black">
            Additional Budget
            <br>
          </label>
          <maryoku-input v-model="additionalBudget" input-style="budget" />
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-default md-simple cancel-btn md-bold" @click="close">
        Cancel
      </md-button>
      <md-button :disabled="!isAvailable" class="md-red add-category-btn md-bold" @click="addNewCategory">
        Add Category
      </md-button>
    </template>
  </modal>
</template>
<script>
import {Modal} from "@/components";
import MaryokuInput from "@/components/Inputs/MaryokuInput.vue";
import EventComponent from "@/models/EventComponent";
import CalendarEvent from "@/models/CalendarEvent";
import Calendar from "@/models/Calendar";

export default {
  components: {
    Modal,
    MaryokuInput,
  },
  props: {
    event: {
      type: Object,
      default: {},
    },
    components: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      filteredEventBlocks: null,
      addMoreBudget: false,
      additionalBudget: 0,
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
      const budget = this.newBuildingBlock.budget;
      return budget > 0 && this.availableBudget + this.additionalBudget >= budget;
    },
  },
  created: async function () {
    const availableComponents = JSON.parse(localStorage.getItem("budget_categories")) || [];
    if (!availableComponents.length) {
      let components = await EventComponent.get();
      components.forEach((item) => {
        const index = this.components.findIndex((comp) => item.key == comp.componentId);
        if (index < 0) {
          availableComponents.push(item);
        }
      });
      localStorage.setItem("budget_categories", JSON.stringify(availableComponents));
    }
    this.filteredEventBlocks = availableComponents.filter(it => !this.event.components.find(c => c.title === it.title));
  },
  methods: {
    close() {
      this.$emit("cancel");
    },
    async addNewCategory() {
      console.log(this.newBuildingBlock);

      let newComponent = this.newBuildingBlock.category;
      if (newComponent.id === "other") {
        const newCategory = {
          title: `Other-${this.newBuildingBlock.name}`,
          key: `other-${this.newBuildingBlock.name.toLowerCase()}`,
          color: `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(
            Math.random() * 255,
          )})`,
          icon: "other.svg",
          type: "customized",
          categoryId: "other",
        };
        newComponent = await new EventCategory(newCategory).save();
      }
      let newBlock = {
        componentId: newComponent ? newComponent.key : "other",
        componentCategoryId: newComponent ? newComponent.key : "other",
        calendarEvent: {id: this.event.id},
        allocatedBudget: this.newBuildingBlock.budget,
        order: this.event.components.length,
        icon: newComponent.icon,
        category: newComponent,
      };

      let event = new CalendarEvent({
        id: this.event.id,
      });

      new EventComponent(newBlock)
        .for(event)
        .save()
        .then((res) => {
          this.$store.dispatch(
            "event/saveEventAction",
            new CalendarEvent({
              id: this.event.id,
              totalBudget: this.event.totalBudget + this.additionalBudget,
              unexpectedBudget: this.event.unexpectedBudget + this.additionalBudget - Number(this.newBuildingBlock.budget),
            }),
          );
          this.$emit("save", res.item);
        })
        .catch((error) => {
          console.log("Error while saving ", error);
        });
    },
    addMoreMoney() {
      this.addMoreBudget = true;
      this.additionalBudget = this.newBuildingBlock.budget - this.availableBudget;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
