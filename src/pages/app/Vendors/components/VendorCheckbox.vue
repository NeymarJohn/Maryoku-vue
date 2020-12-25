<template>
  <div class="vendor-checkbox-wrapper" :class="{ checked: checked }">
    <template v-if="item.type == Boolean">
      <div class="main">
        <div class="check-cont flex" @click="updateCheck()">
          <img v-if="checked" class="mr-20" :src="iconUrl + 'Group 6258.svg'" width="27">
          <img v-else class="mr-20" :src="iconUrl + 'Rectangle 1245.svg'" width="27">
          <div class="text">{{ label }}</div>
        </div>
        <div class="included-cont" v-if="checked && !item.xIncluded">
          <div class="included mr-20" :class="{ active: included }" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="included" />
            <span class="unchecked" v-else></span>
            <span>Included</span>
          </div>
          <div class="flex-1 mr-m1">
            <div class="included mr-20" :class="{ active: !included }" @click="updateIncluded()">
              <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!included" />
              <span class="unchecked" v-else></span>
              <span>Not included</span>
            </div>
          </div>
        </div>
        <div class="included-cont" v-if="checked && !included">
          <div class="extra-field">
            Extra payment
            <div class="field">
              <input type="number" class="mt-20" placeholder="00.00" v-model="currentItem.value" @input="updateValue"/>
            </div>
          </div>
        </div>
      </div>
      <div class="sub-cont" v-if="checked" :class="{ 'mt-m3': !included }">
        <textarea class="text" v-model="currentItem.desc" :placeholder="`Add additional information`" @input="updateValue"/>
      </div>
      <div class="main mt-10" v-if="checked && item.hasOwnProperty('dry')">
        <div class="check-cont" style="padding-left: 3rem">
          Allow dry run
        </div>
        <div class="included-cont">
          <div class="included mr-60" :class="{ active: currentItem.dry }" @click="updateValue('dry', true)">
            <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="currentItem.dry" />
            <span class="unchecked" v-else></span>
            <span>Yes</span>
          </div>
          <div class="flex-1 mr-m1">
            <div class="included" :class="{ active: currentItem.dry === false }" @click="updateValue('dry', false)">
              <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="currentItem.dry === false" />
              <span class="unchecked" v-else></span>
              <span>No</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="item.type == Number">
      <div class="main">
        <div class="check-cont">
          <div class="flex" @click="updateCheck()">
            <img v-if="checked" class="mr-20" :src="iconUrl + 'Group 6258.svg'" width="27">
            <img v-else class="mr-20" :src="iconUrl + 'Rectangle 1245.svg'" width="27">
            {{ label }}
          </div>
        </div>
        <div class="how-many" v-if="checked && included">
          How Many?
          <input type="number" placeholder="QTY" v-model="currentItem.value" @input="updateValue"/>
        </div>
        <div class="included-cont" v-if="checked && !item.xIncluded">
          <div class="included mr-20" :class="{ active: included }" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="included" />
            <span class="unchecked" v-else></span>
            <span>Included</span>
          </div>
          <div class="flex-1 mr-m1">
            <div class="included" :class="{ active: !included }" @click="updateIncluded()">
              <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!included" />
              <span class="unchecked" v-else></span>
              <span>Not included</span>
            </div>
          </div>
        </div>
        <div class="included-cont" v-if="checked && !included">
          <div class="extra-field">
            Extra payment
            <input type="number" class="mt-20" placeholder="00.00" v-model="currentItem.value" @input="updateValue"/>
          </div>
        </div>
      </div>
      <div class="sub-cont" v-if="item.hasComment && checked" :class="{ 'mt-m3': !included }">
        <textarea class="text" v-model="currentItem.desc" :placeholder="`Add additional information`" @input="updateValue"/>
      </div>
    </template>
    <template v-if="item.type == Array">
      <div class="main">
        <div class="check-cont" >
          <div class="flex" @click="updateCheck()">
            <img v-if="checked" class="mr-20" :src="iconUrl + 'Group 6258.svg'" width="27">
            <img v-else class="mr-20" :src="iconUrl + 'Rectangle 1245.svg'" width="27">
            {{ label }}
          </div>
          <category-selector
                  v-if="checked"
                  :value="currentItem.value || ''"
                  :categories="item.available"
                  :column="columnCount"
                  :multiple="true"
                  @change="updateExChecked"
                  class="mt-20 service"
                  style="margin-left: 47px"
          ></category-selector>
        </div>
      </div>
      <div class="sub-cont" v-if="item.hasComment && checked" :class="{ 'mt-m3': !included }">
        <textarea class="text" v-model="currentItem.desc" :placeholder="`Add additional information`" />
      </div>
    </template>
    <template v-if="item.type == 'Cost'">
      <div class="main">
        <div class="check-cont">
          <div class="flex"@click="updateCheck()">

            <img v-if="checked" class="mr-20" :src="iconUrl + 'Group 6258.svg'" width="27">
            <img v-else class="mr-20" :src="iconUrl + 'Rectangle 1245.svg'" width="27">
            {{ label }}
          </div>
        </div>
        <div class="included-cont" v-if="checked && !item.xIncluded">
          <div class="included" :class="{ active: included }" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="included" />
            <span class="unchecked" v-else></span>
            <span>Included</span>
          </div>
          <div class="flex-1 mr-m1">
            <div class="included" :class="{ active: !included }" @click="updateIncluded()">
              <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!included" />
              <span class="unchecked" v-else></span>
              <span>Not included</span>
            </div>
          </div>
        </div>
        <div class="included-cont" v-if="checked && !included">
          <div class="extra-field">
            Extra payment
            <input type="number" class="mt-20" placeholder="00.00" v-model="currentItem.value" @input="updateValue"/>
          </div>
        </div>

      </div>
    </template>
    <template v-if="category == 'staff' && checked">
      <div class="main mt-10">
        <div class="check-cont">
          <div class="flex mt-10 ml-40">
            Staff : guest ratio
          </div>
        </div>
        <div>
          <div class="d-flex align-center">
            <input class="mr-10 w-max-120" type="number" placeholder="Staff" v-model="currentItem.staff" @input="updateValue"/>
            <div class="font-size-30">:</div>
            <input class="ml-10 w-max-120" type="number" placeholder="Guest" v-model="currentItem.quest" @input="updateValue"/>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import moment from "moment";
