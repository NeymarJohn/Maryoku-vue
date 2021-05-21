<template>
  <div class="md-layout booking-section position-relative booking-proposals">
    <div class="choose-vendor-board">
      <div>
        <resizable-toggle-button
          class="mr-20 mb-10"
          :key="component.componentId"
          :label="component.eventCategory ? component.eventCategory.fullTitle : ''"
          :icon="`${$iconURL}Budget+Elements/${component.eventCategory ? component.eventCategory.icon : ''}`"
          :selectedIcon="`${$iconURL}Budget+Elements/${component.componentId}-white.svg`"
          :defaultStatus="selectedCategory && component.componentId === selectedCategory.componentId"
          v-for="component in event.components"
          @click="selectCategory(component)"
        ></resizable-toggle-button>
      </div>
      <div class="booking-proposals" v-if="selectedCategory">
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
              <md-button class="md-simple normal-btn md-red">
                <md-icon>edit</md-icon>
                I Want Something Different
              </md-button>
            </div>
          </div>
          <div>
            <loader :active="isLoadingProposal" />
            <div>
              <!-- Event Booking Items -->
              <div class="md-layout events-booking-items" v-if="proposals.length">
                <proposal-card
                  v-for="(proposal, index) in proposals.slice(0, 3)"
                  :key="index"
                  :proposal="proposal"
                  :component="selectedCategory"
                  @goDetail="goDetailPage"
                  :probability="getProbability(index)"
                ></proposal-card>
              </div>
            </div>
          </div>
        </template>
        <pending-for-vendors v-else :expiredTime="expiredTime"></pending-for-vendors>
      </div>
    </div>
    <div class="proposals-footer white-card">
      <div>
        <md-button class="md-simple maryoku-btn md-black">I already have a venue for my event</md-button>
        <md-button class="md-simple maryoku-btn md-black">Chanage Venue Requirements</md-button>
      </div>
      <div>
        <md-button class="md-simple md-outlined md-red maryoku-btn" :disabled="proposals.length === 0">
          Book Now
        </md-button>
        <md-button class="md-red maryoku-btn" :disabled="proposals.length === 0">Add To Cart</md-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import moment from "moment";
import Swal from "sweetalert2";
import InputMask from "vue-input-mask";

import Calendar from "@/models/Calendar";
import EventComponent from "@/models/EventComponent";

import EventBlocks from "../components/NewEventBlocks";
import ProposalCard from "../components/ProposalCard";
import _ from "underscore";
import { Modal, MaryokuInput, Loader } from "@/components";
import Proposal from "@/models/Proposal";
import EventCategoryRequirement from "@/models/EventCategoryRequirement";
import EventChangeProposalModal from "@/components/Modals/EventChangeProposalModal";
import HeaderActions from "@/components/HeaderActions";
import { postReq, getReq } from "@/utils/token";
import ResizableToggleButton from "@/components/Button/ResizableToggleButton.vue";
import PendingForVendors from "../components/PendingForVendors.vue";

export default {
  name: "event-booking",
  components: {
    Loader,
    EventBlocks,
    InputMask,
    Modal,
    EventChangeProposalModal,
    HeaderActions,
    ProposalCard,
    MaryokuInput,
    ResizableToggleButton,
    PendingForVendors,
  },
  props: {},
  data: () => ({
    // auth: auth,
    selectedCategory: null,
    calender: null,
    isLoading: true,
    isLoadingProposal: false,
    somethingMessage: null,
    iconsURL: "https://static-maryoku.s3.amazonaws.com/storage/icons/Event%20Page/",
    showSomethingModal: false,
    showShareVendorModal: false,
    blockVendors: null,
    allRequirements: null,
    selectedBlock: null,
    proposals: [],
    showCommentEditorPanel: false,
    blockId: "",
    showProposals: false,
    showCounterPage: false,
    currentRequirement: null,
  }),
  methods: {
    ...mapMutations("event", ["setEventData", "setBookingRequirements", "setInitBookingRequirements"]),
    ...mapActions("comment", ["getCommentComponents"]),
    selectCategory(category, clicked) {
      this.selectedCategory = category;
      this.loadingProposal = true;
      new Proposal()
        .for(new EventComponent({ id: this.selectedCategory.id }))
        .get()
        .then((result) => {
          this.proposals = result;
          this.isLoadingProposal = false;
        });
      this.getRequirements();
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
    getRequirements() {
      getReq(`/1/events/${this.event.id}/components/${this.selectedCategory.id}/requirements`)
        .then((res) => {
          this.currentRequirement = res.data.item;
        })
        .catch((e) => {
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

      // todo check if commentComponent is used
      // this.getCommentComponents(this.blockId);

      await this.getAllRequirements();

      // this.getRequirements();
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
      this.$router.push(`/events/${this.event.id}/booking/${this.selectedCategory.id}/proposals/${proposal.id}`);
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
  },
  created() {
    this.isLoading = true;
    this.calendar = new Calendar({
      id: this.$store.state.auth.user.profile.defaultCalendarId,
    });

    this.$root.$on("clearVendorRequirement", (event) => {
      let requirements = this.storedRequirements;
      if (requirements[event.id]) requirements[event.id] = null;
      this.setBookingRequirements(requirements);
    });
    this.selectCategory(this.event.components[0]);
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
    categoryList() {
      return this.$store.state.event.eventData.components;
    },
    expiredTime() {
      if (this.currentRequirement) return this.currentRequirement.expiredBusinessTime;
      return 0;
    },
    event() {
      return this.$store.state.event.eventData;
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
    justify-content: space-between;
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
  }
}
</style>
