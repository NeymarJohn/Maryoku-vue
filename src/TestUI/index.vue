<template>
    <div style="width: 800px;height: 500px">
        <LineChart :dataChart="data" id="number_of_participants_chart" :optionChart="options"
                   type="line" :width="'800px'" :height="'500px'"></LineChart>
    </div>
</template>
<script>
// import {CommentInput} from "@/components";
import LineChart from "@/components/Chart/LineChart.vue";
export default {
  components:{
      LineChart,
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
              legend: {
                  display: false,
              },
              elements: {
                  line: {
                      borderColor: "white",
                      radius: 0,
                  },
              },
              layout: {
                  padding: {
                      left: 20,
                      right: 10,
                      top: 25,
                      bottom: 10,
                  },
              },
              scales: {
                  y: {
                      suggestedMin: 50,
                      suggestedMax: 100,
                  },
                  yAxes: [
                      {
                          ticks: {
                              beginAtZero: false,
                              fontColor: "black",
                              padding: 5,
                              fontSize: 10,
                          },
                          gridLines: {
                              color: '#707070',
                              zeroLineColor: "white",
                          },
                          callback: value => console.log('value', value)
                      },
                  ],
                  xAxes: [
                      {
                          barThickness: 10,
                          ticks: {
                              beginAtZero: false,
                              fontColor: "black",
                              padding: 5,
                              fontSize: 12,
                          },
                          gridLines: {
                              color: '#707070',
                              zeroLineColor: "white",
                          },
                      },
                  ],
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
