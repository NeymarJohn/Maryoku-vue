<template>
  <div class="booking-section planning-board-layout">
    <budget-notifications field="negotiation" />
    <loader :active="isLoading" />

    <template v-if="!isLoading">
      <div class="ml-60 mt-40 mr-30 mb-200 position-relative">
        <div class="headers">
          <div class="container d-flex justify-content-between align-center">
            <div>
              <ResizableToggleButton
                v-for="(component, index) in topCategories"
                :key="index"
                class="mr-20 mb-10"
                :label="component.eventCategory ? component.eventCategory.fullTitle : component.fullTitle"
                :icon="`${$iconURL}Services /${component.eventCategory ? component.eventCategory.icon : ''}`"
                :selected-icon="`${$iconURL}Services /${component.componentId}.svg`"
                :default-status="selectedCategory && component.id === selectedCategory.id"
                :has-badge="hasBadge(component)"
                icon-style="opacity:0.8"
                :proposalCategory="true"
                @click="selectCategory(component)"
              />
              <drop-down class="d-inline-block"  @close="closeMoreCategories">
                <ResizableToggleButton
                  class="mr-20 mb-10"
                  data-toggle="dropdown"
                  :icon="`${$iconURL}Services /more.svg`"
                  :selected-icon="`${$iconURL}Services /more-white.svg`"
                  :default-status="showMoreCats === true"
                  :proposalCategory="false"
                  @click="showMoreCategories"
                >
                </ResizableToggleButton>
                <ul class="dropdown-width dropdown-menu dropdown-color">
                  <li
                    v-for="(remainingCategory, i) in remainingCategories"
                    :key="remainingCategory.title + i"
                    class="remaining-list"
                  >
                    <a class="remaining-item font-size-16" @click="selectRemainingCategory(remainingCategory, 'select')">
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
                    <a class="category-item font-size-16" @click="selectRemainingCategory(additionalCategory, 'add')">
                      <div class="category-name">
                        <img :src="`${$iconURL}Services /${additionalCategory.icon}`">
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
                        class="svg-icon-header cursor-pointer"
                        :src="`${$iconURL}Booking-New/${isAnyLiked ? 'Path+6363.svg': 'Group+28553.svg'}`"
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
                      <span v-if="countInCart" class="cart-dot">{{ countInCart }}</span>
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
                :show-menu="false"
                :cart-count="countInCart"
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
                  <li v-for="action in functionActions" class="other-list" :key="action.label">
                    <md-button class="md-simple md-black-middle maryoku-btn"
                               :disabled="(action.value === 'share' || action.value === 'compare' ||
                                    action.value === 'something_different') && !categoryProposals.length"
                               @click="handleAction({name: action.value})">
                      <md-icon class="mr-10">{{ action.icon }}</md-icon>
                      {{ action.label }}
                    </md-button>
                  </li>
                </ul>
              </drop-down>
            </div>
          </div>
        </div>

        <template v-if="requirements[selectedCategory.componentId] && requirements[selectedCategory.componentId].isIssued">
          <div v-if="proposals[selectedCategory.componentId].length > 0">
            <div>
              <div class="font-size-30 font-bold-extra d-flex align-center category-title mt-30 mb-30">
                <img :src="`${$iconURL}Budget+Elements/${selectedCategory.icon}`">
                {{ selectedCategory.fullTitle }}
                <md-button
                  class="md-simple md-red maryoku-btn"
                  @click="
                      getSpecification({
                        category: selectedCategory,
                        services: getDefaultTypes(selectedCategory.componentId, selectedCategory.title),
                      })
                    "
                >
                  Update Specific
                </md-button>
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
            <template v-if="proposal">
              <div class="mt-30">
                <div class="proposals-booking-items">
                  <div v-for="(p, index) in top3Proposals" :key="index" class="">
                    <ProposalHeader
                      :event="event"
                      :proposal-selected="proposal && p.id === proposal.id"
                      :proposal-request="p"
                      @click.native="selectProposal(p)"
                    />
                  </div>
                </div>

                <div class="bg-white proposalHeader proposalTitle d-flex justify-content-between align-center">
                  <div class="d-flex align-center">
                    <div class="company-logo">
                      <img
                        v-if="proposal.vendor && proposal.vendor.vendorLogoImage"
                        alt=""
                        :src="`${proposal.vendor.vendorLogoImage}`"
                      >
                      <img v-else alt="" src="">
                    </div>
                    <div class="category-title">
                      <img
                        :src="
                          `${$iconURL}Budget+Elements/${
                            proposal.vendor ? proposal.vendor.eventCategory.icon : ''
                          }`
                        "
                        alt="category-logo"
                      >
                      <span class="text-decoration-underline">
                            &nbsp;&nbsp;
                        <u>
                          {{ proposal.vendor ? proposal.vendor.companyName : "" }}
                        </u>
                      </span>
                      <span class="">&nbsp;&nbsp;{{ "Proposal" }}</span>
                    </div>
                  </div>
                  <ProposalVersionsDropdown
                    v-if="proposal"
                    :versions="proposal.versions"
                    :selected="selectedVersion"
                    @select="selectVersion"
                  />
                </div>
                <div class="mb-140">
                  <EventProposalDetails
                    :proposal="proposal"
                    :category="selectedCategory"
                    :show-timer-box="true"
                    :hide-footer="true"
                    @favorite="favoriteProposal"
                    @close="closeProposal"
                    @ask="handleAsk"
                  >
                    <template slot="timer">
                      <TimerPanel
                        class="time-counter"
                        :target="targetTime"
                        :pending="negotiationPending"
                        :status="proposal.status"
                        :declined="negotiationDeclined"
                        :approved="negotiationProcessed"
                        theme="red"
                        @updateExpireDate="handleAsk('expiredDate')"
                      />
                    </template>
                  </EventProposalDetails>
                </div>
              </div>
            </template>
            <div v-else class="proposal-card-items">
              <ProposalCard
                v-for="(p, index) in top3Proposals"
                :key="index"
                :proposal="p"
                :isAlternative="categoryProposals.length > 3"
                :component="selectedCategory"
                :is-collapsed="showDetails"
                :is-selected="proposal && proposal.id === p.id"
                @action="handleAction($event, p)"
              />
            </div>
          </div>
          <PendingForVendors v-else :expired-time="expireTime" />
        </template>
        <template v-else>
          <div class="booking-proposals">
            <template v-if="selectedCategory">
              <div v-if="selectedCategory" class="font-size-30 font-bold-extra category-title d-flex align-center mt-30 mb-30">
                <md-tooltip class="custom-tooltip-1" md-direction="top">
                  Here’s where you can set your expectations and requirements for your event
                </md-tooltip>
                <img class="mr-10" :src="`${$iconURL}Budget+Elements/${selectedCategory.icon}`">
                {{ selectedCategory.fullTitle }}

                <md-button
                  class="md-simple md-red maryoku-btn"
                  @click="
                      getSpecification({
                        category: selectedCategory,
                        services: getDefaultTypes(selectedCategory.componentId, selectedCategory.title),
                      })
                    ">
                  Get Specific
                </md-button>
              </div>
            </template>
          </div>
          <template v-for="(service, serviceIndex) in serviceCards">
            <template v-if="selectedCategory && selectedCategory.componentId == service.serviceCategory">
              <div :key="`serviceGroup-${serviceIndex}`" class="mt-80 mb-140">
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
      </div>

      <template v-if="requirements[selectedCategory.componentId] && requirements[selectedCategory.componentId].isIssued">
        <div v-if="categoryProposals.length"
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
              <button class="more-button cursor-pointer" data-toggle="dropdown" :disabled="proposal === null">
              <span class="more-actions font-size-16 ml-20">
                {{ "More actions" }}
              </span>
              <md-icon class="more-actions font-size-22">
                keyboard_arrow_up
              </md-icon>
              </button>
              <ul class="dropdown-width-2 dropdown-menu dropdown-other dropdown-menu-upright ">
                <li v-for="action in moreActions" class="other-list" :key="action.label">
                  <a class="other-item font-size-16" @click="handleAction({name: action.value})">
                    <div class="other-name">
                      <img :src="`${$iconURL}${action.icon}`" width="20px" class="mr-10">
                      {{ action.label }}
                    </div>
                  </a>
                </li>
              </ul>
            </drop-down>
          </div>
          <div class="d-flex justify-content-end">
            <md-button class="book-this-vendor md-simple maryoku-btn" :disabled="proposal === null" @click="bookVendor">
              Book This Vendor
              <md-icon>keyboard_arrow_right</md-icon>
            </md-button>

            <md-button class="md-red maryoku-btn w-min-250" :disabled="(proposal === null ) || isInCart" @click="addToCart">
              Add To Cart
            </md-button>
          </div>
        </div>
        <div v-else class="proposal-footer white-card d-flex align-center">
          <md-button class="md-simple ml-auto md-black maryoku-btn py-0 border-right" @click="getSpecification({
                        category: selectedCategory,
                        services: getDefaultTypes(selectedCategory.componentId, selectedCategory.title),
                      })">
            Change Requirements
          </md-button>

          <md-button class="md-simple md-black ml-0 py-0 maryoku-btn" @click="updateExpiredTime">
            I need those proposals urgent
          </md-button>
        </div>
      </template>
      <template v-else>
        <div class="proposal-footer white-card d-flex">
          <md-button
            class="scroll-top md-button md-simple md-just-icon md-theme-default scroll-top-button"
            @click="scrollToTop"
          >
            <img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17">
          </md-button>
          <md-button class="md-simple md-outlined md-red maryoku-btn find-vendor-btn ml-auto" @click="findVendors()">
            Find Vendors for this category
          </md-button>
          <md-menu
            md-size="auto"
            md-align-trigger
            md-direction="top-end"
            :md-offset-y="20"
          >
            <md-button
              md-menu-trigger
              class="md-icon-button find-vendor-menu-btn"
            >
              <md-icon class="find-vendor-menu-btn-icon">
                keyboard_arrow_up
              </md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item
                class="text-center"
                @click="findVendors(true)"
                style="min-width: 400px"
              >
                <span class="font-size-16 font-bold-extra">
                  <img :src="`${$iconURL}Requirements/search.svg`" class="mr-10">
                  Find Vendors For All Categories
                </span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </template>
    </template>

    <AdditionalRequestModal
      v-if="isOpenedAdditionalModal"
      class="lg"
      :sub-category="subCategory"
      :selected-category="selectedCategory"
      :default-data="getRequirements(selectedCategory.key) || {}"
      :selected-types="getSelectedTypes(selectedCategory.key)"
      page="planner"
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
        :ask="findVendors"
        @close="showChoice = false"
      />
    </transition>
    <ServicesCart v-if="showCart" @close="showCart = false" />
    <AddBudgetModal
      v-if="showAddNewCategory"
      :service-category="additionalCategory"
      @cancel="showAddNewCategory = false"
      @save="saveBudget"
    />
    <AddBudgetConfirmModal
      v-if="showAddBudgetConfirm"
      :service-category="selectedCategory"
      @cancel="showAddBudgetConfirm = false"
      @addNewBudget="addBudget"
    />
    <DifferentProposalsModal
      v-if="showDifferentProposals"
      :proposals="top3Proposals"
      @action="handleAction"
      @cancel="showDifferentProposals=false"
    >
    </DifferentProposalsModal>
  </div>
