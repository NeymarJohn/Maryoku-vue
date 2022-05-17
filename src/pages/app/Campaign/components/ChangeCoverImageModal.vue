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
          <img v-if="selectedImage" :src="selectedImage">
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
            class="section-upload-cover-image d-flex justify-content-center cursor-pointer"
            @click="selectConceptImages"
          >
            <div class="width-80">
              <concept-image-block
                v-if="showConcept"
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
                <img class="mr-10" src="static/icons/Group 18599.svg">
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
// core
import { mapMutations, mapActions } from "vuex";
import vue2Dropzone                 from "vue2-dropzone";
import { v4 as uuidv4 }             from "uuid";

// components
// gloabl
import { Modal }         from "@/components";
import ConceptImageBlock from "@/components/ConceptImageBlock";
//local
import ChangeCoverImageCarousel from "./ChangeCoverImageCarousel";

// models
import CalendarEvent from "@/models/CalendarEvent";
import EventConcept  from "@/models/EventConcept";

// dependencies
import S3Service       from "@/services/s3.service";

// helpers
import loop            from "@/helpers/number/loop";
import arrayIsNoEmpty  from "@/helpers/array/is/noEmpty";
import lastIndex       from "@/helpers/array/last/index";
import objectIsNoEmpty from "@/helpers/object/is/noEmpty";

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
      type    : String,
      default : "",
    },
    defaultCoverImage: {
      type    : String,
      default : "",
    },
  },
  data() {
    return {
      loading             : false,
      destroyDropzone     : false,
      selectedImage       : null,
      canvaApi            : null,
      selectedIndex       : 0,
      carouselCurrentItem : 0,
      dropzoneOptions: {
        url                   : "https://httpbin.org/post",
        acceptedFiles         : "image/*",
        thumbnailWidth        : 60,
        thumbnailHeight       : 60,
        createImageThumbnails : false,
        disablePreviews       : false,
        uploadMultiple        : true,
        headers               : { "My-Awesome-Header": "header value" },
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
    showConcept() {
      return objectIsNoEmpty(this.eventConcept)
          && arrayIsNoEmpty (this.conceptImages)
          && arrayIsNoEmpty (this.conceptColors);
    }
  },
  watch: {
    selectedIndex () {
      const lastIndexConcept = lastIndex(this.conceptImages);
      const lastIndexColor   = lastIndex(this.conceptColors);
      const lastIndexSelect  = lastIndexConcept + lastIndexColor;
      if      (this.selectedIndex > lastIndexSelect)           this.selectedIndex = lastIndexSelect;
      else if (this.selectedIndex < 0 && lastIndexSelect > -1) this.selectedIndex = 0;
    }
  },
  async created() {
    if (this.coverImage) {
      this.selectedImage = this.coverImage;
      this.selectedIndex = this.conceptImages.findIndex((item) => item.url === this.coverImage);
    } else {
      this.selectedImage = arrayIsNoEmpty(this.conceptImages) ? this.conceptImages[0].url : this.defaultCoverImage;
    }

    if (window.Canva && window.Canva.DesignButton) this.canvaApi = await window.Canva.DesignButton.initialize({
      apiKey: "no5x5PRx6hMNshFZIrRpevKJ",
    });
  },
  methods: {
    ...mapMutations("event", ["setEventData"]),
    ...mapActions  ("event", ["saveEventAction"]),
    close(event) {
      this.$emit("close", event);
    },
    chooseImage() {
      this.$emit("choose-image", this.selectedImage);
    },
    selectImage(index = 0) {
      const correctIndex          = +index || 0;
      const minAcceptIndex        = Math.max(correctIndex, 0);
      const lastIndexAcceptSelect = lastIndex(this.conceptImages);
      const currentIndex          = Math.min(lastIndexAcceptSelect, minAcceptIndex);
      if (currentIndex !== this.selectedIndex) {
        this.selectedIndex = currentIndex;
        this.selectedImage = this.conceptImages[currentIndex].url;
      }
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
      if (countImages > 6) {
        const btnNext = document.getElementById("carousel-btn-next");
        if (btnNext) {
          const countScroll = countImages - 5;
          loop(countScroll, () => btnNext.click());
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
              name       : opts.designId,
              originName : opts.designTitle,
              url        : opts.exportUrl
            });
          },
        });
      }
    },
    async uploadFileDropZone(file) {
      this.destroyDropzone = true;
      const dropZone = this.$refs.myVueDropzone.$el.getElementsByClassName("dz-message");
      if (arrayIsNoEmpty(dropZone)) dropZone[0].style.display = "block";
      const preview = this.$refs.myVueDropzone.$el.getElementsByClassName("dz-preview");
      if (arrayIsNoEmpty(preview)) {
        const lastIndexPreview = lastIndex(preview);
        if (lastIndexPreview > -1 && preview[lastIndexPreview]) {
          preview[lastIndexPreview].style.display = "none";
          preview[lastIndexPreview].style.opacity = "0";
        }
      }
      const extension = file.type.split("/")[1];
      const fileName  = uuidv4();
      const url       = await S3Service.fileUpload(file, `${fileName}.${extension}`, "concepts");
      this.addNewImageConcept({ thumb_url: url, url });
    },
    async addNewImageConcept(newImage) {
      try {
        this.loading = true;
        const images = [newImage, ...this.conceptImages];
        const data   = objectIsNoEmpty(this.eventConcept) ? { ...this.eventConcept, images } : {
          event        : new CalendarEvent({ id: this.event.id }),
          name         : "March Madness",
          description  :
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est",
          fontFamily   : "Cooperative-Regular",
          tags         : [{ name: "Fun" }, { name: "Diy" }, { name: "Sporting" }, { name: "Light" }],
          colors       : [],
          images,
        };
        const query   = new EventConcept(data);
        const concept = await query.save();
        if (concept) {
          this.saveEventAction(new CalendarEvent({ ...this.event, concept }));
          this.selectImage();
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.change-cover-image-modal-header {

  .change-cover-image-modal-header-title {
    font-size      : 30px;
    font-weight    : bold;
    font-stretch   : normal;
    font-style     : normal;
    line-height    : 1.53;
    letter-spacing : normal;
    text-align     : left;
    color          : #050505;
  }

  .change-cover-image-modal-header-text {
    max-width      : 544px;
    font-size      : 16px;
    font-weight    : normal;
    font-stretch   : normal;
    font-style     : normal;
    line-height    : normal;
    letter-spacing : normal;
    text-align     : left;
    color          : #050505;
  }

}

.change-cover-image-modal-body-cover-image {
  width         : 950px;
  height        : 430px;
  margin-bottom : 20px;

  & img {
    width      : 950px;
    height     : 430px;
    object-fit : cover;
  }
}

.change-cover-image-modal-body-carousel-image {
  width  : 950px;
  height : 85px;
}

.change-cover-image-modal-footer {
  width: 100%;

  .sections-for-upload-cover-image {
    width           : 100%;
    display         : flex;
    justify-content : space-between;
    margin-bottom   : 50px;

    .section-upload-cover-image {
      width  : 300px;
      height : 100px;
      border : dashed 1.5px #000;

      .wrapper-btn-design-on-canva {
        width           : 100%;
        height          : 100%;
        display         : flex;
        align-items     : center;
        justify-content : center;

        .btn-design-on-canva {
          border-radius : 3px;
          border        : solid 1px #818080;

          .text-design-on-canva {
            font-size      : 12px;
            font-weight    : bold;
            font-stretch   : normal;
            font-style     : normal;
            line-height    : normal;
            letter-spacing : 0.25px;
            text-align     : left;
            color          : #000;
          }
        }
      }

      .section-upload-cover-image-drop-zone {
        width           : 100%;
        height          : 100%;
        min-height      : 100%;
        padding         : 0;
        display         : flex;
        align-items     : center;
        justify-content : center;

        .text-upload-photo {
          font-size      : 12px;
          font-weight    : bold;
          font-stretch   : normal;
          font-style     : normal;
          line-height    : normal;
          letter-spacing : 0.25px;
          text-align     : left;
          color          : #000;
        }
      }
    }
  }

  .change-cover-image-modal-footer-actions {
    width           : 100%;
    display         : flex;
    justify-content : flex-end;

    .btn-upload-photo,
    .btn-cancel {
      margin-right   : 10px;
      font-size      : 16px;
      font-weight    : bold;
      font-stretch   : normal;
      font-style     : normal;
      line-height    : normal;
      letter-spacing : 0.34px;
      text-align     : center;
      color          : #000 !important;

      &:hover {
        background-color : #ffffff !important
      }
    }
  }
}

#dropzone .dz-preview {
  opacity : 0;
}
</style>
