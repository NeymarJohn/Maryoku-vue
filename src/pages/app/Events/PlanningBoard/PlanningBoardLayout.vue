<template>
  <div class="booking-section planning-board-layout">
    <div class="p-50">
      <div class="d-flex justify-content-between">
        <div cl>
          <div class="font-size-30 font-bold text-transform-uppercase">
            {{ $stringUtil.getTwoDigits(step) }}. We'd love to know your style
          </div>
          <div class="mt-20">Mark the services you need. each category has more than one, so feel free to navigate</div>
        </div>
        <progress-radial-bar></progress-radial-bar>
      </div>

      <div class="md-layout md-gutter mt-40">
        <div
          class="md-layout-item md-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
          v-for="(serviceGroup, groupIndex) in serviceCategoriesForGrid"
          :key="`serviceGroup-${groupIndex}`"
        >
          <service-category-card
            v-for="(service, serviceIndex) in serviceGroup"
            class="mb-40"
            :serviceCategory="service"
            :key="service.id"
            :isLong="(serviceIndex + groupIndex) % 2 === 1"
          ></service-category-card>
        </div>
      </div>
    </div>
    <div class="proposal-footer white-card d-flex justify-content-between">
      <div></div>
      <div>
        <md-button class="md-simple md-black maryoku-btn">
          <img :src="`${$iconURL}Campaign/Group 8871.svg`" />
          Clear Choices
        </md-button>
        <md-button class="md-simple md-outlined md-red maryoku-btn">
          <img :src="`${$iconURL}common/save-red.svg`" />
          Save Draft
        </md-button>
        <md-button class="md-red maryoku-btn"> Next </md-button>
      </div>
    </div>
  </div>
</template>
<script>
import PlanningBoardState from "./state";
import ServiceCategoryCard from "./components/ServiceCategoryCard";
import { serviceCategoryImages } from "@/constants/event.js";
import ProgressRadialBar from "./components/ProgressRadialBar.vue";

export default {
  components: {
    ServiceCategoryCard,
    ProgressRadialBar,
  },
  created() {},
  beforeCreate() {
    if (this.$store.registerModule("planningBoard", PlanningBoardState) === false) {
      this.$store.unregisterModule("planningBoard");
      this.$store.registerModule("planningBoard", PlanningBoardState);
    }
  },
  beforeDestroy() {
    this.$store.unregisterModule("planningBoard");
  },
  computed: {
    step() {
      return this.$store.state.planningBoard.step;
    },
    serviceCategories() {
      return this.$store.state.common.serviceCategories.map((service) => {
        service["images"] = serviceCategoryImages[service.key];
        return service;
      });
    },
    serviceCategoriesForGrid() {
      const services = [[], [], []];
      let n = 0;
      this.serviceCategories.forEach((service, index) => {
        services[index % 3].push(service);
      });
      return services;
    },
  },
};
</script>
<style lang="scss" scoped>
.planning-board-layout {
  .proposal-footer {
    padding: 40px 50px;
    button {
      width: 250px;
      margin-left: 20px;
      img {
        width: 22px;
        margin-right: 10px;
      }
    }
  }
}
</style>>
