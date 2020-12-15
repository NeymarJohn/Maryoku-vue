<template>
  <div class="maryoku_input" ref="root">
    <input
      v-model="content"
      :name="name"
      :type="type"
      @input="handleInput"
      :placeholder="placeholder"
      :class="inputClass"
      :readonly="readonly"
      :disabled="disabled"
      @click="onClickEvent"
      ref="input"
      v-validate="getValidateObject"
      :data-vv-name="validation"
    />
    <span class="md-error color-red" v-if="errors.has(validation)">{{ errors.first(validation) }}</span>

    <div class="copy_clip" v-if="inputStyle === 'sharing'">
      <button
        type="button"
        v-clipboard:copy="value"
        v-clipboard:success="onCopy"
        v-clipboard:error="onCopyError"
        @mouseover="mouseOver($event)"
      >
        Copy
      </button>
      <transition name="fade" mode="out-in">
        <div class="copied-tooltip" v-if="tooltipActive">Link Copied!</div>
      </transition>
    </div>
    <div ref="timePickerElements" v-if="showTimePicker">
      <div class="time-picker picker-panel" ref="timePickerPanel">
        <div class="d-flex picker-content">
          <img :src="`${$iconURL}Notes/clock-dark.svg`" width="23px" />
          <time-input v-model="timeInfo"></time-input>
        </div>
        <div class="btn-group">
          <md-button class="md-simple md-black normal-btn" @click="showTimePicker = false">Cancel</md-button>
          <md-button class="md-default md-rose normal-btn" @click="setTime">Set</md-button>
        </div>
      </div>
      <div class="time-picker-mask" @click="showTimePicker = false" ref="timePickerMask" v-if="showTimePicker"></div>
    </div>

    <div ref="timePickerElements" v-if="showDatePicker">
      <div class="date-picker picker-panel" ref="timePickerPanel">
        <div class="d-flex pl-10">
          <img :src="`${$iconURL}Event Page/calendar-dark.svg`" width="23px" />
          <!-- {{dateData && dateData.selectedDate}} -->
          {{ getFormattedDate }}
        </div>
        <!-- <div class="color-gray" style="margin-top: 40px; margin-bottom: 10px;"> Date Range Picker</div> -->
        <div>
          <functional-calendar
            :is-date-picker="true"
            :change-month-function="true"
            :change-year-function="true"
            dateFormat="yyyy-mm-dd"
            v-model="dateData"
          ></functional-calendar>
        </div>
        <div class="btn-group">
          <md-button class="md-simple md-black normal-btn" @click="showDatePicker = false">Cancel</md-button>
          <md-button class="md-default md-rose normal-btn" @click="setDate">Set</md-button>
        </div>
      </div>
      <div class="time-picker-mask" @click="showDatePicker = false" ref="timePickerMask" v-if="showDatePicker"></div>
    </div>
  </div>
</template>
<script>
import Popup from "@/components/Popup";
import TimeInput from "@/components/TimeInput";
import { FunctionalCalendar } from "vue-functional-calendar";
import moment from "moment";
export default {
  name: "maryoku-input",
  model: {},
  components: {
    Popup,
    TimeInput,
    FunctionalCalendar,
  },
  props: {
    /**
     * Data binding
     * @model
     */
    value: String,
    name: String,
    srcLogo: String,
    type: String,
    onChange: Function,
    inputBlock: String,
    placeholder: String,
    disabled: Boolean,
    imgStyle: String,
    inputStyle: String,
    readonly: Boolean,
    size: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    validation: String,
    fieldName: {
      type: String,
      default: "",
    },
  },
  beforeDestroy() {
    if (this.$refs.timePickerPanel) this.$refs.timePickerPanel.style.display = "none";
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
      }
      if (this.inputStyle == "time" || this.inputStyle == "date") {
        setTimeout(() => {
          const pos = this.cumulativeOffset(this.$refs.input);
          this.$refs.timePickerPanel.style.left = `${pos.left}px`;
          this.$refs.timePickerPanel.style.top = `${window.scrollY + pos.top}px`;
          this.$refs.timePickerPanel.style.display = "block";
          this.$refs.timePickerPanel.style.position = "absolute";
          document.getElementsByTagName("body")[0].appendChild(this.$refs.timePickerElements);
          window.addEventListener("scroll", this.handleScroll);
        }, 100);
      }
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
      console.log(window.scrollY);
      console.log(this.cumulativeOffset(this.$refs.input));
      if (this.$refs.timePickerPanel)
        this.$refs.timePickerPanel.style.top = `${window.scrollY + this.cumulativeOffset(this.$refs.input).top}px`;
    },
    onCopy: function (e) {
      // alert('You just copied: ' + e.text)
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
  created() {
    if (this.value && this.inputStyle === "budget") {
      this.content = `${this.value}`.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    console.log(this.readonly);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    content: function (newValue) {
      this.inputClass = `${this.inputStyle} ${this.value ? "active" : ""} ${this.size}`;
      if (this.inputStyle === "budget" || this.inputStyle === "users") {
        const result = newValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.content = result;
      }
      console.log(this.content);
      this.$emit("input", this.content);
    },
    dateData: function (newValue) {
      // this.content = dateData.selectedDate
    },
    timeInfo: function (newValue) {
      console.log(newValue);
      // this.content = newValue
    },
    value: function (newValue) {
      this.content = newValue;
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
</style>
