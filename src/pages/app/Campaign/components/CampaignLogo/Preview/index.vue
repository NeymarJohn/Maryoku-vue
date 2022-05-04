<template>
  <div v-if="src" class="change-logo">
    <ReviewLogo v-if="!review" @change="change" />
    <img class="logo" :src="src" alt="previev-logo">
  </div>
</template>
<script>
export default {
  components: {
    ReviewLogo: () => import("./Review"),
  },
  props: {
    review: {
      type: Boolean,
      default: Boolean,
    },
    src: {
      type: String,
      default: String,
    }
  },
  methods: {
    change(value) {
      this.$emit("change", value);
    },
  }
};
</script>
<style lang="scss" scoped>
    .change-logo {
      width: 259px;
      height: 134px;
      margin-right: 27px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-radius: 3px;
      & img.logo {
        width: 178px;
        height: 99px;
        object-fit: contain;
      }
      &:hover {
        .over-logo-campaign {
          display: flex;
        }
      }
    }
</style>
