<template>
  <div class="vendor-signup-wrapper">
    <vendor-basic-info-form v-if="!isApproved" :vendor="vendor" />
    <vendor-signup-step1
      :categories="businessCategories"
      :generalInfos="generalInfos"
      :companyServices="companyServices"
      :icon="`${iconUrl}`"
      :vendor="vendor"
      v-if="isApproved && step == 1"
    />
    <vendor-signup-step2
      :categories="businessCategories"
      :icon="`${iconUrl}`"
      :vendor="vendor"
      v-if="isApproved && step == 2"
    />
    <vendor-signup-step3
      :categories="businessCategories"
      :icon="`${iconUrl}`"
      :vendor="vendor"
      v-if="isApproved && step == 3"
    />
    <vendor-signup-step4
      :categories="businessCategories"
      :icon="`${iconUrl}`"
      :vendor="vendor"
      v-if="isApproved && step == 4"
    />
    <vendor-signup-final-form
      :categories="businessCategories"
      :icon="`${iconUrl}`"
      :vendor="vendor"
      v-if="isApproved && step == 5"
    />
    <div v-if="step == 6">Thank you for your signup!</div>
  </div>
</template>

<script>
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import Vendors from "@/models/Vendors";

//COMPONENTS
import Icon from "@/components/Icon/Icon.vue";
import VSignupEditableField from "@/components/Inputs/VSignupEditableField.vue";
import VendorBasicInfoForm from "./components/VendorBasicInfoForm.vue";
import VendorSignupStep1 from "./components/VendorSignupStep1.vue";
import VendorSignupStep2 from "./components/VendorSignupStep2.vue";
import VendorSignupStep3 from "./components/VendorSignupStep3.vue";
import VendorSignupStep4 from "./components/VendorSignupStep4.vue";
import VendorSignupFinalForm from "./components/VendorSignupFinalForm.vue";
import swal from "sweetalert2";

import { businessCategories, generalInfos, companyServices } from "@/constants/vendor";

const emptyVendor = {
  vendorCategory: null,
  vendorPropertyValues: {},
  email: null,
  companyName: null,
  phone: null,
  address: null,
  coverPhoto: null,
  images: [],
  signature: null,
  capacity: {
    low: null,
    high: null,
  },
  about: {
    company: null,
    category: null,
  },
  social: {
    website: null,
    facebook: null,
    instagram: null,
    youtube: null,
    linkedin: null,
    google: null,
    pinterest: null,
    foursuare: null,
    reddit: null,
    tiktok: null,
  },
  services: {},
  yesRules: [],
  noRules: [],
  notAllowed: [],
  exDonts: [],
  yesPolicies: [],
  noPolicies: [],
  selectedWeekdays: [],
  dontWorkDays: null,
  dontWorkTime: null,
};
const testVendor = {
  vendorCategory: "venuerental",
  vendorPropertyValues: {},
  email: "jefflei@gmail.com",
  companyName: "test-company",
  phone: "123123",
  address: "testsetaset",
  coverPhoto: null,
  images: [],
  signature: null,
  capacity: {
    low: null,
    high: null,
  },
  about: {
    company: null,
    category: null,
  },
  social: {
    website: null,
    facebook: null,
    instagram: null,
    youtube: null,
    linkedin: null,
    google: null,
    pinterest: null,
    foursuare: null,
    reddit: null,
    tiktok: null,
  },
  services: {},
  yesRules: [],
  noRules: [],
  notAllowed: [],
  exDonts: [],
  yesPolicies: [],
  noPolicies: [],
  selectedWeekdays: [],
  dontWorkDays: null,
  dontWorkTime: null,
};
export default {
  components: {
    VueElementLoading,
    VSignupEditableField,
    VendorBasicInfoForm,
    VendorSignupStep1,
    VendorSignupStep2,
    VendorSignupStep3,
    VendorSignupStep4,
    VendorSignupFinalForm,
  },
  data() {
    return {
      // selected_vendor: {
      //   type: Object,
      //   default: {}
      // },
      vendor: { ...emptyVendor },
      isApproved: false,
      step: 1,
      businessCategories: businessCategories,
      generalInfos: generalInfos,
      companyServices: companyServices,
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
    };
  },
  created() {},
  mounted() {
    this.$root.$on("approve-vendor-basic-info", () => {
      this.isApproved = true;
      this.step = 1;
    });
    this.$root.$on("next-vendor-signup-step", () => {
      if (this.step < 5) {
        this.step += 1;
      }
    });
    this.$root.$on("prev-vendor-signup-step", () => {
      if (this.step > 0) {
        this.step -= 1;
      }
      if (this.step == 0) {
        this.isApproved = false;
      }
    });
    this.$root.$on("go-to-signup-step", (step) => {
      this.step = step;
      if (this.step < 1) {
        this.isApproved = false;
      }
    });
    this.$root.$on("update-vendor-value", (field, value) => {
      if (field == "images") {
        this.vendor.images.push(value);
      } else if (field == "removeImage") {
        this.vendor.images = this.vendor.images.filter((i) => i != value);
      } else if (field == "vendorCategory") {
        this.$set(this.vendor, this.camelize(field), value);
        this.$set(this.vendor, "yesRules", []);
        this.$set(this.vendor, "noRules", []);
        this.$set(this.vendor, "notAllowed", []);
        this.$set(this.vendor, "exDonts", []);
        this.$set(this.vendor, "yesPolicies", []);
        this.$set(this.vendor, "noPolicies", []);
        this.$set(this.vendor, "selectedWeekdays", []);
        this.$set(this.vendor, "dontWorkDays", null);
        this.$set(this.vendor, "dontWorkTime", null);
        this.$set(this.vendor, "services", {});
      } else if (field.indexOf(".") > -1) {
        this.$set(this.vendor[field.split(".")[0]], field.split(".")[1], value);
      } else {
        this.$set(this.vendor, this.camelize(field), value);
      }
    });
    console.log(this.vendor);
    this.$root.$on("vendor-signup", () => {
      this.addVendor();
      // this.$store.dispatch('vendor/setData', this.vendor);
    });
  },
  methods: {
    camelize(str) {
      let temp = str.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
      });
      return temp.charAt(0).toLowerCase() + temp.slice(1);
    },
    async addVendor() {
      console.log("vendor", this.vendor);
      new Vendors(this.vendor)
        .save()
        .then((res) => {
          console.log("*** Save vendor - done: ");
          console.log(JSON.stringify(res));
          swal({
            title: `Thank you for your signup!`,
            buttonsStyling: false,
            confirmButtonClass: "md-button md-success",
          }).then(() => {});
        })
        .catch((error) => {
          console.log("*** Save vendor - failed: ");
          console.log(JSON.stringify(error));
        });
    },
    setVender: function () {
      this.$store.dispatch("vendor/setData");
    },
  },
  computed: {},
  filters: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
.vendor-signup-wrapper {
  padding: 84px 124px;
  font-family: Manrope-Regular, sans-serif;
  background: #f3f7fd;
}
</style>
