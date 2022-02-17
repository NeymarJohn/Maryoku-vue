<template>
  <div class="booking-section planning-board-layout">
    <div class="p-50" v-if="!showCounterPage">
      <loader :active="isLoading || isLoadingStoredData" />
      <template v-if="!isLoading && !isLoadingStoredData">
        <div class="d-flex justify-content-between align-center">
            <div>
                <ResizableToggleButton
                    class="mr-20 mb-10"
                    :key="component.componentId"
                    :label="component.eventCategory ? component.eventCategory.fullTitle : ''"
                    :icon="`${$iconURL}Budget+Elements/${component.eventCategory ? component.eventCategory.icon : ''}`"
                    :selectedIcon="`${$iconURL}Budget+Elements/${component.componentId}-white.svg`"
                    :defaultStatus="selectedCategory && component.componentId === selectedCategory.componentId"
                    :disabled="!eventRequirements[component.componentId]"
                    :hasBadge="hasBadge(component)"
                    iconStyle="opacity:0.8"
                    v-for="component in categories"
                    @click="selectCategory(component)"
                ></ResizableToggleButton>
                <button class="add-category-button mb-10" @click="addRequirements"><md-icon>add</md-icon></button>
            </div>
          <ProgressRadialBar
            :value="percentOfBudgetCategories"
            :total="event.components.length"
            @click="openCart"
          ></ProgressRadialBar>
        </div>
        <div class="booking-proposals">
            <template v-if="selectedCategory">
                <div class="font-size-30 font-bold-extra category-title mt-30 mb-30" v-if="selectedCategory.eventCategory">
                    <img :src="`${$iconURL}Budget+Elements/${selectedCategory.eventCategory.icon}`" />
                    {{ selectedCategory.fullTitle }}
                </div>
            </template>
        </div>
        <div class="md-layout md-gutter mt-40" v-if="step === 1">
          <div
            class="md-layout-item md-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
            v-for="(serviceGroup, groupIndex) in serviceCards[step - 1]"
            :key="`serviceGroup-${groupIndex}`"
          >
            <template v-for="(service, serviceIndex) in serviceGroup">
                <template v-if="selectedCategory && selectedCategory.componentId == service.serviceCategory">
                    <ServiceCategoryCard
                    class="mb-40"
                    :serviceCategory="service"
                    :key="service.name"
                    :isLong="(serviceIndex + groupIndex) % 2 === 1"
                    :hasBudget="hasBudget(service.serviceCategory)"
                    :musicPlayer="service.musicPlayer"
                    :defaultData="getDefaultTypes(service.serviceCategory, service.name)"
                    :isSentRequest="
                        $store.state.planningBoard.requirements[service.serviceCategory] &&
                        $store.state.planningBoard.requirements[service.serviceCategory].isIssued
                    "
                    @showSpecific="getSpecification"
                    @update="setServiceStyles"
                    ></ServiceCategoryCard>
                </template>
            </template>
          </div>
        </div>

      </template>
    </div>
    <template v-else>
      <PendingForVendors :expiredTime="expiredTime"></PendingForVendors>
    </template>
    <div class="proposal-footer white-card d-flex justify-content-between">
      <div>
        <md-button class="md-simple md-outlined md-red maryoku-btn">
          <img :src="`${$iconURL}common/save-red.svg`" />
          Save Draft
        </md-button>
        <md-button class="md-red maryoku-btn" v-if="step === 1" @click="findVendors"> Find Me Vendors </md-button>
      </div>
    </div>
    <AdditionalRequestModal
      class="lg"
      v-if="isOpenedAdditionalModal"
      :subCategory="subCategory"
      :selectedCategory="selectedCategory"
      :defaultData="getRequirements(selectedCategory.key) || {}"
      :selectedTypes="getSelectedTypes(selectedCategory.key)"
      @save="saveAdditionalRequest"
      @cancel="isOpenedAdditionalModal = false"
      @close="isOpenedAdditionalModal = false"
    ></AdditionalRequestModal>
    <special-requirement-modal
      v-if="isOpenedFinalModal"
      :defaultData="specialRequirements"
      @cancel="isOpenedFinalModal = false"
      @save="saveSpecialRequirements"
    >
    </special-requirement-modal>
    <transition name="slide-fade">
      <RequirementsCart
        v-if="showCart"
        :requirements="requirements"
        :service-categories="serviceCategories"
        :total="event.components.length"
        @close="showCart = false"
      ></RequirementsCart>
    </transition>
    <CustomPopup @cancel="popup = false" v-if="popup" />
  </div>
