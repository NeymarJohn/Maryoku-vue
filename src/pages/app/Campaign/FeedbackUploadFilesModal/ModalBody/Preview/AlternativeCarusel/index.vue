<template>
  <div class="preview">
    <Prevent :last-index="lastFileIndex" :selected="selected" class="left" @select="select">
      &#8249;
    </Prevent>
    <ViewFile :file="file" class="full" @dblclick="load" />
    <Next :last-index="lastFileIndex" :selected="selected" class="right" @select="select">
      &#8250;
    </Next>
  </div>
</template>
<script>
import Prevent  from "./Prevent";
import Next     from "./Next";
import ViewFile from "../ViewFile";

export default {
  components: {
    Prevent,
    Next,
    ViewFile,
  },
  props: {
    alt: {
      type: String,
      default: () => "image-prview"
    },
    selected: {
      type     : Number,
      default  : 0,
    },
    files : {
      type    : Array,
      default : Array
    },
  },
  computed: {
    lastFileIndex () {
      return this.files ? this.files.length - 1 : -1;
    },
    file () {
      return this.files[this.selected] || {};
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
<style scoped>
  .preview {
    max-width  : 100%;
    width      : 100%;
    height     : 100%;
    display    : flex;
    position   : relative;
  }

  .preview button {
    background-color : transparent;
    width            : 50px;
    height           : 100%;
    position         : relative;
    z-index          : 1;
    border           : none;
    font-size        : 36px;
    font-weight      : bold;
    color            : rgba(255, 255, 255, 0.4);
    transition       : color .25s;
    cursor           : pointer;
    position         : absolute;
  }

  .preview button:hover {
    transition       : color .25s;
    color            : rgba(245, 19, 85, 0.7);
  }

  .full {
    right    : -62px;
    position : relative;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }
</style>
