<template>
  <div class="white-card coundown-campaign">
    <div class="p-50">
      <div class="font-size-30 font-bold-extra text-transform-capitalize">
        send your guests a fun countdown
      </div>
      <div class="countdown-cover-image mt-50">
        <img :src="`${$iconURL}Campaign/Mask Group 129.png`">
        <div class="countdown-guests d-flex align-center p-20">
          <span class="font-size-30 font-bold-extra mr-10">156</span>
          <span class="font-size-22 font-bold color-dark-gray">Guests are Attending</span>
          <md-switch v-model="showGuests" class="below-label">Hide Coming</md-switch>
        </div>
        <countdown-time class="countdown-time-panel"></countdown-time>
      </div>
    </div>
  </div>
</template>
<script>
import CountdownTime from './components/CountdownTime';
export default {
  components: {
    CountdownTime,
  },
  data() {
    return {
      showGuests: true,
      showTimer: true
    }
  },
}
</script>
<style lang="scss" scoped>
.coundown-campaign {
  .countdown-cover-image {
    position: relative;
    overflow: hidden;
    img {
      max-height: 500px;
      width: 100%;
      border-radius: 30px;
      object-fit: cover;
    }
    .countdown-time-panel {
      margin: auto;
      transform: translate(0, -50%);
    }
  }
  .countdown-guests {
    position: absolute;
    right: 50px;
    top: 50px;
    background-color: #FFF;
    border-radius: 3px;
  }
}
</style>
