<template>
    <div class="vendor-form">
        <md-card >
            <md-card-header class="md-card-header-icon md-card-header-rose">
                <div class="card-icon">
                    <md-icon>mail_outline</md-icon>
                </div>
                <h4 class="title2">{{selected_vendor.vendorDisplayName}}’s Company</h4>
                <md-card-actions md-alignment="right">
                    <md-button class="md-info md-sm" @click="saveVendor">Save</md-button>
                </md-card-actions>
            </md-card-header>

            <md-card-content class="md-layout">
                <div class="md-layout-item md-size-100">
                    <md-field>
                        <label>Vendor Name</label>
                        <md-input v-model="selected_vendor.vendorDisplayName" type="text"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label>Website</label>
                        <md-input v-model="selected_vendor.vendorWebsite" type="text"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field >
                        <label>Email</label>
                        <md-input v-model="selected_vendor.vendorMainEmail" type="email"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label>Address</label>
                        <md-input v-model="selected_vendor.vendorAddressLine1" type="text"></md-input>
                    </md-field>

                </div>

                <div  class="md-layout-item md-size-50">
                    <md-field>
                        <label>Phone Number</label>
                        <md-input v-model="selected_vendor.vendorMainPhoneNumber" type="text"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label for="category">Category</label>
                        <md-select v-model="selected_vendor.vendorCategory" name="select">
                            <md-option v-for="(option, index) in vendorCategory"  :key="index"  :value="option.id">{{ option.value }}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-50">
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
                        <div v-for="(attachment , index) in vendorAttachments" :key="index" class="md-layout-item md-size-100 contact-person-list">
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
    import swal from "sweetalert2";

    export default {
        components: {


        },
        props: {
            selected_vendor : {
                type : Object,
                default : {}
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
        mounted() {


        },
        data() {
            return {
                company : {},
                vendorCategory: [],
                contactPersonList : [],
                vendorAttachments : []
            }
        },
        methods: {
            /**
             * Modify selected vendor from vendors list
             */
            saveVendor() {
                swal({
                    title: 'Are you sure that you want to edit this vendor?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Edit'
                }).then(async (result) => {
                    if (result.value) {
                        let vendor = await Vendors.find(this.selected_vendor.id);

                        vendor.vendorDisplayName = this.selected_vendor.vendorDisplayName;
                        vendor.vendorWebsite = this.selected_vendor.vendorWebsite;
                        vendor.vendorMainEmail = this.selected_vendor.vendorMainEmail;
                        vendor.vendorAddressLine1 = this.selected_vendor.vendorAddressLine1;
                        vendor.vendorMainPhoneNumber = this.selected_vendor.vendorMainPhoneNumber;
                        vendor.vendorCategory = this.selected_vendor.vendorCategory;
                        vendor.vendorTagging = this.selected_vendor.vendorTagging;
                        vendor.vendorContactPerson = this.contactPersonList;
                        vendor.vendorAttachments = this.selected_vendor.vendorAttachments;
                        vendor.save();

                        this.$notify(
                            {
                                message: 'Vendor Updated successfully!',
                                horizontalAlign: 'center',
                                verticalAlign: 'top',
                                type: 'success'
                            })
                    }
                })


            },
            /**
             * Add new contact person to the selected vendor
             */
            addContactPerson() {
                this.selected_vendor.vendorContactPerson.push({
                    name : null,
                    email : null,
                    phone_number : null
                });

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
                this.vendorAttachments.push({
                    path : null
                });
            },
            /**
             * Delete item from attachments list
             * @param index
             */
            deleteAttachmentItem(index) {
                this.vendorAttachments.splice(index,1);
            },
        }
    };
</script>
