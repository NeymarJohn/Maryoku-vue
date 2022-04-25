<template>
  <div class="discount-form" :class="customClass">
    <div v-if="!isEditing" class="service-item">
      <div class="flex-1">
        <img :src="`${$iconURL}${icons[field]}`" style="width: 20px" class="mr-10">
        <span class="text-capitalize">{{ field }}</span>
      </div>
      <div class="text-right">
        {{ discount.percentage }}%
      </div>
      <div class="text-right">
        {{ field === 'tax' ? '': '-' }} ${{ (discount.price || calDiscount) | withComma }}
      </div>
      <div class="text-right">
        <md-button class="md-simple edit-btn" @click="toggleEditMode">
          <img :src="`${$iconURL}common/edit-dark.svg`" style="width: 20px; height: 20px">
        </md-button>
      </div>
    </div>
    <div v-else class="service-item is-edit">
      <div class="flex-1">
        <img :src="`${$iconURL}${icons[field]}`" style="width: 20px" class="mr-10">
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
    <div v-if="isEditing" class="text-right mb-10">
      <md-button class="md-simple normal-btn md-vendor" @click="cancel">
        Cancel
      </md-button>
      <md-button class="normal-btn md-vendor" @click="saveDiscount">
        Save
      </md-button>
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
    bundleDiscount: {
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
      default: "discount",
    },
    nonMaryoku:{
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    }
  },
    data() {
      return {
        icons: {
          discount: "NewSubmitPorposal/Asset 612.svg",
          tax: "NewSubmitPorposal/Asset 613.svg",
          negotiation: "NewSubmitPorposal/Asset 612.svg",
          bundle: "",
        },
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
    computed: {
      calDiscount() {
        if ( this.field === "discount" ) {
          this.discount.price = ((this.sumOfPrices * this.discount.percentage) / 100);
        } else if ( this.field === "negotiation" ) {

          this.discount.price =  Math.round(this.bundleDiscounted * Number(this.discount.percentage) / 100);
        } else if ( this.field === "tax" ) {
          console.log('val', this.editingDiscount.percentage);
          this.discount.price = this.negotiated * (Number(this.editingDiscount.percentage) / 100);
        }
        return this.discount.price;
      },
      defaultDiscounted() {
        return this.sumOfPrices * (1 - Number(this.defaultDiscount.percentage) / 100);
      },
      bundleDiscounted() {
        console.log('defaultDisocunted', this.defaultDiscounted);
        return this.bundleDiscount.isApplied ? this.defaultDiscounted - this.bundleDiscount.price : this.defaultDiscounted;
      },
      negotiated() {
        console.log('bundleDisocunted', this.bundleDiscounted);
        return this.defaultNegotiation && this.defaultNegotiation.isApplied ? this.bundleDiscounted * (1 - Number(this.defaultNegotiation.percentage) / 100)
          : this.bundleDiscounted;
      },
      sumOfPrices() {
        return this.nonMaryoku ? this.$store.getters["proposalForNonMaryoku/sumOfPrices"] :
          this.$store.getters["vendorProposal/sumOfPrices"];
      }
    },
    watch: {
      sumOfPrices(newValue, oldValue) {
        // console.log({ newValue, oldValue });
        if (newValue !== oldValue) {
          this.discount.price = (newValue * this.discount.percentage) / 100;
        }
      },
      defaultDiscount(newVal) {
        this.init();
      },
      defaultTax(newVal) {
        this.init();
      },
      bundleDiscount(newVal) {
        this.init();
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        if ( this.field === "discount" ) {
          this.discount = JSON.parse(JSON.stringify(this.defaultDiscount));
          this.editingDiscount = JSON.parse(JSON.stringify(this.defaultDiscount));
        } else if ( this.field === "negotiation" ) {
          this.discount = JSON.parse(JSON.stringify(this.defaultNegotiation));
          this.editingDiscount = JSON.parse(JSON.stringify(this.defaultNegotiation));
        } else if ( this.field === "tax" ) {
          this.discount = JSON.parse(JSON.stringify(this.defaultTax));
          this.editingDiscount = JSON.parse(JSON.stringify(this.defaultTax));
        }
      },
      toggleEditMode() {
        this.isEditing = !this.isEditing;
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
          this.editingDiscount.price = ((this.sumOfPrices - this.bundleDiscounted)  * (value / 100)).toFixed(2);
        } else if (this.field === "tax") {
          this.editingDiscount.percentage = value;
          this.editingDiscount.price = (this.negotiated * (value / 100)).toFixed(2);
        }
      },
      setPriceRange(val) {
        if (this.field === "discount") {
          this.editingDiscount.percentage = ((val / this.sumOfPrices) * 100).toFixed(2);
        } else if (this.field === "negotiation") {
          this.editingDiscount.percentage = ((val / (this.sumOfPrices - this.bundleDiscounted)) * 100).toFixed(2);
        } else if (this.field === "tax") {
          this.editingDiscount.percentage = (val / this.negotiated * 100).toFixed(2);
        }
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
      grid-template-columns: 40% 30% 30%;
    }

    input {
      font-size: 16px;
    }
  }
}
.negotiation{
    z-index: 9999;
}
</style>
