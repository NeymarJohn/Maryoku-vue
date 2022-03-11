<template>
  <div class="vendor-profile-detail">
    <profile-info-field
      class="profile-detail-info"
      :default-value="userData.name"
      :icon="`${$iconURL}common/user-dark.svg`"
      field-name="name"
      field-label="Full Name"
      theme="md-vendor"
      @save="saveProfileField"
    />
    <profile-info-field
      class="profile-detail-info"
      :default-value="userData.email || userData.username"
      :icon="`${$iconURL}common/email-dark.svg`"
      field-name="email"
      field-label="Email Address"
      theme="md-vendor"
      @save="saveProfileField"
    />
    <profile-info-field
      class="profile-detail-info"
      :default-value="userData.password"
      :icon="`${$iconURL}common/password-dark.svg`"
      field-name="password"
      field-label="Password"
      theme="md-vendor"
      @save="saveProfileField"
    />
    <div class="mt-30 pb-50">
      <md-button class="md-simple edit-btn md-vendor" @click="deleteProfile">
        Delete My Profile
      </md-button>
      <div>You will receive an email to confirm your decision.</div>
      <div>
        Please note, that all events you have created will be permanently erased. You may want to save backups of these
        events or export them.
      </div>
    </div>
  </div>
</template>
<script>
import ProfileInfoField from "@/components/ProfileInfoField.vue";
import Swal from "sweetalert2";
export default {
  components: {
    ProfileInfoField,
  },
  data() {
    return {
      editingFieldName: "",
      fullName: "",
      email: "",
      password: "",
      conformPassword: "",
      phoneNumber: "",
      companyName: "",
      companyDescription: "",
    };
  },
  computed: {
    userData() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.fullName = this.userData.name;
    this.email = this.userData.email || this.userData.username;
    this.phoneNumber = this.userData.phoneNumber;
    this.companyName = this.userData.company;
  },
  methods: {
    saveProfileField(profileData) {
      this.$store.dispatch("auth/updateProfile", { [profileData.name]: profileData.value, id: this.userData.id });
    },
    deleteProfile() {
      Swal.fire({
        title: "<div style='text-align:center'>Are you sure?</div>",
        text: "You won't be able to login with current credetials!",
        showCancelButton: true,
        icon: "warning",
        confirmButtonClass: "md-button md-success confirm-btn-bg ",
        cancelButtonClass: "md-button md-danger cancel-btn-bg",
        confirmButtonText: "Yes, I'll delete my profile!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$http
            .post(`${process.env.SERVER_URL}/1/delete-profile`, {}, { headers: this.$auth.getAuthHeader() })
            .then((res) => {
              this.$router.push("/signout");
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-profile-detail {
  text-align: left;
  max-width: 800px;
  font-size: 16px;
  .profile-detail-info {
    border-bottom: solid 1px #e0e0e0;
  }
}
</style>
