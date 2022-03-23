<template>
  <Modal v-if="showModal" :styles="modalCustomStyles">
    <template slot="header">
      <div class="header">

        <span> <i class="fas fa-pencil-alt" /> Enter Your Signature</span>
        <div @click="closeModal">
          <md-icon>close</md-icon>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="body">
        <div class="select-sign-type">
          <input type="radio" name="draw" id="draw" v-model="signatureType" value="draw">
          <label for="draw" :class="{selected: signatureType === 'draw'}">
            Draw
          </label>
          <input type="radio" name="type" id="type" v-model="signatureType" value="type">
          <label for="type" :class="{selected: signatureType === 'type'}">
            Type
          </label>
          <input type="radio" name="upload" id="upload" v-model="signatureType" value="upload">
          <label for="upload" :class="{selected: signatureType === 'upload'}">
            Upload
          </label>
        </div>
        <div class="block-separator"></div>
        <div class="signature-editor" id="signatureEditor" v-show="signatureType === 'draw'"
             @mousedown="signatureAdded = true">
          <img v-if="signatureData" :src="`${signatureData}`">
          <div v-if="!signatureAdded" class="signature-description">
            <i class="fas fa-pencil-alt" />
            <br/>
            <span>
              Tap here to start drawing
              <br/>
              your signature
            </span>
          </div>
          <vueSignature v-if="!signatureData" ref="signature" :sig-option="option" :w="'100%'" :h="'99%'"/>
          <input
            ref="signatureFile"
            type="file"
            class="d-none"
            name="vendorSignature"
            accept="image/gif, image/jpg, image/png"
            @change="onSignatureFilePicked"
          >
        </div>
        <div class="signature-editor type" v-show="signatureType === 'type'">
          <input v-model="signatureName"/>
        </div>
        <vue-dropzone
          v-show="signatureType === 'upload'"
          id="drop"
          ref="myVueDropzone"
          :options="dropzoneOptions"
          :use-custom-slot="true"
          class="file-drop-zone upload-section text-center drop-zone"
          @vdropzone-file-added="handleAdded"
        >
          <div class="dz-message"></div>
          <div v-if="!uploadedSignature">
            <md-button class="md-outlined md-simple md-rose md-dense font-size-14">
              <i class="fas fa-paperclip md-simple pr-5"/>
              <span>Choose File</span>
            </md-button>

            <div class="font-size-13 font-bold" style="color: #707070">
              Or
            </div>
            <div class="font-size-14" style="color: #a0a0a0">
              Drag your file here
            </div>
          </div>
        </vue-dropzone>
      </div>
    </template>
    <template slot="footer">
      <div class="sign-here">
        <md-button class="md-simple edit-btn" @click="clear">
          Cancel
        </md-button>
        <md-button class="md-red" @click="save">
          Apply
        </md-button>
      </div>
    </template>
  </Modal>
</template>

<script>
import vueSignature from "vue-signature";
import {Modal} from "../../../../components";
import S3Service from "@/services/s3.service";
import vue2Dropzone from "vue2-dropzone";

export default {
  name: "AddSignatureModal",
  components: {
    vueDropzone: vue2Dropzone,
    vueSignature,
    Modal,

  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
    async handleAdded(file) {
      this.$refs.myVueDropzone.removeFile(this.uploadedSignature);
      this.fileIsLoading = true;
      this.uploadedSignature = file;
      this.fileName = file.name;
      // let data = {
        // vendorId: this.vendorData.id,
        // file: await getBase64(file)
      // };
      // this.submit(data);
    },
    closeModal(){
      this.showModal = false;
      this.$emit("modal-closed");
    },
    save() {
      let jpeg;
      if(this.signatureAdded) {
         jpeg = this.$refs.signature.save("image/svg+xml");
         this.signatureData = jpeg;
      }
      this.$emit("update-signature", {uploadedSignature: this.uploadedSignature, jpeg, signatureName: this.signatureName});
      this.$root.$emit("update-proposal-value", "signature", jpeg);
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
    async onSignatureFilePicked(e) {
      const file = e.target.files[0];
      const extension = file.type.split("/")[1];
      const fileId = `${new Date().getTime()}`;
      S3Service.fileUpload(file, fileId, "vendor/signatures").then(async (uploadedName) => {
        this.content = `https://maryoku.s3.amazonaws.com/vendor/signatures/${fileId}.${extension}`;
        // this.signatureData = await getBase64(file);
      });

      this.$refs.signature.fromDataURL(imageData);
    },
    uploadSignatureFile() {
      this.$refs.signatureFile.click();
    },
  },
  computed: {
    modalCustomStyles() {
      return {
        header: "padding: 0"
      };
    }
  }

};
</script>

<style lang="scss" scoped>

.header {
  background-color: #f3f7fd;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  min-width: 800px;
  max-width: 900px;
  width: 100%;

  span {
    font-family: 'Manrope-bold';
    font-size: 30px;
    font-weight: bold;
  }

}

.body {
  min-height: 400px;
  position: relative;

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
    height: 300px;
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
    height: 300px;
    border: 1px solid #a0a0a0;
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
