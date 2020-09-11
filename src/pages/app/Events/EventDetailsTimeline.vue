<template>
  <div class="md-layout event-details-timeline timeline-section with-progress-bar">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="event-page-header md-layout-item md-size-100">
      <div class="header-name">
        <div class="font-size-30 font-bold text-transform-capitalize mb-20">
          <img :src="`${newTimeLineIconsURL}timeline-title.svg`" class="page-icon" />
          CREATE TIMLINE
        </div>
        <div class="font-size-16">
          <b>Things are warming up!</b> It’s time to create your event timeline!
          <br />We helped you with the basic structure
        </div>
      </div>
      <header-actions @toggleCommentMode="toggleCommentMode"></header-actions>
    </div>

    <div
      class="md-layout-item md-xlarge-size-65 md-large-size-65 md-small-size-50 time-line-section mr-auto mt-20"
      ref="content"
    >
      <button
        v-scroll-to="'#timeline-edit-card'"
        ref="scrollBtn"
        style="display:none"
      >Scroll to the editing card</button>
      <div class="timeline-items-list">
        <div
          class="timeline-items-list__item"
          v-for="(scheduleDate,timelineIndex) in timelineDates"
          :key="timelineIndex"
        >
          <div class="item-header">
            <div class="header-title">
              <div class="time-line-edit d-flex justify-content-center align-center">
                <label
                  style="white-space:nowrap; padding-right:10px"
                >Day {{numberToWord(timelineIndex + 1)}}</label>
                <div>{{scheduleDate}}</div>
                <md-datepicker
                  :md-disabled-dates="getDisabledDates(timelineIndex)"
                  :md-closed="closeEditTimeline(timelineIndex)"
                  md-immediately
                ></md-datepicker>
              </div>
            </div>
            <div class="header-actions">
              <md-button
                class="md-default md-simple md-just-icon md-wrapper"
                style="font-size:26px !important"
                @click="addTimelineItem(timelineIndex)"
              >
                <md-icon>add_circle</md-icon>
              </md-button>
              <md-button
                class="md-default md-simple md-just-icon md-wrapper"
                style="font-size:26px !important"
                @click="askRemoveTimelineItem(timelineIndex)"
              >
                <md-icon>delete_outline</md-icon>
              </md-button>
            </div>
          </div>

          <drop
            @drop="handleDrop(timelineIndex, ...arguments)"
            style="height: 100%; min-height: 50px;"
            :data-index="timelineIndex"
            :class="{lastDroppingCard:timelineIndex == timeline.length-1}"
          >
            <draggable
              :list="timelineItems[scheduleDate]"
              class="time-line-blocks_selected-items"
              :options="{disabled : disabledDragging}"
            >
              <div
                v-for="(item,index) in timelineItems[scheduleDate]"
                :key="index"
                class="time-line-blocks_selected-items_item time-line-item"
              >
                <timeline-template-item :item="item" v-if="item.status=='template'"></timeline-template-item>
                <template v-else>
                  <img
                    class="time-line-blocks_icon"
                    :src="`${newTimeLineIconsURL}${item.icon.toLowerCase()}-circle.svg`"
                  />
                  <md-card
                    class="block-form"
                    v-if="!item.dateCreated || item.mode === 'edit'"
                    :style="`border-left : 5px solid ` + item.color"
                    ref="timeline-edit-card"
                    id="timeline-edit-card"
                  >
                    <vue-element-loading
                      :active.sync="item.isItemLoading"
                      spinner="ring"
                      color="#FF547C"
                    />
                    <md-card-content class="md-layout">
                      <div class="md-layout-item md-size-100">
                        <div class="form-group">
                          <label>Name</label>
                          <input type="text" class="form-control" v-model="item.title" />
                        </div>
                      </div>
                      <div class="md-layout-item md-size-45">
                        <div class="form-group">
                          <label>Start At</label>
                          <time-input v-model="item.startTime" :h24="false" displayFormat="hh:mm"></time-input>
                        </div>
                      </div>
                      <div
                        class="md-layout-item md-size-10 d-flex justify-content-center align-center"
                        style="position : relative"
                      >
                        <div class="divider"></div>
                      </div>
                      <div class="md-layout-item md-size-45">
                        <div class="form-group">
                          <label>Finishes At</label>
                          <time-input v-model="item.endTime" :h24="false" displayFormat="hh:mm"></time-input>
                        </div>
                      </div>
                      <div class="md-layout-item md-size-100">
                        <div class="form-group">
                          <label>Description</label>
                          <textarea
                            row="100"
                            type="text"
                            class="form-control"
                            v-model="item.description"
                          ></textarea>
                        </div>
                      </div>
                      <div class="md-layout-item md-size-100 margin-bottom">
                        <div class="form-group">
                          <label>Location</label>
                          <location-input v-model="item.location"></location-input>
                        </div>
                      </div>
                      <div class="md-layout-item md-size-100">
                        <div class="form-group">
                          <label>
                            Attach File
                            <small>*suggested</small>
                          </label>
                          <p
                            class="item-attachment"
                            v-if="item.attachments && item.attachments.length>0"
                          >
                            <span
                              v-for="(attachmentItem, attachmentIndex) in item.attachments"
                              :key="attachmentItem.url"
                              class="attachment-link"
                            >
                              <md-icon>attachment</md-icon>
                              <span
                                @click="openAttachment(attachmentItem.url)"
                                class="attachment-name"
                              >{{ attachmentItem.originalName }}</span>
                              <span @click="removeAttachment(item, attachmentIndex)">
                                <md-icon class="remove-attachment">close</md-icon>
                              </span>
                            </span>
                          </p>
                          <label class="upload-section">
                            <label
                              class="md-rose md-outline md-simple md-sm attachment"
                              for="file"
                              style="cursor:pointer"
                            >
                              <md-icon>attachment</md-icon>Choose file(10MB)
                            </label>
                            <div>
                              <span
                                v-for="(file, index) in currentAttachments"
                                :key="index"
                                class="attachment-link"
                              >
                                {{ file.name}}
                                <span @click="removeSelectedAttachment(index)">
                                  <md-icon class="remove-attachment">close</md-icon>
                                </span>
                              </span>
                            </div>

                            <!-- {{ item.attachmentName}} -->

                            <!-- <div class="note">Drag your file here</div> -->
                          </label>

                          <input
                            style="display: none"
                            id="file"
                            name="attachment"
                            type="file"
                            multiple="multiple"
                            :data-item="item.id"
                            :data-timelineindex="timelineIndex"
                            :data-itemIndex="index"
                            @change="onFileChange"
                          />
                        </div>
                      </div>
                    </md-card-content>
                    <md-card-actions
                      md-alignment="right"
                      style="border: none;"
                      class="edit-timeline-footer"
                    >
                      <md-button
                        name="event-planner-tab-timeline-item-save"
                        class="event-planner-tab-timeline-item-save md-default md-simple"
                        @click="cancelTimelineItem(item, timelineIndex, index)"
                      >Cancel</md-button>
                      <md-button
                        :disabled="item.isItemLoading"
                        name="event-planner-tab-timeline-item-save"
                        class="event-planner-tab-timeline-item-save md-red"
                        v-if="!item.dateCreated"
                        @click="saveTimelineItem(item, index, timelineItem.itemDay)"
                      >Save</md-button>
                      <md-button
                        :disabled="item.isItemLoading"
                        name="event-planner-tab-timeline-item-edit"
                        class="event-planner-tab-timeline-item-edit md-red"
                        v-else
                        @click="updateTimelineItem(item)"
                      >Save</md-button>
                    </md-card-actions>
                  </md-card>

                  <md-card
                    class="block-info"
                    v-if="!item.mode || item.mode === 'saved' "
                    :style="`border-left : 5px solid ` + item.color"
                  >
                    <vue-element-loading
                      :active.sync="item.isItemLoading"
                      spinner="ring"
                      color="#FF547C"
                    />
                    <md-card-content style="min-height: 80px;">
                      <div class="item-title-and-time">
                        <span
                          class="item-time"
                        >{{ formatHour(item.startTime) }} - {{ formatHour(item.endTime)}}</span>
                        <span
                          class="item-title"
                          style="font-weight: 500; display: inline-block;"
                          v-if="item.title"
                        >{{item.title }}</span>

                        <p class="item-desc">{{ item.description }}</p>
                        <p
                          class="item-attachment"
                          v-if="item.attachments && item.attachments.length>0"
                        >
                          <span
                            v-for="(attachmentItem) in item.attachments"
                            :key="attachmentItem.url"
                            @click="openAttachment(attachmentItem.url)"
                            class="attachment-link"
                          >
                            <md-icon>attachment</md-icon>
                            {{ attachmentItem.originalName }}
                          </span>
                        </p>
                        <p class="item-location" v-if="item.location">
                          <img :src="`${timelineIconsURL}place.svg`" width="20" style="width:18px" />
                          <span>{{ item.location }}</span>
                        </p>
                        <div class="attachment" style="display : none;">
                          <a href>
                            <md-icon>attachment</md-icon>file name
                          </a>
                        </div>
                        <md-button class="md-simple timeline-action">
                          <img :src="`${timelineIconsURL}GoToProposal.svg`" width="20" /> Go To Proposal
                        </md-button>
                        <br />
                        <md-button class="md-simple timeline-action">
                          <img :src="`${timelineIconsURL}ContactVendor.svg`" width="20" /> Contact Vendor
                        </md-button>
                      </div>

                      <div class="card-actions">
                        <md-button
                          name="event-planner-tab-timeline-item-edit"
                          class="event-planner-tab-timeline-item-edit md-red md-simple md-xs md-round"
                          @click="modifyItem(item)"
                        >Edit</md-button>
                        <md-button
                          name="event-planner-tab-timeline-item-delete"
                          class="event-planner-tab-timeline-item-delete md-simple md-xs md-just-icon md-round"
                          @click="removeItem(item)"
                        >
                          <md-icon>delete_outline</md-icon>
                        </md-button>
                      </div>
                    </md-card-content>
                  </md-card>
                </template>
              </div>
            </draggable>
          </drop>
        </div>
      </div>
    </div>
    <md-card
      class="md-card-plain time-line-blocks md-layout-item md-xlarge-size-35 md-large-size-35 md-small-size-40"
      style="margin-top: 16px; padding-right: 3em"
    >
      <md-card-content class="md-layout time-line-blocks_items">
        <div class="text-center width-100 p-10 font-size-16 mb-10">Drag Tim Slots timeline</div>

        <div
          v-for="(section,index) in blocksList"
          :key="index"
          class="md-layout-item md-size-100 mb-30"
        >
          <div v-for="block in section" :key="block.id" class="md-layout-item md-size-100">
            <drag
              :transfer-data="{ block }"
              class="time-line-blocks_item"
              :style="`color :` + block.color"
            >
              <div class="font-size-16 font-bold text-transform-capitalize d-flex align-center">
                <md-icon>drag_indicator</md-icon>
                <img
                  :src="`${newTimeLineIconsURL}${block.icon.toLowerCase()}.svg`"
                  class="label-icon mr-10"
                />
                {{block.buildingBlockType}}
              </div>
            </drag>
          </div>
        </div>
      </md-card-content>
    </md-card>

    <!-- Confirm Modal-->
    <modal v-if="showDeleteConfirmModal" class="delete-timeline-model">
      <template slot="header">
        <div class="maryoku-modal-header delete-timeline-model__header">
          <h2>
            Are you sure you want to say
            <br />goodbye to your changes?
          </h2>
          <div class="header-description">Your changes will be deleted after that</div>
          <md-button
            class="md-simple md-just-icon md-round modal-default-button modal-close-button"
            @click="showDeleteConfirmModal = false"
          >
            <md-icon>clear</md-icon>
          </md-button>
        </div>
      </template>
      <template slot="footer">
        <md-button
          class="md-default md-simple cancel-btn"
          @click="showDeleteConfirmModal=false"
        >Cancel</md-button>
        <md-button class="md-red add-category-btn" @click="removeTimelineItem">Yes,I'm sure</md-button>
      </template>
    </modal>

    <planner-event-footer>
      <template slot="buttons">
        <md-button class="md-simple md-button md-black maryoku-btn" @click="startFromScratch">
          <span class="font-size-16 text-transform-capitalize">
            <img class="mr-20" :src="`${$iconURL}Campaign/Group 8871.svg`" />Revert to original
          </span>
        </md-button>
        <span class="seperator"></span>
        <md-button class="md-simple md-button md-black maryoku-btn" @click="revert">
          <span class="font-size-16 text-transform-capitalize">
            <img class="mr-10 label-icon" :src="`${$iconURL}Timeline-New/Trash.svg`" />
            Start from scratch
          </span>
        </md-button>
        <md-button class="md-simple md-button md-red maryoku-btn md-outlined" @click="saveDraft">
          <span class="font-size-16 text-transform-capitalize">
            <img class="mr-20 label-icon" :src="`${$iconURL}Timeline-New/save-red.svg`" />
            Save Draft
          </span>
        </md-button>
        <md-button class="md-button md-red maryoku-btn" @click="finalize">
          <span class="font-size-16 text-transform-capitalize">Finalise timeline</span>
        </md-button>
      </template>
    </planner-event-footer>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import Calendar from '@/models/Calendar';
