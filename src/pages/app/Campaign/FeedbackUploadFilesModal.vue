<template>
  <modal
    :class="{
      'upload-files-modal': true,
      'upload-files-modal-with-carousel': !!attachments.length
    }"
  >
    <template slot="header">
      <div class="upload-files-modal-header-content">
        <div>
          <div class="upload-files-title">
            Upload Files
          </div>
          <div class="upload-files-text">
            Drag and drop your files below. You can upload several files at a time.
            Click here to browse for files on your computer.
          </div>
        </div>
        <div class="graph-close-button">
          <md-button class="md-simple md-just-icon md-round modal-upload-files-close-button" @click="close">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
      </div>
    </template>
    <template slot="body">
      <div v-if="!attachments.length" class="upload-files-modal-body-content">
        <div class="upload-files-white-cube">
          <vue-dropzone
            id="dropzone"
            ref="myVueDropzone"
            :options="dropzoneOptions"
            :use-custom-slot="true"
            class="file-drop-zone upload-section text-center drop feedback-drop-zone"
            @vdropzone-files-added="filesAdded"
          >
            <md-button class="choose-file-button">
              <img src="/static/icons/red-clip.svg">
              <div class="ml-10">
                Choose File
              </div>
            </md-button>
            <div class="font-size-14">
              Or
            </div>
            <div class="drag-your-file-text">
              Drag your file here
            </div>
          </vue-dropzone>
        </div>
      </div>
      <div v-else class="upload-files-modal-body-content-with-carousel">
        <div v-if="attachments.length" class="upload-files-list">
          <div
            v-for="(file, index) in attachments"
            :key="file.name"
            :class="{
              'upload-files-list-item': true,
              'upload-files-list-item-active': carouselItemIndex === index,
            }"
          >
            <span class="upload-files-list-item-text">
              {{ file.name }}
            </span>
            <span class="upload-files-list-item-button-delete" @click="deleteFile(file.name)">
              <md-icon class="icon-close">close</md-icon>
            </span>
          </div>
        </div>
        <feedback-upload-images-carousel
          class="carousel-upload-images"
          class-image="carousel-upload-image"
          :images="attachments"
          @change-item-index="changeCarouselItemIndex"
        />
      </div>
    </template>
    <template slot="footer">
      <div class="upload-files-modal-footer-content">
        <div v-if="!attachments.length" class="d-flex">
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
        <div class="footer-content-actions">
          <input id="upload-files" type="file" style="display: none;" multiple="multiple" @change="uploadFiles" />
          <div class="cancel-text-bottom-block" @click="close">
            Cancel
          </div>
          <md-button
            class="md-button md-button md-red maryoku-btn md-theme-default change-cover-btn md-theme-default"
            @click="clickUploadFiles"
          >
            Upload files
          </md-button>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import { Modal } from "@/components";
import { v4 as uuidv4 } from "uuid";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import S3Service from "@/services/s3.service";
import FeedbackUploadImagesCarousel from "@/pages/app/Campaign/FeedbackUploadImagesCarousel";

export default {
  name: "FeedbackUploadImagesModal",
  components: {
    Modal,
    vueDropzone: vue2Dropzone,
    FeedbackUploadImagesCarousel,
  },
  props: {
    folderNameForUpload: {
      type: String,
      required: true,
    },
    attachments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        maxFilesize: 25,
        maxFiles: 10,
        createImageThumbnails: false,
        uploadMultiple: true,
        acceptedFiles: "image/*, video/*, .xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf",
        headers: { "My-Awesome-Header": "header value" },
      },
      carouselItemIndex: 0,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    clickUploadFiles() {
      document.getElementById("upload-files").click();
    },
    filesAdded(files) {
      const functionsUploadFiles = [];
      for (const file of files) {
        const extension = file.type.split("/")[1];
        const fileName = uuidv4();
        functionsUploadFiles.push(
          S3Service.fileUpload(file, `${fileName}.${extension}`, this.folderNameForUpload, true)
        );
      }
      Promise.all(functionsUploadFiles).then((responses) => {
        this.isLoading = false;
        const files = responses.map(({ data }) => data.upload);
        this.$emit("upload-files", [...this.attachments, ...files]);
      });
    },
    deleteFile(fileName) {
      const deleteItemIndex = this.attachments.findIndex((file) => file.name === fileName);
      const currentItemIndex = this.carouselItemIndex;
      const deleteCurrentItem = (deleteItemIndex === currentItemIndex);
      if (deleteCurrentItem && this.carouselItemIndex === 0) {
        this.carouselItemIndex = 0;
      }
      if (deleteCurrentItem && currentItemIndex > 0) {
        // this.carouselItemIndex = currentItemIndex - 1;
        this.carouselItemIndex = 0;
      }
      if (!deleteCurrentItem && deleteItemIndex < currentItemIndex) {
        // this.carouselItemIndex = currentItemIndex - 1;
        this.carouselItemIndex = 0;
      }
      const images = this.attachments.filter((file, index) => index !== deleteItemIndex);
      this.$emit("upload-files", images);
    },
    changeCarouselItemIndex(itemIndex) {
      this.carouselItemIndex = itemIndex;
    },
    uploadFiles(event) {
      this.filesAdded(event.target.files);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-files-modal-header-content {

  .upload-files-title {
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.53;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
  }

  .upload-files-text {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
    width: 460px;
  }
}

.upload-files-modal-body-content {
  width: 942px;
  min-height: 530px;
  margin: 0 auto;
  background-color: #f3f7fd;
  display: flex;
  justify-content: center;
  align-items: center;

  .upload-files-white-cube {
    width: 942px;
    height: 530px;
    background-color: white;
    border: 1px dashed #818080;

    .feedback-drop-zone {
      border: none;
      height: 100%;
      background-color: #fff;

      .choose-file-button{
        background-color: #fff!important;
        width: 148px;
        height: 32px;
        border: solid 2px #f51355;
        color: #f51355!important;
        font-size: 14px;
        font-weight: 800;
      }

      .drag-your-file-text{
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #818080;
      }
    }
  }
}

.upload-files-modal-body-content-with-carousel {
  width: 949px;
  min-height: 610px;
  margin: 0 auto;

  .carousel-upload-images {
    max-width: 942px;
    max-height: 530px;

    .carousel-upload-image {
      width: 942px;
      height: 530px;
    }
  }

  .upload-files-list {
    display: flex;
    flex-wrap: wrap;
    margin-Bottom: 15px;

    .upload-files-list-item {
      width: 200px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 5px 15px 5px 0;
      border-radius: 26px;
      background-color: #fff;
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.08);

      .upload-files-list-item-text {
        width: 138px;
        height: 19px;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;
        font-weight: 600;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.29px;
        text-align: left;
        color: #707070;
        text-overflow: ellipsis !important;
      }

      .upload-files-list-item-button-delete {
        width: 24px;
        height: 24px;
        cursor: pointer;

        .icon-close {
          color: #707070;
          vertical-align: initial;
        }
      }
    }

    .upload-files-list-item-active {
      border: 1px solid #f51355;

      .upload-files-list-item-button-delete .icon-close {
        color: #f51355;
      }
    }
  }
}

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

  .footer-content-actions {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;

    .cancel-text-bottom-block {
      width: 56px;
      height: 22px;
      margin: 14px 38px 14px 0;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.34px;
      text-align: center;
      color: #000;
      cursor: pointer;
    }
  }
}
</style>
