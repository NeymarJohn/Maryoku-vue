<template>
  <div class="input-proposal-sub-item-wrapper">
    <h6 class="title">{{title}}</h6>
    <input 
      type="text"
      :name="name"
      class="input-proposal"
      :disabled="disabled"
      :placeholder="placeholder"
      :style="`padding-left: ${icon || img ? '60px' : '26px'}`">
    <md-icon v-if="icon">{{icon}}</md-icon>
    <img :src="img" v-if="img!=''">
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
      img: String,
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
    text-align: left;

    .title {
      color: #050505;
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

      border-radius: 3px;
      border: solid 0.5px #707070;
    }
    i {
      position: absolute;
      left: calc(3em + 16px);
      margin-top: 12px;
    }
    img {
      position: absolute;
      left: calc(3em + 39px);
      margin-top: 14px;
      width: 20px;
      margin-right: 12px;
    }
  }
</style>
