<template>
  <md-card class="md-card-signup">
    <slot name="title" />

    <md-card-content class="signup-card">
      <div class="md-layout">
        <slot name="content-left" />
        <slot name="content-middle" />
        <slot name="content-right" />
      </div>
    </md-card-content>

    <md-card-actions v-if="$slots.footer" md-alignment="space-between">
      <slot v-if="$slots.footer" name="footer" />
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "SignupCard"
};
</script>

<style lang="css">
  .signup-card {
    padding: 0px !important;
    overflow: hidden;
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.13);
  }
  @media (min-width: 1500px) {
    .md-layout {
      width: 75vw;
      height: 70vh;
    }
  }
</style>
