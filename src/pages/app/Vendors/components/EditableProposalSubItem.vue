<template>
  <div class="editable-proposal-sub-item-wrapper" :class="[{'step-3': step == 3}]" v-if="item.requirementTitle != null">
    <template v-if="step < 3">
      <div class="item-cont">
        {{item.requirementTitle}}
      </div>
      <div class="qty-cont">
        <template v-if="!isEdit">
          {{item.priceUnit==='total' ? 1 : item.requirementValue}}
        </template>
        <template v-else>
          <input class="input-value" type="number"/>
        </template>
      </div>
      <div class="price-cont">
        <template v-if="!isEdit">
          $ 
          {{
            item.priceUnit != 'total' ? parseFloat(String(item.price).replace(/,/g, '')) / item.requirementValue : 
                                        item.price | withComma
          }}
        </template>
        <template v-else>
          <input class="input-value" v-model="item.price" type="number"/>
        </template>
      </div>
      <div class="total-cont">
        <template v-if="!isEdit">
          $ {{item.price | withComma}}
        </template>
        <template v-else>
          <input class="input-value" v-model="item.price" type="number"/>
        </template>
      </div>
      <div class="action-cont">
        <template v-if="!isEdit">
          <img class="edit" :src="`${iconUrl}Asset 585.svg`" @click="isEdit=true"/>
          <img class="trash" :src="`${iconUrl}Asset 586.svg`" @click="removeRequirement(item)"/>
        </template>
        <template v-else>
          <a class="cancel" @click="cancel()">Cancel</a>
          <a class="save" @click="save()">Save</a>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="whole-cont">
        <span>{{item}}</span>
        <span>{{qty}}</span>
        <span>$ {{pricePerUnit | withComma}}</span>
        <span>$ {{subtotal | withComma}}</span>
      </div>
      <div class="action-cont" v-if="isHover">
        <img class="edit" :src="`${iconUrl}Asset 585.svg`"/>
        <img class="trash" :src="`${iconUrl}Asset 586.svg`" @click="removeRequirement(item.id)"/>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'editable-proposal-sub-item',
    components: {
    },
    props: {
      item: Object,
      active: Boolean,
      step: Number,
    },
    data () {
      return {
        isHover: false,
        isEdit: false,
        iconUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
      }
    },
    methods: {
      removeRequirement(item) {
        this.$root.$emit('remove-proposal-requirement', item)
      },
      save() {
        this.isEdit = false
      },
      cancel() {
        this.isEdit = false
      }
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
    padding: 46px 40px;
    border: 2px solid #d5d5d5;
    border-bottom: none;
    font-family: 'Manrope-Regular', sans-serif;
    font-size: 16px;
    font-weight: 600;
    display: grid;
    grid-template-columns: 30% 10% 17.5% 17.5% 25%;
    align-items: center;

    div {
      &.item-cont {
        text-transform: capitalize;
      }
      &.qty-cont {
        input {
          width: 80%;
        }
      }
      &.price-cont {
        input {
          width: 80%;
        }
      }
      &.total-cont {
        input {
          width: 80%;
        }
      }
      &.action-cont {
        text-align: right;
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
    .whole-cont {
      width: 100%;
      span {
        display: inline-block;
        font-size: 16px;
        font-weight: 800;

        &:first-child {
          width: calc(100% - 364px - 155px - 150px);
        }
        &:nth-child(2) {
          margin-right: 190px;
        }
        &:nth-child(3) {
          margin-right: 205px;
        }
        &:last-child {
          margin-right: 155px;
        }
      }
    }
    &.step-3 {
      border: none;
      border-top: 1px solid #818080;
      margin: 0 38px;
      padding: 50px 0;      

      .whole-cont { 
        span {
          font-weight: normal;
        }
      }
    }
    .input-value {
      border: 1px solid #dddddd;
      text-align: center;
    }
    a {
      cursor: pointer;
      padding: 8px 26px;

      &.cancel {
        font: 800 16px 'Manrope-Regular', sans-serif;
        color: #050505;
        background: transparent;
      }
      &.save {
        font: 800 16px 'Manrope-Regular', sans-serif;
        color: white;
        background: #f51355;
        border-radius: 3px;
      }
      &:hover {
        color: #dddddd!important;
      }
    }
  }
</style>
