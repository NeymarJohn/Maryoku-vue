<template>
  <div class="white-card coundown-campaign">
    <div class="p-50">
      <div class="font-size-30 font-bold-extra text-transform-capitalize">
        send your guests a fun countdown
      </div>
      <div class="countdown-cover-image mt-50">
        <img :src="`${$iconURL}Campaign/Mask Group 129.png`">
        <div class="countdown-guests d-flex align-center p-20">
          <span class="font-size-30 font-bold-extra mr-10">{{event.numberOfParticipants}}</span>
          <span class="font-size-22 font-bold color-dark-gray">Guests are Attending</span>
          <md-switch v-model="showGuests" class="below-label large-switch">Hide Coming</md-switch>
        </div>
        <div class="d-flex countdown-time-panel align-end justify-content-center">
          <countdown-time :event="event"></countdown-time>
          <md-switch v-model="showCountdown" class="below-label large-switch ml-20">Hide Countdown</md-switch>
        </div>
      </div>
      <!-- <div class="font-size-50 font-bold-extra text-center line-height-1 mb-60">{{info.conceptName}}</div> -->
      <title-editor :value="info.conceptName" @change="changeTitle" class="font-size-50 font-bold-extra text-center line-height-1 mb-60"></title-editor>

      <hr/>
      <div class="d-flex mt-60">
        <maryoku-textarea :placeholder="placeholder" class="mr-60 flex-1" style="padding:40px 60px 40px 40px"></maryoku-textarea>
        <rsvp-event-info-panel class="flex-1" :event="event"></rsvp-event-info-panel>
      </div>
      <div class=" mt-60 logo-section d-flex align-center justify-content-center">
        <img :src="info.logo" width="180"/>
        <md-switch class="below-label large-switch ml-20" v-model="showLogo">Hide Logo</md-switch>
      </div>
    </div>
  </div>
</template>
<script>
import MaryokuTextarea from '@/components/Inputs/MaryokuTextarea'
import CountdownTime from './components/CountdownTime';
import RsvpEventInfoPanel from '@/pages/app/RSVP/RSVPEventInfoPanel'
import TitleEditor from './components/TitleEditor'

export default {
  components: {
    CountdownTime,
    RsvpEventInfoPanel,
    MaryokuTextarea,
    TitleEditor
  },
  props: {
    info: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      showGuests: true,
      showCountdown: true,
      showLogo: true,
      placeholder: `It's now time to get super exited! The event of the year is almost here( and it even rhymes). What to expect?
        out of this world live shows
        amazing food
        refreshing cocktail bar
        best employee award
        see u soon`
    }
  },
  computed: {
    event() {
      console.log(this.$store.state.event.eventData);
      return this.$store.state.event.eventData;
    },
   
  },
  methods: {
    changeTitle(newTitle) {
      this.$emit("changeInfo", {field: "conceptName", value: newTitle})
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
      transform: translate(70px, -50%);
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
    margin-left: auto;
    margin-right: auto;
    img {
      max-width: 200px;
    }
  }
}
</style>
