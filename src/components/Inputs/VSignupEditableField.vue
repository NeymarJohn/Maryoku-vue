<template>
  <div class="vsignup-edtiable-field-wrapper" :class="[{'border-bottom': borderBottom}]">
    <div class="left" :class="[{'full-width': isEdit}]">
      <div class="title">
        {{title}}
      </div>
      <div class="content">
        <div v-if="!isEdit">
          <img v-if="img!=''" :src="img"/>
          {{title=='Business Category' ? selectedCategory.name : defaultVal}}
        </div>
        <div class="edit-content" v-else>
          <div v-if="title=='Business Category'">
            <div class="droplist" v-if="!expanded">
              <img class="inside-img" :src="selectedCategory.icon"/>
              <input
                readonly
                class="default with-img"
                :value="selectedCategory.name"
                @click="expanded=true"
              />
              <img class="dropdown" src="http://static.maryoku.com/storage/icons/Vendor Signup/Asset 523.svg"/>
            </div>
            <ul v-else>
              <li v-for="(category, cIndex) in categories" :key="cIndex" @click="updateCategory(category)">
                <img :src="category.icon"/>
                {{category.name}}
              </li>
            </ul>
          </div>
          <div v-else>
            <img class="inside-img" :src="img" v-if="img!=''"/>
            <input
              class="default"
              :class="[{'with-img': img!=''}]"
              v-model="defaultVal"
            />
          </div>
        </div>
      </div>
      <div class="action-cont" v-if="isEdit">
        <a class="cancel" @click="isEdit=false">Cancel</a>
        <a class="save" @click="save()">Save</a>
      </div>
    </div>
    <div class="right" v-if="!isEdit">
      <a @click="isEdit=true">
        Edit <md-icon>navigate_next</md-icon>
      </a>
    </div>
  </div>
</template>
<script>
import VueElementLoading from 'vue-element-loading'

export default {
  name: 'v-signup-editable-field',
  components: {
    VueElementLoading
  },
  props: {
    title: String, 
    img: String,
    defaultVal: String,
    borderBottom: Boolean
  },
  data: () => ({
    isLoading: true,
    isEdit: false,
    expanded: false,
    selectedCategory: {
      name: 'Venue',
      icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
    },
    categories: [
      {
        name: 'Venue',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
      },
      {
        name: 'Catering',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Group 1471 (2).svg'
      },
      {
        name: 'DJ',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
      },
      {
        name: 'Transportation',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
      },
      {
        name: 'Photographer',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
      },
      {
        name: 'Band',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
      },
      {
        name: 'Decor & Lightning',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
      },
      {
        name: 'Rentals',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
      },
      {
        name: 'Favours & Gifts',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
      },
      {
        name: 'Videographer',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
      },
      {
        name: 'Flowers',
        icon: 'http://static.maryoku.com/storage/icons/Vendor Signup/Asset 543.svg'
      },
    ]
  }),
  mounted () {
    this.selectedCategory = this.categories[0]
  },
  methods: {
    save() {
      this.isEdit = false
    },
    updateCategory(category) {
      this.selectedCategory = category
      this.expanded = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/md/_variables.scss";
@import "@/assets/scss/md/_colors.scss";

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
            color: #ffffff!important;
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
        color: #f51355!important;
        position: relative;
        top: -1px;
      }
    }
  }
}
</style>
