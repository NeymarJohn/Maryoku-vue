<template>
  <div class="feedback-images">
    <carousel
      v-if="images.length"
      :key="Math.random()"
      :items="1"
      :dots="false"
      :nav="false"
      :number="2"
      :auto-play-timeout="autoPlayTimeout"
      :smart-speed="smartSpeed"
      :auto-play="autoPlay"
      :loop="loop"
      class="feedback-carousel"
      @changed="change"
    >
      <div v-for="(item, index) in images" :key="index" class="carousel-item">
        <img :src="item.src" :class="`carousel-image ${classImage}`" @error="setAltImg($event, item)">
      </div>
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
    autoPlay: {
      type: Boolean,
      default: false
    },
    autoPlayTimeout: {
      type: Number,
      default: 500
    },
    smartSpeed: {
      type: Number,
      default: 500
    },
    loop: {
      type: Boolean,
      default: false,
    }
  },
  created() {
    const { loop, autoPlay } = this;
    console.log({ loop, autoPlay });
  },
  methods: {
    change(event) {
      const itemIndex = event.item.index;
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
  height: 530px;
  position: relative;

  .btn-next, .btn-prev {
    width: 31px;
    height: 31px;

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
  height: 530px;

  .carousel-item {
    width: 942px;
    height: 530px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    padding-top: 75%;

    .carousel-image {
      width: 942px;
      height: 530px;
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
