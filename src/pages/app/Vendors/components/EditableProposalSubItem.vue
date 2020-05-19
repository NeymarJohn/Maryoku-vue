<template>
  <div class="editable-proposal-sub-item-wrapper" :class="[{'step-3': step == 3}]" v-if="item.requirementTitle != null">
    <template v-if="step < 3">
      <div class="item-cont">
        {{item.requirementTitle}}
      </div>
      <div class="qty-cont">
        <template v-if="!isEdit">
          {{item.priceUnit==='total' ? 1 : proposalRequest.eventData.numberOfParticipants}}
        </template>
        <template v-else>
          <input class="input-value" type="number" style="max-width: 3rem"/>
        </template>
      </div>
      <div class="price-cont">
        <template v-if="!isEdit">
          $ {{item.price | withComma}}
        </template>
        <template v-else>
          <input class="input-value" v-model="item.price" type="number" style="max-width: 6rem"/>
        </template>
      </div>
      <div class="total-cont">
        <template v-if="!isEdit">
          $ {{item.price | withComma}}
        </template>
        <template v-else>
          <input class="input-value" v-model="item.price" type="number" style="max-width: 6rem"/>
        </template>
      </div>
      <div class="action-cont">
        <template v-if="!isEdit">
          <img class="edit" :src="`${iconUrl}Asset 585.svg`" @click="isEdit=true"/>
          <img class="trash" :src="`${iconUrl}Asset 586.svg`" @click="removeRequirement(item.id)"/>
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
      removeRequirement(id) {
        this.$root.$emit('remove-proposal-requirement', id)
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
        width: 20%;
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
