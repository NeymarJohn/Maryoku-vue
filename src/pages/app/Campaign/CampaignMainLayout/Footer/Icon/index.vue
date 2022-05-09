<template>
  <span class="font-size-16 font-bold-extra">
    <img
      :src="`${$iconURL}${src}`"
      class="mr-10"
      style="width: 20px; height: 20px"
    >
    <slot />
  </span>
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
