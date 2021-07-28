<template>
  <div class="requirements-cart">
    <div class="requirements-cart-header">
      <div>
        <span class="text-transform-uppercase font-bold font-size-20">Your Choices</span>
        <div>
            Our vendors will create proposals based on your choices below, so be sure to select everything you really want. If you leave a category blank, it means you’re happy leaving it up to the vendor’s discretion (which can lead to more back-and-forth later on).
        </div>
      </div>
      <progress-radial-bar :value="percentOfBudgetCategories" :total="event.components.length"></progress-radial-bar>

      <md-button class="md-simple close-btn" @click="close">
        <md-icon>close</md-icon>
      </md-button>
    </div>
    <div>
      <vsa-list>
        <vsa-item v-for="item in cartItems" :key="item.key">
          <vsa-heading>
            <img :src="`${$iconURL}Budget+Elements/${item.icon}`" class="category-icon" />
            {{ item.fullTitle }}
          </vsa-heading>
          <vsa-content>
            <table width="100%">
                <tr v-for="(price, subCategory) in cart[item.key].proposal.pricesByCategory"
                    :key="`price-${subCategory}`"
                    class="d-flex align-center mb-30"
                >
                    <td width="30%">
                        <img :src="`${$iconURL}Budget+Elements/${serviceCategories.find(it => it.key == subCategory).icon}`" style="width: 20px"/>
                        <span class="ml-10 font-size-14 font-bold-extra">{{serviceCategories.find(it => it.key == subCategory).fullTitle }}</span>
                    </td>
                    <td width="40%">
                        <span class="color-black-middle font-size-14 font-bold-extra">For Whole Event</span>
                    </td>
                    <td width="20%">
                        ${{price | withComma}}
                    </td>
                    <td width="10%">
                        <md-button class="md-simple edit-btn p-10"><md-icon>more_vert</md-icon></md-button>
                    </td>
                </tr>

                <tr class="d-flex align-center">
                    <td class="ml-30 font-size-14 font-bold-extra" width="70%">Total</td>
                    <td class="ml-auto mr-20" width="30%">${{cart[item.key].proposal.cost | withComma}}</td>
                </tr>
            </table>
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>
  </div>
</template>
<script>
import { VsaList, VsaItem, VsaHeading, VsaContent, VsaIcon } from "vue-simple-accordion";
import "vue-simple-accordion/dist/vue-simple-accordion.css";
import ProgressRadialBar from "./components/ProgressRadialBar";
import RequirementTagItem from "./components/RequirementTagItem.vue";
import _ from "underscore";

export default {
  components: {
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon,
    ProgressRadialBar,
    RequirementTagItem,
  },
  data() {
    return {
      listOfItems: [
        { heading: "Venue", content: "ASFASDFAs" },
        { heading: "Catering", content: "ASFASDFAs" },
        { heading: "Photography", content: "ASFASDFAs" },
      ],
      subCategorySections: [],
    };
  },
  created() {
    // this.subCategorySections = Object.keys(this.subCategory);
    // this.subCategorySections = this.subCategorySections.filter(
    //   (item) => item !== "multi-selection" && item !== "special",
    // );
  },
  methods: {
    close() {
      this.$emit("close");
    },
    removeSelectedType(type) {
      console.log(type);
    },
    hasBudget(categoryKey) {
      return !!this.event.components.find((item) => item.componentId == categoryKey);
    },
  },

  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    cartItems() {
      const categoryKeys = Object.keys(this.$store.state.planningBoard.cart);
      const cartItems = [];
      categoryKeys.forEach((categoryKey) => {
        const category = this.$store.state.common.serviceCategories.find((item) => item.key === categoryKey);
        if (category) {
            cartItems.push(category);
        }
      });
      cartItems.sort((a, b) => a.order - b.order);
      return cartItems;
    },
    serviceCategories() {
      return this.$store.state.common.serviceCategories;
    },
    cart() {
      return this.$store.state.planningBoard.cart;
    },
    percentOfBudgetCategories() {
      return Object.keys(this.cart).length;
    },
  },
};
</script>
<style lang="scss" scoped>
.requirements-cart {
  position: fixed;
  width: 600px;
  height: 100vh;
  background-color: white;
  top: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  overflow: auto;
  .category-icon {
    width: 30px;
  }
  &-header {
    padding: 40px;
    display: flex;

    .close-btn {
      position: absolute;
      top: 10px;
      right: 0px;
    }
  }
  .vsa-list {
    --vsa-heading-padding: 1rem 2.5rem;
    --vsa-content-padding: 1rem 2.5rem;
    border: none;
    .vsa-item {
      border: none;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      margin-top: 8px;
    }
    /deep/ .vsa-item__heading {
      border: none;
      cursor: pointer;
      .vsa-item__trigger {
        background-color: white;
        color: black;
      }
    }
    /deep/ .vsa-item__trigger__icon--is-default:after,
    /deep/ .vsa-item__trigger__icon--is-default:before {
      content: "";
      height: 2px;
      position: absolute;
      top: 0px;
      transition: all 0.13333s ease-in-out;
      width: 16px;
      background-color: #818080;
    }
    /deep/ .vsa-item__trigger__icon--is-default:after {
      transform: rotate(-50deg) translate3d(-24px, 14px, 0);
    }
    /deep/ .vsa-item__trigger__icon--is-default:before {
      transform: rotate(50deg) translate3d(24px, 14px, 0);
    }
    /deep/ .vsa-item--is-active {
      .vsa-item__trigger__icon--is-default {
        transform: rotate(-180deg);
      }
    }
  }
  .requirement-grid {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    .requirement-item {
      margin-bottom: 20px;
      text-transform: capitalize;
      padding-right: 15px;
      min-width: 30%;
      padding-right: 20px;
      display: inline-block;
    }
  }
  .checkmark {
    display: inline-block;
    margin-right: 5px;
    margin-top: 0.4em;
    &:after {
      /*Add another block-level blank space*/
      content: "";
      display: block;

      /*Make it a small rectangle so the border will create an L-shape*/
      width: 6px;
      height: 10px;

      /*Add a white border on the bottom and left, creating that 'L' */
      border: solid #f51355;
      border-width: 0 3px 3px 0;
      border-radius: 1px;

      /*Rotate the L 45 degrees to turn it into a checkmark*/
      transform: rotate(45deg);
    }
  }
}
</style>
