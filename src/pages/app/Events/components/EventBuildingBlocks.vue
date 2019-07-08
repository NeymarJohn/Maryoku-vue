<template>
    <div class="md-layout" style="padding: 0; margin: 0;">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
        <div class="md-layout-item mx-auto event-building-blocks">
            <md-card  >

                <md-card-header  class="md-card-header-text md-card-header-warning">
                    <div class="card-text">
                        <h4 class="title" style="color: white;">
                            Manage Budget
                        </h4>
                    </div>
                </md-card-header>

                <md-card-content class="md-layout">

                    <table style="width:100%;" class="table event-building-blocks_table" v-if="eventBuildingBlocksList.length">
                        <thead>
                            <tr class="md-warning">
                                <th> Expenses </th>
                                <th>Requirements</th>
                                <th>Allocated budget</th>
                                <th>Actual cost</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        <template v-for="(category,index) in eventBuildingBlocksList" v-if="category.title != 'null'">
                            <tr class="parent">
                                <td>{{category.title}}</td>
                                <td></td>
                                <td class="allocated-budget">
                                    <span class="dollar-sign">$</span>
                                    {{category.totalAllocatedBudget}}
                                    <span class="remains-budget" v-if="category.remainsBudget">-${{parseInt(category.remainsBudget)}}</span>
                                </td>
                                <td class="actual-cost" :class="{disabled : category.totalActualCost==0}">${{category.totalActualCost}}</td>
                                <td></td>
                            </tr>

                            <tr v-for="(block,index) in category.blocks">
                                <td>{{block.title}}</td>
                                <td>
                                    <template >
                                        <div v-if="!block.is_parent && block.values.length"
                                             style="cursor: pointer;">
                                            <md-button class="md-simple md-xs requirements-cell-button"
                                                       @click="addRequirements(block)">
                                                {{`${block.values.length} selected`}}
                                                <md-icon class="text-danger">edit</md-icon>
                                            </md-button>
                                        </div>
                                        <template v-else-if="!block.is_parent && !block.values.length">
                                            <md-button class="md-info md-xs md-simple" @click="addRequirements(block)">
                                                Set requirements
                                            </md-button>
                                        </template>
                                    </template>

                                </td>
                                <td class="allocated-budget" style="width: 15%;" :class="{required : !block.allocatedBudget || block.allocatedBudget == 0}">
                                    <div class="md-table-cell-container" >
                                        <span class="dollar-sign">$</span>
                                        <label-edit style="width: 100%;" :text="block.allocatedBudget ? block.allocatedBudget.toString() : ''"
                                                    :field-name="block.componentId"
                                                    @text-updated-blur="blockBudgetChanged"
                                                    @text-updated-enter="blockBudgetChanged"></label-edit>
                                    </div>

                                </td>
                                <td class="actual-cost" style="width: 15%;">
                                    <template v-if="block.allocatedBudget">
                                        <template
                                            v-if="block.winningProposalId">
                                            <md-button class="md-simple actual-cost md-xs" :class="block.allocatedBudget < block.winingProposal.cost ? `md-danger` : `md-success`" >
                                                {{ `$${block.winingProposal.cost}`}}
                                                <md-icon >open_in_new</md-icon>
                                            </md-button>
                                        </template>
                                    </template>

                                </td>
                                <td class="text-center">
                                    <template v-if="block.allocatedBudget">
                                        <template
                                            v-if="block.winningProposalId">
                                            <md-button class="md-warning actual-cost md-xs" @click="reviewProposals(block,block.winningProposalId)">
                                                View Order
                                            </md-button>
                                        </template>
                                        <template v-else-if="(block.proposalsState == 'show-proposals' || block.proposalsState == 'waiting-for-proposals') &&  block.values.length">
                                            <md-button class="md-xs md-info" @click="reviewProposals(block)">
                                                Manage proposals
                                                ({{block.proposals.length}})
                                            </md-button>
                                        </template>
                                        <template v-else-if="block.proposalsState == 'get-offers' && block.values.length">
                                            <md-button class="md-xs md-primary" @click="reviewVendors(block, category.title)">
                                                Get Proposals
                                                <md-icon>near_me</md-icon>
                                            </md-button>
                                        </template>
                                        <md-button class="md-danger md-xs md-round md-just-icon pull-right" style="padding: 0;" @click="deleteBlock(block.id)">
                                            <md-icon>delete</md-icon>
                                        </md-button>
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <md-button class="md-default md-simple add-new-block-btn"
                                               @click="showAddBuildingBlocksModal()"
                                               style="width:100%; font-weight: bold">Add new block +
                                    </md-button>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
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
    import EventBlockVendors from './EventBlocks/Modals/EventBlockVendors.vue'
    import ViewProposals from './EventBlocks/Modals/ViewProposals.vue'
    import _ from 'underscore'
    import {LabelEdit, AnimatedNumber, StatsCard, ChartCard} from '@/components'
    import Tab from 'uiv/src/components/tabs/Tab'

    export default {
        name: 'event-building-blocks',
        components: {
            Tab,
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
                            this.getEventBuildingBlocks();
                            this.$bus.$emit('RefreshStatistics');
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

                let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
                let event = new CalendarEvent({id: this.event.id});


                new EventComponent().for(calendar, event).get()
                    .then(res => {

                        this.$set(this, 'eventBuildingBlocks', res);

                        // group event blocks by category name
                        this.eventBuildingBlocksList = _.chain(res).groupBy('category').map(function(value, key) {

                            let totalAllocatedBudget = 0, totalActualCost = 0;


                            value.forEach(function (item) {
                                if (item.allocatedBudget) totalAllocatedBudget += item.allocatedBudget;
                                if (item.winningProposalId) totalActualCost += item.winingProposal.cost;
                            })
                            return {
                                title: key,
                                blocks: value,
                                totalAllocatedBudget : totalAllocatedBudget,
                                totalActualCost : totalActualCost,
                                remainsBudget : totalActualCost ? totalAllocatedBudget - totalActualCost : 0
                            }


                            })
                            .value();

                        let allocatedBudget = 0;
                        this.eventBuildingBlocks.forEach(item => {
                            allocatedBudget += Number(item.allocatedBudget);
                        });

                        console.log(this.eventBuildingBlocks);

                        this.allocatedBudget = allocatedBudget;
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.log('Error ', error)
                    })
            },
            showAddBuildingBlocksModal() {
                window.currentPanel = this.$showPanel({
                    component: AddBuildingBlockModal,
                    cssClass: 'md-layout-item md-size-35 transition36 bg-grey',
                    openOn: 'right',
                    props: {event: this.event}
                })
            },
            blockBudgetChanged(val, index) {

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
                if (val) {
                    if (val.toString().toLowerCase() === 'click to set') {
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

                if ( item.proposals.length ) {
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
                    cssClass: 'md-layout-item md-size-70 transition36',
                    openOn: 'right',
                    props: {event: this.event, selectedBlock: item, winnerId : winnerId}
                })
            },
            reviewVendors(item , categoryTitle) {
                window.currentPanel = this.$showPanel({
                    component: EventBlockVendors,
                    cssClass: 'md-layout-item md-size-55 transition36 bg-grey',
                    openOn: 'right',
                    props: {event: this.event, selectedBlock: item, getOffers: true , categoryTitle : categoryTitle}
                })
            },
            showRequirementsSidepanel(item) {
                window.currentPanel = this.$showPanel({
                    component: EventBlockRequirements,
                    cssClass: 'md-layout-item md-size-55 transition36 bg-grey',
                    openOn: 'right',
                    props: {event: this.event, selectedBlock: item, predefinedRequirements: item.predefinedRequirements}
                })
            }
        },
        created() {

        },
        mounted() {

            this.getEventBuildingBlocks();

            this.$bus.$on('refreshBuildingBlock', () => {
                this.getEventBuildingBlocks()
            });

        },
        watch: {
            event(newVal, oldVal) {
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
