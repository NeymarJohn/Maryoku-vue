<template>
  <div class="md-layout">
    <div class="md-layout-item mx-auto event-building-blocks">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-rose">
          <div class="md-layout-item show-cost-switch">
            <h4 class="title profile-title title-summary">
              Budget Table
            </h4>
            <label>Show Cost:</label>
            <md-field>
              <label></label>
              <md-select v-model="elementsBudget">
                <md-option value="element">Per Element</md-option>
                <md-option value="guest">Per Guest</md-option>
              </md-select>
            </md-field>
            <md-button class="md-default md-simple add-new-block-btn no-padding" style="color : #fff;"
                        @click="showAddBuildingBlocksModal()">
              <md-icon>add</md-icon> Add New
            </md-button>
          </div>
        </md-card-header>

        <md-card-content class="md-layout">
          <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>
          <table style="width:100%;" class="table event-building-blocks_table">
            <thead>
              <tr class="md-warning">
                <th>Element</th>
                <th>Brief</th>
                <th>Budget</th>
                <th>Actual cost</th>
                <th>
                </th>
              </tr>
            </thead>
            <tbody v-if="eventBuildingBlocks.length">
              <template v-for="(block,index) in eventBuildingBlocks">
                <!-- <tr class="parent">
                  <td>{{category.title}}</td>
                  <td></td>
                  <td class="allocated-budget">
                    <div class="md-table-cell-container">
                      <span class="dollar-sign pull-left small">$</span>
                      <span style="display: inline-block; width: 100%; padding-right: 16px;">
                        {{event.elementsBudgetPerGuest ? (category.totalAllocatedBudget / event.numberOfParticipants).toFixed(2) : category.totalAllocatedBudget.toFixed(2)}}
                      </span>
                      <span class="remains-budget badge badge-rose small" style="background-color: #fff;" v-if="category.remainsBudget">-${{parseInt(category.remainsBudget)}}</span>
                    </div>
                  </td>
                  <td class="actual-cost" :class="{disabled : category.totalActualCost==0}">
                    <span class="dollar-sign pull-left small">$</span>
                    {{event.elementsBudgetPerGuest ? (category.totalActualCost / event.numberOfParticipants).toFixed(2) : category.totalActualCost.toFixed(2)}}
                  </td>
                  <td></td>
                </tr> -->
                <tr class="text-left">
                  <td>{{block.title}}</td>
                  <td>
                    <template>
                      <div v-if="block.valuesCount"
                            style="cursor: pointer;">
                        <md-button class="md-simple md-xs requirements-cell-button no-padding"
                                    @click="addRequirements(block)">
                          <!-- {{`${block.valuesCount} selected`}} -->
                          Edit
                        </md-button>
                      </div>
                      <template v-else-if="!block.valuesCount">
                        <md-button class="md-info md-xs md-warning btn-add no-padding" @click="addRequirements(block)">
                          <!-- Set requirements -->
                          Add+
                        </md-button>
                      </template>
                    </template>
                  </td>
                  <td class="allocated-budget" :class="{required : !block.allocatedBudget || block.allocatedBudget == 0}">
                    <div class="md-table-cell-container" >
                      <span class="dollar-sign pull-left">$</span>
                      <label-edit v-if="!event.elementsBudgetPerGuest"  style="width: 100%; margin-left: 8px;" :text="block.allocatedBudget"
                                  :field-name="block.componentId"
                                  @text-updated-blur="blockBudgetChanged"
                                  @text-updated-enter="blockBudgetChanged"></label-edit>

                      <label-edit v-else style="width: 100%; margin-left: 8px;" :text="block.allocatedBudget ? (block.allocatedBudget / event.numberOfParticipants).toFixed(2).toString() : ''"
                                  :field-name="block.componentId"
                                  @text-updated-blur="blockBudgetChanged"
                                  @text-updated-enter="blockBudgetChanged"></label-edit>
                    </div>
                  </td>
                  <td class="actual-cost">
                    <template v-if="block.allocatedBudget">
                      <template
                        v-if="block.winningProposalId">
                        <md-button class="md-simple actual-cost md-xs" :class="block.allocatedBudget < block.winingProposal.cost ? `md-danger` : `md-success`" >
                          {{ event.elementsBudgetPerGuest ?  `$${(block.winingProposal.cost / event.numberOfParticipants).toFixed(2)}` : `$${block.winingProposal.cost.toFixed(2)}` }}
                          <md-icon >open_in_new</md-icon>
                        </md-button>
                      </template>
                    </template>
                    <event-actual-cost-icon-tooltip
                      :icon="'credit_card'"
                      :paid="3000"
                      :date="'2019/08/31'"
                    >
                    </event-actual-cost-icon-tooltip>
                  </td>
                  <td class="text-center">
                    <template>
                      <template
                        v-if="block.winningProposalId">
                        <md-button class="md-warning actual-cost md-xs" @click="reviewProposals(block,block.winningProposalId)">
                          View Order
                        </md-button>
                      </template>
                      <template v-else-if="(block.proposalsState == 'show-proposals' || block.proposalsState == 'waiting-for-proposals')">
                        <md-button class="md-xs md-info" @click="reviewProposals(block)">
                          Manage proposals
                          ({{block.proposalsCount}})
                        </md-button>
                      </template>
                      <template v-else-if="block.proposalsState == 'get-offers' ">
                        <md-button class="md-xs md-primary" @click="reviewProposals(block)">
                          Get Proposals
                          <md-icon>near_me</md-icon>
                        </md-button>
                      </template>
                    </template>
                    <md-button class="md-danger md-xs md-round md-just-icon pull-right" style="padding: 0;" @click="deleteBlock(block.id)">
                      <md-icon>delete</md-icon>
                    </md-button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import swal from 'sweetalert2'
  import Calendar from '@/models/Calendar'
  import CalendarEvent from '@/models/CalendarEvent'
  import EventComponent from '@/models/EventComponent'
  import VueElementLoading from 'vue-element-loading'
  // import auth from '@/auth';
  import EventBlocks from '../components/NewEventBlocks'
  import AddBuildingBlockModal from '../components/EventBlocks/Modals/AddBuildingBlocks.vue'
  import EventBlockRequirements from '../components/EventBlocks/Modals/EventBlockRequirements.vue'
  import EventActualCostIconTooltip from '../components/EventActualCostIconTooltip.vue'
  import EventBlockVendors from './EventBlocks/Modals/EventBlockVendors.vue'
  import ViewProposals from './EventBlocks/Modals/ViewProposals.vue'
  import _ from 'underscore'
  import {LabelEdit, AnimatedNumber, StatsCard, ChartCard} from '@/components'

  export default {
    name: 'event-building-blocks',
    components: {
      VueElementLoading,
      EventBlocks,
      AddBuildingBlockModal,
      LabelEdit,
      AnimatedNumber,
      StatsCard,
      ChartCard,
      EventActualCostIconTooltip,
    },
    props: {
      event: {
        type: Object,
        default: () => {
          return {statistics: {}}
        }
      },
      eventComponents: [Array, Function]

    },
    data: () => ({
      // auth: auth,
      isLoading: false,
      allocatedBudget: 0,
      eventBuildingBlocks: [],
      eventBuildingBlocksList: [],
      elementsBudget: 'element'

    }),
    methods: {
      ...mapMutations('EventPlannerVuex', [
        'setBuildingBlockModal'
      ]),
      deleteBlock(blockId) {

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

            let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
            let event = new CalendarEvent({id: this.event.id})
            let selected_block = new EventComponent({id: blockId})

            selected_block.for(calendar, event).delete().then(resp => {
              this.isLoading = false
              this.event.components.splice(_.findIndex(this.eventBuildingBlocks, (b)=>{ return b.id === selected_block.id}),1);
              this.getEventBuildingBlocks();
              this.$root.$emit('RefreshStatistics');
              this.$forceUpdate()

              let allocatedBudget = 0;
              this.eventBuildingBlocks.forEach(item => {
                allocatedBudget += Number(item.allocatedBudget);
              });

              this.allocatedBudget = allocatedBudget;
            })
              .catch(error => {
                console.log(error)
              })
          }
        })

      },
      /**
       * Get Event building blocks
       */
      getEventBuildingBlocks() {

        if (!this.event.id) return;

        this.isLoading = true;

        let res = this.event.components;

          this.$set(this, 'eventBuildingBlocks', res);
        // group event blocks by category name
        // this.eventBuildingBlocksList = _.chain(res).groupBy('category').map(function(value, key) {
        //
        //   let totalAllocatedBudget = 0, totalActualCost = 0;
        //
        //   value.forEach(function (item) {
        //     if (item.allocatedBudget) totalAllocatedBudget += item.allocatedBudget;
        //     if (item.winningProposalId) totalActualCost += item.winingProposal.cost;
        //   })
        //   return {
        //     title: key,
        //     blocks: _.sortBy(value, 'title'),
        //     totalAllocatedBudget : totalAllocatedBudget,
        //     totalActualCost : totalActualCost,
        //     remainsBudget : totalActualCost ? totalAllocatedBudget - totalActualCost : 0
        //   }
        //
        //
        // })
        //   .value();
        //
        // this.eventBuildingBlocksList = _.sortBy(this.eventBuildingBlocksList, 'title');

        console.log('event = > ',this.event.components);

        //let allocatedBudget = 0;
        // if (this.eventBuildingBlocks) {
        //   this.eventBuildingBlocks.forEach(item => {
        //     allocatedBudget += Number(item.allocatedBudget);
        //   });
        // }

        //this.allocatedBudget = allocatedBudget;
        //this.isLoading = this.event.componentsCount !== this.event.components.length;
          setTimeout(()=>{
              this.isLoading = false;
          },500)

          this.$forceUpdate();
      },
      showAddBuildingBlocksModal() {
        window.currentPanel = this.$showPanel({
          component: AddBuildingBlockModal,
          cssClass: 'md-layout-item md-size-35 transition36 bg-grey',
          openOn: 'right',
          props: {event: this.event}
        });
        window.currentPanel.promise.then(res=>{
          this.event.components.push(JSON.parse(JSON.stringify(res)));
          this.getEventBuildingBlocks();
        });
      },
      blockBudgetChanged(val, index) {

        let block = _.find(this.eventBuildingBlocks, function (item) {
          return item.componentId === index;
        });

        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: this.event.id});
        let selected_block = new EventComponent({id: block.id});

        selected_block.calendarEvent = block.calendarEvent;
        selected_block.componentId = block.componentId;
        selected_block.icon = block.icon;
        selected_block.color = block.color;
        selected_block.todos = block.todos;
        selected_block.values = block.values;
        selected_block.vendors = block.vendors;
        if (val) {
          if (val.toString().toLowerCase() === 'click to set') {
            selected_block.allocatedBudget = null;
            block.allocatedBudget = null;
          } else {
            selected_block.allocatedBudget = !this.event.elementsBudgetPerGuest ? val : val * this.event.numberOfParticipants;
            block.allocatedBudget = !this.event.elementsBudgetPerGuest ? val : val * this.event.numberOfParticipants;
          }
        } else {
          selected_block.allocatedBudget = null;
          block.allocatedBudget = null;
        }

        selected_block.for(calendar, event).save().then(resp => {

          this.isLoading = false;
          this.$root.$emit('RefreshStatistics');
          this.getEventBuildingBlocks();
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
            console.log(error)
          })

      },

      addRequirements(item) {

        if ( item.proposalsCount ) {
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
      reviewProposals(item, winnerId = null) {
        window.currentPanel = this.$showPanel({
          component: ViewProposals,
          cssClass: 'md-layout-item md-size-70 transition36 bg-grey',
          openOn: 'right',
          props: {event: this.event, selectedBlock: item, winnerId : winnerId, tab: winnerId != null ? 3 : 1}
        })
      },
      reviewVendors(item , categoryTitle) {
        window.currentPanel = this.$showPanel({
          component: EventBlockVendors,
          cssClass: 'md-layout-item md-size-65 transition36 bg-white',
          openOn: 'right',
          props: {event: this.event, selectedBlock: item, getOffers: true , categoryTitle : categoryTitle}
        })
        window.currentPanel.promise.then(res=>{
          let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
          let event = new CalendarEvent({id: this.event.id});
          new EventComponent().for(calendar, event).find(item.id).then(component => {
            this.event.components.splice(_.findIndex(this.event.components, (b)=>{ return b.id === item.id}),1);
            this.event.components.push(JSON.parse(JSON.stringify(component)));
            this.getEventBuildingBlocks();
          });
        });
      },
      showRequirementsSidepanel(item , winnerId = null) {
        const panelResult = this.$showPanel({
          component: ViewProposals,
          cssClass: 'md-layout-item md-size-70 transition36 bg-grey',
          openOn: 'right',
          props: {event: this.event, selectedBlock: item, winnerId : winnerId, tab: 0}
        });

        panelResult.promise.then(res=>{
          this.getEventBuildingBlocks();
        });
      },
        switchingBudgetAndCost() {
            let vm = this;
            vm.event.elementsBudgetPerGuest = !vm.event.elementsBudgetPerGuest;
        }
    },
    created() {

    },
    mounted() {

        this.getEventBuildingBlocks();


        this.$root.$on('refreshBuildingBlock', () => {
        this.getEventBuildingBlocks()
      });

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
        }
    }
  }
</script>
<style lang="scss">
  @import '@/assets/scss/md/_colors.scss';
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
    border-radius: 25px;
    width: 48px;
    min-width: 48px;
    .md-ripple {
      width: 48px;
      min-width: 48px;
    }
  }
</style>
