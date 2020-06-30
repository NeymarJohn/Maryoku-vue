<template>
    <div class="">
        <div class="container">
            <div class="form-section event-basic-info">
                <div>
                  <img :src="`${$iconURL}Onboarding/balloon-calendar.svg`">
                </div>
                <h2>
                  HELLO THERE!
                </h2>
                <div>
                  Please answer a few questions to complete the background we need!
                </div>
                <div class="font-bold mt-4rem">
                  Only 5 simple steps & you're signed!
                </div>
                <div class="font-bold mt-4rem">
                    <md-button @click="goToNext" class="md-default md-red md-maryoku mt-4">Let's Begin</md-button>
                </div>

            </div>
        </div>

        <go-back navigation="https://www.maryoku.com/home.html" :home="true"></go-back>

    </div>
</template>

<script>

import GoBack from './componenets/GoBack'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import Vue from 'vue'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

export default {
  components: {
    GoBack
  },
  created () {
    this.$set(this.eventData, 'location', this.publicEventData.location)
    this.$set(this.eventData, 'eventType', this.publicEventData.eventType)
    this.$set(this.eventData, 'date', this.publicEventData.date)
    this.$set(this.eventData, 'eventDayPart', this.publicEventData.eventDayPart)
    this.$set(this.eventData, 'eventPlaceNeeded', this.publicEventData.eventPlaceNeeded)
    this.$set(this.eventData, 'flexibleWithDates', this.publicEventData.flexibleWithDates)
  },
  methods: {
    ...mapMutations('PublicEventPlannerVuex', ['setEventProperty', 'setCurrentStep']),
    goToNext () {
      this.$router.push({path: `/event-wizard-day`})
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
      selectedCountry: null,
      selectedEmployee: null,
      step: 1,
      haveEventPlace: false,
      flexibleWithDates: false,
      eventTime: null,
      eventDate: null,
      eventData: {
        location: null
      },
      modelValidations: {
        location: {
          required: true
        },
        date: {
          required: true
        },
        eventType: {
          required: true
        }
      },
      options: ['ameed', 'ahmad']
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
    .form-section.event-basic-info {
        width: 900px;
        margin: 0 auto;
        padding: 80px;
        min-height: 600px;
        text-align: center;
    }
</style>
