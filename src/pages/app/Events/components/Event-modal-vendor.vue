<template>
  <div class="md-layout">
    <modal v-if="modalOpen" @close="noticeModalHide">
      <template slot="header">
        <h4 class="modal-title">
          <span v-if="!form.id">Add new</span>
          <span v-if="form.id">Edit</span>
          vendor</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noticeModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <form @submit.prevent="validateModalForm" class="md-layout">
          <md-card>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-autocomplete v-model="form.name"
                                 data-vv-name="name"
                                 v-validate= "modelValidations.name"
                                 required
                                 :md-options="vendorsList"
                                 @md-changed="setVendor"
                                 class="change-icon-order select-with-icon mb16"
                                 :class="[{'md-error': errors.has('name')}]">
                  <md-icon class="md-accent">person</md-icon>
                  <label>Vendor Name</label>
                  <span class="md-error" v-if="errors.has('name')">This field is required</span>
                </md-autocomplete>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="[{'md-error': errors.has('email')}]" class="mb16">
                  <md-icon class="md-accent">email</md-icon>
                  <label>Email</label>
                  <md-input v-model="form.email"
                            data-vv-name="email"
                            v-validate= "modelValidations.email"
                            :disabled="selectedFromVendors"/>
                  <span class="md-error" v-if="errors.has('email')">This field is required</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="[{'md-error': errors.has('contactPerson')}]" class="mb16">
                  <md-icon class="md-accent">person</md-icon>
                  <label>Contact Person</label>
                  <md-input v-model="form.contactPerson"
                            data-vv-name="contactPerson"
                            v-validate= "modelValidations.contactPerson"
                            :disabled="selectedFromVendors" />
                  <span class="md-error" v-if="errors.has('contactPerson')">This field is required</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="[{'md-error': errors.has('phone')}]" class="mb16">
                  <md-icon class="md-accent">phone</md-icon>
                  <label>Phone</label>
                  <md-input v-model="form.phone"
                            data-vv-name="phone"
                            v-validate= "modelValidations.phone"
                            :disabled="selectedFromVendors"
                            />
                  <span class="md-error" v-if="errors.has('phone')">This field is required</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <div class="md-layout-item md-size-50">
                <md-field  :class="[{'md-error': errors.has('cost')}]" class="mb16">
                  <md-icon class="md-accent">attach_money</md-icon>
                  <label>Cost/Budget</label>
                  <md-input v-model="form.cost"
                            data-vv-name="cost"
                            v-validate= "modelValidations.cost"
                            required/>
                  <span class="md-error" v-if="errors.has('cost')">This field is required and should be in range of 1 - 100 000</span>
                </md-field>
              </div>
            </div>
          </md-card>
        </form>
      </template>

      <template slot="footer">
        <md-button class="md-simple" @click="noticeModalHide">Cancel</md-button>
        <md-button class="md-primary" @click="validateModalForm">
          <span v-if="!form.id">Create</span>
          <span v-if="form.id">Save</span>
        </md-button>
      </template>
    </modal>
  </div>
