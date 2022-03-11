<template>
  <div class="dot-label">
    <span v-if="color" class="color-dot" :style="`background-color:${color}`" />
    <slot />
  </div>
</template>
<script>
export default {
  name: "Badge",
  props: {
    color: {
      type: String,
      default: ""
    },
  }
};
</script>
<style lang="scss" scoped>
.dot-label {
  .color-dot {
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
