<template>
  <div
    :class="{
      'invoice-budget-summary-service-list-item': true,
      'invoice-budget-summary-service-list-item-first': index === 0,
      'invoice-budget-summary-service-list-item-status-original-price': service.status === 'Original Price'
    }"
  >
    <h2
      v-if="service.additional_services"
      class="invoice-budget-summary-service-list-item-additional-services"
    >
      Additional Services
    </h2>
    <h4
      v-if="service.status === 'Original Price'"
      class="invoice-budget-summary-service-list-item-subtitle-original-price"
    >
      {{ service.subtitle }}
    </h4>
    <div
      v-if="service.status === 'Original Price'"
      class="invoice-budget-summary-service-list-item-header-original-price"
    >
      <span class="invoice-budget-summary-service-list-item-header-original-price-icon">
        <img
          v-if="service.icon"
          :src="service.icon"
          width="100%"
          height="100%"
        />
      </span>
      <h3 class="invoice-budget-summary-service-list-item-header-original-price-title">
        {{ service.title }}
      </h3>
      <span class="invoice-budget-summary-service-list-item-header-original-price-value">
        ${{ service.price }}
      </span>
    </div>
    <div
      v-if="service.status === 'Before discount'"
      class="invoice-budget-summary-service-list-item-header"
    >
      <span class="invoice-budget-summary-service-list-item-header-icon">
        <img
          v-if="service.icon"
          width="100%"
          height="100%"
          :src="service.icon"
        />
      </span>
      <h3 class="invoice-budget-summary-service-list-item-header-title">
        {{ service.title }}
      </h3>
    </div>
    <h4
      v-if="service.status === 'Before discount'"
      class="invoice-budget-summary-service-list-item-subtitle"
    >
      {{ service.subtitle }}
    </h4>
    <div
      v-if="service.your_proposal"
      class="invoice-budget-summary-service-list-item-price"
    >
      <span class="invoice-budget-summary-service-list-item-price-label">
        Your proposal
      </span>
      <span class="invoice-budget-summary-service-list-item-price-value">
        ${{ service.price }}
      </span>
    </div>
    <div
      v-if="service.status === 'Before discount'"
      class="invoice-budget-summary-service-list-item-before-discount"
    >
      <span class="invoice-budget-summary-service-list-item-before-discount-status">
        {{ service.status }}
      </span>
      <spna class="invoice-budget-summary-service-list-item-before-discount-percent">
        ({{ service.discount }}% off)
      </spna>
      <span class="invoice-budget-summary-service-list-item-before-discount-price">
        ${{ service.before_discount }}
      </span>
    </div>
    <div
      v-else
      class="invoice-budget-summary-service-list-item-original-price"
    >
      <span class="invoice-budget-summary-service-list-item-original-price-status">
        {{ service.status }}
      </span>
      <span class="invoice-budget-summary-service-list-item-original-price-value">
        ${{ service.original_price }}
      </span>
    </div>
    <div class="invoice-budget-summary-service-list-item-footer" />
  </div>
</template>

<script>
export default {
  name: "invoice-budget-summary-service",
  props: {
    service: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.invoice-budget-summary-service-list-item {
  padding: 30px 30px;

  .invoice-budget-summary-service-list-item-additional-services {
    margin-top: 0;
    font-size: 25px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #ffc001;
  }

  .invoice-budget-summary-service-list-item-header {
    display: flex;
    align-items: center;

    .invoice-budget-summary-service-list-item-header-icon {
      width: 32px;
      height: 34px;
      margin-right: 10px;
    }

    .invoice-budget-summary-service-list-item-header-title {
      height: fit-content;
      margin: 0;
      font-size: 20px;
      font-weight: 800;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #050505;
    }
  }

  .invoice-budget-summary-service-list-item-header-original-price {
    display: flex;
    align-items: center;

    .invoice-budget-summary-service-list-item-header-original-price-icon {
      width: 32px;
      height: 34px;
      margin-right: 10px;
    }

    .invoice-budget-summary-service-list-item-header-original-price-title {
      height: fit-content;
      margin: 0;
      font-size: 20px;
      font-weight: 800;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #050505;
      flex-grow: 1;
    }

    .invoice-budget-summary-service-list-item-header-original-price-value {
      font-size: 28px;
      font-weight: 800;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: right;
      color: #050505;
    }
  }

  .invoice-budget-summary-service-list-item-subtitle {
    margin: 10px 0 0 0;
    font-size: 16px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
    text-decoration: underline;
  }

  .invoice-budget-summary-service-list-item-subtitle-original-price {
    margin: 0 0 10px;
    font-size: 19px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
  }

  .invoice-budget-summary-service-list-item-price {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0;

    .invoice-budget-summary-service-list-item-price-label {
      height: fit-content;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #050505;
      flex-grow: 1;
    }

    .invoice-budget-summary-service-list-item-price-value {
      font-size: 25px;
      font-weight: 800;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: right;
      color: #050505;
    }
  }

  .invoice-budget-summary-service-list-item-before-discount {
    display: flex;

    .invoice-budget-summary-service-list-item-before-discount-status {
      font-size: 17px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #707070;
    }

    .invoice-budget-summary-service-list-item-before-discount-percent {
      margin: 0 50px;
      font-size: 17px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: right;
      color: #707070;
      flex-grow: 1;
    }

    .invoice-budget-summary-service-list-item-before-discount-price {
      margin: 0 0 0 50px;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: right;
      color: #707070;
      text-decoration: line-through;
    }
  }

  .invoice-budget-summary-service-list-item-original-price {
    display: flex;
    padding: 15px 0 0 0;

    .invoice-budget-summary-service-list-item-original-price-status {
      font-size: 17px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #707070;
      flex-grow: 1;
    }

    .invoice-budget-summary-service-list-item-original-price-value {
      font-size: 17px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      text-decoration: line-through;
      color: #707070;
    }
  }

  .invoice-budget-summary-service-list-item-footer {
    display: none;
    border-bottom: 1px solid #707070;
  }
}

.invoice-budget-summary-service-list-item-first {
  padding: 30px 30px 0;

  .invoice-budget-summary-service-list-item-footer {
    margin-top: 30px;
    display: block;
  }
}

.invoice-budget-summary-service-list-item-status-original-price {
  background-color: #ffedb7;
}
</style>
