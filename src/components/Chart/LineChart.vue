<template>
  <div>
    <canvas ref="line_chart" width="1000" />
  </div>
</template>


<script>
import Chart from "chart.js";

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    }
  },
  mounted() {
    new Chart(
      this.$refs.line_chart,
      {
        type: "line",
        data: this.chartData,
        options: this.options,
      }
    );
  },
};
</script>
<style lang="scss">

</style>
