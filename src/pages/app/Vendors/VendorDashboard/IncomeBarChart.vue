<template>
  <svg class="chart" width="630" height="300" aria-labelledby="title desc" role="img">
    <title id="title">A bar chart showing information</title>
    <desc id="desc">4 apples; 8 bananas; 15 kiwis; 16 oranges; 23 lemons</desc>
    <g v-for="(chartDataItem, index) in chartData" transform="translate(0,300) scale(1, -1)">
      <rect
        :x="45 + 49 * index"
        y="40"
        width="15"
        :height="(chartDataItem.value / max) * 250"
        rx="8"
        :style="`fill: ${chartDataItem.future ? '#9F6B90' : 'white'}`"
      >
        <!-- <title>{{ chartDataItem.value | withComma }}</title> -->

        <!-- <text
          id="tooltip"
          x="40"
          y="30"
          style="fill: #050505; font-family: 'Manrope-Regular'; font-size: 16px; font-weight: 800"
        >
          <tspan x="25" dy="1.3em" style="font-size: 16px; font-weight: 300">
            ${{ chartDataItem.value | withComma }}
          </tspan>
        </text> -->
      </rect>
    </g>
    <g v-for="(chartDataItem, index) in chartData" :key="`chartItem-${index}`">
      <text :x="45 + 49 * index" y="280" fill="#a3809d" :transform="`rotate(30 ${45 + 49 * index},280)`">
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
  computed: {
    max() {
      return this.chartData.reduce((s, item) => {
        if (item.value > s) {
          s = item.value;
        }
        return s;
      }, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.bar {
}
</style>
