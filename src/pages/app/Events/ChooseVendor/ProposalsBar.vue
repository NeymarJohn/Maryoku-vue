<template>
  <div class="proposals-bar">
    <div
      class="flex-1 proposal-item"
      v-for="proposal in proposals"
      :class="{ isActive: proposal.id === selectedId }"
      :key="proposal.id"
      @click="handleClick(proposal)"
    >
      <div class="font-size-30 font-bold-extra">${{ proposal.cost | withComma }}</div>
      <div class="font-size-22 font-bold-extra mt-30">{{ proposal.vendor.companyName }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    proposals: {
      type: Array,
      default: () => [],
    },
    selectedId: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick(proposal) {
      this.$emit("goDetail", proposal);
    },
  },
};
</script>
<style lang="scss" scoped>
.proposals-bar {
  width: 100%;
  display: flex;
  background-color: white;
  height: 162px;
  cursor: pointer;
  .proposal-item {
    padding: 30px 40px;
    &:not(:last-child) {
      border-right: solid 1px #707070;
    }
    &.isActive {
      color: #f51355;
      border-bottom: solid 2px #f51355;
    }
  }
}
</style>