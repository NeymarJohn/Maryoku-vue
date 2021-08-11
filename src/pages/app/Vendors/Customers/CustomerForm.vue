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
            <h3 class="font-size-24 font-bold-extra m-0">Customer Details</h3>
            <p class="font-size-14">You can input the information by clicking on it</p>
            <div class="md-layout">
                <md-field class="md-layout-item md-size-45 mt-20">
                    <label>Company Name</label>
                    <md-input
                        class="form-input"
                        v-model="customerModel.companyName"
                    ></md-input>
                </md-field>
                <md-field class="md-layout-item md-size-45 mt-20 ml-auto">
                    <label>EIN:</label>
                    <md-input
                        class="form-input"
                        v-model="customerModel.ein"
                    ></md-input>
                </md-field>
                <md-field class="md-layout-item md-size-45 mt-20">
                    <label>Address</label>
                    <md-input
                        class="form-input"
                        v-model="customerModel.address"
                    ></md-input>
                </md-field>
                <md-field class="md-layout-item md-size-45 mt-20 ml-auto">
                    <label>Country</label>
                    <md-input
                        class="form-input"
                        v-model="customerModel.country"
                    ></md-input>
                </md-field>
                <md-field class="md-layout-item md-size-100 mt-20">
                    <label>Contact Name</label>
                    <md-input
                        class="form-input"
                        v-model="customerModel.name"
                    ></md-input>
                </md-field>
                <md-field class="md-layout-item md-size-100 mt-20">
                    <label>Phone</label>
                    <md-input
                        class="form-input"
                        v-model="customerModel.phone"
                    ></md-input>
                </md-field>
                <md-field class="md-layout-item md-size-100 mt-20">
                    <label>Email:</label>
                    <md-input
                        class="form-input"
                        v-model="customerModel.email"
                    ></md-input>
                </md-field>
                <div class="d-flex align-center mt-20 width-100">
                    <md-button class="md-simple md-black ml-auto mr-20" @click="$emit('close')">Cancel</md-button>
                    <md-button class="md-vendor" @click="save">Save Changes</md-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Loader, Modal, MaryokuInput } from "@/components";

    export default {
        components: {
            Loader,
            Modal,
            MaryokuInput
        },
        props:{
            customer:{
                type: Object,
                default: null,
            }
        },
        data(){
            return {
                showBookedVendorModal: true,
                customerModel: this.customer ? this.customer : {
                    companyName: null,
                    ein: null,
                    address : null,
                    country: null,
                    name: null,
                    phone: null,
                    email: null,
                },
            }
        },
        methods:{
            save(){
                this.$emit('save', this.customerModel);
            }
        }
    }
</script>
<style>
</style>
