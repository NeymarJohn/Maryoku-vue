<template>
  <carousel :items="1" :margin="0" :nav="false" :loop="true" class="d-flex">
    <template slot="prev">
      <span ref="prevButton" class="prev handle-btn" />
    </template>
    <div v-for="(p) in incomeList" :key="p.id" class="carousel-item">
      <h5 class="color-white font-size-20 font-bold-extra text-center">
        Income From Past And Future Events
      </h5>
      <income-bar-chart :chart-data="incomeChartData" />
      <div class="md-layout my-40">
        <div class="md-layout-item font-size-16 color-white md-size-50 text-left pl-50">
          <year-select :data="yearsList" width="60%" :initial-value="initialYear" @valueChanged="handleYearChange" />
        </div>
        <div class="md-layout-item md-size-50 d-flex align-center font-size-16 color-gray text-right pr-50">
          <span :style="'background-color: rgb(159, 107, 144)'" class="icon mr-10" />
          No event incomes
        </div>
      </div>
      <hr :class="incomeList.length < 2 ? 'mb-40' : ''">
    </div>
    <template slot="next">
      <span ref="nextButton" class="next handle-btn d-none" />
    </template>
  </carousel>
</template>
<script>
import carousel from "vue-owl-carousel";
import IncomeBarChart from "./IncomeBarChart.vue";
import YearSelect from "@/components/Select/YearSelect.vue";

export default {
  components: {
    carousel,
    IncomeBarChart,
    YearSelect
  },

  props: {
    incomeChartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const date = new Date().getFullYear();
    return {
      incomeList: [""],
      yearsList: [
        date - 1,
        date,
        date + 1
      ],
      date,
      initialYear: new Date().getFullYear()
    };
  },
  methods: {
      handleYearChange(value) {
        this.$emit("onYearChanged", value);
      }
    }
  };
</script>
<style type="scss">
.carousel-item {
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
