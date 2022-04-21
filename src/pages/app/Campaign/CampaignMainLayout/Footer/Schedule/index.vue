<template>
  <span>
    <img
      class="mr-20 label-icon-25 ml-30"
      :src="`${$iconURL}Campaign/clock-gray.svg`"
    >
    {{ title }}:
    {{ $dateUtil.formatScheduleDay(+time, format) }}
  </span>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "Scheduled Send"
    },
    time: {
      type: Number,
      default: () => 0,
    },
    format: {
      type: String,
      default: () => "DD.MM.YY  |  hh:mm A",
    }
  }
};
</script>
