<template>
  <div class="grid-item md-layout-item " :style="isRow ? {gridRowStart: rowNum, gridRowEnd: 'span '+(!isLong ? '1' : '2') } : {gridRowEnd: 'span '+(!isLong ? '1' : '2')} ">
    <div class="grid-content plannig-service-category-card white-card" :class="{ 'longer-card': isLong}">
      <template v-if="!booked && (!isSentRequest || !selectedServices.length)">
        <div class="header-carousel">
          <div v-if="!musicPlayer" class="carousel-item">
            <img class="carousel-image" :src="`${$storageURL}RequirementsImages/thumbnails/${serviceCategory.images[index]}`">
            <label>{{ serviceCategory.imageTitles[index] }}</label>
          </div>
          <div v-else class="carousel-item">
            <img
              class="carousel-image"
              :src="`${$storageURL}RequirementsImages/thumbnails/Music Images/${serviceCategory.images[index]}`"
            >
            <music-player
              class="player"
              :title="serviceCategory.clipTitles[index]"
              :src="`${$storageURL}RequirementsImages/thumbnails/${serviceCategory.clips[index]}`"
              @next="next"
              @prev="prev"
            />
          </div>
        </div>
        <div class="p-20 font-bold d-flex align-center justify-content-between card-info">
          <template v-if="!musicPlayer">
            <span class="service-name">{{ serviceCategory.imageTitles[index] }}</span>
            <md-button
              v-show="hasBudget"
              class="md-red maryoku-btn save-btn"
              :class="{ isSelected: selectedServices.includes(serviceCategory.imageTitles[index]), notSelected: !selectedServices.includes(serviceCategory.imageTitles[index]) }"
              @click="addService(serviceCategory.imageTitles[index])"
            >
              I like &nbsp;&nbsp;
              <img
                v-if="!selectedServices.includes(serviceCategory.imageTitles[index])"
                class="non-selected"
                :src="`${$iconURL}Req/group-22450.svg`"
                width="24px"
              >
              <img v-else style="" :src="`${$iconURL}Req/group-22450-2.svg`" width="24px">
              <md-tooltip md-direction="top">
                Click here to show vendors your vision for the event
              </md-tooltip>
            </md-button>
          </template>
          <template v-else>
            <span class="service-name">{{ serviceCategory.clipTitles[index] }}</span>
            <md-button
              v-show="hasBudget"
              class="md-red maryoku-btn save-btn"
              :class="{ isSelected: selectedServices.includes(serviceCategory.clipTitles[index]), notSelected: !selectedServices.includes(serviceCategory.imageTitles[index]) }"
              @click="addService(serviceCategory.clipTitles[index])"
            >
              I like &nbsp;&nbsp;
              <img
                v-if="!selectedServices.includes(serviceCategory.clipTitles[index])"
                class="non-selected"
                :src="`${$iconURL}Requirements/Group+16153.svg`"
                width="24px"
              >
              <img v-else :src="`${$iconURL}Req/group-22450-2.svg`" width="24px">
              <md-tooltip md-direction="top">
                Click here to show vendors your vision for the event
              </md-tooltip>
            </md-button>
          </template>
        </div>
      </template>

      <div v-else class="issued-card flex-1 d-flex">
        <div class="flex-1 icon-section d-flex align-center flex-column justify-content-center">
          <img :src="`${$iconURL}${popperIcons[serviceCategory.serviceCategory]}`">
          <div class="service-name color-red font-size-20 font-bold">
            {{ serviceCategory.imageTitles[index] }}
          </div>
        </div>
      </div>
      <AddBudgetModal
        v-if="showAddNewCategory"
        :service-category="serviceCategory"
        @cancel="showAddNewCategory = false"
        @save="saveBudget"
      />
      <AddBudgetConfirmModal
        v-if="showAddBudgetConfirm"
        :service-category="serviceCategory"
        @cancel="showAddBudgetConfirm = false"
        @addNewBudget="addBudget"
      />
    </div>
  </div>
