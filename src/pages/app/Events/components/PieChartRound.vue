<template>
  <div class="pie-chart-wrapper">
    <svg id="pie_chart" ref="pie_chart" width="100%" height="100%" v-if="sortedData">
      <g
        v-for="(item, index) in sortedData"
        :key="index"
        :ref="`tooltip_${index}`"
        @mousemove="setTooltipPos"
      >
        <circle
          class="pie-chart-value"
          cx="50%"
          cy="50%"
          r="100"
          :style="`
            stroke-dasharray: ${dashArray[index]};
            stroke: ${item.color};
            display: ${item.budget===0 && totalValue != 0 ? 'none' : 'inherit'}
          `"
        />
        <g
          :transform="`translate(${x},${y})`"
          class="tooltip"
          visibility="hidden"
          ref="tooltip"
          :id="`gt_${index}`"
        >
          <path id="svgMask" d="M3,72 L162,74 162,43 171,38 162,33 162,3 3,3 z" fill="#e6e5e5" />
          <text
            id="tooltip"
            x="20"
            y="25"
            style="fill: #050505; font-family: 'Manrope'; font-size: 16px; font-weight: 800;"
          >
            {{sortedData[index].category}}
            <tspan x="20" dy="1.2em" style="font-size: 13px;font-weight: 300;">Planned budget</tspan>
            <tspan
              x="20"
              dy="1.3em"
              style="font-size: 13px;font-weight: 300;"
            >${{sortedData[index].budget}}</tspan>
          </text>
        </g>
        <use id="use" :xlink:href="`gt_${index}`" />
      </g>
      <g v-if="!(totalValue===0 || dashArray.length===1)" @mousemove="setTooltipPos">
        <circle
          class="pie-chart-value"
          cx="50%"
          cy="50%"
          r="100"
          :style="`
            stroke-dasharray: 0 ${circleLength};
            stroke: ${fillColor};
          `"
        >
          <!-- <title>
            {{endTooltip.category + '\r\n Planned budget \r\n $' + endTooltip.budget}}
          </title>-->
        </circle>
        <g :transform="`translate(${x},${y})`" class="tooltip" visibility="hidden" ref="tooltip">
          <path id="svgMask" d="M3,72 L162,74 162,43 171,38 162,33 162,3 3,3 z" fill="#e6e5e5" />
          <text
            id="tooltip"
            x="20"
            y="25"
            style="fill: #050505; font-family: 'Manrope'; font-size: 16px; font-weight: 800;"
          >
            {{endTooltip.category}}
            <tspan x="20" dy="1.2em" style="font-size: 13px;font-weight: 300;">Planned budget</tspan>
            <tspan
              x="20"
              dy="1.3em"
              style="font-size: 13px;font-weight: 300;"
            >${{endTooltip.budget}}</tspan>
          </text>
        </g>
      </g>
    </svg>
    <div class="items-cont">
      <ul class="items-list">
        <li v-for="(item, index) in sortedData" :key="index">
          <div class="d-flex">
            <span :style="`background-color: ${item.color};`" class="icon"></span>
            <span class="text">{{item.category}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

import _ from 'underscore'
import { mapGetters } from 'vuex'

export default {
  props: {
    event: {
      type: Object,
      default: () => {
        return { statistics: {} }
      }
    },
    items: [Array, Function],
    type: {
      type: String,
      default: 'total'
    }
  },
  data () {
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
      x: 0,
      y: 0,
      colors: [
        '#0FAC4C',
        '#FFC001',
        '#641956',
        '#F3423A',
        '#8CB9B4',
        '#43536A',
        '#A4A6A5',
        '#00BFD2',
        '#24C796',
        '#FE537A',
        '#D9FFE7',
        '#2CDE6B'
      ],
      defaultColor: '#641956'
    }
  },
  methods: {
    setTooltipPos: function (event) {
      let CTM = this.$refs.pie_chart.getScreenCTM()

      let mouseX = (event.clientX - CTM.e) / CTM.a

      let mouseY = (event.clientY - CTM.f) / CTM.d
      this.x = mouseX - 173 / CTM.a
      this.y = mouseY - 40 / CTM.d
    },
    drawChart () {
      if (!this.event.id) return

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

      this.$set(this, 'eventBuildingBlocks', res)
      setTimeout(() => {
        this.isLoading = false
      }, 500)

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
          // filter by category title and gather budget values, then get the sum of them
          budget: this.eventBuildingBlocks
            .filter(ebb => ebb.title === category)
            .map(eb => (eb.allocatedBudget === null ? 0 : eb.allocatedBudget))
            .reduce(function (total, val) {
              return parseFloat(total) + parseFloat(val)
            }, 0),
          color: this.getElementColor(category)
        })
      })

      // Set dash on circle
      this.sortedData.forEach((item, index) => {
        if (item.budget) {
          this.dashArray.push(spaceLeft + ' ' + this.circleLength)
          // Subtract current value from spaceLeft
          spaceLeft -= (item.budget / this.totalValue) * this.circleLength

          if (item === this.sortedData.filter(sd => sd.budget !== 0)[0]) {
            this.fillColor = this.sortedData[index].color
            this.endTooltip = this.sortedData[index]
          }
        } else {
          this.dashArray.push(spaceLeft + ' ' + this.circleLength)
        }
      })
      this.$forceUpdate()
    },
    getElementColor (category) {
      let element = _.findWhere(this.components, { title: category })
      if (element === undefined) {
        return this.defaultColor
      }
      return element.color
    }
  },
  computed: {
    ...mapGetters({
      components: 'event/getComponentsList'
    })
  },
  mounted () {
    this.drawChart()
    this.$root.$on('event-building-block-budget-changed', eventComponents => {
      this.drawChart()
    })
  },
  filters: {},
  watch: {
    event (newVal, oldVal) {
      this.drawChart()
    },
    items (newVal, oldVal) {
      this.drawChart()
    }
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

  &:hover {
    & + g {
      visibility: visible;
    }
  }
}

.items-list {
  list-style: none;
  padding: 0px 1rem;
  li {
    width: calc(50% - 5px);
    display: inline-block;
    padding: 5px 15px;

    .icon {
      min-width: 14px;
      width: 14px;
      height: 14px;
      display: block;
      border-radius: 50%;
      display: inline-block;
      margin: 4px 5px;
    }
    .text {
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>