</template>
<script>
import moment from "moment";
import { serviceCategoryImages, ServiceCards } from "@/constants/event.js";
import { mapMutations, mapActions } from "vuex";
import _ from "underscore";
import { camelize } from "@/utils/string.util";
import Proposal from "@/models/Proposal";
import ProposalNegotiationRequest from "@/models/ProposalNegotiationRequest";

import { postReq, updateReq, getReq } from "@/utils/token";
import { TimerMixins } from "@/mixins";
import { NEGOTIATION_REQUEST_TYPE, NEGOTIATION_REQUEST_STATUS } from "@/constants/status";
import ProposalEngagement from '@/models/ProposalEngagement'

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
  DifferentProposalsModal: () => import("./components/modals/DifferentProposals"),
  AddBudgetConfirmModal: () => import("./components/modals/AddBudgetConfirm.vue"),

  ProposalCard: () => import("../components/ProposalCard"),
  EventProposalDetails: () => import("../Proposal/EventProposalDetails.vue"),
  HeaderActions: () => import("@/components/HeaderActions"),
  ServicesCart: () => import("./ServicesCart.vue"),
  ProposalHeader: () => import("./ProposalHeader.vue"),
  ProposalVersionsDropdown: () => import("../components/ProposalVersionsDropdown.vue"),
  CommentSidebar: () => import("../components/CommentSidebar.vue"),
  TimerPanel: () => import("@/pages/app/Events/components/TimerPanel.vue"),
  ClickOutside: () => import("vue-click-outside"),
};