import CalendarEvent from '@/models/CalendarEvent';
import EventComponent from '@/models/EventComponent';
import EventTimelineItem from '@/models/EventTimelineItem';
import moment from 'moment';
import swal from 'sweetalert2';
import { SlideYDownTransition } from 'vue2-transitions';
import InputMask from 'vue-input-mask';
import { Modal, LabelEdit, LocationInput } from '@/components';
import TimelineTemplateItem from './components/TimelineTemplateItem';
import VueElementLoading from 'vue-element-loading';
// import auth from '@/auth';
import EventBlocks from './components/NewEventBlocks';
import draggable from 'vuedraggable';
import { Drag, Drop } from 'vue-drag-drop';
import _ from 'underscore';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import HeaderActions from '@/components/HeaderActions';
import CommentEditorPanel from './components/CommentEditorPanel';

import ProgressSidebar from './components/progressSidebar';
import TimeInput from '../../../components/TimeInput';
import PlannerEventFooter from '@/components/Planner/FooterPanel';
import { timelineBlockItems } from '@/constants/event';

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
    ProgressSidebar,
    Modal,
    TimeInput,
    LocationInput,
    HeaderActions,
    CommentEditorPanel,
    PlannerEventFooter,
    TimelineTemplateItem,
  },
  props: {
    // event: Object,
    // eventComponents: [Array, Function]
  },
  data: () => ({
    // auth: auth,
    calendar: new Calendar(),
    isLoading: true,
    selectedDate: '',
    blocksList: timelineBlockItems,
    timelineItems: [],
    timelineDates: [],
    hoursArray: [],
    disabledDragging: false,
    timelineAttachment: null,
    timelineIconsURL: 'http://static.maryoku.com/storage/icons/timeline/svg/',
    menuIconsURL:
      'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/',
    event: {},
    showDeleteConfirmModal: false,
    indexOfDeleteItem: -1,
    newTimeLineIconsURL:
      'http://static.maryoku.com/storage/icons/Timeline-New/',

    timeline: [
      {
        date: '20/04/2020',
        items: [],
        itemDay: null,
      },
    ],
    a: [
      '',
      'one ',
      'two ',
      'three ',
      'four ',
      'five ',
      'six ',
      'seven ',
      'eight ',
      'nine ',
      'ten ',
      'eleven ',
      'twelve ',
      'thirteen ',
      'fourteen ',
      'fifteen ',
      'sixteen ',
      'seventeen ',
      'eighteen ',
      'nineteen ',
    ],
    b: [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ],
    currentAttachments: [],
    showCommentEditorPanel: false,
  }),
  methods: {
    ...mapMutations('event', ['setEventData']),
    download() {
      this.$router.push({
        path: `/events/` + this.eventData.id + `/edit/timeline/export`,
      });
    },
    /**
     * Handle drop block to time line items
     * @param data
     * @param event
     */
    handleDrop(index, data) {
      if (!this.canEdit) {
        swal({
          title: "Sorry, you can't edit timeline. ",
          showCancelButton: false,
          confirmButtonClass: 'md-button md-success',
          confirmButtonText: 'Ok, I got it',
          buttonsStyling: false,
        })
          .then((result) => {
            if (result.value === true) {
              return;
            }
          })
          .catch((err) => {});
        return;
      }
      if (data) {
        let block = Object.assign({}, data.block);
        block.id = new Date().getTime(); //add temp id
        block.mode = 'edit';

        let startDate = new Date(this.timeline[index].itemDay);
        let endDate = new Date(this.timeline[index].itemDay);
        const timelineItemsCount = this.timeline[index].items.length;
        if (timelineItemsCount == 0) {
          if (this.eventData.eventDayPart == 'evening') {
            startDate.setHours(19);
            endDate.setHours(20);
          } else {
            startDate.setHours(8);
            endDate.setHours(9);
          }
        } else {
          const prevItem = this.timeline[index].items[timelineItemsCount - 1];
          startDate.setHours(new Date(prevItem.endTime).getHours());
          endDate.setHours(new Date(prevItem.endTime).getHours() + 1);
        }

        block.startTime = startDate;
        block.endTime = endDate;

        block.title = block.buildingBlockType;
        block.startDuration = 'am';
        block.endDuration = 'am';
        block.attachmentName = '';
        block.isItemLoading = false;
        if (this.timelineItems.length > 0) {
          // block.startTime = this.$moment(this.timelineItems[this.timelineItems.length - 1].endTime, 'H:mm A').format('H:mm A')
          // block.endTime = this.$moment(this.timelineItems[this.timelineItems.length - 1].endTime, 'H:mm A').add(1, 'hour').format('H:mm A')
        }
        this.timeline[index].items.push(Object.assign({}, block));
        this.disabledDragging = true;
      } else {
        setTimeout(this.updateTimelineITemsOrder, 100);
      }
      setTimeout(() => {
        const scrollBtn = this.$refs.scrollBtn;
        if (scrollBtn) {
          scrollBtn.click();
        }
      }, 100);
    },

    removeItem(item) {
      swal({
        title: 'Are you sure want to delete this item?',
        showCancelButton: true,
        cancelButtonClass: 'md-button md-danger',
        confirmButtonClass: 'md-button md-success',
        confirmButtonText: "Yes I'm sure",
        buttonsStyling: false,
      })
        .then((result) => {
          if (result.value === true) {
            this.setItemLoading(item, true, false);
            let event = new CalendarEvent({ id: this.eventData.id });

            let timelineItem = new EventTimelineItem({ id: item.id }).for(
              this.calendar,
              event,
            );

            timelineItem
              .delete()
              .then((result) => {
                this.getTimelineItems();
                this.setItemLoading(item, false, false);
              })
              .catch((error) => {
                this.$root.$emit('timeline-updated', this.timelineItems);
                this.setItemLoading(item, false, false);
              });
          }
        })
        .catch((err) => {
          this.$root.$emit('timeline-updated', this.timelineItems);
        });
    },
    modifyItem(item) {
      const index = this.timelineItems.findIndex((it) => it.id === item.id);
      this.$set(this.timelineItems[index], 'mode', 'edit');
      this.disabledDragging = true;
    },
    previewEvent() {
      this.$router.push({
        name: 'EventDetails',
        params: { id: this.eventData.id },
      });
    },
    getTimelineItems() {
      let event = new CalendarEvent({ id: this.eventData.id });
      this.$http
        .get(`${process.env.SERVER_URL}/1/events/${event.id}/timelineItems`)
        .then((res) => {
          this.timelineItems = res.data;
          console.log(this.timelineItems);
          this.timelineDates = Object.keys(this.timelineItems);
          console.log(this.timelineDates);
          this.eventData.timelineItems = this.timelineItems;
          this.$root.$emit('timeline-updated', this.timelineItems);
        });
    },
    cancelTimelineItem(item, timelineIndex, itemIndexOfTimeline) {
      const itemIndex = this.timelineItems.findIndex((it) => it.id === item.id);
      if (item.dateCreated) {
        this.$set(this.timelineItems[itemIndex], 'mode', 'saved');
        this.$set(
          this.timeline[timelineIndex].items[itemIndexOfTimeline],
          'mode',
          'saved',
        );
      } else {
        // this.timelineItems.splice(itemIndex, 1)
        this.timeline[timelineIndex].items.splice(itemIndexOfTimeline, 1);
      }
      this.disabledDragging = false;
      this.currentAttachments = [];
    },
    saveTimelineItem(item, index, timelineDate) {
      this.setItemLoading(item, true, true);
      var plannedDate = 0;
      if (typeof timelineDate == 'number') {
        plannedDate = timelineDate;
      } else if (timelineDate) {
        plannedDate = timelineDate.getTime();
      }
      if (!item.title && !item.description) {
        this.$notify({
          message:
            'From time, To time and ( Title or Description ) id Required',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'warning',
        });

        this.setItemLoading(item, false, true);

        return;
      }

      let event = new CalendarEvent({ id: this.eventData.id });
      let order = ++index;

      const newTimeline = {
        event: { id: event.id },
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
        location: item.location,
        plannedDate: plannedDate,
      };
      if (this.currentAttachments.length > 0) {
        this.uploadAttachment(
          item.attachment,
          item.attachmentName,
          (results) => {
            if (!newTimeline.attachments) {
              newTimeline.attachments = [];
            }
            newTimeline.attachments = newTimeline.attachments.concat(results);
            newTimeline.attachmentName = '';
            new EventTimelineItem(newTimeline)
              .for(this.calendar, event)
              .save()
              .then((res) => {
                this.getTimelineItems();
                this.disabledDragging = false;
                this.$root.$emit('timeline-updated', this.timelineItems);
                this.setItemLoading(item, false, true);
              })
              .catch((error) => {
                this.disabledDragging = false;
                this.$root.$emit('timeline-updated', this.timelineItems);
                this.setItemLoading(item, false, true);
              });
            this.timelineAttachment = null;
            this.currentAttachments = [];
          },
        );
      } else {
        new EventTimelineItem(newTimeline)
          .for(this.calendar, event)
          .save()
          .then((res) => {
            this.getTimelineItems();
            this.disabledDragging = false;
            this.$root.$emit('timeline-updated', this.timelineItems);
            this.setItemLoading(item, false, true);
          })
          .catch((error) => {
            this.disabledDragging = false;
            this.$root.$emit('timeline-updated', this.timelineItems);
            this.setItemLoading(item, false, true);
          });
      }
    },
    updateTimelineItem(item) {
      this.setItemLoading(item, true, true);
      if (
        !item.startTime ||
        !item.endTime ||
        (!item.title && !item.description)
      ) {
        this.$set(item, 'isItemLoading', false);
        this.$notify({
          message:
            'From time, To time and ( Title or Description ) id Required',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'warning',
        });

        this.setItemLoading(item, false, true);
        return;
      }

      let event = new CalendarEvent({ id: this.eventData.id });

      let timelineItem = new EventTimelineItem({ id: item.id }).for(
        this.calendar,
        event,
      );

      timelineItem.title = item.title;
      timelineItem.description = item.description;
      timelineItem.startTime = item.startTime;
      timelineItem.endTime = item.endTime;
      timelineItem.link = item.link;
      timelineItem.location = item.location;
      timelineItem.attachments = item.attachments;
      if (this.currentAttachments.length > 0) {
        this.uploadAttachment(
          item.attachment,
          item.attachmentName,
          (results) => {
            if (!timelineItem.attachments) {
              timelineItem.attachments = [];
            }
            timelineItem.attachments = timelineItem.attachments.concat(results);
            timelineItem.attachmentName = '';
            timelineItem
              .save()
              .then((res) => {
                this.getTimelineItems();
                this.disabledDragging = false;
                this.$root.$emit('timeline-updated', this.timelineItems);
              })
              .catch((error) => {
                this.disabledDragging = false;
                this.$root.$emit('timeline-updated', this.timelineItems);
              });

            this.currentAttachments = []; //intialized attachmentslist
            item.attachmentName = '';
          },
        );
      } else {
        timelineItem
          .save()
          .then((res) => {
            this.getTimelineItems();
            this.disabledDragging = false;
            this.$root.$emit('timeline-updated', this.timelineItems);
          })
          .catch((error) => {
            console.log(error);
            this.disabledDragging = false;
            this.$root.$emit('timeline-updated', this.timelineItems);
          });
      }
    },
    async uploadAttachment(file, attachmentName, callback) {
      const attachments = [];
      for (let i = 0; i < this.currentAttachments.length; i++) {
        const fileItem = this.currentAttachments[i];
        let formData = new FormData();
        formData.append('file', fileItem);
        formData.append('from', 'timeline');
        formData.append('type', 'attachment');
        formData.append('name', fileItem.name);
        const result = await this.$http.post(
          `${process.env.SERVER_URL}/uploadFile`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        attachments.push({
          originalName: fileItem.name,
          url: result.data.upload.path,
          name: result.data.upload.name,
        });
      }
      callback(attachments);
    },
    updateTimelineITemsOrder() {
      this.isLoading = true;
      let event = new CalendarEvent({ id: this.eventData.id });

      let new_order = 1;
      const timelineItemsForUpdate = [];
      this.timelineItems.forEach((item) => {
        item.order = new_order;
        timelineItemsForUpdate.push({ id: item.id, order: new_order });
        new_order += 1;
      });

      let timelineItem = new EventTimelineItem({
        id: 'updateMultiple',
        timelineItems: timelineItemsForUpdate,
      }).for(this.calendar, event);

      timelineItem.order = new_order;

      timelineItem
        .save()
        .then((res) => {
          /* this.$notify(
                      {
                        message: "Timeline Items order modified successfully",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success'
                      }); */
          this.eventData.timelineItems = this.timelineItems;
          this.isLoading = false;
          this.$root.$emit('timeline-updated', this.timelineItems);
        })
        .catch((error) => {
          console.log(error);
          this.$root.$emit('timeline-updated', this.timelineItems);
        });
    },
    setItemLoading(item, loading, force) {
      this.$set(item, 'isItemLoading', loading);
      if (force) {
        this.$set(item, 'mode', 'saved');
        this.$set(item, 'mode', 'edit');
      } else {
        this.$set(item, 'mode', 'edit');
        this.$set(item, 'mode', 'saved');
      }
    },
    onFileChange(event) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      let reader = new FileReader();
      let vm = this;
      if (event.target.name) {
        const itemId = event.target.getAttribute('data-item');
        const timelineIndex = event.target.getAttribute('data-timelineindex');
        const itemIndex = event.target.getAttribute('data-itemIndex');
        let isLargeFile = false;

        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 10 * 1024 * 1024) {
            isLargeFile = true;
          }
        }
        if (isLargeFile) {
          swal({
            title: 'This file is larger than 10MB',
            showCloseButton: true,
            text: 'Please choose another file',
            confirmButtonClass: 'md-button md-red',
            confirmButtonText: 'I got it',
            buttonsStyling: false,
          })
            .then((result) => {})
            .catch((err) => {
              console.log(err);
            });
        } else {
          // vm.timeline[timelineIndex].items[itemIndex].attachmentName = files[0].name
          // vm.timeline[timelineIndex].items[itemIndex].attachment = files[0]
          for (let i = 0; i < files.length; i++) {
            this.currentAttachments.push(files[i]);
          }
        }
      } else {
        this.createImage(files[0]);
      }
    },
    createImage(file, type) {
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        if (type === 'attachment') {
          vm.timelineAttachment = e.target.result;
          vm.timelineoriginalAttachmentName = file.name;
        } else {
          // vm.imageRegular = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    },
    openAttachment(path) {
      window.open(`http://static.maryoku.com/${path}`, '_blank');
    },
    formatDate(date) {
      if (typeof date == 'number') {
        return moment(new Date(date)).format('MM/DD/YY');
      }
      return moment(date).format('MM/DD/YY');
    },
    formatHour(date) {
      return moment(new Date(date)).format('hh:mm A');
    },
    numberToWord(num) {
      let vm = this;
      if ((num = num.toString()).length > 9) return 'overflow';
      let n = ('000000000' + num)
        .substr(-9)
        .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return;
      var str = '';
      str +=
        n[1] != 0
          ? (vm.a[Number(n[1])] || vm.b[n[1][0]] + ' ' + vm.a[n[1][1]]) +
            'crore '
          : '';
      str +=
        n[2] != 0
          ? (vm.a[Number(n[2])] || vm.b[n[2][0]] + ' ' + vm.a[n[2][1]]) +
            'lakh '
          : '';
      str +=
        n[3] != 0
          ? (vm.a[Number(n[3])] || vm.b[n[3][0]] + ' ' + vm.a[n[3][1]]) +
            'thousand '
          : '';
      str +=
        n[4] != 0
          ? (vm.a[Number(n[4])] || vm.b[n[4][0]] + ' ' + vm.a[n[4][1]]) +
            'hundred '
          : '';
      str +=
        n[5] != 0
          ? (str != '' ? 'and ' : '') +
            (vm.a[Number(n[5])] || vm.b[n[5][0]] + ' ' + vm.a[n[5][1]])
          : '';
      return str;
    },
    addTimelineItem(index) {
      let timelineLength = this.timeline.length - 1;
      let nextDay = 0;
      if (typeof this.timeline[index].itemDay == 'number')
        nextDay = this.timeline[index].itemDay + 1000 * 60 * 60 * 24;
      else
        nextDay = this.timeline[index].itemDay.getTime() + 1000 * 60 * 60 * 24;

      if (
        this.timeline[index + 1] &&
        this.formatDate(this.timeline[index + 1].itemDay) ===
          this.formatDate(nextDay)
      ) {
        return;
      }
      this.timeline.forEach((item, index) => {
        this.timeline[index].isEditable = false;
      });
      this.timeline.splice(index + 1, 0, {
        date: this.formatDate(nextDay),
        items: [],
        itemDay: nextDay,
        isEditable: true,
      });
    },
    askRemoveTimelineItem(index) {
      this.indexOfDeleteItem = index;
      this.showDeleteConfirmModal = true;
    },
    removeTimelineItem() {
      if (this.timeline[this.indexOfDeleteItem].items.length === 0) {
        this.timeline.splice(this.indexOfDeleteItem, 1);
        this.indexOfDeleteItem = -1;
        this.showDeleteConfirmModal = false;
      } else {
      }
    },
    saveTimeline() {
      swal({
        title: 'Saved It!',
        showCloseButton: true,
        text: 'We’ll update the related vendors',
        confirmButtonClass: 'md-button md-red',
        cancelButtonClass: 'md-button md-red',
        confirmButtonText: 'Cool, Thanks',
        buttonsStyling: false,
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    },

    onConfirm() {
      this.value = 'Agreed';
    },
    onCancel() {
      this.value = 'Disagreed';
    },
    editTimeline(index) {
      if (!this.timeline[index]) return;
      const isEdit = this.timeline[index].isEditable;
      this.timeline.forEach((item, index) => {
        this.timeline[index].isEditable = false;
      });
      this.timeline[index].isEditable = !isEdit;
      this.$forceUpdate();
    },
    closeEditTimeline(index) {},
    getDisabledDates(index) {
      const vm = this;
      const checkDate = function (date) {
        if (index == 0) {
          return false;
        }
        if (!vm.timeline[index + 1])
          return date.getTime() <= vm.timeline[index - 1].itemDay;
        return (
          date.getTime() <= vm.timeline[index - 1].itemDay ||
          date.getTime() >= vm.timeline[index + 1].itemDay
        );
      };
      return checkDate;
    },
    removeAttachment(timelineItem, attachmentIndex) {
      timelineItem.attachments.splice(attachmentIndex, 1);
    },
    removeSelectedAttachment(index) {
      this.currentAttachments.splice(index, 1);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
    initData(event) {
      // this.setEventData(event);
      this.timeline[0].date = this.formatDate(event.eventStartMillis);
      this.timeline[0].itemDay = event.eventStartMillis;
      this.getTimelineItems();
      new EventComponent()
        .for(this.calendar, event)
        .get()
        .then((components) => {
          this.selectedComponents = components;
        });
    },
    revert() {},
    startFromScratch() {},
    saveDraft() {},
    finalize() {},
  },
  created() {
    [...Array(12).keys()].map((x) =>
      x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined,
    );
    [...Array(12).keys()].map((x) =>
      x === 0
        ? this.hoursArray.push(`12:00 PM`)
        : this.hoursArray.push(`${x}:00 PM`),
    );
    [...Array(8).keys()].map((x) =>
      x === 0
        ? this.hoursArray.push(`12:00 AM`)
        : this.hoursArray.push(`${x}:00 AM`),
    );
    this.calendar = new Calendar({
      id: this.currentUser.profile.defaultCalendarId,
    });

    this.hoursArray.push();

    if (this.eventData) {
      this.initData(this.eventData);
      this.isLoading = false;
    }
  },
  mounted() {
    this.isLoading = true;
  },
  computed: {
    ...mapState('event', ['eventData']),
    currentUser() {
      return this.$store.state.auth.user;
    },
    dateFormat: {
      get() {
        return this.$material.locale.dateFormat;
      },
      set(val) {
        this.$material.locale.dateFormat = val;
      },
    },
    permission() {
      try {
        return this.$store.state.event.eventData.permit
          ? this.$store.state.event.eventData.permit
          : 'edit';
      } catch (e) {
        return 'edit';
      }
    },
    canComment() {
      return this.permission === 'edit' || this.permission === 'comment';
    },
    canEdit() {
      return this.permission === 'edit';
    },
  },
  watch: {
    eventData(newVal, oldVal) {
      this.$root.$emit(
        'set-title',
        this.eventData,
        this.routeName === 'EditBuildingBlocks',
        true,
      );
      this.initData(newVal);
      this.getTimelineItems();
    },
  },
};
</script>
<style scoped lang="scss">
$btn-color: #fff;
.remove-attachment {
  font-size: 10px !important;
  margin-right: -10px !important;
  transform: rotate(0deg) !important;
  cursor: pointer;
}
@import '../../styles/EventDetailsTimeline.scss';
</style>
