<template>
    <div class="md-layout timeline-section with-progress-bar">

        <side-bar :event="event">

        </side-bar>

        <progress-sidebar></progress-sidebar>

        <div class="event-page-header md-layout-item md-size-100 with-bg">
            <div class="header-main-actions">
                <md-button class="md-rose" @click="saveTimeline">Save Changes</md-button>
                <md-button class="md-default md-simple">back to first version</md-button>
                <md-button class="md-default md-simple with-left-border">start from scratch</md-button>
            </div>
            <div class="header-actions">
                <ul>
                    <li><a href="javascript:void(0)" @click="download"><img :src="`${menuIconsURL}Asset 9.svg`"></a></li>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 5.svg`"></a></li>
                    <li ><a href=""><img :src="`${menuIconsURL}Asset 8.svg`"></a></li>
                </ul>
            </div>
        </div>

        <div class="md-layout-item md-xlarge-size-60 md-large-size-60 md-small-size-50 time-line-section mr-auto" ref="content">

            <!--<md-button name="event-planner-tab-timeline-preview" class="event-planner-tab-timeline-preview md-info md-sm preview-event" @click="previewEvent">
              Preview
            </md-button>-->

            <div class="timeline-section-title">
                <img :src="`${newTimeLineIconsURL}timeline-title.svg`">Timeline
            </div>

            <div class="timeline-items-list">
                <div class="timeline-items-list__item" v-for="(timelineItem,indx) in timeline" :key="indx">
                    <div class="item-header">
                        <div  class="header-title">
                          <div class="time-line-date" v-if="!timelineItem.isEditable"> 
                            Day {{numberToWord(indx + 1)}}  
                            {{formatDate(timelineItem.itemDay)}}
                            <!-- <md-button class="md-rose md-simple md-sm edit-budget" @click="editTimeline(indx)">Edit</md-button> -->
                          </div>
                          <div class="time-line-edit" v-if="timelineItem.isEditable">
                            <md-datepicker v-model="timeline[indx].itemDay" :md-disabled-dates="getDisabledDates(indx)" :md-closed="closeEditTimeline(indx)"> </md-datepicker>
                          </div> 
                        </div>
                        <div class="header-actions">
                            <md-button class="md-default md-simple md-just-icon" @click="addTimelineItem(indx)">
                                <md-icon>add_circle</md-icon>
                            </md-button>
                            <md-button class="md-default md-simple md-just-icon" @click="askRemoveTimelineItem(indx)">
                                <md-icon>delete_outline</md-icon>
                            </md-button>
                            <md-button class="md-default md-simple md-just-icon" @click="editTimeline(indx)" v-if="!timelineItem.isEditable">
                                <md-icon>edit</md-icon>
                            </md-button>
                            <md-button class="md-default md-simple md-just-icon" @click="editTimeline(indx)" v-if="timelineItem.isEditable">
                                <md-icon>check</md-icon>
                            </md-button>
                        </div>
                    </div>

                    <drop @drop="handleDrop(indx, ...arguments)" style="height: 100%; min-height: 50px;" :data-index="indx">
                        <draggable :list="timelineItem.items" class="time-line-blocks_selected-items"
                                   :options="{disabled : disabledDragging}">
                            <div v-for="(item,index) in timelineItem.items" :key="index"
                                 class="time-line-blocks_selected-items_item time-line-item">
                                <img class="time-line-blocks_icon"  :src="`${newTimeLineIconsURL}${item.icon.toLowerCase()}-circle.svg`">
                                <md-card class="block-form" v-if="!item.dateCreated || item.mode === 'edit'"
                                         :style="`border-left : 5px solid ` + item.color"
                                >
                                    <vue-element-loading :active.sync="item.isItemLoading" spinner="ring" color="#FF547C"/>
                                    <md-card-content class="md-layout">
                                        <div class="md-layout-item md-size-100">
                                            <div class="form-group">
                                                <label>Name</label>
                                                <input type="text" class="form-control" v-model="item.title">
                                            </div>
                                        </div>
                                        <div class="md-layout-item md-size-45">

                                            <div class="form-group">
                                                <label>Start Time </label>
                                                <div class="time-select-fields">
                                                    <input type="time"  v-model="item.startTime" class="without_ampm" >
                                                    <select v-model="item.startDuration">
                                                        <option value="am" >AM</option>
                                                        <option value="PM">PM</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!--                                    <md-field>-->
                                            <!--                                        <input-mask v-focus placeholder="From Time e.g:08:00 AM" class="md-input"-->
                                            <!--                                                    v-model="item.startTime" mask="99:99 aa" maskChar="_"></input-mask>-->
                                            <!--                                    </md-field>-->
                                        </div>
                                        <div class="md-layout-item md-size-10 d-flex justify-content-center align-center" style="position : relative">
                                            <div class="divider"></div>
                                        </div>
                                        <div class="md-layout-item md-size-45">
                                            <div class="form-group">
                                                <label>Finishes At</label>
                                                <div class="time-select-fields">
                                                    <input type="time"  v-model="item.endTime" class="without_ampm" >

                                                    <select v-model="item.endDuration">
                                                        <option value="am">AM</option>
                                                        <option value="PM">PM</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <!--                                    <md-field>-->
                                            <!--                                        <input-mask placeholder="To Time e.g:10:00 PM" class="md-input"-->
                                            <!--                                                    v-model="item.endTime" mask="99:99 aa" maskChar="_"></input-mask>-->
                                            <!--                                    </md-field>-->
                                        </div>
                                        <div class="md-layout-item md-size-100">
                                            <div class="form-group">
                                                <label>Description</label>
                                                <textarea row="100" type="text" class="form-control" v-model="item.description"></textarea>
                                            </div>
                                        </div>

                                        <div class="md-layout-item md-size-100 margin-bottom">
                                            <div class="form-group with-icon">
                                                <label>Location</label>
                                                <div class="input-icon">
                                                    <img :src="`${timelineIconsURL}place.svg`" width="20">
                                                </div>
                                                <input type="text" class="form-control" v-model="item.location">
                                            </div>
                                        </div>
                                        <div class="md-layout-item md-size-100 ">

                                            <div class="form-group">
                                                <label>Attach File  <small>*suggested</small></label>
                                                <label class="upload-section" for="file">
                                                    <md-button class="md-rose md-outline md-simple md-sm">
                                                        Choose file
                                                    </md-button>
                                                    <div class="note">Drag your file here</div>
                                                </label>

                                                <input
                                                    style="display: none"
                                                    id="file"
                                                    name="attachment"
                                                    type="file"
                                                    @change="onFileChange"
                                                ></input>

                                            </div>

                                        </div>
                                    </md-card-content>
                                    <md-card-actions md-alignment="right" style="border: none;" class="edit-timeline-footer">
                                        <md-button name="event-planner-tab-timeline-item-save"
                                                   class="event-planner-tab-timeline-item-save md-default md-simple"
                                                   @click="cancelTimelineItem(item,index)">Cancel
                                        </md-button>
                                        <md-button :disabled="item.isItemLoading" name="event-planner-tab-timeline-item-save"
                                                   class="event-planner-tab-timeline-item-save md-red" v-if="!item.dateCreated"
                                                   @click="saveTimelineItem(item,index,timelineItem.itemDay)">Save
                                        </md-button>
                                        <md-button :disabled="item.isItemLoading" name="event-planner-tab-timeline-item-edit"
                                                   class="event-planner-tab-timeline-item-edit md-red" v-else
                                                   @click="updateTimelineItem(item)">Save
                                        </md-button>
                                    </md-card-actions>

                                </md-card>

                                <md-card class="block-info" v-if="!item.mode || item.mode === 'saved' "
                                         :style="`border-left : 5px solid ` + item.color">
                                    <vue-element-loading :active.sync="item.isItemLoading" spinner="ring" color="#FF547C"/>
                                    <md-card-content style="min-height: 80px;">
                                        <div class="item-title-and-time"
                                        >
                                            <span class="item-time">{{ item.startTime }} - {{item.endTime}}</span>
                                            <span class="item-title" style="font-weight: 500; display: inline-block;" v-if="item.title">
                                      {{item.title }}
                                    </span>
                                            <p class="item-desc">
                                                {{ item.description }}
                                            </p>
                                            <div class="location"  style="display : none;">
                                                <md-icon>place</md-icon> 1419 Westwood Blvd Los Angeles | CA 90024-4911
                                            </div>
                                            <div class="attachment" style="display : none;">
                                                <a href=""> <md-icon>attachment</md-icon> file name </a>
                                            </div>
                                            <md-button class="md-simple timeline-action"> <img :src="`${timelineIconsURL}GoToProposal.svg`" width="20"> Go To Proposal </md-button>
                                            <br>
                                            <md-button class="md-simple timeline-action"> <img :src="`${timelineIconsURL}ContactVendor.svg`" width="20"> Contact Vendor </md-button>
                                        </div>

                                        <div class="card-actions">
                                            <md-button name="event-planner-tab-timeline-item-edit"
                                                       class="event-planner-tab-timeline-item-edit md-red md-simple md-xs md-round"
                                                       @click="modifyItem(index)">

                                                Edit

                                            </md-button>
                                            <md-button name="event-planner-tab-timeline-item-delete"
                                                       class="event-planner-tab-timeline-item-delete md-simple md-xs md-just-icon md-round"
                                                       @click="removeItem(item)">
                                                <md-icon>delete_outline</md-icon>
                                            </md-button>

                                        </div>

                                    </md-card-content>
                                </md-card>

                            </div>

                            <!--                    <div class="time-line-blocks_selected-items_item" v-if="!timelineItems.length">-->
                            <!--                        <div class="drag-here">-->
                            <!--                            <p>-->
                            <!--                                <img src="http://static.maryoku.com/storage/img/drag_drop.png" alt="drag and drop"-->
                            <!--                                     style="width: 62px;"/>-->
                            <!--                            </p>-->
                            <!--                            <p style="font-style: italic; font-size: 18px;">-->
                            <!--                                Start building your event timeline by dropping timeline items here-->
                            <!--                            </p>-->
                            <!--                        </div>-->
                            <!--                    </div>-->
                        </draggable>


                    </drop>

                </div>

            </div>
        </div>
        <md-card
            class="md-card-plain time-line-blocks md-layout-item md-xlarge-size-35 md-large-size-35 md-small-size-40" style="    margin-top: 16px;">
            <md-card-content class="md-layout time-line-blocks_items">

                <div class="dragdrop-timeline-header">
                    <div class="header-title"> <img :src="`${newTimeLineIconsURL}add.svg`"> Add Time Slots</div>
                    <p class="section-desc">
                        Drag and drop the blocks to
                        edit your timeline project
                    </p>
                </div>

                <div v-for="(block,index) in blocksList" :key="block.id" class="md-layout-item md-size-100">

                    <drag :transfer-data="{ block }" class="time-line-blocks_item "
                          :style="`border: 1px dashed ` + block.color + `; color :` + block.color">
                        <img :src="`${newTimeLineIconsURL}${block.icon.toLowerCase()}.svg`">
                        <h5>{{block.buildingBlockType}}</h5>
                    </drag>

                </div>

            </md-card-content>
        </md-card>

        <div class="md-layout-item md-size-100 text-center">
            <md-button class="md-rose save-timeline" @click="saveTimeline">Save Changes</md-button>
            <div class="text-center timeline-lists-footer" v-if="timeline.length">
                <div class="footer-title">End</div>
                <md-button class="md-rose md-simple back-to-top"> <md-icon>expand_less</md-icon> Back to top </md-button>
            </div>
        </div>

        <!-- Confirm Modal-->
        <modal v-if="showDeleteConfirmModal" class="delete-timeline-model">
          <template slot="header">
            <div class="maryoku-modal-header delete-timeline-model__header">
              <h2>
                Are you sure you want to say <br/> goodbye to your changes?
              </h2>
              <div class="header-description">
                Your changes will be deleted after that
              </div>
              <md-button
                class="md-simple md-just-icon md-round modal-default-button modal-close-button"
                @click="showDeleteConfirmModal = false"
              >
                <md-icon>clear</md-icon>
              </md-button>
            </div>
          </template>
          <template slot="footer">
            <md-button class="md-default md-simple cancel-btn" @click="showDeleteConfirmModal=false">Cancel</md-button>
            <md-button class="md-red add-category-btn" @click="removeTimelineItem">Yes,I'm sure</md-button>
          </template>
        </modal>
    </div>

</template>
<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventComponent from '@/models/EventComponent'
import EventTimelineItem from '@/models/EventTimelineItem'
import moment from 'moment'
import swal from 'sweetalert2'
import {SlideYDownTransition} from 'vue2-transitions'
import InputMask from 'vue-input-mask'
import {
    Modal,
    LabelEdit
  } from '@/components'

import VueElementLoading from 'vue-element-loading'
// import auth from '@/auth';
import EventBlocks from '../components/NewEventBlocks'
import draggable from 'vuedraggable'
import {Drag, Drop} from 'vue-drag-drop'
import _ from 'underscore'

import SideBar from '../../../../components/SidebarPlugin/NewSideBar'
import SidebarItem from '../../../../components/SidebarPlugin/NewSidebarItem.vue'
import ProgressSidebar from './progressSidebar'


import jsPDF from 'jspdf'
import html2canvas from "html2canvas"


export default {
  name: 'event-time-line',
  components: {
    VueElementLoading,
    EventBlocks,
    draggable,
    Drag,
    Drop,
    SlideYDownTransition,
    InputMask,
    SideBar,
    SidebarItem,
    ProgressSidebar,
    Modal
  },
  props: {
    // event: Object,
    // eventComponents: [Array, Function]

  },
  data: () => ({
    // auth: auth,
    isLoading: true,
    selectedDate:"",
    blocksList: [
      {
        id: 1,
        buildingBlockType: 'setup',
        icon: 'Setup',
        color: '#ffc001'
      },
        {
            id: 6,
            buildingBlockType: 'Relaxation',
            icon: 'Relaxation',
            color: '#0caf50'
        },
        {
            id: 8,
            buildingBlockType: 'Show',
            icon: 'Show',
            color: '#00bcd4'
        },
      {
        id: 2,
        buildingBlockType: 'activity',
        icon: 'Activity',
        color: '#20c997'
      },
        {
            id: 9,
            buildingBlockType: 'Speaker / Keynote',
            icon: 'speaker',
            color: '#641956'
        },
        {
            id: 10,
            buildingBlockType: 'Break',
            icon: 'Break',
            color: '#ff527c'
        },
      {
        id: 3,
        buildingBlockType: 'meal',
        icon: 'Meal',
        color: '#f44336'
      },
        {
            id: 5,
            buildingBlockType: 'Transportation',
            icon: 'Transportation',
            color: '#44546a'
        },
      {
        id: 4,
        buildingBlockType: 'Discussion',
        icon: 'Discussion',
        color: '#3a3838'
      },
      {
        id: 7,
        buildingBlockType: 'Other',
        icon: 'other',
        color: '#a5a5a5'
      }
    ],
    timelineItems: [],
    hoursArray: [],
    disabledDragging: false,
    timelineAttachment: null,
    timelineIconsURL: 'http://static.maryoku.com/storage/icons/timeline/svg/',
    menuIconsURL: 'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/',
    event: {},
    showDeleteConfirmModal: false, 
    indexOfDeleteItem: -1,
    newTimeLineIconsURL: 'http://static.maryoku.com/storage/icons/Timeline-New/',
      timeline : [
          {
              date : '20/04/2020',
              items : [],
              itemDay : null
          }
      ],
      a : ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '],
      b : ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety']

  
    
    }),
  methods: {

      download() {
          this.$router.push({path: `/events/` + this.event.id + `/edit/timeline/export`})

      },
    /**
     * Handle drop block to time line items
     * @param data
     * @param event
     */
    handleDrop (index, data) {
        console.log('handleDrop => ', data);
        console.log('index => ', index);

      if (data) {
        let block = Object.assign({}, data.block)
        block.mode = 'edit'
        block.startTime = '08:00'
        block.endTime = '09:00'
        block.title = block.buildingBlockType
        block.startDuration = 'am'
        block.endDuration = 'am'

        block.isItemLoading = false
        if (this.timelineItems.length > 0) {
          // block.startTime = this.$moment(this.timelineItems[this.timelineItems.length - 1].endTime, 'H:mm A').format('H:mm A')
          // block.endTime = this.$moment(this.timelineItems[this.timelineItems.length - 1].endTime, 'H:mm A').add(1, 'hour').format('H:mm A')
        }
        this.timeline[index].items.push(Object.assign({}, block))
        this.disabledDragging = true
      } else {
        setTimeout(this.updateTimelineITemsOrder, 100)
      }
    },

    removeItem (item) {
      swal({
        title: 'Are you sure want to delete this item?',
        showCancelButton: true,
        confirmButtonClass: 'md-button md-success',
        cancelButtonClass: 'md-button md-danger',
        confirmButtonText: 'Yes, remove it!',
        buttonsStyling: false
      })
        .then(result => {
          if (result.value === true) {
            this.setItemLoading(item, true, false)

            let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
            let event = new CalendarEvent({id: this.event.id})

            let timelineItem = new EventTimelineItem({id: item.id}).for(calendar, event)

            timelineItem.delete().then(result => {
              this.getTimelineItems()
              this.setItemLoading(item, false, false);
            }).catch(error => {
              console.log(error)
              this.$root.$emit('timeline-updated', this.timelineItems)
              this.setItemLoading(item, false, false);
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$root.$emit('timeline-updated', this.timelineItems)
        })
    },
    modifyItem (index) {
      this.$set(this.timelineItems[index], 'mode', 'edit')
      this.disabledDragging = true
    },
    previewEvent () {
      this.$router.push({name: 'EventDetails', params: {id: this.event.id}})
    },
    getTimelineItems () {
      let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
      let event = new CalendarEvent({id: this.event.id})

      new EventTimelineItem().for(calendar, event).get().then(res => {
        this.timelineItems = _.sortBy(res, function (item) {
          return item.order
        })

        // this.timeline[0].items = _.sortBy(res, function (item) {
        //     return item.order
        // })
        
        this.isLoading = false
        var timelines = {};
        // define timelines
        this.timelineItems.forEach((item) => {
          item.isItemLoading = false
          if (!timelines[item.plannedDate]) timelines[item.plannedDate] = [];
          item.isItemLoading = false;
          timelines[item.plannedDate].push(item); 
        })

        if (Object.keys(timelines).length > 0) {
          this.timeline = [];
          Object.keys(timelines).forEach((itemDay, index) => {
            console.log( index);
            this.timeline.push({
              itemDay: parseInt(itemDay),
              isEditable: false,
              items : timelines[itemDay]
            })
          })
        }
        this.timeline = _.sortBy(this.timeline, function(item) {
          return item.itemDay;
        })
        // this.timeline[0].items.forEach((item) => {
        //     item.isItemLoading = false
        // })
        this.event.timelineItems = this.timelineItems
        this.$root.$emit('timeline-updated', this.timelineItems)
      })
    },
    cancelTimelineItem (item, index) {
      if (item.dateCreated) {
          this.$set(this.timelineItems[index], 'mode', 'saved')
          this.$set(this.timeline[0].items[index], 'mode', 'saved')
      } else {
          this.timelineItems.splice(index, 1)
          this.timeline[0].items.splice(index, 1)
      }
      this.disabledDragging = false
    },
    saveTimelineItem (item, index, timelineDate) {
      this.setItemLoading(item, true, true);
      var plannedDate = 0;
      if (typeof(timelineDate) == 'number') {
        plannedDate = timelineDate;
      } else if (timelineDate){
        plannedDate = timelineDate.getTime();
      }
      if ((!item.title && !item.description)) {
        this.$notify(
          {
            message: 'From time, To time and ( Title or Description ) id Required',
            horizontalAlign: 'center',
            verticalAlign: 'top',
            type: 'warning'
          })

        this.setItemLoading(item, false, true)

        return
      }

      let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
      let event = new CalendarEvent({id: this.event.id})
      let order = ++index

      new EventTimelineItem({
        event: {id: event.id},
        title: item.title,
        buildingBlockType: item.buildingBlockType,
        description: item.description,
        startTime: item.startTime,
        endTime: item.endTime,
        endDuration: item.endDuration,
        startDuration: item.startDuration,
        order: order,
        icon: item.icon,
        color: item.color,
        link: item.link,
        attachment: this.timelineAttachment,
        plannedDate : plannedDate
      }).for(calendar, event).save()
        .then(res => {
          this.getTimelineItems()
          this.disabledDragging = false
          this.$root.$emit('timeline-updated', this.timelineItems)
          this.setItemLoading(item, false, true)
        })
        .catch(error => {
          console.log(error)
          this.disabledDragging = false
          this.$root.$emit('timeline-updated', this.timelineItems)
          this.setItemLoading(item, false, true)
        })

      this.timelineAttachment = null
    },
    updateTimelineItem (item) {
      this.setItemLoading(item, true, true)

      if (!item.startTime || !item.endTime ||
                    (!item.title && !item.description)) {
        this.$set(item, 'isItemLoading', false)

        this.$notify(
          {
            message: 'From time, To time and ( Title or Description ) id Required',
            horizontalAlign: 'center',
            verticalAlign: 'top',
            type: 'warning'
          })

        this.setItemLoading(item, false, true)
        return
      }

      let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
      let event = new CalendarEvent({id: this.event.id})

      let timelineItem = new EventTimelineItem({id: item.id}).for(calendar, event)

      timelineItem.title = item.title
      timelineItem.description = item.description
      timelineItem.startTime = item.startTime
      timelineItem.endTime = item.endTime
      timelineItem.link = item.link
      timelineItem.attachment = this.timelineAttachment

      timelineItem.save().then(res => {
        this.getTimelineItems()
        this.disabledDragging = false
        this.$root.$emit('timeline-updated', this.timelineItems)
      }).catch(error => {
        console.log(error)
        this.disabledDragging = false
        this.$root.$emit('timeline-updated', this.timelineItems)
      })

      this.timelineAttachment = null
    },
    updateTimelineITemsOrder () {
      this.isLoading = true
      let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
      let event = new CalendarEvent({id: this.event.id})

      let new_order = 1
      const timelineItemsForUpdate = []
      this.timelineItems.forEach(item => {
        item.order = new_order
        timelineItemsForUpdate.push({id: item.id, order: new_order})
        new_order += 1
      })

      let timelineItem = new EventTimelineItem({
        id: 'updateMultiple',
        timelineItems: timelineItemsForUpdate
      }).for(calendar, event)

      timelineItem.order = new_order

      timelineItem.save().then(res => {
        /* this.$notify(
                      {
                        message: "Timeline Items order modified successfully",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success'
                      }); */
        this.event.timelineItems = this.timelineItems
        this.isLoading = false
        this.$root.$emit('timeline-updated', this.timelineItems)
      }).catch(error => {
        console.log(error)
        this.$root.$emit('timeline-updated', this.timelineItems)
      })
    },
    setItemLoading (item, loading, force) {
      this.$set(item, 'isItemLoading', loading)
      if (force) {
        this.$set(item, 'mode', 'saved')
        this.$set(item, 'mode', 'edit')
      } else {
        this.$set(item, 'mode', 'edit')
        this.$set(item, 'mode', 'saved')
      }
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      if (e.target.name) {
        this.createImage(files[0], 'attachment')
      } else {
        this.createImage(files[0])
      }
    },
    createImage (file, type) {
      let reader = new FileReader()
      let vm = this

      reader.onload = e => {
        if (type === 'attachment') {
          vm.timelineAttachment = e.target.result
        } else {
          // vm.imageRegular = e.target.result;
        }
      }
      reader.readAsDataURL(file)
    },
      formatDate(date) {
        console.log(date);
        console.log(new Date(date));
        if (typeof(date) == 'number') {
          console.log(moment(new Date(date)).format('MM/DD/YY') );
          return moment(new Date(date)).format('MM/DD/YY') 
        }
        return moment(date).format('MM/DD/YY')
      },
      numberToWord(num) {

        let vm = this;

          if ((num = num.toString()).length > 9) return 'overflow';
          let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
          if (!n) return; var str = '';
          str += (n[1] != 0) ? (vm.a[Number(n[1])] || vm.b[n[1][0]] + ' ' + vm.a[n[1][1]]) + 'crore ' : '';
          str += (n[2] != 0) ? (vm.a[Number(n[2])] || vm.b[n[2][0]] + ' ' + vm.a[n[2][1]]) + 'lakh ' : '';
          str += (n[3] != 0) ? (vm.a[Number(n[3])] || vm.b[n[3][0]] + ' ' + vm.a[n[3][1]]) + 'thousand ' : '';
          str += (n[4] != 0) ? (vm.a[Number(n[4])] || vm.b[n[4][0]] + ' ' + vm.a[n[4][1]]) + 'hundred ' : '';
          str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (vm.a[Number(n[5])] || vm.b[n[5][0]] + ' ' + vm.a[n[5][1]]) : '';
          return str;

      },
      addTimelineItem(index) {
        let timelineLength = this.timeline.length - 1;
        // const isInsertable = this.timeline.length - 1 == index;
        console.log(this.timeline[index].itemDay );
        console.log(typeof(this.timeline[index].itemDay ));
        let nextDay = 0;
        if (typeof(this.timeline[index].itemDay ) == "number")
          nextDay = this.timeline[index].itemDay + (1000 * 60 * 60 * 24);
        else 
          nextDay = this.timeline[index].itemDay.getTime() + (1000 * 60 * 60 * 24);
          
        if (this.timeline[index+1] && this.formatDate(this.timeline[index+1].itemDay) === this.formatDate(nextDay)) {
          return;
        }
        this.timeline.forEach((item,index) => {
          this.timeline[index].isEditable = false;
        })
        console.log(this.timeline);
        console.log(this.timeline[index].itemDay);
        console.log(nextDay);
        this.timeline.splice(index + 1, 0, {
            date : this.formatDate(nextDay),
            items : [],
            itemDay : nextDay,
            isEditable : true
        })
      },
      askRemoveTimelineItem(index) {
        this.indexOfDeleteItem = index;
        this.showDeleteConfirmModal = true;
      },
      removeTimelineItem() {
        
      },
      saveTimeline(){
        
          swal({
              title: 'Saved It!',
              showCloseButton: true,
              text : 'We’ll update the related vendors',
              confirmButtonClass: 'md-button md-red',
              cancelButtonClass: 'md-button md-red',
              confirmButtonText: 'Cool, Thanks',
              buttonsStyling: false
          }).then(result => {
            
          }).catch(err => {
                  console.log(err)
              })

      },

      onConfirm () {
        this.value = 'Agreed'
      },
      onCancel () {
        this.value = 'Disagreed'
      },
      editTimeline (index) {
        if (!this.timeline[index]) return;
        const isEdit = this.timeline[index].isEditable;
        this.timeline.forEach((item,index) => {
          this.timeline[index].isEditable = false;
        })
        this.timeline[index].isEditable = !isEdit;
        
        console.log("forceUpdate");
        this.$forceUpdate()
      },
      closeEditTimeline (index) {
        // this.timeline[index].isEditable = false;
        console.log("forceUpdate - 1");
        // this.$forceUpdate()
      },
      getDisabledDates (index) {
        console.log(index);
        const vm = this;
        const checkDate = function(date) {
          if (index == 0) {
            return false;
          }
          if (!vm.timeline[index + 1])
            return date.getTime() <= vm.timeline[index - 1].itemDay;
          return date.getTime() <= vm.timeline[index - 1].itemDay || date.getTime() >= vm.timeline[index + 1].itemDay;
        }
        return checkDate;
      }

  },
  created () {
    [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
    [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
    [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`))

    this.hoursArray.push()

    this.$auth.currentUser(this, true, function () {
      let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId})

      _calendar.calendarEvents().find(this.$route.params.id).then(event => {
        this.event = event;

        this.timeline[0].date = this.formatDate(this.event.eventStartMillis);
        this.timeline[0].itemDay = this.event.eventStartMillis;
        // this.timeline[0]
        console.log(this.timeline[0]);

        this.getTimelineItems()

        new EventComponent().for(_calendar, event).get().then(components => {
          this.event.components = components
          this.selectedComponents = components
        })

        console.log(event)
      })
    }.bind(this))

    // this.dateFormat="DD/MM/YYYY"
  },
  mounted () {
    this.isLoading = true
    // if (this.$material.locale.dateFormat !== "DD/MM/YY"){ 
    //   this.$material.locale.dateFormat = "DD/MM/YY"
    // }
    // console.log("mounted");
    // if (this.event && this.event.id){
    //     this.$root.$emit("set-title",this.event, this.routeName === 'EditBuildingBlocks',true);
    //     this.getTimelineItems();
    // }
  },
  // computed: {
  //   dateFormat: {
  //     get () {
  //       return this.$material.locale.dateFormat
  //     },
  //     set (val) {
  //       this.$material.locale.dateFormat = val
  //     }
  //   }
  // },
  watch: {
    event (newVal, oldVal) {
      this.$root.$emit('set-title', this.event, this.routeName === 'EditBuildingBlocks', true)
      this.getTimelineItems()
    }
  }
}
</script>
<style scoped lang="scss">
  $btn-color: #fff;

</style>
