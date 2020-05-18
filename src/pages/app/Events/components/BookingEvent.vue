<template>
    <div class="md-layout booking-section" v-if="selectedBlock">

        <side-bar :event="event">

        </side-bar>

        <progress-sidebar></progress-sidebar>

        <div class="event-page-header md-layout-item md-size-100">
            <div class="header-title">
                <h3>Hi Rachel</h3>
                <p>
                    We found the top {{selectedBlock.proposalsCount}} proposals for your event,<br>
                    Book now before it’s too late
                </p>
            </div>
            <div class="header-actions">
                <ul>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 9.svg`"></a></li>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 5.svg`"></a></li>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 8.svg`"></a></li>
                </ul>
            </div>
        </div>

        <div class="booking-header d-flex justify-content-between md-layout-item md-size-100">
            <div class="header-title">
                <h4><img :src="`${budgetElementsIConsURL}${selectedBlock.componentId}.svg`"> Book {{selectedBlock.title}}</h4>
            </div>
            <div class="header-actions">
                <md-button class="md-default md-simple">Compare Proposals <md-icon>keyboard_arrow_right</md-icon></md-button>
            </div>
        </div>

        <!-- Event Booking Items -->
        <div class="md-layout events-booking-items" v-if="proposals.length">

            <div class="md-layout-item md-size-33" v-for="(proposal,index) in  proposals" :key="index">
                <div class="booking-item ">
                    <div class="event-image" style="background: url(https://bit.ly/2Q77CBI) center center no-repeat">

                    </div>
                    <div class="price"> <span class="price-value">${{proposal.proposals[0].cost | withComma}}</span> <small>For 3 hours</small> </div>
                    <h4 class="event-title">{{proposal.vendor.vendorDisplayName}}</h4>
                    <div class="probability">Probability 92%</div>
                    <ul class="event-info">
                        <li class="event-info__item">{{proposal.vendor.vendorAddressLine1}}</li>
                        <li class="event-info__item">{{proposal.vendor.vendorCity}}</li>
                    </ul>
                    <p class="event-desc">{{proposal.proposals[0].aboutUsMessage}}</p>

                    <div class="item-actions text-right">
                        <md-button class="md-rose details-btn" @click="proposalDetails(proposal)"> Details & Booking</md-button>
                    </div>
                </div>
            </div>

        </div>
        <!-- ./Event Booking Items -->

        <div class="booking-section__actions">
            <md-button class="md-default " @click="showSomethingModal = true">I want something different</md-button>
            <md-button class="md-default " @click="showShareVendorModal = true">I already have a venue for my event</md-button>
        </div>

        <event-change-proposal-modal v-if="showSomethingModal" @close="showSomethingModal=false"></event-change-proposal-modal>

        <modal v-if="showShareVendorModal" class="add-category-model something-modal">
            <template slot="header">
                <div class="add-category-model__header">
                    <h2>Share your vendor info</h2>
                    <div class="header-description">Share your vendor info</div>
                </div>
                <md-button class="md-simple md-just-icon md-round modal-default-button"
                           @click="showShareVendorModal = false">
                    <md-icon>clear</md-icon>
                </md-button>
            </template>
            <template slot="body">

                <div class="md-layout">

                    <div class="md-layout-item md-size-100" >
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100 margin-bottom">
                        <div class="form-group with-icon">
                            <label>Price of the service</label>
                            <div class="input-icon">
                                <img :src="`${iconsURL}budget-dark.svg`" width="20" style="opacity: 0.5">
                            </div>
                            <input type="text" class="form-control" placeholder="Type number here">
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100 margin-bottom">
                        <div class="form-group with-icon">
                            <label>Location</label>
                            <div class="input-icon">
                                <img :src="`${iconsURL}budget-dark.svg`" width="20" style="opacity: 0.5">
                            </div>
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100 margin-bottom">
                        <div class="form-group with-icon">
                            <label>Phone</label>
                            <div class="input-icon">
                                <img :src="`${iconsURL}budget-dark.svg`" width="20" style="opacity: 0.5">
                            </div>
                            <input type="text" class="form-control" placeholder="Type number here">
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100 margin-bottom">
                        <div class="form-group with-icon">
                            <label>Email</label>
                            <div class="input-icon">
                                <img :src="`${iconsURL}budget-dark.svg`" width="20" style="opacity: 0.5">
                            </div>
                            <input type="text" class="form-control" placeholder="Type email address here">
                        </div>
                    </div>

                    <div class="md-layout-item md-size-100 margin-bottom">
                        <div class="form-group">
                            <label>Attach Proposal </label>
                            <label class="upload-section" for="file">
                                <md-button class="md-rose md-outline md-simple md-sm">
                                    Choose file
                                </md-button>
                                <div>Or</div>
                                <div class="note">Drag your file here</div>
                            </label>

                            <input
                                style="display: none"
                                id="file"
                                name="attachment"
                                type="file"
                                @change=""
                            >

                        </div>
                    </div>
                </div>
            </template>
            <template slot="footer">
                <md-button class="md-default md-simple cancel-btn" @click="showShareVendorModal = false">
                    Remind Me Later
                </md-button>
                <md-button class="md-rose add-category-btn" :class="{'disabled' : !somethingMessage}" @click="">
                    Update Vendor
                </md-button>
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