</template>
<script>
import "vue-popperjs/dist/vue-popper.css";
import { camelize } from "@/utils/string.util";
const components = {
    carousel: () => import("vue-owl-carousel"),
    Popper: () => import("vue-popperjs"),
    MusicPlayer: () => import("./MusicPlayer.vue"),
    AddBudgetModal: () => import("./modals/AddBudget.vue"),
    AddBudgetConfirmModal: () => import("./modals/AddBudgetConfirm.vue")
};
export default {
  components,
  props: {
    index: {
      type: Number,
      default: () => 0,
    },
    image: {
      type: String,
      default: () => "",
    },
    clip: {
      type: String,
      default: () => "",
    },
    serviceCategory: {
      type: Object,
      default: () => {},
    },
    isLong: {
      type: Boolean,
      default: false,
    },
    isRow: {
      type: Boolean,
      default: false,
    },
    rowNum: {
      type: Number,
      default: false,
    },
    booked: {
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
    defaultData: {
      type: Array,
      default: () => [],
    },
    isSentRequest: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showAddNewCategory: false,
      showAddBudgetConfirm: false,
      selected: false,
      selectedServices: [],
      popperIcons: {
        venuerental: "SentReqIcn/Group 18964.svg",
        decor: "SentReqIcn/Group 18012.svg",
        foodandbeverage: "SentReqIcn/group-18973.svg",
        entertainment: "SentReqIcn/Group 18967.svg",
        swag: "SentReqIcn/Group 18008.svg",
        audiovisualstagingservices: "SentReqIcn/Group 18015.svg",
        administration: "SentReqIcn/Group 18026.svg",
        transportation: "SentReqIcn/Group 18016.svg",
        giveaways: "SentReqIcn/Group 18014.svg",
        meetingorganizationfees: "SentReqIcn/Group 18008.svg",
        shipping: "SentReqIcn/Group 18008.svg",
        signageprinting: "SentReqIcn/Group 19854.svg",
        securityservices: "SentReqIcn/Group 19857.svg",
        videographyandphotography: "SentReqIcn/Group 18009.svg",
        equipmentrentals: "SentReqIcn/Group 18010.svg",
      },
    };
  },
  watch:{
    defaultData(newVal){
        this.selectedServices = [...this.defaultData];
    }
  },
  created() {
    this.selectedServices = [...this.defaultData];
  },
  methods: {
    selectSave() {},
    prev() {
      this.$refs.prevButton.click();
    },
    next() {
      this.$refs.nextButton.click();
    },
    getSpecification() {
      this.$emit("showSpecific", { category: this.serviceCategory, services: this.selectedServices });
    },
    addService(serviceName) {
      const serviceIndex = this.selectedServices.findIndex((item) => item === serviceName);
      if (serviceIndex < 0) {
        this.selectedServices.push(serviceName);
      } else {
        this.selectedServices.splice(serviceIndex, 1);
      }
      this.$emit("update", {
        category: this.serviceCategory,
        services: this.selectedServices,
        type: camelize(this.serviceCategory.name),
      });
    },
    addBudget() {
      this.showAddBudgetConfirm = false;
      this.showAddNewCategory = true;
    },
    saveBudget() {
      this.showAddNewCategory = false;
    },
  }
};
</script>
<style lang="scss" scoped>
.plannig-service-category-card {
  border-radius: 3px;
  position: relative;
  height: 400px;
  display: flex;
  flex-direction: column;
  .issued-card {
    flex-direction: column;
    .icon-section {
      background-color: #f3f7fd;
      width: 100%;
    }
  }
  .header-carousel {
    flex: 1;
    max-height: calc(100% - 80px);
  }
  .service-name {
    display: inline-block;
    line-height: 46px;
  }
  &.longer-card {
    height: 600px;
    img.carousel-image {
      height: 100%;
      width: 100%;
      max-height: 100%;
      max-width: 100%;
      object-fit: cover;
    }
  }
  img.carousel-image {
    height: 100%;
    object-fit: cover;
    width: -webkit-fill-available;
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
    height: 50px;
    z-index: 2;
    border: 1px solid #f51355;
    &.isSelected {
      padding: 0;
      // /deep/ .md-ripple {
      //   padding: 0 !important;
      // }
      // border: solid 1px #f51355;
      img {
        background-color: white;
        border-radius: 50%;
      }
    }
    &.notSelected {
      background-color: white !important;
      color: #f51355 !important;
      padding: 0;
    }
    /deep/ .md-ripple {
      padding: 0;
    }
    img.non-selected {
      padding: 3px;
    }
    img {
      width: 42px;
      height: 42px;
      padding: 3px;
    }
  }
  .header-carousel {
    position: relative;
    /deep/ span[id*="carousel_prev_"] {
      display: block !important;
    }
    /deep/ .carousel-item,
    /deep/ .owl-item,
    /deep/ .owl-carousel,
    /deep/ .owl-stage,
    /deep/ .owl-stage-outer {
      height: 100%;
    }
    /deep/ .owl-dots {
      position: absolute;
      margin-top: -40px !important;
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
  .card-info {
    min-height: 80px;
  }
}
</style>
