<template>
  <modal class="campaign-schedule-modal">
    <template slot="header">
      <div v-if="!showCalendar" class="add-category-model__header p-15">
        <div class="font-size-30 font-bold">
          <img :src="`${$iconURL}Campaign/clock-dark.svg`" style="width: 25px" class="mr-10"/>
          When should we send this campaign?
        </div>
        <div class="font-size-22 mt-20">
          EventDate {{$dateUtil.formatScheduleDay(event.eventStartMillis, "MM.DD.YY")}} 
          <span class="font-size-16 color-dark-gray">USA daylight time</span>
        </div>
      </div>
      <div v-if="showCalendar"  class="add-category-model__header p-15">
        <img :src="`${$iconURL}Campaign/arrow-left-dark.svg`" @click="showCalendar=false"/>
      </div>
      <md-button
        class="md-simple md-just-icon md-round modal-default-button"
        @click="close"
      >
        <md-icon>clear</md-icon>
      </md-button>
    </template>
    <template slot="body">
      <div v-if="!showCalendar">
        <div class="md-layout justify-content-center width-100 ">
          <div class="md-layout-item md-size-100 margin-bottom d-flex justify-content-between font-size-22 align-center mt-10">
            <div class="d-flex align-center">
              <md-checkbox class="md-checkbox-circle"></md-checkbox>
              <span class="font-size-22">Tomorrow morning</span>
            </div>
            <div> Jul 1, 8:00 AM <img :src="`${$iconURL}Campaign/Group 9087.svg`"  class="ml-20"/></div>
          </div>
          <div class="md-layout-item md-size-100 margin-bottom d-flex justify-content-between font-size-22 align-center mt-30">
            <div class="d-flex align-center">
              <md-checkbox class="md-checkbox-circle"></md-checkbox>
              <input v-model="weeks" class="text-center mr-20" style="width: 128px"/>Weeks after the previous campaign
            </div>
            <div> Jul 1, 8:00 AM <img :src="`${$iconURL}Campaign/Group 9087.svg`" class="ml-20"/></div>
          </div>
          <div class="md-layout-item md-size-100 margin-bottom d-flex justify-content-between font-size-22 align-center mt-30 mb-40">
            <div class="d-flex align-center">
              <md-checkbox class="md-checkbox-circle"></md-checkbox>
              <input v-model="weeks" class="text-center mr-20"  style="width: 128px"/>Days before the event
            </div>
            <div class="color-dark-gray"> m, d, h <img :src="`${$iconURL}Campaign/Group 9087.svg`" class="ml-20"/></div>
          </div>
        </div>
        <hr class="mr-15 ml-15"/>
        <div class="text-left p-15">
          <md-button class="md-simple md-dark edit-btn" @click="showCalendar = true">
            <img :src="`${$iconURL}Campaign/calendar-gray.svg`" style="width: 22px" class="mr-20 normal-btn">
            <span class="color-black">Pick Date & Time</span>
            <md-icon style="color: #050505 !important;">keyboard_arrow_right</md-icon>
          </md-button>
        </div>
      </div>
      <div v-else class="text-left">
        <div class="font-size-30 font-bold-extra p-15">Pick Date & Time</div>
        <div class="font-size-16 color-dark-gray p-15">USA daylight time</div>
        <div class="d-flex"> 
          <div class="flex-1">
            <functional-calendar :is-date-picker='true' :change-month-function='true' :change-year-function='true' dateFormat='yyyy-mm-dd' v-model="dateData"></functional-calendar>
          </div>
          <div class="flex-1" style="padding-left:80px; border-left: solid 1px #AEAEAE">
            <time-input v-model="startTime" :h24="false" displayFormat="hh:mm" class="mt-100"></time-input>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <div v-if="showCalendar" class="font-size-16 schedule-date ml-15">
        <img :src="`${$iconURL}Campaign/clock-dark.svg`" style="width: 25px"/>
        {{$dateUtil.formatScheduleDay(scheduledTime, "dddd, MMMM D, YYYY")}}
      </div>
      <div class="spacer flex-1"></div>
      <md-button class="md-default md-simple md-black" @click="close"><span class="color-black">Cancel</span></md-button>
      <md-button
        class="md-red add-category-btn mr-15"
        @click="updateBudget"
      >Save</md-button>
    </template>
  </modal>
</template>
<script>
import { Modal } from '@/components'
import { FunctionalCalendar } from 'vue-functional-calendar'
import TimeInput from "@/components/Inputs/TimeInput";

export default {
  components: {
    Modal,
    FunctionalCalendar,
    TimeInput
  },
  data() {
    return {
      newBudget: 0,
      showCalendar: false, 
      scheduledTime : new Date().getTime()
    }
  },
  created () {
    // this.newBudget = this.event.totalBudget;
    this.newBudget = `${this.event.totalBudget}`.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  methods: {
    close() {
      this.$emit('cancel')
    },
    updateBudget() {
      this.$emit('save', {totalBudget: Number(this.newBudget.replace(/,/g, ""))})
    }
  },
  watch: {
    newBudget: function(newValue) {
      const result = newValue.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.newBudget = result
    }
  },
  computed: {
    event() {
      return this.$store.state.event.eventData 
    }
  },
}
</script>
<style lang="scss" scoped>
.vfc-popover-container {
  .vfc-main-container {
    width: max-content;
    box-shadow: none;
  }
}
.schedule-date {
  padding: 12px 36px;
  background-color: #ededed;
  border-radius: 3px;
  float:left
}

</style>