<template>
  <div class="md-layout booking-section position-relative booking-proposals">
    <div class="choose-vendor-board">
      <loader :active="isLoadingProposal" />
      <div class="d-flex justify-content-between align-center">
        <div>
          <resizable-toggle-button
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
          ></resizable-toggle-button>
          <button class="add-category-button mb-10" @click="addRequirements"><md-icon>add</md-icon></button>
        </div>
        <progress-radial-bar
          :value="proposals.length"
          :total="3"
          icon="common/checked-calendar-red.svg"
          @click="openCart"
        ></progress-radial-bar>
      </div>
      <div class="booking-proposals">
        <template v-if="proposals.length > 0">
          <div class="font-size-30 font-bold-extra category-title mt-30 mb-30">
            <img :src="`${$iconURL}Budget+Elements/${selectedCategory.eventCategory.icon}`" />
            {{ selectedCategory.fullTitle }}
          </div>
          <div class="d-flex justify-content-between">
            <div>We found the top {{ proposals.length }} proposals for your event, Book now before it’s too late</div>
            <div class="header-actions">
              <md-button class="md-simple normal-btn md-red" @click="compareProposal">
                <md-icon>bar_chart</md-icon>
                Compare Proposals
              </md-button>
              <span class="seperator"></span>
              <md-button class="md-simple normal-btn md-red" @click="showDifferentProposals = true">
                <md-icon>edit</md-icon>
                I Want Something Different
              </md-button>
            </div>
          </div>
          <div>
            <!-- Event Booking Items -->
            <div class="events-booking-items" v-if="proposals.length">
              <proposal-card
                @goDetail="goDetailPage"
                v-for="(proposal, index) in proposals.slice(0, 3)"
                :key="index"
                :proposal="proposal"
                :component="selectedCategory"
                :probability="getProbability(index)"
                :isCollapsed="showDetails"
                :isSelected="selectedProposal && selectedProposal.id === proposal.id"
              >
              </proposal-card>
            </div>
            <template v-if="showDetails">
              <transition name="component-fade" mode="out-in">
                <event-proposal-details
                  class="mt-20"
                  :vendorProposal="selectedProposal"
                  :category="selectedCategory"
                  :key="selectedProposal.id"
                  @close="closeProposal"
                ></event-proposal-details>
              </transition>
            </template>
          </div>
        </template>
        <pending-for-vendors v-else :expiredTime="expiredTime"></pending-for-vendors>
      </div>
    </div>
    <div class="proposals-footer white-card">
      <div>
        <md-button class="md-simple maryoku-btn md-black">
          <span class="text-transform-capitalize">I already have a vendor</span>
        </md-button>
        <md-button
          class="md-simple maryoku-btn md-black text-transform-capitalize"
          @click="isOpenedAdditionalModal = true"
        >
          <span class="text-transform-capitalize">Chanage requirements</span>
        </md-button>
      </div>
      <div>
        <md-button
            class="md-simple md-outlined md-red maryoku-btn"
            :disabled="proposals.length === 0 || !selectedProposal"
            @click="bookVendor"
        >
          Book Now
        </md-button>
        <md-button class="md-red maryoku-btn"
                   :disabled="proposals.length === 0 || !selectedProposal"
                   @click="addToCart">Add To Cart</md-button>
      </div>
    </div>
    <services-cart
        v-if="showCart"
        @close="showCart = false"
    ></services-cart>
    <additional-request-modal
      class="lg"
      v-if="isOpenedAdditionalModal"
      :subCategory="currentRequirement.mainRequirements"
      :selectedCategory="selectedCategory"
      :defaultData="getRequirementsFormStore(selectedCategory.key) || {}"
      @save="saveAdditionalRequest"
      @cancel="isOpenedAdditionalModal = false"
      @close="isOpenedAdditionalModal = false"
    ></additional-request-modal>
    <event-change-proposal-modal
      v-if="showDifferentProposals"
      @close="showDifferentProposals = false"
      :proposals="proposals.slice(0, 3)"
    ></event-change-proposal-modal>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "underscore";
import moment from "moment";
import InputMask from "vue-input-mask";

import { postReq, getReq } from "@/utils/token";

import Proposal from "@/models/Proposal";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";
import EventCategoryRequirement from "@/models/EventCategoryRequirement";

