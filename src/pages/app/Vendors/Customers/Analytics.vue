<template>
  <carousel :items="1" :margin="0" :nav="false" :loop="true" class="d-flex">
    <template slot="prev">
      <span class="prev handle-btn" ref="prevButton"></span>
    </template>
    <div v-for="(p) in incomeList" :key="p.id" class="carousel-item">
      <h5 class="color-white font-size-20 font-bold-extra text-center">Income From Past And Future Events</h5>
      <income-bar-chart :chartData="incomeChartData"></income-bar-chart>
      <div class="md-layout my-40">
        <div class="md-layout-item font-size-16 color-white md-size-50 text-left pl-50">
          <select v-model="selected" class='selected'>
            <option disabled value="" class='d-none'>{{selected||date}} </option>
            <option>{{date-1}}</option>
            <option>{{date}}</option>
            <option>{{date+1}}</option>
         </select>
        </div>
        <div class="md-layout-item md-size-50 d-flex align-center font-size-16 color-white text-right pr-50">
          <span :style="`background-color: #ffffff;`" class="icon mr-10"></span>
          No event incomes
        </div>
      </div>
      <hr :class="incomeList.length < 2 ? 'mb-40' : ''" />
    </div>
    <template slot="next">
      <span class="next handle-btn d-none" ref="nextButton"> </span>
    </template>
  </carousel>
</template>
<script>
import carousel from "vue-owl-carousel";
import IncomeBarChart from "./IncomeBarChart.vue";

export default {
  components: {
    carousel,
    IncomeBarChart,
  },
  props: {
    incomeChartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      incomeList: [""],
      date: Number(new Date().toLocaleString('ru',{year:'numeric'})),
      selected: ''
    };
  },
};
</script>
<style type="scss">

.carousel-item {
}
.selected{
  background-color: #641856;
  cursor: pointer;
  color:white;
  border:none;
 
}
  .selected>option{
  background-color: white;
  color:#641856
  }
  .selected:active{
    border: none;
  }

.icon {
  min-width: 14px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  margin: 4px 5px;
}
</style>
