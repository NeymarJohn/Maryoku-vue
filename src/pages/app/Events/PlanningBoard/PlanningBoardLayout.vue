<template>
  <div class="booking-section planning-board-layout">
    <div class="p-50">
      <div class="d-flex justify-content-between">
        <div>
          <div class="font-size-30 font-bold text-transform-uppercase">
            {{ $stringUtil.getTwoDigits(step) }}.
            <span v-if="step === 1">We'd love to know your style</span>
            <span v-if="step === 2">What kind of services would you like us to find you?</span>
          </div>
          <div class="mt-20">Mark the services you need. Each category has more than one, so feel free to navigate</div>
        </div>
        <progress-radial-bar></progress-radial-bar>
      </div>
      <div class="md-layout md-gutter mt-40" v-if="step === 1">
        <div
          class="md-layout-item md-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
          v-for="(serviceGroup, groupIndex) in serviceCards1"
          :key="`serviceGroup-${groupIndex}`"
        >
          <service-category-card
            v-for="(service, serviceIndex) in serviceGroup"
            class="mb-40"
            :serviceCategory="service"
            :key="service.name"
            :isLong="(serviceIndex + groupIndex) % 2 === 1"
            :hasBudget="hasBudget(service.serviceCategory)"
          ></service-category-card>
        </div>
      </div>
      <div class="md-layout md-gutter mt-40" v-if="step === 2">
        <div
          class="md-layout-item md-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
          v-for="(serviceGroup, groupIndex) in serviceCards2"
          :key="`serviceGroup-${groupIndex}`"
        >
          <service-category-card
            v-for="(service, serviceIndex) in serviceGroup"
            class="mb-40"
            :serviceCategory="service"
            :key="service.name"
            :isLong="(serviceIndex + groupIndex) % 2 === 1"
            :hasBudget="hasBudget(service.serviceCategory)"
          ></service-category-card>
        </div>
      </div>
    </div>
    <div class="proposal-footer white-card d-flex justify-content-between">
      <div>
        <md-button v-if="step === 2" @click="step = step - 1" class="md-simple maryoku-btn md-black">
          <md-icon>arrow_back</md-icon>
          Back
        </md-button>
      </div>
      <div>
        <md-button class="md-simple md-black maryoku-btn">
          <img :src="`${$iconURL}Campaign/Group 8871.svg`" />
          Clear Choices
        </md-button>
        <md-button class="md-simple md-outlined md-red maryoku-btn">
          <img :src="`${$iconURL}common/save-red.svg`" />
          Save Draft
        </md-button>
        <md-button class="md-red maryoku-btn" v-if="step === 1" @click="step = step + 1"> Next </md-button>
        <md-button class="md-red maryoku-btn" v-if="step === 2" @click="findVendors"> Find Me Vendors </md-button>
      </div>
    </div>
    <additional-request-modal class="lg" v-if="isOpenedAdditionalModal"></additional-request-modal>
  </div>
</template>
<script>
import PlanningBoardState from "./state";
import ServiceCategoryCard from "./components/ServiceCategoryCard";
import { serviceCategoryImages } from "@/constants/event.js";
import ProgressRadialBar from "./components/ProgressRadialBar.vue";

