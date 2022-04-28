<template>
  <Carusel
    v-if="files.length"
    :files="files"
    :select="select"
    :on-select="onSelect"
  />
  <Preload v-else />
</template>
<script>
import Carusel from "./Carusel";
import Preload from "./Preload";

export default {
  components: {
    Carusel,
    Preload,
  },
  props: {
    files: {
      type    : Array,
      default : () => ([]),
    }
  },
  data: () => ({
    select: -1,
  }),
  watch: {
    files () {
      if      (this.lastFileIndex < this.select) this.select = this.lastFileIndex;
      else if (this.lastFileIndex >= 0 && this.select < this.lastFileIndex) this.select = this.lastFileIndex;
    },
  }
};
</script>
