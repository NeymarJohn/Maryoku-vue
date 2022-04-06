<template>
  <div class="proposal-payment">
    <link
      href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
      rel="stylesheet">
    <md-card class="text-left acceptance-section billing-information-block">
      <md-card-header class="acceptance-section-header">
        <div class="header-title">
          <img class="bank-details-icon" :src="`/static/icons/vendor/bank.svg`">
          <p class="md-title">
            Bank Details
          </p>
        </div>
      </md-card-header>
      <md-card-content>
        <div class="info-block md-layout-item md-size-60">
          <p>
            Please write down the details of the bank to which you would like us to transfer the money.
            iriure dolor in hendrerit in vulputate velit esse
            molestie consequat Vel illum dolore eu feugiat nulla.
          </p>
        </div>
      </md-card-content>
      <div  v-if="bankDetailsEditing" class=" md-card-content" style="padding: unset">
        <div class="md-layout-item md-size-100">
          <md-card class="cost-pros-cons-section">
            <div class=" md-card-content" style="padding: unset">
              <div class="payment-details">
                <form class="form-section">
                  <div class="md-layout mt-1">
                    <div class="md-layout-item md-size-40">
                      <div class="input-wrapper"
                           :class="{
                             error: v$.bankDetails.holderName.$errors.length,
                             valid: !v$.bankDetails.holderName.$errors.length && v$.bankDetails.holderName.$dirty}">
                        <label>Beneficiary Name</label>
                        <input id="name" v-model="bankDetails.holderName" type="text"
                               @blur="v$.bankDetails.holderName.$touch"/>
                        <div class="valid-msg"></div>
                      </div>
                    </div>
                    <div class="md-layout-item md-size-40">
                      <div class="input-wrapper"
                           :class="{
                             error: v$.bankDetails.accountNumber.$errors.length,
                             valid: !v$.bankDetails.accountNumber.$errors.length && v$.bankDetails.accountNumber.$dirty}">
                        <label>Account No.</label>
                        <input id="email" v-model="bankDetails.accountNumber" type="number"
                               @blur="v$.bankDetails.accountNumber.$touch"/>
                        <div class="valid-msg"></div>
                      </div>
                    </div>
                    <div class="md-layout-item md-size-40">
                      <div class="input-wrapper" :class="{
                        error: v$.bankDetails.routingNumber.$errors.length,
                        valid: !v$.bankDetails.routingNumber.$errors.length && v$.bankDetails.routingNumber.$dirty}"
                      >
                        <label>Bank No.</label>
                        <input v-model="bankDetails.routingNumber"
                               @blur="v$.bankDetails.routingNumber.$touch" type="text">
                        <div class="valid-msg"></div>
                      </div>
                    </div>
                    <div class="md-layout-item md-size-40">
                      <div class="input-wrapper" :class="{
                        error: v$.bankDetails.branch.$errors.length,
                        valid: !v$.bankDetails.branch.$errors.length && v$.bankDetails.branch.$dirty}"
                      >
                        <label>Branch No.</label>
                        <input v-model="bankDetails.branch"
                               @blur="v$.bankDetails.branch.$touch" type="text">
                        <div class="valid-msg"></div>
                      </div>
                    </div>
                    <div class="md-layout-item md-size-80">
                      <div class="input-wrapper" :class="{
                        error: v$.bankDetails.address.$errors.length,
                        valid: !v$.bankDetails.address.$errors.length && v$.bankDetails.address.$dirty}"
                      >
                        <label>Address and name of the bank</label>
                        <input v-model="bankDetails.address" @blur="v$.bankDetails.address.$touch" type="text">
                        <div class="location-icon">
                          <i class="material-icons-outlined">location_on</i>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <span class="block-separator"></span>
              <div class="md-layout-item md-size-100 authentication-header-block">
                <img class="shield-icon" :src="`/static/icons/shield.svg`">
                <span class="authentication-header">User Authentication</span>
              </div>
              <div class="md-layout-item md-size-60 authentication-block">
                <div>
                  <span class="name">MCC</span>
                </div>
                <div>
                  <span class="description">
                    Please fill in your personal account so that we can transfer money to you.
                  </span>
                </div>
                <div class="input-wrapper mcc-wrapper" :class="{
                       error: v$.bankDetails.mcc.$errors.length,
                       valid: !v$.bankDetails.mcc.$errors.length && v$.bankDetails.mcc.$dirty}"
                     @click="v$.bankDetails.mcc.$touch"
                >
                  <PincodeInput v-model="bankDetails.mcc" :secure="true" @blur="v$.bankDetails.mcc.$touch"/>
                  <div class="valid-msg auth"></div>
                </div>
                <div class="input-wrapper mcc-wrapper" :class="{
                       error: v$.bankDetails.mcc.$errors.length,
                       valid: !v$.bankDetails.mcc.$errors.length && v$.bankDetails.mcc.$dirty}"
                     @click="v$.bankDetails.mcc.$touch"
                >
                  <div>
                    <span class="name">EIN</span>
                  </div>
                  <PincodeInput v-model="bankDetails.ein" :length="9"/>
                </div>
              </div>
              <div class="md-layout-item md-size-60 authentication-block">
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
                                 name="todo-date"></md-datepicker>
                  <img class="calendar-icon" :src="`${$iconURL}Event Page/calendar-dark.svg`" width="23px">
                </div>
              </div>
              <md-button class="md-vendor md-vendor-review" style="margin: 20px 15px" @click="sendBankInfo">
                Save details
              </md-button>
            </div>
          </md-card>
        </div>
      </div>
      <md-card-content v-else>
        <div class="filled-detail md-layout-item md-size-60">
          <div class="bank-info-block md-layout-item md-size-90">
            <img class="bank-icon" src="/static/icons/bank-icon.svg">
            <md-button @click="setEditing" class="md-simple md-vendor edit-button">
              edit
            </md-button>
            <div class="bank-name-wrapper">
              <p class="bank-name">bank of america</p>
              <span>037</span>
              <br/>
              <i class="material-icons-outlined location-icon">location_on</i>
              <span style="color: #641856">{{ bankDetails.address }}</span>
            </div>
            <span class="block-separator" style="margin: 28px 0; border-color: #a9a9a9"></span>
            <div class="account-details">
              <div class="left">
                <div>ID number</div>
                <div>Beneficiary name</div>
                <div>Account No.</div>
              </div>
              <div class="right">
                <div>{{ hiddenId }}</div>
                <div>{{ bankDetails.holderName }}</div>
                <div>{{ hiddenAccount }}</div>
              </div>
            </div>
          </div>
        </div>
        <md-button class="md-simple md-vendor">
          <img class="trash" :src="`${$iconURL}Timeline-New/Trash.svg`">
          <span class="button-name">Delete Account</span>
        </md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import {required, minLength, numeric} from "@vuelidate/validators";
