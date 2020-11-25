<template>
  <div class="main-panel">
    <template #header>
    </template>
    <template #sidebar>
      <side-bar :event="eventData"></side-bar>
    </template>
    <template #main>
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          profile
        </div>
      </div>
    </template>
    <template #footer>
      <!--footer-->
    </template>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import SideBar from "@/components/SidebarPlugin/NewSideBar";
import PersonalInformation from "./PersonalInformation.vue";
import CompanyDashboardInfo from "../CompanyDashboard/CompanyDashboardInfo.vue";
import MyEvents from "./MyEvents.vue";
import DietaryConstraints from "./DietaryConstraints.vue";
import MySpecialDates from "./MySpecialDates.vue";
import HolidaysCelebrate from "./HolidaysCelebrate.vue";
import { LabelEdit, Tabs } from "@/components";
import { EditProfileForm, UserCard } from "@/pages";

// import auth from '@/auth';
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  components: {
    VueElementLoading,
    PersonalInformation,
    MyEvents,
    DietaryConstraints,
    MySpecialDates,
    HolidaysCelebrate,
    Tabs,
    EditProfileForm,
    UserCard,
    CompanyDashboardInfo,
    LabelEdit,
    SideBar,
  },
  data() {
    return {
      // auth: auth,
      chips: [],
      user: null,
    };
  },

  computed: {
    ...mapGetters({
      upComingEvents: "user/getUpcomingEvents",
      // user:'user/getUser'
    }),
    ...mapState("event", ["eventData"]),
  },
  mounted() {
    // TODO : user state should be reviewed
    console.log("profile", this.$auth.user);

    this.$store
            .dispatch("auth/checkToken")
            .then(() => {
              this.user = this.$auth.user;
            })
            .catch(() => {
              this.$router.push({ path: `/signin` });
            });

  },
  methods: {
    ...mapActions("event", ["getEventAction"]),
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file, type) {
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        this.loaded = false;
        return new CustomerFile({ customerFile: e.target.result })
          .save()
          .then((result) => {
            let customer = this.$auth.user.customer;
            customer.logoFileId = result.id;
            new Customer({ id: customer.id, logoFileId: result.id }).save();
            this.companyProfile.companyLogo = customer.logoFileId
              ? `${process.env.SERVER_URL}/1/customerFiles/${customer.logoFileId}`
              : "https://static-maryoku.s3.amazonaws.com/storage/img/image_placeholder.jpg";
            this.companyProfile.logoFileId = customer.logoFileId;
            this.loaded = true;
          })
          .catch((error) => {
            console.log(error);
            this.loaded = true;
          });
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (type) {
      this.loaded = false;
      let customer = this.$auth.user.customer;
      new CustomerFile({ id: customer.logoFileId })
        .delete()
        .then((res) => {
          this.loaded = true;
          customer.logoFileId = null;
          this.companyProfile.logoFileId = undefined;
          this.companyProfile.companyLogo = customer.logoFileId
            ? `${process.env.SERVER_URL}/1/customerFiles/${customer.logoFileId}`
            : "https://static-maryoku.s3.amazonaws.com/storage/img/image_placeholder.jpg";
        })
        .catch((error) => {
          this.loaded = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.md-card-tabs {
  .active.md-list-item.md-rose .md-list-item-button {
    background-color: transparent !important;
    box-shadow: none;
    -webkit-box-shadow: none;
    color: black !important;
    border-bottom: 3px solid #ff547c;
    border-radius: 0;
  }
}
</style>
