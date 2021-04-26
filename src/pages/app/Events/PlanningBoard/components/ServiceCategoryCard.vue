<template>
  <div class="plannig-service-category-card white-card" :class="{ 'longer-card': isLong }">
    <md-button
      class="md-simple md-icon-button md-raised save-btn"
      :class="{ isSelected: selected }"
      @click="selected = !selected"
      v-show="hasBudget"
    >
      <img v-if="!selected" :src="`${$iconURL}comments/SVG/heart-dark.svg`" />
      <img v-if="selected" :src="`${$iconURL}common/heart-red.svg`" />
    </md-button>
    <carousel :items="1" :margin="0" :nav="false" :loop="true" class="header-carousel">
      <template slot="prev">
        <span class="prev handle-btn">
          <md-icon>keyboard_arrow_left</md-icon>
        </span>
      </template>
      <img
        class="carousel-image"
        v-for="image in serviceCategory.images"
        :src="`${$storageURL}RequirementsImages/thumbnails/${image}`"
        :key="image"
      />
      <template slot="next">
        <span class="next handle-btn">
          <md-icon>keyboard_arrow_right</md-icon>
        </span>
      </template>
    </carousel>
    <div class="p-20 font-bold d-flex align-center justify-content-between">
      <span>{{ serviceCategory.name }}</span>
      <md-button v-if="hasBudget" class="md-red maryoku-btn">Add Specific</md-button>
      <template v-else>
        <popper trigger="click" :options="{ placement: 'top' }">
          <div class="popper white-card popper-content">
            <div class="font-size-20 popper-header font-bold">
              <div>Would you like to add the catering category to your budget?</div>
            </div>
            <div class="font-size-16 mt-20">
              Looks like you didn’t allocate money for this service, it’s not a problem at all! You could do it whenever
              you want, just add it to your budget
            </div>
            <div class="mt-20">Adding categories to budget is mandatory in order to get proposals</div>
            <div class="popper-footer d-flex mt-50">
              <md-button class="md-simple md-black maryoku-btn">Don't Add Catering To Budget</md-button>
              <md-button class="md-red maryoku-btn">Add Catering To Budget</md-button>
            </div>
          </div>
          <md-button class="md-simple maryoku-btn md-red" slot="reference">Add To Budget</md-button>
        </popper>
      </template>
    </div>
  </div>
</template>
<script>
import carousel from "vue-owl-carousel";
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
export default {
  components: {
    carousel,
    Popper,
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
    hasBudget: {
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
  .popper-content {
    padding: 40px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.26);
    text-align: left;
  }
}
</style>