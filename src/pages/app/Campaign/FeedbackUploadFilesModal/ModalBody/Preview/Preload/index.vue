<template>
  <div @click="load" class="preload">
    <md-button class="choose-file-button" @click="load">
      <img src="/static/icons/red-clip.svg">
      <div class="ml-10">
        Choose File
      </div>
    </md-button>
    <div class="font-size-14">
      Or
    </div>
    <div class="drag-your-file-text">
      Drag your file here
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    load () {
      return this.$emit("load");
    }
  }
};
</script>
<style scoped lang="scss">
  .preload {
    cursor          : pointer;
    border          : 1px dashed #818080;
    height          : 530px;
    display         : flex;
    flex-direction  : column;
    width           : 100%;
    align-items     : center;
    justify-content : center;
  }

  $buttonColor: #f51355;
  .choose-file-button{
    background-color : #fff!important;
    width            : 148px;
    height           : 32px;
    border           : solid 2px $buttonColor;
    color            : $buttonColor!important;
    font-size        : 14px;
    font-weight      : 800;
  }

  .drag-your-file-text{
    font-size        : 16px;
    font-weight      : normal;
    font-stretch     : normal;
    font-style       : normal;
    line-height      : normal;
    letter-spacing   : normal;
    text-align       : center;
    color            : #818080;
  }
</style>
