<template>
  <div>
    <button @click="onPrev">prev</button>
    <img v-if="src" :src="src" :alt="alt">
    <button @click="onNext">next</button>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: () => "",
    },
    alt: {
      type: String,
      default: () => "image-prview"
    },

    onSelect: {
      type     : Function,
      required : true,
    },
    select: {
      type     : Number,
      default  : -1,
    },
  },
  methods: {
    onNext () {
      return this.onSelect(this.select >= this.lastFileIndex ? 0 : this.select + 1);
    },

    onPrev () {
      return this.onSelect(this.select <= 0 ? this.lastFileIndex : this.select - 1);
    },
  }
};
</script>
<style scoped>
  img {
    background : transparent;
    max-width  : 100%;
    width      : 100%;
    min-width  : 128px;
    height     : auto;
    object-fit : cover;
  }
</style>
