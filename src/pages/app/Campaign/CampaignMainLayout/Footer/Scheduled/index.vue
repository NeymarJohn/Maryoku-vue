<template>
  <div class="ml-40 d-flex flex-centered align-center">
    <img :src="`${$iconURL}Campaign/Group 9222.svg`">
    <span class="ml-10">Scheduled To {{ ' ' + $dateUtil.formatScheduleDay(+time, format) }} </span>
  </div>
</template>
<script>
export default {
  props: {
    format: {
      type    : String,
      default : () => "MMM DD, YYYY ",
    },
    time: {
      type    : Number,
      default : () => 0,
    }
  }
};
</script>
