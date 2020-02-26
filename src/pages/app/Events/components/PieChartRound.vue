<template>
  <div class="pie-chart-wrapper">
    <svg id="pie_chart" width="100%" height="100%">
      <circle 
        class="pie-chart-value" 
        cx="50%" 
        cy="50%" 
        r="100"
        v-for="(item, index) in sortedData" :key="index"
        :style="`
          stroke-dasharray: ${dashArray[index]};
          stroke: ${colors[index%12]};
          display: ${item.budget == 0 && totalValue != 0 ? 'none' : 'inherit'}
        `"
      >
        <title>
          {{sortedData[index].category + '\r\n Planned budget \r\n $' + sortedData[index].budget}}
        </title>
      </circle>
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
      >
        <title>
          {{endTooltip.category + '\r\n Planned budget \r\n $' + endTooltip.budget}}
        </title>
      </circle>
      
    </svg>
    <div class="items-cont">
      <ul class="items-list">
        <li v-for="(item, index) in sortedData" :key="index">
          <span :style="`background-color: ${colors[index%12]};`"></span>
          {{item.category}}
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
        sortedData: [],
        categories: [],
        fillColor: null,
        endTooltip: null,
        colors: [
          "#0FAC4C",
          "#FFC001",
          "#641956",
          "#F3423A",
          "#8CB9B4",
          "#43536A",
          "#A4A6A5",
          "#00BFD2",
          "#24C796",
          "#FE537A",
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

        // initialize
        this.sortedData = []
        this.dashArray = []
        this.categories = []
        this.eventBuildingBlocks = []
        this.totalValue = 0

        this.$set(this, 'eventBuildingBlocks', res);
          setTimeout(()=> {
          this.isLoading = false;
        },500);

        this.eventBuildingBlocks.forEach(item => {
          this.categories.push(item.title)
          if (item.allocatedBudget) {
            this.totalValue += parseFloat(item.allocatedBudget)
          }
        })

        // remove duplicated categories
        this.categories = [...new Set(this.categories)]
        // sort data with updated categories
        this.categories.forEach((category, cIndex) => {
          this.sortedData.push({
            category: category,
            budget: // filter by category title and gather budget values, then get the sum of them
              this.eventBuildingBlocks.filter( 
                ebb => ebb.title == category 
              ).map( 
                eb => eb.allocatedBudget == null ? 0 : eb.allocatedBudget 
              ).reduce( function(total, val) {
                return parseFloat(total) + parseFloat(val)
              }, 0)
          })
        })

        console.log(this.sortedData, this.totalValue)

        // Set dash on circle
        this.sortedData.forEach((item,index) => {
          if (item.budget) {
            this.dashArray.push(spaceLeft+ " " + this.circleLength)
            // Subtract current value from spaceLeft
            spaceLeft -= (item.budget / this.totalValue) * this.circleLength

            if (item == this.sortedData.filter(sd => sd.budget != 0)[0]) {
              this.fillColor = this.colors[index]
              this.endTooltip = this.sortedData[index]
            }
          } else {
            this.dashArray.push(spaceLeft+ " " + this.circleLength)
          }
        })

        this.$forceUpdate()
      }
    },
    computed: {
      
    },
    mounted() {
      this.drawChart()
      this.$root.$on('event-building-block-budget-changed', (eventComponents)=>{
        this.drawChart()
      })
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
    opacity: 1;
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
