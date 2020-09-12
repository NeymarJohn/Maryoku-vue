<template>
  <carousel
    :items="4"
    :margin="25"
    :dots="false"
    :nav="false"
    class="rsvp-venue-carousel"
    :number="2"
    :key="Math.random()"
  >
    <div class="carousel-item" v-for="(item,index) in images" :key="index">
      <img :src="item.src" class="carousel-image" :class="{whiteBlack: item.default}" />
      <div class="carousel-item-actions">
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

export default {
  props: {
    editable: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    carousel,
  },
  data() {
    return {
      images: [
        {
          src: `${this.$iconURL}RSVP/Image+81.jpg`,
          default: true,
        },
        {
          src: `${this.$iconURL}RSVP/shutterstock_444402799_thumb.jpg`,
          default: true,
        },
        {
          src: `${this.$iconURL}RSVP/Image+83.jpg`,
          default: true,
        },
        {
          src: `${this.$iconURL}RSVP/Image+84.jpg`,
          default: true,
        },
      ],
      selectedIndex: 0,
    };
  },
  methods: {
    deleteImage(index) {
      this.images.splice(index, 1);
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
      if (this.selectedIndex > -1) {
        this.images[this.selectedIndex].src = image;
        this.images[this.selectedIndex].default = false;
      } else {
        this.images.push({ src: image, default: false });
      }
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