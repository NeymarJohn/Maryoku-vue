<template>
  <md-button id="ChangeCoverImage" class="md-button md-red maryoku-btn md-theme-default change-cover-btn" @click="click">
    <img :src="`${$iconURL}Campaign/Group 2344.svg`" class="mr-10" style="width: 20px">
    <slot>Change Cover</slot>
  </md-button>
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
  .change-cover-btn {
    position  : absolute;
    left      : 50%;
    top       : 50%;
    transform : translate(-50%, -50%);
  }
</style>
