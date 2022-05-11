<template>
  <md-button class="md-simple edit-btn md-red" @click="input">
    <slot>Edit</slot>
  </md-button>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: Boolean,
    }
  },
  methods: {
    input() {
      return this.$emit("input", !this.value);
    }
  }
};
</script>
