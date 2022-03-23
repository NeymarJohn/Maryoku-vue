<template>
  <div class="feedback-upload-images-carousel">
    <carousel
      v-if="images.length"
      :items="1"
      :autoplay="autoPlay"
      :autoplay-timeout="autoPlayTimeout"
      :smart-spped="smartSpeed"
      :nav="false"
      :dots="false"
      :loop="true"
      class="carousel"
      :number="2"
      @changed="change"
    >
      <template v-if="showButtonActions" slot="prev">
        <button class="carousel-btn-prev nav-btn nav-left">
          <md-icon class="btn-prev-icon-arrow-left">
            keyboard_arrow_left
          </md-icon>
        </button>
      </template>
      <div v-for="(item, index) in images" :key="index">
        <img
          :src="item.src"
          :class="[
            {
              'carousel-item-image': true,
              'carousel-item-with-filter': !disableFilter
            },
            classImage
          ]"
          @error="setAltImg($event, item)"
        >
      </div>
      <template v-if="showButtonActions" slot="next">
        <button class="carousel-btn-next nav-btn nav-right">
          <md-icon class="btn-next-icon-arrow-right">
            keyboard_arrow_right
          </md-icon>
        </button>
      </template>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import { getBase64 } from "@/utils/file.util";

export default {
  name: "FeedbackUploadImagesCarousel",
  components: {
    carousel,
  },
  props: {
    autoPlay: {
      type: Boolean,
      default: false,
    },
    autoPlayTimeout: {
      type: Number,
      default: 500,
    },
    smartSpeed: {
      type: Number,
      default: 250,
    },
    showButtonActions: {
      type: Boolean,
      default: true,
    },
    disableFilter: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array,
      default: () => [],
    },
    classImage: {
      type: String,
      default: "",
    },
  },
  methods: {
    change(event) {
      const itemIndex = event.item.index;
      this.$emit("change-item-index", itemIndex);
    },
    uploadImage(index) {
      document.getElementById("carousel-file").click();
    },
    async onFileChange(event) {
      const image = await getBase64(event.target.files[0]);
      this.$emit("addImage", { imageString: image, file: event.target.files[0] });
    },
    setAltImg(event, item) {
      event.target.src = item.imageData;
    },
  },
};
</script>

<style lang="scss" scoped>
.feedback-upload-images-carousel {
  position: relative;
}

.carousel {
  width: 942px;
  height: 530px;

  & div {
    width: 942px;
    height: 530px;
  }

  .carousel-item {
    max-width: 942px;
    max-height: 530px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;

    .carousel-item-image {
      width: 942px;
      height: 530px;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    .carousel-item-with-filter {
      filter: brightness(80%);
    }

    &:hover {
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.52;
        background-color: #050505;
        top: 0;
        left: 0;
        z-index: 2;
      }
    }
  }

  .carousel-btn-next,
  .carousel-btn-prev {
    width: 31px;
    height: 31px;

    .btn-prev-icon-arrow-left,
    .btn-next-icon-arrow-right {
      font-size: 31px !important;
      color: #f51355 !important;
    }
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    padding: 0;
    background: initial;
    border: none;
    outline: none;

    &.nav-right {
      right: 40px;
    }
    &.nav-left {
      left: 60px;
    }
  }
}
</style>
