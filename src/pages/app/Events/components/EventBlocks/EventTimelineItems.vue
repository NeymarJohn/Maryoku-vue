<template>
  <div class=" time-line-section">
    <h4>Timeline
      <md-button class="md-info md-sm edit-timeline-btn pull-right" v-if="!readonly" @click="editTimeLineItems">
        Edit
      </md-button>
    </h4>

    <div >
      <ul class="time-line-blocks_selected-items" v-if="timelineItems.length">
        <li v-for="item in timelineItems" :key="item.id" class="time-line-blocks_selected-items_item time-line-item">
          <md-icon class="time-line-blocks_icon" :style="`background : ` + item.color">{{item.icon}}</md-icon>

          <md-card class="block-info" >

            <div class="card-actions">
              <span class="item-time" style="display: inline-block; margin-top: 14px;" :style="`background : ` + item.color">{{ item.startTime }} - {{item.endTime}}</span>
            </div>
            <div class="item-title-and-time">
                <span class="item-title" style="font-weight: 500; margin-top: 6px; display: inline-block;" v-if="item.title">
                  {{item.title }}
                </span>
            </div>
            <p class="item-desc">
              {{ item.description }}
            </p>
          </md-card>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar";
  import CalendarEvent from "@/models/CalendarEvent";
  import EventComponent from "@/models/EventComponent";
  import EventTimelineItem from '@/models/EventTimelineItem';

  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';

  //COMPONENTS
  import { Tabs } from "@/components";
  import _ from 'underscore';


  export default {
    name: 'event-tabs',
    components: {
      Tabs
    },
    props: {
      event : Object,
      readonly : {
        type : Boolean,
        default : false
      }
    },
    data: () => ({
      auth: auth,
      timelineItems : [],

    }),
    methods: {

      getTimelineItems() {
        this.timelineItems = _.sortBy(this.event.timelineItems, function(item){ return item.order});
        this.isLoading = false;
      },
      editTimeLineItems() {
        this.$router.push({ path: `/events/`+ this.event.id + '/edit/timeline' });
      }


    },
    created() {

      this.isLoading = true;

    },
    mounted() {
      setTimeout(this.getTimelineItems(),400)
    },
    computed: {

    }
  }
</script>
