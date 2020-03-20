<template>
  <div class="md-layout" style="overflow: hidden; height: 100%;">
    <md-card style="padding: 0; margin: 0; height: 100%;" class="annual-planner-filters-box">
      <md-card-content style="margin-top: auto; margin-bottom: auto; padding-right: 50px;">
        <div class="md-layout">
          <div class="md-layout-item md-size-30">
            <md-field>
              <label for="category">Event Categories</label>
              <md-select
                v-model="selectedCategories"
                data-vv-name="category"
                id="category"
                name="category"
                @md-selected="filtersChanged"
                multiple
              >
                <md-option
                  v-for="category in categories"
                  :key="category.item"
                  :value="category.item"
                >{{category.item}}</md-option>
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
                @md-selected="filtersChanged"
                multiple
              >
                <md-option
                  v-for="country in countries"
                  :key="country.item"
                  :value="country.item"
                >{{country.item}}</md-option>
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
                name="holidays"
                @md-selected="filtersChanged"
                multiple
              >
                <md-option
                  v-for="holiday in holidays"
                  :key="holiday.item"
                  :value="holiday.item"
                >{{holiday.item}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div
            class="md-layout-item md-size-10"
            style="text-align: center; margin-top: auto; margin-bottom: auto;"
          >
            <md-button
              class="md-info md-md annual-planner-filters-refresh-button"
              @click="filterBaseData"
            >Refresh</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
// import auth from '@/auth';
import Calendar from '@/models/Calendar'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import AnnualPlannerVuexModule from './AnnualPlanner.vuex'

export default {
  name: 'filters-panel',
  components: {},
  props: {
    month: {
      type: Number
    },
    year: {
      type: Number
    }
  },
  data () {
    return {
      ready: false,
      // auth: auth,
      isLoading: true,
      eventTypes: [],
      selectedCategories: [],
      countries: [],
      selectedCountries: [],
      holidays: [],
      selectedHolidays: [],
      holidaysSelectDisplayed: true
    }
  },
  created () {
    this.$store.registerModule('AnnualPlannerVuex', AnnualPlannerVuexModule)
  },
  mounted () {
    this.ready = true
    this.isLoading = false

    this.$root.$on('calendar-refresh-events', this.filterBaseData)

    this.filterBaseData()
  },
  methods: {
    filterBaseData () {
      this.$auth.currentUser(
        this,
        true,
        function () {
          let _calendar = new Calendar({
            id: this.$auth.user.defaultCalendarId
          })

          _calendar
            .metadata()
            .get()
            .then(metadatas => {
              let metadata = metadatas[0]

              this.holidaysSelectDisplayed = true

              this.countries = metadata.countries
              this.selectedCountries = this.countries.map(function (entry) {
                return entry.item
              })

              this.holidays = metadata.holidays

              this.selectedHolidays = this.holidays.map(function (entry) {
                return entry.item
              })
            })

          this.categories.forEach(element => {
            this.selectedCategories.push(element.item)
          })

          this.$emit('filters-changed-event', {
            categories: this.selectedCategories,
            countries: this.selectedCountries,
            holidays: this.selectedHolidays
          })
        }.bind(this)
      )
    },
    filtersChanged () {
      if (this.isLoading === false) {
        const filtersData = this.$store.state.AnnualPlannerVuex.filtersData
        filtersData.year = this.year
        filtersData.month = this.month
        filtersData.categories = this.selectedCategories
        filtersData.countries = this.selectedCountries
        filtersData.holidays = this.selectedHolidays

        this.$emit('filters-changed-event', {
          categories: this.selectedCategories,
          countries: this.selectedCountries,
          holidays: this.selectedHolidays
        })
      }
    }
  },
  computed: {
    ...mapState('AnnualPlannerVuex', ['filtersData']),
    ...mapGetters({
      categories: 'event/getCategoriesList'
    })
  },
  watch: {
    categories (newVal, oldVal) {
      this.filterBaseData()
    }
  }
}
</script>
<style lang="scss">
</style>