import PincodeInput from "vue-pincode-input";

export default {
  components: {
    PincodeInput
  },
  props: {},
  data: () => ({
    isLoaded: false,
    error: "",
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
  }),
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
  computed:{
    hiddenId(){
      if(!this.bankDetails.ein) return;
      const hiddenId = this.bankDetails.ein.split("",);
      hiddenId.fill("X", 0, hiddenId.length - 1);
      hiddenId[hiddenId.length] = hiddenId[hiddenId.length - 1];
      hiddenId[hiddenId.length - 2] = "-";
      return hiddenId.join("");
    },
    hiddenAccount(){
      if(!this.bankDetails.accountNumber) return;
      const hiddenAccount = Array.from(this.bankDetails.accountNumber);
      hiddenAccount.fill("X", 2, hiddenAccount.length - 3);
      return hiddenAccount.join("");
    }
  },
  mounted() {
    this.$material.locale.dateFormat = "MM/DD/YYYY";
    this.bankDetails = {...this.bankDetails, date: new Date("01/01/1990"),
      ...JSON.parse(localStorage.bankDetails)};
    this.vendorId = this.$store.state.vendor.profile.id;
    this.profileId = this.$store.state.auth.user.id;

  },
  methods: {
    setEditing(){
      this.bankDetailsEditing = true;
    },
    sendTest() {
      var stripe = Stripe("pk_test_51In2qMBvFPeKz0zXs5ShSv1qjb6YAnonaqamWN4e9f4cTygxBMkMbYXcUAGp7deorwFS5ohy4vuQZFfeIVgxPPMF00nSOnDeQy");
      stripe.verifyIdentity("vs_1KcCl2BvFPeKz0zX7nYGzaRS_secret_CJ3fAnRmp8raDXHQEBYFLhow9Tdtg")
        .then(function (result) {
        });
      fetch("https://api.stripe.com/v1/identity/verification_sessions ", {
        method: "POST",
        data: {
          vendorId: this.$store.state.auth.user.id
        }
      })
        .then(function (response) {
          return stripe.verifyIdentity(response.secret);
        })
        .then(function (session) {
          return stripe.verifyIdentity("");
        })
        .then(function (result) {
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    },
    async test(e) {
      e.preventDefault();
      this.vendorId = this.$store.state;
      localStorage.bankDetails = JSON.stringify(this.bankDetails);
      console.log("\x1b[32m ##-244, PaymentSettings.vue",this.vendorId);
      // const formIsValid = await this.v$.$validate();
      // if (formIsValid) {
      // }
      // if (this.name === "") {
      //   console.log("\x1b[32m ##-249, PaymentSettings.vue",);
      // }
      // console.log("##-222, PaymentSettings.vue", this.errors);

    },
    sendBankInfo() {
      localStorage.bankDetails = JSON.stringify(this.bankDetails);
      console.log("\x1b[32m ##-255, PaymentSettings.vue",this.bankDetails, this.vendorId);
      this.bankDetailsEditing = false;
      axios.post(process.env.SERVER_URL+"/stripe/v1/customer/destinations/account", {
          "holderName": this.bankDetails.holderName,
          "routingNumber": this.bankDetails.routingNumber,
          "accountNumber": this.bankDetails.accountNumber
        },
        {
        headers: {
          accept: "application/json",
          Authorization: "Bearer 4ntj088p045kpl0tdqr5vu4lrq168qdc"
        }
      }).then(res => {
        console.log("\x1b[32m ##-271, PaymentSettings.vue", this.profileId);
        axios.post(process.env.SERVER_URL+"/stripe/v1/account/", {
            "vendorId": this.vendorId,
            "personId": this.profileId,
            "bankAccountToken": res.data.token,
            "representative": {
              "taxId": "000000000",
              "ssnLast4": "0000",
              "phoneNumber": "000 000 0000",
              "idNumber": "000000000",
              "email": "email@email.email",
              "dob": {
                "year": 1992,
                "month": 1,
                "day": 1
              },
              "address": {
                "line1": "address_full_match",
                "line2": "",
                "postalCode": "",
                "city": "",
                "state": ""
              }
            }
          },
          {
            headers: {
              accept: "application/json",
              Authorization: "Bearer 4ntj088p045kpl0tdqr5vu4lrq168qdc"
            }
          }).then(res => {
          console.log("\x1b[32m ##-303, PaymentSettings.vue",res);

        });
        console.log("\x1b[32m ##-262, PaymentSettings.vue",res);
      }).catch(error => {
        console.log("##-126, PaymentSettings.vue", error);
      });
    },
  },
};
</script>
<style scoped lang="scss">
.md-layout-item {
  padding-left: 11px;
}

label {
  font-family: 'Manrope-Bold';
  font-size: 16px;
  margin: 30px 0 10px 0;
  font-weight: 800;
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
    .location-icon{
      color: #641856;
      font-size: 18px;
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
      filter: invert(63%) sepia(0%) saturate(7177%) hue-rotate(3deg) brightness(80%) contrast(107%);
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

.input-wrapper.error {
  input {
    border-color: red;
    border-width: 1px 1px 1px 9px;
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
    filter: invert(10%) sepia(33%) saturate(4724%) hue-rotate(289deg) brightness(94%) contrast(96%);
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
</style>
