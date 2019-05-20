<template>
    <div class="md-layout">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
        <div v-if="!selectedBlock" class="proposals-management" >
            <md-card-content class="md-layout proposals-management_items">

                <div class="md-layout-item md-size-100">
                    <h3>Select services and set budget</h3>
                    <p>
                        We've added relevant services according to you'r event attributes. You can add new ones or remove existing.
                    </p>
                </div>

                <div v-for="(block,index) in buildingBlocksList" v-if="!block.childComponents" :key="block.id" class="md-layout-item md-xlarge-size-30 md-large-size-33 md-small-size-40">
                    <md-card class="proposals-management_item">
                        <md-card-header :class="`md-card-header-icon md-card-header-${block.color}`">
                            <div class="card-icon">
                                <md-icon>{{block.icon}}</md-icon>
                            </div>
                            <h4 class="title2">{{block.componentId}}</h4>
                            <md-card-actions md-alignment="right" class="item-actions">
                                <md-button name="event-planner-tab-budget-building-block-delete" class="md-button md-simple md-sm" @click="deleteBlock(block.id)">
                                    <md-icon>delete_outline</md-icon>
                                </md-button>
                            </md-card-actions>
                        </md-card-header>

                        <md-card-content>
                            <div class="item-content">
                                <ul class="item-info" v-if="!block.edit">
                                    <li>
                                        <div class="">Allocated Budget</div>
                                        <div class="budget-field">
                                            $<label-edit :text="block.allocatedBudget"  :field-name="index"  @text-updated-blur="blockBudgetChanged" @text-updated-enter="blockBudgetChanged"></label-edit>
                                        </div>
                                    </li>
                                </ul>
                                <div class="item-info-form md-layout" v-if="block.edit">
                                    <md-field class="md-layout-item md-size-50">
                                        <md-input type="number" placeholder="Example : $1400" v-model="block.allocatedBudget"></md-input>
                                    </md-field>
                                    <div class="md-layout-item md-size-30 ">
                                        <md-button name="event-planner-tab-budget-building-block-set-budget" class="md-info md-sm" @click="setBudget(block,index)">Set Budget</md-button>
                                    </div>
                                </div>
                            </div>
                        </md-card-content>

                        <md-card-actions md-alignment="right" v-if="!block.edit">
                            <md-button name="event-planner-tab-budget-building-block-create-inquiry" class="md-success md-sm" @click="selectBlock(block)">Create Inquiry</md-button>
                        </md-card-actions>
                    </md-card>

                </div>

                <!-- Add Block -->
                <div class="md-layout-item md-xlarge-size-30 md-large-size-33 md-small-size-40" @click="showAddBuildingBlocksModal()">
                    <md-card class="proposals-management_add-block" >
                        <md-card-content>
                            <md-icon>add</md-icon>
                            <div>Add building block</div>
                        </md-card-content>
                    </md-card>

                </div>
                <!-- ./Add Block -->

            </md-card-content>
        </div>
        <div class="md-layout-item md-size-100" v-else>
            <event-blocks :event="event" :event-components="eventComponents" :selectedBlock="selectedBlock" @go-to-building-blocks="resetSelectedBlock"></event-blocks>
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
  import AddBuildingBlockModal from "../components/EventBlocks/Modals/AddBuildingBlocks.vue"
  import _ from "underscore";
  import {LabelEdit} from '@/components';

  export default {
    name: 'event-building-blocks',
    components: {
        VueElementLoading,
        EventBlocks,
        AddBuildingBlockModal,
        LabelEdit
    },
    props: {
        event: Object,
        eventComponents: [Array,Function]

    },
    data: () => ({
        auth: auth,
        isLoading:true,
        buildingBlocksList : [],
        selectedBlock : null,
        categoryBuildingBlocks : []

    }),
    methods: {
        ...mapMutations("EventPlannerVuex", [
            "setBuildingBlockModal"
        ]),
        selectBlock(block) {
            this.$set(this,'selectedBlock',block);
        },
        resetSelectedBlock(){
            this.$set(this,'selectedBlock',null);
        },
        editBudget(index){

            this.buildingBlocksList[index].edit = this.buildingBlocksList[index].edit ? !this.buildingBlocksList[index].edit : true;
            this.$forceUpdate();

        },
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
        setBudget(block,index){

            this.editBudget(index);
            this.isLoading = true;

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});
            let selected_block = new EventComponent({id : block.id});

            selected_block.calendarEvent = block.calendarEvent;
            selected_block.componentId = block.componentId;
            selected_block.icon = block.icon;
            selected_block.color = block.color;
            selected_block.todos = block.todos;
            selected_block.values = block.values;
            selected_block.vendors = block.vendors;
            selected_block.allocatedBudget = block.allocatedBudget;

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
        getEventBuildingBlocks() {

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});

            new EventComponent().for(calendar, event).get()
                .then(res=> {
                    this.$set(this,'buildingBlocksList',res);
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
             //this.setBuildingBlockModal({ showModal: true });
        },
        blockBudgetChanged(val,index) {


            let block = this.buildingBlocksList[index];

            console.log(block);

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

            this.buildingBlocksList[index].allocatedBudget = val;


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

        }
    },
    created() {

    },
    mounted() {
        let _self = this;
        this.isLoading = false;

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
