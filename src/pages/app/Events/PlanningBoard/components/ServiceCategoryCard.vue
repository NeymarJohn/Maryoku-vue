<template>
  <div class="plannig-service-category-card white-card" :class="{ 'longer-card': isLong }">
    <md-button
      class="md-simple md-icon-button md-raised save-btn"
      :class="{ isSelected: selected }"
      @click="selected = !selected"
    >
      <img v-if="!selected" :src="`${$iconURL}comments/SVG/heart-dark.svg`" />
      <img v-if="selected" :src="`${$iconURL}common/heart-red.svg`" />
    </md-button>
    <carousel :items="1" :margin="0" :nav="false" class="header-carousel">
      <template slot="prev">
        <span class="prev handle-btn">
          <md-icon>keyboard_arrow_left</md-icon>
        </span>
      </template>
      <img
        class="carousel-image"
        v-for="image in serviceCategory.images"
        :src="`${$storageURL}RequirementsImages/${image}`"
        :key="image"
      />
      <template slot="next">
        <span class="next handle-btn">
          <md-icon>keyboard_arrow_right</md-icon>
        </span>
      </template>
    </carousel>
    <div class="p-20 font-bold">{{ serviceCategory.fullTitle }}</div>
  </div>
</template>
<script>
import carousel from "vue-owl-carousel";
export default {
  components: {
    carousel,
  },
  data() {
    return {
      selected: false,
    };
  },
  props: {
    serviceCategory: {
      type: Object,
      default: () => {},
    },
    isLong: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    selectSave() {},
  },
};
</script>
<style lang="scss" scoped>
.plannig-service-category-card {
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  &.longer-card {
    img.carousel-image {
      height: 540px;
      object-fit: cover;
    }
  }
  img.carousel-image {
    height: 280px;
    object-fit: cover;
  }
  .save-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 50px;
    height: 50px;
    z-index: 2;
    background: white !important;
    border-radius: 50%;
    &.isSelected {
      background: rgba(255, 255, 255, 0.5) !important;
      border: solid 1px #f51355;
    }
    /deep/ .md-ripple {
      padding: 5px;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
  .header-carousel {
    position: relative;
    /deep/ .owl-dots {
      position: absolute;
      margin-top: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      .owl-dot {
        &.active {
          span {
            background-color: #f51355;
          }
        }
        span {
          background-color: white;
          margin: 5px;
        }
      }
    }
    .handle-btn {
      background-color: white !important;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      i {
        color: #050505;
      }
      &.next {
        right: 20px;
      }
      &.prev {
        left: 20px;
      }
    }
  }
}
</style>