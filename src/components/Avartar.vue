<template>
  <div class="avatar-symbol" :style="`background-color:${color}`">
    {{ symbol }}
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#F51355",
    },
  },
  computed: {
    symbol() {
      const phrases = this.name.split(" ");
      if (phrases.length >= 2) {
        return `${phrases[0].substr(0, 1)}${phrases[1].substr(0, 1)}`.toUpperCase();
      }
      return phrases[0].substr(0, 2).toUpperCase();
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-symbol {
    width: 50px;
    min-width: 50px;
    height: 50px;
    margin: auto;
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    border-radius: 40px;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: color, background-color;
    will-change: color, background-color;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: normal;
    vertical-align: middle;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
