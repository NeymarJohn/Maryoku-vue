<template>
  <button
    class="width-100 d-flex justify-content-center color-white font-bold font-size-16 button cursor-pointer"
    @click="click"
  >
    <img :src="`${$iconURL}RSVP/${src}`" class="mr-10">
    <span><slot /></span>
  </button>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    }
  },
  methods: {
    click(event) {
      return this.$emit("click", event);
    }
  }
};
</script>
<style scoped>
  button {
    background-color: transparent;
    border: none;
  }
</style>
