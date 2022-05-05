<template>
  <div>
    <span :class="{ 'color-red': isInvalid }">{{
      $dateUtil.formatScheduleDay(date, "MMM D, h:mm A")
    }}</span>
    <img :src="`${$iconURL}Campaign/Group 9087.svg`" class="ml-20">
    <div v-if="isInvalid" class="font-size-14 input-tooltip invalid-notification">
      Unless we're counting backwards, there are only {{ remainingDate }} days between now and the event...
    </div>
  </div>
</template>
<script>
export default {
  props: {
    date: {
      type    : [Date, String, Number],
      required: true,
    },
    isInvalid: {
      type    : Boolean,
      default : Boolean,
    },
    remainingDate: {
      type    : Number,
      default : Number,
    },
  },
};
</script>
<style lang="scss" scoped>
  .invalid-notification {
    margin-top: 10px;
    margin-left: 20px;
    position: absolute;
    background: #ffe5ec;
    padding: 5px;
    border-radius: 3px;
    width: 400px;
    right: 0;
    z-index: 1;
    &:before {
      content    : "";
      width      : 10px;
      height     : 10px;
      background : #ffe5ec;
      transform  : rotate(45deg);
      position   : absolute;
      right      : 24px;
      top        : -5px;
    }
  }
</style>
