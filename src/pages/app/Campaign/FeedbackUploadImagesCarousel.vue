<template>
  <div class="feedback-images" :key="images.length">
    <carousel
      v-if="images.length"
      :key="Math.random()"
      :items="1"
      :dots="false"
      :nav="false"
      :number="selected"
      class="feedback-carousel"
      @changed="change"
    >
      <template slot="prev">
        <button class="btn-prev nav-left nav-btn">
          <md-icon class="icon-arrow-left">
            keyboard_arrow_left
          </md-icon>
        </button>
      </template>
      <div v-for="(item, index) in images" :key="index" class="carousel-item">
        <img :src="getItem(item)" :class="`carousel-image ${classImage}`" @error="setAltImg($event, item)">
      </div>
      <template slot="next">
        <button class="btn-next nav-right nav-btn">
          <md-icon class="icon-arrow-right">
            keyboard_arrow_right
          </md-icon>
        </button>
      </template>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  components: {
    carousel,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    classImage: {
      type: String,
      default: "",
    },
    selected: {
      type: Number,
      default: 0,
    }
  },
  methods: {
    getItem (item) {
      if (item) {
        if      (typeof item === "string") return item;
        else if (item.url)                 return item.url;
        else if (item.base64)              return item.base64;
      }

      return "";
    },
    change(event) {
      const itemIndex = +event.item.index || 0;
      this.$emit("change-item-index", itemIndex);
    },
    setAltImg(event, item) {
      event.target.src = item.imageData;
    },
  },
};
</script>

<style lang="scss" scoped>
.feedback-images {
  width: 942px;
  height: 532px;
  position: relative;
  margin-top: -2px;
  margin-bottom: -2px;
  .btn-next, .btn-prev {
    width: 31px;
    height: 31px;
    cursor: pointer;

    .icon-arrow-right, .icon-arrow-left {
      font-size: 31px !important;
      color: #f51355 !important;;
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
      left: 40px;
    }
  }
}
.feedback-carousel {
  width: 942px;
  height: 532px;

  .carousel-item {
    width: 942px;
    height: 532px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;

    .carousel-image {
      width: 942px;
      height: 532px;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
