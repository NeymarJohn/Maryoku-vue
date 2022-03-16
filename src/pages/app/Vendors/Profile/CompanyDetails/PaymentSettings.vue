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
        <div class="info-block">
          <img class="info-icon" :src="`/static/icons/vendor/info.svg`">
          <p>
            Please write down the details of the bank to which you would like us to transfer the money.
            iriure dolor in hendrerit in vulputate velit esse
            molestie consequat Vel illum dolore eu feugiat nulla.
          </p>
        </div>
      </md-card-content>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-size-100">
            <md-card class="cost-pros-cons-section">
              <md-card-content>
                <div class="payment-details">
                  <form class="form-section">
                    <div class="md-layout-item">
                      <label>ID Number</label>
                      <br>
                      <input v-for="(option, index) in bankDetails.id"
                             :key="index" v-model="bankDetails.id[index]"
                             style="width: 51px; margin-right: 5px" maxlength="1"
                             pattern="([12345])\w{0}"
                             :name="index"
                             type="number"
                      >
                      <label>-</label>
                      <input v-model="bankDetails.adId"
                             style="width: 51px"
                             maxlength="1" pattern="([12345])\w{0}"
                      >
                    </div>
                    <div class="md-layout mt-1">
                      <div class="md-layout-item md-size-40">
                        <div class="input-wrapper" :class="{ error: v$.bankDetails.holderName.$errors.length }">
                          <label>Beneficiary Name</label>
                          <input id="name" v-model="bankDetails.holderName" @blur="v$.bankDetails.holderName.$touch" type="text"/>
                        </div>
                        <div class="input-errors" v-for="error of v$.bankDetails.holderName.$errors" :key="error.$uid">
                          <div class="error-msg">
                            {{ error.$message }}
                          </div>
                        </div>
                      </div>
                      <div class="md-layout-item md-size-40">
                        <div class="input-wrapper">
                          <label>Account No.</label>
                          <input id="email" v-model="bankDetails.accountNumber" type="text"/>
                        </div>
                      </div>
                      <div class="md-layout-item md-size-40">
                        <div class="input-wrapper">
                          <label>Bank No.</label>
                          <input v-model="bankDetails.routingNumber" type="text"/>
                        </div>
                      </div>
                      <div class="md-layout-item md-size-40">
                        <div class="input-wrapper">
                          <label>Branch No.</label>
                          <input v-model="bankDetails.branch" type="text"/>
                        </div>
                      </div>
                      <div class="md-layout-item md-size-80">
                        <div class="input-wrapper">
                          <label>Address and name of the bank</label>
                          <input v-model="bankDetails.address" type="text"/>
                          <div>{{ errors.first('email') }}</div>
                        </div>
                      </div>
                      <div class="md-layout-item md-size-80">
                        <div class="input-wrapper">
                          <label>Verification</label>
                          <input v-model="bankDetails.verification" type="text"/>
                        </div>
                      </div>
                      <div class="md-layout-item md-size-100"/>
                    </div>
                  </form>
                </div>
                <span class="block-separator"></span>
                <div  class="md-layout-item md-size-100 authentication-header-block">
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
                  <div>
                    <input>
                  </div>
                  <span>
                    <md-icon data-v-69344496="" class="md-icon md-icon-font color-vendor mr-5 md-theme-default">
                      add_circle_outline
                    </md-icon>
                    Add another MCC
                  </span>
                </div>

                <div class="md-layout-item md-size-60 authentication-block">
                  <div class="select-ssn-type">
                    <input v-model="ssnType" id="ssn" value="ssn" class="radio-input" type="radio">
                    <label for="ssn" class="radio-label name">SSN</label>

                    <input v-model="ssnType" id="ein" value="ein"  class="radio-input" type="radio">
                    <label for="ein" class="radio-label name">EIN</label>
                  </div>
                  <div>
                    <span class="description">Please fill in the last four digits of SSN</span>
                  </div>
                  <div>
                    <input>
                  </div>
                </div>
                <md-button class="md-vendor md-vendor-review" style="margin: 20px 15px" @click="sendBankInfo">
                  Save details
                </md-button>
<!--                <md-button class="md-vendor md-vendor-review" @click="sendTest">-->
<!--                  Verify Account-->
<!--                </md-button>-->
              </md-card-content>
            </md-card>
            <!--            <button id="verify-button" @click="sendTest">Verify</button>-->
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
// import {Tabs} from "@/components";
// import VueElementLoading from "vue-element-loading";
// import EventBlockRequirements from "../../../Guest/components/EventBlocks/Modals/EventBlockRequirements";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

var card = undefined;

