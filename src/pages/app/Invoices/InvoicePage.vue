<template>
  <div>
    <div class="header">
      <div class="header-content">
        <div class="header-content-logo">
          <img src="static/img/maryoku-logo-light.png">
        </div>
        <div class="header-content-icon">
          <img width="88" height="88" src="static/icons/vendor/proposalBoard/filter-won.svg">
        </div>
        <h1 class="header-content-title">
          Thank you for your business! Now that Time to pour  yourself a drink
          & relax - <snap>Catering Booked!</snap>
        </h1>
      </div>
    </div>
    <div class="main-content">
      <invoice-card />
      <div class="card-accept-conditions-and-rate-experience">
        <div class="card-accept-conditions">
          <h2 class="card-accept-conditions-title">
            Would you like to look for more vendors through us?
          </h2>
          <div class="card-accept-conditions-wrapper-checkbox">
            <md-checkbox v-model="acceptConditions" class="card-accept-conditions-checkbox" />
            <div class="d-flex">
              <span class="card-accept-conditions-checkbox-label margin-right-5">I accept</span>
              <span class="card-accept-conditions-checkbox-label font-bold">Maryoku’s Terms & Conditions</span>
            </div>
          </div>
          <div class="card-accept-conditions-actions">
            <button class="card-accept-conditions-actions-button md-button md-red maryoku-btn">
              <router-link to="/user-events/61ddf35fcfefec75142519a4/booking/planningboard" >
                I Would More Details
              </router-link>
            </button>
            <span class="card-accept-conditions-actions-description">
              Thank You, But No.
            </span>
          </div>
        </div>
        <div class="card-rate-experience">
          <h2 class="card-rate-experience-title">
            Please Rate your experience?
          </h2>
          <select-smile-rate-experience
            v-model="rateExperience"
          />
          <span class="card-rate-experience-text">
            <span class="font-bold">Good to hear!</span> see you at the next event.
          </span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-content">
        <div class="footer-content-logo">
          <img src="static/img/maryoku-logo-light.png">
        </div>
        <div class="footer-content-text">
          Who are we and why are we great?
        </div>
        <md-button href="http://www.maryoku.com" target="_blank" class="footer-content-action edit-btn md-round nav-right nav-btn md-raised md-white">
          <md-icon class="footer-content-action-icon">
            keyboard_arrow_right
          </md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import InvoiceCard from "@/pages/app/Invoices/InvoiceCard";
import SelectSmileRateExperience from "@/pages/app/Invoices/SelectSmileRateExperience.vue";

export default {
  name: "InvoicePage",
  components: {
    InvoiceCard,
    SelectSmileRateExperience,
  },
  data() {
    return {
      acceptConditions: false,
      rateExperience: 5,
    };
  }
};
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

          a {
            font-size: 20px;
            font-weight: 800;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.42px;
            text-transform: initial;
            text-align: center;
            color: #fff;

            &:hover {
              text-decoration: initial;
            }
          }
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
  margin-top: -115px;

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

    .footer-content-action {
      width: 37px;
      height: 37px;
      margin-left: 20px !important;

      .footer-content-action-icon {
        width: 37px;
        height: 37px;
        font-size: 37px !important;
        color: #641856 !important;
      }
    }
  }
}
</style>
