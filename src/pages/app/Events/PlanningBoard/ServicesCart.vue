<template>
  <div class="services-cart">
    <div class="services-cart-header">
      <div class="font-size-18 font-bold-extra">
        {{ `MY CART (${cartItems.length} ITEM${cartItems.length > 1 ? "S" : ""})` }}
      </div>

      <md-button class="md-simple close-btn" @click="close">
        <md-icon>close</md-icon>
      </md-button>
    </div>
    <div>
      <ServiceCartItem
        v-for="item in cartItems"
        :key="item.key"
        :proposal="cart[item.key].proposal"
        :icon="`${$iconURL}Budget+Elements/${item.icon}`"
        field="cart"
        :title="item.fullTitle"
        @action="handleCartAction(item, $event)"
      > </ServiceCartItem>
      <div class="md-layout align-start px-40">
        <div class="md-layout-item md-size-70 py-20 font-size-16 font-bold-extra">
          Total
        </div>
        <div class="md-layout-item md-size-30 py-20 font-size-16 font-bold-extra">
          ${{ totalPrice | withComma }}
        </div>
      </div>

      <div class="p-20 d-flex align-center justify-content-center">
        <md-button class="md-simple md-black maryoku-btn mr-10">
          Clear Selections
        </md-button>
        <md-button class="md-red maryoku-btn" @click="bookCart">
          Proceed To Checkout
        </md-button>
      </div>

      <vsa-list>
        <vsa-item>
          <vsa-heading>
            MY FAVORITE
          </vsa-heading>
          <vsa-content>
            <div>
              <ServiceCartItem
                v-for="proposal in favoriteProposals"
                :key="proposal.id"
                :proposal="proposal"
                :icon="`${$iconURL}Budget+Elements/${serviceCategory(proposal.vendor.vendorCategory).icon}`"
                field="favorite"
                :title="serviceCategory(proposal.vendor.vendorCategory).fullTitle"
                @action="handleFavoriteAction(proposal, $event)"
              > </ServiceCartItem>
            </div>
          </vsa-content>
        </vsa-item>
        <vsa-item>
          <vsa-heading>
            VENDORS YOU ALREADY BOOKED
          </vsa-heading>
          <vsa-content>
            <div>
              <ServiceCartItem
                v-for="proposal in bookedProposals"
                :key="proposal.id"
                :proposal="proposal"
                :icon="`${$iconURL}Budget+Elements/${serviceCategory(proposal.vendor.vendorCategory).icon}`"
                field="booked"
                :title="serviceCategory(proposal.vendor.vendorCategory).fullTitle"
              > </ServiceCartItem>
            </div>
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>
  </div>
</template>
<script>
import { VsaList, VsaItem, VsaHeading, VsaContent } from "vue-simple-accordion";
import ServiceCartItem from './components/SeviceCartItem'
import "vue-simple-accordion/dist/vue-simple-accordion.css";

export default {
  components: {
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    ServiceCartItem,
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

  computed: {
    event() {
      return this.$store.state.event.eventData;
    },
    favoriteProposals() {
      let proposals = [];
      Object.keys(this.$store.state.event.proposals).map(key => {
        proposals = proposals.concat(this.$store.state.event.proposals[key]);
      });
      return proposals.filter(p => !!p.isFavorite);
    },
    bookedProposals() {
      let proposals = [];
      Object.keys(this.$store.state.event.proposals).map(key => {
        proposals = proposals.concat(this.$store.state.event.proposals[key]);
      });
      return proposals.filter(p => !!p.accepted);
    },
    cartItems() {
      const categoryKeys = Object.keys(this.$store.state.planningBoard.cart);
      const cartItems = [];
      categoryKeys.forEach((categoryKey) => {
        if (this.$store.state.planningBoard.cart[categoryKey].proposal) {
          if (!this.$store.state.planningBoard.cart[categoryKey].proposal.isFavorite) {
            const category = this.serviceCategory(categoryKey);
            if (category) {
              cartItems.push(category);
            }
          }
        }
      });
      cartItems.sort((a, b) => a.order - b.order);
      return cartItems;
    },
    cart() {
      return this.$store.state.planningBoard.cart;
    },
    totalPrice() {
      if (!this.cartItems.length) return 0;
      return this.cartItems.reduce((s, item) => {
        return s + this.cart[item.key].proposal.cost;
      }, 0);
    },
    percentOfBudgetCategories() {
      return Object.keys(this.cart).length;
    },
  },
  watch: {
    proposal(newVal) {
    },
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
    handleCartAction(item, action) {
      if (action === 'mote') {
        this.$store.dispatch("event/updateProposal", {
          proposal: { ...item.proposal, isFavorite: true },
          category: item.category,
        });
      } else {
        this.$store.dispatch("planningBoard/removeCartItem", { id: item.id, event: this.event });
      }
    },
    handleFavoriteAction(proposal, action) {
      if (action === 'move') {
        this.$store.dispatch("planningBoard/updateCartItem", {
          category: proposal.vendor.vendorCategory,
          event: { id: this.event.id },
          proposalId: proposal.id,
        });
        this.$store.dispatch("event/updateProposal", {
          proposal: { ...proposal, isFavorite: false },
          category: proposal.vendor.vendorCategory,
        });
      } else if (action === 'remove') {
        this.$store.dispatch("event/updateProposal", {
          proposal: { ...proposal, isFavorite: false },
          category: proposal.vendor.vendorCategory,
        });
      }
    },
    bookCart() {
      this.$router.push({ name: "CheckoutWithCart", params: { eventId: this.event.id } });
    },
    serviceCategory(category) {
      return this.$store.state.common.serviceCategories.find(it => it.key === category);
    },
  },
};
</script>
<style lang="scss" scoped>
.services-cart {
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

    /deep/ .vsa-item__content{
      padding: 0!important;
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

  &-item{
    padding: 20px 40px;
    &.booked{
      background: rgba(56, 255, 126, 0.19);
    }
  }
}
</style>
