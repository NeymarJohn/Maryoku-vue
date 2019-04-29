<template>
    <div class="event-confirmation">
        <div class="confirmation-section">
            <h4>Are you coming?</h4>
            <md-button class="md-info md-sm">
                Yes
            </md-button>
            <md-button class="md-info md-sm">
                No
            </md-button>
        </div>
    </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import Calendar from "@/models/Calendar";
  import CalendarEvent from "@/models/CalendarEvent";
  import EventComponent from "@/models/EventComponent";
  import VueElementLoading from 'vue-element-loading';
  import auth from '@/auth';

  export default {
    name: 'event-confirmation',
    components: {

    },
    props: {
        event,
    },
    data: () => ({
        auth : auth
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
