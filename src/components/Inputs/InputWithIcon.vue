<template>
  <div :class="inputBlock">
    <img :class="imgStyle" :src="srcLogo">
    <input
      :value="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :class="inputStyle"
      @input="triggerFunc($event)"
    >
  </div>
</template>
<script>
export default {
  name: "InputWithIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    srcLogo: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
    inputBlock: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    inputStyle: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
    imgStyle: {
      type: String,
      required: true,
    },
  },
  methods: {
    triggerFunc: function (event) {
      this.onChange(event.target.value, event.target.name);
    }
  }
};
</script>
<style lang="scss">
    .input-default{
        border: none;
        padding: 15px;
        width: 100%;
        border-bottom: 1px solid #e4e4e4
    }
    .required-logo{
        color:red;
    }
</style>
