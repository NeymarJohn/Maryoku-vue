<template>
  <div class>
    <table class="event-blocks__table">
      <thead>
        <tr>
          <th width="40%">Vendor</th>
          <th width="20%">Planned</th>
          <th width="15%">Booked</th>
          <th width="15%">Status</th>
          <th></th>
        </tr>
      </thead>
    </table>

    <!-- Event Blocks -->
    <draggable :list="eventBuildingBlocks">
      <table
        class="event-blocks__table event-block-table"
        v-for="(block, index) in eventBuildingBlocks"
        :key="index"
      >
        <tbody>
          <template>
            <tr>
              <td
                width="40%"
                class="event-block-element"
                :class="block.title ? block.title.toLowerCase().replace(/ /g, '-').replace('&', '').replace('/', '-') : ''"
              >
                <img :src="`http://static.maryoku.com/storage/icons/Budget Elements/${block.icon}`" />
                {{block.title}}
              </td>
              <td class="planned" width="20%">
                <template
                  v-if="type==='total'"
                >$ {{block.allocatedBudget ? block.allocatedBudget : 0 | roundNumber | withComma}}</template>
                <template
                  v-else-if="block.allocatedBudget && block.numberOfParticipants"
                >$ {{block.allocatedBudget ? (block.allocatedBudget / block.numberOfParticipants).toFixed().toString() : 0}}</template>
                <template
                  v-else
                >$ {{block.allocatedBudget ? (block.allocatedBudget / event.numberOfParticipants).toFixed().toString() : 0}}</template>

                <md-button
                  class="md-rose md-sm md-simple edit-btn"
                  v-if="!block.editBudget"
                  @click="showEditElementBudget(block)"
                >Edit</md-button>

                <div class="edit-element-budget" v-if="block.editBudget">
                  <input v-model="block.newBudget" />
                  <md-button
                    class="md-default md-simple md-sm"
                    @click="showEditElementBudget(block)"
                  >cancel</md-button>
                  <md-button class="md-rose md-sm" @click="editElementBudget(block)">save</md-button>
                </div>
              </td>
              <td class="actual red-label" width="15%">
                <template v-if="block.allocatedBudget">
                  <template v-if="block.winningProposalId">
                    <template v-if="block.allocatedBudget < block.winingProposal.cost">
                      <img
                        src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+29.png"
                      />
                    </template>
                    <template v-else>
                      <img
                        src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+29.png"
                      />
                    </template>
                    <md-button
                      class="md-simple actual-cost md-xs"
                      :class="block.allocatedBudget < block.winingProposal.cost ? `md-danger` : `md-success`"
                    >
                      {{ event.elementsBudgetPerGuest ? `$${(block.winingProposal.cost /
                      event.numberOfParticipants).toFixed(2)}` :
                      `$${block.winingProposal.cost.toFixed(2)}` }}
                      <md-icon>open_in_new</md-icon>
                    </md-button>
                  </template>
                </template>
                <!-- v-if="block.downPaymentStatus==='accepted'" -->
                <event-actual-cost-icon-tooltip :icon="'credit_card'" :item="block" :event="event" />
                <span class="font-size-20" v-if="block.vendorsCount>0">
                  <md-icon
                    class="color-plus font-size-20"
                    v-if="block.bookedBudget <= block.allocatedBudget"
                  >add_circle_outline</md-icon>
                  <md-icon class="color-minus font-size-20" v-else>remove_circle_outline</md-icon>
                  <span
                    :class="block.bookedBudget <= block.allocatedBudget?'color-plus':'color-minus'"
                  >$ {{block.bookedBudget | withComma}}</span>
                </span>
              </td>
              <td class="status" width="15%">
                <div>
                  <md-button
                    class="book-btn md-sm"
                    :class="{'disabled' : block.proposalsState==='get-offers'}"
                    @click="bookVendors(block)"
                    v-if="!block.fixed && block.componentId!='unexpected'"
                  >Book Vendors</md-button>
                </div>
              </td>
              <td class="expand">
                <div
                  @click="expandBlock(block)"
                  class="text-right"
                  v-if="!block.fixed && block.componentId!='unexpected'"
                >
                  <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png" />
                </div>
              </td>
            </tr>
          </template>

          <template v-if="block.expanded">
            <tr
              class="details-row"
              v-for="(requirement,index) in block.predefinedRequirements"
              :key="index"
            >
              <td>
                {{requirement.title}}
                <md-button class="md-rose md-simple md-sm edit-requirement">Edit</md-button>
              </td>
              <td>$0</td>
              <td class="actions" colspan="3">
                <md-button class="md-just-icon md-sm md-simple">
                  <img :src="`${timelineIconsURL}Asset 135.svg`" />
                </md-button>
              </td>
            </tr>
            <tr class="item-vendors" v-if="block.vendors">
              <td colspan="5" class="actions-list">
                <event-component-vendor-item
                  v-for="(vendor, index) in block.vendors"
                  :key="index"
                  :vendor="vendor"
                ></event-component-vendor-item>
              </td>
            </tr>
            <tr class="item-actions">
              <td colspan="5" class="actions-list text-right"  style="position:relative">
                <md-button class="md-simple md-red edit-btn-1" @click="addMyVendor(block)">Add My Vendor</md-button>
                <span class="button-split"></span>
                <md-button class="md-simple md-red edit-btn-1" @click="deleteBlock(block)">Delete Category</md-button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <table class="event-blocks__table event-block-table">
        <tbody>
          <tr class="extra">
            <td width="40%" class="event-block-element extra">
              <img src="http://static.maryoku.com/storage/icons/budget screen/SVG/extra-gray.svg" />
              Extras
            </td>
            <td width="20%" class="planned">$ {{0 | withComma}}</td>
            <td width="15%" class="actual red-label"></td>
            <td width="15%" class="status"></td>
            <td class="expand"></td>
          </tr>
          <tr class="extra">
            <td width="40%" class="event-block-element extra">
              <img src="http://static.maryoku.com/storage/icons/budget screen/SVG/tips-gray.svg" />
              Tips  12%
            </td>
            <td width="20%" class="planned">$ {{0 | withComma}}</td>
            <td width="15%" class="actual red-label"></td>
            <td width="15%" class="status"></td>
            <td class="expand"></td>
          </tr>
          <tr class="extra">
            <td colspan="5"><hr/> </td>
          </tr>
          <tr class="extra">
            <td width="40%" class="event-block-element extra">
              <img src="http://static.maryoku.com/storage/icons/budget screen/SVG/fees-gray.svg" />
              Fees 18%
            </td>
            <td width="20%" class="planned">$ {{0 | withComma}}</td>
            <td width="15%" class="actual red-label"></td>
            <td width="15%" class="status"></td>
            <td class="expand"></td>
          </tr>
        </tbody>
      </table>
      <table class="event-blocks__table event-block-table">
        <tbody>
          <tr class="unused-budget">
            <td width="40%" class="event-block-element unused-budget">
              <img src="http://static.maryoku.com/storage/icons/budget screen/SVG/Asset 487.svg" />
              Unused
            </td>
            <td width="20%" class="planned">$ {{remainingBudget | withComma}}</td>
            <td width="15%" class="actual red-label"></td>
            <td width="15%" class="status"></td>
            <td class="expand"></td>
          </tr>
        </tbody>
      </table>
    </draggable>

    <table class="event-blocks__table actions-table">
      <tbody>
        <tr class="total">
          <td class="total-title" width="40%">Total</td>
          <td width="20%">${{Math.round(event.totalBudget) | roundNumber | withComma}}</td>
          <td width="15%" class="total-value">${{event.statistics.booked | withComma}}</td>
          <td colspan="2"></td>
        </tr>
        <tr class="add-category">
          <td colspan="5">
            <md-button class="md-simple add-category-btn" @click="showCategoryModal = true">
              <img src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2019.svg" /> Add new category
            </md-button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal v-if="showCategoryModal" class="add-category-model">
      <template slot="header">
        <div class="add-category-model__header">
          <h2 class="font-size-30 font-bold-extra">
            <img src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2019.svg" /> Add new category
          </h2>
        </div>
        <md-button
          class="md-simple md-just-icon md-round modal-default-button"
          @click="showCategoryModal = false"
        >
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <div class="md-layout-item md-size-70">
            <div class="form-group maryoku-field" v-if="filteredEventBlocks">
              <label class="font-size-16 font-bold-extra color-black">Category</label>
              <!-- <v-select v-model="newBuildingBlock.category" :options="filteredEventBlocks"></v-select> -->
              <multiselect
                v-model="newBuildingBlock.category"
                :options="categoryBuildingBlocks"
                :close-on-select="true"
                :clear-on-select="true"
                tag-placeholder="Add this as new tag"
                placeholder="Type to search category"
                label="title"
                track-by="id"
              ></multiselect>
            </div>
          </div>

          <div
            class="md-layout-item md-size-70 d-flex"
            v-if="newBuildingBlock.category.id==='other'"
          >
            <md-icon class="font-size-20">subdirectory_arrow_right</md-icon>
            <div class="form-group" style="flex-grow:1; margin-left:10px; ">
              <label class="font-size-16 font-bold-extra color-black">Name</label>
              <small class="font-size-14">(2 words top)</small>
              <input type="text" class="form-control" v-model="newBuildingBlock.name" />
            </div>
          </div>
          <div class="md-layout-item md-size-50">
            <div class="form-group with-icon">
              <label class="font-size-16 font-bold-extra color-black">
                Budget
                <br />
              </label>
              <div class="mb-10">
                <small class="font-size-14">You have ${{remainingBudget | withComma}} to use</small>
              </div>
              <div class="input-icon">
                <img :src="`${iconsURL}budget-dark.svg`" width="20" />
              </div>
              <input type="number" class="form-control mb-10" v-model="newBuildingBlock.budget" />
            </div>
          </div>
          <div
            class="md-error d-flex align-center"
            v-if="remainingBudget < newBuildingBlock.budget"
          >
            <img :src="`${iconsURL}warning-circle-gray.svg`" style="width:20px" />
            <span
              style="padding: 0 15px"
            >Oops! Seems like you don’t have enough cash in your “Unused” category</span>
            <md-button
              class="md-button md-rose md-sm md-simple edit-btn md-theme-default md-bold-extra"
              @click="addbudget()"
            >Add More Money</md-button>
          </div>
        </div>
      </template>
      <template slot="footer">
        <md-button
          class="md-default md-simple cancel-btn md-bold"
          @click="showCategoryModal = false"
        >Cancel</md-button>
        <md-button
          :disabled="remainingBudget < newBuildingBlock.budget"
          class="md-red add-category-btn md-bold"
          @click="addBuildingBlock"
        >Add Category</md-button>
      </template>
    </modal>
    <budget-handle-minus-modal
      v-if="showMinusHandleModal"
      :value="overAddedValue"
      @select="handleMinusBudget"
    ></budget-handle-minus-modal>
    <add-my-vendor-modal
      v-if="showAddMyVendor"
      :value="overAddedValue"
      @select="handleMinusBudget"
      @remindLater="showAddMyVendor=false"
      @updateVendor="updateVendor"
    ></add-my-vendor-modal>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import swal from "sweetalert2";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";
