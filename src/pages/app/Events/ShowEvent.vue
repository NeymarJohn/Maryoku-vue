<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <event-info :occasionOptions="occasionsArray" :event="event" v-bind:readonly="true"></event-info>

    <div class="md-layout-item md-size-100">
      <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
          </div>
          <div class="md-toolbar-section-end">
            <md-button class="md-just-icon md-simple md-toolbar-toggle">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </md-button>

            <div class="md-collapse">
              <md-list>
                <md-list-item @click="sentProposalRequest()">
                  <i class="material-icons" style="margin-right: 10px;">visibility</i> Request Proposal
                  <p class="hidden-lg hidden-md">Invite</p>
                </md-list-item>
              </md-list>
            </div>
          </div>
        </div>
      </md-toolbar>
    </div>

    <event-card-component v-for="(component, index) in event.components"
                          v-if="$store.state.vendorsList && component"
                          :componentObject="component"
                          :componentIndex="index"
                          v-bind:readonly="true"
                          :key="'event-card-component-' + index">

    </event-card-component>

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

  export default {
    components: {
      EventHeaderForm,
      EventInfo,
      EventCardComponent,
      VueElementLoading
    },
    data: () => ({
      responsive: false,
      calendarId: null,
      occasionsArray: null,
      componentsList: null,
      event: {},
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
    created() {
      let calendar = Calendar.get().then(calendars => {
        if(calendars.length === 0 ) {
          return;
        }
        calendars[0].calendarEvents().find(this.$route.params.id).then(event => {
          this.event = event;
        })
      });

      let vendorsList = Vendors.get().then((vendorsList) => {
        this.$store.state.vendorsList = vendorsList;
      });

      Promise.all([vendorsList, calendar]).then(() => {
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
</style>
