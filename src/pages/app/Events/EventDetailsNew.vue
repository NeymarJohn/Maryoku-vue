<template>
  <div class="md-layout new-event-details edit-event-details" v-if="event">
    <side-bar :event="event"></side-bar>

    <div class="event-details-header md-layout-item md-size-100">
      <div class="event-details-info d-flex justify-content-start">
        <div
          class="event-title d-flex justify-content-center align-center"
          style="background : linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(./static/img/Image-49.png) center center no-repeat"
        >
          <h3>{{event.title}}</h3>
          <md-button class="md-default md-simple edit-concept-btn">
            Edit Concept
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
        </div>
        <!-- <div class="event-items">
          <div
            class="event-items__item"
            v-for="(item,i,index) in event.eventNeededServices"
            :key="index"
          >
            <img
              src="http://static.maryoku.com/storage/icons/event's%20page/SVG/Asset%20155.svg"
              width="15"
            />
            <span>{{i}}</span>
          </div>
        </div> -->
        <div class="header-detail">
          <div class="md-layout-item md-size-80">
            <div class="header-info-section">
              <div class="status-bar">
                <div class="description">
                  <span class="status-title">STATUS</span>
                  <span class="status-info">
                    <span class="status-percentage">22%</span> | <span class="status-tasks">4 tasks of 26</span>
                  </span>
                </div>
                <div class="bar">
                  <div class="progress-bar">
                    <div class="guests-progress d-flex justify-content-center align-center">
                      <div class="guests-progress__item header-status red" style="width : 22%; height:8px">
                        <div class="progress"></div>
                      </div>
                      <div class="guests-progress__item header-status gray" style="width : 78%; height:8px">
                        <div class="progress"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="section-header">
                <img :src="`${iconsURL}Asset 162.svg`" /> Event’s details
                Notice that the date has changed
              </div>
              <div class="card-content">
                  <div class="event-details-list">
                    <ul class="list-items">
                      
                      <li class="event-details-item">
                        <img :src="`${iconsURL}Asset 165.svg`" width="20" />
                        <span>
                          {{event.eventStartMillis | formatDate}},
                          {{event.eventStartMillis | formatTime}}
                          ({{event.eventStartMillis |
                          formatDuration(event.eventEndMillis)}}h)
                        </span>
                      </li>
                      <li class="event-details-item">
                        <img :src="`${iconsURL}Asset 166.svg`" width="20" />
                        <span>{{event.numberOfParticipants}} Invited</span>
                      </li>
                      <li class="event-details-item">
                       <img :src="`${iconsURL}Asset 162.svg`" width="20" />
                        <span>Establishment / Activity day</span>
                      </li>
                    </ul>
                    <ul class="list-items">
                      <li class="event-details-item">
                        <img :src="`${iconsURL}Asset 167.svg`" width="20" />
                        <span>{{event.location}}</span>
                      </li>
                      <li class="event-details-item">
                        <img :src="`${iconsURL}sun.svg`" width="20" />
                        <span>{{event.eventDayPart}} Time event</span>
                      </li>
                      <li class="event-details-item">
                        <md-button class="md-rose md-simple edit-btn">
                          Edit Details
                          <md-icon>keyboard_arrow_right</md-icon>
                        </md-button>
                      </li>
                    </ul>
                  </div>
                  <!-- <div class="event-weather">
                    <div class="event-weather__icon">
                      <img :src="`${iconsURL}Asset 161.svg`" width="40" />
                    </div>
                    <div class="event-weather__status">Mostly Sunny</div>
                    <div class="event-weather__degree">
                      <div class="degree-value">58</div>
                      <ul class="degree-types">
                        <li class="type red">F</li>
                        <li class="type">C</li>
                      </ul>
                    </div>
                    <div class="event-weather__details">
                      <div class="details-item">Precipitation: 10%</div>
                      <div class="details-item">Humidity: 38%</div>
                      <div class="details-item">Wind: 7 mph</div>
                    </div>
                  </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="header-actions">
          <ul>
            <li>
              <a href>
                <img :src="`${menuIconsURL}Asset 9.svg`" />
              </a>
            </li>
            <li>
              <a href>
                <img :src="`${menuIconsURL}Asset 5.svg`" />
              </a>
            </li>
            <li>
              <a href>
                <img :src="`${menuIconsURL}Asset 8.svg`" />
              </a>
            </li>
          </ul>
          
        </div>
        

      </div>
      <div class="event-header__count">
          <div class="count-item">
            <div class="number">07</div>
            <div class="count-label">DAYS</div>
          </div>
          <div class="count-item divider">:</div>
          <div class="count-item">
            <div class="number">11</div>
            <div class="count-label">HOURS</div>
          </div>
          <div class="count-item divider">:</div>
          <div class="count-item">
            <div class="number">32</div>
            <div class="count-label">MINUTES</div>
          </div>
          <div class="count-item with-icon">
            <div class="icon">
              <img :src="`${iconsURL}Asset%20152.svg`" width="20" />
            </div>
            <div class="count-label">To Event</div>
          </div>
        </div>
    </div>

    <div class="md-layout justify-content-between notes" style="margin-top : 2em;">
      <div class="md-layout-item md-size-25">
        <div class="card-section">
          <div class="section-header">
            <img :src="`${iconsURL}Asset 162.svg`" /> Notes
          </div>

          <div class="card-content">
            <div class="d-flex justify-content-start align-center">
              <input type="text" class="form-control input-new-note" v-model="notes.newNote" placeholder="Add new note" />
            </div>
            <div class>
              <md-radio v-model="radio" :value="false">Lorem ipsum dolor sit amet sit</md-radio>
              <md-radio v-model="radio" value="my-radio">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</md-radio>
              <md-radio v-model="radio" :value="objA">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</md-radio>
              <md-radio v-model="radio" :value="objB">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</md-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-75">
        <div class="card-section">
          <div class="section-header">
            <img :src="`${iconsURL}Group 3090.svg`" /> Budget & Vendors
          </div>

          <div class="card-content">
            <div class="d-flex justify-content-between">
              <div class="budget-details">
                <div>Total Budget</div>
                <div class="total-budget-value">
                  $ {{event.totalBudget | withComma}}
                </div>
                <md-button class="md-rose md-simple edit-total-budget">Edit</md-button>
              </div>
              <div class="budget-percentage">
                <div class="chart-section">
                  <div class="title title-budget-prise-negative">
                    <div class="budget-pie-container">
                      <chart-component
                        :chart-data="pieChart.data"
                        :chart-options="pieChart.options"
                        chart-type="Pie"
                        style="grid-column: 1; grid-row: 1; color:green"
                      />
                      <animated-number
                        ref="totalRemainingBudgetNumber"
                        :value="percentage"
                        class="percentage"
                        prefix="%"
                      ></animated-number>
                    </div>
                  </div>

                  <div class="chart-legends">
                    <div class="legend-item used">
                      Used ${{event.totalBudget - getTotalRemainingBudget}}
                    </div>
                    <div class="legend-item remaining">
                      Remaining ${{getTotalRemainingBudget | withComma}}
                    </div>
                  </div>
                </div>
              </div>

              <div class="book-venue">
                <div class="booked-vendors__header d-flex justify-content-start align-center">
                  <img src="http://static.maryoku.com/storage/icons/Budget Elements/venuerental.svg" width="20px">
                  <h3 class="header-title">Choose your next venue</h3>
                </div>
                <div class="book-items d-flex align-center">
                  <div class="venue-item">
                    <span class="budget">$2,300</span>
                    <div class="description">Trump National Golf Club Philadelphia</div>
                  </div>
                  <div class="venue-item">
                    <span class="budget">$2,500</span>
                    <div class="description">Trump National Golf Club Philadelphia</div>
                  </div>
                  <div class="venue-item">
                    <span class="budget">$1,900</span>
                    <div class="description">Del Frisco’s Double Eagle Steakhouse San Diego</div>
                  </div>
                </div>

                <md-button class="md-rose md-simple edit-btn md-flat btn-outlined">
                  Book Venue
                </md-button>
                <!-- <div class="booked-vendors__items" v-if="event.components">
                  <div
                    class="vendor-item"
                    :class="{'completed': block.status==='completed'}"
                    v-for="(block,index) in event.components"
                    :key="index"
                  >
                    <div class="vendor-completed" v-if="block.status==='completed'">
                      <img
                        src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2032.svg"
                        width="15"
                      />
                    </div>
                    <div class="vendor-icon">
                      <img
                        src="http://static.maryoku.com/storage/icons/timeline/svg/Asset%20135.svg"
                        width="15"
                      />
                    </div>
                    <div class="vendor-title">{{block.title}}</div>
                  </div>
                </d> -->
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="footer-content">
              <img :src="`${iconsURL}Group 1175.svg`" width="20" />
              Venue proposals are waiting for your respond
            </div>
            <div class="footer-actions">
              <md-button class="md-default md-simple edit-btn md-just-icon">
                <md-icon>arrow_forward</md-icon>
              </md-button>
            </div>
          </div>
        </div>
      </div>

      <div class="md-layout-item md-size-25">
        <div class="card-section">
          <div class="section-header">
            <img :src="`${timlineIconsURL}timeline-title.svg`" /> Timeline
          </div>

          <div class="card-content">
            <div class="timeline-items">
              <div
                class="timeline-item d-flex justify-content-start"
                v-for="(timeline,index) in event.timelineItems"
              >
                <div class="timeline-item__time">{{timeline.startTime}} - {{timeline.endTime}}</div>
                <div class="timeline-item_title">{{timeline.title}}</div>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="footer-content d-flex align-center">
              <img
                src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2032.svg"
                width="20"
              />
              <div>
                Good Job, you finished creating your timeline
              </div>
            </div>
            <div class="footer-actions">
              <md-button class="md-rose md-simple edit-btn">
                Edit
                <md-icon>keyboard_arrow_right</md-icon>
              </md-button>
            </div>
          </div>
        </div>
      </div>

      <div class="md-layout-item md-size-75">
        <div class="card-section">
          <div class="section-header">
            <md-icon>attach_money</md-icon>RSVP & Campaigns
            <div class="header-info">
              Status:
              <span class="status"> Final </span>
            </div>
          </div>

          <div class="card-content rsvp">
            <div class="d-flex justify-center align-center">
              <div class="guests-details text-center">
                <img src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+26.png">
                <div class="total-budget">
                  Total Guests
                </div>
                <div class="total-budget-value">{{event.numberOfParticipants | withComma}}</div>
                <md-button class="md-rose md-simple edit-total-budget">Edit</md-button>
              </div>
              <div class="progress-bar">
                <div class="guests-progress d-flex justify-content-center align-center">
                  <div class="guests-progress__item green" style="width : 66%;">
                    <div class="value">1204</div>
                    <div class="progress"></div>
                    <div class="percentage">66%</div>
                  </div>
                  <div class="guests-progress__item red" style="width : 21%;">
                    <div class="value">240</div>
                    <div class="progress"></div>
                    <div class="percentage">21%</div>
                  </div>
                  <div class="guests-progress__item gray" style="width : 13%;">
                    <div class="value">120</div>
                    <div class="progress"></div>
                    <div class="percentage">13%</div>
                  </div>
                </div>

                <div class="guests-legends d-flex justify-content-center align-center">
                  <div class="guests-legends__item green">
                    Yes
                    <md-icon>keyboard_arrow_down</md-icon>
                  </div>
                  <div class="guests-legends__item red">
                    No
                    <md-icon>keyboard_arrow_down</md-icon>
                  </div>
                  <div class="guests-legends__item gray">
                    No replay
                    <md-icon>keyboard_arrow_down</md-icon>
                  </div>
                </div>
              </div>
              <div class="teaser">
                <span>Create your "Don't forget" teaser</span>
                and send it to those who didn't respond yet
                <md-button class="md-rose md-simple edit-btn md-flat btn-outlined">
                  Create Campaign
                </md-button>
              </div>
            </div>

            <div class="campaigns-section">
              <div class="section-title">Campaigns</div>
              <div class="campaigns-section__list">
                <div class="campaigns-section__item completed">
                  <div class="campaign-title">
                    <img
                      src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2032.svg"
                      width="15"
                    />
                    “Save The Date” campaign
                  </div>
                  <md-button class="md-default md-simple">Review</md-button>
                </div>
                <div class="campaigns-section__item completed">
                  <div class="campaign-title">
                    <img
                      src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2032.svg"
                      width="15"
                    />
                    First teaser - RSVP
                  </div>
                  <md-button class="md-default md-simple">Review</md-button>
                </div>
                <div class="campaigns-section__item">
                  <div class="campaign-title">Second teaser - RSVP</div>
                  <md-button class="md-rose md-simple">Create Campaign</md-button>
                </div>

                <div class="campaigns-section__item label-item">
                  <div class="campaign-title">‘Almost There’ Final Teaser</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="footer-content">
              <img :src="`${iconsURL}Asset 150.svg`" width="20" />
              It’s time to create second teaser
            </div>
            <div class="footer-actions">
              <md-button class="md-default md-simple edit-btn md-just-icon">
                <md-icon>arrow_forward</md-icon>
              </md-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventComponent from '@/models/EventComponent'
