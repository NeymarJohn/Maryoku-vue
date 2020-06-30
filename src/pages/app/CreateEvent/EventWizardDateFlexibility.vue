<template>
    <div class="">
        <div class="container">
            <div class="title">
              1/5
            </div>
            <selected-value :value="formattedDate" property="calendar"></selected-value>
            <div class="event-flexibility event-basic-info">
              <div class="mt-5">Between a camel yoga pose and plywood</div>
              <div class="setting-title mt-1">
                <img :src="`${$iconURL}Onboarding/enter-gray.svg`" class="indicator">
                how flexible is this date?
              </div>
              <div class="mt-4rem">
                <img :src="`${$iconURL}Onboarding/block-red.svg`">
                <range-slider
                  class="slider"
                  min="0"
                  max="10"
                  step="1"
                  v-model="flexibility">
                </range-slider>
                <img :src="`${$iconURL}Onboarding/excersie-red.svg`">
              </div>
            </div>
        </div>
        <wizard-status-bar :currentStep="1" @next="goToNext" @skip="skip" @back="back"></wizard-status-bar>
    </div>
</template>

<script>

import SelectedValue from './componenets/SelectedValue'
import WizardStatusBar from './componenets/WizardStatusBar'
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
import moment from 'moment'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    SelectedValue,
    WizardStatusBar,
    RangeSlider
  },
  created () {
  },
  methods: {
    ...mapMutations('PublicEventPlannerVuex', ['setEventProperty', 'setCurrentStep']),
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
    },
    goToNext() {
      this.setEventProperty({key: 'flexibleWithDates', actualValue: this.flexibility})
      this.$router.push({path: `/event-wizard-guests`})
    },
    skip() {
      this.$router.push({path: `/event-wizard-guests`})
    },
    back() {
      this.$router.push({path: `/event-wizard-day`})
    }
  },
  data () {
    return {
      flexibility: 5
    }
  },
  created () {
    if (this.publicEventData.flexibleWithDates) {
      this.flexibility = this.publicEventData.flexibleWithDates
    }
  },
  computed: {
    ...mapState('PublicEventPlannerVuex', [
      'publicEventData'
    ]),
    formattedDate() {
      return moment(new Date(this.publicEventData.eventStartMillis)).format("DD.MM.YY")
    }
  },
  // filters: {
  //   formattedDate: function(eventStartMillis) {
  //    return moment(new Date(this.publicEventData.eventStartMillis)).format("DD.MM.YY")
  //   }
  // }

}
</script>
<style lang="scss">

    .event-flexibility.event-basic-info {
        width: 100%;
        margin: 0 auto;
        padding: 0;
        min-height: 440px;
    }
    .range-slider {
      width: 500px;
    }
    .slider {
      background: transparent;
      .range-slider-inner {
        .range-slider-knob {
          width: 34px;
          height: 34px;
          background: #f51355;
          border: none;
          z-index: 2;
          &::before {
            content: " ";
            display: block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            margin-left: 50%;
            margin-top: 50%;
            transform: translate(-50%, -50%);
            background: white;
            box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.42);
          }
        }
        .range-slider-rail {
          background: #a0a0a0;
        }
        .range-slider-fill {
          background: #f51355;
        }
        &::before {
          content: " ";
          display: block;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          margin-left: 0%;
          transform: translate(-50%, 2px);
          background: #f51355;
        }
        &::after {
            content: " ";
            display: block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-left: 100%;
            transform: translate(-50%, -13px);
            background: #a0a0a0;
          }
      }
    }


</style>
