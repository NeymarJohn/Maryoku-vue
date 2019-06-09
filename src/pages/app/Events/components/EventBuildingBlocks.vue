<template>
  <div class="md-layout" style="padding: 0; margin: 0;">
    <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
    <div class="md-layout-item mx-auto">
      <md-card class="proposals-management md-card-plain">

        <md-card-content class="md-layout proposals-management_items">

          <div class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-33">
            <md-card class="info-card">
              <div class="card-content">
                <p class="category">Allocated budget</p>
                <h3 class="title">$
                  <animated-number :value="allocatedBudget"></animated-number>
                </h3>
              </div>
            </md-card>
          </div>
          <div class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-33">
            <md-card class="info-card">
              <div class="card-content">
                <p class="category">Actual cost</p>
                <h3 class="title">$
                  <animated-number :value="0"></animated-number>
                </h3>
              </div>
            </md-card>
          </div>
          <div class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-33">
            <md-card class="info-card">
              <div class="card-content">
                <p class="category">Gap</p>
                <h3 class="title">$
                  <animated-number :value="0"></animated-number>
                </h3>
              </div>
            </md-card>
          </div>

          <div class="md-layout-item md-size-100">
            <md-card>

              <md-card-header class="md-card-header-text md-card-header-warning">

                <div class="card-text">
                  <h4 class="title" style="color: white;">Manage Proposals</h4>
                  <div class="ct-label">Set requirements</div>
                </div>

              </md-card-header>

              <md-card-content>
                <md-table v-if="eventBuildingBlocks.length" v-model="eventBuildingBlocks" table-header-color="orange" class="event-building-blocks_table"
                          style="max-width: 100%; overflow: auto;">
                  <md-table-row slot="md-table-row" slot-scope="{ item }" :class="{parent : item.is_parent}"
                                class="blocks-list_item">
                    <md-table-cell md-label="Expanse">{{ item.title }}</md-table-cell>

                    <md-table-cell md-label="Requirements">
                      <div v-if="!item.is_parent && item.values.length" style="cursor: pointer; text-align: center;vertical-align: middle;">
                        <md-button class="md-simple md-sm requirements-cell-button">
                          {{`${item.values.length} selected`}}
                          <md-icon class="text-danger">edit</md-icon>
                        </md-button>
                        <!--<span>{{`${item.values.length} selected`}}</span>
                        <md-button class="md-danger md-simple md-tiny md-just-icon pull-right" @click="addRequirements(item)">
                          <md-icon>edit</md-icon>
                        </md-button>-->
                      </div>
                      <template v-else-if="!item.is_parent && !item.values.length">
                        <md-button class="md-info md-sm" @click="addRequirements(item)">Set requirements</md-button>
                      </template>
                    </md-table-cell>

                    <!-- Allocated budget -->
                    <md-table-cell md-label="Allocated budget">
                      $
                      <label-edit :text="item.allocatedBudget" :field-name="item.componentId"
                                  @text-updated-blur="blockBudgetChanged"
                                  @text-updated-enter="blockBudgetChanged"></label-edit>
                    </md-table-cell>
                    <!-- ./Allocated budget -->

                    <!-- Actual Cost -->
                    <md-table-cell md-label="Actual cost">
                      <template v-if="item.winningProposalId">
                        <md-button class="md-success md-simple actual-cost">{{ `$${item.winningProposalId}`}}
                          <md-button class="md-success md-simple md-sm md-just-icon wining-budget">
                            <md-icon>open_in_new</md-icon>
                          </md-button>
                        </md-button>
                      </template>
                      <template v-else-if="item.proposals && item.proposals.length">
                        <md-button class="md-sm md-info" @click="reviewProposals(item)">Manage proposals
                          ({{item.proposals.length}})
                        </md-button>
                      </template>
                      <template v-else-if="!item.proposals.length && !item.vendors.length">
                        <md-button class="md-sm md-default" @click="reviewProposals(item)">Get Offers
                          <md-icon>near_me</md-icon>
                        </md-button>
                      </template>
                      <template v-else-if="!item.proposals.length && item.vendors.length">
                        <div class="waiting-label" @click="reviewVendors(item)">Waiting for proposals</div>
                      </template>
                    </md-table-cell>
                    <!-- ./Actual Cost -->

                    <md-table-cell md-label="Comments">{{ item.comments }}</md-table-cell>

                    <md-table-cell md-label="Actions">
                      <md-button class="md-rose md-sm md-just-icon" @click="deleteBlock(item.id)">
                        <md-icon>delete_outline</md-icon>
                      </md-button>
                    </md-table-cell>

                  </md-table-row>
                </md-table>
                <md-button class="md-default md-simple add-new-block-btn" @click="showAddBuildingBlocksModal()"
                           style="width:100%; font-weight: bold">Add new block +
                </md-button>
              </md-card-content>
            </md-card>
          </div>

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
      ChartCard
    },
    props: {
      event: {
        type: Object,
        default: ()=>{return { statistics: {}}}
      },
      eventComponents: [Array, Function]

    },
    data: () => ({
      // auth: auth,
      isLoading: false,
      allocatedBudget: 0,
      eventBuildingBlocks: []

    }),
    methods: {
      ...mapMutations('EventPlannerVuex', [
        'setBuildingBlockModal'
      ]),
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

            let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
            let event = new CalendarEvent({id: this.event.id})
            let selected_block = new EventComponent({id: blockId})

            selected_block.for(calendar, event).delete().then(resp => {
              this.isLoading = false
              this.getEventBuildingBlocks()
              this.$forceUpdate()

              let allocatedBudget = 0;
              this.eventBuildingBlocks.forEach(item=>{
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
      getEventBuildingBlocks () {

        this.isLoading = true;

        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: this.event.id});

        new EventComponent().for(calendar, event).get()
          .then(res => {

            console.log(' event blocks ', res);

            this.$set(this, 'eventBuildingBlocks', res);

            let allocatedBudget = 0;
            this.eventBuildingBlocks.forEach(item=>{
              allocatedBudget += Number(item.allocatedBudget);
            });

            this.allocatedBudget = allocatedBudget;

            this.isLoading = false;
          })
          .catch(error => {
            console.log('Error ', error)
          })
      },
      showAddBuildingBlocksModal () {
        window.currentPanel = this.$showPanel({
          component: AddBuildingBlockModal,
          cssClass: 'md-layout-item md-size-35 transition36 bg-grey',
          openOn: 'right',
          props: {event: this.event}
        })
      },
      blockBudgetChanged (val, index) {

        let block = _.find(this.eventBuildingBlocks, function (item) {
          return item.componentId == index;
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
        if (val){
          if (val.toString().toLowerCase() === 'click to set'){
            selected_block.allocatedBudget = null;
            block.allocatedBudget = null;
          } else {
            selected_block.allocatedBudget = val;
            block.allocatedBudget = val;
          }
        } else {
          selected_block.allocatedBudget = null;
          block.allocatedBudget = null;
        }

        selected_block.for(calendar, event).save().then(resp => {

          this.isLoading = false;
          this.$bus.$emit('RefreshStatistics');
          this.$forceUpdate();

          let allocatedBudget = 0;
          this.eventBuildingBlocks.forEach(item=>{
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

      addRequirements (item) {
        window.currentPanel = this.$showPanel({
          component: EventBlockRequirements,
          cssClass: 'md-layout-item md-size-55 transition36 bg-grey',
          openOn: 'right',
          props: {event: this.event, selectedBlock: item}
        })
      },
      reviewProposals (item) {
        window.currentPanel = this.$showPanel({
          component: ViewProposals,
          cssClass: 'md-layout-item md-size-55 transition36 bg-grey',
          openOn: 'right',
          props: {event: this.event, selectedBlock: item}
        })
      },
      reviewVendors (item) {
        window.currentPanel = this.$showPanel({
          component: EventBlockVendors,
          cssClass: 'md-layout-item md-size-55 transition36 bg-grey',
          openOn: 'right',
          props: {event: this.event, selectedBlock: item}
        })
      }
    },
    created () {

    },
    mounted () {

      this.isLoading = true;
      console.log(this.event);

      this.$bus.$on('BlockAdded', ()=>{
        this.getEventBuildingBlocks()
      });

    },
    watch: {
      event(newVal, oldVal){
        // Get default event building blocks
        this.getEventBuildingBlocks();
      }
    }
  }
</script>
<style lang="scss">
  .requirements-cell-button {
    &.md-icon:hover {
      visibility: hidden;
    }
    &.md-icon:hover {
      visibility: visible;
    }
  }
</style>
