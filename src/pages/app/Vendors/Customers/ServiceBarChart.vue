<template>
  <svg class="chart" width="430" height="300" aria-labelledby="title desc" role="img">
    <g transform="translate(0,300) scale(1, -1)">
      <rect
        :x="30"
        y="40"
        width="13"
        :height="200"
        rx="8"
        :style="`fill: white`"
      ></rect>
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    chartData: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
  },
};
</script>
<style lang="scss" scoped>
    .bar{
    }
</style>
