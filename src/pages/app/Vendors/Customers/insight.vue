<template>
  <div class="bg-purple w-max-600 mx-auto">
    <div class="pl-40 pr-40 pt-40 pb-20">
      <div class="font-size-20 font-bold-extra color-white text-transform-capitalize">Total Incomes{{customer ? ` - ${customer.companyName}` : ''}}</div>
      <div class="d-flex align-center mt-20">
        <div>
          <h2 class="font-size-50 color-white m-0">${{totalPrice | withComma(Number)}}</h2>
          <div v-if="customer" class="font-size-16 color-white py-20">{{`${wonProposals.length}/${customer.proposals.length}`}} Successful proposals</div>
          <div v-else>
              <md-button class="md-white mt-10 font-size-16 text-transform-capitalize md-simple md-outlined">Create New Proposal</md-button>
          </div>
        </div>
        <ServiceBarChart class="ml-auto" :chart-data="serviceChartData"> </ServiceBarChart>
        <div>
            <div v-for="(it, idx) in serviceChartData" :key="idx" class="d-flex align-center" :class="idx > 0 ? 'mt-20':''">
                <img :src="`${$iconURL}${it.icon}`" width="23px" />
                <template v-if="customer">
                    <span class="ml-10 font-size-13" :style="{ color: it.color }">{{ it.value }}%</span>
                    <span class="ml-10 font-size-13 color-white">${{ it.price | withComma(Number) }}</span>
                </template>
                <template v-else>
                    <span class="icon" :style="{ backgroundColor: it.color }"></span>
                    <span class="ml-10 font-size-14 color-white">{{ it.label }}</span>
                </template>
            </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="px-30 position-relative">
      <div class="position-absolute" style="left: 0; top: 0;z-index: 100">
        <img :src="`${$iconURL}Group 19406.svg`" class="cursor-pointer" width="90px" @click="prev" />
      </div>
      <div class="position-absolute" style="right: 0; top: 0;z-index: 100">
        <img :src="`${$iconURL}Group 19405.svg`" class="cursor-pointer" width="90px" @click="next" />
      </div>
      <template v-if="customer">
          <carousel :items="1" :margin="0" :nav="false" :loop="true" class="d-flex">
              <template slot="prev">
                  <span class="prev handle-btn" ref="prevButton"></span>
              </template>
              <div v-for="(p, index) in incomeList" :key="p.id" class="carousel-item">
                  <template v-if="index == 1">
                      <div class="color-white font-size-20 font-bold-extra text-center mt-30">How to increase Success And Profit</div>
                      <div class="d-flex align-center w-max-400 mx-auto mt-20">
                          <img class="mr-20" :src="`${$iconURL}VendorsProposalPage/group-5280.svg`" style="width: 24px" />
                          <p class="color-white font-size-14">
                              {{`You have won ${wonProposals.length} out of ${customer.proposals.length} opportunities with this customer
                              (${Math.floor(wonProposals.length / customer.proposals.length * 100)}% win rate)`}}
                          </p>
                      </div>
                      <div class="d-flex align-center w-max-400 mx-auto mt-20">
                          <img class="mr-20" :src="`${$iconURL}VendorsProposalPage/group-5280.svg`" style="width: 24px" />
                          <p v-if="wonProposals.length" class="color-white font-size-14">
                              You most recent transaction with his customer was on
                              {{wonProposals[0].transactions[0].dateCreated | date('MMM DD YYYY')}}
                          </p>
                          <p class="color-white font-size-14" v-else>This will be your first transaction with this customer</p>
                      </div>
                      <div class="d-flex align-center w-max-400 mx-auto mt-20">
                          <img class="mr-20" :src="`${$iconURL}VendorsProposalPage/group-5280.svg`" style="width: 24px" />
                          <p class="color-white font-size-14">
                              Overall average deal size for this customer is ${{averageOfProposal | withComma(Number)}}
                              <span v-if="averageOfProposal != average">( {{compareWithTotal}} than your average)</span>
                          </p>
                      </div>
                      <div class="d-flex my-40">
                          <md-button class="md-simple ml-auto md-outlined md-white maryoku-btn mx-auto"
                          >Update Your Prices</md-button
                          >
                      </div>
                  </template>
                  <template v-if="index == 0">
                      <h5 class="color-white font-size-20 font-bold-extra text-center">Income From Past And Future Events</h5>
                      <income-bar-chart :chartData="incomeChartData"></income-bar-chart>
                      <div class="md-layout my-40">
                          <div class="md-layout-item font-size-16 color-white md-size-33 text-center">2021
                              <md-icon style="color: white">keyboard_arrow_down</md-icon>
                          </div>
                          <div class="md-layout-item md-size-33 d-flex align-center font-size-16 color-white text-center">
                              <span :style="`background-color: #ffffff;`" class="icon mr-10"></span>
                              Past events</div>
                          <div class="md-layout-item md-size-33 d-flex align-center font-size-16 color-white text-center" style="white-space: nowrap">
                              <span :style="`background-color: #9b6a92;`" class="icon mr-10"></span>
                              Future events</div>
                      </div>
                  </template>
                  <hr :class="incomeList.length < 2 ? 'mb-40' : ''" />

              </div>
              <template slot="next">
          <span class="next handle-btn d-none" ref="nextButton">
          </span>
              </template>
          </carousel>
      </template>
      <template v-else>
          <carousel :items="1" :margin="0" :nav="false" :loop="true" class="d-flex">
              <template slot="prev">
                  <span class="prev handle-btn" ref="prevButton"></span>
              </template>
              <div v-for="(p, index) in incomeList" :key="p.id" class="carousel-item">

                  <h5 class="color-white font-size-20 font-bold-extra text-center">Income From Past And Future Events</h5>
                  <income-bar-chart :chartData="incomeChartData"></income-bar-chart>
                  <div class="md-layout my-40">
                      <div class="md-layout-item font-size-16 color-white md-size-50 text-left pl-50">2021
                          <md-icon style="color: white">keyboard_arrow_down</md-icon>
                      </div>
                      <div class="md-layout-item md-size-50 d-flex align-center font-size-16 color-white text-right pr-50">
                          <span :style="`background-color: #ffffff;`" class="icon mr-10"></span>
                          No event incomes</div>
                  </div>

                  <hr :class="incomeList.length < 2 ? 'mb-40' : ''" />
              </div>
              <template slot="next">
          <span class="next handle-btn d-none" ref="nextButton">
          </span>
              </template>
          </carousel>
      </template>
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
    customer: {
      type: Object,
      default: null,
    },
    average:{
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      serviceChartData: [],
      incomeChartData: [
        { label: "Jan", value: 0, future: false },
        { label: "Feb", value: 120, future: false },
        { label: "Mar", value: 0, future: false },
        { label: "Apr", value: 0, future: true },
        { label: "May", value: 200, future: true },
        { label: "Jun", value: 30, future: true },
        { label: "Jul", value: 250, future: true },
        { label: "Aug", value: 100, future: true },
        { label: "Sep", value: 200, future: true },
        { label: "Oct", value: 200, future: true },
        { label: "Nov", value: 60, future: true },
        { label: "Dec", value: 20, future: true },
      ],
      incomeList: this.customer ? ["", ""] : [""],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
        console.log('customer.insight', this.average, this.customer)
        this.$forceUpdate();
        this.serviceChartData = this.customer ? [
            { label: "", value: 44, color: "#ffffff", icon: "Budget+Elements/venuerental-white.svg", price: "15000" },
            { label: "", value: 35, color: "#22cfe0", icon: "Budget+Elements/foodandbeverage-white.svg", price: "4800" },
            { label: "", value: 20, color: "#fec02d", icon: "Budget+Elements/entertainment-white.svg", price: "2200" },
        ] : [
            { label: "Venue", value: 44, color: "#a3809d", icon: "Budget+Elements/venuerental-white.svg", price: 0 },
            { label: "Catering", value: 35, color: "#915a87", icon: "Budget+Elements/foodandbeverage-white.svg", price: 0 },
            { label: "Signage & Printing", value: 20, color: "#4e0841", icon: "Budget+Elements/entertainment-white.svg", price: 0 },
        ];

        this.incomeList = this.customer ? ["", ""] : [""];
    },
    next() {
      this.$refs.nextButton.click();
    },
    prev() {
      console.log('prev')
      this.$refs.prevButton.click();
    },
  },
  computed:{
    wonProposals(){
      if(!this.customer || !this.customer.proposals.length) return []
      return this.customer.proposals.filter(p => {
          return p.accepted
      })
    },
    averageOfProposal(){
        if(!this.wonProposals.length) return 0;
        return this.totalPrice / this.wonProposals.length;

    },
    totalPrice(){
        return this.wonProposals.reduce((sum, p) => {
            return sum + Math.floor(p.transactions[0].cost / 100)
        }, 0)
    },
    compareWithTotal(){
        if (this.average <= 0 || this.averageOfProposal <= 0) return 0
        let percent
        if (this.average > 0 && this.averageOfProposal > this.average ){
            percent =  Math.floor((this.averageOfProposal - this.average) / this.average * 100)
        } else if(this.averageOfProposal > 0 && this.averageOfProposal < this.average ){
            percent =  Math.floor((this.average - this.averageOfProposal) / this.averageOfProposal * 100)
        }
        return this.averageOfProposal > this.average ? `${percent}% higher` : `${percent}% lower`;
    }
  },
  watch: {
    customer(newVal){
        console.log('customer.watch', newVal);
        this.init()
    }
  },
};
</script>
<style type="scss">
.carousel-item {
}
.icon{
  min-width: 14px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  margin: 4px 5px;
}
</style>
