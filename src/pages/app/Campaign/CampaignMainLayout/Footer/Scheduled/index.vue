<template>
  <div class="ml-40 d-flex flex-centered align-center">
    <img :src="`${$iconURL}Campaign/Group 9222.svg`">
    <span class="ml-10">{{label}}</span>
  </div>
</template>
<script>
export default {
  props: {
    format: {
      type    : String,
      default : () => "MMM DD, YYYY ",
    },
    label: {
      type    : String,
    },
  }
};
</script>
