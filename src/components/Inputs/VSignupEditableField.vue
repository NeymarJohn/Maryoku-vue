<template>
  <div class="vsignup-edtiable-field-wrapper" :class="[{'border-bottom': borderBottom}]">
    <div class="left">
      <div class="title">
        {{title}}
      </div>
      <div class="content">
        <img v-if="img!=''" :src="img"/>
        {{defaultVal}}
      </div>
    </div>
    <div class="right">
      <a>
        Edit <md-icon>navigate_next</md-icon>
      </a>
    </div>
  </div>
</template>
<script>
import VueElementLoading from 'vue-element-loading'

export default {
  name: 'v-signup-editable-field',
  components: {
    VueElementLoading
  },
  props: {
    title: String, 
    img: String,
    isEdit: Boolean,
    defaultVal: String,
    borderBottom: Boolean
  },
  data: () => ({
    isLoading: true,
  }),
  mounted () {
    
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/md/_variables.scss";
@import "@/assets/scss/md/_colors.scss";

.vsignup-edtiable-field-wrapper {
  width: 100%;  
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #050505;
  margin-top: 30px;

  &.border-bottom {
    padding-bottom: 35px;
    border-bottom: 1px solid #dddddd;
  }

  .left {
    .title {
      font: 800 16px Manrope-Regular, sans-serif;
    }
    .content {
      margin-top: 13px;
      font: normal 16px Manrope-Regular, sans-serif;
      img {
        width: 20px;
        margin-right: 18px;
        position: relative;
        top: -1px;
      }
    }
  }
  .right {
    a {
      font: 800 16px Manrope-Regular, sans-serif;
      color: #f51355;
      cursor: pointer;
      i {
        color: #f51355!important;
        position: relative;
        top: -1px;
      }
    }
  }
}
</style>
