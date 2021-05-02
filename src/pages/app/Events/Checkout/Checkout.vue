<template>
  <div class="event-vendor-checkout">
    <vue-element-loading :active="loading" spinner="ring" color="#FF547C" />
    <div class="checkout-content md-layout" v-if="!loading">
      <div class="md-layout-item md-size-45 left-panel">
        <div class="background-section" :style="`background: url(${vendor.images[0]}) `"></div>
        <div class="content p-50">
          <div class="font-size-30">
            <span class="font-bold">
              <img
                :src="`${$iconURL}Budget+Elements/${vendor.eventCategory.icon}`"
                style="width: 30px; margin-right: 0.5em"
              />
              Book {{ vendor.eventCategory.fullTitle }}</span
            >
            CHECKOUT
          </div>
          <div class="mt-20">
            {{ vendor.companyName }}
          </div>
          <div class="white-card p-40 font-size-22 font-bold mt-50 d-flex justify-content-between">
            <span>What Do We Include In this Proposal?</span>
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
          <div class="p-30">
            <div>Would you like to upgrade & add one of those?</div>
            <div>You have $ 180 left over from the budget you reserved</div>
            <collapse-panel :defaultStatus="false" class="pt-10 pb-10 mt-30">
              <template slot="header">
                <div class="price-header d-flex align-center">
                  <md-checkbox class="m-0 mr-10"></md-checkbox>
                  <span>Valet service</span>
                </div>
              </template>
              <template slot="content">
                <div class="price-table-content">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                </div>
              </template>
            </collapse-panel>
            <collapse-panel :defaultStatus="false" class="pt-10 pb-10">
              <template slot="header">
                <div class="price-header d-flex align-center">
                  <md-checkbox class="m-0 mr-10"></md-checkbox>Babysitting service X3
                </div>
              </template>
              <template slot="content">
                <div class="price-table-content">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                </div>
              </template>
            </collapse-panel>
          </div>
        </div>
        <collapse-panel :defaultStatus="false" class="checkout-additional white-card mt-20">
          <template slot="header">
            <div class="price-header">On Day Cordinator</div>
          </template>
          <template slot="content">
            <div class="price-table-content">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
            </div>
          </template>
        </collapse-panel>
        <collapse-panel :defaultStatus="false" class="checkout-additional white-card mt-20">
          <template slot="header">
            <div class="price-header d-flex align-center">
              <md-checkbox class="m-0 mr-10"></md-checkbox>
              Event Insurance
            </div>
          </template>
          <template slot="content">
            <div class="price-table-content">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
            </div>
          </template>
        </collapse-panel>
        <collapse-panel :defaultStatus="false" class="checkout-additional white-card mt-20">
          <template slot="header">
            <div class="price-header d-flex align-center">
              <md-checkbox class="m-0 mr-10"></md-checkbox>
              <img :src="`${$iconURL}common/reward.svg`" class="mr-10 ml-10" />
              Give Back
            </div>
          </template>
          <template slot="content">
            <div class="price-table-content">123123</div>
          </template>
        </collapse-panel>
        <collapse-panel :defaultStatus="false" class="checkout-additional white-card mt-20">
          <template slot="header">
            <div class="price-header d-flex align-center">
              <md-checkbox class="m-0 mr-10"></md-checkbox>
              <img :src="`${$iconURL}common/reward.svg`" class="mr-10 ml-10" />
              Use your rewards with this event
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
            <div class="font-size-14 d-flex justify-content-between">
              <span>TOTAL TO PAY</span>
              <span>${{ discounedAndTaxedPrice | withComma }}</span>
            </div>
          </div>
        </div>
        <div class="mt-40">
          <md-checkbox class="m-0">I agree to the Cancellation policy</md-checkbox>
          <div>You will be transferred to a secured Payoneer payment</div>
        </div>
      </div>
    </div>
    <div class="checkout-footer white-card p-30 mt-30 d-flex justify-content-between">
      <md-button class="maryoku-btn md-simple md-black">Back</md-button>
      <md-button class="maryoku-btn md-red">Submit Payment </md-button>
    </div>
  </div>
</template>
<script>
import Vendor from "@/models/Vendors";
import Proposal from "@/models/Proposal";
import CheckoutPriceTable from "./CheckoutPriceTable.vue";
import CollapsePanel from "@/components/CollapsePanel.vue";
export default {
  components: { CheckoutPriceTable, CollapsePanel },
  data() {
    return {
      vendor: null,
      proposal: null,
      loading: true,
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
  },
  computed: {
    tax() {
      if (!this.proposal.taxes) return { percentage: 0, price: 0 };
      let tax = this.proposal.taxes["total"];
      if (!tax) {
        tax = { price: 0, percentage: 0 };
      }
      console.log("tax", tax);
      return tax;
    },
    discount() {
      if (!this.proposal.discounts) return { percentage: 0, price: 0 };
      let discount = this.proposal.discounts["total"];
      if (!discount) {
        discount = { price: 0, percentage: 0 };
      }
      console.log("discount", discount);
      return discount;
    },
    bundledDiscountPrice() {
      let bundledServicePrice = 0;
      this.proposal.bundleDiscount.services.forEach((serviceCategory) => {
        const sumOfService = this.proposal.costServices[serviceCategory].reduce((s, service) => {
          if (service.isComplimentary) {
            return 0;
          }
          return s + service.requirementValue * service.price;
        }, 0);
        bundledServicePrice += sumOfService;
        if (this.addedServices[serviceCategory]) {
          const sumOfService = this.addedServices[serviceCategory].reduce((s, service) => {
            if (service.isComplimentary) {
              return 0;
            }
            return s + service.requirementValue * service.price;
          }, 0);
          bundledServicePrice += sumOfService;
        }
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

      // console.log(this.addedServices);
      // // added service item price
      // Object.keys(this.addedServices).forEach((serviceCategory) => {
      //   const sumOfService = this.addedServices[serviceCategory].reduce((s, service) => {
      //     return s + service.requirementValue * service.price;
      //   }, 0);
      //   console.log("sumOFserive", sumOfService);
      //   totalPrice += sumOfService;
      // });
      return totalPrice;
    },
    discounedAndTaxedPrice() {
      const discounted =
        this.totalPriceOfProposal -
        (this.totalPriceOfProposal * this.discount.percentage) / 100 -
        this.bundledDiscountPrice;
      return discounted + (discounted * this.tax.percentage) / 100;
    },
  },
};
</script>
<style lang="scss" scoped>
.event-vendor-checkout {
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
}
</style>