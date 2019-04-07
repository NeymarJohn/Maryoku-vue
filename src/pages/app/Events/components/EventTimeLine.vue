<template>
    <div class="md-layout">
        <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
        <md-card  class="time-line-blocks md-layout-item md-size-30">
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
                        <h5>{{block.buildingBlockType}}</h5>
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
                        <md-card class="block-form" v-if="!item.dateCreated || item.mode === 'edit' ">
                            <md-card-content class="md-layout">
                                <div class="md-layout-item md-size-50">
                                    <md-field >
                                        <label>From Time</label>
                                        <md-select v-model="item.startTime"
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
                                        <md-select v-model="item.endTime"
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
                                <md-button  class="md-info" v-if="!item.dateCreated" @click="saveTimelineItem(item,index)">Save</md-button>
                                <md-button  class="md-info" v-else @click="updateTimelineItem(item,index)">Edit</md-button>
                            </md-card-actions>

                        </md-card>

                        <md-card class="block-info" v-else-if="!item.mode || item.mode === 'saved' ">
                            <div class="card-actions">
                                <md-button  class="md-info md-sm md-just-icon md-simple md-round" @click="modifyItem(index)">
                                    <md-icon>create</md-icon>
                                </md-button>
                                <md-button  class="md-danger md-sm md-just-icon md-simple md-round" @click="removeItem(item)">
                                    <md-icon>delete_outline</md-icon>
                                </md-button>
                            </div>
                            <div class="item-title-and-time">
                                <span class="item-time" :style="`background : ` + item.color">
                                    {{ item.startTime }} - {{item.endTime}}
                                </span>
                                <span class="item-title">
                                    {{item.title ? item.title : 'Title Bar' }}
                                </span>
                            </div>
                            <p class="item-desc">
                                {{ item.description }}
                            </p>
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
  import CalendarEvent from "@/models/CalendarEvent";
  import EventComponent from "@/models/EventComponent";
  import EventTimelineItem from '@/models/EventTimelineItem';
  import moment from 'moment';
  import swal from "sweetalert2";

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
        eventComponents: [Array,Function]

    },
    data: () => ({
        auth: auth,
        isLoading:true,
        blocksList : [
            {
                id : 1,
                buildingBlockType : 'setup',
                icon : 'place',
                color : '#f44336'
            },
            {
                id : 2,
                buildingBlockType : 'activity',
                icon : 'notifications_active',
                color : '#4caf50'
            },
            {
                id: 3,
                buildingBlockType : 'meal',
                icon : 'restaurant',
                color : '#00bcd4'
            },
            {
                id: 4,
                buildingBlockType : 'DISCUSSION',
                icon : 'sms',
                color : '#ff9800'
            },
            {
                id: 5,
                buildingBlockType : 'TRANSPORTATION',
                icon : 'train',
                color : '#f44336'
            },
            {
                id: 6,
                buildingBlockType : 'RELAXATION',
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
          console.log(block);
          this.timelineItems.push(Object.assign({}, data.block));
      },

        removeItem(item){

          this.isLoading = true;

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});

            let timelineItem = new EventTimelineItem({id: item.id}).for(calendar, event);

            timelineItem.delete().then(result => {
                this.getTimelineItems();

            }).catch(error => {
                console.log(error);
            })
        },
        modifyItem(index) {
            this.$set(this.timelineItems[index],'mode','edit');

        },
        previewEvent(){
            this.$router.push({ path: `/events/`+this.event.id })

        },
        getTimelineItems() {

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});

            new EventTimelineItem().for(calendar, event).get().then(res => {

                this.timelineItems = res;
                this.isLoading = false;

            })
        },
        saveTimelineItem(item,index) {
            this.isLoading = true;

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});
            let order = index++;

            new EventTimelineItem({
                event: { id: event.id},
                title: item.title,
                buildingBlockType: item.buildingBlockType,
                description: item.description,
                startTime: item.startTime,
                endTime: item.endTime,
                order: order,
                icon : item.icon,
                color : item.color
            }).for(calendar, event).save()
                .then(res => {

                    this.getTimelineItems();

                })
                .catch(error=>{
                    console.log(error);
                })

        },
        updateTimelineItem(item,index) {
            this.isLoading = true;

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});

            let timelineItem = new EventTimelineItem({id: item.id}).for(calendar, event);


            timelineItem.title = item.title;
            timelineItem.description = item.description;
            timelineItem.startTimeMillis = item.startTimeMillis;
            timelineItem.endTimeMillis = item.endTimeMillis;

            timelineItem.save().then(res=>{
                this.getTimelineItems();

            }).catch(error => {
                console.log(error)
            })
        }

    },
    created() {
        [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
        [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
        [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`));

        this.hoursArray.push();

        console.log(this.event);
      
    },
    mounted() {

        this.getTimelineItems();

    }
  }
</script>
<style lang="scss">

</style>
