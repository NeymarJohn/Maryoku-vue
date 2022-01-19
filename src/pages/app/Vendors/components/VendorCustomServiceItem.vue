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
        <form @submit.prevent style="display: flex; justify-content: space-between;">
          <div>
            <label class="titles" v-text="'Add Services'"></label>
            <input
              @input="addService = $event.target.value"
              v-model="addService"
              type="text"
              style="margin-right: 15px; min-width:555px"
            />
          </div>

          <div>
            <label class="titles" v-text="'Price'"></label>
            <money v-model="price" style="text-align: center; max-width: 166px" @input="price = $event" />
          </div>

          <div style="margin-top: 55px">
            <input
              v-model="virtualService"
              type="checkbox"
              id="check"
              class="custom-checkbox"
              @input="virtualService = $event.target.checked"
              style="cursor: pointer"
            />
            <label class="virtual-services" v-text="'Virtual services'" for="check"></label>
          </div>

          <button @click="addedService" class="button-add-custom-service">Add</button>
        </form>

        <div>
          <div v-for="service in services" :key="service.id" style="background-color: #f7f7f7;">
            <div class="wrapper-service" v-if="editingItem == service.id">
              <input type="text" style="min-width: 555px; height: 20px; margin-top: 18px;" v-model="editingInput" />
              <span class="service" style="font-weight: normal">{{ service.price }}</span>
              <span class="service">
                <input v-model="service.checked" type="checkbox" class="custom-checkbox" />
                <label v-text="'Virtual services'"></label>
              </span>
              <span style="height: 25px; margin-top: 30px">
                <img
                  src="/static/icons/vendor/update.png"
                  width="22px"
                  height="22px"
                  style="cursor: pointer"
                  :id="service.id"
                  @click="saveEditItem"
                />
                <img
                  src="/static/icons/vendor/delete.png"
                  width="25px"
                  height="25px"
                  style="cursor: pointer; margin-left: 25px"
                  @click="removeService"
                  :id="service.id"
                />
              </span>
            </div>
            <div class="wrapper-service" v-else>
              <span class="service" style="min-width: 555px">{{ service.name }}</span>
              <span class="service" style="font-weight: normal">{{ service.price }}</span>
              <span class="service">
                <input v-model="service.checked" type="checkbox" class="custom-checkbox" />
                <label v-text="'Virtual services'"></label>
              </span>
              <span style="height: 25px; margin-top: 30px">
                <img
                  src="https://static-maryoku.s3.amazonaws.com/storage/icons/VirtualServices/Group 22425.svg"
                  width="22px"
                  height="22px"
                  style="cursor: pointer"
                  :name="service.name"
                  @click="editItem"
                />
                <img
                  src="https://static-maryoku.s3.amazonaws.com/storage/icons/VirtualServices/Group 22420.svg"
                  width="25px"
                  height="25px"
                  style="cursor: pointer; margin-left: 25px"
                  @click="removeService"
                  :id="service.id"
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
    vendorCategory: String,
    vendor: Object,
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
      editingItem: null,
      editingInput: '',
    }
  },
  methods: {
    addedService ({ target }) {
      if (!target.form[0].value || target.form[1].value === '0.0000') {
        return
      }
      const newService = {
        id: Date.now(),
        name: this.addService,
        price: this.price,
        checked: this.virtualService,
      }
      this.services.push(newService)
      this.addService = ''
      this.price = ''
      this.virtualService = false
    },
    removeService ({ target }) {
      this.services = this.services.filter(service => service.id !== Number(target.id))
    },
    editItem ({ target }) {
      this.editingItem = target.nextElementSibling.id
      this.editingInput = target.name
    },
    saveEditItem ({ target }) {
      this.services.map(service => (service.id === Number(target.id) ? (service.name = this.editingInput) : service))
      this.editingItem = null
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
    display: block;
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
    background-size: 100% 100%;
    display: inline-block;
    border-radius: 50%;
    margin-right: 13px;
    cursor: pointer;
    height: 30px;
    width: 30px;
    content: '';
  }
  .custom-checkbox:checked + label::before {
    background-image: url('https://static-maryoku.s3.amazonaws.com/storage/icons/VirtualServices/Group 22431.svg');
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
    margin-bottom: 30.6px;
    margin-top: 45.4px;
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
