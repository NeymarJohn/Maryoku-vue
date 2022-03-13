<template>
  <div id="pricingPolicySection" class="pricing-policy-section">
    <div class="rules">
      <div v-for="(policy, yIndex) in validPricingPolicy" :key="yIndex" class="rule">
        <div class="item">
          {{ policy.name }}
        </div>
        <div v-if="policy.type === 'MultiSelection'" class="item">
          <span v-for="(v, vIndex) in policy.value" class="mr-10">{{
            `${v}${vIndex == policy.value.length - 1 ? "" : ","}`
          }}</span>
        </div>
        <div v-else-if="policy.type === 'Including'" class="item">
          <span v-if="policy.value" class="mr-10"> Yes </span>
          <span v-if="!policy.value && policy.cost" class="mr-10"> {{ `$ ${policy.cost | withComma}` }} </span>
        </div>
        <div v-else-if="policy.type === 'Boolean' && policy.value && policy.discount" class="item">
          <span v-if="policy.hasOwnProperty('unit') && policy.unit === '$'" class="mr-10"> $ </span>
          <span v-if="policy.discount" class="mr-10"> {{ policy.discount }} </span>
          <span v-if="policy.hasOwnProperty('unit') && policy.unit === '%'" class="mr-10"> % </span>
        </div>
        <div v-else class="item">
          <span v-if="!policy.isPercentage">$</span>
          <span v-if="policy.value === true">Yes</span>
          <span v-else>{{ Number(policy.value) | withComma }}</span>
          <span v-if="policy.isPercentage">%</span>
          <span v-if="policy.hasOwnProperty('attendees')" class="ml-50"> {{ policy.attendees }} attendees </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    serviceData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    vendor() {
      return this.$store.state.vendor.profile;
    },
    validPricingPolicy() {
      if (this.serviceData.pricingPolicies)
        return this.serviceData.pricingPolicies.filter(
          (item) => item.value || (item.type === "Including" && item.cost),
        );
      return null;
    },
  },
};
</script>
<style lang="scss" scoped>
.pricing-policy-section {
  .rules {
    font-size: 18px;
    .rule {
      padding: 2rem 2rem 2rem 0;
      border-bottom: 1px solid #dddddd;
      display: flex;
      align-items: center;

      .item {
        flex: 1;

        img {
          width: 30px;
        }
      }
      &:first-child {
        border-top: 1px solid #dddddd;
      }
    }
  }
}
</style>
