<template>
  <div ref="root" class="maryoku_input">
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
    <div v-if="showDatePicker" ref="datePicker">
      <div ref="timePickerPanel" v-click-outside="closeDatePicker" class="date-picker picker-panel text-center p-10" style="z-index: 200 !important">
        <md-checkbox v-model="multipleDates" class="ml-auto md-vendor">
          More than one day event
        </md-checkbox>
        <div class="d-flex justify-content-center align-center p-10">
          <img v-if="getFormattedDate" :src="`${$iconURL}Event Page/calendar-dark.svg`" width="23px">
          <span class="ml-5">{{ getFormattedDate }}</span>
        </div>
        <div class="vendor-calendar mt-20">
          <calendar
            :multiple="multipleDates"
            :init-date="dateData"
            @select="setDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Popup from "@/components/Popup";
import { FunctionalCalendar } from "vue-functional-calendar";
import Calendar from "../Calendar";
import moment from "moment";
import ClickOutside from "vue-click-outside";

export default {
  name: "MaryokuInput",
  components: {
    Calendar,
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
    inputStyle: {
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
      showDatePicker: false,
      multipleDates: this.multiple,
      dateData: {
        currentDate: new Date(),
        dateRange: {
          start: { date: false, dateTime: false, hour: "00", mintue: "00" },
          end: { date: false, dateTime: false, hour: "00", mintue: "00" },
        },
        selectedDate: moment().format("YYYY-MM-DD"),
        selectedDatesItem: "",
        selectedHour: "00",
        selectedMinute: "00",
        selectedDates: [],
      },
    };
  },
  computed: {
    getFormattedDate() {
      if (!this.dateData.selectedDate) return "";
      return this.multipleDates ? `${moment(new Date(this.dateData.dateRange.start.date)).format("MMM DD, YYYY")} ~ ${moment(new Date(this.dateData.dateRange.end.date)).format("MMM DD, YYYY")}` :
          moment(new Date(this.dateData.selectedDate)).format("dddd, MMM DD, YYYY");
    },
    content() {
      if (!this.dateData) return "";
      return this.multipleDates ? [moment(new Date(this.dateData.dateRange.start.date)).format("DD.MM.YYYY"), moment(new Date(this.dateData.dateRange.end.date)).format("DD.MM.YYYY")] :
          moment(new Date(this.dateData.selectedDate)).format("DD.MM.YYYY");
    }
  },
  watch: {
    inputStyle(newVal) {this.inputClass = `${newVal} ${this.size}`;},
    content(){},
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      if (!this.value[0] || !this.value[1]) return;

      let startDate = moment(this.value[0]).format("YYYY-MM-DD");
      let endDate = moment(this.value[1]).format("YYYY-MM-DD");

      if (startDate === endDate) {
        this.dateData.currentDate = new Date(startDate);
        this.dateData.selectedDate = startDate;

      } else {
        this.dateData.dateRange = {
            start: {
              date: startDate
            },
            end: {
              date: endDate
            }
        };

        this.multipleDates = true;
      }

    },
    closeDatePicker(){this.showDatePicker = false;},
    handleInput(e) {
      this.dateData = e;
      this.$emit("change", this.content);
    },
    onClickEvent() {
      this.showDatePicker = true;
    },
    setDate(e) {
      this.dateData = e;
      // this.showDatePicker = false;
      setTimeout(_ => {
        this.$emit("input", {multiple: this.multipleDates, date: e});
      }, 10);

    },
  },

};
</script>
<style lang="scss">
.input-default {
  border: none;
  padding: 15px;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
}
</style>