</template>
<script>
import { serviceCategoryImages, ServiceCards } from "@/constants/event.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "underscore";
import { camelize } from "@/utils/string.util";
import CalendarEvent from "@/models/CalendarEvent";
import moment from "moment";

import { postReq, getReq } from "@/utils/token";

const components = {
  CustomPopup: () => import("./components/modals/Popup.vue"),
  ServiceCategoryCard: () => import("./components/ServiceCategoryCard"),
  ProgressRadialBar: () => import("./components/ProgressRadialBar.vue"),
  AdditionalRequestModal: () => import("./components/modals/AdditionalRequest.vue"),
  SpecialRequirementModal: () => import("./components/modals/SpecialRequirement.vue"),
  PendingForVendors: () => import("../components/PendingForVendors.vue"),
  Loader: () => import("@/components/loader/Loader.vue"),
  RequirementsCart: () => import("./RequirementsCart.vue"),

  ResizableToggleButton: () => import("@/components/Button/ResizableToggleButton.vue"),

};

export default {
  components,
  data() {
    return {
      popup: false,
      showCart: false,
      allRequirements: null,
      subCategory: null,
      serviceCards: ServiceCards,
      isOpenedAdditionalModal: false,
      isOpenedFinalModal: false,
      selectedCategory: null,
      isLoading: false,
      isLoadingStoredData: false,
      showCounterPage: false,
      expiredTime: 0,

      proposalsByCategory: {},

    };
  },
  async created() {
    await this.$store.dispatch("planningBoard/resetRequirements");
    if (!this.allRequirements) {
      this.isLoading = true;
      this.allRequirements = await this.$store.dispatch("event/getRequirements");

      this.isLoading = false;
      this.isLoadingStoredData = true;
      await this.$store.dispatch("planningBoard/getRequirements", this.event.id);

      this.isLoadingStoredData = false;
      this.selectCategory(this.categories[0]);
    }
  },
  computed: {
    ...mapState({
      eventRequirements: (state) => state.planningBoard.requirements || {},
    }),
    categories() {
      const categories = this.event.components;
      categories.sort((a, b) => a.order - b.order);
      return categories;
    },
    requirements() {
      return this.$store.state.planningBoard.requirements;
    },
    types() {
      return this.$store.state.planningBoard.types;
    },
    mainRequirements() {
      return this.$store.state.planningBoard.mainRequirements;
    },
    specialRequirements() {
      return this.$store.state.planningBoard.specialRequirements;
    },
    step: {
      get() {
        return this.$store.state.planningBoard.step;
      },
      set(value) {
        this.$store.commit("planningBoard/setStep", value);
      },
    },
    serviceCategories() {
      return this.$store.state.common.serviceCategories.map(service => {
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
      console.log("percentOfBudgetCategories", Object.keys(this.requirements).length, this.event.components.length);
      return Object.keys(this.requirements).length;
    },
  },
  methods: {

    ...mapMutations("event", [ "setProposalsByCategory"]),

    ...mapMutations("event", ["setRequirementTypes", "setRequirementsForVendor", "setSubCategory"]),
    ...mapMutations("planningBoard", ["setData", "setMainRequirements", "setTypes", "setSpecialRequirements"]),
    ...mapMutations("modal", ["setOpen"]),
    ...mapActions("planningBoard", ["saveMainRequirements", "saveRequiementSheet", "saveTypes", "updateRequirements"]),
    findVendors() {
      this.isOpenedFinalModal = true;
    },
    saveSpecialRequirements(data) {
      this.isOpenedFinalModal = false;
      this.setSpecialRequirements(data);
      this.expiredTime = moment(new Date())
        .add(3, "days")
        .valueOf();

      const requestRequirement = {
        issuedTime: new Date().getTime(),
        expiredBusinessTime: this.expiredTime,
      };
      postReq(`/1/events/${this.event.id}/find-vendors`, {
        issuedTime: new Date().getTime(),
        expiredBusinessTime: this.expiredTime,
      }).then(res => {
        this.$router.push(`/events/${this.event.id}/booking/choose-vendor`);
        this.$store.dispatch(
          "event/saveEventAction",
          new CalendarEvent({ id: this.event.id, processingStatus: "accept-proposal" }),
        );
      });
    },
    hasBudget(categoryKey) {
      return !!this.event.components.find(item => item.componentId == categoryKey);
    },
    getSpecification({ category, services }) {
      let getSelectedCategory = this.$store.state.common.serviceCategories.find(
        item => item.key === category.serviceCategory,
      );
      this.selectedCategory = {...this.selectedCategory, ...getSelectedCategory};
      this.isOpenedAdditionalModal = true;

      let requirements = this.allRequirements[category.serviceCategory].requirements;
      const storedRequirements = this.requirements[category.serviceCategory].mainRequirements;

      requirements = { ...requirements, ...storedRequirements };
      if (category.script) eval(category.script); //select relevant options using script

      for (let subCategory of Object.keys(requirements)) {
        requirements[subCategory].forEach(item => {
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
      this.$store.commit("event/setEventData", {
        requirementProgress: (this.percentOfBudgetCategories / this.event.components.length) * 100,
      });
      this.saveTypes({ category: category.serviceCategory, event: this.event, types: { [type]: services } });
    },
    async saveAdditionalRequest({ category, requirements }) {
      this.isOpenedAdditionalModal = false;

      const expiredTime = moment(new Date())
        .add(3, "days")
        .valueOf();
      this.$set(requirements, "expiredBusinessTime", expiredTime);

      await this.saveMainRequirements({ category, event: this.event, requirements });

      // popup notification if requirement is issued
      if (this.getRequirements(category).isIssued) this.popup = true; //this.setOpen("REQUIREMENT");
    },

    async addNewCategory(category) {
      this.selectedCategory = this.$store.state.common.serviceCategories.find(item => item.key === category);
      // const event = new CalendarEvent({
      //   id: this.event.id,
      //   unexpectedBudget: this.event.unexpectedBudget - newCategory.allocatedBudget,
      //   calendar: new Calendar({ id: this.event.calendar.id }),
      // });
      // this.showAddNewCategory = false;
      // this.$store.dispatch("event/saveEventAction", event).then((res) => {});
    },
    getRequirements(category) {
      if (!this.$store.state.planningBoard.requirements[category]) return null;
      return this.$store.state.planningBoard.requirements[category];
    },
    openCart() {
      this.showCart = true;
    },
    hasBadge(component) {
      if (!this.proposalsByCategory[component.componentId]) return false;
      if (this.proposalsByCategory[component.componentId].length === 0) return false;
      const notViewedProposals = this.proposalsByCategory[component.componentId].filter((item) => !item.viewed);
      if (notViewedProposals.length === 0) return false;
      console.log(notViewedProposals);
      return true;
    },
    addRequirements() {
      this.$router.push(`/events/${this.event.id}/booking/planningboard`);
    },
    selectCategory(category, clicked) {
      this.currentRequirement = this.eventRequirements[category.componentId];
      this.selectedCategory = category;
      let proposals = this.$store.state.event.proposals;
      if (proposals[category.componentId]) {
        proposals[category.componentId].forEach((proposal, index) => {
          new Proposal({ id: proposal.id, viewed: true }).save().then((res) => {
            this.$set(proposal, "viewed", true);
          });
        });
      }
    },
  },
  watch: {
    requirements(newVal) {
      console.log("requirement.watch", newVal);
    },
  },
};
</script>
<style lang="scss" scoped>
.planning-board-layout {
  .booking-proposals {
    .category-title {
        img {
        width: 30px;
        }
    }
  }
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
  .add-category-button {
    border: none;
    width: 60px;
    height: 60px;
    display: inline-block;
    border-radius: 50%;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    cursor: pointer;
    i {
      font-size: 40px !important;
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
