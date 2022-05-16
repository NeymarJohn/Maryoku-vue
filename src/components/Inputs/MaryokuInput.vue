<template>
  <div ref="root" class="maryoku_input">
    <input
      :ref="refName"
      v-model="content"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :class="inputClass"
      :readonly="readonly"
      :disabled="disabled"
      :data-vv-name="validation"
      @click="onClickEvent"
      @input="handleInput"
    >
    <span v-if="errors.has(validation)" class="md-error color-red">{{ errors.first(validation) }}</span>

    <div v-if="inputStyle === 'sharing'" class="copy_clip" :class="theme">
      <button
        v-clipboard:copy="value"
        v-clipboard:success="onCopy"
        v-clipboard:error="onCopyError"
        type="button"
        @mouseover="mouseOver($event)"
      >
        Copy
      </button>
      <transition name="fade" mode="out-in">
        <div v-if="tooltipActive" class="copied-tooltip">
          Link Copied!
        </div>
      </transition>
    </div>
    <div v-if="showTimePicker" ref="timePickerElements">
      <div ref="timePickerPanel" class="time-picker picker-panel">
        <div class="d-flex picker-content">
          <img :src="`${$iconURL}Notes/clock-dark.svg`" width="23px">
          <TimeInput v-model="timeInfo" />
        </div>
        <div class="btn-group">
          <md-button class="md-simple md-black normal-btn" @click="showTimePicker = false">
            Cancel
          </md-button>
          <md-button class="md-default md-rose normal-btn" @click="setTime">
            Set
          </md-button>
        </div>
      </div>
      <div v-if="showTimePicker" ref="timePickerMask" class="time-picker-mask" @click="showTimePicker = false" />
    </div>

    <div v-if="showDatePicker" ref="datePicker">
      <div ref="timePickerPanel" class="date-picker maryoku picker-panel" style="z-index: 200 !important">
        <div class="d-flex pl-10">
          <img v-if="getFormattedDate" :src="`${$iconURL}Event Page/calendar-dark.svg`" width="23px">
          <span class="p-5">{{ getFormattedDate }}</span>
        </div>

        <div>
          <FunctionalCalendar
            v-model="dateData"
            :is-date-picker="true"
            :change-month-function="true"
            :change-year-function="true"
            date-format="yyyy-mm-dd"
            :class="theme"
          />
        </div>
        <div class="btn-group">
          <md-button class="md-simple md-black normal-btn" @click="showDatePicker = false">
            Cancel
          </md-button>
          <md-button class="md-default md-rose normal-btn" :class="{ 'md-vendor': theme === 'purple' }" @click="setDate">
            Set
          </md-button>
        </div>
      </div>
      <div v-if="showDatePicker" ref="timePickerMask" class="time-picker-mask" @click="showDatePicker = false" />
      <div v-if="showDatePicker" ref="timePickerMask" class="time-picker-mask" @click="clickMask" />
    </div>
  </div>
</template>
<script>
import moment from "moment";
import TimeInput from "@/components/TimeInput";
import { FunctionalCalendar } from "vue-functional-calendar";

// const components = {
//     TimeInput: () => import('@/components/inputs/TimeInput.vue'),
//     FunctionalCalendar: () => import('vue-functional-calendar'),
// }

export default {
  name: "MaryokuInput",
  components: {
        TimeInput,
        FunctionalCalendar,
  },
  props: {
    /**
     * Data binding
     * @model
     */
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    inputStyle: {
      type: String,
      default: "",
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
    validation: {
      type: String,
      default: "",
    },
    fieldName: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "red",
    },
    refName: {
      type: String,
      required: false,
      default: "input",
    },
  },
  data() {
    return {
      content: this.value,
      inputClass: `${this.inputStyle} ${this.size}`,
      showTimePicker: false,
      showDatePicker: false,
      dateData: {},
      timeInfo: 0,
      tooltipActive: false,
    };
  },
  computed: {
    getClass: function () {
      return `${this.inputStyle} ${this.value ? "active" : ""} ${this.size}`;
    },
    getFormattedDate() {
      if (!this.dateData.selectedDate) return "";
      return moment(new Date(this.dateData.selectedDate)).format("dddd, MMM DD, YYYY");
    },
    getValidateObject() {
      if (this.validation === "url") {
        return { url: { require_porotocal: false } };
      } else {
        return "";
      }
    },
    getErrorMessage() {
      return this.errors.first();
    },
  },
  watch: {
    content: function (newValue) {
      this.inputClass = `${this.inputStyle} ${this.value ? "active" : ""} ${this.size}`;
      if (this.inputStyle === "budget" || this.inputStyle === "users") {
        const result = Number(newValue.replace(/,/g, ""));
        this.$emit("input", result);
      } else {
        this.$emit("input", this.content);
      }
    },
    value: function (newValue) {
      if (this.inputStyle === "budget" || this.inputStyle === "users") {
        this.content = `${newValue}`.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        this.content = newValue;
      }
    },
    inputStyle(newVal) {this.inputClass = `${newVal} ${this.size}`;}
  },
  beforeDestroy() {
    if (this.$refs.timePickerPanel) this.$refs.timePickerPanel.style.display = "none";
  },
  created() {
    if (this.value && this.inputStyle === "budget") {
      this.content = `${this.value}`.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleInput(e) {
      this.$emit("input", this.content);
      this.$emit("change", this.content);
    },
    cumulativeOffset(element) {
      var top = 0,
        left = 0;
      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        top -= element.scrollTop || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top: top,
        left: left,
      };
    },
    onClickEvent() {
      if (this.inputStyle == "time") {
        this.showTimePicker = true;
      }
      if (this.inputStyle == "date") {
        this.showDatePicker = true;
        // this.$refs.timePickerElements.style.transform = "translateY(100%)";
      }
      if (this.inputStyle == "time" || this.inputStyle == "date") {

      }
    },
    clickMask() {
      this.showDatePicker = false;
    },
    setDate() {
      this.content = moment(new Date(this.dateData.selectedDate)).format("DD.MM.YYYY");
      this.showDatePicker = false;
      this.$emit("input", this.content);
    },
    setTime() {
      this.showTimePicker = false;
      this.content = moment(this.timeInfo).format("hh:mm A");
      this.$emit("input", this.content);
    },
    handleScroll(event) {
      if (this.$refs.timePickerPanel)
        this.$refs.timePickerPanel.style.top = `${window.scrollY + this.cumulativeOffset(this.$refs.input).top}px`;
    },
    onCopy: function (e) {
      this.$refs.input.focus();
      this.$refs.input.select();
      document.execCommand("copy");
      setTimeout(() => {
        this.tooltipActive = true;
      }, 500);
      setTimeout(() => {
        this.tooltipActive = false;
      }, 3000);
    },
    onCopyError: function (e) {
      alert("Failed to copy texts");
    },
    mouseOver: function (e) {
      e.stopPropagation();
      e.preventDefault();
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
.required-logo {
  color: red;
}
.copied-tooltip {
  width: 140px;
  height: 40px;
  background-color: #f51355;
  text-align: center;
  line-height: 40px;
  position: absolute;
  right: -4px;
  top: 55px;
  color: white;
  font-weight: bold;
  border-radius: 2px;
  &:after {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 15px solid #f51355;
    content: "";
    top: -14px;
    position: absolute;
    right: 30px;
  }
}
.purple {
  .copied-tooltip {
    background-color: #641856;
    &:after {
      border-bottom: 15px solid #641856;
    }
  }
}
</style>
