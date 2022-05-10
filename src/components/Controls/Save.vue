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
    border      : none;
    display     : flex;
    align-items : center;
    button {
      margin-left: 10px !important;
      display: flex;
      justify-content: center;
    }
    .md-ripple {
      width : auto;
      height: auto;
      text-align: center;
    }
  }
</style>
