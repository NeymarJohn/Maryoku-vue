<template>
  <div class="planningboard-tag-item" :class="{ selected: isSelected }" @click="handleClick">
    <span>{{ tagLabel }}</span>
    <md-icon class="icon">add_circle</md-icon>
  </div>
</template>
<script>
export default {
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    tagLabel: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss" scoped>
.planningboard-tag-item {
  margin-left: 20px;
  margin-bottom: 10px;
  border: solid 1px #f51355;
  // height: 50px;
  border-radius: 25px;
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-family: "Manrope-Bold";
  color: #f51355 !important;
  cursor: pointer;
  .icon {
    margin-left: 10px;
    color: #f51355 !important;
    font-size: 30px !important;
  }
  &.selected {
    border: solid 1px #a0a0a0;
    color: #a0a0a0 !important;
    .icon {
      color: #a0a0a0 !important;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
</style>