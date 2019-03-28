<template>
    <div class="vendor-form">
        <md-card >
            <md-card-header class="md-card-header-icon md-card-header-rose">
                <div class="card-icon">
                    <md-icon>mail_outline</md-icon>
                </div>
                <h4 class="title2">{{selected_vendor.vendorDisplayName}}’s Company</h4>
                <md-card-actions md-alignment="right">
                    <md-button v-if="creation_mode" class="md-success md-sm" @click="addVendor" >Create</md-button>
                    <md-button v-else-if="!creation_mode" class="md-info md-sm" @click="saveVendor">Save</md-button>
                </md-card-actions>
            </md-card-header>

            <md-card-content class="md-layout">
                <div class="md-layout-item md-size-100">
                    <md-field  :class="[
                          {'md-valid': !errors.has('vendorDisplayName') && selected_vendor.vendorDisplayName},
                          {'md-error': errors.has('vendorDisplayName')}]">
                        <label>Vendor Name</label>
                        <md-input
                                v-model="selected_vendor.vendorDisplayName"
                                type="text"
                                required
                                data-vv-name="vendorDisplayName"
                                name="vendorDisplayName"
                                v-validate="modelValidations.vendorDisplayName"
                        ></md-input>
                        <slide-y-down-transition>
                            <md-icon class="error" v-show="errors.has('vendorDisplayName')">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                            <md-icon class="success" v-show="!errors.has('vendorDisplayName') && selected_vendor.vendorDisplayName">done</md-icon>
                        </slide-y-down-transition>

                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field :class="[
                          {'md-valid': !errors.has('vendorWebsite') && selected_vendor.vendorWebsite},
                          {'md-error': errors.has('vendorWebsite')}]">
                        <label>Website</label>
                        <md-input v-model="selected_vendor.vendorWebsite"
                                  type="text"
                                  required
                                  data-vv-name="vendorWebsite"
                                  name="vendorWebsite"
                                  v-validate="modelValidations.vendorWebsite"></md-input>

                        <slide-y-down-transition>
                            <md-icon class="error" v-show="errors.has('vendorWebsite')">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                            <md-icon class="success" v-show="!errors.has('vendorWebsite') && selected_vendor.vendorWebsite">done</md-icon>
                        </slide-y-down-transition>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field :class="[
                          {'md-valid': !errors.has('vendorMainEmail') && selected_vendor.vendorMainEmail},
                          {'md-error': errors.has('vendorMainEmail')}]">
                        <label>Email</label>
                        <md-input v-model="selected_vendor.vendorMainEmail"
                                  type="email"
                                  required
                                  data-vv-name="vendorMainEmail"
                                  name="vendorMainEmail"
                                  v-validate="modelValidations.vendorMainEmail"></md-input>
                        <slide-y-down-transition>
                            <md-icon class="error" v-show="errors.has('vendorMainEmail')">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                            <md-icon class="success" v-show="!errors.has('vendorMainEmail') && selected_vendor.vendorMainEmail">done</md-icon>
                        </slide-y-down-transition>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field :class="[
                          {'md-valid': !errors.has('vendorAddressLine1') && selected_vendor.vendorAddressLine1},
                          {'md-error': errors.has('vendorAddressLine1')}]">
                        <label>Address</label>
                        <md-input v-model="selected_vendor.vendorAddressLine1"
                                  type="email"
                                  required
                                  data-vv-name="vendorAddressLine1"
                                  name="vendorAddressLine1"
                                  v-validate="modelValidations.vendorAddressLine1"></md-input>
                        <slide-y-down-transition>
                            <md-icon class="error" v-show="errors.has('vendorAddressLine1')">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                            <md-icon class="success" v-show="!errors.has('vendorAddressLine1') && selected_vendor.vendorAddressLine1">done</md-icon>
                        </slide-y-down-transition>
                    </md-field>

                </div>

                <div  class="md-layout-item md-size-50">
                    <md-field :class="[
                    {'md-valid': !errors.has('vendorMainPhoneNumber') && selected_vendor.vendorMainPhoneNumber},
                    {'md-error': errors.has('vendorMainPhoneNumber')}]">
                        <label>Phone Number</label>
                        <md-input
                                  v-model="selected_vendor.vendorMainPhoneNumber"
                                  type="number"
                                  required
                                  data-vv-name="vendorMainPhoneNumber"
                                  name="vendorMainPhoneNumber"
                                  v-validate="modelValidations.vendorMainPhoneNumber"></md-input>
                        <slide-y-down-transition>
                            <md-icon class="error" v-show="errors.has('vendorMainPhoneNumber')">close</md-icon>
                        </slide-y-down-transition>
                        <slide-y-down-transition>
                            <md-icon class="success" v-show="!errors.has('vendorMainPhoneNumber') && selected_vendor.vendorMainPhoneNumber">done</md-icon>
                        </slide-y-down-transition>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field >
                        <label for="category">Category</label>
                        <md-select v-model="selected_vendor.vendorCategory" name="select">
                            <md-option v-for="(option, index) in vendorCategory"  :key="index"  :value="option.id">{{ option.value }}</md-option>
                        </md-select>

                    </md-field>
                </div>
                <div class="md-layout-item md-size-50" v-if="selected_vendor.vendorTagging">
                    <md-field>
                        <md-chips v-model="selected_vendor.vendorTagging" name="tagging" id="tagging" md-placeholder="Tagging" md-check-duplicated></md-chips>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-100 margin-bottom_30">&nbsp;</div>

                <div class="md-layout-item md-size-33">
                    <label>Contact Person</label>
                </div>
                <div class="md-layout-item md-size-33">
                    <label>Email Address</label>

                </div>
                <div class="md-layout-item md-size-30">
                    <label>Phone Number</label>
                </div>

                <div v-for="(contactPerson , index) in selected_vendor.vendorContactPerson" :key="index" class="md-layout-item md-size-100 contact-person-list">
                    <div class="md-layout-item md-size-33">
                        <md-field >
                            <md-input v-model="contactPerson.name" :name="'name_' + index" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-33">
                        <md-field >
                            <md-input v-model="contactPerson.email" :name="'email_' + index"  type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-30">
                        <md-field >
                            <md-input v-model="contactPerson.phone_number"  :name="'phone_number_' + index" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="delete-item" v-if="selected_vendor.vendorContactPerson.length > 1" @click="deleteContactPersonItem(index)">
                        <md-icon  class="md-theme-rose" > delete_outline</md-icon>
                    </div>
                </div>

                <div class="md-layout-item md-size-100">
                    <md-button class="md-purple md-xs" @click="addContactPerson">+ Add contact person</md-button>
                </div>


                <div class="md-layout-item md-size-100">

                        <label>Attachments</label>
                        <div v-for="(attachment , index) in selected_vendor.vendorAttachments" :key="index" class="md-layout-item md-size-100 contact-person-list">
                            <md-field>
                                <md-file v-model="attachment.path" />
                                <div class="delete-item" @click="deleteAttachmentItem(index)">
                                    <md-icon  class="md-theme-rose" > delete_outline</md-icon>
                                </div>
                            </md-field>

                        </div>
                </div>
                <div class="md-layout-item md-size-100">
                    <md-button class="md-purple md-xs" @click="addAttachment">+ Add Attachment</md-button>
                </div>


            </md-card-content>
        </md-card>
    </div>
