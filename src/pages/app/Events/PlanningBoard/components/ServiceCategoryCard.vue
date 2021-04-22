<template>
  <div class="plannig-service-category-card white-card">
    <md-button class="md-simple md-just-icon save-btn"> </md-button>
    <md-button class="md-simple md-icon-button md-raised save-btn">
      <img :src="`${$iconURL}comments/SVG/heart-dark.svg`" />
    </md-button>
    <carousel :items="1" :margin="0" :nav="false" class="header-carousel">
      <template slot="prev">
        <span class="prev handle-btn">
          <md-icon>keyboard_arrow_left</md-icon>
        </span>
      </template>
      <img v-for="image in serviceCategory.images" :src="`${$storageURL}RequirementsImages/${image}`" :key="image" />
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
  props: {
    serviceCategory: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.plannig-service-category-card {
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  .save-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 50px;
    height: 50px;
    z-index: 2;
    background: white !important;
    border-radius: 50%;
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