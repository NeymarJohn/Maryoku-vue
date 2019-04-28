<template>
    <div class="md-layout">
        <div v-if="!selectedBlock" class="proposals-management" >
            <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
            <md-card-content class="md-layout proposals-management_items" v-if="categoryBuildingBlocks.length">

                <div class="md-layout-item md-size-100">
                    <h3>Select services and set budget</h3>

                    <p>
                        We've added relevant services according to you'r event attributes. You can add new ones or remove existing.
                    </p>
                </div>

                <div v-for="(block,index) in buildingBlocksList" v-if="!block.childComponents" :key="block.id" class="md-layout-item md-xlarge-size-30 md-large-size-33 md-small-size-40">
                    <md-card class="proposals-management_item">
                        <md-card-header class="md-card-header-icon md-card-header-warning">
                            <div class="card-icon">
                                <md-icon>{{getBlockIcon(block.componentId)}}</md-icon>
                            </div>
                            <h4 class="title2">{{getBlockTitle(block.componentId)}}</h4>
                            <md-card-actions md-alignment="right" class="item-actions">
                                <md-button name="event-planner-tab-budget-building-block-delete" class="md-button md-simple md-sm">
                                    <md-icon>delete_outline</md-icon>
                                </md-button>
                            </md-card-actions>

                        </md-card-header>

                        <md-card-content>
                            <div class="item-content">
                                <ul class="item-info" v-if="!block.edit">
                                    <li>
                                        <div class="">Allocated Budget</div>
                                        <div>
                                            <md-button name="event-planner-tab-budget-building-block-allocated-budget-edit" class="md-button md-simple md-sm edit-block" @click="editBudget(index)">
                                                <md-icon>edit</md-icon>
                                            </md-button>
                                            <span>{{block.budget ? '$' + block.budget : '$0.0'}}</span>
                                        </div>
                                    </li>
                                </ul>
                                <div class="item-info-form md-layout" v-if="block.edit">
                                    <md-field class="md-layout-item md-size-70">
                                        <md-input type="number" placeholder="Example : $1400" v-model="block.budget"></md-input>
                                    </md-field>
                                    <div class="md-layout-item md-size-30 ">
                                        <md-button name="event-planner-tab-budget-building-block-set-budget" class="md-info md-sm" @click="setBudget(block.budget,index)">Set Budget</md-button>
                                    </div>
                                </div>
                            </div>
                        </md-card-content>

                        <md-card-actions md-alignment="right" v-if="!block.edit">
                            <md-button name="event-planner-tab-budget-building-block-create-inquiry" class="md-success md-sm" @click="selectBlock(block.id)">Create Inquiry</md-button>
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

            <div class="proposals-management_keys">
                <ul class="keys_list">
                    <li class="list-item item-success">
                        Products
                    </li>
                    <li class="list-item item-warning">
                        Services
                    </li>
                    <li class="list-item item-info">
                        Content
                    </li>
                    <li class="list-item item-rose">
                        Space
                    </li>
                    <li class="list-item item-default">
                        Catering
                    </li>
                </ul>
            </div>
        </div>
        <div class="md-layout-item md-size-100" v-else>
            <event-blocks :event="event" :event-components="eventComponents" @go-to-building-blocks="resetSelectedBlock"></event-blocks>
        </div>


        <!-- Add Building Block Modal -->
        <add-building-block-modal :event="event" :categoryBuildingBlocks="categoryBuildingBlocks" rel="addBuildingBlockModal"></add-building-block-modal>
        <!-- ./Add Building Block Modal -->
    </div>

</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar";
  import CalendarEvent from "@/models/CalendarEvent"
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';
  import EventBlocks from "../components/NewEventBlocks";
  import AddBuildingBlockModal from "../components/EventBlocks/Modals/AddBuildingBlocks.vue"
  import _ from "underscore";

  export default {
    name: 'event-building-blocks',
    components: {
        VueElementLoading,
        EventBlocks,
        AddBuildingBlockModal
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
        selectBlock(blockId) {
            this.$set(this,'selectedBlock',blockId);
        },
        resetSelectedBlock(){
            this.$set(this,'selectedBlock',null);
        },
        editBudget(index){

            this.buildingBlocksList[index].edit = this.buildingBlocksList[index].edit ? !this.buildingBlocksList[index].edit : true;
            this.$forceUpdate();

        },
        setBudget(budget,index){
            this.editBudget(index);
        },
        getEventBuildingBlocks() {

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});

            new EventComponent().for(calendar, event).get()
                .then(res=> {
                    this.$set(this,'buildingBlocksList',res);
                    console.log('buildingBlocksList',res);
                })
                .catch(error => {
                    console.log('Error ', error);
                })
        },
        getCategoryBlocks() {
            EventComponent.get()
                .then(res=> {
                    this.$set(this,'categoryBuildingBlocks',res);
                    console.log('categoryBuildingBlocks',res);

                })
                .catch(error => {
                    console.log('Error ', error);
                })
        },
        getBlockIcon(blockId) {
            let block = _.findWhere(this.categoryBuildingBlocks, {id: blockId});
            return block.icon;
        },
        getBlockTitle(blockId) {
            let block = _.findWhere(this.categoryBuildingBlocks, {id: blockId});
            return block.value;
        },
        showAddBuildingBlocksModal() {
             this.setBuildingBlockModal({ showModal: true });
        }
    },
    created() {

    },
    mounted() {
        this.isLoading = false;

        // Get default event building blocks
        this.getEventBuildingBlocks();

        // Get all building blocks for selected category
        this.getCategoryBlocks();
    }
  }
</script>
<style lang="scss">

</style>
