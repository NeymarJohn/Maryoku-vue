<template>
  <div class="card-invoice">
    <invoice-card-header />
    <invoice-card-content />
  </div>
</template>

<script>
import InvoiceCardHeader from "@/pages/app/Invoices/InvoiceCard/InvoiceCardHeader";
import InvoiceCardContent from "@/pages/app/Invoices/InvoiceCard/InvoiceCardContent";

export default {
  name: "invoice-card",
  components: {
    InvoiceCardHeader,
    InvoiceCardContent,
  }
}
</script>

<style lang="scss" scoped>
.card-invoice {
  max-width: 1792px;
  min-height: 500px;
  margin: 0 auto;
  padding: 80px 115px 110px;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
}
</style>
