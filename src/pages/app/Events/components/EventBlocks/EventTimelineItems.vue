<template>
    <div class=" time-line-section">
        <h4>Timeline</h4>
        <div >
            <ul class="time-line-blocks_selected-items">
                <li v-for="(item,index) in timelineItems" :key="index" class="time-line-blocks_selected-items_item time-line-item">
                    <md-icon class="time-line-blocks_icon" :style="`background : ` + item.color">{{item.icon}}</md-icon>

                    <md-card class="block-info" >

                        <div class="item-title-and-time">
                                <span class="item-time" :style="`background : ` + item.color">
                                    {{item.from }} - {{item.to}}
                                </span>
                            <span class="item-title">
                                    {{item.title ? item.title : 'Title Bar' }}
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
  import Calendar from "@/models/Calendar"
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';
  import EventTimelineItem from '@/models/EventTimelineItem';

  //COMPONENTS
  import { Tabs } from "@/components";


  export default {
    name: 'event-tabs',
    components: {
        Tabs
    },
    props: {
        event
    },
    data: () => ({
        timelineItems : [
            {
                id : 1,
                type : 'setup',
                icon : 'place',
                color : '#f44336',
                from : '8:00 AM',
                to : '4:00 PM',
                title : 'title 1',
                description : 'description here'
            },
            {
                id : 2,
                type : 'activity',
                icon : 'notifications_active',
                color : '#4caf50',
                from : '8:00 AM',
                to : '4:00 PM',
                title : 'title 2',
                description : 'description here'
            },
            {
                id: 3,
                type : 'meal',
                icon : 'restaurant',
                color : '#00bcd4',
                from : '8:00 AM',
                to : '4:00 PM',
                title : 'title 3',
                description : 'description here'
            }
        ],

    }),
    methods: {

        getTimelineItems(event) {

            let calendar = new Calendar({id: this.auth.user.defaultCalendarId});
            new EventTimelineItem().for(calendar, event).get().then(res => {
//list of items
                console.log('events => ',res);
            })
        }


    },
    created() {
      
    },
    mounted() {

        this.getTimelineItems(this.event);

    },
    computed: {

    }
  }
</script>
