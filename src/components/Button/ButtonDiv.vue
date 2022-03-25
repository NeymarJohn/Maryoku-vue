<template>
  <div :class="[classChenger?buttonStyle:secondClass]" @click.prevent="triggerFunc">
    {{ text }}
  </div>
</template>
<script>
export default {
  name: "Button",
  model: {
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    buttonStyle: {
      type: String,
      default: "",
    },
    onClick: {
      type: Function,
      required: true,
    },
    secondClass: {
      type: String,
      default: ""
    },
    classChanger: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    triggerFunc: function () {
      if (this.filter) { this.onClick(this.filter); }
      this.onClick();
    }
  }

};
</script>
<style lang="scss">

</style>
