<template>
  <modal class="planning-board-additioal-modal" :containerClass="`modal-container lg`">
    <template slot="header">
      <div class="maryoku-modal-header text-center">
        <img :src="`${$iconURL}Requirements/Group+16281.svg`" />
        <div class="font-size-30 font-bold color-red mt-20">ALMOST DONE!</div>
      </div>
    </template>
    <template slot="body">
      <div class="md-layout maryoku-modal-body"></div>
      <div>
        <div class="font-bold font-size-22">Anyting else?</div>
        <div class="mt-20">Would you like to add any of those categories?</div>
        <div class="tags mt-30">
          <tag-item
            @click="addTag(tag)"
            :tagLabel="tag"
            :key="tag"
            :isSelected="selectedTags.includes(tag)"
            v-for="tag in tags"
          ></tag-item>
        </div>
      </div>
      <div>
        <div v-for="section in selectedTags" :key="section" class="text-left sub-category">
          <div class="font-bold-extra">{{ section }}</div>
          <div class="requirement-row text-left">
            <div v-for="item in speicalRequirements[section]" class="requirement-item">
              <md-checkbox v-model="item.selected">{{ item.name }}</md-checkbox>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-button md-black md-simple add-category-btn" @click="onCancel()">
        No, Skip
        <md-icon>keyboard_arrow_right</md-icon>
      </md-button>
      <md-button class="md-red md-bold add-category-btn" @click="save">Save & Finish</md-button>
    </template>
  </modal>
</template>
<script>
import { Modal, MaryokuInput } from "@/components";
import TagItem from "../TagItem.vue";
export default {
  name: "SpecialRequirementModal",
  components: {
    Modal,
    TagItem,
  },
  data() {
    return {
      tags: ["Sustainability", "Inclusion", "Security", "Other", "Covid-19"],
      selectedTags: [],
      speicalRequirements: {
        Sustainability: [
          { name: "Green policy", selected: false },
          { name: "Water saving protocols", selected: false },
          { name: "Green power and energy efficient", selected: false },
          { name: "Waste recycle procedures", selected: false },
          { name: "Non toxic products", selected: false },
        ],
        Inclusion: [
          { name: "Prioritizing diversity and inclution", selected: false },
          { name: "Women on senior staff", selected: false },
          { name: "Strict sexual harrasment policy", selected: false },
          { name: "Acknowledge all religious and cultural holidays", selected: false },
        ],
      },
    };
  },
  props: {
    subCategory: {
      type: Object,
      default: () => {},
    },
    defaultData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log("this.defaultData", this.defaultData);
    this.selectedTags = Object.keys(this.defaultData);
    this.speicalRequirements = { ...this.speicalRequirements, ...this.defaultData };
  },
  methods: {
    onCancel: function (e) {
      this.$emit("cancel");
    },
    save: function () {
      this.$emit("save", this.speicalRequirements);
    },
    addTag(tag) {
      const tagIndex = this.selectedTags.findIndex((item) => item === tag);
      if (tagIndex < 0) {
        this.selectedTags.push(tag);
      } else {
        this.selectedTags.splice(tagIndex, 1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.planning-board-additioal-modal {
  /deep/ .modal-header {
    background-color: #f3f7fd !important;
    .maryoku-modal-header {
      width: 100%;
      padding-bottom: 50px;
    }
  }
  .sub-category {
    border-top: solid 1px #dbdbdb;
    margin-top: 30px;
    padding-top: 30px;
  }
  .requirement-row {
    .requirement-item {
      display: inline-block;
      min-width: 25%;
      // display: grid;
      // grid-template-columns: repeat(4, 25%);
    }
  }
}
</style>