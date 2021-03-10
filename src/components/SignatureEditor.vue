<template>
  <div class="signature-editor">
    <a class @click="uploadVendorSignature">
      <img :src="`${$iconURL}Vendor Signup/Asset 559.svg`" style="width: 20px" /> Choose File
    </a>
    <div class="or">Or</div>
    <div class="sign-here">
      <vueSignature ref="signature" :sigOption="option" :w="'100%'" :h="'100%'" />
      <md-button class="md-simple md-vendor edit-btn" @click="clear">Clear</md-button>
    </div>
    <input
      type="file"
      class="d-none"
      ref="signatureFile"
      name="vendorSignature"
      accept="image/gif, image/jpg, image/png"
      @change="onVendorImageFilePicked"
    />
  </div>
</template>
<script>
import vueSignature from "vue-signature";
import S3Service from "@/services/s3.service";
export default {
  components: {
    vueSignature,
  },
  data() {
    return {
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)",
      },
      imageLink: "",
    };
  },
  methods: {
    uploadVendorSignature(imageId = null, attachmentType = null) {
      this.$refs.signatureFile.click();
    },
    clear() {
      this.$refs.signature.clear();
    },
    createImage(file, type) {
      let reader = new FileReader();
      let vm = this;
      this.isLoading = true;
      reader.onload = (e) => {
        const fileId = `${new Date().getTime()}_${makeid()}`;
        S3Service.fileUpload(file, fileId, "vendor/signatures").then((uploadedName) => {
          this.$root.$emit(
            "update-vendor-value",
            "signature",
            `https://maryoku.s3.amazonaws.com/vendor/signatures/${uploadedName}`,
          );
        });
        this.imageLink = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    save() {
      let _this = this;
      let jpeg = _this.$refs.signature.save("image/jpeg");
      return jpeg;
    },
    onVendorImageFilePicked(event) {
      let file = event.target.files || event.dataTransfer.files;
      if (!file.length) {
        return;
      }
      if (file[0].size <= 5 * 1024 * 1024) {
        // 5mb
        this.createImage(file[0], "vendorSignature");
      } else {
        this.$notify({
          message: "You've Uploaded an Image that Exceed the allowed size, try small one!",
          horizontalAlign: "center",
          verticalAlign: "top",
          icon: "warning",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.signature-editor {
  text-align: center;
  .sign-here {
    border: dashed 1px #f51355;
  }
}
</style>