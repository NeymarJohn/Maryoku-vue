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
                    <div v-if="errors.length">
                      <b>Please correct the following error(s):</b>
                      <ul>
                        <li v-for="error in errors">
                          {{ error }}
                        </li>
                      </ul>
                    </div>
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
                        <div class="input-wrapper">
                          <label>Beneficiary Name</label>
                          <md-input id="name" v-model="bankDetails.holderName" type="text" />
                        </div>
                      </div>
                      <div class="md-layout-item md-size-40">
                        <div class="input-wrapper">
                          <label>Account No.</label>
                          <md-input id="email" v-model="bankDetails.accountNumber" type="text" />
                        </div>
                      </div>
                      <div class="md-layout-item md-size-40">
                        <div class="input-wrapper">
                          <label>Bank No.</label>
                          <md-input v-model="bankDetails.routingNumber" v-validate="modelValidations.username"
                                    type="text"
                          />
                        </div>
                      </div>
                      <md-field class="md-layout-item md-size-40">
                        <div class="input-wrapper">
                          <label>Branch No.</label>
                          <md-input v-model="bankDetails.branch" v-validate="modelValidations.password" type="text" />
                        </div>
                      </md-field>
                      <div class="md-layout-item md-size-80"
                           :class="[{'valid': !errors.has('email') && touched.email},{'error': errors.has('email')}]"
                      >
                        <div class="input-wrapper"
                             :class="[{'valid': !errors.has('email')},{'error': errors.has('email')}]"
                        >
                          <label>Address and name of the bank</label>
                          <md-input v-model="bankDetails.address" v-validate="modelValidations.email"
                                    :class="{valid: this.ariaInnvalid}" type="text"
                          />
                          <div>{{ errors.first('email') }}</div>
                        </div>
                      </div>
                      <div class="md-layout-item md-size-80">
                        <div class="input-wrapper">
                          <label>Verification</label>
                          <md-input v-model="bankDetails.address" type="text" />
                        </div>
                      </div>
                      <div class="md-layout-item md-size-100" />
                    </div>
                  </form>
                </div>
                <md-button class="md-vendor md-vendor-review" @click="sendBankInfo">
                  Save details
                </md-button>
                <md-button class="md-vendor md-vendor-review" @click="sendTest">
                  Verify Account
                </md-button>
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
import {Tabs} from "@/components";

import VueElementLoading from "vue-element-loading";
import EventBlockRequirements from "../../../Guest/components/EventBlocks/Modals/EventBlockRequirements";
import axios from "axios";

var card = undefined;

export default {
  components: {
  },
  props: {},
  data: () => ({
    isLoaded: false,
    error: "",
    modelValidations: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        min: 8
      },
      username: {
        required: true
      }
    },
    touched: {
      email: false,
      password: false,
      username: false
    },
    bankDetails: {
      id: ["", "", "", "", "", "", "",],
      adId: "",
      accountNumber: "",
      address: ""

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
        });
          fetch("https://api.stripe.com/v1/identity/verification_sessions ", {
            method: "POST",
            data:{
              vendorId: this.$store.state.auth.user.id
            }
          })
            .then(function(response) {
              return stripe.verifyIdentity(response.secret);

              // return response.json();
            })
            .then(function(session) {
              // Show the verification modal.

              return stripe.verifyIdentity("");
            })
            .then(function(result) {
              // If `verifyIdentity` fails, you should display the localized
              // error message to your user using `error.message`.
              if (result.error) {
                alert(result.error.message);
              }
            })
            .catch(function(error) {
              console.error("Error:", error);
            });
    // });
    },
     test (e){
    },
    sendBankInfo() {

      axios.post(" https://api.stripe.com"+ "/v1/stripe/person/verify", {
        ...this.bankDetails,
        accept: "application/json",
        headers: {
          token: "lobqt2kdc5pfmfbro0ljk0g0hq6k6qb3"
        }
        }).then(res=>{
      }).catch(error => {
        console.error(error);
      });
    },
    submitPayment(event) {
      let self = this;
    },
  },
};
</script>
<style scoped lang="scss">
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
