<template>
  <div class="event-vendor-checkout">
    <vue-element-loading :active="loading" spinner="ring" color="#FF547C" />
    <div class="checkout-content md-layout" v-if="!loading">
      <vue-element-loading :active="loadingPayment" spinner="ring" color="#FF547C" />
      <div class="md-layout-item md-size-45 left-panel">
        <div
          class="background-section"
          :style="`background-image: url(https://static-maryoku.s3.amazonaws.com/storage/shutterstock_1801541476.jpg) `"
        ></div>
        <div class="content p-50">
          <div class="font-size-30">
            <span class="font-bold">
              <img
                :src="`${$iconURL}Budget+Elements/${vendor.eventCategory.icon}`"
                style="width: 30px; margin-right: 0.5em"
              />
              Book {{ vendor.eventCategory.fullTitle }}
            </span>
            CHECKOUT
          </div>
          <div class="mt-20">
            {{ vendor.companyName }}
          </div>
          <div class="white-card p-40 font-size-22 font-bold mt-50 d-flex justify-content-between">
            <span>What does this proposal include?</span>
            <md-icon>keyboard_arrow_right</md-icon>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-55 right-panel">
        <div class="white-card">
          <checkout-price-table
            class="price-table"
            :proposal="proposal"
            :serviceCategory="proposal.vendor.vendorCategory"
            :key="`${proposal.vendor.vendorCategory}-section`"
          ></checkout-price-table>
          <checkout-price-table
            class="price-table"
            v-for="service in proposal.additionalServices"
            :proposal="proposal"
            :serviceCategory="service"
            :key="`secondary-${service}-section`"
          ></checkout-price-table>
          <div class="p-30" v-if="this.proposal.extraServices[this.vendor.eventCategory.key]">
            <div>Would you like to upgrade & add one of those?</div>
            <div class="mb-30" v-if="proposal.serviceCategory">
              You have $ {{ (proposal.serviceCategory.allocatedBudget - proposal.cost) | withComma }} left over from
              your original defined budget.
            </div>
            <div class="mt-10">
              Simply select anything that you would like to add. Please note that any item or service you choose here
              will be added to the overall vendor cost.
            </div>
            <collapse-panel
              :defaultStatus="false"
              class="pt-10 pb-10"
              v-for="service in this.proposal.extraServices[this.vendor.eventCategory.key].filter(
                (item) => !item.added && item.price,
              )"
              :key="service.subCategory"
            >
              <template slot="header">
                <div class="price-header d-flex align-center">
                  <md-checkbox class="m-0 mr-10" v-model="service.addedOnProposal"></md-checkbox>
                  <span>{{ service.requirementTitle }}</span>
                </div>
              </template>
              <template slot="content">
                <div class="price-table-content mt-20"></div>
              </template>
            </collapse-panel>
          </div>
        </div>
        <collapse-panel :defaultStatus="false" class="checkout-additional white-card mt-20">
          <template slot="header">
            <div class="price-header d-flex align-center">
              <md-checkbox class="m-0 mr-10" v-model="onDayCordinator"></md-checkbox>
              <img :src="`${$iconURL}PaymentPage/Group 9556.svg`" class="mr-10 ml-10" />
              On Day Cordinator($1,000 Per Day)
            </div>
          </template>
          <template slot="content">
            <div class="price-table-content mt-1">
              Make sure everything goes smoothly on the day with a professional Maryoku event coordinator, who will be
              fully briefed to ensure your event is a success. Fixed price service.
            </div>
          </template>
        </collapse-panel>
        <collapse-panel :defaultStatus="false" class="checkout-additional white-card mt-20">
          <template slot="header">
            <div class="price-header d-flex align-center disabled">
              <md-checkbox class="m-0 mr-10" :disabeld="true"></md-checkbox>
              Event Insurance (Coming Soon)
            </div>
          </template>
          <template slot="content">
            <div class="price-table-content"></div>
          </template>
        </collapse-panel>
        <collapse-panel :defaultStatus="false" class="checkout-additional white-card mt-20">
          <template slot="header">
            <div class="price-header d-flex align-center">
              <md-checkbox class="m-0 mr-10" v-model="checkedGiveBack"></md-checkbox>
              <img :src="`${$iconURL}PaymentPage/Group 9791.svg`" class="mr-10 ml-10" />
              Give Back
            </div>
          </template>
          <template slot="content">
            <div class="price-table-content give-back-seciont">
              <div class="mb-20 mt-20">
                Support sustainability and eco-friendly initiatives with a donation to an organization committed to
                environmental responsibility. Every donation will be matched by Maryoku.
              </div>
              <md-button class="md-simple edit-btn md-red color-red mt-20">
                Read More <md-icon>keyboard_arrow_right</md-icon>
              </md-button>
              <hr class="mt-20 mb-20" />
              <div>
                <md-checkbox class="md-red md-simple" v-model="isCheckedFoodDonate">
                  Donate your food leftovers
                </md-checkbox>
              </div>
              <div class="mb-20 d-flex">
                <img :src="`${$iconURL}PaymentPage/Image 211.png`" />
                <div class="ml-10">
                  Don’t let your leftover food go to waste! Maryoku collaborates with food rescue organizations that
                  would really appreciate your contribution, helping the community and the environment.
                </div>
              </div>
              <hr class="mt-20 mb-20" />
              <div>
                <md-checkbox class="md-red md-simple" v-model="cachMaryokuPoints">
                  Cash in Your Maryoku Points
                </md-checkbox>
              </div>
              <div class="mb-20 d-flex">
                <div class="ml-10">
                  If you’ve collected enough Maryoku reward points, why not exchange them for exclusive vendor perks?
                  Simply print out the voucher and enjoy the results!
                </div>
              </div>
              <md-button class="md-simple md-red edit-btn mt-20">
                Read more about this organisation
                <md-icon>keyboard_arrow_right</md-icon>
              </md-button>
            </div>
          </template>
        </collapse-panel>
        <collapse-panel :defaultStatus="false" class="checkout-additional white-card mt-20">
          <template slot="header">
            <div class="price-header d-flex align-center disabled">
              <md-checkbox class="m-0 mr-10"></md-checkbox>
              <img :src="`${$iconURL}common/reward.svg`" class="mr-10 ml-10" />
              Use your rewards with this event (Coming Soon)
            </div>
          </template>
          <template slot="content">
            <div class="price-table-content">123123</div>
          </template>
        </collapse-panel>
        <div class="total-price-panel mt-20 white-card">
          <div class="discount-row">
            <span class="font-bold">Discount </span>
            <span class="font-bold">{{ discount.percentage }}%</span>
            <span class="text-right">${{ discount.price | withComma }}</span>
          </div>
          <hr />
          <div class="discount-row">
            <span class="font-bold">Tax </span>
            <span class="font-bold">{{ tax.percentage }}%</span>
            <span class="text-right">${{ tax.price | withComma }}</span>
          </div>
          <div class="total-price-row">
            <div class="font-size-22 font-bold d-flex justify-content-between">
              <span>TOTAL TO PAY</span>
              <span>${{ discounedAndTaxedPrice | withComma }}</span>
            </div>
            <!-- <div class="font-size-14 d-flex justify-content-between">
              <span>TOTAL TO PAY</span>
              <span>${{ discounedAndTaxedPrice | withComma }}</span>
            </div> -->
          </div>
        </div>
        <div class="mt-40">
          <md-checkbox class="m-0" v-model="agreedCancellationPolicy">
            <span class="font-regular">I agree to the</span>
            <a href="#" class="font-bold color-black text-underline">Cancellation policy</a>
          </md-checkbox>
          <div class="d-flex align-center payment-methods">
            <md-button
              class="md-simple payment-method"
              @click="paymentMethod = 'payoneer'"
              :class="{ selected: paymentMethod === 'payoneer' }"
            >
              <img :src="`${$iconURL}PaymentPage/payoneer.png`" />
            </md-button>
            <md-button
              class="md-simple payment-method"
              @click="paymentMethod = 'paypal'"
              :class="{ selected: paymentMethod === 'paypal' }"
            >
              <img :src="`${$iconURL}PaymentPage/pay pal.png`" />
            </md-button>
            <md-button
              class="md-simple payment-method"
              @click="paymentMethod = 'stripe'"
              :class="{ selected: paymentMethod === 'stripe' }"
            >
              <img :src="`${$iconURL}PaymentPage/Stripe.png`" />
            </md-button>
          </div>
          <stripe-checkout v-if="showStripeCheckout" :price="stripePriceData"></stripe-checkout>
          <div>You will be transferred to a secured {{ paymentMethod }} payment</div>
        </div>
      </div>
    </div>
    <div class="checkout-footer white-card p-30 mt-30 d-flex justify-content-between">
      <md-button class="maryoku-btn md-simple md-black">Back</md-button>
      <md-button class="maryoku-btn md-red" :disabled="!agreedCancellationPolicy || !paymentMethod" @click="pay"
        >Submit Payment
      </md-button>
    </div>
    <success-modal v-if="showSuccessModal"></success-modal>
  </div>
