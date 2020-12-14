<template>
  <modal class="add-category-model">
    <template slot="header">
      <div class="add-category-model__header">
        <h2 class="font-size-30 font-bold-extra">
          <img :src="`${$iconURL}budget+screen/SVG/Asset%2019.svg`" /> Add new category
        </h2>
      </div>
      <md-button
        class="md-simple md-just-icon md-round modal-default-button"
        @click="close"
      >
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="md-layout">
        <div class="md-layout-item md-size-70">
          <div class="form-group maryoku-field" v-if="filteredEventBlocks">
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
            ></multiselect>
          </div>
        </div>

        <div
          class="md-layout-item md-size-70 d-flex"
          v-if="newBuildingBlock.category.id==='other'"
        >
          <md-icon class="font-size-20">subdirectory_arrow_right</md-icon>
          <div class="form-group" style="flex-grow:1; margin-left:10px; ">
            <label class="font-size-16 font-bold-extra color-black">Name</label>
            <small class="font-size-14">(2 words top)</small>
            <input type="text" class="form-control" v-model="newBuildingBlock.name" />
          </div>
        </div>
        <div class="md-layout-item md-size-50 form-group maryoku-field ">
            <label class="font-size-16 font-bold-extra color-black">
              Budget
              <br />
            </label>
            <div class="mb-10">
              <small class="font-size-14">You have ${{remainedBudget | withComma}} to use</small>
            </div>
            <maryoku-input inputStyle="budget" v-model="newBuildingBlock.budget" />
        </div>
        <div
          class="md-error d-flex align-center"
          v-if="remainedBudget < newBuildingBlock.budget"
        >
          <img :src="`${$iconURL}Event Page/warning-circle-gray.svg`" style="width:20px" />
          <span
            style="padding: 0 15px"
          >Oops! Seems like you don’t have enough cash in your “Unused” category</span>
          <md-button
            class="md-button md-rose md-sm md-simple edit-btn md-theme-default md-bold-extra"
            @click="addMoreMoney"
          >Add More Money</md-button>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button
        class="md-default md-simple cancel-btn md-bold"
        @click="close"
      >Cancel</md-button>
      <md-button
        :disabled="remainedBudget < newBuildingBlock.budget"
        class="md-red add-category-btn md-bold"
        @click="addNewCategory"
      >Add Category</md-button>
    </template>
  </modal>  
</template>
<script>
import { Modal } from '@/components'
import MaryokuInput from "@/components/Inputs/MaryokuInput.vue";
import EventComponent from "@/models/EventComponent";

export default {
  components: {
    Modal,
    MaryokuInput
  },
  props: {
    event: {
      type: Object,
      default: {} 
    },
    components: {
      type: Array,
      default: []
    }
  },
  created () {
    EventComponent.get()
      .then(components => {
        const availableComponents = []
        components.forEach(item => {
          const index = this.components.findIndex(comp=>item.key == comp.componentId)
          if (index < 0) {
            availableComponents.push(item)
          }
        })
        this.filteredEventBlocks = availableComponents
      })
      .catch(error => {
        console.log("Error ", error);
      });
  },
  data() {
    return {
      filteredEventBlocks: null,
      newBuildingBlock: {
        category: "",
        name: "",
        budget: ""
      },
    }
  },
  methods: {
    close() {
      this.$emit("cancel")
    },
    addNewCategory() {
      console.log(this.newBuildingBlock)
      this.$emit("save", this.newBuildingBlock)
    },
    addMoreMoney() {

    }
  },
  computed: {
    remainedBudget() {
      let allocatedBudget = this.components.reduce((s, item) => {
        return s + item.allocatedBudget;
      }, 0);
      // allocatedBudget = allocatedBudget + this.event.allocatedFees + this.event.allocatedTips;
      return Math.round((this.event.totalBudget - allocatedBudget) / 10) * 10;
    }
  },
}
</script>
<style lang="scss" scoped>

</style>