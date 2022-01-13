<script>
    import { Bar, Line, mixins } from 'vue-chartjs'
    export default {
        extends: Line,
        mixins: [mixins.reactiveProp],
        props: ['chartData', 'options'],
        data() {
            return {
            }
        },
        mounted () {
            console.log('data', this.chartData, this.options);

            
            let data = this.chartData;
            for(let i = 0 ; i < data.datasets.length ; i++){
                if(data.datasets[i].gradient == true){
                    this.gradient=this.$refs.canvas.getContext("2d").createLinearGradient(0,0,0,450);
                    this.gradient.addColorStop(0,data.datasets[i].backgroundColor+"30")
                    this.gradient.addColorStop(0.5,"#FFFFFFb0")
                    // this.gradient.addColorStop(1,"#FFFFFF80")
                    data.datasets[i].backgroundColor = this.gradient
                }
            }
            this.renderChart(data, this.options)
        },
        methods: {
        }
    }
</script>
