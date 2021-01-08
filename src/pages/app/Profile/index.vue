<template>
  <div class="md-layout p-20">
    <div class="md-layout-item md-size-30">
      <md-card class="left-sidebar">
        <md-card-header>
          <div class="profile">
            <div class="avatar" style=""></div>
            <div class="company-logo d-flex justify-content-center align-center">
              Company Logo
            </div>
            <h3 class="name">
              RACHEL MENDELOVICH
            </h3>
          </div>
        </md-card-header>
        <md-card-content>
          <md-list>
            <md-list-item>
              Profile Settings
            </md-list-item>
            <md-list-item>
              My Events
            </md-list-item>
            <md-list-item>
              My Points
            </md-list-item>
            <md-list-item>
              Saved inspirations
            </md-list-item>
          </md-list>
        </md-card-content>
        <md-card-actions class="md-alignment-left">
          <div class="logout">
            Log Out
          </div>
        </md-card-actions>
      </md-card>
    </div>
    <div class="md-layout-item md-size-70">
      <div class="profile-container">

        <tabs :tab-name="['Profile Detail', 'Payment & Invoices', 'Notifications', 'Permissions']" color-button="info" plain>
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
          <template slot="tab-pane-2">
            Payment
          </template>
          <template slot="tab-pane-3">
            Notification
          </template>
          <template slot="tab-pane-4">
            Permissions
          </template>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
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
.left-sidebar{
  .profile{
    padding: 30px 15px 0;
    position: relative;

    .avatar{
      background-color: rgba(245, 19, 85, 0.08);
      width: 245px;
      height: 245px;
      border-radius: 3px;
      border: dashed 1.5px #f51355;
    }

    .company-logo{
      position: absolute;
      top: 80px;
      left: 200px;
      width: 138px;
      height: 135px;
      border-radius: 50%;
      border: dashed 1px #f51355;
      background-color: #FFFFFF;
      z-index: 1;
    }
  }

  .logout{
    padding: 10px 25px;
    font-size: 16px;
    font-weight: 400;
  }
}

</style>
