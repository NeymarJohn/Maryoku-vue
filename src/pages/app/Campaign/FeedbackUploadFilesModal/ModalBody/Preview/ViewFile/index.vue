<template>
  <img
    v-if="src"
    :src="src"
    alt="preview-image"
    @click="click"
    @dblclick="dblclick"
  >
</template>
<script>
export default {
  props: {
    file: {
      type : Object,
      default: () => ({}),
    }
  },
  computed: {
    src () {
      if (this.file) {
        return this.file.base64 || this.file.url || "";
      }
      return "";
    }
  },
  methods: {
    click() {
      this.$emit("click");
    },
    dblclick () {
      this.$emit("dblclick");
    }
  }
};
</script>
<style scoped>
  img {
    background   : transparent;
    width        : calc(100% + 2px);
    height       : 532px;
    object-fit   : cover;
    margin-right : -62px;
    margin-left  : -62px;
  }
</style>