</template>

<script>

    import Vue from 'vue';
    import Vendors from "@/models/Vendors";
    import VendorCategories from "@/models/VendorCategories";
    import swal from "sweetalert2";
    import {SlideYDownTransition} from "vue2-transitions";

    export default {
        components: {
            SlideYDownTransition

        },
        props: {
            selected_vendor : {
                type : Object,
                default : {}
            },
            creation_mode : {
                type : Boolean,
                default : false
            }

        },
      created() {
          /**
           * Get categories for vendors
           */
          Vendors.find('categories').then(categories => {
              this.vendorCategory = categories;

          }, (error) => {
              console.log(error)
          });

      },
        beforeUpdate(){

            if ( !this.selected_vendor.vendorContactPerson ) {
                this.selected_vendor.vendorContactPerson=[{
                    name : null,
                    email : null,
                    phone_number : null
                }]
            }

            if ( !this.selected_vendor.vendorAttachments ) {
                this.selected_vendor.vendorAttachments=[];
            }


            if ( !this.selected_vendor.vendorTagging ) {
                this.selected_vendor.vendorTagging=[];
            }
        },
        mounted() {


        },
        data() {
            return {
                company : {},
                vendorCategory: [],
                contactPersonList : [],
                vendorAttachments : [],
                modelValidations: {
                    vendorDisplayName: {
                        required: true,
                        min: 5
                    },
                    vendorAddressLine1: {
                        required: true,
                        min: 5
                    },
                    vendorMainEmail: {
                        required: true,
                        email: true
                    },
                    vendorWebsite: {
                        required: true,
                        min: 5
                    },
                    vendorMainPhoneNumber: {
                        required: true,
                        min: 5
                    }
                }
            }
        },
        methods: {
            /**
             * Modify selected vendor from vendors list
             */
            async saveVendor() {
                let vendor = await Vendors.find(this.selected_vendor.id);

                vendor.vendorDisplayName = this.selected_vendor.vendorDisplayName;
                vendor.vendorWebsite = this.selected_vendor.vendorWebsite;
                vendor.vendorMainEmail = this.selected_vendor.vendorMainEmail;
                vendor.vendorAddressLine1 = this.selected_vendor.vendorAddressLine1;
                vendor.vendorMainPhoneNumber = this.selected_vendor.vendorMainPhoneNumber;
                vendor.vendorCategory = this.selected_vendor.vendorCategory;
                vendor.vendorTagging = this.selected_vendor.vendorTagging;
                vendor.vendorContactPerson = this.selected_vendor.vendorContactPerson;
                vendor.vendorAttachments = this.selected_vendor.vendorAttachments;
                vendor.save();

                this.$notify(
                    {
                        message: 'Vendor Updated successfully!',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success'
                    })


            },
            /**
             * Add new contact person to the selected vendor
             */
            addContactPerson() {
                console.log('i am here');
                this.selected_vendor.vendorContactPerson.push({
                    name : null,
                    email : null,
                    phone_number : null
                });
                this.$forceUpdate();

            },
            /**
             * Delete item from contact person list
             * @param index
             */
            deleteContactPersonItem(index) {
                this.selected_vendor.vendorContactPerson.splice(index,1);
            },
            /**
             * Add new attachment file to the selected vendor
             */
            addAttachment() {
                this.selected_vendor.vendorAttachments.push({
                    path : null
                });
                this.$forceUpdate();
            },
            /**
             * Delete item from attachments list
             * @param index
             */
            deleteAttachmentItem(index) {
                this.selected_vendor.vendorAttachments.splice(index,1);
            },
            async addVendor() {
                this.$validator.validateAll().then(res => {

                    if(res){
                        let vendor = new Vendors({});

                        vendor.attach(this.selected_vendor).then(() => {
                            this.$emit('vendorCreated')
                            this.$notify(
                                {
                                    message: 'Vendor created successfully!',
                                    horizontalAlign: 'center',
                                    verticalAlign: 'top',
                                    type: 'success'
                                })

                        });


                    }else {
                        this.$emit("on-validated", res);
                        return res;
                    }

                });
            }

        }
    };
</script>