import VueElementLoading from "vue-element-loading";
import Vendors from "@/models/Vendors";

//COMPONENTS
import Icon from "@/components/Icon/Icon.vue";
import CategorySelector from "@/components/Inputs/CategorySelector";

export default {
  name: "vendor-checkbox",
  props: {
    category: String,
    type: String,
    label: String,
    item: Object,
    vendor: Object,
  },
  components: {
    CategorySelector,
    VueElementLoading,
  },
  data() {
    return {
      checked: false,
      included: true,
      expanded: false,
      currentItem: {
        label: this.label,
        checked: false,
        included: true,
        value: null,
        desc: null,
        dry: null,
      },
      iconUrl: "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
    };
  },
  created() {},
  mounted() {
    if (this.vendor) {
      const item = this.vendor.services[this.camelize(this.label)];
      // console.log("vendor.check.box", this.item, item);
      if (item) {
        this.included = item.included;
        this.checked = item.checked;
        this.currentItem.value = JSON.stringify(item.value);
        this.currentItem.desc = item.desc;
        this.currentItem.dry = item.dry;

      }
    }
    if( this.item.type == Array) {
    }
  },
  methods: {
    updateExChecked(items) {

      this.currentItem.value = items;
      this.$root.$emit("update-vendor-value", `services.${this.camelize(this.label)}`, this.currentItem);
    },
    updateCheck() {
      this.checked = !this.checked;
      this.currentItem.checked = this.checked;
      this.$root.$emit("update-vendor-value", `services.${this.camelize(this.label)}`, this.currentItem);
    },
    updateValue(field, value){
      if ( field ) {
        this.currentItem[field] = value;
      }
      this.$root.$emit("update-vendor-value", `services.${this.camelize(this.label)}`, this.currentItem);
    },
    updateIncluded() {
      this.included = !this.included;
      this.currentItem.included = this.included;
      this.$root.$emit("update-vendor-value", `services.${this.camelize(this.label)}`, this.currentItem);
    },
    camelize(str) {
      let temp = str.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
      });
      return temp.charAt(0).toLowerCase() + temp.slice(1);
    },
  },
  computed: {
    columnCount(){
      return this.item.available.length > 8 ? "2" : "1"
    }
  },
  filters: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
