<template>
  <div ref="root" class="seasonal_input">
    <input
      v-model="content"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :class="inputClass"
      :readonly="readonly"
      :disabled="disabled"
      @click="onClickEvent"
      @input="handleInput"
    >
    <div v-if="showCalendarPicker" ref="datePicker">
      <div ref="timePickerPanel" v-click-outside="closeDatePicker" class="seasonal-picker" style="z-index: 200 !important">
        <div class="position-relative">
          <div class="message-arrow" />
        </div>
        <div class="d-flex align-center font-size-14">
          From
          <span class="ml-20 cursor-pointer"
                :class="from.year ? 'color-vendor' : 'color-black-middle'"
                @click="select('from', 'year')"
          >
            {{ from.year ? from.year : 'Select a year' }}</span>
          <span class="md-black-middle mx-10"> > </span>
          <span class="cursor-pointer"
                :class="from.season && from.months.length > 0 ? 'color-vendor' : 'color-black-middle'"
                @click="select('from', 'season_month')"
          >
            {{ from.season && from.months.length > 0 ? `${from.season} / ${getMonths('from')}` : 'Select a month / season' }}</span>
        </div>
        <div class="d-flex align-center font-size-14">
          To
          <span class="ml-20 cursor-pointer"
                :class="to.year ? 'color-vendor' : 'color-black-middle'"
                @click="select('to', 'year')"
          >
            {{ to.year ? to.year : 'Select a year' }}</span>
          <span class="md-black-middle mx-10"> > </span>
          <span class="cursor-pointer"
                :class="to.season && to.months.length > 0 ? 'color-vendor' : 'color-black-middle'"
                @click="select('to', 'season_month')"
          >
            {{ to.season && to.months.length > 0 ? `${to.season} / ${getMonths('to')}` : 'Select a month / season' }}</span>
        </div>
        <template v-if="section === 'season_month'">
          <div class=" d-flex md-layout">
            <div class="md-layout-item md-size-60 md-layout">
              <div v-for="month in monthOptions"
                   :key="month.value"
                   class="md-layout-item md-size-33 d-flex align-center justify-content-center position-relative"
              >
                <md-button
                  class="m-0"
                  :class="(selected === 'from' && from.months.includes(month.value) || selected === 'to' && to.months.includes(month.value)) ?
                   'md-vendor': 'md-simple md-black-middle'"
                  @click="changeMonth(selected, month.value)"
                >
                  {{ `${month.label}` }}
                </md-button>
              </div>
            </div>
            <div class="md-layout-item md-size-40 md-layout p-0">
              <div v-for="option in seasonOptions"
                   :key="option.value"
                   class="md-layout-item md-size-50 d-flex flex-column align-center justify-content-center px-30 pt-10 pb-5"
                   :class="(selected === 'from' && from.season === option.value || selected === 'to' && to.season === option.value ) ? 'purple-bg' : ''"
                   @click="changeSeason(selected, option.value)"
              >
                <img :src="`${$iconURL}Seasonal/${(selected === 'from' && from.season === option.value || selected === 'to' && to.season === option.value) ?
                 'purple_': ''}${option.icon}.svg`" width="40px">
                <span class="mt-10 font-size-12 color-black-middle">{{ option.label }}</span>
              </div>
            </div>
          </div>
        </template>
        <template v-if="section === 'year'">
          <div class=" d-flex md-layout">
            <md-button
              v-for="option in yearOptions"
              :key="option"
              class="md-layout-item md-size-20"
              :class="(selected === 'from' && from.year === option || selected === 'to' && to.year === option ) ? 'md-vendor': 'md-simple md-black-middle'"
              @click="changeYear(selected, option)"
            >
              {{ `${option}` }}
            </md-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import {MonthOptions} from "@/constants/options";

export default {
  name: "SeasonalCalendarInput",
  components: {
  },
  props: {
    value: {
      type: [String, Array],
      default: null
    },
    name: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    readonly: Boolean,
    size: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: "red",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputClass: `${this.inputStyle} ${this.size}`,
      showCalendarPicker: false,
      from: {
        year: "",
        season: "",
        months: [],
      },
      to: {
        year: null,
        season: null,
        months: [],
      },
      section: "year",
      selected: "from",
      seasonOptions: [
          {label: "Winter", value: "winter", icon: "winter"},
          {label: "Spring", value: "spring", icon: "spring"},
          {label: "Summer", value: "summer", icon: "summer"},
          {label: "Fall",   value: "fall",   icon: "fall"},
      ],
      yearOptions: [2004, 2005, 2006, 2007, 2008, 2009, 2010,
                    2011, 2012, 2013, 2014, 2015, 2016, 2017,
                    2018, 2019, 2020, 2021, 2022, 2023],
      monthOptions: MonthOptions,
    };
  },
  computed: {
    content() {
        const from_season = this.from.season ? this.seasonOptions.find(s => s.value === this.from.season).label : "";
        const to_season = this.to.season ? this.seasonOptions.find(s => s.value === this.to.season).label : "";

        return `${this.from.year} ${from_season} ${this.getMonths('from')} ${this.to.year} ${to_season} ${this.getMonths('to')}`;
    },
  },
  methods: {
    closeDatePicker(){this.showCalendarPicker = false;},
    handleInput(e) {
      // this.$emit("change", this.content);
    },
    getMonths(selected) {
      if (selected === 'from') {
        return this.from.months.map(m => this.monthOptions.find(op => op.value === m).label);
      } else if(selected === 'to') {
        return this.to.months.map(m => this.monthOptions.find(op => op.value === m).label);
      }
    },
    onClickEvent() {
      this.showCalendarPicker = true;
    },
    select(selected, section) {
      this.selected = selected;
      this.section = section;
    },
    changeYear(selected, value){

      if (selected === "from") {
        this.from.year = value;
      } else {
        this.to.year = value;
      }
      this.$emit("change", {from: this.from, to: this.to});
    },
    changeMonth(selected, value) {

      if (selected === "from") {
        const index = this.from.months.indexOf(value);
        if (index > -1) this.from.months.splice(index, 1);
        else this.from.months.push(value);
      } else {
        const index = this.to.months.indexOf(value);
        if (index > -1) this.to.months.splice(index, 1);
        else this.to.months.push(value);
      }
      this.$emit("change", {from: this.from, to: this.to});
    },
    changeSeason(selected, value) {
      console.log('changeSeason', selected, value);
      if (selected === "from") {
        this.from.season = value;
      } else {
        this.to.season = value;
      }
      this.$emit("change", {from: this.from, to: this.to});
    }
  },

};
</script>
<style lang="scss" scoped>
.seasonal_input {
    position: relative;
}
.seasonal-picker{
    position: absolute;
    left: 0;
    top: 80px;
    background-color: #fff;
    min-width: 540px;
    padding: 20px;
    z-index: 20;
    box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);
}
input {
  border: 0.5px solid #dddddd;
}
.border{
    border-radius: 3px;
    border: 0.5px solid;
    &.back-middle {
       border-color: #707070;
    }
    &.vendor{
        border-color: #641856;
    }
}
.purple-bg {
    background-color: #e9dfe8;
}
.message-arrow{
    position: absolute;
    top: -36px;
    left: 30px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 18px solid white;
}
</style>
