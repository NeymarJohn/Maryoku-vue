<template>
  <div class="proposal-payment">
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
      <div class=" md-card-content" style="padding: unset">
        <div class="md-layout-item md-size-100">
          <md-card class="cost-pros-cons-section">
            <div class=" md-card-content" style="padding: unset">
              <div class="payment-details">
                <form class="form-section">
                  <div class="md-layout-item">
                    <label>ID Number</label>
                    <br>
                    <input v-for="(option, index) in bankDetails.id"
                           :key="index" v-model="bankDetails.id[index]"
                           style="width: 51px; margin-right: 5px" maxlength="1"
                           pattern="[0-9]*"
                           :name="index"
                           type="password"
                           inputmode="numeric"
                    >
                    <label>-</label>
                    <input v-model="bankDetails.adId"
                           style="width: 51px"
                           maxlength="1" pattern="([12345])\w{0}"
                           type="number"
                    >
                  </div>
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
                        <div class="valid-msg"></div>
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
                >
                  <input v-model="bankDetails.mcc" @blur="v$.bankDetails.mcc.$touch">
                  <div class="valid-msg"></div>
                </div>
                <span class="add-mcc">
                  </span>
              </div>
              <md-button class="md-vendor md-vendor-review" style="margin: 20px 15px" @click="test">
                Save details
              </md-button>
            </div>
          </md-card>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import {required, minLength, numeric} from "@vuelidate/validators";

var card = undefined;

export default {
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
        idNumber: {
          numeric,
          required,
          minLength: minLength(8),
        },
        address: {required},
        mcc: {required},
        holderName: {required},
        routingNumber: {required},
        branch: {required},
      },
    };
  },
  components: {},
  props: {},
  data: () => ({
    isLoaded: false,
    error: "",
    ssnType: "ssn",
    bankDetails: {
      id: ["", "", "", "", "", "", "",],
      adId: "",
      idNumber: "",
      accountNumber: "",
      address: "",
      holderName: "",
      branch: "",
      verification: "",
      routingNumber: "",
      mcc: ""
    }
  }),
  computed: {},
  watch: {
    bankDetails: {
      handler(newValue) {
        const newIdNumber = [...newValue.id, newValue.adId].join("");
        if (this.idNumber !== newIdNumber) {
          this.idNumber = +newIdNumber;
        }
      },
      deep: true,
    }
  },
  methods: {
    checkForm: function (e) {

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
      const formIsValid = await this.v$.$validate();
      if (formIsValid) {
      }
      if (this.name === "") {
        console.log("\x1b[32m ##-249, PaymentSettings.vue",);
      }
      console.log("##-222, PaymentSettings.vue", this.errors);

    },
    sendBankInfo() {

      axios.post("https://api.stripe.com" + "/v1/stripe/person/verify", {
        ...this.bankDetails,
        accept: "application/json",
        headers: {
          token: "lobqt2kdc5pfmfbro0ljk0g0hq6k6qb3"
        }
      }).then(res => {
      }).catch(error => {
        console.log("##-126, PaymentSettings.vue", error);
      });
    },
    submitPayment(event) {
      let self = this;
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
    border: 1px solid #641856;

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
