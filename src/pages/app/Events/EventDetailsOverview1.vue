<template>
  <div class="md-layout event-details-overview edit-event-details" v-if="event">
    <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
    <div class="event-details-header md-layout-item md-size-100">
      <div class="event-details-info d-flex justify-content-start">
        <div
          class="event-title d-flex justify-content-center align-center"
          :style="`background : linear-gradient(rgba(0,0,0,0.48),rgba(0,0,0,0.48)),url(${logger}) center center no-repeat`"
        >
          <div class="content">
            <router-link
              :to="`/events/${event.id}/booking/concept`"
              tag="md-button"
              class="md-default md-simple md-white edit-btn text-left"
            >
              Event's Concept
              <md-icon>keyboard_arrow_right</md-icon>
            </router-link>
            <popup v-if="event.concept">
              <template slot="content">
                <h3 v-html="conceptName"></h3>
              </template>
              <template slot="popup">
                <div class="popup-header">
                  <img :src="`${$iconURL}Concept/Asset 491.svg`" width="30" />
                  Event's concept
                </div>
                <div class="popup-body">{{ event.concept.description }}</div>
                <div class="popup-footer">
                  <router-link
                    :to="`/events/${event.id}/booking/concept`"
                    tag="md-button"
                    class="edit-btn md-rose md-simple edit-btn"
                  >
                    Change Concept
                    <md-icon>keyboard_arrow_right</md-icon>
                  </router-link>
                </div>
              </template>
            </popup>
          </div>
        </div>
        <div class="header-detail">
          <div class="header-info-section">
            <div class="status-bar">
              <div class="description">
                <span class="status-title">STATUS</span>
                <span class="status-info">
                  <span class="status-percentage">22%</span> |
                  <span class="status-tasks">4 tasks of 26</span>
                </span>
              </div>
              <div class="bar">
                <div class="progress-bar">
                  <div class="guests-progress d-flex justify-content-center align-center">
                    <div class="guests-progress__item header-status red" style="width: 22%; height: 8px">
                      <div class="progress"></div>
                    </div>
                    <div class="guests-progress__item header-status gray" style="width: 78%; height: 8px">
                      <div class="progress"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="section-header">
              <img :src="`${iconsURL}flag-dark.svg`" />
              Event’s details
              <label class="header-tip">
                <img :src="`${iconsURL}warning-circle-gray.svg`" />
                Notice that the date has changed
              </label>
            </div>
          </div>
          <div class="detail-content event-details-list">
            <ul class="list-items">
              <li class="event-details-item">
                <img :src="`${iconsURL}calendar-gray.svg`" width="20" />
                <span>
                  {{ event.eventStartMillis | formatDate }},
                  {{ event.eventStartMillis | formatTime }}
                  ({{ event.eventStartMillis | formatDuration(event.eventEndMillis) }}h)
                </span>
              </li>
              <li class="event-details-item">
                <img :src="`${iconsURL}users-gray.svg`" width="20" />
                <span>{{ event.numberOfParticipants }} Invited</span>
              </li>
              <li class="event-details-item">
                <img :src="`${iconsURL}flag-gray.svg`" width="20" />
                <span>{{ event.eventType.name }}</span>
              </li>
            </ul>
            <ul class="list-items">
              <li class="event-details-item">
                <img :src="`${iconsURL}location-gray.svg`" width="20" />
                <span>{{ event.location }}</span>
              </li>
              <li class="event-details-item">
                <img :src="`${iconsURL}sun.svg`" width="20" />
                <span>{{ event.eventDayPart }} Time event</span>
              </li>
              <li class="event-details-item" v-if="canEdit">
                <md-button class="md-rose md-simple edit-btn" @click="openEditDetail">
                  Edit Details
                  <md-icon>keyboard_arrow_right</md-icon>
                </md-button>
              </li>
            </ul>
          </div>
        </div>
        <header-actions @toggleCommentMode="toggleCommentMode"></header-actions>
      </div>
    </div>
    <div class="md-layout justify-content-between notes" style="margin: 2em 50px">
      <div class="md-layout-item md-size-30 first-row">
        <div class="card-section">
          <div class="section-header">
            <img :src="`${iconsURL}note-dark.svg`" /> Notes
            <button class="md-rose md-simple notes-filter-btn" @click="showEditDetailModal = true">
              <img :src="`${iconsURL}filter-dark.svg`" width="20" />
            </button>
          </div>
          <div class="card-content">
            <div class="d-flex justify-content-start align-center">
              <input
                type="text"
                class="form-control input-new-note"
                v-model="notes.newNote"
                placeholder="Add new note"
              />
            </div>
            <div class>
              <md-radio v-model="radio" value="1">
                <div class="note-item">
                  <div class="note-item-label">Lorem ipsum dolor sit amet sit</div>
                  <div class="note-item-action">
                    <img :src="`${this.iconsURL}edit-dark.svg`" width="20" style="margin-right: 10px" />
                    <img :src="`${this.timlineIconsURL}Trash.svg`" width="20" />
                  </div>
                </div>
              </md-radio>
              <md-radio v-model="radio" value="2">
                <div class="note-item">
                  <div class="note-item-label">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</div>
                  <div class="note-item-action">
                    <img :src="`${this.iconsURL}edit-dark.svg`" width="20" style="margin-right: 10px" />
                    <img :src="`${this.timlineIconsURL}Trash.svg`" width="20" />
                  </div>
                </div>
              </md-radio>
              <md-radio v-model="radio" value="3">
                <div class="note-item">
                  <div class="note-item-label">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempo
                  </div>
                  <div class="note-item-action">
                    <img :src="`${this.iconsURL}edit-dark.svg`" width="20" style="margin-right: 10px" />
                    <img :src="`${this.timlineIconsURL}Trash.svg`" width="20" />
                  </div>
                </div>
              </md-radio>
              <md-radio v-model="radio" value="4">
                <div class="note-item">
                  <div class="note-item-label">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                  </div>
                  <div class="note-item-action">
                    <img :src="`${this.iconsURL}edit-dark.svg`" width="20" style="margin-right: 10px" />
                    <img :src="`${this.timlineIconsURL}Trash.svg`" width="20" />
                  </div>
                </div>
              </md-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-70 first-row">
        <div class="card-section">
          <div class="section-header">
            <img :src="`${iconsURL}budget-dark.svg`" /> Budget & Vendors
            <!-- <img :src="`${iconsURL}Asset 453.svg`" /> -->
            <span class="saved-budget">
              So far you saved:
              <img :src="`${iconsURL}plus-green.svg`" width="20" /> $ 100
            </span>
          </div>

          <div class="card-content d-flex align-center">
            <div class="d-flex justify-content-between align-center">
              <div class="budget-details">
                <div>Total Budget</div>
                <div class="total-budget-value">$ {{ event.totalBudget | withComma }}</div>
                <router-link
                  :to="`/events/${event.id}/edit/budget`"
                  tag="md-button"
                  class="edit-btn md-rose md-simple edit-btn"
                  >Edit</router-link
                >
              </div>
              <div class="budget-percentage">
                <div class="chart-section">
                  <div class="title title-budget-prise-negative">
                    <div class="budget-pie-container">
                      <chart-component
                        :chart-data="pieChart.data"
                        :chart-options="pieChart.options"
                        chart-type="Pie"
                        style="grid-column: 1; grid-row: 1; color: green"
                      />
                      <animated-number
                        ref="totalRemainingBudgetNumber"
                        :value="Number(percentage)"
                        class="percentage"
                        suffix="%"
                      ></animated-number>
                    </div>
                  </div>

                  <div class="chart-legends">
                    <div class="legend-item used">
                      <span class="legend-item-mark">Booked</span>
                      <span>$ {{ event.totalBudget - getTotalRemainingBudget }}</span>
                    </div>
                    <div class="legend-item remaining">
                      <span class="legend-item-mark">Remaining</span>
                      <span>$ {{ getTotalRemainingBudget | withComma }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="book-venue">
                <div class="booked-vendors__header d-flex justify-content-start align-center">
                  <img
                    src="https://static-maryoku.s3.amazonaws.com/storage/icons/Event Page/home-dark.svg"
                    width="20px"
                  />
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

                <md-button class="md-rose md-simple md-flat btn-outlined">Book Venue</md-button>
                <!-- <div class="booked-vendors__items" v-if="event.components">
                  <div
                    class="vendor-item"
                    :class="{'completed': block.status==='completed'}"
                    v-for="(block,index) in event.components"
                    :key="index"
                  >
                    <div class="vendor-completed" v-if="block.status==='completed'">
                      <img
                        src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/SVG/Asset%2032.svg"
                        width="15"
                      />
                    </div>
                    <div class="vendor-icon">
                      <img
                        src="https://static-maryoku.s3.amazonaws.com/storage/icons/timeline/svg/Asset%20135.svg"
                        width="15"
                      />
                    </div>
                    <div class="vendor-title">{{block.title}}</div>
                  </div>
                </d>-->
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="footer-content">
              <img :src="`${iconsURL}light.svg`" width="20" />
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

      <div class="md-layout-item md-size-30 second-row">
        <div class="card-section">
          <div class="section-header">
            <img :src="`${timlineIconsURL}timeline-title.svg`" /> Timeline
            <div class="header-info">
              Status:
              <span class="status">Final</span>
            </div>
          </div>
          <div class="card-content timeline-card">
            <div class="timeline-items">
              <div class="timeline-item-day" v-for="(timelineDate, timelineIndex) in timeline" :key="timelineIndex">
                <div class="time-line-edit d-flex justify-content-center align-center time-line-header">
                  <div class="cross-line cross-line-left"></div>
                  <div class="d-flex justify-content-center align-center label">
                    <label style="white-space: nowrap; padding-right: 10px; text-transform: capitalize"
                      >Day {{ numberToWord(timelineIndex + 1) }}</label
                    >
                    <div>{{ formatDateString(timelineDate.itemDay) }}</div>
                  </div>
                  <div class="cross-line cross-line-right"></div>
                </div>
                <div
                  class="timeline-item d-flex justify-content-start"
                  v-for="(timeline, index) in timelineDate.items"
                  :key="index"
                >
                  <img
                    class="timeline-item_icon"
                    :src="`${timlineIconsURL}${timeline.icon.toLowerCase()}-circle.svg`"
                    width="45"
                  />
                  <div class="timeline-item_time">
                    {{ formatHour(timeline.startTime) }} - {{ formatHour(timeline.endTime) }}
                    <div class="timeline-item_time_title">{{ timeline.title }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="footer-content d-flex align-center">
              <img
                src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/SVG/Asset%2032.svg"
                width="20"
              />
              <div>
                Good Job, you finished
                <br />creating your timeline
              </div>
            </div>
            <div class="footer-actions">
              <router-link :to="`/events/${event.id}/edit/timeline`" tag="md-button" class="edit-btn md-rose md-simple">
                Edit
                <md-icon>keyboard_arrow_right</md-icon>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="md-layout-item md-size-70 second-row">
        <div class="card-section">
          <div class="section-header">
            <img :src="`${iconsURL}users-dark.svg`" width="25" />
            RSVP & Campaigns
            <div class="header-info">
              Status:
              <span class="status">Final</span>
            </div>
          </div>

          <div class="card-content rsvp d-flex align-center justify-center">
            <div class="d-flex justify-around align-center" style="width: 100%">
              <div class="guests-details text-center">
                <img :src="`${iconsURL}users-gray.svg`" width="50" />
                <div class="total-budget">Total Guests</div>
                <div class="total-budget-value">{{ event.numberOfParticipants | withComma }}</div>
                <md-button class="md-rose md-simple edit-btn" @click="openEditDetail">Edit</md-button>
              </div>
              <div class="progress-bar">
                <div class="guests-progress d-flex justify-content-center align-center">
                  <div class="guests-progress__item green" style="width: 66%">
                    <div class="value">1204</div>
                    <div class="progress"></div>
                    <div class="percentage">66%</div>
                  </div>
                  <div class="guests-progress__item red" style="width: 21%">
                    <div class="value">240</div>
                    <div class="progress"></div>
                    <div class="percentage">21%</div>
                  </div>
                  <div class="guests-progress__item gray" style="width: 13%">
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
                <img src="https://static-maryoku.s3.amazonaws.com/storage/icons/Event Page/Group 6044.svg" width="50" />
                <div class="campaign-description-1">
                  Create your
                  <br />"Don't forget" teaser
                </div>
                <div class="campaign-description-2">and send it to those who didn't respond yet</div>
                <md-button class="md-rose md-simple md-flat btn-outlined">Create Campaign</md-button>
              </div>
            </div>
            <!-- 
            <div class="campaigns-section">
              <div class="section-title">Campaigns</div>
              <div class="campaigns-section__list">
                <div class="campaigns-section__item completed">
                  <div class="campaign-title">
                    <img
                      src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/SVG/Asset%2032.svg"
                      width="15"
                    />
                    “Save The Date” campaign
                  </div>
                  <md-button class="md-default md-simple">Review</md-button>
                </div>
                <div class="campaigns-section__item completed">
                  <div class="campaign-title">
                    <img
                      src="https://static-maryoku.s3.amazonaws.com/storage/icons/budget+screen/SVG/Asset%2032.svg"
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
            </div>-->
          </div>

          <div class="card-footer">
            <div class="footer-content">
              <img :src="`${iconsURL}warning-circle-gray.svg`" width="20" />
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

    <modal v-if="showEditDetailModal" class="edit-event-model">
      <template slot="header">
        <div class="edit-event-model__header maryoku-modal-header">
          <h2>Edit event's detail</h2>
          <div class="header-description">
            <img :src="`${iconsURL}warning-circle-gray.svg`" width="20" />
            <span>Changing the time on your status might cause price changes</span>
          </div>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="showEditDetailModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
      </template>
      <template slot="body">
        <div class="md-layout">
          <div class="md-layout-item md-size-100">
            <div class="d-flex justify-content-between">
              <md-radio v-model="editEvent.eventDayPart" value="daytime">
                <img :src="`${iconsURL}sun-dark.svg`" width="25" style="margin: 0 10px" />
                <span>Day Time event</span>
              </md-radio>
              <md-radio v-model="editEvent.eventDayPart" value="evening">
                <img :src="`${iconsURL}night-dark.svg`" width="20" style="margin: 0 10px" />
                <span>Evening event</span>
              </md-radio>
              <md-radio v-model="editEvent.eventDayPart" value="wholeday">A whole day or more</md-radio>
            </div>
          </div>
          <!-- <div class="md-layout-item md-size-100 text-left">
            <label class="evnet-detail-label">Event Type</label>
            <div class="form-group maryoku-field">
              <md-field class="mt-0 mb-2">
                <md-select v-model="eventType">
                  <md-option
                    v-for="(type,index) in eventTypes"
                    :key="index"
                    :value="type.id"
                  >
                    {{ type.name }}
                  </md-option>
                </md-select>
              </md-field>
              <v-select v-model="editEvent.type" :options="eventTypes"></v-select>
            </div>
          </div>-->
          <div class="md-layout-item md-size-50 text-left">
            <label class="evnet-detail-label">Event Type</label>
            <div class="form-group maryoku-field" v-if="editEvent.eventType">
              <!-- <v-select v-model="editEvent.type" :options="eventTypes" item-text="name"></v-select> -->
              <v-select
                :options="
                  eventTypes.map((item) => {
                    return item.name;
                  })
                "
                name="category"
                v-model="editEvent.eventType.name"
                v-validate="'required'"
                item-text="name"
              ></v-select>

              <!-- <md-field class="mt-0 mb-2">
                <md-select v-model="editEvent.eventType.id">
                  <md-option
                    v-for="(type,index) in eventTypes"
                    :key="index"
                    :value="type.id"
                  >
                    {{ type.name }}
                  </md-option>
                </md-select>
              </md-field>-->
            </div>
          </div>
          <div class="md-layout-item md-size-50 text-left"></div>
          <div class="md-layout-item md-size-50 text-left md-offset-50">
            <label class="evnet-detail-label">Date</label>
            <div class="form-group">
              <md-datepicker
                :class="[{ 'md-error': editEvent.date }]"
                v-model="editEvent.eventStartMillis"
                data-vv-name="date"
                md-immediately
                required
              ></md-datepicker>
            </div>
          </div>
          <div class="md-layout-item md-size-50 text-left"></div>
          <div class="md-layout-item md-size-50 margin-bottom text-left">
            <label class="evnet-detail-label">Number Of Guests</label>
            <div class="form-group with-icon">
              <div class="input-icon">
                <img :src="`${iconsURL}users-dark.svg`" width="20" />
              </div>
              <input type="number" class="form-control" v-model="editEvent.numberOfParticipants" />
            </div>
          </div>
          <div class="md-layout-item md-size-100 margin-bottom text-left">
            <label class="evnet-detail-label">Location</label>
            <!-- <div class="input-icon">
                <img :src="`${iconsURL}location-dark.svg`" width="20" />
            </div>-->
            <!-- <input type="text" class="form-control" v-model="editEvent.location" /> -->
            <location-input
              v-model="editEvent.location"
              placeholder="Type city / region or specific address here…"
            ></location-input>
          </div>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-default md-simple cancel-btn" @click="showEditDetailModal = false">Cancel</md-button>
        <md-button class="md-red add-category-btn" @click="updateEvent">Save</md-button>
      </template>
    </modal>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Calendar from "@/models/Calendar";
import CalendarEvent from "@/models/CalendarEvent";
import EventComponent from "@/models/EventComponent";
import EventTimelineItem from "@/models/EventTimelineItem";
import CalendarEventStatistics from "@/models/CalendarEventStatistics";

import moment from "moment";
import Swal from "sweetalert2";
import { SlideYDownTransition } from "vue2-transitions";
import InputMask from "vue-input-mask";

import VueElementLoading from "vue-element-loading";
// import auth from '@/auth';
import draggable from "vuedraggable";
import { Drag, Drop } from "vue-drag-drop";
import _ from "underscore";
import { LabelEdit, AnimatedNumber, StatsCard, ChartCard, Modal, LocationInput } from "@/components";
import ChartComponent from "@/components/Cards/ChartComponent";
import EditEventDetailModal from "@/components/Modals/EditEventDetailModal";
import SideBar from "../../../components/SidebarPlugin/NewSideBar";
import SidebarItem from "../../../components/SidebarPlugin/NewSidebarItem.vue";
import TimeCounter from "./components/TimeCounter";
import Popup from "../../../components/Popup";
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "./components/CommentEditorPanel";
import vSelect from "vue-select";

export default {
  name: "event-overview",
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
    Modal,
    TimeCounter,
    Popup,
    HeaderActions,
    CommentEditorPanel,
    LocationInput,
    vSelect,
  },
  props: {
    // event: Object,
    // eventComponents: [Array, Function]
  },
  data() {
    return {
      // auth: auth,
      calendar: null,
      event: null,
      editEvent: null,
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
      iconsURL: `${this.$iconURL}Event%20Page/`,
      timlineIconsURL: `${this.$iconURL}Timeline-New/`,
      menuIconsURL: `${this.$iconURL}menu%20_%20checklist/SVG/`,
      notes: {
        newNote: "",
      },
      radio: false,
      showEditDetailModal: false,
      timeline: [],
      a: [
        "",
        "one ",
        "two ",
        "three ",
        "four ",
        "five ",
        "six ",
        "seven ",
        "eight ",
        "nine ",
        "ten ",
        "eleven ",
        "twelve ",
        "thirteen ",
        "fourteen ",
        "fifteen ",
        "sixteen ",
        "seventeen ",
        "eighteen ",
        "nineteen ",
      ],
      b: ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
      logger: "./static/img/logo.jpg",
      conceptName: "",
      showCommentEditorPanel: false,
    };
  },
  methods: {
    getTimelineItems() {
      let event = new CalendarEvent({ id: this.event.id });

      new EventTimelineItem()
        .for(this.calendar, event)
        .get()
        .then((res) => {
          this.timelineItems = _.sortBy(res, function (item) {
            return item.order;
          });

          this.isLoading = false;
          this.timelineItems.forEach((item) => {
            item.isItemLoading = false;
          });

          var timelines = {};
          // define timelines
          this.timelineItems.forEach((item) => {
            item.isItemLoading = false;
            if (!timelines[item.plannedDate]) timelines[item.plannedDate] = [];
            item.isItemLoading = false;
            timelines[item.plannedDate].push(item);
          });

          if (Object.keys(timelines).length > 0) {
            this.timeline = [];
            Object.keys(timelines).forEach((itemDay, index) => {
              this.timeline.push({
                itemDay: parseInt(itemDay),
                isEditable: false,
                items: timelines[itemDay],
              });
            });
          }
          this.timeline = _.sortBy(this.timeline, function (item) {
            return item.itemDay;
          });
          // this.timeline[0].items.forEach((item) => {
          //     item.isItemLoading = false
          // })
          this.event.timeline = this.timeline;
          this.event.timelineItems = this.timelineItems;
          this.$root.$emit("timeline-updated", this.timelineItems);
        });
    },
    getCalendarEventStatistics(evt) {
      let event = new CalendarEvent({ id: evt.id });

      if (!evt.id) {
        return;
      }

      new CalendarEventStatistics()
        .for(this.calendar, event)
        .get()
        .then((resp) => {
          if (!resp[0].totalBookedBudget) resp[0].totalBookedBudget = 0;
          this.totalBookedBudget = resp[0].totalBookedBudget;
          this.totalRemainingBudget = evt.totalBudget - resp[0].totalBookedBudget;
          this.totalBookedBudget = resp[0].totalBookedBudget;
          this.remainingBudgetPerEmployee = this.totalRemainingBudget / evt.numberOfParticipants; // evt.totalBudget - resp[0].totalAllocatedBudget
          this.percentage = ((this.totalBookedBudget / evt.totalBudget) * 100).toFixed(2);
          // 100 -
          // (
          //   (resp[0].totalAllocatedBudget /
          //     (evt.budgetPerPerson * evt.numberOfParticipants)) *
          //   100
          // ).toFixed(2)

          if (this.percentage > 0) {
            this.seriesData = [
              {
                value: this.percentage,
                className: "budget-chart-slice-a-negative",
              },
              {
                value: 100 - this.percentage,
                className: "budget-chart-slice-b-negative",
              },
            ];
          } else {
            this.seriesData = [
              { value: 99.99, className: "budget-chart-slice-a-negative" },
              { value: 0.01, className: "budget-chart-slice-b-negative" },
            ];
          }

          this.pieChart = {
            data: {
              labels: [" ", " "], // should be empty to remove text from chart
              series: this.seriesData,
            },
            options: {
              padding: 0,
              height: 220,
              donut: true,
              donutWidth: 34,
            },
          };

          this.budgetPerEmployee = evt.budgetPerPerson; // this.totalRemainingBudget / evt.numberOfParticipants
          this.allocatedBudget = resp.totalAllocatedBudget;
          this.event.statistics["allocatedBudget"] = this.allocatedBudget;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openEditDetail() {
      this.editEvent = {
        eventDayPart: this.event.eventDayPart,
        eventType: this.event.eventType,
        eventStartMillis: this.event.eventStartMillis,
        numberOfParticipants: this.event.numberOfParticipants,
        location: this.event.location,
      };
      this.showEditDetailModal = true;
    },
    updateEvent() {
      let updateEvent = new CalendarEvent({ id: this.event.id }).for(this.calendar);
      updateEvent.eventDayPart = this.editEvent.eventDayPart;
      updateEvent.eventStartMillis = this.editEvent.eventStartMillis;
      updateEvent.numberOfParticipants = this.editEvent.numberOfParticipants;
      updateEvent.location = this.editEvent.location;

      const eventType = this.eventTypes.find((it) => it.name === this.editEvent.eventType.name);
      updateEvent.eventType = eventType;
      if (updateEvent.eventDayPart === "evening") {
        updateEvent.eventStartMillis.setHours(19);
      } else {
        updateEvent.eventStartMillis.setHours(8);
      }
      updateEvent.eventStartMillis = updateEvent.eventStartMillis.getTime();
      updateEvent.eventEndMillis = updateEvent.eventStartMillis + 3600 * 1000;

      if (
        this.event.noBudget &&
        (this.editEvent.eventData !== this.event.eventData ||
          this.editEvent.location != this.event.location ||
          this.editEvent.eventStartMillis != this.event.eventStartMillis)
      ) {
        Swal.fire({
          title: "Do you want to update the budget accordingly?",
          text: ``,
          showCancelButton: true,
          confirmButtonClass: "md-button md-success",
          cancelButtonClass: "md-button md-danger",
          confirmButtonText: "Yes, Recalcuate it!",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            updateEvent.reCalculate = true;
          }
          updateEvent
            .save()
            .then((res) => {
              this.event = res;
            })
            .catch((err) => {
              console.log(err);
            });
          this.showEditDetailModal = false;
        });
      } else {
        updateEvent
          .save()
          .then((res) => {
            this.event = res;
          })
          .catch((err) => {
            console.log(err);
          });
        this.showEditDetailModal = false;
      }
    },
    formatHour(date) {
      return moment(new Date(date)).format("hh:mm A");
    },
    formatDateString(date) {
      if (typeof date == "number") {
        return moment(new Date(date)).format("MM/DD/YY");
      }
      return moment(date).format("MM/DD/YY");
    },
    numberToWord(num) {
      let vm = this;
      if ((num = num.toString()).length > 9) return "overflow";
      let n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return;
      var str = "";
      str += n[1] != 0 ? (vm.a[Number(n[1])] || vm.b[n[1][0]] + " " + vm.a[n[1][1]]) + "crore " : "";
      str += n[2] != 0 ? (vm.a[Number(n[2])] || vm.b[n[2][0]] + " " + vm.a[n[2][1]]) + "lakh " : "";
      str += n[3] != 0 ? (vm.a[Number(n[3])] || vm.b[n[3][0]] + " " + vm.a[n[3][1]]) + "thousand " : "";
      str += n[4] != 0 ? (vm.a[Number(n[4])] || vm.b[n[4][0]] + " " + vm.a[n[4][1]]) + "hundred " : "";
      str += n[5] != 0 ? (str != "" ? "and " : "") + (vm.a[Number(n[5])] || vm.b[n[5][0]] + " " + vm.a[n[5][1]]) : "";
      return str;
    },
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    },
  },
  created() {
    this.calendar = new Calendar({
      id: this.$store.state.auth.user.profile.defaultCalendarId,
    });
    this.$store.dispatch("event/getEventTypes", {
      data: this.$store.state.auth.user.profile.defaultCalendarId,
      ctx: this,
    });

    [...Array(12).keys()].map((x) => (x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined));
    [...Array(12).keys()].map((x) => (x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`)));
    [...Array(8).keys()].map((x) => (x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`)));
    this.hoursArray.push();
    this.event = this.$store.state.event.eventData; // Fetch event from store
    if (this.event.concept) {
      if (this.event.concept.images && this.event.concept.images.length > 0) {
        this.logger = this.event.concept.images[0].url;
      }
      if (this.event.concept.name) {
        this.conceptName = this.event.concept.name;
      }
    }
    this.getCalendarEventStatistics(this.event);
    this.getTimelineItems();
    new EventComponent()
      .for(this.calendar, this.event)
      .get()
      .then((components) => {
        this.event.components = components;
        this.selectedComponents = components;
      });
  },
  mounted() {
    this.isLoading = true;
    if (this.event && this.event.id) {
      // this.$root.$emit("set-title",this.event, this.routeName === 'EditBuildingBlocks',true);
      this.getTimelineItems();
    }
  },
  watch: {
    event(newVal, oldVal) {
      this.$root.$emit("set-title", this.event, this.routeName === "EditBuildingBlocks", true);
      this.getTimelineItems();
    },
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format("MMM Do YYYY");
    },
    formatTime: function (date) {
      return moment(date).format("h:00 A");
    },
    formatDuration: function (startDate, endDate) {
      return moment(endDate).diff(startDate, "hours");
    },
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  computed: {
    ...mapGetters({
      eventTypes: "event/getEventTypesList",
    }),
    getPaidAmount() {
      let event = new CalendarEvent({ id: this.event.id });
      let eventComponents = this.event.components;
      let paidAmount = 0;
      this.getAcceptedAndPaidProposals(this.calendar, event, eventComponents);

      if (this.paidProposals.length > 0) {
        return this.paidProposals.reduce((p, item) => p + item.proposalCost, 0);
      } else {
        return 0;
      }
    },
    getToBePaidAmount() {
      let event = new CalendarEvent({ id: this.event.id });
      let eventComponents = this.event.components;
      let toBePaidAmount = 0;
      this.getAcceptedAndPaidProposals(this.calendar, event, eventComponents);

      if (this.acceptedProposals.length > 0) {
        return this.acceptedProposals.reduce((p, item) => p + item.proposalCost, 0);
      } else {
        return 0;
      }
    },
    getTotalAmountByGuestType() {
      if (this.event.participantsType === "Guests and spouse") {
        // return parseInt(this.event.numberOfParticipants * this.event.budgetPerPerson  * 2)
        return parseInt(this.event.totalBudget) * 2;
      } else {
        // return parseInt(this.event.numberOfParticipants * this.event.budgetPerPerson)
        return parseInt(this.event.totalBudget);
      }
    },
    getTotalRemainingBudget() {
      return this.totalRemainingBudget;
    },
    getRemainingBudgetPerEmployee() {
      if (this.event.budgetPerPerson === 0) {
        return 0;
      } else {
        if (this.event.participantsType === "Guests and spouse") {
          return this.getTotalRemainingBudget / this.event.numberOfParticipants / 2;
        } else {
          return this.getTotalRemainingBudget / this.event.numberOfParticipants;
        }
      }
    },
    getPercentage() {
      if (this.event.budgetPerPerson === 0) {
        return 0;
      } else {
        return (this.getTotalRemainingBudget / this.getTotalAmountByGuestType) * 100;
      }
    },

    // check permission
    permission() {
      try {
        return this.$store.state.event.eventData.permit;
      } catch (e) {
        return "edit";
      }
    },
    canComment() {
      return this.permission === "edit" || this.permission === "comment";
    },
    canEdit() {
      return this.permission === "edit";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../styles/EventDetailsOverview.scss";
</style>