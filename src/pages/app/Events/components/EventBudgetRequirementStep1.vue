<template>
  <div class="event-budget-requirement step1">
    <div class="container text-center">
      <div class="event-budget-flexibility event-basic-info">
        <div class="font-size-40 font-bold">
          1/2
        </div>
        <div class="mt-1">The million-dollar question…</div>
        <div class="font-size-40 font-bold text-transform-uppercase mt-1">
          What’s your budget?
        </div>
        <div style="max-width:600px; margin: 3rem auto 2rem">
          <maryoku-input inputStyle="budget" placeholder="Type number here" v-model="eventInfo.budget" style="text-align:center" class="budget-input"></maryoku-input>
        </div>
        <div class="font-size-16 font-bold">
          <md-checkbox v-model="eventInfo.noBudget" > I don't have a budget</md-checkbox>
        </div>
        <template v-if="!eventInfo.noBudget">
          <div class="font-size-20 font-bold text-transform-capitalize mt-3">
            <img :src="`${$iconURL}Onboarding/enter-gray.svg`" class="indicator">
            Between a Teflon pan and a super glue How obligated are you to stick to the budget?  
          </div>
          <div class="mt-4rem slider-wrapper">
            <div>
              <img :src="`${$iconURL}Budget Requirements/group-8347.svg`">
              <div class="font-bold">Super Glue</div>
              <div>Within Budget</div>
            </div>
            <range-slider
              class="slider"
              min="0"
              max="10"
              step="1"
              v-model="eventInfo.flexibility">
            </range-slider>
            <div>
              <img :src="`${$iconURL}Budget Requirements/group-8348.svg`">
              <div class="font-bold">Telflon Pan</div>
              <div>Value For Money</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="font-size-30 font-bold text-transform-uppercase mt-3">
            <img :src="`${$iconURL}Onboarding/enter-gray.svg`" class="indicator">
            If your budget were a Fashion brand, it’d be a…
          </div>
           <div class="mt-1 types">
              <div 
                v-for="(level) in levels" :key="level.value"
                class="type-card"
                :class="{selected:level.value == eventInfo.selectedLevel}" 
                @click="eventInfo.selectedLevel=level.value" 
                >
                <div class="brand">
                  <img :src="`${$iconURL}${level.icon}`"/>
                </div>
                <div>
                  <div class="mb-1">
                    <span v-if="level.value===1">$</span>
                    <span v-if="level.value===2">$$</span>
                    <span v-if="level.value===3">$$$</span>
                  </div>
                  <md-checkbox class="md-checkbox-circle md-red" v-model="eventInfo.selectedLevel" :value="level.value"></md-checkbox>
                </div>
              </div>
            </div>
        </template>
      </div>
    </div>
  </div>  
</template>
<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { MaryokuInput } from '@/components'
import 'vue-range-slider/dist/vue-range-slider.css'
import RangeSlider from 'vue-range-slider'
import moment from 'moment'

export default {
  components: {
    RangeSlider,
    MaryokuInput
  },
  props: {
    defaultData: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      eventInfo: {
        flexibility: 5,
        noBudget: false,
        budget:"",
        selectedLevel:"",
      },
      levels: [
        {
          value: 1,
          label: "FOREVER 21",
          icon: "Budget Requirements/forever21.svg"
        },
        {
          value: 2,
          label: "URBAN OUTFITTERS",
          icon: "Budget Requirements/urban.svg"
        },
        {
          value: 3,
          label: "PRADA",
          icon: "Budget Requirements/prada.svg"
        }
      ]
    }
  },
  created () {
    if (this.defaultData.budget) {
      this.eventInfo = this.defaultData;
    }
  },
  watch: {
    eventInfo: {
      handler(val){
        this.$emit("change", val)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
   .maryoku_input input.budget {
     text-align: center;
   }
  .event-budget-requirement{
    input.budget {
      height:100px;
      
    }
    .maryoku_input{
      input {
        text-align: center !important;
      }
    }
    .types {
      .brand {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>