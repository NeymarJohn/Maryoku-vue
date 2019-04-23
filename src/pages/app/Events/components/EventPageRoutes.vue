<template>
       <div class="event-page-routes">
           <div class="md-card-tabs md-card-plain">
               <ul class="md-list nav-tabs">
                   <li class="md-list-item">
                       <md-button :class="{active: routeName === 'EditEvent'}" @click="goToComponent('/edit')">Event Details</md-button>
                   </li>

                   <li class="md-list-item">
                       <md-button :class="{active: routeName === 'EditBuildingBlocks'}" @click="goToComponent('/edit/building-blocks')">Budget & Proposals</md-button>
                   </li>

                   <li class="md-list-item">
                       <md-button :class="{active: routeName === 'EditTimeLine'}" @click="goToComponent('/edit/timeline')">Timeline</md-button>
                   </li>

                   <li class="md-list-item">
                       <md-button :class="{active: routeName === 'InviteesManagement'}" @click="goToComponent('/edit/invitees-management')">Invitees Managemen</md-button>
                   </li>
               </ul>
           </div>
      </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar"
  import EventComponent from "@/models/EventComponent";
  import auth from '@/auth';
  import moment from "moment";


  export default {
    name: 'event-page-routes',
    components: {

    },
    props: {
        event
    },
    data: () => ({
        auth: auth,
        routeName : null
    }),
    methods: {
      goToComponent (route) {
          this.$router.push({ path: `/events/`+ this.event.id + route });
          location.reload();
      }

    },
    created() {
        this.routeName = this.$route.name;


    },
    mounted() {


    }
  }
</script>