export default {
  components,
  mixins: [ TimerMixins ],
  data() {
    return {
      showChoice: false,
      showCart: false,
      showMoreCats: true,
      allRequirements: null,
      subCategory: null,
      serviceCards: ServiceCards,
      isOpenedAdditionalModal: false,
      isOpenedFinalModal: false,
      selectedCategory: null,
      additionalCategory: null,
      isLoading: true,
      showCounterPage: false,
      expiredTime: 0,
      currentRequirement: null,

      findAllCategory: false,
      requirementSection: true,
      proposalsByCategory: {},
      showAddNewCategory: false,
      showAddBudgetConfirm: false,
      booked: false,

      showDifferentProposals: false,
      showDetails: false,
      proposalRequest: null,
      originalProposal: {},

      functionActions: [
          {label: "Share proposals", value: "share", icon: "share"},
          {label: "Compare proposals", value: "compare", icon: "equalizer"},
          {label: "I already have a venue for my event", value: "already_have_venue", icon: "add_circle_outline"},
          {label: "I want something different", value: "something_different", icon: "autorenew"},
      ],
      moreActions: [
          {label: "Download proposal", value: "download", icon: "common/download.svg"},
          {label: "Negotiate Rate", value: "negotiate", icon: "budget+screen/SVG/Asset%2010.svg"},
          // {label: 'Contact vendor', value: 'contact', icon: ''},
      ]
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
    proposal() {
      return this.$store.state.planningBoard.proposal;
    },
    proposals() {
      return this.$store.state.planningBoard.proposals;
    },
    versionProposal() {
      return this.$store.state.planningBoard.proposal;
    },
    categoryProposals() {
      if (!this.proposals || !this.proposals[this.selectedCategory.componentId] || !this.proposals[this.selectedCategory.componentId].length) return []

      return this.proposals[this.selectedCategory.componentId];
    },
    top3Proposals() {
      if (!this.currentRequirement || !this.currentRequirement.top3 || !this.currentRequirement.top3.length || !this.categoryProposals.length) return []
      return this.currentRequirement.top3.map(id => this.categoryProposals.find(p => p.id === id));
    },
    cart() {
    },
    proposalUnviewed() {
      if (this.proposals || !this.proposals.length) return false;
      const proposals = this.proposals.filter(p => !p.viewed);
      return proposals && proposals.length;
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
    countInCart(){
      if (!this.cart) return 0;

      let count = 0;
      Object.keys(this.cart).forEach(key => {
        if (this.cart[key] && this.cart[key].proposal && !this.cart[key].proposal.isFavorite) count++;
      });

      return count;
    },
    isInCart() {
      if (!this.cart) return false;

      return this.cart[this.selectedCategory.componentId] &&
          this.cart[this.selectedCategory.componentId].proposal &&
          this.cart[this.selectedCategory.componentId].proposal.id === this.proposal.id;
    },

    showCommentPanel(){
      return this.$store.state.eventPlan.showCommentPanel;
    },
    negotiationProposals(){
      if(!Object.keys(this.proposals).length) return {};
      let negotiationProposals = [];
      Object.keys(this.proposals).map(key => {
          this.proposals[key].map(p => {
              let negotiations = p.negotiations.filter(n =>
                  n.status === NEGOTIATION_REQUEST_STATUS.APPROVED || n.status === NEGOTIATION_REQUEST_STATUS.DECLINE);
              if(negotiations.length) {
                  negotiationProposals.push(p);
              }
          });
      });
      return negotiationProposals;
    },
  },
  async created() {
    await this.$store.dispatch("planningBoard/resetRequirements");
    await this.$store.dispatch("planningBoard/resetCartItems");

    this.isLoading = true;

    if (!this.allRequirements) {
      this.allRequirements = await this.$store.dispatch("event/getRequirements");
    }

    await this.$store.dispatch("planningBoard/getRequirements", this.event.id);

    await this.getProposals({ event: this.event});
    await this.getCartItems(this.event.id);

    this.selectCategory(this.categories[0]);

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 100) {
          $(".headers").addClass("fixed-top");
        } else {
          $(".headers").removeClass("fixed-top");
        }
    });

    this.isLoading = false;
  },
  methods: {
    ...mapMutations("event", ["setRequirementTypes", "setRequirementsForVendor", "setSubCategory"]),
    ...mapMutations("modal", ["setOpen", "setProposal"]),
    ...mapMutations("eventPlan", ["toggleCommentMode"]),
    ...mapMutations("planningBoard", ["setData", "setMainRequirements", "setTypes", "setSpecialRequirements", "setCategoryCartItem"]),
    ...mapActions("planningBoard", ["saveMainRequirements", "saveRequiementSheet", "saveTypes", "updateRequirements", "getCartItems", "updateCartItem", "getProposals", "updateProposal"]),
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    findVendors(type = false) {
      console.log('find.vendors', type);
      this.findAllCategory = type
      this.isOpenedFinalModal = true;
    },
    async saveSpecialRequirements(data) {
      this.isOpenedFinalModal = false;

      this.setSpecialRequirements(data);
      this.expiredTime = moment(new Date())
        .add(3, "days")
        .valueOf();

      if (this.findAllCategory) {

        const res = await postReq(`/1/events/${this.event.id}/find-vendors`, {
          issuedTime: new Date().getTime(),
          expiredBusinessTime: this.expiredTime,
        })

        if (res.data.success && res.data.data.length) {
          for (let i = 0; i < res.data.data.length; i ++) {
            await this.$store.commit("planningBoard/setCategoryRequirements", {
              category: res.data.data[i].category,
              requirement: res.data.data[i]
            });
            if (this.currentRequirement.category === res.data.data[i].category) {
              this.$set(this.currentRequirement, "expiredBusinessTime", this.expireTime);
            }
          }
        }
      } else {
        const res = await postReq(`/1/requirements/${this.requirements[this.selectedCategory.componentId].id}/find-vendors`, {
          issuedTime: new Date().getTime(),
          expiredBusinessTime: this.expiredTime,
        })
        if (res.data.success) {
          await this.$store.commit("planningBoard/setCategoryRequirements", {
            category: res.data.data.category,
            requirement: res.data.data});
          this.$set(this.currentRequirement, "expiredBusinessTime", this.expireTime);
        }
      }

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
      console.log("setServiceStyles", category, services, type);
      this.$store.commit("event/setEventData", {
        ...this.event,
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
      if (this.getRequirements(category).isIssued) this.popup = true;
      //this.setOpen("REQUIREMENT");
    },

    async addNewCategory(category) {
      this.selectedCategory = this.$store.state.common.serviceCategories.find(item => item.key === category);
    },
    getRequirements(category) {
      console.log("getRequirements", category, this.$store.state.planningBoard.requirements[category])
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
    showMoreCategories(value) {
      this.showMoreCats = value;
    },
    closeMoreCategories(){
      this.showMoreCats = false;
    },
    selectCategory(category) {
      if (category.key) {
        category["componentId"] = category.key;
      }
      this.currentRequirement = this.requirements[category.componentId];
      this.selectedCategory = category;

      if (this.proposals[category.componentId]) {
          const newProposals = this.proposals[category.componentId].filter(p => !p.viewd);

          if (newProposals.length) {
              newProposals.map(p => {
                  this.updateProposal({
                      proposal: { id: p.id, viewed: true },
                      category:category.key,
                  });
              });
          }
      }

      this.showMoreCats = false;
      this.closeProposal();
      if(this.showCommentPanel){
        this.toggleCommentMode();
      }
    },
    selectRemainingCategory(category, action) {
        if (action === "add") {
            this.additionalCategory = category;
            this.showAddNewCategory = true;
        } else if (action === "select") {
            this.selectedCategory = category;
        }
        this.showMoreCats = false;
    },
    addBudget() {
      this.showAddBudgetConfirm = false;

    },
    saveBudget(category) {
      this.selectCategory(category);

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
    async updateExpiredTime() {

      let res = await updateReq(`/1/events/${this.event.id}/requirements/${this.currentRequirement.id}`, {
        id: this.currentRequirement.id,
        expiredBusinessTime: moment(this.currentRequirement.expiredBusinessTime).subtract(1, "days").valueOf(),
      })

      this.currentRequirement = res.data;
    },
    async updateProposalEngagement() {
      const engagement = await getReq(`/1/proposals/${this.proposal.id}/engagement/proposal`);

      if (engagement) {
        new ProposalEngagement({
          ...engagement.data,
          open: [moment().format("MM/dd/yyyy")],
        })
          .for(new Proposal({id: this.proposal.id}))
          .save();
      } else {
        new ProposalEngagement({
          open: [moment().format("MM/dd/yyyy")],
          proposalId: this.proposal.id
        })
          .for(new Proposal({id: this.proposal.id}))
          .save();
      }
    },
    async bookVendor() {
      if (!this.proposal) return;
      await new Proposal({ ...this.proposal }).save();
      this.$router.push({
        name: "CheckoutWithVendor",
        params: {
          eventId: this.event.id,
          proposalId: this.proposal.id,
          proposalType: "planner",
        },
      });
    },
    async addToCart() {
      if (!this.proposal || !this.selectedCategory) return;

      const cartItem = this.cart[this.selectedCategory.componentId];
      await this.updateCartItem({
        id: cartItem ? cartItem.id : undefined,
        category: this.selectedCategory.componentId,
        event: { id: this.event.id },
        proposalId: this.proposal.id,
      });
      await this.updateProposal( {
          proposal: { ...this.proposal, isFavorite: false },
          category: this.proposal.vendor.vendorCategory });
    },
    async favoriteProposal(isFavorite) {

      await this.updateProposal({
          proposal: { ...this.proposal, isFavorite },
          category: this.selectedCategory.componentId,
      });

      await this.setCategoryCartItem({
        category: this.selectedCategory.componentId,
        item: { ...this.cart[this.selectedCategory.componentId], proposal: { ...this.proposal, isFavorite } },
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
          proposalId: this.proposal.id,
          proposal: new Proposal({ id: this.proposal.id }),
          expiredTime,
          type: NEGOTIATION_REQUEST_TYPE.ADD_MORE_TIME,
          url: `${location.protocol}//${location.host}/#/events/${this.event.id}/booking/choose-vendor`,
        });

        let res = await query.for(new Proposal({ id: this.proposal.id })).save();
        console.log("ask.result", res);
        this.proposal.negotiations.push(res);
      }
    },
    closeProposal() {
      this.showDetails = false;
      this.$store.commit("planningBoard/setProposal", null);
    },
    selectProposal(p){
        if(p){

            this.$store.commit("planningBoard/setProposal",p);
            this.$store.dispatch("eventPlan/setProposal",p).then(res => { console.log("eventPlan/setProposal", p); });
        }
        else{
            this.$store.dispatch("eventPlan/setProposal", null).then(res => { console.log("eventPlan/setProposal", null); });
        }
    },
    selectVersion(index) {
      this.$store.commit("planningBoard/selectVersion", index);
      this.proposal = this.originalProposal;
      if (index >= 0 && this.versionProposal.versions) {
        this.proposal = this.versionProposal;
      }
    },
    getUpdatedProposal(proposal, data) {
      Object.keys(data).map(key => {
        this.$set(proposal, key, data[key]);
      });
      return proposal;
    },
    async handleAction(e, proposal = null) {

        if (e.name === "download") {
          this.openNewTab(`${process.env.SERVER_URL}/1/proposal/${this.proposal.id}/download`);

        } else if (e.name === "negotiate" || e.name === "share") {
          this.setProposal(this.proposal);
          if (e.name === "negotiate") this.setOpen("NEGOTIATION");
          else this.setOpen("SHARE");

        } else if (e.name === "compare") {
          this.$router.push(`/events/${this.event.id}/booking/${this.selectedCategory.id}/proposals/compare`);

        } else if (e.name === "already_have_venue") {
          const router = this.$router.resolve({ name: "VendorSignup" });
          this.openNewTab(router.href)

        } else if (e.name === "something_different") {
          this.showDifferentProposals = true;
        } else if (e.name === "detail") {
          await this.$store.commit('planningBoard/setProposal', proposal);
          await this.$store.dispatch('planningBoard/selectVersion', proposal.selectedVersion);

          this.showDetails = true;
          await this.updateProposalEngagement();
        } else if (e.name === "alternative") {

          const res = await postReq(`/1/proposals/replace`, {
            proposals: e.proposals,
            requirementId: this.currentRequirement.id,
          });

          
          console.log('ask.alternatives.res', res);
        }
    },
    openNewTab(link) {
      window.open(link, "_blank");
    },
    async replaceProposal(proposals) {
      console.log('replaceProposal', proposals)
      this.showDifferentProposals = false;
      await postReq(`/1/proposals/replace`, {
        proposals,
        requirementId: this.currentRequirement.id,
      });
    },
  },
  watch: {
    requirements: {
        handler(newVal) {},
        deep: true,
    },
    event(newVal) {},
    negotiationProposals(newVal){

      const processFn = (id) => () => {
        console.log('processFn', id)
        const proposal = this.negotiationProposals.find(p => p.id === id);
        let { negotiations } = proposal;
        negotiations.map(it => it.status = 3);
        this.updateProposal({
          category: proposal.vendor.vendorCategory,
          proposal: {...proposal, negotiations}
        });
      }

      if(newVal.length) {
        newVal.forEach(p => {

          this.$notify({
            message: {
              title: "Great News!",
              content: `${p.vendor.companyName} has accepted your request to extend the validity of the offer. You have an extra 4 days to decide`,
              close: processFn(p.id)
            },
            icon: `${this.$iconURL}messages/group-21013.svg`,
            horizontalAlign: "right",
            verticalAlign: "top",
            timeout: 5000,
          });
        })
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.planning-board-layout {
  .headers {
    .container {
      background-color: transparent;
    }
  }

  .fixed-top {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    padding-left: 480px;
    animation: slide-down 0.7s;
    opacity: 1;
    z-index: 10;

    .container {
      background: #f3f7fd;
    }
  }
  @keyframes slide-down {
    0% {
      opacity:5;
      transform: translateY(-100%);
    }
    100% {
      opacity:1;
      transform: translateY(0);
    }
  }

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
    padding: 22px 50px 22px 480px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    width: 100%;

    button {
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

    &.opened {

    }
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

  .proposal-card-items {
    padding: 0 0em;
    align-items: stretch;
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .border-right {
    border-right: 1px solid #050505;
  }

  .find-vendor-menu-btn {
    height: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #f74374 !important;
    border-left: solid #f97d9f 1px;
  }
}
</style>
