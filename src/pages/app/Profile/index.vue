<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">

      <tabs
        :tab-name="['My Profile', 'My Company']"
        color-button="info"
        plain>
        <template slot="tab-pane-1">
          <div class="md-layout">
            <div class="md-layout-item md-size-30">
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
        </template>
        <template slot="tab-pane-2">
          <div class="md-layout">
            <div class="md-layout-item md-size-33">
              <company-dashboard-info></company-dashboard-info>
            </div>
            <div class="md-layout-item md-size-33">
              <md-card>
                <md-card-header class="md-card-header-icon md-card-header-rose">
                  <div class="card-icon">
                    <md-icon>group</md-icon>
                  </div>
                  <h5 class="title profile-title">
                    Contact Information
                  </h5>
                </md-card-header>
                <md-card-content style="min-height: 320px;">

                </md-card-content>
              </md-card>
            </div>
            <div class="md-layout-item md-size-33">
              <md-card>
                <md-card-header class="md-card-header-icon md-card-header-warning">
                  <div class="card-icon">
                    <md-icon>language</md-icon>
                  </div>
                  <h5 class="title profile-title">
                    Branches
                  </h5>
                </md-card-header>
                <md-card-content style="min-height: 320px;">

                </md-card-content>
              </md-card>
            </div>
          </div>
        </template>
      </tabs>
    </div>
    <!---->
    <!--<vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" is-full-screen />

    <div class="md-layout ">
      <div class="md-layout-item md-size-25">
        <personal-information :userInfo="auth.user" v-if="auth.user.displayName" :key="auth.user"></personal-information>
      </div>
      <div class="md-layout-item md-size-35">
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

    </div>-->
  </div>
</template>

<script>
  import VueElementLoading from 'vue-element-loading';
  import PersonalInformation from "./PersonalInformation.vue";
  import CompanyDashboardInfo from "../CompanyDashboard/CompanyDashboardInfo.vue";
  import MyEvents from "./MyEvents.vue";
  import DietaryConstraints from "./DietaryConstraints.vue";
  import MySpecialDates from "./MySpecialDates.vue";
  import HolidaysCelebrate from './HolidaysCelebrate.vue';

  import { EditProfileForm, UserCard } from "@/pages";

  import auth from '@/auth';
  import {
    mapGetters
  } from 'vuex';

  import { Tabs } from "@/components";

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
      CompanyDashboardInfo
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
    },
    methods: {
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0]);
      },
      createImage(file, type) {
        let reader = new FileReader();
        let vm = this;

        reader.onload = e => {
          this.loaded = false;
          return new CustomerFile({customerFile: e.target.result}).save().then(result => {
            let customer = this.auth.user.customer;
            customer.logoFileId = result.id;
            new Customer({id: customer.id, logoFileId: result.id}).save();
            this.companyProfile.companyLogo = customer.logoFileId ? `${process.env.SERVER_URL}/1/customerFiles/${customer.logoFileId}` : 'static/img/image_placeholder.jpg';
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
      removeImage: function(type) {
        this.loaded = false;
        let customer = this.auth.user.customer;
        new CustomerFile({id: customer.logoFileId}).delete().then(res => {
          this.loaded = true;
          customer.logoFileId = null;
          this.companyProfile.logoFileId = undefined;
          this.companyProfile.companyLogo = customer.logoFileId ? `${process.env.SERVER_URL}/1/customerFiles/${customer.logoFileId}` : 'static/img/image_placeholder.jpg';
        }).catch((error) => {
          this.loaded = true;
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
  .md-card-tabs  {

    .active.md-list-item.md-rose .md-list-item-button{
      background-color: transparent !important;
      box-shadow: none;
      -webkit-box-shadow: none;
      color: black !important;
      border-bottom: 3px solid #FF547C;
      border-radius: 0;
    }
  }
</style>
