<template>
  <div class="card-header-invoice">
    <span class="card-header-invoice-subtitle">
      Invoice for
    </span>
    <div class="card-header-invoice-details">
      <div class="card-header-invoice-details-logo">
        <img width="90" height="90" src="../../../../../static/icons/maryoku_icon_yellow.png" />
      </div>
      <div class="card-header-invoice-details-campaign">
        <h2 class="card-header-invoice-details-campaign-title">
          Maryoku Company Ltd.
        </h2>
        <span class="card-header-invoice-details-campaign-number">
            Company No. GST-200506877R
          </span>
        <div class="card-header-invoice-details-campaign-P_O_Box">
            <span class="icon">
              <img width="26" height="21" src="../../../../../static/icons/mail-outline.svg" />
            </span>
          <span class="label">
              P.O. Box:
            </span>
          <span class="value">
              51 Ellcott St. Batavia | Trump World Tower # 14-02 NY, USA 74812
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "invoice-card-header"
}
</script>

<style lang="scss" scoped>
.card-header-invoice {
  padding: 0 70px;

  .card-header-invoice-subtitle {
    width: 112px;
    height: 30px;
    font-size: 22px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 3.05;
    letter-spacing: normal;
    text-align: center;
    color: #050505;
  }

  .card-header-invoice-details {
    display: flex;
    margin: 40px 0 20px;

    .card-header-invoice-details-logo {

    }

    .card-header-invoice-details-campaign {
      display: flex;
      flex-direction: column;
      margin-left: 20px;

      .card-header-invoice-details-campaign-title {
        margin: 10px 0 10px;
        font-size: 35px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.12;
        letter-spacing: normal;
        text-align: left;
      }

      .card-header-invoice-details-campaign-number {
        margin-bottom: 15px;
        font-size: 25px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #525252;
      }

      .card-header-invoice-details-campaign-P_O_Box {
        display: flex;
        align-items: flex-end;
      }

      .card-header-invoice-details-campaign-P_O_Box .icon {
        height: 24px;
        margin-right: 5px;
      }

      .card-header-invoice-details-campaign-P_O_Box .label {
        height: 28px;
        font-size: 22px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
      }

      .card-header-invoice-details-campaign-P_O_Box .value {
        height: 28px;
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
      }
    }
  }
}
</style>
