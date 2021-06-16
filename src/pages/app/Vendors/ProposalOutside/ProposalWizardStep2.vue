<template>
  <div class="white-card mt-10">
    <proposal-item-secondary-service
      :category="vendor.eventCategory.title"
      :services="[]"
      :isCollapsed="true"
      :isDropdown="true"
      :proposalRange="true"
      :img="`${$iconURL}Budget Elements/${vendor.eventCategory.icon}`"
      :serviceCategory="vendor.eventCategory.key"
    />

    <!-- <refer-new-vendor :event="event" :vendor="vendor" /> -->
  </div>
</template>
<script>
import ReferNewVendor from "../components/ReferNewVendor";
import ProposalItemSecondaryService from "./ProposalItemSecondaryService";
export default {
  components: {
    ReferNewVendor,
    ProposalItemSecondaryService,
  },
  computed: {
    vendor() {
      return this.$store.state.vendorProposal.vendor;
    },
  },
};
</script>