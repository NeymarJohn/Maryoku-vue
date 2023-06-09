<template>
  <div class="proposal-budget-summary-wrapper" :style="{ top: `${panelTopPos}px` }">
    <template v-if="render">
      <CollapsePanel :default-status="true" :spacing="0">
        <template slot="header">
          <div class="d-flex align-center title py-20 mr-30">
            <span class="font-bold font-size-22">Total</span>
            <span class="font-bold font-size-22 ml-auto">${{ totalPriceOfProposal | withComma }}</span>
          </div>
          <div
            v-if="defaultDiscount.percentage || negotiationDiscount.isApplied"
            class="d-flex align-center font-size-14 pb-20 mr-30"
          >
            <span> Before discount </span>
            <span class="ml-auto mr-10">{{ `(${defaultDiscount.percentage}% off)` }}</span>
            <span> ${{ totalBeforeDiscount | withComma }} </span>
          </div>
        </template>
        <template slot="content">
          <div class="summary-cont">
            <div
              v-if="additionalServices.length > 0 && step === 2"
              class="bundle-discount mt-20"
              @click="toggleBundleDiscount"
            >
              <img class="vendor" :src="`${iconUrl}Asset 579.svg`" >
              <span>
                {{ bundleDiscount && bundleDiscount.percentage ? "Edit Bundle Discount" : "Add Bundle Discount" }}
                <md-icon v-if="!isBundleDiscount">keyboard_arrow_right</md-icon>
                <md-icon v-else>keyboard_arrow_down</md-icon>
              </span>
              <p v-if="isBundleDiscount">
                What services would you like to include in your bundle?
              </p>
            </div>
          </div>
          <div class="items-cont">
            <div class="item">
              <div class="service-item" :class="{ 'with-check': isBundleDiscount }">
                <md-checkbox
                  v-if="isBundleDiscount"
                  v-model="bundleDiscountServices"
                  class="no-margin md-vendor"
                  :value="vendor.eventCategory.key"
                />
                <ul class="flex-1">
                  <li>
                    <img :src="`${iconUrl}Asset 614.svg`">
                    {{ vendor.eventCategory.title }}
                  </li>
                  <li>
                    <a :href="`/#/vendor-signup/edit/${vendor.id}`" target="_blank">{{ vendor.companyName }}</a>
                  </li>
                  <li>
                    <span>Your proposal</span>
                    <span>${{ originalPriceOfMainCategory | withComma }}</span>
                  </li>
                  <li :style="`margin: ${discountBlock[vendor.eventCategory.key] ? '' : '0'}`">
                    <template v-if="discountBlock[vendor.eventCategory.key]">
                      <div class="left">
                        <span>After discount</span>
                      </div>
                      <div class="right">
                        <span>{{ `(${bundleDiscountPercentage}% off)` }}</span>
                        <span>${{ pricesByCategory[vendor.vendorCategory] | withComma }}</span>
                      </div>
                    </template>
                  </li>
                  <li
                    v-if="
                      calculatedTotal(getRequirementsByCategory('venuerental')) -
                        newProposalRequest.eventData.allocatedBudget >
                        0
                    "
                  >
                    <img :src="`${$iconURL}Event Page/warning-circle-gray.svg`" style="width: 20px" class="mr-10">
                    Event Page/warning-circle-gray.svg"
                    <span>Your proposal is ${{
                      (calculatedTotal(getRequirementsByCategory("venuerental")) -
                        newProposalRequest.eventData.allocatedBudget)
                        | withComma
                    }}
                      more than the budget
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div v-if="step > 1 && additionalServices.length > 0" class="item additional">
              <div
                v-for="(a, aIndex) in additionalServices.filter((item) => pricesByCategory[item] > 0)"
                :key="aIndex"
                class="service-item"
                :class="{ 'with-check': isBundleDiscount }"
              >
                <h3 v-if="aIndex === 0" class="width-100">
                  Additional Services
                </h3>
                <md-checkbox
                  v-if="isBundleDiscount"
                  v-model="bundleDiscountServices"
                  class="no-margin md-vendor"
                  :value="a"
                />
                <ul>
                  <li>
                    <img :src="getIconUrlByCategory(a)" style="filter: brightness(0) invert(0);">
                    {{ getServiceCategory(a).title }}
                  </li>
                  <li>
                    <a :href="`/#/vendor-signup/edit/${vendor.id}`" target="_blank">{{ vendor.companyName }}</a>
                  </li>
                  <li>
                    <span>Your proposal</span>
                    <span>${{ pricesByCategory[a] | withComma }}</span>
                  </li>
                  <li />
                </ul>
              </div>

              <div v-if="isBundleDiscount" class="item bundle">
                <div class="bundle-header-description">
                  <img width="24" height="24" src="static/icons/Group%205280.svg">
                  <span>Creating a bundle, even if it’s only a small one, appeals to planners and can increase your chances of winning</span>
                </div>
                <div class="element">
                  <label class="">
                    <span class="font-bold">Add bundle new total</span> (current:{{ totalPriceForBundle | withComma }})
                  </label>
                  <money
                    v-model="bundleDiscountAmount"
                    v-bind="{
                      decimal: '.',
                      thousands: ',',
                      prefix: '$ ',
                      suffix: '',
                      precision: 2,
                      masked: false,
                    }"
                    class="bundle-discount-input"
                    @keyup.native="setBundleDiscountAmount(bundleDiscountAmount)"
                    @click.native="discountOption = 'amount'"
                  />
                </div>
                <div class="element">
                  <label class="font-bold">Or by percentage </label>
                  <money
                    v-model="bundleDiscountPercentage"
                    v-bind="{
                      decimal: '.',
                      thousands: ',',
                      prefix: '',
                      suffix: ' %',
                      precision: 2,
                      masked: false,
                    }"
                    class="bundle-discount-input"
                    @keyup.native="setBundleDiscountPercentage(bundleDiscountPercentage)"
                    @click.native="discountOption = 'percentage'"
                  />
                </div>
                <div class="element dis-value">
                  <span> ${{ bundleDiscountAmount.toFixed(2) }} Discount </span>
                </div>
                <div class="action-cont">
                  <a class="clear" @click="cancelBundle">Cancel</a>
                  <a class="add" @click="addBundleDiscount">Add bundle</a>
                </div>
              </div>
            </div>

            <ItemForm
              :default-discount="defaultDiscount"
              :default-negotiation="negotiationDiscount"
              :bundle-discount="bundleDiscount"
              :default-tax="defaultTax"
              field="discount"
              :non-maryoku="true"
              @saveDiscount="saveDiscount('discount', $event)"
            />
            <ItemForm
              v-if="negotiationDiscount && negotiationDiscount.isApplied"
              :default-discount="defaultDiscount"
              :default-negotiation="negotiationDiscount"
              :bundle-discount="bundleDiscount"
              :default-tax="defaultTax"
              field="negotiation"
              :custom-class="isNegotiation ? 'negotiation' : ''"
              :non-maryoku="true"
              @saveDiscount="saveDiscount('negotiation', $event)"
            />

            <ItemForm
              :default-discount="defaultDiscount"
              :default-negotiation="negotiationDiscount"
              :bundle-discount="bundleDiscount"
              :default-tax="defaultTax"
              field="tax"
              :non-maryoku="true"
              @saveDiscount="saveDiscount('tax', $event)"
            />
          </div>
          <div v-if="bundleDiscount && bundleDiscount.percentage" class="bundle-information">
            <div>
              <span>{{ bundledServicesString }}</span>
            </div>
            <div class="font-bold d-flex justify-content-between">
              <span>Total Bundle</span><span class="font-bold font-size-22">-${{ bundleDiscount.price | withComma }}</span>
            </div>
          </div>
          <div class="total-cont">
            <div class="price-row">
              <span class="title">Total</span>
              <strong>${{ Number(totalPriceOfProposal) | withComma }}</strong>
            </div>
            <div v-if="bundleDiscount.isApplied" class="price-row">
              <span>Before bundle discount</span>
              <div>
                <span>{{ `(${bundleDiscount.percentage}% off)` }}</span>
                <span class="crosslinedText">${{ Number(totalBeforeBundle) | withComma }}</span>
              </div>
            </div>
            <div v-if="defaultDiscount.percentage || negotiationDiscount.isApplied" class="price-row">
              <span>Before discount</span>
              <div>
                <span>{{ `(${defaultDiscount.percentage}% off)` }}</span>
                <span class="crosslinedText">${{ Number(totalBeforeDiscount) | withComma }}</span>
              </div>
            </div>
          </div>
        </template>
      </CollapsePanel>
    </template>
    <v-tour v-if="isNegotiation" name="discount" :steps="steps" :callbacks="callbacks">
      <template slot-scope="tour">
        <fade-transition>
          <v-step
            v-if="tour.steps[tour.currentStep]"
            :key="tour.currentStep"
            :step="tour.steps[tour.currentStep]"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
            :finish="tour.finish"
            class="white"
          >
            <div
              slot="header"
              class="d-flex align-center font-size-20 font-bold-extra justify-content-between"
              style="padding: 10px 20px"
            >
              {{ tour.steps[tour.currentStep].header.title }}
              <md-button class="md-simple md-icon-button" @click="tour.finish">
                <md-icon>close</md-icon>
              </md-button>
            </div>
            <div slot="actions" class="d-flex justify-content-between tour-actions">
              <md-button v-if="tour.isLast" class="md-button md-vendor maryoku-btn ml-auto" @click="tour.finish">
                Got it
              </md-button>
            </div>
          </v-step>
        </fade-transition>
      </template>
    </v-tour>
  </div>
