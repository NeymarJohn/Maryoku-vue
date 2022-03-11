<template>
  <md-switch v-model="data" class="below-label large-switch md-switch-rose">
    <template v-if="label">
      <span v-if="data">Show {{ label }}</span>
      <span v-if="!data">Hide {{ label }}</span>
    </template>
  </md-switch>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      data: true,
    };
  },
  watch: {
    data(newValue, oldValue) {
      this.$emit("input", newValue);
    },
    value(newValue, oldValue) {
      this.data = this.value;
    },
  },
  created() {
    this.data = this.value;
  },
};
</script>
