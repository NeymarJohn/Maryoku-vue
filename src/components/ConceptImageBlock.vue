<template>
  <div
    ref="content"
    :class="{
      'concept-image-block': !isSmall,
      'small-concept-image-block': isSmall
    }"
  >
    <div
      v-for="idx in 4"
      :key="idx"
      class="image-background"
      :style="`background-color: ${colors[idx - 1].color}; opacity:${colors[idx - 1].opacity}`"
    />
    <div>
      <div v-for="indx in 5" :key="indx" :class="`images-list__item ${border}`">
        <div
          v-if="images[indx - 1]"
          class="image-section d-flex justify-content-center align-center text-center"
          :style="`background-image:url(${images[indx - 1].thumb_url || images[indx - 1].url})`"
          :for="`file-${indx}`"
        />
      </div>
    </div>
  </div>
</template>
<script>
import jsPDF from "jspdf";
export default {
  props: {
    images: {
      type: Array,
      default: [],
    },
    colors: {
      type: Array,
      default: [],
    },
    border: {
      type: String,
      default: "",
    },
    isSmall: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      imageData: "",
    };
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.concept-image-block {
  position: relative;
  height: 382px;
  .image-background {
    background: #ededed;
    position: absolute;
    &:first-child {
      top: 142px;
      left: 0;
      width: calc(249px - 50px);
      height: calc(232px - 50px);
    }
    &:nth-child(2) {
      top: 40px;
      left: 123px;
      width: calc(296px - 50px);
      height: calc(232px - 50px);
    }
    &:nth-child(3) {
      top: 38px;
      left: 445px;
      width: calc(272px - 50px);
      height: calc(325px - 50px);
    }
    &:nth-child(4) {
      top: 74px;
      left: 752px;
      width: calc(182px - 50px);
      height: calc(278px - 50px);
    }
  }
  .images-list__item {
    border: 2px dashed $rose;
    background-color: #fff;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    position: absolute;
    &.no-border {
      border: none;
      border-radius: 3px;
      box-shadow: none;
      overflow: hidden;
    }
    .image-section {
      background-size: cover !important;
      background-position: center center;
    }
    &:first-child {
      top: 70px;
      left: 30px;
      z-index: 10;
      .image-section {
        width: calc(234px - 50px);
        height: calc(234px - 50px);
      }
    }
    &:nth-child(2) {
      top: 172px;
      left: 168px;
      z-index: 9;
      .image-section {
        width: calc(320.8px - 50px);
        height: calc(198px - 50px);
      }
    }
    &:nth-child(3) {
      top: 69px;
      left: 342px;
      z-index: 8;
      .image-section {
        width: calc(311px - 50px);
        height: calc(236px - 50px);
      }
    }
    &:nth-child(4) {
      top: 94px;
      left: 583px;
      z-index: 7;
      .image-section {
        width: calc(242px - 50px);
        height: calc(280px - 50px);
      }
    }
    &:nth-child(5) {
      top: 45px;
      left: 720px;
      z-index: 6;
      .image-section {
        width: calc(287.6px - 50px);
        height: calc(202px - 50px);
      }
    }
  }
}

.small-concept-image-block {
  position: relative;
  height: 95.5px;
  .image-background {
    background: #ededed;
    position: absolute;
    &:first-child {
      top: 35.5px;
      left: 0;
      width: calc(62.2px - 12.5px);
      height: calc(58px - 12.5px);
    }
    &:nth-child(2) {
      top: 10px;
      left: 30.7px;
      width: calc(74px - 12.5px);
      height: calc(58px - 12.5px);
    }
    &:nth-child(3) {
      top: 9.5px;
      left: 111.2px;
      width: calc(68px - 12.5px);
      height: calc(81.2px - 12.5px);
    }
    &:nth-child(4) {
      top: 18.5px;
      left: 188px;
      width: calc(45.5px - 12.5px);
      height: calc(69.5px - 12.5px);
    }
  }
  .images-list__item {
    border: 2px dashed $rose;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
    position: absolute;
    &.no-border {
      border: none;
      border-radius: 2px;
      box-shadow: none;
      overflow: hidden;
    }
    .image-section {
      background-size: cover !important;
      background-position: center center;
    }
    &:first-child {
      top: 17.5px;
      left: 7.5px;
      z-index: 10;
      .image-section {
        width: calc(58.5px - 12.5px);
        height: calc(58.5px - 12.5px);
      }
    }
    &:nth-child(2) {
      top: 43px;
      left: 42px;
      z-index: 9;
      .image-section {
        width: calc(80px - 12.5px);
        height: calc(49.5px - 12.5px);
      }
    }
    &:nth-child(3) {
      top: 17.2px;
      left: 85.5px;
      z-index: 8;
      .image-section {
        width: calc(77.7px - 12.5px);
        height: calc(59px - 12.5px);
      }
    }
    &:nth-child(4) {
      top: 23.5px;
      left: 145.7px;
      z-index: 7;
      .image-section {
        width: calc(60.5px - 12.5px);
        height: calc(70px - 12.5px);
      }
    }
    &:nth-child(5) {
      top: 11px;
      left: 180px;
      z-index: 6;
      .image-section {
        width: calc(71.7px - 12.5px);
        height: calc(50.5px - 12.5px);
      }
    }
  }
}
</style>
