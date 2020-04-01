<template>
  <div class="editable-proposal-sub-item-wrapper">
    <div class="item-cont">
      {{item}}
    </div>
    <div class="qty-cont">
      {{qty}}
    </div>
    <div class="price-cont">
      {{pricePerUnit}}
    </div>
    <div class="total-cont">
      {{subtotal}}
    </div>
    <div class="action-cont">
      <md-icon>edit</md-icon>
      <md-icon>delete</md-icon>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'editable-proposal-sub-item',
    components: {
    },
    props: {
      item: String,
      qty: Number,
      pricePerUnit: Number,
      subtotal: Number,
      active: Boolean,
      isEdit: Boolean,
    },
    data () {
      return {
      }
    },
    methods: {
    },
    created() {

    },
    mounted() {
    },
    computed: {
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  .editable-proposal-sub-item-wrapper {
    display: flex;
    padding: 46px 0;
    border-top: 1px solid #050505;
    font-family: 'Manrope-Regular', sans-serif;
    font-size: 16px;
    font-weight: 600;

    div {
      &.item-cont {
        width: calc(40% + 9px);
      }
      &.qty-cont {
        width: calc(10% + 2px);
      }
      &.price-cont {
        width: calc(15% + 1px);
      }
      &.total-cont {
        width: calc(15% + 1px);
      }
      &.action-cont {
        text-align: right;
        width: 15%;
      }
    }
  }
</style>
