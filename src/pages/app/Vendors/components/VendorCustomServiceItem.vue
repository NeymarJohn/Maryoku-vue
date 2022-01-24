<template>
  <div>
    <form @submit.prevent style="display: flex; justify-content: space-between;">
      <div>
        <label class="titles" v-text="'Add Services'"></label>
        <input @input="addService = $event.target.value" v-model="addService" type="text" style="min-width:555px" />
      </div>

      <div>
        <label class="titles" v-text="'Price'"></label>
        <money
          v-model="price"
          v-bind="{
            decimal: '.',
            thousands: ',',
            prefix: '$ ',
            suffix: '',
            precision: 2,
            masked: false,
          }"
          style="text-align: center; max-width: 166px"
          @input="price = $event"
        />
      </div>

      <div style="margin-top: 25px; width: 166px">
        <input
          v-model="virtualService"
          type="checkbox"
          id="check"
          class="custom-checkbox"
          @input="virtualService = $event.target.checked"
          style="cursor: pointer"
        />
        <label class="virtual-services service" v-text="'Virtual services'" for="check"></label>
      </div>

      <button @click="addedService" class="button-add-custom-service">Add</button>
    </form>

    <div>
      <div v-for="service in vendor.services.customService" :key="service.id" style="background-color: #f7f7f7;">
        <div class="wrapper-service" v-if="editingItem == service.id">
          <input type="text" style="min-width: 555px; height: 20px; margin-top: 18px;" v-model="editingInput" />
          <money
            v-model="editingItemPrice"
            v-bind="{
              decimal: '.',
              thousands: ',',
              prefix: '$ ',
              suffix: '',
              precision: 2,
              masked: false,
            }"
            style="text-align: center; max-width: 166px; max-height: 50px; margin-top: 18px"
            @input="editingPrice = $event"
          />
          <span class="service">
            <input
              v-model="editingItemChecked"
              type="checkbox"
              class="custom-checkbox"
              id="newCheck"
              style="cursor: pointer"
              @input="editingChecked = $event.target.checked"
            />
            <label
              class="virtual-services service"
              v-text="'Virtual services'"
              for="newCheck"
              style="margin: 0; width: 166px"
            ></label>
          </span>
          <span style="height: 25px; margin-top: 30px; min-width: 104.22px; text-align: end">
            <img
              src="https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 562.svg"
              width="22"
              height="22"
              style="cursor: pointer"
              :id="service.id"
              @click="saveEditItem"
            />
            <img
              src="https://static-maryoku.s3.amazonaws.com/storage/icons/VirtualServices/Group 22420.svg"
              style="cursor: pointer; margin-left: 25px"
              @click="removeService"
              :id="service.id"
            />
          </span>
        </div>

        <div class="wrapper-service" v-else>
          <span class="service" style="min-width: 555px">{{ service.name }}</span>
          <span class="service" style="font-weight: normal; text-align: center;">{{ `$ ${service.price}` }}</span>
          <span class="service">
            <input v-model="service.checked" type="checkbox" class="custom-checkbox" />
            <label v-text="'Virtual services'"></label>
          </span>
          <span style="height: 25px; margin-top: 30px; min-width: 104.22px; text-align: end">
            <img
              src="https://static-maryoku.s3.amazonaws.com/storage/icons/VirtualServices/Group 22425.svg"
              style="cursor: pointer"
              :id="service.id"
              :name="service.name"
              :price="service.price"
              :checked="service.checked"
              @click="editItem"
            />
            <img
              src="https://static-maryoku.s3.amazonaws.com/storage/icons/VirtualServices/Group 22420.svg"
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
import { Money } from 'v-money'

export default {
  name: 'vendor-custom-service-item',
  components: {
    Money,
  },
  props: {
    vendor: Object,
  },
  data () {
    return {
      header: 'Custom Service',
      conditionTooltip: false,
      virtualService: false,

      editingItemChecked: null,
      editingChecked: false,

      editingItemPrice: null,
      editingPrice: '0.00',

      editingItem: null,
      editingInput: '',

      collapsed: true,
      addService: '',
      price: '0.00',
    }
  },
  mounted () {
    this.vendor.services.customService = []
  },

  methods: {
    addedService ({ target }) {
      if (!target.form[0].value || target.form[1].value === '$ 0.00') {
        return
      }
      const newService = {
        id: Date.now(),
        name: this.addService,
        price: this.price,
        checked: this.virtualService,
      }
      this.vendor.services.customService.push(newService)
      this.addService = ''
      this.price = ''
      this.virtualService = false
    },
    removeService ({ target }) {
      this.vendor.services.customService = this.vendor.services.customService.filter(
        service => service.id !== Number(target.id),
      )
    },
    editItem ({ target }) {
      this.editingItem = target.attributes.id.value
      this.editingInput = target.attributes.name.value
      this.editingItemPrice = target.attributes.price.value
      this.editingItemChecked = target.attributes.checked ? true : false
    },
    saveEditItem ({ target }) {
      this.vendor.services.customService.map(service =>
        service.id === Number(target.id)
          ? ((service.name = this.editingInput),
            (service.price = this.editingPrice),
            (service.checked = this.editingChecked))
          : service,
      )
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
  padding: 12.2px 36.6px 10.8px 36.7px;
  background-color: #641856;
  letter-spacing: normal;
  border-radius: 3px;
  line-height: 1.88;
  font-weight: 800;
  max-height: 53px;
  margin-top: 45px;
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
  margin-top: 30px;
  min-width: 166px;
  color: #050505;
}
</style>
