<template>
  <div class="view-presentation-main" >
    <img v-if="coverImage" class="view-presentation-cover-image" :src="coverImage" />
    <div class="view-presentation-content" >
      <div v-if="isEdit" >
        <div class="wrapper-icon-play" >
          <img
            width="77"
            height="77"
            src="https://cdn.zeplin.io/5e24629a581f9329a242e986/assets/9b892cf0-5507-4cdb-9828-1d10baa61381.svg"
          />
        </div>
        <div class="wrapper-btn-switch" >
          <hide-switch class="btn-switch" label="View A Presentation From The Event Photos" />
        </div>
      </div>
      <div v-else >
        <img
          width="77"
          height="77"
          src="static/icons/play-white.svg"
        />
      </div>
    </div>
    <div v-if="!isEdit" class="view-presentation-description" >
      <img class="icon-arrow-up" src="static/icons/arrow-up-red.svg" />
      <span class="text-description" >Download the presentation</span>
    </div>
  </div>
</template>


<script>
import HideSwitch from "@/components/HideSwitch";

export default {
  name: "view-presentation",
  components: {
    HideSwitch,
  },
  props: {
    coverImage: String,
    isEdit: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang="scss" scoped>
.view-presentation-main {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

  img.view-presentation-cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(60%);
    border-radius: 30px;
  }

  .view-presentation-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;

    &> div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .wrapper-icon-play {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .wrapper-btn-switch {
        width: 40%;
        display: flex;
        align-items: center;
      }

    }
  }

  .view-presentation-description {
    display: flex;
    position: absolute;
    bottom: -50px;

    .icon-arrow-up {
      width: 24px;
      height: 24px;
    }

    .text-description {
      margin-left: 10px;
      font-size: 16px;
      font-weight: 800;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.34px;
      text-align: left;
      text-decoration: underline;
      color: #f51355;
    }
  }
}
</style>
