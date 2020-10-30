<template>
  <div class="d-flex food-limitaions">
    <div v-for="(item, index) in data" :key="index" class="flex-1 food-limit-item text-center"> 
      <img :src="`${$iconURL}${item.icon}`" v-if="item.icon"/>
      <br/>
      {{item.label}}
      <br/>
      ({{item.value}})
    </div>
    
  </div>  
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: [] 
    },
  },
}
</script>
<style lang="scss" scoped>
.food-limitaions {
  .food-limit-item {
    height: 100px;
    border-right: solid 1px #a0a0a0;
    padding: 5px;
    &:last-child {
      border: none;
    }
  }
}
</style>