</template>
<script>
import { categoryNameWithIcons } from "@/constants/vendor";
import { FadeTransition } from "vue2-transitions";
import { mapGetters } from "vuex";
import { Money } from "v-money";

const components = {
  CollapsePanel: () => import("@/components/CollapsePanel.vue"),
  ItemForm: () => import("../components/ItemForm.vue"),
};

export default {
  name: "ProposalBudgetSummary",
  components: {
    ...components,
    FadeTransition,
    Money,
  },
  props: {
    step: {
      type: Number,
      default: 0,
    },
    services: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isBundleDiscount: false,
      isEdit: false,
      isTaxEditing: false,
      warning: false,
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
      newProposalRequest: {
        eventData: {},
      },
      discountBlock: {},
      iconsWithCategory: null,
      panelTopPos: 0,
      bundleDiscountServices: [],
      bundleDiscountPercentage: 0,
      bundleDiscountAmount: 0,
      discountOption: "",
      render: true,
      steps: [
        {
          target: ".negotiation",
          header: {
            title: "You've approved the new rate",
          },
          content: "Remember, the new post-negotiation discount is separate from the original discount.",
          params: {
            placement: "left",
            enableScrolling: false,
          },
        },
      ],
      callbacks: {
        onFinish: this.closeTour,
      },
    };
  },
  computed: {
    ...mapGetters("proposalForNonMaryoku", [
      "finalPriceOfMainCategory",
      "pricesByCategory",
      "originalPriceOfMainCategory",
      "totalPriceByCategory",
      "totalPriceOfProposal",
      "totalBeforeDiscount",
      "totalBeforeBundle",
      "sumOfPrices",
    ]),
    proposalRequest() {
      return this.$store.state.proposalForNonMaryoku.proposalRequest;
    },
    proposal() {
      return this.$store.state.proposalForNonMaryoku;
    },
    isNegotiation() {
      return this.$store.state.proposalForNonMaryoku.isNegotiation;
    },
    event() {
      if (!this.proposalRequest) return {};
      return this.proposalRequest.eventData;
    },
    vendor() {
      return this.$store.state.proposalForNonMaryoku.vendor;
    },
    additionalServices() {
      return this.$store.state.proposalForNonMaryoku.additionalServices.filter(
        (category) => this.pricesByCategory[category] > 0,
      );
    },
    mainService() {
      const category = this.$store.state.proposalForNonMaryoku.vendor.eventCategory.key;
      const proposalServices = this.$store.state.proposalForNonMaryoku.proposalServices;
      if (!proposalServices[category]) {
        return {};
      }
      return proposalServices[category];
    },
    serviceCategories() {
      return this.$store.state.common.serviceCategories;
    },

    totalPrice() {
      return (
        this.totalPriceBeforeDiscount -
        (this.defaultDiscount ? this.defaultDiscount.price : 0) -
        (this.negotiationDiscount && this.negotiationDiscount.isApplied ? this.negotiationDiscount.price : 0) +
        (this.defaultTax ? this.defaultTax.price : 0) -
        (this.bundleDiscount.isApplied ? this.bundleDiscount.price : 0)
      );
    },
    totalPriceBeforeBundle() {
      return (
        this.totalPriceBeforeDiscount -
        (this.defaultDiscount ? this.defaultDiscount.price : 0) +
        (this.defaultTax ? this.defaultTax.price : 0) -
        (this.negotiationDiscount && this.negotiationDiscount.isApplied ? this.negotiationDiscount.price : 0)
      );
    },
    totalPriceBeforeDiscount() {
      let s = 0;
      Object.keys(this.totalPriceByCategory).forEach((category) => {
        s += this.totalPriceByCategory[category];
      });
      return s;
    },
    totalPriceForBundle() {
      let s = 0;
      Object.keys(this.pricesByCategory).forEach((category) => {
        if (this.bundleDiscountServices.includes(category)) {
          s += this.pricesByCategory[category];
        }
      });
      return s;
    },
    bundledServicesString() {
      let result = "";
      this.bundleDiscount.services.forEach((service, index) => {
        if (index !== 0) result += " + ";
        result += this.getServiceCategory(service).title;
      });
      return result;
    },
    defaultTax() {
      return this.$store.state.proposalForNonMaryoku.taxes["total"] || { percentage: 0, price: 0 };
    },
    defaultDiscount() {
      return this.$store.state.proposalForNonMaryoku.discounts["total"] || { percentage: 0, price: 0 };
    },
    negotiationDiscount() {
      return this.$store.state.proposalForNonMaryoku.negotiationDiscount || { percent: 0, price: 0, isApplied: false };
    },
    bundleDiscount() {
      return this.$store.state.proposalForNonMaryoku.bundleDiscount;
    },
  },
  watch: {
    defaultTax(newValue) {
      this.tax = newValue;
    },
    defaultDiscount(newValue) {
      this.discount = newValue;
    },
    step(newValue) {
      if (this.step === 3 && this.$store.state.proposalForNonMaryoku.negotiationDiscount)
        this.$tours["discount"].start();
      this.render = false;
      setTimeout((_) => {
        this.render = true;
      }, 100);
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    console.log('budget.summary', this.bundleDiscount);
    setTimeout((_) => {
      if (this.isNegotiation) this.$tours["discount"].start();
    }, 600);

    this.iconsWithCategory = Object.assign([], categoryNameWithIcons);

    this.$root.$on("update-proposal-budget-summary", (newProposalRequest, discountBlock) => {
      this.discountBlock = discountBlock;
    });

    this.$forceUpdate();
  },
  methods: {
    closeTour() {
      this.$store.commit("proposalForNonMaryoku/setNegotiation", false);
    },
    flatDeep(arr, d = 1) {
      return d > 0
        ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? this.flatDeep(val, d - 1) : val), [])
        : arr.slice();
    },
    servicesByCategory(category) {
      return this.$store.state.proposalForNonMaryoku.proposalServices[category] || [];
    },
    getIconUrlByCategory(category) {
      return `https://static-maryoku.s3.amazonaws.com/storage/icons/Services /${
        this.iconsWithCategory.filter((c) => c.value == category)[0].icon
      }`;
    },
    getRequirementsByCategory(category) {
      return this.$store.state.proposalForNonMaryoku.proposalServices[category] || [];
    },
    getRequirementsBySelectedCategory() {
      let selectedCategories = [];
      let selectedServices = [];

      selectedCategories = this.additionalServices.map((as) => as.value);
      selectedCategories.push("venuerental");

      this.services
        .filter((s) => selectedCategories.includes(s.name))
        .map(function(cs) {
          cs.categories.map(function(scs) {
            scs.subCategories.map(function(sscs) {
              sscs.items.map(function(ssscs) {
                selectedServices.push(ssscs.name);
              });
            });
          });
        });

      return this.newProposalRequest.requirements.filter((r) => selectedServices.includes(r.requirementTitle));
    },
    total(requirements, category = null) {
      let total = 0;
      let vm = this;

      if (!requirements || requirements.length == 0) return 0;
      total = requirements.reduce((sum, item) => {
        return sum + item.price * item.requirementValue;
      }, 0);
      return total;
    },
    calculatedTotal(requirements) {
      let total = this.total(requirements);
      if (this.discountBlock.value != undefined) {
        total = total - (total * this.discountBlock.value) / 100;
      }
      return total;
    },
    handleScroll(event) {
      if (window.scrollY - 327 >= 0) {
        this.panelTopPos = window.scrollY - 327;
      } else {
        this.panelTopPos = 0;
      }
    },
    addBundleDiscount() {
      this.discountBlock = {};
      this.bundleDiscountServices.forEach((category) => {
        this.discountBlock[category] = { value: this.bundleDiscountAmount };
      });
      this.isBundleDiscount = false;
      this.$store.commit("proposalForNonMaryoku/setBundleDiscount", {
        services: this.bundleDiscountServices,
        percentage: this.bundleDiscountPercentage,
        price: this.bundleDiscountAmount,
        isApplied: true,
      });
    },
    cancelBundle() {
      this.isBundleDiscount = false;
    },
    setBundleDiscountAmount(value) {
      if (!this.totalPriceForBundle) return;
      this.bundleDiscountPercentage = ((value / this.totalPriceForBundle) * 100).toFixed(2);
    },
    setBundleDiscountPercentage(value) {
      if (!this.totalPriceForBundle) return;
      if (value > 100) value = 100;
      if (value < 0) value = 0;
      this.bundleDiscountPercentage = value;
      this.bundleDiscountAmount = this.totalPriceForBundle * (value / 100);
    },
    getServiceCategory(category) {
      return this.serviceCategories.find((item) => item.key === category);
    },
    getAllocatedBudget(category) {
      return 0;
    },
    saveDiscount(field, discount) {
      if (field === "discount")
        this.$store.commit("proposalForNonMaryoku/setDiscount", { category: "total", discount });
      else if (field === "negotiation") this.$store.commit("proposalForNonMaryoku/setNegotiationDiscount", discount);
      else if (field === "tax")
        this.$store.commit("proposalForNonMaryoku/setTax", { category: "total", tax: discount });
    },
    stopTour() {
      const tourName = Object.keys(this.steps)[this.currentTourIndex];
      this.$tours[tourName].stop();
    },
    toggleBundleDiscount() {
      this.isBundleDiscount = !this.isBundleDiscount;
    },
  },
  destoryed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="scss" scoped>
