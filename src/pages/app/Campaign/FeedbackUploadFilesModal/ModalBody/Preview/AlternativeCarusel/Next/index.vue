<template>
  <button :title="`Next index ${nextIndex}`" @click="next">
    <slot>next</slot>
  </button>
</template>
<script>
export default {
  props: {
    selected: {
      type    : Number,
      default : -1,
    },
    lastIndex: {
      type    : Number,
      default : Infinity,
    },
    firstIndex : {
      type: Number,
      default: 0,
    },
  },
  computed: {
    acceptNext () {
      return this.lastIndex > this.selected;
    },
    nextIndex() {
      return this.acceptNext ? this.selected + 1 : this.firstIndex;
    }
  },
  methods: {
    select (selectedIndex = -1) {
      this.$emit("select", selectedIndex);
    },
    next () {
      return this.select(this.nextIndex);
    },
  }
};
</script>
