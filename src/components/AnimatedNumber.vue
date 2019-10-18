<template>
  <span class="text-color-purple">{{prefix}}{{animatedNumber | numeral('0,0') }}{{suffix}}</span>
</template>
<script>
import TWEEN from "@tweenjs/tween.js";

export default {
  props: {
    value: {
      default: 0
    },
    duration: {
      type: Number,
      default: 800
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      animatedNumber: 0
    };
  },
  methods: {
    initAnimation(newValue, oldValue) {
      let vm = this;

      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, this.duration)
        .onUpdate(function(object) {
          vm.animatedNumber = object.tweeningNumber.toFixed(vm.decimalDigits);
        })
        .start();

      animate();
    }
  },
  computed: {
    decimalDigits() {
      return (`${this.value}`.split('.')[1] || []).length;
    }
  },
  mounted() {
    this.initAnimation(this.value, 0);
  },
  watch: {
    value(newValue, oldValue) {
      this.initAnimation(newValue, oldValue);
    }
  }
};
</script>
<style>
  .text-color-purple {
    color: #9c27b0;
    font-size: 18px;
    font-weight: normal;
  }
</style>
