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
            <div class="concepts-list__item d-flex justify-content-start" :class="{expanded : expandCreateConcept}"
            >
                <div class="images-list create-concept" v-if="!expandCreateConcept">
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
                <div class="concept-details" v-if="!expandCreateConcept">
                    <h3 class="create-title">Create Your Own Concept</h3>
                    <p >Inspire us with your creative ideas and we<br> will make your dreams come true</p>
                </div>
                <md-button class="md-rose md-simple md-just-icon view-concept" @click="expandCreateConcept = !expandCreateConcept">
                    <img :src="`${conceptIconsURL}Asset 490.svg`">
                </md-button>

                <div class="create-concept-from" v-if="expandCreateConcept">
                    <div class="form-title">
                        Create Your Own Concept
                    </div>
                    <div class="form-content">
                        <div class="form-group">
                            <label>Concept Name</label>
                            <input type="text" class="form-control" placeholder="Type your concept here…" v-model="newConcept.name">
                        </div>
                        <div class="form-group add-tags-field">
                            <label>Tags <small>*suggested</small></label>
                            <input type="text" v-model="newTag" class="form-control" placeholder="Type your concept here…">
                            <div class="add-tags-actions text-right">
                                <md-button class="md-red md-maryoku" @click="addTag">add Tag</md-button>
                            </div>
                        </div>
                        <div class="tags-list d-flex justify-content-start" v-if="newConcept.tags.length">
                            <div class="tags-list__item" v-for="(tag, index) in newConcept.tags">{{tag.title}} <img :src="`${conceptIconsURL}Asset 489.svg`" @click="removeTag(index)"></div>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <p>Describe a bit so we could find you the right services</p>
                            <textarea rows="" class="form-control" placeholder="Write description here" v-model="newConcept.description"></textarea>
                        </div>

                        <div class="form-group">
                            <label>Add Colors</label>
                            <div class="colors-list d-flex justify-content-start">
                                <div class="colors-list__item" :style="`background: ${color.name}`" v-for="(color, index) in newConcept.colors"></div>
                                <md-button class="colors-list__add md-just-icon" @click="addColor"><img :src="`${conceptIconsURL}Asset 488.svg`"></md-button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Add Inspirational Photos <small>(5 photos top, under 20 KB)</small></label>
                            <p>Drag the photos to the empty frames or click on each one of them to create your photos board</p>
                        </div>

                        <div class="images-list new-concept">
                            <div class="image-backgrounds">
                                <div class="image-background" :style="`background: #ff48b2`"></div>
                                <div class="image-background" v-for="idx in 3" :keu="idx"></div>
                            </div>
                            <div>
                                <div :class="`images-list__item`"
                                     v-for="indx in 5"
                                     :key="indx"
                                >
                                    <div class="image-section d-flex  justify-content-center align-center text-center" :style="`background:url(${uploadImageData[indx]})`">
                                        <img :src="uploadImageData[indx]" style="width:100%; height:100%; position:absolute; left:0; top:0"/>
                                        <label :for="`file-${indx}`" style="cursor:pointer">
                                            <img :src="`${conceptIconsURL}Asset 488.svg`" style="width:24px">
                                            <br/>
                                            <label><img :src="`${conceptIconsURL}Asset 492.svg`" style="width:16px"> Add Photo</label>
                                        </label>
                                        <input
                                            style="display: none"
                                            :id="`file-${indx}`"
                                            name="attachment"
                                            type="file"
                                            multiple="multiple"
                                            :data-fileIndex="indx"
                                            @change="onFileChange"/>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="concept-actions d-flex justify-content-end align-center">
                            <md-button class="md-red md-bold" @click="saveConcept">Save & Select</md-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ./Create Concept Section -->

        </div>

        <div class="booking-section__actions">
            <md-button class="md-default ">Find me something different</md-button>
            
        </div>
        <div class="text-center" style="margin: 30px; width:100%">
                <md-button class="md-red md-simple back-to-top" @click="scrollToTop"> <md-icon>expand_less</md-icon> Back to top </md-button>
            </div>
        
    </div>

</template>
<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventComponent from '@/models/EventComponent'
import EventConcept from '@/models/EventConcept'
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
    ],
    expandCreateConcept: false,
      conceptTags: [
          {
              title : "festive"
          },
          {
              title : "elegant"
          },
          {
              title : "respectable"
          },
      ],
      newTag: '',
    newConcept:{
        name:"",
        description:"",
        tags:[],
        colors: [
            {name: "#ff48b2"},
            {name: "#71ecf8"},
        ],
        files:[]
    },
    uploadImages:{},
    uploadImageData:{}
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
    },
    addTag() {
        if (this.newTag && this.newTag.length) {
            this.newConcept.tags.push({title: this.newTag});
        }
        this.newTag = "";
    },
    removeTag(index) {
        this.conceptTags.splice(index, 1)
    },
    scrollToTop() {
        window.scrollTo(0,0);
    },
    saveConcept() {
        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
        let event = new CalendarEvent({id: this.event.id})

        new EventConcept(this.newConcept).for(calendar, event).save()
          .then(res => {
              console.log(res);
          })
          .catch(error => {
            console.log(error)
          })
    },
    addColor() {
        const colors = ["#ff48b2", "#71ecf8", "#ededed"];
        this.newConcept.colors.push({name:colors[Math.round(3 * Math.random())]})
    },
    onFileChange(event)  {
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) return
      let reader = new FileReader()
      let vm = this
      if (event.target.name) {
        const itemIndex = event.target.getAttribute('data-fileIndex')
        console.log("fileIndex", itemIndex);
        let isLargeFile = false
        console.log(files)
        this.uploadImages[itemIndex] = files[0]
        this.uploadImageData[itemIndex] = URL.createObjectURL(files[0]);
        console.log(URL.createObjectURL(files[0]));
      }
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
