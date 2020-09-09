<template>
  <carousel
    :items="4"
    :margin="25"
    :dots="false"
    :nav="true"
    class="rsvp-venue-carousel"
    :number="2"
  >
    <div class="carousel-item" v-for="(item,index) in images" :key="index" >
      <img :src="item.src" />
      <div class="carousel-item-actions">
        <div class="color-white mb-20 font-bold font-size-16 button"><img :src="`${$iconURL}RSVP/Group 4854.svg`" class="mr-10"/> Delete</div>
        <div class="color-white font-bold font-size-16 button"><img :src="`${$iconURL}RSVP/Group 2344.svg`" class="mr-10"/> Replace</div>
      </div>
      
    </div>
  </carousel>
</template>
<script>
import carousel from "vue-owl-carousel";

export default {
  components: {
    carousel,
  },
  data() {
    return {
      images: [
        {
          src: `${this.$iconURL}RSVP/Image+81.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/shutterstock_444402799_thumb.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/Image+83.jpg`,
        },
        {
          src: `${this.$iconURL}RSVP/Image+84.jpg`,
        },
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
.rsvp-venue-carousel {
  .carousel-item {
    width: 290px;
    height: 170px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    .carousel-item-actions {
      display: none;
    }
    
    &:hover {
      .carousel-item-actions {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        height: max-content;
        width: max-content;
        transform: translate(-50%, -50%);
        .button {
          cursor: pointer;
          img {
            width: 20px;
            display: inline;
          }
        }
        
      }
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.52;
        background-color: #050505;
        top: 0;
        left: 0;
      }
    }
    
  }
}
</style>