</template>
<script>
import Vendor from "@/models/Vendors";
import Proposal from "@/models/Proposal";
import CheckoutPriceTable from "./CheckoutPriceTable.vue";
import CollapsePanel from "@/components/CollapsePanel.vue";
import StripeCheckout from "./StripeCheckout.vue";
import SuccessModal from "./SuccessModal.vue";
export default {
  components: { CheckoutPriceTable, CollapsePanel, StripeCheckout, SuccessModal },
  data() {
    return {
      vendor: null,
      proposal: null,
      loading: true,
      agreedCancellationPolicy: false,
      paymentMethod: "",
      checkedGiveBack: false,
      isCheckedFoodDonate: false,
      cachMaryokuPoints: false,
      stripePriceData: null,
      showStripeCheckout: false,
      loadingPayment: false,
      showSuccessModal: false,
      showCancelModal: false,
      onDayCordinator: false,
    };
  },
  created() {
    const proposalId = this.$route.params.proposalId;
    const vendorId = this.$route.params.vendorId;
    Vendor.find(vendorId).then((vendor) => {
      this.loading = false;
      this.vendor = vendor;
    });
    Proposal.find(proposalId).then((proposal) => {
      this.proposal = proposal;
    });
    console.log("this.$route", this.$route);
    if (this.$route.query.checkout === "success") {
      this.showSuccessModal = true;
    }
  },
  computed: {
    tax() {
      if (!this.proposal.taxes) return { percentage: 0, price: 0 };
      let tax = this.proposal.taxes["total"];
      if (!tax) {
        tax = { price: 0, percentage: 0 };
      }
      return tax;
    },
    discount() {
      if (!this.proposal.discounts) return { percentage: 0, price: 0 };
      let discount = this.proposal.discounts["total"];
      if (!discount) {
        discount = { price: 0, percentage: 0 };
      }
      return discount;
    },
    bundledDiscountPrice() {
      let bundledServicePrice = 0;
      if (!this.proposal.bundleDiscount.services) return 0;
      this.proposal.bundleDiscount.services.forEach((serviceCategory) => {
        const sumOfService = this.proposal.costServices[serviceCategory].reduce((s, service) => {
          if (service.isComplimentary) {
            return 0;
          }
          return s + service.requirementValue * service.price;
        }, 0);
        bundledServicePrice += sumOfService;
        // if (this.addedServices[serviceCategory]) {
        //   const sumOfService = this.addedServices[serviceCategory].reduce((s, service) => {
        //     if (service.isComplimentary) {
        //       return 0;
        //     }
        //     return s + service.requirementValue * service.price;
        //   }, 0);
        //   bundledServicePrice += sumOfService;
        // }
      });
      return (bundledServicePrice * this.proposal.bundleDiscount.percentage) / 100;
    },

    totalPriceOfProposal() {
      let totalPrice = 0;
      Object.keys(this.proposal.costServices).forEach((serviceCategory) => {
        const sumOfService = this.proposal.costServices[serviceCategory].reduce((s, service) => {
          if (service.isComplimentary) {
            return 0;
          }
          return s + service.requirementValue * service.price;
        }, 0);
        console.log("sumOFserive", sumOfService);
        totalPrice += sumOfService;
      });

      return totalPrice;
    },
    discounedAndTaxedPrice() {
      const eventDays = 1;
      const discounted =
        this.totalPriceOfProposal -
        (this.totalPriceOfProposal * this.discount.percentage) / 100 -
        this.bundledDiscountPrice;
      let price = discounted + (discounted * this.tax.percentage) / 100;
      if (this.onDayCordinator) {
        price += eventDays * 1000;
      }
      return price;
    },
  },
  methods: {
    pay() {
      if (this.paymentMethod === "stripe") {
        this.loadingPayment = true;
        this.$http
          .post(
            `${process.env.SERVER_URL}/stripe/v1/customer/products`,
            { name: this.vendor.companyName, price: Math.floor(this.discounedAndTaxedPrice * 100) },
            { headers: this.$auth.getAuthHeader() },
          )
          .then((res) => {
            console.log("res.data", res.data);
            const priceData = res.data;
            this.showStripeCheckout = true;
            // this.loadingPayment = false;
            this.stripePriceData = priceData;
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.event-vendor-checkout {
  .disabled {
    opacity: 0.5;
  }
  .checkout-content {
    margin: auto;
    max-width: 1600px;
    margin-top: 50px;
    .left-panel {
      height: 950px;
      max-width: 710px;
      position: relative;
      overflow: hidden;
      .background-section {
        width: 100%;
        height: 100%;
        position: absolute;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: white;
          opacity: 0.6;
        }
      }
      .content {
        width: 100%;
        height: 100%;
        position: absolute;
      }
    }
    .right-panel {
      .price-table:not(:last-child) {
        border-bottom: solid 2px #d4d4d4;
      }
      .checkout-additional {
        padding: 30px;
      }
      .total-price-panel {
        hr {
          margin: 0 30px;
        }
        .discount-row {
          margin: 0 30px;
          padding: 20px 0;
          display: grid;
          grid-template-columns: 100px 100px auto;
        }
        .total-price-row {
          color: white;
          font-weight: bolder;
          background-color: #404040;
          padding: 30px;
        }
      }
    }
  }
  .payment-methods {
    .payment-method {
      padding: 10px;
      height: 60px;
      &.selected {
        background-color: #ddd !important;
      }
    }
  }
}
</style>
