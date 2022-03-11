<template>
  <md-card
    :data-count="hoverCount"
    class="md-card-chart"
    style="box-shadow: none;" @mouseleave.native="onMouseLeave"
  >
    <md-card-header
      :data-header-animation="headerAnimation"
      :class="[
        {hovered: imgHovered},
        {hinge: headerDown},
        {fadeInDown: fixedHeader},
        {animated: true},
        {[getClass(backgroundColor)]: true},
        {'md-card-header-text': HeaderText},
        {'md-card-header-icon': HeaderIcon}]"
      @mouseenter.native="onMouseOver"
    >
      <div v-if="chartInsideHeader" :id="chartId" class="ct-chart" />
      <slot name="chartInsideHeader" />
    </md-card-header>

    <md-card-content>
      <vue-element-loading :active="showLoader" spinner="ring" color="#FF547C" />
      <div v-if="chartInsideContent" :id="chartId" class="ct-chart" />
      <div v-if="headerAnimation === 'true'" class="md-card-action-buttons text-center">
        <md-button v-if="headerDown" class="md-danger md-simple fix-broken-card" @click="fixHeader">
          <slot name="fixed-button" /> Fix Header!
        </md-button>
        <slot name="first-button" />
        <slot name="second-button" />
        <slot name="third-button" />
      </div>
      <slot name="content" />
    </md-card-content>

    <md-card-actions v-if="!noFooter" md-alignment="left">
      <slot name="footer" />
    </md-card-actions>
  </md-card>
</template>
<script>
import VueElementLoading from "vue-element-loading";
export default {
  name: "ChartCard",
  components: {
    VueElementLoading
  },
  props: {
    showLoader: Boolean,
    headerText: Boolean,
    headerIcon: Boolean,
    noFooter: Boolean,
    chartInsideContent: Boolean,
    chartInsideHeader: Boolean,
    chartType: {
      type: String,
      default: "Line" // Line | Pie | Bar
    },
    headerAnimation: {
      type: String,
      default: "true"
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    chartResponsiveOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chartAnimation: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          series: []
        };
      }
    },
    backgroundColor: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      hoverCount: 0,
      imgHovered: false,
      fixedHeader: false,
      chartId: "no-id"
    };
  },
  computed: {
    headerDown () {
      return this.hoverCount > 15;
    }
  },
  watch: {
    chartData () {
      this.updateChartId();
      this.$nextTick(this.initChart);
    }
  },
  mounted () {
    this.updateChartId();
    this.$nextTick(this.initChart);
  },
  methods: {
    headerBack: function () {
      this.fixedHeader = false;
    },
    fixHeader: function () {
      this.hoverCount = 0;
      this.fixedHeader = true;

      setTimeout(this.headerBack, 480);
    },
    onMouseOver: function () {
      if (this.headerAnimation === "true") {
        this.imgHovered = true;
        this.hoverCount++;
      }
    },
    onMouseLeave: function () {
      if (this.headerAnimation === "true") {
        this.imgHovered = false;
      }
    },

    getClass: function (backgroundColor) {
      return "md-card-header-" + backgroundColor + "";
    },
    /***
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
    initChart () {
      var chartIdQuery = `#${this.chartId}`;
      this.$Chartist[this.chartType](
        chartIdQuery,
        this.chartData,
        this.chartOptions,
        this.chartResponsiveOptions
      );
    },
    /***
     * Assigns a random id to the chart
     */
    updateChartId () {
      var currentTime = new Date().getTime().toString();
      var randomInt = this.getRandomInt(0, currentTime);
      this.chartId = `div_${randomInt}`;
    },
    getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
</script>
