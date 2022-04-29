<template>
  <modal
    :class="{
      'upload-files-modal': true,
      'upload-files-modal-with-carousel': !!files.length
    }"
  >
    <template slot="header">
      <ModalHeader @close="close" />
    </template>
    <template slot="body">
      <ModalBody :files="files" @load="uploadFiles" @dropFile="dropFile" :isLoading="isLoading" />
    </template>
    <template slot="footer">
      <div class="upload-files-modal-footer-content">
        <div v-if="!files.length" class="d-flex">
          <img src="/static/icons/red-delete-icon.svg">
          <div class="bottom-block-delete-text">
            Delete the images marked with V
          </div>
        </div>
        <div v-else class="d-flex">
          <img src="/static/icons/red-delete-icon.svg">
          <div class="bottom-block-presentation-text">
            Put a check next to the file you want to appear in the main view.
          </div>
        </div>
        <div class="ml-auto d-flex align-center">
          <md-button class="md-simple maryoku-btn" @click="close">
            Cancel
          </md-button>
          <md-button
            class="md-red maryoku-btn ml-10"
            @click="uploadFiles"
          >
            Upload files
          </md-button>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

import S3Service from "@/services/s3.service";

// components
import { Modal }   from "@/components";
import ModalHeader from "./ModalHeader";
import ModalBody   from "./ModalBody";

// helpers
import { uploadFiles } from "@/helpers/window/upload";
import { getBase64 }   from "@/utils/file.util";
import map             from "@/helpers/array/map";

const MAX_SIZE  = 1024 * 1024 * 25;
const MAX_COUNT = 10;

export default {
  name: "FeedbackUploadImagesModal",
  components: {
    Modal,
    // vueDropzone: vue2Dropzone,
    // FeedbackUploadImagesCarousel,
    // ProposalInspirationalPhotosItem,
    ModalHeader,
    ModalBody,
  },
  props: {
    folderNameForUpload: {
      type: String,
      required: true,
    },
    files: {
      type    : Array,
      default : () => ([]),
    },
  },
  data: () => ({
    dropzoneOptions: {
      url                   : "https://httpbin.org/post",
      maxFilesize           : 25,
      maxFiles              : MAX_COUNT,
      createImageThumbnails : false,
      uploadMultiple        : true,
      acceptedFiles         : "image/*, video/*, .xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf",
      headers               : { "My-Awesome-Header": "header value" },
    },
    carouselItemIndex: 0,
    files: [],
    isLoading: false,
  }),
  methods: {
    updateFile (index, data) {
      const file = this.files[index];
      if (file) this.files[index] = Object.assign(file, data);
      return file;
    },

    generateFileName (file) {
      const extension = file.type.split("/")[1];
      const fileName  = uuidv4();
      return `${fileName}.${extension}`;
    },

    saveFile (file) {
      return S3Service.fileUpload(file, this.generateFileName(file), this.folderNameForUpload, true);
    },

    async saveFiles (files) {
      this.isLoading = true;
      const functionsUploadFiles = [];
      for (const file of files) {
        functionsUploadFiles.push(
          S3Service.fileUpload(file, file.rename || file.name, this.folderNameForUpload, true)
        );
      }
      Promise.all(functionsUploadFiles).then((responses) => {
        this.isLoading = false;
        const files = responses.map(({ data }) => data.upload);
        this.$emit("upload-files", this.files.map((file) => {
          const found = files.find((responseFile) => responseFile.name === (file.rename || file.name));
          if (found) return {
            ...found,
            base64: file.base64,
          };
          return file;
        }));
      });
    },

    generateName (file) {
      const extension = file.type.split("/")[1];
      const fileName = uuidv4();
      return `${fileName}.${extension}`;
    },

    uploadFiles () {
      const { length = 0 } = (this.files || {});
      const max = MAX_COUNT - length;
      if (max > 0) {
        return uploadFiles(async (files) => {
          this.files = [...this.files, ...await Promise.all(Array.from(files, async (file) => {
            const base64 = await getBase64(file);
            return Object.assign(file, { base64, rename: this.generateName(file) });
          }))];
          this.saveFiles(this.files);
        }, {
          max,
          multiple : true,
          accept   : "image/*, video/*, .xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf",
        });
      }
    },

    close() {
      this.$emit("close");
    },

    dropFile (byIndex) {
      this.files = this.files.filter((file, index) => byIndex !== index);
      this.saveFiles(this.files);
    },
  }
};
</script>

<style lang="scss" scoped>
.upload-files-modal-footer-content {
  width: 948px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .bottom-block-delete-text {
    font-size: 16px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.34px;
    text-align: left;
    color: #f51355;
    margin-left: 14px;
    margin-top: 7px;
    cursor: pointer;
  }

  .bottom-block-presentation-text {
    margin: 4px 0 4px 10.2px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
  }
}
</style>
