<template>
  <div class="time-picker-component">
    <vue-timepicker
      manual-input
      input-class="time-class"
      hide-dropdown
      format="hh:mm"
      v-model="startTime"
      hide-clear-button
      @change="changeTime"
    />
    <div class="am-field" @click="updateStartA()">
      <input type="text" v-model="ampm" readonly />
    </div>
  </div>
</template>
<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
export default {
  components: {
    VueTimepicker,
  },
  data() {
    return {
      ampm: "AM",
      startTime: {
        hh: "12",
        mm: "00",
      },
    };
  },
  methods: {
    updateStartA() {
      if (this.ampm == "AM") {
        this.ampm = "PM";
      } else {
        this.ampm = "AM";
      }
      this.$emit("change", `${this.startTime.hh}:${this.startTime.mm} ${this.ampm}`);
    },
    changeTime(event) {
      this.startTime.hh = event.data.hh;
      this.startTime.mm = event.data.mm;
      this.$emit("change", `${this.startTime.hh}:${this.startTime.mm} ${this.ampm}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.time-picker-component {
  display: flex;
  /deep/ .time-picker {
    margin-right: 5px;
    width: 66%;
    input {
      text-align: center;
      width: 100%;
      height: 45px;
      border-radius: 3px;
      font: normal 18px Manrope-Regular, sans-serif;
      border: 1px solid #707070;
      font-size: 20px;
    }
  }
  .am-field {
    position: relative;
    width: 33%;
    &::before {
      position: absolute;
      content: ">";
      -webkit-transform: translateX(50%) translateY(calc(100% + 1.2rem)) rotate(90deg);
      transform: translateX(50%) translateY(calc(100% + 1.2rem)) rotate(90deg);
      left: 40%;
      font-size: 20px;
      font-weight: 800;
    }
    input {
      width: 100%;
      text-align: center;
      font-size: 20px;
    }
  }
}
</style>
