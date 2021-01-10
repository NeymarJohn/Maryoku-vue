<template>
  <div class="profile-container">
    <tabs
      :tab-name="['Profile Detail', 'Payment & Invoices', 'Notifications', 'Permissions']"
      color-button="info"
      plain
      class="profile-container white-card"
    >
      <template slot="tab-pane-1">
        <profile-details></profile-details>
      </template>
      <template slot="tab-pane-2"> Payment </template>
      <template slot="tab-pane-3"> Notification </template>
      <template slot="tab-pane-4"> <permissions></permissions> </template>
    </tabs>
  </div>
</template>
<script>
import VueElementLoading from "vue-element-loading";
import PersonalInformation from "./PersonalInformation.vue";
import MyEvents from "./MyEvents.vue";
import PersonalPicture from "./PersonalPicture.vue";
import DietaryConstraints from "./DietaryConstraints.vue";
import MySpecialDates from "./MySpecialDates.vue";
import HolidaysCelebrate from "./HolidaysCelebrate.vue";
import Me from "@/models/Me";
import { LabelEdit, Tabs } from "@/components";
import ProfileDetails from "./ProfileDetails";
import Permissions from "./Permissions";
// import auth from '@/auth';
import { mapGetters } from "vuex";

export default {
  components: {
    VueElementLoading,
    PersonalInformation,
    MyEvents,
    PersonalPicture,
    DietaryConstraints,
    MySpecialDates,
    HolidaysCelebrate,
    LabelEdit,
    Tabs,
    ProfileDetails,
    Permissions,
  },
  data() {
    return {
      // auth: auth,
      userInfo: { role: "guest" },
      isLoading: false,
    };
  },

  computed: {},
  mounted() {
    this.isLoading = true;
    new Me().get().then((me) => {
      this.userInfo = me[0];
      this.isLoading = false;
    });
  },
  methods: {
    closePanel() {
      this.$emit("closePanel");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
