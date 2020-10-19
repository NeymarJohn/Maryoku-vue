<template>
  <modal class="rsvp-information-model">
    <template slot="header">
      <div class="maryoku-modal-header">
        <img :src="`${$iconURL}RSVP/Group+8217.svg`" />
        <span class="font-size-30 font-bold-extra">JUST A QUICK FILL OUT & WE’RE DONE!</span>
      </div>
      <md-button class="md-simple md-just-icon md-round modal-default-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div class="d-flex user-info">
        <div class="text-left flex-1 input-wrapper">
          <label class="font-bold">Name</label>
          <maryoku-input v-model="name" inputStyle="username" placeholder="Type your name here..."></maryoku-input>
        </div>
        <div class="text-left flex-1 input-wrapper">
          <label class="font-bold">Email</label>
          <maryoku-input v-model="name" inputStyle="email" placeholder="Type email address here..."></maryoku-input>
        </div>
      </div>
      <div class="information-section">
        <food-limitation-set></food-limitation-set>
      </div>
      <div class="information-section">
        <div class="mb-20">
          <img :src="`${$iconURL}RSVP/Path+1383.svg`" class="mr-10"/>
          <span class="font-bold font-size-20">Will anyone join you for the event?</span>
        </div>
        <div class="guestNumber">
          <md-button class="md-icon-button md-simple" @click="decreaseGuest">
            <img :src="`${$iconURL}RSVP/Path+3734.svg`" />
          </md-button>
          <input type="text" class="guestNumber-input" v-model="guestNumber" readonly>
          <md-button class="md-icon-button md-simple" @click="increaseGeust">
            <img :src="`${$iconURL}RSVP/Group+7913.svg`" />
          </md-button>
        </div>
      </div>
      <div class="information-section" v-for="(guest, index) in joinedGuests" :key="index">
        <div class="width-50">
          <label class="font-bold mb-10" style="display:inline-block">Name of Guest 0{{index + 1}}</label>
          <maryoku-input v-model="guest.name" class="mb-20"></maryoku-input>
        </div>
        <food-limitation-set :type="2"></food-limitation-set>
      </div>
    </template>
    <template slot="footer" v-if="step==1">
      <div class="text-center w-100">
        <md-button class="md-red md-bold" @click="setRsvp">RSVP Now</md-button>
      </div>
    </template>
  </modal>
  
</template>
<script>
import { Modal, MaryokuInput } from "@/components";
import FoodLimitationSet from "./FoodLimitationSet";
export default {
  components: {
    Modal,
    MaryokuInput,
    FoodLimitationSet
  },
  data() {
    return {
      textarea: "",
      selected: false,
      name: "",
      step: 1,
      foodLimitaion: true,
      suggestedProposals: [
        {
          content: "",
        },
      ],
      guestNumber: "Just Me",
      joinedGuests:[]
    };
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
    increaseGeust() {
      if (this.guestNumber === "Just Me")  {
        this.guestNumber = 0;
      }
      this.guestNumber = Number(this.guestNumber) + 1;
      this.joinedGuests.push({})
    },
    decreaseGuest() {
      if (this.guestNumber === 1 || isNaN(this.guestNumber))  {
        this.guestNumber = "Just Me";
      } else  {
        this.guestNumber = Number(this.guestNumber) - 1;
        this.joinedGuests.pop()
      }
    },
    setRsvp() {
      this.$emit("setRsvp")
    }
  },
};
</script>
<style lang="scss" scoped>
.rsvp-information-model {
  .user-info {
    padding: 50px 0;
    .input-wrapper {
      width: 50%;
      &:first-child {
        padding-right: 35px;
      }
    }
  }
  .information-section {
    border-top: solid 2px #dbdbdb;
    padding: 50px 0;
    text-align: left;
    .guestNumber {
      display: flex;
      align-items: center;
      margin-top: 10px;
      &-input {
        height: 80px;
        text-align: center;
        border-radius: 3px;
        border: solid 1px #707070;
        font-size: 20px;
        font-family: "Manrope-Regular";
        max-width: 180px;
      }
    }
  }
}
</style>