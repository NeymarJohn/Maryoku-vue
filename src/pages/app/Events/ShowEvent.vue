<template>
  <div class="md-layout margin-footer">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <div class="md-layout-item md-size-50 md-small-size-100 scrollable-container">
      <event-info :occasionOptions="occasionsArray" :event="event" v-bind:readonly="true"></event-info>
    </div>

    <div class="md-layout-item md-size-50 md-small-size-100 scrollable-container mt-small-20">
      <time-line plain :type="'simple'">

          <event-card-component v-for="(component, index) in event.components"
                                :key="'event-card-component-' + index"
                                v-if="$store.state.vendorsList && component"
                                :componentObject="component"
                                :componentIndex="index"
                                :readonly="true">
          </event-card-component>

      </time-line>

    </div>

  </div>
</template>

<script>

  import EventHeaderForm from './components/EventHeaderForm.vue';
  import EventInfo from './components/EventInfo.vue';
  import EventCardComponent from './components/EventCardComponent.vue';
  import Calendar from '@/models/Calendar';
  import CalendarEvent from '@/models/CalendarEvent';
  import Occasion from '@/models/Occasion';
  import EventComponent from '@/models/EventComponent';
  import Vendors from '@/models/Vendors';
  import { mapGetters } from 'vuex'
  import moment from 'moment';
  import VueElementLoading from 'vue-element-loading';
  import { TimeLine } from "@/components";
  import { TimeLineItem } from "@/components";

  export default {
    components: {
      EventHeaderForm,
      EventInfo,
      EventCardComponent,
      VueElementLoading,
      TimeLine,
      TimeLineItem
    },
    data: () => ({
      responsive: false,
      calendarId: null,
      occasionsArray: null,
      componentsList: null,
      event: {},
      calendar: {},
      readOnly: true,
      isLoading: true,
    }),

    methods: {
      onResponsiveInverted() {
        if (window.innerWidth < 768) {
          this.responsive = true;
        } else {
          this.responsive = false;
        }
      },

      sentProposalRequest() {
        let routeData = this.$router.resolve({ path: "/events/proposal" });
        window.open(routeData.href, '_blank');
      }
    },
    computed: {
      ...mapGetters({
        myState: 'getMyState'
      }),
      components() {
        return this.event.components;
      }
    },
    mounted() {
      // hack to always scroll top
      document.getElementsByClassName('main-panel')[0].scrollTop = 0;
      this.onResponsiveInverted();
      window.addEventListener("resize", this.onResponsiveInverted);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResponsiveInverted);
    },
    methods: {
      onResponsiveInverted() {
        if (window.innerWidth < 768) {
          this.responsive = true;
        } else {
          this.responsive = false;
        }
      },
    },
    created() {
      let _this = this;
      let calendar;
      setTimeout(() => {
        calendar = Calendar.get().then(calendars => {
          if(calendars.length === 0 ) {
            return;
          }
        _this.calendar = calendars[0];
          calendars[0].calendarEvents().find(_this.$route.params.id).then(event => {
            _this.event = event;
          })
        })}, 500);
      
      let vendorsList = Vendors.get().then((vendorsList) => {
        this.$store.state.vendorsList = vendorsList;
      });

      let components = EventComponent.get().then((componentsList) => {
        this.$store.state.componentsList = componentsList;
      });

      Promise.all([vendorsList, calendar, components]).then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
      });
    },
  };
</script>

<style lang="scss">
  .read-only {
    pointer-events: none;
  }
  .margin-footer {
    margin-bottom: 50px;
  }
  .scrollable-container {
    height: calc(100vh - 72px);
    overflow: auto;
    padding-top: 1px;

    .md-card {
      margin: 10px 0;
    }
  }
  @media (max-width: 960px) {
    .mt-small-20 {
      margin-top: 20px;
    }
    .scrollable-container {
      height: auto;
    }
  }
</style>
