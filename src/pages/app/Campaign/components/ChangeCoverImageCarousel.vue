<template>
  <div class="feedback-upload-images-carousel">
    <carousel
      v-if="images.length"
      :items="5"
      :nav="false"
      :dots="false"
      :margin="0"
      :auto-width="true"
      class="carousel"
      :number="2"
    >
      <template v-if="showButtonActions" slot="prev">
        <md-button class="edit-btn carousel-btn-prev nav-btn btn-just-icon nav-left md-round md-raised md-white">
          <md-icon class="btn-prev-icon-arrow-left left">
            keyboard_arrow_left
          </md-icon>
        </md-button>
      </template>
      <div
        v-for="(item, index) in images"
        :key="index"
        :class="{
          'cursor-pointer': true,
          'carousel-first-item': !index,
          'carousel-last-item': index === (images.length - 1),
          'carousel-selected-item': index === selectedIndex,
        }"
        @click="handleClickItem(index)"
      >
        <img
          :src="item.url"
          :class="['carousel-item-image', 'md-image', classImage]"
        >
      </div>
      <template v-if="showButtonActions && images.length > 5" slot="next">
        <md-button class="edit-btn carousel-btn-next nav-btn btn-just-icon nav-right md-round md-raised md-white">
          <md-icon class="btn-next-icon-arrow-right right">
            keyboard_arrow_right
          </md-icon>
        </md-button>
      </template>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  name: "ChangeCoverImageCarousel",
  components: {
    carousel,
  },
  props: {
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
  data() {
    return {
      selectedIndex: 0,
    };
  },
  methods: {
    handleClickItem(index) {
      this.selectedIndex = index;
      this.$emit("select-image", index);
    }
  },
};
</script>

<style lang="scss" scoped>
.feedback-upload-images-carousel {
  position: relative;
}

.carousel {
  width: 950px;
  height: 70px;

  & div {
    width: 174px;
    height: 85px;
    margin: 0 10px;
    border: solid 5px #fff;
  }

  & .carousel-first-item {
    margin-left: 0;
  }

  & .carousel-last-item {
    margin-right: 0;
  }

  .carousel-selected-item {
    border: solid 5px #000;
  }

  .carousel-item-image {
    width: 170px;
    height: 75px;
    object-fit: cover;
  }

  .carousel-btn-next,
  .carousel-btn-prev {
    justify-content: center;
    width: 28px;
    height: 28px;

    .btn-prev-icon-arrow-left,
    .btn-next-icon-arrow-right {
      font-size: 28px !important;
      color: #000 !important;

      &.left {
        margin-right: 2px;
      }

      &.right {
        margin-left: 2px;
      }
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
      top: 40px;
      right: 10px;
    }
    &.nav-left {
      top: 40px;
      left: 10px;
    }
  }
}
</style>
