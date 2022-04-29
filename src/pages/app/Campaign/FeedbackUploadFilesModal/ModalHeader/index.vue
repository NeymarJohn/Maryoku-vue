<template>
  <div class="upload-files-modal-header-content">
    <div>
      <div class="upload-files-title">
        Upload Files
      </div>
      <div class="upload-files-text">
        Drag and drop your files below. You can upload several files at a time.
        Click here to browse for files on your computer.
      </div>
    </div>
    <div class="graph-close-button">
      <md-button class="md-simple md-just-icon md-round modal-upload-files-close-button" @click="close">
        <md-icon>clear</md-icon>
      </md-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    close () {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-files-modal-header-content {

  .upload-files-title {
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.53;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
  }

  .upload-files-text {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #050505;
    width: 460px;
  }
}
</style>
