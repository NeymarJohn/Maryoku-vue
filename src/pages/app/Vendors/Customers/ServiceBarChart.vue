<template>
    <svg
        :width="35"
        :height="100"
        :class="customClass"
    >
        <g
            v-for="(item, idx) in chartData"
            :key="idx"
            transform="translate(0, 0) scale(1, 1)"
        >
            <rect
                :x="10"
                :y="chartData.reduce((sum, it, index) => {
                      return index < idx ? sum + it.value - (idx > 0 ? 9 : 0) : sum
                      }, 0)"
                width="12"
                :rx="8"
                :ry="8"
                :height="item.value"
                :style="`
                    fill: ${item.color}
                  `"
            ></rect>
        </g>
    </svg>
</template>
<script>
export default {
  props: {
    chartData: {
      type: Array,
      default: []
    },
    customClass:{
      type: String,
      default: null
    }
  },
};
</script>
<style lang="scss" scoped>
    .bar{
    }
</style>
