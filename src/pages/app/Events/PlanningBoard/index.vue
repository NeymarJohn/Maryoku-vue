<template>
  <div class="booking-section planning-board-layout">
    <comment-sidebar v-if="showCommentPanel" />
    <div v-if="!showCounterPage" class="p-50">
      <loader :active="isLoading || isLoadingStoredData || isLoadingProposal" />
      <template v-if="!isLoading && !isLoadingStoredData">
        <div class="d-flex justify-content-between align-center">
          <div>
            <ResizableToggleButton
              v-for="(component, index) in topCategories"
              :key="index"
              class="mr-20 mb-10"
              :label="component.eventCategory ? component.eventCategory.fullTitle : component.fullTitle"
              :icon="`${$iconURL}Budget+Elements/${component.eventCategory ? component.eventCategory.icon : ''}`"
              :selected-icon="`${$iconURL}Budget+Elements/${component.componentId}-white.svg`"
              :default-status="selectedCategory && component.id === selectedCategory.id"
              :has-badge="hasBadge(component)"
              icon-style="opacity:0.8"
              @click="selectCategory(component)"
            />
            <drop-down class="d-inline-block">
              <button class="add-category-button mb-10" data-toggle="dropdown" @click="addRequirements">
                <md-icon>add</md-icon>
              </button>
              <ul class="dropdown-width dropdown-menu dropdown-color dropdown-menu-right ">
                <li
                  v-for="(remainingCategory, i) in remainingCategories"
                  :key="remainingCategory.title + i"
                  class="remaining-list"
                >
                  <a class="remaining-item font-size-16" @click="selectRemainingCategory(remainingCategory)">
                    <div class="remaining-name">
                      <img :src="`${$iconURL}Budget+Elements/${remainingCategory.icon}`">
                                        &nbsp;&nbsp;
                      {{ remainingCategory.title }}
                    </div>
                  </a>
                </li>
                <div class="category-list">
                  <div class="category-heading font-size-16 font-bold">
                    {{ "Additional Categories" }}
                  </div>
                </div>
                <li
                  v-for="(additionalCategory, i) in additionalCategories"
                  :key="additionalCategory.title + i"
                  class="category-list"
                >
                  <a class="category-item font-size-16" @click="selectRemainingCategory(additionalCategory)">
                    <div class="category-name">
                      <img :src="`${$iconURL}Budget+Elements/${additionalCategory.icon}`">
                                            &nbsp;&nbsp;
                      {{ additionalCategory.title }}
                    </div>
                                        &nbsp;&nbsp;
                    <div class="category-plus">
                      <img :src="`${$iconURL}Timeline-New/circle-plus.svg`" class="label-icon mr-10">
                    </div>
                  </a>
                </li>
              </ul>
            </drop-down>
          </div>
          <div class="functional-bar">
            <div class="header-actions">
              <ul class="d-flex list-style-none">
                <li>
                  <div class="md-simple md-just-icon adaptive-button">
                    <img
                      v-if="isAnyLiked"
                      class="svg-icon-header cursor-pointer"
                      :src="`${$iconURL}Booking-New/Path+6363.svg`"
                      @click="openChoice"
                    >
                    <img
                      v-if="!isAnyLiked"
                      class="svg-icon-header cursor-pointer"
                      :src="`${$iconURL}Booking-New/Group+28553.svg`"
                      @click="openChoice"
                    >
                    <span :class="{ 'like-dot': proposalUnviewed == true }" />
                  </div>
                </li>
                <li class="md-small-hide">
                  <div class="md-simple md-just-icon adaptive-button">
                    <img
                      class="svg-icon-header cursor-pointer"
                      :src="`${$iconURL}Booking-New/Path+13791.svg`"
                      @click="openCart"
                    >
                    <span v-if="isAnyCart || isCart" class="cart-dot">{{ cartCount }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <HeaderActions
              :any-liked="isAnyLiked"
              :requirement="false"
              :hide-download="true"
              :hide-share="true"
              :proposal-unviewed="proposalUnviewed"
              :cart-count="cartCount"
              :custom-styles="{showCommentsText: {paddingLeft: '2px'}}"
              @toggleCommentMode="toggleCommentMode"
            />
            <drop-down class="d-inline-block">
              <button class="more-button" data-toggle="dropdown">
                <md-icon class="font-size-40">
                  more_vert
                </md-icon>
              </button>
              <ul class="dropdown-width dropdown-menu dropdown-other dropdown-menu-right ">
                <li class="other-list">
                  <a class="other-item font-size-16">
                    <div class="other-name">
                      <md-icon>share</md-icon>
                                &nbsp;&nbsp;
                      <span>
                        {{ "Share Proposals" }}
                      </span>
                    </div>
                  </a>
                </li>
                <li class="other-list">
                  <a class="other-item font-size-16" @click="compareProposal">
                    <div class="other-name">
                      <md-icon>equalizer</md-icon>
                                &nbsp;&nbsp;
                      <span>
                        {{ "Compare Proposals" }}
                      </span>
                    </div>
                  </a>
                </li>
                <li class="other-list">
                  <a class="other-item font-size-16">
                    <div class="other-name">
                      <md-icon>add_circle_outline</md-icon>
                                &nbsp;&nbsp;
                      <span>
                        {{ "I Already Have a venue fo my Event" }}
                      </span>
                    </div>
                  </a>
                </li>
                <li class="other-list">
                  <a class="other-item font-size-16" @click="showDifferentProposals = true">
                    <div class="other-name">
                      <md-icon>autorenew</md-icon>
                                &nbsp;&nbsp;
                      <span>
                        {{ "I Want Something Different" }}
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </drop-down>
          </div>
        </div>

        <template v-if="
          selectedCategory &&
            requirements[selectedCategory.componentId] &&
            requirements[selectedCategory.componentId].isIssued == true"
        >
          <div v-if="proposals[selectedCategory.componentId].length > 0">
            <div>
              <div class="font-size-30 font-bold-extra category-title mt-30 mb-30">
                <img :src="`${$iconURL}Budget+Elements/${selectedCategory.icon}`">
                {{ selectedCategory.fullTitle }}
              </div>
            </div>
            <div>
              <div class="d-flex justify-content-between">
                <div>
                  We found the top {{ proposals[selectedCategory.componentId].length }} proposals for your event, Book
                  now before it’s too late
                </div>
              </div>
            </div>

            <div class="mt-30">
              <div class="proposals-booking-items">
                <div v-for="(ourproposal, index) in categoryProposals.slice(0, 3)" :key="index" class="">
                  <ProposalHeader
                    :event="event"
                    :proposal-selected="selectedProposal && ourproposal.id === selectedProposal.id"
                    :proposal-request="ourproposal"
                    @click.native="selectProposal(ourproposal)"
                  />
                </div>
              </div>

              <div class="bg-white proposalHeader proposalTitle d-flex justify-content-between align-center">
                <div class="d-flex align-center">
                  <div class="company-logo">
                    <img
                      v-if="selectedProposal.vendor && selectedProposal.vendor.vendorLogoImage"
                      alt=""
                      :src="`${selectedProposal.vendor.vendorLogoImage}`"
                    >
                    <img v-else alt="" src="">
                  </div>
                  <div class="category-title">
                    <img
                      :src="
                        `${$iconURL}Budget+Elements/${
                          selectedProposal.vendor ? selectedProposal.vendor.eventCategory.icon : ''
                        }`
                      "
                      alt="category-logo"
                    >
                    <span class="text-decoration-underline">
                                &nbsp;&nbsp;
                      <u>
                        {{ selectedProposal.vendor ? selectedProposal.vendor.companyName : "" }}
                      </u>
                    </span>
                    <span class="">&nbsp;&nbsp;{{ "Proposal" }}</span>
                  </div>
                </div>
                <ProposalVersionsDropdown
                  v-if="selectedProposal"
                  :versions="selectedProposal.versions"
                  :selected="selectedVersion"
                  @select="selectVersion"
                />
              </div>

              <div>
                <EventProposalDetails
                  :key="selectedProposal.id"
                  :proposal="selectedProposal"
                  :category="selectedCategory"
                  :show-timer-box="true"
                  :hide-footer="true"
                  @favorite="favoriteProposal"
                  @close="closeProposal"
                  @ask="handleAsk"
                />
              </div>
            </div>
          </div>
          <PendingForVendors v-else :expired-time="expireTime" />
        </template>
        <template v-else-if="!( selectedCategory &&
          requirements[selectedCategory.componentId] &&
          requirements[selectedCategory.componentId].isIssued)
          ||
          !(getDefaultTypes(selectedCategory.componentId, selectedCategory.title) || []).length"
        >
          <div class="booking-proposals">
            <template v-if="selectedCategory">
              <div v-if="selectedCategory" class="font-size-30 font-bold-extra category-title mt-30 mb-30">
                <md-tooltip class="custom-tooltip-1" md-direction="top">
                  Here’s where you can set your expectations and requirements for your event
                </md-tooltip>
                <img :src="`${$iconURL}Budget+Elements/${selectedCategory.icon}`">
                {{ selectedCategory.fullTitle }}
                <template
                  v-if="
                    !booked &&
                      (!(
                        requirements[selectedCategory.componentId] &&
                        requirements[selectedCategory.componentId].isIssued
                      ) ||
                      !(getDefaultTypes(selectedCategory.componentId, selectedCategory.title) || []).length)
                  "
                >
                  <template v-if="hasBudget(selectedCategory.componentId)">
                    <a
                      class="font-size-18 md-red maryoku-btn cursor-pointer"
                      @click="
                        getSpecification({
                          category: selectedCategory,
                          services: getDefaultTypes(selectedCategory.componentId, selectedCategory.title),
                        })
                      "
                    >
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
                    <a
                      class="font-size-18 md-red maryoku-btn cursor-pointer"
                      @click="
                        getSpecification({
                          category: selectedCategory,
                          services: getDefaultTypes(selectedCategory.componentId, selectedCategory.title),
                        })
                      "
                    >
                      Change specifications
                    </a>
                  </div>
                </template>
              </div>
            </template>
          </div>
          <template v-for="(service, serviceIndex) in serviceCards[0]">
            <template v-if="selectedCategory && selectedCategory.componentId == service.serviceCategory">
              <div :key="`serviceGroup-${serviceIndex}`" class="mt-80 mb-80">
                <div class="booking-proposals">
                  <template v-if="selectedCategory">
                    <div v-if="selectedCategory" class="category-title mt-30 mb-30 d-flex flex-column">
                      <div class="font-size-30 font-bold-extra text-transform-uppercase">
                        <div class="float-left">
                          {{ service.seqNo }}
                                                &nbsp;&nbsp;
                          {{ service.name }}
                        </div>
                      </div>
                      <div class="font-size-10 ">
                        <p>
                          {{
                            "What suits your event best? Help vendors understand your needs by selecting your favorites and adding more details if needed."
                          }}
                        </p>
                      </div>
                    </div>
                  </template>
                </div>

                <div class="md-layout md-gutter mt-40 grid">
                  <template v-if="service.musicPlayer">
                    <template v-for="(clip, clipindx) in service.clips">
                      <ServiceCategoryCard
                        :key="service.name + clipindx"
                        class="mb-0 mr-0 ml-0"
                        :clip="clip"
                        :index="clipindx"
                        :service-category="service"
                        :is-long="clipindx % 2 === 1"
                        :is-row="getIsRow(clipindx)"
                        :row-num="getRowNum(clipindx, service)"
                        :has-budget="hasBudget(service.serviceCategory)"
                        :music-player="service.musicPlayer"
                        :default-data="getDefaultTypes(service.serviceCategory, service.name)"
                        :is-sent-request="
                          requirements[service.serviceCategory] &&
                            requirements[service.serviceCategory].isIssued
                        "
                        @showSpecific="getSpecification"
                        @update="setServiceStyles"
                      />
                    </template>
                  </template>
                  <template v-else>
                    <template v-for="(image, indx) in service.images">
                      <ServiceCategoryCard
                        :key="service.name + indx"
                        class="mb-0 mr-0 ml-0"
                        :image="image"
                        :index="indx"
                        :service-category="service"
                        :is-long="indx % 2 === 1"
                        :is-row="getIsRow(indx)"
                        :row-num="getRowNum(indx, service)"
                        :has-budget="hasBudget(service.serviceCategory)"
                        :music-player="service.musicPlayer"
                        :default-data="getDefaultTypes(service.serviceCategory, service.name)"
                        :is-sent-request="
                          requirements[service.serviceCategory] &&
                            requirements[service.serviceCategory].isIssued
                        "
                        @showSpecific="getSpecification"
                        @update="setServiceStyles"
                      />
                    </template>
                  </template>
                </div>
              </div>
            </template>
          </template>
        </template>
        <template v-else>
          <PendingForVendors :expired-time="expireTime" />
        </template>
      </template>
    </div>
    <template v-else>
      <PendingForVendors :expired-time="expireTime" />
    </template>

    <div v-if="
           selectedCategory &&
           requirements[selectedCategory.componentId] &&
           requirements[selectedCategory.componentId].isIssued == true"
         class="proposal-footer white-card d-flex justify-content-between"
    >
      <div class="d-flex justify-content-start">
        <md-button
          class="scroll-top md-button md-simple md-just-icon md-theme-default scroll-top-button"
          @click="scrollToTop"
        >
          <img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17">
        </md-button>
        <drop-down class="d-inline-block">
          <button class="more-button cursor-pointer" data-toggle="dropdown">
            <span class="more-actions font-size-16">
              {{ "More actions" }}
            </span>
            <md-icon class="more-actions font-size-22">
              keyboard_arrow_up
            </md-icon>
          </button>
          <ul class="dropdown-width-2 dropdown-menu dropdown-other dropdown-menu-upright ">
            <li class="other-list">
              <a class="other-item font-size-16" @click="handleAction('download')">
                <div class="other-name">
                  <img :src="`${$iconURL}common/download.svg`" width="20px" class="mr-10">
                  {{ "Download Proposal" }}
                </div>
              </a>
            </li>
            <li class="other-list">
              <a class="other-item font-size-16" @click="handleAction('negotiate')">
                <div class="other-name">
                  <img :src="`${$iconURL}budget+screen/SVG/Asset%2010.svg`" width="16px" class="mr-15">
                  <span>
                    {{ "Negotiate Rate" }}
                  </span>
                </div>
              </a>
            </li>
            <li class="other-list">
              <a class="other-item font-size-16" @click="handleAction('contact')">
                <div class="other-name">
                  <img src="/static/icons/vendor/message-dark.svg" width="20px" class="mr-10">
                  <span>
                    {{ "Contact Vendor" }}
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </drop-down>
      </div>
      <div class="d-flex justify-content-end">
        <!-- :disabled="proposals[selectedCategory.componentId].length === 0 || !selectedProposal" -->
        <md-button class="book-this-vendor md-simple maryoku-btn" @click="bookVendor">
          Book This Vendor
          <md-icon>keyboard_arrow_right</md-icon>
        </md-button>
        <!-- :disabled="proposals[selectedCategory.componentId].length === 0 || !selectedProposal" -->
        <md-button class="md-red maryoku-btn" @click="addToCart">
          Add To Cart
        </md-button>
      </div>
    </div>
    <div v-else class="proposal-footer white-card d-flex justify-content-end">
      <div>
        <!-- <md-button class="md-simple md-outlined md-red maryoku-btn">
                    <img :src="`${$iconURL}common/save-red.svg`" />
                    Save Draft
                </md-button> -->
        <md-button class="md-simple md-outlined md-red maryoku-btn" @click="addToCart">
          <!-- <img :src="`${$iconURL}Booking-New/Path+13791.svg`" /> -->
          <md-icon>shopping_cart</md-icon>
          &nbsp;&nbsp; Add To Cart
        </md-button>
        <md-button v-if="step === 1" class="md-red maryoku-btn" @click="findVendors">
          Find Me Vendors
        </md-button>
      </div>
    </div>

    <AdditionalRequestModal
      v-if="isOpenedAdditionalModal"
      class="lg"
      :sub-category="subCategory"
      :selected-category="selectedCategory"
      :default-data="getRequirements(selectedCategory.key) || {}"
      :selected-types="getSelectedTypes(selectedCategory.key)"
      @save="saveAdditionalRequest"
      @cancel="isOpenedAdditionalModal = false"
      @close="isOpenedAdditionalModal = false"
    />
    <special-requirement-modal
      v-if="isOpenedFinalModal"
      :default-data="specialRequirements"
      @cancel="isOpenedFinalModal = false"
      @save="saveSpecialRequirements"
    />
    <transition name="slide-fade">
      <RequirementsCart
        v-if="showChoice"
        :requirements="requirements"
        :service-categories="serviceCategories"
        :total="event.components.length"
        @close="showChoice = false"
      />
    </transition>
    <ServicesCart v-if="showCart" @close="showCart = false" />
    <CustomPopup v-if="popup" @cancel="popup = false" />
    <AddBudgetModal
      v-if="showAddNewCategory"
      :service-category="selectedCategory"
      @cancel="showAddNewCategory = false"
      @save="saveBudget"
    />
    <AddBudgetConfirmModal
      v-if="showAddBudgetConfirm"
      :service-category="selectedCategory"
      @cancel="showAddBudgetConfirm = false"
      @addNewBudget="addBudget"
    />
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

