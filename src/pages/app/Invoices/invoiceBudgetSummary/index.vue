<template>
  <div class="invoice-budget-summary">
    <div class="invoice-budget-summary-service-list">
      <invoice-budget-summary-service
        v-for="(service, index) in services"
        :key="service.id"
        :service="service"
        :index="index"
      />
    </div>
    <invoice-budget-summary-total />
  </div>
</template>

<script>
import InvoiceBudgetSummaryTotal from "@/pages/app/Invoices/invoiceBudgetSummary/InvoiceBudgetSummaryTotal";
import InvoiceBudgetSummaryService from "@/pages/app/Invoices/invoiceBudgetSummary/InvoiceBudgetSummaryService";

export default {
  name: "InvoiceBudgetSummary",
  components: {
    InvoiceBudgetSummaryTotal,
    InvoiceBudgetSummaryService,
  },
  data() {
    return {
      services: [
        {
          id: 1,
          icon: "static/icons/Group 3992.svg",
          title: "Venue",
          subtitle: "Relish caterers & venues",
          discount: 10,
          price: "800.00",
          before_discount: "1,100.00",
          your_proposal: true,
          additional_services: false,
          status: "Before discount"
        },
        {
          id: 2,
          icon: "static/icons/Group 1471.svg",
          title: "Catering",
          subtitle: "Relish caterers & venues",
          discount: 10,
          price: "1,600.00",
          before_discount: "1,900.00",
          your_proposal: true,
          additional_services: false,
          status: "Before discount"
        },
        {
          id: 3,
          icon: "static/icons/Group 5927.svg",
          title: "Total Bundle",
          subtitle: "Venue + Catering",
          discount: 0,
          price: "2,400",
          original_price: "3000.00",
          your_proposal: false,
          additional_services: false,
          status: "Original Price"
        },
        {
          id: 4,
          icon: "static/icons/Group 4011.svg",
          title: "DJ",
          subtitle: "Awesome DJ",
          discount: 10,
          price: "400.00",
          before_discount: "600.00",
          your_proposal: true,
          additional_services: true,
          status: "Before discount"
        },
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.invoice-budget-summary {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;

  .invoice-budget-summary-service-list {}
}
</style>
