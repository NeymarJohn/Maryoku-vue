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
import _ from "underscore";

export default {
  components: {
    ReferNewVendor,
    ProposalItemSecondaryService,
  },
  created() {
    let taxRate = 0;
    let discountRate = 0;
    if (this.vendor.pricingPolicies) {
      this.vendor.pricingPolicies.forEach((item) => {
        if (item.name === "Tax rate" && item.value) {
          taxRate = Number(item.value);
        }
      });
    }

    if (!this.$store.state.proposalForNonMaryoku.initialized) {
      let includedVendorServices = [];
      let costVendorServices = [];

      const includedSevices = [];
      const costServices = [];

      if (this.vendor.services) {
        _.each(this.vendor.services, (vendorService) => {
          // Set included services from vendor profile
          if (vendorService.included) {
            includedVendorServices.push(vendorService);
            const service = {
              comments: [],
              dateCreated: "",
              includedInPrice: true,
              itemNotAvailable: false,
              price: 0,
              priceUnit: "qty",
              requirementComment: null,
              requirementId: "",
              requirementMandatory: false,
              requirementPriority: null,
              requirementTitle: vendorService.label,
              requirementsCategory: vendorService.category,
              requirementValue: vendorService.defaultQty ? vendorService.defaultQty : 1,
              requirementSize: vendorService.defaultSize ? vendorService.defaultSize : "",
              requirementNote: vendorService.desc,
              plannerOptions: [],
              isMandatory: true,
              isComplementary: false,
              isComplimentary: false,
            };
            includedSevices.push(service);
          } else if (!vendorService.included) {
            costVendorServices.push(vendorService);
          }
        });
      }

      const extraServices = [];
      const hiddenValues = ["Discount for large quantities", "Tax rate", "Suggested Gratuity"];

      if (this.vendor.pricingPolicies) {
        this.vendor.pricingPolicies.forEach((item) => {
          if (item.isExtraService || !item.hideOnProposal) {
            console.log("extra SErvce", item.extraService);
            extraServices.push({
              comments: [],
              dateCreated: "",
              includedInPrice: true,
              itemNotAvailable: false,
              price: Number(item.value),
              priceUnit: "qty",
              requirementComment: null,
              requirementId: "",
              requirementMandatory: false,
              requirementPriority: null,
              requirementTitle: item.extraService ? item.extraService.label : item.name,
              requirementsCategory: item.category,
              requirementValue: item.defaultQty ? item.defaultQty : 1,
              requirementSize: item.defaultSize ? item.defaultSize : "",
              plannerOptions: [],
              isMandatory: true,
            });
          }
        });
      }
      this.$store.commit("proposalForNonMaryoku/setValue", { key: "vendorCostServices", value: costVendorServices });
      this.$store.commit("proposalForNonMaryoku/setValue", {
        key: "vendorIncludedServices",
        value: includedVendorServices || [],
      });

      this.$store.commit("proposalForNonMaryoku/setCostServices", {
        category: this.vendor.eventCategory.key,
        services: [],
      });
      this.$store.commit("proposalForNonMaryoku/setIncludedServices", {
        category: this.vendor.eventCategory.key,
        services: includedSevices,
      });

      this.$store.commit("proposalForNonMaryoku/setExtraServices", {
        category: this.vendor.eventCategory.key,
        services: extraServices,
      });
      this.$store.commit("proposalForNonMaryoku/setValue", { key: "initialized", value: true });
    }
  },
  computed: {
    vendor() {
      return this.$store.state.proposalForNonMaryoku.vendor;
    },
  },
};
</script>