<template>
  <div class="vendor-service-item-wrapper" v-if="length > 0">
    <div class="title-cont">
      <div class="title" @click="collapsed=!collapsed">
        {{serviceItem.name}}
      </div>
      <div class="help" v-if="!collapsed">
        Are all these included in your starting offer?
        <img :src="`${iconUrl}Group 5522 (2).svg`" @mouseover="conditionTooltip=true" @mouseleave="conditionTooltip=false">
        <div class="condition-tooltip" v-if="conditionTooltip">
          <h5>What do you charge extra for?</h5>
          <p>
            Tell us so we know which elements to include in the original proposal and which ones are extra
          </p>
        </div>
      </div>
      <div class="arrow" :class="{'expanded': !collapsed}" @click="collapsed=!collapsed">
        <img :src="`${iconUrl}Asset 519.svg`"/>
      </div>
    </div>
    <div class="items-cont" v-if="!collapsed">
      <div class="items" v-for="(sub, sIndex) in serviceItem.subCategory" :key="sIndex">
        <template v-if="sub.category==businessCategory">
          <div class="sub-category-title">
            {{sub.name}}
          </div>
          <div class="checklist" v-for="(item, index) in sub.items" :key="index">
            <vendor-checkbox
              :item="item"
              :label="item.name"
              v-model="item.value"
            />
            <!-- <md-checkbox v-model="item.value">
              {{item.name}}
            </md-checkbox> -->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VueElementLoading from 'vue-element-loading'
import Vendors from '@/models/Vendors'

//COMPONENTS
import Icon from '@/components/Icon/Icon.vue'
import VendorCheckbox from './VendorCheckbox.vue'

export default {
  name: 'vendor-service-item',
  props: {
    serviceItem: Object,
    businessCategory: String,
  },
  components: {
    VueElementLoading,
    VendorCheckbox
  },
  data() {
    return {
      vendor: null,
      collapsed: true,
      length: 0,
      conditionTooltip: false,
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
    }
  },
  created() {
    
  },
  mounted() {
    this.length = 0
    this.serviceItem.subCategory.forEach( s => {
      if (s.category == this.businessCategory) {
        this.length++
      }
    })
    console.log(this.length)
  },
  methods: {
  },
  computed: {
    
  },
  filters: {
    
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
  .vendor-service-item-wrapper {
    font-family: Manrope-Regular, sans-serif;
    color: #050505;
    background: #ffffff;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    padding: 60px;
    margin-bottom: 30px;
    .title-cont {
      display: flex;
      justify-content: space-between;

      .title {
        cursor: pointer;
        text-transform: capitalize;
        font: 800 22px Manrope-Regular, sans-serif;
        flex: 1;
      }
      .help {
        font: 800 16px Manrope-Regular, sans-serif;
        flex: 1;
        img {
          width: 27px;
          margin-left: 16px;
        }
        .condition-tooltip {
          position: absolute;
          background-color: #ffedb7;
          padding: 18px 29px;
          color: #050505;
          font-size: 14px;
          margin: 20px 0 0 270px;
          max-width: 280px;
          text-align: center;

          h5 {
            margin: 14px 0 0 0;
            font: 800 16px Manrope-Regular, sans-serif;
          }
          p {
            margin: 14px 0 0 0;
            padding: 0;
            font: normal 16px Manrope-Regular, sans-serif;
          }
          
          &::after{
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            top: 4px;
            left: 60px;
            box-sizing: border-box;
            
            border: 12px solid black;
            border-color: transparent transparent #ffedb7 #ffedb7;
            
            transform-origin: 0 0;
            transform: rotate(135deg);
          }
        }
      }
      .arrow {
        cursor: pointer;
        img {
          width: 12px;
        }
        &.expanded {
          img {
            transform: rotate(90deg);
          }
        }
      }
    }
    .items-cont {
      margin-top: 70px;

      .items {
        margin-bottom: 30px;
        .sub-category-title {
          padding-bottom: 30px;
          margin: auto -60px;
          padding-left: 60px;
          border-bottom: 2px solid #dddddd;
          font: 800 16px Manrope-Regular, sans-serif;
          text-transform: capitalize;
        }
        .checklist {
          text-transform: capitalize;
        }
      }
    }
  }  
</style>
