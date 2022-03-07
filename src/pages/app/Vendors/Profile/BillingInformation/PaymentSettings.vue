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
                    <div class="md-layout">
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Beneficiary Name</label>
                          <md-input id="name" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Account No.</label>
                          <md-input id="email" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Bank No.</label>
                          <md-input type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Branch No.</label>
                          <md-input type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-100">
                        <md-field>
                          <label>Address and name of the bank</label>
                          <md-input type="text"></md-input>
                        </md-field>
                      </div>
                    </div>
                  </div>
                </div>
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
var card = undefined;

export default {
  components: {
    VueElementLoading,
    Tabs,
    EventBlockRequirements,
  },
  props: {
    event: Object,
    selectedBlock: Object,
    proposal: Object,
    winnerId: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    isLoaded: false,
    proposalsToDisplay: 1,
    ratings: [1, 2, 3, 4, 5],
    feedbackRating: 3,
    proposalAccepted: false,
    image: "https://i.imgur.com/HhqxVCW.jpg",
    name: "Shut up and take my money!",
    description: "Cats are the best dog!",
    currency: "PHP",
    amount: 99999,
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