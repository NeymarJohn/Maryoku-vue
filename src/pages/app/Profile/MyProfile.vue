<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-5" style="padding: 0; margin: 0;">
      <h4 class="md-title">
        <md-button @click="closePanel" class="md-button md-theme-default md-simple md-just-icon"><md-icon>arrow_back</md-icon></md-button>
      </h4>
    </div>
    <div class="md-layout-item md-size-95">
      <h4 class="md-title" style="margin-bottom: 0; line-height: 51px;">
        My Profile
      </h4>

      <div class="md-layout">
        <div class="md-layout-item md-size-30" style="padding-left: 0;">
          <personal-information :user-info="auth.user"></personal-information>
          <holidays-celebrate></holidays-celebrate>
        </div>
        <div class="md-layout-item md-size-35">
          <dietary-constraints></dietary-constraints>
          <my-special-dates :birthDate="auth.user.me.birthday" :workingSince="auth.user.me.companyStartDate" :key="auth.user.me" ></my-special-dates>
        </div>
        <div class="md-layout-item md-size-35">
          <my-events :events="upCommingEvents"  ></my-events>
        </div>
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
  import {LabelEdit} from '@/components';
  import auth from '@/auth';


  export default {
    components: {
      VueElementLoading,
      PersonalInformation,
      MyEvents,
      DietaryConstraints,
      MySpecialDates,
      HolidaysCelebrate,
      LabelEdit
    },
    data() {
      return {
        auth: auth
      }

    },
    methods: {
      closePanel(){
        this.$emit("closePanel");
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
