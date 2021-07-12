<template>
  <div class="booking-section planning-board-layout">
    <div class="p-50" v-if="!showCounterPage">
      <loader :active="isLoading || isLoadingStoredData" />
      <template v-if="!isLoading && !isLoadingStoredData">
        <div class="d-flex justify-content-between">
          <div class="font-size-30 font-bold text-transform-uppercase">
            {{ $stringUtil.getTwoDigits(step) }}.
            <span v-if="step === 1">We'd love to know your style</span>
            <span v-if="step === 2">What kind of services would you like us to find you?</span>
          </div>
          <progress-radial-bar :value="percentOfBudgetCategories" :total="12" @click="openCart"></progress-radial-bar>
        </div>
        <div class="md-layout md-gutter mt-40" v-if="step === 1">
          <div
            class="md-layout-item md-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            v-for="(serviceGroup, groupIndex) in serviceCards[step - 1]"
            :key="`serviceGroup-${groupIndex}`"
          >
            <service-category-card
              v-for="(service, serviceIndex) in serviceGroup"
              class="mb-40"
              :serviceCategory="service"
              :key="service.name"
              :isLong="(serviceIndex + groupIndex) % 2 === 1"
              :hasBudget="hasBudget(service.serviceCategory)"
              :musicPlayer="service.musicPlayer"
              :defaultData="getDefaultTypes(service.serviceCategory, service.name)"
              :isSentRequest="
                $store.state.planningBoard[service.serviceCategory] &&
                $store.state.planningBoard[service.serviceCategory].isIssued
              "
              @showSpecific="getSpecification"
              @update="setServiceStyles"
            ></service-category-card>
          </div>
        </div>
        <div class="md-layout md-gutter mt-40" v-if="step === 2">
          <div
            class="md-layout-item md-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            v-for="(serviceGroup, groupIndex) in serviceCards[step - 1]"
            :key="`serviceGroup-${groupIndex}`"
          >
            <service-category-card
              v-for="(service, serviceIndex) in serviceGroup"
              class="mb-40"
              :serviceCategory="service"
              :key="`${service.name}`"
              :isLong="(serviceIndex + groupIndex) % 2 === 1"
              :hasBudget="hasBudget(service.serviceCategory)"
              :defaultData="getDefaultTypes(service.serviceCategory, service.name)"
              :isSentRequest="
                $store.state.planningBoard[service.serviceCategory] &&
                $store.state.planningBoard[service.serviceCategory].isIssued
              "
              @showSpecific="getSpecification"
              @update="setServiceStyles"
            ></service-category-card>
          </div>
        </div>
      </template>
    </div>
    <template v-else>
      <pending-for-vendors :expiredTime="expiredTime"></pending-for-vendors>
    </template>
    <div class="proposal-footer white-card d-flex justify-content-between">
      <div>
        <md-button v-if="step === 2" @click="step = step - 1" class="md-simple edit-btn md-black">
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
    <additional-request-modal
      class="lg"
      v-if="isOpenedAdditionalModal"
      :subCategory="subCategory"
      :selectedCategory="selectedCategory"
      :defaultData="getRequirements(selectedCategory.key) || {}"
      :selectedTypes="getSelectedTypes(selectedCategory.key)"
      @save="saveAdditionalRequest"
      @cancel="isOpenedAdditionalModal = false"
      @close="isOpenedAdditionalModal = false"
    ></additional-request-modal>
    <special-requirement-modal
      v-if="isOpenedFinalModal"
      :defaultData="specialRequirements"
      @cancel="isOpenedFinalModal = false"
      @save="saveSpecialRequirements"
    >
    </special-requirement-modal>
    <transition name="slide-fade">
      <requirements-cart v-if="showCart" @close="showCart = false"></requirements-cart>
    </transition>
  </div>
</template>
<script>
import ServiceCategoryCard from "./components/ServiceCategoryCard";
import { serviceCategoryImages } from "@/constants/event.js";
import ProgressRadialBar from "./components/ProgressRadialBar.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "underscore";
import AdditionalRequestModal from "./components/modals/AdditionalRequest.vue";
import SpecialRequirementModal from "./components/modals/SpecialRequirement.vue";
import { camelize } from "@/utils/string.util";
import CalendarEvent from "@/models/CalendarEvent";
import ProposalRequestRequirement from "@/models/ProposalRequestRequirement";
import PendingForVendors from "../components/PendingForVendors.vue";
import { Loader } from "@/components";
import moment from "moment";
import RequirementsCart from "./RequirementsCart.vue";

