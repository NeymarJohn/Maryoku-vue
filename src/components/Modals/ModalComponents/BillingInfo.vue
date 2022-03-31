<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
      rel="stylesheet">
    <div class="item-wrap">
      <div class="payment-details">
        <form class="form-section">
          <div class="md-layout">
            <div class="md-layout-item md-size-70">
              <div class="input-wrapper"
                   :class="{
                     error: v$.bankDetails.holderName.$errors.length,
                     valid: !v$.bankDetails.holderName.$errors.length }">
                <label>Beneficiary Name</label>
                <input id="name" v-model="bankDetails.holderName" type="text"
                       @blur="v$.bankDetails.holderName.$touch"/>
                <div class="valid-msg"></div>
              </div>
            </div>
            <div class="md-layout-item md-size-70">
              <div class="input-wrapper"
                   :class="{
                     error: v$.bankDetails.accountNumber.$errors.length,
                     valid: !v$.bankDetails.accountNumber.$errors.length }">
                <label>Account No.</label>
                <input id="email" v-model="bankDetails.accountNumber" type="number"
                       @blur="v$.bankDetails.accountNumber.$touch"/>
                <div class="valid-msg"></div>
              </div>
            </div>
            <div class="md-layout-item md-size-70">
              <div class="input-wrapper" :class="{
                error: v$.bankDetails.routingNumber.$errors.length,
                valid: !v$.bankDetails.routingNumber.$errors.length}"
              >
                <label>Bank No.</label>
                <input v-model="bankDetails.routingNumber"
                       @blur="v$.bankDetails.routingNumber.$touch" type="text">
                <div class="valid-msg"></div>
              </div>
            </div>
            <div class="md-layout-item md-size-30">
              <div class="input-wrapper" :class="{
                error: v$.bankDetails.branch.$errors.length,
                valid: !v$.bankDetails.branch.$errors.length }"
              >
                <label>Branch No.</label>
                <input v-model="bankDetails.branch"
                       @blur="v$.bankDetails.branch.$touch" type="text">
                <div class="valid-msg"></div>
              </div>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="input-wrapper" :class="{
                error: v$.bankDetails.address.$errors.length,
                valid: !v$.bankDetails.address.$errors.length && v$.bankDetails.address.$dirty}"
              >
                <label>Address and name of the bank</label>
                <vue-google-autocomplete id="modal-billing-address"/>
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
import {socialIcons} from "../../../constants/links";
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
      socialMediaBlocks: socialIcons,
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
        ein: ""
      }
    };
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
  },
  created() {
    this.link = this.vendorData.social[0].name;
  },
  mounted() {
    this.$material.locale.dateFormat = "MM/DD/YYYY";
    this.bankDetails = {...this.bankDetails, date: new Date("01/01/1990"),
      ...JSON.parse(localStorage.bankDetails)};
    this.vendorId = this.$store.state.vendor.profile.id;
    this.profileId = this.$store.state.auth.user.id;

  },
  methods: {
    saveBillingInfo(){
      localStorage.bankDetails = JSON.stringify(this.bankDetails);
    },
    setLink(link) {
      this.link = link;
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

  .authentication-header-block {
    margin-bottom: 15px;

    .authentication-header {
      font-family: 'Manrope-Regular';
      font-size: 22px;
      font-weight: 600;
    }

    .shield-icon {
      display: inline-block;
      width: 25px;
      height: 25px;
      margin-top: -10px;
    }
  }
  .filled-detail{
    position: relative;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    border: 1px solid #a9a9a9;
    background-color: #e9dfe8;
    .bank-info-block{
      padding: 0 25px;
      display: flex;
      flex-direction: column;
      margin: auto;
      .bank-icon {
        width: 47px;
        position: absolute;
        left: 10px;
        top: 10px;
      }
      .edit-button{
        position: absolute;
        right: 0;
        top: 0;
        text-transform: capitalize;
        font-family: 'Manrope-bold';
      }
      .bank-name{
        display: inline-block;
        text-transform: uppercase;
        font-family: 'Manrope-bold';
        font-size: 16px;
        border-right: 1px solid black;
        padding-right: 10px;
        margin-right: 10px;
      }
      .account-details {
        display: flex;
        .left {
          font-family: 'Manrope-bold';
          width: 50%;
          div{
            margin-bottom: 20px;
          }
        }
        .right {
          width: 50%;
          div{
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  .button-name {
    text-transform: capitalize;
    font-family: 'Manrope-bold';
    text-decoration: underline;
  }
  .trash{
    width: 14px;
    margin-right: 5px;
    margin-left: -30px;
    margin-top: -4px;
  }
  .authentication-block {
    .add-mcc {
      display: block;
      color: #641856;
      padding: 20px 0;

      i {
        margin-top: -1px;
      }
    }

    * {
      margin: 5px;
    }

    border-radius: 3px;
    border: solid 1px #bcbcbc;
    margin: 10px 15px;

    .select-ssn-type {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 50px;

      .radio-input {
        height: fit-content;
        min-height: unset;
      }
    }

    .name {
      font-family: 'Manrope-bold';
      font-size: 15px;
      font-weight: 800;
    }

    .description {
      font-family: 'Manrope-regular';
      font-size: 12px;
      color: #818080;
    }

    .date-wrapper {
      max-width: 200px;
      margin-bottom: 30px;
      position: relative;

      .calendar-icon {
        width: 19px;
        position: absolute;
        bottom: 11px;
        left: 170px;
        color: #641856;
      }
    }
  }

  .block-separator {
    margin: 28px 13px;
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: black solid 1px;
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
    &.error {
      input {
        border-color: red;
        border-width: 1px 1px 1px 9px;
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

  .billing-information-block {
    min-height: 75vh;
    margin: 0;
    box-shadow: none;

    .header-title {
      .bank-details-icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-top: -18px;
      }

      p {
        display: inline-block;
        font-weight: 800;
        font-size: 22px;
        margin: 6px;
      }
    }

    .info-block {
      padding: 0 25px;
      display: flex;
      flex-direction: row;
      color: #641856;
      border: 1px solid #9f2488;
      .info-icon {
        margin-right: 27px;
        width: 37px;
      }
    }

    .cost-pros-cons-section {
      box-shadow: none;
    }
  }
}
</style>
