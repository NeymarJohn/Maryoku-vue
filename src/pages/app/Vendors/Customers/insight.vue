<template>
  <div class="bg-purple">
    <div class="pl-40 pr-40 pt-40 pb-20">
      <div class="font-size-16 color-white">Total Incomes - Frog Design</div>
      <div class="d-flex align-center">
        <div>
          <h2 class="font-size-56 color-white my-10">$0</h2>
          <p class="font-size-14 color-white">4/5 Successful proposals</p>
        </div>
        <ServiceBarChart class="ml-auto pt-10" :chart-data="serviceChartData"> </ServiceBarChart>
        <div class="ml-10">
          <div v-for="it in serviceChartData" class="d-flex align-center mt-5">
            <img :src="`${$iconURL}${it.icon}`" width="15px" />
            <span class="ml-5 font-size-12" :style="{ color: it.color }">{{ it.value }}%</span>
            <span class="ml-5 font-size-12 color-white">${{ it.price | withComma }}</span>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="px-30 position-relative">
      <div v-if="incomeList.length > 1" class="position-absolute" style="left: 0; top: 0">
        <img :src="`${$iconURL}Group 19406.svg`" class="cursor-pointer" width="80px" @click="prev" />
      </div>
      <div v-if="incomeList.length > 1" class="position-absolute" style="right: 0; top: 0">
        <img :src="`${$iconURL}Group 19405.svg`" class="cursor-pointer" width="80px" @click="next" />
      </div>
      <carousel :items="1" :margin="0" :nav="false" :loop="true" class="d-flex">
        <template slot="prev">
          <span class="prev d-none" ref="prevButton"> Prev </span>
        </template>
        <div v-for="(p, index) in incomeList" :key="p.id" class="carousel-item">
          <template v-if="incomeList.length > 1">
            <h5 class="color-white text-center">Income From Past And Future Events</h5>
            <income-bar-chart :chartData="incomeChartData"></income-bar-chart>
            <div class="d-flex justify-content-center my-40">
              <div class="flex-1 font-size-14 color-white text-center">2021</div>
              <div class="flex-1 font-size-14 color-white text-center">Past events</div>
              <div class="flex-1 font-size-14 color-white text-center">Future events</div>
            </div>
          </template>
          <template v-else>
            <h5 class="color-white text-center">How to increase Success And Profit</h5>
            <div class="d-flex align-center w-max-350 mx-auto">
              <img class="mr-20" :src="`${$iconURL}Group 19780.svg`" style="width: 24px" />
              <p class="color-white font-size-14">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
            </div>
            <div class="d-flex align-center w-max-350 mx-auto">
              <img class="mr-20" :src="`${$iconURL}Group 19780.svg`" style="width: 24px" />
              <p class="color-white font-size-14">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
            </div>
            <div class="d-flex align-center w-max-350 mx-auto">
              <img class="mr-20" :src="`${$iconURL}Group 19780.svg`" style="width: 24px" />
              <p class="color-white font-size-14">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
            </div>
            <div class="d-flex my-40">
              <md-button class="md-simple ml-auto md-outlined md-white maryoku-btn mx-auto"
                >Update Your Prices</md-button
              >
            </div>
          </template>
          <hr :class="incomeList.length < 2 ? 'mb-40' : ''" />
          <carousel :items="1" :margin="0" :nav="false" class="d-flex">
            <template slot="prev">
              <span class="prev d-none" ref="prevButton"> Prev </span>
            </template>
            <div v-for="(p, index) in incomeList" :key="p.id" class="carousel-item">
              <template v-if="incomeList.length > 1">
                <h5 class="color-white text-center">Income From Past And Future Events</h5>
                <income-bar-chart :chartData="incomeChartData"></income-bar-chart>
                <div class="d-flex justify-content-center my-40">
                  <div class="flex-1 font-size-14 color-white text-center">2021</div>
                  <div class="flex-1 font-size-14 color-white text-center">Past events</div>
                  <div class="flex-1 font-size-14 color-white text-center">Future events</div>
                </div>
              </template>
              <template v-else>
                <h5 class="color-white text-center">Increasing Your Success Rate</h5>
                <div class="d-flex align-center w-max-350 mx-auto">
                  <img class="mr-20" :src="`${$iconURL}VendorsProposalPage/group-5280.svg`" style="width: 24px" />
                  <p class="color-white font-size-14">
                    You have won [x] out of [y] opportunities with his customer(X% win rate)
                  </p>
                </div>
                <div class="d-flex align-center w-max-350 mx-auto">
                  <img class="mr-20" :src="`${$iconURL}VendorsProposalPage/group-5280.svg`" style="width: 24px" />
                  <p class="color-white font-size-14">
                    When customer has transaction with the vendor: You most recent transaction with his customer was on
                    dd/mm/yyyy OR if customer don't have any transaction "This will be your first transaction with his
                    customer"
                  </p>
                </div>
                <div class="d-flex align-center w-max-350 mx-auto">
                  <img class="mr-20" :src="`${$iconURL}VendorsProposalPage/group-5280.svg`" style="width: 24px" />
                  <p class="color-white font-size-14">
                    Overall average deal size for this customer is $##,### (X% lower/higher than your average)
                  </p>
                </div>
                <div class="d-flex my-40">
                  <md-button class="md-simple ml-auto md-outlined md-white maryoku-btn mx-auto"
                    >Update Your Prices</md-button
                  >
                </div>
              </template>
              <hr :class="incomeList.length < 2 ? 'mb-40' : ''" />
            </div>
            <template slot="next">
              <span class="next d-none" ref="nextButton"> Next </span>
            </template>
          </carousel>
        </div>
        <template slot="next">
          <span class="next d-none" ref="nextButton"> Next </span>
        </template>
      </carousel>
    </div>
  </div>
</template>
<script>
import { PieChart } from "@/components";
import IncomeBarChart from "./IncomeBarChart.vue";
import ServiceBarChart from "./ServiceBarChart";
import carousel from "vue-owl-carousel";

export default {
  components: {
    PieChart,
    IncomeBarChart,
    ServiceBarChart,
    carousel,
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
    won: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      serviceChartData: [
        { label: "", value: 60, color: "#ffffff", icon: "Budget+Elements/venuerental-white.svg", price: "15000" },
        { label: "", value: 25, color: "#22cfe0", icon: "Budget+Elements/foodandbeverage-white.svg", price: "4800" },
        { label: "", value: 15, color: "#fec02d", icon: "Budget+Elements/entertainment-white.svg", price: "2200" },
      ],
      incomeChartData: [
        { label: "Jan", value: 0, future: false },
        { label: "Feb", value: 0, future: false },
        { label: "Mar", value: 0, future: false },
        { label: "Apr", value: 0, future: true },
        { label: "May", value: 0, future: true },
        { label: "Jun", value: 0, future: true },
        { label: "Jul", value: 0, future: true },
        { label: "Aug", value: 0, future: true },
        { label: "Sep", value: 0, future: true },
        { label: "Oct", value: 0, future: true },
        { label: "Nov", value: 0, future: true },
        { label: "Dec", value: 0, future: true },
      ],
      incomeList: [""],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    next() {
      this.$refs.nextButton.click();
    },
    prev() {
      this.$refs.prevButton.click();
    },
  },
  watch: {
    total(newVal) {},
    won(newVal) {},
  },
};
</script>
<style type="scss">
.carousel-item {
}
</style>
