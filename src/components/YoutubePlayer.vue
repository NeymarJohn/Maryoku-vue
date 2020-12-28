<template>
  <div class="youtube-player">
    <youtube video-id="pELHFctXOcQ" ref="youtube"></youtube>
  </div>
</template>

<script>
export default {
  name: "videoPlayer",
  props: {
    videoId: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.youtube-player {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>