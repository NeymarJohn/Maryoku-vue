<template>
  <div class="concept-item-wrapper white-card">
    <img :src="`https://www.maryoku.com/images/made/images/uploads/glitters2_1_290_193_s_c1_c_c.jpg`" class="img_box" />
    <div class="concept-body">
      <div class="votes">1</div>
      <div class="status">Contest N.12</div>
      <div class="name">Mexican Fiest</div>
      <div class="organizations">By Amy Winehose</div>
      <div class="concept-description">
        Throw a Mexican fiesta for everyone to enjoy. This is a great celebration to throw for...
      </div>
      <md-button class="edit-btn md-simple md-black"
        ><span class="font-size-12">Read More <md-icon>keyboard_arrow_right</md-icon></span></md-button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.concept-item-wrapper {
  width: 300px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  .img_box {
    height: 160px;
  }
  .concept-body {
    padding: 40px 25px 25px;
    position: relative;
    text-align: left;
    .votes {
      border: solid 0.5px #641956;
      font-family: Manrope-Regular;
      font-size: 14px;
      line-height: 1.29;
      letter-spacing: 0.29px;
      text-align: center;
      color: #641956;
      padding: 7px;
      width: 100%;
      max-width: 98px;
      background: #fff;
      position: absolute;
      top: -15px;
    }
    .status {
      color: #818080;
      font-size: 14px;
      font-weight: bold;
    }
    .name {
      margin-top: 10px;
      font-size: 20px;
      font-weight: 800;
    }
    .organizations {
      margin: 5px 0;
      color: #818080;
      font-size: 12px;
    }
    .concept-description {
      font-size: 12px;
      color: #050505;
      padding-bottom: 10px;
    }
  }
}
</style>