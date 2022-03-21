<template>
  <div>
    <form style="display: flex; justify-content: space-between;" @submit.prevent>
      <div>
        <label class="titles" v-text="'Add Services'" />
        <input v-model="addService" type="text" style="min-width:555px" @input="addService = $event.target.value">
      </div>

      <div>
        <label class="titles" v-text="'Price'" />
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
          id="check"
          v-model="virtualService"
          type="checkbox"
          class="custom-checkbox"
          style="cursor: pointer"
          @input="virtualService = $event.target.checked"
        >
        <label class="virtual-services service" for="check" v-text="'Virtual services'" />
      </div>

      <button class="button-add-custom-service" @click="addedService">
        Add
      </button>
    </form>

    <div>
      <div v-for="(service, index) in services" :key="service.id" style="background-color: #f7f7f7;">
        <div v-if="editingItem == service.id" class="wrapper-service">
          <input v-model="services[index].name" type="text" style="min-width: 555px; height: 20px; margin-top: 18px;">
          <money
            v-model="services[index].price"
            v-bind="{
              decimal: '.',
              thousands: ',',
              prefix: '$ ',
              suffix: '',
              precision: 2,
              masked: false,
            }"
            style="text-align: center; max-width: 166px; max-height: 50px; margin-top: 18px"
          />
          <span class="service">
            <input
              id="newCheck"
              v-model="services[index].checked"
              type="checkbox"
              class="custom-checkbox"
              style="cursor: pointer"
            >
            <label
              class="virtual-services service"
              for="newCheck"
              style="margin: 0; width: 166px"
              v-text="'Virtual services'"
            />
          </span>
          <span style="height: 25px; margin-top: 30px; min-width: 104.22px; text-align: end">
            <img
              :id="service.id"
              src="https://static-maryoku.s3.amazonaws.com/storage/icons/Vendor Signup/Asset 562.svg"
              width="22"
              height="22"
              style="cursor: pointer"
              :name="service.name"
              :price="service.price"
              :checked="service.checked"
              @click="saveEditItem"
            >
            <img
              :id="service.id"
              src="https://static-maryoku.s3.amazonaws.com/storage/icons/VirtualServices/Group 22420.svg"
              style="cursor: pointer; margin-left: 25px"
              @click="removeService"
            >
          </span>
        </div>

        <div v-else class="wrapper-service">
          <span class="service" style="min-width: 555px">{{ service.name }}</span>
          <span class="service" style="font-weight: normal; text-align: center;">{{ `$ ${service.price}` }}</span>
          <span class="service">
            <input v-model="service.checked" type="checkbox" class="custom-checkbox">
            <label v-text="'Virtual services'" />
          </span>
          <span style="height: 25px; margin-top: 30px; min-width: 104.22px; text-align: end">
            <img
              :id="service.id"
              src="https://static-maryoku.s3.amazonaws.com/storage/icons/VirtualServices/Group 22425.svg"
              style="cursor: pointer"
              :name="service.name"
              :price="service.price"
              :checked="service.checked"
              @click="editItem"
            >
            <img
              :id="service.id"
              src="https://static-maryoku.s3.amazonaws.com/storage/icons/VirtualServices/Group 22420.svg"
              style="cursor: pointer; margin-left: 25px"
              @click="removeService"
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Money } from "v-money";

export default {
  name: "VendorCustomServiceItem",
  components: {
    Money,
  },
  props: {
    vendor: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      services: [],
      virtualService: false,
      editingItemChecked: null,
      editingChecked: false,
      editingItemPrice: null,
      editingPrice: "0.00",
      editingItem: null,
      editingInput: "",
      collapsed: true,
      addService: "",
      price: "0.00",
    };
  },
  mounted () {
    this.services = this.vendor.services.customService ?
      this.vendor.services.customService.data :
      [];
  },
  methods: {
    addedService ({ target }) {
      if (!target.form[0].value || target.form[1].value === "$ 0.00") {
        return;
      }
      const newService = {
        id: Date.now(),
        name: this.addService,
        price: this.price.toFixed(2),
        checked: this.virtualService,
      };
      this.services.push(newService);
      this.addService = "";
      this.price = "";
      this.virtualService = false;
      this.updateRootState();
    },
    removeService ({ target }) {
      this.services = this.services.filter(
        service => service.id != Number(target.id),
      );
      this.updateRootState();
    },
    editItem ({ target }) {
      this.editingItem = target.attributes.id.value;
    },
    saveEditItem ({ target }) {
      this.services = this.services.map(service => {
        if (service.id == Number(target.id)) {
          return {...service, price: service.price.toFixed(2)};
        }
        return service;
      });
      this.editingItem = "";
      this.updateRootState();
    },
    updateRootState() {
      this.$root.$emit("update-vendor-value", "services.customService", {data: this.services});
    }
  },
};
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
  display: block;
  letter-spacing: normal;
  margin-bottom: 21px;
  line-height: normal;
  color: #050505;
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
