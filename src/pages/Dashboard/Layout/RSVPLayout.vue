<template>
  <div>
    <zoom-center-transition :duration="200" mode="out-in">
      <div class="rsvp-container">
        <router-view></router-view>
      </div>
    </zoom-center-transition>
    <div class="text-center mb-50">
      Provided by 
      <img :src="`${$iconURL}RSVP/maryoku - logo dark@2x.png`">
    </div>
    <div class="rsvp-footer">
        <div class="rsvp-footer-content">
          <md-button @click="scrollToTop" class="md-button md-simple md-just-icon md-theme-default scroll-top-button">
            <img :src="`${$iconURL}Budget+Requirements/Asset+49.svg`" width="17"/>
          </md-button>
          <div>
            <md-button class="md-simple md-button md-black normal-btn">
              I Can't make it
            </md-button>
            <md-button class="md-simple md-button md-black normal-btn">
              I Need To Think About It
            </md-button>
            <md-button class="md-simple md-button md-black normal-btn">
              Virtual Participation
            </md-button>
            <md-button class="md-button md-red normal-btn">
              RSVP Now
            </md-button>
          </div>
         
        </div>
      </div>
  </div>
  
</template>
<script>
import { ZoomCenterTransition } from "vue2-transitions";
export default {
  components: {
    ZoomCenterTransition,
  },  
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
}
</script>
<style lang="scss" scoped>
  .rsvp-container {
    max-width: 1520px;
    margin: 80px auto 80px;
    border-radius: 20px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    overflow: hidden;
    background-color: #fff;
  }
  .rsvp-footer {
    height: 128px;
    background-color: white;
    &-content {
      max-width: 1520px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
  }
</style>