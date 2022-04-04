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
      <div ref="timePickerPanel" v-click-outside="closeDatePicker" class="seasonal-picker picker-panel" style="z-index: 200 !important">
        <div class="md-layout">
          <div v-for="option in seasonOptions"
               :key="option.value"
               class="md-layout-item md-size-45 border d-flex flex-column align-center justify-content-center px-40 pt-30 pb-10 m-5"
               :class="season === option.value ? 'purple-bg' : ''"
               @click="changeSeason(option.value)"
          >
            <!--            <img :src="`${$iconURL}${season.icon}`">-->
            <img src="/static/winter.png" width="108px">
            <span class="mt-20 font-size-14 color-black-middle">{{ option.label }}</span>
          </div>
        </div>

        <div class="md-layout">
          <div v-for="month in monthOptions"
               :key="month.value"
               class="md-layout-item md-size-50 d-flex align-center justify-content-center position-relative"
          >
            <md-button
              class="md-simple md-outlined"
              :class="months.includes(month.value) ? 'md-vendor purple-bg': 'md-black-middle'"
              @click="changeMonth(month.value)"
              style="width: 180px"
            >
              {{ `${month.label} ${getYear}` }}
            </md-button>
          </div>
        </div>
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
      season: null,
      months: [],
      seasonOptions: [
          {label: "Winter", value: "winter", icon: ""},
          {label: "Spring", value: "spring", icon: ""},
          {label: "Summer", value: "summer", icon: ""},
          {label: "Fall", value: "fall", icon: ""},
      ],
      monthOptions: MonthOptions,
    };
  },
  computed: {
    content() {
        const season = this.season ? this.seasonOptions.find(s => s.value === this.season).label : "";
        const months = this.months.length ? this.months.map(m => this.monthOptions.find(op => op.value === m).label) : "";
        return `${season} ${months}`;
    },
    getYear(){
        return moment().format("YYYY");
    }
  },
  methods: {
    init(){
    },
    closeDatePicker(){this.showCalendarPicker = false;},
    handleInput(e) {
      this.$emit("change", this.content);
    },
    onClickEvent() {
      this.showCalendarPicker = true;
    },
    changeMonth(value) {
      const index = this.months.indexOf(value);
      if (index > -1) this.months.splice(index, 1);
      else this.months.push(value);

      this.$emit('change', {season: this.season, months: this.months});
    },
    changeSeason(value) {
      this.season = value;
      this.$emit('change', {season: this.season, months: this.months});
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
    left: -200px;
    top: 80px;
    background-color: #fff;
    min-width: 800px;
    padding: 40px;
    z-index: 20;
    box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);
    display: flex !important;
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
</style>
