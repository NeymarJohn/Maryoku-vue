<template>
  <modal class="planning-board-additioal-modal" :container-class="`modal-container lg w-min-800`">
    <template slot="header">
      <div class="maryoku-modal-header text-center">
        <img :src="`${$iconURL}NewRequirements/group-16281.svg`">
        <div class="font-size-30 font-bold color-red mt-20">
          ALMOST DONE!
        </div>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button p-absolute" @click="$emit('cancel')">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="md-layout maryoku-modal-body" />
      <div>
        <div class="font-bold font-size-22">
          Anything else?
        </div>
        <div class="mt-20">
            Whether these values are at the heart of your event or simply close to your heart, we make it easy to <br/>
            filter vendors based on various social, environmental, and wellbeing factors. <br/>
            Simply check the boxes most relevant to your needs or concerns.
        </div>
        <div class="tags mt-30">
          <tag-item
            v-for="tag in tags"
            :key="tag"
            :tag-label="tag"
            :is-selected="selectedTags.includes(tag)"
            class="m-5"
            @click="addTag(tag)"
          />
        </div>
      </div>
      <div>
        <div v-for="section in selectedTags" :id="section" :key="section" class="text-left sub-category">
          <div class="font-bold-extra">
            {{ section }}
          </div>
          <div class="requirement-row text-left">
            <div v-for="subCategory in speicalRequirements[section]" :key="subCategory.subCategory" class="mt-30">
              <div v-if="subCategory.subCategory" class="font-bold color-gray">
                {{ subCategory.subCategory }}:
              </div>
              <div v-for="item in subCategory.items" :key="item.name" class="requirement-item">
                <md-checkbox v-model="item.selected" class="checkbox-label-wrapper">
                  <img
                    v-if="getIcon(item.subCategory, item.name)"
                    class="special-icon"
                    :src="getIcon(item.subCategory, item.name)"
                  >
                  {{ item.name }}
                </md-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <md-button class="md-button md-black md-simple add-category-btn" @click="skip">
        No, Skip
        <md-icon>keyboard_arrow_right</md-icon>
      </md-button>
      <md-button class="md-red md-bold add-category-btn" @click="save">
        Find Me Vendors
      </md-button>
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
  data() {
    return {
      tags: ["Sustainability", "Inclusion", "Covid-19"],
      selectedTags: [],
      speicalRequirements: {
        Sustainability: [
          {
            subCategory: "",
            items: [
              { name: "Green policy", selected: false },
              { name: "Water saving protocol", selected: false },
              { name: "Renewable energy / energy efficient", selected: false },
              { name: "Waste recycling procedure", selected: false },
              { name: "Non-toxic products", selected: false },
            ],
          },
        ],
        Inclusion: [
          {
            subCategory: "",
            items: [
              { name: "Prioritizes diversity and inclusion", selected: false },
              { name: "Women in senior roles", selected: false },
              { name: "Strict sexual harassment policy", selected: false },
              { name: "Acknowledges all religious and cultural holidays", selected: false },
            ],
          },
        ],
        // Security: [
        //   {
        //     subCategory: "Services",
        //     items: [
        //       { name: "Day of security", selected: false },
        //       { name: "Security consultation", selected: false },
        //       { name: "Personal security", selected: false },
        //       { name: "VIP security", selected: false },
        //       { name: "Parameter security", selected: false },
        //       { name: "Risk assessment", selected: false },
        //       { name: "Crowd control", selected: false },
        //     ],
        //   },
        //   {
        //     subCategory: "Staff",
        //     items: [
        //       { name: "Patrolling officers", selected: false },
        //       { name: "Bouncers", selected: false },
        //       { name: "Unarmed security", selected: false },
        //       { name: "Undercover", selected: false },
        //       { name: "Chaperones", selected: false },
        //       { name: "Body guards", selected: false },
        //       { name: "Armed security offices", selected: false },
        //       { name: "Paramedic", selected: false },
        //     ],
        //   },
        // ],
        // "Signage & Printing": [
        //   {
        //     subCategory: "Services",
        //     items: [
        //       { name: "Social media promotion", selected: false },
        //       { name: "Event registration tracking", selected: false },
        //       { name: "Graphic design services", selected: false },
        //     ],
        //   },
        //   {
        //     subCategory: "High profile sourcing",
        //     items: [
        //       { name: "Politicians", selected: false },
        //       { name: "Celebrities", selected: false },
        //       { name: "Influencers", selected: false },
        //       { name: "Artists", selected: false },
        //     ],
        //   },
        // ],
        // Transporation: [
        //   {
        //     subCategory: "Amenities",
        //     items: [
        //       { name: "Wifi", selected: false },
        //       { name: "Bar", selected: false },
        //       { name: "TV/Cable TV", selected: false },
        //       { name: "Restrooms", selected: false },
        //       { name: "Luggage", selected: false },
        //       { name: "Food", selected: false },
        //     ],
        //   },
        //   {
        //     subCategory: "Services",
        //     items: [
        //       { name: "Round trip", selected: false },
        //       { name: "One way", selected: false },
        //       { name: "Airport pickup/drop off", selected: false },
        //       { name: "Tours", selected: false },
        //     ],
        //   },
        //   {
        //     subCategory: "Staff",
        //     items: [{ name: "Uniformed drivers", selected: false }],
        //   },
        // ],
        "Covid-19": [
          {
            subCategory: "Requests for all stuff members",
            items: [
              { name: "Mask wearing", selected: false },
              { name: "Enhanced cleaning", selected: false },
              { name: "Cancellation in mitigating circumstances Policy", selected: false },
              { name: "Social distancing", selected: false },
              { name: "Vaccination Certificate", selected: false },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.selectedTags = Object.keys(this.defaultData);
    this.speicalRequirements = { ...this.speicalRequirements, ...this.defaultData };
  },
  methods: {
    onCancel: function (e) {
      this.$emit("cancel");
    },
    skip: function () {
      this.$emit("save", {});
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
      setTimeout(() => {
        this.goToSelectedTag(tag);
      }, 100);
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
      } else if (name === "Water saving protocol") {
        icon = "Water saving";
      } else if (name === "Renewable energy / energy efficient") {
        icon = "Green power";
      } else if (name === "Waste recycling procedure") {
        icon = "Waste recycle";
      } else if (name === "Non-toxic products") {
        icon = "Non toxic";
      } else if (name === "Prioritizes diversity and inclusion") {
        icon = "Diversity";
      } else if (name === "Women in senior roles") {
        icon = "Women on senior";
      } else if (name === "Strict sexual harassment policy") {
        icon = "sexual harassment";
      } else if (name === "Acknowledges all religious and cultural holidays") {
        icon = "All religious";
      } else if (name === "Green policy") {
        icon = "Green policy";
      }
      if (subCategory === "Accessibility") {
        return `${this.$iconURL}Requirements/${icon}.svg`;
      } else if (subCategory === "Around the space" && name === "Dining options within walking distance") {
        return `${this.$iconURL}Requirements/${icon}.svg`;
      } else if (icon) {
        return `${this.$secondIconURL}Requirements/Accessibility+Sustainability+and+Inclusion/${icon}.svg`;
      }
      return null;
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
  .checkbox-label-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      width: 25px;
      margin: 0 5px;
    }
  }
}
</style>
