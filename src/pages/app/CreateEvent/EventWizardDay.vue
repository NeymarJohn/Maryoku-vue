<template>
    <div class="">
        <div class="container">
            <div class="title">
              1/5
              <br/>
              WHEN IS THE BIG DAY?
            </div>
            <div class="event-date event-basic-info">
              <div class="date-picker picker-panel">
                <div class="d-flex pl-10">
                  <img :src="`${$iconURL}Event Page/calendar-dark.svg`" width="23px"/>
                  {{getFormattedDate}}
                </div>
                <div>
                  <functional-calendar :is-date-picker='true' :change-month-function='true' :change-year-function='true' dateFormat='yyyy-mm-dd' v-model="dateData"></functional-calendar>
                </div>
              </div>
            </div>
        </div>
        <wizard-status-bar :currentStep="1" @next="goToNext" @skip="skip" @back="back"></wizard-status-bar>
    </div>
</template>

<script>
import WizardStatusBar from './componenets/WizardStatusBar'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import Vue from 'vue'
import vSelect from 'vue-select'
import { FunctionalCalendar } from 'vue-functional-calendar'
import moment from 'moment'

export default {
  components: {
    WizardStatusBar,
    FunctionalCalendar
  },
  computed: {
    getFormattedDate() {
      if (!this.dateData.selectedDate) return ""
      return moment(new Date(this.dateData.selectedDate)).format("dddd, MMM DD, YYYY")
    }
  },
  created () {
  },
  methods: {
    ...mapMutations('PublicEventPlannerVuex', ['setEventProperty', 'setCurrentStep']),
    goToNext () {
      this.$router.push({path: `/event-wizard-flexibility`})
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.setEventProperty({key: 'location', actualValue: this.eventData.location})
          this.setEventProperty({key: 'eventType', actualValue: this.eventData.eventType})
          this.setEventProperty({key: 'eventStartMillis', actualValue: this.eventData.date.getTime()})
          this.setEventProperty({key: 'eventDayPart', actualValue: this.eventData.eventDayPart})
          this.setEventProperty({key: 'eventPlaceNeeded', actualValue: this.eventData.eventPlaceNeeded})
          this.setEventProperty({key: 'flexibleWithDates', actualValue: this.eventData.flexibleWithDates})
          this.setCurrentStep({currentPage: '/about-invited'})
          this.$router.push({path: `/about-invited`})
        } else {
          this.showNotify()
        }
      })
    },
    skip () {
      this.$router.push({path: `/event-wizard-flexibility`})
    },
    back () {
      this.$router.push({path: `/event-wizard-start`})
    },
    validateDate () {
      return this.$refs.datePicker.$el.classList.contains('md-has-value')
    },
    validateAndSubmit () {
      // this.$emit('goToNextPage');
      //  return;
      let vm = this

      this.cerrors = {}
      this.validating = true

      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          // this.$parent.isLoading = true;

          if (this.eventId) {
            vm.updateEvent()
          } else {
            vm.createEvent()
          }
        } else {
          this.showNotify()
        }
      })

      if (!this.eventType) {

      } else {
        // this.$emit('goToNextPage');
      }
    },
    showNotify () {
      this.$notify({
        message: 'Please, check all required fields',
        icon: 'warning',
        horizontalAlign: 'center',
        verticalAlign: 'top',
        type: 'danger'
      })
    }
  },
  data () {
    return {
      dateData: {},
    }
  },
  computed: {
    ...mapState('PublicEventPlannerVuex', [
      'publicEventData'
    ])
  }

}
</script>
<style lang="scss">
    .event-date.event-basic-info{
        width: 450px;
        margin: 0 auto;
        padding: 0;
        min-height: 440px;
        position: relative;
    }
    .picker-panel {
      display: block;
      position: relative;
    }
    .title {
      font-family: "Manrope-Bold";
      font-size: 40px;
      text-align: center;
      line-height: 1.2em;
      margin: 20px;
    }
</style>
