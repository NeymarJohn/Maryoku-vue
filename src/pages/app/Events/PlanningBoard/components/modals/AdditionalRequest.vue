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
      <div class="md-layout maryoku-modal-body">
        <div class="text-left mb-40">
          <div class="font-size-20">Time Slot:</div>
          <div>
            <md-checkbox class="md-checkbox-circle md-red" v-model="isEntire" :value="true">Entire Event</md-checkbox>
          </div>
          <div class="d-flex">
            <md-checkbox class="md-checkbox-circle md-red" v-model="isEntire" :value="false"></md-checkbox>
            <time-slot class="time-slot-wrapper" @change="setTime"></time-slot>
          </div>
        </div>
      </div>
      <div v-if="selectedCategory.key === 'venuerental'">
        <div class="font-bold font-size-22">Any Additional Requests?</div>
        <div class="mt-20">Would you like to add one of those items?</div>
        <div class="tags mt-30">
          <tag-item
            @click="selectTag(tag)"
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
            <div
              v-for="item in subCategory[section].filter((item) => item.type !== 'single-selection' && item.visible)"
              :key="item.item"
              class="requirement-item"
            >
              <md-checkbox v-if="item.type !== 'single-selection'" v-model="item.selected">{{ item.item }}</md-checkbox>
            </div>
            <div
              v-for="item in subCategory[section].filter((item) => item.type === 'single-selection' && item.visible)"
              class="requirement-item-tags mt-10"
              :key="item.item"
            >
              <div class="mb-10">{{ item.item }}:</div>
              <tag-item
                @click="tag.selected = !tag.selected"
                :tagLabel="tag.name"
                :key="tag.name"
                :isSelected="tag.selected"
                :theme="`red`"
                v-for="tag in item.options"
              ></tag-item>
            </div>
          </div>
        </div>
        <div
          v-for="specialSection in specialTags.filter((item) => item.isSelected)"
          :key="specialSection.subCategory"
          class="text-left sub-category"
          :id="specialSection.subCategory"
        >
          <div class="font-bold-extra">{{ specialSection.subCategory }}</div>
          <div class="requirement-row text-left" v-if="specialSection.subCategory !== 'Sitting arrangement'">
            <!-- {{ subCategory.requirements[section] }} -->
            <div v-for="item in specialSection.options" class="requirement-item" :key="item.name">
              <md-checkbox v-model="item.selected">
                <div class="checkbox-label-wrapper">
                  <img class="special-icon" :src="getIcon(specialSection.subCategory, item.name)" />
                  {{ item.name }}
                </div>
              </md-checkbox>
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
        <div class="d-flex align-center mb-20" style="min-width: 300px">
          <img :src="`${$iconURL}Requirements/special-request-red.svg`" class="mr-20" />
          <div class="title">
            <div class="font-size-22 font-bold">Special Requests</div>
            <div class="mt-10">Would you like to add one of those items?</div>
          </div>
        </div>
        <label class="font-bold">Get me a pink unicorn please</label>
        <div class="mt-10">We love a good challenge! Tell us whatever you need, and we’ll add it to your proposal.</div>
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
import TimeSlot from "../TimeSlot.vue";
export default {
  name: "AdditionalRequestModal",
  components: {
    Modal,
    TagItem,
    MaryokuInput,
    TimeSlot,
  },
  data() {
    return {
      isEntire: false,
      specialTags: [],
      selectedTags: [],
      subCategorySections: [],
      isGroup: false,
      groupSize: null,
      anythingElse: "",
      period: null,
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
    defaultData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log(this.subCategory);
    this.subCategorySections = Object.keys(this.subCategory);
    this.subCategorySections = this.subCategorySections.filter(
      (item) => item !== "multi-selection" && item !== "special",
    );
    if (this.subCategory["special"]) {
      this.specialTags = this.subCategory["special"].map((item) => {
        return { ...item };
      });
    } else {
      this.specialTags = [];
    }
    console.log("speicalTags", this.specialTags);
    this.specialTags = this.specialTags.filter(
      (item) => item.subCategory !== "Inclusion" && item.subCategory !== "Sustainability",
    );
    this.anythingElse = this.defaultData.additionalRequest;
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    onCancel: function (e) {
      this.$emit("cancel");
    },
    save: function () {
      const requirements = { ...this.subCategory, additionalRequest: this.anythingElse };
      requirements.special = [];
      for (let item of this.specialTags) {
        requirements.special.push(item);
      }
      this.$emit("save", {
        category: this.selectedCategory.key,
        requirements: {
          mainRequirements: requirements,
          isEntireEvent: this.isEntire,
          period: this.period,
        },
      });
    },
    selectTag(tag) {
      tag.isSelected = !tag.isSelected;
      setTimeout(() => {
        this.goToSelectedTag(tag.subCategory);
      }, 100);
    },
    goToSelectedTag(item) {
      const theElement = document.getElementById(item);
      if (!theElement) return;
      const y = theElement.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = -50;
      const modalWrapper = document.getElementsByClassName("modal-wrapper")[0];
      if (modalWrapper) {
        modalWrapper.scrollTo({
          top: y + yOffset,
          behavior: "smooth",
        });
      }
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
    getIcon(subCategory, name) {
      let icon = null;
      if (name === "All Indoor") {
        icon = "All indoor";
      } else if (name === "Pregnant women") {
        icon = "pregnant-women-dark";
      } else if (name === "All Outdoor") {
        icon = "All outdoor";
      } else if (name === "Accessible Bathrooms") {
        icon = "Accessible bathroom";
      } else if (name === "Accessibility for people with disabilities") {
        icon = "Accessible for people with disabilities";
      } else if (name === "Hotel accommodations within walking distance") {
        icon = "Hotel";
      } else if (name === "Shopping centers") {
        icon = "Shopping center";
      } else if (name === "Dining options within walking distance") {
        icon = "Food2";
      } else if (name === "Water saving protocols") {
        icon = "Water saving";
      } else if (name === "Green power and energy efficient") {
        icon = "Green power";
      } else if (name === "Waste recycle procedures") {
        icon = "Waste recycle";
      } else if (name === "Non toxic products") {
        icon = "Non toxic";
      } else if (name === "Prioritizing diversity and inclution") {
        icon = "Diversity";
      } else if (name === "Women on senior staff") {
        icon = "Women on senior";
      } else if (name === "Strict sexual harrasment policy") {
        icon = "sexual harassment";
      } else if (name === "Acknowledge all religious and cultural holidays") {
        icon = "All religious";
      } else {
        icon = `${name}`;
      }
      if (subCategory === "Accessibility") {
        return `${this.$iconURL}Requirements/${icon}.svg`;
      } else if (subCategory === "Around the space" && name === "Dining options within walking distance") {
        return `${this.$iconURL}Requirements/${icon}.svg`;
      } else {
        return `${this.$secondIconURL}Requirements/Accessibility+Sustainability+and+Inclusion/${icon}.svg`;
      }
    },
    setTime(time) {
      console.log("newTIme", time);
      this.period = time;
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
      margin-right: 40px;
      // min-width: 25%;
      // display: grid;
      // grid-template-columns: repeat(4, 25%);
    }
  }
  .sub-category {
    border-top: solid 1px #dbdbdb;
    margin-top: 30px;
    padding-top: 30px;
  }
  .checkbox-label-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      width: 25px;
      margin: 0 5px;
    }
  }
  .time-slot-wrapper {
    margin-top: 16px;
  }
}
</style>