import VueElementLoading from 'vue-element-loading'
// import auth from '@/auth';
import EventBlocks from '../components/NewEventBlocks'
import draggable from 'vuedraggable'
import {Drag, Drop} from 'vue-drag-drop'
import _ from 'underscore'
import {Modal} from '@/components'
import EventComponentVendor from '@/models/EventComponentVendor'
import EventComponentProperty from '@/models/EventComponentProperty'

import SideBar from '../../../../components/SidebarPlugin/NewSideBar'
import SidebarItem from '../../../../components/SidebarPlugin/NewSidebarItem.vue'
import ProgressSidebar from './progressSidebar'
import EventChangeProposalModal from '@/components/Modals/EventChangeProposalModal'
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
    Modal,
    EventChangeProposalModal
  },
  props: {

  },
  data: () => ({
    // auth: auth,
    isLoading: true,
    timelineItems: [],
    hoursArray: [],
    disabledDragging: false,
    somethingMessage: null,
    timelineAttachment: null,
    event: {},
    timelineIconsURL: 'http://static.maryoku.com/storage/icons/timeline/svg/',
    menuIconsURL: 'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/',
    iconsURL: 'http://static.maryoku.com/storage/icons/Event%20Page/',
    newTimeLineIconsURL: 'http://static.maryoku.com/storage/icons/Timeline-New/',
    budgetElementsIConsURL: 'http://static.maryoku.com/storage/icons/Budget+Elements/',
    showSomethingModal: false,
    showShareVendorModal: false,
    blockVendors: null,
    selectedBlock: {},
    proposals: []

  }),
  methods: {
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
      getSelectedBlock () {
          let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
          let event = new CalendarEvent({id: this.event.id})

          new EventComponent().for(calendar, event).get().then(resp => {
              this.selectedBlock = _.findWhere(resp, {id: this.$route.params.blockId})
          })
      },
      getBlockVendors () {
          if (true) {
              let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
              let event = new CalendarEvent({id: this.event.id})
              let selected_block = new EventComponent({id: this.$route.params.blockId})

              new EventComponentVendor().for(calendar, event, selected_block).get()
                  .then(resp => {
                      this.isLoading = false
                      this.selectedBlock.vendors = resp
                      this.selectedBlock.vendorsCount = resp.length
                      this.blockVendors = resp

                      let vendorsWithProposals = _.filter(this.blockVendors, function (item) {
                          return item.proposals && item.proposals.length
                      })
                      // let vendorsWithSentStatus = _.filter(this.blockVendors, function(item){ return item.proposals && !item.proposals.length; });
                      // let vendorsWithNoStatus   = _.filter(this.blockVendors, function(item){ return !item.proposals });

                      // this.filteredBlockVendors = _.union( vendorsWithSentStatus,vendorsWithNoStatus);

                      let proposals = []
                      _.each(vendorsWithProposals, (v) => {
                          proposals.push(v.proposals[0])
                      })
                      this.selectedBlock.proposals = proposals
                      this.selectedBlock.proposalsCount = proposals.length

                      // this.vendors = _.union( vendorsWithSentStatus,vendorsWithNoStatus);
                      this.proposals = vendorsWithProposals;
                      console.log(this.proposals);
                  })
                  .catch(error => {
                      this.isLoading = false
                      console.log('EventComponentVendor error =>', error)
                  })
          } else {
              this.blockVendors = this.selectedBlock.vendors

              // console.log('blockVendors => ',this.blockVendors);
              let vendorsWithProposals = _.filter(this.blockVendors, function (item) {
                  return item.proposals && item.proposals.length
              })
              let vendorsWithSentStatus = _.filter(this.blockVendors, function (item) {
                  return item.proposals && !item.proposals.length
              })
              let vendorsWithNoStatus = _.filter(this.blockVendors, function (item) {
                  return !item.proposals
              })

              this.filteredBlockVendors = _.union(vendorsWithProposals, vendorsWithSentStatus, vendorsWithNoStatus)
              this.isLoading = false
          }
      },
      proposalDetails(proposal) {
          this.$router.push('/events/' + this.event.id + '/proposal-details/' + this.$route.params.blockId + '/' + proposal.proposals[0].id );
      }
  },
  created () {
    [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
    [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
    [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`))

    this.hoursArray.push()

    console.log('i am created')
  },
  mounted () {
    this.isLoading = true
    // if (this.event && this.event.id){
    //     this.$root.$emit("set-title",this.event, this.routeName === 'EditBuildingBlocks',true);
    //     this.getTimelineItems();
    // }

    console.log('i am mounted')

    this.$auth.currentUser(this, true, function () {
      let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId})

      _calendar.calendarEvents().find(this.$route.params.id).then(event => {
        this.event = event

        this.getBlockVendors()

        this.getSelectedBlock()

        // new EventComponent().for(_calendar, event).get().then(components => {
        //     this.event.components = components
        //     this.selectedComponents = components
        // })

        console.log(event)
      })
    }.bind(this))
  },
  watch: {
    event (newVal, oldVal) {
      this.$root.$emit('set-title', this.event, this.routeName === 'EditBuildingBlocks', true)
    }
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
    }
  }
}
</script>
<style lang="scss">

</style>
