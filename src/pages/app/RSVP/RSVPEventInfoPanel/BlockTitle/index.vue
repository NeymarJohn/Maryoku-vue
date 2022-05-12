<template>
  <div class="event-info-item-title font-size-22 font-bold-extra">
    <color-button
      v-model="value"
      class="event-info-item-icon"
      :size="size"
      :icon="icon"
      @closed="closed"
    />
    <Title :editable="editable">
      <slot />
    </Title>
  </div>
</template>
<script>
import ColorButton from "@/components/ColorButton.vue";
import Title       from "../Title/index.vue";
export default {
  components: {
    Title,
    ColorButton,
  },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: String,
    },
    icon : {
      type: String,
      required: true,
    },
    size : {
      type: Number,
      default: 42
    }
  },
  methods: {
    input ({ target }) {
      return this.$emit("input", target.value);
    },
    closed () {
      return this.$emit("closed", null);
    },
  }
};
</script>
<style lang="scss" scoped>
.event-info-item {
  &-icon {
    width           : 25px;
    height          : 25px;
    border-radius   : 21px;
    padding         : 8px;
    margin-right    : 24px;
    display         : flex;
    align-items     : center;
    justify-content : center;
    text-align      : center;
    &-background {
      width: 25px;
      height: 25px;
      left: 0px;
      top: 0px;
    }
    img {
      width: 60%;
      height: 25px;
      left: 5px;
      top: 0px;
      display: inline-block;
    }
  }
  &-title {
    min-width: 110px;
  }
}
</style>
