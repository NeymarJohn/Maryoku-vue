<template>
  <div class="over-logo-campaign">
    <IconButton src="Group 2344.svg" @click="replace">
      Replace
    </IconButton>
    <IconButton src="Group 4854.svg" @click="remove">
      Delete
    </IconButton>
  </div>
</template>
<script>
// utils
import { uploadFiles } from "@/helpers/window/upload";
import IconButton from "../../IconButton";

export default {
  components: {
    IconButton,
  },
  methods:{
    remove () {
      return this.$emit("change", null);
    },
    replace () {
      uploadFiles(([file]) => this.$emit("change", file), {
        multiple: false,
      });
    },
  }
};
</script>
<style lang="scss" scoped>
  .over-logo-campaign {
    display: none;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(5, 5, 5, 0.55);
    z-index: 900;
  }
</style>
