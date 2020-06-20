<template>
  <div class="progress-sidebar">
    <div class="summer-party">
        <md-button class="md-default md-sm md-simple expand-sidebar">
          <img :src="`${$iconURL}Timeline-New/expand.svg`" />
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
          <md-button v-if="!isOpenNote" class="md-red" @click="isOpenNote=true" >
            <img :src="`${$iconURL}Event Page/note-light.svg`" width="20" style="margin:0 3px"/>
            On my plate
            <md-icon style="font-size: 30px !important; margin-left: 5px;">keyboard_arrow_down</md-icon>
          </md-button>
          <md-button v-if="isOpenNote"  class="md-red" @click="isOpenNote=false" >
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
            :class="{current:isActiveRoute(item), progress_100: item.progress===100 }"
            v-for="(item,index) in eventElements"
            :key="index"
          >
            <div class="item-title">
              <img
                v-if="item.status==='completed'"
                :src="`${$iconURL}budget+screen/SVG/Asset%2032.svg`"
                width="25"
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
    isLoading: true,
    isOpenNote: false,
    eventElements: [],
    currentUrl:""
  }),
  computed: {
    ...mapState('event',{
      event: state=>state.eventData
    })
  },
  methods: {
    ...mapActions('event',['getEventAction']),
    isActiveRoute(item) {
      if (this.currentUrl.indexOf(item.route) > -1) {
        return "current";
      }
      return "";
    },
    goToRoute (item, index) {
      let vm = this
      this.$router.push(`/events/${this.event.id}/${item.route}`)
    },
    generatedItems(event) {
      const concept = {
        title: 'Choose Concept',
        status: event.conceptProgress===100?'completed':'not-complete',
        route: 'booking/concept',
        icon: `${this.$iconURL}Timeline-New/timeline-title.svg`,
        progress: event.conceptProgress
      };
      const budget = {
        title: 'Approve Budget',
        status: 'not-complete',
        route: 'edit/budget',
        icon: `${this.$iconURL}budget+screen/SVG/Asset%2010.svg`,
        progress: 0
      };
      const timeline = {
        title: 'Generate timeline',
        status: 'current',
        route: 'booking/timeline',
        icon: `${this.$iconURL}Timeline-New/timeline-title.svg`,
        progress: 0
      };
      const elements = [];
      if (this.event.eventType.hasConcept) {
        elements.push(concept);
      }
      elements.push(budget);
      elements.push(timeline);

      let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
      const vm = this;
      new EventComponent()
        .for(calendar, event)
        .get()
        .then(resp => {
          resp.sort((a,b)=>a.order - b.order)
          resp.forEach(item => {
            if (item.componentId !== 'unexpected') {
              elements.push({
                title:  item.bookTitle,
                status: 'not-complete',
                route: 'booking/' + item.id,
                icon: `http://static.maryoku.com/storage/icons/Budget+Elements/${item.componentId}.svg`,
              })
            }
          }) 
          vm.eventElements = elements;
        })
    },
    setConstantStates(event) {
      this.eventElements[0].progress = event.conceptProgress
      this.eventElements[0].status = event.conceptProgress == 100?"completed":"not-complete"
    },
    fetchUrl () {
      this.currentUrl = this.$router.history.current.path;
    }
  },
  created () {
    this.fetchUrl()
    this.$auth.currentUser(
      this,
      true,
      function () {
        let calendar = new Calendar({ id: this.$auth.user.defaultCalendarId })
        this.getEventAction({eventId: this.$route.params.id, calendar}).then(event => {
            this.generatedItems(event)
        })
      }.bind(this)
    )
  },
  mounted () {},
  watch: {
    '$route': 'fetchUrl',
    event(newValue){
      this.setConstantStates(newValue)
    }
  }
}
</script>
<style lang="scss">
</style>
