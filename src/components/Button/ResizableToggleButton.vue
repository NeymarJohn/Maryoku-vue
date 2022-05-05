<template>
  <div class="resizable-toggle-wrapper">
    <button class="resizable-toggle-button" :class="{ clicked: clicked, disabled }" @click="handleClick">
      <template v-if="clicked">
        <img v-if="icon" :src="icon" width="28px" style="filter: brightness(0) invert(1)">
        <span class="label-text" v-if="label">{{ label }}</span>
      </template>
      <template v-else>
        <img v-if="icon" :src="icon" :style="iconStyle">
      </template>
      <span v-if="hasBadge && !clicked" class="badge-mark" />
    </button>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
    },
    icon: {
      type: String,
      default: "",
    },
    selectedIcon: {
      type: String,
      default: "",
    },
    defaultStatus: {
      type: Boolean,
      default: false,
    },
    iconStyle: {
      type: [Object, String],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasBadge: {
      type: Boolean,
      default: false,
    },
    proposalCategory: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clicked: this.defaultStatus,
    };
  },
  watch: {
    defaultStatus(newValue, oldValue) {
      this.clicked = newValue;
    },
  },
  mounted() {
    this.clicked = this.defaultStatus;
  },
  methods: {
    handleClick() {
      if (this.disabled) return;

      this.clicked = this.proposalCategory ? true : !this.clicked;
      this.$emit("click", this.clicked);
    },
  },
};
</script>
<style lang="scss" scoped>
.resizable-toggle-wrapper {
  display: inline-block;
  position: relative;

  .resizable-toggle-button {
    max-width: 60px;
    height: 60px;
    background-color: white;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    border-radius: 30px;
    border: none;
    padding: 15px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    transition: 0.3s ease;
    position: relative;
    .label-text {
      padding: 10px;
    }
    &.clicked {
      background-color: #f51355;
      transition: 0.3s ease-in;
      color: white;
      max-width: 500px;
    }
    &.disabled {
      opacity: 0.8;
      background-color: #dfdfdf;
    }
    img {
      height: 100%;
    }
    .md-icon{
      width: 32px!important;
      height: 32px!important;
      font-size: 32px!important;
    }
  }
  .badge-mark {
    display: block;
    width: 12px;
    height: 12px;
    background-color: #f51355;
    border-radius: 50%;
    z-index: 1;
    right: 5px;
    top: 5px;
    position: absolute;
    transform: translate(-50%);
  }
}
</style>
