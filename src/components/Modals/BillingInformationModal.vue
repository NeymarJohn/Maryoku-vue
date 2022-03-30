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
        <div class="body-header">
          <span>Business Profile</span>
          <md-button class="md-simple md-vendor">
            <span style="font-weight: bold">Edit</span>
          </md-button>
        </div>
        <div class="signature-editor" id="signatureEditor" v-show="step === 0"
             @mousedown="signatureAdded = true">
          <business-profile/>
        </div>
        <div class="signature-editor type" v-show="step === 1">
        </div>
        <div class="signature-editor type" v-show="step === 2">
        </div>
      </div>
    </template>
    <template slot="footer">
      <div v-if="step>0" @click="step = step-1">
        Back to previous step
      </div>
      <div class="sign-here">
        <md-button class="md-vendor" @click="save">
          {{buttonText}}
        </md-button>
      </div>
    </template>
  </Modal>
</template>

<script>
import {Modal} from "../index";
import BusinessProfile from "./ModalComponents/BusinessProfile";
export default {
  name: "AddSignatureModal",
  components: {
    BusinessProfile,
    Modal,
  },
  props: {},
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
      dropzoneOptions: {
        previewTemplate: this.template(),
        paramName: "images",
        url: "https://httpbin.org/post",
        acceptedFiles: "image/*",
        maxFilesize: 5,
        headers: {"My-Awesome-Header": "header value"},
      },
    };
  },
  computed: {
    vendorData() {
      return this.$store.state.vendor.profile;
    },
    buttonText(){
      switch (this.step){
        case 0:{
          return "confirmation";
        }
        case 1:{
          return "next";
        }
        case 2:{
          return "finish";
        }
      }
      return "";
    },
    modalCustomStyles() {
      return {
        header: "padding: 0",
        body: "background-color: #f3f7fd;",
        footer: "background-color: #f3f7fd"
      };
    }
  },
  methods: {

    template: function () {
      return `<div class="dz-preview dz-file-preview">
                <div class="dz-image">
                    <div data-dz-thumbnail-bg>
                    <img data-dz-thumbnail />
                    </div>
                </div>
            </div>
        `;
    },
    goToStep(step) {
      this.step = step;
    },
    save() {
      switch (this.step){
        case 0:{
          this.step = 1;
          break;
        }
        case 1:{
          this.step = 2;
          break;
        }
        case 2:{
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
  //background-color: #f3f7fd;
  //padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  min-width: 700px;
  max-width: 800px;
  width: 100%;

  span {
    font-family: 'Manrope-bold';
    font-size: 30px;
    font-weight: bold;
  }

}

.body {
  position: relative;
  max-width: 700px;
  padding: 0 60px;
  .body-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .select-sign-type {
    display: flex;

    input {
      display: none;
    }

    label {
      width: 60px;
      margin-left: 30px;
      font-size: 20px;
      font-family: "Manrope-regular";
      position: relative;

      &.selected::after {
        content: " ";
        position: absolute;
        width: 60px;
        bottom: -31px;
        left: 0;
        border-bottom: solid 2px #f51355;
      }
    }
  }

  .drop-zone {
    min-height: 300px;
    border: 1px solid #a0a0a0;
    border-radius: 3px;
  }

  .block-separator {
    margin: 30px -40px;
    display: block;
    width: 900px;
    height: 1px;
    border-bottom: #a0a0a0 solid 1px;
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

    .signature-description {
      font-family: 'Manrope-bold';
      font-size: 16px;
      font-weight: 800;
      position: absolute;
      top: 43%;
      left: 37%;
      color: #a0a0a0;
    }

    &.type {
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        border: none;
        border-radius: unset;
        border-bottom: 1px solid #a0a0a0;
        width: 85%;
        text-align: center;
        font-size: 85px;
      }
    }

    .sign-here {
      border: dashed 1px #f51355;

      img {
        max-height: 300px;
        object-fit: contain;
      }
    }
  }
}

.sign-here {
  display: flex;
  justify-content: end;
  align-items: center;
}

@media screen and (max-width: 970px) {
  .header {
    min-width: unset;
    max-width: unset;
  }
  .body {
    .block-separator {
      margin: 30px 0;
      width: 100%;
    }
  }
}
</style>
