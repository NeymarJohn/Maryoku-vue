<template>
  <div class="mt-10">
    <proposal-item-secondary-service
      :category="vendor.eventCategory.title"
      :services="[]"
      :is-collapsed="false"
      :is-dropdown="true"
      :proposal-range="true"
      :img="`${$iconURL}Budget Elements/${vendor.eventCategory.icon}`"
      :service-category="vendor.eventCategory.key"
    />
    <template v-if="vendor.secondaryServices && vendor.secondaryServices.length">
      <h3>Would you like to change or add services to this offer?</h3>
      <p>Select additional services you offer as part of this proposal.</p>
      <proposal-item-secondary-service
        v-for="service in vendor.secondaryServices"
        :key="service.id"
        :category="service.eventCategory.title"
        :services="[]"
        :is-collapsed="true"
        :is-dropdown="true"
        :proposal-range="true"
        :img="`${$iconURL}Budget Elements/${service.eventCategory.icon}`"
        :service-category="service.vendorCategory"
      />
    </template>
  </div>
</template>
<script>
import ProposalItemSecondaryService from "./ProposalItemSecondaryService";
import _ from "underscore";
import moment from "moment";

export default {
    components: {
        ProposalItemSecondaryService,
    },
    computed: {
        vendor() {
            return this.$store.state.proposalForNonMaryoku.vendor;
        },
        event(){
            return this.$store.state.proposalForNonMaryoku.eventData;
        },
        costServiceItems() {
            return this.$store.state.proposalForNonMaryoku.costServices[this.vendor.eventCategory.key];
        },
        includedServiceItems() {
            return this.$store.state.proposalForNonMaryoku.includedServices[this.vendor.eventCategory.key];
        },
        discounts() {
          return this.$store.state.proposalForNonMaryoku.discounts;
        },
        taxes() {
          return this.$store.state.proposalForNonMaryoku.taxes;
        },
        defaultTaxes(){
          return this.$store.state.common.taxes;
        }
    },
    watch: {
        // remove costServiceItem already in included section
        costServiceItems: {
            handler(newVal) {
                let includeItems = this.includedServiceItems;
                if (newVal.length) {
                    newVal.map((costItem) => {
                        includeItems = includeItems.filter(
                            (it) => it.requirementTitle.toLowerCase() !== costItem.requirementTitle.toLowerCase(),
                        );
                    });
                }
                this.$store.commit("proposalForNonMaryoku/setIncludedServices", {
                    category: this.vendor.eventCategory.key,
                    services: includeItems,
                });
            },
            deep: true,
        },
    },
    created() {
        // calculate default discount
        if (!this.discounts.total && this.vendor.discountPolicies) {
          this.setDefaultDiscount();
        }

        // calculate default tax
        if (!this.taxes.total) {
          this.setDefaultTax();
        }

        if (!this.$store.state.proposalForNonMaryoku.initialized) {
            this.setInitServices(
                this.vendor.eventCategory.key,
                this.vendor.services || [],
                this.vendor.pricingPolicies || [],
            );

            if (this.vendor.secondaryServices) {
                this.vendor.secondaryServices.forEach((secondaryService) => {
                    this.setInitServices(
                        secondaryService.vendorCategory,
                        secondaryService.services,
                        secondaryService.pricingPolicies,
                    );
                });
            }

            this.$store.commit("proposalForNonMaryoku/setValue", { key: "initialized", value: true });
        }
    },
    methods: {
      setDefaultDiscount() {
        console.log("step2", this.discounts);
        const policies = this.vendor.discountPolicies;
        let discountRate = 0;

        const evtDay = moment(this.event.startTime * 1000);

        if (policies.hasOwnProperty("number_of_guests") && (
          policies.number_of_guests[0].rule === 1 && Number(this.event.numberOfParticipants) >= Number(policies.number_of_guests[0].qty) ||
          policies.number_of_guests[0].rule === 2 && Number(this.event.numberOfParticipants) <= Number(policies.number_of_guests[0].qty))){

          discountRate = policies.double ? discountRate + Number(policies.number_of_guests[0].value) :
            Number(policies.number_of_guests[0].value);

        }

        const returning = (this.event.customer && this.event.customer.proposals.length) ? 1 : 0;
        if (policies.hasOwnProperty("customer_type") && returning === Number(policies.customer_type[0].type)) {

          discountRate = policies.double ? discountRate + Number(policies.customer_type[0].value) : Number(policies.customer_type[0].value);

        }
        if (policies.hasOwnProperty("seasonal") &&
          evtDay.isBetween(`${policies.seasonal[0].from.year}-${policies.seasonal[0].from.months[0]}`,
            `${policies.seasonal[0].to.year}-${policies.seasonal[0].to.months[0]}`)) {

          discountRate = policies.double ? discountRate + Number(policies.seasonal[0].value) : Number(policies.seasonal[0].value);
        }

        console.log("discounts", discountRate);
        this.$store.commit("proposalForNonMaryoku/setValue", {
          key: "discounts",
          value: {total: {percentage: discountRate, price: 0}} });
      },

      setDefaultTax() {
        let taxRate = 0;
        if (this.vendor.pricingPolicies) {
          this.vendor.pricingPolicies.forEach((item) => {
            if (item.name === "Tax rate" && item.value) {
              taxRate = Number(item.value);
            }
          });
        }

        if (!taxRate) taxRate = this.getTaxFromState();

        console.log("setTax", taxRate);
        this.$store.commit("proposalForNonMaryoku/setValue", {
          key: "taxes",
          value: { total: { percentage: taxRate, price: 0 } },
        });

      },

      getTaxFromState() {
        if (!this.event.location) return 0;

        let tax = 0;
        const arr = this.event.location.split(", ");
        const withoutCity = arr.length === 2;
        this.defaultTaxes.map(it => {
          const state = withoutCity ? it.state : it.code;
          if (arr[arr.length - 1] === "USA" && arr[arr.length - 2] === state && it.tax) {
            tax = it.tax;
          }
        });
        return tax;
      },
      setInitServices(serviceName, services, pricingPolicies) {
            let includedVendorServices = [];
            let costVendorServices = [];
            const includedSevices = [];
            _.each(services, (vendorService) => {
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
            const extraServices = [];
            if (pricingPolicies) {
                pricingPolicies.forEach((item) => {
                    if (item.isExtraService || !item.hideOnProposal) {
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
            this.$store.commit("proposalForNonMaryoku/setCostServices", {
                category: serviceName,
                services: [],
            });
            this.$store.commit("proposalForNonMaryoku/setIncludedServices", {
                category: serviceName,
                services: includedSevices,
            });

            this.$store.commit("proposalForNonMaryoku/setExtraServices", {
                category: serviceName,
                services: extraServices,
            });
        },
    },
};
</script>
