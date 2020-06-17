<template>
    <div class="md-layout event-concept-section booking-section">
        <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
        <comment-editor-panel v-if="showCommentEditorPanel"></comment-editor-panel>
        <div class="concept-content" v-if="showConceptList && !isLoading">
            <div class="event-page-header md-layout-item md-size-100">
                <div class="header-name">
                    <h3>Hi Rachel</h3>
                    <p>
                        Here are 3 awesome concepts for you to choose from! 
                        <br/>
                        If you feel like we haven’t nailed it, let us know and we’ll send 3 more.
                    </p>
                </div>
                <header-actions @toggleCommentMode="toggleCommentMode"></header-actions>
            </div>

            <div class="booking-header d-flex justify-content-between md-layout-item md-size-100">
                <div class="header-name">
                    <h4><img :src="`${conceptIconsURL}Asset 491.svg`" width="30"> Choose concept</h4>
                </div>
            </div>

            <div class="concepts-list md-layout-item md-size-100">
                <div class="concepts-list__item d-flex justify-content-start"
                    :class="{expanded : item.expand}"
                    v-for="(item, index) in conceptOptions"
                    :key="index"
                >
                    <div class="d-flex justify-content-between align-center" v-if="item.expand">
                        <label>24 have tried this!</label>
                        <md-button class="md-red md-bold" @click="selectConcept(index)">Select</md-button>
                    </div>
                    <div :class="`images-list option-${item.option}`">
                        <div class="image-backgrounds">
                            <div class="image-background"
                                v-for="(bg,bgIndex) in item.colors"
                                :key="bgIndex"
                                :style="`background:${bg.value}; opacity:${bg.opacity}`"
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
                        <div class="concept-name">
                            <h3 :style="`font-family:${item.fontFamily}`">{{item.name}}</h3>
                            <ul class="features-list" v-if="item.tags">
                                <li class="features-list__item" v-for="(tag, featureIndex) in item.tags" :key="featureIndex">{{tag.name}}</li>
                            </ul>
                        </div>
                        <div class="concept-description" v-if="item.expand">{{item.description}}</div>

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
                            <div class="image-background" v-for="idx in 4" :key="idx"></div>
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
                        <h3 class="font-bold-extra font-size-30 color-red">Create Your Own Concept</h3>
                        <p >Feeling creative? Tell us all about your ideas and we’ll get right on it!</p>
                    </div>
                    <md-button class="md-rose md-simple md-just-icon view-concept" @click="expandCreateConcept = !expandCreateConcept">
                        <img :src="`${conceptIconsURL}Asset 490.svg`">
                    </md-button>

                    <event-concept-edit-form v-if="expandCreateConcept" @saved="onSaveConcept"></event-concept-edit-form>

                </div>
                <!-- ./Create Concept Section -->

            </div>

            <div class="booking-section__actions">
               
            </div>
            <div class="text-center" style="margin: 30px; width:100%">
                <md-button class="md-red md-simple back-to-top" @click="scrollToTop"> <md-icon>expand_less</md-icon> Back to top </md-button>
            </div>
            <div class="concept-actions">
                <div>
                    <md-button class="md-simple md-black normal-btn"><md-icon>arrow_back</md-icon>Back</md-button>
                    <md-button class="md-red md-simple md-icon-button" @click="scrollToTop"> <md-icon>expand_less</md-icon> </md-button>
                </div>
                <md-button class="md-simple md-black normal-btn" @click="openConceptContest">I'd like to see more options</md-button>
            </div>
        </div>
        <div class="concept-content" v-if="!showConceptList && !isLoading">
            <div class="event-page-header md-layout-item md-size-100">
                <div class="header-name">
                    <h3>Great Choice!</h3>
                    <p>
                       This concept will be our guiding for the upcoming steps of creating the event
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
                <div class="header-name">
                    <h4><img :src="`${conceptIconsURL}Asset 491.svg`"  width="30"> Your Selected Concept</h4>
                </div>
            </div>
            
            <div class="concepts-list md-layout-item md-size-100 " v-if="!showEditForm">
                <div class="concepts-list__item d-flex justify-content-start expanded">
                    <div>
                        <a class="concept-compete-link" style="padding-top:4px" href="https://www.maryoku.com/contest-compete" target="_blank">Compete with my brilliant concept?</a> 
                        <span>
                            <img src="http://static.maryoku.com/storage/icons/Event%20Page/light.svg" alt="Avatar" width="20px">
                            <md-tooltip md-direction="bottom">
                                <strong  class="font-size-16">A chance to win $1,000!</strong>
                                <div class="font-size-16"> 
                                    Don't miss this chance <br/>to submit your concept <br/>and compete for a grand <br/> prize and recogintion.
                                </div>
                            </md-tooltip>
                        </span>
                    </div>
                    <div :class="`images-list selected-concept`">
                        <div class="image-backgrounds">
                            <!-- <div :class="`images-background`"
                                v-for="indx in 4"
                                :key="indx"
                                :style="`background:${selectedConcept.colors[indx].value}`"
                            ></div> -->
                            <div class="image-background"
                                v-for="(bg,bgIndex) in selectedConcept.colors"
                                :key="bgIndex"
                                :style="`background:${bg.value}; opacity:${bg.opacity}`"
                            ></div>
                        </div>
                        <div>
                            <div :class="`images-list__item`"
                                v-for="(image, imageIndex) in selectedConcept.images"
                                :key="imageIndex"
                            >
                                <div class="image-section" :style="`background:url(http://static.maryoku.com/${image.url}) center top no-repeat`"></div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="concept-details">
                        <div class="concept-name d-flex align-center text-transform-capitalize">
                            <h3 :style="`font-family:${selectedConcept.selectedConcept?selectedConcept.selectedConcept:'Manrope-Regular'}`">{{selectedConcept.name}}</h3>
                            <ul class="features-list" v-if="selectedConcept.tags">
                                <li class="features-list__item" v-for="(tag, featureIndex) in selectedConcept.tags" :key="featureIndex">{{tag.name}}</li>
                            </ul>
                        </div>
                        <div class="concept-description" >{{selectedConcept.description}}</div>
                    </div>

                </div>
            </div>
            <div class="concepts-list md-layout-item md-size-100 " v-else>
                <div class="concepts-list__item d-flex justify-content-start expanded">
                    <event-concept-edit-form :defaultConcept="selectedConcept" @saved="onSaveConcept"></event-concept-edit-form>
                </div>
            </div>
            <div class="selected-concept-footer d-flex justify-content-between">
                <md-button class="md-black md-simple md-maryoku" > <md-icon>keyboard_arrow_left</md-icon> Back </md-button>

                <div >
                    <span class="concept-saved" > 
                        <img :src="`${$iconURL}common/check-circle-green.svg`" width="32"/> Concept is Saved </span>
                    <span class="separate"></span>
                    <md-button class="md-black md-simple md-maryoku" @click="showEditForm=true" > Edit Concept </md-button>
                </div>
            </div>
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
import ColourPicker from 'vue-colour-picker'
import { Chrome } from 'vue-color'

