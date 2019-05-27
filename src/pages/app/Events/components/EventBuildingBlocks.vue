<template>
    <div class="md-layout">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
        <div  class="proposals-management" >

            <md-card-content class="md-layout proposals-management_items">

                <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
                    <md-card class="info-card">
                        <div class="card-content">
                            <p class="category">Allocated budget</p>
                            <h3 class="title"><animated-number :value="event.allocatedBudget"></animated-number>
                            </h3>
                        </div>
                    </md-card>
                </div>
                <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
                    <md-card class="info-card">
                        <div class="card-content">
                            <p class="category">Actual cost</p>
                            <h3 class="title"><animated-number :value="245"></animated-number>
                            </h3>
                        </div>
                    </md-card>
                </div>
                <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
                    <md-card class="info-card">
                        <div class="card-content">
                            <p class="category">Diff</p>
                            <h3 class="title"><animated-number :value="245"></animated-number>
                            </h3>
                        </div>
                    </md-card>
                </div>
                <div class="md-layout-item md-size-100" style="display : none;">
                    <h3>Select services and set budget</h3>
                    <p>
                        We've added relevant services according to you'r event attributes. You can add new ones or remove existing.
                    </p>
                </div>

                <div class="md-layout-item md-size-100">
                    <md-card style="margin-top : 0;">
                        <md-card-content>
                            <md-table v-model="eventBuildingBlocks" table-header-color="blue" class="event-building-blocks_table">
                                <md-table-row slot="md-table-row" slot-scope="{ item }" :class="{parent : item.is_parent}" class="blocks-list_item">
                                    <md-table-cell md-label="Expanse" >{{ item.componentId }}</md-table-cell>
                                    <md-table-cell md-label="Requirements">
                                        <template v-if="!item.is_parent">
                                            {{`${item.values.length} selected`}} <md-button class="md-danger md-simple md-sm md-just-icon" @click="addRequirements(item)"><md-icon>edit</md-icon></md-button>
                                        </template>
                                    </md-table-cell>
                                    <md-table-cell md-label="Allocated budget">
                                        $<label-edit :text="item.allocatedBudget"  :field-name="item.componentId"  @text-updated-blur="blockBudgetChanged" @text-updated-enter="blockBudgetChanged"></label-edit>
                                    </md-table-cell>
                                    <md-table-cell md-label="Actual cost">
                                        <template v-if="item.is_wining">
                                            <md-button class="md-success md-simple actual-cost" >{{ `$${item.wininig.budget}`}} <md-button class="md-success md-simple md-sm md-just-icon wining-budget"><md-icon>open_in_new</md-icon></md-button></md-button>
                                        </template>
                                        <template v-else-if="item.values && item.values.length" >
                                            <md-button class="md-sm md-info" @click="reviewProposals(item)">Review proposals ({{item.values.length}})</md-button>
                                        </template>
                                        <template v-else-if="!item.is_parent">
                                            <div class="waiting-label" @click="reviewProposals(item)">Waiting for proposals</div>
                                        </template>
                                    </md-table-cell>
                                    <md-table-cell md-label="Comments">{{ item.comments }}</md-table-cell>
                                    <md-table-cell md-label="Actions">
                                        <md-button class="md-rose md-sm md-just-icon" @click="deleteBlock(item.id)"><md-icon>delete_outline</md-icon></md-button>
                                    </md-table-cell>
                                </md-table-row>
                            </md-table>
                            <md-button class="md-default md-simple add-new-block-btn" @click="showAddBuildingBlocksModal()" style="width:100%; font-weight: bold">Add new block +</md-button>
                        </md-card-content>
                    </md-card>
                </div>


                </md-card-content>
        </div>

    </div>


