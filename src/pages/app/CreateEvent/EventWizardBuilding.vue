<template>
    <div class="">
        <div class="container">
            <div class="title">
              3/5
            </div>
            <selected-value :value="publicEventData.location" property="location"></selected-value>
            <div class="event-building event-basic-info">
              <div class="setting-title mt-5">
                <img :src="`${$iconURL}Onboarding/enter-gray.svg`" class="indicator">
                Staying in or in need of some fresh air? 
              </div>
              <div class="text-center mt-2">
                Is it an indoor or outdoor event?
              </div>
              <div class="mt-3 types">
                <div class="type-card" @click="type.selected=!type.selected" :class="{selected:type.selected}" v-for="(type) in types" :key="type.value">
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
        <wizard-status-bar :currentStep="3" @next="goToNext" @skip="skip" @back="back"></wizard-status-bar>
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
  },
  methods: {
    ...mapMutations('PublicEventPlanner', ['setEventProperty', 'setCurrentStep']),
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
      this.$router.push({path: `/event-wizard-type`})
    },
    skip() {
      this.$router.push({path: `/event-wizard-type`})
    },
    back() {
      this.$router.push({path: `/event-wizard-location`})
    }
  },
  data () {
    return {
      types: [
        {
          value: "indoor", name: "Indoor Event", selected:false
        },
        {
          value: "outdoor", name: "Outdoor Event", selected:false
        }
      ]
    }
  },
  computed: {
    ...mapState('PublicEventPlanner', [
      'publicEventData'
    ])
  }

}
</script>
<style lang="scss">

    .event-building.event-basic-info {
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
