<template>
    <div class="">
        <div class="container">
            <div class="title">
              4/5
            </div>
            <div class="event-basic-info">
              <div class="setting-title mt-3">
                What type of event are you planning on?
              </div>
              <div class="mt-3 types">
                <div class="type-card" :class="{selected:type.selected}" v-for="(type) in eventTypes" :key="type.value">
                  <div>
                    <img :src="`${$iconURL}Onboarding/${type.value}-dark.svg`">
                  </div>
                  <div>
                    {{type.name}}
                  </div>
                  <div>
                    <md-checkbox class="md-checkbox-circle md-red" v-model="type.selected"></md-checkbox>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <wizard-status-bar :currentStep="4" @next="goToNext" @skip="skip" @back="back"></wizard-status-bar>

    </div>
</template>

<script>

import GoBack from './componenets/GoBack'
import SelectedValue from './componenets/SelectedValue'
import WizardStatusBar from './componenets/WizardStatusBar'
import { MaryokuInput} from '@/components'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    GoBack,
    SelectedValue,
    WizardStatusBar,
    MaryokuInput
  },
  created () {
    this.$store.dispatch('event/getEventTypes', {
      data: this.$auth.user.defaultCalendarId,
      ctx: this
    });
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
      this.$router.push({path: `/event-wizard-celebrating`})
    },
    skip() {
      this.$router.push({path: `/event-wizard-celebrating`})
    },
    back() {
      this.$router.push({path: `/event-wizard-type`})
    }
  },
  data () {
  },
  computed: {
    ...mapState('PublicEventPlannerVuex', [
      'publicEventData'
    ]),
    ...mapGetters({
      eventTypes: 'event/getEventTypesList'
    }),
  }

}
</script>
<style lang="scss">

    .event-basic-info {
        width: 100%;
        margin: 0 auto;
        padding: 0;
        min-height: 440px;
    }
    
    .md-checkbox-circle {
      margin: 0px;
    }
    .input-name {
      width: 80%;
      text-align: right;
      .form-input {
        width: 280px;
        margin: 0 0 0 auto;
        display: inline-block;
      }
    }
    .types {
      flex-wrap: wrap;
      width: 80%;
      margin: 30px auto;
    }
</style>