.proposal-budget-summary-wrapper {
  font-family: "Manrope-Regular", sans-serif;
  text-align: left;
  color: #050505;
  border-radius: 3px;
  padding: 0px 25px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background: #ffffff;
  // position: absolute;
  // width: calc(100% - 2rem);
  .proposal-budget-summary-header {
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
    flex: 1;

    .icon {
      font-size: 35px !important;
    }
  }

  .bundle-discount-input {
    width: 100%;
    font-size: 16px;
    color: #707070;
    border-color: #c9c9c9;
  }

  .bundle-information {
    background-color: #ffedb7;
    margin: auto -25px;
    padding: 25px;
  }

  .summary-cont {
    h3 {
      font-size: 30px;
      font-weight: 800;
      margin: 0;
      margin-right: 82px;
    }

    p {
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 33px;

      strong {
        font-size: 16px;
        font-weight: 800;
      }
    }

    .bundle-discount {
      padding-bottom: 35px;
      cursor: pointer;

      img {
        width: 30px;
        margin-right: 1em;

        &.black {
          filter: brightness(0) invert(0);
        }
        &.vendor {
          filter: invert(5%) sepia(53%) saturate(451%) hue-rotate(327deg) brightness(54%) contrast(91%);
        }
      }

      span {
        font-size: 16px;
        font-weight: bold;
        color: #641856;

        i {
          color: #641856;
          position: relative;
          top: -1px;
        }
      }

      p {
        margin: 12px 32px 0 44px;
        font-size: 14px;
      }
    }
  }

  .items-cont {
    .item {
      h3 {
        margin-top: 0;
        margin-bottom: 23px;
        color: #ffc001;
        font-size: 20px;
        font-weight: 800;
      }

      &.additional .service-item {
        margin-bottom: 0;
        border-bottom: 1px solid #333333 !important;
      }

      &.tax {
        color: #818080;

        .service-item {
          display: grid;
          grid-template-columns: 30% 30% 30% 10%;
        }
      }

      .service-item {
        border-top: solid 1px #d3d3d3;
        padding: 30px 0;

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          flex-grow: 1;

          li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 14px;

            a {
              color: #641856;
            }

            &:first-child {
              display: block;
              font: 800 16px "Manrope-Regular", sans-serif;

              img {
                width: 28px;
                height: 28px;
                margin-right: 0.5rem;
              }
            }

            &:nth-child(2) {
              font-size: 14px;
              font-weight: 800;
              text-decoration: underline;
            }

            &:nth-child(3) {
              font-size: 14px;
              color: #050505;

              span {
                &:last-child {
                  font-size: 20px;
                  font-weight: 800;
                }
              }
            }

            &:nth-child(4) {
              color: #818080;
              margin-bottom: 15px;
              font-size: 14px;
              display: flex;
              justify-content: space-between;

              .left {
                flex: 1;
                text-align: left;
              }

              .right {
                flex: 1;
                text-align: right;

                span {
                  color: #707070;

                  &:last-child {
                    text-decoration: line-through;
                  }
                }
              }
            }

            &:last-child {
              justify-content: flex-start;
              text-align: left;
              margin-bottom: 0;

              i {
                color: #ffe5ec;
                margin: 0;
                margin-right: 8px;
              }

              span {
                font-size: 14px;
              }
            }
          }

          &:last-child {
            margin: 0;
            padding: 0;
          }
        }
      }

      // &.additional {
      //   // margin: 0 -25px;
      //   border-top: solid 1px #d3d3d3;
      //   padding: 30px 0;
      // }

      &.bundle {
        margin: 0 -25px;
        padding: 33px 25px;

        .bundle-header-description {
          display: flex;
          align-items: flex-start;
          margin-bottom: 40px;

          img {
            margin-right: 15px;
          }
        }

        .element {
          margin-bottom: 22px;
          width: 75%;

          &.dis-value {
            background-color: #ffedb7;
            border-radius: 3px;
            padding: 11px 10px;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
          }
        }

        .action-cont {
          text-align: right;
          margin-top: 40px;

          a {
            font-size: 16px;
            font-weight: 800;
            cursor: pointer;

            &.clear {
              color: #050505;
              padding: 8px 32px;
              margin-right: 1em;
            }

            &.add {
              background-color: #641856;
              border-radius: 3px;
              padding: 8px 32px;
              color: #ffffff;
            }
          }
        }
      }
    }

    .with-check {
      display: flex;
      margin-bottom: 20px;
      flex-wrap: wrap;

      .no-margin {
        margin: 0 10px 0 0 !important;
      }
    }
  }

  .total-cont {
    padding: 34px 25px;
    background: #404040;
    margin: auto -25px;
    color: #ffffff;

    .price-row {
      display: flex;
      justify-content: space-between;

      .title {
        color: #ffffff;
        font: 800 22px "Manrope-Regular", sans-serif;

        span {
          font: normal 14px "Manrope-Regular", sans-serif;
        }
      }

      .price {
        text-align: right;
        font: normal 14px "Manrope-Regular", sans-serif;

        strong {
          font: 800 22px "Manrope-Regular", sans-serif;
          margin-bottom: 6px;
          display: inline-block;
        }

        span {
          &:last-child {
            text-decoration: line-through;
          }
        }
      }
    }

    &.isEdit {
      background-color: #ffedb7;
      color: #050505;

      .title {
        color: #050505;
      }
    }
  }
}
</style>
