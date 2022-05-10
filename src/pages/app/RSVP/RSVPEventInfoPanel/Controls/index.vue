<template>
  <fieldset class="controls">
    <md-button class="md-simple md-black maryoku-btn" @click="cancel">
      Cancel
    </md-button>
    <md-button class="md-red maryoku-btn" @click="save">
      Save
    </md-button>
  </fieldset>
</template>
<script>
export default {
  methods: {
    save () {
      return this.$emit("save");
    },
    cancel () {
      return this.$emit("cancel");
    }
  }
};
</script>
<style lang="scss" scoped>
  .controls {
    border  : none;
    display : flex;
  }
</style>
