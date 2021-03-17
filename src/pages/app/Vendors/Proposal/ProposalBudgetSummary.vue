<template>
  <div class="proposal-budget-summary-wrapper" :style="{ top: `${panelTopPos}px` }">
    <div class="summary-cont">
      <h3>
        You're the {{ newProposalRequest.bidderRank | numeral("Oo") }}
        <span class="text-transform-lowercase">{{ vendor.eventCategory.title }}</span> bidder
      </h3>
      <p v-if="newProposalRequest.bidderRank > 1">
        Proposals range:
        <strong>
          ${{ newProposalRequest.bidRange.low | withComma }} - ${{ newProposalRequest.bidRange.high | withComma }}
        </strong>
      </p>
      <div
        class="bundle-discount mt-20"
        @click="isBundleDiscount = !isBundleDiscount"
        v-if="additionalServices.length > 0 && step === 2"
      >
        <img :src="`${iconUrl}Asset 579.svg`" />
        <span>
          Add Bundle Discount
          <md-icon v-if="!isBundleDiscount">keyboard_arrow_right</md-icon>
          <md-icon v-else>keyboard_arrow_down</md-icon>
        </span>
        <p v-if="isBundleDiscount">What services would you like to include in your bundle?</p>
      </div>
    </div>
    <div class="items-cont">
      <div class="item">
        <div class="service-item" :class="{ 'with-check': isBundleDiscount }">
          <md-checkbox
            v-if="isBundleDiscount"
            class="no-margin"
            :value="vendor.eventCategory.key"
            v-model="bundleDiscountServices"
          />
          <ul class="flex-1">
            <li>
              <img :src="`${iconUrl}Asset 614.svg`" />
              {{ vendor.eventCategory.title }}
            </li>
            <li>
              <a :href="`/#/vendor-signup/edit/${vendor.id}`" target="_blank">{{ vendor.companyName }}</a>
            </li>
            <li>
              <span>Your proposal</span>
              <span>${{ ((finalPriceOfMainCategory * (100 - bundleDiscountPercentage)) / 100) | withComma }}</span>
            </li>
            <li>
              <span>Budget for {{ getServiceCategory(vendor.eventCategory.key).title }} &nbsp;</span>
              <span>
                ${{
                  event.components.find((item) => item.componentId == vendor.eventCategory.key).allocatedBudget
                    | withComma
                }}</span
              >
            </li>
            <li v-if="finalPriceOfMainCategory - getAllocatedBudget(vendor.eventCategory.key) > 0" class="color-black">
              <span>
                <img :src="`${$iconURL}Event Page/warning-circle-gray.svg`" style="width: 20px" class="mr-10" />
                Your proposal is ${{
                  (finalPriceOfMainCategory - getAllocatedBudget(vendor.eventCategory.key)) | withComma
                }}
                more than budget
              </span>
            </li>
            <li :style="`margin: ${discountBlock[vendor.eventCategory.key] ? '' : '0'}`">
              <template v-if="discountBlock[vendor.eventCategory.key]">
                <div class="left">
                  <span>Before discount</span>
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
              <md-icon>error</md-icon>
              <span
                >Your proposal is ${{
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
      <div class="item additional" v-if="step > 1 && additionalServices.length > 0">
        <div
          class="service-item"
          :class="{ 'with-check': isBundleDiscount }"
          v-for="(a, aIndex) in additionalServices"
          :key="aIndex"
        >
          <h3 class="width-100" v-if="aIndex === 0">Additional Services</h3>
          <md-checkbox v-if="isBundleDiscount" class="no-margin" v-model="bundleDiscountServices" :value="a" />
          <ul>
            <li>
              <img :src="getIconUrlByCategory(a)" />
              {{ getServiceCategory(a).title }}
            </li>
            <li>
              <a :href="`/#/vendor-signup/edit/${vendor.id}`" target="_blank">{{ vendor.companyName }}</a>
            </li>
            <li>
              <span>Your proposal</span>
              <span>${{ pricesByCategory[a] | withComma }}</span>
            </li>
            <li>
              <span>Budget for {{ getServiceCategory(a).title }} &nbsp;</span>
              <span> ${{ event.components.find((item) => item.componentId == a).allocatedBudget | withComma }}</span>
            </li>
            <li v-if="calculatedTotal(getRequirementsByCategory(a)) - newProposalRequest.eventData.allocatedBudget > 0">
              <md-icon>error</md-icon>
              <span
                >Your proposal is ${{
                  (calculatedTotal(getRequirementsByCategory(a.value)) - newProposalRequest.eventData.allocatedBudget)
                    | withComma
                }}
                more than the budget</span
              >
            </li>
          </ul>
        </div>
      </div>
      <discount-form
        :totalPrice="originalPriceOfMainCategory"
        :defaultTax="$store.state.vendorProposal.taxes[vendor.eventCategory.key]"
        :defaultDiscount="$store.state.vendorProposal.discounts[vendor.eventCategory.key]"
        @saveDiscount="saveDiscount(vendor.eventCategory.key, ...arguments)"
        @saveTax="saveTax(vendor.eventCategory.key, ...arguments)"
      ></discount-form>
      <div class="item bundle" v-if="isBundleDiscount">
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
            @keyup.native="setPercentage"
            @click.native="discoutOption = 'amount'"
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
            @keyup.native="setRange"
            @click.native="discoutOption = 'percentage'"
          />
        </div>
        <div class="element dis-value">
          <span v-if="discoutOption == 'percentage'"> {{ bundleDiscountPercentage }}% </span>
          <span v-else> ${{ bundleDiscountAmount }} </span>
        </div>
        <div class="action-cont">
          <a class="clear" @click="cancelBundle">Cancel</a>
          <a class="add" @click="addBunldDiscount">Add bundle</a>
        </div>
      </div>
    </div>
    <div class="bundle-information" v-if="bundleDiscount && bundleDiscount.discountPercentage">
      <div>
        <span>{{ bundledServicesString }}</span>
      </div>
      <div class="font-bold d-flex justify-content-between">
        <span>Total Bundle</span><spanB class="font-bold font-size-22">${{ bundleDiscount.discountAmount }}</spanB>
      </div>
    </div>
    <div class="total-cont isEdit" v-if="isEdit">
      <div class="title">
        Total
        <br />
        <span>Before discount</span>
      </div>
      <div class="price">
        <strong>$800</strong>
        <br />$1100
        <span>(10% off)</span>
        <span>$1100</span>
      </div>
    </div>
    <div class="total-cont" v-else>
      <div class="title">
        Total
        <br />
        <span v-if="discountBlock.value">Before discount</span>
      </div>
      <div class="price">
        <strong>${{ (totalPrice - bundleDiscountAmount) | withComma }}</strong>
        <br />
        <span v-if="bundleDiscountPercentage">{{ `(${bundleDiscountPercentage}% off)` }}</span>
        <span v-if="bundleDiscountAmount">${{ totalPrice | withComma }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import VendorService from "@/services/vendor.service";
import InputProposalSubItem from "@/components/Inputs/InputProposalSubItem.vue";
import { Money } from "v-money";
import { mapGetters } from "vuex";
import DiscountForm from "../components/DiscountForm.vue";

export default {
  name: "proposal-budget-summary",
  components: {
    InputProposalSubItem,
    Money,
    DiscountForm,
  },
  props: {
    // bundleDiscount: Boolean,
    // additional: Boolean,
    // warning: Boolean,
    // isEdit: Boolean,
    step: Number,
    services: Array,
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
      // additionalServices: [],
      iconsWithCategory: null,
      panelTopPos: 0,
      bundleDiscountServices: [],
      bundleDiscountPercentage: 0,
      bundleDiscountAmount: 0,
      discoutOption: "",
    };
  },
  methods: {
    flatDeep(arr, d = 1) {
      return d > 0
        ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? this.flatDeep(val, d - 1) : val), [])
        : arr.slice();
    },
    servicesByCategory(category) {
      // const services = this.services.filter((s) => s.name == category);

      // if (services.length > 0) {
      //   return this.flatDeep(
      //     services[0].categories.map((s) => s.subCategories.map((sc) => sc.items.map((dd) => dd.name))),
      //     Infinity,
      //   );
      // } else {
      //   return [];
      // }
      return this.$store.state.vendorProposal.proposalServices[category] || [];
    },
    getIconUrlByCategory(category) {
      return `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/${
        this.iconsWithCategory.filter((c) => c.value == category)[0].icon
      }`;
    },
    getRequirementsByCategory(category) {
      return this.$store.state.vendorProposal.proposalServices[category] || [];
    },
    getRequirementsBySelectedCategory() {
      let selectedCategories = [];
      let selectedServices = [];

      selectedCategories = this.additionalServices.map((as) => as.value);
      selectedCategories.push("venuerental");

      this.services
        .filter((s) => selectedCategories.includes(s.name))
        .map(function (cs) {
          cs.categories.map(function (scs) {
            scs.subCategories.map(function (sscs) {
              sscs.items.map(function (ssscs) {
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
      // console.log("requirements", requirements);
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
    addBunldDiscount() {
      this.discountBlock = {};
      this.bundleDiscountServices.forEach((category) => {
        this.discountBlock[category] = { value: this.bundleDiscountAmount };
      });
      this.isBundleDiscount = false;
      this.$store.commit("vendorProposal/setBundleDiscount", {
        services: this.bundleDiscountServices,
        discountPercentage: this.bundleDiscountPercentage,
        discountAmount: this.bundleDiscountAmount,
        isApplied: true,
      });
    },
    cancelBundle() {
      this.isBundleDiscount = false;
    },
    setRange() {
      if (this.bundleDiscountPercentage > 100) {
        this.bundleDiscountPercentage = 100;
      }
      this.bundleDiscountAmount = this.totalPriceForBundle * (this.bundleDiscountPercentage / 100);
    },
    setPercentage() {
      this.bundleDiscountPercentage = (this.bundleDiscountAmount / this.totalPriceForBundle) * 100;
    },
    getServiceCategory(category) {
      return this.serviceCategories.find((item) => item.key === category);
    },
    getAllocatedBudget(category) {
      const allocatedBudgetItem = this.proposalRequest.eventData.components.find(
        (item) => item.componentId === category,
      );
      return allocatedBudgetItem.allocatedBudget;
    },
    saveDiscount(categoryKey, discount) {
      this.$store.commit("vendorProposal/setDiscount", { category: categoryKey, discount: discount });
    },
    saveTax(categoryKey, tax) {
      this.$store.commit("vendorProposal/setTax", { category: categoryKey, tax: tax });
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destoryed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.newProposalRequest = this.proposalRequest;
    this.iconsWithCategory = VendorService.categoryNameWithIcons();

    this.$root.$on("update-proposal-budget-summary", (newProposalRequest, discountBlock) => {
      this.newProposalRequest = newProposalRequest;
      this.discountBlock = discountBlock;
    });

    this.$forceUpdate();
    this.tax = this.$store.state.vendorProposal.taxes[this.vendor.eventCategory.key];
    if (!this.tax) this.tax = 0;
    this.discount = this.$store.state.vendorProposal.discounts[this.vendor.eventCategory.key];
    if (!this.discount) {
      this.discount = {
        percentage: 0,
        price: 0,
      };
    } else if (!this.discount.price) {
      this.discount.price = ((this.totalPrice * this.discount.percentage) / 100).toFixed(0);
    }
  },
  computed: {
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
    event() {
      if (!this.proposalRequest) return {};
      return this.proposalRequest.eventData;
    },
    vendor() {
      return this.$store.state.vendorProposal.vendor;
    },
    additionalServices() {
      return this.$store.state.vendorProposal.additionalServices;
    },
    mainService() {
      const category = this.$store.state.vendorProposal.vendor.eventCategory.key;
      const proposalServices = this.$store.state.vendorProposal.proposalServices;
      if (!proposalServices[category]) {
        return {};
      }
      return proposalServices[category];
    },
    serviceCategories() {
      return this.$store.state.common.serviceCategories;
    },
    ...mapGetters("vendorProposal", [
      "finalPriceOfMainCategory",
      "pricesByCategory",
      "originalPriceOfMainCategory",
      "totalPriceByCategory",
    ]),
    totalPrice() {
      let s = 0;
      Object.keys(this.pricesByCategory).forEach((category) => {
        s += this.pricesByCategory[category];
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
    bundleDiscount() {
      return this.$store.state.vendorProposal.bundleDiscount;
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
      return this.$store.state.vendorProposal.taxes[this.vendor.eventCategory.key];
    },
    defaultDiscount() {
      return (this.discount = this.$store.state.vendorProposal.discounts[this.vendor.eventCategory.key]);
    },
  },
  watch: {
    defaultTax(newValue) {
      this.tax = newValue;
    },
    defaultDiscount(newValue) {
      this.discount = newValue;
    },
  },
};
</script>
<style lang="scss" scoped>
.proposal-budget-summary-wrapper {
  font-family: "Manrope-Regular", sans-serif;
  text-align: left;
  color: #050505;
  border-radius: 3px;
  padding: 43px 25px 0;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background: #ffffff;
  // position: absolute;
  // width: calc(100% - 2rem);
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
      }
      span {
        font-size: 16px;
        font-weight: bold;
        color: #f51355;
        i {
          color: #f51355;
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

        .element {
          margin-bottom: 22px;
          width: 75%;

          &.dis-value {
            background-color: #ffedb7;
            border-radius: 3px;
            padding: 11px 90px;
            font-size: 14px;
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
              background-color: #f51355;
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
