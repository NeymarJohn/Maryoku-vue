<template>
  <div class="selector-wrapper" :style="{'width': multiple ? '150px':''}">
    <div class="droplist" v-if="!expanded">
      <template v-if="multiple">
        <input readonly class="default" v-model="_value" @click="expanded = true" />
      </template>
      <template v-else>
        <img class="inside-img" :src="`${selectedCategory.icon}`" v-if="selectedCategory && selectedCategory.icon" />
        <input readonly class="default with-img" v-model="_value" @click="expanded = true" />
      </template>
      <img class="dropdown" src="https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 523.svg" />
    </div>
    <ul :style="{'column-count' : column, 'min-width' : column > 1 ? '600px' : '350px'}" v-click-outside="close" v-else>
      <li v-for="(category, cIndex) in categories" :key="cIndex" @click="updateCategory(category)" :class="{'mb-40': cIndex < categories.length - 1}">
        <template v-if="multiple">
          <div class="d-flex align-center">
            <img class="mr-10" :src="`${iconUrl}Group 5479 (2).svg`" v-if="_includes(selectedCategory, category)" />
            <span class="unchecked" v-else></span>
            <span>{{ _option(category)  }}</span>
          </div>
        </template>
        <template v-else>
          <img class="mr-10" v-if="category.icon" :src="`${category.icon}`" />
          {{ _option(category) }}
        </template>
      </li>
      <li v-if="additional">
        <div class="mt-20">
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
      default: "1",
    },
    multiple: {
      type: Boolean,
      required: false,
    },
    additional:{
      type: Boolean,
      required: false,
    },
    trackBy:{
      type: String,
      required: false
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
    console.log("category-selector.mounted", this.value);
    if (this.value) {
      if ( this.multiple  ) {
        if ( this.value.length ) {
            this.selectedCategory = this.categories.filter(it => this._includes(this.value, it));
        } else {
          this.selectedCategory = [];
        }

      } else {
        this.selectedCategory = this.categories.find(it => it.value === this.value);
      }
    }

  },
  computed:{
    _value() {
      if ( !this.selectedCategory ) return null;
      if ( this.multiple ) {
        if ( this.trackBy ) {
          return this.selectedCategory.map(it => it[this.trackBy])
        } else {
          return this.selectedCategory;
        }
      } else {
        if ( this.trackBy ) {
          return this.selectedCategory[this.trackBy];
        } else {
          return this.selectedCategory;
        }
      }
    }
  },
  methods: {
    updateCategory(category) {
      console.log("updateCategory", category);
      if (this.multiple ) {

        if (this._find(this.selectedCategory, category)) {
          this.selectedCategory = this._filter(this.selectedCategory, category);
        } else {
          this.selectedCategory.push(category);
        }

        this.$emit("change", this.selectedCategory);
      } else {
        this.selectedCategory = category;
        this.expanded = false;
        this.$emit("change", this._value);
      }

    },
    _filter(array, value){
      if ( this.trackBy ) {
        return array.filter(el => el[this.trackBy] !== value[this.trackBy])
      } else {
        return array.filter(el => el !== value);
      }
    },
    _find(array, value) {
      if ( this.trackBy ) {
        return array.find(el => el[this.trackBy] === value[this.trackBy]);
      } else {
        return array.find(el => el === value);
      }
    },
    _includes(array, value){
      if ( this.trackBy ) {
        // return array.includes(value[this.trackBy]);
        return array.findIndex(el => el[this.trackBy] === value[this.trackBy]) > -1;
      } else {
        return array.includes(value);
      }
    },
    _option (option) {
      return this.trackBy ? option[this.trackBy] : option;
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
  min-width: 350px;
  font: normal 16px Manrope-Regular, sans-serif;
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
    background: white;
    li {
      cursor: pointer;
      font: normal 18px Manrope-Regular, sans-serif;
      img {
        width: 30px !important;
      }

      p{
        font-weight: bold;
        margin: 0 0 10px;
      }

      span.unchecked{
        display: inline-block;
        width: 30px;
        min-width: 30px !important;
        height: 30px;
        border: 1px solid #707070;
        border-radius: 50%;
        background: #ffffff;
        margin-right: 14px;
        position: relative;
      }

      input{
        width: 100%;
      }
    }
  }

  &.service .droplist input{
    border: solid 1px #707070 !important;
  }
}
</style>
