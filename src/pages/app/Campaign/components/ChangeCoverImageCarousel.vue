<template>
  <div class="change-cover-images-carousel">
    <carousel
      v-if="count"
      :key="count"
      :items="items"
      :nav="false"
      :dots="false"
      :margin="22"
      :auto-width="true"
      class="carousel"
      :number="2"
      @changed="$emit('changed', $event)"
    >
      <template v-if="showButtonActions" slot="prev">
        <md-button id="carousel-btn-prev" class="edit-btn carousel-btn-prev nav-btn btn-just-icon nav-left md-round md-raised md-white">
          <md-icon class="btn-prev-icon-arrow-left left">
            keyboard_arrow_left
          </md-icon>
        </md-button>
      </template>
      <div
        v-for="(item, index) in images"
        :key="index + item.url"
        :class="{
          'carousel-item': true,
          'cursor-pointer': true,
          'carousel-selected-item': index === selectedIndex,
          'carousel-first-item': index === 0,
          'carousel-last-item': index === (count - 1),
        }"
        @click="handleClickItem(index)"
      >
        <img
          :src="item.url"
          :class="['carousel-item-image', 'md-image', classImage]"
        >
      </div>
      <template v-if="showButtonActions && images.length > items" slot="next">
        <md-button id="carousel-btn-next" class="edit-btn carousel-btn-next nav-btn btn-just-icon nav-right md-round md-raised md-white">
          <md-icon class="btn-next-icon-arrow-right right">
            keyboard_arrow_right
          </md-icon>
        </md-button>
      </template>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  name: "ChangeCoverImageCarousel",
  components: {
    carousel,
  },
  props: {
    items :{
      type    : Number,
      default : 5,
    },
    showButtonActions: {
      type    : Boolean,
      default : true,
    },
    disableFilter: {
      type    : Boolean,
      default : false,
    },
    images: {
      type    : Array,
      default : () => [],
    },
    classImage: {
      type    : String,
      default : "",
    },
    selectedIndex: {
      type    : Number,
      default : 0,
    },
  },
  computed: {
    count () {
      return this.images.length;
    }
  },
  methods: {
    handleClickItem(index) {
      this.$emit("select-image", index);
    }
  },
};
</script>

<style lang="scss" scoped>
.change-cover-images-carousel {
  position: relative;
}

.owl-stage:first-child {
  margin-left: 0 !important;
}

.owl-stage:last-child {
  margin-right: 0 !important;
}

.owl-stage.owl-item {
  margin: 0 22px !important;
}

.carousel {
  width: 950px;
  height: 85px;

  & .carousel-item {
    width  : 174px;
    height : 85px;
    border : solid 5px #fff;
  }

  & .carousel-first-item {
    margin-left: 0;
  }

  & .carousel-last-item {
    margin-right: 0;
  }

  .carousel-selected-item {
    border: solid 5px #000;
  }

  .carousel-item-image {
    width: 170px;
    height: 75px;
    object-fit: cover;
  }

  .carousel-btn-next,
  .carousel-btn-prev {
    justify-content: center;
    width: 28px;
    height: 28px;

    .btn-prev-icon-arrow-left,
    .btn-next-icon-arrow-right {
      font-size: 28px !important;
      color: #000 !important;

      &.left {
        margin-right: 2px;
      }

      &.right {
        margin-left: 2px;
      }
    }
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    padding: 0;
    background: initial;
    border: none;
    outline: none;

    &.nav-right {
      top: 40px;
      right: 10px;
    }
    &.nav-left {
      top: 40px;
      left: 10px;
    }
  }
}
</style>
