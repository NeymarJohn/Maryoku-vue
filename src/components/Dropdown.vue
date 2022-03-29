<template>
  <div v-click-outside="closeDropDown"
       :class="[
         {open:isOpen},
         {'dropdown': direction === 'down'},
         {'dropup': direction ==='up'}
       ]" @click="toggleDropDown" @mouseover="hoverToggleDropDown"
       @mouseout="hoverToggleDropDown"
  >
    <slot name="title">
      <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">
        <i :class="icon" />
        <p class="notification">{{ title }}
          <b class="caret" />
        </p>
      </a>
    </slot>
    <slot />
  </div>
</template>
<script>
export default {
  name: "DropDown",
  props: {
    direction: {
      type: String,
      default: "down"
    },
    multiLevel: {
      type: Boolean,
      default: false
    },
    title: String,
    icon: String,
    hover: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleDropDown () {
      if (!this.hover) {
        if (this.multiLevel) {
          this.isOpen = true;
        } else {
          this.isOpen = !this.isOpen;
        }
      }
    },
    hoverToggleDropDown () {
      if (this.hover) {
        if (this.multiLevel) {
          this.isOpen = true;
        } else {
          this.isOpen = !this.isOpen;
        }
      }
    },
    closeDropDown () {
      this.isOpen = false;
    }
  }
};
</script>
