<template>
  <div class="upload-files-modal-footer-content">
    <div v-if="!files.length" class="d-flex">
      <img src="/static/icons/red-delete-icon.svg">
      <div class="bottom-block-delete-text">
        Delete the images marked with V
      </div>
    </div>
    <div v-else class="d-flex">
      <img src="/static/icons/red-delete-icon.svg">
      <div class="bottom-block-presentation-text">
        Put a check next to the file you want to appear in the main view.
      </div>
    </div>
    <div class="ml-auto d-flex align-center">
      <md-button class="md-simple maryoku-btn" @click="close">
        Cancel
      </md-button>
      <md-button
        class="md-red maryoku-btn ml-10"
        @click="load"
      >
        Upload files
      </md-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    load () {
      return this.$emit("load");
    },
    close () {
      return this.$emit("close");
    }
  }
};
</script>
