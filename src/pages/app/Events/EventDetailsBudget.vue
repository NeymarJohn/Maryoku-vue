<template>
    <div class="edit-event-details event-details-budget">
        <side-bar :event="calendarEvent"></side-bar>
        <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>

        <!-- Event Header -->
        <div class="event-header d-flex justify-content-between">
            <div class="header-title">
              <h3>
                <img :src="`${this.$iconURL}budget+screen/SVG/Asset%2010.svg`" width="15">
                Budget
              </h3>
            </div>
            <header-actions @toggleCommentMode="toggleCommentMode"></header-actions>
        </div>
        <div class="md-layout justify-content-between">
            <div class="md-layout-item md-size-55">
                <div class="card-section card-overview">
                    <div class="section-header">
                        Overview
                    </div>
                    <div class="budget-list d-flex justify-content-between">
                        <div class="budget-list__item">
                            <div class="label-title">Budget</div>
                            <div class="budget-value">${{statistics.total | withComma}}</div>
                            <md-button class="md-rose md-simple md-sm edit-budget" @click="showBudgetModal = true">Edit</md-button>
                        </div>
                        <div class="budget-list__item">
                            <div class="label-title">Allocated</div>
                            <div class="budget-value">${{statistics.allocated | roundNumber | withComma}}</div>
                            <div class="percent">{{ (( statistics.allocated ) * 100 / calendarEvent.totalBudget).toFixed(1)}}  %</div>
                        </div>
                        <div class="budget-list__item">
                            <div class="label-title">Booked</div>
                            <div class="budget-value">${{statistics.booked | withComma}}</div>
                            <div class="percent">{{ ((statistics.booked * 100) / calendarEvent.totalBudget).toFixed(1) }}%</div>
                        </div>
                    </div>
                </div>
                <div class="card-section card-overview-saved text-center d-flex justify-center align-center">
                    <span> So far you saved : </span>
                    <img class="card-overview-saved-icon" src="http://static.maryoku.com/storage/icons/budget+screen/png/Asset+25.png" width="20"> 
                    <span class="card-overview-saved-amount">$ 100</span>
                </div>
            </div>
            <div class="md-layout-item  md-size-45 card-actvity">
               <div class="card-section card-activity">
                <div class="section-header">
                    Activity
                </div>
                <div class="budget-list d-flex justify-content-between">
                  <event-budget-activity-panel></event-budget-activity-panel>
                </div>
              </div>
            </div>
        </div>
        <div class="md-layout justify-content-between">
            <div class="md-layout-item md-size-40">
                <div class="card-section card-expense">
                    <div class="section-header">
                        Expenses
                    </div>
                    <div>
                        <pie-chart-round
                            :event.sync="event"
                            :items="selectedComponents">
                        </pie-chart-round>
                    </div>
                </div>
            </div>
            <div class="md-layout-item  md-size-60">
                <div class="event-blocks-table">
                    <tabs
                        :tab-name="['<img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+26.png\'> Total', ' <img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+28.png\'> Per Guest']"
                    >
                        <!-- here you can add your content for tab-content -->
                        <template slot="tab-pane-1">
                            <event-budget-vendors :event.sync="event" :event-components="selectedComponents"
                                                       type="total" @change="onChangeComponent" @add="onAddMoreBudget"></event-budget-vendors>
                        </template>
                        <template slot="tab-pane-2">
                            <event-budget-vendors :event.sync="event" :event-components="selectedComponents"
                                                       type="perGuest" @change="onChangeComponent" @add="onAddMoreBudget"></event-budget-vendors>
                        </template>
                    </tabs>
                </div>
            </div>
        </div>
        <upload-vendors-modal ref="uploadModal"></upload-vendors-modal>

        <modal v-if="showBudgetModal"  class="add-category-model">
            <template slot="header">
                <div class="add-category-model__header">
                    <h2 class="black">What is your new budget?</h2>
                    <div class="header-description">  <img :src="`${this.$iconURL}Event Page/light.svg`" width="20"> Increasing your budget to $ {{calendarEvent.totalBudget | withComma}} or more will allow you to get a videographer</div>
                </div>
                <md-button class="md-simple md-just-icon md-round modal-default-button" @click="showBudgetModal = false">
                    <md-icon>clear</md-icon>
                </md-button>
            </template>
            <template slot="body">
                <div class="md-layout justify-content-center">

                    <div class="md-layout-item md-size-60 margin-bottom justify-content-center">
                        <div class="form-group with-icon budget-field">
                            <div class="input-icon">
                                <img :src="`${iconsURL}budget-dark.svg`" width="20">
                            </div>
                            <input type="text" class="form-control"  v-model="newBudget" placeholder="">
                        </div>

                        <div class="label-item label-success text-center" v-if="newBudget && newBudget > calendarEvent.totalBudget">
                            <h4>
                                Fantastic!
                            </h4>
                            <p>
                                This budget is {{ 100 - parseInt( calendarEvent.totalBudget * 100 / newBudget)  }}% higher than average, your event is going to be wild!
                            </p>
                        </div>
                        <div class="label-item label-warning text-center" v-if="newBudget && newBudget < calendarEvent.totalBudget">
                            <p>
                                <img :src="`${iconsURL}warning-circle-gray.svg`" width="20"> This budget is {{ 100 - parseInt( newBudget * 100 / calendarEvent.totalBudget)  }}% lower than average for this type of event
                            </p>
                        </div>
                    </div>
                </div>

            </template>
            <template slot="footer">
                <md-button class="md-default md-simple cancel-btn" @click="showBudgetModal = false">
                    Cancel
                </md-button>
                <md-button class="md-rose add-category-btn " :class="{ 'disabled' : !newBudget }" @click="updateBudget">
                    Save
                </md-button>
            </template>
        </modal>

        <modal v-if="budgetConfirmationModal"  class="add-category-model">
            <template slot="header">
                <div class="add-category-model__header">
                    <h2 class="black">  Are you sure?</h2>
                    <div class="header-description">  <img :src="`${iconsURL}Asset 150.svg`" width="20"> Decreasing your budget may cause program changes</div>
                </div>
                <md-button class="md-simple md-just-icon md-round modal-default-button" @click="budgetConfirmationModal = false">
                    <md-icon>clear</md-icon>
                </md-button>
            </template>
            <template slot="body">

            </template>
            <template slot="footer">
                <md-button class="md-rose md-outline md-simple cancel-btn" @click="budgetConfirmationModal = false">
                    Yes I’m sure
                </md-button>
                <md-button class="md-rose add-category-btn " :class="{ 'disabled' : !newBudget }" @click="updateBudget">
                    No, take me back
                </md-button>
            </template>
        </modal>

        <modal v-if="editBudgetElementsModal"  class="add-category-model edit-elements-budget-modal">
            <template slot="header">
                <div class="add-category-model__header">
                    <h2 class="black">  Edit budget per category</h2>
                </div>
                <md-button class="md-simple md-just-icon md-round modal-default-button" @click="editBudgetElementsModal = false">
                    <md-icon>clear</md-icon>
                </md-button>
            </template>
            <template slot="body">
                <div class="event-blocks-table edit-elements-budget-table">
                    <tabs :tab-name="['<img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+26.png\'> Total', ' <img src=\'http://static.maryoku.com/storage/icons/budget+screen/png/Asset+28.png\'> Per Guest']">                        <!-- here you can add your content for tab-content -->
                        <template slot="tab-pane-1">
                            <edit-event-blocks-budget 
                              :event.sync="event" 
                              :event-components="selectedComponents"
                              type="total">
                            </edit-event-blocks-budget>
                        </template>
                        <template slot="tab-pane-2">
                            <edit-event-blocks-budget :event.sync="event" :event-components="selectedComponents"
                                                       type="perGuest"></edit-event-blocks-budget>
                        </template>
                    </tabs>
                </div>

            </template>
            <template slot="footer">
                <md-button class="md-default md-simple cancel-btn" @click="editBudgetElementsModal = false">
                    Cancel
                </md-button>
                <md-button class="md-rose add-category-btn " @click="updateBudget">
                    Save
                </md-button>
            </template>
        </modal>
        <BudgetHandleMinusModal value="50" v-if="showHandleMinus"></BudgetHandleMinusModal>
    </div>
