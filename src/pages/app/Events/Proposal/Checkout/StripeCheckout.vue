<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
export default {
  components: {
    StripeCheckout,
  },
  props: {
    proposal:{
      type: Object,
      required: true,
    },
    price: {
      type: Object,
      default: () => {},
    },
    nonMaryoku: {
      type: Boolean,
      default: false,
    }
  },
  mounted() {
    this.$refs.checkoutRef.redirectToCheckout();
  },
  data() {
    this.publishableKey = process.env.STRIPE_PK;
    let link =  this.$router.resolve({
      name: 'OfferVendors',
        params: {
          proposalId: this.proposal.id,
        }
      });
    return {
      loading: false,
      lineItems: [
        {
          price: this.price.id, // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: this.nonMaryoku ? link.href : `${window.location.href}?checkout=success`,
      cancelURL: `${window.location.href}?checkout=cancel`,
    };
  },
  methods: {
    submit() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>
