<template>
  <div class="md-layout">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen background-color="#448aff" />
  
      <div class="md-layout md-gutter">
         <div class="md-layout-item">
            <personal-information></personal-information>
          </div>
            <div class="md-layout-item" >
              <my-events></my-events>
            </div>
         
            <div class="md-layout-item">
              <dietary-constraints></dietary-constraints>
            </div>
        
      </div>
  </div>
</template>

<script>
  import VueElementLoading from 'vue-element-loading';
  import PersonalInformation from "./PersonalInformation.vue";
  import MyEvents from "./MyEvents.vue";
  import DietaryConstraints from "./DietaryConstraints.vue";
  import MySpecialDates from "./MySpecialDates.vue";
  // import {
  //   StatsCard,
  //   ChartCard,
  //   ProductCard,
  //   AnimatedNumber,
  //   GlobalSalesCard,
  //   GlobalSalesTable
  // } from "@/components";
  
  export default {
    components: {
      VueElementLoading,
      PersonalInformation,
      MyEvents,
      DietaryConstraints,
      MySpecialDates,
      
    },
    data() {
      return  {

      } 
          
        }
      };
    
</script>
