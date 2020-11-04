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
            :img="''"
            :defaultVal="vendor.companyName"
            :borderBottom="true"
            :required="true"
            @update-focus-value="onUpdateFocus"
          />
          <!-- <v-signup-editable-field
            :title="'Business Category 1'"
            :field="'vendorCategory'"
            :img="''"
            :defaultVal="vendor.vendorCategory"
            :borderBottom="true"
            :required="true"
            @update-focus-value="onUpdateFocus"
          /> -->
          <v-signup-editable-field
            :title="'Business Category'"
            :field="'vendorCategories'"
            :img="''"
            :defaultVal="vendor.vendorCategories || ['']"
            :borderBottom="true"
            :required="true"
            @update-focus-value="onUpdateFocus"
          />
          <v-signup-editable-field
            :title="'Address'"
            :field="'vendorAddresses'"
            :img="`${iconUrl}Asset 550.svg`"
            :defaultVal="vendor.vendorAddresses || ['']"
            :borderBottom="true"
            :required="true"
            @update-focus-value="onUpdateFocus"
          />
          <!-- <v-signup-editable-field
            :title="'Address 1'"
            :field="'vendorAddressLine1'"
            :img="`${iconUrl}Asset 550.svg`"
            :defaultVal="vendor.vendorAddressLine1"
            :borderBottom="true"
            :required="true"
            @update-focus-value="onUpdateFocus"
          />
          <v-signup-editable-field
            :title="'Address 2'"
            :field="'vendorAddressLine2'"
            :img="`${iconUrl}Asset 550.svg`"
            :defaultVal="vendor.vendorAddressLine1"
            :borderBottom="true"
            @update-focus-value="onUpdateFocus"
          /> -->
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

export default {
  name: "vendor-basic-info-form",
  components: {
    VueElementLoading,
    VSignupEditableField,
  },
  props: {
    vendor: Object,
  },
  data() {
    return {
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
    };
  },
  created() {},
  mounted() {},
  methods: {
    save() {},
    onUpdateFocus(newValue) {},
  },
  computed: {},
  filters: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
.vendor-basic-info-form-wrapper {
  font-family: Manrope-Regular, sans-serif;

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
