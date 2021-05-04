<template>
  <modal class="planning-board-additioal-modal" :containerClass="`modal-container xl`">
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
      <div v-if="selectedCategory.key === 'venuerental'">
        <div class="font-bold font-size-22">Any Additional Requests?</div>
        <div class="mt-20">Would you like to add one of those items?</div>
        <div class="tags mt-30">
          <tag-item
            @click="tag.isSelected = !tag.isSelected"
            :tagLabel="tag.subCategory"
            :key="tag.subCategory"
            :isSelected="tag.isSelected"
            v-for="tag in specialTags"
          ></tag-item>
        </div>
      </div>
      <div>
        <div v-for="section in subCategorySections" :key="section" class="text-left sub-category">
          <div class="font-bold-extra">{{ section }}</div>
          <div class="requirement-row text-left">
            <!-- {{ subCategory.requirements[section] }} -->
            <div v-for="item in subCategory.requirements[section]" class="requirement-item">
              <md-checkbox v-model="item.selected">{{ item.item }}</md-checkbox>
            </div>
          </div>
        </div>
        <div
          v-for="specialSection in specialTags.filter((item) => item.isSelected)"
          :key="specialSection.subCategory"
          class="text-left sub-category"
        >
          <div class="font-bold-extra">{{ specialSection.subCategory }}</div>
          <div class="requirement-row text-left" v-if="specialSection.subCategory !== 'Sitting arrangement'">
            <!-- {{ subCategory.requirements[section] }} -->
            <div v-for="item in specialSection.options" class="requirement-item">
              <md-checkbox v-model="item.selected">{{ item.name }}</md-checkbox>
            </div>
          </div>
          <template v-else>
            <div class="special-request-section-options">
              <div class="md-layout">
                <div
                  class="md-layout-item md-size-50 md-small-size-100 pt-20 pl-0"
                  v-for="(option, index) in specialSection.options"
                  :key="index"
                >
                  <div>
                    <md-checkbox class="md-simple md-red" v-model="option.selected" @change="changeItem">
                      <span>{{ option.item }}</span>
                    </md-checkbox>
                    <div class="ml-30">
                      <span class="font-bold">Popular for:</span>
                      {{ option.popular }}
                      <div>
                        <img :src="`${$iconURL}Requirements/${option.icon}`" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="md-layout-item md-size-50 md-small-size-100 pt-50 pl-0">
                  <div class="d-flex">
                    <md-checkbox class="md-simple md-red" @change="changeItem" v-model="specialSection.hasOtherOption">
                      <span class="font-bold">Other:</span>
                    </md-checkbox>
                    <maryoku-input class="flex-1" v-model="specialSection.otherOptionContent"></maryoku-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="special-request-section-description mt-20">
              <div class="font-size-20 font-bold">Is there going to be group work at the event?</div>
              <div class="mt-10">Which will require dedicated tables?</div>
              <div>
                <md-checkbox class="md-checkbox-circle md-red" v-model="isGroup" :value="true">Yes</md-checkbox>
                <md-checkbox class="md-checkbox-circle md-red" v-model="isGroup" :value="false">No</md-checkbox>
              </div>
              <div v-if="isGroup" class="d-flex align-start mt-20">
                <img :src="`${$iconURL}Requirements/enter-gray.svg`" style="margin-top: -10px" />
                <div>
                  <div class="font-size-20 font-bold">Around what size of groups?</div>
                  <div class="d-flex justify-content-between mt-10">
                    <md-radio
                      v-for="(size, idx) in specialSection.groupSizes"
                      v-model="groupSize"
                      :key="idx"
                      :value="size.item"
                      @change="sizeChange"
                    >
                      {{ `${size.item} people` }}</md-radio
                    >
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="anything-else-section text-left mt-30">
        <label class="font-bold">Additional {{ selectedCategory.fullTitle }} Requests?</label>
        <div class="mt-10">Tell us what else you would love to receive in the proposals we’ll send you</div>
        <div class="anything-else-section-options mt-10">
          <textarea
            placeholder="Type name of element here..."
            rows="5"
            v-model="anythingElse"
            @input="handleNoteChange"
          ></textarea>
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
  name: "AdditionalRequestModal",
  components: {
    Modal,
    TagItem,
    MaryokuInput,
  },
  data() {
    return {
      specialTags: [],
      selectedTags: [],
      subCategorySections: [],
      isGroup: false,
      groupSize: null,
      anythingElse: "",
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
    this.specialTags = this.subCategory.requirements["special"].map((item) => {
      return { ...item, selected: false };
    });
    this.specialTags = this.specialTags.filter(
      (item) => item.subCategory !== "Inclusion" && item.subCategory !== "Sustainability",
    );
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    onCancel: function (e) {
      this.$emit("cancel");
    },
    save: function () {
      this.$emit("save", { category: this.selectedCategory.key, requirements: this.subCategory.requirements });
    },
    addTag(tag) {
      const tagIndex = this.selectedTags.findIndex((item) => item === tag);
      if (tagIndex < 0) {
        this.selectedTags.push(tag);
      } else {
        this.selectedTags.splice(tagIndex, 1);
      }
    },
    handleNoteChange(e) {
      // this._saveRequirementsInStore(this.event);
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
  .requirement-row {
    .requirement-item {
      display: inline-block;
      min-width: 25%;
      // display: grid;
      // grid-template-columns: repeat(4, 25%);
    }
  }
  .sub-category {
    border-top: solid 1px #dbdbdb;
    margin-top: 30px;
    padding-top: 30px;
  }
}
</style>