.vendor-checkbox-wrapper {
  font-family: Manrope-Regular, sans-serif;
  color: #050505;
  background: #ffffff;
  margin: auto -60px;
  margin-bottom: 0px;
  padding: 25px 60px;
  cursor: pointer;

  .main {
    display: flex;

    .check-cont {
      margin-right: 1rem;
      align-items: flex-start;
      width: 40%;
      .img {
        width: 27px;
        height: 27px;
        margin-right: 24px;
      }
      .text {
        position: relative;
        top: 2px;
      }
      &.checked {
        background-color: #f7f7f7;
      }
      .dropdown-list {
        background-color: #ffffff;
        border: 1px solid #818080;
        margin-top: 1rem;
        margin-left: 3rem;
        padding: 0.5rem 1rem;
        max-width: 20rem;
        font: normal 16px Manrope-Regular, sans-serif;
        background-image: url("https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 523.svg");
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: calc(100% - 1rem);
      }
      .dropdown-cont {
        padding-top: 2rem;
        padding-left: 3rem;
        display: flex;
        align-items: flex-start;
        img {
          display: inline-block;
          max-width: 30px;
        }
        ul {
          width: 65%;
          border: 1px solid #050505;
          box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.16);
          padding: 0;
          margin: 0;
          list-style: none;
          display: grid;
          grid-template-columns: 50% 50%;
          background: #ffffff;
          padding: 1rem 1rem 0.5rem 1rem;
          li {
            font: normal 16px Manrope-Regular, sans-serif;
            padding-bottom: 0.5rem;

            .check-field {
              cursor: pointer;
              align-items: center;
              img {
                width: 25px;
                margin-right: 0.5rem;
              }
              span {
                &.blank-circle {
                  border: 1px solid #050505;
                  width: 25px;
                  height: 25px;
                  background-color: #ffffff;
                  display: inline-block;
                  border-radius: 50%;
                  margin-right: 0.5rem;
                }
                &.text {
                  position: relative;
                  top: -8px;
                  text-transform: capitalize;
                }
                &.checked {
                  top: 0px;
                  font: 600 16px Manrope-Regular, sans-serif;
                  display: inline-block;
                  margin-bottom: 9px;
                }
              }
            }
          }
        }
      }
    }
    .how-many {
      input {
        margin-left: 1rem;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #818080;
        max-width: 8rem;
      }
    }
    .included-cont {
      display: flex;
      justify-content: center;
      align-items: baseline;
      flex: 3;
      .included {
        display: flex !important;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          margin-right: 14px;
        }
      }
      .extra-field {
        padding-left: 44px;
        display: block;
        .field {
          display: inline-block;
          &:before {
            content: "$";
            position: absolute;
            margin-top: 30px;
            margin-left: 4rem;
          }
        }
        input {
          text-align: center;
          border-radius: 3px;
          border: 1px solid #818080;
          max-width: 100%;
          font: normal 16px Manrope-Regular, sans-serif;
          color: #050505;
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
      margin: 12px 0 0 3rem;
      min-width: 30%;
      border: solid 1px #707070;
      padding: 10px 17px;
      min-height: 80px;
      background: #ffffff;
      resize: none;
    }
  }

  &:first-child {
    margin-top: 15px;
  }
  &.checked {
    background: #f7f7f7;
    margin-top: 0px !important;
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
  .flex {
    display: flex;
    align-items: center;
  }
  .inb {
    display: inline-block;
  }
  .active {
    font: 600 16px Manrope-Regular, sans-serif;
  }
  .mt-m3 {
    margin-top: calc(-3rem - 8px);
  }
  .mr-m1 {
    margin-right: -1rem !important;
  }
}
</style>
