<template>
  <div class="vendor-category-editor" :class="[{ 'border-bottom': borderBottom }]">
    <div class="left" :class="[{ 'full-width': isEdit }]">
      <div class="title">{{ title }}<span v-if="required"> *</span></div>
      <div v-if="isEdit">
        <div class="d-flex position-relative" v-for="(item, index) of selectedValue" :key="index">
          <img class="inside-img" :src="img" v-if="img != '' && field !== 'vendorCategories'"/>
          <category-selector
                  v-if="field === 'vendorCategories'"
                  :value="item || ''"
                  :categories="vendorCategories"
                  column="2"
                  trackBy="value"
                  class="my-10 w-max-450"
                  @change="updateCategory(index, ...arguments)"
          >
          </category-selector>
          <vue-google-autocomplete
                  v-else-if="field === 'vendorAddresses'"
                  :id="`map-${index}`"
                  ref="address"
                  class="my-10 width-100 address"
                  :placeholder="item ? item : 'Enter an an address, zipcode, or location'"
                  v-on:placechanged="getAddressData(index, ...arguments)"
          />
          <img class="ml-10" src="https://static-maryoku.s3.amazonaws.com/storage/icons/Requirements/delete-dark.svg" v-if="selectedValue.length > 1" @click="removeValue(index)">
        </div>
        <div class="d-flex align-center py-10 color-red font-bold cursor-pointer" @click="addNewValue">
          <img class="mr-10" src="https://static-maryoku.s3.amazonaws.com/storage/icons/VendorSignup/Group%209632.svg">
          Add another category</div>
      </div>
      <div v-else>
        <template v-if="selectedValue.length">
          <div class="content mt-10" v-for="item of selectedValue">
              <img class="mr-10" :src="vendorCategories.find(v => v.value === item).icon" v-if="field === 'vendorCategories' && item"/>
              <img class="mr-10" :src="img" v-if="img != '' &&  item" />
              {{ item }}
          </div>
        </template>
      </div>
      <div class="action-cont" :class="{'width-66': field === 'vendorCategories'}" v-if="isEdit">
        <a class="cancel" @click="isEdit = false">Cancel</a>
        <a class="save" @click="save()">Save</a>
      </div>
    </div>
    <div class="right" v-if="!isEdit">
      <a @click="isEdit = true">
        Edit
        <md-icon>navigate_next</md-icon>
      </a>
    </div>
  </div>
</template>
<script>

import VueGoogleAutocomplete from "vue-google-autocomplete";
import CategorySelector from "@/components/Inputs/CategorySelector";

export default {
  name: "v-signup-editable-field",
  components:{
    VueGoogleAutocomplete,
    CategorySelector,
  },
  props: {
    title: String,
    field: String,
    img: String,
    borderBottom: Boolean,
    required: {
      type: Boolean,
      default: false,
    },
    value: [String, Array]
  },
  data: () => ({
    isEdit: false,
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    categoryIconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/",
    vendorCategories: [
      {
        name: "Venue Rental",
        value: "venuerental",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/venuerental.svg`,
      },
      {
        name: "Food & Beverage",
        value: "foodandbeverage",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/foodandbeverage.svg`,
      },
      {
        name: "Design and Decor",
        value: "decor",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/decor.svg`,
      },
      {
        name: "Guest Services & Staffing",
        value: "corporatesocialresponsibility",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/corporatesocialresponsibility.svg`,
      },
      {
        name: "Signage / Printing",
        value: "signageprinting",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/signageprinting.svg`,
      },
      // {
      //   name: 'Advertising and Promotion',
      //   value: 'advertising-promotion',
      //   icon: 'advertising-promotion.svg'
      // },
      {
        name: "AV / Staging",
        value: "audiovisualstagingservices",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/audiovisualstagingservices.svg`,
      },
      {
        name: "Swags",
        value: "swags",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/swags.svg`,
      },
      // {
      //   name: 'Shipping',
      //   value: 'shipping',
      //   icon: 'shipping.svg'
      // },
      {
        name: "Transportation & Tour operator",
        value: "transportation",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/transportation.svg`,
      },
      {
        name: "Entertainment",
        value: "entertainment",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/entertainment.svg`,
      },
      // {
      //   name: 'Administration',
      //   value: 'administration',
      //   icon: 'administration.svg'
      // },
      {
        name: "Security",
        value: "securityservices",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/securityservices.svg`,
      },
      // {
      //   name: 'Technology',
      //   value: 'technologyservices',
      //   icon: 'technologyservices.svg'
      // },
      {
        name: "Videography and Photography",
        value: "videographyandphotography",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/videographyandphotography.svg`,
      },
      {
        name: "Equipment Rentals",
        value: "equipmentrentals",
        icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/equipmentrentals.svg`,
      },
    ],
    selectedValue: [],
  }),
  mounted() {
    // console.log("signup.category.selector.mounted", this.value)
    this.selectedValue = this.value;
  },
  methods: {
    updateCategory(index, data) {
      // console.log('updateCategory', index, data);
      this.selectedValue[index] = data;
    },
    save() {
      this.isEdit = false;
      this.$root.$emit("update-vendor-value", this.field, this.selectedValue);
    },
    addNewValue(){
      this.selectedValue.push('');
      // console.log("addNewValue", this.selectedValue);
      this.$root.$emit("update-vendor-value", this.field, this.selectedValue);
    },
    removeValue(index){
      this.$root.$emit("update-vendor-value", this.field, this.selectedValue.filter((s, sIdx) => index !== sIdx));
    },
    getAddressData: function (index, addressData, placeResultData, id) {
      // console.log("getAddressData", index, addressData, id);
      this.selectedValue[index] = `${addressData.route}, ${addressData.administrative_area_level_1}, ${addressData.country}`;
    },
  },
  watch: {
    value(newValue){
      // console.log("signup.category.selector.watch", newValue, this.field);
      this.selectedValue = newValue;
    }
  }
};
</script>
<style lang="scss" scoped>
.vendor-category-editor {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #050505;
  margin-top: 30px;

  &.border-bottom {
    padding-bottom: 35px;
    border-bottom: 1px solid #dddddd;
  }

  .left {
    width: 75%;

    .title {
      font: 800 16px Manrope-Regular, sans-serif;
    }

    .inside-img{
      width: 20px;
      position: absolute;
      top: 25px;
      left: 25px;
      z-index: 99;
    }

    input.address{
      padding-left: 60px;
      min-height: 55px;
      border: solid 0.5px #bcbcbc;
      font: normal 16px Manrope-Regular, sans-serif;
    }

    .content {
      img {width: 20px}
    }

    .action-cont {
      margin-top: 30px;
      text-align: right;

      a {
        cursor: pointer;
        padding: 8px 24px;
        &.cancel {
          color: #050505;
          font: 800 16px Manrope-Regular, sans-serif;
        }
        &.save {
          color: #ffffff;
          font: 800 16px Manrope-Regular, sans-serif;
          background-color: #f51355;
          &:hover {
            color: #ffffff !important;
          }
        }
      }
    }
    &.full-width {
      width: 100%;
    }
  }

  .right {
    a {
      font: 800 16px Manrope-Regular, sans-serif;
      color: #f51355;
      cursor: pointer;
      i {
        color: #f51355 !important;
        position: relative;
        top: -1px;
      }
    }
  }
}
</style>
