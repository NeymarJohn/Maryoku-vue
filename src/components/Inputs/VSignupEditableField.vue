<template>
  <div class="vsignup-edtiable-field-wrapper" :class="[{'border-bottom': borderBottom}]">
    <div class="left" :class="[{'full-width': isEdit}]">
      <div class="title">
        {{title}}
      </div>
      <div class="content">
        <div v-if="!isEdit">
          <img v-if="img!=''" :src="img"/>
          {{title=='Business Category' ? selectedCategory.name : value}}
        </div>
        <div class="edit-content" v-else>
          <div v-if="title=='Business Category'">
            <div class="droplist" v-if="!expanded">
              <img class="inside-img" :src="`${categoryIconUrl}${selectedCategory.icon}`"/>
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
                <img :src="`${categoryIconUrl}${category.icon}`"/>
                {{category.name}}
              </li>
            </ul>
          </div>
          <div v-if="title=='Email'">
            <img class="inside-img" :src="img" v-if="img!=''"/>
            <input
              class="default"
              :class="[{'with-img': img!=''}, isEmailValid()]"
              v-model="value"
            />
          </div>
          <div v-else>
            <img class="inside-img" :src="img" v-if="img!=''"/>
            <input
              class="default"
              :type="title=='Phone' ? 'number' : 'text'"
              :class="[{'with-img': img!=''}]"
              v-model="value"
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
      name: 'Venue Rental',
      icon: 'Asset 543.svg'
    },
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    categoryIconUrl: 'http://static.maryoku.com/storage/icons/Budget Elements/', 
    // Venue Rental
    // Food and Beverage
    // Entertainment
    // Equipment Rental
    // Security Services
    // Swags
    // Videography and Photography
    // Advertising and promotion
    // Audio Visual/Staging Services
    // Signage/Printing
    // Corporate Social Responsibility
    // Meeting organization fees
    // Technology Services
    // Transportation
    // Decor
    // Shipping
    // Administration
    categories: [
      {
        name: 'Venue Rental',
        value: 'venuerental',
        icon: 'venuerental.svg'
      },
      {
        name: 'Food & Catering',
        value: 'foodandbeverage',
        icon: 'foodandbeverage.svg'
      },
      {
        name: 'Design and Decor',
        value: 'decor',
        icon: 'decor.svg'
      },
      {
        name: 'Guest Services & Staffing',
        value: 'corporatesocialresponsibility',
        icon: 'corporatesocialresponsibility.svg'
      },
      {
        name: 'Signage / Printing',
        value: 'signageprinting',
        icon: 'signageprinting.svg'
      },
      {
        name: 'Advertising and Promotion',
        value: 'advertising-promotion',
        icon: 'advertising-promotion.svg'
      },
      {
        name: 'AV / Staging',
        value: 'audiovisualstagingservices',
        icon: 'audiovisualstagingservices.svg'
      },
      {
        name: 'Swags',
        value: 'swags',
        icon: 'swags.svg'
      },
      {
        name: 'Shipping',
        value: 'shipping',
        icon: 'shipping.svg'
      },
      {
        name: 'Transportation & Tour operator',
        value: 'transportation',
        icon: 'transportation.svg'
      },
      {
        name: 'Entertainment',
        value: 'entertainment',
        icon: 'entertainment.svg'
      },
      {
        name: 'Administration',
        value: 'administration',
        icon: 'administration.svg'
      },
      {
        name: 'Security',
        value: 'securityservices',
        icon: 'securityservices.svg'
      },
      {
        name: 'Technology',
        value: 'technologyservices',
        icon: 'technologyservices.svg'
      },
      {
        name: 'Videography and Photography',
        value: 'videographyandphotography',
        icon: 'videographyandphotography.svg'
      },
    ],
    value: null,
  }),
  mounted () {
    this.selectedCategory = this.categories[0]
    this.value = this.defaultVal
  },
  methods: {
    save() {
      this.isEdit = false
    },
    updateCategory(category) {
      this.selectedCategory = category
      this.expanded = false
    },
    isEmailValid: function() {
      return (this.value == "")? "" : (this.reg.test(this.value)) ? 'has-success' : 'has-error';
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
