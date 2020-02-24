<template>
  <div class="">
      <table class="event-blocks__table" >
          <thead>
          <tr>
              <th width="40%">Categories</th>
              <th width="20%">Planned</th>
              <th width="15%">Actual</th>
              <th width="15%">Status</th>
              <th></th>
          </tr>
          </thead>
      </table>
      <table class="event-blocks__table event-block-table"
             v-for="(block, index) in eventBuildingBlocks" :key="index"
      >

          <tbody >

          <template>
              <tr >
                  <td width="40%" class="vendor"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+2.png"> {{block.title}}</td>
                  <td class="planned" width="20%">
                      <label-edit v-if="type == 'total'"
                                  :text="block.allocatedBudget"
                                  :field-name="block.componentId"
                                  :sub-description="elementsBudget"
                                  :currency="'$'"
                                  :numeric="true"
                                  @text-updated-blur="blockBudgetChanged"
                                  @text-updated-enter="blockBudgetChanged"></label-edit>

                      <label-edit v-else-if="block.allocatedBudget && block.numberOfParticipants"
                                  :text="block.allocatedBudget ? (block.allocatedBudget / block.numberOfParticipants).toFixed(2).toString() : ''"
                                  :field-name="block.componentId"
                                  :sub-description="elementsBudget"
                                  :currency="'$'"
                                  :numeric="true"
                                  @text-updated-blur="blockBudgetChanged"
                                  @text-updated-enter="blockBudgetChanged"></label-edit>
                      <label-edit v-else
                                  :text="block.allocatedBudget ? (block.allocatedBudget / event.numberOfParticipants).toFixed(2).toString() : ''"
                                  :field-name="block.componentId"
                                  :sub-description="elementsBudget"
                                  :currency="'$'"
                                  :numeric="true"
                                  @text-updated-blur="blockBudgetChanged"
                                  @text-updated-enter="blockBudgetChanged"></label-edit>
                  </td>
                  <td class="actual red-label" width="15%">

                      <template v-if="block.allocatedBudget">

                          <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+29.png">
                          <template v-if="block.winningProposalId">
                              <md-button
                                  class="md-simple actual-cost md-xs"
                                  :class="block.allocatedBudget < block.winingProposal.cost ? `md-danger` : `md-success`"
                              >
                                  {{ event.elementsBudgetPerGuest ?  `$${(block.winingProposal.cost / event.numberOfParticipants).toFixed(2)}` : `$${block.winingProposal.cost.toFixed(2)}` }}
                                  <md-icon >open_in_new</md-icon>
                              </md-button>
                          </template>
                      </template>
                      <!-- v-if="block.downPaymentStatus == 'accepted'" -->
                      <event-actual-cost-icon-tooltip
                          :icon="'credit_card'"
                          :item="block"
                          :event="event"
                      />
                  </td>
                  <td class="status" width="15%">
                      <div >
                          <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+31.png">
                      </div>
                  </td>
                  <td class="expand">
                      <div @click="expandBlock(block)">
                          <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">
                      </div>
                  </td>
              </tr>
          </template>

          <template v-if="block.expanded">
              <tr class="details-row" v-for="(requirement,index) in block.predefinedRequirements" :key="index">
                  <td>{{requirement.title}}</td>
                  <td>$80</td>
                  <td class="actual red-label" colspan="3"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+29.png"> $100</td>
              </tr>
              <tr class="item-actions">
                  <td class="see-proposals">
                      <div>Relish Caterers & Venues</div>
                      <md-button class="md-rose md-simple see-proposal" >See Proposal</md-button>
                  </td>
                  <td colspan="4"  class="actions-list text-right">
                      <md-button class="md-simple" @click="reviewProposals(block)">Edit Proposal</md-button>
                      <md-button class="md-simple" @click="deleteBlock(block.id)">Cancel Proposal</md-button>
                  </td>
              </tr>
          </template>
          </tbody>
      </table>

      <table class="event-blocks__table actions-table">

          <tbody >
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
                  <md-button class="md-simple add-category-btn" @click="showAddEventElementsModal()">
                      <img src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2019.svg"> Add new category
                  </md-button>
              </td>
          </tr>

          <tr class="taxes">
              <td class="taxes-title">
                  <img src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2020.svg" width="20"> Tips <span class="percent">12%</span>
              </td>
              <td>
                  ${{totalBudgetTaxes}}
              </td>
              <td class="actual green-label"> <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+30.png"> $100</td>
              <td></td>
              <td class="expand">
                  <a href="">
                      <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+24.png">
                  </a>
              </td>
          </tr>
          <tr class="total">
              <td class="total-title">Total</td>
              <td class="total-value">${{totalBudget}}</td>
              <td colspan="3">${{totalActual}}</td>

          </tr>
          </tbody>

      </table>
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
  import AddEventElementsModal from '../components/EventBlocks/Modals/AddEventElements.vue'
  import EventBlockRequirements from '../components/EventBlocks/Modals/EventBlockRequirements.vue'
  import EventActualCostIconTooltip from '../components/EventActualCostIconTooltip.vue'
  import EventBlockVendors from './EventBlocks/Modals/EventBlockVendors.vue'
  import ViewProposals from './EventBlocks/Modals/ViewProposals.vue'
  import EventComponentVendor from "@/models/EventComponentVendor"
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
      eventComponents: [Array, Function],
        type  : {
          type : String,
            default : 'total'
        }
    },
    data: () => ({
      // auth: auth,
      isLoading: false,
      allocatedBudget: 0,
      eventBuildingBlocks: [],
      eventBuildingBlocksList: [],
      currentBlockId: null,
      elementsBudget: 'event',
        show : false,
        totalBudget : 0,
        totalActual : 0,
        totalBudgetTaxes : 0


    }),
    methods: {
      ...mapMutations('EventPlannerVuex', [
        'setBuildingBlockModal'
      ]),
        expandBlock(item){
            if (item.expanded){
                item.expanded = false;
            } else {
                this.eventBuildingBlocks.forEach((g)=>{
                    g.expanded = false;
                });
                item.expanded = true;
            }
            this.$forceUpdate();
        },
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

        let vm = this;

        this.isLoading = true;

        let res = this.event.components;
        this.$set(this, 'eventBuildingBlocks', res);
          setTimeout(()=> {
          this.isLoading = false;
        },500);

          this.eventBuildingBlocks.forEach((item)=> {
              console.log(item);

              if (item.allocatedBudget) {
                  vm.totalBudget +=item.allocatedBudget;
                  vm.totalBudgetTaxes  += item.allocatedBudget * .12;
              }
          })

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
      showAddEventElementsModal() {
        window.currentPanel = this.$showPanel({
          component: AddEventElementsModal,
          cssClass: 'md-layout-item md-size-35 transition36 bg-grey',
          openOn: 'right',
          props: {event: this.event, eventBuildingBlocks : this.eventBuildingBlocks}
        });
        window.currentPanel.promise.then(res=>{
          if (res.length > 0) {
            res.forEach(item => {
              this.event.components.push(JSON.parse(JSON.stringify(item)));
            })
          }
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

              if ( block.allocatedBudget && block.numberOfParticipants ) {
                  selected_block.allocatedBudget = this.type == 'total' ? val : val * block.numberOfParticipants;
                  block.allocatedBudget          = this.type == 'total' ? val : val * block.numberOfParticipants;
              } else {
                  selected_block.allocatedBudget = this.type == 'total' ? val : val * this.event.numberOfParticipants;
                  block.allocatedBudget          = this.type == 'total' ? val : val * this.event.numberOfParticipants;
              }

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

          console.log(' selected block ', selected_block);

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
      },
      setCurrentBlockId: function(currentBlock) {
        if (currentBlock) {
          this.currentBlockId = currentBlock.id;
        } else {
          this.currentBlockId = null;
        }
      }
    },
    created() {

        console.log(this.event);

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
      font-weight: 500!important;
      font-size: 12px!important;
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
    & > input[type=text] {
      font-size: 14px!important;
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
    width: 100%!important;
  }
  .cursor-pointer {
    cursor: pointer!important;
  }
</style>
