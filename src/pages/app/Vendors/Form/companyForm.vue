<template>
    <div>
        <md-card >
            <md-card-header class="md-card-header-icon md-card-header-rose">
                <div class="card-icon">
                    <md-icon>mail_outline</md-icon>
                </div>
                <h4 class="title2">{{selected_vendor.vendorDisplayName}}’s Company</h4>
            </md-card-header>

            <md-card-content class="md-layout">
                <div class="md-layout-item md-size-100">
                    <md-field>
                        <label>Name</label>
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
                        <label for="tagging">Tagging</label>
                        <md-select v-model="selected_vendor.vendorTagging" name="tagging" id="tagging">
                            <md-option value="Gardenplace">Gardenplace</md-option>
                        </md-select>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label>Contact Person</label>
                        <md-input v-model="selected_vendor.vendorContactPerson" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label>Attachments</label>
                        <md-file v-model="selected_vendor.vendorAttachments" multiple />
                    </md-field>
                </div>


            </md-card-content>

            <md-card-actions md-alignment="right">
                <md-button class="md-rose" @click="saveVendor">Save</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>

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
                vendorCategory: []

            }
        },
        methods: {

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
                    }
                })


            }
        }
    };
</script>
