<template>
  <div class="discount-form">
    <div class="service-item" v-if="!isDiscountEditing">
      <div class="flex-1">
        <img :src="`${$iconURL}NewSubmitPorposal/Asset 612.svg`" style="width: 20px" class="mr-10" />
        <span>Discount</span>
      </div>
      <div class="text-right">{{ discount.percentage }}%</div>
      <div class="text-right">${{ discount.price || calcedDiscont | withComma | withComma }}</div>
      <div class="text-right">
        <md-button class="md-simple edit-btn" @click="isDiscountEditing = true">
          <img :src="`${$iconURL}common/edit-dark.svg`" style="width: 20px; height: 20px" />
        </md-button>
      </div>
    </div>
    <div class="service-item is-edit" v-else>
      <div class="flex-1">
        <img :src="`${$iconURL}NewSubmitPorposal/Asset 612.svg`" style="width: 20px" class="mr-10" />
        <span>Discount</span>
      </div>
      <money
        v-model="discount.percentage"
        v-bind="{
          decimal: '.',
          thousands: ',',
          prefix: '% ',
          suffix: '',
          precision: 2,
          masked: false,
        }"
        class="bundle-discount-input mr-10"
        @keyup.native="setPercentRange(discount.percentage, 'discount')"
      />
      <money
        v-model="discount.price"
        v-bind="{
          decimal: '.',
          thousands: ',',
          prefix: '$ ',
          suffix: '',
          precision: 2,
          masked: false,
        }"
        class="bundle-discount-input"
        @keyup.native="setPriceRange(discount.price, 'discount')"
      />
      <div class="d-flex justify-content-between ml-10">
        <md-button class="md-simple edit-btn md-red" @click="isDiscountEditing = false">Cancel</md-button>
        <md-button class="md-simple edit-btn md-red" @click="saveDiscount">Save</md-button>
      </div>
    </div>
    <div class="service-item" v-if="!isTaxEditing">
      <div class="flex-1">
        <img :src="`${$iconURL}NewSubmitPorposal/Asset 613.svg`" style="width: 20px" class="mr-10" />
        <span>Taxes</span>
      </div>
      <div class="text-right">
        <span>{{ tax.percentage }}%</span>
      </div>
      <div class="text-right">{{ tax.price || Math.round((totalPrice * tax.percentage) / 100) | withComma }}$</div>
      <div class="text-right">
        <md-button class="md-simple edit-btn" @click="isTaxEditing = true">
          <img :src="`${$iconURL}common/edit-dark.svg`" style="width: 20px; height: 20px" />
        </md-button>
      </div>
    </div>
    <div class="service-item is-edit" v-else>
      <div class="flex-1">
        <img :src="`${$iconURL}NewSubmitPorposal/Asset 613.svg`" style="width: 20px" class="mr-10" />
        <span>Taxes</span>
      </div>
      <money
        v-model="tax.percentage"
        v-bind="{
          decimal: '.',
          thousands: ',',
          prefix: '% ',
          suffix: '',
          precision: 2,
          masked: false,
        }"
        class="bundle-discount-input mr-10"
        @keyup.native="setPercentRange(tax.percentage, 'tax')"
      />
      <money
        v-model="tax.price"
        v-bind="{
          decimal: '.',
          thousands: ',',
          prefix: '$ ',
          suffix: '',
          precision: 2,
          masked: false,
        }"
        class="bundle-discount-input"
        @keyup.native="setPriceRange(tax.price, 'tax')"
      />
      <div class="d-flex justify-content-between ml-10">
        <md-button class="md-simple edit-btn md-red" @click="isTaxEditing = false">Cancel</md-button>
        <md-button class="md-simple edit-btn md-red" @click="saveTax">Save</md-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    defaultDiscount: {
      type: Object,
      default: () => {},
    },
    defaultTax: {
      type: Object,
      default: () => {},
    },
    totalPrice: {
      type: Number,
      defalut: 0,
    },
  },
  data() {
    return {
      tax: {
        percentage: 0,
        price: 0,
      },
      discount: {
        percentage: 0,
        price: 0,
      },
      isTaxEditing: false,
      isDiscountEditing: false,
    };
  },
  created() {
    if (this.defaultTax) this.tax = this.defaultTax;
    if (this.defaultDiscount) this.discount = this.defaultTax;
  },
  methods: {
    saveDiscount() {
      this.$emit("saveDiscount", this.discount);
      this.isDiscountEditing = false;
    },
    saveTax() {
      this.$emit("saveTax", this.tax);
      this.isTaxEditing = false;
    },
    setPercentRange(value, type) {
      if (value > 100) value = 100;
      if (value < 0) value = 0;
      if (type === "discount") {
        this.discount.percentage = value;
        this.discount.price = (this.totalPrice * (value / 100)).toFixed(2);
      } else if (type === "tax") {
        this.tax.percentage = value;
        this.tax.price = (this.totalPrice * (value / 100)).toFixed(2);
      }
    },
    setPriceRange(val, type) {
      if (type === "discount") {
        this.discount.percentage = ((val / this.totalPrice) * 100).toFixed(2);
      } else if (type === "tax") {
        this.tax.percentage = ((val / this.totalPrice) * 100).toFixed(2);
      }
    },
    setRange(value, type) {
      let val = value;
      if (type == "discount_percentage") {
        if (value > 100) {
          val = 100;
        }
        if (value < 0) {
          val = 0;
        }
      }
      if (type == "tax") {
        this.tax = val;
        this.discount_by_amount = 0;
      } else if (type == "discount_by_amount") {
        this.discount.percentage = ((val / this.totalPrice) * 100).toFixed(2);
      } else {
        this.discount.price = ((this.totalPrice * val) / 100).toFixed(0);
      }
    },
  },
  watch: {
    defaultTax(newValue, oldValue) {
      this.tax = this.defaultTax;
    },
    defaultDiscount(newValue, oldValue) {
      this.discount = newValue;
    },
  },
  computed: {
    calcedTax() {
      return Math.round(((this.totalPrice - this.calcedDiscont) * this.tax.percentage) / 100);
    },
    calcedDiscont() {
      if (this.discount.price) return this.discount.price;
      return Math.round((this.totalPrice * this.discount.percentage) / 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.discount-form {
  .service-item {
    color: #818080;
    border-top: solid 1px #d3d3d3;
    padding: 20px 0;
    display: grid;
    grid-template-columns: 30% 30% 30% 10%;
    font-weight: bold;
    align-items: center;
    &.is-edit {
      grid-template-columns: 25% 25% 25% 25%;
    }
    input {
      font-size: 16px;
    }
  }
}
</style>
