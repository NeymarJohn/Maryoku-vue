<template>
<modal class="setting-reminder-model">
    <template slot="header">
      <!-- <div class="maryoku-modal-header">
        <img :src="`${$iconURL}RSVP/Group+8217.svg`" />
        <span class="font-size-30 font-bold-extra">JUST A QUICK FILL OUT & WE’RE DONE!</span>
      </div> -->
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div>
        <img :src="`${$iconURL}RSVP/Group+8217.svg`" />
        <div class="font-size-30 font-weight-bold">SEE YOU THERE SAM!</div>
        <md-button class="md-simple md-red maryoku-btn">
          Sync Your Calendar 
          <md-icon >keyboard_arrow_right</md-icon>
        </md-button>
      </div>
    </template>
    <template slot="footer" v-if="step==1">
      <!-- <div class="text-center w-100">
        <md-button class="md-red md-bold" @click="close">RSVP Now</md-button>
      </div> -->
    </template>
  </modal>
  
</template>
<script>
import { Modal, MaryokuInput } from "@/components";

export default {
  components: {
    Modal,
  },
}
</script>
<style lang="scss" scoped>

</style>