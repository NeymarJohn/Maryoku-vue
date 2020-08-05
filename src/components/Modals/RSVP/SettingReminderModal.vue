<template>
<modal class="setting-reminder-model">
    <template slot="header">
      <div class="maryoku-modal-header" v-if="screen==2">
        <md-button class="md-simple md-black normal-btn" @click="screen = screen - 1">
          <img class="mr-10" :src="`${$iconURL}RSVP/Group+3593.svg`" />
          Back 
        </md-button>
      </div>
      <div class="maryoku-modal-header" v-if="screen==3">
        <md-button class="md-simple md-black normal-btn" @click="screen = screen - 1">
          <img class="mr-10" :src="`${$iconURL}RSVP/Group+3593.svg`" />
          Change my mind 
        </md-button>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div v-if="screen==1">
        <img :src="`${$iconURL}RSVP/Group+7946.svg`" class="mb-30" />
        <div class="font-size-30 font-bold mb-30">SEE YOU THERE SAM!</div>
        <md-button class="md-simple md-red maryoku-btn" @click="screen = screen +1">
          Sync Your Calendar 
          <md-icon >keyboard_arrow_right</md-icon>
        </md-button>
      </div>
      <div v-if="screen==2" class="text-left">
        <div class="font-size-30 font-bold mb-50 mt-30">TAKE YOUR TIME, WE’LL REMIND YOU LATER</div>
        <div class="text-left">
          <div><md-radio v-model="remindTool" value="sms">Remind me by Sms</md-radio></div>
          <div><md-radio v-model="remindTool" value="email">Remind me by email</md-radio></div>
        </div>
        <maryoku-input placeholder="Type email address here..." class="mb-50 width-50" inputStyle="email" type="email" v-model="remindEmail"></maryoku-input>
        <div class="text-left">
          <img class="mr-30" :src="`${$iconURL}RSVP/ring.svg`"/>
          <span class="font-size-20 font-bold">When Do You Want Your Reminder? </span>
        </div>
        <div class="d-flex">
          <option-card icon="Group+4311.svg" label="Remind Me Tonight" :selected="remindTime=='tonight'" @select="remindTime='tonight'"></option-card>
          <option-card icon="Group+8441.svg" label="Remind Me Tomorrow" :selected="remindTime=='tomorrow'" @select="remindTime='tomorrow'"></option-card>
          <option-card icon="Group+4458.svg" label="Remind Me In A Week" :selected="remindTime=='week'" @select="remindTime='week'"></option-card>
        </div>
      </div>
      <div v-if="screen==3">
        <img :src="`${$iconURL}RSVP/Group 8005.svg`" class="mt-20"/>
        <div class="font-size-30 mb-30 mt-30 font-bold">
          WE WILL SEND YOU A REMINDER TONIGHT
        </div>
        <div class>By email</div>
      </div>
    </template>
    <template slot="footer">
      <div class="text-center w-100 " v-if="screen==2">
        <md-button class="md-red md-bold" @click="screen=3">Set A Reminder</md-button>
      </div>
    </template>
  </modal>
  
</template>
<script>
import { Modal, MaryokuInput } from "@/components";
import OptionCard from './OptionCard';
export default {
  components: {
    Modal,
    MaryokuInput,
    OptionCard
  },

  data() {
    return {
      screen: 1,
      remindEmail: "",
      remindTool: "email",
      remindTime: "tomorrow"
    }
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
  },
}
</script>
<style lang="scss" scoped>

</style>