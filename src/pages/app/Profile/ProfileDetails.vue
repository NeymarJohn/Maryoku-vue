<template>
  <div class="profile-detail">
    <profile-info-field
      class="profile-detail-info"
      :defaultValue="userData.name"
      fieldName="name"
      :icon="`${$iconURL}common/user-dark.svg`"
      fieldLabel="Full Name"
      @save="saveProfileField"
    ></profile-info-field>
    <profile-info-field
      class="profile-detail-info"
      :defaultValue="userData.email || userData.username"
      fieldName="email"
      :icon="`${$iconURL}common/email-dark.svg`"
      fieldLabel="Email Address"
      @save="saveProfileField"
    ></profile-info-field>
    <profile-info-field
      class="profile-detail-info"
      :defaultValue="userData.password"
      fieldName="password"
      :icon="`${$iconURL}common/password-dark.svg`"
      fieldLabel="Password"
      @save="saveProfileField"
    ></profile-info-field>
    <profile-info-field
      class="profile-detail-info"
      :defaultValue="userData.phoneNumber"
      fieldName="phoneNumber"
      :icon="`${$iconURL}common/phone-dark.svg`"
      fieldLabel="Phone Number"
      @save="saveProfileField"
    ></profile-info-field>
    <profile-info-field
      class="profile-detail-info"
      :defaultValue="userData.company"
      fieldName="company"
      :icon="`${$iconURL}common/company-dark.svg`"
      fieldLabel="Company Name"
      @save="saveProfileField"
    ></profile-info-field>
    <div class="profile-detail-info mt-30">
      <div class="d-flex justify-content-between">About your company</div>
      <div>Lorem ipsum dolor sit amet, consetetur sadipscing</div>
      <textarea class="mb-30" placeholder="Write description here" v-model="companyDescription"></textarea>
    </div>
    <div class="mt-30 mb-30">
      <md-button class="md-simple edit-btn">Delete My Profile</md-button>
      <div>You will receive an email to confirm your decision.</div>
      <div>
        Please note, that all events you have created will be permanently erased. You may want to save backups of these
        events or export them.
      </div>
    </div>
  </div>
</template>
<script>
import ProfileInfoField from "./components/ProfileInfoField.vue";
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
  methods: {
    saveProfileField(profileData) {
      this.$store.dispatch("auth/updateProfile", { [profileData.name]: profileData.value, id: this.userData.id });
    },
  },
  created() {
    this.fullName = this.userData.name;
    this.email = this.userData.email || this.userData.username;
    this.phoneNumber = this.userData.phoneNumber;
    this.companyName = this.userData.company;
  },
  computed: {
    userData() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-detail {
  text-align: left;
  max-width: 800px;
  font-size: 16px;
  .profile-detail-info {
    border-bottom: solid 1px #e0e0e0;
  }
}
</style>