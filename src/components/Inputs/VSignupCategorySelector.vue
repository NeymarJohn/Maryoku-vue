<template>
  <div class="vendor-category-editor">
    <div class="droplist" v-if="!expanded">
      <img class="inside-img" :src="`${categoryIconUrl}${selectedCategory.icon}`" v-if="selectedCategory.icon" />
      <input readonly class="default with-img" :value="selectedCategory.name" @click="expanded = true" />
      <img class="dropdown" src="https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 523.svg" />
    </div>
    <ul v-else>
      <li v-for="(category, cIndex) in categories" :key="cIndex" @click="updateCategory(category)">
        <img :src="`${categoryIconUrl}${category.icon}`" />
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "v-signup-editable-field",
  props: {
    title: String,
    field: String,
    img: String,
    defaultValue: String,
  },
  data: () => ({
    isLoading: true,
    isEdit: false,
    expanded: false,
    selectedCategory: {
      name: null,
      icon: null,
    },
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
    this.value = this.defaultValue;
    if (this.value) {
      this.selectedCategory.name = this.getCategoryNameByValue(this.value);
      this.selectedCategory.icon = this.getCategoryIconByValue(this.value);
    } else {
      this.selectedCategory = {
        name: null,
        icon: null,
      };
    }
  },
  methods: {
    updateCategory(category) {
      this.selectedCategory = category;
      this.value = category.value;
      this.expanded = false;
      this.$emit("change", this.value);
    },
    getCategoryNameByValue(value) {
      return this.categories.filter((c) => c.value == value)[0].name;
    },
    getCategoryIconByValue(value) {
      return this.categories.filter((c) => c.value == value)[0].icon;
    },
  },
};
</script>
<style lang="scss" scoped>
.vendor-category-editor {
  font: normal 16px Manrope-Regular, sans-serif;
  width: 100%;
  .droplist {
    position: relative;
    .inside-img {
      width: 22px;
      z-index: 99;
      position: absolute;
      top: 15px;
      left: 15px;
    }
    input {
      font-size: 16px;
      font-family: "Manrope-Regular";
      padding-left: 40px;
      cursor: pointer;
      width: 100%;
    }
    .dropdown {
      position: absolute;
      margin-top: 20px;
      width: 14px;
      right: 15px;
    }
  }

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
}
</style>
