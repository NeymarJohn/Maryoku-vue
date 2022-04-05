<template>
  <div>
    <div class="item-wrap">
      <div class="payment-details">
        <form class="form-section">
          <div class="md-layout">
            <div class="md-layout-item md-size-60">
              <div class="input-wrapper"
                   :class="{
                     error: v$.bankDetails.holderName.$errors.length,
                     valid: !v$.bankDetails.holderName.$errors.length }">
                <label>Beneficiary Name</label>
                <input id="name" v-model="bankDetails.holderName" type="text"
                       @blur="v$.bankDetails.holderName.$touch"/>
                <div class="valid-msg"></div>
                <span class="invalid-msg">The Beneficiary Name Is Invalid</span>
              </div>
            </div>
            <div class="md-layout-item md-size-60">
              <div class="input-wrapper"
                   :class="{
                     error: v$.bankDetails.accountNumber.$errors.length,
                     valid: !v$.bankDetails.accountNumber.$errors.length }">
                <label>Account No.</label>
                <input id="email" v-model="bankDetails.accountNumber" type="number"
                       @blur="v$.bankDetails.accountNumber.$touch"/>
                <div class="valid-msg"></div>
                <span class="invalid-msg">The Account Number Is Invalid</span>
              </div>
            </div>
            <div class="md-layout-item md-size-60">
              <div class="input-wrapper" :class="{
                error: v$.bankDetails.routingNumber.$errors.length,
                valid: !v$.bankDetails.routingNumber.$errors.length}"
              >
                <label>Bank No.</label>
                <input v-model="bankDetails.routingNumber"
                       @blur="v$.bankDetails.routingNumber.$touch" type="text">
                <div class="valid-msg"></div>
                <span class="invalid-msg">The Bank Number Is Invalid</span>
              </div>
            </div>
            <div class="md-layout-item md-size-40 pl-0">
              <div class="input-wrapper" :class="{
                error: v$.bankDetails.branch.$errors.length,
                valid: !v$.bankDetails.branch.$errors.length }"
              >
                <label>Branch No.</label>
                <input v-model="bankDetails.branch"
                       @blur="v$.bankDetails.branch.$touch" type="text">
                <div class="valid-msg"></div>
                <span class="invalid-msg">The Branch Number Is Invalid</span>
              </div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="input-wrapper" :class="{
                error: v$.bankDetails.address.$errors.length,
                valid: !v$.bankDetails.address.$errors.length && v$.bankDetails.address.$dirty}"
              >
                <label>Address and name of the bank</label>
                <vue-google-autocomplete id="modal-billing-address"
                                         :placeholder="bankDetails.formattedAddress || 'Start typing'"
                                         @placechanged="getAddressData"
                />
                <div class="location-icon">
                  <i class="material-icons-outlined location-icon">location_on</i>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {minLength, numeric, required} from "@vuelidate/validators";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  name: "BillingInfo",
  components:{
    VueGoogleAutocomplete,
  },
  setup() {
    return {v$: useVuelidate()};
  },
  validations() {
    return {
      bankDetails: {
        accountNumber: {
          required,
          minLength: minLength(9),
        },
        address: {required},
        mcc: {
          numeric,
          required,
          minLength: minLength(4),
        },
        ein: {
          numeric,
          required,
          minLength: minLength(9),
        },
        holderName: {required},
        routingNumber: {required},
        branch: {required},
      },
    };
  },
  data() {
    return {
      link: "",
      isLoaded: false,
      ssnType: "ssn",
      bankDetailsEditing: false,
      profileId:"",
      bankDetails: {
        date: "",
        accountNumber: "",
        address: "",
        holderName: "",
        branch: "",
        routingNumber: "",
        mcc: "",
        ein: "",
        formattedAddress:""
      }
    };
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
  },
  mounted() {
    this.$material.locale.dateFormat = "MM/DD/YYYY";
    this.bankDetails = {...this.bankDetails, date: new Date("01/01/1990"),
      ...JSON.parse(localStorage.bankDetails)};
    this.vendorId = this.$store.state.vendor.profile.id;
    this.profileId = this.$store.state.auth.user.id;

  },
  methods: {
    getAddressData (addressData, placeResultData) {
      this.bankDetails.formattedAddress = placeResultData.formatted_address;
      this.bankDetails.address = addressData;
    },
    saveBillingInfo(){
      localStorage.bankDetails = JSON.stringify(this.bankDetails);
    },
    saveProfileField(profileData) {
      let updateData;
      if (profileData.name === "aboutCompany") {
        updateData = {about: {company: profileData.value}, id: this.vendorData.id};
      } else {
        updateData = {[profileData.name]: profileData.value, id: this.vendorData.id};
      }
      this.$store.dispatch("vendor/updateProfile", updateData);
    },
  }
};
</script>

<style scoped lang="scss">
.item-wrap {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 20px;
  .md-layout-item {
    padding-left: 11px;
  }
  label {
    font-family: 'Manrope-Bold';
    font-size: 16px;
    margin: 20px 0 10px 0;
    font-weight: 800;
    text-align: left;
  }
  .input-wrapper.valid {
    .valid-msg {
      position: absolute;
      border-bottom: 3px solid #0fac4c;
      border-left: 3px solid #0fac4c;
      border-radius: 2px;
      height: 7px;
      width: 15px;
      transform: rotate(-45deg);
      right: 20px;
      bottom: 25px;
      &.auth {
        right: -13px;
      }
    }
  }
  .input-wrapper{
    position: relative;
    .invalid-msg{
      position: absolute;
      bottom: -25px;
      color: red;
      font-size: 12px;
      width: max-content;
      display: none;
    }
    &.error {
      input {
        background-color: #fdebec;
        border-color: red;
        border-width: 1px 1px 1px 9px;
      }
      .invalid-msg {
        display: block;
      }
    }
    &.valid {
      input {
        border-left: 9px #0fac4c solid;
      }
    }
  }
  .input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    .location-icon {
      position: absolute;
      width: 15px;
      right: 20px;
      bottom: 9px;
      color: #641856;
    }
    &.mcc-wrapper {
      width: 200px;
    }
    label {
      font-family: 'Manrope-Bold';
      font-size: 16px;
      font-weight: 800;
    }
  }
}
</style>
