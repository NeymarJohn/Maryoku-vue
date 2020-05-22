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
      @click="onClickEvent"
      ref="input"
    />
    <div ref="timePickerElements" v-if="showTimePicker">
      <div class="time-picker picker-panel"  ref="timePickerPanel" >
        <div class="d-flex ">
          <img :src="`${$iconURL}Event Page/calendar-dark.svg`" width="23px"/>
          <time-input></time-input>
        </div>
        <div class="btn-group">
          <md-button class="md-simple md-black normal-btn" @click="showTimePicker=false">Cancel</md-button>
          <md-button class="md-default md-rose normal-btn"> Set </md-button>
        </div>
      </div>
      <div class="time-picker-mask" @click="showTimePicker=false" ref="timePickerMask" v-if="showTimePicker"></div> 
    </div>
      
    <div ref="timePickerElements" v-if="showDatePicker">
      <div class="date-picker picker-panel"  ref="timePickerPanel" >
        <div class="d-flex ">
          <img :src="`${$iconURL}Event Page/calendar-dark.svg`" width="23px"/>
        </div>
        <div>
          <functional-calendar :change-month-function='true' :change-year-function='true'></functional-calendar>
        </div>
        <div class="btn-group">
          <md-button class="md-simple md-black normal-btn" @click="showDatePicker=false">Cancel</md-button>
          <md-button class="md-default md-rose normal-btn"> Set </md-button>
        </div>
      </div>
      <div class="time-picker-mask" @click="showDatePicker=false" ref="timePickerMask" v-if="showDatePicker"></div> 
    </div>
  </div>
</template>
<script>
import Popup from "@/components/Popup"
import TimeInput from "@/components/TimeInput";
import { FunctionalCalendar } from 'vue-functional-calendar'

export default {
  name: "maryoku-input",
  model: {},
  components: {
    Popup,
    TimeInput,
    FunctionalCalendar
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
    readonly: Boolean
  },
  data() {
    return {
      content: this.value,
      inputClass: this.inputStyle,
      showTimePicker: false,
      showDatePicker: false
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", this.content);
    },
    cumulativeOffset(element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop  || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);

        return {
            top: top,
            left: left
        };
    },
    onClickEvent() {
      if (this.inputStyle == "time") {
        this.showTimePicker = true;
       
      }
      if (this.inputStyle == 'date') {
        this.showDatePicker = true;

      }
      if (this.inputStyle == "time" || this.inputStyle == "date") {
         setTimeout(() => {
          const pos = this.cumulativeOffset(this.$refs.input)
          this.$refs.timePickerPanel.style.left = `${pos.left}px`;
          this.$refs.timePickerPanel.style.top = `${window.scrollY + pos.top}px`;
          this.$refs.timePickerPanel.style.display = "block";
          document.getElementsByTagName("body")[0].appendChild(this.$refs.timePickerElements)
          window.addEventListener('scroll', this.handleScroll);
        }, 100);
      }
    },
    handleScroll(event) {
      console.log(window.scrollY)
      console.log(this.cumulativeOffset(this.$refs.input))
      this.$refs.timePickerPanel.style.top = `${window.scrollY + this.cumulativeOffset(this.$refs.input).top}px`;
    }
  },
  computed: {
    getClass: function() {
      return `${this.inputStyle} ${this.value ? "active" : ""}`;
    }
  },
  created () {
    
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    content: function(newValue) {
      this.inputClass = `${this.inputStyle} ${this.value ? "active" : ""}`;
      if (this.inputStyle === "budget") {
        const result = newValue
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.content = result;
      }
    }
  }
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
</style>
