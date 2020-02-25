<template>
  <div class="pie-chart-wrapper">
    <svg id="pie_chart" width="100%" height="100%">
      <circle 
        class="pie-chart-value" 
        cx="50%" 
        cy="50%" 
        r="100"
        v-for="(item, index) in eventBuildingBlocks" :key="index"
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
        v-if="!(totalValue == 0 || dashArray.length == 1)"
        :style="`
          stroke-dasharray: 0 ${circleLength};
          stroke: ${fillColor};
        `"
      ></circle>
    </svg>
    <div class="items-cont">
      <ul class="items-list">
        <li v-for="(item, index) in eventBuildingBlocks" :key="index">
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
      event: {
        type: Object,
        default: () => {
          return {statistics: {}}
        }
      },
      items: [Array, Function],
        type  : {
          type : String,
            default : 'total'
        }
    },
    data() {
      return {
        dashArray: [],
        circleLength: 0,
        totalValue: 0,
        radius: 100,
        eventBuildingBlocks: [],
        fillColor: null,
        colors: [
          "#0FAC4C",
          "#FFC001",
          "#A4A6A5",
          "#00BFD2",
          "#24C796",
          "#FE537A",
          "#641956",
          "#F3423A",
          "#8CB9B4",
          "#43536A",
          "#D9FFE7",
          "#2CDE6B"
        ]
      }
    },
    methods: {
      drawChart() {
        if (!this.event.id) return;

        let vm = this
        this.isLoading = true
        let res = this.event.components
        this.circleLength = Math.PI * (this.radius * 2)
        let spaceLeft = this.circleLength

        this.$set(this, 'eventBuildingBlocks', res);
          setTimeout(()=> {
          this.isLoading = false;
        },500);

        this.eventBuildingBlocks.forEach(item => {
          if (item.allocatedBudget) {
            this.totalValue += item.allocatedBudget
          }
        })

        // Set dash on circle
        this.eventBuildingBlocks.forEach((item,index) => {
          if (item.allocatedBudget) {
            this.dashArray.push(spaceLeft+ " " + this.circleLength)
            // Subtract current value from spaceLeft
            spaceLeft -= (item.allocatedBudget / this.totalValue) * this.circleLength

            if (!this.fillColor) {
              this.fillColor = this.colors[index]
            }
          } else {
            this.dashArray.push(spaceLeft+ " " + this.circleLength)
          }
        })

        console.log(this.dashArray)
        this.$forceUpdate()
      }
    },
    computed: {
      
    },
    mounted() {
      this.drawChart()
    },
    filters: {

    },
    watch: {
      event(newVal, oldVal) {
        this.drawChart()
      },
      items(newVal, oldVal) {
        this.drawChart()
      },
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
