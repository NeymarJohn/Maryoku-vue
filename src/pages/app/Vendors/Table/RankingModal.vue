<template>
    <div class="md-layout">
        <modal v-if="inviteModalOpen" @close="noticeModalHide" container-class="modal-container">
            <template slot="body">
                <h3 class="title">Ranking</h3>
                <div class="md-layout">
                    <div class="md-layout-item md-size-95 mt-4 md-small-size-100">
                        <md-toolbar class="space-between">
                            <h3 class="md-title">Overal Experience</h3>
                            <div class="pull-right">

                                <div class="star-rating">
                                    <label class="star-rating__star"
                                           v-for="rating in ratings"
                                           :class="{'is-selected' : ((value >= rating) && value != null)}"
                                           v-on:click="set(rating)"
                                           v-on:mouseover="star_over(rating)"
                                           v-on:mouseout="star_out">
                                        <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name"
                                               v-model="value1">★</label>
                                </div>
                            </div>
                        </md-toolbar>

                        <md-toolbar class="space-between">
                            <h3 class="md-title">Cleanliness and Maintenance</h3>
                            <div class="pull-right">
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                            </div>
                        </md-toolbar>

                        <md-toolbar class="space-between">
                            <h3 class="md-title">Accuracy</h3>
                            <div class="pull-right">
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                            </div>
                        </md-toolbar>

                        <md-toolbar class="space-between">
                            <h3 class="md-title">Value for money</h3>
                            <div class="pull-right">
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                            </div>
                        </md-toolbar>

                        <md-toolbar class="space-between">
                            <h3 class="md-title">Service</h3>
                            <div class="pull-right">
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                            </div>
                        </md-toolbar>

                        <md-toolbar class="space-between">
                            <h3 class="md-title">Location & Parking</h3>
                            <div class="pull-right">
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                                <span><md-icon class="white">star</md-icon></span>
                            </div>
                        </md-toolbar>

                        <md-field class="border-field">
                            <label class="label-right">Textarea</label>
                            <md-textarea v-model="textarea" md-counter="80"></md-textarea>
                        </md-field>
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
    props: {
      'name': String,
      'value': null,
      'id': String,
      'required': Boolean
    },
    data() {
      return {
        temp_value: null,
        name: 'md-transparent',
        value1: null,
        value2: null,
        ratings: [1, 2, 3, 4, 5],
        inviteModalOpen: false,
        single: null,
        categories: [
          'Space / Venue ',
          'Catering',
          'Content ',
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


      },
      star_over: function(index) {
        var self = this;

        if (!this.disabled) {
          this.temp_value = this.value;
          return this.value = index;
    }

  },
      star_out: function() {
        var self = this;

        if (!this.disabled) {

          return this.value = this.temp_value;
        }
      },
      set: function(value) {
        var self = this;

        if (!this.disabled) {
          this.temp_value = value;
          console.log(value, 'temp_value');
          return this.value = value;
        }
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
<style lang="scss">
    .swal2-container{
        z-index: 999999;
    }
    .md-toolbar + .md-toolbar {
        margin-top: 16px;
        background-color: transparent!important;
    }
    .md-toolbar {
        background-color: transparent!important;
    }
    .md-toolbar .md-title{
        color: #555555!important;
    }
    .border-field{
        box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(153, 153, 153, 0.46);
    }
    .label-right{
        left: 16px!important;
        font-size: 18px!important;
    }
    .space-between{
        justify-content: space-between;
    }
    .space-between .pull-right span{
        cursor: pointer;
    }
    .white{
        color: white!important;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
    }
    .fill-yellow{
        color: yellow!important;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
    }
    %visually-hidden {
         position: absolute;
         overflow: hidden;
         clip: rect(0 0 0 0);
         height: 1px; width: 1px;
         margin: -1px; padding: 0; border: 0;
     }

    .star-rating {

    &__star {
         display: inline-block;
         padding: 3px;
         vertical-align: middle;
         line-height: 1;
         font-size: 1.5em;
         color: #ABABAB;
         transition: color .2s ease-out;

    &:hover {
         cursor: pointer;
     }

    &.is-selected {
         color: #FFD700;
     }
    }

    &__checkbox {
     @extend %visually-hidden;
     }
    }

</style>