import VueElementLoading from 'vue-element-loading'
// import auth from '@/auth';
import EventBlocks from '../components/NewEventBlocks'
import draggable from 'vuedraggable'
import {Drag, Drop} from 'vue-drag-drop'
import _ from 'underscore'
import {Modal} from '@/components'
import EventComponentVendor from '@/models/EventComponentVendor'
import EventComponentProperty from '@/models/EventComponentProperty'

import ColorButton from '../../../../components/ColorButton'
import EventConceptEditForm from './EventConceptEditForm'
import HeaderActions from "@/components/HeaderActions";
import CommentEditorPanel from "./CommentEditorPanel";

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
    Modal,
    ColorButton,
    EventConceptEditForm,
    HeaderActions,
    CommentEditorPanel
  },
  props: {

  },
  data: () => ({
    // auth: auth,
    colour: "#FF00FF",
    showConceptList:true,
    showEditForm:false,
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
    selectedConcept:{},
    showCommentEditorPanel: false,
    conceptOptions: [
        {
            option: 1,
            name: "March Madness",
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
            fontFamily: 'Cooperative-Regular',
            tags: [{name:"Fun"},{name:"Diy"},{name:"Sporting"},{name:"Light"}],
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
            colors: [{value:"#ffc001",} ,{value:"#f3423a"}, {value:"#ff7600"}]
        },
        {
            option: 2,
            name: "Horror movies",
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
            fontFamily: 'CFNightofTerrorPERSONAL-Reg',
            tags: [{name:"romantic"},{name:"luxurry"},{name:"fun"},{name:"colourful"}],
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
            colors: [{value:"#de0300"} ,{value:"#d1d1d1"}, {value:"#ff7600"}]

        },
        {
            option: 3,
            name: "Intergalactic",
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
            fontFamily: 'IntergalacticHalftoneItalic',
            tags: [{name:"festive"},{name:"elegant"},{name:"respectable"}],
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
            colors: [{value:"#00165d"} ,{value:"linear-gradient(#ff0082,#a700ff)"}, {value:"#ff7600"}]

        }
    ],
    expandCreateConcept: false,
      conceptTags: [
          {
              name : "festive"
          },
          {
              name : "elegant"
          },
          {
              name : "respectable"
          },
      ],
      newTag: '',
    newConcept:{
        name:"",
        description:"",
        tags:[],
        colors: [
            {value: "#ff48b2", opacity:1 },
            {value: "#71ecf8", opacity:1 },
            {value: ""},
            {value: ""},
        ],
        images:[]
    },
    uploadImages:{},
    uploadImageData:{
        0:"",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
    },
    uploadImage:""
  }),
  methods: {
    ...mapMutations('event', ['setEventData']),
    expandConcept(item, index) {
        console.log(item.name);
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
            this.newConcept.tags.push({name: this.newTag});
        }
        this.newTag = "";
    },
    removeTag(index) {
        this.conceptTags.splice(index, 1)
    },
    scrollToTop() {
        window.scrollTo(0,0);
    },
    async saveConcept() {
        
    },
    addColor(index) {
        const colors = ["#ff48b2", "#71ecf8", "#ededed"];
        this.newConcept.colors[index].value = "#ff48b2"
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
        this.uploadImage = URL.createObjectURL(files[0]);
        console.log(URL.createObjectURL(files[0]));
      }
    },
    selectConcept(index) {
        this.selectedConcept = this.conceptOptions[index]
        this.showConceptList = false
    },
    onSaveConcept(eventConcept) {
        console.log(eventConcept);
        let calendar = new Calendar({id: this.$auth.user.defaultCalendarId})
        let event = new CalendarEvent({id: this.event.id}).for(calendar)

        console.log("eventConc",eventConcept);
        event.concept = eventConcept
        event.conceptProgress = 100
        console.log("eventConcept", eventConcept);
        event.save().then(result=>{
            this.event = result
            this.selectedConcept = eventConcept
            this.showConceptList = false
            this.showEditForm = false
            this.setEventData(result)
        })
        
    },
    openConceptContest() {
        window.open(`https://www.maryoku.com/concept-contest`, "_blank");
    },
    toggleCommentMode(mode) {
      this.showCommentEditorPanel = mode;
    }
  },
  created () {
    [...Array(12).keys()].map(x => x >= 8 ? this.hoursArray.push(`${x}:00 AM`) : undefined);
    [...Array(12).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 PM`) : this.hoursArray.push(`${x}:00 PM`));
    [...Array(8).keys()].map(x => x === 0 ? this.hoursArray.push(`12:00 AM`) : this.hoursArray.push(`${x}:00 AM`))

    this.hoursArray.push()
  },
  mounted () {
    // this.isLoading = true
    // if (this.event && this.event.id){
    //     this.$root.$emit("set-name",this.event, this.routeName === 'EditBuildingBlocks',true);
    //     this.getTimelineItems();
    // }

    this.$auth.currentUser(this, true, function () {
      let _calendar = new Calendar({id: this.$auth.user.defaultCalendarId})

      _calendar.calendarEvents().find(this.$route.params.id).then(event => {
        this.event = event
        if (event.concept) {
            this.selectedConcept = event.concept
            this.selectedConcept.images.forEach((item, i)=>{
                item.url = item.url
            }) 
            this.showConceptList = false
        } else {
            this.showConceptList = true
        }
        // new EventComponent().for(_calendar, event).get().then(components => {
        //     this.event.components = components
        //     this.selectedComponents = components
        // })
        this.isLoading = false
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
  },
}
</script>
<style lang="scss" scoped>
    @import "../../../styles/EventConceptChoose.scss";
</style>
