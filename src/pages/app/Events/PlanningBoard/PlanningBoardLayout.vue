<template>
  <div class="booking-section">
    <div class="p-50">
      <div class="font-size-30 font-bold text-transform-uppercase">
        {{ $stringUtil.getTwoDigits(step) }}. We'd love to know your style
      </div>
      <div class="mt-20">Mark the services you need. each category has more than one, so feel free to navigate</div>
      <div class="md-layout md-gutter md-alignment-center">
        <div
          class="md-layout-item md-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
          v-for="service in serviceCategories"
          :key="service.key"
        >
          <service-category-card :serviceCategory="service"></service-category-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PlanningBoardState from "./state";
import ServiceCategoryCard from "./components/ServiceCategoryCard";
import { serviceCategoryImages } from "@/constants/event.js";

export default {
  components: {
    ServiceCategoryCard,
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
  },
};
</script>
