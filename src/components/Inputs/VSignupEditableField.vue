<template>
  <div class="vsignup-edtiable-field-wrapper" :class="[{ 'border-bottom': borderBottom }]">
    <div class="left" :class="[{ 'full-width': isEdit }]">
      <div class="title">{{ title }}<span v-if="required"> *</span></div>
      <div class="content">
        <div v-if="!isEdit">
          <template v-if="field == 'vendorCategories'">
            <div v-for="(category, index) in value" :key="index" style="padding: 5px">
              {{ getCategoryNameByValue(category) }}
            </div>
          </template>
          <template v-else-if="field == 'vendorAddresses'">
            <div v-for="(address, index) in value" :key="index" style="padding: 5px">
              <img v-if="img != ''" :src="img" />{{ address }}
            </div>
          </template>
          <template v-else>
            <img v-if="img != ''" :src="img" />
            {{ field == "vendorCategory" || field == "secondaryVendorCategory" ? selectedCategory.name : value }}
          </template>
        </div>
        <div class="edit-content" v-else>
          <div v-if="field == 'vendorCategory' || field == 'secondaryVendorCategory'">
            <div class="droplist" v-if="!expanded" :class="{ 'mt-3': !selectedCategory.icon }">
              <img
                class="inside-img"
                :src="`${categoryIconUrl}${selectedCategory.icon}`"
                v-if="selectedCategory.icon"
              />
              <input readonly class="default with-img" :value="selectedCategory.name" @click="expanded = true" />
              <img
                class="dropdown"
                src="https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 523.svg"
              />
            </div>
            <ul v-else>
              <li v-for="(category, cIndex) in categories" :key="cIndex" @click="updateCategory(category)">
                <img :src="`${categoryIconUrl}${category.icon}`" />
                {{ category.name }}
              </li>
            </ul>
          </div>
          <div v-else-if="field == 'vendorCategories'">
            <div v-for="(category, index) in value" :key="index" class="d-flex align-center mt-1">
              <v-signup-category-selector
                @change="updateValue(index, ...arguments)"
                :defaultValue="category"
              ></v-signup-category-selector>
              <md-button v-if="index > 0" class="md-simple md-black edit-btn" @click="deleteValue(index)"
                ><md-icon>close</md-icon></md-button
              >
            </div>
            <md-button class="md-simple normal-btn md-red" @click="addNewValue">Add another category</md-button>
          </div>
          <div class="address-cont" v-else-if="field == 'vendorAddresses'">
            <div class="d-flex align-center mt-1" v-for="(address, index) in value" :key="index">
              <v-signup-address-editor
                :defaultValue="address"
                :index="index"
                @change="updateValue(index, ...arguments)"
              />
              <md-button v-if="index > 0" class="md-simple md-black edit-btn" @click="deleteValue(index)"
                ><md-icon>close</md-icon></md-button
              >
            </div>

            <md-button class="md-simple normal-btn md-red" @click="addNewValue">Add another address</md-button>
          </div>
          <div v-else-if="field == 'vendorMainEmail'">
            <img class="inside-img" :src="img" v-if="img != ''" />
            <input class="default" :class="[{ 'with-img': img != '' }, isEmailValid()]" v-model="value" />
          </div>
          <div v-else-if="field == 'vendorMainPhoneNumber'">
            <img class="inside-img" :src="img" v-if="img != ''" />
            <input
              class="default"
              :type="field == 'vendorMainPhoneNumber' ? 'number' : 'text'"
              :class="[{ 'with-img': img != '' }]"
              v-model="value"
            />
          </div>
          <div v-else>
            <img class="inside-img" :src="img" v-if="img != ''" />
            <input class="default" :class="[{ 'with-img': img != '' }]" v-model="value" />
          </div>
        </div>
      </div>
      <div class="action-cont" v-if="isEdit">
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
import VueElementLoading from "vue-element-loading";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import VSignupCategorySelector from "./VSignupCategorySelector";
import VSignupAddressEditor from "./VSignupAddress";
export default {
  name: "v-signup-editable-field",
  components: {
    VueElementLoading,
    VueGoogleAutocomplete,
    VSignupCategorySelector,
    VSignupAddressEditor,
  },
  props: {
    title: String,
    field: String,
    img: String,
    defaultVal: String,
    borderBottom: Boolean,
    required: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isLoading: true,
    isEdit: false,
    expanded: false,
    selectedCategory: {
      name: null,
      icon: null,
    },
    address: null,
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    categoryIconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/",
    categories: [
      {
        name: "Venue Rental",
        value: "venuerental",
        icon: "venuerental.svg",
      },
      {
        name: "Food & Beverage",
        value: "foodandbeverage",
        icon: "foodandbeverage.svg",
      },
      {
        name: "Design and Decor",
        value: "decor",
        icon: "decor.svg",
      },
      {
        name: "Guest Services & Staffing",
        value: "corporatesocialresponsibility",
        icon: "corporatesocialresponsibility.svg",
      },
      {
        name: "Signage / Printing",
        value: "signageprinting",
        icon: "signageprinting.svg",
      },
      // {
      //   name: 'Advertising and Promotion',
      //   value: 'advertising-promotion',
      //   icon: 'advertising-promotion.svg'
      // },
      {
        name: "AV / Staging",
        value: "audiovisualstagingservices",
        icon: "audiovisualstagingservices.svg",
      },
      {
        name: "Swags",
        value: "swags",
        icon: "swags.svg",
      },
      // {
      //   name: 'Shipping',
      //   value: 'shipping',
      //   icon: 'shipping.svg'
      // },
      {
        name: "Transportation & Tour operator",
        value: "transportation",
        icon: "transportation.svg",
      },
      {
        name: "Entertainment",
        value: "entertainment",
        icon: "entertainment.svg",
      },
      // {
      //   name: 'Administration',
      //   value: 'administration',
      //   icon: 'administration.svg'
      // },
      {
        name: "Security",
        value: "securityservices",
        icon: "securityservices.svg",
      },
      // {
      //   name: 'Technology',
      //   value: 'technologyservices',
      //   icon: 'technologyservices.svg'
      // },
      {
        name: "Videography and Photography",
        value: "videographyandphotography",
        icon: "videographyandphotography.svg",
      },
      {
        name: "Equipment Rentals",
        value: "equipmentrentals",
        icon: "equipmentrentals.svg",
      },
    ],
    value: null,
  }),
  mounted() {
    this.value = this.defaultVal;
    if (this.value) {
      this.selectedCategory.name = this.getCategoryNameByValue(this.value);
      this.selectedCategory.icon = this.getCategoryIconByValue(this.value);
    } else {
      this.selectedCategory = {
        name: null,
        icon: null,
      };
    }
    if (this.field == "vendorAddressLine1" || this.field == "vendorAddressLine2") {
      this.$refs.address.focus();
    }
  },
  methods: {
    initialize() {
      this.value = this.defaultVal;
      if (this.value) {
        this.selectedCategory.name = this.getCategoryNameByValue(this.value);
        this.selectedCategory.icon = this.getCategoryIconByValue(this.value);
      } else {
        this.selectedCategory = {
          name: null,
          icon: null,
        };
      }
      if (this.field == "vendorAddressLine1" || this.field == "vendorAddressLine2") {
        this.$refs.address.focus();
      }
    },
    getAddressData: function (addressData, placeResultData, id) {
      this.value = `${addressData.route}, ${addressData.administrative_area_level_1}, ${addressData.country}`;
    },
    save() {
      this.isEdit = false;
      // if (this.title == "Business Category") {
      //   this.$root.$emit("update-vendor-value", "vendorCategory", this.value);
      // } else {
      //   this.$root.$emit("update-vendor-value", this.field, this.value);
      // }
      this.$root.$emit("update-vendor-value", this.field, this.value);
    },
    updateCategory(category) {
      this.selectedCategory = category;
      this.value = category.value;
      this.expanded = false;
    },
    isEmailValid: function () {
      // return (this.value == "")? "" : (this.reg.test(this.value)) ? 'has-success' : 'has-error';
      return this.reg.test(this.value) ? "has-success" : "has-error";
    },
    getCategoryNameByValue(value) {
      return this.categories.filter((c) => c.value == value)[0].name;
    },
    getCategoryIconByValue(value) {
      return this.categories.filter((c) => c.value == value)[0].icon;
    },
    addNewValue() {
      console.log(this.value);
      console.log(typeof this.value);
      if (this.value && typeof this.value == "object") {
        this.value.push("");
      }
    },
    deleteValue(index) {
      if (this.value && typeof this.value == "object") {
        this.value.splice(index, 1);
      }
    },
    updateValue(index, value) {
      if (this.value && typeof this.value == "object") {
        this.value[index] = value;
      }
    },
  },
  watch: {
    defaultVal(newValue, oldValue) {
      this.value = newValue;
      if (this.value) {
        this.selectedCategory.name = this.getCategoryNameByValue(this.value);
        this.selectedCategory.icon = this.getCategoryIconByValue(this.value);
      } else {
        this.selectedCategory = {
          name: null,
          icon: null,
        };
      }
      if (this.field == "vendorAddressLine1" || this.field == "vendorAddressLine2") {
        this.$refs.address.focus();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.vsignup-edtiable-field-wrapper {
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
    .content {
      margin-top: 13px;
      font: normal 16px Manrope-Regular, sans-serif;
      img {
        width: 20px;
        margin-right: 18px;
        position: relative;
      }
      .default {
        width: 100%;
        padding: 22px 20px;
        border: 1px solid #dddddd;
        border-radius: 0;
        font: normal 16px Manrope-Regular, sans-serif;
        width: 100%;

        &.with-img {
          padding-left: 60px;
        }
        &.has-error {
          border-color: #f51355;
        }
        &.has-success {
          border-color: green;
        }
      }
      .inside-img {
        z-index: 99;
        position: relative;
        top: 6px;
        left: 22px;
      }
      .dropdown {
        position: absolute;
        margin-top: -8px;
        width: 14px;
        margin-left: -35px;
      }
      .with-img {
        position: relative;
        top: -29px;
        margin-bottom: -30px;
      }
    }
    .droplist {
      input {
        cursor: pointer;
      }
    }
    .edit-content {
      ul {
        list-style: none;
        margin: 0;
        column-count: 2;
        padding: 40px;
        border: solid 1px #050505;
        box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);

        li {
          cursor: pointer;
          margin-bottom: 40px;
          font: normal 16px Manrope-Regular, sans-serif;
          img {
            width: 22px;
          }
        }
      }
      .address-cont {
        background-image: url("https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 550.svg");
        background-repeat: no-repeat;
        background-size: 20px;
        background-position-x: 22px;
        background-position-y: 9px;
        #map {
          background: transparent;
          padding: 12px 20px 12px 60px;
          border: 1px solid #dddddd;
          border-bottom: none;
          border-radius: 0;
          font: normal 16px Manrope-Regular, sans-serif;
          width: 100%;
        }
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
  .mt-3 {
    margin-top: 3rem !important;
  }
}
</style>
