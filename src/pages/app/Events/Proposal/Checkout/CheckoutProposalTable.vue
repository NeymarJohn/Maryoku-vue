<template>
    <collapse-panel :defaultStatus="false" class="checkout-proposal-table">
        <template slot="header">
            <div class="price-header">
                <div class="d-flex align-center">
                    <img class="mr-10" :src="`${$iconURL}Budget+Elements/${serviceCategory.icon}`" width="35px"/>
                    {{serviceCategory.fullTitle}}
                </div>
                <div class="ml-auto">
                    <div class="element-price">${{ discounedAndTaxedPrice | withComma }}</div>
                </div>
            </div>
        </template>
        <template slot="content">
            <div class="proposal-table-content">
                <checkout-price-table
                    class="price-table border-top"
                    :proposal="proposal"
                    :serviceCategory="proposal.vendor.vendorCategory"
                    :key="`${proposal.vendor.vendorCategory}-section`"
                ></checkout-price-table>
                <checkout-price-table
                    class="price-table border-top"
                    v-for="service in proposal.additionalServices"
                    :proposal="proposal"
                    :serviceCategory="service"
                    :key="`secondary-${service}-section`"
                ></checkout-price-table>
            </div>
        </template>
    </collapse-panel>
</template>
<script>
    import CollapsePanel from "@/components/CollapsePanel.vue";
    import CheckoutPriceTable from "./CheckoutPriceTable";
    export default {
        components: { CollapsePanel, CheckoutPriceTable },
        props: {
            proposal: {
                type: Object,
                default: () => {},
            },
            category: {
                type: String,
                default: "",
            },
        },
        data(){
            return{
                extraServices: [],
                addedServices: {},
            }
        },
        computed: {
            categories() {
                return this.$store.state.common.serviceCategories;
            },
            serviceCategory(){
                return this.categories.find(it => it.key === this.category);
            },
            tax() {
                if (!this.proposal.taxes) return { percentage: 0, price: 0 };
                let tax = this.proposal.taxes["total"];
                if (!tax) {
                    tax = { price: 0, percentage: 0 };
                }
                return tax;
            },
            discount() {
                if (!this.proposal.discounts) return { percentage: 0, price: 0 };
                let discount = this.proposal.discounts["total"];
                if (!discount) {
                    discount = { price: 0, percentage: 0 };
                }
                return discount;
            },
            bundledDiscountPrice() {
                let bundledServicePrice = 0;
                let services = this.proposal.bundleDiscount && this.proposal.bundleDiscount.isApplied
                    ? this.proposal.bookedServices
                    : this.proposal.bundleDiscount.services;
                services.forEach((serviceCategory) => {
                    const sumOfService = this.proposal.costServices[serviceCategory].reduce((s, service) => {
                        return service.isComplimentary ? s : s + service.requirementValue * service.price;
                    }, 0);
                    bundledServicePrice += sumOfService;
                    if (this.addedServices[serviceCategory]) {
                        const sumOfService = this.addedServices[serviceCategory].reduce((s, service) => {
                            return service.isComplimentary ? s : s + service.requirementValue * service.price;
                        }, 0);
                        bundledServicePrice += sumOfService;
                    }
                });
                return (bundledServicePrice * this.proposal.bundleDiscount.percentage) / 100 || 0;
            },

            totalPriceOfProposal() {
                let totalPrice = 0;
                Object.keys(this.proposal.costServices).forEach((serviceCategory) => {
                    const sumOfService = this.proposal.costServices[serviceCategory].reduce((s, service) => {
                        return service.isComplimentary ? s : s + service.requirementValue * service.price;
                    }, 0);
                    totalPrice += sumOfService;
                });

                // added service item price
                Object.keys(this.addedServices).forEach((serviceCategory) => {
                    const sumOfService = this.addedServices[serviceCategory].reduce((s, service) => {
                        return s + service.requirementValue * service.price;
                    }, 0);
                    totalPrice += sumOfService;
                });
                return totalPrice;
            },
            discounedAndTaxedPrice() {
                const discounted =
                    this.totalPriceOfProposal -
                    (this.totalPriceOfProposal * this.discount.percentage) / 100 -
                    this.bundledDiscountPrice;

                return discounted + (discounted * this.tax.percentage) / 100;
            },
        },
    };
</script>
<style lang="scss" scoped>
    .checkout-proposal-table {
        .price-header {
            padding: 30px;
            font-weight: 900;
            font-size: 22px;
            display: flex;
            align-items: center;
            padding-right: 100px;
            img {
                width: 30px;
            }
            .element-price {
                text-align: left;
                width: 120px;
            }
        }
        .proposal-table-content {
            padding: 0 30px;
            .border-top{
                border-top: solid 2px #e0e0e0;
            }
        }
        .element-price {
            text-align: right;
        }
    }
</style>
