<template>
  <svg class="chart" width="630" height="300" aria-labelledby="title desc" role="img">
    <title id="title">A bar chart showing information</title>
    <desc id="desc">4 apples; 8 bananas; 15 kiwis; 16 oranges; 23 lemons</desc>
    <g class="bar" v-for="(chartDataItem, index) in chartData" :key="`chartItem-${index}`">
      <rect
        :x="45 + 49 * index"
        width="15"
        height="250"
        rx="8"
        :style="`fill: ${chartDataItem.future ? '#9F6B90' : 'white'}`"
      ></rect>
      <text :x="45 + 49 * index" y="280" fill="white" :transform="`rotate(30 ${45 + 49 * index},280)`">
        {{ chartDataItem.label }}
      </text>
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
</style>