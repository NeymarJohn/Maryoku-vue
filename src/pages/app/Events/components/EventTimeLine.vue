<template>
    <div class="md-layout">
        <md-card  class="time-line-blocks md-layout-item md-size-30">
            <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
            <md-card-header class="md-card-header-icon md-card-header-warning">
                <div class="card-icon">
                    <md-icon>extension</md-icon>
                </div>
                <h4 class="title2">Building Blocks</h4>
            </md-card-header>
            <md-card-content class="md-layout time-line-blocks_items">

                <h5 class="section-desc">
                    You can drag and drop the blocks to complete your timeline project.
                </h5>
                <div v-for="(block,index) in blocksList" :key="block.id" class="md-layout-item md-size-100">

                    <drag :transfer-data="{ block }" class="time-line-blocks_item " :style="`background: ` + block.color">
                        <md-icon>{{block.icon}}</md-icon>
                        <h5>{{block.title}}</h5>
                    </drag>

                </div>

                <!-- Add Block -->
                <div class="md-layout-item md-size-100">
                    <div class="time-line-blocks_item" style="background: #00bcd4">
                        <md-icon>add</md-icon>
                        <h5>Add your own</h5>
                    </div>
                </div>
                <!-- ./Add Block -->

            </md-card-content>
        </md-card>
        <div class="md-layout-item md-size-70">
            <h4>Timeline</h4>

            <drop  @drop="handleDrop">
                <ul class="time-line-blocks_selected-items">
                    <li v-for="(item,index) in timelineItems" :key="item.id" class="time-line-blocks_selected-items_item time-line-item">
                        <md-icon :style="`background : ` + item.color">{{item.icon}}</md-icon>

                        <md-card >
                            <div class="item-title-and-time">
                                <span class="item-time" :style="`background : ` + item.color">
                                    8:30 AM - 10:30 AM
                                </span>
                                <span class="item-title">
                                    Title bar
                                </span>
                            </div>
                            <p class="item-desc">
                                Meeting place and setup time can be described here
                            </p>
                        </md-card>
                    </li>
                    <li class="time-line-blocks_selected-items_item">
                        <md-icon>add</md-icon>
                        <md-card class="drag-here">
                            Drag and drop a building block here
                        </md-card>
                    </li>
                </ul>
            </drop>
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
  import draggeble from 'vuedraggable';
  import { Drag, Drop } from 'vue-drag-drop';

  export default {
    name: 'event-building-blocks',
    components: {
        VueElementLoading,
        EventBlocks,
        draggeble, Drag, Drop
    },
    props: {
        event: Object,
        eventComponents: Array

    },
    data: () => ({
        auth: auth,
        isLoading:true,
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
            },
            {
                id: 4,
                title : 'DISCUSSION',
                icon : 'sms',
                color : '#ff9800'
            },
            {
                id: 5,
                title : 'TRANSPORTATION',
                icon : 'train',
                color : '#f44336'
            },
            {
                id: 6,
                title : 'RELAXATION',
                icon : 'weekend',
                color : '#4caf50'
            }
        ],
        timelineItems : []

    }),
    methods: {
      /**
       * Handle drop block to time line items
       * @param data
       * @param event
       */
      handleDrop(data,event){
          console.log(data.block);
          this.timelineItems.push(data.block);
          console.log(this.timelineItems);
      }

    },
    created() {
      
    },
    mounted() {
        this.isLoading = false;

    }
  }
</script>
<style lang="scss">

</style>
