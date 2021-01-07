<template>
  <div class="profile-container">
    <tabs
      :tab-name="['Profile Detail', 'Payment & Invoices', 'Notifications', 'Permissions']"
      color-button="info"
      plain
    >
      <template slot="tab-pane-1">
        <md-list>
          <md-list-item>
            <div>
              <h3>Full Name</h3>
              <md-label>Rachel Mandelovich</md-label>
            </div>
          </md-list-item>
        </md-list>
      </template>
      <template slot="tab-pane-2"> Payment </template>
      <template slot="tab-pane-3"> Notification </template>
      <template slot="tab-pane-4"> Permissions </template>
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
