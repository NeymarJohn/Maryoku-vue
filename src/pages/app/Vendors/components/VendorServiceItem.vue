<template>
  <div class="vendor-service-item-wrapper">
    <div class="title-cont">
      <div class="title" @click="collapsed=!collapsed">
        {{serviceItem.name}}
      </div>
      <div class="help" v-if="!collapsed">
        Does this included in starting site fee?
      </div>
      <div class="arrow" :class="{'expanded': !collapsed}" @click="collapsed=!collapsed">
        <img :src="`${iconUrl}Asset 519.svg`"/>
      </div>
    </div>
    <div class="items-cont" v-if="!collapsed">
      <div class="items" v-for="(sub, sIndex) in serviceItem.subCategory" :key="sIndex">
        <div class="sub-category-title">
          {{sub.name}}
        </div>
        <div class="checklist" v-for="(item, index) in sub.items" :key="index">
          <md-checkbox v-model="item.value">
            {{item.name}}
          </md-checkbox>
        </div>
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

export default {
  name: 'vendor-service-item',
  props: {
    serviceItem: Object
  },
  components: {
    VueElementLoading
  },
  data() {
    return {
      vendor: null,
      collapsed: true,
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
    }
  },
  created() {
    
  },
  mounted() {
    
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
          margin-top: 30px;
          text-transform: capitalize;
        }
      }
    }
  }  
</style>
