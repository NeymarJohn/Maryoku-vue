<template>
  <div class="md-layout" style="height: 100%; overflow: hidden; padding: 0; margin: 0; padding-top: 15px; ">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C"/>

    <md-card style="padding: 0; margin: 0; height: 100%; min-height: 100%;">
      <md-card-header class="md-card-header-icon md-card-header-green">
        <div class="card-icon">
          <md-icon>star</md-icon>
        </div>
        <h4>Events</h4>
      </md-card-header>

      <md-card-content style="text-align: center; padding: 0; margin: 0; height: 100%;min-height: 100%; overflow: hidden;">

        <hr style="margin-top: 4px; margin-left: 18px; margin-right: 18px; border-color: lightgray; border-top: none; border-left: none; border-right: none;" class="divider"/>

        <!--<md-list class="md-triple-line md-dense" style="overflow: auto; height: 88%; min-height: 88%;">

          <template v-if="dates.length > 0" v-for="date in dates">
            <md-list-item v-if="calendarEvents[date] !== undefined" v-for="calendarEvent in calendarEvents[date].editables" :key="calendarEvent.id" style="cursor: pointer;">
              <md-button class="md-just-icon md-md md-round md-success" style="margin-right: 8px;">{{date.substr(6,2)}}</md-button>

              <div class="md-list-item-text">
                <span style="font-weight: 500;">{{calendarEvent.title}}</span>
                <span class="small text-gray">August 18, 2019</span>
              </div>
            </md-list-item>

            <md-list-item v-if="calendarEvents[date] !== undefined" v-for="calendarEvent in calendarEvents[date].nonEditables" :key="calendarEvent.id" style="cursor: pointer;">
              <md-button class="md-just-icon md-md md-round" style="background-color: #bdbdbd !important; margin-right: 8px;">{{date.substr(6,2)}}</md-button>

              <div class="md-list-item-text">
                <span style="font-weight: 500;">{{calendarEvent.title}}</span>
                <span class="small text-gray">August 18, 2019</span>
              </div>
            </md-list-item>
          </template>

        </md-list>-->

        <div v-if="dates.length > 0" style="height: 480px; overflow: hidden;">
          <md-list class="md-triple-line md-dense" style="overflow: auto; height: 98%; width: 100%; max-width: 100%; min-height: 88%;">

            <template v-for="date in dates">
              <md-list-item @click="openEditEventModal(calendarEvent)" v-for="calendarEvent in calendarEvents[date].editables" :key="calendarEvent.id" style="cursor: pointer;">
                <md-button class="md-just-icon md-md md-round"  v-bind:style="`background-color: ${colorWithCategory(calendarEvent.category)}`" style="margin-right: 8px;">{{date.substr(6,2)}}</md-button>
                <div class="md-list-item-text" style="white-space: normal;">
                  <span style="font-weight: 500;">{{calendarEvent.title}}</span>
                  <span class="small text-gray">{{calendarEvent.eventStartMillis | formatDate}}</span>
                </div>
              </md-list-item>

              <md-list-item @click="openEditEventModal(calendarEvent)" v-if="calendarEvents[date] !== undefined" v-for="calendarEvent in calendarEvents[date].nonEditables" :key="calendarEvent.id" style="cursor: pointer;">
                <md-button class="md-simple month-day-button md-just-icon md-md md-round" style="margin-right: 8px;">{{date.substr(6,2)}}</md-button>
                <div class="md-list-item-text" style="white-space: normal;">
                  <span style="font-weight: 500;">{{calendarEvent.title}}</span>
                  <span class="small text-gray">{{calendarEvent.eventStartMillis | formatDate}}</span>
                </div>
              </md-list-item>
            </template>

          </md-list>
        </div>

      </md-card-content>
    </md-card>
    <event-modal ref="eventModal"></event-modal>
  </div>
</template>

<script>
  import auth from '@/auth';
  import VueElementLoading from 'vue-element-loading';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import AnnualPlannerVuexModule from './AnnualPlanner.vuex';
  import EventModal from './EventModal/';
  import moment from 'moment';

  export default {
    name: 'month-events-panel',
    components: {
      EventModal,
      VueElementLoading,
    },
    props: {
      calendarEvents: {
        type: Object
      },
      openEditEventModal: {
        type: Function
      },
    },
    data() {
      return {
        formData: null,
        ready: false,
        auth: auth,
        isLoading: true,
        months: this.$moment.months(),
        dates: Object.keys(this.calendarEvents),
      }
    },
    created() {
      this.$store.registerModule('AnnualPlannerVuex', AnnualPlannerVuexModule);
    },
    mounted(){
      this.ready = true;
      this.isLoading = false;
    },
    methods: {
      ...mapActions('AnnualPlannerVuex', ['setEventModalAndEventData']),
      // openEditEventModal: function (show, item) {
      //   if (!item.editable){
      //     item.occasion = item.title;
      //   }
      //   this.setEventModalAndEventData({eventData: item});
      // },
      colorWithCategory(category) {
        let filterCategories = this.categories.filter(c => c.id === category);
        return filterCategories[0] != null ? `${filterCategories[0].color}!important;` : '';
      }
    },
    computed: {
      ...mapGetters({
        categories: 'event/getCategoriesList',
      }),
    },
    watch: {
      calendarEvents(oldValue, newValue) {
        this.dates = Object.keys(this.calendarEvents);
      }
    },
    filters: {
      formatDate: function (date) {
        return moment(date).format('MMMM Do, GGGG');
      },
    }
  };
</script>
<style lang="scss">
  .md-simple.month-day-button {
    color: #000 !important;
    font-weight: bold;
  }
</style>
