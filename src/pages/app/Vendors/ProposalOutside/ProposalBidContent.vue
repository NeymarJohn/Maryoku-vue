<template>
  <div class="propsal-bid-content">
    <proposal-requirements
      class="white-card card"
      label="Cost Items"
      key="cost"
      tableCategory="cost"
      icon="Group+10662.svg"
      description="Mandatory elements to involve in proposals are in the table, you can add more here:"
      :vendorCategory="vendor.eventCategory.key"
    />
    <proposal-requirements
      tableCategory="included"
      label="Included in Price"
      icon="includedPrice.png"
      description="(from your “included in price” items)"
      key="included"
      class="white-card card"
      :vendorCategory="vendor.eventCategory.key"
    />
    <proposal-requirements
      tableCategory="extra"
      label="Offered Extras"
      icon="cost-requirements.png"
      description="What elements would you like to suggest to the client with extra pay? "
      key="extra"
      class="white-card card"
      :vendorCategory="vendor.eventCategory.key"
    />
    <!-- <proposal-upload-legal class="white-card legal-upload"></proposal-upload-legal> -->
  </div>
</template>
<script>
import ProposalUploadLegal from "./ProposalUploadLegal";
import ProposalRequirements from "./ProposalRequirements.vue";
import _ from "underscore";

export default {
  components: {
    ProposalUploadLegal,
    ProposalRequirements,
  },
  created() {
    let taxRate = 0;
    let discountRate = 0;
    if (this.vendor.pricingPolicies) {
      this.vendor.pricingPolicies.forEach((item) => {
        if (item.name === "Tax rate" && item.value) {
          taxRate = Number(item.value);
        }
        if (
          item.name === "Discount for large quantities" &&
          Number(this.event.numberOfParticipants) >= Number(item.attendees) &&
          item.attendees &&
          item.value
        ) {
          discountRate = Number(item.value);
        }
        if (item.name === "Discounts" && item.value) {
          discountRate = Number(item.value);
        }
        if (
          item.name === "Large group discounts" &&
          Number(this.event.numberOfParticipants) >= Number(item.attendees) &&
          item.attendees &&
          item.value
        ) {
          discountRate = Number(item.value);
        }
      });
    }

    if (!this.$store.state.vendorProposal.initialized) {
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
              proposalRequest: { id: this.proposalRequest.id },
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

      // add default cost services from vendor profile and requirement
      this.requirementsFromPlanner.forEach((item) => {
        const service = {
          comments: [],
          dateCreated: "",
          includedInPrice: true,
          itemNotAvailable: false,
          price: 0,
          priceUnit: "qty",
          proposalRequest: { id: this.proposalRequest.id },
          requirementComment: null,
          requirementId: "",
          requirementMandatory: false,
          requirementPriority: null,
          requirementTitle: item.item,
          requirementsCategory: item.category,
          requirementValue: item.defaultQty ? item.defaultQty : 1,
          requirementSize: item.defaultSize ? item.defaultSize : "",
          requirementNote: item.desc,
          plannerOptions: [],
          isMandatory: true,
          isComplementary: false,
          isComplimentary: false,
        };

        if (
          costVendorServices.findIndex((vendorService) => {
            return item.item && vendorService.label.toLowerCase() == item.item.toLowerCase();
          }) >= 0
        ) {
          service.price = costVendorServices.find((vendorService) => {
            return item.item && vendorService.label.toLowerCase() == item.item.toLowerCase();
          }).value;
          costServices.push(service);
        }
      });

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
              proposalRequest: { id: this.proposalRequest.id },
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
      this.$store.commit("vendorProposal/setValue", { key: "vendorCostServices", value: costVendorServices });
      this.$store.commit("vendorProposal/setValue", {
        key: "vendorIncludedServices",
        value: includedVendorServices || [],
      });

      this.$store.commit("vendorProposal/setCostServices", {
        category: this.vendor.eventCategory.key,
        services: [],
      });
      this.$store.commit("vendorProposal/setIncludedServices", {
        category: this.vendor.eventCategory.key,
        services: includedSevices,
      });

      this.$store.commit("vendorProposal/setExtraServices", {
        category: this.vendor.eventCategory.key,
        services: extraServices,
      });
      this.$store.commit("vendorProposal/setValue", { key: "initialized", value: true });
    }

    if (Object.keys(this.$store.state.vendorProposal.taxes).length === 0) {
      this.$store.commit("vendorProposal/setValue", {
        key: "taxes",
        value: { [this.vendor.eventCategory.key]: { percentage: taxRate, price: 0 } },
      });
      this.$store.commit("vendorProposal/setValue", {
        key: "taxes",
        value: { total: { percentage: taxRate, price: 0 } },
      });
    }
    if (Object.keys(this.$store.state.vendorProposal.discounts).length === 0) {
      this.$store.commit("vendorProposal/setDiscount", {
        category: this.vendor.eventCategory.key,
        discount: { percentage: discountRate, price: 0 },
      });
      this.$store.commit("vendorProposal/setDiscount", {
        category: "total",
        discount: { percentage: discountRate, price: 0 },
      });
    }
  },
  computed: {
    event() {
      return this.proposalRequest.eventData;
    },
    category() {
      return this.vendor.eventCategory.key;
    },
    requirements() {
      return this.proposalRequest.componentRequirements[this.vendor.eventCategory.key];
    },
    optionalRequirements() {
      if (!this.requirements) return [];
      return this.requirements.filter((item) => !item.mustHave && item.type !== "multi-selection");
    },
    requirementsFromPlanner() {
      if (!this.requirements) return [];
      return this.requirements.filter((item) => item.isSelected);
    },
    proposalRequest() {
      return this.$store.state.vendorProposal.proposalRequest;
    },
    vendor() {
      return this.$store.state.vendorProposal.vendor;
    },
    services: {
      get: function () {
        if (this.tableCategory === "cost") return this.$store.state.vendorProposal.proposalCostServices[this.category];
        else if (this.tableCategory === "included")
          return this.$store.state.vendorProposal.proposalIncludedServices[this.category];
        else if (this.tableCategory === "extra")
          return this.$store.state.vendorProposal.proposalExtraServices[this.category];
      },
      set: function (newServices) {
        if (this.tableCategory === "cost")
          this.$store.commit("vendorProposal/setCostServices", { category: this.category, services: newServices });
        else if (this.tableCategory === "included")
          this.$store.commit("vendorProposal/setIncludedServices", { category: this.category, services: newServices });
        else if (this.tableCategory === "extra")
          this.$store.commit("vendorProposal/setExtraServices", { category: this.category, services: newServices });
      },
    },
    calculatedTotal() {
      let taxRate = this.$store.state.vendorProposal.taxes[this.categroy];
      if (!taxRate) taxRate = 0;
      let total = this.totalPrice - (this.totalPrice * this.discount) / 100;
      const tax = (total * taxRate) / 100;
      return total - tax;
    },
    totalPrice() {
      const sumPrice = this.services.reduce((s, item) => {
        return s + item.requirementValue * item.price;
      }, 0);
      return sumPrice;
    },
  },
};
</script>
<style lang="scss" scoped>
.propsal-bid-content {
  .white-card {
    margin-top: 20px;
  }
  .legal-upload {
    margin-top: 60px;
  }
}
</style>