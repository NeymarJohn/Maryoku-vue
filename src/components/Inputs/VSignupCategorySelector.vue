<template>
  <div class="vendor-category-editor" :class="[{ 'border-bottom': borderBottom }]">
    <div class="left" :class="[{ 'full-width': isEdit }]">
      <div class="title">{{ title }}<span v-if="required"> *</span></div>
      <div v-if="isEdit">
        <div class="d-flex position-relative" v-for="(item, index) of selectedValue" :key="item || index + 1">
          <img class="inside-img" :src="img" v-if="img != '' && field !== 'vendorCategories'" />
          <category-selector
            v-if="field === 'vendorCategories'"
            :value="item || ''"
            :categories="vendorCategories"
            column="2"
            trackBy="name"
            class="my-10"
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
          <img
            class="ml-10 close-btn"
            :src="`${$iconURL}Requirements/delete-dark.svg`"
            v-if="selectedValue.length > 1"
            @click="removeValue(index)"
          />
        </div>
        <div class="d-flex align-center py-10 color-red font-bold cursor-pointer" @click="addNewValue">
          <img class="mr-10" :src="`${$iconURL}VendorSignup/Group%209632.svg`" />
          <span v-if="field === 'vendorAddresses'">Add another address</span>
          <span v-else>Add another category</span>
        </div>
      </div>
      <div v-else>
        <template v-if="selectedValue.length">
          <div class="content mt-10" v-for="item of selectedValue">
            <img
              class="mr-10"
              :src="vendorCategories.find((v) => v.name === item).icon"
              v-if="field === 'vendorCategories' && item"
            />
            <img class="mr-10" :src="img" v-if="img != '' && item" />
            {{ item }}
          </div>
        </template>
      </div>
      <div class="action-cont" v-if="isEdit">
        <a class="cancel" @click="cancel">Cancel</a>
        <a class="save" @click="save">Save</a>
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
import { VendorCategories } from "@/constants/vendor";

export default {
  name: "v-signup-editable-field",
  components: {
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
    value: {
      type: [String, Array],
      defaultValue: () => null,
    },
  },
  data: () => ({
    isEdit: false,
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    categoryIconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/",
    vendorCategories: VendorCategories,
    selectedValue: [],
  }),
  mounted() {
    this.init();
  },
  methods: {
    updateCategory(index, data) {
      // console.log('updateCategory', index, data);
      this.selectedValue[index] = data;
    },
    save() {
      this.isEdit = false;
      let selectedValue = [];

      // console.log("vendor.signup.category", this.selectedValue);
      if (this.field === "vendorCategories") {
        this.selectedValue.map((v) => {
          let item = this.vendorCategories.find((cat) => cat.name === v);
          selectedValue.push(item ? item["value"] : "");
        });
      } else {
        selectedValue = this.selectedValue;
      }
      // this.$root.$emit("update-vendor-value", this.field, selectedValue);
      this.$emit("save", { field: this.field, value: selectedValue });
    },
    cancel() {
      this.isEdit = false;
      this.init();
    },
    addNewValue() {
      this.selectedValue.push("");
    },
    removeValue(index) {
      this.selectedValue.splice(index, 1);
      // this.$root.$emit(
      //   "update-vendor-value",
      //   this.field,
      //   this.selectedValue.filter((s, sIdx) => index !== sIdx),
      // );
    },
    getAddressData(index, addressData, placeResultData, id) {
      this.selectedValue[
        index
      ] = `${addressData.route}, ${addressData.administrative_area_level_1}, ${addressData.country}`;
    },
    init() {
      // console.log('init', this.value);
      this.selectedValue = [];
      if (this.value.length && this.field === "vendorCategories") {
        this.value.map((v) => {
          let item = this.vendorCategories.find((cat) => cat.value === v);
          this.selectedValue.push(item ? item["name"] : "");
        });
      } else {
        this.selectedValue = this.value.map((item) => item);
      }
    },
  },
  beforeDestroy() {
    // this.$root.$off('update-vendor-value')
  },
  watch: {
    value(newValue) {
      // console.log("signup.category.selector.watch", newValue, this.field);
      this.init();
    },
  },
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
  .close-btn {
    cursor: pointer;
  }
  .left {
    width: 75%;

    .title {
      font: 800 16px Manrope-Regular, sans-serif;
    }

    .inside-img {
      width: 20px;
      position: absolute;
      top: 25px;
      left: 25px;
      z-index: 99;
    }

    input.address {
      padding-left: 60px;
      min-height: 55px;
      border: solid 0.5px #bcbcbc;
      font: normal 16px Manrope-Regular, sans-serif;
    }

    .content {
      img {
        width: 20px;
      }
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
