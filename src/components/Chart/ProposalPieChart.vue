<template>
  <div className="pie-chart-wrapper">
    <svg version="1.1"
         baseProfile="full"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         width="150" height="100">
      <g transform="rotate(0 150 150)">
        <circle id="fon" cx="70" cy="70" :r="radius" stroke="#9a9898" stroke-width="26" style="stroke-linecap: round"
                :stroke-dasharray="`${halfCircleLength}`" :stroke-dashoffset="`${halfCircleLength}`" fill="none" />
        <circle id="fon" cx="70" cy="70" :r="radius" :stroke="setStrokeColor"  stroke-width="26" style="stroke-linecap: round"
                :stroke-dasharray="strokeDash" :stroke-dashoffset="`${halfCircleLength}`" fill="none" />
      </g>
    </svg>
  </div>
</template>
<script>

export default {
  props: {
    completed: {
      type: Number,
      default: 25
    },
    radius: {
      type: Number,
      default: 50
    },
  },
  data() {
    return {};
  },
  computed: {
    circleLength() {
      return Math.round(2 * Math.PI * this.radius);
    },
    halfCircleLength() {
      return Math.round(this.circleLength / 2)
    },
    strokeDash() {
      const strokeWidth = Math.round(this.halfCircleLength * this.completed / 100);
      const spaceWidth = this.circleLength - strokeWidth;
      return `${strokeWidth} ${spaceWidth}`;
    },
    setStrokeColor() {
      if(this.completed>70){ return "#2cde6b"}
      else if(this.completed>50){ return  "rgb(255,192,0)"}
      else {return "rgb(255,0,102)"};
    },
  },

};
</script>
<style lang="scss" scoped>
.pie-chart-wrapper {
  padding-bottom: 1em;
}
</style>