import { Modal, MaryokuInput, Loader } from "@/components";
import ResizableToggleButton from "@/components/Button/ResizableToggleButton.vue";
import EventChangeProposalModal from "@/components/Modals/EventChangeProposalModal";
import ProposalCard from "../components/ProposalCard";
import PendingForVendors from "../components/PendingForVendors.vue";
import EventProposalDetails from "../Proposal/EventProposalDetails.vue";
import ProposalsBar from "./ProposalsBar.vue";
import AdditionalRequestModal from "../PlanningBoard/components/modals/AdditionalRequest.vue";

import ProgressRadialBar from "../PlanningBoard/components/ProgressRadialBar.vue";
import ServicesCart from "./ServicesCart";

export default {
  name: "event-booking",
  components: {
    Loader,
    InputMask,
    Modal,
    EventChangeProposalModal,
    ProposalCard,
    MaryokuInput,
    ResizableToggleButton,
    PendingForVendors,
    EventProposalDetails,
    ProposalsBar,
    AdditionalRequestModal,
    ProgressRadialBar,
    ServicesCart,
  },
  props: {},
  data: () => ({
    // auth: auth,

    selectedCategory: null,
    calender: null,
    somethingMessage: null,
    iconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Event%20Page/",
    blockVendors: null,
    allRequirements: null,
    selectedBlock: null,
    // proposals: [],
    blockId: "",
    currentRequirement: null,
    proposalsByCategory: {},

    isOpenedAdditionalModal: false,
    isLoading: true,
    isLoadingProposal: false,
    showProposals: false,
    showCounterPage: false,
    showSomethingModal: false,
    showShareVendorModal: false,
    showCommentEditorPanel: false,
    showDetails: false,
    selectedProposal: null,
    showDifferentProposals: false,
    showCart: false,
  }),
  methods: {
    ...mapMutations("event", ["setEventData", "setBookingRequirements", "setInitBookingRequirements"]),
    ...mapActions("event", ["getProposals"]),
    ...mapActions("comment", ["getCommentComponents"]),
    ...mapActions("planningBoard", ["saveMainRequirements", "getRequirements", "getCartItems", "saveTypes", "updateRequirements", "updateCartItem"]),
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
    addRequirements() {
      this.$router.push(`/events/${this.event.id}/booking/planningboard`);
    },
    getSelectedBlock() {
      this.selectedBlock = _.findWhere(this.categoryList, {
        id: this.blockId,
      });
      if (this.selectedBlock && this.selectedBlock.vendorRequirements && this.selectedBlock.vendorRequirements[0]) {
        this.showCounterPage = false;
        this.showProposals = false;
      } else {
        this.showCounterPage = false;
        this.showProposals = false;
      }
      this.isLoading = false;
    },
    getCategoryRequirements() {
      getReq(`/1/events/${this.event.id}/components/${this.selectedCategory.id}/requirements`)
        .then((res) => {
          this.currentRequirement = res.data.item;
        })
        .catch((e) => {
          this.currentRequirement = {};
          this.showCounterPage = false;
        });
    },
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
    fetchData: async function () {
      this.blockId = this.$route.params.blockId;
      this.event = this.$store.state.event.eventData;
      this.getSelectedBlock();
      new Proposal()
        .for(new EventComponent({ id: this.selectedCategory.id }))
        .get()
        .then((result) => {
          this.proposals = result;
          if (result.length > 0) this.showProposals = true;
        });

      await this.getAllRequirements();
    },
    setRequirements(requirementContent) {
      this.currentRequirement = requirementContent;
      this.showCounterPage = true;
      this.showProposals = true;
    },
    back() {
      this.showCounterPage = false;
      this.showProposals = false;
    },
    updateExpiredTime() {
      new EventCategoryRequirement({
        id: this.currentRequirement.id,
        expiredBusinessTime: moment(new Date()).add(2, "days").valueOf(),
      })
        .save()
        .then((res) => {
          this.currentRequirement = Object.assign({}, res.item);
        });
    },
    goDetailPage(proposal) {
      this.showDetails = true;
      this.selectedProposal = proposal;
    },
    closeProposal() {
      this.showDetails = false;
      this.selectedProposal = null;
    },
    getProbability(index) {
      return 100 - 10 * (index + 1) + Math.round(10 * Math.random());
    },
    compareProposal() {
      this.$router.push(`/events/${this.event.id}/booking/${this.selectedCategory.id}/proposals/compare`);
    },
    fetchProposals() {
      new Proposal()
        .for(new EventComponent({ id: this.blockId }))
        .get()
        .then((result) => {
          this.proposals = result;
          if (result.length > 0) this.showProposals = true;
        });
    },

    saveAdditionalRequest({ category, requirements }) {
      this.isOpenedAdditionalModal = false;
      requirements.id = this.currentRequirement.id;
      this.saveMainRequirements({ category: this.selectedCategory.componentId, event: this.event, requirements });
    },
    getRequirementsFormStore(category) {
      if (!this.$store.state[category]) return {};
      return this.$store.state[category].mainRequirements;
    },
    hasBadge(component) {
      if (!this.proposalsByCategory[component.componentId]) return false;
      if (this.proposalsByCategory[component.componentId].length === 0) return false;
      const notViewedProposals = this.proposalsByCategory[component.componentId].filter((item) => !item.viewed);
      if (notViewedProposals.length === 0) return false;
      console.log(notViewedProposals);
      return true;
    },
    async bookVendor() {
      if(!this.selectedProposal) return;
      await new Proposal({ ...this.selectedProposal }).save();
      let routeData = this.$router.push({
        name: "Checkout",
        params: {
            vendorId: this.selectedProposal.vendor.id,
            proposalId: this.selectedProposal.id,
        },
      });
    },
    async addToCart() {
      if(!this.selectedProposal) return;
      this.updateCartItem({
          category: this.selectedCategory.componentId,
          event: {id: this.event.id},
          proposalId: this.selectedProposal.id,
      })
    },
    openCart(){
      this.showCart = true;
    }
  },
  async created() {
    await this.$store.dispatch('planningBoard/resetCartItems');
    this.isLoadingProposal = true;
    const tenantId = this.$authService.resolveTenantId()
    await this.getRequirements(this.event.id);
    await this.getProposals({eventId: this.event.id, tenantId});
    await this.getCartItems(this.event.id);

    this.isLoadingProposal = false;

    this.selectCategory(this.categories[0]);

    let self = this;
    this.$root.$on("clearVendorRequirement", (event) => {
      let requirements = self.storedRequirements;
      if (requirements[event.id]) requirements[event.id] = null;
      self.setBookingRequirements(requirements);
    });
  },
  watch: {
    event(newVal, oldVal) {
      this.$root.$emit("set-title", this.event, this.routeName === "EditBuildingBlocks", true);
    },
    $route: "fetchData",
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format("MMM Do YYYY ");
    },
    formatTime: function (date) {
      return moment(date).format("h:00 A");
    },
    formatDuration: function (startDate, endDate) {
      return moment(endDate).diff(startDate, "hours");
    },
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  computed: {
    ...mapGetters({
      storedRequirements: "event/getBookingRequirements",
    }),
    ...mapState({
      eventRequirements: (state) => state.planningBoard.requirements || {},
    }),
    categoryList() {
      return this.$store.state.event.eventData.components;
    },
    expiredTime() {
      console.log(this.currentRequirement);
      if (this.currentRequirement) return this.currentRequirement.expiredBusinessTime;
      return 0;
    },
    event() {
      return this.$store.state.event.eventData;
    },
    categories() {
      const categories = this.event.components;
      categories.sort((a, b) => a.order - b.order);
      return categories;
    },
    proposals() {
      let proposals = this.$store.state.event.proposals;
      if (!this.selectedCategory || !proposals.hasOwnProperty(this.selectedCategory.componentId)) return [];
      return proposals[this.selectedCategory.componentId];
    },
  },
};
</script>
<style lang="scss" scoped>
.booking-section.booking-proposals {
  .choose-vendor-board {
    width: 100%;
    padding: 3rem;
    padding-bottom: 150px;
  }
  .category-title {
    img {
      width: 30px;
    }
  }
  .header {
    max-height: max-content;
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
  .booking-section__actions {
    width: 100%;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 25px 1.9em;
    background: white;
  }
  .footer-container {
    position: fixed;
    bottom: 0;
    left: 0;
    padding-left: 500px;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    background: white;
    font-family: "Manrope-Regular", sans-serif;
  }
  .proposals-footer {
    position: fixed;
    bottom: 0;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    width: calc(100% - 490px);
    z-index: 10;
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
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