</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import swal from "sweetalert2";
  import Calendar from "@/models/Calendar";
  import CalendarEvent from "@/models/CalendarEvent"
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';
  import EventBlocks from "../components/NewEventBlocks";
  import AddBuildingBlockModal from "../components/EventBlocks/Modals/AddBuildingBlocks.vue";
  import EventBlockRequirements from "../components/EventBlocks/Modals/EventBlockRequirements.vue";
  import EventBlockProposals from "../components/EventBlocks/Modals/EventBlockProposals.vue";
  import _ from "underscore";
  import {LabelEdit,AnimatedNumber,StatsCard,ChartCard} from '@/components';



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
        event: Object,
        eventComponents: [Array,Function]

    },
    data: () => ({
        auth: auth,
        isLoading:true,
        tableData: [
            {
                is_parent : true,
                componentId : 'Food',
                allocatedBudget : 1700
            },
            {
                componentId: 'Carting',
                requirements: [],
                allocatedBudget: 1000,
                is_wining: true,
                values : [
                    {
                        title : ''
                    },
                    {
                        title : ''
                    }
                ],
                wininig : {
                    id: 123343123,
                    budget : 1200
                }
            },
            {
                componentId: 'Bar',
                requirements: [
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    }
                ],
                allocatedBudget: 500,
                is_wining: false,
                values : [
                    {
                        title : ''
                    },
                    {
                        title : ''
                    }
                ]
            },
            {
                componentId: 'Coffee',
                requirements: [
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    }
                ],
                allocatedBudget: 200,
                is_wining: false,
                values : []
            },
            {
                is_parent : true,
                componentId : 'Venue',
                allocatedBudget : 1700
            },
            {
                componentId: 'Carting',
                requirements: [],
                allocatedBudget: 1000,
                is_wining: true,
                values : [
                    {
                        title : ''
                    },
                    {
                        title : ''
                    }
                ],
                wininig : {
                    id: 123343123,
                    budget : 1200
                }
            },
            {
                componentId: 'Bar',
                requirements: [
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    }
                ],
                allocatedBudget: 500,
                is_wining: false,
                values : [
                    {
                        title : ''
                    },
                    {
                        title : ''
                    }
                ]
            },
            {
                componentId: 'Coffee',
                requirements: [
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    },
                    {
                        title :  'title here',
                        priority : 'Must Have'
                    }
                ],
                allocatedBudget: 200,
                is_wining: false,
                values : []
            }
        ],
        eventBuildingBlocks : []

    }),
    methods: {
        ...mapMutations("EventPlannerVuex", [
            "setBuildingBlockModal"
        ]),
        deleteBlock(blockId){

            swal({
                title: "Are you sure?",
                text: `You won't be able to revert this!`,
                showCancelButton: true,
                confirmButtonClass: "md-button md-success",
                cancelButtonClass: "md-button md-danger",
                confirmButtonText: "Yes, delete it!",
                buttonsStyling: false
            }).then(result => {
                if (result.value) {
                    this.isLoading = true;

                    let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
                    let event = new CalendarEvent({id: this.event.id});
                    let selected_block = new EventComponent({id : blockId});

                    selected_block.for(calendar,event).delete().then(resp => {
                        this.isLoading = false;
                        this.getEventBuildingBlocks();
                        this.$forceUpdate();
                    })
                        .catch(error => {
                            console.log(error);
                        })
                }
            });

        },
        getEventBuildingBlocks() {

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});

            new EventComponent().for(calendar, event).get()
                .then(res=> {

                    this.$set(this,'eventBuildingBlocks',res);
                })
                .catch(error => {
                    console.log('Error ', error);
                })
        },
        showAddBuildingBlocksModal() {
            window.currentPanel = this.$showPanel({
                component: AddBuildingBlockModal,
                cssClass: 'md-layout-item md-size-35 transition36 bg-grey',
                openOn: 'right',
                props: {event : this.event}
            });
        },
        blockBudgetChanged(val,index) {

            let block = _.find(this.eventBuildingBlocks,function(item){ return item.componentId == index; });

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});
            let selected_block = new  EventComponent({id : block.id});

            selected_block.calendarEvent = block.calendarEvent;
            selected_block.componentId = block.componentId;
            selected_block.icon = block.icon;
            selected_block.color = block.color;
            selected_block.todos = block.todos;
            selected_block.values = block.values;
            selected_block.vendors = block.vendors;
            selected_block.allocatedBudget = val;

            block.allocatedBudget = val;


            selected_block.for(calendar,event).save().then(resp => {

                this.isLoading = false;
                this.$notify(
                    {
                        message: 'Budget modified successfully!',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success'
                    })

                this.$bus.$emit('RefreshStatistics');


                this.$forceUpdate();
            })
                .catch(error => {
                    console.log(error);
                })

        },

        addRequirements(item) {
            window.currentPanel = this.$showPanel({
                component: EventBlockRequirements,
                cssClass: 'md-layout-item md-size-55 transition36 bg-grey',
                openOn: 'right',
                props: {event : this.event , selectedBlock : item}
            });
        },
        reviewProposals(item) {
            window.currentPanel = this.$showPanel({
                component: EventBlockProposals,
                cssClass: 'md-layout-item md-size-55 transition36 bg-grey',
                openOn: 'right',
                props: {event : this.event , selectedBlock : item}
            });
        }
    },
    created() {

    },
    mounted() {
        let _self = this;
        this.isLoading = false;

        console.log(this.event);

        // Get default event building blocks
        this.getEventBuildingBlocks();

        this.$bus.$on('BlockAdded', function () {
            _self.$notify(
                {
                    message: 'New Building Block added successfully',
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    type: 'success'
                })
            _self.getEventBuildingBlocks();
        })


    }
  }
</script>
<style lang="scss">

</style>
