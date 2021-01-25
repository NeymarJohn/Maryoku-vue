<template>
  <carousel
    :items="4"
    :margin="25"
    :dots="false"
    :nav="false"
    class="rsvp-venue-carousel"
    :number="2"
    :key="`carousel-${images.length}`"
    :responsive="{ 0: { items: 1, dots: true }, 800: { items: 2 }, 1200: { items: 4 } }"
  >
    <div class="carousel-item" v-for="(item, index) in images" :key="index">
      <vue-element-loading :active="item.loading" spinner="ring" color="#FF547C" />
      <img :src="item.src" class="carousel-image" :class="{ whiteBlack: item.default }" />
      <div class="carousel-item-actions" v-if="editable">
        <div class="color-white mb-20 font-bold font-size-16 button" @click="deleteImage(index)">
          <img :src="`${$iconURL}RSVP/Group 4854.svg`" class="mr-10" /> Delete
        </div>
        <div class="color-white font-bold font-size-16 button" @click="replaceImage(index)">
          <img :src="`${$iconURL}RSVP/Group 2344.svg`" class="mr-10" /> Replace
        </div>
      </div>
    </div>
    <div v-if="editable" class="empty-carousel-item">
      <md-button class="md-simple md-outlined maryoku-btn" @click="addImage">
        <md-icon>add_circle</md-icon>Add image
      </md-button>
      <input
        style="display: none"
        id="carousel-file"
        name="attachment"
        type="file"
        multiple="multiple"
        @change="onFileChange"
      />
    </div>
  </carousel>
</template>
<script>
import carousel from "vue-owl-carousel";
import { getBase64 } from "@/utils/file.util";
import S3Service from "@/services/s3.service";

export default {
  props: {
    editable: {
      type: Boolean,
      default: true,
    },
    defaultImages: {
      type: Array,
      default: () => [],
    },
    event: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    carousel,
  },
  data() {
    return {
      selectedIndex: 0,
      images: [],
    };
  },
  created() {
    this.images = this.defaultImages;
  },
  methods: {
    deleteImage(index) {
      this.images.splice(index, 1);
      this.$emit("change", this.images);
    },
    replaceImage(index) {
      this.selectedIndex = index;
      document.getElementById("carousel-file").click();
    },
    addImage() {
      this.selectedIndex = -1;
      document.getElementById("carousel-file").click();
    },
    async onFileChange(event) {
      const image = await getBase64(event.target.files[0]);
      const extension = event.target.files[0].type.split("/")[1];
      let imageName = "";
      let imageUrl = "";
      let imageIndex = 0;
      if (this.selectedIndex > -1) {
        imageName = `${this.selectedIndex}`;
        imageUrl = `https://maryoku.s3.amazonaws.com/campaigns/venues/${this.event.id}/${imageName}.${extension}`;
        this.images[this.selectedIndex].src = image;
        this.images[this.selectedIndex].default = false;
        imageIndex = this.selectedIndex;
      } else {
        imageName = `${this.images.length}`;
        imageUrl = `https://maryoku.s3.amazonaws.com/campaigns/venues/${this.event.id}/${imageName}.${extension}`;
        this.images.push({ src: image, default: false });
        imageIndex = this.images.length - 1;
      }
      this.images[imageIndex].loading = true;
      S3Service.fileUpload(event.target.files[0], `${imageName}`, `campaigns/venues/${this.event.id}`).then((res) => {
        this.images[imageIndex].src = imageUrl;
        this.images[imageIndex].loading = false;
      });
      this.$emit("change", this.images);
    },
  },
};
</script>
<style lang="scss" scoped>
.rsvp-venue-carousel {
  .empty-carousel-item {
    padding: 40px;
  }
  .carousel-item {
    // width: 290px;
    height: 170px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    .carousel-image {
      &.whiteBlack {
        filter: grayscale(1);
      }
    }
    .carousel-item-actions {
      display: none;
      z-index: 3;
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