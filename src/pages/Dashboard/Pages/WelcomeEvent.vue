<template>
  <div class="weclome-event-page">
    <div class="welcome-event-content white-card">
      <div class="header d-flex justify-content-between">
        <img :src="`${$iconURL}Onboarding/maryoku-logo-dark%402x%403x.png`" />
        <md-button class="md-simple edit-btn"><md-icon class="color-black">close</md-icon></md-button>
      </div>
      <div class="title text-center">
        <img :src="`${$iconURL}common/welcome-header.png`" />
        <h1 class="font-size-50 font-bold">Welcome to your event rachel!</h1>
        <div class="sumarry">
          <span>Your on board sumarry:</span>
          <span>December 25, 2019(Flexible)</span>
          <span>2,034 Invited</span>
          <span>New York, NY, USA</span>
        </div>
      </div>
      <div class="text-center mt-100 font-size-22 font-bold">Explore Mayroku's Main Features</div>
      <div class="video-list mt-50">
        <div v-for="video in videos" :key="video.title" class="video-item">
          <img :src="`https://img.youtube.com/vi/${video.id}/0.jpg`" />
          <div class="video-item-wrapper">
            <div class="video-item-title font-bold-extra">
              {{ video.title }}
            </div>
            <md-button class="md-icon-button md-red md-raised play-button" @click="playVideo(video.id)">
              <md-icon>play_arrow</md-icon>
            </md-button>
          </div>
        </div>
      </div>
      <!-- <youtube video-id="pELHFctXOcQ" ref="youtube"></youtube> -->
      <youtube-player :videoId="selectedVideoId"></youtube-player>
    </div>
    <div class="weclome-event-page-footer white-card">
      <md-button class="md-red maryoku-btn">Let's Begin</md-button>
    </div>
  </div>
</template>
<script>
import YoutubePlayer from "@/components/YoutubePlayer.vue";
export default {
  components: {
    YoutubePlayer,
  },
  data() {
    return {
      selectedVideoId: "",
      openPlayer: false,
      videos: [
        { title: "BUDGET", id: "pELHFctXOcQ" },
        { title: "VENDORS LIST", id: "pELHFctXOcQ" },
        { title: "PERSONALISED PROPOSALS", id: "pELHFctXOcQ" },
        { title: "GUEST MANAGEMENT", id: "pELHFctXOcQ" },
        { title: "VENDORS COMMUNICATION", id: "pELHFctXOcQ" },
        { title: "TIMELINE", id: "pELHFctXOcQ" },
      ],
    };
  },
  methods: {
    playVideo(id) {
      this.selectedVideoId = id;
      this.openPlayer = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.weclome-event-page {
  .welcome-event-content {
    background: linear-gradient(#fdf0f4 0%, #fdf0f4 60%, white 60%, white 100%);
    margin: 60px;
    padding: 50px;
    .header {
      img {
        width: 200px;
      }
    }
    .video-list {
      text-align: center;
      max-width: 1200px;
      margin: 50px auto;
      .video-item {
        display: inline-block;
        width: 330px;
        height: 204px;
        position: relative;
        margin: 25px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        &-title {
          margin-top: 15%;
          color: white;
        }
        &-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          top: 0px;
          .play-button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            i {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
  &-footer {
    text-align: right;
    padding: 10px 60px;
  }
}
</style>