<template>
  <div class="feedback-images">
    <carousel
      v-if="images.length > 0"
      :key="Math.random()"
      :items="items"
      :margin="marginItems"
      :dots="false"
      :nav="false"
      class="feedback-carousel"
      :number="2"
    >
      <template slot="prev">
        <md-button class="btn-prev edit-btn md-round nav-left nav-btn md-raised md-white">
          <md-icon class="icon-arrow-left">
            keyboard_arrow_left
          </md-icon>
        </md-button>
      </template>
      <div v-for="(item, index) in images" :key="index" class="carousel-item">
        <img :src="item.src" class="carousel-image" :class="{ 'white-black': item.default }" @error="setAltImg($event, item)">
      </div>
      <template slot="next">
        <md-button class="btn-next edit-btn md-round nav-right nav-btn md-raised md-white">
          <md-icon class="icon-arrow-right">
            keyboard_arrow_right
          </md-icon>
        </md-button>
      </template>
    </carousel>
    <div v-if="showUploadFile" class="upload-button-wrapper">
      <md-button class="md-red maryoku-btn" @click="uploadImage">
        <img :src="`${$iconURL}Campaign/arrow-circle-white.svg`" class="mr-10">
        Upload photos from the event
      </md-button>
      <input
        id="carousel-file"
        style="display: none"
        name="attachment"
        type="file"
        multiple="multiple"
        @change="onFileChange"
      >
    </div>
    <div v-if="showDetailsUploadedFiles" class="feedback-images-footer">
      <img class="icon-photography-white" src="static/icons/Group%209348.svg">
      <span class="description">All Photos / video (5)</span>
    </div>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import { getBase64 } from "@/utils/file.util";

export default {
  components: {
    carousel,
  },
  props: {
    items: {
      type: Number,
      default: 3,
    },
    marginItems: {
      type: Number,
      default: 25,
    },
    showUploadFile: {
      type: Boolean,
      default: false,
    },
    showDetailsUploadedFiles: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedIndex: 0,
    };
  },
  methods: {
    uploadImage() {
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
.feedback-images {
  position: relative;

  .btn-next, .btn-prev {
    width: 31px;
    height: 31px;
    padding-left: 4px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.45);

    .icon-arrow-right, .icon-arrow-left {
      font-size: 31px !important;
      color: #050505 !important;
    }
  }

  .upload-button-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    &.nav-right {
      right: 40px;
    }
    &.nav-left {
      left: 40px;
    }
  }

  .feedback-images-footer {
    display: flex;
    align-items: center;
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 1;
    padding: 21px;

    .icon-photography-white {
      width: 26px;
      height: 24px;
      fill: #fff !important;
    }

    .description {
      color: #fff;
      margin-left: 10px;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
.feedback-carousel {
  .carousel-item {
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    padding-top: 75%;

    .carousel-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(80%);
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      &.white-black {
        filter: grayscale(1);
      }
    }

    &:hover {
      .carousel-item-actions {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        height: max-content;
        width: max-content;
        transform: translate(-50%, -50%);
        .button {
          cursor: pointer;
          img {
            width: 20px;
            display: inline;
          }
        }
      }
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
}
</style>
