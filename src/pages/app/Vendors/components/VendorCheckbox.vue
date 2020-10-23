<template>
  <div class="vendor-checkbox-wrapper" :class="{'checked': checked}">
    <template v-if="item.type == Boolean">
      <div class="main">
        <div class="check-cont flex" @click="updateCheck()">
          <div
            class="img"
            :style="`
              background-image: url('${iconUrl}Group 6258.svg');
              background-repeat: no-repeat;
              background-size: contain;
            `"
            v-if="checked"
          ></div>
          <div
            class="img"
            :style="`
              background-image: url('${iconUrl}Rectangle 1245.svg');
              background-repeat: no-repeat;
              background-size: contain;
            `"
            v-else
          ></div>
          <div class="text">{{label}}</div>
        </div>
        <div class="included-cont" v-if="checked && !item.xIncluded">
          <div class="included" :class="{'active': included}" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="included" />
            <span class="unchecked" v-else></span>
            <span>Included</span>
          </div>
          <div class="flex-1 mr-m1">
            <div class="included" :class="{'active': !included}" @click="updateIncluded()">
              <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!included" />
              <span class="unchecked" v-else></span>
              <span>Not included</span>
            </div>
            <div class="extra-field" v-if="!included">
              <div class="inb">How much extra?</div>
              <div class="field">
                <input type="number" placeholder="00.00" v-model="currentItem.value" />
              </div>
            </div>
          </div>
          <!-- <div class="included" :class="{'active': !included}" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!included"/>
            <span class="unchecked" v-else></span>
            <span>Not included</span>
          </div>-->
        </div>
      </div>
      <div class="sub-cont" v-if="checked" :class="{'mt-m3': !included}">
        <!-- <textarea 
          class="text"
          :placeholder="`Describe your ${label}`"
        />-->
        <textarea
          class="text"
          v-model="currentItem.desc"
          :placeholder="`Add additional information`"
        />
      </div>
    </template>
    <template v-if="item.type==Number">
      <div class="main">
        <div class="check-cont">
          <div class="check-cont flex" @click="updateCheck()">
            <div
              class="img"
              :style="`
                background-image: url('${iconUrl}Group 6258.svg');
                background-repeat: no-repeat;
                background-size: contain;
              `"
              v-if="checked"
            ></div>
            <div
              class="img"
              :style="`
                background-image: url('${iconUrl}Rectangle 1245.svg');
                background-repeat: no-repeat;
                background-size: contain;
              `"
              v-else
            ></div>
            {{label}}
          </div>
          <div class="how-many" v-if="checked">
            How Many?
            <input type="number" placeholder="QTY" v-model="currentItem.value" />
          </div>
        </div>
        <div class="included-cont" v-if="checked && !item.xIncluded">
          <div class="included" :class="{'active': included}" @click="updateIncluded()">
            <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="included" />
            <span class="unchecked" v-else></span>
            <span>Included</span>
          </div>
          <div class="flex-1 mr-m1">
            <div class="included" :class="{'active': !included}" @click="updateIncluded()">
              <img :src="`${iconUrl}Group 5489 (3).svg`" v-if="!included" />
              <span class="unchecked" v-else></span>
              <span>Not included</span>
            </div>
            <div class="extra-field" v-if="!included">
              How much extra?
              <input type="number" placeholder="00.00" v-model="currentItem.value" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="item.type==Array">
      <div class="main">
        <div class="check-cont">
          <div class="check-cont flex" @click="updateCheck()">
            <div
              class="img"
              :style="`
                background-image: url('${iconUrl}Group 6258.svg');
                background-repeat: no-repeat;
                background-size: contain;
              `"
              v-if="checked"
            ></div>
            <div
              class="img"
              :style="`
                background-image: url('${iconUrl}Rectangle 1245.svg');
                background-repeat: no-repeat;
                background-size: contain;
              `"
              v-else
            ></div>
            {{label}}
          </div>
          <div class="dropdown-list" v-if="checked" @click="expanded=!expanded">
            <div class>{{label}}</div>
          </div>
          <div class="dropdown-cont" v-if="expanded && checked">
            <img :src="`${iconUrl}Asset 524.svg`" />
            <ul>
              <li v-for="(a, aIndex) in item.available" :key="aIndex">
                <div class="check-field" @click="updateExChecked(a)">
                  <img :src="`${iconUrl}Group 5479 (2).svg`" v-if="exChecked.includes(a)" />
                  <span class="blank-circle" v-else />
                  <span class="text" :class="{'checked': exChecked.includes(a)}">{{a}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="included-cont" v-if="checked">
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
        </div>-->
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

export default {
  name: "vendor-checkbox",
  props: {
    type: String,
    label: String,
    item: Object,
    vendor: Object,
  },
  components: {
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
      },
      exChecked: [],
      iconUrl:
        "https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/",
    };
  },
  created() {},
  mounted() {
    if (this.vendor) {
      const item = this.vendor.services[this.camelize(this.label)];
      if (item) {
        this.included = item.included;
        this.checked = item.checked;
        this.currentItem.value = JSON.stringify(item.value);
        this.currentItem.desc = item.desc;
        this.exChecked = item.value;
        console.log(this.currentItem);
      }
    }
  },
  methods: {
    updateExChecked(item) {
      if (this.exChecked.includes(item)) {
        this.exChecked = this.exChecked.filter((d) => d != item);
      } else {
        this.exChecked.push(item);
      }
      this.currentItem.value = this.exChecked;
      this.$root.$emit(
        "update-vendor-value",
        `services.${this.camelize(this.label)}`,
        this.currentItem,
      );
    },
    updateCheck() {
      this.checked = !this.checked;
      this.currentItem.checked = this.checked;
      this.$root.$emit(
        "update-vendor-value",
        `services.${this.camelize(this.label)}`,
        this.currentItem,
      );
    },
    updateIncluded() {
      this.included = !this.included;
      this.currentItem.included = this.included;
      this.$root.$emit(
        "update-vendor-value",
        `services.${this.camelize(this.label)}`,
        this.currentItem,
      );
    },
    camelize(str) {
      let temp = str.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
      });
      return temp.charAt(0).toLowerCase() + temp.slice(1);
    },
  },
  computed: {},
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
  padding: 15px 60px;
  cursor: pointer;

  .main {
    display: flex;

    .check-cont {
      margin-right: 1rem;
      align-items: flex-start;
      flex: 2;
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
    .included-cont {
      display: flex;
      justify-content: center;
      align-items: baseline;
      flex: 3;
      .included {
        display: flex !important;
        align-items: center;
        margin-right: 1.5rem;
        img {
          width: 30px;
          height: 30px;
          margin-right: 14px;
        }
      }
      .extra-field {
        padding: 1rem 0 0 44px;
        width: calc(100% + 44px);
        .field {
          display: inline-block;
          &:before {
            content: "$";
            position: absolute;
            margin-top: 9px;
            margin-left: 4rem;
          }
          input {
            margin-left: 0.5rem;
            text-align: center;
            border-radius: 3px;
            border: 1px solid #818080;
            max-width: 100%;
            font: normal 16px Manrope-Regular, sans-serif;
            color: #050505;
          }
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
