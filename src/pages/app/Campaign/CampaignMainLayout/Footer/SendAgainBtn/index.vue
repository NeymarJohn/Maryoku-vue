<template>
  <button
    class="ml-40 d-flex flex-centered align-center cursor-pointer send-again-btn"
    @click="click"
  >
    <span class="seperator small" style="margin-top: 0; margin-right: 30px" />
    <i class="far fa-clock" />
    <span class="ml-10" style="font-weight: bold"><slot>Send again </slot></span>
  </button>
</template>
<script>
export default {
  methods: {
    click () {
      this.$emit("click");
    }
  }
};
</script>
<style scoped>
.send-again-btn {
  color: inherit;
  border: none;
  background-color: transparent;
  font-size: 1rem;
}
</style>
