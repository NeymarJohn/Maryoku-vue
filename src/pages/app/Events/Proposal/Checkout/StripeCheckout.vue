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
    price: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.$refs.checkoutRef.redirectToCheckout();
  },
  data() {
    this.publishableKey = process.env.STRIPE_PK;
    return {
      loading: false,
      lineItems: [
        {
          price: this.price.id, // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: `${window.location.href}?checkout=success`,
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