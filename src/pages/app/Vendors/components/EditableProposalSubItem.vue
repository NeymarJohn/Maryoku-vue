<template>
  <div class="editable-proposal-sub-item-wrapper">
    <div class="item-cont">
      {{item}}
    </div>
    <div class="qty-cont">
      {{qty}}
    </div>
    <div class="price-cont">
      $ {{pricePerUnit | withComma}}
    </div>
    <div class="total-cont">
      $ {{subtotal | withComma}}
    </div>
    <div class="action-cont">
      <img class="edit" src="http://static.maryoku.com/storage/icons/NewSubmitPorposal/Asset 585.svg"/>
      <img class="trash" src="http://static.maryoku.com/storage/icons/NewSubmitPorposal/Asset 586.svg"/>
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
    filters: {
      withComma (amount) {
        return amount ? amount.toLocaleString() : 0
      }
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
    padding: 46px 40px;
    border: 2px solid #d5d5d5;
    border-bottom: none;
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
        .edit {
          width: 21px;
          margin-right: 31px;
          cursor: pointer;
        }
        .trash {
          width: 21px;
          cursor: pointer;
        }
      }
    }
  }
</style>
