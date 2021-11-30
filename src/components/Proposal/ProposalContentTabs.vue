<template>
    <div class="md-layout md-elevation-1">
        <div
            v-for="option in options"
            class="md-layout-item text-center font-size-14 border-right p-5 flex-1"
            :class="option.value === selected ? 'active' : ''"
            @click="select(option.value)">
                <img :src="`${$iconURL}${option.icon}`" width="20px" />
                <div class="mt-10">{{ option.title }}</div>
        </div>
    </div>
</template>
<script>
   export default {
      props: {
         options: {
           type: Array,
         },
         selected: {
           type: Number,
           default: 0,
         }
      },
      methods: {
        select(value){
            this.$emit('select', value);
        }
      }
   }
</script>
<style lang="scss" scoped>
.active{
  border-bottom: 4px solid #f51355;
  color: #f51355;
}
.border-right{
    border-right: 1px solid #d5d5d5;
}
</style>