</template>

<script>

// MAIN MODULES
import {
  Tabs,
  Modal
} from '@/components'

// import auth from '@/auth';
import moment from 'moment'
import swal from 'sweetalert2'

import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import CalendarEventStatistics from '@/models/CalendarEventStatistics'
import EventComponent from '@/models/EventComponent'
import {
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'

import EventBudgetVendors from './components/EventBudgetVendors'
import EditEventBlocksBudget from './components/EditEventBlocksBudget'
import EventBudgetActivityPanel from './components/EventBudgetActivityPanel'

// COMPONENTS
import UploadVendorsModal from '../Vendors/ImportVendors'

import SideBar from '../../../components/SidebarPlugin/NewSideBar'
import PieChartRound from './components/PieChartRound.vue'
import BudgetHandleMinusModal from '../../../components/Modals/BudgetHandleMinusModal'
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "./components/CommentEditorPanel";

export default {
  components: {
    Tabs,
    EventBudgetVendors,
    UploadVendorsModal,
    SideBar,
    PieChartRound,
    Modal,
    EditEventBlocksBudget,
    BudgetHandleMinusModal,
    EventBudgetActivityPanel,
    HeaderActions,
    CommentEditorPanel
  },

  data () {
    return {
      // auth: auth,
      calendarEvent: {},
      selectedComponents: [],
      statistics: {
        total: 0,
        allocated: 0,
        booked: 0
      },
      currentTab: 'blocks',
      eventId: null,
      percentage: 0,
      totalRemainingBudget: 0,
      usedBudget: 0,
      remainingBudgetPerEmployee: 0,
      seriesData: [],
      isLoading: false,
      event: {
        statistics: {}
      },
      routeName: null,
      budgetPerEmployee: 0,
      activeTab: 0,
      totalBudget: 0,
      menuIconsURL: 'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/',
      iconsURL: 'http://static.maryoku.com/storage/icons/Event%20Page/',
      showBudgetModal: false,
      budgetConfirmationModal: false,
      newBudget: null,
      editBudgetElementsModal: false,
      showHandleMinus:false,
      showCommentEditorPanel:false
    }
  },
  created () {
    this.routeName = this.$route.name
  },
  mounted () {
    this.isLoading = true

    this.getEvent()
    const tab = this.$route.query.t || 0
    if (this.$refs.eventPlannerTabs) {
      this.$refs.eventPlannerTabs.$emit('event-planner-nav-switch-panel', tab)
    }

    if (this.components.length === 0) {
      this.$store.dispatch('event/getComponents', this)
      this.$store.dispatch('event/getCategories', {
        data: this.$auth.user.defaultCalendarId,
        ctx: this
      })
      this.$store.dispatch('event/getEventTypes', {
        data: this.$auth.user.defaultCalendarId,
        ctx: this
      })
      this.$store.dispatch('event/getCurrencies', this)
      this.$store.dispatch('event/getEventThemes', this)
    }

    this.$root.$on('calendar-refresh-events', () => {
      this.getEvent()
    })
  },
  methods: {
    ...mapMutations('EventPlannerVuex', [
      'setEventModal',
      'setEditMode',
      'setModalSubmitTitle',
      'setEventModalAndEventData',
      'setNumberOfParticipants',
      'setEventData'
    ]),
    getEvent () {
      this.$auth.currentUser(this, true, function () {
        let _calendar = new Calendar({
          id: this.$auth.user.defaultCalendarId
        })

        _calendar.calendarEvents().find(this.$route.params.id).then(event => {
          this.event = event
          this.eventId = event.id
          this.calendarEvent = event
          if (event.totalBudget)
            this.newBudget = (event.totalBudget + "").replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          new EventComponent().for(_calendar, event).get().then(components => {
            components.sort((a,b)=>a.order - b.order)
            
            console.log(components);
            this.event.components = components
            this.selectedComponents = components
            this.seriesData = components
          })
          this.getCalendarEventStatistics(event)

          this.$root.$emit('set-title', this.event, this.routeName === 'EditBuildingBlocks', this.routeName === 'InviteesManagement' || this.routeName === 'EventInvitees')
          this.isLoading = false
        })
      }.bind(this))
    },
    selectServices () {
      this.$refs.eventPlannerTabs.$emit('event-planner-nav-switch-panel', 1)
    },
    selectTimeline () {
      this.$root.$emit('event-planner-nav-switch-panel', 2)
    },
    selectInviteesManagement () {
      this.$root.$emit('event-planner-nav-switch-panel', 3)
    },
    selectEventPage () {
      this.$root.$emit('event-planner-nav-switch-panel', 4)
    },
    selectTab (tab) {
      this.currentTab = tab
    },
    selectedTab (tab) {
      return this.currentTab === tab
    },
    resetTab () {
      this.currentTab = null
    },
    openEventModal () {
      this.setEventData(this.event)
      this.setEventModal({
        showModal: true
      })
      this.setModalSubmitTitle('Save')
      this.setEditMode({
        editMode: true
      })
    },
    refreshEvents () {
      this.getCalendarEvents()
    },
    goToComponent (route) {
      this.$router.push({
        path: `/events/` + this.event.id + route
      })
      location.reload()
    },
    getCalendarEventStatistics (evt) {
      let calendar = new Calendar({
        id: this.$auth.user.defaultCalendarId
      })
      let event = new CalendarEvent({
        id: this.event.id
      })

      new CalendarEventStatistics().for(calendar, event).get()
        .then(resp => {
          console.log(resp);
          this.statistics = {
            total: resp[0].totalBudget,
            allocated: resp[0].totalAllocatedBudget,
            booked: resp[0].totalBookedBudget,
          }
          this.totalRemainingBudget = resp[0].totalBudget - resp[0].totalAllocatedBudget;// (evt.budgetPerPerson * evt.numberOfParticipants) - resp[0].totalAllocatedBudget // evt.totalBudget - resp[0].totalAllocatedBudget;
          this.remainingBudgetPerEmployee = this.totalRemainingBudget / evt.numberOfParticipants // evt.totalBudget - resp[0].totalAllocatedBudget;
          this.percentage = 100 - ((resp[0].totalAllocatedBudget / (evt.budgetPerPerson * evt.numberOfParticipants)) * 100).toFixed(2)

          this.budgetPerEmployee = evt.budgetPerPerson // this.totalRemainingBudget / evt.numberOfParticipants;
          this.allocatedBudget = resp[0].totalAllocatedBudget
          this.event.statistics = this.statistics
        })
        .catch(error => {
          console.log(error)
        })
    },
    openUploadModal () {
      this.$refs.uploadModal.toggleModal(true)
    },
    updateBudget () {
      let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
      let editedEvent = new CalendarEvent({id: this.event.id}).for(_calendar)
      const newBudget = Number(this.newBudget.replace(/,/g, ""))
      if (newBudget < this.calendarEvent.totalBudget) {
        this.showBudgetModal = false;
        const arrow =`<i data-v-a76b6a56="" style="color:#050505" class="md-icon md-icon-font md-theme-default">arrow_back</i>`;
        const budgetString = `<div class="font-size-40 font-regular color-red" style="margin:20px 0">$ ${this.newBudget}</div>`;
        const description = `<div class="description">Your edits changed the total budget, do you want to change it?</div>`
         swal({
          title: `<div class="text-left">${arrow}${budgetString}<div>Are Your Sure?</div>${description}</div>`,
          showCancelButton: true,
          confirmButtonClass: 'md-button md-success',
          cancelButtonClass: 'md-button md-danger',
          confirmButtonText: "Yes I'm sure",
          cancelButtonText: 'No, take me back',
          buttonsStyling: false
        }).then(result => {
          if (result.dismiss != "cancel") {
            editedEvent.totalBudget = newBudget
            editedEvent.reCalculate = true

            editedEvent.save()
              .then(response => {
                this.showBudgetModal = false
                //this.getCalendarEventStatistics()
                this.getEvent()
              })
              .catch((error) => {
                console.log(error)
              })
          }
        })
      } else if (newBudget > this.calendarEvent.totalBudget) {
          editedEvent.totalBudget = newBudget
          editedEvent.reCalculate = false
          editedEvent.save()
            .then(response => {
              this.showBudgetModal = false
              //this.getCalendarEventStatistics()
              this.getEvent()
            })
            .catch((error) => {
              console.log(error)
            })
      } else {
        this.showBudgetModal = false
      }
    },
    onChangeComponent (event) {
      this.getEvent()
    },
    onAddMoreBudget (value) {
      this.newBudget = `${this.event.totalBudget + value}`.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.updateBudget();
    },
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    }
  },
  computed: {
    ...mapState('EventPlannerVuex', [
      'eventData',
      'eventModalOpen',
      'modalTitle',
      'modalSubmitTitle',
      'editMode'
    ]),
    ...mapGetters({
      components: 'event/getComponentsList'
    }),
    pieChart () {
      return {
        data: {
          labels: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], // should be empty to remove text from chart
          series: this.seriesData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]
        },
        options: {
          padding: 0,
          height: 220,
          donut: true,
          donutWidth: 45,
          animation: true
        }
      }
    },
    categoryItems () {
      return {
        data: this.seriesData
      }
    },
   
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('MMM Do YYYY ')
    },
    formatTime: function (date) {
      return moment(date).format('h:00 A')
    },
    formatDuration: function (startDate, endDate) {
      return moment(endDate).diff(startDate, 'hours')
    },
    withComma (amount) {
      return amount ? amount.toLocaleString() : 0
    },
    roundNumber(amount) {
      return Math.round(amount / 10) * 10;
    }
  },
  watch: {
    newBudget: function(newValue) {
      console.log("change", newValue);
      const result = newValue.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.newBudget = result
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../styles/EventDetailsBudget.scss";
    // .md-layout, .md-layout-item {
    //     width: initial;
    // }

    // .tab-content {
    //     background-color: transparent !important;
    // }
    
</style>
