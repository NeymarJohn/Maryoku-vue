<template>
  <div>
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
      <div v-for="service in vendor.customService" :key="service.id" style="background-color: #f7f7f7;">
        <div class="wrapper-service" v-if="editingItem == service.id">
          <input type="text" style="min-width: 555px; height: 20px; margin-top: 18px;" v-model="editingInput" />
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
              :id="service.id"
              @click="saveEditItem"
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
</template>

<script>
export default {
  name: 'vendor-custom-service-item',
  props: {
    vendor: Object,
  },
  data () {
    return {
      collapsed: true,
      conditionTooltip: false,
      header: 'Custom Service',
      addService: '',
      price: 0,
      virtualService: false,
      iconUrl: 'https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/',
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
  mounted () {
    this.vendor.customService = []
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
      this.vendor.customService.push(newService)
      this.addService = ''
      this.price = ''
      this.virtualService = false
    },
    removeService ({ target }) {
      this.vendor.customService = this.vendor.customService.filter(service => service.id !== Number(target.id))
    },
    editItem ({ target }) {
      this.editingItem = target.nextElementSibling.id
      this.editingInput = target.name
    },
    saveEditItem ({ target }) {
      this.vendor.customService.map(service => (service.id === Number(target.id) ? (service.name = this.editingInput) : service))
      this.editingItem = null
    },
  },
}
</script>

<style lang="scss" scoped>
.titles {
  font: {
    family: 'Manrope-ExtraBold';
    stretch: normal;
    style: normal;
    weight: 800;
    size: 16px;
  }
  letter-spacing: normal;
  display: inline-block;
  margin-bottom: 21px;
  line-height: normal;
  color: #050505;
  display: block;
}
.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;

  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }

  & + label::before {
    background: {
      position: center center;
      repeat: no-repeat;
      size: 100% 100%;
    }
    border: 1px solid #b7b5b5;
    border-radius: 50%;
    display: inline-block;
    margin-right: 13px;
    cursor: pointer;
    height: 30px;
    width: 30px;
    content: '';
  }

  &:checked + label::before {
    background: {
      image: url('https://static-maryoku.s3.amazonaws.com/storage/icons/VirtualServices/Group 22431.svg');
      color: #641856;
    }
    border-color: #641856;
  }
}

.button-add-custom-service {
  font: {
    family: 'Manrope-ExtraBold';
    stretch: normal;
    style: normal;
    size: 16px;
  }
  margin: {
    left: 32.7px;
    top: 45px;
  }
  padding: 12.2px 36.6px 10.8px 36.7px;
  background-color: #641856;
  letter-spacing: normal;
  border-radius: 3px;
  line-height: 1.88;
  font-weight: 800;
  max-height: 53px;
  cursor: pointer;
  color: #fff;
  border: none;
}
.wrapper-service {
  border: {
    bottom: solid 0.5px #707070;
    top: solid 0.5px #707070;
  }
  margin: {
    bottom: 30.6px;
    top: 45.4px;
  }
  justify-content: space-between;
  min-height: 88px;
  display: flex;
}
.service {
  font: {
    family: 'Manrope-Regular';
    stretch: normal;
    style: normal;
    weight: 600;
    size: 16px;
  }
  letter-spacing: normal;
  display: inline-block;
  line-height: normal;
  color: #050505;
  margin-top: 30px;
}
</style>
