<template>
  <div class="timeline-template-item">
    <img
      class="time-line-blocks_icon"
      :src="`${$iconURL}Timelines-New/${item.icon.toLowerCase()}-circle.svg`"
    />
    <div class="template-form">
      {{item.title}}
      <md-button class="md-icon-button">
        <md-icon>item</md-icon>
      </md-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.timeline-template-item {
  .template-form {
    border: dashed 1px #908f8f;
  }
}
</style>