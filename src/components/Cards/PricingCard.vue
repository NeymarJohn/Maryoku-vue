<template>
  <md-card class="md-card-pricing" :class="cardClass"  style="padding: 0; margin: 0">
    <slot name="category"></slot>
    <md-card-content  style="padding: 0; margin: 0">
      <slot name="title" ></slot>
      <slot name="description"></slot>
    </md-card-content>
    <!--<md-card-actions class="text-center">
      <slot name="footer"></slot>
    </md-card-actions>-->
  </md-card>
</template>
<script>
export default {
  name: "pricing-card",
  props: {
    cardClass: {
      type: String,
      default: ""
    },
    iconColor: {
      type: String,
      default: ""
    }
  }
};
</script>
<style>
</style>