</template>
<script>
  import { Modal } from "@/components";
  import Vue from 'vue';
  import Vendors from '@/models/Vendors';

  export default {
    name: 'event-modal-vendor',
    components: {
      Modal,
    },
    props: {
      vendorItem: Object,
      componentIndex: Number,
      vendorIndex: Number,
    },
    data() {
      return {
        modalOpen: false,
        form: {
          id: null,
          name: null,
          email: null,
          contactPerson: null,
          phone: null,
          cost: null,
        },
        modelValidations: {
          name: {
            required: true,
          },
          email: {

          },
          contactPerson: {

          },
          phone: {

          },
          cost: {
            required: true,
            min_value: 0,
            max_value: 100000,
          },
        },
        selectedFromVendors: true, // for disabled/enabled inputs' state
        changedVendorItem: null,
      }
    },
    watch: {
      vendorItem: function(val) {
        this.changedVendorItem = null;
        this.selectedFromVendors = true;
        this.form.id = 'vendorItemId' in val ? val.vendorItemId : null;
        this.form.name = 'vendorDisplayName' in val ? val.vendorDisplayName : '';
        this.form.contactPerson = 'contactPerson' in val ? new Date(val.contactPerson) : '';
        this.form.email = 'vendorMainEmail' in val ? val.vendorMainEmail : '';
        this.form.phone = 'vendorMainPhoneNumber' in val ? val.vendorMainPhoneNumber : '';
        this.form.cost = 'cost' in val ? val.cost : '';
      }
    },
    methods: {
      noticeModalHide() {
        this.modalOpen = false;
      },
      toggleModal(show) {
        this.modalOpen = show;
      },
      validateModalForm() {
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            let store = this.$store.state.eventData.components[this.componentIndex];
            let vendorId = null;

            // TODO: optimize
            // if editing existing
            if (this.vendorIndex !== null && this.vendorIndex > -1) {
              // and DOESN'T CREATE vendor
              if (this.selectedFromVendors) {
                vendorId = this.changedVendorItem ? this.changedVendorItem.id : this.vendorItem.id;

                Vue.set(store.vendors, this.vendorIndex, {
                  id: this.form.id,
                  vendorId: vendorId,
                  cost: +this.form.cost
                });

                this.$store.commit('updateEventData', store);
                this.clearForm();
                this.modalOpen = false;
              }  else if (!this.selectedFromVendors) { // and CREATE NEW vendor
                let newVendor = new Vendors({
                  vendorDisplayName: this.form.name,
                  vendorMainEmail: this.form.email,
                  vendorMainPhoneNumber: this.form.phone,
                  vendorInvoiceName: this.form.contactPerson,
                  productsCategory: 'HARDCODED DATA FROM EVENT',
                  vendorAvailabilityOptions: 'HARDCODED DATA FROM EVENT',
                  vendorCategory: 'HARDCODED DATA FROM EVENT',
                  vendorCancellationPolicy: 'HARDCODED DATA FROM EVENT',
                  vendorCity: 'HARDCODED DATA FROM EVENT',
                  vendorRefundPolicy: 'HARDCODED DATA FROM EVENT',
                });
                newVendor.save().then((response) => {
                  if (response) {
                    vendorId = response.id;
                    this.$store.state.vendorsList.push(response);

                    Vue.set(store.vendors, this.vendorIndex, {
                      id: this.form.id,
                      vendorId: vendorId,
                      cost: +this.form.cost
                    });

                    this.$store.commit('updateEventData', store);
                    this.clearForm();
                    this.modalOpen = false;
                  }
                });
              }
            } else { // if create new
              if (this.selectedFromVendors) { // and select vendor from existing
                vendorId = this.changedVendorItem.id;

                store.vendors.push({
                  vendorId: vendorId,
                  cost: +this.form.cost
                });

                this.$store.commit('updateEventData', store);
                this.clearForm();
                this.modalOpen = false;

              } else { // and create new vendor
                let newVendor = new Vendors({
                  vendorDisplayName: this.form.name,
                  vendorMainEmail: this.form.email,
                  vendorMainPhoneNumber: this.form.phone,
                  vendorInvoiceName: this.form.contactPerson,
                  productsCategory: 'HARDCODED DATA FROM EVENT',
                  vendorAvailabilityOptions: 'HARDCODED DATA FROM EVENT',
                  vendorCategory: 'HARDCODED DATA FROM EVENT',
                  vendorCancellationPolicy: 'HARDCODED DATA FROM EVENT',
                  vendorCity: 'HARDCODED DATA FROM EVENT',
                  vendorRefundPolicy: 'HARDCODED DATA FROM EVENT',
                });
                newVendor.save().then((response) => {
                  if (response) {
                    vendorId = response.id;
                    this.$store.state.vendorsList.push(response);

                    store.vendors.push({
                      vendorId: vendorId,
                      cost: +this.form.cost
                    });

                    this.$store.commit('updateEventData', store);
                    this.clearForm();
                    this.modalOpen = false;
                  }
                });
              }
            }
          }
        });
      },

      clearForm() {
        this.form = {
          id: null,
          name: null,
          email: null,
          contactPerson:  null,
          phone: null,
          cost: null,
        };
      },
      test() {
        this.selectedFromVendors = !this.selectedFromVendors;
      },
      setVendor(selectedName) {
        this.changedVendorItem = this.$store.state.vendorsList.find((val) => val.vendorDisplayName === selectedName);

        if (this.changedVendorItem) {
          this.selectedFromVendors = true;
          this.form.email = 'vendorMainEmail' in this.changedVendorItem ? this.changedVendorItem.vendorMainEmail : '';
          this.form.contactPerson = 'vendorInvoiceName' in this.changedVendorItem ? this.changedVendorItem.vendorInvoiceName : '';
          this.form.phone = 'vendorMainPhoneNumber' in this.changedVendorItem ? this.changedVendorItem.vendorMainPhoneNumber : '';
        } else {
          this.changedVendorItem = null;
          this.selectedFromVendors = false;
          this.form.email = '';
          this.form.contactPerson = '';
          this.form.phone = '';
        }
      }
    },
    computed: {
      vendorsList() {
        return this.$store.state.vendorsList.map((val) => val.vendorDisplayName);
      }
    }
  }
</script>
<style lang="scss">

</style>
