<template>
  <button :title="`prevent index ${preventIndex}`" @click="prevent">
    <slot>prevent</slot>
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
      required: true,
    }
  },
  computed: {
    acceptPrevent () {
      return this.selected <= 0;
    },
    preventIndex () {
      return this.acceptPrevent ? this.lastIndex : this.selected - 1;
    }
  },
  methods: {
    select (selectedIndex = -1) {
      this.$emit("select", selectedIndex);
    },
    prevent () {
      return this.select(this.preventIndex);
    }
  }
};
</script>
