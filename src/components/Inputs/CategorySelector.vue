<template>
  <div class="vendor-category-editor">
    <div class="droplist" v-if="!expanded">
      <img class="inside-img" :src="`${selectedCategory.icon}`" v-if="selectedCategory.icon" />
      <input readonly class="default with-img" :value="selectedCategory.name" @click="expanded = true" />
      <img class="dropdown" src="https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 523.svg" />
    </div>
    <ul :style="{'column-count' : column}" v-else>
      <li v-for="(category, cIndex) in categories" :key="cIndex" @click="updateCategory(category)">
        <img class="mr-10" v-if="category.icon" :src="`${category.icon}`" />
        {{ category.name }}
      </li>
      <li v-if="additional">
        <div>
          <p>Other</p>
          <input class="default with-img" v-model="additionalValue" @input="input"/>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "category-selector",
  props: {
    value: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    column: {
      type: String,
      required: false,
      default: '1'
    },
    additional:{
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    expanded: false,
    selectedCategory: {},
    additionalValue: null,
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
  }),
  mounted() {
    if (this.value) {
      this.selectedCategory = this.categories.find(it => it.value === this.value);
      console.log('categorySelect.mounted', this.additional);
    } else {
    }
  },
  methods: {
    updateCategory(category) {
      this.selectedCategory = category;
      this.expanded = false;
      this.$emit("change", category.value);
    },
    input(){
      this.$emit("input", this.additionalValue);
    }
  },
};
</script>
<style lang="scss" scoped>
.vendor-category-editor {
  font: normal 16px Manrope-Regular, sans-serif;
  min-width: 350px;
  width: 100%;
  .droplist {
    position: relative;
    .inside-img {
      width: 22px;
      z-index: 1;
      position: absolute;
      top: 15px;
      left: 15px;
    }
    input {
      min-height: 55px;
      font-size: 16px;
      font-family: "Manrope-Regular";
      padding-left: 40px;
      cursor: pointer;
      width: 100%;
      border: solid 0.5px #bcbcbc;
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
    padding: 40px;
    border: solid 1px #050505;
    box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.16);

    li {
      cursor: pointer;
      margin-bottom: 40px;
      font: normal 18px Manrope-Regular, sans-serif;
      img {
        width: 30px;
      }

      p{
        font-weight: bold;
        margin: 0 0 10px;
      }
    }
  }
}
</style>
