<template>
<canvas  :style="classStyle" :id="id" :width="width" :height="height"></canvas>
</template>
<script>
export default {
  name: 'LineChart',
  mounted () {
    const chart = document.getElementById(this.id)
    new Chart(chart, {
      type: this.type,
      data: this.getData,
      options: this.optionChart
    })
  },
  computed: {
    getData () {
      return this.dataChart
    }
  },
  props: {
    dataChart: Object,
    type: String,
    optionChart: Object,
    id: String,
    width: String,
    height: String,
    classStyle: String

  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated', this.data)
  }

}
</script>
<style lang="scss">

</style>
