<template>
  <div class>
    <table class="event-blocks__table event-block-header">
      <thead>
        <tr>
          <th width="40%">
            Vendor
          </th>
          <th width="20%">
            Original
          </th>
          <th width="15%">
            New
          </th>
          <th width="15%">
            Booked
          </th>
        </tr>
      </thead>
    </table>

    <!-- Event Blocks -->
    <draggable :list="eventBuildingBlocks">
      <table v-for="(block, index) in eventBuildingBlocks" :key="index" class="event-blocks__table event-block-table">
        <tbody>
          <template>
            <tr>
              <td width="40%" class="event-block-element" :class="block.title.toLowerCase().replace(/ /g, '-')">
                <img
                  :src="`${$iconURL}Budget Elements/${block.icon}`"
                >
                {{ block.title }}
              </td>
              <td class="planned" width="20%">
                <template v-if="type === 'total'">
                  {{ block.allocatedBudget }}
                </template>
                <template v-else-if="block.allocatedBudget && block.numberOfParticipants">
                  {{
                    block.allocatedBudget
                      ? (block.allocatedBudget / block.numberOfParticipants).toFixed(2).toString()
                      : ""
                  }}
                </template>
                <template v-else>
                  {{
                    block.allocatedBudget
                      ? (block.allocatedBudget / event.numberOfParticipants).toFixed(2).toString()
                      : ""
                  }}
                </template>
              </td>

              <td class="new-element-budget" width="15%">
                <input v-if="type === 'total'" v-model="block.newTotalBudget" @change="(e)=>handleTotalChange(e,block,index)">
                <input v-else :value="`${block.numberOfParticipants?block.newTotalBudget
                         /block.numberOfParticipants:block.allocatedBudget / event.numberOfParticipants}`"
                       @change="(e)=>handlePerGuestChange(e,block,index)"
                >
              </td>
              <td class="actual red-label" width="15%">
                <template v-if="block.allocatedBudget">
                  <img v-if="block.vendorsCount" src="https://static-maryoku.s3.amazonaws.com/storage/icons/common/check-circle-green.svg">
                  <img v-else src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/png/Asset+29.png">

                  <template v-if="block.winningProposalId">
                    <md-button
                      class="md-simple actual-cost md-xs"
                      :class="block.allocatedBudget < block.winingProposal.cost ? `md-danger` : `md-success`"
                    >
                      {{
                        event.elementsBudgetPerGuest
                          ? `$${(block.winingProposal.cost / event.numberOfParticipants).toFixed(2)}`
                          : `$${block.winingProposal.cost.toFixed(2)}`
                      }}
                      <md-icon>open_in_new</md-icon>
                    </md-button>
                  </template>
                </template>
                <event-actual-cost-icon-tooltip :icon="'credit_card'" :item="block" :event="event" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </draggable>
    <table class="event-blocks__table event-block-table">
      <tbody>
        <tr>
          <td class="event-block-element unexpected" width="35%">
            <img src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/png/Asset+18.png">
            Unexpected
          </td>
          <td class="planned" width="20%">
            ${{ event.unexpectedBudget }}
          </td>
          <td class="new-element-budget" width="15%" />
          <td class="actual red-label" width="15%" />
        </tr>
      </tbody>
    </table>
    <table class="event-blocks__table event-block-table">
      <tbody>
        <tr>
          <td class="event-block-element unexpected" width="35%">
            <img
              src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/SVG/Asset%2020.svg"
              width="20"
            >
            Extras
          </td>
          <td class="planned" width="20%">
            ${{ extras }}
          </td>
          <td class="new-element-budget" width="15%" />
          <td class="actual red-label" width="15%" />
        </tr>
      </tbody>
    </table>

    <table class="event-blocks__table actions-table" style="border-spacing: 0 1px; ">
      <tbody>
        <tr class="total">
          <td class="total-title" />
          <td>Old budget</td>
          <td colspan="3">
            Planed budget
          </td>
          <td colspan="3">
            New budget
          </td>
          <td colspan="3">
            Leftover
          </td>
        </tr>
        <tr class="total">
          <td class="total-title">
            Total
          </td>
          <td>${{ event.totalBudget | withComma }}</td>
          <td colspan="3">
            ${{ eventNewBudget | withComma }}
          </td>
          <td colspan="3">
            ${{ newTotalBudget | withComma }}
          </td>
          <td colspan="3" class="total-value">
            ${{ (eventNewBudget - newTotalBudget) | withComma }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Swal from "sweetalert2";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";
import VueElementLoading from "vue-element-loading";
import { Modal, LabelEdit, AnimatedNumber, StatsCard, ChartCard } from "@/components";

// import auth from '@/auth';
import EventBlocks from "../components/NewEventBlocks";
import AddBuildingBlockModal from "../components/EventBlocks/Modals/AddBuildingBlocks.vue";
import AddEventElementsModal from "../components/EventBlocks/Modals/AddEventElements.vue";
import EventBlockRequirements from "../components/EventBlocks/Modals/EventBlockRequirements.vue";
import EventActualCostIconTooltip from "../components/EventActualCostIconTooltip.vue";
import EventBlockVendors from "./EventBlocks/Modals/EventBlockVendors.vue";
import ViewProposals from "./EventBlocks/Modals/ViewProposals.vue";
import EventComponentVendor from "@/models/EventComponentVendor";
import _ from "underscore";

import draggable from "vuedraggable";
import { Drag, Drop } from "vue-drag-drop";

export default {
  name: "EventBuildingBlocks",
  components: {
    VueElementLoading,
    EventBlocks,
    AddBuildingBlockModal,
    LabelEdit,
    AnimatedNumber,
    StatsCard,
    ChartCard,
    EventActualCostIconTooltip,
    Modal,
    draggable,
    Drag,
    Drop,
  },
  props: {
    event: {
      type: Object,
      default: () => {
        return { statistics: {} };
      },
    },
    eventNewBudget: Number,
    eventComponents: [Array, Function],
    type: {
      type: String,
      default: "total",
    },
  },
  data: () => ({
    isLoading: false,
    allocatedBudget: 0,
    eventBuildingBlocks: [],
    eventBuildingBlocksList: [],
    currentBlockId: null,
    elementsBudget: "event",
    show: false,
    extras:0,
    totalBudget: 0,
    leftover:0,
    newTotalBudget: 0,
    totalActual: 0,
    totalBudgetTaxes: 0,
    showCategoryModal: false,
    locationsList: [
      "San Francisco, California",
      "Los Angeles, California",
      "Jacksonville, Florida",
      "Miami, Florida",
      "NYC, New York",
      "Austin, Texas",
      "Huston, Texas",
    ],
    categoryBuildingBlocks: null,
    filteredEventBlocks: null,
    newBuildingBlock: {
      category: "",
      name: "",
      budget: "",
    },
  }),
  methods: {
    ...mapMutations("EventPlannerVuex", ["setBuildingBlockModal"]),
    getEventBuildingBlocks() {
      if (!this.event.id) return;
      this.isLoading = true;
      this.totalBudget = 0;
      this.totalBudgetTaxes = 0;
      this.extras = this.event.allocatedTips + this.event.allocatedFees;
      let res = this.event.components;
      this.$set(this, "eventBuildingBlocks", res);

      setTimeout(() => {
        this.isLoading = false;
      }, 500);

      this.eventBuildingBlocks.forEach((item) => {
        item.newTotalBudget = item.allocatedBudget;

        if (item.allocatedBudget && this.type === "total") {
          this.totalBudget += parseInt(item.allocatedBudget);
          this.totalBudgetTaxes += parseInt(item.allocatedBudget) * 0.12;
        } else if (item.allocatedBudget) {
          this.totalBudget += item.numberOfParticipants
            ? parseInt(item.allocatedBudget) / parseInt(item.numberOfParticipants)
            : parseInt(item.allocatedBudget) / parseInt(this.event.numberOfParticipants);
          this.totalBudgetTaxes += item.numberOfParticipants
            ? (parseInt(item.allocatedBudget) / parseInt(item.numberOfParticipants)) * 0.12
            : (parseInt(item.allocatedBudget) / parseInt(this.event.numberOfParticipants)) * 0.12;
        }
      });
      this.handleTotalChange();
      this.$forceUpdate();
    },
    showAddBuildingBlocksModal() {
      window.currentPanel = this.$showPanel({
        component: AddBuildingBlockModal,
        cssClass: "md-layout-item md-size-35 transition36 bg-grey",
        openOn: "right",
        props: { event: this.event },
      });
      window.currentPanel.promise.then((res) => {
        this.event.components.push(JSON.parse(JSON.stringify(res)));
        this.getEventBuildingBlocks();
      });
    },
    showAddEventElementsModal() {
      window.currentPanel = this.$showPanel({
        component: AddEventElementsModal,
        cssClass: "md-layout-item md-size-35 transition36 bg-grey",
        openOn: "right",
        props: {
          event: this.event,
          eventBuildingBlocks: this.eventBuildingBlocks,
        },
      });
      window.currentPanel.promise.then((res) => {
        if (res.length > 0) {
          res.forEach((item) => {
            this.event.components.push(JSON.parse(JSON.stringify(item)));
          });
        }
        this.getEventBuildingBlocks();
      });
    },
    handlePerGuestChange(e, event, index){
      const value = e.target.value;
      this.eventBuildingBlocks[index].newTotalBudget = event.numberOfParticipants?
        value*event.numberOfParticipants:value*this.event.numberOfParticipants;
    },
    handleTotalChange(){
      this.newTotalBudget = 0;
      this.event.components.forEach((item)=>{
        this.newTotalBudget += +item.newTotalBudget;
      });
      this.newTotalBudget += (this.extras + this.event.unexpectedBudget);
      this.leftover = this.eventNewBudget - this.newTotalBudget;
      console.log("##-307, EditEventBlocksBudget.vue",this.leftover);
    },
    checkLeftovers() {
      if (this.leftover !== 0) {
        return Swal.fire({
          text: `You have $ ${this.leftover} left over. Would you like handle it by changing 'Unexpected'?`,
          showCancelButton: true,
          icon: "warning",
          confirmButtonClass: "md-button md-success confirm-btn-bg ",
          cancelButtonClass: "md-button md-danger cancel-btn-bg",
          confirmButtonText: "Yes!",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            this.blockBudgetChanged();
           return true;
          }
          return false;
        });
      } else {
        return Promise.resolve(this.blockBudgetChanged());
      }
    },
    blockBudgetChanged  ()  {
      const event = new CalendarEvent({
        id: this.event.id,
        allocatedBudget: this.eventNewBudget,
        totalBudget:  this.eventNewBudget,
        unexpectedBudget: this.event.unexpectedBudget + this.leftover
      });

      this.eventBuildingBlocks.forEach((item) => {
        if (item.allocatedBudget !== item.newTotalBudget) {

          let selected_block = new EventComponent({id: item.id, allocatedBudget: item.newTotalBudget});
          selected_block
            .for(event)
            .save()
            .then((resp) => {
              this.isLoading = false;
              this.$root.$emit("RefreshStatistics");
              this.getEventBuildingBlocks();
              this.$root.$emit("event-building-block-budget-changed", this.event.components);
              this.$forceUpdate();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
      this.$store.dispatch("event/saveEventAction", event).then((res) => {
        this.$emit("change", event);
      });
      return true;
    },

    addRequirements(item) {
      if (item.proposalsCount) {
        Swal.fire({
          text: "You have offers based on these requirements, after changing them you will need to request updated proposal. Would you like to proceed?",
          showCancelButton: true,
          icon: "warning",
          confirmButtonClass: "md-button md-success confirm-btn-bg ",
          cancelButtonClass: "md-button md-danger cancel-btn-bg",
          confirmButtonText: "Yes!",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            this.showRequirementsSidepanel(item);
          }
        });
      } else {
        this.showRequirementsSidepanel(item);
      }
    },
    reviewProposals(item, winnerId = null) {
      window.currentPanel = this.$showPanel({
        component: ViewProposals,
        cssClass: "md-layout-item md-size-70 transition36 bg-grey",
        openOn: "right",
        props: {
          event: this.event,
          selectedBlock: item,
          winnerId: winnerId,
          tab: winnerId != null ? 3 : 1,
        },
      });
    },
    reviewVendors(item, categoryTitle) {
      window.currentPanel = this.$showPanel({
        component: EventBlockVendors,
        cssClass: "md-layout-item md-size-65 transition36 bg-white",
        openOn: "right",
        props: {
          event: this.event,
          selectedBlock: item,
          getOffers: true,
          categoryTitle: categoryTitle,
        },
      });
      window.currentPanel.promise.then((res) => {
        let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });
        let event = new CalendarEvent({ id: this.event.id });
        new EventComponent()
          .for(calendar, event)
          .find(item.id)
          .then((component) => {
            this.event.components.splice(
              _.findIndex(this.event.components, (b) => {
                return b.id === item.id;
              }),
              1,
            );
            this.event.components.push(JSON.parse(JSON.stringify(component)));
            this.getEventBuildingBlocks();
          });
      });
    },
    showRequirementsSidepanel(item, winnerId = null) {
      const panelResult = this.$showPanel({
        component: ViewProposals,
        cssClass: "md-layout-item md-size-70 transition36 bg-grey",
        openOn: "right",
        props: {
          event: this.event,
          selectedBlock: item,
          winnerId: winnerId,
          tab: 0,
        },
      });

      panelResult.promise.then((res) => {
        this.getEventBuildingBlocks();
      });
    },
    switchingBudgetAndCost() {
      let vm = this;
      vm.event.elementsBudgetPerGuest = !vm.event.elementsBudgetPerGuest;
    },
    setCurrentBlockId: function (currentBlock) {
      if (currentBlock) {
        this.currentBlockId = currentBlock.id;
      } else {
        this.currentBlockId = null;
      }
    },

    addBuildingBlock() {
      let vm = this;

      // Save event interaction
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });
      let event = new CalendarEvent({ id: this.event.id });

      let new_block = {
        componentId:
          this.newBuildingBlock.category != "Other"
            ? this.newBuildingBlock.category.replace(/ /g, "").toLocaleLowerCase()
            : this.newBuildingBlock.name.replace(/ /g, "").toLocaleLowerCase(),
        componentCategoryId: this.newBuildingBlock.categoryId,
        todos: "",
        values: "",
        vendors: "",
        calendarEvent: { id: event.id },
      };

      new EventComponent(new_block)
        .for(calendar, event)
        .save()
        .then((res) => {
          this.showCategoryModal = false;
          //
          // setTimeout(function(){
          //
          //     vm.getEventBuildingBlocks();
          //
          // },2000);

          location.reload();
        })
        .catch((error) => {
          console.log("Error while saving ", error);
        });
    },
    getCategoryBlocks() {
      EventComponent.get()
        .then((res) => {
          this.categoryBuildingBlocks = res;
          this.filteredEventBlocks = _.map(this.categoryBuildingBlocks, function (item) {
            return item.title;
          });
          this.filteredEventBlocks.push("Other");
        })
        .catch((error) => {
          console.log("Error ", error);
        });
    },
  },
  watch: {
    event(newVal, oldVal) {
      // Get default event building blocks
      this.getEventBuildingBlocks();
    },
    eventComponents(newVal, oldVal) {
      // Get default event building blocks
      this.getEventBuildingBlocks();
    },
    elementsBudget(val) {
      this.switchingBudgetAndCost();
    },
  },
  created() {
  },
  mounted() {
    this.getEventBuildingBlocks();
    this.getCategoryBlocks();

    this.$on("refreshBuildingBlock", () => {
      this.getEventBuildingBlocks();
    });
  },
  filters: {
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
};
</script>
<style lang="scss">
.requirements-cell-button {
  width: 48px;
  min-width: 48px;

  .md-ripple {
    width: 48px;
    min-width: 48px;
  }

  &.md-icon:hover {
    visibility: hidden;
  }

  &.md-icon:hover {
    visibility: visible;
  }
}

.btn-add {
  border-radius: 3px;
  width: 48px;
  min-width: 48px;

  .md-ripple {
    width: 48px;
    min-width: 48px;
  }
}

.add-new-block-btn {
  .md-ripple {
    padding: 10px 0 !important;
    text-align: left;
    color: #ff4470 !important;
    font-weight: 500 !important;
    font-size: 12px !important;

    .md-button-content {
      i {
        color: #ff4470 !important;
      }
    }

    &:hover {
      color: #999999 !important;
    }
  }
}

.select-elements-budget {
  & > input[type="text"] {
    font-size: 14px !important;
  }
}

.no-border {
  &:before {
    border: 2px solid white;
  }
}

.span-element {
  font-weight: 400;
}

.span-users-count {
  color: #999999;
  font-size: 14px;
}

.w-100 {
  width: 100% !important;
}

.cursor-pointer {
  cursor: pointer !important;
}
</style>
