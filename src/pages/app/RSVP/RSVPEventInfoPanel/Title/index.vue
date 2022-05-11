<template>
  <span :class="{ underline: !editable }"><slot />?</span>
</template>
<script>
export default {
  props: {
    editable: {
      type: Boolean,
      default: Boolean,
    }
  }
};
</script>
<style scoped>
  .underline {
    border-bottom: solid 2px #ff7600;
    vertical-align: middle;
  }
  @media only screen and (max-width: 959px) {
    .underline {
      font-size: 16px;
    }
  }
</style>
