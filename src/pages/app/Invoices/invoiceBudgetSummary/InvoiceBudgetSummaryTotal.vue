<template>
  <div class="invoice-budget-summary-footer">
    <div class="invoice-budget-summary-footer-total">
      <span class="invoice-budget-summary-footer-total-label">
        Total
      </span>
      <span class="invoice-budget-summary-footer-total-price">
        $2,800.00
      </span>
    </div>
    <div class="invoice-budget-summary-footer-before-discount">
      <span class="invoice-budget-summary-footer-before-discount-label">
        Before discount
      </span>
      <spna class="invoice-budget-summary-footer-before-discount-percent">
        (10% off)
      </spna>
      <span class="invoice-budget-summary-footer-before-discount-price">
        $2,900.00
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceBudgetSummaryTotal",
};
</script>

<style lang="scss" scoped>
.invoice-budget-summary-footer {
  padding: 45px 35px;
  border-radius: 0 0 3px 3px;
  background-color: #404040;

  .invoice-budget-summary-footer-total {
    display: flex;
    margin-bottom: 10px;

    .invoice-budget-summary-footer-total-label {
      font-size: 28px;
      font-weight: 800;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #fff;
      flex-grow: 1;
    }

    .invoice-budget-summary-footer-total-price {
      font-size: 28px;
      font-weight: 800;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: right;
      color: #fff;
    }
  }

  .invoice-budget-summary-footer-before-discount {
    display: flex;

    .invoice-budget-summary-footer-before-discount-label {
      font-size: 17px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #ffffff;
    }

    .invoice-budget-summary-footer-before-discount-percent {
      margin: 0 50px;
      font-size: 17px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: right;
      color: #ffffff;
      flex-grow: 1;
    }

    .invoice-budget-summary-footer-before-discount-price {
      margin: 0 0 0 50px;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: right;
      color: #ffffff;
      text-decoration: line-through;
    }
  }
}
</style>
