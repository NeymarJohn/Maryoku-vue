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
      <div></div>
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
      tags: ["Sustainability", "Inclusion", "Security", "Other", "Covid-19"],
      selectedTags: [],
    };
  },
  props: {
    subCategory: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.tags = Object.keys(this.subCategory.requirements);
    this.tags = this.tags.filter((item) => item !== "multi-selection" && item !== "special");
  },
  methods: {
    onCancel: function (e) {
      this.$emit("cancel");
    },
    save: function () {},
    addTag(tag) {
      this.selectedTags.push(tag);
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
}
</style>