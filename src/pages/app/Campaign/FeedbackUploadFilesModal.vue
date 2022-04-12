<template>
  <modal
    :class="{
      'upload-files-modal': true,
      'upload-files-modal-with-carousel': !!files.length
    }"
  >
    <template slot="header">
      <div class="upload-files-modal-header-content">
        <div>
          <div class="upload-files-title">
            Upload Files
          </div>
          <div class="upload-files-text">
            Drag and drop your files, you can upload several files together,
            click here to upload files from your computer
          </div>
        </div>
        <div class="graph-close-button">
          <md-button class="md-simple md-just-icon md-round modal-upload-files-close-button" @click="close">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <div v-if="files.length" class="upload-files-list">
          <div
            v-for="(file, index) in files"
            :key="index"
            :class="{
              'upload-files-list-item': true,
              'upload-files-list-item-active': carouselItemIndex === index,
            }"
          >
            <span class="upload-files-list-item-text">
              {{ file.name }}
            </span>
            <span class="upload-files-list-item-button-delete" @click="deleteFile(index)">
              <md-icon class="icon-close">close</md-icon>
            </span>
          </div>
        </div>
      </div>
    </template>
    <template slot="body">
      <div v-if="!files.length" class="upload-files-modal-body-content">
        <div class="upload-files-white-cube">
          <vue-dropzone
            id="dropzone"
            ref="myVueDropzone"
            :options="dropzoneOptions"
            :use-custom-slot="true"
            class="file-drop-zone upload-section text-center drop feedback-drop-zone"
            @vdropzone-file-added="fileAdded"
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
      <div v-else>
        <feedback-upload-images-carousel
          class="carousel-upload-images"
          class-image="carousel-upload-image"
          :images="images"
          @change-item-index="changeCarouselItemIndex"
        />
      </div>
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
            Mark in V the presentation you want to appear in the main view
          </div>
        </div>
        <div class="footer-content-actions">
          <div class="cancel-text-bottom-block" @click="close">
            Cancel
          </div>
          <md-button
            class="md-button md-button md-red maryoku-btn md-theme-default change-cover-btn md-theme-default"
            @click="uploadAllFiles"
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
import { getBase64 } from "@/utils/file.util";

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
    }
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
      files: [],
      images: [],
      carouselItemIndex: 0,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    chooseFiles() {
      document.getElementById("coverImage").click();
    },
    async fileAdded(file) {
      const image = await getBase64(file);
      this.images.push({ src: image });
      this.files.push(file);
    },
    deleteFile(deleteItemIndex) {
      const currentItemIndex = this.carouselItemIndex;
      const deleteCurrentItem = (deleteItemIndex === currentItemIndex);
      if (deleteCurrentItem && this.carouselItemIndex === 0) {
        this.carouselItemIndex = 0;
      }
      if (deleteCurrentItem && currentItemIndex > 0) {
        this.carouselItemIndex = currentItemIndex - 1;
      }
      if (!deleteCurrentItem && deleteItemIndex < currentItemIndex) {
        this.carouselItemIndex = currentItemIndex - 1;
      }
      this.images = this.images.filter((file, index) => index !== deleteItemIndex);
      this.files = this.files.filter((file, index) => index !== deleteItemIndex);
    },
    changeCarouselItemIndex(itemIndex) {
      this.carouselItemIndex = itemIndex;
    },
    uploadAllFiles() {
      const functionsUploadFiles = this.files
        .map((file) => {
          const extension = file.type.split("/")[1];
          const fileName = uuidv4();
          return S3Service.fileUpload(file, `${fileName}.${extension}`, this.folderNameForUpload, true);
        });
      Promise.all(functionsUploadFiles).then((responses) => {
        this.isLoading = false;
        const files = responses.map(({ data }) => data.upload);
        this.$emit("upload-files", files);
      });
    }
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

  .upload-files-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 35px;

    .upload-files-list-item {
      width: 200px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 5px 15px 5px 0;
      padding: 0 20px;
      border-radius: 26px;
      background-color: #fff;
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.08);

      .upload-files-list-item-text {
        width: 138px;
        height: 19px;
        margin: 0 13.8px 0 0;
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

.upload-files-modal-body-content {
  width: 942px;
  height: 530px;
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

.carousel-upload-images {
  max-width: 942px;
  max-height: 530px;

  .carousel-upload-image {
    width: 942px;
    height: 530px;
  }
}
</style>
