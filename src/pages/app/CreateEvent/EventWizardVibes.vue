<template>
    <div class="">
        <div class="container">
            <div class="title">
              5/5
            </div>
            <div class="event-basic-info">
               <div class="text-center mt-2">
                Here is a fun question for you,
              </div>
              <div class="setting-title mt-2">
                Try describing your guest’s vibes using a song
              </div>
              <div class="mt-3 types">
                <music-card :class="{selected:type.selected}" v-for="(type) in guestsTypes" :key="type.value">
                </music-card >
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
import MusicCard from './componenets/MusicCard'
import { MaryokuInput} from '@/components'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    GoBack,
    SelectedValue,
    WizardStatusBar,
    MaryokuInput,
    MusicCard
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
      guestsTypes: [
        {
          value: "employees", name: "Employees", selected:false
        },
        {
          value: "employees-spouses", name: "Employees & Spouses", selected:false
        },
        {
          value: "families", name: "Familes", selected:false
        },
        {
          value: "business-associates", name: "Business Associates", selected:false
        },
        {
          value: "customers", name: "Customers", selected:false
        },
        {
          value: "board-members", name: "Board Members", selected:false
        },
        {
          value: "other", name: "Other", selected:false
        }
      ]
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
    .indicator-reverse {
      transform: scaleX(-1);
      margin-left: 20px;
    }
</style>
