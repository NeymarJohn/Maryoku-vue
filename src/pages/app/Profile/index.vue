<template>
  <div class="md-layout">

    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen />

    <div class="md-layout ">
      <div class="md-layout-item md-size-33">
        <personal-information :userInfo="auth.user"></personal-information>
      </div>
      <div class="md-layout-item md-size-33" >

        <my-events :events="upCommingEvents"></my-events>
      </div>

      <div class="md-layout-item md-size-33">
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
  import auth from '@/auth';
  import { mapGetters } from 'vuex';
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
        auth: auth,
      }

    },

    computed:
      {
        ...mapGetters({
          upCommingEvents:'user/getUpcomingEvents'
        })
      },
    mounted()
    {
      this.auth.currentUser(this, true,()=>{
        this.$store.dispatch("user/getUserFromApi");
      })

    }
  };

</script>
