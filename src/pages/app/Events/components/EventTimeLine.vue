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
                        <h5>{{block.type}}</h5>
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
        <div class="md-layout-item md-size-70 time-line-section">
            <h4>Timeline</h4>
            <md-button class="md-info md-sm preview-event" @click="previewEvent">
                Preview
            </md-button>

            <drop  @drop="handleDrop">
                <ul class="time-line-blocks_selected-items">
                    <li v-for="(item,index) in timelineItems" :key="index" class="time-line-blocks_selected-items_item time-line-item">
                        <md-icon class="time-line-blocks_icon" :style="`background : ` + item.color">{{item.icon}}</md-icon>

                        <md-card class="block-info" v-if="item.mode === 'saved' ">
                            <div class="card-actions">
                                <md-button  class="md-info md-sm md-just-icon md-simple md-round" @click="modifyItem(index)">
                                    <md-icon>create</md-icon>
                                </md-button>
                                <md-button  class="md-danger md-sm md-just-icon md-simple md-round" @click="removeItem(index)">
                                    <md-icon>delete_outline</md-icon>
                                </md-button>
                            </div>
                            <div class="item-title-and-time">
                                <span class="item-time" :style="`background : ` + item.color">
                                    {{item.from }} - {{item.to}}
                                </span>
                                <span class="item-title">
                                    {{item.title ? item.title : 'Title Bar' }}
                                </span>
                            </div>
                            <p class="item-desc">
                                {{ item.description }}
                            </p>
                        </md-card>

                        <md-card class="block-form" v-else="item.mode === 'edit' ">
                            <md-card-content class="md-layout">
                                <div class="md-layout-item md-size-50">
                                    <md-field >
                                        <label>From Time</label>
                                        <md-select v-model="item.from"
                                                   >
                                            <md-option v-for="hour in hoursArray"
                                                       :key="hour"
                                                       :value="hour">
                                                {{ hour }}
                                            </md-option>
                                        </md-select>
                                    </md-field>
                                </div>
                                <div class="md-layout-item md-size-50">
                                    <md-field >
                                        <label>To Time</label>
                                        <md-select v-model="item.to"
                                        >
                                            <md-option v-for="hour in hoursArray"
                                                       :key="hour"
                                                       :value="hour">
                                                {{ hour }}
                                            </md-option>
                                        </md-select>
                                    </md-field>
                                </div>
                                <div class="md-layout-item md-size-100">
                                    <md-field >
                                        <label>Optional title</label>
                                        <md-input
                                                v-model="item.title"
                                                type="text"
                                        ></md-input>
                                    </md-field>
                                </div>
                                <div class="md-layout-item md-size-100">
                                    <md-field >
                                        <label>Description</label>
                                        <md-input
                                                v-model="item.description"
                                                type="text"
                                        ></md-input>
                                    </md-field>
                                </div>
                            </md-card-content>
                            <md-card-actions md-alignment="left">
                                <md-button  class="md-info" @click="saveTimelineItem(index)">Save</md-button>
                            </md-card-actions>

                        </md-card>
                    </li>
                    <li class="time-line-blocks_selected-items_item">
                        <md-icon class="time-line-blocks_icon">add</md-icon>
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
                type : 'setup',
                icon : 'place',
                color : '#f44336'
            },
            {
                id : 2,
                type : 'activity',
                icon : 'notifications_active',
                color : '#4caf50'
            },
            {
                id: 3,
                type : 'meal',
                icon : 'restaurant',
                color : '#00bcd4'
            },
            {
                id: 4,
                type : 'DISCUSSION',
                icon : 'sms',
                color : '#ff9800'
            },
            {
                id: 5,
                type : 'TRANSPORTATION',
                icon : 'train',
                color : '#f44336'
            },
            {
                id: 6,
                type : 'RELAXATION',
                icon : 'weekend',
                color : '#4caf50'
            }
        ],
        timelineItems : [],
        hoursArray : []

    }),
    methods: {
      /**
       * Handle drop block to time line items
       * @param data
       * @param event
       */
      handleDrop(data,event){
          let block = Object.assign({}, data.block);
          block.mode = 'edit';
          this.timelineItems.push(Object.assign({}, data.block));
      },
        saveTimelineItem(index){
          this.$set(this.timelineItems[index],'mode','saved');
        },
        removeItem(index){
            this.timelineItems.splice(index,1);
        },
        modifyItem(index) {
            this.$set(this.timelineItems[index],'mode','edit');

        },
        previewEvent(){
            this.$router.push({ path: `/events/`+this.event.id })

        }

    },
    created() {
        [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
        [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
        [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`));

        this.hoursArray.push();
      
    },
    mounted() {
        this.isLoading = false;

    }
  }
</script>
<style lang="scss">

</style>