import EventTimelineItem from '@/models/EventTimelineItem'
import CalendarEventStatistics from '@/models/CalendarEventStatistics'

import moment from 'moment'
import swal from 'sweetalert2'
import { SlideYDownTransition } from 'vue2-transitions'
import InputMask from 'vue-input-mask'

import VueElementLoading from 'vue-element-loading'
// import auth from '@/auth';
import draggable from 'vuedraggable'
import { Drag, Drop } from 'vue-drag-drop'
import _ from 'underscore'
import {
  LabelEdit,
  AnimatedNumber,
  StatsCard,
  ChartCard,
  Modal
} from '@/components'
import ChartComponent from '@/components/Cards/ChartComponent'

import SideBar from '../../../components/SidebarPlugin/NewSideBar'
import SidebarItem from '../../../components/SidebarPlugin/NewSidebarItem.vue'

export default {
  name: 'event-time-line',
  components: {
    AnimatedNumber,
    ChartCard,
    ChartComponent,
    VueElementLoading,
    draggable,
    Drag,
    Drop,
    SlideYDownTransition,
    InputMask,
    SideBar,
    SidebarItem,
    CalendarEventStatistics,
    Modal
  },
  props: {
    // event: Object,
    // eventComponents: [Array, Function]
  },
  data: () => ({
    // auth: auth,
    event: null,
    eventId: null,
    percentage: 0,
    totalRemainingBudget: 0,
    remainingBudgetPerEmployee: 0,
    seriesData: [],
    routeName: null,
    budgetPerEmployee: 0,
    acceptedProposals: [],
    paidProposals: [],
    eventInfoCardExpanded: false,
    isLoading: true,
    pieChart: {},
    timelineItems: [],
    hoursArray: [],
    disabledDragging: false,
    timelineAttachment: null,
    iconsURL: 'http://static.maryoku.com/storage/icons/Event%20Page/',
    timlineIconsURL: 'http://static.maryoku.com/storage/icons/Timeline-New/',
    menuIconsURL:
      'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/',
    notes: {
      newNote: ""
    },
    radio: false
  }),
  methods: {
    /**
     * Handle drop block to time line items
     * @param data
     * @param event
     */
    handleDrop (data, event) {
      if (data) {
        let block = Object.assign({}, data.block)
        block.mode = 'edit'
        block.startTime = '08:00 am'
        block.endTime = '09:00 am'
        block.isItemLoading = false
        if (this.timelineItems.length > 0) {
          block.startTime = this.$moment(
            this.timelineItems[this.timelineItems.length - 1].endTime,
            'H:mm A'
          ).format('H:mm A')
          block.endTime = this.$moment(
            this.timelineItems[this.timelineItems.length - 1].endTime,
            'H:mm A'
          )
            .add(1, 'hour')
            .format('H:mm A')
        }
        this.timelineItems.push(Object.assign({}, block))
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

            let calendar = new Calendar({
              id: this.$auth.user.defaultCalendarId
            })
            let event = new CalendarEvent({ id: this.event.id })

            let timelineItem = new EventTimelineItem({ id: item.id }).for(
              calendar,
              event
            )

            timelineItem
              .delete()
              .then(result => {
                this.getTimelineItems()
              })
              .catch(error => {
                console.log(error)
                this.$root.$emit('timeline-updated', this.timelineItems)
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
      this.$router.push({
        name: 'EventDetails',
        params: { id: this.event.id }
      })
    },
    getTimelineItems () {
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      let event = new CalendarEvent({ id: this.event.id })

      new EventTimelineItem()
        .for(calendar, event)
        .get()
        .then(res => {
          console.log(res)
          this.timelineItems = _.sortBy(res, function (item) {
            return item.order
          })
          console.log(this.timelineItems)

          this.isLoading = false
          this.timelineItems.forEach(item => {
            item.isItemLoading = false
          })
          this.event.timelineItems = this.timelineItems
          this.$root.$emit('timeline-updated', this.timelineItems)
        })
    },
    cancelTimelineItem (item, index) {
      if (item.dateCreated) {
        this.$set(this.timelineItems[index], 'mode', 'saved')
      } else {
        this.timelineItems.splice(index, 1)
      }
      this.disabledDragging = false
    },
    saveTimelineItem (item, index) {
      console.log('ameed')
      this.setItemLoading(item, true, true)

      if (
        !item.startTime ||
        !item.endTime ||
        (!item.title && !item.description)
      ) {
        this.$notify({
          message:
            'From time, To time and ( Title or Description ) id Required',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'warning'
        })

        this.setItemLoading(item, false, true)

        return
      }

      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      let event = new CalendarEvent({ id: this.event.id })
      let order = ++index

      new EventTimelineItem({
        event: { id: event.id },
        title: item.title,
        buildingBlockType: item.buildingBlockType,
        description: item.description,
        startTime: item.startTime,
        endTime: item.endTime,
        order: order,
        icon: item.icon,
        color: item.color,
        link: item.link,
        attachment: this.timelineAttachment
      })
        .for(calendar, event)
        .save()
        .then(res => {
          this.getTimelineItems()
          this.disabledDragging = false
          this.$root.$emit('timeline-updated', this.timelineItems)
        })
        .catch(error => {
          console.log(error)
          this.disabledDragging = false
          this.$root.$emit('timeline-updated', this.timelineItems)
        })

      this.timelineAttachment = null
    },
    updateTimelineItem (item) {
      this.setItemLoading(item, true, true)

      if (
        !item.startTime ||
        !item.endTime ||
        (!item.title && !item.description)
      ) {
        this.$set(item, 'isItemLoading', false)

        this.$notify({
          message:
            'From time, To time and ( Title or Description ) id Required',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: 'warning'
        })

        this.setItemLoading(item, false, true)
        return
      }

      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      let event = new CalendarEvent({ id: this.event.id })

      let timelineItem = new EventTimelineItem({ id: item.id }).for(
        calendar,
        event
      )

      timelineItem.title = item.title
      timelineItem.description = item.description
      timelineItem.startTime = item.startTime
      timelineItem.endTime = item.endTime
      timelineItem.link = item.link
      timelineItem.attachment = this.timelineAttachment

      timelineItem
        .save()
        .then(res => {
          this.getTimelineItems()
          this.disabledDragging = false
          this.$root.$emit('timeline-updated', this.timelineItems)
        })
        .catch(error => {
          console.log(error)
          this.disabledDragging = false
          this.$root.$emit('timeline-updated', this.timelineItems)
        })

      this.timelineAttachment = null
    },
    updateTimelineITemsOrder () {
      this.isLoading = true
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      let event = new CalendarEvent({ id: this.event.id })

      let new_order = 1
      const timelineItemsForUpdate = []
      this.timelineItems.forEach(item => {
        item.order = new_order
        timelineItemsForUpdate.push({ id: item.id, order: new_order })
        new_order += 1
      })

      let timelineItem = new EventTimelineItem({
        id: 'updateMultiple',
        timelineItems: timelineItemsForUpdate
      }).for(calendar, event)

      timelineItem.order = new_order

      timelineItem
        .save()
        .then(res => {
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
        })
        .catch(error => {
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

    getCalendarEventStatistics (evt) {
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      let event = new CalendarEvent({ id: evt.id })

      if (!evt.id) {
        return
      }

      new CalendarEventStatistics()
        .for(calendar, event)
        .get()
        .then(resp => {
          this.totalRemainingBudget =
            evt.totalBudget - resp[0].totalAllocatedBudget
          this.remainingBudgetPerEmployee =
            this.totalRemainingBudget / evt.numberOfParticipants // evt.totalBudget - resp[0].totalAllocatedBudget
          this.percentage =
            100 -
            (
              (resp[0].totalAllocatedBudget /
                (evt.budgetPerPerson * evt.numberOfParticipants)) *
              100
            ).toFixed(2)

          if (this.percentage > 0) {
            this.seriesData = [
              {
                value: 100 - this.percentage,
                className: 'budget-chart-slice-a-negative'
              },
              {
                value: this.percentage,
                className: 'budget-chart-slice-b-negative'
              }
            ]
          } else {
            this.seriesData = [
              { value: 0.01, className: 'budget-chart-slice-a-negative' },
              { value: 99.99, className: 'budget-chart-slice-b-negative' }
            ]
          }

          this.pieChart = {
            data: {
              labels: [' ', ' '], // should be empty to remove text from chart
              series: this.seriesData
            },
            options: {
              padding: 0,
              height: 156,
              donut: true,
              donutWidth: 34
            }
          }

          this.budgetPerEmployee = evt.budgetPerPerson // this.totalRemainingBudget / evt.numberOfParticipants
          this.allocatedBudget = resp.totalAllocatedBudget
          this.event.statistics['allocatedBudget'] = this.allocatedBudget
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    [...Array(12).keys()].map(x =>
      x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined
    );
    [...Array(12).keys()].map(x =>
      x === 0
        ? this.hoursArray.push(`12:00 PM`)
        : this.hoursArray.push(`${x}:00 PM`)
    );
    [...Array(8).keys()].map(x =>
      x === 0
        ? this.hoursArray.push(`12:00 AM`)
        : this.hoursArray.push(`${x}:00 AM`)
    )

    this.hoursArray.push()

    this.$auth.currentUser(
      this,
      true,
      function () {
        let _calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })

        _calendar
          .calendarEvents()
          .find(this.$route.params.id)
          .then(event => {
            this.event = event

            console.log(this.event)

            this.getCalendarEventStatistics(event)

            this.getTimelineItems()

            new EventComponent()
              .for(_calendar, event)
              .get()
              .then(components => {
                this.event.components = components
                this.selectedComponents = components
              })

            console.log(event)
          })
      }.bind(this)
    )
  },
  mounted () {
    this.isLoading = true
    // if (this.event && this.event.id){
    //     this.$root.$emit("set-title",this.event, this.routeName === 'EditBuildingBlocks',true);
    //     this.getTimelineItems();
    // }
  },
  watch: {
    event (newVal, oldVal) {
      this.$root.$emit(
        'set-title',
        this.event,
        this.routeName === 'EditBuildingBlocks',
        true
      )
      this.getTimelineItems()
    }
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('MMM Do YYYY')
    },
    formatTime: function (date) {
      return moment(date).format('h:00 A')
    },
    formatDuration: function (startDate, endDate) {
      return moment(endDate).diff(startDate, 'hours')
    },
    withComma (amount) {
      return amount ? amount.toLocaleString() : 0
    }
  },
  computed: {
    getPaidAmount () {
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      let event = new CalendarEvent({ id: this.event.id })
      let eventComponents = this.event.components
      let paidAmount = 0
      this.getAcceptedAndPaidProposals(calendar, event, eventComponents)

      if (this.paidProposals.length > 0) {
        return this.paidProposals.reduce((p, item) => p + item.proposalCost, 0)
      } else {
        return 0
      }
    },
    getToBePaidAmount () {
      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      let event = new CalendarEvent({ id: this.event.id })
      let eventComponents = this.event.components
      let toBePaidAmount = 0
      this.getAcceptedAndPaidProposals(calendar, event, eventComponents)

      if (this.acceptedProposals.length > 0) {
        return this.acceptedProposals.reduce(
          (p, item) => p + item.proposalCost,
          0
        )
      } else {
        return 0
      }
    },
    getTotalAmountByGuestType () {
      if (this.event.participantsType === 'Guests and spouse') {
        // return parseInt(this.event.numberOfParticipants * this.event.budgetPerPerson  * 2)
        return parseInt(this.event.totalBudget) * 2
      } else {
        // return parseInt(this.event.numberOfParticipants * this.event.budgetPerPerson)
        return parseInt(this.event.totalBudget)
      }
    },
    getTotalRemainingBudget () {
      return this.totalRemainingBudget
    },
    getRemainingBudgetPerEmployee () {
      if (this.event.budgetPerPerson === 0) {
        return 0
      } else {
        if (this.event.participantsType === 'Guests and spouse') {
          return (
            this.getTotalRemainingBudget / this.event.numberOfParticipants / 2
          )
        } else {
          return this.getTotalRemainingBudget / this.event.numberOfParticipants
        }
      }
    },
    getPercentage () {
      if (this.event.budgetPerPerson === 0) {
        return 0
      } else {
        return (
          (this.getTotalRemainingBudget / this.getTotalAmountByGuestType) * 100
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .status-bar {
    .status-info {
      margin-left: 40%;
    }
  }
  .md-radio {
    display: flex;
    margin: 50px 0px;


  }
  .md-radio-container {
      border: 1px solid rgba(0, 0, 0, 0.54) !important;
      width: 30px;
      min-width: 30px;
      height: 30px;
      top: 2px;
      -webkit-transition: .2s !important;
      transition: .2s !important;
  }
  .budget-details {
    text-align: center;
  }
  .total-budget-value {
    white-space: nowrap;
  }
  .budget-total {
    padding: 0 20px;
    flex-grow: 1;
    display: flex;
    justify-items: center;
    align-items: center;
    .budget-details {
      height: max-content;
      line-height: 2.5rem;
    }
  }
  .budget-percentage {
    padding: 0 20px;
    border-left: 1px solid #e2e2e2;
    border-right: 1px solid #e2e2e2;
    flex-grow: 1;
    .chart-legends{
      margin: auto;
    }
  }
  .book-venue {
    flex-grow: 2;
    max-width: 50%;
    padding: 0 20px;
    .booked-vendors__header{
      margin:40px 40px 10px;
    }
    .venue-item {
      border-radius: 3px;
      border: solid 0.5px #707070;
      flex-grow: 1;
      margin: 8px;
      width: 139px;
      height: 161px;
      text-align: center;
      padding:16px;
      .budget {
        font-size: 20px;
        font-weight: 800;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.3;
        letter-spacing: normal;
        text-align: right;
        color: #050505;
      }
      .description {
        margin-top:16px;
        font-size: 16px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.38;
        letter-spacing: normal;
        text-align: center;
        color: #050505;
      }
    }
    
  }
  .btn-outlined {
    margin: auto;
    border-radius: 3px;
    border: solid 1px #f51355;
    margin-left: 50%;
    box-sizing: border-box;
    transform: translateX(-50%);
  }
  .rsvp {
    .guests-details{
      width: 25%;
      padding: 10px 30px;
    }
    .progress-bar {
      width: 50%;
      border-left: 1px solid #e2e2e2;
      border-right: 1px solid #e2e2e2;
      padding: 10px 30px;
    }
    .teaser {
      width: 25%;
      padding: 20px 50px;
    }
  }
  .guests-progress {
    .header-status{
        .progress {
          height:10px;
        }
    }
  }
  .guests-progress {
      &__item {
          &:first-child {
            z-index:10;
            .progress {
              border-radius: 100px;
            }
          }
          &:nth-child(2) {
            z-index:5;
            .progress {
              border-radius: 0 100px  100px 0;
              &::before {
                background-color: inherit;
                content: '';
                width: 50px;
                height: 100%;
                display: block;
                transform: translateX(-30px);
                z-index:5;
              }
            }
          }
          &:last-child {
            z-index: 1;
            .progress {
              border-radius: 0 100px  100px 0;
              &::before {
                background-color: inherit;
                content: '';
                width: 50px;
                height: 100%;
                display: block;
                transform: translateX(-30px);
              }
            }
          }
          .value {
              font-weight: bold;
              color : #050505;
              font-size: 14px;
          }

          .progress {
              height: 30px;
              margin : 0.6em 0;
          }
          .percentage {
              font-weight: bold;
              font-size: 14px;
          }

          &.green {
              .progress {
                  background-color: #2cde6b;
              }
              .percentage {
                  color : #2cde6b;
              }
          }
          &.red {
              .progress {
                  background-color: #f51355;

              }
              .percentage {
                  color : #f51355;
              }

          }
          &.gray {
              .progress {
                  background-color: #d5d5d5;
              }
              .percentage {
                  color : #d5d5d5;
              }
          }
      }
  }

    
</style>