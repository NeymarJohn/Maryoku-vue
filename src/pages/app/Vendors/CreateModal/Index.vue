<template>
    <div class="md-layout">
        <modal v-if="inviteModalOpen" @close="noticeModalHide" container-class="modal-container">

            <template slot="body">
                        <h3 class="title">Create new Vendor</h3>
                <div class="md-layout">
                    <div class="md-layout-item md-size-95 mt-4 md-small-size-100">
                        <md-field :class="[
                          {'md-valid': !errors.has('displayName') && touched.displayName},
                          {'md-form-group': true},
                          {'md-error': errors.has('displayName')}]">
                            <md-icon>face</md-icon>
                            <label>Vendor</label>
                            <md-input
                                    v-model="name"
                                    data-vv-name="displayName"
                                    type="text"
                                    name="displayName"
                                    required
                                    v-validate="modelValidations.displayName">
                            </md-input>
                            <slide-y-down-transition>
                                <md-icon class="error" v-show="errors.has('displayName')">close</md-icon>
                            </slide-y-down-transition>
                            <slide-y-down-transition>
                                <md-icon class="success" v-show="!errors.has('displayName') && touched.displayName">done</md-icon>
                            </slide-y-down-transition>
                        </md-field>


                        <div class="">
                            <div class="md-layout-item md-medium-size-100 md-size-100">
                                <!--<md-field class="no-margin">-->
                                    <!--<md-icon>face</md-icon>-->
                                    <!--<label for="select">Category</label>-->
                                    <!--<md-select v-model="category" name="select">-->
                                        <!--<md-option v-for="(option, index) in categories"  :key="index"  :value="option">{{ option }}</md-option>-->
                                    <!--</md-select>-->
                                <!--</md-field>-->

                                <md-field>
                                    <label for="food">Category</label>
                                    <md-select v-model="category" name="food" id="food">
                                        <md-option value="space/venue ">Space / Venue </md-option>
                                        <md-option value="catering">Catering </md-option>
                                        <md-optgroup label="Content">
                                            <md-option value="lecture">Lecture</md-option>
                                            <md-option value="Show">Show</md-option>
                                            <md-option value="activity">Activity</md-option>
                                            <md-option value="games">Games</md-option>
                                            <md-option value="sports">Sports</md-option>
                                            <md-option value="art">Art</md-option>
                                            <md-option value="trip">Trip</md-option>
                                        </md-optgroup>

                                        <md-optgroup label="Services">
                                            <md-option value="d.j">D.J</md-option>
                                            <md-option value="photography">Photography</md-option>
                                            <md-option value="cleaning_services">Cleaning Services</md-option>
                                        </md-optgroup>

                                        <md-optgroup label="Products Rental / Purchase">
                                            <md-option value="electronic_devices ">Electronic Devices </md-option>
                                            <md-option value="give_away">Give away</md-option>
                                            <md-option value="furniture">Furniture</md-option>
                                        </md-optgroup>
                                    </md-select>
                                </md-field>

                            </div>
                        </div>

                        <md-field :class="[
                          {'md-valid': !errors.has('webSite') && touched.webSite},
                          {'md-form-group': true},
                          {'md-error': errors.has('webSite')}]">
                            <md-icon>face</md-icon>
                            <label>Web site</label>
                            <md-input
                                    v-model="web"
                                    data-vv-name="webSite"
                                    type="email"
                                    name="webSite"
                                    required
                                    v-validate="modelValidations.webSite">
                            </md-input>
                            <slide-y-down-transition>
                                <md-icon class="error" v-show="errors.has('webSite')">close</md-icon>
                            </slide-y-down-transition>
                            <slide-y-down-transition>
                                <md-icon class="success" v-show="!errors.has('webSite') && touched.webSite">done</md-icon>
                            </slide-y-down-transition>
                        </md-field>

                        <md-field :class="[
                      {'md-valid': !errors.has('vendorAddress') && touched.vendorAddress},
                      {'md-form-group': true},
                      {'md-error': errors.has('vendorAddress')}]">
                            <md-icon>record_voice_over</md-icon>
                            <label>Address</label>
                            <md-input
                                    v-model="address"
                                    data-vv-name="vendorAddress"
                                    type="text"
                                    name="vendorAddress"
                                    required
                                    v-validate="modelValidations.vendorAddress">
                            </md-input>
                            <slide-y-down-transition>
                                <md-icon class="error" v-show="errors.has('vendorAddress')">close</md-icon>
                            </slide-y-down-transition>
                            <slide-y-down-transition>
                                <md-icon class="success" v-show="!errors.has('vendorAddress') && touched.vendorAddress">done</md-icon>
                            </slide-y-down-transition>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-size-95 md-small-size-100">
                        <md-field :class="[
                      {'md-valid': !errors.has('vendorEmail') && touched.vendorEmail},
                      {'md-form-group': true},
                      {'md-error': errors.has('vendorEmail')}]">
                            <md-icon>email</md-icon>
                            <label>Email</label>
                            <md-input
                                    v-model="email"
                                    data-vv-name="vendorEmail"
                                    type="text"
                                    name="email"
                                    required
                                    v-validate="modelValidations.vendorEmail">
                            </md-input>
                            <slide-y-down-transition>
                                <md-icon class="error" v-show="errors.has('vendorEmail')">close</md-icon>
                            </slide-y-down-transition>
                            <slide-y-down-transition>
                                <md-icon class="success" v-show="!errors.has('vendorEmail') && touched.vendorEmail">done</md-icon>
                            </slide-y-down-transition>
                        </md-field>
                        <md-field :class="[
                          {'md-valid': !errors.has('vendorPhoneNumber') && touched.vendorPhoneNumber},
                          {'md-form-group': true},
                          {'md-error': errors.has('vendorPhoneNumber')}]">
                            <md-icon>phone</md-icon>
                            <label>Phone Number</label>
                            <md-input
                                    v-model="phoneNumber"
                                    data-vv-name="vendorPhoneNumber"
                                    type="number"
                                    name="vendorPhoneNumber"
                                    required
                                    v-validate="modelValidations.vendorPhoneNumber">
                            </md-input>
                            <slide-y-down-transition>
                                <md-icon class="error" v-show="errors.has('vendorPhoneNumber')">close</md-icon>
                            </slide-y-down-transition>
                            <slide-y-down-transition>
                                <md-icon class="success" v-show="!errors.has('vendorPhoneNumber') && touched.vendorPhoneNumber">done</md-icon>
                            </slide-y-down-transition>
                        </md-field>
                        <md-button class="md-rose text-rose pull-right" @click="addVendor">
                            Create
                        </md-button>
                    </div>
                </div>
            </template>

        </modal>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
    import vendorsVuex from '../vendors.vuex';
    import { Modal } from "@/components";
    import swal from "sweetalert2";
    import Vendors from "@/models/Vendors";
    import {SlideYDownTransition} from "vue2-transitions";


    export default {
        components: {
          Modal,
          SlideYDownTransition

        },
        data() {
            return {
              inviteModalOpen: false,
              single: null,
              categories: [
                'Space / Venue ',
                'Catering',
                'Services ',
                'Products Rental / Purchase'
              ],
              touched: {
                displayName: false,
                vendorAddress: false,
                vendorEmail: false,
                vendorCategory: false,
                webSite: false,
                vendorPhoneNumber: false
              },
              modelValidations: {
                displayName: {
                  required: true,
                  min: 5
                },
                vendorAddress: {
                  required: true,
                  min: 5
                },
                vendorEmail: {
                  required: true,
                  email: true
                },
                vendorCategory: {
                  required: true,
                  min: 5
                },
                webSite: {
                  required: true,
                  min: 5
                },
                vendorPhoneNumber: {
                  required: true,
                  min: 5
                }
              }
            }
        },
        created() {
            console.log(this.$store);
            this.$store.registerModule('vendors', vendorsVuex);
        },
      destroyed() {
        console.log(this.$store);
        console.log(this.vendorsMemberData)

        this.$store.unregisterModule('vendors', vendorsVuex);
      },
        computed: {
            ...mapState('vendors', ['vendorsMemberData']),

          name: {
            get() {
              return this.vendorsMemberData.vendorDisplayName
            },
            set(value) {
              this.setMemberProperty({key: 'vendorDisplayName', actualValue: value})
            },

          },

          address: {
            get() {
              return this.vendorsMemberData.vendorAddressLine1
            },
            set(value) {
              this.setMemberProperty({key: 'vendorAddressLine1', actualValue: value})
            },

          },
          email: {
            get() {
              return this.vendorsMemberData.vendorMainEmail
            },
            set(value) {
              this.setMemberProperty({key: 'vendorMainEmail', actualValue: value})
            }
          },
          category: {
            get() {
              return this.vendorsMemberData.productsCategory
            },
            set(value) {
              this.setMemberProperty({key: 'productsCategory', actualValue: value})
            }
          },
          web: {
            get() {
              return this.vendorsMemberData.vendorWebsite
            },
            set(value) {
              this.setMemberProperty({key: 'vendorWebsite', actualValue: value})
            }
          },
          phoneNumber: {
            get() {
              return this.vendorsMemberData.vendorMainPhoneNumber
            },
            set(value) {
              this.setMemberProperty({key: 'vendorMainPhoneNumber', actualValue: value})
            }
          }

        },
        methods: {
        ...mapMutations('vendors', [
            'setMemberProperty'
          ]),
            getError(fieldName) {
            return this.errors.first(fieldName);
          },
          validate() {
            return this.$validator.validateAll().then(res => {
              this.$emit("on-validated", res);
              return res;
            });
          },
            noticeModalHide: function () {
                this.inviteModalOpen = false;
            },
            toggleModal: function (show) {
                this.inviteModalOpen = show;
            },
            validateStep(ref) {
                return this.$refs[ref].validate();
            },
            onStepValidated(validated, model) {
                this.wizardModel = {...this.wizardModel, ...model};
            },
            async addVendor() {

              let vendor = new Vendors({});

              vendor.attach(this.vendorsMemberData);

              this.inviteModalOpen = false;
            }
        },
    watch: {
      displayName() {
        this.touched.displayName = true;
      },
      vendorAddress() {
        this.touched.vendorAddress = true;
      },
      vendorEmail() {
        this.touched.vendorEmail = true;
      },
      vendorCategory() {
        this.touched.username = true;
      },
      webSite() {
        this.touched.webSite = true;
      },
      vendorPhoneNumber() {
        this.touched.vendorPhoneNumber = true;
      }
    }
    };
</script>
<style>
    .swal2-container{
        z-index: 999999;
    }
</style>
