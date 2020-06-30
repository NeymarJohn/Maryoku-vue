<template>
    <div class="">
        <div class="container">
            <div class="title">
              2/5
              <br/>
              How many lucky guests are you expecting?
            </div>
            <selected-value value="23.04.21" property="calendar"></selected-value>
            <div class="event-guests event-basic-info">
              <div class="mt-5">
                <maryoku-input class="form-input" inputStyle="users" v-model="numberOfGuests" type="number" placeholder="Type number…..."></maryoku-input>
              </div>
            </div>
        </div>
        <wizard-status-bar :currentStep="2" @next="goToNext" @skip="skip" @back="back"></wizard-status-bar>
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
    WizardStatusBar,
    MaryokuInput
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
      this.setEventProperty({key: 'numberOfParticipants', actualValue: this.numberOfGuests})
      this.$router.push({path: `/event-wizard-guests-type`})
    },
    skip() {
      this.$router.push({path: `/event-wizard-guests-type`})
    },
    back() {
      this.$router.push({path: `/event-wizard-flexibility`})
    }
  },
  data () {
    return {
      numberOfGuests: null
    }
  },
  created () {
    if (this.publicEventData.numberOfParticipants) {
      this.numberOfGuests = this.publicEventData.numberOfParticipants
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

    .event-guests.event-basic-info {
        width: 450px;
        margin: 0 auto;
        padding: 0;
        min-height: 440px;
    }
    .form-input {
      background: white;
    }
</style>
