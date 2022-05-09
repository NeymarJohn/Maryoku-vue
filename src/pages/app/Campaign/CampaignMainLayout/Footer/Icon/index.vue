<template>
  <div class="icon">
    <img
      :src="`${$iconURL}${src}`"
      class="mr-10"
      style="width: 20px; height: 20px"
    >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    }
  }
};
</script>
<style lang="scss" scoped>
  .icon {
    display     : inline-flex;
    font-weight : 900;
    color       : inherit;
  }
</style>
