<template>
  <div class>
    <table class="event-blocks__table">
      <thead>
        <tr>
          <th width="40%">Vendor</th>
          <th width="20%">Planned</th>
          <th width="15%">Actual</th>
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
                <img
                  :src="`http://static.maryoku.com/storage/icons/Budget Elements/${block.componentId}.svg`"
                />
                {{block.title}}
              </td>
              <td class="planned" width="20%">

                  <template v-if="type==='total'">
                      $ {{block.allocatedBudget ? block.allocatedBudget : 0 | withComma}}
                  </template>
                  <template v-else-if="block.allocatedBudget && block.numberOfParticipants">
                      $ {{block.allocatedBudget ? (block.allocatedBudget / block.numberOfParticipants).toFixed(0).toString() : 0}}
                  </template>
                  <template v-else>
                      $ {{block.allocatedBudget ? (block.allocatedBudget / event.numberOfParticipants).toFixed(0).toString() : 0}}
                  </template>

                  <md-button class="md-rose md-sm md-simple edit-budget" v-if="!block.editBudget" @click="showEditElementBudget(block)"> Edit </md-button>

                  <div class="edit-element-budget" v-if="block.editBudget">
                      <input v-model="block.newBudget">
                      <md-button class="md-default md-simple md-sm" @click="showEditElementBudget(block)">cancel</md-button>
                      <md-button class="md-rose md-sm" @click="editElementBudget(block)">save</md-button>
                  </div>
                  <!--
                <label-edit
                  v-if="type==='total'"
                  :text="block.allocatedBudget"
                  :field-name="block.componentId"
                  :sub-description="elementsBudget"
                  :currency="'$'"
                  :numeric="true"
                  @text-updated-blur="blockBudgetChanged"
                  @text-updated-enter="blockBudgetChanged"
                ></label-edit>

                <label-edit
                  v-else-if="block.allocatedBudget && block.numberOfParticipants"
                  :text="block.allocatedBudget ? (block.allocatedBudget / block.numberOfParticipants).toFixed(2).toString() : ''"
                  :field-name="block.componentId"
                  :sub-description="elementsBudget"
                  :currency="'$'"
                  :numeric="true"
                  @text-updated-blur="blockBudgetChanged"
                  @text-updated-enter="blockBudgetChanged"
                ></label-edit>
                <label-edit
                  v-else
                  :text="block.allocatedBudget ? (block.allocatedBudget / event.numberOfParticipants).toFixed(2).toString() : ''"
                  :field-name="block.componentId"
                  :sub-description="elementsBudget"
                  :currency="'$'"
                  :numeric="true"
                  @text-updated-blur="blockBudgetChanged"
                  @text-updated-enter="blockBudgetChanged"
                ></label-edit>

                -->
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
              </td>
              <td class="status" width="15%">
                <div>
                  <md-button
                    class="book-btn md-sm"
                    :class="{'disabled' : block.proposalsState==='get-offers'}"
                    @click="bookVendors(block)"
                  >Book Vendors</md-button>

                  <!--                          <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+31.png">-->
                </div>
              </td>
              <td class="expand">
                <div @click="expandBlock(block)">
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
            <tr class="item-actions">
              <!--                  <td class="see-proposals">-->
              <!--                      <div>Relish Caterers & Venues</div>-->
              <!--                      <md-button class="md-rose md-simple see-proposal" >See Proposal</md-button>-->
              <!--                  </td>-->
              <td colspan="5" class="actions-list text-right">
                <md-button class="md-rose md-simple" @click="reviewProposals(block)">Add My Vendor</md-button>
                <md-button class="md-rose md-simple" @click="deleteBlock(block.id)">Delete Category</md-button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </draggable>
    <!-- <table class="event-blocks__table event-block-table">
      <tbody>
        <tr>
          <td class="event-block-element unexpected" width="40%">
            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+18.png" /> Unexpected
          </td>
          <td class="planned" width="20%">$0</td>
          <td class="actual" width="15%" >$0</td>
            <td class="status" width="15%">
                <div style="visibility: hidden">
                    <md-button
                        class="book-btn md-sm"
                    >Book Vendors</md-button> -->

                    <!--                          <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+31.png">-->
                <!-- </div>
            </td>
          <td class="expand"  >
            <a href>
              <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png" />
            </a>
          </td>
        </tr>
      </tbody>
    </table> -->

    <table class="event-blocks__table actions-table">
      <tbody>
        <!--                                <tr>-->
        <!--                                    <td class="vendor completed"><img-->
        <!--                                        src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png">-->
        <!--                                        Catering-->
        <!--                                    </td>-->
        <!--                                    <td class="planned">$1500</td>-->
        <!--                                    <td class="actual green-label"><img-->
        <!--                                        src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+30.png">-->
        <!--                                        $1200-->
        <!--                                    </td>-->
        <!--                                    <td class="status">-->
        <!--                                        <a href="">-->
        <!--                                            <img-->
        <!--                                                src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+31.png">-->
        <!--                                        </a>-->
        <!--                                    </td>-->
        <!--                                    <td class="expand">-->
        <!--                                        <a href="">-->
        <!--                                            <img-->
        <!--                                                src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">-->
        <!--                                        </a>-->
        <!--                                    </td>-->
        <!--                                </tr>-->
        <!--                                </tbody>-->
        <!--                                <tbody>-->

        <!--                                <tr >-->
        <!--                                    <td class="vendor completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> Catering</td>-->
        <!--                                    <td class="planned">$1500</td>-->
        <!--                                    <td class="actual green-label"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+30.png"> $1200</td>-->
        <!--                                    <td class="status">-->
        <!--                                        <a href="">-->
        <!--                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+31.png">-->
        <!--                                        </a>-->
        <!--                                    </td>-->
        <!--                                    <td class="expand">-->
        <!--                                        <a href="">-->
        <!--                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">-->
        <!--                                        </a>-->
        <!--                                    </td>-->
        <!--                                </tr>-->
        <!--                                <tr >-->
        <!--                                    <td class="vendor completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> DJ</td>-->
        <!--                                    <td class="planned">$1500</td>-->
        <!--                                    <td class="actual"> $50</td>-->
        <!--                                    <td class="status">-->
        <!--                                        <md-button class="book-btn md-sm">Book</md-button>-->
        <!--                                    </td>-->
        <!--                                    <td class="expand">-->
        <!--                                        <a href="">-->
        <!--                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">-->
        <!--                                        </a>-->
        <!--                                    </td>-->
        <!--                                </tr>-->
        <!--                                <tr >-->
        <!--                                    <td class="vendor completed"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> DJ</td>-->
        <!--                                    <td class="planned">$1500</td>-->
        <!--                                    <td class="actual"> $50</td>-->
        <!--                                    <td class="status">-->
        <!--                                        <md-button class="book-btn md-sm">Book</md-button>-->
        <!--                                    </td>-->
        <!--                                    <td class="expand">-->
        <!--                                        <a href="">-->
        <!--                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">-->
        <!--                                        </a>-->
        <!--                                    </td>-->
        <!--                                </tr>-->

        <!--                                <tr >-->
        <!--                                    <td class="vendor"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> Photographer</td>-->
        <!--                                    <td class="planned">$100</td>-->
        <!--                                    <td class="actual"> $100</td>-->
        <!--                                    <td class="status">-->
        <!--                                        <md-button class="book-btn md-sm disabled">Book</md-button>-->
        <!--                                    </td>-->
        <!--                                    <td class="expand">-->
        <!--                                        <a href="">-->
        <!--                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">-->
        <!--                                        </a>-->
        <!--                                    </td>-->
        <!--                                </tr>-->

        <!--                                <tr >-->
        <!--                                    <td class="vendor unexpected"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+18.png"> Unexpected</td>-->
        <!--                                    <td class="planned">$100</td>-->
        <!--                                    <td class="actual"> $100</td>-->
        <!--                                    <td class="status">-->
        <!--                                        <md-button class="use-btn md-sm">Use</md-button>-->
        <!--                                    </td>-->
        <!--                                    <td class="expand">-->
        <!--                                        <a href="">-->
        <!--                                            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">-->
        <!--                                        </a>-->
        <!--                                    </td>-->
        <!--                                </tr>-->

        <tr class="add-category">
          <td colspan="5">
            <md-button class="md-simple add-category-btn" @click="showCategoryModal = true">
              <img src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2019.svg" /> Add new category
            </md-button>
          </td>
        </tr>

        <tr class="taxes">
          <td class="taxes-title" width="40%">
            <img
              src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2020.svg"
              width="20"
            /> Tips
            <span class="percent">12%</span>
          </td>
          <td width="20%">${{Math.round(totalBudgetTaxes) | withComma}}</td>
          <td class="actual green-label" width="15%">
            <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+30.png" /> $0
          </td>
            <td class="status" width="15%">
                <div style="visibility: hidden">
                    <md-button
                        class="book-btn md-sm"
                    >Book Vendors</md-button>

                    <!--                          <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+31.png">-->
                </div>
            </td>
          <td class="expand">
            <a href>
              <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png" />
            </a>
          </td>
        </tr>
        <tr class="total">
          <td class="total-title">Total</td>
          <td>${{Math.round(totalBudget) | withComma}}</td>
          <td colspan="3" class="total-value">${{totalActual | withComma}}</td>
        </tr>
      </tbody>
    </table>

    <modal v-if="showCategoryModal" class="add-category-model">
      <template slot="header">
        <div class="add-category-model__header">
          <h2>
            <img src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2019.svg" /> Add new
            category
          </h2>
          <div class="header-description">
            <img :src="`${iconsURL}Group 1175.svg`" width="20" /> Adding expenses
            to your project might cause program changes
          </div>
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
          <div class="md-layout-item md-size-100">
            <div class="form-group maryoku-field" v-if="filteredEventBlocks">
              <label>Category</label>
              <v-select v-model="newBuildingBlock.category" :options="filteredEventBlocks"></v-select>
            </div>
          </div>

          <div class="md-layout-item md-size-100" v-if="newBuildingBlock.category==='Other'">
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" v-model="newBuildingBlock.name" />
            </div>
          </div>
          <div class="md-layout-item md-size-100 margin-bottom">
            <div class="form-group with-icon">
              <label>Budget</label>
              <div class="input-icon">
                <img :src="`${iconsURL}Group 3090.svg`" width="20" />
              </div>
              <input type="number" class="form-control" v-model="newBuildingBlock.budget" />
              <div class="md-error" v-if="remainingBudget < newBuildingBlock.budget">This budget should be less than the remaining.</div>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-default md-simple cancel-btn" @click="showCategoryModal = false">Cancel</md-button>
        <md-button :disabled="remainingBudget < newBuildingBlock.budget"  class="md-rose add-category-btn" @click="addBuildingBlock">Add Category</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import swal from 'sweetalert2'
