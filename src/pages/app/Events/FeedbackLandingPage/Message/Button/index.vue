<template>
  <button class="feedback-message-successful-btn-close bg-white" @click="click">
    <img width="34" height="34" src="static/icons/vendor/proposalBoard/filter-inactive.svg">
  </button>
</template>
<script>
export default {
  methods: {
    click (event) {
      return this.$emit("click", event);
    }
  }
};
</script>
<style scoped>
  .feedback-message-successful-btn-close {
    padding: 20px;
    border: none;
    outline: none;
    background: #ffffff !important;
    box-shadow: none;
  }
</style>
