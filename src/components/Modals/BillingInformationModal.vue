<template>
  <Modal :styles="modalCustomStyles">
    <template slot="header">
      <div class="header">
        <div class="steps-cont">
          <ul class="progressbar">
            <li :class="[{ active: step >= 0 }, { current: step === 0 }]" @click="goToStep(0)">
              <span v-if="step === 0"><i>&#8226;</i></span>
              <span v-else><md-icon>check</md-icon></span>
              <br>
              Business Profile
            </li>
            <li :class="[{ active: step > 1 }, { current: step === 1 }, { inactive: step < 1 }]" @click="goToStep(1)">
              <span v-if="step >= 2"><md-icon>check</md-icon></span>
              <span v-else><i>&#8226;</i></span>
              <br>
              Bank Details
            </li>
            <li :class="[{ active: step >= 3 }, { current: step === 2 }, { inactive: step < 2 }]" @click="goToStep(2)">
              <span v-if="step >= 3"><md-icon>check</md-icon></span>
              <span v-else><i>&#8226;</i></span>
              <br>
              Authentication
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="body">
        <div v-show="step === 0" class="body-header">
          <span style="font-weight: bold;">Business Profile</span>
          <md-button class="md-simple md-vendor">
            <span style="font-weight: bold">Edit</span>
          </md-button>
        </div>
        <div
          v-show="step === 0"
          id="signatureEditor"
          class="signature-editor"
          @mousedown="signatureAdded = true"
        >
          <business-profile />
        </div>
        <div v-show="step === 1" class="body-header" style="flex-direction: column; align-items: start; margin: 20px 0">
          <span style="font-weight: bold; margin-bottom: 20px">Bank Details</span>
          <div class="info-block md-layout-item md-size-100">
            <p style="padding: 20px 10px; text-align: start">
              Please enter your bank account details. All money owed to you will be transferred
              to this account, so please check that your details are correct and up to date.
            </p>
          </div>
        </div>
        <div v-show="step === 1" class="signature-editor type">
          <billing-info ref="billingInfo" />
        </div>
        <div v-show="step === 2" class="md-layout-item md-size-100 body-header mb-1">
          <div>
            <img class="shield-icon" :src="`/static/icons/shield.svg`">
            <span class="authentication-header">User Authentication</span>
          </div>
        </div>
        <div v-show="step === 2" class="signature-editor type">
          <auth-info ref="authInfo1" part="1" />
        </div>
        <div v-show="step === 2" class="signature-editor type" style="margin-top: 20px; min-height: unset">
          <auth-info ref="authInfo2" part="2" />
        </div>
      </div>
    </template>
    <template slot="footer">
      <div class="footer">
        <div>
          <md-button class="md-vendor" @click="save">
            {{ buttonText }}
          </md-button>
        </div>
        <div v-if="step>0" class="go-back" @click="step = step-1">
          <i class="material-icons-outlined location-icon mr-10">keyboard_backspace</i>
          <span>Back to previous step</span>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import {Modal} from "../index";
import BusinessProfile from "./ModalComponents/BusinessProfile";
import BillingInfo from "./ModalComponents/BillingInfo";
import AuthInfo from "./ModalComponents/AuthInfo";

export default {
  name: "AddSignatureModal",
  components: {
    BusinessProfile,
    BillingInfo,
    AuthInfo,
    Modal,
  },
  data() {
    return {
      step: 0,
      signatureName: "",
      signatureAdded: false,
      signatureType: "draw",
      signatureData: "",
      uploadedSignature: "",
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)",
      },
    };
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
    buttonText() {
      switch (this.step) {
        case 0: {
          return "CONFIRMATION";
        }
        case 1: {
          return "NEXT";
        }
        case 2: {
          return "FINISH";
        }
      }
      return "";
    },
    modalCustomStyles() {
      return {
        header: "padding: 0",
        body: "background-color: #f3f7fd;",
        footer: "background-color: #f3f7fd;"
      };
    }
  },
  methods: {
    goToStep(step) {
      this.step = step;
    },
    save() {
      switch (this.step) {
        case 0: {
          this.step = 1;
          break;
        }
        case 1: {
          this.$refs.billingInfo.saveBillingInfo();
          this.step = 2;
          break;
        }
        case 2: {
          this.$refs.authInfo1.saveBillingInfo();
          this.$refs.authInfo2.saveBillingInfo();
          this.$emit("close-modal");
          break;
        }
      }
    },
    clear() {
      switch (this.signatureType) {
        case "draw":
          this.signatureData = "";
          this.$refs.signature.clear();
          this.signatureAdded = false;
          break;
        case "type":
          this.signatureName = "";
          break;
        case "upload":
          this.$refs.myVueDropzone.removeAllFiles(true);
          this.uploadedSignature = "";
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.steps-cont {
  width: 100%;
  margin: 0 auto;
  color: #a0a0a0;

  .progressbar {
    counter-reset: step;
    display: flex;

    li {
      list-style-type: none;
      float: left;
      width: 33.33%;
      position: relative;
      text-align: center;
      font-weight: 600;
      font-size: 16px;

      span {
        cursor: pointer;
        width: 34px;
        height: 34px;
        display: inline-block;
        border-radius: 50%;
        z-index: 2;
        position: relative;
        margin-bottom: 8px;
        color: #e0ae17;
      }

      &.active,
      &.current {
        span {
          background: #ffc001;
          box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.26);
          i {
            color: white;
            position: relative;
            top: 3px;
          }
        }
      }

      &.current {
        span {
          i {
            position: relative;
            top: 4px;
            left: 1px;
            font-size: 30px;
            font-style: normal;
            display: inline;
            text-shadow: 0 2px 3px rgba(0, 0, 0, 0.42);
          }
        }
      }

      &.inactive {
        span {
          i {
            color: #707070;
            position: relative;
            top: 2px;
            font-size: 50px;
            font-style: normal;
          }
        }
      }

      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: #707070;
        top: 15px;
        left: -50%;
      }

      &:first-child:after {
        content: none;
      }

      &.active,
      &.current {
        color: #e0ae17;
      }

      &.active:before,
      &.current:before {
        background-color: #ffc001;
        color: white;
      }

      &.active:after,
      &.current:after {
        background-color: #ffc001;
      }
    }
  }
}

.header {
  display: flex;
  justify-content: space-between;
  min-width: 700px;
  max-width: 800px;
  width: 100%;
}

.body {
  position: relative;
  max-width: 700px;
  padding: 0 60px;

  .body-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info-block {
      padding: 0 25px;
      display: flex;
      flex-direction: row;
      color: #641856;
      border: 1px solid #9f2488;
    }
  }
  .signature-editor {
    text-align: center;
    width: 100%;
    min-height: 300px;
    border: 1px solid #a0a0a0;
    background-color: white;
    border-radius: 3px;
    padding-top: 1px;
    position: relative;
  }
}
.footer {
  align-items: center;
  width: 100%;
  margin: 0 37px;
  display: flex;
  justify-content: space-between;
  flex-flow: row-reverse;

  .go-back {
    display: flex;
    color: #818080;
    font-size: 15px;
    cursor: pointer;
  }
}

@media screen and (max-width: 970px) {
  .header {
    min-width: unset;
    max-width: unset;
  }
}
</style>
