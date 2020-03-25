<template>
  <div class="md-layout new-event-details edit-event-details" v-if="event">
    <side-bar :event="event"></side-bar>

    <div class="event-details-header md-layout-item md-size-100">
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
        <div class="event-items">
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
        </div>
      </div>
    </div>

    <div class="md-layout justify-content-between" style="margin-top : 2em;">
      <div class="md-layout-item md-size-40">
        <div class="card-section">
          <div class="section-header">
            <img :src="`${iconsURL}Asset 162.svg`" /> Event’s details
          </div>

          <div class="card-content">
            <div class="d-flex justify-content-start align-center">
              <div class="event-details-list">
                <ul class="list-items">
                  <li class="event-details-item">
                    <img :src="`${iconsURL}sun.svg`" width="20" />
                    <span>{{event.eventDayPart}} Time event</span>
                  </li>
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
                    <img :src="`${iconsURL}Asset 167.svg`" width="20" />
                    <span>{{event.location}}</span>
                  </li>
                </ul>
              </div>
              <div class="event-weather">
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
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="footer-content"></div>
            <div class="footer-actions">
              <md-button class="md-rose md-simple edit-btn">
                Edit
                <md-icon>keyboard_arrow_right</md-icon>
              </md-button>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-60">
        <div class="card-section">
          <div class="section-header">
            <img :src="`${iconsURL}Group 3090.svg`" /> Budget & Vendors
          </div>

          <div class="card-content">
            <div class="d-flex justify-content-between">
              <div class="budget-percentage">
                <div class="chart-section d-flex justify-content-around align-center">
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
                    <div
                      class="legend-item used"
                    >Used ${{event.totalBudget - getTotalRemainingBudget}}</div>
                    <div
                      class="legend-item remaining"
                    >Remaining ${{getTotalRemainingBudget | withComma}}</div>
                  </div>
                </div>

                <div class="budget-details d-flex justify-content-center align-center">
                  <div class="total-budget-value">$ {{event.totalBudget | withComma}}</div>
                  <div class="total-budget">
                    Total Budget
                    <br />
                    <md-button class="md-rose md-simple edit-total-budget">Edit</md-button>
                  </div>
                </div>
              </div>

              <div class="booked-vendors">
                <div class="booked-vendors__header d-flex justify-content-start align-center">
                  <h3 class="header-title">Booked Vendors</h3>
                  <md-button class="md-rose md-simple">Edit</md-button>
                </div>

                <div class="booked-vendors__items" v-if="event.components">
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
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="footer-content">
              <img :src="`${iconsURL}Group 1175.svg`" width="20" />
              Band proposals are waiting for your respond
            </div>
            <div class="footer-actions">
              <md-button class="md-default md-simple edit-btn md-just-icon">
                <md-icon>arrow_forward</md-icon>
              </md-button>
            </div>
          </div>
        </div>
      </div>

      <div class="md-layout-item md-size-60">
        <div class="card-section">
          <div class="section-header">
            <img :src="`${timlineIconsURL}Group 2774.svg`" /> Timeline
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
            <div class="footer-content">
              <img
                src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2032.svg"
                width="20"
              />
              Good Job, you finished creating your timeline
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

      <div class="md-layout-item md-size-40">
        <div class="card-section">
          <div class="section-header">
            <md-icon>attach_money</md-icon>RSVP & Campaigns
          </div>

          <div class="card-content">
            <div class="text-center">
              <div class="guests-details d-flex justify-content-center align-center">
                <div class="total-budget-value">{{event.numberOfParticipants | withComma}}</div>
                <div class="total-budget">
                  Total Guests
                  <br />
                  <md-button class="md-rose md-simple edit-total-budget">Edit</md-button>
                </div>
              </div>

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
    timlineIconsURL: 'http://static.maryoku.com/storage/icons/timeline/',
    menuIconsURL:
      'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/'
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
              donutWidth: 8
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
<style lang="scss">
</style>
