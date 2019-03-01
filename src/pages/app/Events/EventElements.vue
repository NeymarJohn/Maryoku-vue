<template>
  <div class="md-layout">    
    <div class="md-layout-item md-size-100">
    <md-card class="md-card-profile">
        <div class="logo-block">
          <div class="event-planer-logo details">
            <md-icon class="company-logo">date_range</md-icon>
          </div>
          <div class="event-title">Event Information</div>         
        </div>
        <div>
        </div>
      <div>
                <md-button  class="md-info md-block" >Create Event Timeline</md-button>
      </div>
       </md-card>     
    </div>
  </div>
</template>
<script>
//MAIN MODULES
import moment from "moment";

//COMPONENTS


export default {
  name:'EventElements',
  components: {   
   
  },

  data() {
    return {
            
    };
  },
  mounted() {
   
  },
  methods: {
   
  },
  computed: {    
  },
  filters: {
    
  },
  watch: {
  },  
};
</script>

<style lang="scss">
.details{
     background-image: linear-gradient(to right, #ffa625, #fb8d02)!important
}

</style>
