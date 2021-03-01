<template>
  <div class="vendor-signup-wrapper">
    <vendor-basic-info-form v-if="step == 0" :vendor="vendor" />
    <vendor-signup-step1
      :categories="businessCategories"
      :generalInfos="generalInfos"
      :companyServices="companyServices"
      :icon="`${iconUrl}`"
      :vendor="vendor"
      v-if="step == 1"
    />
    <vendor-signup-step2 :categories="businessCategories" :icon="`${iconUrl}`" :vendor="vendor" v-if="step == 2" />
    <vendor-signup-step3 :categories="businessCategories" :icon="`${iconUrl}`" :vendor="vendor" v-if="step == 3" />
    <vendor-signup-step4 :categories="businessCategories" :icon="`${iconUrl}`" :vendor="vendor" v-if="step == 4" />

    <vendor-signup-step5 :categories="businessCategories" :icon="`${iconUrl}`" :vendor="vendor" v-if="step == 5" />
    <vendor-signup-final-form :categories="businessCategories" :icon="`${iconUrl}`" :vendor="vendor" v-if="step == 6" />
    <div v-if="isCompletedWizard" class="final-section">Thank you for your signup!</div>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import Vendors from "@/models/Vendors";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

//COMPONENTS
import Icon from "@/components/Icon/Icon.vue";
import VSignupEditableField from "@/components/Inputs/VSignupEditableField.vue";
import VendorBasicInfoForm from "./components/VendorBasicInfoForm.vue";
import VendorSignupStep1 from "./components/VendorSignupStep1.vue";
import VendorSignupStep2 from "./components/VendorSignupStep2.vue";
import VendorSignupStep3 from "./components/VendorSignupStep3.vue";
import VendorSignupStep4 from "./components/VendorSignupStep4.vue";
import VendorSignupStep5 from "./components/VendorSignupStep5.vue";
import VendorSignupFinalForm from "./components/VendorSignupFinalForm.vue";
import Swal from "sweetalert2";

import { businessCategories, generalInfos, companyServices } from "@/constants/vendor";

export default {
  components: {
    VueElementLoading,
    VSignupEditableField,
    VendorBasicInfoForm,
    VendorSignupStep1,
    VendorSignupStep2,
    VendorSignupStep3,
    VendorSignupStep4,
    VendorSignupStep5,
    VendorSignupFinalForm,
  },
  data() {
    return {
      // selected_vendor: {
      //   type: Object,
      //   default: {}
      // },
      isApproved: false,
      isCompletedWizard: false,
      businessCategories: businessCategories,
      generalInfos: generalInfos,
      companyServices: companyServices,
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
    };
  },
  mounted() {
    //if this is edit page
    if (this.$route.params.id) {
      Vendors.find(this.$route.params.id).then((vendor) => {
        if (!vendor.about) this.$set(vendor, "about", {});
        if (!vendor.capacity) this.$set(vendor, "capacity", {});
        if (!vendor.social) this.$set(vendor, "social", {});
        if (!vendor.images) this.$set(vendor, "images", []);
        if (!vendor.vendorImages) this.$set(vendor, "vendorImages", []);
        if (!vendor.hasOwnProperty("yesRules")) this.$set(vendor, "yesRules", []);
        if (!vendor.hasOwnProperty("noRules")) this.$set(vendor, "noRules", []);
        if (!vendor.hasOwnProperty("notAllowed")) this.$set(vendor, "notAllowed", []);
        if (!vendor.hasOwnProperty("exDonts")) this.$set(vendor, "exDonts", []);
        if (!vendor.hasOwnProperty("pricingPolicies")) this.$set(vendor, "pricingPolicies", []);
        if (!vendor.hasOwnProperty("policies")) this.$set(vendor, "policies", []);
        if (!vendor.hasOwnProperty("yesPolicies")) this.$set(vendor, "yesPolicies", []);
        if (!vendor.hasOwnProperty("noPolicies")) this.$set(vendor, "noPolicies", []);
        if (!vendor.hasOwnProperty("selectedWeekdays")) this.$set(vendor, "selectedWeekdays", []);
        if (!vendor.hasOwnProperty("dontWorkDays")) this.$set(vendor, "dontWorkDays", []);
        if (!vendor.hasOwnProperty("dontWorkTime")) this.$set(vendor, "dontWorkTime", null);
        if (!vendor.hasOwnProperty("services")) this.$set(vendor, "services", {});
        this.setVendor(vendor);
        this.setEditing(true);
      });
    }
    this.$root.$on("approve-vendor-basic-info", (vendor) => {
      if (vendor) this.vendor = { ...this.vendor, ...vendor };
      console.log("vendor", this.vendor);
      console.log("*** Save vendor - done: ");
      this.isApproved = true;

      this.step = 1;
    });

    this.$root.$on("go-to-signup-step", (step) => {
      if (step < 1) {
        this.isApproved = false;
      }
      this.setStep(step);
    });
    this.$root.$on("update-vendor-value", (field, value) => {
      console.log("update-vendor-value", field, value);
      let vendor = JSON.parse(JSON.stringify(this.vendor));
      if (field == "images" || field == "vendorImages") {
        if (!vendor[field][value.index]) {
          console.log("!update.vendor.image", value);
          vendor[field].push(value.data);
        } else {
          console.log("update.vendor.image", value);
          vendor[field][value.index] = value.data;
        }
      } else if (field == "removeImage") {
        console.log("removeImage", vendor.images, vendor.vendorImages);
        // vendor.images = vendor.images.filter((i) => i != value);
        // vendor.vendorImages = vendor.vendorImages.filter((i) => i != value);
        let images = vendor.images.filter((i) => i != value);
        let vendorImages = vendor.vendorImages.filter((i) => i != value);

        this.$set(vendor, "images", images);
        this.$set(vendor, "vendorImages", vendorImages);
      } else if (field == "vendorCategories") {
        this.$set(vendor, this.camelize(field), value);
        this.$set(vendor, "vendorCategory", value[0]);
        this.$set(vendor, "yesRules", []);
        this.$set(vendor, "noRules", []);
        this.$set(vendor, "notAllowed", []);
        this.$set(vendor, "exDonts", []);
        this.$set(vendor, "pricingPolicies", []);
        this.$set(vendor, "policies", []);
        this.$set(vendor, "yesPolicies", []);
        this.$set(vendor, "noPolicies", []);
        this.$set(vendor, "selectedWeekdays", []);
        this.$set(vendor, "dontWorkDays", []);
        this.$set(vendor, "dontWorkTime", null);
        this.$set(vendor, "services", {});
      } else if (field.indexOf(".") > -1) {
        this.$set(vendor[field.split(".")[0]], field.split(".")[1], value);
      } else {
        this.$set(vendor, this.camelize(field), value);
      }
      this.setVendor(vendor);
    });
  },
  methods: {
    ...mapMutations("vendor", ["setVendor", "setStep", "setEditing"]),
    camelize(str) {
      let temp = str.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
      });
      return temp.charAt(0).toLowerCase() + temp.slice(1);
    },
  },
  computed: {
    ...mapGetters({
      vendor: "vendor/getVendor",
      step: "vendor/getStep",
    }),
  },
  filters: {},
  watch: {
    vendor(newVal) {
      // console.log("vendor.signup.watch.vendor", newVal);
    },
    step(newVal) {
      console.log("vendor.signup.watch.step", newVal);
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-signup-wrapper {
  padding: 84px 124px;
  font-family: Manrope-Regular, sans-serif;
  background: #f3f7fd;
  .final-section {
    min-height: 400px;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
  }
}
</style>
