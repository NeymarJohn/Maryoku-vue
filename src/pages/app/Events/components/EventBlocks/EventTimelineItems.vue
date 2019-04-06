<template>
    <div class="event-info-tabs">
        <tabs
                :tab-name="['MEETING PLACE', 'WHEN TO ARRIVE', 'WHAT YOU NEED TO KNOW']"
                flex-column
                color-button="danger">
            <!-- here you can add your content for tab-content -->
            <template slot="tab-pane-1">
                Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
            </template>
            <template slot="tab-pane-2">
                Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
                <br><br>
                Dramatically maintain clicks-and-mortar solutions without functional solutions.
            </template>
            <template slot="tab-pane-3">
                Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                <br><br>
                Dynamically innovate resource-leveling customer service for state of the art customer service.
            </template>
        </tabs>

    </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar"
  import EventComponent from "@/models/EventComponent";
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
        event
    },
    data: () => ({

    }),
    methods: {


    },
    created() {
      
    },
    mounted() {

    },
    computed: {

    }
  }
</script>
