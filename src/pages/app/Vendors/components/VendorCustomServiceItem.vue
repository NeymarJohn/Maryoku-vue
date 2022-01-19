<template>
  <div class="vendor-service-item-wrapper">
    <div>
      <div class="title-cont" @click="collapsed = !collapsed">
        <div class="title">{{ header }}</div>

        <div class="help d-flex justify-content-end align-center mr-20" v-if="!collapsed"></div>

        <div class="arrow" :class="{ expanded: !collapsed }" @click="collapsed = !collapsed">
          <img class="mt-5" :src="`${$iconURL}common/arrow-right-purple.svg`" />
        </div>
      </div>

      <div class="items-cont" v-if="!collapsed">
        <form v-on:submit.prevent>
          <span>
            <label class="titles" v-text="'Add Services'"></label>
            <input v-model="addService" type="text" style="margin-right: 15px; min-width:555px" />
          </span>

          <span>
            <label class="titles" v-text="'Price'"></label>
            <money v-model="price" v-bind="currencyFormat" style="text-align: center; max-width: 166px" />
          </span>

          <span style="margin-top: 55px">
            <input v-model="virtualService" type="checkbox" id="check" class="custom-checkbox" />
            <label class="virtual-services" v-text="'Virtual services'" for="check"></label>
          </span>

          <button v-on:click="addedService" class="button-add-custom-service">Add</button>
        </form>

        <div>
          <div
            v-for="service in services"
            :key="service.id"
            style="padding: 30px 43.1px 33.5px 65px; background-color: #f7f7f7;"
          >
            <div class="wrapper-service">
              <span class="service" style="min-width: 555px">{{ service.name }}</span>
              <span class="service" style="font-weight: normal">{{ service.price }}</span>
              <span class="service">
                <input v-model="service.checked" type="checkbox" id="check" class="custom-checkbox" />
                <label v-text="'Virtual services'" for="check"></label>
              </span>
              <span style="height: 25px">
                <img src="/static/icons/vendor/update.png" width="22px" height="22px" style="cursor: pointer" />
                <img
                  src="/static/icons/vendor/delete.png"
                  width="25px"
                  height="25px"
                  style="cursor: pointer; margin-left: 25px"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vendor-custom-service-item',
  props: {
    serviceItem: Object,
    vendorCategory: String,
    vendor: Object,
    service: Object,
    theme: {
      type: String,
      default: 'red',
    },
  },
  data () {
    return {
      collapsed: true,
      conditionTooltip: false,
      header: 'Custom Service',
      addService: '',
      price: '',
      virtualService: false,
      iconUrl: 'https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/',
      services: [],
      currencyFormat: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        suffix: '',
        precision: 2,
        masked: false,
      },
    }
  },
  methods: {
    addedService ({ target }) {
      console.log(target)
      if (!target.form[0].value || !target.form[1].value) {
        return
      }
      this.services.push({
        id: Date.now(),
        name: target.form[0].value,
        price: target.form[1].value,
        checked: target.form[2].checked,
      })
      console.log(this.services)
    },
  },
}
</script>
<style lang="scss" scoped>
.vendor-service-item-wrapper {
  font-family: Manrope-Regular, sans-serif;
  color: #050505;
  background: #ffffff;
  box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  .title-cont {
    display: flex;
    justify-content: space-between;
    padding: 60px;
    cursor: pointer;
    .title {
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
    padding: 32px 41px 45.4px 64px;
    justify-content: space-between;
    background-color: #f7f7f7;
    border-radius: 0.5px;
    // display: flex;
  }
  .titles {
    font-family: 'Manrope-ExtraBold';
    letter-spacing: normal;
    display: inline-block;
    font-stretch: normal;
    margin-bottom: 21px;
    line-height: normal;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    color: #050505;
  }
  .custom-checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  .custom-checkbox + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  .custom-checkbox + label::before {
    background-position: center center;
    background-repeat: no-repeat;
    border: 1px solid #b7b5b5;
    background-size: 50% 50%;
    display: inline-block;
    border-radius: 50%;
    margin-right: 13px;
    height: 30px;
    width: 30px;
    content: '';
  }
  .custom-checkbox:checked + label::before {
    background-image: url('https://img.icons8.com/material-outlined/24/000000/cloud--v1.png');
    background-color: #641856;
    border-color: #641856;
  }
  .button-add-custom-service {
    padding: 12.2px 36.6px 10.8px 36.7px;
    font-family: 'Manrope-ExtraBold';
    background-color: #641856;
    letter-spacing: normal;
    font-stretch: normal;
    margin-left: 32.7px;
    border-radius: 3px;
    font-style: normal;
    line-height: 1.88;
    font-weight: 800;
    max-height: 53px;
    margin-top: 45px;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    border: none;
  }
  .wrapper-service {
    border-bottom: solid 0.5px #707070;
    border-top: solid 0.5px #707070;
    justify-content: space-between;
    min-height: 88px;
    display: flex;
  }
  .service {
    display: inline-block;
    font-family: 'Manrope-Regular';
    letter-spacing: normal;
    font-stretch: normal;
    line-height: normal;
    font-style: normal;
    font-weight: 600;
    color: #050505;
    font-size: 16px;
    margin-top: 30px;
  }
}
</style>
