<template>
  <div class="collapse-panel">
    <div class="collapse-panel-header font-bold-extra text-transform-uppercase" @click="toggle">
      <slot name="header" />
      <md-button class="md-icon-button md-simple collapse-button mr-50" @click="toggle">
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
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  created() {
    this.isExpanded = this.defaultStatus;
  },
  methods: {
    toggle(event) {
      event.stopPropagation();
      this.isExpanded = !this.isExpanded;
      this.$emit("toggle", this.isExpanded);
    },
  },
};
</script>
<style lang="scss" scoped>
.collapse-panel {
  .collapse-panel-header {
    position: relative;
    padding: 50px;
    font-size: 30px;
    font-weight: bolder;
    border-top: solid 1px #050505;
    cursor: pointer;
    .collapse-button {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      .icon {
        font-size: 35px !important;
      }
    }
  }
}
</style>
