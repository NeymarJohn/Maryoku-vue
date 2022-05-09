<template>
  <div class="countdown-time d-flex">
    <TimeItem :value="getCountDuration.days" label="DAYS" :color="color" />
    <TimeItem :value="getCountDuration.hours" label="HOURS" :color="color" />
    <TimeItem :value="getCountDuration.mins" label="MINUTES" :color="color" />
    <TimeItem :value="getCountDuration.seconds" label="SECONDS" :color="color" />
  </div>
</template>
<script>
import { duration }      from "moment";
import TimeItem          from "./Item";

const DEFAULT_COLOR = "#d9fcf2";

export default {
  components: {
    TimeItem,
  },
  props: {
    event: {
      type    : Object,
      default : () => ({}),
    },
  },
  data() {
    return {
      period     : 0,
      intervalId : null,
      color      : DEFAULT_COLOR,
    };
  },
  computed: {
    getCountDuration() {
      const timeDuration = duration(this.period, "milliseconds");
      return {
        days    : ("0" + Math.abs(timeDuration.days())).slice(-2),
        hours   : ("0" + Math.abs(timeDuration.hours())).slice(-2),
        mins    : ("0" + Math.abs(timeDuration.minutes())).slice(-2),
        seconds : ("0" + Math.abs(timeDuration.seconds())).slice(-2),
      };
    },
  },
  created() {
    this.period = this.event.eventStartMillis - new Date().getTime();
    if (this.event.concept && this.event.concept[0]) {
      this.color = this.event.concept.colors[0].color;
    }
    this.intervalId = setInterval(() => {
      if (this.event)
        this.period = this.event.eventStartMillis - new Date().getTime();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.intervalId);
  },
};
</script>
<style lang="scss" scoped>
.countdown-time {
  width: max-content;
}
</style>
