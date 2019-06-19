<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
    <md-card class="time-line-blocks md-layout-item md-xlarge-size-15 md-large-size-20 md-small-size-30">
      <md-card-header class="md-card-header-icon md-card-header-warning">
        <div class="card-icon">
          <md-icon>extension</md-icon>
        </div>
        <h4 class="title2">Building Blocks</h4>
      </md-card-header>
      <md-card-content class="md-layout time-line-blocks_items">

        <h5 class="section-desc">
          Create a timeline of your event by dragging timeline items.
        </h5>
        <div v-for="(block,index) in blocksList" :key="block.id" class="md-layout-item md-size-100">

          <drag :transfer-data="{ block }" class="time-line-blocks_item "
                :style="`background: ` + block.color">
            <md-icon>{{block.icon}}</md-icon>
            <h5>{{block.buildingBlockType}}</h5>
          </drag>

        </div>

      </md-card-content>
    </md-card>
    <div class="md-layout-item md-xlarge-size-50 md-large-size-55 md-small-size-65 time-line-section mr-auto" style="margin-left: 48px;">
      <h4>Timeline</h4>
      <!--<md-button name="event-planner-tab-timeline-preview" class="event-planner-tab-timeline-preview md-info md-sm preview-event" @click="previewEvent">
        Preview
      </md-button>-->

      <drop @drop="handleDrop" style="height: 100%;">
        <draggable :list="timelineItems" class="time-line-blocks_selected-items" :options="{disabled : disabledDragging}">
          <div v-for="(item,index) in timelineItems" :key="index"
               class="time-line-blocks_selected-items_item time-line-item">
            <md-icon class="time-line-blocks_icon" :style="`background : ` + item.color">{{item.icon}}
            </md-icon>
            <md-card class="block-form" v-if="!item.dateCreated || item.mode === 'edit' ">
              <vue-element-loading :active.sync="item.isItemLoading" spinner="ring" color="#FF547C"/>
              <md-card-content class="md-layout">
                <div class="md-layout-item md-size-50">
                  <md-field >
                    <input-mask v-focus placeholder="From Time e.g:08:00 AM" class="md-input"  v-model="item.startTime" mask="99:99 aa" maskChar="_"></input-mask>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-50">
                  <md-field >
                    <input-mask placeholder="To Time e.g:10:00 PM" class="md-input"  v-model="item.endTime" mask="99:99 aa" maskChar="_"></input-mask>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field >
                    <label>Title</label>
                    <md-input
                      v-model="item.title"
                      type="text"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field>
                    <label>Description</label>
                    <md-input
                      v-model="item.description"
                      type="text"
                    ></md-input>
                  </md-field>
                </div>
              </md-card-content>
              <md-card-actions md-alignment="right" style="border: none;">
                <md-button name="event-planner-tab-timeline-item-save" class="event-planner-tab-timeline-item-save md-danger md-simple"
                           @click="cancelTimelineItem(item,index)">Cancel
                </md-button>
                <md-button :disabled="item.isItemLoading" name="event-planner-tab-timeline-item-save" class="event-planner-tab-timeline-item-save md-info" v-if="!item.dateCreated"
                           @click="saveTimelineItem(item,index)">Save
                </md-button>
                <md-button :disabled="item.isItemLoading" name="event-planner-tab-timeline-item-edit" class="event-planner-tab-timeline-item-edit md-info" v-else @click="updateTimelineItem(item)">Save
                </md-button>
              </md-card-actions>

            </md-card>

            <md-card class="block-info" v-if="!item.mode || item.mode === 'saved' ">
              <vue-element-loading :active.sync="item.isItemLoading" spinner="ring" color="#FF547C"/>
              <md-card-content style="min-height: 80px;">
                <div class="card-actions" style="width: 100%; text-align: right;">
                  <span class="item-time md-xs pull-left" style="display: inline-block; margin-top: 3px; padding: 2px 12px !important; margin-right: 0; font-size: 1.6vmin;" :style="`background : ` + item.color">{{ item.startTime }} - {{item.endTime}}</span>
                  <md-button name="event-planner-tab-timeline-item-edit" class="event-planner-tab-timeline-item-edit md-info md-xs md-just-icon md-round"
                             @click="modifyItem(index)">
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button name="event-planner-tab-timeline-item-delete" class="event-planner-tab-timeline-item-delete md-danger md-xs md-just-icon md-round"
                             @click="removeItem(item)">
                    <md-icon>delete_outline</md-icon>
                  </md-button>
                </div>
                <div class="item-title-and-time" style="padding-top: 32px !important; padding-left: 4px;">
                <span class="item-title" style="font-weight: 500; display: inline-block;" v-if="item.title">
                  {{item.title }}
                </span>
                  <p class="item-desc">
                    {{ item.description }}
                  </p>
                </div>
              </md-card-content>
            </md-card>

          </div>

          <div class="time-line-blocks_selected-items_item" v-if="!timelineItems.length">
            <div class="drag-here">
              <p>
                <img src="/static/img/drag_drop.png" alt="drag and drop" style="width: 62px;"/>
              </p>
              <p style="font-style: italic; font-size: 18px;">
                Start building your event timeline by dropping timeline items here
              </p>
            </div>
          </div>

          <div class="time-line-blocks_selected-items_item" v-if="timelineItems.length">
            <md-icon class="time-line-blocks_icon">add</md-icon>
            <div class="drag-here">
              Continue building your event timeline by dropping more timeline items here
              <div class="small">You can change the order of items by dragging them to the right place</div>
            </div>
          </div>
        </draggable>
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
  import {SlideYDownTransition} from "vue2-transitions";
  import InputMask from 'vue-input-mask';


  import VueElementLoading from 'vue-element-loading';
  // import auth from '@/auth';
  import EventBlocks from "../components/NewEventBlocks";
  import draggable from 'vuedraggable';
  import {Drag, Drop} from 'vue-drag-drop';
  import _ from 'underscore';

  export default {
    name: 'event-time-line',
    components: {
      VueElementLoading,
      EventBlocks,
      draggable, Drag, Drop,
      SlideYDownTransition,
      InputMask
    },
    props: {
      event: Object,
      eventComponents: [Array, Function]

    },
    data: () => ({
      // auth: auth,
      isLoading: true,
      blocksList: [
        {
          id: 1,
          buildingBlockType: 'setup',
          icon: 'place',
          color: '#f44336'
        },
        {
          id: 2,
          buildingBlockType: 'activity',
          icon: 'notifications_active',
          color: '#4caf50'
        },
        {
          id: 3,
          buildingBlockType: 'meal',
          icon: 'restaurant',
          color: '#00bcd4'
        },
        {
          id: 4,
          buildingBlockType: 'DISCUSSION',
          icon: 'sms',
          color: '#ff9800'
        },
        {
          id: 5,
          buildingBlockType: 'TRANSPORTATION',
          icon: 'train',
          color: '#f44336'
        },
        {
          id: 6,
          buildingBlockType: 'RELAXATION',
          icon: 'weekend',
          color: '#4caf50'
        },
        {
          id: 7,
          buildingBlockType: 'ADD YOUR OWN',
          icon: 'add',
          color: '#00bcd4'
        }
      ],
      timelineItems: [],
      hoursArray: [],
        disabledDragging : false

    }),
    methods: {
      /**
       * Handle drop block to time line items
       * @param data
       * @param event
       */
      handleDrop(data, event) {
        if ( data ) {
          let block = Object.assign({}, data.block);
          block.mode = 'edit';
          block.startTime = '08:00 am';
          block.endTime = '09:00 am';
          block.isItemLoading = false;
          if (this.timelineItems.length > 0){
            block.startTime = this.$moment(this.timelineItems[this.timelineItems.length-1].endTime, 'HH:mm A').format('HH:mm A');
            block.endTime = this.$moment(this.timelineItems[this.timelineItems.length-1].endTime, 'HH:mm A').add(1, 'hour').format('HH:mm A');
          }
          this.timelineItems.push(Object.assign({}, block));
        } else {
          setTimeout(this.updateTimelineITemsOrder, 100);
        }

      },

      removeItem(item) {

        swal({
          title: "Are you sure want to delete this item?",
          showCancelButton: true,
          confirmButtonClass: "md-button md-success",
          cancelButtonClass: "md-button md-danger",
          confirmButtonText: "Yes, remove it!",
          buttonsStyling: false
        })
          .then(result => {
            if(result.value === true) {
              this.setItemLoading(item, true, false);

              let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
              let event = new CalendarEvent({id: this.event.id});

              let timelineItem = new EventTimelineItem({id: item.id}).for(calendar, event);

              timelineItem.delete().then(result => {
                this.getTimelineItems();
              }).catch(error => {
                console.log(error);
              })
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      modifyItem(index) {
        this.$set(this.timelineItems[index], 'mode', 'edit');
        this.disabledDragging = true;
      },
      previewEvent() {
        this.$router.push({name: 'EventDetails', params: {id : this.event.id}});
      },
      getTimelineItems() {

        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: this.event.id});

        new EventTimelineItem().for(calendar, event).get().then(res => {
          console.log(res);
          this.timelineItems = _.sortBy(res, function(item){ return item.order});
            console.log(this.timelineItems);

            this.isLoading = false;
          this.timelineItems.forEach((item)=>{item.isItemLoading = false;})
        })
      },
      cancelTimelineItem(item, index){
        if (item.dateCreated){
          this.$set(this.timelineItems[index], 'mode', 'saved');
        } else {
          this.timelineItems.splice(index, 1);
        }
          this.disabledDragging = false;

      },
      saveTimelineItem(item, index) {
        this.setItemLoading(item, true, true);

        if ( !item.startTime || !item.endTime ||
          ( !item.title && !item.description ) ) {

          this.$notify(
            {
              message: 'From time, To time and ( Title or Description ) id Required',
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'warning'
            })

          this.setItemLoading(item, false, true);

          return;
        }

        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: this.event.id});
        let order = ++index;

        new EventTimelineItem({
          event: {id: event.id},
          title: item.title,
          buildingBlockType: item.buildingBlockType,
          description: item.description,
          startTime: item.startTime,
          endTime: item.endTime,
          order: order,
          icon: item.icon,
          color: item.color
        }).for(calendar, event).save()
          .then(res => {

            this.getTimelineItems();
              this.disabledDragging = false;


          })
          .catch(error => {
            console.log(error);
              this.disabledDragging = false;

          })

      },
      updateTimelineItem(item) {

        this.setItemLoading(item, true, true);

        if ( !item.startTime || !item.endTime ||
          ( !item.title && !item.description ) ) {
          this.$set(item, 'isItemLoading', false);

          this.$notify(
            {
              message: 'From time, To time and ( Title or Description ) id Required',
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'warning'
            })

          this.setItemLoading(item, false, true);
          return;
        }


        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: this.event.id});

        let timelineItem = new EventTimelineItem({id: item.id}).for(calendar, event);


        timelineItem.title = item.title;
        timelineItem.description = item.description;
        timelineItem.startTime = item.startTime;
        timelineItem.endTime = item.endTime;

        timelineItem.save().then(res => {
          this.getTimelineItems();
            this.disabledDragging = false;


        }).catch(error => {
          console.log(error)
            this.disabledDragging = false;

        })
      },
      updateTimelineITemsOrder() {
        this.isLoading = true;
        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId});
        let event = new CalendarEvent({id: this.event.id});

        let new_order = 1;
        const timelineItemsForUpdate = [];
        this.timelineItems.forEach(item => {
          timelineItemsForUpdate.push({ id: item.id, order: new_order});
          new_order+=1;
        });

        let timelineItem = new EventTimelineItem({id: 'updateMultiple', timelineItems: timelineItemsForUpdate}).for(calendar, event);

        timelineItem.order = new_order;

        timelineItem.save().then(res => {

          /*this.$notify(
            {
              message: "Timeline Items order modified successfully",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'success'
            });*/
          this.isLoading = false;


        }).catch(error => {
          console.log(error)
        })


      },
      setItemLoading(item, loading, force){
        this.$set(item, 'isItemLoading', loading);
        if (force) {
          this.$set(item, 'mode', 'saved');
          this.$set(item, 'mode', 'edit');
        } else {
          this.$set(item, 'mode', 'edit');
          this.$set(item, 'mode', 'saved');
        }
      }

    },
    created() {
      [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
      [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
      [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`));

      this.hoursArray.push();

    },
    mounted() {
      this.$root.$emit("set-title",this.event, this.routeName === 'EditBuildingBlocks',true);
      this.isLoading = false;
      this.getTimelineItems();
    },
    watch: {
      event(newVal, oldVal){
        this.$root.$emit("set-title",this.event, this.routeName === 'EditBuildingBlocks',true);
        this.getTimelineItems();
      }
    }
  }
</script>
<style lang="scss">

</style>
