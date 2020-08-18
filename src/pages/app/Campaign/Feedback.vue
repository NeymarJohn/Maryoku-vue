<template>
  <div class="white-card feedback-campaign">
    <div class="p-50">
      <div class="font-size-30 font-bold-extra mb-50">Create ‘Save The Date’ Campaign</div>
      <hr/>
      <div class="d-flex mt-70 mb-40">
        <img :src="`${$iconURL}`"/>
        <div>
          <div class="font-size-40 font-bold line-height-1 mb-20">It was great seeing you!</div>
          <div  class="font-size-22 line-height-1">80's DISCO PARTY</div>
        </div>
      </div>
      <maryoku-textarea></maryoku-textarea>
    </div>
    <rsvp-venue-carousel></rsvp-venue-carousel>
    <div class="p-50">
      <div class="d-flex align-center font-bold">Allow guests to upload photos form the event <md-switch v-model="allowUploadPhoto"></md-switch></div>
      <div class="font-size-22 font-bold line-height-2">Download files related to the event</div>
      <div class="mb-20">Like presentation</div>
      <md-button class="md-simple edit-btn md-red"> <img :src="`${$iconURL}Campaign/Group 9241.svg`"/>Upload File</md-button>
      <hr class="mt-50 mb-70" />
      <div class="share-panel">
        <div class="d-flex mb-60 align-center">
          <img :src="`${$iconURL}R`"/>
          <div>
            <div class="font-size-30 font-bold line-height-2">share event participation</div>
            <div>(Include photos & details of the event)</div>
          </div>
          <md-switch class="below-label">Hide sharing option</md-switch>
        </div>
        <sharing-button-group class="mb-50"></sharing-button-group>
      </div>
      <hr/>
      <div>
        <div class="font-size-30 font-bold line-height-1 d-flex align-center">
          We'd love to get your feedback 
          <md-switch class="below-label ml-50">Hide feedback section</md-switch>
        </div> 
        <div>
          <feedback-question question="In general, how was the event?"></feedback-question>
          <feedback-question question="How was the Venue?" icon="venuerental"></feedback-question>
          <feedback-question question="How was the catering?" icon="foodandbeverage"></feedback-question>
          <feedback-question question="How was the activity?" icon="decor"></feedback-question>
        </div>
      </div>
      <div class="mt-60">
        <md-button class="md-simple edit-btn md-red"><img :src="`${$iconURL}Campaign/Group 9327.svg`" class="mr-20"/>Feel free to add more questions</md-button>
      </div>
    </div>
    <hr/>
   
  </div>
</template>
<script>
import MaryokuTextarea from '@/components/Inputs/MaryokuTextarea';
import RsvpVenueCarousel from "@/pages/app/RSVP/RSVPVenueCarousel.vue"
import SharingButtonGroup from "./components/SharingButtonGroup"
import FeedbackQuestion from './components/FeedbackQuestion'
export default {
  components: {
    MaryokuTextarea,
    RsvpVenueCarousel,
    SharingButtonGroup,
    FeedbackQuestion
  },  
  data() {
    return {
      allowUploadPhoto: true
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
