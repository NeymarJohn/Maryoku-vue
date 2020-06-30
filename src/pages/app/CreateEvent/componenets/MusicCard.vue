<template>
  <div class="music-card">
    <img :src="`/static/img/miley.jpg`">
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
      <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
    </audio>

  </div>
</template>
<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
  components: {
    RadialProgressBar,
  },
  props: {
    thumbnail: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      isPlaying: false,
      totalSteps: 100,
      completedSteps: 40,
    }
  },
  methods: {
    playMusic() {
      this.isPlaying = !this.isPlaying
      if (this.isPlaying) {
          this.totalSteps = this.$refs.player.duration;
          this.completedSteps = 0;
          const context = this;
          setInterval(()=>{
            context.completedSteps = context.completedSteps + 1;
          }, 1000)
      } else {
        clearInterval();
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
      background: rgba(0, 0,0, 0.2);
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
</style>