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
                  <div class="form-section">
                    <div class="md-layout-item">
                      <label>ID Number</label>
                      <br>
                      <input v-for="(option, index) in bankDetails.id"
                             :key="index" v-model="bankDetails.id[index]"
                             style="width: 50px; margin-right: 5px" maxlength="1"
                             pattern="([12345])\w{0}"
                             :name="index"
                      >
                      <label>-</label>
                      <input v-model="bankDetails.adId"
                             style="width: 50px"
                             maxlength="1" pattern="([12345])\w{0}"
                      >
                    </div>
                    <div class="md-layout">
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Beneficiary Name</label>
                          <md-input id="name" v-model="bankDetails.holderName" type="text" />
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Account No.</label>
                          <md-input id="email" v-model="bankDetails.accountNumber" type="text" />
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Bank No.</label>
                          <md-input v-model="bankDetails.routingNumber" type="text" />
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Branch No.</label>
                          <md-input v-model="bankDetails.branch" type="text" />
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-100">
                        <md-field>
                          <label>Address and name of the bank</label>
                          <md-input v-model="bankDetails.address" type="text" />
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-100">
                        <md-field>
                          <label>Verification</label>
                          <md-input v-model="bankDetails.address" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-100">
                      </div>
                    </div>
                  </div>
                </div>
                <md-button @click="sendBankInfo" class="md-vendor md-vendor-review">Save details</md-button>
                <md-button @click="sendTest" class="md-vendor md-vendor-review">Verify Account</md-button>

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
import { Tabs } from "@/components";

import VueElementLoading from "vue-element-loading";
import EventBlockRequirements from "../../../Guest/components/EventBlocks/Modals/EventBlockRequirements";
import axios from "axios";
var card = undefined;

export default {
  components: {
    VueElementLoading,
    Tabs,
    EventBlockRequirements,
  },
  props: {
  },
  data: () => ({
    isLoaded: false,
    bankDetails:{
      id:["","","","","","","",],
      adId:"",
    }
  }),
  methods: {
    sendTest(){
      var stripe = Stripe('');
      stripe.verifyIdentity('vs_1KcCl2BvFPeKz0zX7nYGzaRS_secret_CJ3fAnRmp8raDXHQEBYFLhow9Tdtg')
        .then(function(result) {
            console.log('##-175, PaymentSettings.vue',result)});
      // var verifyButton = document.getElementById('verify-button');
      //
      // verifyButton.addEventListener('click', function() {
          // Get the VerificationSession client secret using the server-side
          // endpoint you created in step 3.
          fetch('https://api.stripe.com/v1/identity/verification_sessions ', {
            method: 'POST',
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

              return stripe.verifyIdentity('');
            })
            .then(function(result) {
              console.log('##-175, PaymentSettings.vue',result)
              // If `verifyIdentity` fails, you should display the localized
              // error message to your user using `error.message`.
              if (result.error) {
                alert(result.error.message);
              }
            })
            .catch(function(error) {
              console.error('Error:', error);
            });
    // });
    },
     test (e){
      console.log('##-133, PaymentSettings.vue', this.$store.state.auth.user.id)
    },
    sendBankInfo(){

      axios.post( process.env.SERVER_URL +"/stripe/v1/customer/destinations/account", {
        ...this.bankDetails,
        accept:"application/json",
        headers:{
          token: "lobqt2kdc5pfmfbro0ljk0g0hq6k6qb3"
        }
        }).then(res=>{
        console.log("##-125, PaymentSettings.vue",res);
      }).catch(error => {
        console.log("##-126, PaymentSettings.vue",error);});
      console.log("##-119, PaymentSettings.vue",this.bankDetails,  process.env.SERVER_URL );

    },
    submitPayment(event) {
      let self = this;
    },
  },
  computed: {},
};
</script>
<style scoped lang="scss">
.billing-information-block{
  min-height: 75vh;
  margin: 0;
  box-shadow: none;
  .header-title{
    .bank-details-icon{
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-top: -18px;
    }
    p{
      display: inline-block;
      font-weight: 800;
      font-size: 22px;
      margin: 6px;
    }
  }
  .info-block{
    display: flex;
    flex-direction: row;
    color: #641856;
    border: solid #641856;
    border-width: 1px 0 ;
    .info-icon{
      margin-right: 27px;
      width: 37px;
    }
  }
  .cost-pros-cons-section{
    box-shadow: none;
  }
}
</style>
