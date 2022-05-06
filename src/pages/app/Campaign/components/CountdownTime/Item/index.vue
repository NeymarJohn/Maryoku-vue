<template>
  <div class="countdown-time-item">
    <div class="countdown-time-value">
      {{ ("00" + value).slice(-2) }}
    </div>
    <div
      v-if="label"
      class="countdown-time-label"
      :style="`background-color: ${color}; color:${oppositeColor}`"
    >
      {{ label }}
    </div>
  </div>
</template>
<script>
import { oppositeColor } from "@/utils/helperFunction";
const DEFAULT_COLOR = "#d9fcf2";

export default {
  props: {
    value: {
      type    : [String, Number],
      default : "00",
    },
    label: {
      type: String,
      default: "",
    },
    color: {
      type    : String,
      default : DEFAULT_COLOR,
    }
  },
  computed: {
    oppositeColor () {
      return oppositeColor(this.color);
    }
  }
};
</script>
<style lang="scss" scoped>
  .countdown-time-item {
    width            : 118px;
    height           : 161px;
    border-radius    : 3px;
    box-shadow       : 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color : #ffffff;
    margin-right     : 28px;
    display: flex;
    flex-direction: column;
    &:last-child {
      margin-right: 0px;
    }
  }

  .countdown-time-value {
    box-sizing  : border-box;
    padding     : 39px 1rem 22px;
    width       : 100%;
    text-align  : center;
    line-height : 53px;
    font-size   : 40px;
    font-family : "Manrope-ExtraBold";
  }

  .countdown-time-label {
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    flex-grow: 1;
  }
</style>
