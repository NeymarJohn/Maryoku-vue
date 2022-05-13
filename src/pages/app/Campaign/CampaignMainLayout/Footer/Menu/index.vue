<template>
  <div
    class="schedule-menu"
  >
    <md-list v-if="open" class="menu">
      <md-list-item
        class="menu__item"
        @click="save"
      >
        <Icon src="Campaign/Group 1908.svg">
          Save Draft
        </Icon>
      </md-list-item>
      <md-list-item
        class="menu__item"
        @click="start"
      >
        <Icon src="Campaign/group-2428.svg">
          Send Now
        </Icon>
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
import Icon from "../Icon";

export default {
  components: {
    Icon,
  },
  data: () => ({
    open: false,
  }),
  methods: {
    start() {
      return this.$emit("start");
    },
    save () {
      this.open = false;
      return this.$emit("save");
    }
  }
};
</script>
<style lang="scss" scoped>
  .schedule-menu {
    position: relative;
    z-index: 1000;
    &-btn {
      margin-top: 0px;
      height: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      background-color: #f74374 !important;
      border-left: solid #f97d9f 1px;
      &-icon {
        height: 49px;
        font-size: 2em;
      }
    }
  }

  .menu {
    position       : absolute;
    display        : flex;
    flex-direction : column;
    top            : calc(-200% - 16px);
    right          : 0;
    width          : 300px;
    justify-content: center;
    &__item {
      display: flex;
      align-items: center;
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
