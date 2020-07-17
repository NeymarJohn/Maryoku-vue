<template>
  <div class="event-budget-requirement step2">
    <div class="container text-center">
      <div class="event-budget-flexibility event-basic-info">
        <div class="font-size-40 font-bold">
          2/2
        </div>
        <div class="font-size-40 font-bold text-transform-uppercase mt-3">
          Who’s calling the shots? 
        </div>
        <div class="mt-1">What character would you say he or she resembles?</div>
          <div class="mt-1 types">
            <div 
              v-for="(level) in levels" :key="level.value"
              class="type-card"
              :class="{selected:level.value == selectedLevel.value}" 
              @click="selectedLevel=level" 
              >
              <div>
                {{level.label}}
              </div>
              <div>
                <div class="mb-1">
                  <span v-if="level.value===1">$</span>
                  <span v-if="level.value===2">$$</span>
                  <span v-if="level.value===3">$$$</span>
                </div>
                <md-checkbox class="md-checkbox-circle md-red" v-model="selectedLevel" :value="level"></md-checkbox>
              </div>
            </div>
          </div>
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
  data() {
    return {
      flexibility: 5,
      noBudget: false,
      budget:"",
      selectedLevel:{},
      movies: [
        {
          icon: "movies/amy-santiago.png",
          label: "Amy Santiago"
        },{
          icon: "movies/amybrookheimer.jpg",
          label: "Amu Santiago"
        },{
          icon: "movies/captain-kirk2.png",
          label: "Amu Santiago"
        },{
          icon: "movies/dirty-harry2.png",
          label: "Amu Santiago"
        },{
          icon: "movies/jerry-seinfeld.png",
          label: "Amu Santiago"
        },{
          icon: "movies/joan-harris.png",
          label: "Amu Santiago"
        },{
          icon: "movies/mirandapreistly.png",
          label: "Amu Santiago"
        },{
          icon: "movies/sprano.png",
          label: "Amu Santiago"
        },
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
  
</style>