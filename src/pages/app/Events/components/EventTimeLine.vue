<template>
    <div class="md-layout">
        <md-card v-if="!selectedBlock" class="timeline-blocks md-layout-item md-size-30">
            <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
            <md-card-header class="md-card-header-icon md-card-header-warning">
                <div class="card-icon">
                    <md-icon>extension</md-icon>
                </div>
                <h4 class="title2">Building Blocks</h4>
            </md-card-header>
            <md-card-content class="md-layout timeline-blocks_items" v-if="buildingBlocksList.length">

                <h4>
                    You can drag and drop the blocks to complete your timeline project.
                </h4>
                <div v-for="(block,index) in blocksList" :key="block.id" class="md-layout-item md-size-100">

                    <div class="timeline-block_item" :style="`color : #fff;background: ` + block.color">
                        <md-icon>{{block.icon}}</md-icon>
                        <h5>{{block.title}}</h5>
                    </div>

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
        selectedBlock : null,
        blocksList : [
            {
                id : 1,
                title : 'setup',
                icon : 'place',
                color : '#f44336'
            },
            {
                id : 2,
                title : 'activity',
                icon : 'notifications_active',
                color : '#4caf50'
            },
            {
                id: 3,
                title : 'meal',
                icon : 'restaurant',
                color : '#00bcd4'
            }
        ]

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
            })
            .catch(error => {
                console.log('Error ', error);
            })
    }
  }
</script>
<style lang="scss">

</style>