import Proposal from "@/models/Proposal";

const components = {
  ActionModal: () => import("@/components/ActionModal.vue"),
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

  ProposalCard: () => import("../components/ProposalCard"),
  EventProposalDetails: () => import("../Proposal/EventProposalDetails.vue"),
  HeaderActions: () => import("@/components/HeaderActions"),
  ServicesCart: () => import("./ServicesCart.vue"),
  ProposalHeader: () => import("./ProposalHeader.vue"),
  ProposalVersionsDropdown: () => import("../components/ProposalVersionsDropdown.vue"),
  CommentSidebar: () => import("../components/CommentSidebar.vue"),
};

export default {
  components,
  data() {
    return {
      popup: false,
      showChoice: false,
      showCart: false,
      allRequirements: null,
      subCategory: null,
      serviceCards: ServiceCards,
      isOpenedAdditionalModal: false,
      isOpenedFinalModal: false,
      selectedCategory: null,
      isLoading: false,
      isLoadingStoredData: false,
      isLoadingProposal: false,
      showCounterPage: false,
      expiredTime: 0,
      currentRequirement: null,

      requirementSection: true,
      proposalsByCategory: {},
      showAddNewCategory: false,
      showAddBudgetConfirm: false,
      booked: false,

      showDifferentProposals: false,
      showDetails: false,
      selectedProposal: null,
      proposalRequest: null,
      originalProposal: {},
      isCart: false,
      cartCount: 0,
    };
  },
  computed: {
    requirements() {
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
    remainingCategories() {
      return this.categories.slice(5, this.categories.length);
    },
    additionalCategories() {
      let additionalCategories = this.$store.state.common.serviceCategories;

      if (this.event.components) {
        additionalCategories = additionalCategories.filter(
          ar => !this.event.components.find(rm => rm.componentId === ar.key),
        );
      }
      return additionalCategories;
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
      return Object.keys(this.requirements).length;
    },

    proposals() {
      return this.$store.state.event.proposals;
    },
    versionProposal() {
      return this.$store.state.planningBoard.proposal;
    },
    categoryProposals() {
      let categoryProposals = this.$store.state.event.proposals;
      if (this.selectedCategory) {
        return categoryProposals[this.selectedCategory.componentId];
      }
      return [];
    },
    cart() {
      return this.$store.state.planningBoard.cart;
    },
    proposalUnviewed() {
      let count = 0;
      for (let proposal in this.proposals) {
        if (proposal.viewed == false) {
          count++;
          return true;
        }
      }
      return false;
    },
    isAnyLiked() {
      let category = this.selectedCategory;
      if (category == null) {
        return false;
      }

      if (this.requirements[category.componentId]) {
        let types = this.requirements[category.componentId].types;
        if(types){
            for (let type of Object.keys(types)) {
              return types[type].length > 0;
            }
            // return Object.keys(types).length > 0;
        }
      }
      return false;
    },
    expireTime() {
      if(this.currentRequirement){
        return (this.currentRequirement.expiredBusinessTime > 0) ? this.currentRequirement.expiredBusinessTime : this.expiredTime;
      }
      return this.expiredTime;
    },
    topCategories() {
      let categories = this.categories.slice(0, 5);

      if (!this.selectedCategory) {
        return categories;
      }
      let index = categories.findIndex(x => x.id == this.selectedCategory.id);
      if (index == -1) {
        categories = [...this.categories.slice(0, 4), ...[this.selectedCategory]];
      }
      return categories;
    },
    selectedVersion() {
      return this.$store.state.planningBoard.currentVersion;
    },
    isAnyCart(){
        let cartItems = Object.keys(this.cart);
        if(cartItems){
            return cartItems.length > 0;
        }
        return false;
    },
    showCommentPanel(){
      return this.$store.state.eventPlan.showCommentPanel;
    },
  },
  async created() {
    await this.$store.dispatch("planningBoard/resetRequirements");
    await this.$store.dispatch("planningBoard/resetCartItems");

    if (!this.allRequirements) {
      this.isLoading = true;
      this.allRequirements = await this.$store.dispatch("event/getRequirements");

      this.isLoading = false;
      this.isLoadingStoredData = true;

      await this.$store.dispatch("planningBoard/getRequirements", this.event.id);


      this.isLoadingStoredData = false;
    }
    this.isLoadingProposal = true;
    const tenantId = this.$authService.resolveTenantId();
    await this.$store
          .dispatch("planningBoard/getRequirements", this.event.id)
    await this.getProposals({ eventId: this.event.id, tenantId });
    await this.getCartItems(this.event.id);
    this.isLoadingProposal = false;
    this.selectCategory(this.categories[0]);
  },
  methods: {
    ...mapMutations("event", ["setProposalsByCategory"]),
    ...mapMutations("event", ["setRequirementTypes", "setRequirementsForVendor", "setSubCategory"]),
    ...mapActions("event", ["getProposals"]),
    ...mapMutations("modal", ["setOpen", "setProposal", "setProposalRequest"]),
    ...mapMutations("eventPlan", ["toggleCommentMode"]),
    ...mapMutations("planningBoard", ["setData", "setMainRequirements", "setTypes", "setSpecialRequirements", "setCategoryCartItem"]),
    ...mapActions("planningBoard", ["saveMainRequirements", "saveRequiementSheet", "saveTypes", "updateRequirements", "getCartItems", "updateCartItem"]),
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    findVendors() {
      this.isOpenedFinalModal = true;
    },
    async saveSpecialRequirements(data) {
      this.isOpenedFinalModal = false;

      this.setSpecialRequirements(data);
      this.expiredTime = moment(new Date())
        .add(3, "days")
        .valueOf();

      postReq(`/1/requirements/${this.requirements[this.selectedCategory.componentId].id}/find-vendors`, {
        issuedTime: new Date().getTime(),
        expiredBusinessTime: this.expiredTime,
      }).then(async res => {
        console.log('saveReq', res.data.data)
        await this.$store.commit("planningBoard/setCategoryRequirements", {category: res.data.data.category, requirement: res.data.data});

        await this.$store.dispatch(
        "event/saveEventAction",
        new CalendarEvent({
          id: this.event.id,
          vendorCategory: this.selectedCategory,
          processingStatus: "accept-proposal",
        }),
        );
    });

    },
    hasBudget(categoryKey) {
      return !!this.event.components.find(item => item.componentId == categoryKey);
    },
    getSpecification({ category, services }) {
      console.log("category", category, this.allRequirements, this.requirements);
      let getSelectedCategory = this.$store.state.common.serviceCategories.find(
        item => item.key === category.componentId,
      );
      let actualId = this.selectedCategory.id;
      this.selectedCategory = { ...this.selectedCategory, ...getSelectedCategory };
      this.selectedCategory.id = actualId;
      this.isOpenedAdditionalModal = true;

      let requirements = this.allRequirements[category.componentId].requirements;
      const storedRequirements = this.requirements[category.componentId]
        ? this.requirements[category.componentId].mainRequirements
        : {};

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
      const types = this.requirements[category] ? this.requirements[category].types : [];
      for (const t in types) {
        typesList = [...typesList, ...types[t]];
      }
      return typesList;
    },
    setServiceStyles({ category, services, type }) {
      // this.setTypes({ category: category.serviceCategory, data: services, type });
      this.$store.commit("event/setEventData", {
        ...this.event,
        requirementProgress: (this.percentOfBudgetCategories / this.event.components.length) * 100,
      });
      // localStorage.setItem("planner-requirements", JSON.stringify(this.requirements));
      // localStorage.setItem("eventId", JSON.stringify(this.event.id));
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
      if (this.getRequirements(category).isIssued) this.popup = true;
      //this.setOpen("REQUIREMENT");
    },

    async addNewCategory(category) {
      this.selectedCategory = this.$store.state.common.serviceCategories.find(item => item.key === category);
    },
    getRequirements(category) {
      if (!this.$store.state.planningBoard.requirements[category]) return null;
      return this.$store.state.planningBoard.requirements[category];
    },
    openChoice() {
      this.showChoice = true;
    },
    openCart() {
      this.showCart = true;
    },
    hasBadge(component) {
      this.proposalsByCategory = this.proposals;
      if (!this.proposalsByCategory[component.componentId]) return false;
      if (this.proposalsByCategory[component.componentId].length === 0) return false;
      const notViewedProposals = this.proposalsByCategory[component.componentId].filter(item => !item.viewed);
      if (notViewedProposals.length === 0) return false;
      return true;
    },
    addRequirements() {},
    selectCategory(category, clicked) {
      if (category.key) {
        category["componentId"] = category.key;
      }
      this.currentRequirement = this.requirements[category.componentId];
      this.selectedCategory = category;
      let getProposals = this.proposals;
      if (getProposals[category.componentId]) {
        getProposals[category.componentId].forEach((proposal, index) => {
          new Proposal({ id: proposal.id, viewed: true }).save().then(res => {
            this.$set(proposal, "viewed", true);
          });
        });
        this.selectProposal(getProposals[category.componentId][0]);
      }

      if(this.showCommentPanel){
        this.toggleCommentMode();
      }
    },
    selectRemainingCategory(category, clicked) {
      if (category.key) {
        category["componentId"] = category.key;
      }
      this.selectedCategory = category;
      let getProposals = this.proposals;
      if (getProposals[category.componentId]) {
        getProposals[category.componentId].forEach((proposal, index) => {
          new Proposal({ id: proposal.id, viewed: true }).save().then(res => {
            this.$set(proposal, "viewed", true);
          });
        });
        this.selectProposal(getProposals[category.componentId][0]);
      }
    },
    addBudget() {
      this.showAddBudgetConfirm = false;
      this.showAddNewCategory = true;
    },
    saveBudget() {
      this.showAddNewCategory = false;
    },
    getIsRow(indx) {
      if (indx == 0) {
        return true;
      }

      if (indx % 3) {
        return true;
      } else {
        if (indx % 4) {
          return true;
        } else {
          if (indx % 5) {
            return true;
          } else return false;
        }
      }
    },
    getRowNum(indx, service) {
      for (let x = 0; x < service.imageTitles.length; x++) {
        if (indx == 3 * x || indx == 3 * x + 2) {
          return Math.floor((3 * x) / 2) + 1;
        } else {
          if (indx == 3 * x + 1) {
            return Math.floor((3 * x + 1) / 2) + 1;
          }
        }
      }
      return null;
    },

    compareProposal() {
      this.$router.push(`/events/${this.event.id}/booking/${this.selectedCategory.id}/proposals/compare`);
    },
    goDetailPage(proposal) {
      this.showDetails = true;

      if (proposal.selectedVersion > -1)
        this.selectedProposal = this.getUpdatedProposal(proposal, proposal.versions[proposal.selectedVersion].data);
      else this.selectedProposal = proposal;
    },
    async bookVendor() {
      if (!this.selectedProposal) return;
      await new Proposal({ ...this.selectedProposal }).save();
      this.$router.push({
        name: "CheckoutWithVendor",
        params: {
          proposalId: this.selectedProposal.id,
          proposalType: "planner",
        },
      });
    },
    async addToCart() {
      if (!this.selectedProposal || !this.selectedCategory) return;
      this.updateCartItem({
        category: this.selectedCategory.componentId,
        event: { id: this.event.id },
        proposalId: this.selectedProposal.id,
      });
      this.$store.dispatch("event/updateProposal", {
        proposal: { ...this.selectedProposal, isFavorite: false },
        category: this.selectedProposal.vendor.vendorCategory,
      });
      this.isCart = true;
    },
    async favoriteProposal(isFavorite) {
      this.selectedProposal = await this.$store.dispatch("event/updateProposal", {
        proposal: { ...this.selectedProposal, isFavorite },
        category: this.selectedCategory.componentId,
      });
      this.setCategoryCartItem({
        category: this.selectedCategory.componentId,
        item: { ...this.cart[this.selectedCategory.componentId], proposal: { ...this.selectedProposal, isFavorite } },
      });
    },
    async handleAsk(ask) {
      if (ask === "expiredDate") {
        let expiredTime =
          moment()
            .add(2, "days")
            .unix() * 1000;
        let query = new ProposalNegotiationRequest({
          eventId: this.event.id,
          proposalId: this.selectedProposal.id,
          proposal: new Proposal({ id: this.selectedProposal.id }),
          expiredTime,
          type: NEGOTIATION_REQUEST_TYPE.ADD_MORE_TIME,
          url: `${location.protocol}//${location.host}/#/events/${this.event.id}/booking/choose-vendor`,
        });

        let res = await query.for(new Proposal({ id: this.selectedProposal.id })).save();
        console.log("ask.result", res);
        this.selectedProposal.negotiations.push(res);
      }
    },
    closeProposal() {
      this.showDetails = false;
      this.selectedProposal = null;
    },
    selectProposal(thisProposal){
        this.selectedProposal = thisProposal;
        this.originalProposal = thisProposal;
        let proposal = thisProposal;
        if(proposal){
            proposal.versions = !proposal.versions ? [] : proposal.versions;
            this.$store.dispatch("planningBoard/setProposal",{...proposal});
            this.$store.dispatch("eventPlan/setProposal",{...proposal}).then(res => { console.log("eventPlan/setProposal", {...proposal}); });
        }
        else{
            // this.$store.dispatch("planningBoard/setProposal", null);
            this.$store.dispatch("eventPlan/setProposal", null).then(res => { console.log("eventPlan/setProposal", null); });
        }
    },
    selectVersion(index) {
      this.$store.commit("planningBoard/selectVersion", index);
      this.selectedProposal = this.originalProposal;
      if (index >= 0 && this.versionProposal.versions) {
        this.selectedProposal = this.versionProposal;
      }
    },
    handleAction(action) {
        if (action === 'download') {
            this.openNewTab(`${process.env.SERVER_URL}/1/proposal/${this.selectedProposal.id}/download`);
        } else if (action === 'negotiate') {
            this.setProposal(this.selectedProposal);
            this.setOpen('NEGOTIATION');
        }
    },
    openNewTab(link) {
      window.open(link, "_blank");
    },
  },
  watch: {
    requirements: {
        handler(newVal) {
            console.log('req.watch', newVal)
        },
        deep: true,
    },
    event(newVal) {
      console.log("event.watch", newVal);
    },
  },
};
</script>
<style lang="scss" scoped>
.planning-board-layout {
  .proposalTitle {
    font-size: 30px;
    font-weight: 800;
  }
  .proposalHeader {
    padding: 3rem;
  }
  .booking-proposals {
    .category-title {
      img {
        width: 30px;
      }
    }
  }
  .category-title {
    img {
      width: 30px;
    }
  }
  .company-logo {
    margin-right: 30px;
    max-height: 50px;
    max-width: 70px;
    height: 50px;
    width: 70px;
  }
  .header-actions {
    display: flex;
    height: max-content;
  }
  .seperator {
    border-left: solid 1px #050505;
  }
  .events-booking-items {
    padding: 0 0em;
    margin-bottom: 1em;
    align-items: stretch;
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  .proposals-booking-items {
    padding: 0 0em;
    margin-bottom: 0em;
    align-items: stretch;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .loading-screen {
    height: 100vh;
  }
  .proposal-footer {
    padding: 40px 50px;
    position: sticky;
    bottom: 0;
    width: 100%;
    z-index: 3;
    button {
      width: 250px;
      margin-left: 20px;
      img {
        width: 22px;
        margin-right: 10px;
      }
    }
    .scroll-top {
      width: 41px !important;
      margin-left: 20px;
      img {
        width: 17px;
        margin-right: 0px;
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
  .functional-bar {
    display: inline-flex;
    align-items: center;
  }
  .more-button {
    border: none;
    background: none;
    cursor: pointer;
    display: inline-flex;
    i {
      margin: 0px;
    }
    .more-actions {
      font-weight: 800;
    }
  }
  .book-this-vendor {
    color: #000 !important;
    font-weight: 800 !important;
  }
  .float-left {
    float: left;
  }
  .dropdown-menu li a:hover,
  .dropdown-menu li a:focus,
  .dropdown-menu li a:active {
    background-color: transparent !important;
    color: initial !important;
    box-shadow: none !important;
  }
  .dropdown-color li:hover,
  .dropdown-color li:focus,
  .dropdown-color li:active {
    background-color: #ffedb7 !important;
    color: #000 !important;
  }
  .dropdown-other {
    padding: 27px 0px !important;
  }
  .dropdown-other li a:hover,
  .dropdown-other li a:focus,
  .dropdown-other li a:active {
    background-color: transparent !important;
    color: #f51355 !important;
    box-shadow: none !important;
    font-weight: 800 !important;
    i {
      background-color: transparent !important;
      color: #f51355 !important;
    }
  }
  .dropdown-width {
    // width: max-content;
    width: 385px;
  }
  .dropdown-width-2 {
    width: 270px;
  }
  .category-list {
    cursor: pointer;
    img {
      width: 30px;
    }
    .category-heading {
      padding: 20px 27px;
      margin: 0 0;
      background-color: transparent !important;
      color: #000 !important;
      border-bottom: 1px ridge #d7d5d6;
    }
    .category-item {
      display: flow-root;
      padding: 15px 20px 15px 2px !important;
      margin: 0 0 !important;
      border-bottom: 1px ridge #d7d5d6;
      width: 90%;
      left: 10%;
      position: relative;
      .category-name {
        float: left;
      }
      .category-plus {
        width: 20px;
        height: 20px;
        display: inline-block;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        float: right;
        cursor: pointer;
      }
    }
  }
  .remaining-list {
    cursor: pointer;
    img {
      width: 30px;
      color: #818080 !important;
    }
    .remaining-item {
      display: flow-root;
      color: #818080 !important;
      padding: 15px 37px !important;
      margin: 0 0 !important;
      .remaining-name {
        float: left;
      }
    }
  }
  .other-list {
    cursor: pointer;
    .other-heading {
      padding: 10px 1.5rem;
      margin: 0 5px;
    }
    .other-item {
      display: flow-root;
      .other-name {
        float: left;
      }
    }
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  /* .slide-fade-leave-active below version 2.1.8 { */
  .slide-fade-enter,
  .slide-fade-leave-to {
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
  .like-dot {
    width: 20px;
    height: 20px;
    margin: 37px 34px 57px 13px;
    padding: 3px 11px 3px 10px;
    background-color: #f51355;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    right: 40px;
  }
  .cart-dot {
    width: 22px;
    height: 22px;
    margin: 0px 0px 0px -22px;
    padding: 0px 0px 0px 7px;
    background-color: #f51355;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    border-radius: 50%;
    position: absolute;
  }
  .md-menu-content .md-list {
    padding: 37px 37px !important;
  }
}
</style>
