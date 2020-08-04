<template>
  <div class="food-limitaion-set">
    <div class="d-flex align-center">
      <div>
        <img :src="`${$iconURL}RSVP/Group+1471.svg`" class="mr-10" />
        <span class="font-bold font-size-20" v-if="type===1">Do you have any food limitations?</span>
        <span class="font-bold font-size-20" v-if="type===2">Any food limitations? </span>
      </div>
      <div >
        <md-checkbox class="md-checkbox-circle md-red" v-model="foodLimitaion" :value="false">No</md-checkbox>
        <md-checkbox class="md-checkbox-circle md-red"  v-model="foodLimitaion" :value="true">Yes</md-checkbox>
      </div>
    </div>
    <template v-if="foodLimitaion">
      <div class="limitation-type" >
        <img :src="`${$iconURL}RSVP/Group 9278.svg`"/>
        <div class="limiation-type-card" >
          <img :src="`${$iconURL}RSVP/milk.svg`">
          <div>
            I’m vegetarian
          </div>
        </div>
        <div class="limiation-type-card" >
          <img :src="`${$iconURL}RSVP/food+(4).svg`">
          <div>
            I’m Vegan
          </div>
        </div>
      </div>
      <md-checkbox v-model="otherLimitation"> <span>Other food limitations:</span></md-checkbox>
      <div v-if="otherLimitation" class="limition-select">
        <div>
          <div class="selectedLimitationList">
            Choose limitation...
            <md-button @click="expandedPane=true" class="md-icon-button md-simple">
              <md-icon >keyboard_arrow_down</md-icon>
            </md-button>
          </div>
          
        </div>
        <div class="limition-select-pane md-layout" v-if="expandedPane">
          <div class="md-layout-item md-size-100">
            <md-button @click="expandedPane=false" class="md-icon-button md-simple">
              <md-icon >keyboard_arrow_up</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item md-size-30 mb-50" v-for="(limitation, index) in limitations" :key="index"> 
            <md-checkbox v-model="selectedLimitations" :value="limitation.value">
              <span><img style="margin: -10px 15px" :src="`${$iconURL}RSVP/${limitation.icon}`"/> {{limitation.name}}</span>
            </md-checkbox>
          </div>
          <div class="md-layout-item md-size-100 d-flex"> 
            <md-checkbox v-model="selectedOther">
              <span>Other</span>
            </md-checkbox>
            <maryoku-input style="width:50%" v-if="selectedOther" placeholder="Type limitation here…"></maryoku-input>
          </div>
        </div>
      </div>
    </template>
    
  </div>
</template>
<script>
import { MaryokuInput } from "@/components";
export default {
  components: {
    MaryokuInput
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      foodLimitaion: false,
      otherLimitation: false,
      expandedPane: false,
      limitations: [
        { name: "Wheat", icon: "food+(1).svg", value: "wheat"},
        { name: "Shellfish", icon: "animals.svg", value: "shellfish"},
        { name: "Peanuts", icon: "salty.svg", value: "peanuts"},
        { name: "Milk", icon: "food+(2).svg", value: "milk"},
        { name: "Soy", icon: "food+(4).svg", value: "soy"},
        { name: "Halal food", icon: "spiritual.svg", value: "halalfood"},
        { name: "Eggs", icon: "shape.svg", value: "eggs"},
        { name: "Tree Nuts", icon: "food+(3).svg", value: "treenuts"},
        { name: "Kosher food", icon: "kosher.svg", value: "kosherfood"},
      ],
      selectedLimitations:[],
      selectedOther: false
    }
  },
}
</script>
<style lang="scss" scoped>
.food-limitaion-set{
  .limitation-type {
    display: flex;
  }
  .limiation-type-card{
    width: 165px;
    height: 165px;
    border-radius: 3px;
    border: solid 0.5px #818080;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 30px
  }
  .limition-select-pane {
    box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);
    border: solid 0.5px #a0a0a0;
    background-color: #ffffff;
    padding: 30px;
    position: absolute;
    z-index: 99;
  }
}
</style>