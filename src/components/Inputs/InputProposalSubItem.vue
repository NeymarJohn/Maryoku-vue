<template>
  <div class="input-proposal-sub-item-wrapper">
    <h6 class="title">{{title}}</h6>
    <input type="text"
            :name="name"
            class="input-proposal"
            :disabled="disabled"
            :placeholder="placeholder" >
  </div>
</template>
<script>
  export default {
    name: "input-proposal-sub-item",
    model: {
    },
    props: {
      name: String,
      title: String,
      placeholder: String,
      icon: String,
      disabled: Boolean
    },
    methods: {

    }
  };
</script>
<style lang="scss" scoped>
  .input-proposal-sub-item-wrapper {
    margin-right: 22px;
    font-family: 'Manrope-Regular', sans-serif;
    color: #050505;
    .title {
      padding: 0;
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 7px;
      margin-top: 0;
      margin-bottom: 7px;
      text-transform: capitalize;
    }
    .input-proposal {
      padding: 22px 26px;
      font-size: 16px;
      width: 100%;
    }
  }
</style>
