<template>
  <div class="progress-sidebar">
    <div class="summer-party">
        <md-button class="md-default md-sm md-simple expand-sidebar">
          <img :src="`${newTimeLineIconsURL}expand.svg`" />
        </md-button>
        <div class="title-label">
          summer party
          <small>checklist</small>
        </div>
        <div class="completion-progress">
          <div class="progress-done"></div>
        </div>
        <div class="percentage">
          <ul>
            <li class="green-label">56%</li>
            <li class>17 of 26</li>
          </ul>
        </div>
        <div class="small-label">Things are warming up!</div>
        <transition name="slide">
          <event-note-panel v-if="isOpenNote"></event-note-panel>
        </transition>
        

        <div class="my-notes">
          <md-button v-if="!isOpenNote" class="md-rose" @click="isOpenNote=true" >
            <img :src="`${$iconURL}Event Page/note-light.svg`" width="20" style="margin:0 3px"/>
            On my plate
            <md-icon style="font-size: 30px !important; margin-left: 5px;">keyboard_arrow_down</md-icon>
          </md-button>
          <md-button v-if="isOpenNote"  class="md-rose" @click="isOpenNote=false" >
            <img :src="`${$iconURL}Event Page/note-light.svg`" width="20" style="margin:0 3px"/>
            Close
            <md-icon style="font-size: 30px !important; margin-left: 5px;">keyboard_arrow_up</md-icon>
          </md-button>
        </div>
        
      </div>
    <div class="progress-sidebar-content">
      <!-- Event Elements -->
      <div class="event-elements">
        <draggable :list="eventElements">
          <div
            class="event-elements__item"
            @click="goToRoute(item,index)"
            :class="isActiveRoute(item)"
            v-for="(item,index) in eventElements"
            :key="index"
          >
            <div class="item-title">
              <img
                v-if="item.status==='complete'"
                src="http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2032.svg"
                width="15"
              />
              <img :src="item.icon" v-if="isActiveRoute(item)" width="25"/>
              {{item.title}}
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import moment from 'moment'
import swal from 'sweetalert2'
import { SlideYDownTransition } from 'vue2-transitions'
import InputMask from 'vue-input-mask'
import VueElementLoading from 'vue-element-loading'
import draggable from 'vuedraggable'
import { Drag, Drop } from 'vue-drag-drop'
import _ from 'underscore'

import Calendar from '@/models/Calendar'
import CalendarEvent from '@/models/CalendarEvent'
import EventComponent from '@/models/EventComponent'
import EventTimelineItem from '@/models/EventTimelineItem'
import { SideBar, SidebarItem} from '@/components'

import EventBlocks from '../components/NewEventBlocks'
import EventNotePanel from '../components/EventNotePanel'

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
    EventNotePanel
  },
  props: {
    // event: Object,
    // eventComponents: [Array, Function]
  },
  data: () => ({
    // auth: auth,
    isLoading: true,
    isOpenNote: false,
    eventElements: [
      {
        title: 'Choose Concept',
        status: 'not-complete',
        route: 'choose-concept',
        icon: 'http://static.maryoku.com/storage/icons/Timeline-New/timeline-title.svg',
        progress: 0
      },
      {
        title: 'Approve Budget',
        status: 'not-complete',
        route: 'edit/budget',
        icon: 'http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2010.svg',
        progress: 0
      },
      {
        title: 'Generate timeline',
        status: 'current',
        route: 'edit/timeline',
        icon: 'http://static.maryoku.com/storage/icons/Timeline-New/timeline-title.svg',
        progress: 0
      }
    ],
    timelineIconsURL: 'http://static.maryoku.com/storage/icons/timeline/svg/',
    menuIconsURL:
      'http://static.maryoku.com/storage/icons/menu%20_%20checklist/SVG/',
    event: {},
    newTimeLineIconsURL: 'http://static.maryoku.com/storage/icons/Timeline-New/'
  }),
  computed: {

  },
  methods: {
    isActiveRoute(item) {
      console.log(this.$router.history.current.path);
      if (this.$router.history.current.path.indexOf(item.route) > -1) {
        return "current";
      }
      return "";
    },
    goToRoute (item, index) {
      let vm = this

      this.$router.push(`/events/${this.event.id}/${item.route}`)

      // _.each(vm.eventElements,function (item) {
      //     item.status = 'not-completed'
      // })

      // vm.eventElements[index].status = 'current';

      location.reload()
    },
    getEventBlocks () {
      
    },
    generatedItems() {
      const concept = {
        title: 'Choose Concept',
        status: 'not-complete',
        route: 'choose-concept',
        icon: 'http://static.maryoku.com/storage/icons/Timeline-New/timeline-title.svg',
        progress: 0
      };
      const budget = {
        title: 'Approve Budget',
        status: 'not-complete',
        route: 'edit/budget',
        icon: 'http://static.maryoku.com/storage/icons/budget+screen/SVG/Asset%2010.svg',
        progress: 0
      };
      const timeline = {
        title: 'Generate timeline',
        status: 'current',
        route: 'edit/timeline',
        icon: 'http://static.maryoku.com/storage/icons/Timeline-New/timeline-title.svg',
        progress: 0
      };
      const elements = [];
      if (this.event.eventType.hasConcept) {
        elements.push(concept);
      }
      elements.push(budget);
      elements.push(timeline);

      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      let event = new CalendarEvent({ id: this.event.id })

      const vm = this;
      new EventComponent()
        .for(calendar, event)
        .get()
        .then(resp => {
          resp.sort((a,b)=>a.order - b.order)
          resp.forEach(item => {
            if (item.componentId !== 'unexpected') {
              elements.push({
                title: 'Book ' + item.title,
                status: 'not-complete',
                route: 'booking/' + item.id,
                icon: `http://static.maryoku.com/storage/icons/Budget+Elements/${item.componentId}.svg`,
              })
            }
          }) 
          vm.eventElements = elements;
        })
    }
  },
  created () {
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
            console.log("this evetn", this.event);
            this.generatedItems()
            this.getEventBlocks()

            console.log(event)
          })
      }.bind(this)
    )
  },
  mounted () {},
  watch: {}
}
</script>
<style lang="scss">
</style>
