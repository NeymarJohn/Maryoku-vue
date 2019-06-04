<template>
  <div class="md-layout event-groups">
    <vue-element-loading :active="isLoading" spinner="ring" is-full-screen color="#FF547C" isFullScreen/>
    <div class="md-layout-item md-size-100">
      <event-groups-list :event-data.sync="eventData"></event-groups-list>
    </div>
  </div>
</template>
<script>

  import Calendar from "@/models/Calendar"
  import CalendarEvent from "@/models/CalendarEvent"
  import VueElementLoading from 'vue-element-loading';
  import EventInteraction from "@/models/EventInteraction";

  import EventGroupsList from './EventGroupsList';
  export default {
    name: 'event-groups',
    components: {
      VueElementLoading,
      EventGroupsList
    },
    props: {
      eventData: Object
    },
    data: () => ({

      isLoading: true,
    }),
    methods: {

    },
    created() {
    },
    mounted() {
      this.isLoading = false;

    },
    computed: {},
    watch: {
    }
  }
</script>
