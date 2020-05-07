<template>
  <div class="vendor-signup-step1-wrapper">
    <div class="inside-container">
      <div class="left-side">
        <img :src="`${iconUrl}Group 5219 (2).svg`"/>
        <h2>ABOUT YOUR <br/>COMPANY</h2>
        <p>This part will appear on your business page</p>
        <h2>1/4</h2>
      </div>
      <div class="right-side">
        
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
import VendorServiceItem from './VendorServiceItem.vue'

export default {
  name: 'vendor-signup-step1',
  props: {
    categories: Array,
    icon: String,
  },
  components: {
    VueElementLoading,
    VendorServiceItem
  },
  data() {
    return {
      vendor: null,
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
  .vendor-signup-step1-wrapper {
    font-family: Manrope-Regular, sans-serif;

    .inside-container {
      display: flex;
      color: #050505;

      .left-side {
        flex: 1;
        margin-right: 122px;

        img {
          width: 92.5px;
        }
        h4 {
          margin: 36px 0 11px 0;
          font: 800 20px Manrope-Regular, sans-serif;
        }
        p {
          margin: 0;
          padding: 0;
          font: normal 16px Manrope-Regular, sans-serif;
        }
        h2 {
          margin: 30px 0;
          font: 800 40px Manrope-Regular, sans-serif;
        }
        h3 {
          margin: 0;
          color: #f51355;
          font: bold 20px Manrope-Regular, sans-serif;
        }
      }
      .right-side {
        flex: 3;

        h2 {
          margin: 0;
          margin-bottom: 40px;
          font: 800 40px Manrope-Regular, sans-serif;
        }
        .card {
          padding: 30px 60px 60px 60px;
          background-color: #ffffff;
          box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        }
        .description {
          color: #050505;
          h5 {
            margin: 0;
            font: 800 16px Manrope-Regular, sans-serif;

            img {
              width: 22px;
              margin-right: 12px;
            }
          }
          p {
            margin: 14px 0 30px 0;
            font: normal 16px Manrope-Regular, sans-serif;
          }
        }
      }
    }
  }  
</style>