import { postReq, getReq } from "@/utils/token";

export default {
  components: {
    ServiceCategoryCard,
    ProgressRadialBar,
    AdditionalRequestModal,
    SpecialRequirementModal,
    PendingForVendors,
    Loader,
    RequirementsCart,
  },
  data() {
    return {
      showCart: false,
      allRequirements: null,
      subCategory: null,
      serviceCards: [
        [
          [
            {
              name: "Venue Type",
              serviceCategory: "venuerental",
              images: [
                "Venue+Type/Academic Venue.jpg",
                "Venue+Type/Bar or Pub or Club.jpg",
                "Venue+Type/Community Center.jpg",
                "Venue+Type/Gallery_Option.png",
                "Venue+Type/Garden.jpg",
                "Venue+Type/Historic Establishment.png",
                "Venue+Type/Meeting Room.jpg",
                "Venue+Type/Restaurant.jpg",
                "Venue+Type/Sports Club.jpg",
                "Venue+Type/Stadium.jpg",
                "Venue+Type/Stately Home.jpg",
              ],
              imageTitles: [
                "Academic Venue",
                "Bar or Pub or Club",
                "Community Center",
                "Gallery",
                "Garden",
                "Historic Establishmen",
                "Meeting Room",
                "Restaurant",
                "Sports Club",
                "Stadium",
                "Stately Home",
              ],
              icon: "NewRequirements/Group 18008.svg",
            },
            {
              name: "Decor",
              serviceCategory: "decor",
              images: ["Decor/Florals.png", "Decor/Interior Design.png", "Decor/Lighting.png"],
              imageTitles: ["Florals", "Interior Design", "Lighting"],
              icon: "NewRequirements/Group 18012.svg",
            },
          ],
          [
            {
              name: "Cuisne Speciality",
              serviceCategory: "foodandbeverage",
              script:
                "requirements['multi-selection'][0]['options'][0]['selected'] = true;requirements['multi-selection'][0]['options'][1]['selected'] = false",
              images: [
                "Cuisine/American Food.png",
                "Cuisine/Argentine Food.png",
                "Cuisine/Chinese Food.jpg",
                "Cuisine/Colombian Food.png",
                "Cuisine/Cuban Food.jpg",
                "Cuisine/French Food.png",
                "Cuisine/German Food.png",
                "Cuisine/Greek Food.png",
                "Cuisine/Indian Food.png",
                "Cuisine/Italian Food.png",
                "Cuisine/Japanese Food.png",
                "Cuisine/Mexican Food.png",
                "Cuisine/Peruvian Food.png",
                "Cuisine/Spanish Food.png",
                "Cuisine/Thai Food.jpg",
              ],
              imageTitles: [
                "American Food",
                "Argentine Food",
                "Chinese Food",
                "Colombian Food",
                "Cuban Food",
                "French Food",
                "German Food",
                "Greek Food",
                "Indian Food",
                "Italian Food",
                "Japanese Food",
                "Mexican Food",
                "Peruvian Food",
                "Spanish Food",
                "Thai Food",
              ],
              icon: "NewRequirements/Group 18012.svg",
            },
            {
              name: "Liquor Stations",
              serviceCategory: "foodandbeverage",
              script:
                "requirements['multi-selection'][0]['options'][0]['selected'] = false;requirements['multi-selection'][0]['options'][1]['selected'] = true",
              images: [
                "Beverage/Beer.png",
                "Beverage/Bourbon.png",
                "Beverage/Champagne.png",
                "Beverage/Cocktail.png",
                "Beverage/Coffee and Tea.png",
                "Beverage/Margarita.png",
                "Beverage/Martini.png",
                "Beverage/Mixology.png",
                "Beverage/Rum.png",
                "Beverage/Soft Drinks.png",
                "Beverage/Sparkling Water.png",
                "Beverage/Still Water.png",
                "Beverage/Tequila.png",
                "Beverage/Vodka.png",
                "Beverage/Whiskey.png",
                "Beverage/Wine.png",
              ],
              imageTitles: [
                "Beer",
                "Bourbon",
                "Champagne",
                "Cocktail",
                "Coffee Dream",
                "Margarita",
                "Martini",
                "Mixology",
                "Rum",
                "Soft Drinks",
                "Sparkling Water",
                "Still Water",
                "Tequila",
                "Vodka",
                "Whiskey",
                "Wine",
              ],
              icon: "NewRequirements/Group 18017.svg",
            },
          ],
          [
            {
              name: "Photography  Videography/",
              serviceCategory: "videographyandphotography",
              images: [
                "Photography+_+Videography/Black_White.jpg",
                "Photography+_+Videography/Buisness.jpg",
                "Photography+_+Videography/Candid.jpg",
                "Photography+_+Videography/Commercial.jpg",
                "Photography+_+Videography/Drone.jpg",
                "Photography+_+Videography/Portrait.jpg",
              ],
              imageTitles: ["Black White", "Buisness", "Candid", "Commercial", "Drone", "Portrait"],
              icon: "NewRequirements/Group 18009.svg",
            },
            {
              name: "Music",
              serviceCategory: "entertainment",
              musicPlayer: true,
              clips: [
                "Music Clips/Asian-india-Bensound.mp3",
                "Music Clips/Blues-hipjazz-Bensound.mp3",
                "Music Clips/Classical_Wake_Up_CC Sound.mp3",
                "Music Clips/Country_Country Boy Song-Bensound.mp3",
                "Music Clips/Electronic_ERF-Bensound.mp3",
                "Music Clips/Folk_Hey-Bensound.mp3",
                "Music Clips/Hip Hop-groovyhiphop-Bensound.mp3",
                "Music Clips/Jazz-thejazzpiano-Bensound.mp3",
                "Music Clips/Latin_Latin Beat_CC Hound.mp3",
                "Music Clips/pop_Funday-Bensound.mp3",
                "Music Clips/RB_Heart_CC Sound.mp3",
                "Music Clips/Rock-rumble-Bensound.mp3",
                "Music Clips/Soul-retrosoul-Bensound.mp3",
              ],
              clipTitles: [
                "Asian",
                "Blues",
                "Classical",
                "Country",
                "Electronic",
                "Folk",
                "Hip Hop",
                "Jazz",
                "Latin Beat",
                "Pop Funday",
                "RB Heart",
                "Rock",
                "Soul",
              ],
              images: [
                "Asian.jpg",
                "Blues.jpg",
                "Classic.jpg",
                "Country.jpg",
                "Electronic.jpg",
                "Folk.jpg",
                "Hip Hop.jpg",
                "Jazz.jpg",
                "Latin.jpg",
                "pop.jpg",
                "RB.jpg",
                "Rock.jpg",
                "SOUL.jpg",
              ],
              imageTitles: ["Black White", "Buisness", "Candid", "Commercial", "Drone", "Portrait"],
              icon: "NewRequirements/Group 18013.svg",
              script: `
                  requirements['multi-selection'][0]['options'].forEach(item=>item.selected = false)
                  requirements['multi-selection'][0]['options'][0]['selected'] = true;
                  requirements['multi-selection'][0]['options'][1]['selected'] = true;
                `,
            },
          ],
        ],
        [
          [
            {
              name: "Giveaways",
              serviceCategory: "giveaways",
              images: [
                "Giveaways/Apparel.png",
                "Giveaways/Ceremonial Items.png",
                "Giveaways/Drinkware.jpeg",
                "Giveaways/Fitness.jpeg",
                "Giveaways/Gadgets.jpeg",
                "Giveaways/Office Items.png",
                "Giveaways/Specialty Food and Liquor.png",
                "Giveaways/Tote Bags.png",
                "Giveaways/Travel Accessories.jpg",
                "Giveaways/Wellness.png",
              ],
              imageTitles: [
                "Apparel",
                "Ceremonial Items",
                "Drinkware",
                "Fitness",
                "Gadgets",
                "Office Items",
                "Specialty Food and Liquor",
                "Tote Bags",
                "Travel Accessories",
                "Wellness",
              ],
              icon: "NewRequirements/Group 18014.svg",
            },
            {
              name: "Indoor Activities",
              serviceCategory: "entertainment",
              images: [
                "Indoor Activities/Casino Games.png",
                "Indoor Activities/Indoor Sport.png",
                "Indoor Activities/Make Your Own.png",
                "Indoor Activities/Photo Booth.png",
              ],
              imageTitles: ["Casino Games", "Indoor Sport", "Make Your Own", "Photo Booth"],
              icon: "NewRequirements/Group 18012.svg",
              script: `
                  requirements['multi-selection'][0]['options'].forEach(item=>item.selected = false)
                  requirements['multi-selection'][0]['options'][2]['selected'] = true;
                `,
            },
          ],
          [
            {
              name: "Outdoor Activities",
              serviceCategory: "entertainment",
              images: [
                "Outdoor Activities/class.jpg",
                "Outdoor Activities/Day trip_option.png",
                "Outdoor Activities/Museum & Art Gallery Visit.png",
                "Outdoor Activities/Show.jpg",
                "Outdoor Activities/Site Seeing.jpg",
                "Outdoor Activities/Sport Event.png",
                "Outdoor Activities/Wine Tasting.jpg",
                "Outdoor Activities/workshop.jpg",
              ],
              imageTitles: [
                "Class",
                "Day Trip Option",
                "Museum & Art Gallery Visit",
                "Show",
                "Site Seeing",
                "Sport Event",
                "Wine Tasting",
                "Workshop",
              ],
              icon: "NewRequirements/Group 18010.svg",
              script: `
                  requirements['multi-selection'][0]['options'].forEach(item=>item.selected = false)
                  requirements['multi-selection'][0]['options'][3]['selected'] = true;
                `,
            },
            {
              name: "AV",
              serviceCategory: "audiovisualstagingservices",
              images: ["A-V/Lighting.jpg", "A-V/Plasma TV.jpeg", "A-V/Projector.jpg"],
              imageTitles: ["Lighting", "Plasma TV", "Projector"],
              icon: "NewRequirements/Group 18073.svg",
            },
          ],
          [
            {
              name: "Guest Serivces & Staffing",
              serviceCategory: "administration",
              images: [
                "Staff/Concierge.png",
                "Staff/Day Of Coordinator.jpg",
                "Staff/Event Model.png",
                "Staff/Event Registration.png",
                "Staff/Tour Guide.jpg",
                "Staff/Transportation Host.png",
                "Staff/Wait Staff.png",
              ],
              imageTitles: [
                "Concierge",
                "Day Of Coordinator",
                "Event Model",
                "Event Registration",
                "Tour Guide",
                "Transportation Host",
                "Wait Staff",
              ],
              icon: "NewRequirements/Group 18026.svg",
            },
            //  {
            //   name: "Transportation",
            //   serviceCategory: "transportation",
            //   images: [
            //     "Transportation/Air Services.png",
            //     "Transportation/ATV.png",
            //     "Transportation/Bicycle.png",
            //     "Transportation/Boat.png",
            //     "Transportation/Bus.png",
            //     "Transportation/Ferry.png",
            //     "Transportation/Gold Carts.png",
            //     "Transportation/Private Black Car.jpg",
            //     "Transportation/Van.png",
            //   ],
            //   imageTitles: [
            //     "Air Services",
            //     "ATV",
            //     "Bicycle",
            //     "Boat",
            //     "Bus",
            //     "Ferry",
            //     "Gold Carts",
            //     "Private Black Car",
            //     "Van",
            //   ],
            //   icon: "NewRequirements/Group 18016.svg",
            // },
            {
              name: "Equipment Rentals",
              serviceCategory: "equipmentrentals",
              images: ["Rentals/Furniture.jpg", "Rentals/Tech Equpiment.jpg", "Rentals/Tent.jpg"],
              imageTitles: ["Furniture", "Tech Equipment", "Tent"],
              icon: "NewRequirements/Group 18016.svg",
            },
          ],
        ],
      ],
      isOpenedAdditionalModal: false,
      isOpenedFinalModal: false,
      selectedCategory: null,
      isLoading: false,
      isLoadingStoredData: false,
      showCounterPage: false,
      expiredTime: 0,
    };
  },
  created() {
    if (!this.allRequirements) {
      this.isLoading = true;
      this.$store
        .dispatch("event/getRequirements")
        .then((requirements) => {
          console.log("requirements", requirements);
          this.allRequirements = requirements;
          this.isLoading = false;
        })
        .catch((e) => {
          this.isLoading = false;
        });
      this.isLoadingStoredData = true;
      this.$store
        .dispatch("planningBoard/getRequirements", this.event.id)
        .then((requirements) => {
          console.log(requirements);
          this.isLoadingStoredData = false;
        })
        .catch((e) => {
          this.isLoadingStoredData = false;
        });
    }
    // if (this.event.processingStatus === "accept-proposal") {
    //   this.$router.push(`/events/${this.event.id}/booking/choose-vendor`);
    // }
  },
  computed: {
    ...mapState("planningBoard", {
      requirements: (state) => state,
      types: (state) => state.types,
      mainRequirements: (state) => state.mainRequirements,
      specialRequirements: (state) => state.specialRequirements,
    }),
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
    percentOfBudgetCategories() {
      let hasBudgetItems = 0;
      this.serviceCards.forEach((stepPanel) => {
        stepPanel.forEach((group) => {
          group.forEach((serviceCard) => {
            if (this.hasBudget(serviceCard.serviceCategory)) {
              hasBudgetItems++;
            }
          });
        });
      });
      return hasBudgetItems;
    },
  },
  methods: {
    ...mapMutations("event", ["setRequirementTypes", "setRequirementsForVendor", "setSubCategory"]),
    ...mapMutations("planningBoard", ["setData", "setMainRequirements", "setTypes", "setSpecialRequirements"]),
    ...mapActions("planningBoard", ["saveMainRequirements", "saveRequiementSheet", "saveTypes", "updateRequirements"]),
    findVendors() {
      this.isOpenedFinalModal = true;
    },
    saveSpecialRequirements(data) {
      this.isOpenedFinalModal = false;
      this.setSpecialRequirements(data);
      this.expiredTime = moment(new Date()).add(3, "days").valueOf();
      const requestRequirement = {
        issuedTime: new Date().getTime(),
        expiredBusinessTime: this.expiredTime,
      };
      postReq(`/1/events/${this.event.id}/find-vendors`, {
        issuedTime: new Date().getTime(),
        expiredBusinessTime: this.expiredTime,
      }).then((res) => {
        this.$router.push(`/events/${this.event.id}/booking/choose-vendor`);
        this.$store.dispatch(
          "event/saveEventAction",
          new CalendarEvent({ id: this.event.id, processingStatus: "accept-proposal" }),
        );
      });
    },
    hasBudget(categoryKey) {
      return !!this.event.components.find((item) => item.componentId == categoryKey);
    },
    getSpecification({ category, services }) {
      this.selectedCategory = this.$store.state.common.serviceCategories.find(
        (item) => item.key === category.serviceCategory,
      );
      this.isOpenedAdditionalModal = true;
      console.log(category.serviceCategory);
      let requirements = this.allRequirements[category.serviceCategory].requirements;
      const storedRequirements = this.requirements[category.serviceCategory].mainRequirements;
      console.log(requirements);
      requirements = { ...requirements, ...storedRequirements };
      if (category.script) eval(category.script); //select relevant options using script
      console.log(requirements);
      for (let subCategory of Object.keys(requirements)) {
        requirements[subCategory].forEach((item) => {
          try {
            if (item.conditionScript) item.visible = eval(item.conditionScript);
            else item.visible = true;
          } catch (e) {}
        });
      }
      this.subCategory = requirements;
    },
    getDefaultTypes(category, name) {
      return _.property([category, "types", camelize(name)])(this.requirements);
    },
    getSelectedTypes(category) {
      let typesList = [];
      // this.requirements
      const types = this.requirements[category].types;
      for (const t in types) {
        typesList = [...typesList, ...types[t]];
      }
      return typesList;
    },
    setServiceStyles({ category, services, type }) {
      // this.setTypes({ category: category.serviceCategory, data: services, type });
      this.saveTypes({ category: category.serviceCategory, event: this.event, types: { [type]: services } });
    },
    saveAdditionalRequest({ category, requirements }) {
      this.isOpenedAdditionalModal = false;
      // this.setMainRequirements({ category: category, data: requirements });
      this.saveMainRequirements({ category, event: this.event, requirements });
    },

    async addNewCategory(category) {
      this.selectedCategory = this.$store.state.common.serviceCategories.find((item) => item.key === category);
      // const event = new CalendarEvent({
      //   id: this.event.id,
      //   unexpectedBudget: this.event.unexpectedBudget - newCategory.allocatedBudget,
      //   calendar: new Calendar({ id: this.event.calendar.id }),
      // });
      // this.showAddNewCategory = false;
      // this.$store.dispatch("event/saveEventAction", event).then((res) => {});
    },
    getRequirements(category) {
      if (!this.$store.state.planningBoard[category]) return {};
      return this.$store.state.planningBoard[category].mainRequirements;
    },
    openCart() {
      this.showCart = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.planning-board-layout {
  .loading-screen {
    height: 100vh;
  }
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
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
