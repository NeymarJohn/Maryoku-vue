<template>
  <div class="input-proposal-sub-item-wrapper">
    <h6 class="title">{{title}}</h6>
    <input 
      type="text"
      :name="name"
      class="input-proposal"
      :disabled="disabled"
      :placeholder="placeholder"
      :style="`padding-left: ${icon || img ? '60px' : '26px'}`"
      v-if="!items"
    >
    <input 
      type="text"
      :name="name"
      class="input-proposal category"
      :disabled="disabled"
      :placeholder="items[0]"
      :value="selectedItem"
      readonly
      @click="expanded=!expanded"
      v-else
    >
    <md-icon v-if="icon">{{icon}}</md-icon>
    <img :src="img" v-if="img!='' && !items">
    <img 
      v-else
      :src="img"  
      :style="`
        left: calc(100% - 7em);
        transform: rotate(90deg);
        width: 12px;
      `">
    <ul v-if="expanded && items">
      <li v-for="(item, index) in items" :key="index" @click="selectValue(item)">{{item}}</li>
    </ul>
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
      bkImg: String,
      disabled: Boolean,
      items: Array
    },
    data() {
      return {
        expanded: false,
        selectedItem: null,
      }
    },
    created () {
    },
    methods: {
      selectValue(item) {
        this.selectedItem = item
        this.expanded = false
      }
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

      &.category {
        font: bold 20px Manrope-Regular, sans-serif;
        cursor: pointer;
      }
    }
    i {
      position: absolute;
      left: calc(3em + 16px);
      margin-top: 12px;
    }
    img {
      position: absolute;
      left: calc(3em + 50px);
      margin-top: 14px;
      width: 20px;
      margin-right: 12px;
    }
    ul {
      list-style: none;
      padding: 20px 26px;
      border: 1px solid #050505;
      margin: 0;
      position: absolute;
      background: #ffffff;
      z-index: 99;
      width: calc(100% - 10em);

      li {
        font: normal 16px Manrope-Regular, sans-serif;
        cursor: pointer;
        margin-bottom: 1em;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
