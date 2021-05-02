<template>
  <modal class="planning-board-additioal-modal" :containerClass="`modal-container lg`">
    <template slot="header">
      <div class="maryoku-modal-header text-left">
        <img :src="`${$iconURL}Budget+Elements/${selectedCategory.icon}`" style="width: 30px; margin-right: 0.5em" />
        <div class="font-size-30 font-bold color-black">{{ selectedCategory.fullTitle }}</div>
      </div>
      <md-button class="md-just-icon md-simple" @click="close">
        <md-icon>close</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="md-layout maryoku-modal-body"></div>
      <div>
        <div class="font-bold font-size-22">Any Additional Requests?</div>
        <div class="mt-20">Would you like to add one of those items?</div>
        <div class="tags mt-30" v-if="selectedCategory.key === 'venuerental'">
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
        <div v-for="section in subCategorySections" :key="section" class="text-left sub-category">
          <div class="font-bold-extra">{{ section }}</div>
          <div class="requirement-item text-left">
            <!-- {{ subCategory.requirements[section] }} -->
            <div v-for="item in subCategory.requirements[section]">
              <md-checkbox v-model="item.selected">{{ item.item }}</md-checkbox>
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
  name: "Additional Request Modal",
  components: {
    Modal,
    TagItem,
  },
  data() {
    return {
      tags: ["Sitting arrangement", "Around the venue", "Accessibility"],
      selectedTags: [],
      subCategorySections: [],
    };
  },
  props: {
    subCategory: {
      type: Object,
      default: () => {},
    },
    selectedCategory: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.subCategorySections = Object.keys(this.subCategory.requirements);
    this.subCategorySections = this.subCategorySections.filter(
      (item) => item !== "multi-selection" && item !== "special",
    );
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    onCancel: function (e) {
      this.$emit("cancel");
    },
    save: function () {},
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
    button {
      position: absolute;
    }
    .maryoku-modal-header {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
  .requirement-item {
    display: grid;
    grid-template-columns: repeat(4, 25%);
  }
  .sub-category {
    border-top: solid 1px #dbdbdb;
    margin-top: 30px;
    padding-top: 30px;
  }
}
</style>