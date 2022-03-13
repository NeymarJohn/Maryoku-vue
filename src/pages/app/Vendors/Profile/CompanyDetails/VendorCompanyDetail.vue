<template>
  <div v-if="companyData" class="vendor-profile-detail">
    <profile-info-field
      class="profile-detail-info"
      field-name="aboutCompany"
      field-label="About your company"
      theme="md-vendor"
      editor="textarea"
      :default-value="companyData.about ? companyData.about.company : ''"
      :icon="`${$iconURL}common/info-gray.svg`"
      @save="saveProfileField"
    />
    <profile-info-field
      class="profile-detail-info"
      field-name="personalMessage"
      field-label="Personal messsage to your clients"
      theme="md-vendor"
      editor="textarea"
      description="(Will be added automatically to future proposals)"
      :default-value="companyData.personalMessage"
      :icon="`${$iconURL}common/message-gray.svg`"
      @save="saveProfileField"
    />
    <profile-info-field
      class="profile-detail-info"
      :default-value="companyData.companyName"
      field-name="companyName"
      field-label="Company Name"
      theme="md-vendor"
      @save="saveProfileField"
    />
    <profile-info-field
      class="profile-detail-info"
      :default-value="companyData.vendorMainEmail"
      :icon="`${$iconURL}common/email-gray.svg`"
      field-name="vendorMainEmail"
      field-label="Business Email Address"
      theme="md-vendor"
      @save="saveProfileField"
    />
    <profile-info-field
      class="profile-detail-info"
      :default-value="companyData.vendorMainPhoneNumber"
      :icon="`${$iconURL}common/phone-gray.svg`"
      field-name="vendorMainPhoneNumber"
      field-label="Business Phone Number"
      theme="md-vendor"
      @save="saveProfileField"
    />
    <profile-info-field
      class="profile-detail-info"
      :default-value="companyData.vendorAddressLine1"
      :icon="`${$iconURL}common/location-gray.svg`"
      field-name="vendorAddressLine1"
      field-label="Business Location"
      theme="md-vendor"
      editor="location"
      @save="saveProfileField"
    />
    <profile-info-field
      class="profile-detail-info"
      :default-value="companyData.vendorAddressLine1"
      :icon="`${$iconURL}common/sender-gray.svg`"
      field-name="vendorAddressLine1"
      field-label="Shipping Address"
      theme="md-vendor"
      editor="location"
      @save="saveProfileField"
    />
    <profile-info-field
      class="profile-detail-info"
      :default-value="companyData.social"
      field-name="social"
      field-label="Website & Social Media"
      theme="md-vendor"
      editor="social"
      @save="saveProfileField"
    />
    <profile-info-field
      class="profile-detail-info"
      :default-value="companyData.signature"
      field-name="signature"
      field-label="Business Signature"
      theme="md-vendor"
      editor="signature"
      @save="saveProfileField"
    />
  </div>
  <div v-else />
</template>
<script>
import ProfileInfoField from "@/components/ProfileInfoField.vue";
import Vendors from "@/models/Vendors";
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
    companyData() {
      return this.$store.state.vendor.profile;
    },
  },
  created() {},
  methods: {
    saveProfileField(profileData) {
      let updateData;
      if (profileData.name == "aboutCompany") {
        updateData = { about: { company: profileData.value }, id: this.companyData.id };
      } else {
        updateData = { [profileData.name]: profileData.value, id: this.companyData.id };
      }
      this.$store.dispatch("vendor/updateProfile", updateData);
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
    /deep/ img.label-icon {
      width: 28px !important;
    }
  }
}
</style>
