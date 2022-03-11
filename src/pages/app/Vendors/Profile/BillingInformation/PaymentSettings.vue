<template>
  <div class="proposal-payment">
    <md-card class="text-left acceptance-section billing-information-block">
      <md-card-header class="acceptance-section-header">
        <div class="header-title">
          <img class="bank-details-icon" :src="`/static/icons/vendor/bank.svg`"/>
          <p class="md-title">Bank Details</p>
        </div>
      </md-card-header>
      <md-card-content>
        <div class="info-block">
          <img class="info-icon" :src="`/static/icons/vendor/info.svg`"/>
          <p>Please write down the details of the bank to which you would like us to transfer the money.
            iriure dolor in hendrerit in vulputate velit esse
            molestie consequat Vel illum dolore eu feugiat nulla.</p>
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
                      <br/>
                      <input  style="width: 50px; margin-right: 5px"
                              v-model="bankDetails.id[index]"  v-for="(option, index) in bankDetails.id"
                              maxlength="1" pattern="([12345])\w{0}"
                              :key="index"
                              :name="index"
                      />
                      <label>-</label>
                      <input  style="width: 50px"
                              v-model="bankDetails.adId"
                              maxlength="1" pattern="([12345])\w{0}"
                      />
                    </div>
                    <div class="md-layout">
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Beneficiary Name</label>
                          <md-input id="name" v-model="bankDetails.holderName" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Account No.</label>
                          <md-input id="email" v-model="bankDetails.accountNumber"  type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Bank No.</label>
                          <md-input type="text" v-model="bankDetails.routingNumber" ></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Branch No.</label>
                          <md-input type="text" v-model="bankDetails.branch" ></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-100">
                        <md-field>
                          <label>Address and name of the bank</label>
                          <md-input v-model="bankDetails.address" type="text"></md-input>
                        </md-field>
                      </div>
                    </div>
                  </div>
                </div>
                <md-button @click="sendBankInfo" class="md-vendor md-vendor-review">Save details</md-button>
              </md-card-content>
            </md-card>
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
      id:[0,0,0,0,0,0,0],
      adId:0
    }
  }),

  created() {},
  mounted() {
    setTimeout(() => {
      // Custom styling can be passed to options when creating an Element.
      // (Note that this demo uses a wider set of styles than the guide below.)
      var style = {
        base: {
          color: "#32325d",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
          ":-webkit-autofill": {
            color: "#32325d",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
          ":-webkit-autofill": {
            color: "#fa755a",
          },
        },
      };
    }, 100);
  },
  methods: {
     test (e){
      console.log('##-133, PaymentSettings.vue',e)
    },
    sendBankInfo(){

      axios.post( process.env.SERVER_URL +'/stripe/v1/customer/destinations/account', {
        ...this.bankDetails,
        accept:'application/json',
        headers:{
          token: 'lobqt2kdc5pfmfbro0ljk0g0hq6k6qb3'
        }
        }).then(res=>{
        console.log('##-125, PaymentSettings.vue',res)
      }).catch(error => {
        console.log('##-126, PaymentSettings.vue',error)})
      console.log('##-119, PaymentSettings.vue',this.bankDetails,  process.env.SERVER_URL )

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