<template>
  <div class="card-content-invoice">
    <div class="card-content-invoice-left">
      <div class="card-content-invoice-left-header">
        <span class="card-content-invoice-left-header-invoice-number">INVOICE.NO#00012</span>
        <span class="card-content-invoice-left-header-invoice-date">Date Issued January 1, 2022</span>
      </div>
      <div class="card-content-invoice-left-customer-details">
        <span class="card-content-invoice-left-customer-details-title">
          CUSTOMER DETAILS
        </span>
        <span class="card-content-invoice-left-customer-details-subtitle">
          MICROSOFT MARKETING EVENT
        </span>
        <ul class="card-content-invoice-left-customer-details-contact-list">
          <li>
            <span class="card-content-invoice-left-customer-details-contact-item-icon">
              <img width="26" height="21" src="../../../../../static/icons/mail-outline.svg">
            </span>
            <span class="card-content-invoice-left-customer-details-contact-item">
              Racheli@microsoft-r&d.com
            </span>
          </li>
          <li>
            <span class="card-content-invoice-left-customer-details-contact-item-icon">
              <img width="21" height="26" src="../../../../../static/icons/location-outline.svg">
            </span>
            <span class="card-content-invoice-left-customer-details-contact-item">
              Microsoft R&D, 51 Ellicott St. Batavia NY, USA 74812
            </span>
          </li>
          <li>
            <span class="card-content-invoice-left-customer-details-contact-item-icon">
              <img width="26" height="26" src="../../../../../static/icons/phone-outline.svg">
            </span>
            <span class="card-content-invoice-left-customer-details-contact-item">
              077-3000293
            </span>
          </li>
        </ul>
      </div>
      <div class="card-content-invoice-left-signature">
        <img class="card-content-invoice-left-signature-img" src="../../../../../static/img/maryoku-signature.png">
        <h3 class="card-content-invoice-left-signature-title">
          Authorized Stamp & Signature
        </h3>
      </div>
    </div>
    <div class="card-content-invoice-right">
      <invoice-budget-summary />
    </div>
  </div>
</template>

<script>
import InvoiceBudgetSummary from "@/pages/app/Invoices/invoiceBudgetSummary";

export default {
  name: "InvoiceCardContent",
  components: {
    InvoiceBudgetSummary,
  },
};
</script>

<style lang="scss" scoped>
.card-content-invoice {
  display: flex;
  padding: 130px 0 110px;
  border: solid 1px #707070;
  background-color: #f2f2f2;

  .card-content-invoice-left {
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    margin: 0 50px;

    .card-content-invoice-left-header {
      display: flex;
      flex-direction: column;
      margin-bottom: 88px;

      .card-content-invoice-left-header-invoice-number {
        margin-bottom: 10px;
        font-size: 22px;
        font-weight: 800;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #050505;
      }

      .card-content-invoice-left-header-invoice-date {
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #050505;
      }
    }

    .card-content-invoice-left-customer-details {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      .card-content-invoice-left-customer-details-title {
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 3.05;
        letter-spacing: normal;
        text-align: left;
        color: #707070;
      }

      .card-content-invoice-left-customer-details-subtitle {
        max-width: 273px;
        font-size: 30px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #050505;
      }

      .card-content-invoice-left-customer-details-contact-list {
        margin: 0 0 35px 0;
        padding: 0;
        list-style-type: none;

        & li {
          display: flex;
          padding: 10px 0;

          .card-content-invoice-left-customer-details-contact-item {
            max-width: 295px;
            margin-left: 10px;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.39;
            letter-spacing: normal;
            text-align: left;
            color: #050505;
          }
        }
      }
    }

    .card-content-invoice-left-signature {

      .card-content-invoice-left-signature-img {
        width: 315.3px;
        height: 261.7px;
      }

      .card-content-invoice-left-signature-title {
        width: 328px;
        height: 30px;
        font-size: 22px;
        font-weight: 800;
        font-stretch: normal;
        font-style: normal;
        line-height: 3.05;
        letter-spacing: normal;
        text-align: center;
        color: #050505;
      }
    }
  }

  .card-content-invoice-right {
    max-width: 982px;
    height: auto;
    margin: 0 50px;
    background: #ccc;
    flex-grow: 1;
  }
}
</style>
