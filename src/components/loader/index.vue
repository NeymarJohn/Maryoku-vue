<template>
    <vue-element-loading :active="active" :isFullScreen="isFullScreen" style="height: 100vh">
      <img :src="`${imgUrl}`" width="150">
    </vue-element-loading>
</template>
<script>
import VueElementLoading from "vue-element-loading";
export default {
  name: 'loader',
  components:[
      VueElementLoading,
  ],
  props: {
    active:{
      type: Boolean,
      required: true,
    },
    isFullScreen: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data(){
    return {
      loaders: [
          '/static/icons/loader/Bus.gif',
          '/static/icons/loader/Dish.gif',
          '/static/icons/loader/Screen.gif',
          '/static/icons/loader/Venue.gif',
      ]
    }
  },
  computed:{
    imgUrl(){
        return this.loaders[Math.ceil(Math.random() * 10) % 4];
    }
  }
}
</script>
