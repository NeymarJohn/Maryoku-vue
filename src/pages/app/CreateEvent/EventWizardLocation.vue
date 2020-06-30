<template>
    <div class="">
        <div class="container">
            <div class="title">
              2/5
              <div class="mt-1">
                Location Location Location
              </div>
            </div>
            <div class="text-center">
              Where is the event scheduled to take place? (City or region would be enough)
            </div>
            <div class="event-basic-info">
              <div class="mt-4rem">
                <maryoku-input class="form-input" inputStyle="location" v-model="numberOfGuests" placeholder="Type city / region or specific address here…"></maryoku-input>
              </div>
            </div>
        </div>
        <wizard-status-bar :currentStep="2" ></wizard-status-bar>
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
    }
  },
  data () {
    return {
      sliderValue: 50
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

    .event-basic-info {
        width: 450px;
        margin: 0 auto;
        padding: 0;
        min-height: 440px;
    }
    .form-input {
      background: white;
    }
</style>
