<template>
  <div class="d-flex sharing-button-group-content">
    <ul class="d-flex sharing-button-group">
      <li><img :src="`${$iconURL}Campaign/Image+170.png`"/></li>
      <li><img :src="`${$iconURL}Campaign/Image+169.png`"/></li>
      <li><img :src="`${$iconURL}Campaign/Image+75.png`"/></li>
      <li><img :src="`${$iconURL}Campaign/Image+74.png`"/></li>
      <li><img :src="`${$iconURL}Campaign/Image+76.png`"/></li>
      <li><img :src="`${$iconURL}Campaign/Image+168.png`"/></li>
    </ul>
    <md-button class="md-simple md-red normal-btn"><img :src="`${$iconURL}Campaign/Path 2639.svg`"/><span>Copy Link</span></md-button>
  </div>
  
</template>
<script>
export default {
  
  
}
</script>
<style lang="scss" scoped>
.sharing-button-group {
  padding: 0;
  list-style: none;
  border: solid 1px #999999;
  border-radius: 3px;
  width: max-content;
  li {
    width: 64px;
    text-align:center;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  li:not(:last-child) {
    border-right: solid 1px #999999;
  }
}
</style>