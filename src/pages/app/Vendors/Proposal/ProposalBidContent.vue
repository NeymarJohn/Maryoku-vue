<template>
  <div class="propsal-bid-content">
    <proposal-requirements
      key="cost"
      class="white-card card"
      label="Cost Items"
      table-category="cost"
      icon="Group+10662.svg"
      description="Mandatory elements to involve in proposals are in the table, you can add more here:"
      :vendor-category="vendor.eventCategory.key"
    />
    <proposal-requirements
      key="included"
      table-category="included"
      label="Included in Price"
      icon="includedPrice.png"
      description="(from your “included in price” items)"
      class="white-card card"
      :vendor-category="vendor.eventCategory.key"
    />
    <proposal-requirements
      key="extra"
      table-category="extra"
      label="Offered Extras"
      icon="cost-requirements.png"
      description="What elements would you like to suggest to the client with extra pay? "
      class="white-card card"
      :vendor-category="vendor.eventCategory.key"
    />
    <!-- <proposal-upload-legal class="white-card legal-upload"></proposal-upload-legal> -->
  </div>
</template>
<script>
import ProposalRequirements from "./ProposalRequirements.vue";
import { DiscountCustomerTypes, CouponRules } from "@/constants/options";
import moment from "moment";
import _ from "underscore";

export default {
  components: {
    ProposalRequirements,
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
    taxes() {
      return this.$store.state.common.taxes;
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
    costServiceItems() {
      return this.$store.state.vendorProposal.costServices[this.category];
    },
    includedServiceItems(){
      return this.$store.state.vendorProposal.includedServices[this.category];
    }
  },
  watch: {
    // remove costServiceItem already in included section
    costServiceItems: {
        handler(newVal) {
          let includeItems = this.includedServiceItems;
          if(newVal.length) {
            newVal.map(costItem => {
                includeItems = includeItems.filter(it => it.requirementTitle.toLowerCase() !== costItem.requirementTitle.toLowerCase());
            });
          }
          // console.log('costServiceItems', includeItems);
          this.$store.commit("vendorProposal/setIncludedServices", { category: this.category, services: includeItems });
        },
        deep: true,
    }
  },
  async created() {
    let taxRate = 0;
    let discountRate = 0;

    if (this.vendor.discountPolicies) {
      const evtDay = moment(this.proposalRequest.eventData.eventStartMillis);
      const discounts = this.vendor.discountPolicies;

      if (discounts.hasOwnProperty("coupon") &&
        evtDay.format("DD.MM.YYYY") === discounts.coupon[0].validDate) {

        discountRate = Number(discounts.coupon[0].value);

      }
      if (discounts.hasOwnProperty("number_of_guests") && (
        discounts.number_of_guests[0].rule === 1 && Number(this.event.numberOfParticipants) >= Number(discounts.number_of_guests[0].qty) ||
        discounts.number_of_guests[0].rule === 2 && Number(this.event.numberOfParticipants) <= Number(discounts.number_of_guests[0].qty))){

        discountRate = Number(discounts.number_of_guests[0].value);

      }
      if (discounts.hasOwnProperty("customer_type") && Number(this.proposalRequest.returning) === Number(discounts.customer_type[0].type)) {

        discountRate = Number(discounts.customer_type[0].value);

      }
      if (discounts.hasOwnProperty("seasonal") &&
        evtDay.isBetween(`${discounts.seasonal[0].from.year}-${discounts.seasonal[0].from.months[0]}`,
          `${discounts.seasonal[0].to.year}-${discounts.seasonal[0].to.months[0]}`)) {

        discountRate = Number(discounts.seasonal[0].value);
      }
    }
    if (this.vendor.pricingPolicies) {
      // todo move calculating default discounts to proposalLayout page
      // this.vendor.pricingPolicies.forEach((item) => {
      //   if (item.name === "Tax rate" && item.value) {
      //     taxRate = Number(item.value);
      //   }
      //   if (
      //     item.name === "Discount for large quantities" &&
      //     Number(this.event.numberOfParticipants) >= Number(item.attendees) &&
      //     item.attendees &&
      //     item.value
      //   ) {
      //     discountRate = Number(item.value);
      //   }
      //   if (item.name === "Discounts" && item.value) {
      //     discountRate = Number(item.value);
      //   }
      //   if (
      //     item.name === "Large group discounts" &&
      //     Number(this.event.numberOfParticipants) >= Number(item.attendees) &&
      //     item.attendees &&
      //     item.value
      //   ) {
      //     discountRate = Number(item.value);
      //   }
      // });
    }

    if (!taxRate) taxRate = this.getTaxFromState();

    if (!this.$store.state.vendorProposal.initialized) {
      let includedVendorServices = [];
      let costVendorServices = [];

      const includedSevices = [];
      const costServices = [];

      if (this.vendor.services) {
        _.each(this.vendor.services, (vendorService) => {
          // Set included services from vendor profile
          if (!vendorService.xIncluded && vendorService.checked && vendorService.included) {
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
            // console.log("extra SErvce", item.extraService);
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
  methods: {
      getTaxFromState() {
          if (!this.event.location) return 0;

          let tax = 0;
          this.taxes.map(it => {
              const arr = this.event.location.split(", ");
              if (arr[arr.length - 1] === "USA" && arr[arr.length - 2] === it.code) {
                tax = it.tax;
              }
          });
          return tax;
      }
  }
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
