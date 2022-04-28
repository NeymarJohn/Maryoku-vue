<template>
  <img v-if="src" :src="src" :alt="alt">
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: () => "",
    },
    alt: {
      type: String,
      default: () => "image-prview"
    }
  }
};
</script>
<style scoped>
  img {
    background : transparent;
    max-width  : 100%;
    width      : 100%;
    min-width  : 128px;
    height     : auto;
    object-fit : cover;
  }
</style>
