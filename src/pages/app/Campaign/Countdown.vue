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
      <div class="font-size-50 font-bold-extra text-center line-height-1 mb-60">To 80’s Disco Party</div>
      <hr/>
      <div class="d-flex mt-60">
        <maryoku-textarea placeholder="Text" class="mr-60 flex-1"></maryoku-textarea>
        <rsvp-event-info-panel class="flex-1"></rsvp-event-info-panel>
      </div>
      <div class="logo-section d-flex align-center justify-content-center">
        <img :src="`${$iconURL}RSVP/ms-icon.png`" width="100"/>
        <md-switch class="below-label" v-model="showLogo">Hide Logo</md-switch>
      </div>
    </div>
  </div>
</template>
<script>
import MaryokuTextarea from '@/components/Inputs/MaryokuTextarea'
import CountdownTime from './components/CountdownTime';
import RsvpEventInfoPanel from '@/pages/app/RSVP/RSVPEventInfoPanel'
export default {
  components: {
    CountdownTime,
    RsvpEventInfoPanel,
    MaryokuTextarea
  },
  data() {
    return {
      showGuests: true,
      showTimer: true,
      showLogo: true
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
  .logo-section {
    margin: auto;
    img {
      max-width: 200px;
    }
  }
}
</style>
