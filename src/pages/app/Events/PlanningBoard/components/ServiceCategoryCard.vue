<template>
  <div class="plannig-service-category-card white-card" :class="{ 'longer-card': isLong }">
    <md-button
      class="md-simple md-icon-button md-raised save-btn"
      :class="{ isSelected: selected }"
      @click="selected = !selected"
      v-show="hasBudget"
    >
      <img v-if="!selected" class="non-selected" :src="`${$iconURL}comments/SVG/heart-dark.svg`" />
      <img v-if="selected" :src="`${$iconURL}Requirements/Group+16153.svg`" />
    </md-button>
    <carousel v-if="!musicPlayer" :items="1" :margin="0" :nav="false" :loop="true" class="header-carousel">
      <template slot="prev">
        <span class="prev handle-btn">
          <md-icon>keyboard_arrow_left</md-icon>
        </span>
      </template>
      <div v-for="(image, index) in serviceCategory.images" :key="image" class="carousel-item">
        <img class="carousel-image" :src="`${$storageURL}RequirementsImages/thumbnails/${image}`" />
        <label>{{ serviceCategory.imageTitles[index] }}</label>
      </div>

      <template slot="next">
        <span class="next handle-btn">
          <md-icon>keyboard_arrow_right</md-icon>
        </span>
      </template>
    </carousel>
    <carousel v-else :items="1" :margin="0" :nav="false" :loop="true" class="header-carousel">
      <template slot="prev">
        <span class="prev handle-btn d-none" ref="prevButton">
          <md-icon>keyboard_arrow_left</md-icon>
        </span>
      </template>
      <div v-for="(clip, index) in serviceCategory.clips" :key="clip" class="carousel-item">
        <img
          class="carousel-image"
          :src="`${$storageURL}RequirementsImages/thumbnails/Photography+_+Videography/Candid.jpg`"
        />
        <music-player
          class="player"
          :title="serviceCategory.clipTitles[index]"
          :src="`${$storageURL}RequirementsImages/thumbnails/${clip}`"
          @next="next"
          @prev="prev"
        ></music-player>
      </div>

      <template slot="next">
        <span class="next handle-btn d-none" ref="nextButton">
          <md-icon>keyboard_arrow_right</md-icon>
        </span>
      </template>
    </carousel>
    <div class="p-20 font-bold d-flex align-center justify-content-between">
      <span>{{ serviceCategory.name }}</span>
      <md-button v-if="hasBudget" class="md-red maryoku-btn">Get Specific</md-button>
      <template v-else>
        <popper trigger="click" :options="{ placement: 'top', gpuAcceleration: false }">
          <div class="popper white-card popper-content">
            <div class="font-size-20 popper-header font-bold">
              <div class="d-flex align-center">
                <img :src="`${$iconURL}${serviceCategory.icon}`" class="mr-10" />
                <div>Would you like to add the {{ serviceCategory.name }} category to your budget?</div>
              </div>
            </div>
            <div class="font-size-16 mt-20">
              Looks like you didn’t allocate money for this service, it’s not a problem at all! You could do it whenever
              you want, just add it to your budget
            </div>
            <div class="mt-20">Adding categories to budget is mandatory in order to get proposals</div>
            <div class="popper-footer d-flex mt-50">
              <md-button class="md-simple md-black maryoku-btn">
                Don't Add {{ serviceCategory.name }} To Budget
              </md-button>
              <md-button class="md-red maryoku-btn">Add {{ serviceCategory.name }} To Budget</md-button>
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
import MusicPlayer from "./MusicPlayer.vue";
export default {
  components: {
    carousel,
    Popper,
    MusicPlayer,
  },
  data() {
    return {
      selected: false,
      popperIcons: {
        venuerental: "NewRequirements/Group 18008.svg",
        decor: "NewRequirements/Group 18012.svg",
        foodandbeverage: "NewRequirements/Group 18008.svg",
        entertainment: "NewRequirements/Group 18015.svg",
        swag: "NewRequirements/Group 18008.svg",
        audiovisualstagingservices: "NewRequirements/Group 18008.svg",
        corporatesocialresponsibility: "NewRequirements/Group 18008.svg",
        transportation: "NewRequirements/Group 18016.svg",
        giveaways: "NewRequirements/Group 18008.svg",
        meetingorganizationfees: "NewRequirements/Group 18008.svg",
        shipping: "NewRequirements/Group 18008.svg",
        signageprinting: "NewRequirements/Group 18008.svg",
        securityservices: "NewRequirements/Group 18008.svg",
        videographyandphotography: "NewRequirements/Group 18009.svg",
      },
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
    musicPlayer: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    selectSave() {},
    prev() {
      this.$refs.prevButton.click();
    },
    next() {
      this.$refs.nextButton.click();
    },
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
  .carousel-item {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.4;
    }
    label,
    .player {
      position: absolute;
      left: 50%;
      top: 50%;
      color: white;
      font-weight: bold;
      line-height: 1.2em;
      transform: translate(-50%, -50%);
      font-size: 30px;
      text-align: center;
    }
    .player {
      width: 100%;
      padding: 50px;
    }
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
      background-color: transparent !important;
      padding: 0;
      // /deep/ .md-ripple {
      //   padding: 0 !important;
      // }
      // border: solid 1px #f51355;
    }
    /deep/ .md-ripple {
      padding: 0px;
    }
    img.non-selected {
      padding: 3px;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
  .header-carousel {
    position: relative;
    /deep/ span[id*="carousel_prev_"] {
      display: block !important;
    }
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
      cursor: pointer;
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