<script>
import { Line, mixins } from "vue-chartjs";
export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
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
  mounted () {
    let data = this.chartData;
    for(let i = 0 ; i < data.datasets.length ; i++){
      if (data.datasets[i].gradient == true){
        this.gradient=this.$refs.canvas.getContext("2d").createLinearGradient(0,0,0,450);
        this.gradient.addColorStop(0,data.datasets[i].backgroundColor+"30");
        this.gradient.addColorStop(0.5,"#FFFFFFb0");
        data.datasets[i].backgroundColor = this.gradient;
      }
    }
    this.renderChart(data, this.options);
  },
  methods: {
  }
};
</script>
