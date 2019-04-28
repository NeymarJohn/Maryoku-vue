<template>
    <div class="md-layout">
        <div v-if="!selectedBlock" class="proposals-management" >
            <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
            <md-card-content class="md-layout proposals-management_items" v-if="buildingBlocksList.length">

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
                                <md-icon>{{block.icon}}</md-icon>
                            </div>
                            <h4 class="title2">{{block.value}}</h4>
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
                <div class="md-layout-item md-xlarge-size-30 md-large-size-33 md-small-size-40">
                    <md-card class="proposals-management_add-block">
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
    </div>

</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar";
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';
  import EventBlocks from "../components/NewEventBlocks";

  export default {
    name: 'event-building-blocks',
    components: {
        VueElementLoading,
        EventBlocks
    },
    props: {
        event: Object,
        eventComponents: [Array,Function]

    },
    data: () => ({
        auth: auth,
        isLoading:true,
        buildingBlocksList : [],
        selectedBlock : null

    }),
    methods: {
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
        }
    },
    created() {

    },
    mounted() {
        this.isLoading = false;

        let event = EventComponent.get()
            .then(res=> {
                this.$set(this,'buildingBlocksList',res);
                console.log('buildingBlocksList ', res);
            })
            .catch(error => {
                console.log('Error ', error);
            })
    }
  }
</script>
<style lang="scss">

</style>
