<template>
  <div class="time-select-fields">
    <!-- <input type="time" v-model="time" class="without_ampm" @change="updateTime" /> -->
    <div class="time-wrapper">
      <input type="text" v-model="timeObject.hh" :maxlength="2">
      :
      <input type="text" v-model="timeObject.mm" :maxlength="2">
    </div>
    <select class="ampm" v-model="ampm">
      <option value="am">AM</option>
      <option value="pm">PM</option>
    </select>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: "time-input",
  props: {
    /**
     * Data binding
     * @model
     */
    value: {
      type: [String, Date, Number]
    }
  },
  created() {
    if (typeof(this.value)==="string") {
      this.ampm = new Date(this.value).getHours()>=12?"pm":"am"
      this.time = moment(new Date(this.value)).format("HH:mm")
    }
  },
  methods:{
    updateTime(e) {
      console.log(e.target.value);      
      let hours = Number(e.target.value.split(":")[0]);
      let mins =  Number(e.target.value.split(":")[1]);
      const time = new Date(this.value);
      time.setHours(hours);
      time.setMinutes(mins);
      // this.time = moment(new Date(this.value)).format("hh:mm")
      this.$emit("input",time.toString())
    }
  },
  data() {
    return {
      ampm: new Date(this.value).getHours()>=12?"pm":"am",
      time: moment(new Date(this.value)).format("HH:mm"),
      timeObject: {
        hh: "00",
        mm: "00"
      }
    };
  },
  watch: {
    value: function () {
      this.ampm = new Date(this.value).getHours()>=12?"pm":"am"
      this.time = moment(new Date(this.value)).format("HH:mm")
    }
  },
};
</script>
<style scoped lang="scss">
.time-select-fields {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: max-content;
  position: relative;
  &::after {
    content: "";
    border-top: solid 3px #969696;
    border-left: solid 3px #969696;
    width: 13px;
    height: 13px;
    border-radius: 1px;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
    position: absolute;
    bottom: -13px;
    right: 40px;
  }
  .time-wrapper {
    border-radius: 3px;
    border: solid 1px #bcbcbc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    font-family: "Manrope-Regular", sans-serif;
    color: #050505;
    input {
      width: 30px;
      border: none;
      box-shadow: none;
      margin: 16px 12px 16px 16px;
      padding: 0px;
      text-align: center;
      min-height: 1em;
      height: 1em;
    }
  }
  .ampm {
    text-align: center;
    width: 90px;
    border-radius: 3px;
    border: solid 1px #bcbcbc;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    -ms-appearance: none;
    appearance: none;
    padding: 16px 20px;
    
  }
  input,
  select {

    background: #ffffff;
    padding: 0 12px;
    font-size: 14px;
    min-width: 55px;
    text-align: center;
    color: #050505;
    font-size: 30px;
    line-height: 1em;
  }
  select {
    margin-left: 13px;
    width: 35%;
  }
  span {
    display: inline-block;
    margin: 0 0.5em;
    font-size: 18px;
    font-family: "Manrope-ExtraBold", sans-serif;
    color: #050505;
  }
}
</style>