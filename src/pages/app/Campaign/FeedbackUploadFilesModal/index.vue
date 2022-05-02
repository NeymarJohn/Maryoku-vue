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
      <ModalBody :files="fullFiles" :is-loading="isLoading" @load="uploadFiles" @dropFile="dropFile" />
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
            :disabled="!acceptUpload || isLoading"
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
import arrayLimit      from "@/helpers/array/limit";

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
    uploadedFiles   : [],
    waitUploadFiles : [],
    isLoading       : false,
    isDeleted       : false,
    isUploaded      : false,
  }),
  computed: {
    fullFiles () {
      if (this.uploadedFiles.length) {
        if (this.waitUploadFiles.length) return this.uploadedFiles.concat(this.waitUploadFiles);
        return this.uploadedFiles;
      }
      return this.waitUploadFiles;
    },
    isUpload () {
      return this.waitUploadFiles.length > 0;
    },
    isDelet () {
      return this.files.length > this.uploadedFiles.length;
    },
    isUpdate: {
      get () {
        return this.isUploaded || this.isDeleted;
      },
      set (value) {
        this.isUploaded = value;
        this.isDeleted  = value;
      },
    },
    acceptUpload () {
      const { length = 0 } = (this.fullFiles || []);
      return length < MAX_COUNT;
    }
  },
  watch: {
    files() {
      // upload only no loaded prevent
      if (this.uploadedFiles.length <= 0) this.resetDefaultFiles();
    }
  },
  created () {
    this.resetDefaultFiles();
  },
  methods: {
    resetDefaultFiles () {
      this.uploadedFiles = Array.from(this.files);
    },
    updateFile (index, data) {
      const file = this.files[index];
      if (file) this.files[index] = Object.assign(file, data);
      return file;
    },

    getExtansionsFile (file) {
      return file.type.split("/")[1];
    },

    generateFileName (file) {
      return `${uuidv4()}.${getExtansionsFile()}`;
    },

    saveFile (file) {
      return S3Service.fileUpload(file, this.generateFileName(file), this.folderNameForUpload, true);
    },

    async saveNewFiles () {
      if (this.isUpload) {
        this.isLoading = true;
        const queueUpload = this.waitUploadFiles.reduce((queueUpload, file) => {
          queueUpload.push(S3Service.fileUpload(file, file.rename || file.name, this.folderNameForUpload, true));
          return queueUpload;
        }, []);
        const uploadResult = await Promise.all(queueUpload);
        this.waitUploadFiles = [];
        const uploadedFiles  = uploadResult.map(({ data }) => data.upload);
        this.uploadedFiles   = this.uploadedFiles.concat(uploadedFiles);
        this.isLoading       = false;
        this.isUploaded      = true;
      }
    },

    saveResult () {
      return this.$emit("upload-files", this.uploadedFiles);
    },

    getExtension (file) {
      return file.type.split("/")[1];
    },

    generateName (file) {
      return `${uuidv4()}.${this.getExtension(file)}`;
    },

    uploadFiles () {
      const { length = 0 } = (this.fullFiles || []);
      const maxLength = MAX_COUNT - length;
      const accept = "image/*, video/*, .xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf";
      if (maxLength === 1) {
        return uploadFiles(async (files) => {
          this.waitUploadFiles = this.waitUploadFiles.concat(await Promise.all(Array.from(files, async (file) => {
            const base64 = await getBase64(file);
            return Object.assign(file, { base64, rename: this.generateName(file) });
          })));
        }, {
          multiple : false,
          accept,
        });
      } else if (maxLength > 1) {
        return uploadFiles(async (files) => {
          const filesLimited = arrayLimit(maxLength, files);
          this.waitUploadFiles = this.waitUploadFiles.concat(await Promise.all(Array.from(filesLimited, async (file) => {
            const base64 = await getBase64(file);
            return Object.assign(file, { base64, rename: this.generateName(file) });
          })));
        }, {
          maxLength,
          multiple : true,
          accept,
        });
      }
    },

    async close() {
      if (this.isUpload) await this.saveNewFiles();
      if (this.isUpdate) {
        this.isUpdate = false;
        await this.saveResult();
      }
      this.$emit("close");
    },

    tryDropWaitFile (byIndex) {
      if (this.waitUploadFiles.length > 0) {
        if (byIndex < this.waitUploadFiles.length) this.waitUploadFiles = this.waitUploadFiles.filter((file, index) => byIndex !== index);
        else this.waitUploadFiles = arrayLimit(this.waitUploadFiles.length - 1, this.waitUploadFiles);
      }
    },

    dropFile (byIndex) {
      const { length } = this.uploadedFiles;
      if (length > 0) {
        if (byIndex < length) {
          this.isDeleted = true;
          this.uploadedFiles = this.uploadedFiles.filter((file, index) => byIndex !== index);
        }
        else this.tryDropWaitFile(byIndex - length);
      }

      else this.tryDropWaitFile(byIndex);
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
