<template>
  <div>
    <div class="header" >
      <div class="header-content">
        <div class="header-content-logo">
          <img src="static/img/maryoku-logo-light.png" />
        </div>
        <div class="header-content-icon">
          <img width="88" height="88" src="static/icons/vendor/proposalBoard/filter-won.svg" />
        </div>
        <h1 class="header-content-title">
          Thank you for your business! Now that Time to pour  yourself a drink
          & relax - <snap>Catering Booked!</snap>
        </h1>
      </div>
    </div>
    <div class="main-content">
      <div class="card-invoice">
        <div class="card-header-invoice">
          <span class="card-header-invoice-subtitle" >Invoice for</span>
          <div class="card-header-invoice-details">
            <div class="card-header-invoice-details-logo">
              <img width="90" height="90" src="static/icons/maryoku_icon_yellow.png" />
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
                  <img width="26" height="21" src="static/icons/mail-outline.svg" />
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
        <div class="card-content-invoice">
          <div class="card-content-invoice-left">
            <div class="card-content-invoice-left-header">
              <span class="card-content-invoice-left-header-invoice-number" >INVOICE.NO#00012</span>
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
                    <img width="26" height="21" src="static/icons/mail-outline.svg"/>
                  </span>
                  <span class="card-content-invoice-left-customer-details-contact-item">
                    Racheli@microsoft-r&d.com
                  </span>
                </li>
                <li>
                  <span class="card-content-invoice-left-customer-details-contact-item-icon">
                    <img width="21" height="26" src="static/icons/location-outline.svg"/>
                  </span>
                  <span class="card-content-invoice-left-customer-details-contact-item">
                    Microsoft R&D, 51 Ellicott St. Batavia NY, USA 74812
                  </span>
                </li>
                <li>
                  <span class="card-content-invoice-left-customer-details-contact-item-icon">
                    <img width="26" height="26" src="static/icons/phone-outline.svg" />
                  </span>
                  <span class="card-content-invoice-left-customer-details-contact-item">
                    077-3000293
                  </span>
                </li>
              </ul>
            </div>
            <div class="card-content-invoice-left-signature">
              <img class="card-content-invoice-left-signature-img" src="static/img/maryoku-signature.png" />
              <h3 class="card-content-invoice-left-signature-title">
                Authorized Stamp & Signature
              </h3>
            </div>
          </div>
          <div class="card-content-invoice-right">

          </div>
        </div>
      </div>

      <div class="card-accept-conditions-and-rate-experience">
        <div class="card-accept-conditions">
          <h2 class="card-accept-conditions-title">
            Would you like to look for more vendors through us?
          </h2>
          <div class="card-accept-conditions-wrapper-checkbox">
            <md-checkbox class="card-accept-conditions-checkbox" />
            <div class="d-flex">
              <span class="card-accept-conditions-checkbox-label margin-right-5">I accept</span>
              <span class="card-accept-conditions-checkbox-label font-bold">Maryoku’s Terms & Conditions</span>
            </div>
          </div>
          <div class="card-accept-conditions-actions">
            <md-button class="card-accept-conditions-actions-button">
              I would more details
            </md-button>
            <span class="card-accept-conditions-actions-description">
              Thank You, But No.
            </span>
          </div>
        </div>
        <div class="card-rate-experience">
          <h2 class="card-rate-experience-title" >
            Please Rate your experience?
          </h2>
          <img class="card-rate-experience-select" src="static/img/Group%2028371.png" />
          <span class="card-rate-experience-text">
            Good to hear! see you at the next event.
          </span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-content">
        <div class="footer-content-logo">
          <img src="static/img/maryoku-logo-light.png" />
        </div>
        <div class="footer-content-text">
          Who are we and why are we great?
        </div>
        <div class="footer-content-icon" >

        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 729px;
  object-fit: contain;
  opacity: 0.98;
  background-color: #f51355;

  .header-content {
    max-width: 1920px;
    display: flex;
    flex-wrap: wrap;
    padding: 55px 65px;
    margin: 0 auto;
    flex-grow: 1;

    .header-content-logo {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    .header-content-icon {
      width: 100%;
      margin: 0 0 0 185px;
    }

    .header-content-title {
      max-width: 1044px;
      margin: 10px 0 10px 185px;
      font-size: 60px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.12;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
  }
}

.main-content {
  transform: translateY(-175px);
  padding: 0 65px;

  .card-invoice {
    max-width: 1792px;
    min-height: 500px;
    margin: 0 auto;
    padding: 80px 115px 110px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

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

    .card-content-invoice {
      display: flex;
      min-height: 1374px;
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

              .card-content-invoice-left-customer-details-contact-item-icon {

              }

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
  }

  .card-accept-conditions-and-rate-experience {
    display: flex;
    max-width: 1792px;
    min-height: 490px;
    margin: 60px auto 0;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #fff;

    .card-accept-conditions {
      max-width: 632px;
      padding: 95px 115px;

      .card-accept-conditions-title {
        margin-bottom: 30px;
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.31;
        letter-spacing: normal;
        text-align: left;
        color: #000;
      }

      .card-accept-conditions-wrapper-checkbox {
        display: flex;
        align-items: center;
        margin-bottom: 30px;

        .card-accept-conditions-checkbox {

        }

        .card-accept-conditions-checkbox-label {
          font-size: 20px;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: normal;
          text-align: left;
          color: #050505;

          &.margin-right-5 {
            margin-right: 5px;
          }
        }
      }

      .card-accept-conditions-actions {
        display: flex;
        flex-direction: column;

        .card-accept-conditions-actions-button {
          width: 309px;
          height: 78px;
          margin-bottom: 15px;
          padding: 25px 51px 26px 50px;
          border-radius: 3px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #f51355;
        }

        .card-accept-conditions-actions-description {
          font-size: 20px;
          font-weight: 800;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.42px;
          color: #707070;

        }
      }
    }

    .card-rate-experience {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 1160px;
      border-radius: 3px;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
      border: solid 1px #707070;
      background-color: #f2f2f2;
      flex-grow: 1;

      .card-rate-experience-title {
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.41;
        letter-spacing: normal;
        text-align: center;
        color: #000;
      }

      .card-rate-experience-select {
        width: 747.8px;
        height: 138.7px;
      }

      .card-rate-experience-text {
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        color: #000;
      }
    }
  }
}

.footer {
  width: 100%;
  background: #333;
  padding: 37px 65px;

  .footer-content {
    max-width: 1920px;
    display: flex;
    align-items: center;
    margin: 0 auto;

    .footer-content-logo {
      width: 141px;
      height: 35px;
      margin-right: 20px;
    }

    .footer-content-text {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: center;
      color: #fff;
    }

    .footer-content-icon {

    }
  }
}
</style>
