<template>
  <modal
    class="change-cover-image-modal"
  >
    <template slot="header">
      <div class="change-cover-image-modal-header">
        <div>
          <div class="change-cover-image-modal-header-title">
            Change Cover
          </div>
          <div class="change-cover-image-modal-header-text">
            Select the image that will appear on “Save the Date” cover.
            If you want to change the collage you can always go back to
            <span>concept page</span>
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
      <div class="change-cover-image-modal-body">
        <div class="change-cover-image-modal-body-cover-image">
          <img v-if="selectedImage" :src="selectedImage" />
        </div>
        <div class="change-cover-image-modal-body-carousel-image">
          <change-cover-image-carousel
            v-if="!loading"
            :images="conceptImages"
            :selected-index="selectedIndex"
            @changed="changedCarouselCurrentItem"
            @select-image="selectImage"
          />
        </div>
      </div>
    </template>
    <template slot="footer">
      <div class="change-cover-image-modal-footer">
        <div class="sections-for-upload-cover-image">
          <div
            @click="selectConceptImages"
            :class="[
              'section-upload-cover-image', 'd-flex', 'justify-content-center', 'cursor-pointer',
            ]"
          >
            <div class="width-80">
              <concept-image-block
                v-if="eventConcept"
                class="hidden"
                :images="conceptImages"
                :colors="conceptColors"
                border="no-border"
                is-small
              />
            </div>
          </div>
          <div class="section-upload-cover-image">
            <div class="wrapper-btn-design-on-canva d-flex justify-content-center align-center">
              <md-button class="md-white btn-design-on-canva" @click="handleClickDesignOnCanva">
                <img class="mr-10" src="static/icons/Group 18599.svg" />
                <span class="text-design-on-canva">
                  Design on Canva
                </span>
              </md-button>
            </div>
          </div>
          <div class="section-upload-cover-image">
            <vue-dropzone
              id="dropzone"
              ref="myVueDropzone"
              :options="dropzoneOptions"
              :destroy-dropzone="destroyDropzone"
              :use-custom-slot="true"
              class="section-upload-cover-image-drop-zone"
              @vdropzone-file-added="uploadFileDropZone"
            >
              <md-button class="md-white btn-upload-photo">
                <span class="text-upload-photo">Upload File</span>
              </md-button>
            </vue-dropzone>
          </div>
        </div>
        <div class="change-cover-image-modal-footer-actions">
          <md-button
            class="md-white btn-cancel"
            @click="close"
          >
            Cancel
          </md-button>
          <md-button
            class="md-red add-category-btn"
            @click="chooseImage"
          >
            Choose Image
          </md-button>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import { Modal } from "@/components";
