<template>
  <div class="discount-form">
    <div class="service-item" v-if="!isEditing">
      <div class="flex-1">
        <img :src="`${$iconURL}${icons[field]}`" style="width: 20px" class="mr-10" />
        <span class="text-capitalize">{{ field }}</span>
      </div>
      <div class="text-right">{{ discount.percentage }}%</div>
      <div class="text-right">{{field === 'tax' ? '': '-'}} ${{ (discount.price || calDiscount) | withComma }}</div>
      <div class="text-right">
        <md-button class="md-simple edit-btn" @click="toggleEditMode">
          <img :src="`${$iconURL}common/edit-dark.svg`" style="width: 20px; height: 20px" />
        </md-button>
      </div>
    </div>
    <div class="service-item is-edit" v-else>
      <div class="flex-1">
        <img :src="`${$iconURL}${icons[field]}`" style="width: 20px" class="mr-10" />
        <span class="text-capitalize">{{ field }} </span>
      </div>
      <money
        v-model="editingDiscount.percentage"
        v-bind="{
          decimal: '.',
          thousands: ',',
          prefix: '',
          suffix: ' %',
          precision: 2,
          masked: false,
        }"
        class="bundle-discount-input mr-10"
        @keyup.native="setPercentRange(editingDiscount.percentage)"
      />
      <money
        v-model="editingDiscount.price"
        v-bind="{
          decimal: '.',
          thousands: ',',
          prefix: '$ ',
          suffix: '',
          precision: 2,
          masked: false,
        }"
        class="bundle-discount-input"
        @keyup.native="setPriceRange(editingDiscount.price, field)"
      />
    </div>
    <div class="text-right mb-10" v-if="isEditing">
      <md-button class="md-simple normal-btn md-vendor" @click="cancel">Cancel</md-button>
      <md-button class="normal-btn md-vendor" @click="saveDiscount">Save</md-button>
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
    defaultNegotiation: {
      type: Object,
      default: () => {},
    },
    defaultTax: {
      type: Object,
      default: () => {},
    },
    field: {
      type: String,
      default: 'discount',
    },
    nonMaryoku:{
      type: Boolean,
      default: false,
    }
  },
    data() {
      return {
        icons: {
          discount: 'NewSubmitPorposal/Asset 612.svg',
          tax: 'NewSubmitPorposal/Asset 613.svg',
          negotiation: 'NewSubmitPorposal/Asset 612.svg',
          bundle: '',
        },
        // discount: this.defaultDiscount,
        discount: {
          percentage: 0,
          price: 0,
        },
        editingDiscount: {
          percentage: 0,
          price: 0,
        },
        isEditing: false,
      };
    },
    created() {
      if ( this.field === 'discount' ) {
        this.discount = JSON.parse(JSON.stringify(this.defaultDiscount))
        this.editingDiscount = JSON.parse(JSON.stringify(this.defaultDiscount))
      } else if ( this.field === 'negotiation' ) {
        this.discount = JSON.parse(JSON.stringify(this.defaultNegotiation))
        this.editingDiscount = JSON.parse(JSON.stringify(this.defaultNegotiation))
      } else if ( this.field === 'tax' ) {
        this.discount = JSON.parse(JSON.stringify(this.defaultTax))
        this.editingDiscount = JSON.parse(JSON.stringify(this.defaultTax))
      }
    },
    methods: {
      toggleEditMode() {
        this.isEditing = !this.isEditing
      },
      cancel() {
        this.isEditing = false;
        this.editingDiscount = { ...this.discount };
      },
      saveDiscount() {
        this.$emit("saveDiscount", this.editingDiscount);
        this.isEditing = false;
        this.discount = { ...this.editingDiscount };
      },
      setPercentRange(value) {
        if (value > 100) value = 100;
        if (value < 0) value = 0;
        if (this.field === "discount") {
          this.editingDiscount.percentage = value;
          this.editingDiscount.price = (this.sumOfPrices * (value / 100)).toFixed(2);
        }
        if (this.field === "negotiation") {
          this.editingDiscount.percentage = value;
          this.editingDiscount.price = ((this.sumOfPrices - this.defaultDiscount.price)  * (value / 100)).toFixed(2);
        } else if (this.field === "tax") {
          this.editingDiscount.percentage = value;
          this.editingDiscount.price = (
            (
              this.sumOfPrices -
              this.defaultDiscount.price -
              (this.defaultNegotiation && this.defaultNegotiation.isApplied ? this.defaultNegotiation.price : 0)
          ) * (value / 100)).toFixed(2);
        }
      },
      setPriceRange(val) {
        if (this.field === "discount") {
          this.editingDiscount.percentage = ((val / this.sumOfPrices) * 100).toFixed(2);
        } else if (this.field === 'negotiation') {
          this.editingDiscount.percentage = ((val / (this.sumOfPrices - this.defaultDiscount.price)) * 100).toFixed(2);
        } else if (this.field === "tax") {
          this.editingDiscount.percentage = ((val / (this.sumOfPrices - this.defaultDiscount.price -
            (this.defaultNegotiation && this.defaultNegotiation.isApplied ? this.defaultNegotiation.price : 0))) * 100).toFixed(2);
        }
      },
    },
    watch: {
      sumOfPrices(newValue, oldValue) {
        // console.log({ newValue, oldValue });
        if (newValue !== oldValue) {
          this.discount.price = (newValue * this.discount.percentage) / 100;
          // this.tax.price = ((newValue - this.discount.price) * this.tax.percentage) / 100;
        }
      },
    },
    computed: {
      calDiscount() {
        if ( this.field === 'discount' ) {
          this.discount.price = ((this.sumOfPrices * this.discount.percentage) / 100)
        } else if ( this.field === 'negotiation' ) {
          const discountedTotal = this.sumOfPrices * (1 - this.defaultDiscount.percent / 100);
          this.discount.price =  Math.round(discountedTotal * this.discount.percent / 100);
        } else if ( this.field === 'tax' ) {
          const discountedTotal = this.sumOfPrices * (this.defaultDiscount.percentage / 100);
          const negotiatedTotal = this.defaultNegotiation && this.defaultNegotiation.isApplied ? discountedTotal * (1 - this.defaultNegotiation.percent / 100) : discountedTotal;
          console.log({
            discountedTotal,
            negotiatedTotal
          });
          this.discount.price = (this.sumOfPrices - negotiatedTotal) * (this.editingDiscount.percentage / 100)
        }
        return this.discount.price;
      },
      sumOfPrices() {
        return this.nonMaryoku ? this.$store.getters["proposalForNonMaryoku/sumOfPrices"] :
          this.$store.getters["vendorProposal/sumOfPrices"]
      }
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
      grid-template-columns: 40% 30% 30%;
    }

    input {
      font-size: 16px;
    }
  }
}
</style>
