<template>
    <div style="width: 800px;height: 500px">
        <income-chart :chartData="data" :options="options" :width="800" :height="500"></income-chart>
    </div>
</template>
<script>
// import {CommentInput} from "@/components";
import IncomeChart from "../pages/app/Vendors/VendorDashboard/IncomeChart";
export default {
  components:{
      IncomeChart
  },
  props:{

  },
  data(){
      return {
          data: {
            labels: ['Jan', '', '', '', '', 'Jun', '', '', '', '', '', 'Dec' ],
            datasets: [
                {
                    label: '',
                    data : [0, 10, 30, 60, 45, 30, 40, 40, 30, 15, 30, 20],
                    fill: true,
                    borderColor: '#2cde6b',
                    backgroundColor: '#2cde6b',
                    // tension: 0.4,
                },
                {
                    label: '',
                    data : [0, 15, 40, 80, 60, 40, 50, 45, 40, 25, 35, 30],
                    fill: true,
                    borderColor: '#641856',
                    backgroundColor: '#641856',
                    // tension: 0.4,
                },
            ]
          },
          options: {
              type: 'line',
              options: {
                  responsive: true,
                  plugins: {
                      title: {
                          display: true,
                          text: ''
                      },
                  },
                  interaction: {
                      intersect: false,
                  },
                  scales: {
                      x: {
                          display: true,
                          title: {
                              display: true
                          }
                      },
                      y: {
                          display: true,
                          title: {
                              display: true,
                              text: 'Value'
                          },
                          suggestedMin: -10,
                          suggestedMax: 200
                      }
                  }
              },
          }
      }
  },
  mounted() {

    $("#editable").keypress(this.keypress)
  },
  methods:{
    keypress(e){
      // console.log('keypress', e);
    },
  }
}

</script>
<style lang="scss" scoped>
#editable{
    -moz-appearance: textfield-multiline;
    -webkit-appearance: textarea;
    border: solid 1px #989898;
    padding: 10px;
    font: medium -moz-fixed;
    font-family: "Manrope-regular",sans-serif;
    font-size: 15px;
    height: 100px;
    overflow: auto;
    border-radius: 3px;
    resize: both;
    width: 400px;
    background-color: white;
    color: #050505;
}
.address{
    margin: 0 5px;
    background-color: yellow;
}
</style>