import AdditionalRequestModal from "./components/modals/AdditionalRequest.vue";
export default {
  components: {
    ServiceCategoryCard,
    ProgressRadialBar,
    AdditionalRequestModal,
  },
  data() {
    return {
      serviceCards1: [
        [
          {
            name: "Venue Type",
            serviceCategory: "venuerental",
            images: [
              "Venue+Type/Academic Venue_Shutterstock.jpg",
              "Venue+Type/Bar or Pub or Club_Shutterstock.jpg",
              "Venue+Type/Community Center_Shutterstock.jpg",
              "Venue+Type/Gallery_Option 1_Canva Free.png",
              "Venue+Type/Garden_Option 1_Shutterstock.jpg",
              "Venue+Type/Historic Establishment_Canva Pro.png",
              "Venue+Type/Meeting Room_Shutterstock.jpg",
              "Venue+Type/Restaurant_Shutterstock.jpg",
              "Venue+Type/Sports Club_Shutterstock.jpg",
              "Venue+Type/Stadium_Shutterstock.jpg",
              "Venue+Type/Stately Home_Option 1_Shutterstock.jpg",
            ],
          },
          {
            name: "Decor",
            serviceCategory: "decor",
            images: [
              "Decor/Florals_Option 1_Canva Pro.png",
              "Decor/Interior Design_Canva Free.png",
              "Decor/Lighting_Canva Pro.png",
            ],
          },
        ],
        [
          {
            name: "Cuisne Speciality",
            serviceCategory: "foodandbeverage",
            images: [
              "Cuisine/American Food_Canva.png",
              "Cuisine/Argentine Food_Canva.png",
              "Cuisine/Chinese Food.jpg",
              "Cuisine/Colombian Food_Canva.png",
              "Cuisine/Cuban Food.jpg",
              "Cuisine/French Food_Canva.png",
              "Cuisine/German Food_Option 1.png",
              "Cuisine/German Food_Option 2.png",
              "Cuisine/Greek Food_Canva_Option 1.png",
              "Cuisine/Indiian Food_Canva.png",
              "Cuisine/Itlalian Food_Canva.png",
              "Cuisine/Japanese Food_Canva.png",
              "Cuisine/Mexican Food_Canva.png",
              "Cuisine/Peruvian Food_Option 1.png",
              "Cuisine/Spanish Food_Canva.png",
              "Cuisine/Thai Food.jpg",
            ],
          },
          {
            name: "Liquor Stations",
            serviceCategory: "foodandbeverage",
            images: [
              "Beverage/Beer_Canva Pro.png",
              "Beverage/Bourbon_Canva Pro.png",
              "Beverage/Champagne_Canva Pro.png",
              "Beverage/Cocktail_Canva Pro.png",
              "Beverage/Coffee _ Dream_Canva Pro.png",
              "Beverage/Margarita_Canva Pro.png",
              "Beverage/Martini_Canva Pro.png",
              "Beverage/Mixology_Canva Pro.png",
              "Beverage/Rum_Canva Pro.png",
              "Beverage/Soft Drinks_Option 1_Canva Pro.png",
              "Beverage/Soft Drinks_Option 2_Canva Pro.png",
              "Beverage/Sparkling Water_Canva Pro.png",
              "Beverage/Still Water_Canva Pro.png",
              "Beverage/Tequila_Canva Pro.png",
              "Beverage/Vodka_Canva Pro.png",
              "Beverage/Whiskey_Canva Pro.png",
              "Beverage/Wine_Canva Pro.png",
            ],
          },
        ],
        [
          {
            name: "Photography Style",
            serviceCategory: "entertainment",
            images: [
              "Photography+_+Videography/Black_White.jpg",
              "Photography+_+Videography/Buisness.jpg",
              "Photography+_+Videography/Candid.jpg",
              "Photography+_+Videography/Commercial.jpg",
              "Photography+_+Videography/Drone.jpg",
              "Photography+_+Videography/Portrait.jpg",
            ],
          },
          {
            name: "Music",
            serviceCategory: "entertainment",
            images: [
              "Photography+_+Videography/Black_White.jpg",
              "Photography+_+Videography/Buisness.jpg",
              "Photography+_+Videography/Candid.jpg",
              "Photography+_+Videography/Commercial.jpg",
              "Photography+_+Videography/Drone.jpg",
              "Photography+_+Videography/Portrait.jpg",
            ],
          },
        ],
      ],
      serviceCards2: [
        [
          {
            name: "Swag",
            serviceCategory: "swag",
            images: ["Outdoor Activities/Day trip_option 3_Canva..png", "Outdoor Activities/Sport Event 1.png"],
          },
          {
            name: "Special Requirment",
            serviceCategory: "speicalrequirements",
            images: ["Outdoor Activities/Day trip_option 3_Canva..png", "Outdoor Activities/Sport Event 1.png"],
          },
        ],
        [
          {
            name: "Activities",
            serviceCategory: "swag",
            images: ["Outdoor Activities/Day trip_option 3_Canva..png", "Outdoor Activities/Sport Event 1.png"],
          },
          {
            name: "AV",
            serviceCategory: "audiovisualstagingservices",
            images: ["Outdoor Activities/Day trip_option 3_Canva..png", "Outdoor Activities/Sport Event 1.png"],
          },
        ],
        [
          {
            name: "Guest Serivces & Staffing",
            serviceCategory: "corporatesocialresponsibility",
            images: [
              "Staff/Concierge 2.png",
              "Staff/Day Of Coordinator Option 2.jpg",
              "Staff/Event Model 1.png",
              "Staff/Event Registration 1.png",
              "Staff/shutterstock_72321160.jpg",
              "Staff/Transportation Host.png",
              "Staff/Wait Staff 1.png",
            ],
          },
          {
            name: "Transportation",
            serviceCategory: "transportation",
            images: [
              "Transportation/Air Services_Canva Pro.png",
              "Transportation/ATV_Canva Pro.png",
              "Transportation/Bicycle_Canva Pro.png",
              "Transportation/Boat_Canva Pro.png",
              "Transportation/Bus_Canva Pro.png",
              "Transportation/Ferry_Canva Pro.png",
              "Transportation/Gold Carts_Canva Pro.png",
              "Transportation/Private Black Car.jpg",
              "Transportation/Van_Canva Pro.png",
            ],
          },
        ],
      ],
      isOpenedAdditionalModal: false,
    };
  },
  created() {},
  beforeCreate() {
    if (this.$store.registerModule("planningBoard", PlanningBoardState) === false) {
      this.$store.unregisterModule("planningBoard");
      this.$store.registerModule("planningBoard", PlanningBoardState);
    }
  },
  // beforeDestroy() {
  //   this.$store.unregisterModule("planningBoard");
  // },
  computed: {
    step: {
      get() {
        return this.$store.state.planningBoard.step;
      },
      set(value) {
        this.$store.commit("planningBoard/setStep", value);
      },
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
    event() {
      return this.$store.state.event.eventData;
    },
  },
  methods: {
    findVendors() {
      this.isOpenedAdditionalModal = true;
    },
    hasBudget(categoryKey) {
      return this.event.components.find((item) => item.componentId == categoryKey);
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
