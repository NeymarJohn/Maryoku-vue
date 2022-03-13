<template>
  <md-card class="md-card-product"
           :data-count="hoverCount"
           @mouseleave.native="onMouseLeave"
  >
    <md-card-header
      :data-header-animation="headerAnimation"
      :class="[{hovered: imgHovered}, {hinge: headerDown}, {fadeInDown: fixedHeader}]"
      class="md-card-header-image animated"
      @mouseenter.native="onMouseOver"
    >
      <slot name="imageHeader" />
    </md-card-header>

    <md-card-content>
      <div v-if="headerAnimation === 'true'" class="md-card-action-buttons text-center">
        <!--<md-button class="md-danger md-simple fix-broken-card" @click="fixHeader" v-if="headerDown">
          <slot name="fixed-button"></slot> Fix Header!
        </md-button>
        <md-button class="md-purple md-xs md-round md-just-icon">
          <slot name="first-button"></slot>
        </md-button>
        <md-button class="md-info md-xs md-round md-just-icon">
          <slot name="second-button"></slot>
        </md-button>
        <md-button class="md-warning md-xs md-round md-just-icon">
          <slot name="third-button"></slot>
        </md-button>
          <md-button class="md-danger md-xs md-round md-just-icon">
              <slot name="fourth-button"></slot>
          </md-button>-->
        <slot name="card-buttons" />
      </div>
      <slot name="title" />
      <slot name="description" />
    </md-card-content>

    <md-card-actions md-alignment="space-between">
      <slot name="footer" />
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    headerAnimation: {
      type: String,
      default: "true"
    }
  },
  data () {
    return {
      hoverCount: 0,
      imgHovered: false,
      fixedHeader: false
    };
  },
  computed: {
    headerDown () {
      return false; // this.hoverCount > 15;
    }
  },
  methods: {
    headerBack: function () {
      this.fixedHeader = false;
    },
    fixHeader: function () {
      this.hoverCount = 0;
      this.fixedHeader = true;

      setTimeout(this.headerBack, 480);
    },
    onMouseOver: function () {
      if (this.headerAnimation === "true") {
        this.imgHovered = true;
        this.hoverCount++;
      }
    },
    onMouseLeave: function () {
      if (this.headerAnimation === "true") {
        this.imgHovered = false;
      }
    }
  }
};
</script>

<style lang="scss">
</style>
