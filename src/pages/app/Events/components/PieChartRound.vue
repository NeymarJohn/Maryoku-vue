<template>
  <div class="pie-chart-wrapper">
    <svg id="pie_chart" width="100%" height="100%">
      <circle 
        class="pie-chart-value" 
        cx="50%" 
        cy="50%" 
        r="100"
        v-for="(item, index) in items" :key="index"
        :style="`
          stroke-dasharray: ${dashArray[index]};
          stroke: ${colors[index]};
          display: ${item.allocatedBudget == null && totalValue !=0 ? 'none' : 'inherit'}
        `"
      ></circle>
      <circle 
        class="pie-chart-value" 
        cx="50%" 
        cy="50%" 
        r="100"
        :style="`
          stroke-dasharray: 0 ${circleLength};
          stroke: ${colors[0]};
          display: ${totalValue ==0 ? 'none' : 'inherit'}
        `"
      ></circle>
    </svg>
    <div class="items-cont">
      <ul class="items-list">
        <li v-for="(item, index) in items" :key="index">
          <span :style="`background-color: ${colors[index]};`"></span>
          {{item.title}}
        </li>
      </ul>
    </div>
  </div>  
</template>
<script>
  import TWEEN from '@tweenjs/tween.js'

  export default {
    props: {
      items: {
        default: [],
        type: Array
      }
    },
    data() {
      return {
        dashArray: [],
        totalValue: 0,
        radius: 100,
        colors: [
          "red",
          "green",
          "brown",
          "grey",
          "purple",
          "cadetblue",
          "blue",
          "gold",
          "aqua",
          "bisque",
          "plum",
          "lawngreen"
        ]
      }
    },
    methods: {
      drawChart() {
        let circleLength = Math.PI * (this.radius * 2),
            spaceLeft = circleLength

        this.items.forEach(item => {
          if (item.allocatedBudget) {
            this.totalValue += item.allocatedBudget
          }
        })
        console.log(this.totalValue, circleLength, spaceLeft)

        // Set dash on circle
        this.items.forEach(item => {
          if (item.allocatedBudget) {
            this.dashArray.push(spaceLeft+ " " + circleLength)
            // Subtract current value from spaceLeft
            spaceLeft -= (item.allocatedBudget / this.totalValue) * circleLength
          }
        })
        console.log(this.dashArray)
      }
    },
    computed: {
      
    },
    mounted() {
      console.log(this.items)
      this.drawChart()
    },
    filters: {

    },
    watch: {

    }
  }
</script>
<style lang="scss" scoped>
  .pie-chart-wrapper {
    padding-bottom: 1em;
  }

  #pie_chart {
    height: 300px;
  }
  .pie-chart-value {
    fill: none;
    stroke-width: 50;
    stroke-linecap: round;
  }

  .items-list {
    list-style: none;
    padding: 0px 3rem;
    li {
      width: calc(50% - 5px);
      display: inline-block;
      padding: 5px 15px;

      span {
        width: 10px;
        height: 10px;
        display: block;
        border-radius: 5px;
        display: inline-block;
      }
    }
  }
</style>
