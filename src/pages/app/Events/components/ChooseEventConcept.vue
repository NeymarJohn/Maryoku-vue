<template>
    <div class="md-layout booking-section" v-if="selectedBlock">

        <side-bar :event="event">

        </side-bar>

        <progress-sidebar></progress-sidebar>

        <div class="event-page-header md-layout-item md-size-100">
            <div class="header-title">
                <h3>Hi Rachel</h3>
                <p>
                    We thought of 3 amazing concepts for your event, choose your favourite & we will help you<br>
                    create the best event. If you didn’t like any of them- Just let us know or create your own.
                </p>
            </div>
            <div class="header-actions">
                <ul>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 9.svg`"></a></li>
                    <li><a href=""><img :src="`${menuIconsURL}Asset 8.svg`"></a></li>
                </ul>
            </div>
        </div>

        <div class="booking-header d-flex justify-content-between md-layout-item md-size-100">
            <div class="header-title">
                <h4><img :src="`${conceptIconsURL}Asset 491.svg`"> Choose concept</h4>
            </div>
        </div>

        <div class="concepts-list md-layout-item md-size-100">
            <div class="concepts-list__item d-flex justify-content-start"
                 :class="{expanded : item.expand}"
                v-for="(item, index) in conceptOptions"
                 :key="index"
            >
                <div class="concept-actions d-flex justify-content-between align-center" v-if="item.expand">
                    <label>24 have tried this!</label>
                    <md-button class="md-rose">Select</md-button>
                </div>
                 <div :class="`images-list option-${item.option}`">
                     <div class="image-backgrounds">
                         <div class="image-background"
                              v-for="(bg,bgIndex) in item.backgroundColors"
                              :key="bgIndex"
                              :style="`background:${bg}`"
                         ></div>
                     </div>
                     <div>
                         <div :class="`images-list__item`"
                              v-for="(image, imageIndex) in item.images"
                              :key="imageIndex"
                         >
                             <div class="image-section" :style="`background:url(${image.url}) center center no-repeat`"></div>

                         </div>
                     </div>
                 </div>
                <div class="concept-details">
                    <small>Option 0{{item.option}}</small>
                    <div class="concept-title">
                        <h3 :style="`font-family:${item.fontFamily}`">{{item.title}}</h3>
                        <ul class="features-list" v-if="item.features">
                            <li class="features-list__item" v-for="(feature, featureIndex) in item.features" :key="featureIndex">{{feature}}</li>
                        </ul>
                    </div>
                    <div class="concept-desc" v-if="item.expand">{{item.desc}}</div>

                </div>
                <md-button class="md-rose md-simple md-just-icon view-concept" @click="expandConcept(item,index)">
                    <img :src="`${conceptIconsURL}Asset 490.svg`">
                </md-button>
            </div>

            <!-- Create Concept Section -->
            <div class="concepts-list__item d-flex justify-content-start"
            >
                <div class="images-list create-concept">
                    <div class="image-backgrounds">
                        <div class="image-background" v-for="idx in 4" :keu="idx"></div>
                    </div>
                    <div>
                        <div :class="`images-list__item`"
                             v-for="indx in 5"
                             :key="indx"
                        >
                            <div class="image-section d-flex  justify-content-center align-center">
                                <img :src="`${conceptIconsURL}Asset 492.svg`">
                            </div>

                        </div>
                    </div>
                </div>
                <div class="concept-details">
                    <h3 class="create-title">Create Your Own Concept</h3>
                    <p>Inspire us with your creative ideas and we<br> will make your dreams come true</p>
                </div>
                <md-button class="md-rose md-simple md-just-icon view-concept">
                    <img :src="`${conceptIconsURL}Asset 490.svg`">
                </md-button>
            </div>
            <!-- ./Create Concept Section -->

        </div>

        <div class="booking-section__actions">
            <md-button class="md-default ">Find me something different</md-button>
        </div>

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
    conceptIconsURL: 'http://static.maryoku.com/storage/icons/Concept/',
    showSomethingModal: false,
    showShareVendorModal: false,
    blockVendors: null,
    selectedBlock: {},
    conceptOptions: [
        {
            option: 1,
            title: "March Madness",
            desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
            fontFamily: 'Cooperative-Regular',
            features: ["Fun","Diy","Sporting","Light"],
            images:[
                {
                    url: "https://placeimg.com/200/200/any?1",
                },
                {
                    url: "https://placeimg.com/200/200/any?2",
                },
                {
                    url: "https://placeimg.com/200/200/any?3",
                },
                {
                    url: "https://placeimg.com/200/200/any?4",
                },
                {
                    url: "https://placeimg.com/200/200/any?5",
                },

            ],
            backgroundColors: ["#ffc001","#f3423a","#ff7600"]
        },
        {
            option: 2,
            title: "Horror movies",
            desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
            fontFamily: 'CFNightofTerrorPERSONAL-Reg',
            features: ["romantic","luxurry","fun","colourful"],
            images:[
                {
                    url: "https://placeimg.com/200/200/any?1",
                },
                {
                    url: "https://placeimg.com/200/200/any?2"
                },
                {
                    url: "https://placeimg.com/200/200/any?3",
                },
                {
                    url: "https://placeimg.com/200/200/any?4",
                },
                {
                    url: "https://placeimg.com/200/200/any?5"
                },
            ],
            backgroundColors: ["#de0300","#d1d1d1","#6a0500"]

        },
        {
            option: 3,
            title: "Intergalactic",
            desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
            fontFamily: 'IntergalacticHalftoneItalic',
            features: ["festive","elegant","respectable"],
            images:[
                {
                    url: "https://placeimg.com/200/200/any?1",
                    backgroundColor: '#00165d'
                },
                {
                    url: "https://placeimg.com/200/200/any?2"
                },
                {
                    url: "https://placeimg.com/200/200/any?3"
                },
                {
                    url: "https://placeimg.com/200/200/any?4",
                    backgroundColor: 'linear-gradient(#ff0082,#a700ff)'
                }
            ],
            backgroundColors: ["#00165d","linear-gradient(#ff0082,#a700ff)"]

        }
    ]

  }),
  methods: {
      expandConcept(item, index) {
          console.log(item.title);
          if(!item.expand) {
              console.log(' i am true');
              this.conceptOptions[index].expand = true;
          } else {
              console.log(' i am false');
              this.conceptOptions[index].expand = false;
          }
          this.$forceUpdate();
      }
  },
  created () {
    [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
    [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
    [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`))

    this.hoursArray.push()
  },
  mounted () {
    this.isLoading = true
    // if (this.event && this.event.id){
    //     this.$root.$emit("set-title",this.event, this.routeName === 'EditBuildingBlocks',true);
    //     this.getTimelineItems();
    // }

    this.$auth.currentUser(this, true, function () {
      let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId})

      _calendar.calendarEvents().find(this.$route.params.id).then(event => {
        this.event = event

        // new EventComponent().for(_calendar, event).get().then(components => {
        //     this.event.components = components
        //     this.selectedComponents = components
        // })

        console.log(event)
      })
    }.bind(this))
  },
  watch: {

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
