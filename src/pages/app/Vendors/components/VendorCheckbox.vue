<template>
  <div class="vendor-checkbox-wrapper" :class="{'checked': checked}">
    <template v-if="item.type == Boolean">
      <div class="main">
        <div class="check-cont" @click="updateCheck()">
          <img :src="`${iconUrl}Group 6258.svg`" v-if="checked"/>
          <img :src="`${iconUrl}Rectangle 1245.svg`" v-else/>
          {{label}}
        </div>
        <div class="included-cont" v-if="checked">
          <div class="included" :class="{'active': included}" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="included"/>
            <span class="unchecked" v-else></span>
            <span>Included</span>
          </div>
          <div class="included" :class="{'active': !included}" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!included"/>
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
    </template>
    <template v-if="item.type==Number">
      <div class="main">
        <div class="check-cont">
          <div class="check-cont" @click="updateCheck()">
            <img :src="`${iconUrl}Group 6258.svg`" v-if="checked"/>
            <img :src="`${iconUrl}Rectangle 1245.svg`" v-else/>
            {{label}}
          </div>
          <div class="how-many" v-if="checked">
            How Many? <input type="number" placeholder="QTY"/>
          </div>
        </div>
        <div class="included-cont" v-if="checked">
          <div class="included" :class="{'active': included}" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="included"/>
            <span class="unchecked" v-else></span>
            <span>Included</span>
          </div>
          <div class="flex-1">
            <div class="included" :class="{'active': !included}" @click="updateIncluded()">
              <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!included"/>
              <span class="unchecked" v-else></span>
              <span>Not included</span>
            </div>
            <div class="extra-field" v-if="!included">
              How much extra? <input type="number" placeholder="00.00"/>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="item.type==Array">
      <div class="main">
        <div class="check-cont">
          <div class="check-cont" @click="updateCheck()">
            <img :src="`${iconUrl}Group 6258.svg`" v-if="checked"/>
            <img :src="`${iconUrl}Rectangle 1245.svg`" v-else/>
            {{label}}
          </div>
          <div class="dropdown-list" v-if="checked" @click="expanded=!expanded">
            <div class="">{{label}}</div>
          </div>
          <div class="dropdown-cont" v-if="expanded">
            <ul>
              <li v-for="(a, aIndex) in item.available" :key="aIndex">
                {{a}}
              </li>
            </ul>
          </div>
        </div>
        <div class="included-cont" v-if="checked">
          <div class="included" :class="{'active': included}" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="included"/>
            <span class="unchecked" v-else></span>
            <span>Included</span>
          </div>
          <div class="included" :class="{'active': !included}" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!included"/>
            <span class="unchecked" v-else></span>
            <span>Not included</span>
          </div>
        </div>
      </div>
    </template>
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
    item: Object,
  },
  components: {
    VueElementLoading
  },
  data() {
    return {
      vendor: null,
      checked: false,
      included: true,
      expanded: false,
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
        .how-many {
          padding: 1rem 0 0 53px;
          input {
            margin-left: 1rem;
            text-align: center;
            border-radius: 3px;
            border: 1px solid #818080;
            max-width: 8rem;
          } 
        }
        .dropdown-list {
          background-color: #ffffff;
          border: 1px solid #818080;
          margin-top: 1rem;
          padding: .5rem 1rem;
          max-width: 20rem;
          font: normal 16px Manrope-Regular, sans-serif;
          background-image: url('http://static.maryoku.com/storage/icons/Vendor Signup/Asset 523.svg');
          background-repeat: no-repeat;
          background-size: 20px 20px;
          background-position: calc(100% - 1rem);
        }
        .dropdown-cont {
          ul {
            padding: 0;
            margin: 0;
            list-style: none;
            column-count: 2;
            background: #ffffff;
            padding: 1rem;
            li {
              font: normal 16px Manrope-Regular, sans-serif;
              padding-bottom: .5rem;
            }
          }
        }
      }
      .included-cont {
        display: flex;
        justify-content: center;
        align-items: baseline;
        flex: 1;
        .included {
          display: flex!important;
          align-items: center;
          flex: 1;
          img {
            width: 30px;
            height: 30px;
            margin-right: 14px;
          }
        }
        .extra-field {
          padding: 1rem 0 0 44px;
          input {
            margin-left: 1rem;
            text-align: center;
            border-radius: 3px;
            border: 1px solid #818080;
            max-width: 4rem;
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
    .flex-1 {
      flex: 1;
    }
    .active {
      font: 600 16px Manrope-Regular, sans-serif;
    }
  }  
</style>
