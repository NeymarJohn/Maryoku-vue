<template>
    <div >
        <md-card v-if="!selectedBlock" class="proposals-management">
            <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
            <md-card-header class="md-card-header-icon md-card-header-warning">
                <div class="card-icon">
                    <md-icon>mail_outline</md-icon>
                </div>
                <h4 class="title2">Proposal Management</h4>
            </md-card-header>
            <md-card-content class="md-layout proposals-management_items" v-if="buildingBlocksList.length">

                <div v-for="(block,index) in buildingBlocksList" :key="block.id" class="md-layout-item md-size-50">
                    <md-card class="proposals-management_item">
                        <md-card-header class="md-card-header-text card-success card-header" :style="`background-color:`+block.color">
                            <md-card-header-text>
                                <div class="md-title">{{block.value}}</div>
                                <div class="md-actions">
                                    <md-button class="md-button md-dense md-sm ">
                                        <md-icon>attach_file</md-icon>
                                    </md-button>
                                    <md-button class="md-button md-dense md-sm ">
                                        <md-icon>sms</md-icon>
                                    </md-button>
                                    <md-button class="md-button md-dense md-sm">
                                        <md-icon>delete_outline</md-icon>
                                    </md-button>
                                </div>
                            </md-card-header-text>
                        </md-card-header>

                        <md-card-content>
                            <div class="item-content">
                                <div class="personals-number"> 0 Personals</div>
                                <ul class="item-info">
                                    <li>
                                        <div class="">Allocated Budget</div>
                                        <div> - </div>
                                    </li>
                                    <li>
                                        <div class="">Best Proposal</div>
                                        <div>-</div>
                                    </li>
                                </ul>
                            </div>
                        </md-card-content>

                        <md-card-actions md-alignment="right">
                            <md-button @click="selectBlock(block.id)">Manage proposals</md-button>
                        </md-card-actions>
                    </md-card>

                </div>

                <!-- Add Block -->
                <div class="md-layout-item md-size-50">
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
        </md-card>
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
        eventComponents: Array

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

        }

    },
    created() {
      
    },
    mounted() {
        this.isLoading = false;

        let event = EventComponent.get()
            .then(res=> {
                this.$set(this,'buildingBlocksList',res);
                console.log(this.buildingBlocksList);
            })
            .catch(error => {
                console.log('Error ', error);
            })
    }
  }
</script>
<style lang="scss">

</style>
