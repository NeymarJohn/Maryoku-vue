<template>
  <div class="attachment-item d-flex justify-content-between">
    <div class="d-flex align-center">
      <div class="font-size-20 mr-20" :class="{ 'font-bold': !!attachment.fileName }">{{ attachment.name }}</div>
      <div class="color-gray font-size-14" :class="{ 'font-bold': attachment.isRequired }">
        {{ attachment.isRequired ? "Required" : "Optional" }}
      </div>
    </div>
    <div v-if="attachment.fileName" class="d-flex align-center font-bold">
      <span class="file-name">{{ attachment.fileName }}</span>
      <md-button class="md-simple md-black edit-btn"><md-icon>close</md-icon></md-button>
    </div>
    <div v-else class="d-flex">
      <md-button class="md-simple md-red edit-btn">Upload</md-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    attachment: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.attachment-item {
  padding: 30px 0;
  .file-name {
    text-decoration: underline;
  }
}
</style>