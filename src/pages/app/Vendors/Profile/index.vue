<template>
  <div class="md-layout p-20 planner-profile">
    <div class="md-layout-item md-size-100 font-size-22 font-bold mb-30 mt-30">
      <img :src="`${$iconURL}Profile/settings-dark.svg`" class="mr-20" />
      PROFILE & SETTINGS
    </div>
    <div class="md-layout-item md-size-25">
      <div class="left-sidebar white-card">
        <div class="profile">
          <div class="avatar" style="">
            <!-- <user-avatar :user="userData" @set="setAvatar"></user-avatar> -->
            <company-logo :user="userData" @set="setLogo"></company-logo>
          </div>
          <h3 class="name font-bold text-center">{{ userData.profile.displayName }}</h3>
          <div class="text-center">
            <span class="font-size-20"><md-icon style="color: #ffc001">start</md-icon>4.6</span>
            <span class="color-gray">(12 Reviews)</span>
          </div>
        </div>
        <md-list>
          <md-list-item @click="goTo('events')" :class="{ 'font-bold-extra': pageName === 'events' }">
            <label>
              <img
                :src="
                  pageName === 'events' ? `${$iconURL}Profile/events-dark.svg` : `${$iconURL}Profile/events-gray.svg`
                "
                class="page-icon"
              />
              <span class="pl-20 font-size-20">My Services</span>
            </label>
          </md-list-item>

          <md-list-item class="mb-30" @click="goTo('details')" :class="{ 'font-bold-extra': pageName === 'details' }">
            <label
              ><img
                :src="
                  pageName === 'details'
                    ? `${$iconURL}Profile/inspirations-dark.svg`
                    : `${$iconURL}Profile/inspirations-gray.svg`
                "
                class="page-icon"
              />
              <span class="pl-20 font-size-20">Company Details</span>
            </label>
          </md-list-item>
          <md-list-item @click="goTo('settings')" :class="{ 'font-bold-extra': pageName === 'settings' }">
            <label>
              <img
                :src="
                  pageName === 'settings'
                    ? `${$iconURL}Profile/settings-dark.svg`
                    : `${$iconURL}Profile/settings-gray.svg`
                "
                class="page-icon"
              />
              <span class="pl-20 font-size-20">Account</span>
            </label>
          </md-list-item>
          <md-divider></md-divider>
          <md-list-item>
            <md-button class="maryoku-btn md-vendor width-100">Create Your Landing Page</md-button>
          </md-list-item>
          <md-list-item @click="logout">
            <label>
              <img :src="`${$iconURL}menu _ checklist/SVG/Asset 118.svg`" class="page-icon" />
              <span class="pl-20 font-size-20"> Log Out </span>
            </label>
          </md-list-item>
        </md-list>
      </div>
    </div>
    <div class="md-layout-item md-size-70">
      <vendor-account-settings v-if="pageName === 'settings'"></vendor-account-settings>
      <company-details v-if="pageName === 'details'"></company-details>
    </div>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import PersonalInformation from "@/pages/app/Profile/PersonalInformation.vue";
import CompanyDashboardInfo from "../../CompanyDashboard/CompanyDashboardInfo.vue";
import DietaryConstraints from "@/pages/app/Profile/DietaryConstraints.vue";
import MySpecialDates from "@/pages/app/Profile/MySpecialDates.vue";
import HolidaysCelebrate from "@/pages/app/Profile/HolidaysCelebrate.vue";
import { LabelEdit, Tabs } from "@/components";
import { EditProfileForm, UserCard } from "@/pages";

import MyEvents from "@/pages/app/Profile/MyEvents.vue";
// import auth from '@/auth';
import { mapGetters, mapActions, mapState } from "vuex";
import Inspirations from "@/pages/app/Profile/Inspirations.vue";
import UserAvatar from "@/pages/app/Profile/components/UserAvatar.vue";
import CompanyLogo from "@/pages/app/Profile/components/CompanyLogo.vue";

import VendorAccountSettings from "./Account";
import CompanyDetails from "./CompanyDetails";
export default {
  components: {
    VueElementLoading,
    PersonalInformation,
    DietaryConstraints,
    MySpecialDates,
    HolidaysCelebrate,
    Tabs,
    EditProfileForm,
    UserCard,
    CompanyDashboardInfo,
    LabelEdit,
    VendorAccountSettings,
    MyEvents,
    Inspirations,
    UserAvatar,
    CompanyLogo,
    CompanyDetails,
  },
  data() {
    return {
      // auth: auth,
      chips: [],
      user: null,
      pageName: "",
    };
  },

  computed: {
    ...mapGetters({
      upComingEvents: "user/getUpcomingEvents",
      // user:'user/getUser'
    }),
    ...mapState("event", ["eventData"]),
    userData() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    // TODO : user state should be reviewed
    console.log("profile", this.$auth.user);
    this.getPageName();
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
    setAvatar(avatar) {
      this.$store.dispatch("auth/updateProfile", { avatar, id: this.userData.id });
    },
    setLogo(companyLogo) {
      this.$store.dispatch("auth/updateProfile", { companyLogo, id: this.userData.id });
    },
    getPageName() {
      this.pageName = this.$route.params.pageName ? this.$route.params.pageName : "timeline";
      console.log("pageName", this.pageName);
    },
    onUserAvatarChange(e) {
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
    goTo(pageName) {
      this.$router.push(`/vendor/profile/${pageName}`);
    },
    logout() {
      this.$router.push("/signout");
    },
  },
  watch: {
    $route: "getPageName",
  },
};
</script>
<style lang="scss" scoped>
.planner-profile {
  align-items: stretch;
}
.left-sidebar {
  /deep/ .md-list-item-button {
    &:hover {
      background-color: transparent !important;
    }
  }
  .profile {
    position: relative;
    padding: 50px;
    .avatar {
      position: relative;
      .company-logo {
        width: 140px;
        height: 140px;
        text-align: center;
        border-radius: 50%;
        border: dashed 1px #6b6164;
        background-color: #ffffff;
        z-index: 1;
        color: #641856;
        margin: auto;
        font-weight: bold;
      }
    }
  }

  .md-list-item {
    margin: 20px 0;
    /deep/ .md-list-item-content {
      padding: 10px 50px;
    }
  }
  .logout {
    padding: 10px 25px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
