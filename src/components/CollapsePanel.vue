<template>
  <div class="collapse-panel">
    <div class="collapse-panel-header">
      <slot name="header" />
      <md-button class="md-icon-button md-simple collapse-button" :class="`mr-${spacing}`" @click="toggle">
        <md-icon v-if="isExpanded" class="icon">
          keyboard_arrow_down
        </md-icon>
        <md-icon v-if="!isExpanded" class="icon">
          keyboard_arrow_right
        </md-icon>
      </md-button>
    </div>
    <div v-if="isExpanded" class="collapse-panel-content">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    defaultStatus: {
      type: Boolean,
      default: false,
    },
    spacing: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      isExpanded: true,
    };
  },
  created() {
    this.isExpanded = this.defaultStatus;
  },
  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>
<style lang="scss" scoped>
.collapse-panel {
  .collapse-panel-header {
    position: relative;
    .collapse-button {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      margin: 0;
      .icon {
        font-size: 35px !important;
      }
    }
  }
}
</style>
