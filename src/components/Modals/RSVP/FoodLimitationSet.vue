<template>
  <div class="food-limitaion-set">
    <div class="d-flex align-center">
      <div>
        <img :src="`${$iconURL}RSVP/Group+1471.svg`" class="mr-10" />
        <span class="font-bold font-size-20 mr-60" v-if="type===1">Do you have any food limitations?</span>
        <span class="font-bold font-size-20 mr-60" v-if="type===2">Any food limitations? </span>
      </div>
      <div >
        <md-checkbox class="md-checkbox-circle md-red mr-30" v-model="foodLimitaion" :value="false">No</md-checkbox>
        <md-checkbox class="md-checkbox-circle md-red"  v-model="foodLimitaion" :value="true">Yes</md-checkbox>
      </div>
    </div>
    <template v-if="foodLimitaion">
      <div class="limitation-type" >
        <img :src="`${$iconURL}RSVP/Group 9278.svg`"/>
        <div  @click="limitationType='vegetarian'" class="limiation-type-card" :class="{selected: limitationType=='vegetarian'}" >
          <img :src="`${$iconURL}RSVP/milk.svg`">
          <div>
            I’m vegetarian
          </div>
          <div class="check-mark" v-if="limitationType=='vegetarian'"></div>
        </div>
        <div class="limiation-type-card" @click="limitationType='vegan'" :class="{selected: limitationType=='vegan'}" >
          <img :src="`${$iconURL}RSVP/food+(4).svg`">
          <div>
            I’m Vegan
          </div>
          <div class="check-mark" v-if="limitationType=='vegan'"></div>
        </div>
      </div>
      <md-checkbox v-model="otherLimitation"> <span>Other food limitations:</span></md-checkbox>
      <div v-if="otherLimitation" class="limition-select">
        <div style="min-width:65px">
          <div class="selectedLimitationList" v-if="!expandedPane">
            <span v-if="selectedLimitations.length===0">Choose limitation...</span>
            <div v-else class="items">
              <span v-for="(item) in selectedLimitations" :key="item">
                {{item}},
              </span>
            </div>
            <md-button @click="expandedPane=true" class="md-icon-button md-simple">
              <md-icon >keyboard_arrow_down</md-icon>
            </md-button>
          </div>
          
        </div>
        <div class="limition-select-pane md-layout" v-if="expandedPane">
          <div class="collapse-button">
            <md-button @click="expandedPane=false" class="md-icon-button md-simple">
              <md-icon style="color:#050505 !important; font-size:25px !important">keyboard_arrow_up</md-icon>
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
      limitationType: '',
      otherLimitation: false,
      expandedPane: false,
      limitations: [
        { name: "Wheat", icon: "food+(1).svg", value: "Wheat"},
        { name: "Shellfish", icon: "animals.svg", value: "Shellfish"},
        { name: "Peanuts", icon: "salty.svg", value: "Peanuts"},
        { name: "Milk", icon: "food+(2).svg", value: "Milk"},
        { name: "Soy", icon: "food+(4).svg", value: "Soy"},
        { name: "Halal food", icon: "spiritual.svg", value: "Halal food"},
        { name: "Eggs", icon: "shape.svg", value: "Eggs"},
        { name: "Tree Nuts", icon: "food+(3).svg", value: "Tree Nuts"},
        { name: "Kosher food", icon: "kosher.svg", value: "Kosher food"},
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
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 30px;
    &.selected {
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.17);
      border: solid 0.5px #050505;
      .check-mark {
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: #f51355;
        border-radius: 50%;
        right: -15px;
        top: -15px;
        &:after {
          content: '';
          position: absolute;
          z-index: 7;
          border: 3px solid white;
          border-top: 0;
          border-left: 0;
          top: 6px;
          left: 10px;
          width: 9px;
          height: 14px;
          opacity: 1;
          transform: rotate(45deg) scale3D(1, 1, 1);
          transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
      }
    }

  }
  .selectedLimitationList {
    border-radius: 3px;
    border: solid 0.5px #050505;
    height: 65px;
    width: 50%;
    margin-left: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:25px;
    color: #818080;
    
    .items {
      color: #050500;
      max-width: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        padding-right: 5px;
      }
    }
  }
  .limition-select-pane {
    box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);
    border: solid 0.5px #a0a0a0;
    background-color: #ffffff;
    padding: 30px;
    position: absolute;
    z-index: 99;
    margin-left: 40px;
    .collapse-button {
      right: 40px;
      top: 40px;
      position: absolute;
    }
  }
}
</style>