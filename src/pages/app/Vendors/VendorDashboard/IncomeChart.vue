<script>
    import { Bar, Line, mixins } from "vue-chartjs";
    export default {
        extends: Line,
        mixins: [mixins.reactiveProp],
        props: {
            chartData: {
                type: Object,
                default: () => {}
            },
            options: {
                type: Array,
                default: () => []
            }
        }
        props: ["chartData", "options"],
        data() {
            return {
            };
        },
        mounted () {
            this.renderChart(this.chartData, this.options);
        },
        methods: {
        }
    };
</script>
