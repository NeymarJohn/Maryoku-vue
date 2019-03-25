<template>
  <div class="md-layout">

    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen />

    <div class="md-layout ">
      <div class="md-layout-item md-size-25">
        <personal-information :userInfo="auth.user" v-if="auth.user.displayName" :key="auth.user"></personal-information>
      </div>
      <div class="md-layout-item md-size-25">
        <div class="md-layout">
          <dietary-constraints></dietary-constraints>
        </div>

        <div class="md-layout">

          <my-special-dates :birthDate="auth.user.me.birthday" :workingSince="auth.user.me.companyStartDate" :key="auth.user.me" ></my-special-dates>
        </div>

        <div class="md-layout">
          <holidays-celebrate></holidays-celebrate>
        </div>
      </div>

      <div class="md-layout-item md-size-35">
        <my-events :events="upCommingEvents"  ></my-events>
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
  import HolidaysCelebrate from './HolidaysCelebrate.vue';
  import auth from '@/auth';
  import {
    mapGetters
  } from 'vuex';

  export default {
    components: {
      VueElementLoading,
      PersonalInformation,
      MyEvents,
      DietaryConstraints,
      MySpecialDates,
      HolidaysCelebrate

    },
    data() {
      return {
        auth: auth,
        chips: []
      }

    },

    computed: {
      ...mapGetters({
        upCommingEvents: 'user/getUpcomingEvents',
        // user:'user/getUser'
      }),

    },
    mounted() {
      // TODO : user state should be reviewed
      this.auth.currentUser(this, true, () => {
        this.$store.dispatch("user/getUserFromApi");
      })
    }
  };
</script>
