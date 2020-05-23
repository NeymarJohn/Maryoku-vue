<template>
  <div class="vendor-checkbox-wrapper" :class="{'checked': checked}">
    <div class="main">
      <div class="check-cont" @click="updateCheck()">
        <img :src="`${iconUrl}Group 6258.svg`" v-if="checked"/>
        <img :src="`${iconUrl}Rectangle 1245.svg`" v-else/>
        {{label}}
      </div>
      <div class="included-cont" v-if="checked">
        <div class="included" @click="updateIncluded()">
          <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="included"/>
          <span class="unchecked" v-else></span>
          <span>Included</span>
        </div>
        <div class="included" @click="updateIncluded()">
          <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="!included"/>
          <span class="unchecked" v-else></span>
          <span>Not included</span>
        </div>
      </div>
    </div>
    <div class="sub-cont" v-if="checked">
      <textarea 
        class="text"
        :placeholder="`Describe your ${label}`"
      />
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
  name: 'vendor-checkbox',
  props: {
    type: String,
    label: String,
  },
  components: {
    VueElementLoading
  },
  data() {
    return {
      vendor: null,
      checked: false,
      included: true,
      iconUrl: 'http://static.maryoku.com/storage/icons/Vendor Signup/',
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    updateCheck() {
      this.checked = !this.checked
    },
    updateIncluded() {
      this.included = !this.included
    }
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
  .vendor-checkbox-wrapper {
    font-family: Manrope-Regular, sans-serif;
    color: #050505;
    background: #ffffff;
    margin: auto -60px;
    margin-bottom: 0px;
    padding: 15px 60px;
    cursor: pointer;

    .main {
      display: flex;

      .check-cont {
        flex: 1;
        img {
          width: 27px;
          margin-right: 24px;
        }
        &.checked {
          background-color: #f7f7f7;
        }
      }
      .included-cont {
        display: flex;
        justify-content: center;
        flex: 1;
        .included {
          display: flex;
          align-items: center;
          flex: 1;
          img {
            width: 30px;
            height: 30px;
            margin-right: 14px;
          }
        }
        span {
          &.unchecked {
            display: inline-block;
            width: 30px;
            height: 30px;
            border: 1px solid #707070;
            border-radius: 50%;
            background: #ffffff;
            margin-right: 14px;
          }
        }
      }
    }
    .sub-cont {
      .text {
        margin: 12px 0 0 0;
        min-width: 40%;
        border: solid 1px #707070;
        padding: 10px 17px;
        min-height: 80px;
        background: #f3f7fd;
        resize: none;
      }
    }

    &:first-child {
      margin-top: 15px;
    }
    &.checked {
      background: #f7f7f7;
      margin-top: 0px!important;
      border-bottom: 1px solid #dddddd;
      .main {
        .check-cont {
          font: 600 16px Manrope-Regular, sans-serif;          
        }        
      }
    }
  }  
</style>
