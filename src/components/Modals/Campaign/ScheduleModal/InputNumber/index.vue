<template>
  <input
    :value="value"
    type="number"
    min="1"
    class="text-center mr-20 input-number"
    style=""
    @input="input"
  >
</template>
<script>
import pipe from "@/helpers/function/pipe/index.js";

const uInt = pipe(
  Number,
  Math.round,
  Math.abs,
);

const fitLength = maxLength => value => value > (10 ** maxLength) ? `${value}`.substr(-maxLength) : value;

export default {
  props: {
    value: {
      type    : [Number, String],
      default : 1,
    },
    maxLength: {
      type    : Number,
      default : 2,
    }
  },
  created () {
    if (this.value) {
      const currectValue = this.normilize(this.value);
      if (currectValue !== this.value) this.set(currectValue);
    }
  },
  methods: {
    set (value) {
      return this.$emit("input", value);
    },
    normilize (value) {
      return pipe(
        uInt,
        fitLength(this.maxLength),
        (value) => value || "",
      )(value);
    },
    input ({ target }) {
      const { value } = target;
      return this.set(this.normilize(value));
    }
  }
};
</script>
<style scoped>
  .input-number {
    width     : 100%;
    max-width : 128px;
  }
</style>
