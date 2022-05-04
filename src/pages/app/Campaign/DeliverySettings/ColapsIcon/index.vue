<template>
  <md-icon v-if="isSelected" class="icon">
    keyboard_arrow_down
  </md-icon>
  <md-icon v-else class="icon">
    keyboard_arrow_right
  </md-icon>
</template>
<script>
export default {
  props: {
    isSelected: {
      type    : Boolean,
      default : false,
    },
  }
};
</script>
