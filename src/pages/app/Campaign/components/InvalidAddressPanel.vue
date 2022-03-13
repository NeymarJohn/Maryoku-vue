<template>
  <div class="invalid-address-panel d-flex">
    <img :src="`${$iconURL}Campaign/enter-gray.svg`" class="mr-20">
    <div class="invalid-address-panel-content flex-1">
      <div class="invalid-address-panel-header">
        <img :src="`${$iconURL}Campaign/warning-white.svg`" class="mr-10">
        <span v-if="type=='phone'" class="font-size-14 font-bold">Valid format is ###-##-######:</span>
        <span v-if="type=='email'" class="font-size-14 font-bold">Valid format is example@mail.com:</span>
      </div>
      <div class="invalid-address-panel-message">
        {{ content }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.invalid-address-panel {
  align-items: flex-start;
  width: 100%;
  &-content {
    background-color: #ffe1e9;
    border-radius: 1px;
    padding: 25px;
    font-size: 14px;
  }
}
</style>
