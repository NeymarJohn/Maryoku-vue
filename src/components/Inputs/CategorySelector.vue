<template>
  <div class="selector-wrapper" :style="{'width': multiple === 'true' ? '150px':''}">
    <div class="droplist" v-if="!expanded">
      <template v-if="multiple === 'true'">
        <input readonly class="default" :value="selectedCategory" @click="expanded = true" />
      </template>
      <template v-else>
        <img class="inside-img" :src="`${selectedCategory.icon}`" v-if="selectedCategory.icon" />
        <input readonly class="default with-img" :value="selectedCategory.name" @click="expanded = true" />
      </template>
      <img class="dropdown" src="https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 523.svg" />
    </div>
    <ul :style="{'column-count' : column}" v-click-outside="close" v-else>
      <li v-for="(category, cIndex) in categories" :key="cIndex" @click="updateCategory(category)" :class="{'mb-40': cIndex < categories.length - 1}">
        <template v-if="multiple === 'true'">
          <div class="d-flex align-center">
            <img class="mr-10" :src="`${iconUrl}Group 5479 (2).svg`" v-if="selectedCategory.includes(category)" />
            <span class="unchecked" v-else></span>
            <span>{{ category }}</span>
          </div>
        </template>
        <template v-else>
          <img class="mr-10" v-if="category.icon" :src="`${category.icon}`" />
          {{ category.name }}
        </template>
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
      type: [String, Array],
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
    multiple: {
      type: String,
      required: false,
      default: 'false',
    },
    additional:{
      type: Boolean,
      required: false,
    },
    customClass:{
      type: String,
    }
  },
  data: () => ({
    iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
    expanded: false,
    selectedCategory: null,
    additionalValue: null,
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
  }),
  mounted() {
    console.log("mounted", this.multiple == 'true', this.value.length);
    if (this.value) {
      if ( this.multiple == 'true' ) {
        this.selectedCategory = this.value.length ? this.categories.filter(it => this.value.includes(it)) : [];
      } else {
        this.selectedCategory = this.categories.find(it => it.value === this.value);
      }
    }
    console.log('category-selector', this.selectedCategory);
  },
  methods: {
    updateCategory(category) {
      if (this.multiple === 'true' ) {

        if (this.selectedCategory.find(cat => cat === category)) {
          this.selectedCategory = this.selectedCategory.filter(cat => cat !== category);
        } else {
          this.selectedCategory.push(category);
        }

        this.$emit("change", this.selectedCategory);
      } else {
        this.selectedCategory = category;
        this.expanded = false;
        this.$emit("change", category.value);
      }

    },
    input(){
      this.$emit("input", this.additionalValue);
    },
    close(){
      this.expanded = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.selector-wrapper {
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
      font: normal 18px Manrope-Regular, sans-serif;
      img {
        width: 30px;
      }

      p{
        font-weight: bold;
        margin: 0 0 10px;
      }

      span.unchecked{
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #707070;
        border-radius: 50%;
        background: #ffffff;
        margin-right: 14px;
        position: relative;
      }
    }
  }
}
</style>
