<template>
  <div :style="{ width: '100%', height: '100%', zIndex: 9999 }">
    <svg id="bar_chart" ref="bar_chart" class="chart" width="1000" height="341" aria-labelledby="title desc" role="img">
      <title id="title">A bar chart showing information</title>
      <desc id="desc">4 apples; 8 bananas; 15 kiwis; 16 oranges; 23 lemons</desc>
      <g
        v-for="(chartDataItem, index) in chartData"
        :key="index"
        transform="translate(0,300) scale(1, -1)"
        @mousemove="setTooltipPos($event, chartDataItem)"
        @mouseleave="hideToolTip"
      >
        <rect
          :x="55 + 80 * index"
          y="40"
          width="2"
          :height="260"
          rx="8"
          :style="`fill: rgb(129, 128, 128, 0.12)`"
        />
        <rect
          :x="45 + 80 * index"
          y="40"
          width="20"
          :height="(chartDataItem.proposal / max) * 210"
          rx="8"
          style="fill: #641956"
        >
          <title>{{ chartDataItem.proposal | withComma }}</title>
        </rect>
      </g>
      <g v-for="(chartDataItem, index) in chartData" :key="`chartItem-${index}`">
        <image v-if="index === 0" href="/static/icons/vendor/proposalBoard/proposal-before.svg" :x="25 + 80 * index" y="265" />
        <text :x="45 + 80 * index" y="280" fill="#000000"
              :class="{
                'first_item': index === 0,
                'last_item' : index === chartData.length - 1
              }
              "
        >
          {{ chartDataItem.date }}
        </text>
        <image v-if="index === chartData.length-1" href="/static/icons/vendor/proposalBoard/proposal-after.svg" :x="90 + 80 * index" y="265" />
      </g>
      <g ref="tooltip" :transform="`translate(${x},${y})`" class="tooltip" :visibility="`${toolTipStatus}`">
        <path
          v-if="toolTipPosition == 'left'"
          id="svgMask"
          d="M3,72 L182,72 182,53 190,47 182,42 182,23 3,23 z"
          fill="#e6e5e5"
        />
        <path
          v-if="toolTipPosition == 'right'"
          id="svgMask"
          d="M12,72 L190,72 190,23 12,23 12,52 3,47 12,42 z"
          fill="#e6e5e5"
        />
        <text
          id="tooltip"
          x="40"
          y="30"
          style="fill: #050505; font-family: 'Manrope-Regular'; font-size: 16px; font-weight: 800"
        >
          <tspan x="25" dy="1.3em" style="font-size: 16px; font-weight: 300">{{ toolTip.proposal }}</tspan>
        </text>
      </g>
    </svg>

    <line-chart
      class="wrapper-line-chart"
      :chart-data="lineChartData"
      :options="lineChartOptions"
    />
    <div v-for="(item,index) in lineChartData.datasets" :key="index" class="proposal-chart-legend">
      <span class="proposal-chart-legend-line" :style="`border-color:${item.backgroundColor}`" />{{ item.label }}
    </div>
    <div class="proposal-chart-divider" />
    <Status />
  </div>
</template>

<script>
// components
import LineChart from "@/components/Chart/LineChart";
import Status    from "./Status/index.vue";

// helpers
import arrayMaximum from "@/helpers/array/maximum";

const defaultColor = ["rgb(255,219,99)", "rgb(99,219,255)"];
const defaultDataSetConfig = {
  borderDash       : [7, 2],
  borderDashOffset : 0,
  lineTension      : 0,
  fill             : false,
};

export default {
  name: "ProposalChart",
  components: {
    LineChart,
    Status,
  },
  props: {
    chartData: {
      type    : Array,
      default : Array,
    },
  },
  data() {
    return {
      lineChartOptions: {
        maintainAspectRatio : false,
        showLine            : false,
        showGaps            : false,
        layout: {
          left   : 0,
          right  : 0,
          top    : 0,
          bottom : 0
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            display: false,
            gridLines: {
              display: false,
            }
          }],
          yAxes: [{
            display: false,
            gridLines: {
              display: false
            },
          }]
        }
      },
      endTooltip      : null,
      toolTipStatus   : "hidden",
      toolTipPosition : "left",
      toolTip         : {},
      maxValue        : 0,
      x               : 0,
      y               : 0,
    };
  },

  computed: {
    lineChartData () {
      return ({
        labels   : this.chartData.map(({ system }) => system),
        datasets : [
          {
            ...defaultDataSetConfig,
            label            : "Industry Benchmark",
            backgroundColor  : defaultColor[0],
            borderColor      : defaultColor[0],
            data: this.chartData.map(({ proposal }, index) => ({
              x: index + 1,
              y: proposal
            })),
          },
          {
            ...defaultDataSetConfig,
            label            : "Average Of My Proposal",
            backgroundColor  : defaultColor[1],
            borderColor      : defaultColor[1],
            // data: [
            //   {
            //     x: 0,
            //     y: 60,
            //   },
            //   {
            //     x: 91,
            //     y: 60,
            //   },
            // ],
          }
        ]
      });
    },
    max() {
      return arrayMaximum.of(this.chartData);
    },
  },
  methods: {
    setTooltipPos (event, item) {
      let CTM = this.$refs.bar_chart.getScreenCTM();
      let mouseX = (event.clientX - CTM.e) / CTM.a;
      let mouseY = (event.clientY - CTM.f) / CTM.d;

      this.x = mouseX - 193 / CTM.a;
      this.y = mouseY - 40 / CTM.d;
      if (this.x < 0) {
        this.x = mouseX + 3 / CTM.a;
        this.toolTipPosition = "right";
      } else {
        this.toolTipPosition = "left";
      }
      this.toolTipStatus = "visible";
      this.toolTip = item;
    },

    hideToolTip() {
      this.toolTipStatus = "hidden";
    },
  },
};
</script>


<style lang="scss" scoped>
.wrapper-line-chart {
  position : absolute;
  bottom   : 299px;
  width    : 885px;
  height   : 205px;
  z-index  : -1;
  left     : 135px;
}

#bar_chart {
  width: 100%;
  height: auto;
}
</style>
