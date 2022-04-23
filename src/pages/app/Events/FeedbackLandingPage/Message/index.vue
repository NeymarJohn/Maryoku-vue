<template>
  <div v-if="show" class="feedback-message-successful">
    <Logo />
    <TextMessage />
    <Button @click="onClose" />
  </div>
</template>
<script>
import Logo        from "./Logo";
import TextMessage from "./TextMessage";
import Button      from "./Button";

export default {
  components: {
    Logo,
    TextMessage,
    Button,
  },
  props: {
    show: {
      type    : Boolean,
      default : false,
    }
  },
  methods: {
    onClose (event) {
      return this.$emit("onClose", event);
    }
  }
};
</script>
<style scoped>
  .feedback-message-successful {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    padding: 50px;
    border-radius: 30px 30px 0 0;
    background: #fff;
  }
</style>
