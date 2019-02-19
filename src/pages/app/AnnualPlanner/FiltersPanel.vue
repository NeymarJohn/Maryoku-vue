<template>
  <div class="md-layout" style="overflow: hidden; height: 100%;">

    <md-card style="padding: 0; margin: 0; height: 100%;">
      <md-card-content style="margin-top: auto; margin-bottom: auto; padding-right: 50px;">

        <div class="md-layout" >
          <div class="md-layout-item md-size-30">
            <md-field>
              <label for="eventType">Event Types</label>
              <md-select

                v-model="selectedEventTypes"
                data-vv-name="eventType"
                id="eventType"
                name="eventType"
                @md-selected="filtersChanged" multiple>
                <md-option v-for="eventType in eventTypes" :key="eventType.item" :value="eventType.item" >{{eventType.item}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-30">
            <md-field>
              <label for="countries">Countries</label>
              <md-select

                v-model="selectedCountries"
                data-vv-name="countries"
                id="countries"
                name="countries"
                @md-selected="filtersChanged" multiple >
                <md-option v-for="country in countries" :key="country.item" :value="country.item" >{{country.item}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-30">
            <md-field v-if="holidaysSelectDisplayed">
              <label for="holidays" disabled>Holidays</label>
              <md-select
                v-model="selectedHolidays"
                data-vv-name="holidays"
                id="holidays"
                name="holidays" @md-selected="filtersChanged" multiple>
                <md-option v-for="holiday in holidays" :key="holiday.item" :value="holiday.item" >{{holiday.item}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-10" style="text-align: center; margin-top: auto; margin-bottom: auto;">
            <md-button class="md-info md-md" @click="$emit('filters-changed-event')">Refresh</md-button>
          </div>
        </div>

      </md-card-content>
    </md-card>

  </div>
</template>

<script>
  import auth from '@/auth';
  import Calendar from '@/models/Calendar';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import AnnualPlannerVuexModule from './AnnualPlanner.vuex';

  export default {
    name: 'filters-panel',
    components: {
    },
    props: {
      month : {
        type: Number
      },
      year: {
        type: Number
      }
    },
    data() {

      return {
        ready: false,
        auth: auth,
        isLoading: true,
        selectedEventTypes: [],
        eventTypes: [],
        countries: [],
        selectedCountries: [],
        holidays: [],
        selectedHolidays: [],
        holidaysSelectDisplayed: true,
      }
    },
    created() {
      this.$store.registerModule('AnnualPlannerVuex', AnnualPlannerVuexModule);
    },
    mounted(){
      this.ready = true;
      this.isLoading = false;

      const filtersData = this.$store.state.AnnualPlannerVuex.filtersData;
      filtersData.year = this.year;
      filtersData.month = this.month;
      filtersData.eventTypes = this.selectedEventTypes;
      filtersData.countries = this.selectedCountries;
      filtersData.holidays = this.selectedHolidays;

      this.auth.currentUser(this, true, function() {

        let _calendar = new Calendar({id: this.auth.user.defaultCalendarId});

        _calendar.metadata().get().then(metadatas => {

          let metadata = metadatas[0];

          this.eventTypes = metadata.eventTypes;
          this.selectedEventTypes = this.eventTypes.map(function(entry){ return entry.item;});
          this.holidaysSelectDisplayed = true;

          this.countries = metadata.countries;
          this.selectedCountries = this.countries.map(function(entry){ return entry.item;});

          this.holidays = metadata.holidays;
          this.selectedHolidays = this.holidays.map(function(entry){ return entry.item;});

          this.$emit("filters-changed-event", {eventTypes: this.selectedEventTypes, countries: this.selectedCountries, holidays: this.selectedHolidays});
        });

      }.bind(this));
    },
    methods: {
      filtersChanged() {
        this.holidaysSelectDisplayed = this.selectedEventTypes.indexOf("Holidays") !== -1;
        const filtersData = this.$store.state.AnnualPlannerVuex.filtersData;
        filtersData.year = this.year;
        filtersData.month = this.month;
        filtersData.eventTypes = this.selectedEventTypes;
        filtersData.countries = this.selectedCountries;
        filtersData.holidays = this.selectedHolidays;

        this.$emit('filters-changed-event');
      },
    },
    computed: {
      ...mapState('AnnualPlannerVuex', ['filtersData']),
    },
    watch: {

    }
  };
</script>
<style lang="scss">

</style>