export default {
  setup () {
    return { v$: useVuelidate() };
  },
  validations () {
    return {
      bankDetails: {
        id:{required},
        adId: {required},
        accountNumber: {required},
        address: {required},
        holderName:{required},
        routingNumber:{required},
        branch:{required},
        verification:{required},
      },
    };
  },
  components: {
    // VueElementLoading,
    // Tabs,
    // EventBlockRequirements,
  },
  props: {},
  data: () => ({
    isLoaded: false,
    error: "",
    firstName: "{required}", // Matches this.firstName
    lastName: "{required}", // Matches this.lastName
    contact: {
      email: "{required, email}" // Matches this.contact.email
    },
    ssnType: "ssn",
    bankDetails: {
      id: ["", "", "", "", "", "", "",],
      adId: "",
      accountNumber: "",
      address: "",
      holderName: "",
      branch: "",
      verification: "",
      routingNumber: "",
    }
  }),
  computed: {},
  methods: {
    checkForm: function (e) {

    },
    sendTest() {
      var stripe = Stripe("pk_test_51In2qMBvFPeKz0zXs5ShSv1qjb6YAnonaqamWN4e9f4cTygxBMkMbYXcUAGp7deorwFS5ohy4vuQZFfeIVgxPPMF00nSOnDeQy");
      stripe.verifyIdentity("vs_1KcCl2BvFPeKz0zX7nYGzaRS_secret_CJ3fAnRmp8raDXHQEBYFLhow9Tdtg")
        .then(function (result) {
          console.log("##-175, PaymentSettings.vue", result);
        });
      // var verifyButton = document.getElementById('verify-button');
      //
      // verifyButton.addEventListener('click', function() {
      // Get the VerificationSession client secret using the server-side
      // endpoint you created in step 3.
      fetch("https://api.stripe.com/v1/identity/verification_sessions ", {
        method: "POST",
        data: {
          vendorId: this.$store.state.auth.user.id
        }
      })
        .then(function (response) {
          return stripe.verifyIdentity(response.secret);

          // return response.json();
        })
        .then(function (session) {
          // Show the verification modal.

          return stripe.verifyIdentity("");
        })
        .then(function (result) {
          console.log("##-175, PaymentSettings.vue", result);
          // If `verifyIdentity` fails, you should display the localized
          // error message to your user using `error.message`.
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
      // });
    },
    test(e) {
      e.preventDefault();

      this.errors = [];

      if (this.name === "") {
        this.errors.push("Product name is required.");
      } else {
        console.log('##-211, PaymentSettings.vue',);
        // console.log("##-133, PaymentSettings.vue",);
        // fetch(apiUrl + encodeURIComponent(this.name))
        //   .then(async res => {
        //     if (res.status === 204) {
        //       alert("OK");
        //     } else if (res.status === 400) {
        //       let errorResponse = await res.json();
        //       this.errors.push(errorResponse.error);
        //     }
        //   });
      }
      console.log('##-222, PaymentSettings.vue',);

    },
    sendBankInfo() {

      axios.post(' https://api.stripe.com'+ "/v1/stripe/person/verify", {
        ...this.bankDetails,
        accept: "application/json",
        headers: {
          token: "lobqt2kdc5pfmfbro0ljk0g0hq6k6qb3"
        }
      }).then(res => {
        console.log("##-125, PaymentSettings.vue", res);
      }).catch(error => {
        console.log("##-126, PaymentSettings.vue", error);
      });
      console.log("##-119, PaymentSettings.vue", this.bankDetails, process.env.SERVER_URL);

    },
    submitPayment(event) {
      let self = this;
    },
  },
};
</script>
<style scoped lang="scss">
.authentication-header-block{
  margin-bottom: 15px;
  .authentication-header{
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

.authentication-block{
  *{
    margin: 5px;
  }
  border-radius: 3px;
  border: solid 1px #bcbcbc;
  margin: 10px 15px;
  .select-ssn-type{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    .radio-input{
      display: inline-block;
      height: fit-content;
      min-height: unset;
    }
    .radio-input:checked {
     border-color:  #641856;
      background-color: #641856;
    }
      .radio-label{
      display: inline-block;
    }
  }
  .name{
    font-family: 'Manrope-bold';
    font-size: 15px;
    font-weight: 800;
  }
  .description{
    font-family: 'Manrope-regular';
    font-size: 12px;
    color: #818080;
  }
}
.block-separator{
  margin: 28px 15px;
  display: block;
  width: 100%;
  height: 1px;
  border-bottom: black solid 1px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;

  label {
    font-family: 'Manrope-Bold';
    font-size: 16px;
    font-weight: 800;
  }

  input::after {
    &valid {
      background-color: red;
    }
  }

  &valid {
    background-color: red;
  }

  &error {
    background-color: red;
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
    display: flex;
    flex-direction: row;
    color: #641856;
    border: solid #641856;
    border-width: 1px 0;

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
