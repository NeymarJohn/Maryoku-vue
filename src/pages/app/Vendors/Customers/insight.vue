<template>
    <div class="bg-purple">
        <div class="pl-40 pr-40 pt-40 pb-20">
            <div class="font-size-16 color-white">
                Total Incomes - Frog Design
            </div>
            <div class="d-flex">
                <div>
                    <h2 class="font-size-56 color-white my-10">$22,000</h2>
                    <p class="font-size-14 color-white">4/5 Successful proposals</p>
                </div>
            </div>
        </div>
        <hr/>
        <div class="px-30 position-relative">
            <div class="position-absolute" style="left: 0;top: 0">
<!--                <md-button class="md-button md-theme-default md-simple md-just-icon" @click="prev">-->
                    <img :src="`${$iconURL}Group 19406.svg`" class="cursor-pointer" width="80px" @click="prev">
<!--                </md-button>-->
            </div>
            <div class="position-absolute" style="right: 0;top: 0">
<!--                <md-button class="md-icon-button md-simple">-->
                    <img :src="`${$iconURL}Group 19405.svg`" class="cursor-pointer" width="80px" @click="next">
<!--                </md-button>-->
            </div>
            <carousel :items="1" :margin="0" :nav="false" :loop="true" class="d-flex">
                <template slot="prev">
                    <span class="prev d-none" ref="prevButton">
                        Prev
                    </span>

                </template>
                <div v-for="(p, index) in incomeList" :key="p.id" class="carousel-item">

                    <h5 class="color-white text-center">Income From Past And Future Events</h5>
                    <income-bar-chart :chartData="incomeChartData"></income-bar-chart>
                    <div class="d-flex justify-content-center my-40">
                        <div class="flex-1 font-size-14 color-white text-center">2021</div>
                        <div class="flex-1 font-size-14 color-white text-center">Past events</div>
                        <div class="flex-1 font-size-14 color-white text-center">Future events</div>
                    </div>
                    <hr/>
                </div>
                <template slot="next">
                    <span class="next d-none" ref="nextButton">
                        Next
                    </span>
                </template>
            </carousel>
        </div>
    </div>
</template>
<script>
import { PieChart } from "@/components";
import IncomeBarChart from "./IncomeBarChart.vue";
import carousel from "vue-owl-carousel";

export default {
  components:{
    PieChart,
    IncomeBarChart,
    carousel,
  },
  props:{
    total: {
      type: Number,
      required: true,
    },
    won: {
      type: Number,
      required: true,
    },
  },
  data(){
    return {
        incomeChartData: [
            { label: "Jan", value: 200, future: false },
            { label: "Feb", value: 120, future: false },
            { label: "Mar", value: 70, future: false },
            { label: "Apr", value: 90, future: true },
            { label: "May", value: 120, future: true },
            { label: "Jun", value: 200, future: true },
            { label: "Jul", value: 120, future: true },
            { label: "Aug", value: 30, future: true },
            { label: "Sep", value: 120, future: true },
            { label: "Oct", value: 50, future: true },
            { label: "Nov", value: 100, future: true },
            { label: "Dec", value: 70, future: true },
        ],
        incomeList: [
            '', '', '', '', ''
        ]
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init(){
    },
    next() {
      this.$refs.nextButton.click();
    },
    prev() {
      this.$refs.prevButton.click();
    },
  },
  watch:{
    total(newVal){},
    won(newVal){},
  }
}
</script>
<style type="scss">

</style>
