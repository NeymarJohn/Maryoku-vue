<template>
  <div class="position-relative">
    <md-button
      class="md-simple position-absolute"
      style="top: 0;right:0"
      @click="$emit('close')"
    >
      <md-icon>close</md-icon>
    </md-button>
    <div class="text-left">
      <h3 class="font-size-24 font-bold-extra m-0">
        Customer Details
      </h3>
      <p class="font-size-14">
        You can input the information by clicking on it
      </p>
      <div class="md-layout">
        <div class="md-layout-item pl-0 md-size-45 mt-30">
          <label>Company Name</label>
          <maryoku-input
            v-model="customerModel.companyName"
            class="mt-5 form-input"
            placeholder="Type the company name here..."
          />
        </div>
        <div class="md-layout-item pl-0 md-size-45 mt-30 ml-auto">
          <label>Contact Name</label>
          <maryoku-input
            v-model="customerModel.name"
            placeholder="Type the contact name here..."
            class="mt-5 form-input"
          />
        </div>
        <div class="md-layout-item pl-0 md-size-45 mt-30">
          <label>Location</label>
          <location-input
            v-model="customerModel.location"
            class=" mt-5"
            placeholder="Type the location here..."
            theme="purple"
            :value="customerModel.location"
          />
        </div>
        <div class="md-layout-item pl-0 md-size-45 mt-30 ml-auto">
          <label>EIN:</label>
          <maryoku-input
            v-model="customerModel.ein"
            placeholder="Type the EIN here..."
            class="mt-5 form-input"
          />
        </div>

        <div class="md-layout-item pl-0 md-size-100 mt-30">
          <label>Phone Number</label>
          <maryoku-input
            v-model="customerModel.phone"
            input-style="phone"
            placeholder="Type the phone number here..."
            class="mt-5"
          />
        </div>
        <div class="md-layout-item pl-0 md-size-100 mt-30">
          <label>Email:</label>
          <maryoku-input
            v-model="customerModel.email"
            v-validate="'required|email|unique'"
            class="mt-5"
            input-style="email"
            data-vv-name="email"
            placeholder="Type the email address here..."
          />
        </div>
        <div v-if="errors.has('email')" class="md-error color-red font-size-14">
          {{ errors.first('email') }}
        </div>
        <div class="d-flex align-center mt-30 width-100">
          <md-button class="md-simple md-black ml-auto mr-20" @click="$emit('close')">
            Cancel
          </md-button>
          <md-button class="md-vendor" @click="save">
            {{ action === 'create' ? 'Save' : 'Save Changes' }}
          </md-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import { MaryokuInput, LocationInput } from "@/components";
    import { postReq, getReq } from "@/utils/token";
    import {Validator} from "vee-validate";

    export default {
        components: {
            MaryokuInput,
            LocationInput,
        },
        props:{
            customer:{
                type: Object,
                default: null,
            },
            name:{
                type: String,
            },
            vendorId:{
                type: String,
                default: null,
            },
            action:{
                type: String,
                default: "create",
            }
        },
        data(){
            return {
                showBookedVendorModal: true,
                customerModel: this.action === "edit" ? this.customer : {
                    companyName: null,
                    ein: null,
                    location : null,
                    name: this.name,
                    phone: null,
                    email: null,
                },
            };
        },
        watch:{
            name(newVal){this.customerModel.name = newVal;}
        },
        mounted() {
            const isUnique = async value => {
                let customer = await getReq(`/1/customers?email=${value}&vendorId=${this.vendorId}`);

                if (!customer.data || Array.isArray(customer.data) && !customer.data.length) {
                    return {valid: true};
                } else {
                    return {
                        valid: false,
                        data: {message: "Email already exists."}
                    };
                }
            };
            Validator.extend("unique", {
                validate: isUnique,
                getMessage: (field, params, data) => data.message
            });
        },
        methods:{
            changeAddress(address){
                console.log("changeAddress", address);
                this.customerModel.location = address;
            },
            save(){
                this.$validator.validateAll().then((isValid) => {
                    if (isValid) {
                        console.log("validate");
                        this.$emit("save", this.customerModel);
                    }
                });

            }
        }
    };
</script>
<style lang="scss" scoped>
</style>
