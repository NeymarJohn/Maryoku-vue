<template>
  <div class="landing-footer">
    <div class="landing-footer-item">
      <md-button
        class="md-button md-button md-simple md-just-icon md-theme-default scroll-top-button md-theme-default mt-40"
        @click="scrollToTop()"
      >
        <span>
          <img
            src="https://static-maryoku.s3.amazonaws.com/storage/icons/Budget+Requirements/Asset+49.svg"
            class="upward-button"
          >
        </span>
      </md-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  }
};
</script>
<style scoped lang="scss">
.upward-button {
  width: 20px;
  height: 15px;
  margin-bottom: 5px;
}
.landing-footer {
  width: 100%;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
  height: 126.3px;
  &-item {
    width: 1520px;
    margin: 40px auto;
  }
}
</style>