import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventComponent from '@/models/EventComponent'
import {
  Modal,
  LabelEdit
} from '@/components'

// import auth from '@/auth';
import AddBuildingBlockModal from '../components/EventBlocks/Modals/AddBuildingBlocks.vue'
import AddEventElementsModal from '../components/EventBlocks/Modals/AddEventElements.vue'
import EventActualCostIconTooltip from '../components/EventActualCostIconTooltip.vue'
import EventBlockVendors from './EventBlocks/Modals/EventBlockVendors.vue'
import ViewProposals from './EventBlocks/Modals/ViewProposals.vue'
import _ from 'underscore'

import draggable from 'vuedraggable'

export default {
  name: 'event-building-blocks',
  components: {
    LabelEdit,
    EventActualCostIconTooltip,
    Modal,
    draggable
  },
  props: {
    event: {
      type: Object,
      default: () => {
        return { statistics: {} }
      }
    },
    eventComponents: [Array, Function],
    type: {
      type: String,
      default: 'total'
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
    elementsBudget: 'event',
    show: false,
    totalBudget: 0,
    totalActual: 0,
    totalBudgetTaxes: 0,
    showCategoryModal: false,
    timelineIconsURL: 'http://static.maryoku.com/storage/icons/timeline/svg/',
    iconsURL: 'http://static.maryoku.com/storage/icons/Event%20Page/',
    menuIconsURL:
      'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/',
    locationsList: [
      'San Francisco, California',
      'Los Angeles, California',
      'Jacksonville, Florida',
      'Miami, Florida',
      'NYC, New York',
      'Austin, Texas',
      'Huston, Texas'
    ],
    categoryBuildingBlocks: null,
    filteredEventBlocks: null,
    newBuildingBlock: {
      category: '',
      name: '',
      budget: ''
    }
  }),
  computed: {
    ...mapGetters({
      components: 'event/getComponentsList'
    })
  },
  methods: {
    ...mapMutations('EventPlannerVuex', ['setBuildingBlockModal']),
    ...mapActions('event', ['getComponents']),
    expandBlock (item) {
      if (item.expanded) {
        item.expanded = false
      } else {
        this.eventBuildingBlocks.forEach(g => {
          g.expanded = false
        })
        item.expanded = true
      }
      this.$forceUpdate()
    },
    showEditElementBudget (item) {
      if (item.editBudget) {
        item.editBudget = false
      } else {
        this.eventBuildingBlocks.forEach(g => {
          g.editBudget = false
        })
        item.editBudget = true
      }

      if (item.allocatedBudget) {
        item.newBudget = item.allocatedBudget
      } else {
        item.newBudget = 0
      }
      this.$forceUpdate()
    },
    deleteBlock (blockId) {
      swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        showCancelButton: true,
        confirmButtonClass: 'md-button md-success',
        cancelButtonClass: 'md-button md-danger',
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.isLoading = true

          let calendar = new Calendar({
            id: this.$auth.user.defaultCalendarId
          })
          let event = new CalendarEvent({ id: this.event.id })
          let selectedBlock = new EventComponent({ id: blockId })

          selectedBlock
            .for(calendar, event)
            .delete()
            .then(resp => {
              this.isLoading = false
              this.event.components.splice(
                _.findIndex(this.eventBuildingBlocks, b => {
                  return b.id === selectedBlock.id
                }),
                1
              )
              this.getEventBuildingBlocks()
              this.$root.$emit('RefreshStatistics')
              this.$root.$emit(
                'event-building-block-budget-changed',
                this.event.components
              )
              this.$forceUpdate()

              let allocatedBudget = 0
              this.eventBuildingBlocks.forEach(item => {
                allocatedBudget += Number(item.allocatedBudget)
              })

              this.allocatedBudget = allocatedBudget
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    getRemainingBudget () {
      if (!this.event) return;
      if (!this.event.components) return;
      this.allocatedBudget = this.event.components.reduce((s,item)=>{
        return s + item.allocatedBudget
      }, 0)
      this.remainingBudget = this.event.totalBudget - this.allocatedBudget;
    },
    /**
     * Get Event building blocks
     */
    getEventBuildingBlocks () {
      if (!this.event.id) return

      let vm = this

      this.isLoading = true

      vm.totalBudget = 0
      vm.totalBudgetTaxes = 0

      let res = this.event.components
      this.$set(this, 'eventBuildingBlocks', res)

      setTimeout(() => {
        this.isLoading = false
      }, 500)

      this.eventBuildingBlocks.forEach(item => {
        if (item.allocatedBudget && vm.type === 'total') {
          vm.totalBudget += parseInt(item.allocatedBudget)
          vm.totalBudgetTaxes += parseInt(item.allocatedBudget) * 0.12
        } else if (item.allocatedBudget) {
          vm.totalBudget += item.numberOfParticipants
            ? parseInt(item.allocatedBudget) /
              parseInt(item.numberOfParticipants)
            : parseInt(item.allocatedBudget) /
              parseInt(vm.event.numberOfParticipants)
          vm.totalBudgetTaxes += item.numberOfParticipants
            ? (parseInt(item.allocatedBudget) /
                parseInt(item.numberOfParticipants)) *
              0.12
            : (parseInt(item.allocatedBudget) /
                parseInt(vm.event.numberOfParticipants)) *
              0.12
        }

        // if (item.allocatedBudget) {
        //     vm.totalBudget += parseInt(item.allocatedBudget);
        //     vm.totalBudgetTaxes  += parseInt(item.allocatedBudget) * .12;
        // }
      })

      this.$forceUpdate()
    },
    showAddBuildingBlocksModal () {
      window.currentPanel = this.$showPanel({
        component: AddBuildingBlockModal,
        cssClass: 'md-layout-item md-size-35 transition36 bg-grey',
        openOn: 'right',
        props: { event: this.event }
      })
      window.currentPanel.promise.then(res => {
        this.event.components.push(JSON.parse(JSON.stringify(res)))
        this.getEventBuildingBlocks()
      })
    },
    showAddEventElementsModal () {
      window.currentPanel = this.$showPanel({
        component: AddEventElementsModal,
        cssClass: 'md-layout-item md-size-35 transition36 bg-grey',
        openOn: 'right',
        props: {
          event: this.event,
          eventBuildingBlocks: this.eventBuildingBlocks
        }
      })
      window.currentPanel.promise.then(res => {
        if (res.length > 0) {
          res.forEach(item => {
            this.event.components.push(JSON.parse(JSON.stringify(item)))
          })
        }
        this.getEventBuildingBlocks()
      })
    },

    editElementBudget (block) {
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      let event = new CalendarEvent({ id: this.event.id })
      let selected_block = new EventComponent({ id: block.id })

      selected_block.calendarEvent = block.calendarEvent
      selected_block.componentId = block.componentId
      selected_block.icon = block.icon
      selected_block.color = block.color
      selected_block.todos = block.todos
      selected_block.values = block.values
      selected_block.vendors = block.vendors

      if (block.allocatedBudget && block.numberOfParticipants) {
        selected_block.allocatedBudget =
                  this.type === 'total' ? block.newBudget : block.newBudget * block.numberOfParticipants
        block.allocatedBudget =
                  this.type === 'total' ? block.newBudget : block.newBudget * block.numberOfParticipants
      } else {
        selected_block.allocatedBudget =
                  this.type === 'total'
                    ? block.newBudget
                    : block.newBudget * this.event.numberOfParticipants
        block.allocatedBudget =
                  this.type === 'total'
                    ? block.newBudget
                    : block.newBudget * this.event.numberOfParticipants
      }

      selected_block
        .for(calendar, event)
        .save()
        .then(resp => {
          this.isLoading = false
          this.$root.$emit('RefreshStatistics')
          this.getEventBuildingBlocks()
          this.$root.$emit(
            'event-building-block-budget-changed',
            this.event.components
          )
          this.$forceUpdate()

          let allocatedBudget = 0
          this.eventBuildingBlocks.forEach(item => {
            if (item.allocatedBudget) {
              allocatedBudget += Number(item.allocatedBudget)
            }
          })

          this.allocatedBudget = allocatedBudget

          this.showEditElementBudget(block)
        })
        .catch(error => {
          console.log(error)
        })
    },

    blockBudgetChanged (val, index) {
      let block = _.find(this.eventBuildingBlocks, function (item) {
        return item.componentId === index
      })

      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      let event = new CalendarEvent({ id: this.event.id })
      let selectedBlock = new EventComponent({ id: block.id })

      selectedBlock.calendarEvent = block.calendarEvent
      selectedBlock.componentId = block.componentId
      selectedBlock.icon = block.icon
      selectedBlock.color = block.color
      selectedBlock.todos = block.todos
      selectedBlock.values = block.values
      selectedBlock.vendors = block.vendors

      if (val) {
        if (val.toString().toLowerCase() === 'click to set') {
          selectedBlock.allocatedBudget = null
          block.allocatedBudget = null
        } else {
          if (block.allocatedBudget && block.numberOfParticipants) {
            selectedBlock.allocatedBudget =
              this.type === 'total' ? val : val * block.numberOfParticipants
            block.allocatedBudget =
              this.type === 'total' ? val : val * block.numberOfParticipants
          } else {
            selectedBlock.allocatedBudget =
              this.type === 'total'
                ? val
                : val * this.event.numberOfParticipants
            block.allocatedBudget =
              this.type === 'total'
                ? val
                : val * this.event.numberOfParticipants
          }
        }
      } else {
        selectedBlock.allocatedBudget = null
        block.allocatedBudget = null
      }

      selectedBlock
        .for(calendar, event)
        .save()
        .then(resp => {
          this.isLoading = false
          this.$root.$emit('RefreshStatistics')
          this.getEventBuildingBlocks()
          this.$root.$emit(
            'event-building-block-budget-changed',
            this.event.components
          )
          this.$forceUpdate()

          let allocatedBudget = 0
          this.eventBuildingBlocks.forEach(item => {
            if (item.allocatedBudget) {
              allocatedBudget += Number(item.allocatedBudget)
            }
          })

          this.allocatedBudget = allocatedBudget
        })
        .catch(error => {
          console.log(error)
        })
    },

    addRequirements (item) {
      if (item.proposalsCount) {
        swal({
          text: `You have offers based on these requirements, after changing them you will need to request updated proposal. Would you like to proceed?`,
          showCancelButton: true,
          type: 'warning',
          confirmButtonClass: 'md-button md-success confirm-btn-bg ',
          cancelButtonClass: 'md-button md-danger cancel-btn-bg',
          confirmButtonText: 'Yes!',
          buttonsStyling: false
        }).then(result => {
          if (result.value) {
            this.showRequirementsSidepanel(item)
          }
        })
      } else {
        this.showRequirementsSidepanel(item)
      }
    },
    bookVendors (item) {
      // go to booking page
      this.$router.push(`/events/${this.event.id}/booking/${item.id}`)
    },
    reviewProposals (item, winnerId = null) {
      window.currentPanel = this.$showPanel({
        component: ViewProposals,
        cssClass: 'md-layout-item md-size-70 transition36 bg-grey',
        openOn: 'right',
        props: {
          event: this.event,
          selectedBlock: item,
          winnerId: winnerId,
          tab: winnerId != null ? 3 : 1
        }
      })
    },
    reviewVendors (item, categoryTitle) {
      window.currentPanel = this.$showPanel({
        component: EventBlockVendors,
        cssClass: 'md-layout-item md-size-65 transition36 bg-white',
        openOn: 'right',
        props: {
          event: this.event,
          selectedBlock: item,
          getOffers: true,
          categoryTitle: categoryTitle
        }
      })
      window.currentPanel.promise.then(res => {
        let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
        let event = new CalendarEvent({ id: this.event.id })
        new EventComponent()
          .for(calendar, event)
          .find(item.id)
          .then(component => {
            this.event.components.splice(
              _.findIndex(this.event.components, b => {
                return b.id === item.id
              }),
              1
            )
            this.event.components.push(JSON.parse(JSON.stringify(component)))
            this.getEventBuildingBlocks()
          })
      })
    },
    showRequirementsSidepanel (item, winnerId = null) {
      const panelResult = this.$showPanel({
        component: ViewProposals,
        cssClass: 'md-layout-item md-size-70 transition36 bg-grey',
        openOn: 'right',
        props: {
          event: this.event,
          selectedBlock: item,
          winnerId: winnerId,
          tab: 0
        }
      })

      panelResult.promise.then(res => {
        this.getEventBuildingBlocks()
      })
    },
    switchingBudgetAndCost () {
      let vm = this
      vm.event.elementsBudgetPerGuest = !vm.event.elementsBudgetPerGuest
    },
    setCurrentBlockId: function (currentBlock) {
      if (currentBlock) {
        this.currentBlockId = currentBlock.id
      } else {
        this.currentBlockId = null
      }
    },

    addBuildingBlock () {
      // Save event interaction
      console.log(this.event);
      let event = new CalendarEvent({ id: this.event.id })
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })

      if (this.remainingBudget < this.newBuildingBlock.budget) {
        return;
      }

      let newBlock = {
        componentId:
          _.findWhere(this.components, {title: this.newBuildingBlock.category}).key,
        // componentCategoryId: this.newBuildingBlock.categoryId,
        calendarEvent: { id: event.id },
        allocatedBudget: this.newBuildingBlock.budget
      }
      
      new EventComponent(newBlock)
        .for(calendar, event)
        .save()
        .then(res => {
          this.showCategoryModal = false
          location.reload()
        })
        .catch(error => {
          console.log('Error while saving ', error)
        })
    },
    getCategoryBlocks () {
      EventComponent.get()
        .then(res => {
          this.categoryBuildingBlocks = res
          this.filteredEventBlocks = _.map(
            this.categoryBuildingBlocks,
            function (item) {
              return item.title
            }
          )
          this.filteredEventBlocks.push('Other')
        })
        .catch(error => {
          console.log('Error ', error)
        })
    }
  },
  mounted () {
    this.getRemainingBudget()
    this.getEventBuildingBlocks()
    this.getCategoryBlocks()
    this.$on('refreshBuildingBlock', () => {
      this.getEventBuildingBlocks()
    })
  },
  watch: {
    event (newVal, oldVal) {
      // Get default event building blocks
      this.getEventBuildingBlocks()
      this.getRemainingBudget()
    },
    eventComponents (newVal, oldVal) {
      // Get default event building blocks
      this.getEventBuildingBlocks()
      this.getRemainingBudget()
    },
    elementsBudget (val) {
      this.switchingBudgetAndCost()
    }
  },
  filters: {
    withComma (amount) {
      return amount ? amount.toLocaleString() : 0
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/md/_colors.scss";

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
