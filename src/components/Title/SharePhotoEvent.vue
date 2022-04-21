<template>
  <div class="icon-and-text">
    <img class="left-icon" src="/static/icons/green-block-icon-1.svg">
    <div class="right-text-style">
      <slot>share with us photos you took from the event</slot>
    </div>
  </div>
</template>
<style scoped>
.icon-and-text {
  display         : flex;
  align-items     : start;
  vertical-align  : baseline;
}
.left-icon {
  margin-right    : 20px;
  float           : left;
  display         : inline-block;
}
.right-text-style {
  display         : inline-block;
  text-transform  : uppercase;
  font-size       : 22px;
  font-weight     : 800;
  height          : 82px;
  font-stretch    : normal;
  font-style      : normal;
  line-height     : normal;
  letter-spacing  : normal;
  text-align      : left;
}
</style>
