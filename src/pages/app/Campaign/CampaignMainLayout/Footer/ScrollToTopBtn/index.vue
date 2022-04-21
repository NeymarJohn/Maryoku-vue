<template>
  <md-button
    class="
      md-button md-simple md-just-icon md-theme-default
      scroll-top-button
    "
    @click="scrollToTop"
  >
    <slot>
      <img
        :src="`${$iconURL}Budget+Requirements/Asset+49.svg`"
        width="17"
      >
    </slot>
  </md-button>
</template>
<script>
const scrollUp = () => window.scrollTo(0, 0);
export default {
  methods: {
    scrollToTop: scrollUp,
  }
};
</script>
