<template>
    <div class="">
        <div class="container">
            <div class="title">
              4/5
            </div>
            <selected-value :value="publicEventData.occasion.name" :property="publicEventData.occasion.value"></selected-value>
            <div class="event-basic-info">
              <div class="setting-title mt-5">
                <img :src="`${$iconURL}Onboarding/enter-gray.svg`" class="indicator">
                Choose religion, &  the holiday 
              </div>
              <div class="text-center mt-2 select-wrapper">
                <multiselect
                  v-model="nationality"
                  :options="countries"
                  :close-on-select="true"
                  :clear-on-select="true"
                  tag-placeholder="Add this as new tag"
                  placeholder="Type to search category"
                ></multiselect>
              </div>
              <div class="mt-3 holiday-types">
                <div class="text-left type" @click="type.selected=!type.selected" :class="{selected:type.selected}" v-for="(type) in types" :key="type.value">
                    <md-checkbox class="md-checkbox-circle md-red" v-model="type.selected"><span :class="{selected: type.selected}">{{type.name}}</span></md-checkbox>
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
import Multiselect from "vue-multiselect";
export default {
  components: {
    GoBack,
    SelectedValue,
    WizardStatusBar,
    MaryokuInput,
    Multiselect
  },
  created () {
  },
  methods: {
    ...mapMutations('PublicEventPlannerVuex', ['setEventProperty', 'setCurrentStep']),
    validateDate () {
      return this.$refs.datePicker.$el.classList.contains('md-has-value')
    },
    validateAndSubmit () {
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
      this.$router.push({path: `/event-wizard-vibes`})
    },
    skip() {
      this.$router.push({path: `/event-wizard-vibes`})
    },
    back() {
      this.$router.push({path: `/event-wizard-celebrating`})
    }
  },
  data () {
    return {
      types: [
        { value: "all", name: "All Islamic holidays", selected:false },
        { value: "Eid-al-Fitr", name: "Eid-al-Fitr (End of Ramadan)", selected:false },
        { value: "Ramadan", name: "Ramadan (start)", selected:false },
        { value: "Eid", name: "Eid Al-Adha", selected:false },
        { value: "Waqf", name: "Waqf al Arafa - Hajj", selected:false },
        { value: "Laylat", name: "Laylat al Qadr", selected:false },
        { value: "Hijra", name: "Hijra - Islamic New Year", selected:false },
        { value: "Milad", name: "Milad un Nabi", selected:false },
        { value: "Lailat", name: "Lailat al Miraj", selected:false },
        { value: "Ashura", name: "Day of Ashura / Muharram", selected:false },
        { value: "Nabi", name: "Milad un Nabi (Shia)", selected:false }
      ],
      countries: [
        'Christianity',
        'Islam',
        'Hinduism',
        'Buddhism',
        'Other'
      ],
      nationality: ""
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
    .select-wrapper {
      width: 400px;
      margin: 30px auto;
    }
    .holiday-types {
      width: 900px;
      margin: 30px auto;
      columns: 200px 3;
      .type {
        padding: 10px;
        &.selected {
          font-family: "Manrope-Bold";
        }
      }
    }
</style>
