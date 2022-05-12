<template>
  <fieldset class="controls">
    <md-button class="md-simple maryoku-btn md-black" @click="cancel">
      Cancel
    </md-button>
    <md-button class="maryoku-btn md-red" @click="save">
      Save
    </md-button>
  </fieldset>
</template>
<script>
export default {
  methods: {
    save () {
      return this.$emit("save", null);
    },
    cancel () {
      return this.$emit("cancel", null);
    }
  }
};
</script>
<style lang="scss" scoped>
  .controls {
    border      : none;
    display     : flex;
    align-items : center;
    padding     : 0;
    margin      : 0;
    button {
      display: flex;
      justify-content: center;
    }
    .md-ripple {
      width      : auto;
      height     : auto;
      text-align : center;
    }
  }
</style>
