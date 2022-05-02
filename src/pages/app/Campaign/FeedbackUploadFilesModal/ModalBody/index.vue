<template>
  <div class="file-preview">
    <ListFiles
      :files="files"
      :selected="selected"
      @select="select"
      @dropFile="dropFile"
    />
    <Preview
      :files="files"
      :selected="selected"
      :is-loading="isLoading"
      @select="select"
      @load="load"
    />
  </div>
</template>
<script>
import numberClamp from "@/helpers/number/clamp";
import Preview     from "./Preview";
import ListFiles   from "./ListFiles";

export default {
  components: {
    Preview,
    ListFiles,
  },
  props: {
    files: {
      type    : Array,
      default : () => ([]),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    selected : -1
  }),
  computed: {
    lastFileIndex () {
      return this.files ? this.files.length - 1 : -1;
    },
    firstFileIndex () {
      return this.lastFileIndex > -1 ? 0 : -1;
    },
  },
  watch:{
    files () {
      if (this.selected > this.lastFileIndex) this.selected = this.lastFileIndex;
      else if (this.selected === -1 && this.lastFileIndex > -1) this.selected = this.lastFileIndex;
    },
  },
  methods: {
    normilizeSelect (index) {
      return numberClamp(this.firstFileIndex, this.lastFileIndex, +index);
    },
    setSelected (index) {
      if (index !== this.selected) return this.selected = index;
      return this.selected;
    },
    select (index) {
      return this.setSelected(this.normilizeSelect(index));
    },
    load () {
      return this.$emit("load");
    },
    dropFile (index) {
      return this.$emit("dropFile", index);
    }
  }
};
</script>
<style lang="scss" scoped>
.file-preview {
  cursor          : pointer;
  width           : 100%;
}
</style>
