<template>
  <div class="vendor-basic-info-form-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${iconUrl}Group 5213 (2).svg`" />
        <h4>Hi,</h4>
        <p>
          We are glad to have you onboard! Submitting quotes & proposals has never been easier. Let's begin with
          approving your basic info
        </p>
        <h2>0/5</h2>
        <h3>Only 5 simple steps & you're signed!</h3>
      </div>
      <div class="right-side">
        <h2>
          Before we begin,
          <br />approve your basic info
        </h2>
        <div class="card">
          <v-signup-editable-field
            :title="'Company Name'"
            :field="'companyName'"
            :img="`${secondUrl}Path 1584.svg`"
            :defaultVal="vendor.companyName"
            :borderBottom="true"
            :required="true"
            @update-focus-value="onUpdateFocus"
          />
          <v-signup-category-selector
            :title="'Business Category'"
            :field="'vendorCategories'"
            :img="''"
            :value="vendor.vendorCategories || ['']"
            :borderBottom="true"
            :required="true"
            @update-focus-value="onUpdateFocus"
          />
          <v-signup-category-selector
              :title="'Address'"
              :field="'vendorAddresses'"
              :img="`${iconUrl}Asset 550.svg`"
              :value="vendor.vendorAddresses || ['']"
              :borderBottom="true"
              :required="true"
              @update-focus-value="onUpdateFocus"
          />
          <v-signup-editable-field
            :title="'Phone'"
            :field="'vendorMainPhoneNumber'"
            :img="`${iconUrl}Asset 548.svg`"
            :defaultVal="vendor.vendorMainPhoneNumber"
            :borderBottom="true"
            @update-focus-value="onUpdateFocus"
          />
          <v-signup-editable-field
            :title="'Email'"
            :img="`${iconUrl}Asset 547.svg`"
            :field="'vendorMainEmail'"
            :defaultVal="vendor.vendorMainEmail"
            :borderBottom="true"
            :required="true"
            @update-focus-value="onUpdateFocus"
          />
          <v-signup-editable-field
            :title="'Contact Person\'s Name'"
            :img="`${$iconURL}Signup/user-gray.svg`"
            :field="'contactPerson'"
            :defaultVal="vendor.contactPerson"
            :borderBottom="false"
            @update-focus-value="onUpdateFocus"
          />
          <!-- <div class="action-cont">
            <a class="cancel">Cancel</a>
            <a class="save" @click="save()">Save</a>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import Vendors from "@/models/Vendors";

//COMPONENTS
import Icon from "@/components/Icon/Icon.vue";
import VSignupEditableField from "@/components/Inputs/VSignupEditableField.vue";
import VSignupCategorySelector from "@/components/Inputs/VSignupCategorySelector.vue";

export default {
  name: "vendor-basic-info-form",
  components: {
    VueElementLoading,
    VSignupEditableField,
    VSignupCategorySelector,
  },
  props: {
    vendor: Object,
  },
  data() {
    return {
      iconUrl: `${this.$iconURL}Vendor Signup/`,
      secondUrl: `${this.$iconURL}VendorSignup/`,
    };
  },
  created() {},
  mounted() {
      console.log("basic.info.vendor", this.vendor);
  },
  methods: {
    save() {},
    onUpdateFocus(newValue) {},
  },
  computed: {},
  filters: {},
  watch: {
      vendor(newVal){
          console.log("vendor.basicInfo.watch.vendor", newVal);
      }
  },
};
</script>
<style lang="scss" scoped>
.vendor-basic-info-form-wrapper {
  font-family: Manrope-Regular, sans-serif;
  .vendor-address-editor {
    input {
      font-size: 16px;
      font-family: "Manrope-Regular";
    }
  }
  .inside-container {
    display: flex;
    color: #050505;

    .left-side {
      flex: 1;
      margin-right: 122px;

      img {
        width: 92.5px;
      }
      h4 {
        margin: 36px 0 11px 0;
        font: 800 20px Manrope-Regular, sans-serif;
      }
      p {
        margin: 0;
        padding: 0;
        font: normal 16px Manrope-Regular, sans-serif;
      }
      h2 {
        margin: 30px 0;
        font: 800 40px Manrope-Regular, sans-serif;
      }
      h3 {
        margin: 0;
        color: #f51355;
        font: bold 20px Manrope-Regular, sans-serif;
      }
    }
    .right-side {
      flex: 3;

      h2 {
        margin: 0;
        margin-bottom: 40px;
        font: 800 40px Manrope-Regular, sans-serif;
      }
      .card {
        padding: 30px 60px 60px 60px;
        max-width: 780px;
        background-color: #ffffff;
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

        .action-cont {
          margin-top: 30px;
          text-align: right;

          a {
            cursor: pointer;
            padding: 8px 24px;
            &.cancel {
              color: #050505;
              font: 800 16px Manrope-Regular, sans-serif;
            }
            &.save {
              color: #ffffff;
              font: 800 16px Manrope-Regular, sans-serif;
              background-color: #f51355;
              &:hover {
                color: #ffffff !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
