<template>
  <ul v-if="files.length > 0" class="files-list">
    <li
      v-for="(file, index) in files"
      :key="file.name"
      class="files-list__item"
      :class="{ 'active' : selected === index }"
    >
      <span class="files-list__text" @click="select(index)">
        {{ file.rename || file.name }}
      </span>
      <button class="files-list__button-delete" @click="dropFile(index)">
        <md-icon class="icon-close">close</md-icon>
      </button>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    files: {
      type    : Array,
      default : Array,
    },
    selected: {
      type    : Number,
      default : -1,
    },
  },
  methods: {
    dropFile (index) {
      this.$emit("dropFile", index);
    },
    select (index) {
      this.$emit("select", index);
    },
  }
};
</script>
<style lang="scss" scoped>
.files-list {
  display       : flex;
  flex-wrap     : wrap;
  margin-Bottom : 15px;
  padding: 0;
  &__item {
    width            : 200px;
    height           : 50px;
    display          : flex;
    align-items      : center;
    justify-content  : space-around;
    margin           : 5px 15px 5px 0;
    border-radius    : 26px;
    background-color : #fff;
    box-shadow       : 0 3px 10px 0 rgba(0, 0, 0, 0.08);
    & .active {
      border : 1px solid #f51355;
    }
  }
  &__text {
    width           : 138px;
    height          : 19px;
    white-space     : nowrap;
    overflow        : hidden;
    font-size       : 14px;
    font-weight     : 600;
    font-style      : normal;
    line-height     : normal;
    letter-spacing  : 0.29px;
    text-align      : left;
    color           : #707070;
    text-overflow   : ellipsis !important;
  }
  &__button-delete {
    width  : 24px;
    height : 24px;
    cursor : pointer;
    background: transparent;
    border: none;
    .icon-close {
      vertical-align: initial;
      color  : #f51355;
    }
  }
}
</style>