import EventCategory from "@/models/EventCategory";
import EventComponentVendor from "@/models/EventComponentVendor";
import EventComponentTodo from "@/models/EventComponentTodo";
import EventComponentValue from "@/models/EventComponentValue";
import Occasion from "@/models/Occasion";
import { Modal, LabelEdit } from "@/components";

// import auth from '@/auth';
import AddBuildingBlockModal from "../components/EventBlocks/Modals/AddBuildingBlocks.vue";
import AddEventElementsModal from "../components/EventBlocks/Modals/AddEventElements.vue";
import EventActualCostIconTooltip from "../components/EventActualCostIconTooltip.vue";
import EventBlockVendors from "./EventBlocks/Modals/EventBlockVendors.vue";
import ViewProposals from "./EventBlocks/Modals/ViewProposals.vue";
import _ from "underscore";

import draggable from "vuedraggable";
import BudgetHandleMinusModal from "@/components/Modals/BudgetHandleMinusModal";
import AddMyVendorModal from "@/components/Modals/AddMyVendorModal";

import EventComponentVendorItem from "./Utilities/EventComponentVendorItem";
export default {
  name: "event-budget-vendors",
  components: {
    LabelEdit,
    EventActualCostIconTooltip,
    Modal,
    draggable,
    BudgetHandleMinusModal,
    Multiselect,
    AddMyVendorModal,
    EventComponentVendorItem
  },
  props: {
    event: {
      type: Object,
      default: () => {
        return { statistics: {} };
      }
    },
    eventComponents: [Array, Function],
    type: {
      type: String,
      default: "total"
    }
  },
  data: () => ({
    // auth: auth,
    isLoading: false,
    allocatedBudget: 0,
    remainingBudget: 0,
    eventBuildingBlocks: [],
    eventBuildingBlocksList: [],
    currentBlockId: null,
    elementsBudget: "event",
    show: false,
    totalBudget: 0,
    totalActual: 0,
    totalBudgetTaxes: 0,
    showCategoryModal: false,
    timelineIconsURL: "http://static.maryoku.com/storage/icons/timeline/svg/",
    iconsURL: "http://static.maryoku.com/storage/icons/Event%20Page/",
    menuIconsURL:
      "http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/",
    locationsList: [
      "San Francisco, California",
      "Los Angeles, California",
      "Jacksonville, Florida",
      "Miami, Florida",
      "NYC, New York",
      "Austin, Texas",
      "Huston, Texas"
    ],
    categoryBuildingBlocks: null,
    filteredEventBlocks: null,
    newBuildingBlock: {
      category: "",
      name: "",
      budget: ""
    },
    showMinusHandleModal: false,
    overAddedValue: 0,
    showAddMyVendor: false,
    selectedComponent: null
  }),
  computed: {
    ...mapGetters({
      components: "event/getComponentsList"
    })
  },
  methods: {
    ...mapMutations("EventPlannerVuex", ["setBuildingBlockModal"]),
    ...mapActions("event", ["getComponents"]),
    expandBlock(item) {
      if (item.expanded) {
        item.expanded = false;
      } else {
        this.eventBuildingBlocks.forEach(g => {
          g.expanded = false;
        });
        item.expanded = true;
      }
      this.$forceUpdate();
    },
    showEditElementBudget(item) {
      if (item.editBudget) {
        item.editBudget = false;
      } else {
        this.eventBuildingBlocks.forEach(g => {
          g.editBudget = false;
        });
        item.editBudget = true;
      }

      if (item.allocatedBudget) {
        item.newBudget = item.allocatedBudget;
      } else {
        item.newBudget = 0;
      }
      this.$forceUpdate();
    },
    deleteBlock(block) {
      let calendar = new Calendar({
        id: this.$auth.user.defaultCalendarId
      });
      let event = new CalendarEvent({ id: this.event.id });
      let selectedBlock = new EventComponent({ id: block.id });

      swal({
        title: `<div class="text-left"><div class="font-size-30 cross-line"><img src="${this.$iconURL}Budget Elements/${block.componentId}.svg" width="40"/>${block.title}</div>
        <div >Are You Sure You Want To <br/>Delete This Category?
                </div></div>`,
        showCancelButton: true,
        confirmButtonClass: "md-button md-success",
        cancelButtonClass: "md-button md-danger",
        confirmButtonText: "Yes I'm sure",
        cancelButtonText: "No, take me back",
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.isLoading = true;
          selectedBlock
            .for(calendar, event)
            .delete()
            .then(resp => {
              this.isLoading = false;
              this.event.components.splice(
                _.findIndex(this.eventBuildingBlocks, b => {
                  return b.id === selectedBlock.id;
                }),
                1
              );
              this.getEventBuildingBlocks();
              this.$root.$emit("RefreshStatistics");
              this.$root.$emit(
                "event-building-block-budget-changed",
                this.event.components
              );
              this.$forceUpdate();

              let allocatedBudget = 0;
              this.eventBuildingBlocks.forEach(item => {
                allocatedBudget += Number(item.allocatedBudget);
              });

              this.allocatedBudget = allocatedBudget;
              this.$emit("change");
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    getRemainingBudget() {
      if (!this.event) return;
      if (!this.event.components) return;
      this.allocatedBudget = this.event.components.reduce((s, item) => {
        return s + item.allocatedBudget;
      }, 0);
      this.remainingBudget =
        Math.round((this.event.totalBudget - this.allocatedBudget) / 10) * 10;
    },
    /**
     * Get Event building blocks
     */
    getEventBuildingBlocks() {
      if (!this.event.id) return;

      let vm = this;

      this.isLoading = true;

      vm.totalBudget = 0;
      vm.totalBudgetTaxes = 0;

      let res = this.event.components;

      this.$set(this, "eventBuildingBlocks", res);

      setTimeout(() => {
        this.isLoading = false;
      }, 500);

      this.eventBuildingBlocks.forEach(item => {
        if (item.allocatedBudget && vm.type === "total") {
          vm.totalBudget += parseInt(item.allocatedBudget);
          vm.totalBudgetTaxes += parseInt(item.allocatedBudget) * 0.12;
        } else if (item.allocatedBudget) {
          vm.totalBudget += item.numberOfParticipants
            ? parseInt(item.allocatedBudget) /
              parseInt(item.numberOfParticipants)
            : parseInt(item.allocatedBudget) /
              parseInt(vm.event.numberOfParticipants);
          vm.totalBudgetTaxes += item.numberOfParticipants
            ? (parseInt(item.allocatedBudget) /
                parseInt(item.numberOfParticipants)) *
              0.12
            : (parseInt(item.allocatedBudget) /
                parseInt(vm.event.numberOfParticipants)) *
              0.12;
        }

        // if (item.allocatedBudget) {
        //     vm.totalBudget += parseInt(item.allocatedBudget);
        //     vm.totalBudgetTaxes  += parseInt(item.allocatedBudget) * .12;
        // }
      });

      this.$forceUpdate();
    },
    showAddBuildingBlocksModal() {
      window.currentPanel = this.$showPanel({
        component: AddBuildingBlockModal,
        cssClass: "md-layout-item md-size-35 transition36 bg-grey",
        openOn: "right",
        props: { event: this.event }
      });
      window.currentPanel.promise.then(res => {
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
          eventBuildingBlocks: this.eventBuildingBlocks
        }
      });
      window.currentPanel.promise.then(res => {
        if (res.length > 0) {
          res.forEach(item => {
            this.event.components.push(JSON.parse(JSON.stringify(item)));
          });
        }
        this.getEventBuildingBlocks();
      });
    },

    editElementBudget(block) {
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });
      let event = new CalendarEvent({ id: this.event.id });
      let selected_block = new EventComponent({ id: block.id });

      selected_block.calendarEvent = block.calendarEvent;
      selected_block.componentId = block.componentId;
      selected_block.icon = block.icon;
      selected_block.color = block.color;
      selected_block.todos = block.todos;
      selected_block.values = block.values;
      selected_block.vendors = block.vendors;

      if (block.allocatedBudget && block.numberOfParticipants) {
        selected_block.allocatedBudget =
          this.type === "total"
            ? block.newBudget
            : block.newBudget * block.numberOfParticipants;
        block.allocatedBudget =
          this.type === "total"
            ? block.newBudget
            : block.newBudget * block.numberOfParticipants;
      } else {
        selected_block.allocatedBudget =
          this.type === "total"
            ? block.newBudget
            : block.newBudget * this.event.numberOfParticipants;
        block.allocatedBudget =
          this.type === "total"
            ? block.newBudget
            : block.newBudget * this.event.numberOfParticipants;
      }

      selected_block
        .for(calendar, event)
        .save()
        .then(resp => {
          this.isLoading = false;
          this.$root.$emit("RefreshStatistics");
          this.getEventBuildingBlocks();
          this.$root.$emit(
            "event-building-block-budget-changed",
            this.event.components
          );
          this.$forceUpdate();

          let allocatedBudget = 0;
          this.eventBuildingBlocks.forEach(item => {
            if (item.allocatedBudget) {
              allocatedBudget += Number(item.allocatedBudget);
            }
          });

          this.allocatedBudget = allocatedBudget;
          if (this.event.totalBudget < this.allocatedBudget) {
            console.log(this.totalBudget);
            this.showMinusHandleModal = true;
            this.overAddedValue = this.allocatedBudget - this.event.totalBudget;
          }
          this.showEditElementBudget(block);
          this.$emit("change");
        })
        .catch(error => {
          console.log(error);
        });
    },

    blockBudgetChanged(val, index) {
      let block = _.find(this.eventBuildingBlocks, function(item) {
        return item.componentId === index;
      });

      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });
      let event = new CalendarEvent({ id: this.event.id });
      let selectedBlock = new EventComponent({ id: block.id });

      selectedBlock.calendarEvent = block.calendarEvent;
      selectedBlock.componentId = block.componentId;
      selectedBlock.icon = block.icon;
      selectedBlock.color = block.color;
      selectedBlock.todos = block.todos;
      selectedBlock.values = block.values;
      selectedBlock.vendors = block.vendors;

      if (val) {
        if (val.toString().toLowerCase() === "click to set") {
          selectedBlock.allocatedBudget = null;
          block.allocatedBudget = null;
        } else {
          if (block.allocatedBudget && block.numberOfParticipants) {
            selectedBlock.allocatedBudget =
              this.type === "total" ? val : val * block.numberOfParticipants;
            block.allocatedBudget =
              this.type === "total" ? val : val * block.numberOfParticipants;
          } else {
            selectedBlock.allocatedBudget =
              this.type === "total"
                ? val
                : val * this.event.numberOfParticipants;
            block.allocatedBudget =
              this.type === "total"
                ? val
                : val * this.event.numberOfParticipants;
          }
        }
      } else {
        selectedBlock.allocatedBudget = null;
        block.allocatedBudget = null;
      }

      selectedBlock
        .for(calendar, event)
        .save()
        .then(resp => {
          this.isLoading = false;
          this.$root.$emit("RefreshStatistics");
          this.getEventBuildingBlocks();
          this.$root.$emit(
            "event-building-block-budget-changed",
            this.event.components
          );
          this.$forceUpdate();

          let allocatedBudget = 0;
          this.eventBuildingBlocks.forEach(item => {
            if (item.allocatedBudget) {
              allocatedBudget += Number(item.allocatedBudget);
            }
          });

          this.allocatedBudget = allocatedBudget;
        })
        .catch(error => {
          console.log(error);
        });
    },

    addRequirements(item) {
      if (item.proposalsCount) {
        swal({
          text: `You have offers based on these requirements, after changing them you will need to request updated proposal. Would you like to proceed?`,
          showCancelButton: true,
          type: "warning",
          confirmButtonClass: "md-button md-success confirm-btn-bg ",
          cancelButtonClass: "md-button md-danger cancel-btn-bg",
          confirmButtonText: "Yes!",
          buttonsStyling: false
        }).then(result => {
          if (result.value) {
            this.showRequirementsSidepanel(item);
          }
        });
      } else {
        this.showRequirementsSidepanel(item);
      }
    },
    bookVendors(item) {
      // go to booking page
      this.$router.push(`/events/${this.event.id}/booking/${item.id}`);
    },
    addMyVendor(item) {
      this.selectedComponent = item;
      this.showAddMyVendor = true;
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
          tab: winnerId != null ? 3 : 1
        }
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
          categoryTitle: categoryTitle
        }
      });
      window.currentPanel.promise.then(res => {
        let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });
        let event = new CalendarEvent({ id: this.event.id });
        new EventComponent()
          .for(calendar, event)
          .find(item.id)
          .then(component => {
            this.event.components.splice(
              _.findIndex(this.event.components, b => {
                return b.id === item.id;
              }),
              1
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
          tab: 0
        }
      });

      panelResult.promise.then(res => {
        this.getEventBuildingBlocks();
      });
    },
    switchingBudgetAndCost() {
      let vm = this;
      vm.event.elementsBudgetPerGuest = !vm.event.elementsBudgetPerGuest;
    },
    setCurrentBlockId: function(currentBlock) {
      if (currentBlock) {
        this.currentBlockId = currentBlock.id;
      } else {
        this.currentBlockId = null;
      }
    },

    async addBuildingBlock() {
      // Save event interaction
      console.log(this.event);
      let event = new CalendarEvent({ id: this.event.id });
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId });

      if (this.remainingBudget < this.newBuildingBlock.budget) {
        return;
      }

      //let newComponent = _.findWhere(this.components, {title: this.newBuildingBlock.category})
      let newComponent = this.newBuildingBlock.category;
      if (newComponent.id === "other") {
        const newCategory = {
          title: `Other-${this.newBuildingBlock.name}`,
          key: `other-${this.newBuildingBlock.name.toLowerCase()}`,
          color: `rgb(${parseInt(Math.random() * 255)}, ${parseInt(
            Math.random() * 255
          )}, ${parseInt(Math.random() * 255)})`,
          icon: `other.svg`,
          type: "customized",
          categoryId: "other"
        };
        newComponent = await new EventCategory(newCategory).save();
      }
      let newBlock = {
        componentId: newComponent ? newComponent.key : "other",
        componentCategoryId: newComponent ? newComponent.key : "other",
        calendarEvent: { id: event.id },
        allocatedBudget: this.newBuildingBlock.budget,
        order: this.event.components.length,
        icon: newComponent.icon,
        category: newComponent
      };

      new EventComponent(newBlock)
        .for(calendar, event)
        .save()
        .then(res => {
          this.showCategoryModal = false;
          this.$emit("change");
        })
        .catch(error => {
          console.log("Error while saving ", error);
        });
    },
    getCategoryBlocks() {
      EventComponent.get()
        .then(res => {
          this.categoryBuildingBlocks = res;
          this.categoryBuildingBlocks.push({ id: "other", title: "Other" });
          this.filteredEventBlocks = _.map(
            this.categoryBuildingBlocks,
            function(item) {
              return item.title;
            }
          );
        })
        .catch(error => {
          console.log("Error ", error);
        });
    },
    addbudget() {
      const arrow = `<i data-v-a76b6a56="" style="color:#050505" class="md-icon md-icon-font md-theme-default">arrow_back</i>`;
      const budgetString = `<div class="font-size-40 font-regular color-red" style="margin:20px 0">$ ${this.newBudget}</div>`;
      const description = `<div class="description">Your edits changed the total budget, do you want to change it?</div>`;
      swal({
        title: `<div class="text-left">${arrow}${budgetString}<div>Are Your Sure?</div>${description}</div>`,
        showCancelButton: true,
        confirmButtonClass: "md-button md-success",
        cancelButtonClass: "md-button md-danger",
        confirmButtonText: "Yes I'm sure",
        cancelButtonText: "No, take me back",
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          alert(result.value);
        }
      });
    },
    handleMinusBudget(selectedOption, value) {
      const formattedValue = `${value}`
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      switch (selectedOption) {
        case "keep":
          this.showMinusHandleModal = false;
          break;
        case "take":
          const unexpectedComponent = this.eventBuildingBlocks.findIndex(
            item => item.componentId === "unexpected"
          );
          // if (unexpectedComponent) {
          //   unexpectedComponent.allocatedBudget = unexpectedComponent.allocatedBudget
          // }
          this.eventBuildingBlocks[unexpectedComponent].newBudget =
            this.eventBuildingBlocks[unexpectedComponent].allocatedBudget -
            value;
          this.editElementBudget(this.eventBuildingBlocks[unexpectedComponent]);
          break;
        case "add":
          const budgetString = `<div class="font-size-40 font-regular color-red" style="margin-bottom:20px">+$${formattedValue}</div>`;
          const description = `<div class="description">Your edits changed the total budget, do you want to change it?</div>`;
          swal({
            title: `<div class="text-left">${budgetString}<div>Would you like to add extra $${formattedValue} to your budget?</div>${description}</div>`,
            showCancelButton: true,
            confirmButtonClass: "md-button md-success",
            cancelButtonClass: "md-button md-danger",
            confirmButtonText: "Yes I'm sure",
            cancelButtonText: "No, take me back",
            buttonsStyling: false
          }).then(result => {
            if (result.value) {
              if (result.value) {
                this.$emit("add", value);
              }
            }
          });
          break;
      }
      this.showMinusHandleModal = false;
    },
    async updateVendor(myVendor) {
      console.log(myVendor);
      console.log(this.calendar);
      let calendar = new Calendar({
        id: this.$auth.user.defaultCalendarId
      });
      let event = new CalendarEvent({ id: this.event.id });
      let selectedBlock = new EventComponent({ id: this.selectedComponent.id });

      if (myVendor.attachment) {
        let formData = new FormData();
        formData.append("file", myVendor.attachment);
        formData.append("from", "eventvendor");
        formData.append("type", "attachment");
        formData.append("name", myVendor.attachment.name);
        const result = await this.$http.post(
          `${process.env.SERVER_URL}/uploadFile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        myVendor.attachment = {
          originalName: myVendor.attachment.name,
          url: result.data.upload.path,
          name: result.data.upload.name
        };
      }

      // Add new Vendors
      new EventComponentVendor(myVendor)
        .save()
        .then(newVendor => {
          this.isLoading = false;

          // Add new Vendors to component
          const eventComponentVendor = {
            vendorId: newVendor.item.id,
            cost: myVendor.cost,
            eventComponentInstance: this.selectedComponent,
            rfpStatus: new Date().getTime(),
            attachment: myVendor.attachment
          };
          new EventComponentVendor(eventComponentVendor)
            .for(calendar, event, selectedBlock)
            .save()
            .then(result => {
              this.showAddMyVendor = false;
              this.$emit("change");
            });
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.getEventBuildingBlocks();
    this.getRemainingBudget();
    this.getCategoryBlocks();
    this.$on("refreshBuildingBlock", () => {
      this.getEventBuildingBlocks();
    });
  },
  watch: {
    event(newVal, oldVal) {
      // Get default event building blocks
      this.getEventBuildingBlocks();
      this.getRemainingBudget();
    },
    eventComponents(newVal, oldVal) {
      // Get default event building blocks
      this.getEventBuildingBlocks();
      this.getRemainingBudget();
    },
    elementsBudget(val) {
      this.switchingBudgetAndCost();
    }
  },
  filters: {
    roundNumber(amount) {
      return Math.round(amount / 10) * 10;
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/md/_colors.scss";
.add-category-model {
  .modal-container {
    max-width: 900px;
    .modal-header {
      padding: 60px 60px 0px;
    }
    .modal-body {
      padding: 0px 60px 0px;
    }
  }
}
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
.expand {
  img {
    transform: rotate(-90deg);
  }
}
.multiselect__tags {
  border: solid 0.5px #bcbcbc;
}
</style>
