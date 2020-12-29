<template>
  <div class="propsal-bid-content">
    <proposal-requirements
      class="white-card card"
      label="Cost Requirements"
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
    <proposal-upload-legal class="white-card legal-upload"></proposal-upload-legal>
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
    let includedVendorServices = [];
    let costVendorServices = [];
    if (this.vendor.services) {
      _.each(this.vendor.services, (vendorService) => {
        if (vendorService.included) {
          includedVendorServices.push(vendorService);
        } else if (!vendorService.included && vendorService.value) {
          costVendorServices.push(vendorService);
        }
      });
    }

    const includedSevices = [];
    const costServices = [];
    this.mandatoryRequirements.forEach((item) => {
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
        isMandatory: true,
      };
      if (
        costVendorServices.findIndex((vendorService) => {
          return item.item && vendorService.label.toLowerCase() == item.item.toLowerCase();
        }) >= 0
      ) {
        costServices.push(service);
      }
      if (
        includedVendorServices.findIndex((vendorService) => {
          return item.item && vendorService.label.toLowerCase() == item.item.toLowerCase();
        }) >= 0
      ) {
        includedSevices.push(service);
      }
    });

    this.$store.commit("vendorProposal/setCostServices", {
      category: this.vendor.eventCategory.key,
      services: costServices,
    });
    this.$store.commit("vendorProposal/setIncludedServices", {
      category: this.vendor.eventCategory.key,
      services: includedSevices,
    });
  },
  computed: {
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
    mandatoryRequirements() {
      if (!this.requirements) return [];
      return this.requirements.filter((item) => item.mustHave);
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
    margin-top: 50px;
  }
  .legal-upload {
    margin-top: 60px;
  }
}
</style>