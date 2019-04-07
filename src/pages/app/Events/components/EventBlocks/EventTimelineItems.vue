<template>
    <div class=" time-line-section">
        <h4>Timeline
            <md-button class="md-info md-sm edit-timeline-btn" @click="editTimeLineItems">
                Edit
            </md-button>
        </h4>

        <div >
            <ul class="time-line-blocks_selected-items" v-if="timelineItems.length">
                <li v-for="item in timelineItems" :key="item.id" class="time-line-blocks_selected-items_item time-line-item">
                    <md-icon class="time-line-blocks_icon" :style="`background : ` + item.color">{{item.icon}}</md-icon>

                    <md-card class="block-info" >

                        <div class="item-title-and-time">
                                <span class="item-time" :style="`background : ` + item.color">
                                    {{item.startTime }} - {{item.endTime}}
                                </span>
                            <span class="item-title">
                                    {{item.title}}
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


  export default {
    name: 'event-tabs',
    components: {
        Tabs
    },
    props: {
        event : Object
    },
    data: () => ({
        auth: auth,
        timelineItems : [],

    }),
    methods: {

        getTimelineItems() {

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            let event = new CalendarEvent({id: this.event.id});


            new EventTimelineItem().for(calendar, event).get().then(res => {
                this.timelineItems = res;
                this.isLoading = false;

            })
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
