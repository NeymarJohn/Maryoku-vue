<template>
  <div
    class="schedule-menu"
  >
    <md-list v-if="open" class="menu">
      <md-list-item
        class="menu__item"
        @click="findVendors"
      >
        <div class="font-size-16 font-bold-extra">
          <img :src="`${$iconURL}Requirements/search.svg`" class="mr-10">
          Find Vendors For All Categories
        </div>
      </md-list-item>
    </md-list>

    <md-button
      class="md-icon-button schedule-menu-btn"
      @click="open = !open"
    >
      <md-icon class="schedule-menu-btn-icon">
        keyboard_arrow_down
      </md-icon>
    </md-button>
  </div>
</template>
<script>
export default {
  data: () => ({
    open: false,
  }),
  methods: {
    findVendors () {
      this.open = false;
      return this.$emit("findVendors");
    }
  }
};
</script>
<style lang="scss" scoped>
  .schedule-menu {
    position : relative;
    z-index  : 1000;
    &-btn {
      margin-top                : 0px;
      height                    : 100%;
      border-top-left-radius    : 0;
      border-bottom-left-radius : 0;
      background-color          : #f74374 !important;
      border-left               : solid #f97d9f 1px;
      &-icon {
        height    : 49px;
        font-size : 2em;
      }
    }
  }

  .menu {
    position       : absolute;
    display        : flex;
    flex-direction : column;
    top            : calc(-100% - 36px);
    right          : 0;
    min-width      : 340px;
    justify-content: center;
    padding    : 1em 0.75em 1em 0.125em;
    &__item {
      display     : flex;
      align-items : center;
      &:hover {
        background : #f74374;
        color      : #fff;
        & > * {
          transition: none;
          filter: invert(1);
        }
      }
    }
  }
</style>
