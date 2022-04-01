<template>
  <div>
    <div class="item-wrap">
      <div v-if="part === 'all' || part === '1'" class="md-layout-item md-size-100 authentication-block">
        <div>
          <span class="name">MCC</span>
        </div>
        <div>
          <span class="description">
            Please fill in your personal account so that we can transfer money to you.
          </span>
        </div>
        <div class="input-wrapper mcc-wrapper"
             :class="{error: v$.bankDetails.mcc.$errors.length && v$.bankDetails.mcc.$dirty,
                      valid: !v$.bankDetails.mcc.$errors.length }"
             @click="v$.bankDetails.mcc.$touch"
        >
          <PincodeInput v-model="bankDetails.mcc" :secure="true" @blur="v$.bankDetails.mcc.$touch"/>
          <div class="valid-msg auth"></div>
        </div>
        <div class="input-wrapper mcc-wrapper"
             :class="{error: v$.bankDetails.ein.$errors.length && v$.bankDetails.ein.$dirty,
                      valid: !v$.bankDetails.ein.$errors.length }"
             @click="v$.bankDetails.ein.$touch"
        >
          <div>
            <span class="name">EIN</span>
          </div>
          <PincodeInput v-model="bankDetails.ein" :length="9"/>
        </div>
      </div>
      <div  v-if="part === 'all' || part === '2'" class="md-layout-item md-size-100 authentication-block">
        <div>
          <span class="name">Date of birth</span>
        </div>
        <div>
          <span class="description">
            Please enter your date of birth.
          </span>
        </div>
        <div class="date-wrapper" id="bankDetailsDateWrapper">
          <md-datepicker ref="datePicker"
                         :md-model-type="String"
                         v-model="bankDetails.date"
                         name="todo-date">
            <label v-if="!bankDetails.date" style="margin-left: -17px;">MM/DD/YYYY</label>
          </md-datepicker>
          <img class="calendar-icon" :src="`${$iconURL}Event Page/calendar-dark.svg`" width="23px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {socialIcons} from "../../../constants/links";
import useVuelidate from "@vuelidate/core";
import {minLength, numeric, required} from "@vuelidate/validators";
import PincodeInput from "vue-pincode-input";
export default {
  name: "AuthInfo",
  components: {
    PincodeInput,
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
  props: {
    part: {
      type: String,
      default: "all",
    },
  },
  data() {
    return {
      socialMediaBlocks: socialIcons,
      link: "",
      isLoaded: false,
      ssnType: "ssn",
      bankDetailsEditing: false,
      profileId: "",
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
    this.bankDetails = {
      ...JSON.parse(localStorage.bankDetails),
      ...this.bankDetails, date: "",
    };
    this.vendorId = this.$store.state.vendor.profile.id;
    this.profileId = this.$store.state.auth.user.id;

  },
  methods: {
    sendBankInfo(){
      console.log("\x1b[32m ##-141, AuthInfo.vue",);
    },
    saveBillingInfo() {
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
  flex-direction: column;
  padding: 0 10px;
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
  .authentication-block {
    border-radius: 3px;
    margin: 10px 15px;
    align-items: start;
    * {
      margin: 5px;
      display: flex;
      align-items: flex-start;
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
        bottom: 17px;
        left: 170px;
        color: #641856;
      }
    }
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
  .input-wrapper {
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
