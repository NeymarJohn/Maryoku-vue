<template>
  <div class="music-card-root">
    <div class="music-card">
      <img :src="`${$storageURL}${data.thumb}`">
      <div class="mask" :class="{playing:isPlaying}">
        <span class="player-icon" @click="playMusic" v-if="!isPlaying"><md-icon>play_arrow</md-icon></span>
        <radial-progress-bar v-if="isPlaying" 
                          innerStrokeColor="white"
                          startColor="#f51355"
                          stopColor="#f51355"
                          :diameter="212"
                          :completed-steps="completedSteps"
                          :total-steps="totalSteps">
          <span @click="playMusic"><md-icon >stop</md-icon></span>
        </radial-progress-bar>
      </div>
      <audio  width="320" height="176" controls ref="player">
        <source :src="`${$storageURL}${data.src}`" type="audio/mpeg">
      </audio>
    </div>
    <div class="music-infor">
      <md-checkbox class="md-checkbox-circle">
        
      </md-checkbox>
      <div> 
          <div class="music-title">{{this.data.title}}</div>
          <div class="music-singer">{{this.data.singer}}</div>
        </div>
    </div>
  </div>
</template>
<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
  components: {
    RadialProgressBar,
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      isPlaying: false,
      totalSteps: 100,
      completedSteps: 40,
      audioInterval:null
    }
  },
  methods: {
    playMusic() {
      const context = this
      this.isPlaying = !this.isPlaying
      if (this.isPlaying) {
          const player = this.$refs.player;
          player.play();
          this.totalSteps = player.duration;
          this.completedSteps = 0;
          const context = this;
          this.audioInterval = setInterval(() => {
            this.completedSteps = player.currentTime
            if (player.currentTime === player.duration) {
              context.playMusic();
            }
          }, 1000)
      } else {
        clearInterval(this.audioInterval);
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  .music-card {
    width: 200px;
    height: 200px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    margin: 10px;
    .mask {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0,0, 0.4);
      left: 0px;
      top: 0px;
      &.playing {
         opacity: 1;
      }
      .player-icon {
        i {
          font-size: 50px !important;
          color: white;
          margin: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    &:hover{
      .mask {
        opacity: 1;
      }
    }
  }
  .radial-progress-container {
    position: absolute;
    top: -6px;
    left: -6px;
    i {
      font-size: 50px !important;
      color: white !important;
    }
  }
  .music-infor {
    width: 200px;
    text-align: left;
    margin: auto;
    display: flex;
    .music-title {
      font-family: "Manrope-Bold";
      margin-top: -10px;
      margin-bottom: 5px;
      margin-left: 10px;
    }
    .music-singer {
      font-size: 14px;
      text-transform: capitalize;
      margin-left: 10px;
    }
  }
</style>