<template>
  <div v-if="files.length > 0">
    <vue-element-loading :active="isLoading" spinner="ring" color="#FF547C" />
    <ViewFile
      v-if="files.length == 1"
      :file="files[0] || {}"
      @click="load"
    />

    <feedback-upload-images-carousel
      v-else-if="files.length > 1"
      class="carousel-upload-images"
      class-image="carousel-upload-image"
      :images="files"
      :selected="selected"
      @change-item-index="select"
    />
  </div>

  <!-- <AlternativeCarusel
    v-else-if="files.length > 1"
    :files="files"
    :selected="selected"
    @select="select"
  /> -->

  <Preload
    v-else
    @load="load"
  />
</template>
<script>
import Preload  from "./Preload";

export default {
  components: {
    Preload,
    // AlternativeCarusel           : () => import("./AlternativeCarusel"),
    FeedbackUploadImagesCarousel : () => import("../../../FeedbackUploadImagesCarousel"),
    ViewFile                     : () => import("./ViewFile"),
  },
  props: {
    files: {
      type    : Array,
      default : () => ([]),
    },
    selected: {
      type    : Number,
      default : -1,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    lastFileIndex () {
      return this.files ? this.files.length - 1 : -1;
    },
    isSelected: {
      get() {
        return this.select >= 0;
      },
      set (value) {
        this.select = value ? this.lastFileIndex : -1;
      },
    }
  },
  watch: {
    files () {
      if (
        this.lastFileIndex < this.select
        || (
          !this.isSelected
          && this.lastFileIndex >= 0
          && this.select < this.lastFileIndex
        )
      ) this.select(this.lastFileIndex);
    },
  },
  methods: {
    select (index) {
      return this.$emit("select", index);
    },
    load () {
      return this.$emit("load");
    },
  }
};
</script>
