<template>
  <Modal v-if="showModal" :styles="modalCustomStyles">
    <template slot="header">
      <div class="header">
        <span>Enter Your Signature</span>
        <button @click="showModal = !showModal">
          close
        </button>
      </div>
    </template>
    <template slot="body" class="body">
      <div class="select-sign-type">
        <input type="radio" name="draw" id="draw" v-model="signatureType" value="draw">
        <label for="draw">
          draw
        </label>
        <input type="radio" name="type" id="type" v-model="signatureType" value="type">
        <label for="type">
          type
        </label>
        <input type="radio" name="upload" id="upload" v-model="signatureType" value="upload">
        <label for="upload">
          Upload
        </label>
      </div>
      <div class="signature-editor" v-show="signatureType === 'draw'">
        <img v-if="signatureData" :src="`${signatureData}`">
        <vueSignature ref="signature" :sig-option="option" :w="'100%'" :h="'100%'"/>
        <input
          ref="signatureFile"
          type="file"
          class="d-none"
          name="vendorSignature"
          accept="image/gif, image/jpg, image/png"
          @change="onSignatureFilePicked"
        >
      </div>
      <vue-dropzone
        v-show="signatureType === 'upload'"
        id="drop"
        ref="csv"
        :options="dropzoneOptions"
        :use-custom-slot="true"
        class="file-drop-zone upload-section text-center"
        @vdropzone-file-added="handleAdded"
      >
        <md-button class="md-outlined md-simple md-rose md-dense font-size-14">
          <i class="fas fa-paperclip md-simple pr-5"/>
          <span>Choose File</span>
        </md-button>

        <div class="font-size-13 font-bold" style="">
          Or
        </div>
        <div class="font-size-14">
          Drag your file here
        </div>
      </vue-dropzone>
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
      signatureType: "draw",
      signatureData: "",
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)",
      },
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 5,
        headers: {"My-Awesome-Header": "header value"},
      },
    };
  },
  methods: {
    async handleAdded(file) {
      this.fileIsLoading = true;
      this.csv = file;
      this.fileName = file.name;
      let data = {
        vendorId: this.vendorData.id,
        // file: await getBase64(file)
      };
      // this.submit(data);
    },
    save() {
      let jpeg = this.$refs.signature.save("image/jpeg");
      this.$root.$emit("update-proposal-value", "signature", jpeg);
      console.log(this.vendor);
    },
    clear() {
      this.signatureData = "";
      this.$refs.signature.clear();
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
  min-width: 60vw;
  width: 100%;

  span {
    font-family: 'Manrope-bold';
    font-size: 30px;
    font-weight: bold;
  }

}

.select-sign-type {
  input {
    //display: none;
  }
}

.signature-editor {
  text-align: center;

  .sign-here {
    border: dashed 1px #f51355;

    img {
      max-height: 300px;
      object-fit: contain;
    }
  }
}

.sign-here {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