import ChangeCoverImageCarousel from "./ChangeCoverImageCarousel";
import ConceptImageBlock from "@/components/ConceptImageBlock";
import vue2Dropzone from "vue2-dropzone";
import CalendarEvent from "@/models/CalendarEvent";
import EventConcept from "@/models/EventConcept";
import { mapMutations } from "vuex";
import S3Service from "@/services/s3.service";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "ChangeCoverImageModal",
  components: {
    vueDropzone: vue2Dropzone,
    ChangeCoverImageCarousel,
    ConceptImageBlock,
    Modal,
  },
  props: {
    coverImage: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      loading: false,
      selectedImage: null,
      selectedIndex: 0,
      canvaApi: null,
      destroyDropzone: false,
      carouselCurrentItem: 0,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 60,
        thumbnailHeight: 60,
        createImageThumbnails: false,
        disablePreviews: false,
        uploadMultiple: true,
        acceptedFiles: "image/*",
        headers: { "My-Awesome-Header": "header value" },
      }
    };
  },
  computed: {
    event() {
      return this.$store.state.event.eventData || {};
    },
    eventConcept() {
      return this.event.concept || {};
    },
    conceptImages() {
      return this.eventConcept.images || [];
    },
    conceptColors() {
      return this.eventConcept.colors || [];
    },
  },
  created() {
    if (this.coverImage) {
      this.selectedImage = this.coverImage;
      this.selectedIndex = this.conceptImages.findIndex((item) => item.url === this.coverImage);
    } else {
      this.selectedImage = (this.conceptColors && this.conceptColors.length)
        ? this.conceptColors[0].url : null;
    }

    (async () => {
      if (!window.Canva || !window.Canva.DesignButton) {
        return;
      }

      this.canvaApi = await window.Canva.DesignButton.initialize({
        apiKey: "no5x5PRx6hMNshFZIrRpevKJ",
      });
    })();
  },
  methods: {
    ...mapMutations("event", ["setEventData"]),
    close(event) {
      this.$emit("close", event);
    },
    chooseImage() {
      this.$emit("choose-image", this.selectedImage);
    },
    selectImage(index) {
      this.selectedIndex = index;
      this.selectedImage = this.conceptImages[index].url;
    },
    changedCarouselCurrentItem({ item }) {
      this.carouselCurrentItem = item.index;
    },
    selectConceptImages() {
      this.$emit("choose-image", null);
    },
    carouselScrollingToIndex() {
      const countImages = this.conceptImages.length;
      // number 5 get from prop items carousel
      const countScroll = countImages - 5;
      if (countScroll < 1) return;
      const btnNext = document.getElementById("carousel-btn-next");
      for (let i = 0; i < countScroll; i++) {
        if (btnNext) {
          btnNext.click();
        }
      }
    },
    handleClickDesignOnCanva() {
      if (this.canvaApi) {
        this.canvaApi.createDesign({
          design: {
            type: "Poster",
          },
          onDesignPublish: (opts) => {
            this.addNewImageConcept({
              thumb_url: opts.exportUrl,
              url: opts.exportUrl
            });
          },
        });
      }
    },
    async uploadFileDropZone(file) {
      this.destroyDropzone = true;
      const dropZone = this.$refs.myVueDropzone.$el.getElementsByClassName("dz-message");
      if (dropZone && dropZone[0]) {
        dropZone[0].style.display = "block";
      }
      const preview = this.$refs.myVueDropzone.$el.getElementsByClassName("dz-preview");
      if (preview && preview[preview.length - 1]) {
        preview[preview.length - 1].style.display = "none";
        preview[preview.length - 1].style.opacity = "0";
      }
      const extension = file.type.split("/")[1];
      const fileName = uuidv4();
      S3Service.fileUpload(file, `${fileName}.${extension}`, "concepts").then((url) => {
        this.addNewImageConcept({ thumb_url: url, url });
      });
    },
    async addNewImageConcept(newImage) {
      const event = new CalendarEvent({ id: this.event.id });
      const images = [...this.conceptImages, newImage];
      this.loading = true;
      await new EventConcept({ ...this.eventConcept, event, images }).save().then(() => {
        this.setEventData({
          ...this.event,
          concept: { ...this.eventConcept, images }
        });
        this.selectImage(images.length - 1);
        this.loading = false;
        setTimeout(() => this.carouselScrollingToIndex(images.length - 1));
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.change-cover-image-modal-header {

  .change-cover-image-modal-header-title {
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.53;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
  }

  .change-cover-image-modal-header-text {
    max-width: 544px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
  }

}

.change-cover-image-modal-body-cover-image {
  width: 950px;
  height: 430px;
  margin-bottom: 20px;

  & img {
    width: 950px;
    height: 430px;
    object-fit: cover;
  }
}

.change-cover-image-modal-body-carousel-image {
  width: 950px;
  height: 85px;
}

.change-cover-image-modal-footer {
  width: 100%;

  .sections-for-upload-cover-image {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;

    .section-upload-cover-image {
      width: 300px;
      height: 100px;
      border: dashed 1.5px #000;

      .wrapper-btn-design-on-canva {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .btn-design-on-canva {
          border-radius: 3px;
          border: solid 1px #818080;

          .text-design-on-canva {
            font-size: 12px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.25px;
            text-align: left;
            color: #000;
          }
        }
      }

      .section-upload-cover-image-drop-zone {
        width: 100%;
        height: 100%;
        min-height: 100%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .text-upload-photo {
          font-size: 12px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.25px;
          text-align: left;
          color: #000;
        }
      }
    }
  }

  .change-cover-image-modal-footer-actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .btn-upload-photo,
    .btn-cancel {
      margin-right: 10px;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.34px;
      text-align: center;
      color: #000 !important;

      &:hover {
        background-color: #ffffff !important
      }
    }
  }
}

#dropzone .dz-preview {
  opacity: 0;
}
</style>
