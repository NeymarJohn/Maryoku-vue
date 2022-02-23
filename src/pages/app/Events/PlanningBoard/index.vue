<template>
  <div class="booking-section planning-board-layout">
    <div class="p-50" v-if="!showCounterPage">
      <loader :active="isLoading || isLoadingStoredData" />
      <template v-if="!isLoading && !isLoadingStoredData">
        <div class="d-flex justify-content-between align-center">
            <div>
                <ResizableToggleButton
                    class="mr-20 mb-10"
                    :key="index"
                    :label="component.eventCategory ? component.eventCategory.fullTitle : ''"
                    :icon="`${$iconURL}Budget+Elements/${component.eventCategory ? component.eventCategory.icon : ''}`"
                    :selectedIcon="`${$iconURL}Budget+Elements/${component.componentId}-white.svg`"
                    :defaultStatus="selectedCategory && component.id === selectedCategory.id"
                    :hasBadge="hasBadge(component)"
                    iconStyle="opacity:0.8"
                    v-for="(component,index) in categories"
                    @click="selectCategory(component)"
                ></ResizableToggleButton>
                <drop-down class="d-inline-block">
                    <button class="add-category-button mb-10" @click="addRequirements" data-toggle="dropdown">
                        <md-icon>add</md-icon>
                    </button>
                    <ul class="dropdown-width dropdown-menu dropdown-menu-left " >
                        <li class="category-list" >
                            <div class="category-heading font-size-16 font-bold" >
                                &nbsp;&nbsp;
                                {{'Additional Categories'}}
                            </div>
                        </li>
                        <li class="category-list" v-for="(otherCategory,i) in otherCategories" :key="i">
                            <a class="category-item font-size-16" @click="selectCategory(otherCategory)">
                                <div class="category-name">
                                    <img :src="`${$iconURL}Budget+Elements/${otherCategory.icon}`" />
                                    &nbsp;&nbsp;
                                    {{otherCategory.title}}
                                </div>
                                &nbsp;&nbsp;
                                <div class="category-plus">
                                    <img :src="`${$iconURL}Timeline-New/circle-plus.svg`" class="label-icon mr-10" />
                                </div>
                            </a>
                        </li>
                    </ul>
                </drop-down>
            </div>
          <ProgressRadialBar
            :value="percentOfBudgetCategories"
            :total="event.components.length"
            @click="openCart"
          ></ProgressRadialBar>
        </div>
        <div class="booking-proposals">
            <template v-if="selectedCategory">
                <div class="font-size-30 font-bold-extra category-title mt-30 mb-30" v-if="selectedCategory">
                    <md-tooltip class="custom-tooltip-1" md-direction="top">Here’s where you can set your expectations and requirements for your event</md-tooltip>
                    <img :src="`${$iconURL}Budget+Elements/${selectedCategory.icon}`" />
                    {{ selectedCategory.fullTitle }}
                    <template v-if="!booked && (!($store.state.planningBoard.requirements[selectedCategory.componentId] && $store.state.planningBoard.requirements[selectedCategory.componentId].isIssued) || !(getDefaultTypes(selectedCategory.componentId, selectedCategory.title) || []).length)">
                        <template v-if="hasBudget(selectedCategory.componentId)">
                            <a class="font-size-18 md-red maryoku-btn" @click="getSpecification({ category: selectedCategory, services: getDefaultTypes(selectedCategory.componentId, selectedCategory.title) })">
                                Get Specific
                            </a>
                        </template>
                        <template v-else>
                            <a class="font-size-18 md-red maryoku-btn" @click="showAddBudgetConfirm = true"> Add To Budget </a>
                        </template>
                    </template>
                    <template v-else>
                        <div class="d-flex align-center justify-content-center">
                            <div v-if="booked" class="color-red">
                                Already booked
                            </div>
                            <a  class="font-size-18 md-red maryoku-btn" @click="getSpecification({ category: selectedCategory, services: getDefaultTypes(selectedCategory.componentId, selectedCategory.title) })">
                                Change specifications
                            </a>
                        </div>
                    </template>
                </div>
            </template>
        </div>
        <template v-for="(service, serviceIndex) in serviceCards[0]" >
              <template v-if="selectedCategory && selectedCategory.componentId == service.serviceCategory">
                <div class="mt-80 mb-80" :key="`serviceGroup-${serviceIndex}` ">
                    <div class="booking-proposals">
                        <template v-if="selectedCategory">
                            <div class="category-title mt-30 mb-30 d-flex flex-column" v-if="selectedCategory">
                                <div class="font-size-30 font-bold-extra text-transform-uppercase">
                                    <div style="float: left;">
                                        {{ service.seqNo }}
                                        &nbsp;&nbsp;
                                        {{ service.name }}
                                    </div>
                                </div>
                                <div class="font-size-10 ">
                                    <p>
                                        {{ "What suits your event best? Help vendors understand your needs by selecting your favorites and adding more details if needed." }}
                                    </p>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="md-layout md-gutter mt-40 grid">
                        <template v-if="service.musicPlayer">
                            <template v-for="(clip, clipindx) in service.clips">
                                <ServiceCategoryCard
                                class="mb-0 mr-0 ml-0"
                                :clip="clip"
                                :index="clipindx"
                                :serviceCategory="service"
                                :key="service.name+clipindx"
                                :isLong="(clipindx) % 2 === 1"
                                :isRow="getIsRow(clipindx)"
                                :rowNum="getRowNum(clipindx, service)"
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
                        <template v-else>
                            <template v-for="(image, indx) in service.images">
                                <ServiceCategoryCard
                                class="mb-0 mr-0 ml-0"
                                :image="image"
                                :index="indx"
                                :serviceCategory="service"
                                :key="service.name+indx"
                                :isLong="(indx) % 2 === 1"
                                :isRow="getIsRow(indx)"
                                :rowNum="getRowNum(indx, service)"
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
        </template>

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
    <AddBudgetModal
      v-if="showAddNewCategory"
      :serviceCategory="selectedCategory"
      @cancel="showAddNewCategory = false"
      @save="saveBudget"
    ></AddBudgetModal>
    <AddBudgetConfirmModal
      v-if="showAddBudgetConfirm"
      :serviceCategory="selectedCategory"
      @cancel="showAddBudgetConfirm = false"
      @addNewBudget="addBudget"
    ></AddBudgetConfirmModal>
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
  AddBudgetModal: () => import("./components/modals/AddBudget.vue"),
  AddBudgetConfirmModal: () => import("./components/modals/AddBudgetConfirm.vue"),

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
      showAddNewCategory: false,
      showAddBudgetConfirm: false,
      booked: false,
      requirements:{},
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
        if(localStorage.getItem('requirements')){
            this.requirements = JSON.parse(localStorage.getItem('requirements')) || {};
        }
        else{
            this.requirements = this.$store.state.planningBoard.requirements
        }

      this.isLoadingStoredData = false;
      this.selectCategory(this.categories[0]);
    }
  },
  computed: {
    eventRequirements() {
        return this.$store.state.planningBoard.requirements;
    },
    categories() {
      const categories = this.event.components;
      categories.sort((a, b) => a.order - b.order);
      return categories;
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
    otherCategories() {
        let otherCategories;
        if(this.event.components){
            otherCategories = this.$store.state.common.serviceCategories.filter(ar => !this.event.components.find(rm => (rm.componentId === ar.key) ))
        }
        else{
            otherCategories = this.$store.state.common.serviceCategories.map(service => {
                return service;
            });
        }
      return otherCategories;
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
    ...mapMutations("modal", ["setOpen"]),
    ...mapMutations("planningBoard", ["setData", "setMainRequirements", "setTypes", "setSpecialRequirements"]),
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
        item => item.key === category.componentId,
      );
      this.selectedCategory = {...this.selectedCategory, ...getSelectedCategory};
      this.isOpenedAdditionalModal = true;

      let requirements = this.allRequirements[category.componentId].requirements;
      const storedRequirements = this.requirements[category.componentId].mainRequirements;

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
            let requirement = this.requirements[category.serviceCategory];
            if(!requirement) {
                requirement = {event: this.event, category: category.serviceCategory, types: { [type]: services }}
            } else {
                requirement = {...requirement, types: { [type]: services }};
            }
        this.saveTypes({ category: category.serviceCategory, event: this.event, types: { [type]: services } });
        this.$set(this.requirements, category.serviceCategory, requirement)
        localStorage.setItem('requirements', JSON.stringify(this.requirements));
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
    },
    selectCategory(category, clicked) {
        if(category.key){
            category['componentId'] = category.key;
        }
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
    addBudget() {
      this.showAddBudgetConfirm = false;
      this.showAddNewCategory = true;
    },
    saveBudget() {
      this.showAddNewCategory = false;
    },
    getIsRow(indx){
        if(indx == 0){
            return true;
        }

        if(indx % 3){
            return true;
        }
        else{
            if(indx % 4) {return true;}
            else{
                if(indx % 5) {return true;}
                else return false
            };
        }
    },
    getRowNum(indx, service){
        for(let x=0; x < service.imageTitles.length; x++){
            if(indx == 3*x || indx == (3*x)+2){
                return Math.floor((3*x)/2)+1;
            }
            else{
                if(indx == (3*x)+1){
                    return Math.floor(((3*x)+1)/2)+1;
                }
            }
        }
        return null;
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
  .dropdown-width{
      width: max-content;
  }
  .category-list{
    border-bottom: 2px ridge;
    img {
        width: 30px;
    }
    .category-heading{
        padding: 10px 1.5rem;
        margin: 0 5px;
    }
    .category-item{
        display: flow-root;
        .category-name{
            float: left;
        }
        .category-plus{
            width: 20px;
            height: 20px;
            display: inline-block;
            box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
            float: right;
            cursor: pointer;
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
  .grid {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-auto-rows: auto;
    row-gap: 30px;
    column-gap: 0px;
  }
}
</style>
