<template>
  <div class="choice">
    <input type="text"
           :name="name"
           class="input-default"
           :disabled="disabled"
           :placeholder="placeholder"
    >
    <slot name="title">
      <h6>{{ title }}</h6>
    </slot>
  </div>
</template>
<script>
export default {
  name: "InputText",
  model: {
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    disabled: Boolean
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
    .input-default {
        padding: 15px;
        width: 100%;
    }
</style>
