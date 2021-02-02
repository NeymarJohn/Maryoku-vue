<template>
  <div
    class="editable-proposal-sub-item-wrapper"
    :class="[{ 'step-3': step == 3 }]"
    v-if="item.requirementTitle != null"
  >
    <template v-if="step < 3">
      <div class="item-cont">
        {{ item.requirementTitle }}
        <span class="madatory-badge" v-if="item.isMandatory">Mandatory</span>
        <span class="complementary-badge" v-else>Complementary</span>
      </div>
      <div class="size-cont editor-wrapper">
        <template v-if="!isEdit">{{ item.requirementSize }}</template>
        <template v-else>
          <input class="input-value" type="text" v-model="item.requirementSize" />
        </template>
      </div>
      <div class="qty-cont editor-wrapper">
        <template v-if="!isEdit">{{ item.priceUnit === "total" ? 1 : item.requirementValue }}</template>
        <template v-else>
          <input class="input-value" type="number" v-model="item.requirementValue" />
        </template>
      </div>
      <div class="price-cont editor-wrapper">
        <template v-if="!isEdit">
          $
          {{
            item.priceUnit == "total"
              ? parseFloat(String(item.price).replace(/,/g, "")) / item.requirementValue
              : item.price | withComma
          }}
        </template>
        <template v-else>
          <money
            v-model="item.price"
            v-bind="{
              decimal: '.',
              thousands: ',',
              prefix: '$ ',
              suffix: '',
              precision: 2,
              masked: false,
            }"
            class="input-value"
          />
        </template>
      </div>
      <div class="total-cont editor-wrapper">
        <template v-if="!isEdit"
          >$ {{ item.priceUnit == "total" ? item.price : (item.price * item.requirementValue) | withComma }}</template
        >
        <template v-else>
          <!-- <input class="input-value" v-model="item.price" type="number" /> -->
          <money
            v-if="item.priceUnit == 'total'"
            v-model="item.price"
            v-bind="{
              decimal: '.',
              thousands: ',',
              prefix: '$ ',
              suffix: '',
              precision: 2,
              masked: false,
            }"
            class="input-value"
          />
          <div>$ {{ subTotal }}</div>
        </template>
      </div>
      <div class="action-cont editor-wrapper">
        <template v-if="!isEdit">
          <img class="edit" :src="`${iconUrl}Asset 585.svg`" @click="isEdit = true" />
          <img class="trash" :src="`${iconUrl}Asset 586.svg`" @click="removeRequirement(item)" />
        </template>
        <template v-else>
          <a class="cancel" @click="cancel()">Cancel</a>
          <a class="save" @click="save(item)">Save</a>
        </template>
      </div>
    </template>
    <template v-else>
      <span class="grid-cell">{{ item.requirementTitle }}</span>
      <span class="grid-cell">{{ item.requirementValue }}</span>
      <span class="grid-cell">$ {{ (item.price / item.requirementValue) | withComma }}</span>
      <span class="grid-cell">$ {{ item.price | withComma }}</span>
      <div class="action-cont" v-if="isHover">
        <img class="edit" :src="`${iconUrl}Asset 585.svg`" />
        <img class="trash" :src="`${iconUrl}Asset 586.svg`" @click="removeRequirement(item.id)" />
      </div>
    </template>
  </div>
</template>
<script>
import { Money } from "v-money";

export default {
  name: "editable-proposal-sub-item",
  components: {
    Money,
  },
  props: {
    item: Object,
    active: Boolean,
    step: Number,
    index: Number,
  },
  data() {
    return {
      isHover: false,
      isEdit: false,
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/NewSubmitPorposal/",
    };
  },
  computed: {
    subTotal() {
      console.log("subtotal");
      return this.item.price * this.item.requirementValue;
    },
  },
  methods: {
    removeRequirement(item) {
      this.$root.$emit("remove-proposal-requirement", item);
      this.$emit("remove", this.index);
    },
    save(item) {
      this.isEdit = false;
      this.$root.$emit("save-proposal-requirement", { index: this.index, item });
      this.$emit("save", { index: this.index, item });
    },
    cancel() {
      this.isEdit = false;
    },
  },
  created() {},
  mounted() {
    console.log(this.item);
  },
  filters: {
    withComma(amount) {
      return amount ? amount.toLocaleString() : 0;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.editable-proposal-sub-item-wrapper {
  padding: 46px 40px;
  border: 2px solid #d5d5d5;
  border-bottom: none;
  font-family: "Manrope-Regular", sans-serif;
  font-size: 16px;
  font-weight: 600;
  display: grid;
  grid-template-columns: 30% 10% 10% 12% 15% 23%;
  align-items: center;
  .madatory-badge {
    color: #f51355;
    font-weight: normal;
    font-size: 0.75em;
    display: inline-block;
    border: solid 1px #f51355;
    padding: 4px 8px;
    border-radius: 30px;
    margin-left: 0.5em;
    line-height: 1em;
  }
  .complementary-badge {
    color: #ba8d05;
    font-weight: normal;
    font-size: 0.75em;
    display: inline-block;
    border: solid 1px #ba8d05;
    padding: 4px 8px;
    border-radius: 30px;
    margin-left: 0.5em;
    line-height: 1em;
  }
  div {
    &.item-cont {
      text-transform: capitalize;
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
  &.step-3 {
    border: none;
    border-top: 1px solid #818080;
    margin: 0 38px;
    padding: 50px 0;
    grid-template-columns: 40% 15% 15% 15% 15%;

    .whole-cont {
      span {
        font-weight: normal;
      }
    }
  }
  .editor-wrapper {
    margin: 0 5px;
    text-align: center;
    .input-value {
      border: 1px solid #dddddd;
      text-align: center;
      width: 100%;
    }
  }

  a {
    cursor: pointer;
    padding: 8px 26px;

    &.cancel {
      font: 800 16px "Manrope-Regular", sans-serif;
      color: #050505;
      background: transparent;
    }
    &.save {
      font: 800 16px "Manrope-Regular", sans-serif;
      color: white;
      background: #f51355;
      border-radius: 3px;
    }
    &:hover {
      color: #dddddd !important;
    }
  }
  span {
    &.grid-cell {
      font-size: 16px;
      font-weight: normal;

      &:first-child {
        text-transform: capitalize;
      }
    }
  }
}
</style>
