<template>
  <div class="requirement-tag-item">
    {{ label }}
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.requirement-tag-item {
  margin: 0 10.6px 0 0;
  padding: 10px 12.6px 10px 17px;
  border-radius: 100px;
  border: solid 1px #f51355;
  color: #f51355;
}
</style>
